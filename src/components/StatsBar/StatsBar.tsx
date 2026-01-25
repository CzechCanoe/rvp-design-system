import { type ReactNode, type HTMLAttributes } from 'react';
import { Icon, type IconName } from '../Icon';
import './StatsBar.css';

export interface StatsBarItem {
  /** Unique key for the item */
  key: string;
  /** The stat value (number or string) */
  value: ReactNode;
  /** Label describing the stat */
  label: string;
  /** Optional icon name */
  icon?: IconName;
  /** Optional custom icon element (overrides icon prop) */
  iconElement?: ReactNode;
}

export type StatsBarVariant = 'inline' | 'cards' | 'compact' | 'floating';
export type StatsBarSize = 'sm' | 'md' | 'lg';

export interface StatsBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of stat items to display */
  items: StatsBarItem[];
  /** Visual variant */
  variant?: StatsBarVariant;
  /** Size variant */
  size?: StatsBarSize;
  /** Show dividers between items (only for inline variant) */
  dividers?: boolean;
  /** Center align the stats */
  centered?: boolean;
}

/**
 * StatsBar component for displaying a row of statistics.
 *
 * Variants:
 * - inline: Horizontal row with optional dividers
 * - cards: Each stat in a mini card
 * - compact: Minimal styling, icon + value inline
 * - floating: Aesthetic floating cards with shadows and border-accent
 */
export function StatsBar({
  items,
  variant = 'inline',
  size = 'md',
  dividers = false,
  centered = false,
  className,
  ...props
}: StatsBarProps) {
  const classes = [
    'csk-stats-bar',
    `csk-stats-bar--${variant}`,
    `csk-stats-bar--${size}`,
    dividers && 'csk-stats-bar--dividers',
    centered && 'csk-stats-bar--centered',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {items.map((item) => (
        <div key={item.key} className="csk-stats-bar__item">
          {(item.icon || item.iconElement) && (
            <span className="csk-stats-bar__icon">
              {item.iconElement || (item.icon && <Icon name={item.icon} />)}
            </span>
          )}
          <span className="csk-stats-bar__value">{item.value}</span>
          <span className="csk-stats-bar__label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

StatsBar.displayName = 'StatsBar';
