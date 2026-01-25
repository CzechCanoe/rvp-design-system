import {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useEffect,
  type InputHTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import './SearchInput.css';

export type SearchInputSize = 'sm' | 'md' | 'lg';

export interface SearchFilterChip {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Optional color variant */
  color?: 'default' | 'primary' | 'dv' | 'ry' | 'vt' | 'energy';
}

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** Size of the input */
  size?: SearchInputSize;
  /** Full width input */
  fullWidth?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Current search value */
  value?: string;
  /** Callback when search value changes */
  onChange?: (value: string) => void;
  /** Callback when search is submitted (Enter key) */
  onSearch?: (value: string) => void;
  /** Available filter chips */
  chips?: SearchFilterChip[];
  /** Currently active chip IDs */
  activeChips?: string[];
  /** Callback when chip is toggled */
  onChipToggle?: (chipId: string, active: boolean) => void;
  /** Show loading indicator */
  loading?: boolean;
  /** Debounce delay for onChange in ms (0 to disable) */
  debounceMs?: number;
  /** Custom icon for the search field */
  icon?: ReactNode;
  /** Show the search icon */
  showIcon?: boolean;
  /** Helper text below input */
  helperText?: string;
  /** Show results count */
  resultsCount?: number;
}

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const LoadingSpinner = () => (
  <svg className="csk-search-input__spinner" viewBox="0 0 24 24" fill="none">
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="40 20"
    />
  </svg>
);

const ClearIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

/**
 * SearchInput component with filter chips.
 *
 * Combines a search input field with optional filter chips for quick filtering.
 * Supports debounced search, loading states, and keyboard navigation.
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      size = 'md',
      fullWidth = false,
      placeholder = 'Hledat...',
      value: controlledValue,
      onChange,
      onSearch,
      chips = [],
      activeChips = [],
      onChipToggle,
      loading = false,
      debounceMs = 300,
      icon,
      showIcon = true,
      helperText,
      resultsCount,
      disabled,
      className,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    // Internal state for uncontrolled mode
    const [internalValue, setInternalValue] = useState('');
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    // Debounce timer ref
    const debounceTimerRef = useRef<number | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Merge refs
    const mergedRef = (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    };

    // Cleanup debounce timer on unmount
    useEffect(() => {
      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
      };
    }, []);

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (!isControlled) {
          setInternalValue(newValue);
        }

        // Debounce the onChange callback
        if (onChange) {
          if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
          }

          if (debounceMs > 0) {
            debounceTimerRef.current = window.setTimeout(() => {
              onChange(newValue);
            }, debounceMs);
          } else {
            onChange(newValue);
          }
        }
      },
      [isControlled, onChange, debounceMs]
    );

    const handleClear = useCallback(() => {
      if (!isControlled) {
        setInternalValue('');
      }
      onChange?.('');
      inputRef.current?.focus();
    }, [isControlled, onChange]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSearch) {
          e.preventDefault();
          // Cancel pending debounce and search immediately
          if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
          }
          onSearch(currentValue);
        }
        if (e.key === 'Escape' && currentValue) {
          e.preventDefault();
          handleClear();
        }
        onKeyDown?.(e);
      },
      [currentValue, onSearch, handleClear, onKeyDown]
    );

    const handleChipClick = useCallback(
      (chipId: string) => {
        if (onChipToggle) {
          const isActive = activeChips.includes(chipId);
          onChipToggle(chipId, !isActive);
        }
      },
      [activeChips, onChipToggle]
    );

    const wrapperClasses = [
      'csk-search-input',
      `csk-search-input--${size}`,
      fullWidth && 'csk-search-input--full-width',
      loading && 'csk-search-input--loading',
      disabled && 'csk-search-input--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const hasChips = chips.length > 0;
    const showClear = currentValue && !disabled;

    return (
      <div className={wrapperClasses}>
        <div className="csk-search-input__field">
          {showIcon && (
            <span className="csk-search-input__icon" aria-hidden="true">
              {loading ? <LoadingSpinner /> : icon || <SearchIcon />}
            </span>
          )}

          <input
            ref={mergedRef}
            type="search"
            className="csk-search-input__input"
            placeholder={placeholder}
            value={currentValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-label={placeholder}
            {...props}
          />

          {showClear && (
            <button
              type="button"
              className="csk-search-input__clear"
              onClick={handleClear}
              aria-label="Vymazat hledání"
              tabIndex={-1}
            >
              <ClearIcon />
            </button>
          )}
        </div>

        {hasChips && (
          <div className="csk-search-input__chips" role="group" aria-label="Rychlé filtry">
            {chips.map((chip) => {
              const isActive = activeChips.includes(chip.id);
              const chipClasses = [
                'csk-search-input__chip',
                chip.color && `csk-search-input__chip--${chip.color}`,
                isActive && 'csk-search-input__chip--active',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <button
                  key={chip.id}
                  type="button"
                  className={chipClasses}
                  onClick={() => handleChipClick(chip.id)}
                  aria-pressed={isActive}
                  disabled={disabled}
                >
                  {chip.icon && (
                    <span className="csk-search-input__chip-icon">{chip.icon}</span>
                  )}
                  <span className="csk-search-input__chip-label">{chip.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {(helperText || resultsCount !== undefined) && (
          <div className="csk-search-input__footer">
            {helperText && (
              <span className="csk-search-input__helper">{helperText}</span>
            )}
            {resultsCount !== undefined && (
              <span className="csk-search-input__results">
                {resultsCount === 0
                  ? 'Žádné výsledky'
                  : resultsCount === 1
                    ? '1 výsledek'
                    : resultsCount >= 2 && resultsCount <= 4
                      ? `${resultsCount} výsledky`
                      : `${resultsCount} výsledků`}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
