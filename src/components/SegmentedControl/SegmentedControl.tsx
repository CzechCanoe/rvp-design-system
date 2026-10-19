import { useRef, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import './SegmentedControl.css';

export type SegmentedControlSize = 'sm' | 'md';

export interface SegmentedControlItem {
  /** Unique value of the segment */
  value: string;
  /** Visible label (never wraps) */
  label: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Segments (days, view, round…) */
  items: SegmentedControlItem[];
  /** Selected value (state is owned by the app) */
  value: string;
  onChange: (value: string) => void;
  size?: SegmentedControlSize;
}

/**
 * Radiogroup of mutually exclusive segments. Arrow keys move and select,
 * Home/End jump to the ends. Labels never wrap; when the row runs out of
 * space the whole segment moves to the next line.
 * Give the group an accessible name via `aria-label` or `aria-labelledby`.
 */
export function SegmentedControl({
  items,
  value,
  onChange,
  size = 'md',
  className,
  ...props
}: SegmentedControlProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedIndex = items.findIndex((i) => i.value === value && !i.disabled);
  const tabbableIndex = selectedIndex >= 0 ? selectedIndex : items.findIndex((i) => !i.disabled);

  const move = (from: number, step: 1 | -1) => {
    for (let n = 1; n <= items.length; n++) {
      const idx = (((from + step * n) % items.length) + items.length) % items.length;
      if (!items[idx].disabled) {
        onChange(items[idx].value);
        refs.current[idx]?.focus();
        return;
      }
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        move(index, 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        move(index, -1);
        break;
      case 'Home':
        e.preventDefault();
        move(-1, 1);
        break;
      case 'End':
        e.preventDefault();
        move(items.length, -1);
        break;
    }
  };

  const classes = ['csk-segmented', `csk-segmented--${size}`, className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="radiogroup" {...props}>
      {items.map((item, index) => {
        const checked = item.value === value;
        return (
          <button
            key={item.value}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            disabled={item.disabled}
            tabIndex={index === tabbableIndex ? 0 : -1}
            className={`csk-segmented__item${checked ? ' csk-segmented__item--on' : ''}`}
            onClick={() => onChange(item.value)}
            onKeyDown={(e) => onKeyDown(e, index)}
          >
            <span className="csk-segmented__label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

SegmentedControl.displayName = 'SegmentedControl';
