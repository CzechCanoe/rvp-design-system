import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Table, type ColumnDef } from './Table';

interface Row {
  id: number;
  name: string;
}

const columns: ColumnDef<Row>[] = [
  { key: 'id', header: '#', accessor: 'id' },
  { key: 'name', header: 'Jméno', accessor: 'name' },
];
const data: Row[] = [
  { id: 1, name: 'PRSKAVEC Jiří' },
  { id: 2, name: 'HRADILEK Vít' },
];

// jsdom has no layout: fake the wrapper's scroll geometry.
const fakeOverflow = (scrollWidth: number, clientWidth: number) => {
  vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(scrollWidth);
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(clientWidth);
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Table scroll region', () => {
  it('adds no tab stop when the table fits', () => {
    fakeOverflow(600, 600);
    const { container } = render(<Table columns={columns} data={data} caption="Startovka" />);
    const wrapper = container.querySelector('.csk-table-wrapper');
    expect(wrapper).not.toHaveAttribute('tabindex');
    expect(wrapper).not.toHaveAttribute('role');
  });

  it('makes an overflowing wrapper a focusable region named by the caption', () => {
    fakeOverflow(900, 360);
    render(<Table columns={columns} data={data} caption="Startovka" />);
    const region = screen.getByRole('region', { name: 'Startovka' });
    expect(region).toHaveClass('csk-table-wrapper');
    expect(region).toHaveAttribute('tabindex', '0');
  });

  it('keeps an overflowing wrapper keyboard-focusable without a caption', () => {
    fakeOverflow(900, 360);
    const { container } = render(<Table columns={columns} data={data} />);
    const wrapper = container.querySelector('.csk-table-wrapper');
    expect(wrapper).toHaveAttribute('tabindex', '0');
    expect(wrapper).not.toHaveAttribute('role');
  });
});

describe('Table sortable headers', () => {
  const sortableColumns: ColumnDef<Row>[] = [
    { key: 'id', header: '#', accessor: 'id' },
    { key: 'name', header: 'Jméno', accessor: 'name', sortable: true },
  ];
  const names = () =>
    screen
      .getAllByRole('row')
      .slice(1)
      .map((row) => within(row).getAllByRole('cell')[1].textContent);

  it('renders the sortable header as a button inside a plain th', () => {
    render(<Table columns={sortableColumns} data={data} />);
    const button = screen.getByRole('button', { name: 'Jméno' });
    const th = button.closest('th');
    expect(th).toHaveAttribute('aria-sort', 'none');
    expect(th).not.toHaveAttribute('tabindex');
    // A non-sortable header has no button and no aria-sort
    const idTh = screen.getByRole('columnheader', { name: '#' });
    expect(within(idTh).queryByRole('button')).toBeNull();
    expect(idTh).not.toHaveAttribute('aria-sort');
  });

  it('cycles the sort with Enter and Space from the keyboard', async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    render(<Table columns={sortableColumns} data={data} onSortChange={onSortChange} />);
    const th = screen.getByRole('columnheader', { name: 'Jméno' });

    await user.tab();
    expect(screen.getByRole('button', { name: 'Jméno' })).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(th).toHaveAttribute('aria-sort', 'ascending');
    expect(names()).toEqual(['HRADILEK Vít', 'PRSKAVEC Jiří']);
    expect(onSortChange).toHaveBeenLastCalledWith('name', 'asc');

    await user.keyboard(' ');
    expect(th).toHaveAttribute('aria-sort', 'descending');
    expect(names()).toEqual(['PRSKAVEC Jiří', 'HRADILEK Vít']);
    expect(onSortChange).toHaveBeenLastCalledWith('name', 'desc');

    await user.keyboard('{Enter}');
    expect(th).toHaveAttribute('aria-sort', 'none');
    expect(names()).toEqual(['PRSKAVEC Jiří', 'HRADILEK Vít']);
    expect(onSortChange).toHaveBeenLastCalledWith(null, null);
  });
});
