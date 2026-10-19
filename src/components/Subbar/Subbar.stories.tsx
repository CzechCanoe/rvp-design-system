import type { Meta, StoryObj } from '@storybook/react';
import { Subbar } from './Subbar';
import { subbarItems } from '../PageLayout/layoutStoryParts';

const meta: Meta<typeof Subbar> = {
  title: 'Components/Subbar',
  component: Subbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Secondary band (action blue, 40 px) below `Header variant="site"`.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Subbar>;

export const Default: Story = { args: { items: subbarItems } };

export const Overflow: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Subbar items={subbarItems} />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Items scroll horizontally when they do not fit.' } },
  },
};
