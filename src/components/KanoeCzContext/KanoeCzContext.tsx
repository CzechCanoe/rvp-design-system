/**
 * KanoeCzContext - Mock of kanoe.cz layout for embed testing
 *
 * Simulates the Bootstrap 4 + Joomla environment of kanoe.cz
 * to test how design system components look when embedded.
 *
 * Based on audit: docs/research/kanoe-cz-audit.md
 */

import { type ReactNode, type CSSProperties } from 'react';
import './KanoeCzContext.css';

export interface KanoeCzContextProps {
  /** Content to embed within the kanoe.cz layout */
  children: ReactNode;
  /** Layout variant */
  layout?: 'full' | 'sidebar' | 'narrow';
  /** Show mock header */
  showHeader?: boolean;
  /** Show mock sidebar */
  showSidebar?: boolean;
  /** Container width (simulates Bootstrap container) */
  containerWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'fluid';
  /** Custom styles for the embed container */
  embedStyle?: CSSProperties;
  /** Page variant - affects breadcrumb and title */
  pageVariant?: 'homepage' | 'subpage' | 'detail';
  /** Page title for subpages */
  pageTitle?: string;
  /** Breadcrumb items */
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

/**
 * Kanoe.cz Logo SVG
 * Based on kanoe.cz branding - stylized paddle with wave
 */
const KanoeCzLogo = () => (
  <svg
    className="kanoe-logo-svg"
    width="140"
    height="32"
    viewBox="0 0 140 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Paddle icon */}
    <g className="kanoe-logo-icon">
      {/* Paddle blade */}
      <ellipse cx="12" cy="11" rx="8" ry="9" fill="currentColor" opacity="0.9" />
      {/* Paddle shaft */}
      <rect x="10" y="17" width="4" height="12" rx="2" fill="currentColor" />
      {/* Wave decoration */}
      <path
        d="M2 24c3-2 6 0 9-2s6 0 9-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </g>
    {/* Text: KANOE */}
    <text
      x="30"
      y="21"
      className="kanoe-logo-text"
      fill="currentColor"
      fontSize="18"
      fontWeight="700"
      fontFamily="system-ui, -apple-system, sans-serif"
      letterSpacing="1"
    >
      KANOE
    </text>
    {/* Text: .CZ */}
    <text
      x="98"
      y="21"
      className="kanoe-logo-domain"
      fill="currentColor"
      fontSize="18"
      fontWeight="400"
      fontFamily="system-ui, -apple-system, sans-serif"
      opacity="0.7"
    >
      .CZ
    </text>
  </svg>
);

export function KanoeCzContext({
  children,
  layout = 'full',
  showHeader = true,
  showSidebar = false,
  containerWidth = 'lg',
  embedStyle,
  pageVariant = 'subpage',
  pageTitle,
  breadcrumbs,
}: KanoeCzContextProps) {
  const containerClass = `kanoe-container kanoe-container--${containerWidth}`;

  // Default breadcrumbs based on page variant
  const defaultBreadcrumbs = breadcrumbs || [
    { label: 'Úvod', href: '#' },
    { label: 'Výsledky', href: '#' },
    { label: pageTitle || 'Aktuální stránka' },
  ];

  return (
    <div className={`kanoe-context kanoe-context--${pageVariant}`} data-mode="embed">
      {/* Mock Top Bar - mimics kanoe.cz info bar */}
      {showHeader && (
        <div className="kanoe-topbar">
          <div className={containerClass}>
            <div className="kanoe-topbar__inner">
              <span className="kanoe-topbar__text">Český svaz kanoistů</span>
              <div className="kanoe-topbar__links">
                <a href="#" className="kanoe-topbar__link">Kontakt</a>
                <a href="#" className="kanoe-topbar__link">O svazu</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mock Header */}
      {showHeader && (
        <header className="kanoe-header">
          <div className={containerClass}>
            <div className="kanoe-header__inner">
              <a href="#" className="kanoe-header__logo">
                <KanoeCzLogo />
              </a>
              <nav className="kanoe-header__nav">
                <a href="#" className="kanoe-nav-link">Sporty</a>
                <a href="#" className="kanoe-nav-link">Termínový kalendář</a>
                <a href="#" className="kanoe-nav-link">Registr</a>
                <a href="#" className="kanoe-nav-link kanoe-nav-link--active">Výsledky</a>
              </nav>
              <div className="kanoe-header__actions">
                <button className="kanoe-btn kanoe-btn--search" aria-label="Hledat">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </button>
                <a href="#" className="kanoe-btn kanoe-btn--primary">Přihlásit se</a>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Mock Breadcrumb - only on subpage/detail variants */}
      {pageVariant !== 'homepage' && (
        <div className="kanoe-breadcrumb">
          <div className={containerClass}>
            <nav aria-label="breadcrumb">
              <ol className="kanoe-breadcrumb__list">
                {defaultBreadcrumbs.map((item, index) => (
                  <li
                    key={index}
                    className={`kanoe-breadcrumb__item ${
                      index === defaultBreadcrumbs.length - 1 ? 'kanoe-breadcrumb__item--active' : ''
                    }`}
                  >
                    {item.href ? <a href={item.href}>{item.label}</a> : item.label}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      )}

      {/* Page Title - for subpage variant */}
      {pageVariant === 'subpage' && pageTitle && (
        <div className="kanoe-page-title">
          <div className={containerClass}>
            <h1 className="kanoe-page-title__heading">{pageTitle}</h1>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="kanoe-main">
        <div className={containerClass}>
          {layout === 'sidebar' || showSidebar ? (
            <div className="kanoe-row">
              <div className="kanoe-col kanoe-col--main">
                {/* CSK Component Embed Area */}
                <div
                  className="kanoe-embed csk-embed-widget"
                  style={embedStyle}
                >
                  {children}
                </div>
              </div>
              <aside className="kanoe-col kanoe-col--sidebar">
                <div className="kanoe-sidebar-widget">
                  <h3 className="kanoe-widget-title">Rychlé odkazy</h3>
                  <ul className="kanoe-widget-list">
                    <li><a href="#">Kalendář závodů</a></li>
                    <li><a href="#">Startovní listiny</a></li>
                    <li><a href="#">Výsledky</a></li>
                    <li><a href="#">Přihlášky</a></li>
                  </ul>
                </div>
                <div className="kanoe-sidebar-widget">
                  <h3 className="kanoe-widget-title">Sekce</h3>
                  <ul className="kanoe-widget-list">
                    <li><a href="#">Divoká voda</a></li>
                    <li><a href="#">Rychlostní kanoistika</a></li>
                    <li><a href="#">Vodní turistika</a></li>
                  </ul>
                </div>
              </aside>
            </div>
          ) : layout === 'narrow' ? (
            <div className="kanoe-row kanoe-row--centered">
              <div className="kanoe-col kanoe-col--narrow">
                {/* CSK Component Embed Area */}
                <div
                  className="kanoe-embed csk-embed-widget"
                  style={embedStyle}
                >
                  {children}
                </div>
              </div>
            </div>
          ) : (
            /* Full width layout */
            <div
              className="kanoe-embed csk-embed-widget"
              style={embedStyle}
            >
              {children}
            </div>
          )}
        </div>
      </main>

      {/* Mock Footer */}
      <footer className="kanoe-footer">
        <div className={containerClass}>
          <div className="kanoe-footer__inner">
            <div className="kanoe-footer__brand">
              <KanoeCzLogo />
              <p className="kanoe-footer__tagline">Oficiální web Českého svazu kanoistů</p>
            </div>
            <div className="kanoe-footer__links">
              <div className="kanoe-footer__column">
                <h4 className="kanoe-footer__heading">Sporty</h4>
                <ul>
                  <li><a href="#">Divoká voda</a></li>
                  <li><a href="#">Rychlostní kanoistika</a></li>
                  <li><a href="#">Vodní turistika</a></li>
                </ul>
              </div>
              <div className="kanoe-footer__column">
                <h4 className="kanoe-footer__heading">Rychlé odkazy</h4>
                <ul>
                  <li><a href="#">Kalendář</a></li>
                  <li><a href="#">Výsledky</a></li>
                  <li><a href="#">Registr</a></li>
                </ul>
              </div>
            </div>
            <div className="kanoe-footer__bottom">
              <p className="kanoe-footer__copyright">
                &copy; 2026 Český svaz kanoistů &mdash; Mock prostředí pro testování embed komponent
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default KanoeCzContext;
