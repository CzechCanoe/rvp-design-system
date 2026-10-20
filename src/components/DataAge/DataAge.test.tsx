import { afterEach, describe, expect, it } from 'vitest';
import { act, render } from '@testing-library/react';
import { DataAge } from './DataAge';
import { formatAgeCs, msUntilNextAgeChange } from './formatAge';
import { createTestClock } from '../../clock/testClock';
import { spyOnRealTime } from '../../test/realTimeSpy';

/** 2026-10-04 14:32:10 Europe/Prague. */
const T0 = Date.UTC(2026, 9, 4, 12, 32, 10);

describe('formatAgeCs', () => {
  it('floors to the shown unit', () => {
    expect(formatAgeCs(0.4)).toBe('právě teď');
    expect(formatAgeCs(1)).toBe('před 1 s');
    expect(formatAgeCs(59.9)).toBe('před 59 s');
    expect(formatAgeCs(60)).toBe('před 1 min');
    expect(formatAgeCs(3_599)).toBe('před 59 min');
    expect(formatAgeCs(7_200)).toBe('před 2 h');
  });

  it('knows when the text changes next', () => {
    expect(msUntilNextAgeChange(0)).toBe(1_000);
    expect(msUntilNextAgeChange(1_250)).toBe(750);
    expect(msUntilNextAgeChange(61_000)).toBe(59_000);
  });
});

describe('DataAge', () => {
  it('shows the relative age and updates it on clock timers', () => {
    const clock = createTestClock({ now: T0 + 1_000 });
    const { container } = render(<DataAge receivedAt={T0} clock={clock} />);
    const el = () => container.querySelector('.csk-data-age')!;
    expect(el()).toHaveTextContent('aktualizováno před 1 s');
    expect(clock.pendingTimers()).toBe(1);
    act(() => clock.advance(1_000));
    expect(el()).toHaveTextContent('aktualizováno před 2 s');
    act(() => clock.advance(58_000));
    expect(el()).toHaveTextContent('aktualizováno před 1 min');
    expect(clock.pendingTimers()).toBe(1);
  });

  it('marks the receipt time in a <time> element', () => {
    const clock = createTestClock({ now: T0 });
    const { container } = render(<DataAge receivedAt={T0} clock={clock} />);
    expect(container.querySelector('time')).toHaveAttribute('datetime', '2026-10-04T12:32:10.000Z');
    expect(container.querySelector('time')).toHaveTextContent('aktualizováno právě teď');
  });

  it('shows the absolute time without ticking', () => {
    const clock = createTestClock({ now: T0 + 30_000 });
    const { container } = render(
      <DataAge receivedAt={T0} clock={clock} mode="absolute" timeZone="Europe/Prague" />
    );
    expect(container.querySelector('.csk-data-age')).toHaveTextContent('stav ze 14:32:10');
    expect(clock.pendingTimers()).toBe(0);
  });

  it('allows an empty or custom label', () => {
    const clock = createTestClock({ now: T0 + 3_000 });
    const { container } = render(
      <>
        <DataAge receivedAt={T0} clock={clock} label="" />
        <DataAge receivedAt={T0} clock={clock} label="data" formatAge={(s) => `${s} s ago`} />
      </>
    );
    const [a, b] = container.querySelectorAll('.csk-data-age');
    expect(a).toHaveTextContent(/^před 3 s$/);
    expect(b).toHaveTextContent('data 3 s ago');
  });

  it('renders the empty label without data', () => {
    const clock = createTestClock({ now: T0 });
    const { container } = render(<DataAge receivedAt={null} clock={clock} />);
    expect(container.querySelector('.csk-data-age')).toHaveTextContent('zatím bez dat');
    expect(container.querySelector('time')).toBeNull();
    expect(clock.pendingTimers()).toBe(0);
  });

  it('shows connection as dot + text in one line', () => {
    const clock = createTestClock({ now: T0 + 12_000 });
    const { container } = render(
      <>
        <DataAge receivedAt={T0} clock={clock} connection="ok" />
        <DataAge receivedAt={T0} clock={clock} connection="reconnecting" />
        <DataAge receivedAt={T0} clock={clock} connection="offline" connectionLabels={{ offline: 'offline' }} />
      </>
    );
    const [ok, reconnecting, offline] = container.querySelectorAll('.csk-data-age');
    expect(ok).toHaveClass('csk-data-age--ok');
    expect(ok.querySelector('.csk-data-age__dot')).not.toBeNull();
    expect(ok.querySelector('.csk-data-age__sr')).toHaveTextContent('připojeno');
    expect(reconnecting.querySelector('.csk-data-age__connection')).toHaveTextContent('obnovuji spojení');
    expect(reconnecting).toHaveTextContent('obnovuji spojení·aktualizováno před 12 s');
    expect(offline.querySelector('.csk-data-age__connection')).toHaveTextContent('offline');
  });
});

describe('DataAge offline (#84.8)', () => {
  it('offline has its own state class and dot, reconnecting keeps its own (colours: tests/time-components.spec.ts)', () => {
    const clock = createTestClock({ now: T0 + 42_000 });
    const { container } = render(
      <>
        <DataAge receivedAt={T0} clock={clock} connection="offline" mode="absolute" timeZone="Europe/Prague" />
        <DataAge receivedAt={T0} clock={clock} connection="reconnecting" />
      </>
    );
    const [offline, reconnecting] = container.querySelectorAll('.csk-data-age');
    expect(offline).toHaveClass('csk-data-age--offline');
    expect(offline).not.toHaveClass('csk-data-age--reconnecting');
    expect(offline.querySelector('.csk-data-age__dot')).toHaveAttribute('aria-hidden', 'true');
    expect(offline).toHaveTextContent('bez spojení·stav ze 14:32:10');
    expect(reconnecting).toHaveClass('csk-data-age--reconnecting');
  });
});

describe('DataAge compact', () => {
  /** Text a sighted user sees: the element text without the visually hidden parts. */
  const visibleText = (el: Element) =>
    [...el.querySelectorAll('.csk-data-age__text')].map((n) => n.textContent).join('');

  it('draws a dot and the short age; prefix only for screen readers and in title', () => {
    const clock = createTestClock({ now: T0 + 4_000 });
    const { container } = render(<DataAge receivedAt={T0} clock={clock} variant="compact" />);
    const el = container.querySelector('.csk-data-age')!;
    expect(el).toHaveClass('csk-data-age--compact');
    expect(el.querySelector('.csk-data-age__dot')).toHaveAttribute('aria-hidden', 'true');
    expect(visibleText(el)).toBe('před 4 s');
    expect(el.querySelector('time')).toHaveAttribute('datetime', '2026-10-04T12:32:10.000Z');
    expect(el.querySelector('.csk-data-age__sr')).toHaveTextContent('aktualizováno');
    expect(el).toHaveTextContent('aktualizováno před 4 s');
    expect(el).toHaveAttribute('title', 'aktualizováno před 4 s');
    // still ticks on the injected clock
    act(() => clock.advance(1_000));
    expect(visibleText(el)).toBe('před 5 s');
    expect(el).toHaveAttribute('title', 'aktualizováno před 5 s');
  });

  it('hides the connection text but keeps it for screen readers and in title', () => {
    const clock = createTestClock({ now: T0 + 12_000 });
    const { container } = render(
      <>
        <DataAge receivedAt={T0} clock={clock} variant="compact" connection="reconnecting" />
        <DataAge receivedAt={T0} clock={clock} variant="compact" connection="ok" />
      </>
    );
    const [reconnecting, ok] = container.querySelectorAll('.csk-data-age');
    expect(reconnecting).toHaveClass('csk-data-age--reconnecting');
    expect(reconnecting.querySelector('.csk-data-age__connection')).toBeNull();
    expect(visibleText(reconnecting)).toBe('před 12 s');
    expect(reconnecting).toHaveTextContent('obnovuji spojení, aktualizováno před 12 s');
    expect(reconnecting).toHaveAttribute('title', 'obnovuji spojení · aktualizováno před 12 s');
    expect(ok).toHaveAttribute('title', 'aktualizováno před 12 s');
    expect(ok).toHaveTextContent('připojeno, aktualizováno před 12 s');
  });

  it('absolute and empty forms drop only the prefix', () => {
    const clock = createTestClock({ now: T0 + 30_000 });
    const { container } = render(
      <>
        <DataAge receivedAt={T0} clock={clock} variant="compact" mode="absolute" timeZone="Europe/Prague" />
        <DataAge receivedAt={null} clock={clock} variant="compact" />
      </>
    );
    const [absolute, empty] = container.querySelectorAll('.csk-data-age');
    expect(visibleText(absolute)).toBe('14:32:10');
    expect(absolute).toHaveAttribute('title', 'stav ze 14:32:10');
    expect(visibleText(empty)).toBe('zatím bez dat');
    expect(empty.querySelector('.csk-data-age__sr')).toBeNull();
    expect(empty.querySelector('.csk-data-age__dot')).not.toBeNull();
  });

  it('a title prop overrides the generated one', () => {
    const clock = createTestClock({ now: T0 + 1_000 });
    const { container } = render(<DataAge receivedAt={T0} clock={clock} variant="compact" title="Stáří dat" />);
    expect(container.querySelector('.csk-data-age')).toHaveAttribute('title', 'Stáří dat');
  });
});

describe('DataAge and real time', () => {
  let spy: ReturnType<typeof spyOnRealTime> | undefined;
  afterEach(() => spy?.restore());

  it('never reads real time', () => {
    spy = spyOnRealTime();
    const clock = createTestClock({ now: T0 });
    const { unmount } = render(
      <>
        <DataAge receivedAt={T0} clock={clock} connection="ok" />
        <DataAge receivedAt={T0} clock={clock} mode="absolute" timeZone="Europe/Prague" />
      </>
    );
    act(() => clock.advance(65_000));
    unmount();
    expect(spy.calls).toEqual([]);
    expect(Date.now).not.toHaveBeenCalled();
  });
});
