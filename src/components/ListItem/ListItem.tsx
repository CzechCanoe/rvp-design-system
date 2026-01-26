import React from 'react';
import './ListItem.css';

// ============================================================================
// Types
// ============================================================================

export type ListItemType = 'default' | 'warning' | 'danger' | 'info' | 'success' | 'energy';
export type ListItemVariant = 'default' | 'alert' | 'activity' | 'feed';

export interface ListItemProps {
  /** Icon element to display */
  icon?: React.ReactNode;
  /** Color type for the icon container */
  type?: ListItemType;
  /** Style variant */
  variant?: ListItemVariant;
  /** Main title text */
  title: string;
  /** Description or subtitle */
  description?: React.ReactNode;
  /** Timestamp text (e.g., "2 hours ago") */
  timestamp?: string;
  /** Action element (button, link) */
  action?: React.ReactNode;
  /** Show bottom border divider */
  divider?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Link URL */
  href?: string;
  /** Additional CSS class */
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

/**
 * ListItem displays a single item in a list with an icon, title, and optional
 * description, timestamp, and action. Used for alerts, activity feeds, and
 * notification lists.
 *
 * Features:
 * - Icon container with gradient background based on type
 * - Alert variant with left border accent
 * - Activity/feed variants with timestamp support
 * - Hover effects for interactive items
 * - Divider support for stacked lists
 *
 * @example
 * ```tsx
 * // Alert with warning type
 * <ListItem
 *   icon={<AlertCircle />}
 *   type="warning"
 *   variant="alert"
 *   title="License expiring soon"
 *   description="Your annual license expires in 30 days"
 *   action={<Button size="sm">Renew</Button>}
 * />
 *
 * // Activity feed item
 * <ListItem
 *   icon={<User />}
 *   variant="activity"
 *   title="Jan Novák registered for competition"
 *   timestamp="2 hours ago"
 *   onClick={() => navigate('/athlete/123')}
 * />
 * ```
 */
export const ListItem: React.FC<ListItemProps> = ({
  icon,
  type = 'default',
  variant = 'default',
  title,
  description,
  timestamp,
  action,
  divider = false,
  onClick,
  href,
  className = '',
}) => {
  const isClickable = !!onClick || !!href;

  const itemClasses = [
    'csk-list-item',
    `csk-list-item--${variant}`,
    `csk-list-item--type-${type}`,
    divider && 'csk-list-item--divider',
    isClickable && 'csk-list-item--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {/* Icon container */}
      {icon && (
        <div className="csk-list-item__icon">
          {icon}
        </div>
      )}

      {/* Main content */}
      <div className="csk-list-item__content">
        <div className="csk-list-item__header">
          <span className="csk-list-item__title">{title}</span>
          {timestamp && (
            <span className="csk-list-item__timestamp">{timestamp}</span>
          )}
        </div>
        {description && (
          <div className="csk-list-item__description">{description}</div>
        )}
      </div>

      {/* Action slot */}
      {action && (
        <div className="csk-list-item__action">
          {action}
        </div>
      )}
    </>
  );

  // Render as link, button, or div based on props
  if (href) {
    return (
      <a href={href} className={itemClasses}>
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" className={itemClasses} onClick={onClick}>
        {content}
      </button>
    );
  }

  return <div className={itemClasses}>{content}</div>;
};

export default ListItem;
