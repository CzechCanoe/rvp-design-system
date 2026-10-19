import type { Clock, ClockHandle } from './Clock';

export interface TestClockOptions {
  /** Start time in epoch milliseconds (default 0). */
  now?: number;
}

/**
 * Virtual clock for tests and deterministic stories. Time moves only when the
 * test says so: `advance(ms)` moves time and runs timers that fall due, in due
 * order; `flushFrames()` runs one frame. Never a global fake-timer patch.
 */
export interface TestClock extends Clock {
  /** Moves time forward by `ms` and runs every timer due on the way, each at its own due time. */
  advance(ms: number): void;
  /** Runs the frame callbacks queued so far (one frame); callbacks requested meanwhile wait for the next flush. Returns how many ran. */
  flushFrames(): number;
  /** Number of frame callbacks waiting for the next `flushFrames()`. */
  pendingFrames(): number;
  /** Number of timers not yet run. */
  pendingTimers(): number;
}

interface Timer {
  due: number;
  seq: number;
  fn: () => void;
}

export function createTestClock(options: TestClockOptions = {}): TestClock {
  let current = options.now ?? 0;
  let nextId = 1;
  const timers = new Map<number, Timer>();
  const frames = new Map<number, (time: number) => void>();

  const nextDue = (limit: number): [number, Timer] | undefined => {
    let found: [number, Timer] | undefined;
    for (const entry of timers) {
      const [, t] = entry;
      if (t.due > limit) continue;
      if (!found || t.due < found[1].due || (t.due === found[1].due && t.seq < found[1].seq)) {
        found = entry;
      }
    }
    return found;
  };

  return {
    now: () => current,
    setTimeout: (fn, ms) => {
      const id = nextId++;
      timers.set(id, { due: current + Math.max(0, ms), seq: id, fn });
      return id;
    },
    clearTimeout: (handle: ClockHandle) => {
      timers.delete(handle as number);
    },
    requestFrame: (fn) => {
      const id = nextId++;
      frames.set(id, fn);
      return id;
    },
    cancelFrame: (handle: ClockHandle) => {
      frames.delete(handle as number);
    },
    advance: (ms) => {
      if (!(ms >= 0)) throw new RangeError(`TestClock.advance: ms must be >= 0, got ${ms}`);
      const target = current + ms;
      for (let due = nextDue(target); due; due = nextDue(target)) {
        const [id, timer] = due;
        timers.delete(id);
        current = timer.due;
        timer.fn();
      }
      current = target;
    },
    flushFrames: () => {
      const batch = [...frames.values()];
      frames.clear();
      for (const fn of batch) fn(current);
      return batch.length;
    },
    pendingFrames: () => frames.size,
    pendingTimers: () => timers.size,
  };
}
