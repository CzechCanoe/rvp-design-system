import {
  forwardRef,
  useCallback,
  useState,
  useRef,
  type HTMLAttributes,
  type ReactNode,
  type DragEvent,
  type ChangeEvent,
} from 'react';
import './Dropzone.css';

export type DropzoneSize = 'sm' | 'md' | 'lg';
export type DropzoneState = 'default' | 'error' | 'success';

export interface DropzoneFile {
  /** File object */
  file: File;
  /** Unique identifier */
  id: string;
  /** Upload progress (0-100) */
  progress?: number;
  /** Error message if upload failed */
  error?: string;
  /** File preview URL (for images) */
  preview?: string;
}

export interface DropzoneProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrop' | 'onError'> {
  /** Accepted file types (MIME types or extensions) */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files */
  maxFiles?: number;
  /** Dropzone size */
  size?: DropzoneSize;
  /** Validation state */
  state?: DropzoneState;
  /** Disabled state */
  disabled?: boolean;
  /** Show file previews */
  showPreviews?: boolean;
  /** Custom label text */
  label?: string;
  /** Custom hint text */
  hint?: string;
  /** Error message */
  errorMessage?: string;
  /** Currently selected files */
  files?: DropzoneFile[];
  /** Callback when files are selected/dropped */
  onFilesChange?: (files: DropzoneFile[]) => void;
  /** Callback when a file is removed */
  onFileRemove?: (file: DropzoneFile) => void;
  /** Callback for validation errors */
  onError?: (error: string) => void;
  /** Custom icon render */
  icon?: ReactNode;
  /** Custom content render */
  children?: ReactNode;
}

// Generate unique ID for files
function generateFileId(): string {
  return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Format file size for display
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

// Get file extension
function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
}

// Check if file is an image
function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

// Default upload icon
const UploadIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="csk-dropzone__icon-svg"
  >
    <path
      d="M20 6.66667V26.6667M20 6.66667L26.6667 13.3333M20 6.66667L13.3333 13.3333"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.66667 26.6667V30C6.66667 31.8409 8.15905 33.3333 10 33.3333H30C31.8409 33.3333 33.3333 31.8409 33.3333 30V26.6667"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// File icon based on type
const FileIcon = ({ extension }: { extension: string }) => {
  const getColor = () => {
    const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    const docExts = ['doc', 'docx', 'pdf'];
    const dataExts = ['xls', 'xlsx', 'csv'];

    if (imageExts.includes(extension)) return 'var(--color-success-500)';
    if (docExts.includes(extension)) return 'var(--color-error-500)';
    if (dataExts.includes(extension)) return 'var(--color-success-600)';
    return 'var(--color-primary-500)';
  };

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
        stroke={getColor()}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 2V8H20"
        stroke={getColor()}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Remove icon
const RemoveIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 4L4 12M4 4L12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Dropzone component for file uploads with drag & drop support.
 *
 * Supports file type validation, size limits, multiple files,
 * image previews, and progress indicators.
 */
export const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(
  (
    {
      accept,
      multiple = false,
      maxSize,
      maxFiles,
      size = 'md',
      state = 'default',
      disabled = false,
      showPreviews = true,
      label,
      hint,
      errorMessage,
      files = [],
      onFilesChange,
      onFileRemove,
      onError,
      icon,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Validate file
    const validateFile = useCallback(
      (file: File): string | null => {
        // Check file type
        if (accept) {
          const acceptedTypes = accept.split(',').map((t) => t.trim().toLowerCase());
          const fileType = file.type.toLowerCase();
          const fileExt = `.${getFileExtension(file.name)}`;

          const isAccepted = acceptedTypes.some((type) => {
            if (type.startsWith('.')) {
              return fileExt === type;
            }
            if (type.endsWith('/*')) {
              return fileType.startsWith(type.replace('/*', '/'));
            }
            return fileType === type;
          });

          if (!isAccepted) {
            return `Typ souboru "${file.name}" není podporován`;
          }
        }

        // Check file size
        if (maxSize && file.size > maxSize) {
          return `Soubor "${file.name}" je příliš velký (max ${formatFileSize(maxSize)})`;
        }

        return null;
      },
      [accept, maxSize]
    );

    // Process files
    const processFiles = useCallback(
      (fileList: FileList | File[]) => {
        const newFiles: DropzoneFile[] = [];
        const errors: string[] = [];

        const filesToProcess = Array.from(fileList);

        // Check max files
        if (maxFiles && files.length + filesToProcess.length > maxFiles) {
          const error = `Maximální počet souborů je ${maxFiles}`;
          errors.push(error);
          onError?.(error);
          return;
        }

        for (const file of filesToProcess) {
          const error = validateFile(file);

          if (error) {
            errors.push(error);
            onError?.(error);
            continue;
          }

          const dropzoneFile: DropzoneFile = {
            file,
            id: generateFileId(),
            progress: 0,
          };

          // Generate preview for images
          if (showPreviews && isImageFile(file)) {
            dropzoneFile.preview = URL.createObjectURL(file);
          }

          newFiles.push(dropzoneFile);
        }

        if (newFiles.length > 0) {
          const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
          onFilesChange?.(updatedFiles);
        }
      },
      [files, maxFiles, multiple, validateFile, showPreviews, onFilesChange, onError]
    );

    // Handle drag events
    const handleDragEnter = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
          setIsDragOver(true);
        }
      },
      [disabled]
    );

    const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
    }, []);

    const handleDragOver = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
          setIsDragOver(true);
        }
      },
      [disabled]
    );

    const handleDrop = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        if (disabled) return;

        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
          processFiles(droppedFiles);
        }
      },
      [disabled, processFiles]
    );

    // Handle click to open file dialog
    const handleClick = useCallback(() => {
      if (!disabled && inputRef.current) {
        inputRef.current.click();
      }
    }, [disabled]);

    // Handle file input change
    const handleInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
          processFiles(selectedFiles);
        }
        // Reset input value to allow selecting the same file again
        e.target.value = '';
      },
      [processFiles]
    );

    // Handle file removal
    const handleRemove = useCallback(
      (file: DropzoneFile) => {
        // Revoke object URL to prevent memory leaks
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
        onFileRemove?.(file);

        const updatedFiles = files.filter((f) => f.id !== file.id);
        onFilesChange?.(updatedFiles);
      },
      [files, onFileRemove, onFilesChange]
    );

    // Handle keyboard
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault();
          handleClick();
        }
      },
      [disabled, handleClick]
    );

    // Determine actual state
    const actualState = errorMessage ? 'error' : state;

    // Default label text
    const labelText =
      label ||
      (multiple ? 'Přetáhněte soubory nebo klikněte pro výběr' : 'Přetáhněte soubor nebo klikněte pro výběr');

    // Default hint text
    const hintText = hint || (accept ? `Podporované formáty: ${accept}` : undefined);

    const classes = [
      'csk-dropzone',
      `csk-dropzone--${size}`,
      `csk-dropzone--${actualState}`,
      isDragOver && 'csk-dropzone--drag-over',
      disabled && 'csk-dropzone--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {/* Hidden file input - outside of button to avoid nested interactive */}
        <input
          ref={inputRef}
          type="file"
          className="csk-dropzone__input"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          aria-hidden="true"
          tabIndex={-1}
        />

        {/* Drop area */}
        <div
          className="csk-dropzone__area"
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          aria-label={labelText}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* Content */}
          {children || (
            <>
              <div className="csk-dropzone__icon">{icon || <UploadIcon />}</div>
              <div className="csk-dropzone__label">{labelText}</div>
              {hintText && <div className="csk-dropzone__hint">{hintText}</div>}
              {maxSize && (
                <div className="csk-dropzone__hint">Max velikost: {formatFileSize(maxSize)}</div>
              )}
            </>
          )}
        </div>

        {/* Error message */}
        {errorMessage && <div className="csk-dropzone__error">{errorMessage}</div>}

        {/* File list */}
        {showPreviews && files.length > 0 && (
          <div className="csk-dropzone__files">
            {files.map((file) => (
              <div
                key={file.id}
                className={[
                  'csk-dropzone__file',
                  file.error && 'csk-dropzone__file--error',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {/* Preview or icon */}
                <div className="csk-dropzone__file-preview">
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="csk-dropzone__file-image"
                    />
                  ) : (
                    <FileIcon extension={getFileExtension(file.file.name)} />
                  )}
                </div>

                {/* File info */}
                <div className="csk-dropzone__file-info">
                  <div className="csk-dropzone__file-name">{file.file.name}</div>
                  <div className="csk-dropzone__file-size">
                    {formatFileSize(file.file.size)}
                    {file.error && (
                      <span className="csk-dropzone__file-error-text">{file.error}</span>
                    )}
                  </div>

                  {/* Progress bar */}
                  {file.progress !== undefined && file.progress > 0 && file.progress < 100 && (
                    <div className="csk-dropzone__file-progress">
                      <div
                        className="csk-dropzone__file-progress-bar"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  className="csk-dropzone__file-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(file);
                  }}
                  aria-label={`Odebrat ${file.file.name}`}
                >
                  <RemoveIcon />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Dropzone.displayName = 'Dropzone';
