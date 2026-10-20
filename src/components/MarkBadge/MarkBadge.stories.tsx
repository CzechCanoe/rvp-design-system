import type { Meta, StoryObj } from '@storybook/react';
import { MarkBadge, MARK_DESCRIPTIONS, type Mark } from './MarkBadge';

const ALL_MARKS = Object.keys(MARK_DESCRIPTIONS) as Mark[];

const meta = {
  title: 'Components/MarkBadge',
  component: MarkBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Outlined result mark, always shown instead of a time, never next to it. The full vocabulary of the c123 ' +
          'contract: DNS (DNS-A excused, DNS-B not excused), DNF, DSQ, DSQ-R (disqualified in the run), DQB ' +
          '(unsportsmanlike behaviour), CAP (capsized), RAL (ranked as last: keeps its rank) and NR (raced, not ' +
          'ranked). The Czech description is the default `title`.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: { mark: { control: 'select', options: ALL_MARKS } },
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
      {ALL_MARKS.map((m) => (
        <MarkBadge key={m} mark={m} />
      ))}
    </div>
  ),
};
