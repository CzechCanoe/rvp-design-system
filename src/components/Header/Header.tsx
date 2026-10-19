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

/**
 * - `site`: kanoe.cz band (navy, 48 px), meant to be followed by a `Subbar`
 * - `satellite`: standalone app with a link back to kanoe.cz
 * - `app`: compact 44 px bar for the office (application name, club, user)
 */
export type HeaderVariant = 'site' | 'satellite' | 'app';
export type HeaderMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** Logo or brand element */
  brand?: ReactNode;
  /** Primary navigation element (links; `aria-current="page"` marks the active one) */
  navigation?: ReactNode;
  /** Search input or search trigger */
  search?: ReactNode;
  /** User menu or avatar */
  userMenu?: ReactNode;
  /** Additional actions (e.g., notifications, settings) */
  actions?: ReactNode;
  /** Visual variant */
  variant?: HeaderVariant;
  /** Whether header is sticky */
  sticky?: boolean;
  /** Whether to show mobile menu toggle (always off for `satellite`) */
  showMobileToggle?: boolean;
  /** Label for mobile toggle (accessibility) */
  mobileToggleLabel?: string;
  /** Callback when mobile menu state changes */
  onMobileMenuChange?: (isOpen: boolean) => void;
  /** Content for mobile menu drawer */
  mobileMenuContent?: ReactNode;
  /** Maximum width constraint of the content */
  maxWidth?: HeaderMaxWidth;
  /** Application name (`satellite` and `app`) */
  appName?: string;
  /** Club the user acts for (`app`), shown before the user menu */
  club?: ReactNode;
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
 * Variants:
 * - `site`: navy band of kanoe.cz (48 px), followed by a `Subbar`
 * - `satellite`: standalone application with a link back to kanoe.cz
 * - `app`: compact 44 px bar for the office (application, club, user)
 *
 * Navigation collapses into a drawer below 768 px (not for `satellite`).
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(
  (
    {
      brand,
      navigation,
      search,
      userMenu,
      actions,
      variant = 'site',
      sticky = false,
      showMobileToggle = true,
      mobileToggleLabel = 'Menu',
      onMobileMenuChange,
      mobileMenuContent,
      maxWidth = 'full',
      appName,
      club,
      homeLink = 'https://kanoe.cz',
      homeLinkLabel = 'Zpět na kanoe.cz',
      className,
      ...props
    },
    ref
  ) => {
    const isSatellite = variant === 'satellite';
    const isApp = variant === 'app';
    const shouldShowMobileToggle = isSatellite ? false : showMobileToggle;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    const toggleMobileMenu = useCallback(() => {
      const newState = !mobileMenuOpen;
      setMobileMenuOpen(newState);
      onMobileMenuChange?.(newState);
    }, [mobileMenuOpen, onMobileMenuChange]);

    const closeMobileMenu = useCallback(() => {
      setMobileMenuOpen(false);
      onMobileMenuChange?.(false);
    }, [onMobileMenuChange]);

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
      document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
      return () => {
        document.body.style.overflow = '';
      };
    }, [mobileMenuOpen]);

    const classes = [
      'csk-header',
      `csk-header--${variant}`,
      `csk-header--max-${maxWidth}`,
      sticky && 'csk-header--sticky',
      mobileMenuOpen && 'csk-header--mobile-open',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const navElement = navigation && (
      <nav className="csk-header__nav" aria-label="Hlavní navigace">
        {navigation}
      </nav>
    );

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

            {brand && <div className="csk-header__brand">{brand}</div>}

            {(isSatellite || isApp) && appName && (
              <div className="csk-header__app-name">
                <span className="csk-header__app-separator" aria-hidden="true">
                  {isApp ? '·' : '/'}
                </span>
                <span className="csk-header__app-title">{appName}</span>
              </div>
            )}

            {/* Satellite keeps the navigation next to the brand, others push it right */}
            {isSatellite && navElement}

            <div className="csk-header__spacer" />

            {!isSatellite && navElement}

            {search && <div className="csk-header__search">{search}</div>}

            {actions && <div className="csk-header__actions">{actions}</div>}

            {isApp && club && <div className="csk-header__club">{club}</div>}

            {userMenu && <div className="csk-header__user">{userMenu}</div>}

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

        {shouldShowMobileToggle && (
          <>
            <div
              className={`csk-header__backdrop ${mobileMenuOpen ? 'csk-header__backdrop--visible' : ''}`}
              aria-hidden="true"
              onClick={closeMobileMenu}
            />

            <div
              ref={mobileMenuRef}
              className={`csk-header__drawer ${mobileMenuOpen ? 'csk-header__drawer--open' : ''}`}
              role="dialog"
              aria-modal={mobileMenuOpen}
              aria-label="Menu"
              hidden={!mobileMenuOpen}
            >
              <div className="csk-header__drawer-content">
                {search && <div className="csk-header__drawer-search">{search}</div>}

                {(mobileMenuContent || navigation) && (
                  <nav className="csk-header__drawer-nav" aria-label="Mobilní navigace">
                    {mobileMenuContent || navigation}
                  </nav>
                )}

                {(actions || club || userMenu) && (
                  <div className="csk-header__drawer-footer">
                    {actions && <div className="csk-header__drawer-actions">{actions}</div>}
                    {club && <div className="csk-header__drawer-club">{club}</div>}
                    {userMenu && <div className="csk-header__drawer-user">{userMenu}</div>}
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
