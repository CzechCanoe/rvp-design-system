import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ReactNode } from 'react';
import { ClockProvider, createTestClock } from '../../clock';
import { FavoritesToggle } from '../FavoritesToggle';
import { FilterPills } from '../FilterPills';
import { ResultsTable, type ResultRow, type ResultRowId } from '../ResultsTable';
import { STORY_NOW, brRows, categoryRows } from '../ResultsTable/ResultsTable.fixtures';
import { SearchInput } from '../SearchInput';
import { Switch } from '../Switch';
import { Dropdown, DropdownButton } from '../Dropdown';
import { ResultsPanel } from './ResultsPanel';

const CATEGORIES = ['U14', 'U16', 'U18', 'U23', 'Muži', 'Veteráni'];

/** „Kategorie ▾“ filter menu: Dropdown with the TableToolbar pill trigger; picking one sets the filter. */
function CategoryMenu({ onSelect }: { onSelect: (category: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Dropdown
      size="sm"
      open={open}
      onOpenChange={setOpen}
      aria-label="Kategorie"
      items={CATEGORIES.map((c) => ({ id: c, label: c, onClick: () => onSelect(c) }))}
      trigger={
        <DropdownButton variant="pill" open={open}>
          Kategorie
        </DropdownButton>
      }
    />
  );
}

/** Static stories: frames are never flushed, so running times never tick in screenshots. */
const storyClock = createTestClock({ now: STORY_NOW });

const meta: Meta<typeof ResultsPanel> = {
  title: 'Components/ResultsPanel',
  component: ResultsPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'One card around a results table (reference Live1–5, Zavod): **toolbar** (`search`, `filters`, `favorites`, ' +
          '`detail` → `TableToolbar`), **status line** (`state` → `StatusBadge`, `status` text), the **table** as children ' +
          '(`ResultsTable`, `StartlistTable`) and a **footer** (`footer` left, `footerLinks` right). Layout only: search text, ' +
          'favourites, filters and expanded rows are the application’s state.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ClockProvider clock={storyClock}>
        <Story />
      </ClockProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ResultsPanel>;

/** Toolbar state and expandable rows held locally, as the application does. */
function Demo({
  rows: initial,
  columns = 'pair',
  category: initialCategory,
  detailSwitch = false,
  ...panel
}: {
  rows: ResultRow[];
  columns?: 'single' | 'pair';
  category?: string;
  detailSwitch?: boolean;
  state?: 'provisional' | 'official';
  status?: string;
  footer?: string;
  footerLinks?: ReactNode;
}) {
  const [rows, setRows] = useState(initial);
  const [q, setQ] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [category, setCategory] = useState(initialCategory);
  const [detail, setDetail] = useState(false);
  const [expanded, setExpanded] = useState<ResultRowId | null>(null);
  return (
    <ResultsPanel
      {...panel}
      search={
        <SearchInput size="sm" fullWidth aria-label="Hledat závodníka" placeholder="Hledat závodníka" value={q} onChange={setQ} />
      }
      filters={
        category ? (
          <FilterPills
            size="sm"
            aria-label="Aktivní filtry"
            filters={[{ key: category, label: category, dismissible: true }]}
            onRemove={() => setCategory(undefined)}
          />
        ) : (
          <CategoryMenu onSelect={setCategory} />
        )
      }
      favorites={
        <FavoritesToggle
          pressed={onlyFavorites}
          onPressedChange={setOnlyFavorites}
          count={rows.filter((r) => r.favorite).length}
          label="Jen oblíbení"
        />
      }
      detail={
        detailSwitch ? (
          <Switch size="sm" label="Detailní" checked={detail} onChange={(e) => setDetail(e.target.checked)} />
        ) : undefined
      }
    >
      <ResultsTable
        rows={onlyFavorites ? rows.filter((r) => r.favorite) : rows}
        columns={columns}
        clock={storyClock}
        expandedId={detail ? rows.map((r) => r.id) : expanded}
        onToggle={(id) => setExpanded((current) => (current === id ? null : id))}
        onFavoriteChange={(row, favorite) =>
          setRows((current) => current.map((r) => (r.id === row.id ? { ...r, favorite } : r)))
        }
      />
    </ResultsPanel>
  );
}

/** Running results (reference Live1): toolbar, provisional status line, two runs, footer with a link. */
export const Default: Story = {
  render: () => (
    <Demo
      rows={brRows.slice(0, 6)}
      state="provisional"
      status="po 2. jízdě · 8 z 24 v cíli"
      footer="24 lodí, zobrazeno 6"
      footerLinks={<a href="#all">Zobrazit všechny</a>}
      detailSwitch
    />
  ),
};

/** Official results with an active category filter (reference Live4) and two footer links. */
export const Official: Story = {
  render: () => (
    <Demo
      rows={categoryRows}
      columns="single"
      category="U18"
      state="official"
      status="schváleno 20. 9. 16:40 · pořadí v U18, vedle celkové"
      footer="7 v U18 · 31 celkem"
      footerLinks={
        <>
          <a href="#pdf">Oficiální PDF</a>
          <a href="#kanoe">Na kanoe.cz</a>
        </>
      }
    />
  ),
};

/** Only the table: no toolbar, status line or footer is drawn when its props are missing. */
export const TableOnly: Story = {
  render: () => (
    <ResultsPanel>
      <ResultsTable rows={[]} columns="pair" clock={storyClock} emptyState="Zatím žádné výsledky" />
    </ResultsPanel>
  ),
};
