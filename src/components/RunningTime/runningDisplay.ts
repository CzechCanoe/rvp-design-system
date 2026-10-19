import type { TimeValuePrecision } from '../TimeValue/formatTime';

/**
 * `runningStaleAfterSeconds` of the c123 contract (CONTRACTS §2.6): the local
 * tick runs at most this long past the client's receipt of the last running value.
 */
export const RUNNING_STALE_AFTER_SECONDS = 3;

export interface RunningDisplay {
  /** Seconds to show, floored to the precision (a running clock never rounds up). */
  seconds: number;
  /** True once `staleAfterSeconds` have passed since receipt: the value is frozen. */
  stale: boolean;
}

/**
 * Display of a running time at clock time `now`: the last delivered
 * `elapsedSeconds` plus local time since its receipt, capped at
 * `staleAfterSeconds`. Past the cap the display stays frozen at the capped
 * value (no jump back) and is stale.
 */
export function runningDisplay(
  elapsedSeconds: number,
  receivedAt: number,
  now: number,
  staleAfterSeconds: number,
  precision: TimeValuePrecision
): RunningDisplay {
  const staleAfterMs = Math.max(0, staleAfterSeconds) * 1000;
  const ageMs = Math.max(0, now - receivedAt);
  const stale = ageMs >= staleAfterMs;
  const factor = precision === 1 ? 10 : 100;
  const raw = elapsedSeconds + Math.min(ageMs, staleAfterMs) / 1000;
  // Small epsilon so binary noise (46.3 * 10 = 462.99999…) does not floor a digit away.
  return { seconds: Math.floor(raw * factor + 1e-6) / factor, stale };
}
