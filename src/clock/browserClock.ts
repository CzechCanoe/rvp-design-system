import type { Clock, ClockHandle } from './Clock';

/** Fallback frame period where `requestAnimationFrame` is missing (SSR, workers). */
const FALLBACK_FRAME_MS = 16;

/**
 * Production clock: the only place in the design system that touches real time.
 *
 * `now()` is `Date.now()` (wall clock, epoch ms). It is preferred over
 * `performance.now()` because it keeps counting while a phone sleeps, so the
 * age of data received before the screen was locked stays correct, and because
 * `DataAge mode="absolute"` needs a wall-clock time. Frames wrap the real
 * `requestAnimationFrame`. Globals are read lazily, so creating the clock is
 * safe during server rendering.
 */
export function createBrowserClock(): Clock {
  const now = () => Date.now();
  const hasFrames = () => typeof globalThis.requestAnimationFrame === 'function';

  return {
    now,
    setTimeout: (fn, ms) => globalThis.setTimeout(fn, ms),
    clearTimeout: (handle: ClockHandle) => {
      globalThis.clearTimeout(handle as ReturnType<typeof globalThis.setTimeout>);
    },
    requestFrame: (fn) =>
      hasFrames()
        ? globalThis.requestAnimationFrame(() => fn(now()))
        : globalThis.setTimeout(() => fn(now()), FALLBACK_FRAME_MS),
    cancelFrame: (handle: ClockHandle) => {
      if (hasFrames()) globalThis.cancelAnimationFrame(handle as number);
      else globalThis.clearTimeout(handle as ReturnType<typeof globalThis.setTimeout>);
    },
  };
}
