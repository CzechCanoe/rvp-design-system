import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TableToolbar, TableToolbarButton } from './TableToolbar';
import { FavoritesToggle } from '../FavoritesToggle';
import { SearchInput } from '../SearchInput';
import { Switch } from '../Switch';

const meta = {
  title: 'Components/TableToolbar',
  component: TableToolbar,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TableToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo({ initialDetail = false }: { initialDetail?: boolean }) {
  const [q, setQ] = useState('');
  const [fav, setFav] = useState(false);
  const [detail, setDetail] = useState(initialDetail);
  return (
    <TableToolbar
      aria-label="Nástroje tabulky"
      search={
        <SearchInput
          size="sm"
          fullWidth
          aria-label="Hledat závodníka"
          placeholder="Hledat závodníka"
          value={q}
          onChange={setQ}
        />
      }
      favorites={<FavoritesToggle pressed={fav} onPressedChange={setFav} count={2} label="Jen oblíbení" />}
      detail={
        <Switch
          size="sm"
          label="Detailní"
          checked={detail}
          onChange={(e) => setDetail(e.target.checked)}
        />
      }
    >
      <TableToolbarButton>Kategorie ▾</TableToolbarButton>
    </TableToolbar>
  );
}

export const Default: Story = {
  args: { 'aria-label': 'Nástroje tabulky' },
  render: () => (
    <div style={{ width: 720 }}>
      <Demo />
    </div>
  ),
};

/** 390 px wide: the search field shrinks, pills and toggles keep their width. */
export const Mobile: Story = {
  args: { 'aria-label': 'Nástroje tabulky' },
  render: () => (
    <div style={{ width: 390 }}>
      <Demo />
    </div>
  ),
};

/** "Detailní" switch turned on (role="switch", whole row is a 44 px touch target). */
export const DetailOn: Story = {
  args: { 'aria-label': 'Nástroje tabulky' },
  render: () => (
    <div style={{ width: 720 }}>
      <Demo initialDetail />
    </div>
  ),
};
