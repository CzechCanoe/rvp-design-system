import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FavoritesToggle } from './FavoritesToggle';

const meta = {
  title: 'Components/FavoritesToggle',
  component: FavoritesToggle,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '„Favourites only“ filter: „★ N“ with favourites, just ☆ with none. The pressed state is the navy pill. ' +
          '34 px visible pill inside a 44 px touch target; the state is owned by the application.',
      },
    },
  },
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

/** Count 0 shows only ☆ (no „0“); otherwise „★ N“. Off and pressed for both. */
export const Counts: Story = {
  args: { pressed: false, count: 0, label: 'Jen oblíbení' },
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <FavoritesToggle pressed={false} count={0} label="Jen oblíbení" />
      <FavoritesToggle pressed count={0} label="Jen oblíbení" />
      <FavoritesToggle pressed={false} count={2} label="Jen oblíbení" />
      <FavoritesToggle pressed count={2} label="Jen oblíbení" />
    </div>
  ),
};
