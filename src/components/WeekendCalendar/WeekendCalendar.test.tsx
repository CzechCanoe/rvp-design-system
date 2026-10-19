import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DeadlineBadge } from '../DeadlineBadge';
import { WeekendCalendar } from './WeekendCalendar';
import { mayWeekends } from './WeekendCalendar.fixtures';

describe('DeadlineBadge', () => {
  it('uses the warning colour only for closing', () => {
    const { container, rerender } = render(<DeadlineBadge kind="closing" />);
    expect(container.querySelector('.csk-badge--warning')).not.toBeNull();
    rerender(<DeadlineBadge kind="closed" />);
    expect(container.querySelector('.csk-badge--warning')).toBeNull();
    expect(container.querySelector('.csk-badge--error')).toBeNull();
  });

  it('puts the date of late entries into the label and other dates under the badge', () => {
    const { rerender } = render(<DeadlineBadge kind="late" date="pá 18:00" />);
    expect(screen.getByText('Dohlášky do pá 18:00')).toBeInTheDocument();
    rerender(<DeadlineBadge kind="closing" label="Uzávěrka za 5 dní" date="st 13. 5. 23:59" />);
    expect(screen.getByText('Uzávěrka za 5 dní')).toBeInTheDocument();
    expect(screen.getByText('st 13. 5. 23:59')).toBeInTheDocument();
  });
});

describe('WeekendCalendar', () => {
  it('renders every group and event and marks only the current weekend', () => {
    const { container } = render(<WeekendCalendar weekends={mayWeekends} aria-label="Kalendář" />);
    expect(container.querySelectorAll('.csk-weekend-calendar__group')).toHaveLength(mayWeekends.length);
    expect(container.querySelectorAll('.csk-weekend-calendar__event')).toHaveLength(
      mayWeekends.reduce((n, g) => n + g.events.length, 0)
    );
    const current = container.querySelectorAll('[aria-current="date"]');
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveTextContent('16.–17. 5.');
  });

  it('links the title and exposes the favourite state as text', () => {
    render(<WeekendCalendar weekends={mayWeekends} aria-label="Kalendář" />);
    expect(screen.getByRole('link', { name: 'Český pohár #2 ve slalomu' })).toHaveAttribute('href', '#zavod');
    expect(screen.getByText('Sledovaný závod')).toBeInTheDocument();
  });
});
