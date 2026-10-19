import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';

const meta = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'State of a value: Oficiální, Předběžné, V revizi, Neznámo, Live, Zastaveno. Provisional and review can apply together, so they differ in colour and shape. Red is only for Live; its dot pulses unless prefers-reduced-motion is set.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['official', 'provisional', 'review', 'unknown', 'live', 'stale'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: { state: 'official', size: 'md' },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Official: Story = { args: { state: 'official' } };
export const Provisional: Story = { args: { state: 'provisional' } };
export const Review: Story = { args: { state: 'review' } };
export const Unknown: Story = { args: { state: 'unknown' } };
export const Live: Story = { args: { state: 'live' } };
export const Stale: Story = { args: { state: 'stale' } };

export const ProvisionalAndReview: Story = {
  render: () => (
    <span style={{ display: 'inline-flex', gap: 8 }}>
      <StatusBadge state="provisional" />
      <StatusBadge state="review" />
    </span>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['md', 'sm'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {(['official', 'provisional', 'review', 'unknown', 'live', 'stale'] as const).map((s) => (
            <StatusBadge key={s} state={s} size={size} />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const CustomLabel: Story = { args: { state: 'provisional', label: 'Průběžné pořadí' } };
