import type { Meta, StoryObj } from '@storybook/react';
import { PenaltyChip } from './PenaltyChip';

const meta = {
  title: 'Components/PenaltyChip',
  component: PenaltyChip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Penalty of one gate or a team total. 0 clean, 2 touch, 50 miss, null = not judged (dashed frame, never 0). `upstream` is italic and underlined.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['sm', 'md'] } },
  args: { penalty: 0, size: 'md' },
} satisfies Meta<typeof PenaltyChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Clean: Story = { args: { penalty: 0, gate: 3 } };
export const Touch: Story = { args: { penalty: 2, gate: 4 } };
export const Miss: Story = { args: { penalty: 50, gate: 5 } };
export const NotJudged: Story = { args: { penalty: null, gate: 6 } };
export const Upstream: Story = { args: { penalty: 2, gate: 7, upstream: true } };

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['md', 'sm'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <PenaltyChip penalty={0} size={size} />
          <PenaltyChip penalty={2} size={size} />
          <PenaltyChip penalty={50} size={size} />
          <PenaltyChip penalty={null} size={size} />
          <PenaltyChip penalty={2} upstream size={size} />
          <PenaltyChip penalty={52} size={size} />
          <PenaltyChip penalty={150} size={size} />
        </div>
      ))}
    </div>
  ),
};
