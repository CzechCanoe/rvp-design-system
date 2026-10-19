import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { createTestClock } from '../../clock/testClock';
import { OnCoursePanel } from './OnCoursePanel';
import { STALE_SINCE, STORY_NOW, liveRiders, sixRiders } from './OnCoursePanel.fixtures';

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
});
