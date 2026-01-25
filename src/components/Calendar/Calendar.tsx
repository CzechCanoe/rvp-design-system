import {
  forwardRef,
  useMemo,
  useState,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { LiveIndicator } from '../LiveIndicator';
import './Calendar.css';

export type CalendarView = 'month' | 'week';
export type CalendarSize = 'sm' | 'md' | 'lg';
export type CalendarStyleVariant = 'default' | 'embed';

export interface CalendarEvent {
  /** Unique identifier for the event */
  id: string;
  /** Event title */
  title: string;
  /** Start date/time */
  start: Date;
  /** End date/time (optional, defaults to same day) */
  end?: Date;
  /** Event color variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  /** CSK discipline section */
  section?: 'dv' | 'ry' | 'vt';
  /** Additional data for the event */
  data?: Record<string, unknown>;
}

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Currently displayed date (controls which month/week is shown) */
  date?: Date;
  /** Default date when uncontrolled */
  defaultDate?: Date;
  /** Callback when date changes (month/week navigation) */
  onDateChange?: (date: Date) => void;
  /** View mode */
  view?: CalendarView;
  /** Calendar size */
  size?: CalendarSize;
  /** Style variant for visual appearance */
  styleVariant?: CalendarStyleVariant;
  /** Events to display */
  events?: CalendarEvent[];
  /** Callback when an event is clicked */
  onEventClick?: (event: CalendarEvent) => void;
  /** Callback when a day is clicked */
  onDayClick?: (date: Date) => void;
  /** Callback when hovering over an event */
  onEventHover?: (event: CalendarEvent | null, element?: HTMLElement) => void;
  /** Locale for date formatting (default: 'cs-CZ') */
  locale?: string;
  /** First day of week (0 = Sunday, 1 = Monday, default: 1) */
  firstDayOfWeek?: 0 | 1;
  /** Custom render function for events */
  renderEvent?: (event: CalendarEvent) => ReactNode;
  /** Show navigation controls */
  showNavigation?: boolean;
  /** Show today button */
  showTodayButton?: boolean;
  /** Maximum events to show per day before "+N more" */
  maxEventsPerDay?: number;
  /** Highlight today */
  highlightToday?: boolean;
  /** Show event preview tooltip on hover */
  showEventPreview?: boolean;
  /** Enable animated transitions */
  animated?: boolean;
  /** Show live indicator for events with data.isLive */
  showLive?: boolean;
  /**
   * Weekend showcase layout - the recommended layout for sports calendars.
   * Weekdays are minimized (compact columns with event dots).
   * Weekend days are prominent (large cards with full event details).
   * Ideal for canoe racing calendars where 90% of events are on weekends.
   * @default false
   */
  weekendShowcase?: boolean;
}

// Helper functions
function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function startOfWeek(date: Date, firstDayOfWeek: 0 | 1): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isSameMonth(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday = 0, Saturday = 6
}

function isEventOnDay(event: CalendarEvent, day: Date): boolean {
  const eventStart = new Date(event.start);
  eventStart.setHours(0, 0, 0, 0);

  const eventEnd = event.end ? new Date(event.end) : new Date(event.start);
  eventEnd.setHours(23, 59, 59, 999);

  const dayStart = new Date(day);
  dayStart.setHours(0, 0, 0, 0);

  const dayEnd = new Date(day);
  dayEnd.setHours(23, 59, 59, 999);

  return eventStart <= dayEnd && eventEnd >= dayStart;
}

interface DayCell {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  events: CalendarEvent[];
}

/**
 * Calendar component for displaying events in a grid format.
 *
 * Supports month view with event display, navigation controls,
 * and CSK-specific section colors for disciplines.
 */
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      date: controlledDate,
      defaultDate,
      onDateChange,
      view = 'month',
      size = 'md',
      styleVariant = 'default',
      events = [],
      onEventClick,
      onDayClick,
      onEventHover,
      locale = 'cs-CZ',
      firstDayOfWeek = 1,
      renderEvent,
      showNavigation = true,
      showTodayButton = true,
      maxEventsPerDay = 3,
      highlightToday = true,
      showEventPreview = false,
      animated = true,
      showLive = false,
      weekendShowcase = false,
      className,
      ...props
    },
    ref
  ) => {
    // Internal state for uncontrolled mode
    const [internalDate, setInternalDate] = useState(() => {
      return defaultDate || controlledDate || new Date();
    });

    // Use controlled or uncontrolled date
    const currentDate = controlledDate ?? internalDate;

    // Date formatter for month/year header
    const monthYearFormatter = useMemo(
      () =>
        new Intl.DateTimeFormat(locale, {
          month: 'long',
          year: 'numeric',
        }),
      [locale]
    );

    // Day name formatter
    const dayNameFormatter = useMemo(
      () =>
        new Intl.DateTimeFormat(locale, {
          weekday: 'short',
        }),
      [locale]
    );

    // Navigation handlers
    const handlePrevMonth = useCallback(() => {
      const newDate = addMonths(currentDate, -1);
      setInternalDate(newDate);
      onDateChange?.(newDate);
    }, [currentDate, onDateChange]);

    const handleNextMonth = useCallback(() => {
      const newDate = addMonths(currentDate, 1);
      setInternalDate(newDate);
      onDateChange?.(newDate);
    }, [currentDate, onDateChange]);

    const handleToday = useCallback(() => {
      const today = new Date();
      setInternalDate(today);
      onDateChange?.(today);
    }, [onDateChange]);

    // Generate day names based on first day of week
    const dayNames = useMemo(() => {
      const names: string[] = [];
      const baseDate = new Date(2024, 0, firstDayOfWeek === 0 ? 7 : 1); // Sunday Jan 7 or Monday Jan 1
      for (let i = 0; i < 7; i++) {
        names.push(dayNameFormatter.format(addDays(baseDate, i)));
      }
      return names;
    }, [dayNameFormatter, firstDayOfWeek]);

    // Generate calendar grid for month view
    const calendarDays = useMemo((): DayCell[] => {
      if (view !== 'month') return [];

      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      const calendarStart = startOfWeek(monthStart, firstDayOfWeek);

      const days: DayCell[] = [];
      let day = calendarStart;

      // Generate 6 weeks (42 days) to ensure consistent grid
      for (let i = 0; i < 42; i++) {
        const dayEvents = events.filter((event) => isEventOnDay(event, day));

        days.push({
          date: new Date(day),
          isCurrentMonth: isSameMonth(day, currentDate),
          isToday: isToday(day),
          isWeekend: isWeekend(day),
          events: dayEvents,
        });

        day = addDays(day, 1);
      }

      // Trim trailing weeks if month ends early
      const lastDayOfMonth = monthEnd.getDate();
      const firstDayInLastRow = days[35]?.date;
      if (firstDayInLastRow && firstDayInLastRow.getDate() > lastDayOfMonth) {
        // Last row is entirely next month, can trim to 5 weeks
        return days.slice(0, 35);
      }

      return days;
    }, [currentDate, events, firstDayOfWeek, view]);

    // Handle event click
    const handleEventClick = useCallback(
      (event: CalendarEvent, e: React.MouseEvent) => {
        e.stopPropagation();
        onEventClick?.(event);
      },
      [onEventClick]
    );

    // Handle event hover
    const handleEventMouseEnter = useCallback(
      (event: CalendarEvent, e: React.MouseEvent<HTMLButtonElement>) => {
        onEventHover?.(event, e.currentTarget);
      },
      [onEventHover]
    );

    const handleEventMouseLeave = useCallback(() => {
      onEventHover?.(null);
    }, [onEventHover]);

    // Handle day click
    const handleDayClick = useCallback(
      (date: Date) => {
        onDayClick?.(date);
      },
      [onDayClick]
    );

    // Get event color class
    const getEventColorClass = (event: CalendarEvent): string => {
      if (event.section) {
        return `csk-calendar__event--section-${event.section}`;
      }
      return `csk-calendar__event--${event.variant || 'default'}`;
    };

    // Check if event is live
    const isEventLive = (event: CalendarEvent): boolean => {
      return Boolean(showLive && event.data?.isLive);
    };

    // Render event
    const renderEventItem = (event: CalendarEvent): ReactNode => {
      if (renderEvent) {
        return renderEvent(event);
      }

      const eventIsLive = isEventLive(event);

      return (
        <>
          <span className="csk-calendar__event-title">{event.title}</span>
          {eventIsLive && (
            <span className="csk-calendar__event-live">
              <LiveIndicator variant="live" size="sm" />
            </span>
          )}
        </>
      );
    };

    const classes = [
      'csk-calendar',
      `csk-calendar--${view}`,
      `csk-calendar--${size}`,
      styleVariant !== 'default' && `csk-calendar--style-${styleVariant}`,
      animated && 'csk-calendar--animated',
      weekendShowcase && 'csk-calendar--weekend-showcase',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {/* Header with navigation */}
        {showNavigation && (
          <div className="csk-calendar__header">
            <div className="csk-calendar__title">
              {monthYearFormatter.format(currentDate)}
            </div>
            <div className="csk-calendar__nav">
              {showTodayButton && (
                <button
                  type="button"
                  className="csk-calendar__nav-btn csk-calendar__nav-btn--today"
                  onClick={handleToday}
                  aria-label="Dnes"
                >
                  Dnes
                </button>
              )}
              <button
                type="button"
                className="csk-calendar__nav-btn"
                onClick={handlePrevMonth}
                aria-label="Předchozí měsíc"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M12.5 15L7.5 10L12.5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="csk-calendar__nav-btn"
                onClick={handleNextMonth}
                aria-label="Další měsíc"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7.5 15L12.5 10L7.5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Calendar grid */}
        <div className="csk-calendar__grid" aria-label="Kalendář">
          {/* Day names header */}
          <div className="csk-calendar__weekdays">
            {dayNames.map((name, index) => (
              <div
                key={index}
                className="csk-calendar__weekday"
                aria-hidden="true"
              >
                {name}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="csk-calendar__days">
            {calendarDays.map((day, index) => {
              const visibleEvents = day.events.slice(0, maxEventsPerDay);
              const hiddenCount = day.events.length - maxEventsPerDay;

              return (
                <div
                  key={index}
                  className={[
                    'csk-calendar__day',
                    !day.isCurrentMonth && 'csk-calendar__day--outside',
                    highlightToday && day.isToday && 'csk-calendar__day--today',
                    day.isWeekend && 'csk-calendar__day--weekend',
                    onDayClick && 'csk-calendar__day--clickable',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  tabIndex={onDayClick ? 0 : undefined}
                  onClick={() => onDayClick && handleDayClick(day.date)}
                  onKeyDown={(e) => {
                    if (onDayClick && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleDayClick(day.date);
                    }
                  }}
                  aria-label={`${day.date.getDate()}. ${monthYearFormatter.format(day.date)}${
                    day.events.length > 0
                      ? `, ${day.events.length} událost${day.events.length > 1 ? 'í' : ''}`
                      : ''
                  }`}
                >
                  <div className="csk-calendar__day-header">
                    <span
                      className={[
                        'csk-calendar__day-number',
                        highlightToday && day.isToday && 'csk-calendar__day-number--today',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {day.date.getDate()}
                    </span>
                  </div>
                  <div className="csk-calendar__day-events">
                    {visibleEvents.map((event) => (
                      <button
                        key={event.id}
                        type="button"
                        className={[
                          'csk-calendar__event',
                          getEventColorClass(event),
                          showEventPreview && 'csk-calendar__event--has-preview',
                          isEventLive(event) && 'csk-calendar__event--live',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        onClick={(e) => handleEventClick(event, e)}
                        onMouseEnter={(e) => handleEventMouseEnter(event, e)}
                        onMouseLeave={handleEventMouseLeave}
                        aria-label={event.title}
                        data-event-id={event.id}
                        title={showEventPreview ? undefined : event.title}
                      >
                        {renderEventItem(event)}
                        {showEventPreview && (
                          <span className="csk-calendar__event-preview">
                            <span className="csk-calendar__event-preview-title">
                              {event.title}
                            </span>
                            <span className="csk-calendar__event-preview-date">
                              {event.start.toLocaleDateString(locale, {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short',
                              })}
                              {event.end && !isSameDay(event.start, event.end) && (
                                <>
                                  {' - '}
                                  {event.end.toLocaleDateString(locale, {
                                    weekday: 'short',
                                    day: 'numeric',
                                    month: 'short',
                                  })}
                                </>
                              )}
                            </span>
                            {event.section && (
                              <span
                                className={`csk-calendar__event-preview-badge csk-calendar__event-preview-badge--${event.section}`}
                              >
                                {event.section.toUpperCase()}
                              </span>
                            )}
                          </span>
                        )}
                      </button>
                    ))}
                    {hiddenCount > 0 && (
                      <button
                        type="button"
                        className="csk-calendar__more"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Could expand to show all events or trigger a callback
                          handleDayClick(day.date);
                        }}
                        aria-label={`${hiddenCount} dalších událostí`}
                      >
                        +{hiddenCount} další
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';
