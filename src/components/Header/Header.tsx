import {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useEffect,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import './Header.css';

export type HeaderSize = 'sm' | 'md' | 'lg';
export type HeaderVariant = 'default' | 'transparent' | 'elevated' | 'gradient' | 'glass' | 'satellite';

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** Logo or brand element */
  brand?: ReactNode;
  /** Primary navigation element (e.g., MainNav items inline) */
  navigation?: ReactNode;
  /** Search input or search trigger */
  search?: ReactNode;
  /** User menu or avatar */
  userMenu?: ReactNode;
  /** Additional actions (e.g., notifications, settings) */
  actions?: ReactNode;
  /** Size of the header */
  size?: HeaderSize;
  /** Visual variant */
  variant?: HeaderVariant;
  /** Whether header is sticky */
  sticky?: boolean;
  /** Whether to show mobile menu toggle */
  showMobileToggle?: boolean;
  /** Label for mobile toggle (accessibility) */
  mobileToggleLabel?: string;
  /** Callback when mobile menu state changes */
  onMobileMenuChange?: (isOpen: boolean) => void;
  /** Content for mobile menu drawer */
  mobileMenuContent?: ReactNode;
  /** Whether to show border at the bottom */
  bordered?: boolean;
  /** Maximum width constraint */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Enable blur effect when scrolled (for sticky headers) */
  blurOnScroll?: boolean;
  /** Scroll threshold in pixels before blur effect activates */
  scrollThreshold?: number;
  /** Application name for satellite variant */
  appName?: string;
  /** Link to main website for satellite variant (e.g., kanoe.cz) */
  homeLink?: string;
  /** Label for home link */
  homeLinkLabel?: string;
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

const HomeIcon = () => (
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
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

/**
 * Header component for application headers.
 *
 * Features:
 * - Responsive with mobile menu toggle
 * - Multiple visual variants (default, transparent, elevated)
 * - Sticky positioning support
 * - Flexible slots for brand, navigation, search, user menu, and actions
 * - Mobile drawer menu
 * - WCAG 2.1 AA compliant
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(
  (
    {
      brand,
      navigation,
      search,
      userMenu,
      actions,
      size = 'md',
      variant = 'default',
      sticky = false,
      showMobileToggle = true,
      mobileToggleLabel = 'Toggle menu',
      onMobileMenuChange,
      mobileMenuContent,
      bordered = true,
      maxWidth = 'xl',
      blurOnScroll = false,
      scrollThreshold = 10,
      appName,
      homeLink = 'https://kanoe.cz',
      homeLinkLabel = 'Zpět na kanoe.cz',
      className,
      ...props
    },
    ref
  ) => {
    // Satellite variant disables mobile toggle by default
    const isSatellite = variant === 'satellite';
    const shouldShowMobileToggle = isSatellite ? false : showMobileToggle;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // Handle scroll for blur effect
    useEffect(() => {
      if (!blurOnScroll || !sticky) return;

      const handleScroll = () => {
        const scrollY = window.scrollY;
        setIsScrolled(scrollY > scrollThreshold);
      };

      // Check initial scroll position
      handleScroll();

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, [blurOnScroll, sticky, scrollThreshold]);

    // Toggle mobile menu
    const toggleMobileMenu = useCallback(() => {
      const newState = !mobileMenuOpen;
      setMobileMenuOpen(newState);
      onMobileMenuChange?.(newState);
    }, [mobileMenuOpen, onMobileMenuChange]);

    // Close mobile menu
    const closeMobileMenu = useCallback(() => {
      setMobileMenuOpen(false);
      onMobileMenuChange?.(false);
    }, [onMobileMenuChange]);

    // Handle escape key
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Escape' && mobileMenuOpen) {
          closeMobileMenu();
        }
      },
      [mobileMenuOpen, closeMobileMenu]
    );

    // Close on outside click
    useEffect(() => {
      if (!mobileMenuOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          headerRef.current &&
          !headerRef.current.contains(event.target as Node) &&
          mobileMenuRef.current &&
          !mobileMenuRef.current.contains(event.target as Node)
        ) {
          closeMobileMenu();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [mobileMenuOpen, closeMobileMenu]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
      if (mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [mobileMenuOpen]);

    const classes = [
      'csk-header',
      `csk-header--${size}`,
      `csk-header--${variant}`,
      `csk-header--max-${maxWidth}`,
      sticky && 'csk-header--sticky',
      bordered && 'csk-header--bordered',
      mobileMenuOpen && 'csk-header--mobile-open',
      isScrolled && 'csk-header--scrolled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <>
        <header
          ref={(node) => {
            (headerRef as React.MutableRefObject<HTMLElement | null>).current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className={classes}
          onKeyDown={handleKeyDown}
          {...props}
        >
          <div className="csk-header__container">
            {/* Satellite: Home link */}
            {isSatellite && homeLink && (
              <a
                href={homeLink}
                className="csk-header__home-link"
                aria-label={homeLinkLabel}
              >
                <HomeIcon />
                <span className="csk-header__home-link-text">{homeLinkLabel}</span>
              </a>
            )}

            {/* Brand / Logo */}
            {brand && <div className="csk-header__brand">{brand}</div>}

            {/* Satellite: App name */}
            {isSatellite && appName && (
              <div className="csk-header__app-name">
                <span className="csk-header__app-separator" aria-hidden="true">/</span>
                <span className="csk-header__app-title">{appName}</span>
              </div>
            )}

            {/* Desktop navigation */}
            {navigation && (
              <nav className="csk-header__nav" aria-label="Main navigation">
                {navigation}
              </nav>
            )}

            {/* Spacer */}
            <div className="csk-header__spacer" />

            {/* Search */}
            {search && <div className="csk-header__search">{search}</div>}

            {/* Actions */}
            {actions && <div className="csk-header__actions">{actions}</div>}

            {/* User menu */}
            {userMenu && <div className="csk-header__user">{userMenu}</div>}

            {/* Mobile toggle */}
            {shouldShowMobileToggle && (
              <button
                type="button"
                className="csk-header__toggle"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileToggleLabel}
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            )}
          </div>
        </header>

        {/* Mobile menu drawer */}
        {shouldShowMobileToggle && (
          <>
            {/* Backdrop */}
            <div
              className={`csk-header__backdrop ${mobileMenuOpen ? 'csk-header__backdrop--visible' : ''}`}
              aria-hidden="true"
              onClick={closeMobileMenu}
            />

            {/* Drawer */}
            <div
              ref={mobileMenuRef}
              className={`csk-header__drawer ${mobileMenuOpen ? 'csk-header__drawer--open' : ''}`}
              role="dialog"
              aria-modal={mobileMenuOpen}
              aria-label="Mobile menu"
            >
              <div className="csk-header__drawer-content">
                {/* Mobile search */}
                {search && (
                  <div className="csk-header__drawer-search">{search}</div>
                )}

                {/* Mobile navigation */}
                {(mobileMenuContent || navigation) && (
                  <nav
                    className="csk-header__drawer-nav"
                    aria-label="Mobile navigation"
                  >
                    {mobileMenuContent || navigation}
                  </nav>
                )}

                {/* Mobile actions */}
                {(actions || userMenu) && (
                  <div className="csk-header__drawer-footer">
                    {actions && (
                      <div className="csk-header__drawer-actions">{actions}</div>
                    )}
                    {userMenu && (
                      <div className="csk-header__drawer-user">{userMenu}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </>
    );
  }
);

Header.displayName = 'Header';
