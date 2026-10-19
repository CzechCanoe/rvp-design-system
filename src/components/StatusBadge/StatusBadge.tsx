import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './StatusBadge.css';

export type StatusBadgeState = 'official' | 'provisional' | 'review' | 'unknown' | 'live' | 'stale';
export type StatusBadgeSize = 'sm' | 'md';

export interface StatusBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** State of the value */
  state: StatusBadgeState;
  /** Size of the badge */
  size?: StatusBadgeSize;
  /** Overrides the default Czech label */
  label?: ReactNode;
}

export const STATUS_BADGE_LABELS: Record<StatusBadgeState, string> = {
  official: 'Oficiální',
  provisional: 'Předběžné',
  review: 'V revizi',
  unknown: 'Neznámo',
  live: 'Live',
  stale: 'Zastaveno',
};

/**
 * State of a value (official, provisional, in review, unknown, live, stale).
 *
 * States never rely on colour alone: the label is always rendered, "provisional"
 * and "review" differ in shape too (filled square vs. outlined italic pill), and
 * "unknown" has a dashed frame. Red is reserved for `live`. The pulsing dot of
 * `live` is the only animation and is disabled by `prefers-reduced-motion`.
 */
export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ state, size = 'md', label, className, ...props }, ref) => {
    const classes = ['csk-status-badge', `csk-status-badge--${state}`, `csk-status-badge--${size}`, className]
      .filter(Boolean)
      .join(' ');
    return (
      <span ref={ref} className={classes} {...props}>
        {state === 'live' && <span className="csk-status-badge__dot" aria-hidden="true" />}
        {label ?? STATUS_BADGE_LABELS[state]}
      </span>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';
