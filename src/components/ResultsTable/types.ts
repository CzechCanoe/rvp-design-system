import type { ReactNode } from 'react';
import type { Observed } from '../../types';
import type { Mark } from '../MarkBadge';

/**
 * Visual data model of the results table (BRIEF principle 4: the design system
 * takes states, not domain). The application maps its contract (runs, BR,
 * categories…) onto these shapes; the table never derives standings itself.
 */

export type ResultRowId = string | number;

/** `single`: one run per row; `pair`: best-run race (two runs); `startlist`: start numbers and start times. */
export type ResultsTableColumns = 'single' | 'pair' | 'startlist';

/** Forces the mobile or desktop columns; omitted = container query (desktop from 640 px of table width). */
export type ResultsTableDensity = 'mobile' | 'desktop';

/** Row-level value state. `review` also tints the row. */
export type ResultRowState = 'provisional' | 'review';

export type Podium = 1 | 2 | 3;

/** A value that may arrive as a plain number, `null` (not known) or an `Observed<number>`. */
export type ObservedNumber = Observed<number> | number | null;

/** Running time of a run in progress, as delivered (see `RunningTime`). */
export interface RunningSpec {
  /** Last delivered running time in seconds. */
  elapsedSeconds: number;
  /** `clock.now()` when `elapsedSeconds` arrived. */
  receivedAt: number;
  /** Seconds after receipt after which the value freezes as stale (default 3). */
  staleAfterSeconds?: number;
}

/**
 * One run slot of a row. The position in `ResultRow.runs` is the run number
 * (index 0 = 1st run); a missing slot renders as "not known".
 */
export interface RunCell {
  /** Time shown for the run (the application decides whether raw or with penalties). */
  time: ObservedNumber;
  /**
   * Penalty seconds shown after the time. Omitted = nothing shown; `null` (or a
   * not-known `Observed`) = not judged yet, never rendered as 0.
   */
  penalty?: ObservedNumber;
  /** This run counts (better run of a pair): highlighted. */
  best?: boolean;
  /** Result mark shown instead of the time (DNS, DNF…). */
  mark?: Mark;
  /** Athlete is on course in this run: a ticking `RunningTime` replaces the time. */
  running?: RunningSpec;
  /** `startlist` columns: start time of the run, formatted by the application (e.g. `10:24:30`). */
  start?: ReactNode;
}

export interface ResultCategoryRank {
  /** Rank within the category; shown as the main rank, the class rank moves under it („3. celk.“). */
  rank: Observed<number>;
  /** Category name, e.g. `U18`. */
  category: string;
}

export interface ResultRow {
  /** Stable row key (e.g. bib + class); also passed to `onToggle`. */
  id: ResultRowId;
  /** Rank in the class. `not-yet` / `unavailable` render as „·“ (no rank). */
  rank: Observed<number>;
  /** Rank in the selected category, shown instead of `rank` with the class rank under it. */
  categoryRank?: ResultCategoryRank;
  /** Podium place: 3 px stripe and coloured rank. The application decides (class or category podium). */
  podium?: Podium;
  /** Start number (startlist column, detail, favourites key). */
  bib: number | string;
  name: string;
  /** Short category tag after the name, e.g. `U16`. */
  categoryTag?: string;
  club?: string;
  /** Favourite star state (owned by the application). */
  favorite?: boolean;
  /** Run slots; position = run number. */
  runs: RunCell[];
  /** Result that counts (total, or better run of a pair). */
  result: Observed<number>;
  /**
   * Gap to the leader. Omitted = nothing to show (leader, „–“); `not-yet` = the
   * standing is not settled yet (a run is still to come): the result is muted and
   * the slot reads „čeká“.
   */
  diff?: Observed<number>;
  /**
   * Result mark. It takes precedence over the result time; it is shown in the
   * run cells that carry it, otherwise in the result cell. `NR` (raced, not
   * ranked) keeps the time, muted, and reads „mimo pořadí“.
   */
  mark?: Mark;
  /** Row-level value state: badge in the name line; `review` also tints the row. */
  state?: ResultRowState;
  /** Athlete is on course: the result is muted and the slot reads „na trati“. */
  running?: boolean;
  /** Short note after the state badge in the name line, e.g. „branka 16“. */
  note?: ReactNode;
}
