import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Badge, type BadgeSection } from '../Badge';
import { DeadlineBadge, type DeadlineBadgeProps } from '../DeadlineBadge';
import { Icon } from '../Icon';
import './WeekendCalendar.css';

export interface CalendarEventDocument {
  label: ReactNode;
  href: string;
}

export interface CalendarEventRow {
  /** Stable key */
  id: string;
  /** Section badge (DV / RY / VT) */
  section: BadgeSection;
  /** Level of the race: ČP, MČR, NKZ, Veřejný, Zahraničí ... */
  level?: ReactNode;
  title: ReactNode;
  /** Link of the title (event detail) */
  href?: string;
  /** Followed by the user (star after the title) */
  favorite?: boolean;
  /** Place, organiser, days and other facts, joined with " · " under the title */
  details?: ReactNode[];
  /** Entry state; rendered with `DeadlineBadge` */
  deadline?: DeadlineBadgeProps;
  /** Plain text instead of a deadline ("Přihláška u pořadatele", "Nominace RDA") */
  entryNote?: ReactNode;
  /** Links: propozice, startovky, pozvánka ... */
  documents?: CalendarEventDocument[];
  /** Text or element under / instead of the documents ("Propozice chybí" Badge + hint) */
  documentsNote?: ReactNode;
  /** Last column: results / live / start time badge or an entry button */
  status?: ReactNode;
}

export interface CalendarGroup {
  /** Stable key (defaults to `dates`) */
  id?: string;
  /** `weekend` is a framed block with its own label column, `weekday` a thin dashed row between weekends */
  kind?: 'weekend' | 'weekday';
  /** Small caps label of a weekend ("Víkend", "Tento víkend") */
  label?: ReactNode;
  /** Dates: "9.–10. 5." for a weekend, "St 13. 5." for a weekday */
  dates: ReactNode;
  /** Days under the dates ("so, ne", "mimo víkend") */
  note?: ReactNode;
  /** The highlighted (current) weekend */
  current?: boolean;
  events: CalendarEventRow[];
}

export interface WeekendCalendarProps extends Omit<HTMLAttributes<HTMLOListElement>, 'children'> {
  /** Weekends in order, weekday items between them */
  weekends: CalendarGroup[];
}

const SECTION_LABELS: Record<BadgeSection, string> = { dv: 'DV', ry: 'RY', vt: 'VT' };

function EventRow({ event }: { event: CalendarEventRow }) {
  const details = (event.details ?? []).filter(Boolean);
  const title = event.href ? (
    <a className="csk-weekend-calendar__title-link" href={event.href}>
      {event.title}
    </a>
  ) : (
    event.title
  );
  return (
    <li className="csk-weekend-calendar__event">
      <div className="csk-weekend-calendar__main">
        <div className="csk-weekend-calendar__heading">
          <Badge section={event.section}>{SECTION_LABELS[event.section]}</Badge>
          {event.level && <Badge variant="level">{event.level}</Badge>}
          <span className="csk-weekend-calendar__title">{title}</span>
          {event.favorite && (
            <span className="csk-weekend-calendar__star">
              <Icon name="star" size="sm" filled aria-hidden />
              <span className="csk-weekend-calendar__sr">Sledovaný závod</span>
            </span>
          )}
        </div>
        {details.length > 0 && (
          <span className="csk-weekend-calendar__details">
            {details.map((d, i) => (
              <span key={i}>
                {i > 0 && ' · '}
                {d}
              </span>
            ))}
          </span>
        )}
      </div>
      <div className="csk-weekend-calendar__cell" data-empty={!event.deadline && !event.entryNote}>
        {event.deadline ? (
          <DeadlineBadge {...event.deadline} />
        ) : (
          event.entryNote && <span className="csk-weekend-calendar__muted">{event.entryNote}</span>
        )}
      </div>
      <div className="csk-weekend-calendar__cell" data-empty={!event.documents?.length && !event.documentsNote}>
        {event.documents && event.documents.length > 0 && (
          <span>
            {event.documents.map((doc, i) => (
              <span key={doc.href + i}>
                {i > 0 && ' · '}
                <a className="csk-weekend-calendar__link" href={doc.href}>
                  {doc.label}
                </a>
              </span>
            ))}
          </span>
        )}
        {event.documentsNote}
      </div>
      <div className="csk-weekend-calendar__cell csk-weekend-calendar__cell--status" data-empty={!event.status}>
        {event.status}
      </div>
    </li>
  );
}

/**
 * Season calendar by weekends (reference Kalendar): every weekend is a block with the dates on the
 * left and the races on the right, weekday races sit between them as thin dashed rows. The current
 * weekend is highlighted (`current`, the application decides which one; the component never reads
 * the time). Under 720 px of its own width (container query) the dates become a band above the rows
 * and the columns of a race wrap under its title.
 */
export const WeekendCalendar = forwardRef<HTMLOListElement, WeekendCalendarProps>(
  ({ weekends, className, ...props }, ref) => (
    <ol
      ref={ref}
      className={['csk-weekend-calendar', className].filter(Boolean).join(' ')}
      {...props}
    >
      {weekends.map((group) => {
        const kind = group.kind ?? 'weekend';
        const classes = [
          'csk-weekend-calendar__group',
          `csk-weekend-calendar__group--${kind}`,
          group.current && 'csk-weekend-calendar__group--current',
        ]
          .filter(Boolean)
          .join(' ');
        return (
          <li key={group.id ?? String(group.dates)} className={classes} aria-current={group.current ? 'date' : undefined}>
            <div className="csk-weekend-calendar__when">
              {kind === 'weekend' && group.label && <span className="csk-weekend-calendar__label">{group.label}</span>}
              <span className="csk-weekend-calendar__dates">{group.dates}</span>
              {group.note && <span className="csk-weekend-calendar__note">{group.note}</span>}
            </div>
            <ul className="csk-weekend-calendar__events">
              {group.events.map((event) => (
                <EventRow key={event.id} event={event} />
              ))}
            </ul>
          </li>
        );
      })}
    </ol>
  )
);

WeekendCalendar.displayName = 'WeekendCalendar';
