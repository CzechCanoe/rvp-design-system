import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Badge, type BadgeVariant } from '../Badge';
import './DeadlineBadge.css';

export type DeadlineKind = 'open' | 'closing' | 'closed' | 'late';

export interface DeadlineBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * `open`: entries are open, `closing`: the deadline is near (warning colour),
   * `closed`: entries are closed, `late`: late entries are accepted until `date`.
   */
  kind: DeadlineKind;
  /** Formatted deadline, e.g. "st 13. 5. 23:59". Under the badge; for `late` it is part of the label. */
  date?: ReactNode;
  /** Badge text computed by the application ("Uzávěrka za 5 dní"). Defaults to a fixed label per kind. */
  label?: ReactNode;
}

export const DEADLINE_LABELS: Record<DeadlineKind, string> = {
  open: 'Přihlášky otevřeny',
  closing: 'Uzávěrka',
  closed: 'Přihlášky uzavřeny',
  late: 'Dohlášky do',
};

const VARIANTS: Record<DeadlineKind, BadgeVariant> = {
  open: 'outline',
  closing: 'warning',
  closed: 'default',
  late: 'default',
};

/**
 * Entry deadline state of a race (reference Kalendar). Pure presentation: the application
 * computes the relative text ("za 5 dní") and passes the formatted date, so the component
 * never reads the time. `closing` uses the warning colour; an expired deadline is `closed`
 * (neutral, not an error). Nothing animates.
 */
export const DeadlineBadge = forwardRef<HTMLSpanElement, DeadlineBadgeProps>(
  ({ kind, date, label, className, ...props }, ref) => {
    const text = label ?? DEADLINE_LABELS[kind];
    const inline = kind === 'late' && label === undefined && date !== undefined;
    return (
      <span
        ref={ref}
        className={['csk-deadline-badge', `csk-deadline-badge--${kind}`, className].filter(Boolean).join(' ')}
        {...props}
      >
        <Badge variant={VARIANTS[kind]}>
          {text}
          {inline ? <> {date}</> : null}
        </Badge>
        {date !== undefined && !inline && <span className="csk-deadline-badge__date">{date}</span>}
      </span>
    );
  }
);

DeadlineBadge.displayName = 'DeadlineBadge';
