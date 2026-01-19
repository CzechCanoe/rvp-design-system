import { forwardRef, type InputHTMLAttributes, type ReactNode, useEffect, useRef } from 'react';
import './Checkbox.css';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxState = 'default' | 'error' | 'success';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Size of the checkbox */
  size?: CheckboxSize;
  /** Validation state */
  state?: CheckboxState;
  /** Indeterminate state (partially checked) */
  indeterminate?: boolean;
  /** Label text */
  label?: ReactNode;
  /** Helper text below checkbox */
  helperText?: string;
  /** Error message (overrides helperText when state is error) */
  errorMessage?: string;
}

/**
 * Checkbox component for boolean selections.
 *
 * Supports sizes (sm, md, lg), validation states (default, error, success),
 * and indeterminate state for partial selections.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = 'md',
      state = 'default',
      indeterminate = false,
      label,
      helperText,
      errorMessage,
      disabled,
      className,
      id,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    forwardedRef
  ) => {
    // Internal ref for indeterminate state
    const internalRef = useRef<HTMLInputElement | null>(null);

    // Handle both forwarded ref and internal ref
    const setRefs = (element: HTMLInputElement | null) => {
      // Set internal ref
      internalRef.current = element;

      // Set forwarded ref
      if (typeof forwardedRef === 'function') {
        forwardedRef(element);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = element;
      }
    };

    // Set indeterminate state (can only be set via JavaScript)
    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    // Generate unique ID if not provided
    const checkboxId = id || `csk-checkbox-${Math.random().toString(36).slice(2, 9)}`;
    const helperId = `${checkboxId}-helper`;
    const errorId = `${checkboxId}-error`;

    // Determine which description ID to use
    const descriptionId =
      state === 'error' && errorMessage
        ? errorId
        : helperText
          ? helperId
          : ariaDescribedBy;

    const wrapperClasses = [
      'csk-checkbox-wrapper',
      `csk-checkbox-wrapper--${size}`,
      `csk-checkbox-wrapper--${state}`,
      disabled && 'csk-checkbox-wrapper--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const checkboxClasses = [
      'csk-checkbox',
      indeterminate && 'csk-checkbox--indeterminate',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        <label className="csk-checkbox-label">
          <span className="csk-checkbox-control">
            <input
              ref={setRefs}
              id={checkboxId}
              type="checkbox"
              className={checkboxClasses}
              disabled={disabled}
              aria-invalid={state === 'error'}
              aria-describedby={descriptionId}
              {...props}
            />
            <span className="csk-checkbox-box" aria-hidden="true">
              {/* Check icon */}
              <svg
                className="csk-checkbox-icon csk-checkbox-icon--check"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12l5 5L20 7" />
              </svg>
              {/* Indeterminate icon */}
              <svg
                className="csk-checkbox-icon csk-checkbox-icon--indeterminate"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
              </svg>
            </span>
          </span>
          {label && <span className="csk-checkbox-text">{label}</span>}
        </label>

        {state === 'error' && errorMessage ? (
          <span id={errorId} className="csk-checkbox-helper csk-checkbox-helper--error" role="alert">
            {errorMessage}
          </span>
        ) : helperText ? (
          <span id={helperId} className="csk-checkbox-helper">
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
