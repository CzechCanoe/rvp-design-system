import type { Meta, StoryObj } from '@storybook/react';
import { WeekendCalendar } from './WeekendCalendar';
import { mayWeekends } from './WeekendCalendar.fixtures';

const meta = {
  title: 'Components/WeekendCalendar',
  component: WeekendCalendar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Season calendar by weekends with weekday races between them. The current weekend is marked by the application (`current`). Responds to the width of its container, not the viewport.',
      },
    },
  },
  tags: ['autodocs'],
  args: { weekends: mayWeekends, 'aria-label': 'Kalendář závodů, květen 2026' },
} satisfies Meta<typeof WeekendCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** A single weekend without the highlight. */
export const SingleWeekend: Story = {
  args: { weekends: [mayWeekends[0]] },
};

/** Current weekend plus a weekday race. */
export const CurrentWeekend: Story = {
  args: { weekends: mayWeekends.slice(1, 3) },
};

/** 360 px container: dates become a band, columns wrap under the title. */
export const InNarrowContainer: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <WeekendCalendar {...args} />
    </div>
  ),
  args: { weekends: mayWeekends.slice(0, 4) },
};
