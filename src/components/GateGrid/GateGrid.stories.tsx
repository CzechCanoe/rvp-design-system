import type { Meta, StoryObj } from '@storybook/react';
import { GateGrid, type GateGridGate } from './GateGrid';

const gates: GateGridGate[] = Array.from({ length: 24 }, (_, i) => ({
  gate: i + 1,
  penalty: i === 4 ? 2 : i === 11 ? 50 : i > 20 ? null : 0,
  upstream: i === 7 || i === 15 || i === 18,
}));

const meta = {
  title: 'Components/GateGrid',
  component: GateGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Wrapping grid of per-gate penalties. Each chip shows the gate number; the colour carries the penalty ' +
          '(grey 0, amber 2, red 50, dotted frame = not judged yet), the penalty is in `title` (hover) and ' +
          '`aria-label`. `unavailable` shows "bez konfigurace tratě".',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['sm', 'md'] }, unavailable: { control: 'boolean' } },
  args: { gates, size: 'md', style: { maxWidth: 320 } },
} satisfies Meta<typeof GateGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const Unavailable: Story = { args: { unavailable: true } };
