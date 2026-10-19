export { ResultsTable, RESULTS_TABLE_LABELS } from './ResultsTable';
export type { ResultsTableProps, ResultsTableLabels } from './ResultsTable';

export { RunDetail, RUN_DETAIL_LABELS } from './RunDetail';
export type { RunDetailProps, RunDetailRun, RunDetailRank, RunDetailLabels } from './RunDetail';

// Row / cell primitives shared with the other live tables (on-course panel, start list)
export { AthleteName, RankValue, RunValue, PenaltyText } from './cells';
export type { AthleteNameProps, RankValueProps, RunValueProps, PenaltyTextProps } from './cells';

export type {
  ResultRow,
  ResultRowId,
  ResultRowState,
  ResultCategoryRank,
  ResultsTableColumns,
  ResultsTableDensity,
  RunCell,
  RunningSpec,
  ObservedNumber,
  Podium,
} from './types';
