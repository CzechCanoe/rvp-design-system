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

// Basic examples
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete',
  },
};

// New gradient variants
export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: 'Gradient Button',
  },
};

export const GradientAccent: Story = {
  args: {
    variant: 'gradient-accent',
    children: 'Get Started',
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

// States
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

export const LoadingDanger: Story = {
  args: {
    variant: 'danger',
    loading: true,
    children: 'Deleting...',
  },
};

export const LoadingGradient: Story = {
  args: {
    variant: 'gradient',
    loading: true,
    children: 'Processing...',
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};

// With icons (using inline SVGs as example)
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

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

export const WithLeftIcon: Story = {
  args: {
    iconLeft: <PlusIcon />,
    children: 'Add Item',
  },
};

export const WithRightIcon: Story = {
  args: {
    iconRight: <ArrowRightIcon />,
    children: 'Continue',
  },
};

export const WithBothIcons: Story = {
  args: {
    iconLeft: <PlusIcon />,
    iconRight: <ArrowRightIcon />,
    children: 'Create & Continue',
  },
};

export const DangerWithIcon: Story = {
  args: {
    variant: 'danger',
    iconLeft: <TrashIcon />,
    children: 'Delete Item',
  },
};

export const GradientWithIcon: Story = {
  args: {
    variant: 'gradient',
    iconRight: <ArrowRightIcon />,
    children: 'Start Now',
  },
};

export const GradientAccentWithIcon: Story = {
  args: {
    variant: 'gradient-accent',
    iconLeft: <RocketIcon />,
    children: 'Launch',
  },
};

// All variants showcase
export const AllVariants: Story = {
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
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// Gradient sizes showcase
export const GradientSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="gradient" size="sm">Small</Button>
      <Button variant="gradient" size="md">Medium</Button>
      <Button variant="gradient" size="lg">Large</Button>
    </div>
  ),
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Default:</span>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="gradient">Gradient</Button>
        <Button variant="gradient-accent">Accent</Button>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Disabled:</span>
        <Button variant="primary" disabled>Primary</Button>
        <Button variant="secondary" disabled>Secondary</Button>
        <Button variant="ghost" disabled>Ghost</Button>
        <Button variant="danger" disabled>Danger</Button>
        <Button variant="gradient" disabled>Gradient</Button>
        <Button variant="gradient-accent" disabled>Accent</Button>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Loading:</span>
        <Button variant="primary" loading>Primary</Button>
        <Button variant="secondary" loading>Secondary</Button>
        <Button variant="ghost" loading>Ghost</Button>
        <Button variant="danger" loading>Danger</Button>
        <Button variant="gradient" loading>Gradient</Button>
        <Button variant="gradient-accent" loading>Accent</Button>
      </div>
    </div>
  ),
};

// Hero CTA example
export const HeroCTA: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      gap: '16px',
      padding: '48px',
      background: 'linear-gradient(135deg, #0b4664 0%, #041721 100%)',
      borderRadius: '12px'
    }}>
      <Button variant="gradient-accent" size="lg">
        Get Started Free
      </Button>
      <Button variant="ghost" size="lg" style={{ color: 'white' }}>
        Learn More
      </Button>
    </div>
  ),
};
