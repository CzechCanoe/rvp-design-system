import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import './PageTitle.css';

export type PageTitleSize = 'md' | 'lg';
export type PageTitleVariant = 'plain' | 'bar';

export interface PageTitleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The heading text */
  title: ReactNode;
  /** Heading element (default `h1`) */
  as?: 'h1' | 'h2';
  /** `lg` 36 px (event, profile), `md` 24 px (office) */
  size?: PageTitleSize;
  /** `plain` sits inside the page content, `bar` is a full-width white band with a bottom rule */
  variant?: PageTitleVariant;
  /** Breadcrumbs shown above the title */
  breadcrumbs?: ReactNode;
  /** Square logo or avatar in front of the text block */
  logo?: ReactNode;
  /** Badge row above the title (section, level, live, data age) */
  badges?: ReactNode;
  /** Inline content before the title (e.g. section badges in the office) */
  titleBefore?: ReactNode;
  /** Inline content after the title (e.g. status badge) */
  titleAfter?: ReactNode;
  /** Meta row below the title (date, place, organiser, entries) */
  meta?: ReactNode;
  /** Secondary information on the right (e.g. deadline) */
  aside?: ReactNode;
  /** Actions on the right (buttons) */
  actions?: ReactNode;
}

/**
 * Page heading with meta row and actions on the right. Replaces HeroSection.
 */
export const PageTitle = forwardRef<HTMLDivElement, PageTitleProps>(
  (
    {
      title,
      as: Heading = 'h1',
      size = 'lg',
      variant = 'plain',
      breadcrumbs,
      logo,
      badges,
      titleBefore,
      titleAfter,
      meta,
      aside,
      actions,
      className,
      ...props
    },
    ref
  ) => {
    const classes = [
      'csk-page-title',
      `csk-page-title--${size}`,
      `csk-page-title--${variant}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="csk-page-title__inner">
          {logo && (
            <div className="csk-page-title__logo" aria-hidden="true">
              {logo}
            </div>
          )}

          <div className="csk-page-title__main">
            {breadcrumbs && <div className="csk-page-title__breadcrumbs">{breadcrumbs}</div>}
            {badges && <div className="csk-page-title__badges">{badges}</div>}
            <div className="csk-page-title__heading">
              {titleBefore}
              <Heading className="csk-page-title__title">{title}</Heading>
              {titleAfter}
            </div>
            {meta && <div className="csk-page-title__meta">{meta}</div>}
          </div>

          {(aside || actions) && (
            <div className="csk-page-title__side">
              {aside && <div className="csk-page-title__aside">{aside}</div>}
              {actions && <div className="csk-page-title__actions">{actions}</div>}
            </div>
          )}
        </div>
      </div>
    );
  }
);

PageTitle.displayName = 'PageTitle';
