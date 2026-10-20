import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { createTestClock } from '../../clock/testClock';
import { OnCoursePanel } from './OnCoursePanel';
import { STALE_SINCE, STORY_NOW, liveRiders, runningPenaltyRiders, sixRiders } from './OnCoursePanel.fixtures';

describe('OnCoursePanel', () => {
  it('renders nothing without riders', () => {
    const { container } = render(<OnCoursePanel riders={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows every rider, none hidden', () => {
    const clock = createTestClock({ now: STORY_NOW });
    render(<OnCoursePanel riders={sixRiders()} clock={clock} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(6);
    expect(screen.getByText('ČERMÁKOVÁ Eliška')).toBeInTheDocument();
  });

  it('shows the status of each state', () => {
    const clock = createTestClock({ now: STORY_NOW });
    render(<OnCoursePanel riders={liveRiders()} clock={clock} />);
    expect(screen.getByText('na startu')).toBeInTheDocument();
    expect(screen.getByText('v cíli · čeká na výsledek')).toBeInTheDocument();
    expect(screen.getByRole('timer')).toHaveTextContent('46.5');
  });

  it('ticks the running time only through the clock', () => {
    const clock = createTestClock({ now: STORY_NOW });
    render(<OnCoursePanel riders={liveRiders()} clock={clock} />);
    act(() => {
      clock.advance(1000);
      clock.flushFrames();
    });
    expect(screen.getByRole('timer')).toHaveTextContent('47.5');
  });

  it('keeps all riders when stale, freezes the time and says since when', () => {
    const clock = createTestClock({ now: STORY_NOW });
    const riders = liveRiders().map((r) =>
      r.status === 'running' ? { ...r, time: { elapsedSeconds: 43.5, receivedAt: STALE_SINCE } } : r
    );
    render(
      <OnCoursePanel riders={riders} stale receivedAt={STALE_SINCE} timeZone="Europe/Prague" clock={clock} />
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('Zastaveno')).toBeInTheDocument();
    expect(screen.getByText('stav ze 14:32:10')).toBeInTheDocument();
    expect(screen.getByRole('timer')).toHaveTextContent('46.5');
    expect(screen.getByRole('timer')).toHaveTextContent('před 42 s');
    act(() => clock.advance(5000));
    expect(screen.getByRole('timer')).toHaveTextContent('46.5');
  });

  it('does not move a running time when the panel goes stale (no jump back)', () => {
    const clock = createTestClock({ now: STORY_NOW });
    const { rerender } = render(<OnCoursePanel riders={liveRiders()} clock={clock} />);
    act(() => {
      clock.advance(5000);
      clock.flushFrames();
    });
    const frozen = screen.getByRole('timer').textContent;
    rerender(<OnCoursePanel riders={liveRiders()} stale receivedAt={STORY_NOW} clock={clock} />);
    expect(screen.getByRole('timer').textContent).toBe(frozen);
  });

  it('writes the penalty of a finished rider as +2 tr.', () => {
    const clock = createTestClock({ now: STORY_NOW });
    render(<OnCoursePanel riders={liveRiders()} clock={clock} />);
    expect(screen.getByText('+2 tr.')).toBeInTheDocument();
  });

  it('collapses through the header toggle', () => {
    const clock = createTestClock({ now: STORY_NOW });
    const onChange = vi.fn();
    const { rerender } = render(
      <OnCoursePanel riders={liveRiders()} clock={clock} collapsed={false} onCollapsedChange={onChange} />
    );
    const toggle = screen.getByRole('button', { name: /sbalit/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(toggle);
    expect(onChange).toHaveBeenCalledWith(true);
    rerender(<OnCoursePanel riders={liveRiders()} clock={clock} collapsed onCollapsedChange={onChange} />);
    expect(screen.getByRole('button', { name: /rozbalit/i })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listitem')).toBeNull();
  });

  it('shows both time-to-beat modes with the holder', () => {
    const clock = createTestClock({ now: STORY_NOW });
    const [a, b] = liveRiders();
    render(
      <OnCoursePanel
        clock={clock}
        riders={[
          { ...a, timeToBeat: { mode: 'target', value: 89.81, holder: 'HNILICA' } },
          { ...b, timeToBeat: { mode: 'delta', value: 0.57, holder: 'KULTAN' } },
        ]}
      />
    );
    expect(screen.getByText(/k překonání/)).toHaveTextContent('89.81 · HNILICA');
    expect(screen.getByText(/k času/)).toHaveTextContent('+0.57 k času KULTAN');
  });

  it('shows the running penalty of riders on course; a value not known is „(·) tr.“, never 0 (T18 b)', () => {
    const clock = createTestClock({ now: STORY_NOW });
    const { container } = render(<OnCoursePanel riders={runningPenaltyRiders()} clock={clock} />);
    const subs = [...container.querySelectorAll('.csk-oncourse-rider')].map(
      (r) => r.querySelector('.csk-oncourse-rider__subs')?.firstElementChild?.textContent
    );
    expect(subs[0]).toBe('+2 tr.');
    expect(subs[1]).toBe('+52 tr.');
    expect(subs[2]).toBe('+0 tr.');
    expect(subs[3]).toMatch(/^\(·\)neposouzeno tr\.$/);
  });

  it('shows no running penalty when none is passed', () => {
    const clock = createTestClock({ now: STORY_NOW });
    render(<OnCoursePanel riders={liveRiders()} clock={clock} />);
    // only the finished rider (REZEK) carries a penalty in Live1
    expect(screen.getAllByText(/tr\.$/)).toHaveLength(1);
  });

  it('labels the gate chips of a rider with gate numbers (#84.11)', () => {
    const clock = createTestClock({ now: STORY_NOW });
    const { container } = render(<OnCoursePanel riders={liveRiders()} clock={clock} />);
    const chips = [...container.querySelectorAll('.csk-oncourse-rider .csk-penalty-chip')];
    expect(chips).toHaveLength(22);
    expect(chips.map((c) => c.textContent)).toEqual(Array.from({ length: 22 }, (_, i) => String(i + 1)));
    expect(chips[2]).toHaveAttribute('title', 'Branka 3: 2 s');
    expect(chips[2]).toHaveClass('csk-penalty-chip--touch');
    expect(chips[12]).toHaveClass('csk-penalty-chip--unjudged');
  });
});
