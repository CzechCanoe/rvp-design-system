import { useState, type ReactNode } from 'react';
import { Card } from '../../components/Card';
import { FilterPills } from '../../components/FilterPills';
import { FavoritesToggle } from '../../components/FavoritesToggle';
import { Icon } from '../../components/Icon';
import { ResultsTable, RunDetail, type ResultRow, type ResultRowId } from '../../components/ResultsTable';
import { known, rezekDetail } from '../../components/ResultsTable/ResultsTable.fixtures';
import { knownNumber } from '../../components/ResultsTable/values';
import { SearchInput } from '../../components/SearchInput';
import { StatusBadge, type StatusBadgeState } from '../../components/StatusBadge';
import { TableToolbar, TableToolbarButton } from '../../components/TableToolbar';
import { liveClock } from './storyClock';
import './ResultsCard.css';

export interface ResultsCardProps {
  /** Status badge and text above the table. */
  state?: StatusBadgeState;
  status?: ReactNode;
  foot?: ReactNode;
  footLinks?: ReactNode;
  children: ReactNode;
  /** Active category filter shown as a dismissible pill instead of the Kategorie button. */
  activeCategory?: string;
  /** Number of favourites; `undefined` = no favourites toggle. */
  favorites?: number;
  searchLabel?: string;
}

/** Toolbar + status line + table + footer in one outlined card. */
export function ResultsCard({
  state,
  status,
  foot,
  footLinks,
  children,
  activeCategory,
  favorites,
  searchLabel = 'Hledat závodníka',
}: ResultsCardProps) {
  const [q, setQ] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [category, setCategory] = useState(activeCategory);
  return (
    <Card
      variant="surface"
      padding="none"
      footer={
        foot || footLinks ? (
          <div className="story-results__foot">
            {foot && <span>{foot}</span>}
            {footLinks && <span className="story-results__foot-links">{footLinks}</span>}
          </div>
        ) : undefined
      }
    >
      <TableToolbar
        aria-label="Nástroje tabulky"
        search={
          <SearchInput size="sm" fullWidth aria-label={searchLabel} placeholder={searchLabel} value={q} onChange={setQ} />
        }
        favorites={
          favorites === undefined ? undefined : (
            <FavoritesToggle pressed={onlyFavorites} onPressedChange={setOnlyFavorites} count={favorites} label="Jen oblíbení" />
          )
        }
      >
        {category ? (
          <FilterPills
            size="sm"
            aria-label="Aktivní filtry"
            filters={[{ key: category, label: category, dismissible: true }]}
            onRemove={() => setCategory(undefined)}
          />
        ) : (
          <TableToolbarButton>
            Kategorie <Icon name="chevron-down" size="sm" aria-hidden />
          </TableToolbarButton>
        )}
      </TableToolbar>
      {(state || status) && (
        <div className="story-results__status">
          {state && <StatusBadge state={state} />}
          {status && <span>{status}</span>}
        </div>
      )}
      {children}
    </Card>
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
  return (
    <ResultsTable
      rows={rows}
      columns={columns}
      clock={liveClock}
      expandedId={expanded}
      onToggle={(id) => setExpanded((current) => (current === id ? null : id))}
      onFavoriteChange={(row, favorite) =>
        setRows((current) => current.map((r) => (r.id === row.id ? { ...r, favorite } : r)))
      }
      renderDetail={renderDetail}
    />
  );
}
