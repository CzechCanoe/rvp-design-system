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
          'Penalty of one gate, a run\'s penalty sum or a team total. 0 clean (grey), 2 touch (amber), 50 miss (red), ' +
          'null = not judged (dotted frame, never 0). `upstream` is italic and underlined.\n\n' +
          '**With `gate`** (GateGrid, on-course panel, run detail) the chip shows the **gate number** and the colour ' +
          'carries the penalty; the penalty is in `title` (hover) and `aria-label` („Branka 3: 2 s“). ' +
          '**Without `gate`** (penalty sum after a run time, team totals) the chip shows the value.',
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

/** Without `gate`: the chip shows the value (penalty sum of a run, team totals). */
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

/**
 * With `gate`: the gate number, coloured by the penalty (reference Live1). Gates 1–5 clean / touch / miss /
 * upstream touch / upstream clean, 6–7 not judged yet (dotted frame, number kept). Hover shows the penalty.
 */
export const GateNumbers: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['md', 'sm'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <PenaltyChip gate={1} penalty={0} size={size} />
          <PenaltyChip gate={2} penalty={2} size={size} />
          <PenaltyChip gate={3} penalty={50} size={size} />
          <PenaltyChip gate={4} penalty={2} upstream size={size} />
          <PenaltyChip gate={5} penalty={0} upstream size={size} />
          <PenaltyChip gate={6} penalty={null} size={size} />
          <PenaltyChip gate={17} penalty={null} upstream size={size} />
        </div>
      ))}
    </div>
  ),
};
