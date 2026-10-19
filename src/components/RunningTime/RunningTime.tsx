import { forwardRef, useEffect, useReducer, useRef, type HTMLAttributes } from 'react';
import type { Clock, ClockHandle } from '../../clock/Clock';
import { useClock } from '../../clock/useClock';
import { TimeValue, type TimeValueAlign, type TimeValuePrecision } from '../TimeValue';
import { DataAge } from '../DataAge';
import { RUNNING_STALE_AFTER_SECONDS, runningDisplay } from './runningDisplay';
import './RunningTime.css';

export interface RunningTimeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Last delivered running time in seconds (`running.elapsedSeconds`), shown as delivered. */
  elapsedSeconds: number;
  /**
   * When `elapsedSeconds` arrived, in the clock's time (`clock.now()` at receipt).
   * A new value is a new `elapsedSeconds` and/or `receivedAt`; the display snaps to it.
   */
  receivedAt: number;
  /** Clock to tick with; defaults to the nearest `ClockProvider`, else the browser clock. */
  clock?: Clock;
  /** Seconds past receipt after which the tick stops and the value shows as stale (default 3). */
  staleAfterSeconds?: number;
  /** Decimal places (default 1). */
  precision?: TimeValuePrecision;
  /** Passed to `TimeValue`. */
  align?: TimeValueAlign;
  /** Show the age next to a stale value (default true). */
  showAge?: boolean;
  /** Text before the age (default `''`: just „před 4 s“). */
  ageLabel?: string;
  /** Relative phrase for the age, see `DataAge`. */
  formatAge?: (ageSeconds: number) => string;
  /** Screen-reader text for a stale value (default `zastaveno`). */
  staleLabel?: string;
}

/**
 * A running time that ticks locally between deliveries, only through the
 * injected `Clock` (`requestFrame`). It snaps to every new value and freezes
 * `staleAfterSeconds` after receipt, measured on the same clock; it then shows
 * the frozen value as stale with its age. When the athlete leaves the course,
 * render `TimeValue` instead (this component never decides a finish).
 */
export const RunningTime = forwardRef<HTMLSpanElement, RunningTimeProps>(
  (
    {
      elapsedSeconds,
      receivedAt,
      clock: clockProp,
      staleAfterSeconds = RUNNING_STALE_AFTER_SECONDS,
      precision = 1,
      align,
      showAge = true,
      ageLabel = '',
      formatAge,
      staleLabel = 'zastaveno',
      className,
      ...props
    },
    ref
  ) => {
    const clock = useClock(clockProp);
    const [, forceRender] = useReducer((n: number) => n + 1, 0);
    const display = runningDisplay(elapsedSeconds, receivedAt, clock.now(), staleAfterSeconds, precision);
    const { stale } = display;

    const shownRef = useRef(display.seconds);
    useEffect(() => {
      shownRef.current = display.seconds;
    });

    // Frame loop: re-render only when the shown digits change; stop once stale.
    useEffect(() => {
      if (stale) return undefined;
      let handle: ClockHandle;
      const onFrame = (time: number) => {
        const next = runningDisplay(elapsedSeconds, receivedAt, time, staleAfterSeconds, precision);
        if (next.stale || next.seconds !== shownRef.current) forceRender();
        if (!next.stale) handle = clock.requestFrame(onFrame);
      };
      handle = clock.requestFrame(onFrame);
      return () => clock.cancelFrame(handle);
    }, [clock, elapsedSeconds, receivedAt, staleAfterSeconds, precision, stale]);

    const classNames = ['csk-running-time', stale && 'csk-running-time--stale', className]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classNames} role="timer" data-stale={stale ? '' : undefined} {...props}>
        <TimeValue
          value={display.seconds}
          precision={precision}
          variant={stale ? 'stale' : 'running'}
          align={align}
        />
        {stale && <span className="csk-running-time__sr">{staleLabel}</span>}
        {stale && showAge && (
          <DataAge
            className="csk-running-time__age"
            receivedAt={receivedAt}
            clock={clock}
            label={ageLabel}
            formatAge={formatAge}
          />
        )}
      </span>
    );
  }
);

RunningTime.displayName = 'RunningTime';
