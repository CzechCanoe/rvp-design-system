import { type ButtonHTMLAttributes } from 'react';
import { StarGlyph } from '../StarButton/StarGlyph';
import './FavoritesToggle.css';

export interface FavoritesToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'aria-pressed'> {
  /** Whether the "favourites only" filter is on (state is owned by the app) */
  pressed: boolean;
  /** Number of favourites shown next to the star */
  count: number;
  /** Accessible name, e.g. "Jen oblíbení" (the count is appended) */
  label: string;
  onPressedChange?: (pressed: boolean) => void;
}

/** "★ 2" filter toggle: 34 px visible pill inside a 44 px touch target. */
export function FavoritesToggle({
  pressed,
  count,
  label,
  onPressedChange,
  onClick,
  className,
  ...props
}: FavoritesToggleProps) {
  const classes = ['csk-favorites-toggle', pressed && 'csk-favorites-toggle--on', className]
    .filter(Boolean)
    .join(' ');
  return (
    <button
      type="button"
      className={classes}
      aria-pressed={pressed}
      aria-label={`${label} (${count})`}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) onPressedChange?.(!pressed);
      }}
      {...props}
    >
      <span className="csk-favorites-toggle__pill" aria-hidden="true">
        <StarGlyph filled={pressed} />
        <span className="csk-favorites-toggle__count">{count}</span>
      </span>
    </button>
  );
}

FavoritesToggle.displayName = 'FavoritesToggle';
