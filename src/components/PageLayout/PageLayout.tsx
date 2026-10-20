import { type ReactNode, type HTMLAttributes } from 'react';
import './PageLayout.css';

/**
 * - `tribuna`: white page for the public parts (calendar, results, live)
 * - `urad`: grey working surface for registration and the register
 * - `embed`: content only, no header, banner, bottom bar or footer (kanoe.cz)
 */
export type PageLayoutVariant = 'tribuna' | 'urad' | 'embed';

/**
 * Content width: `sm` 640, `md` 768, `lg` 1024, `xl` `--csk-layout-max-width` (1200), `full` none.
 * The value is exposed as the CSS variable `--csk-page-max-width`, so a full-width band in `header`
 * or `banner` (EventHeader) aligns its content with the page container.
 */
export type PageLayoutMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface PageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Layout variant determines the surface and which slots render */
  variant?: PageLayoutVariant;
  /** Header area, e.g. `<Header />` followed by `<Subbar />` (hidden in embed) */
  header?: ReactNode;
  /** Full-width band between header and content, e.g. `<PageTitle variant="bar" />` (hidden in embed) */
  banner?: ReactNode;
  /** Phone navigation after the content, e.g. `<BottomBar />` (hidden in embed) */
  bottomBar?: ReactNode;
  /** Footer content (hidden in embed) */
  footer?: ReactNode;
  /** Main content */
  children: ReactNode;
  /** Maximum width of the content container (exposed as `--csk-page-max-width`) */
  maxWidth?: PageLayoutMaxWidth;
  /**
   * Add side padding to the main content area: the token `--csk-layout-gutter` (16 px phone, 24 px from 768 px),
   * the same gutter as `EventHeader`, so header and page content start at the same x.
   */
  padded?: boolean;
  /** Keep the header area at the top while scrolling */
  stickyHeader?: boolean;
}

/**
 * PageLayout provides the page structure: header area, optional banner,
 * centered content and footer.
 */
export function PageLayout({
  variant = 'tribuna',
  header,
  banner,
  bottomBar,
  footer,
  children,
  maxWidth = 'xl',
  padded = true,
  stickyHeader = true,
  className,
  ...props
}: PageLayoutProps) {
  const classes = [
    'csk-page-layout',
    `csk-page-layout--${variant}`,
    `csk-page-layout--max-${maxWidth}`,
    padded && 'csk-page-layout--padded',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const isEmbed = variant === 'embed';

  return (
    <div className={classes} {...props}>
      {!isEmbed && header && (
        <div
          className={`csk-page-layout__header${stickyHeader ? ' csk-page-layout__header--sticky' : ''}`}
        >
          {header}
        </div>
      )}

      {!isEmbed && banner && <div className="csk-page-layout__banner">{banner}</div>}

      <main className="csk-page-layout__main">
        <div className="csk-page-layout__container">{children}</div>
      </main>

      {!isEmbed && bottomBar}

      {!isEmbed && footer && <footer className="csk-page-layout__footer">{footer}</footer>}
    </div>
  );
}

PageLayout.displayName = 'PageLayout';
