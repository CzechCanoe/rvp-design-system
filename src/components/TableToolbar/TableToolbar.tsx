import { type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import './TableToolbar.css';

type TableToolbarName =
  | { 'aria-label': string; 'aria-labelledby'?: string }
  | { 'aria-labelledby': string; 'aria-label'?: string };

export type TableToolbarProps = TableToolbarName & TableToolbarBaseProps;

interface TableToolbarBaseProps extends HTMLAttributes<HTMLDivElement> {
  /** Search field; grows to take the remaining width (e.g. SearchInput) */
  search?: ReactNode;
  /** Filter pills (TableToolbarButton); labels never wrap */
  children?: ReactNode;
  /** Favourites toggle (FavoritesToggle) */
  favorites?: ReactNode;
  /** "Detailní" switch */
  detail?: ReactNode;
}

/** Container for search + pills + favourites toggle + detail switch above a table. */
export function TableToolbar({
  search,
  children,
  favorites,
  detail,
  className,
  ...props
}: TableToolbarProps) {
  const classes = ['csk-table-toolbar', className].filter(Boolean).join(' ');
  return (
    <div className={classes} role="group" {...props}>
      {search && <div className="csk-table-toolbar__search">{search}</div>}
      {children}
      {favorites}
      {detail && <div className="csk-table-toolbar__detail">{detail}</div>}
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
