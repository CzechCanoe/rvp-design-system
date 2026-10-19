import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { createTestClock } from '../../clock';
import { ResultsTable } from './ResultsTable';
import { RunDetail } from './RunDetail';
import type { ResultRow } from './types';
import {
  STORY_NOW,
  brRows,
  categoryRows,
  dnsRow,
  known,
  makeRows,
  markRows,
  rezekDetail,
  startlistRows,
} from './ResultsTable.fixtures';

const clock = createTestClock({ now: STORY_NOW });

const rowOf = (container: HTMLElement, name: string) => {
  const cell = within(container).getByText(name).closest('tr');
  if (!cell) throw new Error(`row ${name} not found`);
  return cell as HTMLTableRowElement;
};

describe('ResultsTable', () => {
  it('renders mobile and desktop cells of a pair race; podium stripe and coloured rank', () => {
    const { container } = render(<ResultsTable rows={brRows} columns="pair" clock={clock} />);
    const first = rowOf(container, 'HNILICA Lukas');
    expect(first).toHaveClass('csk-results-table__row--podium-1');
    expect(first.querySelector('.csk-rank-value--podium-1')).toHaveTextContent('1');
    // mobile stack (2 lines) + 2 desktop run cells
    expect(first.querySelectorAll('.csk-results-table__stack-time')).toHaveLength(2);
    expect(first.querySelectorAll('td.csk-results-table__run-time')).toHaveLength(2);
    // best run highlighted
    expect(first.querySelectorAll('.csk-time-value--best')).toHaveLength(2); // mobile + desktop copy
    expect(within(first).getAllByText('89.81').length).toBeGreaterThan(0);
  });

  it('shows the penalty as „(2)“ on mobile and as a PenaltyChip on desktop; null is not judged, never 0', () => {
    const rows: ResultRow[] = [
      { ...brRows[1], runs: [{ time: known(98.05), penalty: 2 }, { time: known(90.38), penalty: null, best: true }] },
    ];
    const { container } = render(<ResultsTable rows={rows} columns="pair" />);
    const texts = [...container.querySelectorAll('.csk-penalty-text')].map((n) => n.textContent);
    expect(texts).toEqual(['(2)', '(·)neposouzeno']);
    expect(container.querySelector('.csk-penalty-chip--touch')).not.toBeNull();
    expect(container.querySelector('.csk-penalty-chip--unjudged')).not.toBeNull();
  });

  it('ticks a running run only through the clock and marks the row on course', () => {
    const { container } = render(<ResultsTable rows={brRows} columns="pair" clock={clock} />);
    const row = rowOf(container, 'KULTAN Andrej');
    expect(row).toHaveClass('csk-results-table__row--running');
    expect(row.querySelectorAll('.csk-running-time')).toHaveLength(2);
    expect(row.querySelector('.csk-running-time .csk-time-value')).toHaveTextContent('46.5');
    expect(within(row).getAllByText('na trati').length).toBe(2);
    expect(row.querySelector('.csk-results-table__result .csk-time-value--muted')).toHaveTextContent('92.60');
  });

  it('diff not-yet: result muted and „čeká“; no diff: „–“; known diff: signed', () => {
    const { container } = render(<ResultsTable rows={brRows} columns="pair" clock={clock} />);
    const waiting = rowOf(container, 'UHLÍK Jan');
    expect(within(waiting).getAllByText('čeká').length).toBe(2);
    expect(waiting.querySelector('.csk-results-table__result-main .csk-time-value--muted')).not.toBeNull();
    const leader = rowOf(container, 'HNILICA Lukas');
    expect(leader.querySelector('.csk-results-table__diff')).toHaveTextContent('–');
    expect(rowOf(container, 'REZEK Adam').querySelector('.csk-results-table__diff')).toHaveTextContent('+0.57');
  });

  it('review row: tinted, badge and note before the club', () => {
    const { container } = render(<ResultsTable rows={brRows} columns="pair" clock={clock} />);
    const row = rowOf(container, 'STYBNAR Matěj');
    expect(row).toHaveClass('csk-results-table__row--review');
    const secondary = row.querySelector('.csk-athlete-name__secondary');
    expect(secondary?.textContent).toBe('V revizibranka 16 · SKUP Olomouc');
  });

  it('a mark takes precedence over the time: in the run cells, else in the result cell', () => {
    const { container } = render(<ResultsTable rows={markRows} columns="pair" />);
    const dns = rowOf(container, 'HRADECKÝ Daniel');
    expect(dns.querySelectorAll('.csk-mark-badge')).toHaveLength(4); // 2 runs × (mobile + desktop)
    expect(dns.querySelector('.csk-results-table__result-main')).toHaveTextContent('–');
    expect(dns.querySelector('.csk-rank-value--none')).not.toBeNull();

    const excused = rowOf(container, 'KOLÁŘ Vít');
    expect(excused.querySelector('.csk-results-table__result-main .csk-mark-badge')).toHaveTextContent('DNS-A');

    const dnfRun = rowOf(container, 'PAVLÍK Ondřej');
    expect(dnfRun.querySelector('.csk-results-table__result-main')).toHaveTextContent('93.40');
  });

  it('NR keeps the time (muted), shows the mark in the name line and „mimo pořadí“', () => {
    const { container } = render(<ResultsTable rows={markRows} columns="pair" />);
    const nr = rowOf(container, 'VESELÝ Jan');
    expect(nr.querySelector('.csk-athlete-name__secondary .csk-mark-badge')).toHaveTextContent('NR');
    expect(nr.querySelector('.csk-results-table__result-main .csk-time-value--muted')).toHaveTextContent('99.40');
    expect(within(nr).getAllByText('mimo pořadí').length).toBe(2);
    expect(nr.querySelector('.csk-rank-value--none')).toHaveTextContent('bez pořadí');
  });

  it('unavailable values render as not known (—), not as 0', () => {
    const { container } = render(<ResultsTable rows={markRows} columns="pair" />);
    const row = rowOf(container, 'ŘÍHA Adam');
    expect(row.querySelectorAll('.csk-time-value--unknown').length).toBeGreaterThan(0);
    expect(row.textContent).not.toMatch(/0\.00/);
  });

  it('category view: category rank with the class rank under it, category as rank header', () => {
    render(<ResultsTable rows={categoryRows} columns="single" />);
    expect(screen.getByRole('columnheader', { name: 'U18' })).toBeInTheDocument();
    const first = screen.getByText('BICAN Vojtěch').closest('tr')!;
    expect(first.querySelector('.csk-rank-value__main')).toHaveTextContent('1');
    expect(first.querySelector('.csk-rank-value__sub')).toHaveTextContent('3. celk.');
  });

  it('toggles on a click anywhere in the row and on the chevron button, but not on the star', () => {
    const onToggle = vi.fn();
    const onFavoriteChange = vi.fn();
    render(
      <ResultsTable rows={brRows.slice(0, 2)} columns="pair" onToggle={onToggle} onFavoriteChange={onFavoriteChange} />
    );
    fireEvent.click(screen.getByText('REZEK Adam'));
    expect(onToggle).toHaveBeenLastCalledWith('k1m-35', brRows[1]);

    fireEvent.click(screen.getByRole('button', { name: 'Detail: HNILICA Lukas' }));
    expect(onToggle).toHaveBeenCalledTimes(2);
    expect(onToggle).toHaveBeenLastCalledWith('k1m-41', brRows[0]);

    fireEvent.click(screen.getByRole('button', { name: 'Oblíbený: REZEK Adam' }));
    expect(onToggle).toHaveBeenCalledTimes(2);
    expect(onFavoriteChange).toHaveBeenCalledWith(brRows[1], true);
  });

  it('renders the detail in one cell over all columns, linked by aria-controls', () => {
    const { container } = render(
      <ResultsTable
        rows={brRows}
        columns="pair"
        clock={clock}
        expandedId="k1m-35"
        onToggle={() => {}}
        onFavoriteChange={() => {}}
        renderDetail={() => <RunDetail {...rezekDetail} />}
      />
    );
    const button = screen.getByRole('button', { name: 'Detail: REZEK Adam' });
    expect(button).toHaveAttribute('aria-expanded', 'true');
    const detailRow = container.querySelector(`#${CSS.escape(button.getAttribute('aria-controls')!)}`)!;
    expect(detailRow).toHaveClass('csk-results-table__detail-row');
    const cell = detailRow.querySelector('td')!;
    const dataRowCells = rowOf(container, 'REZEK Adam').children.length;
    expect(cell.colSpan).toBe(dataRowCells);
    expect(screen.getByRole('button', { name: 'Detail: HNILICA Lukas' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('button', { name: 'Detail: HNILICA Lukas' })).not.toHaveAttribute('aria-controls');
  });

  it('accepts several expanded ids', () => {
    const { container } = render(
      <ResultsTable
        rows={brRows}
        columns="pair"
        expandedId={['k1m-41', 'k1m-38']}
        onToggle={() => {}}
        renderDetail={(row) => <span>detail {row.bib}</span>}
      />
    );
    expect(container.querySelectorAll('.csk-results-table__detail-row')).toHaveLength(2);
    expect(screen.getByText('detail 38')).toBeInTheDocument();
  });

  it('hides the expand and favourite columns without handlers', () => {
    const { container } = render(<ResultsTable rows={[dnsRow]} columns="pair" />);
    expect(container.querySelector('.csk-results-table__chev')).toBeNull();
    expect(container.querySelector('.csk-results-table__star')).toBeNull();
  });

  it('start list: bib, stacked start times, DNS-A inline', () => {
    const { container } = render(<ResultsTable rows={startlistRows} columns="startlist" />);
    expect(screen.getByRole('columnheader', { name: 'St. č.' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Start' })).toBeInTheDocument();
    const row = rowOf(container, 'ROUSEK David');
    expect(row.querySelector('.csk-bib-badge')).toHaveTextContent('29');
    expect(row.querySelectorAll('.csk-results-table__start')).toHaveLength(2);
    expect(row.querySelector('.csk-mark-badge')).toHaveTextContent('DNS-A');
  });

  it('renders the empty state', () => {
    render(<ResultsTable rows={[]} columns="pair" emptyState="Zatím žádné výsledky" />);
    expect(screen.getByText('Zatím žádné výsledky')).toBeInTheDocument();
  });

  it('overrides labels', () => {
    render(<ResultsTable rows={brRows} columns="pair" clock={clock} labels={{ onCourse: 'on course', result: 'Result' }} />);
    expect(screen.getAllByText('on course').length).toBe(2);
    expect(screen.getByRole('columnheader', { name: 'Result' })).toBeInTheDocument();
  });

  it('renders 100 rows', () => {
    const { container } = render(<ResultsTable rows={makeRows(100)} columns="pair" onToggle={() => {}} />);
    expect(container.querySelectorAll('tbody tr')).toHaveLength(100);
  });
});

describe('RunDetail', () => {
  it('renders bib, ranks, state and both runs; the run that counts is marked', () => {
    const { container } = render(<RunDetail {...rezekDetail} />);
    expect(container.querySelector('.csk-bib-badge')).toHaveTextContent('35');
    expect(container.querySelector('.csk-run-detail__ranks')?.textContent).toBe('2. ve třídě1. v U16 (0.00)');
    expect(screen.getByText('Předběžné')).toBeInTheDocument();
    const runs = container.querySelectorAll('.csk-run-detail__run');
    expect(runs).toHaveLength(2);
    expect(runs[1]).toHaveClass('csk-run-detail__run--counts');
    expect(within(runs[1] as HTMLElement).getByText('počítá se')).toBeInTheDocument();
    expect(within(runs[0] as HTMLElement).getByText('11:22')).toBeInTheDocument();
    expect(within(runs[0] as HTMLElement).getByText(/14\. po 1\. jízdě/)).toBeInTheDocument();
    expect(runs[1].querySelectorAll('.csk-penalty-chip--unjudged')).toHaveLength(2);
  });

  it('loading shows a skeleton with a status role; no runs shows the empty label', () => {
    const { rerender } = render(<RunDetail runs={[]} loading />);
    expect(screen.getByRole('status')).toHaveTextContent('Načítám detail');
    rerender(<RunDetail runs={[]} />);
    expect(screen.getByText('Detail není k dispozici')).toBeInTheDocument();
  });

  it('shows a mark instead of the times and the unavailable course text', () => {
    render(
      <RunDetail
        runs={[
          { label: '1. jízda', time: null, penalty: null, total: null, counts: false, mark: 'DNF' },
          { label: '2. jízda', time: known(90), penalty: null, total: null, counts: false, gates: 'unavailable' },
        ]}
      />
    );
    expect(screen.getByText('DNF')).toHaveClass('csk-mark-badge');
    expect(screen.getByText('bez konfigurace tratě')).toBeInTheDocument();
    expect(screen.getByText('neposouzeno')).toBeInTheDocument();
  });
});

describe('no real time in ResultsTable', () => {
  const sources = import.meta.glob('./*.{ts,tsx}', { query: '?raw', import: 'default', eager: true }) as Record<
    string,
    string
  >;
  const REAL_TIME =
    /\bDate\.now\b|\bperformance\.now\b|(?<![\w.])(?:setTimeout|setInterval|requestAnimationFrame|cancelAnimationFrame|clearTimeout|clearInterval)\s*\(/;
  const files = Object.entries(sources).filter(
    ([path]) => !path.includes('.test.') && !path.includes('.stories.') && !path.includes('.fixtures.')
  );

  it('guards the component sources', () => {
    expect(files.map(([p]) => p.split('/').pop())).toEqual(
      expect.arrayContaining(['ResultsTable.tsx', 'RunDetail.tsx', 'cells.tsx'])
    );
  });

  it.each(files)('%s reads no real time source', (_path, code) => {
    expect(code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')).not.toMatch(REAL_TIME);
  });
});
