import type { Meta, StoryObj } from '@storybook/react';
import { EventHeader } from './EventHeader';
import { StatusBadge, type StatusBadgeState } from '../StatusBadge';
import { StoryDataAge } from '../PageLayout/layoutStoryParts';

const STATES: StatusBadgeState[] = ['official', 'provisional', 'review', 'unknown', 'live', 'stale'];

const meta: Meta<typeof EventHeader> = {
  title: 'Components/EventHeader',
  component: EventHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Compact header of the live view. `condensed` is the one-row state for a scrolled page; the application decides when to switch. `status` and `dataAge` are slots for StatusBadge and DataAge.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EventHeader>;

export const Default: Story = {
  args: {
    title: 'Olympic Hopes 2026',
    subtitle: 'Roudnice nad Labem · neděle 4. 10. · 2. jízdy',
    backHref: '#zavody',
    status: <StatusBadge state="live" />,
    dataAge: <StoryDataAge />,
  },
};

export const Condensed: Story = { args: { ...Default.args, condensed: true } };

export const LongTitle: Story = {
  args: {
    ...Default.args,
    title: 'Mistrovství České republiky ve slalomu na divoké vodě 2026',
  },
};

/**
 * Every StatusBadge state in the navy header (the status slot sets `data-tone="on-dark"`,
 * so the transparent "stale" state turns light). Checked by axe and snapshotted at 390 and 1280.
 */
export const StatusStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8 }}>
      {STATES.map((state) => (
        <EventHeader
          key={state}
          title="Olympic Hopes 2026"
          subtitle="Roudnice nad Labem · neděle 4. 10. · 2. jízdy"
          backHref="#zavody"
          status={<StatusBadge state={state} />}
          dataAge={<StoryDataAge />}
        />
      ))}
    </div>
  ),
};
