import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import type { PageLayoutMaxWidth } from '../PageLayout';
import { DataAgeVariantContext } from '../DataAge/DataAgeVariantContext';
import './EventHeader.css';

export interface EventHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Event name */
  title: ReactNode;
  /** Place · day · phase (hidden when condensed) */
  subtitle?: ReactNode;
  /** Status element, typically `<StatusBadge state="live" />` */
  status?: ReactNode;
  /**
   * Data age element, typically `<DataAge />` ("aktualizováno před 1 s"). When `condensed`, a `DataAge` without its own
   * `variant` renders the compact form (dot + "před 1 s", full text in `title` and for screen readers).
   * The slot has `data-tone="on-dark"`, so the connection dot is lightened for the navy band.
   */
  dataAge?: ReactNode;
  /** Link back to the event list; omitted = no back link */
  backHref?: string;
  /** Text of the back link */
  backLabel?: string;
  /**
   * Optional event logo (hidden when condensed), typically `<Avatar shape="square" />` (40 × 40)
   * or `<Avatar shape="portrait" />` for an upright poster (40 × 56, 5 : 7). The slot follows the shape.
   */
  logo?: ReactNode;
  /**
   * One-row variant for a scrolled page: back · name · status · data age; the subtitle and
   * the logo are hidden, `DataAge` in the `dataAge` slot switches to `variant="compact"`.
   * The application decides when to switch (scroll position); the component only draws it.
   */
  condensed?: boolean;
  /**
   * Width of the content inside the full-width navy band, on the scale of `PageLayout maxWidth`.
   * Default: the content width of the surrounding `PageLayout` (CSS variable `--csk-page-max-width`),
   * outside a PageLayout `--csk-layout-max-width` (1200 px, as PageTitle). Inner gutter: the token `--csk-layout-gutter`
   * (16 px phone, 24 px from 768 px), the same as the padded PageLayout container, so header and page content line up.
   */
  maxWidth?: PageLayoutMaxWidth;
}

/**
 * Compact live header (about 95 px on a phone, one row when `condensed`).
 * Navy band over the full width; the content is aligned with the page container.
 * The title never wraps in the condensed state.
 */
export const EventHeader = forwardRef<HTMLElement, EventHeaderProps>(
  (
    {
      title,
      subtitle,
      status,
      dataAge,
      backHref,
      backLabel = 'Závody',
      logo,
      condensed = false,
      maxWidth,
      className,
      ...props
    },
    ref
  ) => {
    const classes = [
      'csk-event-header',
      condensed && 'csk-event-header--condensed',
      maxWidth && `csk-event-header--max-${maxWidth}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const back = backHref && (
      <a href={backHref} className="csk-event-header__back">
        <span aria-hidden="true">‹</span>
        {condensed ? <span className="csk-event-header__sr">{backLabel}</span> : <span>{backLabel}</span>}
      </a>
    );

    return (
      <header ref={ref} className={classes} {...props}>
        <div className="csk-event-header__inner">
          {!condensed && (back || dataAge) && (
            <div className="csk-event-header__top">
              {back}
              {dataAge && (
                <span className="csk-event-header__age" data-tone="on-dark">
                  {dataAge}
                </span>
              )}
            </div>
          )}

          <div className="csk-event-header__row">
            {condensed && back}
            {!condensed && logo && <div className="csk-event-header__logo">{logo}</div>}
            <div className="csk-event-header__text">
              <span className="csk-event-header__title">{title}</span>
              {!condensed && subtitle && <span className="csk-event-header__subtitle">{subtitle}</span>}
            </div>
            {status && (
              <div className="csk-event-header__status" data-tone="on-dark">
                {status}
              </div>
            )}
            {condensed && dataAge && (
              <span className="csk-event-header__age" data-tone="on-dark">
                <DataAgeVariantContext.Provider value="compact">{dataAge}</DataAgeVariantContext.Provider>
              </span>
            )}
          </div>
        </div>
      </header>
    );
  }
);

EventHeader.displayName = 'EventHeader';
