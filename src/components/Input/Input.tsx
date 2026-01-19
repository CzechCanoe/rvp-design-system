import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import './Input.css';

export type InputType = 'text' | 'password' | 'email' | 'search' | 'number' | 'tel' | 'url';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputState = 'default' | 'error' | 'success';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input type */
  type?: InputType;
  /** Size of the input */
  size?: InputSize;
  /** Validation state */
  state?: InputState;
  /** Full width input */
  fullWidth?: boolean;
  /** Label text */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message (overrides helperText when state is error) */
  errorMessage?: string;
  /** Icon to display at the start of the input */
  iconLeft?: ReactNode;
  /** Icon to display at the end of the input */
  iconRight?: ReactNode;
  /** Clear button (for search inputs) */
  clearable?: boolean;
  /** Callback when clear button is clicked */
  onClear?: () => void;
}

/**
 * Input component for text entry.
 *
 * Supports multiple types (text, password, email, search, number, tel, url),
 * sizes (sm, md, lg), and validation states (default, error, success).
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      size = 'md',
      state = 'default',
      fullWidth = false,
      label,
      helperText,
      errorMessage,
      iconLeft,
      iconRight,
      clearable = false,
      onClear,
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
    const inputId = id || `csk-input-${Math.random().toString(36).slice(2, 9)}`;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    // Determine which description ID to use
    const descriptionId =
      state === 'error' && errorMessage
        ? errorId
        : helperText
          ? helperId
          : ariaDescribedBy;

    // Show clear button only if clearable, has value, and not disabled
    const showClearButton = clearable && value && !disabled;

    const wrapperClasses = [
      'csk-input-wrapper',
      fullWidth && 'csk-input-wrapper--full-width',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const containerClasses = [
      'csk-input-container',
      `csk-input-container--${size}`,
      `csk-input-container--${state}`,
      disabled && 'csk-input-container--disabled',
      iconLeft && 'csk-input-container--has-icon-left',
      (iconRight || showClearButton) && 'csk-input-container--has-icon-right',
    ]
      .filter(Boolean)
      .join(' ');

    const inputClasses = ['csk-input'].filter(Boolean).join(' ');

    const handleClear = () => {
      onClear?.();
    };

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className="csk-input-label">
            {label}
          </label>
        )}

        <div className={containerClasses}>
          {iconLeft && (
            <span className="csk-input-icon csk-input-icon--left" aria-hidden="true">
              {iconLeft}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            className={inputClasses}
            disabled={disabled}
            value={value}
            aria-invalid={state === 'error'}
            aria-describedby={descriptionId}
            {...props}
          />

          {showClearButton && (
            <button
              type="button"
              className="csk-input-clear"
              onClick={handleClear}
              aria-label="Clear input"
              tabIndex={-1}
            >
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
            </button>
          )}

          {iconRight && !showClearButton && (
            <span className="csk-input-icon csk-input-icon--right" aria-hidden="true">
              {iconRight}
            </span>
          )}
        </div>

        {state === 'error' && errorMessage ? (
          <span id={errorId} className="csk-input-helper csk-input-helper--error" role="alert">
            {errorMessage}
          </span>
        ) : helperText ? (
          <span id={helperId} className="csk-input-helper">
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
