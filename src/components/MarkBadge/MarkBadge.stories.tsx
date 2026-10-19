import type { Meta, StoryObj } from '@storybook/react';
import { MarkBadge } from './MarkBadge';

const meta = {
  title: 'Components/MarkBadge',
  component: MarkBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Outlined result mark (DNS, DNF, DSQ…). Always shown instead of a time, never next to it.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: { mark: { control: 'select', options: ['DNS', 'DNS-A', 'DNS-B', 'DNF', 'DSQ', 'NR'] } },
  args: { mark: 'DNS' },
} satisfies Meta<typeof MarkBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const DNS: Story = { args: { mark: 'DNS' } };
export const DNF: Story = { args: { mark: 'DNF' } };
export const DSQ: Story = { args: { mark: 'DSQ' } };

export const AllMarks: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {(['DNS', 'DNS-A', 'DNS-B', 'DNF', 'DSQ', 'NR'] as const).map((m) => (
        <MarkBadge key={m} mark={m} />
      ))}
    </div>
  ),
};
