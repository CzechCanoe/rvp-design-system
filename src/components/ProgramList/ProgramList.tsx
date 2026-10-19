import { Fragment, forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import { StatusBadge, type StatusBadgeState } from '../StatusBadge';
import './ProgramList.css';

/** One phase of the programme. */
export interface ProgramItem {
  /** Stable key within the day. */
  id?: string | number;
  /** Scheduled time as formatted by the application (e.g. `13:30`). */
  time: ReactNode;
  /** Phase title, e.g. `C1 ženy`. */
  title: ReactNode;
  /** Second line, e.g. `2. jízda`. */
  subtitle?: ReactNode;
  /** Results state of the phase (`official`, `provisional`, `unknown` = waiting…). Ignored while `running`. */
  state?: StatusBadgeState;
  /** Overrides the default label of the state badge (e.g. „čeká“ for `unknown`). */
  stateLabel?: ReactNode;
  /** Athletes finished / total, appended to the subtitle („9 z 14 v cíli“). */
  progress?: { done: number; total: number };
  /** Short remark after the subtitle (e.g. „předběhli rozpis o 40 min“). */
  note?: ReactNode;
  /** Link to the phase; the whole row becomes clickable. */
  href?: string;
  /** The phase is running now: Live badge and live ground. Several items can run at once. */
  running?: boolean;
  /** Shown muted (e.g. a phase that does not count for the audience). */
  muted?: boolean;
}

export interface ProgramDay {
  /** Day heading, e.g. `Neděle 4. 10.`. */
  label: ReactNode;
  /** Remark next to the heading, e.g. „časy podle rozpisu, skutečné se liší“. */
  note?: ReactNode;
  items: ProgramItem[];
}

export interface ProgramListLabels {
  /** Badge text of a running item. */
  live: string;
  /** „9 z 14 v cíli“ */
  progress: (done: number, total: number) => string;
  /** Accessible name of the whole list. */
  list: string;
}

export const PROGRAM_LIST_LABELS: ProgramListLabels = {
  live: 'Live',
  progress: (done, total) => `${done} z ${total} v cíli`,
  list: 'Program',
};

export interface ProgramListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Days of the programme in display order. */
  days: ProgramDay[];
  /** Overrides of the Czech texts. */
  labels?: Partial<ProgramListLabels>;
  /** Heading level of the day headings (default 3). */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

/**
 * Event programme: one block per day, one row per phase (time · title and
 * second line · state). Running rows sit on the live ground with a Live badge;
 * more phases can run at once. The component never chooses one of them: the
 * application puts a `Notice` with the choice above the list.
 */
export const ProgramList = forwardRef<HTMLDivElement, ProgramListProps>(
  ({ days, labels: labelsProp, headingLevel = 3, className, ...props }, ref) => {
    const labels = { ...PROGRAM_LIST_LABELS, ...labelsProp };
    const idPrefix = useId();
    const Heading = `h${headingLevel}` as const;
    return (
      <div
        ref={ref}
        role="group"
        aria-label={labels.list}
        className={['csk-program-list', className].filter(Boolean).join(' ')}
        {...props}
      >
        {days.map((day, d) => {
          const headingId = `${idPrefix}-day-${d}`;
          return (
            <section key={d} className="csk-program-list__day" aria-labelledby={headingId}>
              <header className="csk-program-list__head">
                <Heading id={headingId} className="csk-program-list__label">
                  {day.label}
                </Heading>
                {day.note && <span className="csk-program-list__day-note">{day.note}</span>}
              </header>
              <ul className="csk-program-list__items">
                {day.items.map((item, i) => {
                  const classes = [
                    'csk-program-list__item',
                    item.running && 'csk-program-list__item--running',
                    item.muted && 'csk-program-list__item--muted',
                    item.href && 'csk-program-list__item--link',
                  ]
                    .filter(Boolean)
                    .join(' ');
                  const title = item.href ? (
                    <a className="csk-program-list__link" href={item.href}>
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  );
                  const second: ReactNode[] = [];
                  if (item.subtitle) second.push(item.subtitle);
                  if (item.progress) second.push(labels.progress(item.progress.done, item.progress.total));
                  return (
                    <li key={item.id ?? i} className={classes}>
                      <span className="csk-program-list__time">{item.time}</span>
                      <div className="csk-program-list__text">
                        <b className="csk-program-list__title">{title}</b>
                        {(second.length > 0 || item.note) && (
                          <span className="csk-program-list__sub">
                            {second.map((s, k) => (
                              <Fragment key={k}>
                                {k > 0 && ' · '}
                                {s}
                              </Fragment>
                            ))}
                            {item.note && (
                              <>
                                {second.length > 0 && ' · '}
                                <span className="csk-program-list__note">{item.note}</span>
                              </>
                            )}
                          </span>
                        )}
                      </div>
                      {item.running ? (
                        <StatusBadge state="live" label={labels.live} />
                      ) : (
                        item.state && <StatusBadge state={item.state} label={item.stateLabel} />
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    );
  }
);

ProgramList.displayName = 'ProgramList';
