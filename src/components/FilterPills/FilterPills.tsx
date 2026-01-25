import { type HTMLAttributes } from 'react';
import { Icon, type IconName } from '../Icon';
import './FilterPills.css';

export type FilterPillsSize = 'sm' | 'md' | 'lg';
export type FilterPillsVariant = 'default' | 'subtle';

export interface FilterPill {
  /** Unique identifier for the filter */
  key: string;
  /** Display label for the filter */
  label: string;
  /** Optional icon name from the design system */
  icon?: IconName;
  /** Optional value (used for callback) */
  value?: string;
}

export interface FilterPillsProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of active filters to display */
  filters: FilterPill[];
  /** Optional search query to display as a filter */
  searchQuery?: string;
  /** Label prefix for search filter */
  searchLabel?: string;
  /** Callback when a filter is removed */
  onRemove?: (key: string) => void;
  /** Callback when search is cleared */
  onClearSearch?: () => void;
  /** Callback when all filters are cleared */
  onClearAll?: () => void;
  /** Label for clear all button */
  clearAllLabel?: string;
  /** Size variant */
  size?: FilterPillsSize;
  /** Visual variant */
  variant?: FilterPillsVariant;
  /** Show separator line at top */
  bordered?: boolean;
  /** Hide if no filters are active */
  hideWhenEmpty?: boolean;
}

/**
 * FilterPills component for displaying active filters with remove functionality.
 *
 * Used in list pages (Athletes, Clubs, Calendar, Rankings) to show and manage
 * active filters. Each pill can be individually removed, and a "clear all" option
 * resets all filters at once.
 *
 * @example
 * ```tsx
 * <FilterPills
 *   filters={[
 *     { key: 'section', label: 'Divoká voda' },
 *     { key: 'region', label: 'Praha' },
 *   ]}
 *   searchQuery="Prskavec"
 *   onRemove={(key) => handleRemoveFilter(key)}
 *   onClearSearch={() => setSearchQuery('')}
 *   onClearAll={() => resetAllFilters()}
 * />
 * ```
 */
export function FilterPills({
  filters,
  searchQuery,
  searchLabel = 'Hledání',
  onRemove,
  onClearSearch,
  onClearAll,
  clearAllLabel = 'Zrušit vše',
  size = 'md',
  variant = 'default',
  bordered = true,
  hideWhenEmpty = true,
  className,
  ...props
}: FilterPillsProps) {
  const hasFilters = filters.length > 0 || !!searchQuery;

  // Don't render if no filters and hideWhenEmpty is true
  if (!hasFilters && hideWhenEmpty) {
    return null;
  }

  const classes = [
    'csk-filter-pills',
    `csk-filter-pills--${size}`,
    `csk-filter-pills--${variant}`,
    bordered && 'csk-filter-pills--bordered',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      <div className="csk-filter-pills__list">
        {/* Search query pill */}
        {searchQuery && (
          <span className="csk-filter-pills__pill">
            <Icon name="search" size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />
            <span className="csk-filter-pills__label">
              {searchLabel}: "{searchQuery}"
            </span>
            {onClearSearch && (
              <button
                type="button"
                className="csk-filter-pills__remove"
                onClick={onClearSearch}
                aria-label={`Zrušit hledání "${searchQuery}"`}
              >
                <Icon name="x" size={size === 'sm' ? 10 : size === 'lg' ? 14 : 12} />
              </button>
            )}
          </span>
        )}

        {/* Filter pills */}
        {filters.map((filter) => (
          <span key={filter.key} className="csk-filter-pills__pill">
            {filter.icon && (
              <Icon name={filter.icon} size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />
            )}
            <span className="csk-filter-pills__label">{filter.label}</span>
            {onRemove && (
              <button
                type="button"
                className="csk-filter-pills__remove"
                onClick={() => onRemove(filter.key)}
                aria-label={`Zrušit filtr ${filter.label}`}
              >
                <Icon name="x" size={size === 'sm' ? 10 : size === 'lg' ? 14 : 12} />
              </button>
            )}
          </span>
        ))}

        {/* Clear all button */}
        {hasFilters && onClearAll && (
          <button
            type="button"
            className="csk-filter-pills__clear-all"
            onClick={onClearAll}
          >
            {clearAllLabel}
          </button>
        )}
      </div>
    </div>
  );
}

FilterPills.displayName = 'FilterPills';
