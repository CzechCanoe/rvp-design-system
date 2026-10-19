import { type ButtonHTMLAttributes } from 'react';
import { StarGlyph } from './StarGlyph';
import './StarButton.css';

export interface StarButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'aria-pressed'> {
  /** Whether the item is a favourite (state is owned by the app) */
  pressed: boolean;
  /** Accessible name, e.g. "Oblíbený: HNILICA Lukas" */
  label: string;
  onPressedChange?: (pressed: boolean) => void;
}

/** Star toggle: 22 px glyph inside a 44 x 44 px touch target. */
export function StarButton({
  pressed,
  label,
  onPressedChange,
  onClick,
  className,
  ...props
}: StarButtonProps) {
  const classes = ['csk-star-button', pressed && 'csk-star-button--on', className]
    .filter(Boolean)
    .join(' ');
  return (
    <button
      type="button"
      className={classes}
      aria-pressed={pressed}
      aria-label={label}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) onPressedChange?.(!pressed);
      }}
      {...props}
    >
      <StarGlyph filled={pressed} />
    </button>
  );
}

StarButton.displayName = 'StarButton';
