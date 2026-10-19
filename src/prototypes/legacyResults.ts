/**
 * 1.x result entries used by the prototypes, mapped onto the v2 ResultsTable
 * rows. Only keeps the 1.x prototypes compiling until they are deleted (T17).
 */
import type { ResultRow, ResultsTableColumns, RunCell } from '../components/ResultsTable';
import type { Observed } from '../types';

export interface LegacyResultEntry {
  id: string | number;
  rank?: number;
  name: string;
  club?: string;
  country?: string;
  section?: 'dv' | 'ry' | 'vt';
  category?: string;
  ageCategory?: string;
  ageCategoryRank?: number;
  points?: number;
  run1Time?: number;
  run1Penalty?: number;
  run2Time?: number;
  run2Penalty?: number;
  totalTime?: number;
  timeDiff?: number;
  status?: 'dns' | 'dnf' | 'dsq' | 'final' | 'provisional' | 'live';
  highlighted?: boolean;
  meta?: Record<string, unknown>;
  previousRank?: number;
  round?: 'Q' | 'SF' | 'F';
  progressed?: boolean;
  startNumber?: number;
  avatarUrl?: string;
}

const known = (value: number): Observed<number> => ({ state: 'known', value });
const unknown: Observed<number> = { state: 'unavailable' };
const MARKS = { dns: 'DNS', dnf: 'DNF', dsq: 'DSQ' } as const;

/** `pair` when the entries carry two runs, else `single`. */
export function legacyColumns(entries: LegacyResultEntry[]): ResultsTableColumns {
  return entries.some((e) => e.run2Time !== undefined) ? 'pair' : 'single';
}

export function toResultRows(entries: LegacyResultEntry[]): ResultRow[] {
  const pair = legacyColumns(entries) === 'pair';
  return entries.map((e) => {
    const mark = e.status === 'dns' || e.status === 'dnf' || e.status === 'dsq' ? MARKS[e.status] : undefined;
    const run = (time: number | undefined, penalty: number | undefined): RunCell => ({
      time: time === undefined ? { state: 'not-yet' } : known(time + (penalty ?? 0)),
      penalty: penalty || undefined,
      best: time !== undefined && e.totalTime !== undefined && Math.abs(time + (penalty ?? 0) - e.totalTime) < 0.005,
    });
    const runs = pair
      ? [run(e.run1Time, e.run1Penalty), run(e.run2Time, e.run2Penalty)]
      : [{ time: e.run1Time !== undefined ? known(e.run1Time) : e.totalTime !== undefined ? known(e.totalTime) : unknown, penalty: e.run1Penalty }];
    return {
      id: e.id,
      rank: e.rank !== undefined && !mark ? known(e.rank) : unknown,
      podium: !mark && e.rank !== undefined && e.rank <= 3 ? (e.rank as 1 | 2 | 3) : undefined,
      bib: e.startNumber ?? e.id,
      name: e.name,
      categoryTag: e.ageCategory ?? e.category,
      club: e.club,
      runs,
      result: e.totalTime !== undefined && !mark ? known(e.totalTime) : unknown,
      diff: e.timeDiff ? known(e.timeDiff) : undefined,
      mark,
      state: e.status === 'provisional' ? 'provisional' : undefined,
      running: e.status === 'live' || undefined,
    };
  });
}
