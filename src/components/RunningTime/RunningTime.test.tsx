import { afterEach, describe, expect, it } from 'vitest';
import { act, render } from '@testing-library/react';
import { RunningTime, type RunningTimeProps } from './RunningTime';
import { RUNNING_STALE_AFTER_SECONDS } from './runningDisplay';
import { ClockProvider } from '../../clock/ClockProvider';
import { createTestClock } from '../../clock/testClock';
import { spyOnRealTime } from '../../test/realTimeSpy';

/** 2026-10-04 14:32:10 Europe/Prague, a stated non-zero clock offset. */
const T0 = Date.UTC(2026, 9, 4, 12, 32, 10);

function setup(props: Partial<RunningTimeProps> = {}) {
  const clock = createTestClock({ now: T0 });
  const base: RunningTimeProps = { elapsedSeconds: 46.1, receivedAt: T0, clock, ...props };
  const utils = render(<RunningTime {...base} />);
  const root = () => utils.container.querySelector<HTMLElement>('.csk-running-time')!;
  const value = () => utils.container.querySelector('.csk-time-value')!.textContent;
  const age = () => utils.container.querySelector('.csk-data-age')?.textContent ?? null;
  /** Advances the clock by `ms` and runs one frame, as a browser would. */
  const tick = (ms: number) =>
    act(() => {
      clock.advance(ms);
      clock.flushFrames();
    });
  const deliver = (next: Partial<RunningTimeProps>) =>
    utils.rerender(<RunningTime {...base} receivedAt={clock.now()} {...next} />);
  return { clock, root, value, age, tick, deliver, ...utils };
}

describe('RunningTime', () => {
  it('shows the delivered value as running at receipt', () => {
    const { root, value, clock } = setup();
    expect(value()).toBe('46.1');
    expect(root()).toHaveAttribute('role', 'timer');
    expect(root().querySelector('.csk-time-value')).toHaveClass('csk-time-value--running');
    expect(clock.pendingFrames()).toBe(1);
  });

  it('ticks locally through clock.requestFrame', () => {
    const { value, tick } = setup();
    tick(400);
    expect(value()).toBe('46.5');
    tick(600);
    expect(value()).toBe('47.1');
    tick(1_000);
    expect(value()).toBe('48.1');
  });

  it('does not tick without frames, even when time moves', () => {
    const { value, clock } = setup();
    act(() => clock.advance(1_000));
    expect(value()).toBe('46.1');
    act(() => {
      clock.flushFrames();
    });
    expect(value()).toBe('47.1');
  });

  it(`freezes ${RUNNING_STALE_AFTER_SECONDS} s after receipt and shows stale with its age`, () => {
    const { root, value, age, tick, clock } = setup();
    tick(2_999);
    expect(value()).toBe('49.0');
    expect(root()).not.toHaveClass('csk-running-time--stale');
    expect(age()).toBeNull();

    tick(1);
    expect(value()).toBe('49.1');
    expect(root()).toHaveClass('csk-running-time--stale');
    expect(root().querySelector('.csk-time-value')).toHaveClass('csk-time-value--stale');
    expect(age()).toBe('před 3 s');
    expect(clock.pendingFrames()).toBe(0);

    tick(5_000);
    expect(value()).toBe('49.1');
    expect(age()).toBe('před 8 s');
    expect(clock.pendingFrames()).toBe(0);
  });

  it('unfreezes and snaps on a new value', () => {
    const { root, value, tick, deliver, clock } = setup();
    tick(10_000);
    expect(root()).toHaveClass('csk-running-time--stale');

    deliver({ elapsedSeconds: 57.3 });
    expect(value()).toBe('57.3');
    expect(root()).not.toHaveClass('csk-running-time--stale');
    expect(clock.pendingFrames()).toBe(1);
    tick(500);
    expect(value()).toBe('57.8');
  });

  it('snaps to every new value while running, also backwards', () => {
    const { value, tick, deliver } = setup();
    tick(900);
    expect(value()).toBe('47.0');
    deliver({ elapsedSeconds: 46.85 });
    expect(value()).toBe('46.8');
  });

  it('treats a re-delivered equal value (split hold) as fresh', () => {
    const { root, value, tick, deliver } = setup({ elapsedSeconds: 30 });
    tick(4_000);
    expect(root()).toHaveClass('csk-running-time--stale');
    deliver({ elapsedSeconds: 30 });
    expect(value()).toBe('30.0');
    expect(root()).not.toHaveClass('csk-running-time--stale');
  });

  it('measures staleness from receipt on the clock', () => {
    const { root, value, age, clock } = setup({ receivedAt: T0 - 5_000 });
    expect(root()).toHaveClass('csk-running-time--stale');
    expect(value()).toBe('49.1');
    expect(age()).toBe('před 5 s');
    expect(clock.pendingFrames()).toBe(0);
  });

  it('respects staleAfterSeconds, precision and showAge', () => {
    const { root, value, age, tick } = setup({ staleAfterSeconds: 1, precision: 2, showAge: false });
    tick(250);
    expect(value()).toBe('46.35');
    tick(750);
    expect(root()).toHaveClass('csk-running-time--stale');
    expect(value()).toBe('47.10');
    expect(age()).toBeNull();
  });

  it('cancels its frame on unmount', () => {
    const { clock, unmount } = setup();
    expect(clock.pendingFrames()).toBe(1);
    unmount();
    expect(clock.pendingFrames()).toBe(0);
  });

  it('takes the clock from ClockProvider when no prop is given', () => {
    const clock = createTestClock({ now: T0 });
    const { container } = render(
      <ClockProvider clock={clock}>
        <RunningTime elapsedSeconds={10} receivedAt={T0} />
      </ClockProvider>
    );
    act(() => {
      clock.advance(1_500);
      clock.flushFrames();
    });
    expect(container.querySelector('.csk-time-value')?.textContent).toBe('11.5');
  });
});

describe('RunningTime and real time', () => {
  let spy: ReturnType<typeof spyOnRealTime> | undefined;
  afterEach(() => spy?.restore());

  it('never reads real time: no Date.now, performance.now, timers or frames from components', () => {
    spy = spyOnRealTime();
    const { tick, deliver, unmount } = setup();
    tick(1_000);
    tick(5_000);
    deliver({ elapsedSeconds: 60 });
    tick(500);
    unmount();
    expect(spy.calls).toEqual([]);
    expect(Date.now).not.toHaveBeenCalled();
  });

  it('the spy does detect real time: the default browser clock is seen', () => {
    spy = spyOnRealTime();
    const { unmount } = render(<RunningTime elapsedSeconds={1} receivedAt={0} />);
    unmount();
    expect(spy.calls.some((c) => c.startsWith('Date.now from') && c.includes('browserClock.ts'))).toBe(true);
  });
});
