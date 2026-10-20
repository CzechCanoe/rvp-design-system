import { forwardRef, type HTMLAttributes } from 'react';
import './MarkBadge.css';

/**
 * Result marks. Besides DNS / DNF / DSQ / NR the full upstream vocabulary of the
 * c123 contract (`AttemptStatus`, c123-server `CONTRACTS.md` §2.6, `DERIVATIONS.md` §4.1):
 * - `CAP` capsized (slalom);
 * - `RAL` ranked as last: the athlete keeps a placement (the last one), so a row
 *   with `RAL` goes with `rank: known` in `ResultsTable`;
 * - `DSQ-R` disqualified in the run, `DQB` disqualified for unsportsmanlike
 *   behaviour: two disqualifications distinct from `DSQ`.
 * The application maps the contract's lowercase statuses (`cap`, `ral`, `dsq-r`, `dqb`) to these.
 */
export type Mark = 'DNS' | 'DNS-A' | 'DNS-B' | 'DNF' | 'DSQ' | 'DSQ-R' | 'DQB' | 'CAP' | 'RAL' | 'NR';

export interface MarkBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Result mark. Rendered instead of a time, never next to it. */
  mark: Mark;
}

// Czech description of each mark, used as the default `title`.
export const MARK_DESCRIPTIONS: Record<Mark, string> = {
  DNS: 'Nestartoval',
  'DNS-A': 'Nestartoval, omluven',
  'DNS-B': 'Nestartoval, neomluven',
  DNF: 'Nedokončil',
  DSQ: 'Diskvalifikován',
  'DSQ-R': 'Diskvalifikován v jízdě',
  DQB: 'Diskvalifikován za nesportovní chování',
  CAP: 'Převrhl se',
  RAL: 'Zařazen na poslední místo',
  NR: 'Bez výsledku',
};

/** Outlined result mark (DNS, DNF, DSQ, CAP…) shown in place of a time; all marks share one shape. */
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
