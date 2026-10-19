import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FavoritesToggle } from './FavoritesToggle';

const meta = {
  title: 'Components/FavoritesToggle',
  component: FavoritesToggle,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FavoritesToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { pressed: false, count: 2, label: 'Jen oblíbení' },
  render: () => {
    const Demo = () => {
      const [on, setOn] = useState(false);
      return (
        <div style={{ display: 'flex', gap: 8 }}>
          <FavoritesToggle pressed={on} onPressedChange={setOn} count={2} label="Jen oblíbení" />
          <FavoritesToggle pressed count={12} label="Jen oblíbení" />
        </div>
      );
    };
    return <Demo />;
  },
};
