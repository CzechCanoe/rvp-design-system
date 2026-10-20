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
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
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
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants: primary for main CTAs, secondary for alternative actions, ghost for minimal emphasis, danger for destructive actions.',
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
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Two sizes: sm (32 px) and md (40 px); both keep a minimum touch width of 44 px.',
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
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Disabled:</span>
        <Button variant="primary" disabled>Primary</Button>
        <Button variant="secondary" disabled>Secondary</Button>
        <Button variant="ghost" disabled>Ghost</Button>
        <Button variant="danger" disabled>Danger</Button>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Loading:</span>
        <Button variant="primary" loading>Primary</Button>
        <Button variant="secondary" loading>Secondary</Button>
        <Button variant="ghost" loading>Ghost</Button>
        <Button variant="danger" loading>Danger</Button>
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
        <Button variant="secondary" iconRight={<ArrowRightIcon />}>Get Started</Button>
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
   SMALL VARIANTS
   ========================================================================== */

export const SmallVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="sm" variant="primary">Primary</Button>
      <Button size="sm" variant="secondary">Secondary</Button>
      <Button size="sm" variant="ghost">Ghost</Button>
      <Button size="sm" variant="danger">Danger</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Every variant at size sm (32 px high, 44 px minimum touch width).',
      },
    },
  },
};

/* ==========================================================================
   LINK FORM
   ========================================================================== */

/**
 * `href` (or `as="a"`) renders an `<a>` with the identical look, focus ring and sizes, for navigation:
 * documents, "Přihlásit", a phase on the live page. Actions stay buttons.
 * A disabled link drops `href` (not focusable, not navigable) and carries `aria-disabled`;
 * `target="_blank"` gets `rel="noopener noreferrer"` unless `rel` is given.
 */
export const AsLink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button href="#prihlasit">Přihlásit</Button>
        <Button href="#propozice" variant="secondary">
          Propozice (PDF)
        </Button>
        <Button href="#pridat" variant="ghost">
          + Přidat do K1 muži
        </Button>
        <Button href="#odhlasit" variant="danger">
          Odhlásit oddíl
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button as="a" href="#k1m2" size="sm">
          K1 muži · 2. jízda
        </Button>
        <Button href="#c1w2" size="sm" variant="secondary">
          C1 ženy · 2. jízda
        </Button>
        <Button
          href="https://www.canoeicf.com"
          target="_blank"
          size="sm"
          variant="secondary"
          iconRight={<ArrowRightIcon />}
        >
          canoeicf.com
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button href="#prihlasit" disabled>
          Přihlásit (disabled)
        </Button>
        <Button href="#propozice" variant="secondary" disabled>
          Propozice (disabled)
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Link form: `href` / `as="a"`, same look as the button. Disabled links have no `href` and `aria-disabled="true"`.',
      },
    },
  },
};
