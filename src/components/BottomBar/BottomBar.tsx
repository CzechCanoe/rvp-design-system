import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import './BottomBar.css';

export interface BottomBarItem {
  /** Icon (22 px, drawn with `currentColor`) */
  icon: ReactNode;
  /** Short label under the icon */
  label: string;
  /** Link target */
  href: string;
  /** Marks the current section */
  active?: boolean;
  /** Stable key (defaults to href) */
  id?: string;
}

export interface BottomBarProps extends HTMLAttributes<HTMLElement> {
  /** Navigation items (4 fit comfortably at 390 px) */
  items: BottomBarItem[];
  /** Stick to the bottom of the scrolling viewport */
  sticky?: boolean;
}

/**
 * Bottom navigation for phones (60 px, 44 px touch targets).
 * Hidden when the container is 768 px or wider: the wrapper is a size container,
 * so the bar also behaves in narrow embeds on a wide viewport.
 */
export const BottomBar = forwardRef<HTMLElement, BottomBarProps>(
  ({ items, sticky = false, className, 'aria-label': ariaLabel = 'Hlavní navigace', ...props }, ref) => {
    const classes = ['csk-bottom-bar', sticky && 'csk-bottom-bar--sticky', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={`csk-bottom-bar-wrap${sticky ? ' csk-bottom-bar-wrap--sticky' : ''}`}>
        <nav ref={ref} className={classes} aria-label={ariaLabel} {...props}>
          {items.map((item) => (
            <a
              key={item.id ?? item.href}
              href={item.href}
              className={`csk-bottom-bar__item${item.active ? ' csk-bottom-bar__item--active' : ''}`}
              aria-current={item.active ? 'page' : undefined}
            >
              <span className="csk-bottom-bar__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="csk-bottom-bar__label">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    );
  }
);

BottomBar.displayName = 'BottomBar';
