import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import './Subbar.css';

export interface SubbarItem {
  /** Visible label */
  label: ReactNode;
  /** Link target */
  href: string;
  /** Marks the current section */
  active?: boolean;
  /** Stable key (defaults to href) */
  id?: string;
}

export interface SubbarProps extends HTMLAttributes<HTMLElement> {
  /** Section links */
  items: SubbarItem[];
  /** Maximum width of the content (matches Header `maxWidth`) */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * Secondary band below `Header variant="site"` (action blue, 40 px).
 * Scrolls horizontally when the items do not fit.
 */
export const Subbar = forwardRef<HTMLElement, SubbarProps>(
  (
    { items, maxWidth = 'full', className, 'aria-label': ariaLabel = 'Sekce webu', ...props },
    ref
  ) => {
    const classes = ['csk-subbar', `csk-subbar--max-${maxWidth}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <nav ref={ref} className={classes} aria-label={ariaLabel} {...props}>
        <ul className="csk-subbar__list">
          {items.map((item) => (
            <li key={item.id ?? item.href} className="csk-subbar__item">
              <a
                href={item.href}
                className={`csk-subbar__link${item.active ? ' csk-subbar__link--active' : ''}`}
                aria-current={item.active ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
);

Subbar.displayName = 'Subbar';
