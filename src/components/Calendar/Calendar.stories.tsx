import type { Meta, StoryObj } from '@storybook/react';
import { Calendar, type CalendarEvent } from './Calendar';
import { useState } from 'react';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Calendar component for displaying events in a grid format. Supports month view with event display, navigation controls, and CSK-specific section colors for disciplines.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    view: {
      control: 'select',
      options: ['month', 'week'],
      description: 'View mode',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Calendar size',
    },
    showNavigation: {
      control: 'boolean',
      description: 'Show navigation controls',
    },
    showTodayButton: {
      control: 'boolean',
      description: 'Show today button',
    },
    highlightToday: {
      control: 'boolean',
      description: 'Highlight current day',
    },
    maxEventsPerDay: {
      control: 'number',
      description: 'Max events shown per day before "+N more"',
    },
    firstDayOfWeek: {
      control: 'select',
      options: [0, 1],
      description: 'First day of week (0 = Sunday, 1 = Monday)',
    },
    locale: {
      control: 'text',
      description: 'Locale for date formatting',
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample events for stories
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'MS slalom',
    start: new Date(year, month, 5),
    end: new Date(year, month, 7),
    section: 'dv',
  },
  {
    id: '2',
    title: 'MR K1',
    start: new Date(year, month, 12),
    section: 'dv',
  },
  {
    id: '3',
    title: 'Regata Praha',
    start: new Date(year, month, 15),
    section: 'ry',
  },
  {
    id: '4',
    title: 'Vodácký maraton',
    start: new Date(year, month, 18),
    end: new Date(year, month, 19),
    section: 'vt',
  },
  {
    id: '5',
    title: 'Deadline přihlášek',
    start: new Date(year, month, 10),
    variant: 'warning',
  },
  {
    id: '6',
    title: 'Trénink mládeže',
    start: new Date(year, month, 8),
    variant: 'info',
  },
  {
    id: '7',
    title: 'Ukončení sezóny',
    start: new Date(year, month, 25),
    variant: 'success',
  },
];

// Events for today
const todayEvents: CalendarEvent[] = [
  {
    id: 't1',
    title: 'Ranní trénink',
    start: today,
    variant: 'primary',
  },
  {
    id: 't2',
    title: 'Schůzka oddílu',
    start: today,
    variant: 'info',
  },
];

const allEvents = [...sampleEvents, ...todayEvents];

/**
 * Default calendar with sample events.
 */
export const Default: Story = {
  args: {
    events: allEvents,
    onEventClick: (event) => console.log('Event clicked:', event),
    onDayClick: (date) => console.log('Day clicked:', date),
  },
};

/**
 * Calendar without any events.
 */
export const Empty: Story = {
  args: {
    events: [],
  },
};

/**
 * Small size calendar.
 */
export const Small: Story = {
  args: {
    size: 'sm',
    events: allEvents,
  },
};

/**
 * Large size calendar with more space for events.
 */
export const Large: Story = {
  args: {
    size: 'lg',
    events: allEvents,
  },
};

/**
 * Calendar without navigation controls.
 */
export const NoNavigation: Story = {
  args: {
    events: allEvents,
    showNavigation: false,
  },
};

/**
 * Calendar with Sunday as first day of week.
 */
export const SundayFirst: Story = {
  args: {
    events: allEvents,
    firstDayOfWeek: 0,
  },
};

/**
 * Calendar with English locale.
 */
export const EnglishLocale: Story = {
  args: {
    events: allEvents,
    locale: 'en-US',
  },
};

// Events with many per day
const manyEventsPerDay: CalendarEvent[] = [
  { id: 'm1', title: 'Slalom K1', start: new Date(year, month, 15), section: 'dv' },
  { id: 'm2', title: 'Slalom C1', start: new Date(year, month, 15), section: 'dv' },
  { id: 'm3', title: 'Sjezd K1', start: new Date(year, month, 15), section: 'dv' },
  { id: 'm4', title: 'Sjezd C1', start: new Date(year, month, 15), section: 'dv' },
  { id: 'm5', title: 'Sprint 200m', start: new Date(year, month, 15), section: 'ry' },
  { id: 'm6', title: 'Sprint 500m', start: new Date(year, month, 15), section: 'ry' },
];

/**
 * Calendar with many events on a single day, showing "+N more" indicator.
 */
export const ManyEventsPerDay: Story = {
  args: {
    events: manyEventsPerDay,
    maxEventsPerDay: 3,
  },
};

/**
 * Controlled calendar example with state management.
 */
export const Controlled: Story = {
  render: () => {
    const [date, setDate] = useState(new Date());

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span>Aktuální měsíc: {date.toLocaleDateString('cs-CZ', { month: 'long', year: 'numeric' })}</span>
        </div>
        <Calendar
          date={date}
          onDateChange={setDate}
          events={allEvents}
          onEventClick={(event) => alert(`Klikli jste na: ${event.title}`)}
        />
      </div>
    );
  },
};

// CSK Race Calendar - realistic example
const cskRaceEvents: CalendarEvent[] = [
  // DV - Divoká voda (Whitewater)
  {
    id: 'dv1',
    title: 'MČR ve slalomu',
    start: new Date(year, month, 3),
    end: new Date(year, month, 5),
    section: 'dv',
  },
  {
    id: 'dv2',
    title: 'Český pohár #1 - Trnávka',
    start: new Date(year, month, 10),
    end: new Date(year, month, 11),
    section: 'dv',
  },
  {
    id: 'dv3',
    title: 'Český pohár #2 - Praha',
    start: new Date(year, month, 17),
    end: new Date(year, month, 18),
    section: 'dv',
  },
  {
    id: 'dv4',
    title: 'Nominace na MS',
    start: new Date(year, month, 24),
    end: new Date(year, month, 25),
    section: 'dv',
  },

  // RY - Rychlostní (Sprint/Marathon)
  {
    id: 'ry1',
    title: 'Regata Račice',
    start: new Date(year, month, 8),
    end: new Date(year, month, 9),
    section: 'ry',
  },
  {
    id: 'ry2',
    title: 'Český maraton',
    start: new Date(year, month, 22),
    section: 'ry',
  },

  // VT - Vodní turistika (Touring)
  {
    id: 'vt1',
    title: 'Sjíždění Vltavy',
    start: new Date(year, month, 6),
    end: new Date(year, month, 7),
    section: 'vt',
  },
  {
    id: 'vt2',
    title: 'Vodácký víkend Sázava',
    start: new Date(year, month, 20),
    end: new Date(year, month, 21),
    section: 'vt',
  },

  // Administrative
  {
    id: 'admin1',
    title: 'Deadline registrace',
    start: new Date(year, month, 1),
    variant: 'warning',
  },
  {
    id: 'admin2',
    title: 'Valná hromada CSK',
    start: new Date(year, month, 15),
    variant: 'info',
  },
];

/**
 * Realistic CSK race calendar with discipline sections (DV, RY, VT).
 */
export const CSKRaceCalendar: Story = {
  args: {
    events: cskRaceEvents,
    size: 'lg',
    onEventClick: (event) => {
      const sectionNames: Record<string, string> = {
        dv: 'Divoká voda',
        ry: 'Rychlostní',
        vt: 'Vodní turistika',
      };
      const section = event.section ? sectionNames[event.section] : 'Ostatní';
      alert(`${event.title}\nSekce: ${section}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ukázka reálného kalendáře závodů CSK s barevným rozlišením sekcí: DV (modrá), RY (zelená), VT (červená).',
      },
    },
  },
};

/**
 * Custom event rendering example.
 */
export const CustomEventRender: Story = {
  args: {
    events: cskRaceEvents.slice(0, 5),
    size: 'lg',
    renderEvent: (event) => (
      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {event.section && (
          <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            {event.section}
          </span>
        )}
        <span>{event.title}</span>
      </span>
    ),
  },
};

// Events spanning multiple days
const multiDayEvents: CalendarEvent[] = [
  {
    id: 'multi1',
    title: 'MS ve slalomu',
    start: new Date(year, month, 5),
    end: new Date(year, month, 12),
    section: 'dv',
  },
  {
    id: 'multi2',
    title: 'Soustředění reprezentace',
    start: new Date(year, month, 15),
    end: new Date(year, month, 22),
    variant: 'primary',
  },
];

/**
 * Events spanning multiple days.
 */
export const MultiDayEvents: Story = {
  args: {
    events: multiDayEvents,
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Události trvající více dní se zobrazují na všech dnech, kterých se týkají.',
      },
    },
  },
};

/**
 * Interactive example with click handlers.
 */
export const Interactive: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Calendar
          events={cskRaceEvents}
          onDayClick={(date) => {
            setSelectedDate(date);
            setSelectedEvent(null);
          }}
          onEventClick={(event) => {
            setSelectedEvent(event);
            setSelectedDate(null);
          }}
        />
        <div
          style={{
            padding: '16px',
            background: 'var(--color-bg-secondary)',
            borderRadius: '8px',
            minHeight: '80px',
          }}
        >
          {selectedDate && (
            <div>
              <strong>Vybraný den:</strong>{' '}
              {selectedDate.toLocaleDateString('cs-CZ', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
          )}
          {selectedEvent && (
            <div>
              <strong>Vybraná událost:</strong> {selectedEvent.title}
              <br />
              <strong>Datum:</strong>{' '}
              {selectedEvent.start.toLocaleDateString('cs-CZ')}
              {selectedEvent.end &&
                ` - ${selectedEvent.end.toLocaleDateString('cs-CZ')}`}
              {selectedEvent.section && (
                <>
                  <br />
                  <strong>Sekce:</strong> {selectedEvent.section.toUpperCase()}
                </>
              )}
            </div>
          )}
          {!selectedDate && !selectedEvent && (
            <span style={{ color: 'var(--color-text-tertiary)' }}>
              Klikněte na den nebo událost pro zobrazení detailu.
            </span>
          )}
        </div>
      </div>
    );
  },
};
