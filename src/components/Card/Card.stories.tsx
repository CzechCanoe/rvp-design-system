import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['surface', 'elevated', 'outlined', 'gradient', 'glass', 'featured', 'aesthetic'],
      description: 'Visual variant of the card',
    },
    meshBg: {
      control: 'boolean',
      description: 'Add mesh background effect',
    },
    borderAccent: {
      control: 'boolean',
      description: 'Add border-accent on left side',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding inside the card body',
    },
    clickable: {
      control: 'boolean',
      description: 'Makes the card clickable with hover/active states',
    },
    href: {
      control: 'text',
      description: 'Makes the card a link',
    },
    header: {
      control: false,
      description: 'Header content',
    },
    footer: {
      control: false,
      description: 'Footer content',
    },
    children: {
      control: 'text',
      description: 'Card body content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

/* ==========================================================================
   DEFAULT
   ========================================================================== */

export const Default: Story = {
  args: {
    variant: 'elevated',
    children: 'Card content goes here.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

/* ==========================================================================
   VARIANTS
   ========================================================================== */

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ width: '200px' }}>
        <Card variant="surface">
          <strong>Surface</strong>
          <p style={{ margin: '8px 0 0', fontSize: '14px' }}>Subtle background</p>
        </Card>
      </div>
      <div style={{ width: '200px' }}>
        <Card variant="elevated">
          <strong>Elevated</strong>
          <p style={{ margin: '8px 0 0', fontSize: '14px' }}>Shadow elevation</p>
        </Card>
      </div>
      <div style={{ width: '200px' }}>
        <Card variant="outlined">
          <strong>Outlined</strong>
          <p style={{ margin: '8px 0 0', fontSize: '14px' }}>Visible border</p>
        </Card>
      </div>
      <div style={{ width: '200px' }}>
        <Card variant="gradient">
          <strong>Gradient</strong>
          <p style={{ margin: '8px 0 0', fontSize: '14px' }}>Brand gradient</p>
        </Card>
      </div>
      <div
        style={{
          width: '200px',
          padding: '16px',
          background: 'linear-gradient(135deg, #1176a6 0%, #0d5a80 100%)',
          borderRadius: '8px',
        }}
      >
        <Card variant="glass">
          <strong>Glass</strong>
          <p style={{ margin: '8px 0 0', fontSize: '14px' }}>Glassmorphism</p>
        </Card>
      </div>
      <div style={{ width: '200px' }}>
        <Card variant="featured">
          <strong>Featured</strong>
          <p style={{ margin: '8px 0 0', fontSize: '14px' }}>Gradient border</p>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available card variants: surface, elevated, outlined, gradient, glass, and featured.',
      },
    },
  },
};

/* ==========================================================================
   PADDING
   ========================================================================== */

export const Padding: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
      <div style={{ width: '150px' }}>
        <Card padding="none" variant="outlined">
          <img
            src="https://images.unsplash.com/photo-1533582379983-c2bb4cb97b31?w=400&h=100&fit=crop"
            alt="Kayaker"
            style={{ width: '100%', height: '80px', objectFit: 'cover' }}
          />
        </Card>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>none</p>
      </div>
      <div style={{ width: '150px' }}>
        <Card padding="sm" variant="outlined">Small padding</Card>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>sm</p>
      </div>
      <div style={{ width: '150px' }}>
        <Card padding="md" variant="outlined">Medium padding</Card>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>md (default)</p>
      </div>
      <div style={{ width: '150px' }}>
        <Card padding="lg" variant="outlined">Large padding</Card>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>lg</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Padding options: none, sm, md (default), lg.',
      },
    },
  },
};

/* ==========================================================================
   WITH HEADER AND FOOTER
   ========================================================================== */

export const WithHeaderAndFooter: Story = {
  args: {
    variant: 'elevated',
    header: (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>Event Details</strong>
        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
          15.6.2026
        </span>
      </div>
    ),
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0 }}>MČR ve slalomu na divoké vodě</p>
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Lipno nad Vltavou
        </p>
      </div>
    ),
    footer: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="secondary" size="sm" fullWidth>
          Detail
        </Button>
        <Button size="sm" fullWidth>
          Přihlásit
        </Button>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Card with header and footer sections.',
      },
    },
  },
};

/* ==========================================================================
   CLICKABLE
   ========================================================================== */

export const Clickable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <div style={{ width: '200px' }}>
        <Card variant="elevated" clickable onClick={() => alert('Clicked!')}>
          <strong>Clickable Card</strong>
          <p style={{ margin: '8px 0 0', fontSize: '14px' }}>Click me</p>
        </Card>
      </div>
      <div style={{ width: '200px' }}>
        <Card variant="outlined" href="#link">
          <strong>Link Card</strong>
          <p style={{ margin: '8px 0 0', fontSize: '14px' }}>I'm a link</p>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cards can be clickable (button) or links (anchor).',
      },
    },
  },
};

/* ==========================================================================
   CSK EXAMPLE: EVENT CARD
   ========================================================================== */

export const EventCard: Story = {
  name: 'Example: Event Card',
  render: () => (
    <div style={{ width: '320px' }}>
      <Card
        variant="elevated"
        padding="none"
        header={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: 'var(--color-section-dv)',
                color: 'white',
                fontSize: '12px',
                fontWeight: 500,
              }}
            >
              Slalom
            </span>
            <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              15. – 16. 6. 2026
            </span>
          </div>
        }
        footer={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="secondary" size="sm" fullWidth>
              Výsledky
            </Button>
            <Button size="sm" fullWidth>
              Přihlášky
            </Button>
          </div>
        }
      >
        <div style={{ padding: '16px' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 600 }}>
            MČR ve slalomu
          </h3>
          <p style={{ margin: '0', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Lipno nad Vltavou
          </p>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Event card example with discipline badge, dates, and action buttons.',
      },
    },
  },
};

/* ==========================================================================
   AESTHETIC VARIANT - Dynamic Sport
   ========================================================================== */

export const Aesthetic: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <div style={{ width: '280px' }}>
        <Card variant="aesthetic">
          <h3 className="csk-card__title" style={{ margin: '0 0 8px', fontSize: '18px' }}>
            Aesthetic Card
          </h3>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Mesh background with border-accent gradient. Perfect for featured content.
          </p>
        </Card>
      </div>
      <div style={{ width: '280px' }}>
        <Card variant="aesthetic" clickable>
          <h3 className="csk-card__title" style={{ margin: '0 0 8px', fontSize: '18px' }}>
            Clickable Aesthetic
          </h3>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Hover for energy glow effect.
          </p>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Aesthetic variant with mesh background, border-accent gradient, and display font titles.',
      },
    },
  },
};

/* ==========================================================================
   MODIFIERS - Mesh Background & Border Accent
   ========================================================================== */

export const Modifiers: Story = {
  name: 'Modifiers (meshBg, borderAccent)',
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <div style={{ width: '240px' }}>
        <Card variant="elevated" meshBg>
          <strong>Mesh Background</strong>
          <p style={{ margin: '8px 0 0', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Elevated + meshBg modifier
          </p>
        </Card>
      </div>
      <div style={{ width: '240px' }}>
        <Card variant="surface" borderAccent>
          <strong>Border Accent</strong>
          <p style={{ margin: '8px 0 0', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Surface + borderAccent modifier
          </p>
        </Card>
      </div>
      <div style={{ width: '240px' }}>
        <Card variant="elevated" meshBg borderAccent>
          <strong>Both Modifiers</strong>
          <p style={{ margin: '8px 0 0', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Elevated + meshBg + borderAccent
          </p>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Modifiers can be combined with any variant to add mesh background or border-accent.',
      },
    },
  },
};

/* ==========================================================================
   AESTHETIC EXAMPLE: LIVE EVENT
   ========================================================================== */

export const AestheticLiveEvent: Story = {
  name: 'Example: Aesthetic Live Event',
  render: () => (
    <div style={{ width: '360px' }}>
      <Card
        variant="aesthetic"
        clickable
        header={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%)',
                color: 'white',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'white',
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
              ŽIVĚ
            </span>
            <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              Semifinále K1M
            </span>
          </div>
        }
        footer={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="secondary" size="sm" fullWidth>
              Výsledky
            </Button>
            <Button variant="gradient-energy" size="sm" fullWidth glow>
              Sledovat live
            </Button>
          </div>
        }
      >
        <div style={{ padding: '4px 0' }}>
          <h3
            className="csk-card__title"
            style={{
              margin: '0 0 6px',
              fontSize: '20px',
            }}
          >
            Český pohár #3
          </h3>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Praha Troja • 24. ledna 2026
          </p>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Live event card using aesthetic variant with energy badge and CTA button.',
      },
    },
  },
};
