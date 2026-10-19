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

/** Inside a container with `data-tone="on-dark"` (navy band) the tile is a translucent white pad. */
export const OnDark: Story = {
  render: () => (
    <div data-tone="on-dark" style={{ display: 'flex', gap: 8, padding: 16, background: 'var(--csk-color-brand)' }}>
      <StatTile label="VT slalom" value="1" style={{ width: 110 }} />
      <StatTile label="ČP 2026" value="4." delta="▲2" style={{ width: 110 }} />
    </div>
  ),
};
