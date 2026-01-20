import type { Meta, StoryObj } from '@storybook/react';
import { CalendarCards } from './CalendarCards';
import type { CalendarEvent } from './Calendar';
import { KanoeCzContext } from '../KanoeCzContext/KanoeCzContext';

const meta = {
  title: 'Components/CalendarCards',
  component: CalendarCards,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Month-based card view for calendar events. Displays events grouped into monthly cards, useful for overview pages and dashboards.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    styleVariant: {
      control: 'select',
      options: ['default', 'gradient', 'embed'],
      description: 'Style variant for visual appearance',
    },
    maxMonths: {
      control: 'number',
      description: 'Maximum months to display',
    },
    maxEventsPerMonth: {
      control: 'number',
      description: 'Maximum events per month card',
    },
    showSection: {
      control: 'boolean',
      description: 'Show section badges on events',
    },
    startFromCurrentMonth: {
      control: 'boolean',
      description: 'Start from current month (true) or from first event (false)',
    },
    locale: {
      control: 'text',
      description: 'Locale for date formatting',
    },
  },
} satisfies Meta<typeof CalendarCards>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample events spread across multiple months
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

const sampleEvents: CalendarEvent[] = [
  // Current month
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
    title: 'Deadline registrace',
    start: new Date(year, month, 1),
    variant: 'warning',
  },
  // Next month
  {
    id: '6',
    title: 'Český pohár #2 - Praha',
    start: new Date(year, month + 1, 5),
    end: new Date(year, month + 1, 6),
    section: 'dv',
  },
  {
    id: '7',
    title: 'Mezinárodní regata',
    start: new Date(year, month + 1, 12),
    end: new Date(year, month + 1, 14),
    section: 'ry',
  },
  {
    id: '8',
    title: 'Valná hromada CSK',
    start: new Date(year, month + 1, 20),
    variant: 'info',
  },
  // Month after next
  {
    id: '9',
    title: 'ME ve slalomu',
    start: new Date(year, month + 2, 8),
    end: new Date(year, month + 2, 10),
    section: 'dv',
  },
  {
    id: '10',
    title: 'Český pohár #3 - Brandýs',
    start: new Date(year, month + 2, 18),
    end: new Date(year, month + 2, 19),
    section: 'dv',
  },
  {
    id: '11',
    title: 'Nominace na MS',
    start: new Date(year, month + 2, 24),
    end: new Date(year, month + 2, 25),
    section: 'dv',
  },
  {
    id: '12',
    title: 'Vodácký maraton',
    start: new Date(year, month + 2, 28),
    section: 'vt',
  },
];

/**
 * Default card view showing 3 months of events.
 */
export const Default: Story = {
  args: {
    events: sampleEvents,
    onEventClick: (event) => console.log('Event clicked:', event),
  },
};

/**
 * With title header.
 */
export const WithTitle: Story = {
  args: {
    events: sampleEvents,
    title: 'Nadcházející závody',
    onEventClick: (event) => console.log('Event clicked:', event),
  },
};

/**
 * Gradient style with brand-colored card headers.
 */
export const GradientStyle: Story = {
  args: {
    events: sampleEvents,
    styleVariant: 'gradient',
    title: 'Kalendář závodů',
    onEventClick: (event) => console.log('Event clicked:', event),
  },
};

/**
 * Embed style for kanoe.cz integration.
 * Neutral, modern look without dramatic effects.
 */
export const EmbedStyle: Story = {
  args: {
    events: sampleEvents,
    styleVariant: 'embed',
    title: 'Kalendář závodů',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Embed style variant designed for integration into kanoe.cz. Uses borders instead of shadows, compact padding.',
      },
    },
  },
};

/**
 * CalendarCards embedded in kanoe.cz context.
 */
export const InKanoeCzContext: Story = {
  args: {
    events: sampleEvents,
    styleVariant: 'embed',
    title: 'Kalendář závodů',
  },
  render: (args) => (
    <KanoeCzContext>
      <CalendarCards
        {...args}
        onEventClick={(event) => console.log('Event clicked:', event)}
        onMonthClick={(y, m) => console.log('Month clicked:', y, m)}
      />
    </KanoeCzContext>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Calendar cards embedded within a kanoe.cz-like Bootstrap 4 layout.',
      },
    },
  },
};

/**
 * Limited events per month with "show more" option.
 */
export const LimitedEventsPerMonth: Story = {
  args: {
    events: sampleEvents,
    maxEventsPerMonth: 2,
    title: 'Kalendář',
    onMonthClick: (year, month) => console.log('Month clicked:', year, month),
  },
};

/**
 * Showing more months (6 months overview).
 */
export const SixMonthsOverview: Story = {
  args: {
    events: [
      ...sampleEvents,
      // Add events for months 3-5
      {
        id: '13',
        title: 'Letní kemp juniorů',
        start: new Date(year, month + 3, 5),
        end: new Date(year, month + 3, 12),
        section: 'dv',
      },
      {
        id: '14',
        title: 'MČR v rychlosti',
        start: new Date(year, month + 4, 15),
        end: new Date(year, month + 4, 17),
        section: 'ry',
      },
      {
        id: '15',
        title: 'MS ve slalomu',
        start: new Date(year, month + 5, 20),
        end: new Date(year, month + 5, 25),
        section: 'dv',
      },
    ],
    maxMonths: 6,
    title: 'Půlroční přehled',
  },
};

/**
 * Without section badges.
 */
export const WithoutSectionBadges: Story = {
  args: {
    events: sampleEvents,
    showSection: false,
    title: 'Kalendář',
  },
};

/**
 * Empty state when no events.
 */
export const Empty: Story = {
  args: {
    events: [],
    title: 'Nadcházející závody',
    emptyMessage: 'Žádné naplánované závody v následujících měsících',
  },
};

/**
 * Starting from first event instead of current month.
 */
export const StartFromFirstEvent: Story = {
  args: {
    events: [
      {
        id: '1',
        title: 'Budoucí závod',
        start: new Date(year, month + 3, 15),
        section: 'dv',
      },
      {
        id: '2',
        title: 'Další závod',
        start: new Date(year, month + 4, 10),
        section: 'ry',
      },
    ],
    startFromCurrentMonth: false,
    title: 'Nadcházející události',
  },
  parameters: {
    docs: {
      description: {
        story:
          'When startFromCurrentMonth is false, the cards start from the month of the first event.',
      },
    },
  },
};

/**
 * DV Section only - filtered events.
 */
export const DVSectionOnly: Story = {
  args: {
    events: sampleEvents.filter((e) => e.section === 'dv'),
    title: 'Divoká voda - závody',
    styleVariant: 'gradient',
  },
};

/**
 * Narrow container demonstrating container query responsivity.
 */
export const NarrowContainer: Story = {
  args: {
    events: sampleEvents.slice(0, 6),
    styleVariant: 'embed',
    title: 'Závody',
    maxMonths: 2,
  },
  render: (args) => (
    <div style={{ maxWidth: '350px', border: '1px dashed #ccc', padding: '8px' }}>
      <CalendarCards {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'CalendarCards in a narrow container showing single-column responsive layout.',
      },
    },
  },
};

/**
 * Two months side-by-side in medium container.
 */
export const MediumContainer: Story = {
  args: {
    events: sampleEvents,
    styleVariant: 'default',
    title: 'Kalendář',
    maxMonths: 2,
  },
  render: (args) => (
    <div style={{ maxWidth: '700px', border: '1px dashed #ccc', padding: '16px' }}>
      <CalendarCards {...args} />
    </div>
  ),
};
