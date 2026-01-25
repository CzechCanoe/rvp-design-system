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
      options: ['default', 'embed'],
      description: 'Style variant - default or embed for kanoe.cz',
    },
    maxMonths: {
      control: 'number',
      description: 'Maximum months to display',
    },
    maxEventsPerMonth: {
      control: 'number',
      description: 'Maximum events per month card',
    },
  },
} satisfies Meta<typeof CalendarCards>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample events
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

const sampleEvents: CalendarEvent[] = [
  { id: '1', title: 'MČR ve slalomu', start: new Date(year, month, 3), end: new Date(year, month, 5), section: 'dv' },
  { id: '2', title: 'Český pohár #1', start: new Date(year, month, 10), section: 'dv' },
  { id: '3', title: 'Regata Račice', start: new Date(year, month, 8), section: 'ry' },
  { id: '4', title: 'Sjíždění Vltavy', start: new Date(year, month, 15), section: 'vt' },
  { id: '5', title: 'Český pohár #2', start: new Date(year, month + 1, 5), section: 'dv' },
  { id: '6', title: 'Mezinárodní regata', start: new Date(year, month + 1, 12), section: 'ry' },
  { id: '7', title: 'ME ve slalomu', start: new Date(year, month + 2, 8), section: 'dv' },
];

/**
 * Default card view showing months of events.
 */
export const Default: Story = {
  args: {
    events: sampleEvents,
    title: 'Nadcházející závody',
    onEventClick: (event) => console.log('Event clicked:', event),
  },
};

/**
 * Embed style for kanoe.cz integration.
 */
export const Embed: Story = {
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
      />
    </KanoeCzContext>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Calendar cards in embed mode for kanoe.cz integration.',
      },
    },
  },
};

/**
 * Empty state when no events.
 */
export const Empty: Story = {
  args: {
    events: [],
    title: 'Nadcházející závody',
    emptyMessage: 'Žádné naplánované závody',
  },
};
