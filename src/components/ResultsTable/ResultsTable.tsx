import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import './ResultsTable.css';

// ============================================================================
// Types
// ============================================================================

export type ResultsTableSize = 'sm' | 'md' | 'lg';
export type ResultsTableVariant = 'default' | 'striped' | 'compact';
export type ResultsTableStyleVariant = 'default' | 'gradient' | 'embed';
export type ResultSection = 'dv' | 'ry' | 'vt';
export type ResultStatus = 'dns' | 'dnf' | 'dsq' | 'final' | 'provisional' | 'live';

export interface ResultEntry {
  /** Unique identifier */
  id: string | number;
  /** Position/rank */
  rank?: number;
  /** Athlete name */
  name: string;
  /** Club or team */
  club?: string;
  /** Country code (ISO 3166-1 alpha-3) */
  country?: string;
  /** Section/discipline */
  section?: ResultSection;
  /** Category (e.g., K1M, C1W) */
  category?: string;
  /** Age category (e.g., U23, Junior, Senior, Master) */
  ageCategory?: string;
  /** Points scored in this race */
  points?: number;
  /** Run 1 time in seconds */
  run1Time?: number;
  /** Run 1 penalty seconds */
  run1Penalty?: number;
  /** Run 2 time in seconds */
  run2Time?: number;
  /** Run 2 penalty seconds */
  run2Penalty?: number;
  /** Total time in seconds */
  totalTime?: number;
  /** Time difference to leader */
  timeDiff?: number;
  /** Status (DNS, DNF, DSQ, etc.) */
  status?: ResultStatus;
  /** Whether this entry is currently highlighted (e.g., live update) */
  highlighted?: boolean;
  /** Additional custom data */
  meta?: Record<string, unknown>;
  /** Previous rank for position change animation */
  previousRank?: number;
  /** Slalom round (Q = qualification, SF = semifinal, F = final) */
  round?: 'Q' | 'SF' | 'F';
  /** Whether athlete progressed to next round */
  progressed?: boolean;
  /** Starting position in current round */
  startNumber?: number;
}

export interface ResultsTableColumn {
  /** Column key */
  key: string;
  /** Column header */
  header: ReactNode;
  /** Column width (CSS value) */
  width?: string;
  /** Horizontal alignment */
  align?: 'left' | 'center' | 'right';
  /** Whether to show this column */
  visible?: boolean;
  /** Hide column at container width (uses container queries) */
  hideAt?: 'sm' | 'md' | 'lg';
  /** Priority for responsive hiding (lower = hide first) */
  priority?: number;
}

export interface ResultsTableProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'results'> {
  /** Result entries */
  results: ResultEntry[];
  /** Visual variant */
  variant?: ResultsTableVariant;
  /** Style variant for visual appearance */
  styleVariant?: ResultsTableStyleVariant;
  /** Table size */
  size?: ResultsTableSize;
  /** Section filter (show only specific section) */
  section?: ResultSection;
  /** Show run details (run1, run2) */
  showRuns?: boolean;
  /** Show time difference to leader */
  showTimeDiff?: boolean;
  /** Show country column */
  showCountry?: boolean;
  /** Show club column */
  showClub?: boolean;
  /** Show category column */
  showCategory?: boolean;
  /** Show age category column (U23, Junior, Senior, etc.) */
  showAgeCategory?: boolean;
  /** Show points column */
  showPoints?: boolean;
  /** Enable podium highlights (gold, silver, bronze) */
  showPodiumHighlights?: boolean;
  /** Number of positions to highlight (default: 3) */
  highlightPositions?: number;
  /** Enable live indicator for live status */
  showLiveIndicator?: boolean;
  /** Show slalom round column (Q/SF/F) */
  showRound?: boolean;
  /** Show progression indicator (checkmark for athletes who progressed) */
  showProgression?: boolean;
  /** Show start number column */
  showStartNumber?: boolean;
  /** Custom columns override */
  columns?: ResultsTableColumn[];
  /** Custom cell renderer */
  renderCell?: (entry: ResultEntry, columnKey: string) => ReactNode;
  /** Click handler for row */
  onRowClick?: (entry: ResultEntry) => void;
  /** Caption for accessibility */
  caption?: string;
  /** Show caption visually */
  captionVisible?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Empty state content */
  emptyState?: ReactNode;
  /** Sticky header */
  stickyHeader?: boolean;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Format time from seconds to MM:SS.ss or HH:MM:SS.ss
 */
function formatTime(seconds: number | undefined): string {
  if (seconds === undefined || seconds === null) return '-';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toFixed(2).padStart(5, '0')}`;
  }
  return `${minutes}:${secs.toFixed(2).padStart(5, '0')}`;
}

/**
 * Format time difference (with + prefix)
 */
function formatTimeDiff(seconds: number | undefined): string {
  if (seconds === undefined || seconds === null || seconds === 0) return '-';
  return `+${formatTime(seconds)}`;
}

/**
 * Format run time with penalty
 */
function formatRunTime(time: number | undefined, penalty: number | undefined): string {
  if (time === undefined || time === null) return '-';

  const total = time + (penalty || 0);
  const timeStr = formatTime(total);

  if (penalty && penalty > 0) {
    return `${timeStr} (${penalty}s)`;
  }
  return timeStr;
}

/**
 * Get status display text
 */
function getStatusDisplay(status: ResultStatus | undefined): string {
  const statusMap: Record<ResultStatus, string> = {
    dns: 'DNS',
    dnf: 'DNF',
    dsq: 'DSQ',
    final: '',
    provisional: 'PROV',
    live: 'LIVE',
  };
  return status ? statusMap[status] : '';
}

/**
 * Get rank display (with medal indicator)
 */
function getRankDisplay(rank: number | undefined, status: ResultStatus | undefined): string {
  if (status === 'dns' || status === 'dnf' || status === 'dsq') {
    return getStatusDisplay(status);
  }
  if (rank === undefined || rank === null) return '-';
  return rank.toString();
}

// ============================================================================
// ResultsTable Component
// ============================================================================

export const ResultsTable = forwardRef<HTMLDivElement, ResultsTableProps>(
  (
    {
      results,
      variant = 'default',
      styleVariant = 'default',
      size = 'md',
      section,
      showRuns = false,
      showTimeDiff = true,
      showCountry = false,
      showClub = true,
      showCategory = false,
      showAgeCategory = false,
      showPoints = false,
      showPodiumHighlights = true,
      highlightPositions = 3,
      showLiveIndicator = true,
      showRound = false,
      showProgression = false,
      showStartNumber = false,
      columns: customColumns,
      renderCell,
      onRowClick,
      caption,
      captionVisible = false,
      loading = false,
      emptyState,
      stickyHeader = false,
      className,
      ...props
    },
    ref
  ) => {
    const [hoveredRow, setHoveredRow] = useState<string | number | null>(null);

    // Filter results by section if specified
    const filteredResults = section
      ? results.filter((r) => r.section === section)
      : results;

    // Default columns with container query responsive hiding
    const defaultColumns: ResultsTableColumn[] = [
      { key: 'rank', header: '#', width: '60px', align: 'center', visible: true, priority: 1 },
      { key: 'startNumber', header: 'St.č.', width: '50px', align: 'center', visible: showStartNumber, hideAt: 'sm', priority: 6 },
      { key: 'name', header: 'Závodník', align: 'left', visible: true, priority: 1 },
      { key: 'club', header: 'Klub', align: 'left', visible: showClub, hideAt: 'md', priority: 4 },
      { key: 'country', header: 'Země', width: '70px', align: 'center', visible: showCountry, hideAt: 'sm', priority: 5 },
      { key: 'category', header: 'Kat.', width: '70px', align: 'center', visible: showCategory, hideAt: 'sm', priority: 5 },
      { key: 'ageCategory', header: 'Věk', width: '70px', align: 'center', visible: showAgeCategory, hideAt: 'md', priority: 5 },
      { key: 'round', header: 'Kolo', width: '60px', align: 'center', visible: showRound, priority: 3 },
      { key: 'run1', header: '1. jízda', width: '120px', align: 'right', visible: showRuns, hideAt: 'md', priority: 4 },
      { key: 'run2', header: '2. jízda', width: '120px', align: 'right', visible: showRuns, hideAt: 'md', priority: 4 },
      { key: 'totalTime', header: 'Čas', width: '100px', align: 'right', visible: true, priority: 1 },
      { key: 'timeDiff', header: 'Rozdíl', width: '100px', align: 'right', visible: showTimeDiff, hideAt: 'sm', priority: 3 },
      { key: 'points', header: 'Body', width: '70px', align: 'right', visible: showPoints, hideAt: 'sm', priority: 3 },
      { key: 'progression', header: '', width: '40px', align: 'center', visible: showProgression, priority: 2 },
    ];

    const columns = customColumns || defaultColumns.filter((col) => col.visible !== false);

    // Render cell content
    const getCellContent = (entry: ResultEntry, columnKey: string): ReactNode => {
      // Custom renderer takes priority
      if (renderCell) {
        const customContent = renderCell(entry, columnKey);
        if (customContent !== undefined) return customContent;
      }

      switch (columnKey) {
        case 'rank': {
          const positionChange =
            entry.previousRank !== undefined && entry.rank !== undefined
              ? entry.previousRank - entry.rank
              : 0;
          return (
            <span className="csk-results-table__rank">
              {getRankDisplay(entry.rank, entry.status)}
              {positionChange !== 0 && (
                <span
                  className={`csk-results-table__position-change csk-results-table__position-change--${positionChange > 0 ? 'up' : 'down'}`}
                  aria-label={positionChange > 0 ? `Up ${positionChange}` : `Down ${Math.abs(positionChange)}`}
                >
                  {positionChange > 0 ? (
                    <svg viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M6 2L10 7H2L6 2Z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M6 10L2 5H10L6 10Z" fill="currentColor" />
                    </svg>
                  )}
                  <span>{Math.abs(positionChange)}</span>
                </span>
              )}
              {entry.status === 'live' && showLiveIndicator && (
                <span className="csk-results-table__live-indicator" aria-label="Live" />
              )}
            </span>
          );
        }
        case 'name':
          return (
            <span className="csk-results-table__name">
              {entry.name}
              {entry.section && (
                <span className={`csk-results-table__section csk-results-table__section--${entry.section}`}>
                  {entry.section.toUpperCase()}
                </span>
              )}
            </span>
          );
        case 'club':
          return entry.club || '-';
        case 'country':
          return entry.country || '-';
        case 'category':
          return entry.category || '-';
        case 'ageCategory':
          return entry.ageCategory ? (
            <span className="csk-results-table__age-category">{entry.ageCategory}</span>
          ) : '-';
        case 'points':
          return entry.points !== undefined ? (
            <span className="csk-results-table__points">{entry.points}</span>
          ) : '-';
        case 'run1':
          return (
            <span className="csk-results-table__time">
              {formatRunTime(entry.run1Time, entry.run1Penalty)}
            </span>
          );
        case 'run2':
          return (
            <span className="csk-results-table__time">
              {formatRunTime(entry.run2Time, entry.run2Penalty)}
            </span>
          );
        case 'totalTime':
          if (entry.status === 'dns' || entry.status === 'dnf' || entry.status === 'dsq') {
            return (
              <span className={`csk-results-table__status csk-results-table__status--${entry.status}`}>
                {getStatusDisplay(entry.status)}
              </span>
            );
          }
          return (
            <span className="csk-results-table__time csk-results-table__time--total">
              {formatTime(entry.totalTime)}
            </span>
          );
        case 'timeDiff':
          if (entry.rank === 1) return '-';
          return (
            <span className="csk-results-table__time csk-results-table__time--diff">
              {formatTimeDiff(entry.timeDiff)}
            </span>
          );
        case 'startNumber':
          return entry.startNumber || '-';
        case 'round':
          if (!entry.round) return '-';
          return (
            <span className={`csk-results-table__round csk-results-table__round--${entry.round.toLowerCase()}`}>
              {entry.round}
            </span>
          );
        case 'progression':
          if (!entry.progressed) return null;
          return (
            <span className="csk-results-table__progression" title="Postoupil/a do dalšího kola">
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
              </svg>
            </span>
          );
        default:
          return entry.meta?.[columnKey] !== undefined ? String(entry.meta[columnKey]) : '-';
      }
    };

    // Get row modifier classes
    const getRowClasses = (entry: ResultEntry): string => {
      const classes = ['csk-results-table__tr'];

      // Podium highlights
      if (showPodiumHighlights && entry.rank && entry.rank <= highlightPositions) {
        classes.push(`csk-results-table__tr--rank-${entry.rank}`);
        if (entry.rank === 1) classes.push('csk-results-table__tr--gold');
        else if (entry.rank === 2) classes.push('csk-results-table__tr--silver');
        else if (entry.rank === 3) classes.push('csk-results-table__tr--bronze');
      }

      // Section highlight
      if (entry.section) {
        classes.push(`csk-results-table__tr--section-${entry.section}`);
      }

      // Status
      if (entry.status) {
        classes.push(`csk-results-table__tr--${entry.status}`);
      }

      // Highlighted (e.g., live update)
      if (entry.highlighted) {
        classes.push('csk-results-table__tr--highlighted');
      }

      // Position change animation
      if (entry.previousRank !== undefined && entry.rank !== undefined) {
        if (entry.rank < entry.previousRank) {
          classes.push('csk-results-table__tr--moved-up');
        } else if (entry.rank > entry.previousRank) {
          classes.push('csk-results-table__tr--moved-down');
        }
      }

      // Clickable
      if (onRowClick) {
        classes.push('csk-results-table__tr--clickable');
      }

      // Hovered
      if (hoveredRow === entry.id) {
        classes.push('csk-results-table__tr--hovered');
      }

      return classes.join(' ');
    };

    // Wrapper classes
    const wrapperClasses = [
      'csk-results-table-wrapper',
      stickyHeader && 'csk-results-table-wrapper--sticky',
      loading && 'csk-results-table-wrapper--loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Table classes
    const tableClasses = [
      'csk-results-table',
      `csk-results-table--${variant}`,
      `csk-results-table--${size}`,
      `csk-results-table--style-${styleVariant}`,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={wrapperClasses} {...props}>
        <table className={tableClasses}>
          {caption && (
            <caption
              className={
                captionVisible ? 'csk-results-table__caption' : 'csk-results-table__caption--sr-only'
              }
            >
              {caption}
            </caption>
          )}
          <thead className="csk-results-table__thead">
            <tr className="csk-results-table__tr csk-results-table__tr--header">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={[
                    'csk-results-table__th',
                    column.hideAt && `csk-results-table__col--hide-${column.hideAt}`,
                  ].filter(Boolean).join(' ')}
                  style={{
                    width: column.width,
                    textAlign: column.align,
                  }}
                  scope="col"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="csk-results-table__tbody">
            {filteredResults.length === 0 ? (
              <tr className="csk-results-table__tr csk-results-table__tr--empty">
                <td colSpan={columns.length} className="csk-results-table__td">
                  {emptyState || <span className="csk-results-table__empty">Žádné výsledky</span>}
                </td>
              </tr>
            ) : (
              filteredResults.map((entry) => (
                <tr
                  key={entry.id}
                  className={getRowClasses(entry)}
                  onClick={onRowClick ? () => onRowClick(entry) : undefined}
                  onMouseEnter={() => setHoveredRow(entry.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  tabIndex={onRowClick ? 0 : undefined}
                  onKeyDown={
                    onRowClick
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onRowClick(entry);
                          }
                        }
                      : undefined
                  }
                  role={onRowClick ? 'button' : undefined}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={[
                        'csk-results-table__td',
                        `csk-results-table__td--${column.key}`,
                        column.hideAt && `csk-results-table__col--hide-${column.hideAt}`,
                      ].filter(Boolean).join(' ')}
                      style={{ textAlign: column.align }}
                    >
                      {getCellContent(entry, column.key)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
        {loading && (
          <div className="csk-results-table__loading-overlay">
            <div className="csk-results-table__spinner" aria-label="Načítání" />
          </div>
        )}
      </div>
    );
  }
);

ResultsTable.displayName = 'ResultsTable';
