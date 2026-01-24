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
      options: ['primary', 'secondary', 'ghost', 'danger', 'gradient', 'gradient-energy'],
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
    glow: {
      control: 'boolean',
      description: 'Adds energy glow effect on hover',
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
      <Button variant="gradient-energy">Energy</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants. Energy variant uses the vibrant coral-orange accent for CTAs.',
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
        story: 'Three sizes: sm (32px), md (40px), lg (52px). Large size uses display font (Plus Jakarta Sans) for prominent CTAs.',
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
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Default:</span>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="gradient">Gradient</Button>
        <Button variant="gradient-energy">Energy</Button>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Disabled:</span>
        <Button variant="primary" disabled>Primary</Button>
        <Button variant="secondary" disabled>Secondary</Button>
        <Button variant="ghost" disabled>Ghost</Button>
        <Button variant="danger" disabled>Danger</Button>
        <Button variant="gradient" disabled>Gradient</Button>
        <Button variant="gradient-energy" disabled>Energy</Button>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Loading:</span>
        <Button variant="primary" loading>Primary</Button>
        <Button variant="secondary" loading>Secondary</Button>
        <Button variant="ghost" loading>Ghost</Button>
        <Button variant="danger" loading>Danger</Button>
        <Button variant="gradient" loading>Gradient</Button>
        <Button variant="gradient-energy" loading>Energy</Button>
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
        <Button variant="gradient-energy" iconLeft={<PlusIcon />}>Launch</Button>
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

/* ==========================================================================
   GLOW EFFECT
   ========================================================================== */

export const GlowEffect: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button glow>Primary with Glow</Button>
      <Button variant="gradient" glow>Gradient with Glow</Button>
      <Button variant="gradient-energy" glow>Energy with Glow</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The `glow` prop adds an energy glow effect on hover. Works with any variant, most impactful on gradient buttons.',
      },
    },
  },
};

/* ==========================================================================
   AESTHETIC SHOWCASE - Large CTAs
   ========================================================================== */

export const AestheticCTA: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="gradient-energy" size="lg" glow>
          Sledovat live
        </Button>
        <Button variant="gradient" size="lg" glow>
          Registrovat závod
        </Button>
        <Button variant="primary" size="lg">
          Zobrazit výsledky
        </Button>
      </div>
      <div style={{ fontSize: '12px', color: '#666' }}>
        Large buttons use Plus Jakarta Sans display font with tighter letter-spacing for prominent CTAs.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Recommended combination for hero CTAs: large size + gradient-energy/gradient variant + glow effect.',
      },
    },
  },
};
