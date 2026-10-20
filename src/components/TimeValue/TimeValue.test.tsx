import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { TimeValue } from './TimeValue';
import { formatClockParts, formatTimeParts } from './formatTime';

const text = (el: HTMLElement) => el.textContent;

describe('formatTimeParts', () => {
  it('formats seconds with the given precision', () => {
    expect(formatTimeParts(89.81, 2, false)).toEqual({ sign: '', int: '89', frac: '81' });
    expect(formatTimeParts(46.5, 1, false)).toEqual({ sign: '', int: '46', frac: '5' });
    expect(formatTimeParts(102.4, 2, false)).toEqual({ sign: '', int: '102', frac: '40' });
  });

  it('signs differences with + and U+2212, zero unsigned', () => {
    expect(formatTimeParts(1.53, 2, true).sign).toBe('+');
    expect(formatTimeParts(-0.87, 2, true).sign).toBe('−');
    expect(formatTimeParts(-0.87, 2, false).sign).toBe('−');
    expect(formatTimeParts(0, 2, true).sign).toBe('');
    expect(formatTimeParts(-0.001, 2, true).sign).toBe('');
  });
});

describe('formatClockParts', () => {
  it('writes m:ss under an hour and h:mm:ss from an hour on', () => {
    expect(formatClockParts(842.6, 1, false)).toEqual({ sign: '', int: '14:02', frac: '6' });
    expect(formatClockParts(31.2, 1, false)).toEqual({ sign: '', int: '0:31', frac: '2' });
    expect(formatClockParts(0, 1, false)).toEqual({ sign: '', int: '0:00', frac: '0' });
    expect(formatClockParts(4502.25, 2, false)).toEqual({ sign: '', int: '1:15:02', frac: '25' });
  });

  it('rounds before splitting, so the seconds never read 60', () => {
    expect(formatClockParts(59.96, 1, false)).toEqual({ sign: '', int: '1:00', frac: '0' });
    expect(formatClockParts(3599.97, 1, false)).toEqual({ sign: '', int: '1:00:00', frac: '0' });
  });

  it('signs differences like the seconds format', () => {
    expect(formatClockParts(62.3, 1, true)).toEqual({ sign: '+', int: '1:02', frac: '3' });
    expect(formatClockParts(-5.04, 1, true)).toEqual({ sign: '−', int: '0:05', frac: '0' });
    expect(formatClockParts(0.01, 1, true).sign).toBe('');
  });
});

describe('TimeValue', () => {
  it('formats seconds by default with 2 decimals, clock with 1 (#84.7)', () => {
    const { container } = render(
      <>
        <TimeValue value={842.6} />
        <TimeValue value={842.6} format="clock" />
        <TimeValue value={842.64} format="clock" precision={2} />
        <TimeValue value={31.2} format="clock" sign />
        <TimeValue value={{ state: 'not-yet' }} format="clock" align="decimal" />
      </>
    );
    const [seconds, clock, clock2, diff, unknown] = container.querySelectorAll<HTMLElement>('.csk-time-value');
    expect(text(seconds)).toBe('842.60');
    expect(text(clock)).toBe('14:02.6');
    expect(text(clock2)).toBe('14:02.64');
    expect(text(diff)).toBe('+0:31.2');
    expect(unknown.querySelector('.csk-time-value__frac--placeholder')?.textContent).toBe('.0');
  });

  it('aligns a clock time on the decimal point', () => {
    const { container } = render(<TimeValue value={842.6} format="clock" align="decimal" />);
    expect(container.querySelector('.csk-time-value__int')?.textContent).toBe('14:02');
    expect(container.querySelector('.csk-time-value__frac')?.textContent).toBe('.6');
  });

  it('renders a known value, including a real zero', () => {
    const { container } = render(
      <>
        <TimeValue value={89.81} />
        <TimeValue value={{ state: 'known', value: 0 }} />
      </>
    );
    const [a, b] = container.querySelectorAll<HTMLElement>('.csk-time-value');
    expect(text(a)).toBe('89.81');
    expect(text(b)).toBe('0.00');
    expect(b).toHaveAttribute('data-state', 'known');
  });

  it('renders not-yet, unavailable and null alike as not known', () => {
    const { container } = render(
      <>
        <TimeValue value={{ state: 'not-yet' }} />
        <TimeValue value={{ state: 'unavailable', reason: 'source-unreachable' }} />
        <TimeValue value={null} />
      </>
    );
    const els = [...container.querySelectorAll<HTMLElement>('.csk-time-value')];
    expect(els.map((el) => el.getAttribute('data-state'))).toEqual(['not-yet', 'unavailable', 'not-yet']);
    for (const el of els) {
      expect(el).toHaveClass('csk-time-value--unknown');
      expect(text(el)).toBe('—neznámo');
    }
  });

  it('accepts the c123 contract envelope as is', () => {
    const contractValue = {
      state: 'known' as const,
      value: 82.36,
      observedAt: '2026-09-15T10:14:02.083Z',
      source: 'tcp' as const,
      confidence: 'authoritative' as const,
      provisional: false,
    };
    const { container } = render(<TimeValue value={contractValue} />);
    expect(text(container.firstElementChild as HTMLElement)).toBe('82.36');
  });

  it('applies variant classes', () => {
    const { container } = render(<TimeValue value={46.5} precision={1} variant="running" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveClass('csk-time-value', 'csk-time-value--running');
    expect(text(el)).toBe('46.5');
  });

  it('splits integer and fraction for decimal alignment', () => {
    const { container } = render(<TimeValue value={-0.87} sign align="decimal" />);
    expect(container.querySelector('.csk-time-value__int')?.textContent).toBe('−0');
    expect(container.querySelector('.csk-time-value__frac')?.textContent).toBe('.87');
  });
});
