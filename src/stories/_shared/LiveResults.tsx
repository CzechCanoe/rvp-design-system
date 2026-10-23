import { createContext, useContext, useState, type ReactNode } from 'react';
import { Dropdown, DropdownButton } from '../../components/Dropdown';
import { FilterPills } from '../../components/FilterPills';
import { FavoritesToggle } from '../../components/FavoritesToggle';
import { Icon } from '../../components/Icon';
import { ResultsPanel, type ResultsPanelProps } from '../../components/ResultsPanel';
import { ResultsTable, RunDetail, type ResultRow, type ResultRowId } from '../../components/ResultsTable';
import { known, rezekDetail } from '../../components/ResultsTable/ResultsTable.fixtures';
import { knownNumber } from '../../components/ResultsTable/values';
import { SearchInput } from '../../components/SearchInput';
import { Switch } from '../../components/Switch';
import { liveClock } from './storyClock';
import './LiveResults.css';

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

/** "Detailní" switch state of the surrounding panel: expands every row of LiveResults. */
const DetailContext = createContext(false);

export interface LiveResultsPanelProps
  extends Omit<ResultsPanelProps, 'search' | 'filters' | 'favorites' | 'detail'> {
  /** Active category filter shown as a dismissible pill instead of the Kategorie button. */
  activeCategory?: string;
  /** Number of favourites; `undefined` = no favourites toggle. */
  favorites?: number;
  searchLabel?: string;
  /** Show the "Detailní" switch (reference Zavod); expands all rows of the LiveResults inside. */
  detailSwitch?: boolean;
}

/**
 * The design system's ResultsPanel with the toolbar state a page holds (search text, ★ filter,
 * category, "Detailní"). The application owns this state in real use; the panel only lays it out.
 */
export function LiveResultsPanel({
  activeCategory,
  favorites,
  searchLabel = 'Hledat závodníka',
  detailSwitch = false,
  children,
  ...panelProps
}: LiveResultsPanelProps) {
  const [detail, setDetail] = useState(false);
  const [q, setQ] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [category, setCategory] = useState(activeCategory);
  return (
    <ResultsPanel
      {...panelProps}
      search={
        <SearchInput size="sm" fullWidth aria-label={searchLabel} placeholder={searchLabel} value={q} onChange={setQ} />
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
        favorites === undefined ? undefined : (
          <FavoritesToggle pressed={onlyFavorites} onPressedChange={setOnlyFavorites} count={favorites} label="Jen oblíbení" />
        )
      }
      detail={
        detailSwitch ? (
          <Switch size="sm" label="Detailní" checked={detail} onChange={(e) => setDetail(e.target.checked)} />
        ) : undefined
      }
    >
      <DetailContext.Provider value={detail}>{children}</DetailContext.Provider>
    </ResultsPanel>
  );
}

const detailActions = (
  <>
    <a className="story-results__link" href="#profil">Profil závodníka</a>
    <a className="story-results__link" href="#sledovat">Sledovat <Icon name="star" size="sm" aria-hidden /></a>
  </>
);

/** Detail of an expanded row: REZEK has the reference detail (Live2), the others a short one derived from the row. */
function renderDetail(row: ResultRow): ReactNode {
  if (row.id === 'k1m-35') return <RunDetail {...rezekDetail} actions={detailActions} />;
  return (
    <RunDetail
      bib={row.bib}
      ranks={[{ rank: row.rank, label: 've třídě' }]}
      runs={row.runs.map((r, i) => {
        const total = knownNumber(r.time);
        const penalty = r.penalty === undefined ? 0 : knownNumber(r.penalty);
        return {
          label: `${i + 1}. jízda`,
          // time without penalties = total - penalty; unknown when either is not known
          time: total !== null && penalty !== null ? known(Math.round((total - penalty) * 100) / 100) : null,
          penalty,
          total: r.time,
          counts: Boolean(r.best),
        };
      })}
      actions={detailActions}
    />
  );
}

export interface LiveResultsProps {
  rows: ResultRow[];
  columns?: 'single' | 'pair';
  initialExpanded?: ResultRowId | null;
}

/** ResultsTable with local expand / favourite state (the application owns it in real use). */
export function LiveResults({ rows: initial, columns = 'pair', initialExpanded = null }: LiveResultsProps) {
  const [rows, setRows] = useState(initial);
  const [expanded, setExpanded] = useState<ResultRowId | null>(initialExpanded);
  const detail = useContext(DetailContext);
  return (
    <ResultsTable
      rows={rows}
      columns={columns}
      clock={liveClock}
      expandedId={detail ? rows.map((r) => r.id) : expanded}
      onToggle={(id) => setExpanded((current) => (current === id ? null : id))}
      onFavoriteChange={(row, favorite) =>
        setRows((current) => current.map((r) => (r.id === row.id ? { ...r, favorite } : r)))
      }
      renderDetail={renderDetail}
    />
  );
}
