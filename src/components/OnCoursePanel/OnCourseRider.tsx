import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { Clock } from '../../clock/Clock';
import { BibBadge } from '../BibBadge';
import { GateGrid, type GateGridGate } from '../GateGrid';
import { RunningTime } from '../RunningTime';
import { TimeValue } from '../TimeValue';
import { AthleteName, PenaltyText } from '../ResultsTable';
import type { ObservedNumber, RunningSpec } from '../ResultsTable';
import './OnCourseRider.css';

export type OnCourseRiderStatus = 'at-start' | 'running' | 'finished-pending';

/** Time the rider has to beat: a target to undercut, or the current gap to it. */
export interface OnCourseTimeToBeat {
  /** `target`: the time to beat; `delta`: signed gap in seconds to the time to beat (− = ahead). */
  mode: 'target' | 'delta';
  value: number;
  /** Who holds the time to beat, e.g. `HNILICA`. */
  holder: string;
}

/** Texts of a rider. Czech defaults; every one can be overridden via `labels`. */
export interface OnCourseRiderLabels {
  atStart: string;
  finishedPending: string;
  toLeader: string;
  /** Prefix of the age of a frozen running time (default `zastaveno`). */
  stopped: string;
  target: string;
  /** Text between a `delta` time to beat and its holder (default `k času`). */
  deltaTo: string;
  split: string;
  /** Short for „penalty seconds“ after a running or finished time (default `tr.`). */
  penalty: string;
}

export const ON_COURSE_RIDER_LABELS: OnCourseRiderLabels = {
  atStart: 'na startu',
  finishedPending: 'v cíli · čeká na výsledek',
  toLeader: 'na vedení',
  stopped: 'zastaveno',
  target: 'k překonání',
  deltaTo: 'k času',
  split: 'split',
  penalty: 'tr.',
};

export interface OnCourseRiderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  bib: number | string;
  name: string;
  /** Short category tag after the name, e.g. `U16`. */
  categoryTag?: string;
  /** Second line while on course (club, previous run…). The start and the finish replace it with their status text. */
  secondary?: ReactNode;
  status: OnCourseRiderStatus;
  /**
   * `running`: the delivered running time (ticks through the `Clock`, freezes 3 s after receipt).
   * Other statuses do not use it.
   */
  time?: RunningSpec;
  /**
   * `running`: penalty seconds so far, as delivered (contract `outcome.penaltySeconds`
   * of a running outcome), shown as „+2 tr.“ next to the split; a value not known
   * yet reads „(·) tr.“, never „+0 tr.“. Omitted = nothing shown (the application
   * decides whether a clean 0 is worth showing). Other statuses do not use it.
   */
  penalty?: ObservedNumber;
  /** `finished-pending`: finish time and penalties, not settled yet. */
  finish?: { time: ObservedNumber; penalty?: ObservedNumber };
  /** Per-gate penalties; gates not passed yet are `penalty: null`. */
  gates?: GateGridGate[];
  /** Number of the last split passed (`split 2`). */
  split?: number;
  /** Gap to the leader in seconds, signed (− = ahead). */
  toLeader?: number;
  timeToBeat?: OnCourseTimeToBeat;
  /** The rider the page follows: a brand stripe and a semibold name. */
  featured?: boolean;
  /** No fresh data: everything on the rider is frozen (the panel passes this on). */
  stale?: boolean;
  clock?: Clock;
  labels?: Partial<OnCourseRiderLabels>;
}

/** „+2 tr.“; a penalty not judged yet reads „(·) tr.“, never „+0 tr.“. */
function penaltyLabel(penalty: ObservedNumber, unit: string): ReactNode {
  const value = typeof penalty === 'number' ? penalty : penalty && penalty.state === 'known' ? penalty.value : null;
  if (value === null || !Number.isFinite(value)) {
    return (
      <>
        <PenaltyText penalty={null} /> {unit}
      </>
    );
  }
  return `+${value} ${unit}`;
}

/**
 * One athlete in the on-course panel: bib, name, running time (or the finish
 * waiting for the result), penalty so far, split, gap, time to beat and the
 * gate penalties.
 */
export const OnCourseRider = forwardRef<HTMLDivElement, OnCourseRiderProps>(
  (
    {
      bib,
      name,
      categoryTag,
      secondary,
      status,
      time,
      penalty,
      finish,
      gates,
      split,
      toLeader,
      timeToBeat,
      featured = false,
      stale = false,
      clock,
      labels: labelsProp,
      className,
      ...props
    },
    ref
  ) => {
    const labels = { ...ON_COURSE_RIDER_LABELS, ...labelsProp };
    const classes = [
      'csk-oncourse-rider',
      `csk-oncourse-rider--${status}`,
      featured && 'csk-oncourse-rider--featured',
      stale && 'csk-oncourse-rider--stale',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const line2 =
      status === 'at-start' ? labels.atStart : status === 'finished-pending' ? labels.finishedPending : secondary;

    let timeNode: ReactNode;
    if (status === 'running' && time) {
      timeNode = (
        <RunningTime
          elapsedSeconds={time.elapsedSeconds}
          receivedAt={time.receivedAt}
          staleAfterSeconds={time.staleAfterSeconds}
          clock={clock}
          ageLabel={labels.stopped}
        />
      );
    } else if (status === 'finished-pending') {
      timeNode = <TimeValue value={finish?.time ?? null} variant="stale" />;
    } else {
      timeNode = (
        <TimeValue
          value={status === 'at-start' ? 0 : null}
          precision={1}
          variant={stale ? 'stale' : 'muted'}
        />
      );
    }

    const subs: ReactNode[] = [];
    // Penalty so far (running) or of the finish (finished-pending), in the same shape: „+2 tr.“ / „(·) tr.“
    const shownPenalty =
      status === 'running' ? penalty : status === 'finished-pending' ? finish?.penalty : undefined;
    if (shownPenalty !== undefined) {
      subs.push(<span key="pen">{penaltyLabel(shownPenalty, labels.penalty)}</span>);
    }
    if (status === 'running' && (split !== undefined || toLeader !== undefined)) {
      subs.push(
        <span key="lead">
          {split !== undefined && `${labels.split} ${split}`}
          {split !== undefined && toLeader !== undefined && ' · '}
          {toLeader !== undefined && (
            <>
              <TimeValue
                className={toLeader < 0 && !stale ? 'csk-oncourse-rider__ahead' : undefined}
                value={toLeader}
                sign
                variant="muted"
              />{' '}
              {labels.toLeader}
            </>
          )}
        </span>
      );
    }
    if (timeToBeat && status !== 'at-start') {
      subs.push(
        <span key="ttb">
          {timeToBeat.mode === 'target' ? (
            <>
              {labels.target} <TimeValue value={timeToBeat.value} variant="muted" /> · {timeToBeat.holder}
            </>
          ) : (
            <>
              <TimeValue value={timeToBeat.value} sign variant="muted" /> {labels.deltaTo} {timeToBeat.holder}
            </>
          )}
        </span>
      );
    }

    const showGates = gates && gates.length > 0 && status !== 'at-start';

    return (
      <div ref={ref} className={classes} data-status={status} {...props}>
        <div className="csk-oncourse-rider__head">
          <BibBadge bib={bib} />
          <AthleteName
            className="csk-oncourse-rider__name"
            name={name}
            categoryTag={categoryTag}
            secondary={line2}
          />
          <div className="csk-oncourse-rider__result">
            <span className="csk-oncourse-rider__time">{timeNode}</span>
          </div>
        </div>
        {subs.length > 0 && <div className="csk-oncourse-rider__subs">{subs}</div>}
        {showGates && <GateGrid className="csk-oncourse-rider__gates" gates={gates} size="sm" />}
      </div>
    );
  }
);

OnCourseRider.displayName = 'OnCourseRider';
