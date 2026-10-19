import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { TimeValue } from './TimeValue';
import { formatTimeParts } from './formatTime';

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

describe('TimeValue', () => {
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
