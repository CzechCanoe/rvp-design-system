import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './SummaryCard.css';

export interface SummaryRow {
  label: ReactNode;
  value: ReactNode;
}

export interface SummaryCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Card heading. */
  title?: ReactNode;
  /** Counted rows, e.g. boats, athletes, minors. */
  rows: SummaryRow[];
  /** Highlighted last row under a rule, e.g. the fee total. */
  total?: SummaryRow;
  /** Small print under the card, e.g. payment instructions. */
  note?: ReactNode;
}

/** Summary of an entry (boats, athletes, fee). Figures are given as text by the application. */
export const SummaryCard = forwardRef<HTMLElement, SummaryCardProps>(
  ({ title = 'Souhrn', rows, total, note, className, ...props }, ref) => (
    <section ref={ref} className={['csk-summary-card', className].filter(Boolean).join(' ')} {...props}>
      <h3 className="csk-summary-card__title">{title}</h3>
      <div className="csk-summary-card__body">
        <dl className="csk-summary-card__rows">
          {rows.map((row, i) => (
            <div key={i} className="csk-summary-card__row">
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
          {total && (
            <div className="csk-summary-card__row csk-summary-card__row--total">
              <dt>{total.label}</dt>
              <dd>{total.value}</dd>
            </div>
          )}
        </dl>
        {note && <div className="csk-summary-card__note">{note}</div>}
      </div>
    </section>
  )
);

SummaryCard.displayName = 'SummaryCard';
