import { forwardRef, type HTMLAttributes } from 'react';
import './PenaltyChip.css';

export type PenaltyChipSize = 'sm' | 'md';

export interface PenaltyChipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Penalty seconds. 0 = clean, 2 = touch, 50 = miss, `null` = not judged (never 0). Team totals are plain numbers. */
  penalty: number | null;
  /** Gate number, used for the accessible name */
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

/** Penalty of one gate (or a team total). Colour is never the only carrier: the value is always shown. */
export const PenaltyChip = forwardRef<HTMLSpanElement, PenaltyChipProps>(
  ({ penalty, gate, upstream = false, size = 'md', className, ...props }, ref) => {
    const tone = penaltyTone(penalty);
    const classes = [
      'csk-penalty-chip',
      `csk-penalty-chip--${tone}`,
      `csk-penalty-chip--${size}`,
      upstream && 'csk-penalty-chip--upstream',
      className,
    ]
      .filter(Boolean)
      .join(' ');
    const what = penalty === null ? 'neposouzeno' : `${penalty} s`;
    const label = `${gate !== undefined ? `Branka ${gate}` : 'Penalizace'}: ${what}${upstream ? ', proti proudu' : ''}`;
    return (
      <span ref={ref} role="img" aria-label={label} className={classes} {...props}>
        <span aria-hidden="true">{penalty === null ? '·' : penalty}</span>
      </span>
    );
  }
);

PenaltyChip.displayName = 'PenaltyChip';
