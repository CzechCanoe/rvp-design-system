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
      options: ['surface', 'elevated', 'outlined', 'gradient', 'glass', 'featured'],
      description: 'Visual variant of the card',
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

// Basic examples
export const Surface: Story = {
  args: {
    variant: 'surface',
    children: 'This is a surface card with a subtle background.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'This is an elevated card with a shadow.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'This is an outlined card with a visible border.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: 'This is a gradient card with primary brand colors.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    children: 'This is a glass card with backdrop blur effect.',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '320px',
          padding: '40px',
          background: 'linear-gradient(135deg, #1176a6 0%, #0d5a80 100%)',
          borderRadius: '8px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Featured: Story = {
  args: {
    variant: 'featured',
    children: 'This is a featured card with gradient border and glow effect.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

// Padding sizes
export const PaddingNone: Story = {
  args: {
    padding: 'none',
    variant: 'outlined',
    children: (
      <img
        src="https://images.unsplash.com/photo-1533582379983-c2bb4cb97b31?w=400&h=200&fit=crop"
        alt="Kayaker"
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const PaddingSmall: Story = {
  args: {
    padding: 'sm',
    variant: 'surface',
    children: 'Small padding card - compact content display.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const PaddingLarge: Story = {
  args: {
    padding: 'lg',
    variant: 'surface',
    children: 'Large padding card - generous spacing for emphasis.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

// With header and footer
export const WithHeader: Story = {
  args: {
    variant: 'elevated',
    header: <strong>Card Title</strong>,
    children: 'Card content with a header above.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithFooter: Story = {
  args: {
    variant: 'elevated',
    children: 'Card content with a footer below.',
    footer: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button variant="ghost" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
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
};

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
};

// Clickable cards
export const Clickable: Story = {
  args: {
    variant: 'elevated',
    clickable: true,
    children: 'Click this card to interact. It has hover and active states.',
    onClick: () => alert('Card clicked!'),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ClickableSurface: Story = {
  args: {
    variant: 'surface',
    clickable: true,
    children: 'Clickable surface card with hover state.',
    onClick: () => alert('Surface card clicked!'),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ClickableOutlined: Story = {
  args: {
    variant: 'outlined',
    clickable: true,
    children: 'Clickable outlined card with border highlight on hover.',
    onClick: () => alert('Outlined card clicked!'),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ClickableGradient: Story = {
  args: {
    variant: 'gradient',
    clickable: true,
    children: 'Clickable gradient card with enhanced hover state.',
    onClick: () => alert('Gradient card clicked!'),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ClickableFeatured: Story = {
  args: {
    variant: 'featured',
    clickable: true,
    children: 'Clickable featured card with glow on hover.',
    onClick: () => alert('Featured card clicked!'),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

// Link cards
export const AsLink: Story = {
  args: {
    variant: 'elevated',
    href: '#athlete-profile',
    children: 'This card is a link. Click to navigate.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ExternalLink: Story = {
  args: {
    variant: 'outlined',
    href: 'https://canoe.cz',
    target: '_blank',
    children: 'External link card - opens in new tab.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ width: '220px' }}>
        <Card variant="surface">
          <strong>Surface</strong>
          <p style={{ margin: '8px 0 0', fontSize: '14px' }}>Subtle background</p>
        </Card>
      </div>
      <div style={{ width: '220px' }}>
        <Card variant="elevated">
          <strong>Elevated</strong>
          <p style={{ margin: '8px 0 0', fontSize: '14px' }}>Shadow elevation</p>
        </Card>
      </div>
      <div style={{ width: '220px' }}>
        <Card variant="outlined">
          <strong>Outlined</strong>
          <p style={{ margin: '8px 0 0', fontSize: '14px' }}>Visible border</p>
        </Card>
      </div>
      <div style={{ width: '220px' }}>
        <Card variant="gradient">
          <strong>Gradient</strong>
          <p style={{ margin: '8px 0 0', fontSize: '14px' }}>Brand gradient</p>
        </Card>
      </div>
      <div
        style={{
          width: '220px',
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
      <div style={{ width: '220px' }}>
        <Card variant="featured">
          <strong>Featured</strong>
          <p style={{ margin: '8px 0 0', fontSize: '14px' }}>Gradient border + glow</p>
        </Card>
      </div>
    </div>
  ),
};

// CSK-specific examples
export const AthleteCard: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Card variant="elevated" clickable padding="none">
        <div style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              color: 'var(--color-primary-600)',
            }}
          >
            JN
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>Jan Novák</div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              SK Slavia Praha
            </div>
          </div>
          <div
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              backgroundColor: 'var(--color-section-dv)',
              color: 'white',
              fontSize: '12px',
              fontWeight: 500,
            }}
          >
            DV
          </div>
        </div>
      </Card>
    </div>
  ),
};

export const EventCard: Story = {
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
};

export const ResultCard: Story = {
  render: () => (
    <div style={{ width: '280px' }}>
      <Card variant="surface" padding="sm">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-warning-500)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '14px',
              }}
            >
              2
            </span>
            <div>
              <div style={{ fontWeight: 600 }}>Jan Novák</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                SK Slavia Praha
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontWeight: 600,
                fontSize: '16px',
              }}
            >
              95.47
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'var(--color-error-500)',
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              +2.34
            </div>
          </div>
        </div>
      </Card>
    </div>
  ),
};

export const StatCard: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <div style={{ width: '160px' }}>
        <Card variant="surface" padding="md">
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 700,
                color: 'var(--color-primary-500)',
              }}
            >
              156
            </div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Registrovaní závodníci
            </div>
          </div>
        </Card>
      </div>
      <div style={{ width: '160px' }}>
        <Card variant="surface" padding="md">
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 700,
                color: 'var(--color-success-500)',
              }}
            >
              24
            </div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Aktivní přihlášky
            </div>
          </div>
        </Card>
      </div>
      <div style={{ width: '160px' }}>
        <Card variant="surface" padding="md">
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 700,
                color: 'var(--color-warning-500)',
              }}
            >
              8
            </div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Nadcházející závody
            </div>
          </div>
        </Card>
      </div>
    </div>
  ),
};
