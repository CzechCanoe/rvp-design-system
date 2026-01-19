import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './EmptyState.css';

export type EmptyStateSize = 'sm' | 'md' | 'lg';
export type EmptyStateVariant = 'default' | 'card' | 'inline';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Custom icon to display */
  icon?: ReactNode;
  /** Size of the empty state */
  size?: EmptyStateSize;
  /** Visual variant */
  variant?: EmptyStateVariant;
  /** Primary action button/element */
  action?: ReactNode;
  /** Secondary action button/element */
  secondaryAction?: ReactNode;
  /** Custom illustration or image */
  illustration?: ReactNode;
  /** Hide the default icon when no custom icon is provided */
  hideIcon?: boolean;
}

/**
 * EmptyState component for displaying when no data or results are available.
 *
 * Common use cases:
 * - No search results
 * - Empty table/list
 * - No events in calendar
 * - First-time user onboarding
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      title,
      description,
      icon,
      size = 'md',
      variant = 'default',
      action,
      secondaryAction,
      illustration,
      hideIcon = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'csk-empty-state',
      `csk-empty-state--${size}`,
      `csk-empty-state--${variant}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const renderDefaultIcon = () => {
      if (hideIcon || icon || illustration) return null;

      return (
        <div className="csk-empty-state__icon-container">
          <svg
            className="csk-empty-state__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {/* Inbox/folder icon */}
            <path d="M22 12h-6l-2 3h-4l-2-3H2" />
            <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
          </svg>
        </div>
      );
    };

    return (
      <div ref={ref} className={classes} {...props}>
        {illustration && (
          <div className="csk-empty-state__illustration">{illustration}</div>
        )}

        {icon && (
          <div className="csk-empty-state__icon-container">
            <span className="csk-empty-state__icon">{icon}</span>
          </div>
        )}

        {renderDefaultIcon()}

        {(title || description) && (
          <div className="csk-empty-state__content">
            {title && <h3 className="csk-empty-state__title">{title}</h3>}
            {description && (
              <p className="csk-empty-state__description">{description}</p>
            )}
          </div>
        )}

        {children && (
          <div className="csk-empty-state__custom-content">{children}</div>
        )}

        {(action || secondaryAction) && (
          <div className="csk-empty-state__actions">
            {action}
            {secondaryAction}
          </div>
        )}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
