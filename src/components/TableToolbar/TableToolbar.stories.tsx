import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TableToolbar, TableToolbarButton } from './TableToolbar';
import { FavoritesToggle } from '../FavoritesToggle';
import { SearchInput } from '../SearchInput';
import { SegmentedControl } from '../SegmentedControl';
import { Switch } from '../Switch';

const meta = {
  title: 'Components/TableToolbar',
  component: TableToolbar,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TableToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const rounds = [
  { value: '1', label: '1. jízda' },
  { value: '2', label: '2. jízda' },
];

function Demo({ initialDetail = false, withRound = false }: { initialDetail?: boolean; withRound?: boolean }) {
  const [q, setQ] = useState('');
  const [fav, setFav] = useState(false);
  const [detail, setDetail] = useState(initialDetail);
  const [round, setRound] = useState('2');
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
      {withRound && <SegmentedControl items={rounds} value={round} onChange={setRound} size="sm" aria-label="Kolo" />}
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

/**
 * 390 px wide: the search keeps at least 10rem; when the controls do not fit next to it,
 * they move as a group to the second row and the search takes the full first row.
 */
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

/**
 * 390 px with every control of c123-live-mini (round · Kategorie · ★ · Detailní): search on the full
 * first row, the controls wrap whole below it; no label wraps and nothing overflows.
 */
export const Crowded390: Story = {
  args: { 'aria-label': 'Nástroje tabulky' },
  render: () => (
    <div style={{ width: 390 }}>
      <Demo withRound />
    </div>
  ),
};

/** Few controls fit next to the search on one row even at 390 px (reference Live1: Kategorie · ★). */
export const OneRow390: Story = {
  args: { 'aria-label': 'Nástroje tabulky' },
  render: () => {
    const [q, setQ] = useState('');
    const [fav, setFav] = useState(false);
    return (
      <div style={{ width: 390 }}>
        <TableToolbar
          aria-label="Nástroje tabulky"
          search={
            <SearchInput size="sm" fullWidth aria-label="Hledat závodníka" placeholder="Hledat závodníka" value={q} onChange={setQ} />
          }
          favorites={<FavoritesToggle pressed={fav} onPressedChange={setFav} count={2} label="Jen oblíbení" />}
        >
          <TableToolbarButton>Kategorie ▾</TableToolbarButton>
        </TableToolbar>
      </div>
    );
  },
};
