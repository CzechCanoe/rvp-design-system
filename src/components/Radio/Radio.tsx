import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import './Radio.css';

export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioState = 'default' | 'error' | 'success';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Size of the radio button */
  size?: RadioSize;
  /** Validation state */
  state?: RadioState;
  /** Label text */
  label?: ReactNode;
  /** Helper text below radio */
  helperText?: string;
  /** Error message (overrides helperText when state is error) */
  errorMessage?: string;
}

/**
 * Radio component for single selection from a group.
 *
 * Supports sizes (sm, md, lg) and validation states (default, error, success).
 * Use within a RadioGroup or with the same `name` prop to create exclusive selection.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      size = 'md',
      state = 'default',
      label,
      helperText,
      errorMessage,
      disabled,
      className,
      id,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const radioId = id || `csk-radio-${Math.random().toString(36).slice(2, 9)}`;
    const helperId = `${radioId}-helper`;
    const errorId = `${radioId}-error`;

    // Determine which description ID to use
    const descriptionId =
      state === 'error' && errorMessage
        ? errorId
        : helperText
          ? helperId
          : ariaDescribedBy;

    const wrapperClasses = [
      'csk-radio-wrapper',
      `csk-radio-wrapper--${size}`,
      `csk-radio-wrapper--${state}`,
      disabled && 'csk-radio-wrapper--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        <label className="csk-radio-label">
          <span className="csk-radio-control">
            <input
              ref={ref}
              id={radioId}
              type="radio"
              className="csk-radio"
              disabled={disabled}
              aria-invalid={state === 'error'}
              aria-describedby={descriptionId}
              {...props}
            />
            <span className="csk-radio-circle" aria-hidden="true">
              <span className="csk-radio-dot" />
            </span>
          </span>
          {label && <span className="csk-radio-text">{label}</span>}
        </label>

        {state === 'error' && errorMessage ? (
          <span id={errorId} className="csk-radio-helper csk-radio-helper--error" role="alert">
            {errorMessage}
          </span>
        ) : helperText ? (
          <span id={helperId} className="csk-radio-helper">
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
