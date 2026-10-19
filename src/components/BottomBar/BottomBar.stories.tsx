import type { Meta, StoryObj } from '@storybook/react';
import { BottomBar } from './BottomBar';
import { bottomBarItems } from '../PageLayout/layoutStoryParts';

const meta: Meta<typeof BottomBar> = {
  title: 'Components/BottomBar',
  component: BottomBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Phone navigation (60 px, 44 px targets). Hidden when its container is 768 px or wider.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BottomBar>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: 390 }}>
      <BottomBar {...args} />
    </div>
  ),
  args: { items: bottomBarItems },
};

export const HiddenOnWideContainer: Story = {
  render: (args) => (
    <div style={{ padding: 16, color: 'var(--csk-color-text-3)' }}>
      Nothing is rendered below: the container is wider than 768 px.
      <BottomBar {...args} />
    </div>
  ),
  args: { items: bottomBarItems },
};
