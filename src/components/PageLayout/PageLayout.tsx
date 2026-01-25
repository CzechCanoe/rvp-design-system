import { type ReactNode, type HTMLAttributes } from 'react';
import './PageLayout.css';

export type PageLayoutVariant = 'standalone' | 'satellite' | 'embed';

export interface PageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Layout variant determines header/footer visibility */
  variant?: PageLayoutVariant;
  /** Optional header content (hidden in embed mode) */
  header?: ReactNode;
  /** Optional footer content (hidden in embed mode) */
  footer?: ReactNode;
  /** Main content */
  children: ReactNode;
  /** Maximum width of the content container */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Add padding to the main content area */
  padded?: boolean;
}

/**
 * PageLayout component provides consistent page structure across display modes.
 *
 * Variants:
 * - standalone: Full header with navigation, search, user menu + footer
 * - satellite: Minimal header with logo + footer, for standalone apps
 * - embed: No header/footer, content only for embedding in kanoe.cz
 */
export function PageLayout({
  variant = 'standalone',
  header,
  footer,
  children,
  maxWidth = 'xl',
  padded = true,
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
        <header className="csk-page-layout__header">{header}</header>
      )}

      <main className="csk-page-layout__main">
        <div className="csk-page-layout__container">{children}</div>
      </main>

      {!isEmbed && footer && (
        <footer className="csk-page-layout__footer">{footer}</footer>
      )}
    </div>
  );
}

PageLayout.displayName = 'PageLayout';
