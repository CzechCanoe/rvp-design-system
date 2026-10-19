import { vi } from 'vitest';

/** Design-system source files (not tests). */
const OWN_SOURCE = /\/src\/(components|clock)\/(?![^:]*\.test\.)[^:]*\.(ts|tsx)/;
/** Frames of the spy machinery itself. */
const SPY_FRAME = /realTimeSpy\.ts|\/@vitest\/spy\/|\/tinyspy\//;

/**
 * Spies on every real time source (Date.now, performance.now, timers, frames)
 * and records calls whose direct caller is a design-system source file. React,
 * the test runner and the testing library may use real time themselves, also
 * while running a component's callback; those calls are not counted.
 */
export function spyOnRealTime() {
  const calls: string[] = [];
  type Fn = (...args: unknown[]) => unknown;
  const track = (target: object, key: string, name: string) => {
    const holder = target as Record<string, Fn>;
    const original = holder[key];
    vi.spyOn(holder, key).mockImplementation(function (this: unknown, ...args: unknown[]) {
      const frames = (new Error().stack ?? '').split('\n').slice(1);
      const caller = frames.find((line) => !SPY_FRAME.test(line));
      if (caller && OWN_SOURCE.test(caller)) calls.push(`${name} from ${caller.trim()}`);
      return original.apply(this, args);
    });
  };

  track(Date, 'now', 'Date.now');
  track(performance, 'now', 'performance.now');
  for (const key of ['setTimeout', 'setInterval', 'requestAnimationFrame']) {
    if (typeof (globalThis as Record<string, unknown>)[key] === 'function') track(globalThis, key, key);
  }
  return {
    calls,
    restore: () => vi.restoreAllMocks(),
  };
}
