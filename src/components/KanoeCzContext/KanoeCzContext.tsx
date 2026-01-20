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
}

export function KanoeCzContext({
  children,
  layout = 'full',
  showHeader = true,
  showSidebar = false,
  containerWidth = 'lg',
  embedStyle,
}: KanoeCzContextProps) {
  const containerClass = `kanoe-container kanoe-container--${containerWidth}`;

  return (
    <div className="kanoe-context" data-mode="embed">
      {/* Mock Header */}
      {showHeader && (
        <header className="kanoe-header">
          <div className={containerClass}>
            <div className="kanoe-header__inner">
              <div className="kanoe-header__logo">
                <div className="kanoe-logo-placeholder">KANOE.CZ</div>
              </div>
              <nav className="kanoe-header__nav">
                <a href="#" className="kanoe-nav-link">Sporty</a>
                <a href="#" className="kanoe-nav-link">Termínový kalendář</a>
                <a href="#" className="kanoe-nav-link">Registr</a>
                <a href="#" className="kanoe-nav-link kanoe-nav-link--active">Výsledky</a>
              </nav>
              <div className="kanoe-header__actions">
                <a href="#" className="kanoe-btn kanoe-btn--outline">Přihlásit se</a>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Mock Breadcrumb */}
      <div className="kanoe-breadcrumb">
        <div className={containerClass}>
          <nav aria-label="breadcrumb">
            <ol className="kanoe-breadcrumb__list">
              <li className="kanoe-breadcrumb__item">
                <a href="#">Úvod</a>
              </li>
              <li className="kanoe-breadcrumb__item">
                <a href="#">Výsledky</a>
              </li>
              <li className="kanoe-breadcrumb__item kanoe-breadcrumb__item--active">
                Aktuální stránka
              </li>
            </ol>
          </nav>
        </div>
      </div>

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
                  <h3 className="kanoe-widget-title">Novinky</h3>
                  <p className="kanoe-widget-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
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
            <p className="kanoe-footer__text">
              &copy; 2024 Český svaz kanoistů &mdash; Mock prostředí pro testování embed komponent
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default KanoeCzContext;
