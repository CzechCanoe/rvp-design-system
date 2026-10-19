import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { Clock } from '../../clock/Clock';
import type { Observed } from '../../types';
import { MarkBadge } from '../MarkBadge';
import { RunningTime } from '../RunningTime';
import { TimeValue } from '../TimeValue';
import type { ObservedNumber, Podium, RunCell } from './types';
import { knownNumber } from './values';
import './cells.css';

/*
 * Row and cell primitives shared by ResultsTable and the other live tables
 * (on-course panel, start list). Each one renders a single value of a row.
 */

// ---------------------------------------------------------------------------
// AthleteName
// ---------------------------------------------------------------------------

export interface AthleteNameProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  name: ReactNode;
  /** Short category tag after the name, e.g. `U16`. */
  categoryTag?: ReactNode;
  /** Second line: club, or state badge + note. Omitted = one line. */
  secondary?: ReactNode;
}

/** Two-line name cell (name + tag, club under it); never wraps, both lines end with an ellipsis. */
export const AthleteName = forwardRef<HTMLDivElement, AthleteNameProps>(
  ({ name, categoryTag, secondary, className, ...props }, ref) => (
    <div ref={ref} className={['csk-athlete-name', className].filter(Boolean).join(' ')} {...props}>
      <span className="csk-athlete-name__primary">
        <span className="csk-athlete-name__name">{name}</span>
        {categoryTag && <span className="csk-athlete-name__tag">{categoryTag}</span>}
      </span>
      {secondary && <span className="csk-athlete-name__secondary">{secondary}</span>}
    </div>
  )
);

AthleteName.displayName = 'AthleteName';

// ---------------------------------------------------------------------------
// RankValue
// ---------------------------------------------------------------------------

export interface RankValueProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  rank: Observed<number>;
  /** Podium place: coloured number. */
  podium?: Podium;
  /** Small line under the rank, e.g. „3. celk.“. */
  sub?: ReactNode;
  /** Screen-reader text when there is no rank (default `bez pořadí`). */
  noRankLabel?: string;
}

/** Rank in the display face; no rank (`not-yet` / `unavailable`) renders as a muted „·“. */
export const RankValue = forwardRef<HTMLSpanElement, RankValueProps>(
  ({ rank, podium, sub, noRankLabel = 'bez pořadí', className, ...props }, ref) => {
    const value = knownNumber(rank);
    const classes = [
      'csk-rank-value',
      value === null && 'csk-rank-value--none',
      value !== null && podium && `csk-rank-value--podium-${podium}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');
    return (
      <span ref={ref} className={classes} data-state={rank.state} {...props}>
        {value === null ? (
          <>
            <span className="csk-rank-value__main" aria-hidden="true">
              ·
            </span>
            <span className="csk-cell-sr">{noRankLabel}</span>
          </>
        ) : (
          <span className="csk-rank-value__main">{value}</span>
        )}
        {sub && <span className="csk-rank-value__sub">{sub}</span>}
      </span>
    );
  }
);

RankValue.displayName = 'RankValue';

// ---------------------------------------------------------------------------
// RunValue
// ---------------------------------------------------------------------------

export interface RunValueProps {
  /** The run slot; `undefined` (missing slot) renders as not known. */
  run: RunCell | undefined;
  /** Clock for a running time (else the nearest `ClockProvider`). */
  clock?: Clock;
}

/**
 * Value of one run slot: the mark instead of the time, a ticking `RunningTime`
 * while on course (frozen and dotted when stale; the age is the page's
 * `DataAge`), else the time (`best` highlighted).
 */
export function RunValue({ run, clock }: RunValueProps) {
  if (!run) return <TimeValue value={null} />;
  if (run.mark) return <MarkBadge mark={run.mark} />;
  if (run.running) {
    return (
      <RunningTime
        elapsedSeconds={run.running.elapsedSeconds}
        receivedAt={run.running.receivedAt}
        staleAfterSeconds={run.running.staleAfterSeconds}
        clock={clock}
        showAge={false}
      />
    );
  }
  return <TimeValue value={run.time} variant={run.best ? 'best' : 'default'} />;
}

// ---------------------------------------------------------------------------
// PenaltyText
// ---------------------------------------------------------------------------

export interface PenaltyTextProps {
  /** Penalty seconds; `undefined` renders nothing, `null` / not known renders „(·)“ (not judged). */
  penalty: ObservedNumber | undefined;
  /** Screen-reader text for a penalty that is not judged yet (default `neposouzeno`). */
  notJudgedLabel?: string;
}

/** Compact penalty after a stacked time: „(2)“; not judged „(·)“, never „(0)“. */
export function PenaltyText({ penalty, notJudgedLabel = 'neposouzeno' }: PenaltyTextProps) {
  if (penalty === undefined) return null;
  const value = knownNumber(penalty);
  if (value === null) {
    return (
      <span className="csk-penalty-text csk-penalty-text--unjudged">
        <span aria-hidden="true">(·)</span>
        <span className="csk-cell-sr">{notJudgedLabel}</span>
      </span>
    );
  }
  return <span className="csk-penalty-text">({value})</span>;
}
