import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import './EventHeader.css';

export interface EventHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Event name */
  title: ReactNode;
  /** Place · day · phase */
  subtitle?: ReactNode;
  /** Status element, typically `<StatusBadge state="live" />` */
  status?: ReactNode;
  /** Data age element, typically `<DataAge />` ("aktualizováno před 1 s") */
  dataAge?: ReactNode;
  /** Link back to the event list; omitted = no back link */
  backHref?: string;
  /** Text of the back link */
  backLabel?: string;
  /** Optional event logo (hidden when condensed) */
  logo?: ReactNode;
  /**
   * One-row variant for a scrolled page. The application decides when to switch
   * (scroll position); the component only draws it.
   */
  condensed?: boolean;
}

/**
 * Compact live header (about 95 px on a phone, one row when `condensed`).
 * Navy band; the title never wraps in the condensed state.
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
      className,
      ...props
    },
    ref
  ) => {
    const classes = ['csk-event-header', condensed && 'csk-event-header--condensed', className]
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
        {!condensed && (back || dataAge) && (
          <div className="csk-event-header__top">
            {back}
            {dataAge && <span className="csk-event-header__age">{dataAge}</span>}
          </div>
        )}

        <div className="csk-event-header__row">
          {condensed && back}
          {!condensed && logo && <div className="csk-event-header__logo">{logo}</div>}
          <div className="csk-event-header__text">
            <span className="csk-event-header__title">{title}</span>
            {!condensed && subtitle && (
              <span className="csk-event-header__subtitle">{subtitle}</span>
            )}
          </div>
          {status && <div className="csk-event-header__status">{status}</div>}
        </div>
      </header>
    );
  }
);

EventHeader.displayName = 'EventHeader';
