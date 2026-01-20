import {
  forwardRef,
  useMemo,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import type { CalendarEvent } from './Calendar';
import './CalendarList.css';

export type CalendarListVariant = 'default' | 'compact';
export type CalendarListStyleVariant = 'default' | 'gradient' | 'embed';
export type CalendarListGrouping = 'none' | 'day' | 'month';

export interface CalendarListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Events to display in the list */
  events: CalendarEvent[];
  /** Visual variant */
  variant?: CalendarListVariant;
  /** Style variant for visual appearance */
  styleVariant?: CalendarListStyleVariant;
  /** Group events by day/month */
  groupBy?: CalendarListGrouping;
  /** Maximum number of events to show (for pagination) */
  maxEvents?: number;
  /** Callback when an event is clicked */
  onEventClick?: (event: CalendarEvent) => void;
  /** Custom render function for events */
  renderEvent?: (event: CalendarEvent) => ReactNode;
  /** Locale for date formatting (default: 'cs-CZ') */
  locale?: string;
  /** Show event end date if different from start */
  showEndDate?: boolean;
  /** Show section badges */
  showSection?: boolean;
  /** Empty state message */
  emptyMessage?: ReactNode;
  /** Title for the list */
  title?: string;
  /** Show "View all" link */
  showViewAll?: boolean;
  /** Callback for "View all" click */
  onViewAllClick?: () => void;
}

interface EventGroup {
  key: string;
  label: string;
  events: CalendarEvent[];
}

/**
 * Format date range for display
 */
function formatDateRange(
  start: Date,
  end: Date | undefined,
  locale: string,
  showEndDate: boolean
): string {
  const startStr = start.toLocaleDateString(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  if (!showEndDate || !end) {
    return startStr;
  }

  // Check if same day
  if (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate()
  ) {
    return startStr;
  }

  const endStr = end.toLocaleDateString(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return `${startStr} – ${endStr}`;
}

/**
 * Get group key for event based on grouping mode
 */
function getGroupKey(event: CalendarEvent, groupBy: CalendarListGrouping): string {
  if (groupBy === 'none') return 'all';

  const date = event.start;

  if (groupBy === 'day') {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  // month
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

/**
 * Get group label for display
 */
function getGroupLabel(key: string, groupBy: CalendarListGrouping, locale: string): string {
  if (groupBy === 'none') return '';

  const parts = key.split('-').map(Number);

  if (groupBy === 'day') {
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date.toLocaleDateString(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  // month
  const date = new Date(parts[0], parts[1] - 1, 1);
  return date.toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  });
}

/**
 * CalendarList component - displays events as a chronological list.
 *
 * Alternative view to the grid Calendar, useful for embed contexts
 * and mobile views where vertical list is more appropriate.
 */
export const CalendarList = forwardRef<HTMLDivElement, CalendarListProps>(
  (
    {
      events,
      variant = 'default',
      styleVariant = 'default',
      groupBy = 'none',
      maxEvents,
      onEventClick,
      renderEvent,
      locale = 'cs-CZ',
      showEndDate = true,
      showSection = true,
      emptyMessage = 'Žádné nadcházející události',
      title,
      showViewAll = false,
      onViewAllClick,
      className,
      ...props
    },
    ref
  ) => {
    // Sort events by start date and limit
    const sortedEvents = useMemo(() => {
      const sorted = [...events].sort(
        (a, b) => a.start.getTime() - b.start.getTime()
      );
      return maxEvents ? sorted.slice(0, maxEvents) : sorted;
    }, [events, maxEvents]);

    // Group events if needed
    const groupedEvents = useMemo((): EventGroup[] => {
      if (groupBy === 'none') {
        return [{ key: 'all', label: '', events: sortedEvents }];
      }

      const groups: Map<string, CalendarEvent[]> = new Map();

      for (const event of sortedEvents) {
        const key = getGroupKey(event, groupBy);
        if (!groups.has(key)) {
          groups.set(key, []);
        }
        groups.get(key)!.push(event);
      }

      return Array.from(groups.entries()).map(([key, evts]) => ({
        key,
        label: getGroupLabel(key, groupBy, locale),
        events: evts,
      }));
    }, [sortedEvents, groupBy, locale]);

    // Get section color class
    const getSectionClass = (event: CalendarEvent): string => {
      if (event.section) {
        return `csk-calendar-list__event--section-${event.section}`;
      }
      if (event.variant) {
        return `csk-calendar-list__event--${event.variant}`;
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
          <div className="csk-calendar-list__event-content">
            <span className="csk-calendar-list__event-title">{event.title}</span>
            <span className="csk-calendar-list__event-date">
              {formatDateRange(event.start, event.end, locale, showEndDate)}
            </span>
          </div>
          {showSection && event.section && (
            <span
              className={`csk-calendar-list__event-badge csk-calendar-list__event-badge--${event.section}`}
            >
              {event.section.toUpperCase()}
            </span>
          )}
        </>
      );
    };

    const hasMoreEvents = maxEvents && events.length > maxEvents;

    const classes = [
      'csk-calendar-list',
      `csk-calendar-list--${variant}`,
      `csk-calendar-list--style-${styleVariant}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {title && (
          <div className="csk-calendar-list__header">
            <h3 className="csk-calendar-list__title">{title}</h3>
            {showViewAll && onViewAllClick && (
              <button
                type="button"
                className="csk-calendar-list__view-all"
                onClick={onViewAllClick}
              >
                Zobrazit vše
              </button>
            )}
          </div>
        )}

        {sortedEvents.length === 0 ? (
          <div className="csk-calendar-list__empty">{emptyMessage}</div>
        ) : (
          <div className="csk-calendar-list__content">
            {groupedEvents.map((group) => (
              <div key={group.key} className="csk-calendar-list__group">
                {group.label && (
                  <div className="csk-calendar-list__group-header">
                    {group.label}
                  </div>
                )}
                <ul className="csk-calendar-list__events" role="list">
                  {group.events.map((event) => (
                    <li key={event.id} className="csk-calendar-list__event-item">
                      <button
                        type="button"
                        className={[
                          'csk-calendar-list__event',
                          getSectionClass(event),
                          onEventClick && 'csk-calendar-list__event--clickable',
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
              </div>
            ))}
          </div>
        )}

        {hasMoreEvents && showViewAll && onViewAllClick && (
          <div className="csk-calendar-list__footer">
            <button
              type="button"
              className="csk-calendar-list__more"
              onClick={onViewAllClick}
            >
              +{events.length - maxEvents} dalších událostí
            </button>
          </div>
        )}
      </div>
    );
  }
);

CalendarList.displayName = 'CalendarList';
