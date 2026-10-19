import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { EntryTable } from './EntryTable';
import { ProposalList } from '../ProposalList';
import { SummaryCard } from '../SummaryCard';
import { c2Boats, categoryOptions, checkColumns, k1Boats, proposals } from './EntryTable.fixtures';

const table = (props = {}) => (
  <EntryTable caption="K1 muži" boats={k1Boats} checkColumns={checkColumns} categoryOptions={categoryOptions} {...props} />
);

describe('EntryTable', () => {
  it('renders one row per single boat with checks as badges and a screen-reader prefix on warnings', () => {
    render(table());
    expect(screen.getAllByRole('row')).toHaveLength(1 + k1Boats.length);
    const warn = screen.getByText('propadla 3. 4.');
    expect(warn.closest('.csk-badge')).toHaveClass('csk-badge--warning');
    expect(warn.closest('.csk-badge')).toHaveTextContent('Upozornění: propadla 3. 4.');
  });

  it('renders a C2 as one boat in two rows with spanning cells and an open seat', () => {
    render(table({ caption: 'C2 mix', boats: c2Boats }));
    const bodies = document.querySelectorAll('tbody');
    expect(bodies).toHaveLength(2);
    expect(bodies[0].querySelectorAll('tr')).toHaveLength(2);
    expect(bodies[0].querySelectorAll('td[rowspan="2"]')).toHaveLength(3);
    expect(bodies[1].querySelectorAll('tr')).toHaveLength(2);
    expect(screen.getByText('druhé místo v lodi je volné')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Posádka' })).toBeInTheDocument();
  });

  it('labels the category select and associates the warning hint', () => {
    render(table());
    const hinted = screen.getAllByRole('combobox')[2];
    expect(hinted).toHaveAccessibleName(/Věková kategorie/);
    expect(hinted).toHaveAccessibleDescription('ročník 2011 odpovídá U16');
  });

  it('never disables anything because of warnings and reports the actions', () => {
    const onCategoryChange = vi.fn();
    const onRemove = vi.fn();
    const onReplaceMember = vi.fn();
    render(table({ boats: [...k1Boats, ...c2Boats], onCategoryChange, onRemove, onReplaceMember }));
    expect(document.querySelectorAll('button:disabled, select:disabled')).toHaveLength(0);
    fireEvent.change(screen.getAllByRole('combobox')[0], { target: { value: 'u23' } });
    expect(onCategoryChange).toHaveBeenCalledWith(k1Boats[0], 'u23');
    fireEvent.click(screen.getAllByRole('button', { name: /^Odebrat závodníka/ })[1]);
    expect(onRemove).toHaveBeenCalledWith(k1Boats[1]);
    fireEvent.click(screen.getAllByRole('button', { name: /^Vyměnit člena lodi/ })[0]);
    expect(onReplaceMember).toHaveBeenCalledWith(c2Boats[0]);
    expect(screen.getAllByRole('button', { name: /^Odebrat loď/ })).toHaveLength(2);
  });

  it('shows an empty state', () => {
    render(table({ boats: [] }));
    expect(screen.getByText('Zatím žádná přihlášená loď')).toBeInTheDocument();
    expect(screen.queryByRole('table')).toBeNull();
  });
});

describe('ProposalList', () => {
  it('shows the count and reports Confirm / Reject with the proposal', () => {
    const onConfirm = vi.fn();
    const onReject = vi.fn();
    render(<ProposalList proposals={proposals} onConfirm={onConfirm} onReject={onReject} />);
    expect(screen.getByText('2 čekají')).toBeInTheDocument();
    const items = screen.getAllByRole('listitem');
    fireEvent.click(within(items[1]).getByRole('button', { name: /^Potvrdit návrh/ }));
    expect(onConfirm).toHaveBeenCalledWith(proposals[1]);
    fireEvent.click(within(items[0]).getByRole('button', { name: /^Odmítnout návrh/ }));
    expect(onReject).toHaveBeenCalledWith(proposals[0]);
  });

  it('renders nothing without proposals', () => {
    const { container } = render(<ProposalList proposals={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe('SummaryCard', () => {
  it('renders rows as a description list and the total', () => {
    render(<SummaryCard rows={[{ label: 'Lodí', value: 6 }]} total={{ label: 'Startovné', value: '2 000 Kč' }} note="VS 1" />);
    expect(screen.getByRole('heading', { name: 'Souhrn' })).toBeInTheDocument();
    expect(screen.getByText('Lodí').nextSibling).toHaveTextContent('6');
    expect(screen.getByText('Startovné').nextSibling).toHaveTextContent('2 000 Kč');
    expect(screen.getByText('VS 1')).toBeInTheDocument();
  });
});
