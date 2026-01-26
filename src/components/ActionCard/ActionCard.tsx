import React from 'react';
import { Icon } from '../Icon';
import './ActionCard.css';

/**
 * ActionCard icon background variants
 */
export type ActionCardIconBackground =
  | 'primary'
  | 'success'
  | 'warning'
  | 'info'
  | 'energy';

/**
 * ActionCard size variants
 */
export type ActionCardSize = 'sm' | 'md' | 'lg';

/**
 * ActionCard component props
 */
export interface ActionCardProps {
  /** Icon element to display */
  icon: React.ReactNode;
  /** Card title */
  title: string;
  /** Optional description text */
  description?: string;
  /** Link URL (renders as anchor) */
  href?: string;
  /** Click handler (renders as button if no href) */
  onClick?: () => void;
  /** Icon background color variant */
  iconBackground?: ActionCardIconBackground;
  /** Whether to show the arrow indicator */
  showArrow?: boolean;
  /** Size variant */
  size?: ActionCardSize;
  /** Additional CSS class names */
  className?: string;
  /** Open link in new tab */
  target?: '_blank' | '_self';
}

/**
 * ActionCard Component
 *
 * Interactive card with icon, title, description, and hover arrow animation.
 * Used for navigation actions, quick links, and call-to-action items.
 *
 * @example
 * ```tsx
 * <ActionCard
 *   icon={<Icon name="user-plus" />}
 *   title="Add Member"
 *   description="Register a new athlete"
 *   href="/members/add"
 * />
 * ```
 */
export const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  title,
  description,
  href,
  onClick,
  iconBackground = 'primary',
  showArrow = true,
  size = 'md',
  className = '',
  target,
}) => {
  const classes = [
    'csk-action-card',
    `csk-action-card--${size}`,
    `csk-action-card--icon-${iconBackground}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <div className="csk-action-card__icon">{icon}</div>
      <div className="csk-action-card__content">
        <span className="csk-action-card__title">{title}</span>
        {description && (
          <span className="csk-action-card__description">{description}</span>
        )}
      </div>
      {showArrow && (
        <div className="csk-action-card__arrow">
          <Icon name="arrow-right" size="sm" />
        </div>
      )}
    </>
  );

  // Render as link if href is provided
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  // Render as button if onClick is provided
  if (onClick) {
    return (
      <button type="button" className={classes} onClick={onClick}>
        {content}
      </button>
    );
  }

  // Render as div if neither (static display)
  return <div className={classes}>{content}</div>;
};
