/**
 * Injected clock (c123 TEST-ARCHITECTURE §5). Every display-lifetime rule in
 * the design system reads time through a `Clock`; components never call
 * `Date.now`, `performance.now`, `setTimeout`, `setInterval` or
 * `requestAnimationFrame` directly. The interface matches the c123 ecosystem's
 * `Clock`, so an application can pass its own instance.
 */

/** Opaque handle returned by `setTimeout` / `requestFrame`; only pass it back to the same clock. */
export type ClockHandle = unknown;

export interface Clock {
  /** Current time in milliseconds since the Unix epoch. */
  now(): number;
  /** Calls `fn` once after `ms` milliseconds of clock time. */
  setTimeout(fn: () => void, ms: number): ClockHandle;
  clearTimeout(handle: ClockHandle): void;
  /** Calls `fn` once on the next frame with `now()` at that frame. */
  requestFrame(fn: (time: number) => void): ClockHandle;
  cancelFrame(handle: ClockHandle): void;
}
