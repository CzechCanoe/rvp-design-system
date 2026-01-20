import {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useEffect,
  useId,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import './Navigation.css';

export interface NavItem {
  /** Unique identifier for the nav item */
  id: string;
  /** Label displayed for this nav item */
  label: ReactNode;
  /** URL for the nav link */
  href?: string;
  /** Optional icon to display before the label */
  icon?: ReactNode;
  /** Whether this item is currently active */
  active?: boolean;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Nested navigation items (dropdown) */
  children?: NavItem[];
}

export type MainNavVariant = 'horizontal' | 'vertical';
export type MainNavSize = 'sm' | 'md' | 'lg';
export type MainNavStyle = 'default' | 'gradient' | 'glass' | 'pills';

export interface MainNavProps extends HTMLAttributes<HTMLElement> {
  /** Array of navigation items */
  items: NavItem[];
  /** Navigation layout variant */
  variant?: MainNavVariant;
  /** Visual style variant */
  styleVariant?: MainNavStyle;
  /** Size of the navigation */
  size?: MainNavSize;
  /** Whether to show the mobile menu toggle */
  showMobileToggle?: boolean;
  /** Label for mobile menu toggle (accessibility) */
  mobileToggleLabel?: string;
  /** Callback when a nav item is clicked */
  onItemClick?: (item: NavItem) => void;
  /** Custom render function for links */
  renderLink?: (item: NavItem, children: ReactNode) => ReactNode;
  /** Logo or brand element to display */
  brand?: ReactNode;
  /** Additional actions (e.g., search, user menu) */
  actions?: ReactNode;
}

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronDownIcon = () => (
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
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/**
 * MainNav component for primary site navigation.
 *
 * Features:
 * - Horizontal and vertical variants
 * - Responsive with mobile menu toggle
 * - Dropdown submenus
 * - Keyboard navigation
 * - WCAG 2.1 AA compliant
 */
export const MainNav = forwardRef<HTMLElement, MainNavProps>(
  (
    {
      items,
      variant = 'horizontal',
      styleVariant = 'default',
      size = 'md',
      showMobileToggle = true,
      mobileToggleLabel = 'Toggle navigation menu',
      onItemClick,
      renderLink,
      brand,
      actions,
      className,
      ...props
    },
    ref
  ) => {
    const uniqueId = useId();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
    const navRef = useRef<HTMLElement>(null);

    // Default link renderer
    const defaultRenderLink = (item: NavItem, children: ReactNode) => (
      <a
        href={item.href}
        className="csk-mainnav__link"
        aria-current={item.active ? 'page' : undefined}
      >
        {children}
      </a>
    );

    const linkRenderer = renderLink || defaultRenderLink;

    // Toggle dropdown
    const toggleDropdown = useCallback((itemId: string) => {
      setOpenDropdowns((prev) => {
        const next = new Set(prev);
        if (next.has(itemId)) {
          next.delete(itemId);
        } else {
          next.add(itemId);
        }
        return next;
      });
    }, []);

    // Close dropdowns on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(event.target as Node)) {
          setOpenDropdowns(new Set());
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLElement>, item: NavItem) => {
        if (e.key === 'Escape') {
          setOpenDropdowns(new Set());
          return;
        }

        if (item.children && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          toggleDropdown(item.id);
        }
      },
      [toggleDropdown]
    );

    // Handle item click
    const handleItemClick = useCallback(
      (item: NavItem) => {
        if (item.disabled) return;
        onItemClick?.(item);
        // Close mobile menu on item click
        setMobileMenuOpen(false);
      },
      [onItemClick]
    );

    const classes = [
      'csk-mainnav',
      `csk-mainnav--${variant}`,
      `csk-mainnav--${size}`,
      styleVariant !== 'default' && `csk-mainnav--${styleVariant}`,
      mobileMenuOpen && 'csk-mainnav--mobile-open',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const menuId = `${uniqueId}-menu`;

    const renderNavItem = (item: NavItem) => {
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = openDropdowns.has(item.id);

      const itemClasses = [
        'csk-mainnav__item',
        item.active && 'csk-mainnav__item--active',
        item.disabled && 'csk-mainnav__item--disabled',
        hasChildren && 'csk-mainnav__item--has-children',
        isOpen && 'csk-mainnav__item--open',
      ]
        .filter(Boolean)
        .join(' ');

      const content = (
        <>
          {item.icon && <span className="csk-mainnav__icon">{item.icon}</span>}
          <span className="csk-mainnav__label">{item.label}</span>
          {hasChildren && (
            <span className="csk-mainnav__chevron">
              <ChevronDownIcon />
            </span>
          )}
        </>
      );

      return (
        <li key={item.id} className={itemClasses}>
          {hasChildren ? (
            <>
              <button
                type="button"
                className="csk-mainnav__link csk-mainnav__link--button"
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-disabled={item.disabled}
                onClick={() => toggleDropdown(item.id)}
                onKeyDown={(e) => handleKeyDown(e, item)}
                disabled={item.disabled}
              >
                {content}
              </button>
              <ul
                className="csk-mainnav__dropdown"
                role="menu"
                aria-hidden={!isOpen}
              >
                {item.children!.map((child) => renderNavItem(child))}
              </ul>
            </>
          ) : (
            <span onClick={() => handleItemClick(item)}>
              {linkRenderer(item, content)}
            </span>
          )}
        </li>
      );
    };

    return (
      <nav
        ref={(node) => {
          // Handle both refs
          (navRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={classes}
        aria-label="Main navigation"
        {...props}
      >
        <div className="csk-mainnav__container">
          {brand && <div className="csk-mainnav__brand">{brand}</div>}

          {showMobileToggle && (
            <button
              type="button"
              className="csk-mainnav__toggle"
              aria-expanded={mobileMenuOpen}
              aria-controls={menuId}
              aria-label={mobileToggleLabel}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          )}

          <div className="csk-mainnav__menu" id={menuId}>
            <ul className="csk-mainnav__list" role="menubar">
              {items.map((item) => renderNavItem(item))}
            </ul>

            {actions && <div className="csk-mainnav__actions">{actions}</div>}
          </div>
        </div>
      </nav>
    );
  }
);

MainNav.displayName = 'MainNav';
