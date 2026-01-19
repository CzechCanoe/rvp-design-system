import {
  forwardRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type ThHTMLAttributes,
  type TdHTMLAttributes,
} from 'react';
import './Table.css';

// ============================================================================
// Types
// ============================================================================

export type TableSize = 'sm' | 'md' | 'lg';
export type TableVariant = 'default' | 'striped' | 'bordered';
export type SortDirection = 'asc' | 'desc' | null;

export interface ColumnDef<T> {
  /** Unique key for the column */
  key: string;
  /** Column header label */
  header: ReactNode;
  /** Function to render cell content */
  cell?: (row: T, rowIndex: number) => ReactNode;
  /** Accessor key for simple data access */
  accessor?: keyof T;
  /** Whether the column is sortable */
  sortable?: boolean;
  /** Custom sort function */
  sortFn?: (a: T, b: T, direction: SortDirection) => number;
  /** Column width (CSS value) */
  width?: string;
  /** Horizontal alignment */
  align?: 'left' | 'center' | 'right';
  /** Header alignment (defaults to align) */
  headerAlign?: 'left' | 'center' | 'right';
}

export interface TableProps<T> extends Omit<HTMLAttributes<HTMLTableElement>, 'children'> {
  /** Array of column definitions */
  columns: ColumnDef<T>[];
  /** Array of data objects */
  data: T[];
  /** Visual variant */
  variant?: TableVariant;
  /** Table size */
  size?: TableSize;
  /** Row key accessor for React keys */
  rowKey?: keyof T | ((row: T, index: number) => string | number);
  /** Whether to enable row selection */
  selectable?: boolean;
  /** Selected row keys */
  selectedKeys?: Set<string | number>;
  /** Callback when selection changes */
  onSelectionChange?: (selectedKeys: Set<string | number>) => void;
  /** Enable sticky header */
  stickyHeader?: boolean;
  /** Enable hover effect on rows */
  hoverable?: boolean;
  /** Custom empty state content */
  emptyState?: ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Caption for accessibility */
  caption?: string;
  /** Show caption visually */
  captionVisible?: boolean;
  /** Initial sort column key */
  defaultSortKey?: string;
  /** Initial sort direction */
  defaultSortDirection?: SortDirection;
  /** Callback when sort changes (for controlled sorting) */
  onSortChange?: (key: string | null, direction: SortDirection) => void;
  /** Controlled sort key */
  sortKey?: string | null;
  /** Controlled sort direction */
  sortDirection?: SortDirection;
}

// ============================================================================
// Table Header Cell (Th)
// ============================================================================

export interface ThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Sort state */
  sortDirection?: SortDirection;
  /** Whether this column is sortable */
  sortable?: boolean;
  /** Click handler for sort */
  onSort?: () => void;
}

const Th = forwardRef<HTMLTableCellElement, ThProps>(
  ({ sortDirection, sortable, onSort, className, children, ...props }, ref) => {
    const classes = [
      'csk-table__th',
      sortable && 'csk-table__th--sortable',
      sortDirection && `csk-table__th--sorted-${sortDirection}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <th
        ref={ref}
        className={classes}
        onClick={sortable ? onSort : undefined}
        aria-sort={
          sortDirection === 'asc'
            ? 'ascending'
            : sortDirection === 'desc'
              ? 'descending'
              : sortable
                ? 'none'
                : undefined
        }
        {...props}
      >
        <span className="csk-table__th-content">
          {children}
          {sortable && (
            <span className="csk-table__sort-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path
                  className="csk-table__sort-icon--asc"
                  d="M12 5l-5 5h10l-5-5z"
                  fill={sortDirection === 'asc' ? 'currentColor' : 'none'}
                />
                <path
                  className="csk-table__sort-icon--desc"
                  d="M12 19l-5-5h10l-5 5z"
                  fill={sortDirection === 'desc' ? 'currentColor' : 'none'}
                />
              </svg>
            </span>
          )}
        </span>
      </th>
    );
  }
);

Th.displayName = 'Th';

// ============================================================================
// Table Data Cell (Td)
// ============================================================================

export interface TdProps extends TdHTMLAttributes<HTMLTableCellElement> {}

const Td = forwardRef<HTMLTableCellElement, TdProps>(({ className, children, ...props }, ref) => {
  const classes = ['csk-table__td', className].filter(Boolean).join(' ');

  return (
    <td ref={ref} className={classes} {...props}>
      {children}
    </td>
  );
});

Td.displayName = 'Td';

// ============================================================================
// Table Component
// ============================================================================

function TableInner<T>(
  {
    columns,
    data,
    variant = 'default',
    size = 'md',
    rowKey,
    selectable = false,
    selectedKeys: controlledSelectedKeys,
    onSelectionChange,
    stickyHeader = false,
    hoverable = true,
    emptyState,
    loading = false,
    caption,
    captionVisible = false,
    defaultSortKey,
    defaultSortDirection = null,
    onSortChange,
    sortKey: controlledSortKey,
    sortDirection: controlledSortDirection,
    className,
    ...props
  }: TableProps<T>,
  ref: React.ForwardedRef<HTMLTableElement>
) {
  // Internal sort state (uncontrolled mode)
  const [internalSortKey, setInternalSortKey] = useState<string | null>(defaultSortKey || null);
  const [internalSortDirection, setInternalSortDirection] =
    useState<SortDirection>(defaultSortDirection);

  // Internal selection state (uncontrolled mode)
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<Set<string | number>>(
    new Set()
  );

  // Use controlled values if provided
  const sortKey = controlledSortKey !== undefined ? controlledSortKey : internalSortKey;
  const sortDirection =
    controlledSortDirection !== undefined ? controlledSortDirection : internalSortDirection;
  const selectedKeys = controlledSelectedKeys !== undefined ? controlledSelectedKeys : internalSelectedKeys;

  // Get row key value
  const getRowKey = (row: T, index: number): string | number => {
    if (!rowKey) return index;
    if (typeof rowKey === 'function') return rowKey(row, index);
    return String(row[rowKey]);
  };

  // Handle sort toggle
  const handleSort = (columnKey: string) => {
    let newDirection: SortDirection;

    if (sortKey !== columnKey) {
      newDirection = 'asc';
    } else if (sortDirection === 'asc') {
      newDirection = 'desc';
    } else {
      newDirection = null;
    }

    if (controlledSortKey === undefined) {
      setInternalSortKey(newDirection ? columnKey : null);
      setInternalSortDirection(newDirection);
    }

    onSortChange?.(newDirection ? columnKey : null, newDirection);
  };

  // Handle row selection
  const handleRowSelect = (key: string | number) => {
    const newSelectedKeys = new Set(selectedKeys);
    if (newSelectedKeys.has(key)) {
      newSelectedKeys.delete(key);
    } else {
      newSelectedKeys.add(key);
    }

    if (controlledSelectedKeys === undefined) {
      setInternalSelectedKeys(newSelectedKeys);
    }

    onSelectionChange?.(newSelectedKeys);
  };

  // Handle select all
  const handleSelectAll = () => {
    const allKeys = data.map((row, index) => getRowKey(row, index));
    const allSelected = allKeys.length > 0 && allKeys.every((key) => selectedKeys.has(key));

    const newSelectedKeys = allSelected ? new Set<string | number>() : new Set(allKeys);

    if (controlledSelectedKeys === undefined) {
      setInternalSelectedKeys(newSelectedKeys);
    }

    onSelectionChange?.(newSelectedKeys);
  };

  // Sort data
  const sortedData = [...data];
  if (sortKey && sortDirection) {
    const column = columns.find((col) => col.key === sortKey);
    if (column) {
      sortedData.sort((a, b) => {
        if (column.sortFn) {
          return column.sortFn(a, b, sortDirection);
        }

        const accessor = column.accessor || (column.key as keyof T);
        const aVal = a[accessor];
        const bVal = b[accessor];

        let comparison = 0;
        if (aVal === bVal) {
          comparison = 0;
        } else if (aVal === null || aVal === undefined) {
          comparison = 1;
        } else if (bVal === null || bVal === undefined) {
          comparison = -1;
        } else if (typeof aVal === 'string' && typeof bVal === 'string') {
          comparison = aVal.localeCompare(bVal, 'cs');
        } else {
          comparison = aVal < bVal ? -1 : 1;
        }

        return sortDirection === 'desc' ? -comparison : comparison;
      });
    }
  }

  // Check if all rows are selected
  const allKeys = data.map((row, index) => getRowKey(row, index));
  const allSelected = allKeys.length > 0 && allKeys.every((key) => selectedKeys.has(key));
  const someSelected = allKeys.some((key) => selectedKeys.has(key)) && !allSelected;

  // Classes
  const wrapperClasses = [
    'csk-table-wrapper',
    stickyHeader && 'csk-table-wrapper--sticky',
    loading && 'csk-table-wrapper--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const tableClasses = [
    'csk-table',
    `csk-table--${variant}`,
    `csk-table--${size}`,
    hoverable && 'csk-table--hoverable',
  ]
    .filter(Boolean)
    .join(' ');

  // Render cell content
  const renderCell = (column: ColumnDef<T>, row: T, rowIndex: number): ReactNode => {
    if (column.cell) {
      return column.cell(row, rowIndex);
    }
    if (column.accessor) {
      const value = row[column.accessor];
      return value !== null && value !== undefined ? String(value) : '';
    }
    return null;
  };

  return (
    <div className={wrapperClasses}>
      <table ref={ref} className={tableClasses} {...props}>
        {caption && (
          <caption className={captionVisible ? 'csk-table__caption' : 'csk-table__caption--sr-only'}>
            {caption}
          </caption>
        )}
        <thead className="csk-table__thead">
          <tr className="csk-table__tr">
            {selectable && (
              <Th className="csk-table__th--checkbox" scope="col">
                <input
                  type="checkbox"
                  className="csk-table__checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={handleSelectAll}
                  aria-label="Select all rows"
                />
              </Th>
            )}
            {columns.map((column) => (
              <Th
                key={column.key}
                scope="col"
                sortable={column.sortable}
                sortDirection={sortKey === column.key ? sortDirection : null}
                onSort={column.sortable ? () => handleSort(column.key) : undefined}
                style={{
                  width: column.width,
                  textAlign: column.headerAlign || column.align,
                }}
              >
                {column.header}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody className="csk-table__tbody">
          {sortedData.length === 0 ? (
            <tr className="csk-table__tr csk-table__tr--empty">
              <Td colSpan={columns.length + (selectable ? 1 : 0)}>
                {emptyState || <span className="csk-table__empty">Žádná data</span>}
              </Td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => {
              const key = getRowKey(row, rowIndex);
              const isSelected = selectedKeys.has(key);

              return (
                <tr
                  key={key}
                  className={[
                    'csk-table__tr',
                    isSelected && 'csk-table__tr--selected',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {selectable && (
                    <Td className="csk-table__td--checkbox">
                      <input
                        type="checkbox"
                        className="csk-table__checkbox"
                        checked={isSelected}
                        onChange={() => handleRowSelect(key)}
                        aria-label={`Select row ${rowIndex + 1}`}
                      />
                    </Td>
                  )}
                  {columns.map((column) => (
                    <Td
                      key={column.key}
                      style={{ textAlign: column.align }}
                    >
                      {renderCell(column, row, rowIndex)}
                    </Td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {loading && (
        <div className="csk-table__loading-overlay">
          <div className="csk-table__spinner" aria-label="Loading" />
        </div>
      )}
    </div>
  );
}

// Wrapper to support generics with forwardRef
export const Table = forwardRef(TableInner) as <T>(
  props: TableProps<T> & { ref?: React.ForwardedRef<HTMLTableElement> }
) => ReturnType<typeof TableInner>;

// Re-export subcomponents for advanced usage
export { Th, Td };
