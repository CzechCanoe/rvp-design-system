import { forwardRef, useEffect, useMemo, useState, type HTMLAttributes } from 'react';
import type { Clock } from '../../clock/Clock';
import { useClock } from '../../clock/useClock';
import { formatAgeCs, msUntilNextAgeChange } from './formatAge';
import './DataAge.css';

export type DataAgeMode = 'relative' | 'absolute';
export type DataAgeConnection = 'ok' | 'reconnecting' | 'offline';

export interface DataAgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * When the data arrived, in the clock's time (`clock.now()` at receipt, epoch ms).
   * Never the server's `observedAt`. `null` = nothing received yet.
   */
  receivedAt: number | null;
  /** Clock to measure age with; defaults to the nearest `ClockProvider`, else the browser clock. */
  clock?: Clock;
  /** `relative` → „aktualizováno před 1 s“ (ticks every second), `absolute` → „stav ze 14:32:10“. */
  mode?: DataAgeMode;
  /** Connection liveness as a dot + text in the same line (never a banner). Omit for no dot. */
  connection?: DataAgeConnection;
  /** Text before the age; default `aktualizováno` (relative) / `stav ze` (absolute); `''` for none. */
  label?: string;
  /** Override connection texts (defaults: ok „připojeno“ for screen readers only, „obnovuji spojení“, „bez spojení“). */
  connectionLabels?: Partial<Record<DataAgeConnection, string>>;
  /** Text when `receivedAt` is `null` (default „zatím bez dat“). */
  emptyLabel?: string;
  /** Relative phrase for an age in seconds (default Czech: „právě teď“, „před 5 s“, „před 2 min“). */
  formatAge?: (ageSeconds: number) => string;
  /** Locale of the absolute time (default `cs-CZ`). */
  locale?: string;
  /** IANA time zone of the absolute time (default: the viewer's). */
  timeZone?: string;
}

const DEFAULT_CONNECTION_LABELS: Record<DataAgeConnection, string> = {
  ok: 'připojeno',
  reconnecting: 'obnovuji spojení',
  offline: 'bez spojení',
};

/**
 * How old the shown data is, measured from its receipt on the injected clock,
 * optionally with connection liveness. Inline, one line, never a banner.
 */
export const DataAge = forwardRef<HTMLSpanElement, DataAgeProps>(
  (
    {
      receivedAt,
      clock: clockProp,
      mode = 'relative',
      connection,
      label,
      connectionLabels,
      emptyLabel = 'zatím bez dat',
      formatAge = formatAgeCs,
      locale = 'cs-CZ',
      timeZone,
      className,
      ...props
    },
    ref
  ) => {
    const clock = useClock(clockProp);
    const hasData = receivedAt !== null && Number.isFinite(receivedAt);
    const [tick, setTick] = useState(0);

    // Relative mode re-renders exactly when the shown age changes.
    useEffect(() => {
      if (mode !== 'relative' || !hasData) return undefined;
      const age = clock.now() - (receivedAt as number);
      const handle = clock.setTimeout(() => setTick((n) => n + 1), msUntilNextAgeChange(age));
      return () => clock.clearTimeout(handle);
    }, [clock, mode, hasData, receivedAt, tick]);

    const timeFormat = useMemo(
      () =>
        new Intl.DateTimeFormat(locale, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hourCycle: 'h23',
          timeZone,
        }),
      [locale, timeZone]
    );

    let text: string;
    let dateTime: string | undefined;
    if (!hasData) {
      text = emptyLabel;
    } else {
      const at = receivedAt as number;
      dateTime = new Date(at).toISOString();
      const prefix = label ?? (mode === 'absolute' ? 'stav ze' : 'aktualizováno');
      const value =
        mode === 'absolute' ? timeFormat.format(at) : formatAge(Math.max(0, clock.now() - at) / 1000);
      text = prefix ? `${prefix} ${value}` : value;
    }

    const connectionText = connection
      ? (connectionLabels?.[connection] ?? DEFAULT_CONNECTION_LABELS[connection])
      : undefined;

    const classNames = [
      'csk-data-age',
      connection && `csk-data-age--${connection}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classNames} data-mode={mode} {...props}>
        {connection && <span className="csk-data-age__dot" aria-hidden="true" />}
        {connection && connectionText && (
          <span className={connection === 'ok' ? 'csk-data-age__sr' : 'csk-data-age__connection'}>
            {connectionText}
          </span>
        )}
        {connection && connection !== 'ok' && connectionText && (
          <span className="csk-data-age__sep" aria-hidden="true">
            ·
          </span>
        )}
        {dateTime ? (
          <time className="csk-data-age__text" dateTime={dateTime}>
            {text}
          </time>
        ) : (
          <span className="csk-data-age__text">{text}</span>
        )}
      </span>
    );
  }
);

DataAge.displayName = 'DataAge';
