import { forwardRef, type HTMLAttributes } from 'react';
import './MarkBadge.css';

export type Mark = 'DNS' | 'DNS-A' | 'DNS-B' | 'DNF' | 'DSQ' | 'NR';

export interface MarkBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Result mark. Rendered instead of a time, never next to it. */
  mark: Mark;
}

export const MARK_DESCRIPTIONS: Record<Mark, string> = {
  DNS: 'Nestartoval',
  'DNS-A': 'Nestartoval, omluven',
  'DNS-B': 'Nestartoval, neomluven',
  DNF: 'Nedokončil',
  DSQ: 'Diskvalifikován',
  NR: 'Bez výsledku',
};

/** Outlined result mark (DNS, DNF, DSQ…) shown in place of a time. */
export const MarkBadge = forwardRef<HTMLSpanElement, MarkBadgeProps>(
  ({ mark, className, title, ...props }, ref) => (
    <span
      ref={ref}
      className={['csk-mark-badge', className].filter(Boolean).join(' ')}
      title={title ?? MARK_DESCRIPTIONS[mark]}
      {...props}
    >
      {mark}
    </span>
  )
);

MarkBadge.displayName = 'MarkBadge';
