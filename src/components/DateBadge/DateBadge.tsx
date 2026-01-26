import React from 'react';
import './DateBadge.css';

/**
 * DateBadge section color variants
 */
export type DateBadgeSection = 'dv' | 'ry' | 'vt' | 'generic';

/**
 * DateBadge size variants
 */
export type DateBadgeSize = 'sm' | 'md' | 'lg';

/**
 * DateBadge component props
 */
export interface DateBadgeProps {
  /** Date to display (Date object or ISO string) */
  date: Date | string;
  /** Section color variant */
  section?: DateBadgeSection;
  /** Size variant */
  size?: DateBadgeSize;
  /** Locale for month formatting */
  locale?: string;
  /** Additional CSS class names */
  className?: string;
}

/**
 * DateBadge Component
 *
 * Compact date display showing day number and abbreviated month.
 * Used in calendar views, event cards, and list items.
 *
 * @example
 * ```tsx
 * <DateBadge date={new Date()} section="dv" />
 * <DateBadge date="2024-06-15" section="ry" size="lg" />
 * ```
 */
export const DateBadge: React.FC<DateBadgeProps> = ({
  date,
  section = 'generic',
  size = 'md',
  locale = 'cs-CZ',
  className = '',
}) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const day = d.getDate();
  const month = d
    .toLocaleDateString(locale, { month: 'short' })
    .toUpperCase()
    .replace('.', ''); // Remove trailing dot from Czech locale

  const classes = [
    'csk-date-badge',
    `csk-date-badge--${size}`,
    `csk-date-badge--${section}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <span className="csk-date-badge__day">{day}</span>
      <span className="csk-date-badge__month">{month}</span>
    </div>
  );
};
