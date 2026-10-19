import { forwardRef, type HTMLAttributes } from 'react';
import { PenaltyChip, type PenaltyChipSize } from '../PenaltyChip';
import './GateGrid.css';

export interface GateGridGate {
  gate: number;
  penalty: number | null;
  upstream?: boolean;
}

export interface GateGridProps extends HTMLAttributes<HTMLDivElement> {
  gates: GateGridGate[];
  size?: PenaltyChipSize;
  /** Course configuration is not available */
  unavailable?: boolean;
}

/** Wrapping grid of per-gate penalties. */
export const GateGrid = forwardRef<HTMLDivElement, GateGridProps>(
  ({ gates, size = 'md', unavailable = false, className, ...props }, ref) => {
    const classes = ['csk-gate-grid', `csk-gate-grid--${size}`, className].filter(Boolean).join(' ');
    if (unavailable) {
      return (
        <div ref={ref} className={`${classes} csk-gate-grid--unavailable`} {...props}>
          bez konfigurace tratě
        </div>
      );
    }
    return (
      <div ref={ref} role="group" aria-label="Penalizace na brankách" className={classes} {...props}>
        {gates.map((g) => (
          <PenaltyChip key={g.gate} gate={g.gate} penalty={g.penalty} upstream={g.upstream} size={size} />
        ))}
      </div>
    );
  }
);

GateGrid.displayName = 'GateGrid';
