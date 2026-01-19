import { forwardRef, type HTMLAttributes, type ReactNode, useMemo, useCallback } from 'react';
import './Pagination.css';

// ============================================================================
// Types
// ============================================================================

export type PaginationSize = 'sm' | 'md' | 'lg';
export type PaginationVariant = 'default' | 'simple' | 'minimal';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Visual variant */
  variant?: PaginationVariant;
  /** Size of pagination controls */
  size?: PaginationSize;
  /** Number of page buttons to show on each side of current page */
  siblingCount?: number;
  /** Number of page buttons to always show at start and end */
  boundaryCount?: number;
  /** Show first/last page buttons */
  showFirstLast?: boolean;
  /** Show previous/next buttons */
  showPrevNext?: boolean;
  /** Custom labels for navigation buttons */
  labels?: {
    first?: ReactNode;
    previous?: ReactNode;
    next?: ReactNode;
    last?: ReactNode;
    page?: (page: number) => string;
  };
  /** Disable all controls */
  disabled?: boolean;
  /** Accessible label for the navigation */
  ariaLabel?: string;
}

// ============================================================================
// Helper function to generate page range
// ============================================================================

function range(start: number, end: number): number[] {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => start + idx);
}

type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end';

function usePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
  boundaryCount: number
): PaginationItem[] {
  return useMemo(() => {
    // Total items = boundary items + siblings + current page + 2 ellipses
    const totalPageNumbers = boundaryCount * 2 + siblingCount * 2 + 3; // +3 for current + 2 possible ellipsis positions

    // If total pages is less than items we want to show, show all pages
    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    const leftBoundary = range(1, boundaryCount);
    const rightBoundary = range(totalPages - boundaryCount + 1, totalPages);

    const leftSiblingIndex = Math.max(currentPage - siblingCount, boundaryCount + 2);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - boundaryCount - 1);

    const shouldShowLeftEllipsis = leftSiblingIndex > boundaryCount + 2;
    const shouldShowRightEllipsis = rightSiblingIndex < totalPages - boundaryCount - 1;

    const items: PaginationItem[] = [];

    // Left boundary
    items.push(...leftBoundary);

    // Left ellipsis or connecting pages
    if (shouldShowLeftEllipsis) {
      items.push('ellipsis-start');
    } else if (boundaryCount < leftSiblingIndex - 1) {
      items.push(...range(boundaryCount + 1, leftSiblingIndex - 1));
    }

    // Sibling pages and current page
    items.push(...range(leftSiblingIndex, rightSiblingIndex));

    // Right ellipsis or connecting pages
    if (shouldShowRightEllipsis) {
      items.push('ellipsis-end');
    } else if (rightSiblingIndex < totalPages - boundaryCount) {
      items.push(...range(rightSiblingIndex + 1, totalPages - boundaryCount));
    }

    // Right boundary
    items.push(...rightBoundary);

    // Remove duplicates while preserving order
    const uniqueItems: PaginationItem[] = [];
    const seen = new Set<PaginationItem>();
    for (const item of items) {
      if (!seen.has(item)) {
        seen.add(item);
        uniqueItems.push(item);
      }
    }

    return uniqueItems;
  }, [currentPage, totalPages, siblingCount, boundaryCount]);
}

// ============================================================================
// Icons
// ============================================================================

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const ChevronsLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 17l-5-5 5-5" />
    <path d="M18 17l-5-5 5-5" />
  </svg>
);

const ChevronsRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 17l5-5-5-5" />
    <path d="M6 17l5-5-5-5" />
  </svg>
);

// ============================================================================
// Pagination Component
// ============================================================================

/**
 * Pagination component for navigating through pages of content.
 *
 * Supports multiple variants (default, simple, minimal),
 * sizes (sm, md, lg), and configurable navigation buttons.
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      variant = 'default',
      size = 'md',
      siblingCount = 1,
      boundaryCount = 1,
      showFirstLast = true,
      showPrevNext = true,
      labels = {},
      disabled = false,
      ariaLabel = 'Navigace stránkování',
      className,
      ...props
    },
    ref
  ) => {
    const {
      first = <ChevronsLeftIcon />,
      previous = <ChevronLeftIcon />,
      next = <ChevronRightIcon />,
      last = <ChevronsRightIcon />,
      page: pageLabel = (p: number) => `Stránka ${p}`,
    } = labels;

    const paginationRange = usePaginationRange(currentPage, totalPages, siblingCount, boundaryCount);

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const handlePageChange = useCallback(
      (page: number) => {
        if (!disabled && page >= 1 && page <= totalPages && page !== currentPage) {
          onPageChange(page);
        }
      },
      [disabled, totalPages, currentPage, onPageChange]
    );

    const classes = [
      'csk-pagination',
      `csk-pagination--${variant}`,
      `csk-pagination--${size}`,
      disabled && 'csk-pagination--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Minimal variant - just prev/next with page indicator
    if (variant === 'minimal') {
      return (
        <nav ref={ref} className={classes} aria-label={ariaLabel} {...props}>
          <button
            type="button"
            className="csk-pagination__button csk-pagination__button--prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={disabled || isFirstPage}
            aria-label="Předchozí stránka"
          >
            {previous}
          </button>
          <span className="csk-pagination__info">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            className="csk-pagination__button csk-pagination__button--next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={disabled || isLastPage}
            aria-label="Další stránka"
          >
            {next}
          </button>
        </nav>
      );
    }

    // Simple variant - prev/next with page numbers, no first/last
    if (variant === 'simple') {
      return (
        <nav ref={ref} className={classes} aria-label={ariaLabel} {...props}>
          <button
            type="button"
            className="csk-pagination__button csk-pagination__button--prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={disabled || isFirstPage}
            aria-label="Předchozí stránka"
          >
            {previous}
          </button>
          <ul className="csk-pagination__list">
            {paginationRange.map((item) => {
              if (item === 'ellipsis-start' || item === 'ellipsis-end') {
                return (
                  <li key={item} className="csk-pagination__item">
                    <span className="csk-pagination__ellipsis" aria-hidden="true">
                      ...
                    </span>
                  </li>
                );
              }

              const isActive = item === currentPage;
              return (
                <li key={item} className="csk-pagination__item">
                  <button
                    type="button"
                    className={[
                      'csk-pagination__button',
                      'csk-pagination__button--page',
                      isActive && 'csk-pagination__button--active',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => handlePageChange(item)}
                    disabled={disabled}
                    aria-label={pageLabel(item)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item}
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            className="csk-pagination__button csk-pagination__button--next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={disabled || isLastPage}
            aria-label="Další stránka"
          >
            {next}
          </button>
        </nav>
      );
    }

    // Default variant - full navigation with first/last, prev/next, and page numbers
    return (
      <nav ref={ref} className={classes} aria-label={ariaLabel} {...props}>
        {showFirstLast && (
          <button
            type="button"
            className="csk-pagination__button csk-pagination__button--first"
            onClick={() => handlePageChange(1)}
            disabled={disabled || isFirstPage}
            aria-label="První stránka"
          >
            {first}
          </button>
        )}
        {showPrevNext && (
          <button
            type="button"
            className="csk-pagination__button csk-pagination__button--prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={disabled || isFirstPage}
            aria-label="Předchozí stránka"
          >
            {previous}
          </button>
        )}
        <ul className="csk-pagination__list">
          {paginationRange.map((item) => {
            if (item === 'ellipsis-start' || item === 'ellipsis-end') {
              return (
                <li key={item} className="csk-pagination__item">
                  <span className="csk-pagination__ellipsis" aria-hidden="true">
                    ...
                  </span>
                </li>
              );
            }

            const isActive = item === currentPage;
            return (
              <li key={item} className="csk-pagination__item">
                <button
                  type="button"
                  className={[
                    'csk-pagination__button',
                    'csk-pagination__button--page',
                    isActive && 'csk-pagination__button--active',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => handlePageChange(item)}
                  disabled={disabled}
                  aria-label={pageLabel(item)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
        {showPrevNext && (
          <button
            type="button"
            className="csk-pagination__button csk-pagination__button--next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={disabled || isLastPage}
            aria-label="Další stránka"
          >
            {next}
          </button>
        )}
        {showFirstLast && (
          <button
            type="button"
            className="csk-pagination__button csk-pagination__button--last"
            onClick={() => handlePageChange(totalPages)}
            disabled={disabled || isLastPage}
            aria-label="Poslední stránka"
          >
            {last}
          </button>
        )}
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';
