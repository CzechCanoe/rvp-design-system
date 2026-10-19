import type { Meta, StoryObj } from '@storybook/react';
import { DeadlineBadge } from './DeadlineBadge';

const meta = {
  title: 'Components/DeadlineBadge',
  component: DeadlineBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Entry state of a race: open, closing (warning colour), closed, late entries. The application computes the text ("za 5 dní") and passes the formatted date, the component never reads the time. An expired deadline is neutral, not an error. No animation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: { kind: { control: 'select', options: ['open', 'closing', 'closed', 'late'] } },
  args: { kind: 'closing', label: 'Uzávěrka za 5 dní', date: 'st 13. 5. 23:59' },
} satisfies Meta<typeof DeadlineBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** All four kinds with the default texts and with the application's own text. */
export const AllKinds: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <DeadlineBadge kind="open" />
        <DeadlineBadge kind="closing" />
        <DeadlineBadge kind="closed" />
        <DeadlineBadge kind="late" date="pá 18:00" />
      </div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <DeadlineBadge kind="open" label="Přihlášky do 20. 5." date="st 20. 5. 23:59" />
        <DeadlineBadge kind="closing" label="Uzávěrka za 2 dny" date="st 13. 5. 23:59" />
        <DeadlineBadge kind="closing" label="Uzávěrka dnes" />
        <DeadlineBadge kind="closed" label="Přihlášky uzavřeny" />
      </div>
    </div>
  ),
};
