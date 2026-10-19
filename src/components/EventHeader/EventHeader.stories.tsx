import type { Meta, StoryObj } from '@storybook/react';
import { EventHeader } from './EventHeader';
import { LivePlaceholder } from '../PageLayout/layoutStoryParts';

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
    status: <LivePlaceholder />,
    dataAge: 'aktualizováno před 1 s',
  },
};

export const Condensed: Story = { args: { ...Default.args, condensed: true } };

export const LongTitle: Story = {
  args: {
    ...Default.args,
    title: 'Mistrovství České republiky ve slalomu na divoké vodě 2026',
  },
};
