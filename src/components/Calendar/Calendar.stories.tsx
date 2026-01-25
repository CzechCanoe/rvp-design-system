import type { Meta, StoryObj } from '@storybook/react';
import { Calendar, type CalendarEvent } from './Calendar';
import { useState } from 'react';
import { KanoeCzContext } from '../KanoeCzContext/KanoeCzContext';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Calendar component for displaying events in a grid format. Supports month view with event display, navigation controls, CSK-specific section colors for disciplines, and multiple style variants with animations.',
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
    styleVariant: {
      control: 'select',
      options: ['default', 'gradient', 'glass', 'bordered', 'embed'],
      description: 'Style variant for visual appearance',
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
    showEventPreview: {
      control: 'boolean',
      description: 'Show event preview tooltip on hover',
    },
    animated: {
      control: 'boolean',
      description: 'Enable animated transitions',
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
    weekendFocused: {
      control: 'boolean',
      description: 'Weekend-focused layout - gives more width to weekend columns where most sports events occur',
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

// =============================================================================
// STYLE VARIANTS (Phase 7.6)
// =============================================================================

/**
 * Gradient style with prominent header.
 */
export const StyleGradient: Story = {
  args: {
    events: cskRaceEvents,
    styleVariant: 'gradient',
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Gradient varianta s výraznou hlavičkou a lepším vizuálním dojmem pro hero sekce.',
      },
    },
  },
};

/**
 * Glass style with frosted glass effect.
 */
export const StyleGlass: Story = {
  args: {
    events: cskRaceEvents,
    styleVariant: 'glass',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '40px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Glass varianta s efektem matného skla, ideální pro použití na barevných pozadích.',
      },
    },
  },
};

/**
 * Bordered style with emphasized borders.
 */
export const StyleBordered: Story = {
  args: {
    events: cskRaceEvents,
    styleVariant: 'bordered',
  },
  parameters: {
    docs: {
      description: {
        story: 'Bordered varianta se zvýrazněnými okraji a levým border indikátorem na událostech.',
      },
    },
  },
};

/**
 * Calendar with event preview tooltips.
 */
export const WithEventPreview: Story = {
  args: {
    events: cskRaceEvents,
    size: 'lg',
    showEventPreview: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Kalendář s tooltipy zobrazujícími náhled událostí při najetí myší. Zobrazuje název, datum a sekci.',
      },
    },
  },
};

/**
 * Calendar without animations.
 */
export const NoAnimations: Story = {
  args: {
    events: allEvents,
    animated: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Kalendář bez animací pro uživatele preferující redukovaný pohyb.',
      },
    },
  },
};

/**
 * Showcase of all style variants.
 */
export const StyleVariantsShowcase: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '32px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', color: 'var(--color-text-primary)' }}>Default</h3>
        <Calendar events={cskRaceEvents.slice(0, 4)} />
      </div>
      <div>
        <h3 style={{ marginBottom: '16px', color: 'var(--color-text-primary)' }}>Gradient</h3>
        <Calendar events={cskRaceEvents.slice(0, 4)} styleVariant="gradient" />
      </div>
      <div
        style={{
          padding: '24px',
          background: 'linear-gradient(135deg, #1176a6 0%, #0d5a80 100%)',
          borderRadius: '12px',
        }}
      >
        <h3 style={{ marginBottom: '16px', color: 'white' }}>Glass</h3>
        <Calendar events={cskRaceEvents.slice(0, 4)} styleVariant="glass" />
      </div>
      <div>
        <h3 style={{ marginBottom: '16px', color: 'var(--color-text-primary)' }}>Bordered</h3>
        <Calendar events={cskRaceEvents.slice(0, 4)} styleVariant="bordered" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Přehled všech stylových variant kalendáře.',
      },
    },
  },
};

/**
 * Gradient calendar with event preview.
 */
export const GradientWithPreview: Story = {
  args: {
    events: cskRaceEvents,
    styleVariant: 'gradient',
    size: 'lg',
    showEventPreview: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Kombinace gradient stylu a event preview tooltipů pro maximální vizuální efekt.',
      },
    },
  },
};

// =============================================================================
// EMBED MODE (Phase 8.3)
// =============================================================================

/**
 * Embed style variant for kanoe.cz integration.
 * Neutral, modern look without dramatic effects.
 */
export const StyleEmbed: Story = {
  args: {
    events: cskRaceEvents,
    styleVariant: 'embed',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Embed varianta navržená pro integraci do kanoe.cz. Používá okraje místo stínů, kompaktní padding a minimální animace.',
      },
    },
  },
};

/**
 * Calendar embedded in kanoe.cz context.
 * Demonstrates how the component looks within the Bootstrap 4 layout.
 */
export const InKanoeCzContext: Story = {
  args: {
    events: cskRaceEvents,
    styleVariant: 'embed',
  },
  render: (args) => (
    <KanoeCzContext>
      <Calendar
        {...args}
        onEventClick={(event) => console.log('Event clicked:', event)}
        onDayClick={(date) => console.log('Day clicked:', date)}
      />
    </KanoeCzContext>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Kalendář v embed režimu uvnitř kanoe.cz-like Bootstrap 4 layoutu. Ukazuje, jak komponenta vypadá v kontextu existujícího designu webu.',
      },
    },
  },
};

/**
 * Narrow container (400px) demonstrating container query responsivity.
 */
export const NarrowContainer: Story = {
  args: {
    events: cskRaceEvents.slice(0, 4),
    styleVariant: 'embed',
    size: 'sm',
  },
  render: (args) => (
    <div style={{ maxWidth: '400px', border: '1px dashed #ccc', padding: '8px' }}>
      <Calendar {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Kalendář v úzkém kontejneru (400px) ukazující container query responzivitu. Události se zobrazují pouze jako barevné indikátory.',
      },
    },
  },
};

/**
 * Very narrow container (300px) for sidebar use.
 */
export const VeryNarrowContainer: Story = {
  args: {
    events: cskRaceEvents.slice(0, 3),
    styleVariant: 'embed',
    showTodayButton: false,
  },
  render: (args) => (
    <div style={{ maxWidth: '300px', border: '1px dashed #ccc', padding: '8px' }}>
      <Calendar {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Kalendář ve velmi úzkém kontejneru (300px) pro použití v sidebaru. Tlačítko "Dnes" je skryté a layout je maximálně kompaktní.',
      },
    },
  },
};

// =============================================================================
// WEEKEND-FOCUSED LAYOUT (Phase 16.5)
// =============================================================================

/**
 * Weekend-focused layout optimized for sports calendars.
 * Gives more visual space to Saturday and Sunday columns where most events occur.
 */
export const WeekendFocused: Story = {
  args: {
    events: cskRaceEvents,
    weekendFocused: true,
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Layout optimalizovaný pro sportovní kalendáře, kde se většina závodů koná o víkendu. Sobota a neděle mají širší sloupce, všední dny užší.',
      },
    },
  },
};

/**
 * Weekend-focused layout with embed style.
 * Ideal for embedding in kanoe.cz where most races are on weekends.
 */
export const WeekendFocusedEmbed: Story = {
  args: {
    events: cskRaceEvents,
    weekendFocused: true,
    styleVariant: 'embed',
  },
  render: (args) => (
    <KanoeCzContext>
      <Calendar
        {...args}
        onEventClick={(event) => console.log('Event clicked:', event)}
        onDayClick={(date) => console.log('Day clicked:', date)}
      />
    </KanoeCzContext>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Weekend-focused layout v embed módu pro kanoe.cz. Optimální zobrazení pro kanoistický kalendář závodů.',
      },
    },
  },
};

/**
 * Comparison: standard vs weekend-focused layout.
 */
export const WeekendFocusedComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '32px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', color: 'var(--color-text-primary)' }}>
          Standard layout (7 equal columns)
        </h3>
        <Calendar events={cskRaceEvents} />
      </div>
      <div>
        <h3 style={{ marginBottom: '16px', color: 'var(--color-text-primary)' }}>
          Weekend-focused layout (wider Sat/Sun)
        </h3>
        <Calendar events={cskRaceEvents} weekendFocused />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Porovnání standardního layoutu se 7 stejně širokými sloupci a weekend-focused layoutu s rozšířenými víkendovými sloupci.',
      },
    },
  },
};
