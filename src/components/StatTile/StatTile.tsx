import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './StatTile.css';

export interface StatTileProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  value: ReactNode;
  /** Small explanatory line under the value */
  hint?: ReactNode;
  /** Change indicator, e.g. "▲2" */
  delta?: ReactNode;
}

/** Number tile: label, big value, optional hint and delta. */
export const StatTile = forwardRef<HTMLDivElement, StatTileProps>(
  ({ label, value, hint, delta, className, ...props }, ref) => (
    <div ref={ref} className={['csk-stat-tile', className].filter(Boolean).join(' ')} {...props}>
      <div className="csk-stat-tile__label">{label}</div>
      <div className="csk-stat-tile__main">
        <span className="csk-stat-tile__value">{value}</span>
        {delta && <span className="csk-stat-tile__delta">{delta}</span>}
      </div>
      {hint && <div className="csk-stat-tile__hint">{hint}</div>}
    </div>
  )
);

StatTile.displayName = 'StatTile';
