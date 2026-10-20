import {
  Fragment,
  forwardRef,
  memo,
  useCallback,
  useId,
  useMemo,
  useRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import type { Clock } from '../../clock/Clock';
import { useIsomorphicLayoutEffect } from '../../hooks';
import { BibBadge } from '../BibBadge';
import { Icon } from '../Icon';
import { MarkBadge } from '../MarkBadge';
import { PenaltyChip } from '../PenaltyChip';
import { StarButton } from '../StarButton';
import { StatusBadge } from '../StatusBadge';
import { TimeValue } from '../TimeValue';
import { AthleteName, PenaltyText, RankValue, RunValue } from './cells';
import type {
  ResultRow,
  ResultRowId,
  ResultsTableColumns,
  ResultsTableDensity,
  RunCell,
} from './types';
import { isNotYet, knownNumber } from './values';
import './ResultsTable.css';

// ============================================================================
// Labels
// ============================================================================

/** Texts of the table. Czech defaults; every one can be overridden via `labels`. */
export interface ResultsTableLabels {
  /** Rank column header. Default `#`, or the category when rows carry `categoryRank`. */
  rank: ReactNode;
  bib: ReactNode;
  athlete: ReactNode;
  club: ReactNode;
  /** Mobile header of the stacked runs (`pair`). */
  runs: ReactNode;
  /**
   * Desktop headers of the runs (`pair`). An array is a new object on every render when
   * written inline, which breaks the row memoisation (see `ResultsTableProps.labels`).
   */
  runLabels: ReactNode[];
  /** Header of the run column (`single`). */
  singleRun: ReactNode;
  result: ReactNode;
  diff: ReactNode;
  /** Header of the start column (`startlist`). */
  start: ReactNode;
  /** Screen-reader header of the expand column. */
  detailColumn: string;
  /** Screen-reader header of the favourites column. */
  favoriteColumn: string;
  /** Result slot of a row on course. */
  onCourse: string;
  /** Result slot of a row whose standing is not settled yet (`diff: not-yet`). */
  waiting: string;
  /** Result slot of an `NR` row. */
  nonRanked: string;
  /** Screen-reader text of a missing rank. */
  noRank: string;
  /** Screen-reader text of a penalty that is not judged yet. */
  notJudged: string;
  /** Class rank under the category rank. */
  overall: (rank: number) => string;
  /** Accessible name of the expand button. */
  toggle: (row: ResultRow) => string;
  /** Accessible name of the favourite star. */
  favorite: (row: ResultRow) => string;
  /** Content of an empty table. */
  empty: ReactNode;
}

export const RESULTS_TABLE_LABELS: ResultsTableLabels = {
  rank: '#',
  bib: 'St. č.',
  athlete: 'Závodník',
  club: 'Oddíl',
  runs: 'Jízdy',
  runLabels: ['1. jízda', '2. jízda'],
  singleRun: 'Čas · tr.',
  result: 'Výsledek',
  diff: 'Ztráta',
  start: 'Start',
  detailColumn: 'Detail',
  favoriteColumn: 'Oblíbení',
  onCourse: 'na trati',
  waiting: 'čeká',
  nonRanked: 'mimo pořadí',
  noRank: 'bez pořadí',
  notJudged: 'neposouzeno',
  overall: (rank) => `${rank}. celk.`,
  toggle: (row) => `Detail: ${row.name}`,
  favorite: (row) => `Oblíbený: ${row.name}`,
  empty: 'Žádné výsledky',
};

// ============================================================================
// Props
// ============================================================================

export interface ResultsTableProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onToggle'> {
  /** Rows in display order (the application sorts; marks usually last). */
  rows: ResultRow[];
  /** Column set (default `single`). */
  columns?: ResultsTableColumns;
  /** Forces mobile or desktop columns; omitted = container query (desktop from 640 px of table width). */
  density?: ResultsTableDensity;
  /** Expanded row(s): one id, or several (e.g. a „Detailní“ view). */
  expandedId?: ResultRowId | readonly ResultRowId[] | null;
  /** Row clicked anywhere (or its expand button activated). Enables the expand column. */
  onToggle?: (id: ResultRowId, row: ResultRow) => void;
  /**
   * Content of an expanded row (usually `RunDetail`); spans the full table width, no indentation.
   * Returning `undefined` renders no detail row at all (the row looks expanded but adds nothing);
   * return `null` or an element for an (empty) detail row. Called on every table render for expanded
   * rows only, because the detail may depend on application state the table cannot see.
   */
  renderDetail?: (row: ResultRow) => ReactNode;
  /** Favourite star toggled. Enables the favourites column; the state stays in `row.favorite`. */
  onFavoriteChange?: (row: ResultRow, favorite: boolean) => void;
  /** Clock for running times (else the nearest `ClockProvider`). */
  clock?: Clock;
  /**
   * Overrides of the Czech texts. Values are compared one by one (`Object.is`), so inline strings
   * keep the memoised rows. An inline array (`runLabels`) or inline JSX label is a new object on
   * every render and re-renders all rows: define those outside the component or memoise them.
   */
  labels?: Partial<ResultsTableLabels>;
  /** Table caption for screen readers (visually hidden). */
  caption?: ReactNode;
  /** Content of an empty table (default `labels.empty`). */
  emptyState?: ReactNode;
}

// ============================================================================
// Row
// ============================================================================

/**
 * Shared by all rows. Stays referentially stable across table renders as long as
 * columns, labels (key by key) and clock do: the handlers are stable wrappers
 * around the latest props, so inline callbacks do not re-render every row.
 */
interface RowContext {
  columns: ResultsTableColumns;
  runCount: number;
  labels: ResultsTableLabels;
  clock?: Clock;
  expandable: boolean;
  favorites: boolean;
  totalCells: number;
  idPrefix: string;
  onToggle: (id: ResultRowId, row: ResultRow) => void;
  onFavoriteChange: (row: ResultRow, favorite: boolean) => void;
}

const LABEL_KEYS = Object.keys(RESULTS_TABLE_LABELS) as Array<keyof ResultsTableLabels>;

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

const INTERACTIVE = 'a, button, input, select, textarea, label, summary, [role="button"], [contenteditable="true"]';

function Dash() {
  return (
    <span className="csk-results-table__dash" aria-hidden="true">
      –
    </span>
  );
}

/** Mobile stacked runs: one line per run slot, position = run number. */
function RunStack({ row, ctx }: { row: ResultRow; ctx: RowContext }) {
  return (
    <span className="csk-results-table__stack">
      {range(ctx.runCount).map((i) => {
        const run: RunCell | undefined = row.runs[i];
        const showPenalty = run && !run.mark && !run.running;
        return (
          <Fragment key={i}>
            <span
              className={['csk-results-table__stack-time', run?.best && 'csk-results-table__stack-time--best']
                .filter(Boolean)
                .join(' ')}
            >
              <RunValue run={run} clock={ctx.clock} />
            </span>
            <span className="csk-results-table__stack-pen">
              {showPenalty && <PenaltyText penalty={run.penalty} notJudgedLabel={ctx.labels.notJudged} />}
            </span>
          </Fragment>
        );
      })}
    </span>
  );
}

/** Start list: start time per run slot, stacked; a mark (e.g. DNS omluven) inline instead. */
function StartStack({ row, ctx }: { row: ResultRow; ctx: RowContext }) {
  return (
    <span className="csk-results-table__starts">
      {range(ctx.runCount).map((i) => {
        const run = row.runs[i];
        return (
          <span key={i} className="csk-results-table__start">
            {run?.mark ? <MarkBadge mark={run.mark} /> : run?.start ?? <TimeValue value={null} />}
          </span>
        );
      })}
    </span>
  );
}

/**
 * One result row (+ its detail row). Memoised: it re-renders when its `row`
 * object, its expanded state or the shared context change. An expanded row also
 * re-renders with every table render, because its `detail` (from `renderDetail`)
 * may depend on application state the table cannot see.
 */
const ResultsTableRow = memo(function ResultsTableRow({
  row,
  expanded,
  detail,
  ctx,
}: {
  row: ResultRow;
  expanded: boolean;
  /** Rendered detail of an expanded row; `undefined` = no detail row. */
  detail: ReactNode | undefined;
  ctx: RowContext;
}) {
  const { labels } = ctx;
  const startlist = ctx.columns === 'startlist';
  const nonRanked = row.mark === 'NR';
  const blockingMark = row.mark && !nonRanked ? row.mark : undefined;
  const runCarriesMark = row.runs.some((r) => r?.mark);
  const waiting = isNotYet(row.diff);
  const mutedResult = Boolean(row.running) || waiting || nonRanked;
  const detailId = `${ctx.idPrefix}-detail-${String(row.id)}`;
  const hasDetail = expanded && detail !== undefined;

  // Name line 2: state badge, NR mark and note first (they must stay visible), then the club (mobile only).
  const hasExtras = Boolean(row.state || nonRanked || row.note);
  const secondary =
    hasExtras || row.club ? (
      <>
        {row.state && <StatusBadge state={row.state} size="sm" />}
        {nonRanked && <MarkBadge mark="NR" />}
        {row.note && <span className="csk-results-table__note">{row.note}</span>}
        {row.club && (
          <span className="csk-results-table__club-inline">
            {hasExtras ? ' · ' : ''}
            {row.club}
          </span>
        )}
      </>
    ) : undefined;

  const handleClick = (e: MouseEvent<HTMLTableRowElement>) => {
    const target = e.target as Element;
    const interactive = target.closest(INTERACTIVE);
    if (interactive && !interactive.hasAttribute('data-csk-row-toggle')) return;
    ctx.onToggle(row.id, row);
  };

  const classes = [
    'csk-results-table__row',
    ctx.expandable && 'csk-results-table__row--expandable',
    expanded && 'csk-results-table__row--expanded',
    row.podium && `csk-results-table__row--podium-${row.podium}`,
    row.state && `csk-results-table__row--${row.state}`,
    row.running && 'csk-results-table__row--running',
  ]
    .filter(Boolean)
    .join(' ');

  const rankCell = (() => {
    if (startlist) return <BibBadge bib={row.bib} />;
    if (row.categoryRank) {
      const classRank = knownNumber(row.rank);
      return (
        <RankValue
          rank={row.categoryRank.rank}
          podium={row.podium}
          sub={classRank !== null ? labels.overall(classRank) : undefined}
          noRankLabel={labels.noRank}
        />
      );
    }
    return <RankValue rank={row.rank} podium={row.podium} noRankLabel={labels.noRank} />;
  })();

  const diffContent = (desktop: boolean): ReactNode => {
    const badge = (label: string) =>
      desktop ? (
        <StatusBadge state="unknown" size="sm" label={label} />
      ) : (
        <span className="csk-results-table__sub-text">{label}</span>
      );
    if (row.running) return badge(labels.onCourse);
    if (nonRanked) return <span className="csk-results-table__sub-text">{labels.nonRanked}</span>;
    if (blockingMark) return null;
    if (waiting) return badge(labels.waiting);
    if (row.diff === undefined) return <Dash />;
    return <TimeValue value={row.diff} sign variant="muted" />;
  };

  let resultMain: ReactNode;
  if (blockingMark) {
    resultMain = runCarriesMark ? <Dash /> : <MarkBadge mark={blockingMark} />;
  } else {
    resultMain = <TimeValue value={row.result} variant={mutedResult ? 'muted' : 'default'} />;
  }

  return (
    <>
      <tr className={classes} onClick={ctx.expandable ? handleClick : undefined}>
        {ctx.expandable && (
          <td className="csk-results-table__chev">
            <button
              type="button"
              className="csk-results-table__toggle"
              data-csk-row-toggle=""
              aria-expanded={expanded}
              aria-controls={hasDetail ? detailId : undefined}
              aria-label={labels.toggle(row)}
            >
              <Icon name="chevron-right" size={14} />
            </button>
          </td>
        )}
        <td className={startlist ? 'csk-results-table__bib' : 'csk-results-table__rank'}>{rankCell}</td>
        {ctx.favorites && (
          <td className="csk-results-table__star">
            <StarButton
              pressed={Boolean(row.favorite)}
              label={labels.favorite(row)}
              onPressedChange={(next) => ctx.onFavoriteChange(row, next)}
            />
          </td>
        )}
        <th scope="row" className="csk-results-table__name">
          <AthleteName name={row.name} categoryTag={row.categoryTag} secondary={secondary} />
        </th>
        <td className="csk-results-table__club csk-results-table__d">{row.club}</td>
        {startlist ? (
          <td className="csk-results-table__num csk-results-table__starts-cell">
            <StartStack row={row} ctx={ctx} />
          </td>
        ) : (
          <>
            <td className="csk-results-table__num csk-results-table__runs csk-results-table__m">
              <RunStack row={row} ctx={ctx} />
            </td>
            {range(ctx.runCount).map((i) => {
              const run = row.runs[i];
              const penalty = run && !run.mark && !run.running ? run.penalty : undefined;
              return (
                <Fragment key={i}>
                  <td className="csk-results-table__num csk-results-table__run-time csk-results-table__d">
                    <RunValue run={run} clock={ctx.clock} />
                  </td>
                  <td className="csk-results-table__run-pen csk-results-table__d">
                    {penalty !== undefined && <PenaltyChip penalty={knownNumber(penalty)} />}
                  </td>
                </Fragment>
              );
            })}
            <td className="csk-results-table__num csk-results-table__result">
              <span className="csk-results-table__result-main">{resultMain}</span>
              <span className="csk-results-table__result-sub">{diffContent(false)}</span>
            </td>
            <td className="csk-results-table__num csk-results-table__diff csk-results-table__d">
              {diffContent(true)}
            </td>
          </>
        )}
      </tr>
      {hasDetail && (
        <tr className="csk-results-table__detail-row" id={detailId}>
          <td colSpan={ctx.totalCells} className="csk-results-table__detail-cell">
            <div className="csk-results-table__detail">{detail}</div>
          </td>
        </tr>
      )}
    </>
  );
});

// ============================================================================
// ResultsTable
// ============================================================================

/**
 * Results table v2 (live and official results, start list).
 *
 * The data model is visual (`ResultRow`, `RunCell`, `Observed<T>`); the
 * application maps its contract onto it and sorts the rows. Mobile columns:
 * chevron · # · ★ · name + club · runs (stacked, position = run number) ·
 * result + gap. Desktop columns (container query from 640 px, or `density`):
 * + club column, runs side by side with `PenaltyChip` after the time, separate
 * gap column. Times never wrap. A mark replaces the time. The table has no
 * sticky header and no overflow wrapper: sticky headers belong to the page.
 */
export const ResultsTable = forwardRef<HTMLDivElement, ResultsTableProps>(
  (
    {
      rows,
      columns = 'single',
      density,
      expandedId,
      onToggle,
      renderDetail,
      onFavoriteChange,
      clock,
      labels: labelsProp,
      caption,
      emptyState,
      className,
      ...props
    },
    ref
  ) => {
    const idPrefix = useId();
    // Compared key by key, so an inline `labels={{ … }}` with the same values keeps the rows memoised.
    const labelValues = LABEL_KEYS.map((key) => labelsProp?.[key]);
    const labels = useMemo(
      () => ({ ...RESULTS_TABLE_LABELS, ...labelsProp }),
      // eslint-disable-next-line react-hooks/exhaustive-deps -- fixed-length list of the label values
      labelValues
    );

    // Latest-ref handlers: rows get stable callbacks that always call the current props.
    const handlers = useRef({ onToggle, onFavoriteChange });
    useIsomorphicLayoutEffect(() => {
      handlers.current = { onToggle, onFavoriteChange };
    });
    const toggle = useCallback((id: ResultRowId, row: ResultRow) => handlers.current.onToggle?.(id, row), []);
    const favorite = useCallback(
      (row: ResultRow, next: boolean) => handlers.current.onFavoriteChange?.(row, next),
      []
    );
    const startlist = columns === 'startlist';
    const runCount = startlist
      ? Math.max(1, ...rows.map((r) => r.runs.length))
      : columns === 'pair'
        ? 2
        : 1;
    const expandable = Boolean(onToggle);
    const favorites = Boolean(onFavoriteChange);
    const totalCells =
      (expandable ? 1 : 0) +
      (favorites ? 1 : 0) +
      (startlist ? 4 : 5 + 2 * runCount + 1);

    const ctx = useMemo<RowContext>(
      () => ({
        columns,
        runCount,
        labels,
        clock,
        expandable,
        favorites,
        totalCells,
        idPrefix,
        onToggle: toggle,
        onFavoriteChange: favorite,
      }),
      [columns, runCount, labels, clock, expandable, favorites, totalCells, idPrefix, toggle, favorite]
    );

    const expanded = useMemo(() => {
      if (expandedId === null || expandedId === undefined) return new Set<ResultRowId>();
      return new Set<ResultRowId>(typeof expandedId === 'object' ? expandedId : [expandedId]);
    }, [expandedId]);

    const categoryHeader = rows.find((r) => r.categoryRank)?.categoryRank?.category;
    const rankHeader = labelsProp?.rank ?? (startlist ? labels.bib : categoryHeader ?? labels.rank);

    const classes = [
      'csk-results-table',
      `csk-results-table--${columns}`,
      density && `csk-results-table--${density}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        <table className="csk-results-table__table">
          {caption && <caption className="csk-results-table__caption">{caption}</caption>}
          <thead className="csk-results-table__head">
            <tr>
              {expandable && (
                <th scope="col" className="csk-results-table__chev">
                  <span className="csk-cell-sr">{labels.detailColumn}</span>
                </th>
              )}
              <th scope="col" className={startlist ? 'csk-results-table__bib' : 'csk-results-table__rank'}>
                {rankHeader}
              </th>
              {favorites && (
                <th scope="col" className="csk-results-table__star">
                  <span className="csk-cell-sr">{labels.favoriteColumn}</span>
                </th>
              )}
              <th scope="col" className="csk-results-table__name">
                {labels.athlete}
              </th>
              <th scope="col" className="csk-results-table__club csk-results-table__d">
                {labels.club}
              </th>
              {startlist ? (
                <th scope="col" className="csk-results-table__num">
                  {labels.start}
                </th>
              ) : (
                <>
                  <th scope="col" className="csk-results-table__num csk-results-table__m">
                    {columns === 'pair' ? labels.runs : labels.singleRun}
                  </th>
                  {range(runCount).map((i) => (
                    <th key={i} scope="col" colSpan={2} className="csk-results-table__num csk-results-table__d">
                      {columns === 'pair' ? labels.runLabels[i] ?? `${i + 1}.` : labels.singleRun}
                    </th>
                  ))}
                  <th scope="col" className="csk-results-table__num">
                    {labels.result}
                  </th>
                  <th scope="col" className="csk-results-table__num csk-results-table__d">
                    {labels.diff}
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr className="csk-results-table__empty-row">
                <td colSpan={totalCells} className="csk-results-table__empty">
                  {emptyState ?? labels.empty}
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                const isExpanded = expanded.has(row.id);
                return (
                  <ResultsTableRow
                    key={row.id}
                    row={row}
                    expanded={isExpanded}
                    detail={isExpanded && renderDetail ? renderDetail(row) : undefined}
                    ctx={ctx}
                  />
                );
              })
            )}
          </tbody>
        </table>
      </div>
    );
  }
);

ResultsTable.displayName = 'ResultsTable';
