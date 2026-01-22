import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'gradient', 'gradient-accent'],
      description: 'Visual variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes the button take full width',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    children: {
      control: 'text',
      description: 'Button label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/* ==========================================================================
   DEFAULT
   ========================================================================== */

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

/* ==========================================================================
   VARIANTS
   ========================================================================== */

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="gradient">Gradient</Button>
      <Button variant="gradient-accent">Accent</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants.',
      },
    },
  },
};

/* ==========================================================================
   SIZES
   ========================================================================== */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three sizes: sm (32px), md (40px), lg (48px).',
      },
    },
  },
};

/* ==========================================================================
   STATES
   ========================================================================== */

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Default:</span>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="gradient">Gradient</Button>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Disabled:</span>
        <Button variant="primary" disabled>Primary</Button>
        <Button variant="secondary" disabled>Secondary</Button>
        <Button variant="ghost" disabled>Ghost</Button>
        <Button variant="danger" disabled>Danger</Button>
        <Button variant="gradient" disabled>Gradient</Button>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Loading:</span>
        <Button variant="primary" loading>Primary</Button>
        <Button variant="secondary" loading>Secondary</Button>
        <Button variant="ghost" loading>Ghost</Button>
        <Button variant="danger" loading>Danger</Button>
        <Button variant="gradient" loading>Gradient</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button states: default, disabled, and loading.',
      },
    },
  },
};

/* ==========================================================================
   WITH ICONS
   ========================================================================== */

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" />
  </svg>
);

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button iconLeft={<PlusIcon />}>Add Item</Button>
        <Button iconRight={<ArrowRightIcon />}>Continue</Button>
        <Button iconLeft={<PlusIcon />} iconRight={<ArrowRightIcon />}>Create & Continue</Button>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="danger" iconLeft={<TrashIcon />}>Delete</Button>
        <Button variant="gradient" iconRight={<ArrowRightIcon />}>Get Started</Button>
        <Button variant="gradient-accent" iconLeft={<PlusIcon />}>Launch</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with left icon, right icon, or both.',
      },
    },
  },
};

/* ==========================================================================
   FULL WIDTH
   ========================================================================== */

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};
