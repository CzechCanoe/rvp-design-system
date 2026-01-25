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
          'Chronological list view for calendar events. Alternative to grid Calendar, useful for embed contexts and mobile views.',
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
      options: ['default', 'embed'],
      description: 'Style variant - default or embed for kanoe.cz',
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
  },
} satisfies Meta<typeof CalendarList>;

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
  { id: '5', title: 'Český pohár #2', start: new Date(year, month, 17), section: 'dv' },
  { id: '6', title: 'Nominace na MS', start: new Date(year, month, 24), section: 'dv' },
];

/**
 * Default list view with events.
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
        story: 'Calendar list in embed mode for kanoe.cz integration.',
      },
    },
  },
};

/**
 * Compact variant for sidebars.
 */
export const Compact: Story = {
  args: {
    events: sampleEvents,
    variant: 'compact',
    title: 'Kalendář',
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
