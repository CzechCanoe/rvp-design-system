import { forwardRef, type HTMLAttributes } from 'react';
import type { Observed } from '../../types';
import { formatTimeParts, resolveTime, type TimeValuePrecision } from './formatTime';
import './TimeValue.css';

export type { TimeValuePrecision } from './formatTime';
export type TimeValueVariant = 'default' | 'best' | 'running' | 'stale' | 'muted';
export type TimeValueAlign = 'decimal';

export interface TimeValueProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * Time in seconds, plain or as an `Observed<number>`. `null`, `not-yet` and
   * `unavailable` all render as "not known" (—); a known `0` renders as `0.00`.
   */
  value: number | null | Observed<number>;
  /** Decimal places (default 2; running times use 1). */
  precision?: TimeValuePrecision;
  /** Visual state of the value (default `default`). */
  variant?: TimeValueVariant;
  /** `decimal`: integer part right-aligned in a 3ch box so stacked values line up on the decimal point. */
  align?: TimeValueAlign;
  /** Signed difference: `+1.53` / `−0.87`; zero stays unsigned (`0.00`). */
  sign?: boolean;
  /** Screen-reader text for a value that is not known (default `neznámo`). */
  unknownLabel?: string;
}

const UNKNOWN = '—';

/**
 * A time or time difference in IBM Plex Mono with tabular digits; never wraps.
 * Renders the three `Observed` states: `known` as the number, `not-yet` and
 * `unavailable` alike as "not known".
 */
export const TimeValue = forwardRef<HTMLSpanElement, TimeValueProps>(
  (
    {
      value,
      precision = 2,
      variant = 'default',
      align,
      sign = false,
      unknownLabel = 'neznámo',
      className,
      ...props
    },
    ref
  ) => {
    const { state, seconds } = resolveTime(value);
    const decimal = align === 'decimal';

    const classNames = [
      'csk-time-value',
      `csk-time-value--${variant}`,
      decimal && 'csk-time-value--align-decimal',
      seconds === null && 'csk-time-value--unknown',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (seconds === null) {
      return (
        <span ref={ref} className={classNames} data-state={state} {...props}>
          {decimal ? (
            <>
              <span className="csk-time-value__int" aria-hidden="true">
                {UNKNOWN}
              </span>
              <span className="csk-time-value__frac csk-time-value__frac--placeholder" aria-hidden="true">
                .{'0'.repeat(precision)}
              </span>
            </>
          ) : (
            <span aria-hidden="true">{UNKNOWN}</span>
          )}
          <span className="csk-time-value__sr">{unknownLabel}</span>
        </span>
      );
    }

    const parts = formatTimeParts(seconds, precision, sign);

    return (
      <span ref={ref} className={classNames} data-state={state} {...props}>
        {decimal ? (
          <>
            <span className="csk-time-value__int">
              {parts.sign}
              {parts.int}
            </span>
            <span className="csk-time-value__frac">.{parts.frac}</span>
          </>
        ) : (
          `${parts.sign}${parts.int}.${parts.frac}`
        )}
      </span>
    );
  }
);

TimeValue.displayName = 'TimeValue';
