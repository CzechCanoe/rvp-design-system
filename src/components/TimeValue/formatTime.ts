import type { Observed, ObservedState } from '../../types';

export type TimeValuePrecision = 1 | 2;

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
