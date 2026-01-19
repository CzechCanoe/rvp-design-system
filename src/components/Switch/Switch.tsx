import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import './Switch.css';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchState = 'default' | 'error' | 'success';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Size of the switch */
  size?: SwitchSize;
  /** Validation state */
  state?: SwitchState;
  /** Label text */
  label?: ReactNode;
  /** Helper text below switch */
  helperText?: string;
  /** Error message (overrides helperText when state is error) */
  errorMessage?: string;
  /** Position of the label */
  labelPosition?: 'left' | 'right';
}

/**
 * Switch component for toggling between two states (on/off).
 *
 * Supports sizes (sm, md, lg), validation states (default, error, success),
 * and configurable label position.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      size = 'md',
      state = 'default',
      label,
      helperText,
      errorMessage,
      labelPosition = 'right',
      disabled,
      className,
      id,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const switchId = id || `csk-switch-${Math.random().toString(36).slice(2, 9)}`;
    const helperId = `${switchId}-helper`;
    const errorId = `${switchId}-error`;

    // Determine which description ID to use
    const descriptionId =
      state === 'error' && errorMessage
        ? errorId
        : helperText
          ? helperId
          : ariaDescribedBy;

    const wrapperClasses = [
      'csk-switch-wrapper',
      `csk-switch-wrapper--${size}`,
      `csk-switch-wrapper--${state}`,
      `csk-switch-wrapper--label-${labelPosition}`,
      disabled && 'csk-switch-wrapper--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        <label className="csk-switch-label">
          {labelPosition === 'left' && label && <span className="csk-switch-text">{label}</span>}
          <span className="csk-switch-control">
            <input
              ref={ref}
              id={switchId}
              type="checkbox"
              role="switch"
              className="csk-switch"
              disabled={disabled}
              aria-invalid={state === 'error'}
              aria-describedby={descriptionId}
              {...props}
            />
            <span className="csk-switch-track" aria-hidden="true">
              <span className="csk-switch-thumb" />
            </span>
          </span>
          {labelPosition === 'right' && label && <span className="csk-switch-text">{label}</span>}
        </label>

        {state === 'error' && errorMessage ? (
          <span id={errorId} className="csk-switch-helper csk-switch-helper--error" role="alert">
            {errorMessage}
          </span>
        ) : helperText ? (
          <span id={helperId} className="csk-switch-helper">
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
