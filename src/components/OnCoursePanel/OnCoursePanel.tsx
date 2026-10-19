import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import type { Clock } from '../../clock/Clock';
import { Badge } from '../Badge';
import { DataAge } from '../DataAge';
import { StatusBadge } from '../StatusBadge';
import { TimeValue } from '../TimeValue';
import type { ObservedNumber } from '../ResultsTable';
import { OnCourseRider, type OnCourseRiderProps } from './OnCourseRider';
import './OnCoursePanel.css';

/** A rider as the application delivers it; `stale` and `clock` come from the panel. */
export type OnCourseRiderData = Omit<OnCourseRiderProps, 'stale' | 'clock'>;

export interface OnCoursePanelLabels {
  title: string;
  /** Screen-reader text of the collapse button when open / collapsed. */
  collapse: string;
  expand: string;
  /** Prefix of the leader line (default `vede`). */
  leader: string;
}

export const ON_COURSE_PANEL_LABELS: OnCoursePanelLabels = {
  title: 'Na trati',
  collapse: 'Sbalit panel Na trati',
  expand: 'Rozbalit panel Na trati',
  leader: 'vede',
};

export interface OnCoursePanelProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Athletes on course, in the order the application wants. All are shown; the panel grows. */
  riders: OnCourseRiderData[];
  /** Phase of the race, e.g. `K1 muži · 2. jízda`. */
  phaseLabel?: ReactNode;
  /** Current leader of the phase, shown in the header. */
  leader?: { name: string; time: ObservedNumber };
  /** Only the header is shown (the riders stay mounted state-wise in the application). */
  collapsed?: boolean;
  /** Makes the header a toggle. Without it the panel cannot be collapsed by the user. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /**
   * No fresh data (heartbeat lost): the riders are frozen, nothing is removed and
   * no banner appears; the header says since when the state is from.
   */
  stale?: boolean;
  /** `clock.now()` of the last data received, for the „stav ze“ line of a stale panel. */
  receivedAt?: number | null;
  /** IANA time zone of the „stav ze“ time (default: the viewer's). */
  timeZone?: string;
  clock?: Clock;
  labels?: Partial<OnCoursePanelLabels>;
}

/**
 * Athletes currently on course, always above the results. Mobile: a list;
 * from 640 px of its own width: three columns (container query). Never hides
 * a rider: more riders make the panel taller. Without riders it renders
 * nothing; when the data stops it stays and turns stale.
 */
export const OnCoursePanel = forwardRef<HTMLElement, OnCoursePanelProps>(
  (
    {
      riders,
      phaseLabel,
      leader,
      collapsed = false,
      onCollapsedChange,
      stale = false,
      receivedAt = null,
      timeZone,
      clock,
      labels: labelsProp,
      className,
      ...props
    },
    ref
  ) => {
    const bodyId = useId();
    if (riders.length === 0) return null;
    const labels = { ...ON_COURSE_PANEL_LABELS, ...labelsProp };
    const classes = [
      'csk-oncourse-panel',
      stale && 'csk-oncourse-panel--stale',
      collapsed && 'csk-oncourse-panel--collapsed',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const title = (
      <>
        <span className="csk-oncourse-panel__title">{labels.title}</span>
        <Badge variant={stale ? 'default' : 'level'} size="sm">
          {riders.length}
        </Badge>
      </>
    );

    return (
      <section ref={ref} className={classes} aria-label={labels.title} data-stale={stale ? '' : undefined} {...props}>
        <div className="csk-oncourse-panel__header">
          {onCollapsedChange ? (
            <button
              type="button"
              className="csk-oncourse-panel__toggle"
              aria-expanded={!collapsed}
              aria-controls={bodyId}
              aria-label={collapsed ? labels.expand : labels.collapse}
              onClick={() => onCollapsedChange(!collapsed)}
            >
              {title}
              <span className="csk-oncourse-panel__chevron" aria-hidden="true" />
            </button>
          ) : (
            <span className="csk-oncourse-panel__toggle csk-oncourse-panel__toggle--static">{title}</span>
          )}
          {stale && <StatusBadge state="stale" size="sm" />}
          <span className="csk-oncourse-panel__meta">
            {stale ? (
              <DataAge receivedAt={receivedAt} mode="absolute" timeZone={timeZone} clock={clock} />
            ) : (
              phaseLabel
            )}
          </span>
        </div>
        {(stale && phaseLabel) || leader ? (
          <div className="csk-oncourse-panel__subheader">
            {stale && phaseLabel && <span>{phaseLabel}</span>}
            {leader && (
              <span>
                {labels.leader} {leader.name} <TimeValue value={leader.time} variant="muted" />
              </span>
            )}
          </div>
        ) : null}
        <div id={bodyId} className="csk-oncourse-panel__body" hidden={collapsed}>
          <ul className="csk-oncourse-panel__riders">
            {riders.map((rider) => (
              <li key={rider.bib} className="csk-oncourse-panel__item">
                <OnCourseRider {...rider} stale={stale} clock={clock} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
);

OnCoursePanel.displayName = 'OnCoursePanel';
