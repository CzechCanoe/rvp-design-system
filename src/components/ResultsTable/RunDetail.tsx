import { forwardRef, useMemo, type HTMLAttributes, type ReactNode } from 'react';
import type { Clock } from '../../clock/Clock';
import { Badge } from '../Badge';
import { BibBadge } from '../BibBadge';
import { GateGrid, type GateGridGate } from '../GateGrid';
import { MarkBadge, type Mark } from '../MarkBadge';
import { RunningTime } from '../RunningTime';
import { SkeletonText } from '../Skeleton';
import { StatusBadge, type StatusBadgeState } from '../StatusBadge';
import { TimeValue } from '../TimeValue';
import type { ObservedNumber, ResultsTableDensity, RunningSpec } from './types';
import { knownNumber } from './values';
import './RunDetail.css';

export interface RunDetailRank {
  /** Rank; not known renders as „–“. */
  rank: ObservedNumber;
  /** What the rank is in, e.g. „ve třídě“, „v U16“. */
  label: ReactNode;
  /** Gap to the leader of that ranking, shown in brackets. */
  diff?: ObservedNumber;
}

export interface RunDetailRun {
  /** e.g. „1. jízda“. */
  label: ReactNode;
  /** Raw time in seconds. */
  time: ObservedNumber;
  /** Penalty seconds; `null` = not judged yet (never 0). */
  penalty: ObservedNumber;
  /** Time with penalties. */
  total: ObservedNumber;
  /** Penalties per gate; `'unavailable'` = no course configuration. */
  gates?: GateGridGate[] | 'unavailable';
  /** This run counts: highlighted with a „počítá se“ badge. */
  counts: boolean;
  /** Start time, formatted by the application (e.g. `11:22`). */
  startedAt?: ReactNode;
  /** More header info after the start time, e.g. „14. po 1. jízdě“. */
  meta?: ReactNode;
  /** Footnote under the gates, e.g. which gates are not judged yet. */
  note?: ReactNode;
  /** Result mark of the run, shown instead of the times. */
  mark?: Mark;
  /** Run in progress: a ticking time instead of the raw time. */
  running?: RunningSpec;
}

export interface RunDetailLabels {
  bib: ReactNode;
  time: ReactNode;
  penalty: ReactNode;
  total: ReactNode;
  counts: ReactNode;
  /** Screen-reader text of a penalty that is not judged yet. */
  notJudged: string;
  /** Shown when there are no runs (and not loading). */
  empty: ReactNode;
  /** Screen-reader text while loading. */
  loading: string;
}

export const RUN_DETAIL_LABELS: RunDetailLabels = {
  bib: 'St. č.',
  time: 'Čas',
  penalty: 'Tr.',
  total: 'Celkem',
  counts: 'počítá se',
  notJudged: 'neposouzeno',
  empty: 'Detail není k dispozici',
  loading: 'Načítám detail',
};

export interface RunDetailProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Start number. */
  bib?: number | string;
  /** Ranks shown next to the bib: class + category. */
  ranks?: RunDetailRank[];
  /** Value state of the result. */
  state?: StatusBadgeState;
  /** Runs; mobile one under another, desktop side by side. */
  runs: RunDetailRun[];
  /** Links under the summary (profile, follow…). */
  actions?: ReactNode;
  /** Detail is being loaded lazily: skeleton instead of the runs. */
  loading?: boolean;
  /** Forces the layout; omitted = container query (side by side from 640 px). */
  density?: ResultsTableDensity;
  /** Clock for a running time (else the nearest `ClockProvider`). */
  clock?: Clock;
  labels?: Partial<RunDetailLabels>;
}

function PenaltyValue({ penalty, notJudged }: { penalty: ObservedNumber; notJudged: string }) {
  const value = knownNumber(penalty);
  if (value !== null) return <span className="csk-run-detail__mono">{value}</span>;
  return (
    <span className="csk-run-detail__mono csk-run-detail__unknown">
      <span aria-hidden="true">—</span>
      <span className="csk-run-detail__sr">{notJudged}</span>
    </span>
  );
}

function RunBlock({ run, labels, clock }: { run: RunDetailRun; labels: RunDetailLabels; clock?: Clock }) {
  const classes = ['csk-run-detail__run', run.counts && 'csk-run-detail__run--counts'].filter(Boolean).join(' ');
  const meta = [run.startedAt, run.meta].filter((m) => m !== undefined && m !== null && m !== '');
  return (
    <section className={classes}>
      <div className="csk-run-detail__run-head">
        <span className="csk-run-detail__run-label">{run.label}</span>
        {run.counts && (
          <Badge variant="level" size="sm" className="csk-run-detail__counts">
            {labels.counts}
          </Badge>
        )}
        {meta.length > 0 && (
          <span className="csk-run-detail__run-meta">
            {meta.map((m, i) => (
              <span key={i}>
                {i > 0 && ' · '}
                {m}
              </span>
            ))}
          </span>
        )}
      </div>
      {run.mark ? (
        <div className="csk-run-detail__mark">
          <MarkBadge mark={run.mark} />
        </div>
      ) : (
        <dl className="csk-run-detail__kv">
          <div>
            <dt>{labels.time}</dt>
            <dd>
              {run.running ? (
                <RunningTime
                  elapsedSeconds={run.running.elapsedSeconds}
                  receivedAt={run.running.receivedAt}
                  staleAfterSeconds={run.running.staleAfterSeconds}
                  clock={clock}
                  showAge={false}
                />
              ) : (
                <TimeValue value={run.time} />
              )}
            </dd>
          </div>
          <div>
            <dt>{labels.penalty}</dt>
            <dd>
              <PenaltyValue penalty={run.penalty} notJudged={labels.notJudged} />
            </dd>
          </div>
          <div>
            <dt>{labels.total}</dt>
            <dd>
              <TimeValue value={run.total} variant={run.counts ? 'best' : 'default'} />
            </dd>
          </div>
        </dl>
      )}
      {run.gates &&
        (run.gates === 'unavailable' ? (
          <GateGrid gates={[]} size="sm" unavailable />
        ) : (
          run.gates.length > 0 && <GateGrid gates={run.gates} size="sm" />
        ))}
      {run.note && <p className="csk-run-detail__note">{run.note}</p>}
    </section>
  );
}

/**
 * Content of an expanded results row: bib, ranks (class + category), state
 * and one block per run (time, penalty, total, gates). Runs stack on mobile
 * and sit side by side from 640 px of its own width. Spans the full width,
 * no left indentation.
 */
export const RunDetail = forwardRef<HTMLDivElement, RunDetailProps>(
  (
    { bib, ranks, state, runs, actions, loading = false, density, clock, labels: labelsProp, className, ...props },
    ref
  ) => {
    const labels = useMemo(() => ({ ...RUN_DETAIL_LABELS, ...labelsProp }), [labelsProp]);
    const classes = ['csk-run-detail', density && `csk-run-detail--${density}`, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} aria-busy={loading || undefined} {...props}>
        <div className="csk-run-detail__inner">
          <div className="csk-run-detail__summary">
            {bib !== undefined && (
              <span className="csk-run-detail__bib">
                <span className="csk-run-detail__bib-label">{labels.bib}</span>
                <BibBadge bib={bib} />
              </span>
            )}
            {ranks && ranks.length > 0 && (
              <span className="csk-run-detail__ranks">
                {ranks.map((r, i) => {
                  const rank = knownNumber(r.rank);
                  return (
                    <span key={i} className="csk-run-detail__rank">
                      <b>{rank !== null ? `${rank}.` : '–'}</b> {r.label}
                      {r.diff !== undefined && (
                        <span className="csk-run-detail__rank-diff">
                          {' ('}
                          <TimeValue value={r.diff} sign />
                          {')'}
                        </span>
                      )}
                    </span>
                  );
                })}
              </span>
            )}
            {state && <StatusBadge state={state} className="csk-run-detail__state" />}
          </div>
          <div className="csk-run-detail__runs">
            {loading ? (
              <div className="csk-run-detail__run csk-run-detail__run--loading" role="status">
                <span className="csk-run-detail__sr">{labels.loading}</span>
                <SkeletonText fontSize="xs" width="40%" />
                <SkeletonText fontSize="md" width="70%" />
                <SkeletonText fontSize="sm" width="90%" />
              </div>
            ) : runs.length === 0 ? (
              <p className="csk-run-detail__empty">{labels.empty}</p>
            ) : (
              runs.map((run, i) => <RunBlock key={i} run={run} labels={labels} clock={clock} />)
            )}
          </div>
          {actions && <div className="csk-run-detail__actions">{actions}</div>}
        </div>
      </div>
    );
  }
);

RunDetail.displayName = 'RunDetail';
