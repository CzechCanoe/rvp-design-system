import { type HTMLAttributes } from 'react';
import { Icon, type IconName } from '../Icon';
import './FilterPills.css';

export type FilterPillsSize = 'sm' | 'md';

export interface FilterPill {
  /** Unique identifier for the filter */
  key: string;
  /** Display label for the filter */
  label: string;
  /** Optional icon name from the design system */
  icon?: IconName;
  /** Optional value (used for callback) */
  value?: string;
  /** Pressed (navy) state. Defaults to true: pills are active filters */
  active?: boolean;
  /** Shows a remove button ("U18 ✕"). Defaults to true when `onRemove` is set */
  dismissible?: boolean;
}

export interface FilterPillsProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of active filters to display */
  filters: FilterPill[];
  /** Optional search query to display as a filter */
  searchQuery?: string;
  /** Label prefix for search filter */
  searchLabel?: string;
  /** Callback when a pill is toggled; renders the label as a toggle button (`aria-pressed`) */
  onFilterToggle?: (key: string) => void;
  /** Callback when a filter is removed */
  onRemove?: (key: string) => void;
  /** Callback when search is cleared */
  onClearSearch?: () => void;
  /** Callback when all filters are cleared */
  onClearAll?: () => void;
  /** Label for clear all button */
  clearAllLabel?: string;
  /** Size: md = 34 px, sm = 30 px high */
  size?: FilterPillsSize;
  /** Show separator line at top */
  bordered?: boolean;
  /** Hide if no filters are active */
  hideWhenEmpty?: boolean;
}

/**
 * FilterPills component for displaying active filters with remove functionality.
 *
 * Pills match the reference `.pill` (34 / 30 px high, active = navy). A pill is a
 * toggle (`onFilterToggle`, `aria-pressed`), can be dismissible ("U18 ✕") and a "clear all"
 * option resets all filters at once.
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
  onFilterToggle,
  onRemove,
  onClearSearch,
  onClearAll,
  clearAllLabel = 'Zrušit vše',
  size = 'md',
  bordered = false,
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
            <Icon name="search" size={size === 'sm' ? 12 : 14} />
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
                <Icon name="x" size={size === 'sm' ? 10 : 12} />
              </button>
            )}
          </span>
        )}

        {/* Filter pills */}
        {filters.map((filter) => {
          const active = filter.active ?? true;
          const dismissible = filter.dismissible ?? Boolean(onRemove);
          const pillClasses = [
            'csk-filter-pills__pill',
            active && 'csk-filter-pills__pill--active',
            onFilterToggle && 'csk-filter-pills__pill--toggle',
          ]
            .filter(Boolean)
            .join(' ');
          const content = (
            <>
              {filter.icon && (
                <Icon name={filter.icon} size={size === 'sm' ? 12 : 14} />
              )}
              <span className="csk-filter-pills__label">{filter.label}</span>
            </>
          );
          return (
            <span key={filter.key} className={pillClasses}>
              {onFilterToggle ? (
                <button
                  type="button"
                  className="csk-filter-pills__toggle"
                  aria-pressed={active}
                  onClick={() => onFilterToggle(filter.key)}
                >
                  {content}
                </button>
              ) : (
                <span className="csk-filter-pills__content">{content}</span>
              )}
              {dismissible && onRemove && (
                <button
                  type="button"
                  className="csk-filter-pills__remove"
                  onClick={() => onRemove(filter.key)}
                  aria-label={`Zrušit filtr ${filter.label}`}
                >
                  <Icon name="x" size={size === 'sm' ? 10 : 12} />
                </button>
              )}
            </span>
          );
        })}

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
