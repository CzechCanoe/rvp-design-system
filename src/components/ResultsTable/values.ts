import type { Observed } from '../../types';
import type { ObservedNumber } from './types';

/** The known numeric value, or `null` for `null`, `not-yet`, `unavailable` and non-finite numbers. */
export function knownNumber(value: ObservedNumber | undefined): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  return value.state === 'known' && Number.isFinite(value.value) ? value.value : null;
}

/** `true` when the value is an `Observed` in the `not-yet` state. */
export function isNotYet(value: Observed<number> | undefined): boolean {
  return value !== undefined && value.state === 'not-yet';
}
