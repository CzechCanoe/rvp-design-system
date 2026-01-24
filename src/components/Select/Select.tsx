import { forwardRef, type SelectHTMLAttributes, type ReactNode } from 'react';
import './Select.css';

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectState = 'default' | 'error' | 'success';

export interface SelectOption {
  /** Option value */
  value: string;
  /** Option display label */
  label: string;
  /** Option disabled state */
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Options to display in the select */
  options: SelectOption[];
  /** Size of the select */
  size?: SelectSize;
  /** Validation state */
  state?: SelectState;
  /** Full width select */
  fullWidth?: boolean;
  /** Label text */
  label?: string;
  /** Helper text below select */
  helperText?: string;
  /** Error message (overrides helperText when state is error) */
  errorMessage?: string;
  /** Icon to display at the start of the select */
  iconLeft?: ReactNode;
  /** Placeholder text (displayed as first disabled option) */
  placeholder?: string;
  /** Use energy (coral-orange) focus ring instead of primary */
  energyFocus?: boolean;
  /** Use display font for label (aesthetic emphasis) */
  displayLabel?: boolean;
}

/**
 * Select component for choosing from a list of options.
 *
 * Uses native HTML select for optimal accessibility and mobile UX.
 * Supports sizes (sm, md, lg) and validation states (default, error, success).
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      size = 'md',
      state = 'default',
      fullWidth = false,
      label,
      helperText,
      errorMessage,
      iconLeft,
      placeholder,
      energyFocus = false,
      displayLabel = false,
      disabled,
      className,
      id,
      value,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const selectId = id || `csk-select-${Math.random().toString(36).slice(2, 9)}`;
    const helperId = `${selectId}-helper`;
    const errorId = `${selectId}-error`;

    // Determine which description ID to use
    const descriptionId =
      state === 'error' && errorMessage
        ? errorId
        : helperText
          ? helperId
          : ariaDescribedBy;

    const wrapperClasses = [
      'csk-select-wrapper',
      fullWidth && 'csk-select-wrapper--full-width',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const containerClasses = [
      'csk-select-container',
      `csk-select-container--${size}`,
      `csk-select-container--${state}`,
      disabled && 'csk-select-container--disabled',
      iconLeft && 'csk-select-container--has-icon-left',
      energyFocus && 'csk-select-container--energy',
    ]
      .filter(Boolean)
      .join(' ');

    const labelClasses = [
      'csk-select-label',
      displayLabel && 'csk-select-label--display',
    ]
      .filter(Boolean)
      .join(' ');

    const selectClasses = ['csk-select'].filter(Boolean).join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={selectId} className={labelClasses}>
            {label}
          </label>
        )}

        <div className={containerClasses}>
          {iconLeft && (
            <span className="csk-select-icon csk-select-icon--left" aria-hidden="true">
              {iconLeft}
            </span>
          )}

          <select
            ref={ref}
            id={selectId}
            className={selectClasses}
            disabled={disabled}
            value={value}
            aria-invalid={state === 'error'}
            aria-describedby={descriptionId}
            aria-label={!label ? props['aria-label'] || placeholder : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          <span className="csk-select-chevron" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>

        {state === 'error' && errorMessage ? (
          <span id={errorId} className="csk-select-helper csk-select-helper--error" role="alert">
            {errorMessage}
          </span>
        ) : helperText ? (
          <span id={helperId} className="csk-select-helper">
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';
