import type { Observed, ObservedState } from '../../types';

export type TimeValuePrecision = 1 | 2;

// `seconds`: `89.81` (slalom); `clock`: `m:ss.d` / `h:mm:ss.d` (downhill, long times).
export type TimeValueFormat = 'seconds' | 'clock';

export interface TimeParts {
  /** `''`, `'+'` or U+2212 `'−'`. */
  sign: string;
  int: string;
  frac: string;
}

const MINUS = '−';

/**
 * Splits seconds into sign, integer and fraction strings. Negative values always
 * get U+2212; `sign` adds `+` to positive values; a value that rounds to zero
 * stays unsigned.
 */
export function formatTimeParts(seconds: number, precision: TimeValuePrecision, sign: boolean): TimeParts {
  const [int, frac] = Math.abs(seconds).toFixed(precision).split('.');
  const isZero = /^[0.]+$/.test(`${int}.${frac}`);
  let prefix = '';
  if (!isZero && seconds < 0) prefix = MINUS;
  else if (!isZero && sign) prefix = '+';
  return { sign: prefix, int, frac };
}

const pad2 = (n: number) => String(n).padStart(2, '0');

/**
 * Like `formatTimeParts`, but the integer part is a clock: `m:ss` under one
 * hour, `h:mm:ss` from one hour on (`842.6` → `14:02` + `6`). Rounds first, so
 * `59.96` at one decimal is `1:00.0`, never `0:60.0`.
 */
export function formatClockParts(seconds: number, precision: TimeValuePrecision, sign: boolean): TimeParts {
  const { sign: prefix, int, frac } = formatTimeParts(seconds, precision, sign);
  const whole = Number(int);
  const h = Math.floor(whole / 3600);
  const m = Math.floor((whole % 3600) / 60);
  const s = whole % 60;
  const clock = h > 0 ? `${h}:${pad2(m)}:${pad2(s)}` : `${m}:${pad2(s)}`;
  return { sign: prefix, int: clock, frac };
}

/** Normalises a plain or observed value; a non-finite number counts as unavailable. */
export function resolveTime(value: number | null | Observed<number>): { state: ObservedState; seconds: number | null } {
  if (value === null) return { state: 'not-yet', seconds: null };
  if (typeof value === 'number') {
    return Number.isFinite(value) ? { state: 'known', seconds: value } : { state: 'unavailable', seconds: null };
  }
  if (value.state === 'known') {
    return Number.isFinite(value.value)
      ? { state: 'known', seconds: value.value }
      : { state: 'unavailable', seconds: null };
  }
  return { state: value.state, seconds: null };
}
