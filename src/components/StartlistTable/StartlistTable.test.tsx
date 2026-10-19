import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { StartlistTable, type StartlistRow } from './StartlistTable';
import { ProgramList } from '../ProgramList';

const rows: StartlistRow[] = [
  { id: 'a', bib: 1, name: 'SEMERAD Adam', categoryTag: 'U23', club: 'KK Roudnice', starts: [{ time: '11:21:45' }, { time: '15:21:45' }] },
  { id: 'b', bib: 2, name: 'HRADECKÝ Daniel', starts: [{ mark: 'DNS-A' }, { mark: 'DNS-A' }] },
];

describe('StartlistTable', () => {
  it('renders bib, stacked start times and an inline DNS mark without rank or result', () => {
    const { container } = render(<StartlistTable rows={rows} />);
    const first = screen.getByText('SEMERAD Adam').closest('tr') as HTMLElement;
    expect(within(first).getByText('11:21:45')).toBeInTheDocument();
    expect(within(first).getByText('15:21:45')).toBeInTheDocument();
    expect(first.querySelector('.csk-bib-badge')).toHaveTextContent('1');
    expect(container.querySelector('.csk-results-table__rank')).toBeNull();
    const second = screen.getByText('HRADECKÝ Daniel').closest('tr') as HTMLElement;
    expect(second.querySelectorAll('.csk-results-table__start')).toHaveLength(2);
    expect(second).toHaveTextContent('DNS');
  });

  it('derives the start column header from the number of starts', () => {
    const { rerender } = render(<StartlistTable rows={rows} />);
    expect(screen.getByRole('columnheader', { name: 'Start 1. / 2.' })).toBeInTheDocument();
    rerender(<StartlistTable rows={rows.map((r) => ({ ...r, starts: r.starts.slice(0, 1) }))} />);
    expect(screen.getByRole('columnheader', { name: 'Start' })).toBeInTheDocument();
  });

  it('reports the favourite toggle with the start-list row', () => {
    const onFavoriteChange = vi.fn();
    render(<StartlistTable rows={rows} onFavoriteChange={onFavoriteChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Oblíbený: SEMERAD Adam' }));
    expect(onFavoriteChange).toHaveBeenCalledWith(rows[0], true);
  });

  it('shows an empty state', () => {
    render(<StartlistTable rows={[]} />);
    expect(screen.getByText('Startovní listina zatím není k dispozici')).toBeInTheDocument();
  });
});

describe('ProgramList', () => {
  it('marks every running item with a Live badge, any number of them', () => {
    const { container } = render(
      <ProgramList
        days={[
          {
            label: 'Neděle 4. 10.',
            items: [
              { time: '13:30', title: 'C1 ženy', running: true, href: '#c1', progress: { done: 9, total: 14 } },
              { time: '13:56', title: 'C1 muži', state: 'unknown', stateLabel: 'čeká' },
              { time: '15:21', title: 'K1 muži', running: true },
            ],
          },
        ]}
      />
    );
    expect(container.querySelectorAll('.csk-program-list__item--running')).toHaveLength(2);
    expect(container.querySelectorAll('.csk-status-badge--live')).toHaveLength(2);
    expect(screen.getByText('9 z 14 v cíli')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'C1 ženy' })).toHaveAttribute('href', '#c1');
    expect(screen.getByText('čeká')).toBeInTheDocument();
  });
});
