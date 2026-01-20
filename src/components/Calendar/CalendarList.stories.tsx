import type { Meta, StoryObj } from '@storybook/react';
import { CalendarList } from './CalendarList';
import type { CalendarEvent } from './Calendar';
import { KanoeCzContext } from '../KanoeCzContext/KanoeCzContext';

const meta = {
  title: 'Components/CalendarList',
  component: CalendarList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Chronological list view for calendar events. Alternative to the grid Calendar, useful for embed contexts and mobile views.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Visual variant',
    },
    styleVariant: {
      control: 'select',
      options: ['default', 'gradient', 'embed'],
      description: 'Style variant for visual appearance',
    },
    groupBy: {
      control: 'select',
      options: ['none', 'day', 'month'],
      description: 'Group events by day/month',
    },
    maxEvents: {
      control: 'number',
      description: 'Maximum events to show',
    },
    showSection: {
      control: 'boolean',
      description: 'Show section badges',
    },
    showEndDate: {
      control: 'boolean',
      description: 'Show end date if different from start',
    },
    locale: {
      control: 'text',
      description: 'Locale for date formatting',
    },
  },
} satisfies Meta<typeof CalendarList>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample events
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'MČR ve slalomu',
    start: new Date(year, month, 3),
    end: new Date(year, month, 5),
    section: 'dv',
  },
  {
    id: '2',
    title: 'Český pohár #1 - Trnávka',
    start: new Date(year, month, 10),
    end: new Date(year, month, 11),
    section: 'dv',
  },
  {
    id: '3',
    title: 'Regata Račice',
    start: new Date(year, month, 8),
    end: new Date(year, month, 9),
    section: 'ry',
  },
  {
    id: '4',
    title: 'Sjíždění Vltavy',
    start: new Date(year, month, 15),
    end: new Date(year, month, 16),
    section: 'vt',
  },
  {
    id: '5',
    title: 'Český pohár #2 - Praha',
    start: new Date(year, month, 17),
    end: new Date(year, month, 18),
    section: 'dv',
  },
  {
    id: '6',
    title: 'Deadline registrace',
    start: new Date(year, month, 1),
    variant: 'warning',
  },
  {
    id: '7',
    title: 'Valná hromada CSK',
    start: new Date(year, month, 20),
    variant: 'info',
  },
  {
    id: '8',
    title: 'Nominace na MS',
    start: new Date(year, month, 24),
    end: new Date(year, month, 25),
    section: 'dv',
  },
];

/**
 * Default list view with sample events.
 */
export const Default: Story = {
  args: {
    events: sampleEvents,
    onEventClick: (event) => console.log('Event clicked:', event),
  },
};

/**
 * List with title and "View all" link.
 */
export const WithTitle: Story = {
  args: {
    events: sampleEvents.slice(0, 5),
    title: 'Nadcházející závody',
    showViewAll: true,
    onViewAllClick: () => console.log('View all clicked'),
    onEventClick: (event) => console.log('Event clicked:', event),
  },
};

/**
 * Compact variant for sidebar or narrow containers.
 */
export const Compact: Story = {
  args: {
    events: sampleEvents,
    variant: 'compact',
    title: 'Kalendář',
  },
};

/**
 * Events grouped by month.
 */
export const GroupedByMonth: Story = {
  args: {
    events: [
      ...sampleEvents,
      {
        id: '9',
        title: 'Závod příští měsíc',
        start: new Date(year, month + 1, 5),
        section: 'ry',
      },
      {
        id: '10',
        title: 'Další závod příští měsíc',
        start: new Date(year, month + 1, 15),
        section: 'dv',
      },
    ],
    groupBy: 'month',
    title: 'Kalendář závodů',
  },
};

/**
 * Events grouped by day.
 */
export const GroupedByDay: Story = {
  args: {
    events: sampleEvents,
    groupBy: 'day',
  },
};

/**
 * Limited to 5 events with "show more" option.
 */
export const LimitedEvents: Story = {
  args: {
    events: sampleEvents,
    maxEvents: 5,
    title: 'Nejbližší akce',
    showViewAll: true,
    onViewAllClick: () => console.log('View all clicked'),
  },
};

/**
 * Gradient style with brand header.
 */
export const GradientStyle: Story = {
  args: {
    events: sampleEvents.slice(0, 4),
    styleVariant: 'gradient',
    title: 'Kalendář závodů',
    showViewAll: true,
    onViewAllClick: () => console.log('View all clicked'),
  },
};

/**
 * Empty state.
 */
export const Empty: Story = {
  args: {
    events: [],
    title: 'Nadcházející závody',
    emptyMessage: 'Žádné nadcházející závody',
  },
};

/**
 * Embed style variant for kanoe.cz integration.
 * Neutral, modern look without dramatic effects.
 */
export const EmbedStyle: Story = {
  args: {
    events: sampleEvents.slice(0, 5),
    styleVariant: 'embed',
    title: 'Nadcházející závody',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Embed style variant designed for integration into kanoe.cz. Uses borders instead of shadows, compact padding, and minimal animations.',
      },
    },
  },
};

/**
 * CalendarList embedded in kanoe.cz context.
 * Demonstrates how the component looks within the Bootstrap 4 layout.
 */
export const InKanoeCzContext: Story = {
  args: {
    events: sampleEvents.slice(0, 5),
    styleVariant: 'embed',
    title: 'Nadcházející závody',
    showViewAll: true,
  },
  render: (args) => (
    <KanoeCzContext>
      <CalendarList
        {...args}
        onViewAllClick={() => console.log('View all clicked')}
        onEventClick={(event) => console.log('Event clicked:', event)}
      />
    </KanoeCzContext>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Calendar list embedded within a kanoe.cz-like Bootstrap 4 layout. Shows how the embed variant integrates with the existing site design.',
      },
    },
  },
};

/**
 * Narrow container (300px) demonstrating container query responsivity.
 */
export const NarrowContainer: Story = {
  args: {
    events: sampleEvents.slice(0, 4),
    styleVariant: 'embed',
    title: 'Závody',
  },
  render: (args) => (
    <div style={{ maxWidth: '300px', border: '1px dashed #ccc', padding: '8px' }}>
      <CalendarList {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'CalendarList in a narrow container (300px) showing container query responsive layout.',
      },
    },
  },
};

/**
 * DV Section only - filtered events.
 */
export const DVSectionOnly: Story = {
  args: {
    events: sampleEvents.filter(e => e.section === 'dv'),
    title: 'Divoká voda',
    groupBy: 'month',
  },
};

/**
 * Custom event rendering.
 */
export const CustomEventRender: Story = {
  args: {
    events: sampleEvents.slice(0, 4),
    title: 'Závody',
    renderEvent: (event) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          width: '32px',
          height: '32px',
          borderRadius: '4px',
          backgroundColor: event.section === 'dv' ? '#1176a6' :
                          event.section === 'ry' ? '#22c55e' :
                          event.section === 'vt' ? '#ef4444' : '#6b7280',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '10px',
          fontWeight: 'bold',
        }}>
          {event.section?.toUpperCase() || '?'}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 500 }}>{event.title}</span>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>
            {event.start.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'short' })}
          </span>
        </div>
      </div>
    ),
  },
};
