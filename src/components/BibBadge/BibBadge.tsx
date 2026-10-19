import { forwardRef, type HTMLAttributes } from 'react';
import './BibBadge.css';

export interface BibBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Start number */
  bib: number | string;
}

/** Start number in a monospaced frame (20 px high). */
export const BibBadge = forwardRef<HTMLSpanElement, BibBadgeProps>(({ bib, className, ...props }, ref) => (
  <span ref={ref} className={['csk-bib-badge', className].filter(Boolean).join(' ')} {...props}>
    {bib}
  </span>
));

BibBadge.displayName = 'BibBadge';
