import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SegmentedControl, type SegmentedControlProps } from './SegmentedControl';

const days = [
  { value: 'sat', label: 'So 3. 10.' },
  { value: 'sun', label: 'Ne 4. 10.' },
];

const rounds = [
  { value: 'all', label: 'Všechna kola' },
  { value: 'q', label: 'Kvalifikace' },
  { value: 'sf', label: 'Semifinále' },
  { value: 'f', label: 'Finále' },
  { value: 'x', label: 'Mimo soutěž', disabled: true },
];

function Controlled(props: Omit<SegmentedControlProps, 'value' | 'onChange'> & { initial: string }) {
  const { initial, ...rest } = props;
  const [value, setValue] = useState(initial);
  return <SegmentedControl {...rest} value={value} onChange={setValue} />;
}

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items: days, value: 'sun', onChange: () => {} },
  render: () => <Controlled items={days} initial="sun" aria-label="Den závodu" />,
};

export const Sizes: Story = {
  args: { items: days, value: 'sun', onChange: () => {} },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Controlled items={days} initial="sat" size="md" aria-label="Den (md)" />
      <Controlled items={days} initial="sat" size="sm" aria-label="Den (sm)" />
    </div>
  ),
};

/** 360 px wide: when the row is full the whole segment wraps, labels never break. */
export const Wrapping360: Story = {
  args: { items: rounds, value: 'all', onChange: () => {} },
  render: () => (
    <div style={{ width: 360, border: '1px dashed currentColor', padding: 8 }}>
      <Controlled items={rounds} initial="all" aria-label="Kolo" />
    </div>
  ),
};
