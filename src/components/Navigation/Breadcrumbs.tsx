import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './Navigation.css';

export interface BreadcrumbItem {
  /** Unique identifier for the breadcrumb item */
  id: string;
  /** Label displayed for this breadcrumb */
  label: ReactNode;
  /** URL for the breadcrumb link (omit for current page) */
  href?: string;
  /** Optional icon to display before the label */
  icon?: ReactNode;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Custom separator between items (default: /) */
  separator?: ReactNode;
  /** Maximum number of items to show before collapsing */
  maxItems?: number;
  /** Label for collapsed items button */
  collapsedLabel?: string;
  /** Custom render function for links */
  renderLink?: (item: BreadcrumbItem, children: ReactNode) => ReactNode;
}

const DefaultSeparator = () => (
  <span className="csk-breadcrumbs__separator" aria-hidden="true">
    /
  </span>
);

const ChevronIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/**
 * Breadcrumbs component for showing navigation hierarchy.
 *
 * Features:
 * - Automatic collapsing for long paths
 * - Custom separator support
 * - Accessible (aria-label, aria-current)
 * - Custom link renderer for router integration
 */
export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      items,
      separator,
      maxItems = 0,
      collapsedLabel = '...',
      renderLink,
      className,
      ...props
    },
    ref
  ) => {
    // Default link renderer
    const defaultRenderLink = (item: BreadcrumbItem, children: ReactNode) => (
      <a href={item.href} className="csk-breadcrumbs__link">
        {children}
      </a>
    );

    const linkRenderer = renderLink || defaultRenderLink;

    // Collapse items if needed
    const getDisplayItems = (): (BreadcrumbItem | 'collapsed')[] => {
      if (maxItems <= 0 || items.length <= maxItems) {
        return items;
      }

      // Show first item, collapsed indicator, and last (maxItems - 2) items
      const firstItem = items[0];
      const lastItems = items.slice(-(maxItems - 2));

      return [firstItem, 'collapsed' as const, ...lastItems];
    };

    const displayItems = getDisplayItems();
    const separatorElement = separator || <DefaultSeparator />;

    const classes = ['csk-breadcrumbs', className].filter(Boolean).join(' ');

    return (
      <nav ref={ref} className={classes} aria-label="Breadcrumb" {...props}>
        <ol className="csk-breadcrumbs__list">
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;

            if (item === 'collapsed') {
              return (
                <li key="collapsed" className="csk-breadcrumbs__item">
                  <span className="csk-breadcrumbs__collapsed">
                    {collapsedLabel}
                  </span>
                  {!isLast && separatorElement}
                </li>
              );
            }

            const content = (
              <>
                {item.icon && (
                  <span className="csk-breadcrumbs__icon">{item.icon}</span>
                )}
                <span className="csk-breadcrumbs__label">{item.label}</span>
              </>
            );

            return (
              <li key={item.id} className="csk-breadcrumbs__item">
                {item.href && !isLast ? (
                  linkRenderer(item, content)
                ) : (
                  <span
                    className="csk-breadcrumbs__current"
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {content}
                  </span>
                )}
                {!isLast && separatorElement}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';

export { ChevronIcon as BreadcrumbChevronIcon };
