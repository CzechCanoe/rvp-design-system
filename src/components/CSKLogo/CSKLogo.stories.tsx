import type { Meta, StoryObj } from '@storybook/react';
import { CSKLogo } from './CSKLogo';

const meta: Meta<typeof CSKLogo> = {
  title: 'Components/CSKLogo',
  component: CSKLogo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithSubtitle: Story = {
  args: {
    subtitle: 'Český svaz kanoistů',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    subtitle: 'Český svaz kanoistů',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    subtitle: 'Český svaz kanoistů',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    subtitle: 'Český svaz kanoistů',
  },
};

export const AsLink: Story = {
  args: {
    href: 'https://kanoe.cz',
    subtitle: 'Český svaz kanoistů',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <CSKLogo size="sm" subtitle="Small" />
      <CSKLogo size="md" subtitle="Medium (default)" />
      <CSKLogo size="lg" subtitle="Large" />
    </div>
  ),
};
