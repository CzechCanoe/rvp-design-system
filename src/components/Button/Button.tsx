import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Full width button */
  fullWidth?: boolean;
  /** Icon to display before the label */
  iconLeft?: ReactNode;
  /** Icon to display after the label */
  iconRight?: ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Children content */
  children?: ReactNode;
}

/**
 * Button component for user actions.
 *
 * Supports multiple variants (primary, secondary, ghost, danger),
 * sizes (sm, md, lg), and states (disabled, loading).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      iconLeft,
      iconRight,
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const classes = [
      'csk-button',
      `csk-button--${variant}`,
      `csk-button--${size}`,
      fullWidth && 'csk-button--full-width',
      loading && 'csk-button--loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <span className="csk-button__spinner" aria-hidden="true">
            <svg
              className="csk-button__spinner-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="31.4 31.4"
              />
            </svg>
          </span>
        )}
        {!loading && iconLeft && (
          <span className="csk-button__icon csk-button__icon--left" aria-hidden="true">
            {iconLeft}
          </span>
        )}
        {children && <span className="csk-button__label">{children}</span>}
        {!loading && iconRight && (
          <span className="csk-button__icon csk-button__icon--right" aria-hidden="true">
            {iconRight}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
