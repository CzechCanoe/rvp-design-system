import { type ReactNode, type HTMLAttributes } from 'react';
import './SectionHeader.css';

export type SectionHeaderSize = 'sm' | 'md' | 'lg';

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title: string;
  /** Optional badge/count to show next to title */
  badge?: ReactNode;
  /** Optional description below the title */
  description?: string;
  /** Optional action element (button, link, etc.) */
  action?: ReactNode;
  /** Size variant */
  size?: SectionHeaderSize;
  /** Add bottom border */
  bordered?: boolean;
}

/**
 * SectionHeader component for consistent section headers with optional actions.
 *
 * Used throughout the design system for section titles in cards, pages, and modals.
 */
export function SectionHeader({
  title,
  badge,
  description,
  action,
  size = 'md',
  bordered = false,
  className,
  ...props
}: SectionHeaderProps) {
  const classes = [
    'csk-section-header',
    `csk-section-header--${size}`,
    bordered && 'csk-section-header--bordered',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const TitleTag = size === 'lg' ? 'h2' : size === 'sm' ? 'h4' : 'h3';

  return (
    <div className={classes} {...props}>
      <div className="csk-section-header__content">
        <TitleTag className="csk-section-header__title">
          {title}
          {badge && <span className="csk-section-header__badge">{badge}</span>}
        </TitleTag>
        {description && (
          <p className="csk-section-header__description">{description}</p>
        )}
      </div>
      {action && <div className="csk-section-header__action">{action}</div>}
    </div>
  );
}

SectionHeader.displayName = 'SectionHeader';
