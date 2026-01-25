import {
  forwardRef,
  useMemo,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import type { CalendarEvent } from './Calendar';
import './CalendarCards.css';

export type CalendarCardsStyleVariant = 'default' | 'embed';

export interface CalendarCardsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Events to display in month cards */
  events: CalendarEvent[];
  /** Style variant for visual appearance */
  styleVariant?: CalendarCardsStyleVariant;
  /** Maximum months to display */
  maxMonths?: number;
  /** Maximum events per month card (shows "+N more") */
  maxEventsPerMonth?: number;
  /** Callback when an event is clicked */
  onEventClick?: (event: CalendarEvent) => void;
  /** Callback when "more" link is clicked for a month */
  onMonthClick?: (year: number, month: number) => void;
  /** Custom render function for events */
  renderEvent?: (event: CalendarEvent) => ReactNode;
  /** Locale for date formatting (default: 'cs-CZ') */
  locale?: string;
  /** Show section badges on events */
  showSection?: boolean;
  /** Start from current month (true) or from first event (false) */
  startFromCurrentMonth?: boolean;
  /** Empty state message */
  emptyMessage?: ReactNode;
  /** Title for the component */
  title?: string;
}

interface MonthCard {
  year: number;
  month: number;
  label: string;
  events: CalendarEvent[];
}

/**
 * Get month label for display
 */
function getMonthLabel(year: number, month: number, locale: string): string {
  const date = new Date(year, month, 1);
  return date.toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Format event date for display within a month card
 */
function formatEventDate(event: CalendarEvent, locale: string): string {
  const startDay = event.start.getDate();

  if (!event.end) {
    return `${startDay}.`;
  }

  const endDay = event.end.getDate();
  const startMonth = event.start.getMonth();
  const endMonth = event.end.getMonth();

  // Same day
  if (startDay === endDay && startMonth === endMonth) {
    return `${startDay}.`;
  }

  // Same month
  if (startMonth === endMonth) {
    return `${startDay}.–${endDay}.`;
  }

  // Different months - show abbreviated month for end
  const endStr = event.end.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
  });
  return `${startDay}.–${endStr}`;
}

/**
 * CalendarCards component - displays events grouped into month cards.
 *
 * Visual card-based view showing multiple months at once.
 * Good for overview pages and dashboards.
 */
export const CalendarCards = forwardRef<HTMLDivElement, CalendarCardsProps>(
  (
    {
      events,
      styleVariant = 'default',
      maxMonths = 3,
      maxEventsPerMonth = 4,
      onEventClick,
      onMonthClick,
      renderEvent,
      locale = 'cs-CZ',
      showSection = true,
      startFromCurrentMonth = true,
      emptyMessage = 'Žádné nadcházející události',
      title,
      className,
      ...props
    },
    ref
  ) => {
    // Group events into month cards
    const monthCards = useMemo((): MonthCard[] => {
      if (events.length === 0) {
        return [];
      }

      // Sort events by start date
      const sortedEvents = [...events].sort(
        (a, b) => a.start.getTime() - b.start.getTime()
      );

      // Determine start month
      const now = new Date();
      let startYear: number;
      let startMonth: number;

      if (startFromCurrentMonth) {
        startYear = now.getFullYear();
        startMonth = now.getMonth();
      } else {
        startYear = sortedEvents[0].start.getFullYear();
        startMonth = sortedEvents[0].start.getMonth();
      }

      // Group events by month
      const monthMap: Map<string, CalendarEvent[]> = new Map();

      for (const event of sortedEvents) {
        const eventYear = event.start.getFullYear();
        const eventMonth = event.start.getMonth();
        const key = `${eventYear}-${eventMonth}`;

        // Only include months from start month onwards
        if (
          eventYear < startYear ||
          (eventYear === startYear && eventMonth < startMonth)
        ) {
          continue;
        }

        if (!monthMap.has(key)) {
          monthMap.set(key, []);
        }
        monthMap.get(key)!.push(event);
      }

      // Convert to array and limit months
      const cards: MonthCard[] = [];

      // Generate month sequence starting from start month
      for (let i = 0; i < maxMonths; i++) {
        let y = startYear;
        let m = startMonth + i;

        // Handle year rollover
        while (m > 11) {
          m -= 12;
          y += 1;
        }

        const key = `${y}-${m}`;
        const monthEvents = monthMap.get(key) || [];

        cards.push({
          year: y,
          month: m,
          label: getMonthLabel(y, m, locale),
          events: monthEvents,
        });
      }

      return cards;
    }, [events, maxMonths, locale, startFromCurrentMonth]);

    // Get section color class
    const getSectionClass = (event: CalendarEvent): string => {
      if (event.section) {
        return `csk-calendar-cards__event--section-${event.section}`;
      }
      if (event.variant) {
        return `csk-calendar-cards__event--${event.variant}`;
      }
      return '';
    };

    // Render a single event
    const renderEventItem = (event: CalendarEvent): ReactNode => {
      if (renderEvent) {
        return renderEvent(event);
      }

      return (
        <>
          <span className="csk-calendar-cards__event-date">
            {formatEventDate(event, locale)}
          </span>
          <span className="csk-calendar-cards__event-title">{event.title}</span>
          {showSection && event.section && (
            <span
              className={`csk-calendar-cards__event-badge csk-calendar-cards__event-badge--${event.section}`}
            >
              {event.section.toUpperCase()}
            </span>
          )}
        </>
      );
    };

    const classes = [
      'csk-calendar-cards',
      `csk-calendar-cards--style-${styleVariant}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const hasAnyEvents = monthCards.some((card) => card.events.length > 0);

    return (
      <div ref={ref} className={classes} {...props}>
        {title && (
          <h3 className="csk-calendar-cards__title">{title}</h3>
        )}

        {!hasAnyEvents ? (
          <div className="csk-calendar-cards__empty">{emptyMessage}</div>
        ) : (
          <div className="csk-calendar-cards__grid">
            {monthCards.map((card) => {
              const visibleEvents = card.events.slice(0, maxEventsPerMonth);
              const hiddenCount = card.events.length - maxEventsPerMonth;

              return (
                <div key={`${card.year}-${card.month}`} className="csk-calendar-cards__card">
                  <div className="csk-calendar-cards__card-header">
                    <span className="csk-calendar-cards__month-name">
                      {card.label}
                    </span>
                    <span className="csk-calendar-cards__event-count">
                      {card.events.length > 0
                        ? `${card.events.length} ${
                            card.events.length === 1 ? 'akce' :
                            card.events.length < 5 ? 'akce' : 'akcí'
                          }`
                        : 'žádné akce'}
                    </span>
                  </div>

                  <div className="csk-calendar-cards__card-content">
                    {card.events.length === 0 ? (
                      <div className="csk-calendar-cards__card-empty">
                        Žádné naplánované akce
                      </div>
                    ) : (
                      <ul className="csk-calendar-cards__events" role="list">
                        {visibleEvents.map((event) => (
                          <li key={event.id} className="csk-calendar-cards__event-item">
                            <button
                              type="button"
                              className={[
                                'csk-calendar-cards__event',
                                getSectionClass(event),
                                onEventClick && 'csk-calendar-cards__event--clickable',
                              ]
                                .filter(Boolean)
                                .join(' ')}
                              onClick={() => onEventClick?.(event)}
                              disabled={!onEventClick}
                            >
                              {renderEventItem(event)}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                    {hiddenCount > 0 && (
                      <button
                        type="button"
                        className="csk-calendar-cards__more"
                        onClick={() => onMonthClick?.(card.year, card.month)}
                      >
                        +{hiddenCount} {hiddenCount === 1 ? 'další' : 'dalších'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

CalendarCards.displayName = 'CalendarCards';
