import { forwardRef, useMemo, type ReactNode } from 'react';
import type { Observed } from '../../types';
import type { Mark } from '../MarkBadge';
import { ResultsTable, type ResultsTableLabels, type ResultsTableProps } from '../ResultsTable/ResultsTable';
import type { ResultRow, ResultRowId } from '../ResultsTable/types';

/** One start slot of an athlete; position in `StartlistRow.starts` = run number. */
export interface StartlistStart {
  /** Start time as formatted by the application (e.g. `10:24:30`). Omitted = not known yet. */
  time?: ReactNode;
  /** Mark shown instead of the time (e.g. `DNS-A` = DNS, excused). */
  mark?: Mark;
}

/** A start-list row. Unlike `ResultRow` it carries no rank and no result. */
export interface StartlistRow {
  /** Stable row key (e.g. bib + class); also passed to `onFavoriteChange`. */
  id: ResultRowId;
  /** Start number. */
  bib: number | string;
  name: string;
  /** Short category tag after the name, e.g. `U16`. */
  categoryTag?: string;
  club?: string;
  /** Favourite star state (owned by the application). */
  favorite?: boolean;
  /** Start slots; position = run number. */
  starts: StartlistStart[];
}

/** Texts of the start list (Czech defaults). */
export interface StartlistTableLabels {
  bib: ReactNode;
  athlete: ReactNode;
  club: ReactNode;
  /** Header of the start column, given the number of starts: default `Start` / `Start 1. / 2.`. */
  start: (starts: number) => ReactNode;
  /** Screen-reader header of the favourites column. */
  favoriteColumn: string;
  /** Accessible name of the favourite star. */
  favorite: (row: StartlistRow) => string;
  /** Content of an empty table. */
  empty: ReactNode;
}

export const STARTLIST_TABLE_LABELS: StartlistTableLabels = {
  bib: 'St. č.',
  athlete: 'Závodník',
  club: 'Oddíl',
  start: (n) => (n > 1 ? `Start ${Array.from({ length: n }, (_, i) => `${i + 1}.`).join(' / ')}` : 'Start'),
  favoriteColumn: 'Oblíbení',
  favorite: (row) => `Oblíbený: ${row.name}`,
  empty: 'Startovní listina zatím není k dispozici',
};

export interface StartlistTableProps
  extends Omit<
    ResultsTableProps,
    'rows' | 'columns' | 'expandedId' | 'onToggle' | 'renderDetail' | 'onFavoriteChange' | 'labels'
  > {
  /** Overrides of the Czech texts. */
  labels?: Partial<StartlistTableLabels>;
  /** Rows in start order (the application sorts). */
  rows: StartlistRow[];
  /** Favourite star toggled. Enables the favourites column; the state stays in `row.favorite`. */
  onFavoriteChange?: (row: StartlistRow, favorite: boolean) => void;
}

const UNAVAILABLE: Observed<number> = { state: 'unavailable', reason: 'not-applicable' };

/** One converted row per source row, so ResultsTable's row memo keeps working while the rows are unchanged. */
const converted = new WeakMap<StartlistRow, ResultRow>();

function toResultRow(row: StartlistRow): ResultRow {
  const cached = converted.get(row);
  if (cached) return cached;
  const result: ResultRow = {
    id: row.id,
    rank: UNAVAILABLE,
    bib: row.bib,
    name: row.name,
    categoryTag: row.categoryTag,
    club: row.club,
    favorite: row.favorite,
    runs: row.starts.map((s) => ({ time: null, start: s.time, mark: s.mark })),
    result: UNAVAILABLE,
  };
  converted.set(row, result);
  return result;
}

/**
 * Start list: start number, star, name + club, start times of the runs stacked
 * (position = run number; 390 px does not overflow). An excused DNS shows its
 * mark inline instead of the time.
 *
 * Thin wrapper over `ResultsTable columns="startlist"` with its own row type:
 * a start-list row has no rank and no result, so the application never has to
 * invent them.
 */
export const StartlistTable = forwardRef<HTMLDivElement, StartlistTableProps>(
  ({ rows, onFavoriteChange, labels: labelsProp, ...props }, ref) => {
    const resultRows = useMemo(() => rows.map(toResultRow), [rows]);
    const byId = useMemo(() => new Map(rows.map((r) => [r.id, r])), [rows]);
    const starts = Math.max(1, ...rows.map((r) => r.starts.length));
    const text = useMemo(() => ({ ...STARTLIST_TABLE_LABELS, ...labelsProp }), [labelsProp]);
    const tableLabels = useMemo<Partial<ResultsTableLabels>>(
      () => ({
        bib: text.bib,
        athlete: text.athlete,
        club: text.club,
        start: text.start(starts),
        favoriteColumn: text.favoriteColumn,
        favorite: (row) => text.favorite(byId.get(row.id) ?? { id: row.id, bib: row.bib, name: row.name, starts: [] }),
        empty: text.empty,
      }),
      [text, starts, byId]
    );
    const handleFavorite = onFavoriteChange
      ? (row: ResultRow, favorite: boolean) => {
          const source = byId.get(row.id);
          if (source) onFavoriteChange(source, favorite);
        }
      : undefined;
    return (
      <ResultsTable
        ref={ref}
        {...props}
        rows={resultRows}
        columns="startlist"
        onFavoriteChange={handleFavorite}
        labels={tableLabels}
      />
    );
  }
);

StartlistTable.displayName = 'StartlistTable';
