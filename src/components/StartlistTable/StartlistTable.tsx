import { forwardRef, useMemo, type ReactNode } from 'react';
import type { Observed } from '../../types';
import type { Mark } from '../MarkBadge';
import { ResultsTable, type ResultsTableProps } from '../ResultsTable/ResultsTable';
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

export interface StartlistTableProps
  extends Omit<ResultsTableProps, 'rows' | 'columns' | 'expandedId' | 'onToggle' | 'renderDetail' | 'onFavoriteChange'> {
  /** Rows in start order (the application sorts). */
  rows: StartlistRow[];
  /** Favourite star toggled. Enables the favourites column; the state stays in `row.favorite`. */
  onFavoriteChange?: (row: StartlistRow, favorite: boolean) => void;
}

const UNAVAILABLE: Observed<number> = { state: 'unavailable', reason: 'not-applicable' };

function toResultRow(row: StartlistRow): ResultRow {
  return {
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
  ({ rows, onFavoriteChange, labels, ...props }, ref) => {
    const resultRows = useMemo(() => rows.map(toResultRow), [rows]);
    const byId = useMemo(() => new Map(rows.map((r) => [r.id, r])), [rows]);
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
        labels={{ empty: 'Startovní listina zatím není k dispozici', ...labels }}
      />
    );
  }
);

StartlistTable.displayName = 'StartlistTable';
