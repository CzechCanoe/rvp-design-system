import type { Meta, StoryObj } from '@storybook/react';
import { StatTile } from './StatTile';

const meta = {
  title: 'Components/StatTile',
  component: StatTile,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'Number tile with label, value, optional hint and delta. Replaces StatCard.' } },
  },
  tags: ['autodocs'],
  args: { label: 'Přihlášeno', value: 128, style: { width: 200 } },
} satisfies Meta<typeof StatTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: 'z 6 oddílů' } };
export const WithDelta: Story = { args: { delta: '▲2', hint: 'od včerejška' } };
