import { forwardRef, type HTMLAttributes } from 'react';
import './PenaltyChip.css';

export type PenaltyChipSize = 'sm' | 'md';

export interface PenaltyChipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Penalty seconds. 0 = clean, 2 = touch, 50 = miss, `null` = not judged (never 0). Team totals are plain numbers. */
  penalty: number | null;
  /**
   * Gate number. With a gate the chip shows the **gate number** and the colour
   * carries the penalty (grey 0, amber 2, red 50, dotted frame = not judged);
   * the penalty itself is in `title` and `aria-label` („Branka 3: 2 s“).
   * Without a gate (a run's penalty sum in a results cell, team totals) the chip
   * shows the penalty value.
   */
  gate?: number;
  /** Gate negotiated upstream (italic + underline) */
  upstream?: boolean;
  size?: PenaltyChipSize;
}

export function penaltyTone(penalty: number | null): 'unjudged' | 'clean' | 'touch' | 'miss' {
  if (penalty === null) return 'unjudged';
  if (penalty === 0) return 'clean';
  return penalty >= 50 ? 'miss' : 'touch';
}

/** Czech description of a penalty: „Branka 3: 2 s, proti proudu“, „Penalizace: neposouzeno“. */
function penaltyLabel(penalty: number | null, gate?: number, upstream = false): string {
  const what = penalty === null ? 'neposouzeno' : `${penalty} s`;
  return `${gate !== undefined ? `Branka ${gate}` : 'Penalizace'}: ${what}${upstream ? ', proti proudu' : ''}`;
}

/**
 * Penalty of one gate (or a run's penalty sum / a team total).
 *
 * With `gate`: the gate number on a penalty-coloured chip (reference Live1 `.pen`),
 * so a row of gates reads as gates, not as „0 0 2 0“. Without `gate`: the value.
 * Colour is never the only carrier: the penalty is always in `title` and
 * `aria-label`, and a not-judged gate differs in shape (dotted frame).
 */
export const PenaltyChip = forwardRef<HTMLSpanElement, PenaltyChipProps>(
  ({ penalty, gate, upstream = false, size = 'md', className, title, ...props }, ref) => {
    const tone = penaltyTone(penalty);
    const classes = [
      'csk-penalty-chip',
      `csk-penalty-chip--${tone}`,
      `csk-penalty-chip--${size}`,
      gate !== undefined && 'csk-penalty-chip--gate',
      upstream && 'csk-penalty-chip--upstream',
      className,
    ]
      .filter(Boolean)
      .join(' ');
    const label = penaltyLabel(penalty, gate, upstream);
    const text = gate !== undefined ? gate : penalty === null ? '·' : penalty;
    return (
      <span ref={ref} role="img" aria-label={label} title={title ?? label} className={classes} {...props}>
        <span aria-hidden="true">{text}</span>
      </span>
    );
  }
);

PenaltyChip.displayName = 'PenaltyChip';
