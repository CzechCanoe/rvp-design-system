import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './RivalsList.css';

export interface RivalsListItem {
  /** Stable key */
  id: string;
  /** Rank in the standings the list is cut from */
  rank: number;
  /** Name; for the viewer's own row the application passes e.g. "Já" */
  name: ReactNode;
  /** Club, short */
  club?: string;
  /** Points in the standings */
  points: number;
  /** The viewer's own row: highlighted, shows absolute points; others show the gap to it */
  self?: boolean;
  /** Link to the rival's profile */
  href?: string;
}

export interface RivalsListLabels {
  /** Unit after points, default "b." */
  unit: string;
  /** Screen-reader prefix for the gap of a rival ahead of the viewer */
  ahead: string;
  /** Screen-reader prefix for the gap of a rival behind the viewer */
  behind: string;
}

export const RIVALS_LIST_LABELS: RivalsListLabels = {
  unit: 'b.',
  ahead: 'před vámi o',
  behind: 'za vámi o',
};

export interface RivalsListProps extends HTMLAttributes<HTMLOListElement> {
  /** Rows in standings order, exactly one with `self` */
  items: RivalsListItem[];
  /** Czech defaults, overridable */
  labels?: Partial<RivalsListLabels>;
}

const MINUS = '−';

/**
 * Rivals from the same birth year with the point gap to the viewer. Gaps are signed
 * (`+40 b.` = ahead of you, `−15 b.` = behind you), so colour is never the only cue.
 * Whether rivals may be listed at all (minors) is decided by the application.
 */
export const RivalsList = forwardRef<HTMLOListElement, RivalsListProps>(
  ({ items, labels, className, ...props }, ref) => {
    const l = { ...RIVALS_LIST_LABELS, ...labels };
    const self = items.find((item) => item.self);

    const gap = (item: RivalsListItem): ReactNode => {
      if (item.self || !self) return `${item.points} ${l.unit}`;
      const diff = item.points - self.points;
      const abs = Math.abs(diff);
      return (
        <>
          <span className="csk-rivals-list__sr">{diff > 0 ? l.ahead : l.behind} </span>
          {diff > 0 ? '+' : diff < 0 ? MINUS : ''}
          {abs} {l.unit}
        </>
      );
    };

    return (
      <ol ref={ref} className={['csk-rivals-list', className].filter(Boolean).join(' ')} {...props}>
        {items.map((item) => {
          const diff = self ? item.points - self.points : 0;
          const name = item.href && !item.self ? <a href={item.href}>{item.name}</a> : item.name;
          return (
            <li
              key={item.id}
              className={['csk-rivals-list__item', item.self && 'csk-rivals-list__item--self']
                .filter(Boolean)
                .join(' ')}
              aria-current={item.self ? 'true' : undefined}
            >
              <span className="csk-rivals-list__rank">{item.rank}.</span>
              <span className="csk-rivals-list__name">{name}</span>
              {item.club && <span className="csk-rivals-list__club">{item.club}</span>}
              <span
                className={[
                  'csk-rivals-list__points',
                  !item.self && diff < 0 && 'csk-rivals-list__points--behind',
                  item.self && 'csk-rivals-list__points--self',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {gap(item)}
              </span>
            </li>
          );
        })}
      </ol>
    );
  }
);

RivalsList.displayName = 'RivalsList';
