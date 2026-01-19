import type { Meta, StoryObj } from '@storybook/react';
import { Dropzone, type DropzoneFile } from './Dropzone';
import { useState } from 'react';

const meta = {
  title: 'Components/Dropzone',
  component: Dropzone,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Dropzone component for file uploads with drag & drop support. Supports file type validation, size limits, multiple files, image previews, and progress indicators.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Dropzone size',
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Validation state',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple files',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    showPreviews: {
      control: 'boolean',
      description: 'Show file previews',
    },
    accept: {
      control: 'text',
      description: 'Accepted file types (MIME types or extensions)',
    },
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes',
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files',
    },
    label: {
      control: 'text',
      description: 'Custom label text',
    },
    hint: {
      control: 'text',
      description: 'Custom hint text',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message',
    },
  },
} satisfies Meta<typeof Dropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default dropzone for single file upload.
 */
export const Default: Story = {
  args: {
    onFilesChange: (files) => console.log('Files changed:', files),
    onError: (error) => console.log('Error:', error),
  },
};

/**
 * Dropzone with controlled state.
 */
export const Controlled: Story = {
  render: () => {
    const [files, setFiles] = useState<DropzoneFile[]>([]);

    return (
      <Dropzone
        files={files}
        onFilesChange={setFiles}
        multiple
        accept="image/*,.pdf"
        maxSize={5 * 1024 * 1024} // 5MB
        onError={(error) => alert(error)}
      />
    );
  },
};

/**
 * Multiple file upload dropzone.
 */
export const MultipleFiles: Story = {
  args: {
    multiple: true,
    label: 'Nahrát více souborů',
  },
};

/**
 * Image-only dropzone.
 */
export const ImagesOnly: Story = {
  args: {
    accept: 'image/*',
    multiple: true,
    hint: 'Pouze obrázky (JPG, PNG, GIF, WebP)',
    maxSize: 10 * 1024 * 1024, // 10MB
  },
};

/**
 * Documents dropzone.
 */
export const Documents: Story = {
  args: {
    accept: '.pdf,.doc,.docx,.xls,.xlsx',
    multiple: true,
    hint: 'PDF, Word, Excel dokumenty',
    maxSize: 25 * 1024 * 1024, // 25MB
  },
};

/**
 * Small size dropzone.
 */
export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Rychlé nahrání',
  },
};

/**
 * Large size dropzone.
 */
export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Přetáhněte soubory sem',
    hint: 'nebo klikněte pro otevření dialogu',
  },
};

/**
 * Disabled dropzone.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Error state dropzone.
 */
export const ErrorState: Story = {
  args: {
    state: 'error',
    errorMessage: 'Některé soubory nebylo možné nahrát',
  },
};

/**
 * Success state dropzone.
 */
export const SuccessState: Story = {
  args: {
    state: 'success',
    label: 'Soubory úspěšně nahrány',
  },
};

/**
 * With file size limit.
 */
export const WithSizeLimit: Story = {
  args: {
    maxSize: 1024 * 1024, // 1MB
    multiple: true,
  },
};

/**
 * With file count limit.
 */
export const WithFileLimit: Story = {
  args: {
    maxFiles: 3,
    multiple: true,
    hint: 'Maximálně 3 soubory',
  },
};

/**
 * Without previews.
 */
export const NoPreviews: Story = {
  render: () => {
    const [files, setFiles] = useState<DropzoneFile[]>([]);

    return (
      <Dropzone
        files={files}
        onFilesChange={setFiles}
        showPreviews={false}
        multiple
      />
    );
  },
};

/**
 * With simulated upload progress.
 */
export const WithProgress: Story = {
  render: () => {
    const [files, setFiles] = useState<DropzoneFile[]>([]);

    const handleFilesChange = (newFiles: DropzoneFile[]) => {
      // Set files with 0 progress
      setFiles(newFiles);

      // Simulate upload progress
      newFiles.forEach((file, index) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 15;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
          }

          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, progress: Math.round(progress) } : f
            )
          );
        }, 200 + index * 100);
      });
    };

    return (
      <Dropzone
        files={files}
        onFilesChange={handleFilesChange}
        multiple
        accept="image/*"
        maxSize={10 * 1024 * 1024}
      />
    );
  },
};

/**
 * Custom content with children.
 */
export const CustomContent: Story = {
  args: {
    children: (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>📁</div>
        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
          Vlastní obsah dropzony
        </div>
        <div style={{ fontSize: '14px', color: 'var(--color-text-tertiary)' }}>
          Můžete použít vlastní React komponenty
        </div>
      </div>
    ),
  },
};

/**
 * CSK use case - Athlete photo upload.
 */
export const AthletePhoto: Story = {
  render: () => {
    const [files, setFiles] = useState<DropzoneFile[]>([]);
    const [error, setError] = useState<string | undefined>();

    return (
      <div style={{ maxWidth: '400px' }}>
        <h4 style={{ marginBottom: '16px', color: 'var(--color-text-primary)' }}>
          Fotografie závodníka
        </h4>
        <Dropzone
          files={files}
          onFilesChange={(newFiles) => {
            setFiles(newFiles);
            setError(undefined);
          }}
          onError={(err) => setError(err)}
          accept="image/jpeg,image/png"
          maxSize={2 * 1024 * 1024}
          multiple={false}
          errorMessage={error}
          label="Nahrajte fotografii"
          hint="JPG nebo PNG, max 2 MB, doporučeno 400×500 px"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Příklad použití pro nahrání fotografie závodníka v registračním systému.',
      },
    },
  },
};

/**
 * CSK use case - Race result documents.
 */
export const RaceDocuments: Story = {
  render: () => {
    const [files, setFiles] = useState<DropzoneFile[]>([]);

    return (
      <div style={{ maxWidth: '600px' }}>
        <h4 style={{ marginBottom: '16px', color: 'var(--color-text-primary)' }}>
          Dokumenty závodu
        </h4>
        <Dropzone
          files={files}
          onFilesChange={setFiles}
          accept=".pdf,.xlsx,.csv"
          maxSize={10 * 1024 * 1024}
          maxFiles={10}
          multiple
          size="lg"
          label="Nahrajte dokumenty závodu"
          hint="PDF, Excel nebo CSV, max 10 souborů, každý max 10 MB"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Příklad použití pro nahrání dokumentů závodu (výsledky, startovní listiny, protokoly).',
      },
    },
  },
};

/**
 * CSK use case - Club logo upload.
 */
export const ClubLogo: Story = {
  render: () => {
    const [files, setFiles] = useState<DropzoneFile[]>([]);

    return (
      <div style={{ maxWidth: '300px' }}>
        <h4 style={{ marginBottom: '16px', color: 'var(--color-text-primary)' }}>
          Logo klubu
        </h4>
        <Dropzone
          files={files}
          onFilesChange={setFiles}
          accept="image/png,image/svg+xml"
          maxSize={500 * 1024} // 500KB
          multiple={false}
          size="sm"
          label="Nahrajte logo"
          hint="PNG nebo SVG, max 500 KB"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Příklad použití pro nahrání loga klubu.',
      },
    },
  },
};

/**
 * Interactive example with complete workflow.
 */
export const Interactive: Story = {
  render: () => {
    const [files, setFiles] = useState<DropzoneFile[]>([]);
    const [uploadedCount, setUploadedCount] = useState(0);
    const [errors, setErrors] = useState<string[]>([]);

    const handleFilesChange = (newFiles: DropzoneFile[]) => {
      setFiles(newFiles);

      // Simulate upload
      newFiles.forEach((file) => {
        if (file.progress === 0) {
          let progress = 0;
          const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress >= 100) {
              progress = 100;
              clearInterval(interval);
              setUploadedCount((prev) => prev + 1);
            }

            setFiles((prev) =>
              prev.map((f) =>
                f.id === file.id ? { ...f, progress: Math.round(progress) } : f
              )
            );
          }, 150);
        }
      });
    };

    const handleFileRemove = (file: DropzoneFile) => {
      if (file.progress === 100) {
        setUploadedCount((prev) => Math.max(0, prev - 1));
      }
    };

    const handleError = (error: string) => {
      setErrors((prev) => [...prev, error]);
      setTimeout(() => {
        setErrors((prev) => prev.slice(1));
      }, 3000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Dropzone
          files={files}
          onFilesChange={handleFilesChange}
          onFileRemove={handleFileRemove}
          onError={handleError}
          accept="image/*,.pdf,.doc,.docx"
          maxSize={5 * 1024 * 1024}
          maxFiles={5}
          multiple
        />

        {/* Status */}
        <div
          style={{
            padding: '16px',
            background: 'var(--color-bg-secondary)',
            borderRadius: '8px',
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>Stav nahrávání</div>
          <div style={{ color: 'var(--color-text-secondary)' }}>
            Souborů ve frontě: {files.length}
          </div>
          <div style={{ color: 'var(--color-success-500)' }}>
            Nahráno: {uploadedCount}
          </div>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div
            style={{
              padding: '12px',
              background: 'var(--color-feedback-error-bg)',
              border: '1px solid var(--color-feedback-error-border)',
              borderRadius: '8px',
            }}
          >
            {errors.map((error, i) => (
              <div key={i} style={{ color: 'var(--color-error-500)' }}>
                {error}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};
