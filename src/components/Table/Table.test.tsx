import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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
