import { type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import './TableToolbar.css';

type TableToolbarName =
  | { 'aria-label': string; 'aria-labelledby'?: string }
  | { 'aria-labelledby': string; 'aria-label'?: string };

export type TableToolbarProps = TableToolbarName & TableToolbarBaseProps;

interface TableToolbarBaseProps extends HTMLAttributes<HTMLDivElement> {
  /** Search field; grows to take the remaining width, never narrower than 10rem (e.g. SearchInput) */
  search?: ReactNode;
  /** Filter pills (TableToolbarButton); labels never wrap */
  children?: ReactNode;
  /** Favourites toggle (FavoritesToggle) */
  favorites?: ReactNode;
  /** "Detailní" switch */
  detail?: ReactNode;
  /**
   * Where the `detail` switch is shown: `'desktop'` (default) hides it below 769 px viewport width
   * (phone: the toolbar keeps two rows, search · controls), `'always'` shows it on every width.
   * Hiding is visual only (`display: none`); the application keeps the detail state.
   */
  detailToggle?: TableToolbarDetailToggle;
}

/** Where the "Detailní" switch of a TableToolbar is shown. */
export type TableToolbarDetailToggle = 'desktop' | 'always';

/**
 * Container for search + pills + favourites toggle + detail switch above a table.
 *
 * One row while the search keeps at least 10rem (160 px). When the controls do not fit next to it
 * (390 px phone with round, category, ★ and "Detailní"), they move as a group to the next row and the
 * search takes the full first row; inside the group each control keeps its width and wraps whole.
 * The "Detailní" switch is desktop-only by default (`detailToggle`), so a phone has at most two rows.
 */
export function TableToolbar({
  search,
  children,
  favorites,
  detail,
  detailToggle = 'desktop',
  className,
  ...props
}: TableToolbarProps) {
  const classes = ['csk-table-toolbar', className].filter(Boolean).join(' ');
  const hasControls = Boolean(children || favorites || detail);
  return (
    <div className={classes} role="group" {...props}>
      {search && <div className="csk-table-toolbar__search">{search}</div>}
      {hasControls && (
        <div className="csk-table-toolbar__controls">
          {children}
          {favorites}
          {detail && (
            <div className={`csk-table-toolbar__detail csk-table-toolbar__detail--${detailToggle}`}>{detail}</div>
          )}
        </div>
      )}
    </div>
  );
}

export interface TableToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Sets aria-pressed and the selected look when defined */
  pressed?: boolean;
}

/** Pill button for the toolbar: 34 px visible, 44 px touch target, nowrap label. */
export function TableToolbarButton({
  pressed,
  children,
  className,
  ...props
}: TableToolbarButtonProps) {
  const classes = [
    'csk-table-toolbar__button',
    pressed && 'csk-table-toolbar__button--on',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button type="button" className={classes} aria-pressed={pressed} {...props}>
      <span className="csk-table-toolbar__pill">{children}</span>
    </button>
  );
}

TableToolbar.displayName = 'TableToolbar';
TableToolbarButton.displayName = 'TableToolbarButton';
