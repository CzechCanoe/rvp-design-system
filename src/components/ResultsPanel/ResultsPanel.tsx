import { forwardRef, type ReactNode } from 'react';
import { Card, type CardProps } from '../Card';
import { StatusBadge, type StatusBadgeState } from '../StatusBadge';
import { TableToolbar, type TableToolbarDetailToggle } from '../TableToolbar';
import './ResultsPanel.css';

export interface ResultsPanelProps
  extends Omit<
    CardProps,
    'header' | 'footer' | 'children' | 'padding' | 'variant' | 'href' | 'target' | 'rel' | 'clickable' | 'onClick'
  > {
  /** Toolbar: search field, typically `<SearchInput size="sm" fullWidth />` */
  search?: ReactNode;
  /** Toolbar: filter pills (`TableToolbarButton`, `FilterPills dismissible`) */
  filters?: ReactNode;
  /** Toolbar: favourites toggle (`FavoritesToggle`) */
  favorites?: ReactNode;
  /** Toolbar: "Detailní" switch (`Switch size="sm"`); the application expands the rows */
  detail?: ReactNode;
  /** Toolbar: where the "Detailní" switch is shown; `'desktop'` (default) hides it below 769 px (`TableToolbar detailToggle`) */
  detailToggle?: TableToolbarDetailToggle;
  /** Accessible name of the toolbar */
  toolbarLabel?: string;
  /** Status line: state of the shown results as a `StatusBadge` */
  state?: StatusBadgeState;
  /**
   * Status line: text after the badge. Any node, so it carries a progress note („po 2. jízdě · 8 z 24 v cíli“),
   * a `DataAge`, or both (`<><DataAge … /> · po 2. jízdě · 8 z 24 v cíli</>`); it wraps under the badge when narrow.
   */
  status?: ReactNode;
  /** The table: `ResultsTable`, `StartlistTable` or an `EmptyState` */
  children: ReactNode;
  /** Footer, left: counts ("Zobrazeno 11 z 88") */
  footer?: ReactNode;
  /** Footer, right: links ("Oficiální PDF", "Na kanoe.cz") */
  footerLinks?: ReactNode;
}

/**
 * Results panel: one outlined card with the table toolbar (search · filters · ★ · Detailní),
 * a status line (StatusBadge + text), the table and a footer (counts left, links right).
 * Layout only: every value and state (search text, favourites, expanded rows) is the application's.
 */
export const ResultsPanel = forwardRef<HTMLDivElement, ResultsPanelProps>(
  (
    {
      search,
      filters,
      favorites,
      detail,
      detailToggle,
      toolbarLabel = 'Nástroje tabulky',
      state,
      status,
      children,
      footer,
      footerLinks,
      className,
      ...props
    },
    ref
  ) => {
    const hasToolbar = Boolean(search || filters || favorites || detail);
    const classes = ['csk-results-panel', className].filter(Boolean).join(' ');

    return (
      <Card
        ref={ref}
        variant="surface"
        padding="none"
        className={classes}
        footer={
          footer || footerLinks ? (
            <div className="csk-results-panel__foot">
              {footer && <span>{footer}</span>}
              {footerLinks && <span className="csk-results-panel__foot-links">{footerLinks}</span>}
            </div>
          ) : undefined
        }
        {...props}
      >
        {hasToolbar && (
          <TableToolbar aria-label={toolbarLabel} search={search} favorites={favorites} detail={detail} detailToggle={detailToggle}>
            {filters}
          </TableToolbar>
        )}
        {(state || status) && (
          <div className="csk-results-panel__status">
            {state && <StatusBadge state={state} />}
            {status && <span>{status}</span>}
          </div>
        )}
        {children}
      </Card>
    );
  }
);

ResultsPanel.displayName = 'ResultsPanel';
