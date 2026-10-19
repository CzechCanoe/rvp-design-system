import { afterEach, describe, expect, it, vi } from 'vitest';
import { createTestClock } from './testClock';
import { createBrowserClock } from './browserClock';

describe('createTestClock', () => {
  it('starts at the given time and moves only on advance()', () => {
    const clock = createTestClock({ now: 1_000 });
    expect(clock.now()).toBe(1_000);
    clock.advance(250);
    expect(clock.now()).toBe(1_250);
    expect(() => clock.advance(-1)).toThrow(RangeError);
  });

  it('runs due timers in due order, each at its own due time', () => {
    const clock = createTestClock();
    const log: string[] = [];
    clock.setTimeout(() => log.push(`b@${clock.now()}`), 200);
    clock.setTimeout(() => log.push(`a@${clock.now()}`), 100);
    clock.setTimeout(() => log.push(`c@${clock.now()}`), 500);
    clock.advance(300);
    expect(log).toEqual(['a@100', 'b@200']);
    expect(clock.pendingTimers()).toBe(1);
    clock.advance(200);
    expect(log).toEqual(['a@100', 'b@200', 'c@500']);
  });

  it('runs timers scheduled by a timer within the same advance()', () => {
    const clock = createTestClock();
    const log: number[] = [];
    clock.setTimeout(() => {
      log.push(clock.now());
      clock.setTimeout(() => log.push(clock.now()), 100);
    }, 100);
    clock.advance(1_000);
    expect(log).toEqual([100, 200]);
    expect(clock.now()).toBe(1_000);
  });

  it('clearTimeout cancels a timer', () => {
    const clock = createTestClock();
    const fn = vi.fn();
    const handle = clock.setTimeout(fn, 100);
    clock.clearTimeout(handle);
    clock.advance(1_000);
    expect(fn).not.toHaveBeenCalled();
  });

  it('flushFrames runs one frame with now(); frames requested meanwhile wait', () => {
    const clock = createTestClock({ now: 5_000 });
    const times: number[] = [];
    const loop = (t: number) => {
      times.push(t);
      clock.requestFrame(loop);
    };
    clock.requestFrame(loop);
    expect(clock.pendingFrames()).toBe(1);
    expect(clock.flushFrames()).toBe(1);
    clock.advance(16);
    clock.flushFrames();
    expect(times).toEqual([5_000, 5_016]);
    expect(clock.pendingFrames()).toBe(1);
  });

  it('advance() does not run frames, cancelFrame removes one', () => {
    const clock = createTestClock();
    const fn = vi.fn();
    const handle = clock.requestFrame(fn);
    clock.advance(1_000);
    expect(fn).not.toHaveBeenCalled();
    clock.cancelFrame(handle);
    expect(clock.flushFrames()).toBe(0);
  });
});

describe('createBrowserClock', () => {
  afterEach(() => vi.restoreAllMocks());

  it('reads the wall clock', () => {
    const spy = vi.spyOn(Date, 'now').mockReturnValue(1_234);
    expect(createBrowserClock().now()).toBe(1_234);
    expect(spy).toHaveBeenCalled();
  });

  it('wraps requestAnimationFrame and passes now() to the callback', () => {
    vi.spyOn(Date, 'now').mockReturnValue(42);
    let pending: FrameRequestCallback | undefined;
    const raf = vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
      pending = cb;
      return 7;
    });
    const caf = vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation(() => {});
    const clock = createBrowserClock();
    const fn = vi.fn();
    const handle = clock.requestFrame(fn);
    expect(raf).toHaveBeenCalledTimes(1);
    pending?.(0);
    expect(fn).toHaveBeenCalledWith(42);
    clock.cancelFrame(handle);
    expect(caf).toHaveBeenCalledWith(7);
  });

  it('is safe to create without touching any time source', () => {
    const now = vi.spyOn(Date, 'now');
    createBrowserClock();
    expect(now).not.toHaveBeenCalled();
  });
});
