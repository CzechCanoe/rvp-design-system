import type { Meta, StoryObj } from '@storybook/react';
import { PodiumCard } from './PodiumCard';

const meta = {
  title: 'Components/PodiumCard',
  component: PodiumCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
PodiumCard displays an athlete or person on the podium (1st, 2nd, or 3rd place).
Used in results pages and rankings to highlight top performers.

## Features
- Distinctive styling for gold (1st), silver (2nd), bronze (3rd) positions
- Avatar with image or initials fallback
- Primary value (time, points) with optional label
- Secondary value (time difference)
- Clickable with arrow indicator
- Size variants (sm, md, lg)
- Dark mode support
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: [1, 2, 3],
      description: 'Position on podium (1 = gold, 2 = silver, 3 = bronze)',
    },
    name: {
      control: 'text',
      description: 'Athlete/person name',
    },
    club: {
      control: 'text',
      description: 'Club or team name',
    },
    imageUrl: {
      control: 'text',
      description: 'Optional image URL for avatar',
    },
    primaryValue: {
      control: 'text',
      description: 'Primary value to display (e.g., time, points)',
    },
    primaryLabel: {
      control: 'text',
      description: 'Optional label for primary value (e.g., "bodů")',
    },
    secondaryValue: {
      control: 'text',
      description: 'Secondary value to display (e.g., time difference)',
    },
    showArrow: {
      control: 'boolean',
      description: 'Show arrow indicator for clickable cards',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'minimal'],
      description: 'Style variant',
    },
  },
} satisfies Meta<typeof PodiumCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Basic Stories
// ============================================================================

/**
 * Gold (1st place) podium card with time value.
 */
export const Gold: Story = {
  args: {
    position: 1,
    name: 'Jiří Prskavec',
    club: 'USK Praha',
    primaryValue: '1:32.34',
    onClick: () => console.log('Clicked gold'),
    showArrow: true,
  },
};

/**
 * Silver (2nd place) podium card with time and difference.
 */
export const Silver: Story = {
  args: {
    position: 2,
    name: 'Vít Přindiš',
    club: 'USK Praha',
    primaryValue: '1:33.87',
    secondaryValue: '+1.53',
    onClick: () => console.log('Clicked silver'),
    showArrow: true,
  },
};

/**
 * Bronze (3rd place) podium card with time and difference.
 */
export const Bronze: Story = {
  args: {
    position: 3,
    name: 'Jakub Krejčí',
    club: 'Dukla Praha',
    primaryValue: '1:34.21',
    secondaryValue: '+1.87',
    onClick: () => console.log('Clicked bronze'),
    showArrow: true,
  },
};

// ============================================================================
// Use Case Stories
// ============================================================================

/**
 * Podium card for rankings with points display.
 */
export const WithPoints: Story = {
  args: {
    position: 1,
    name: 'Tereza Fišerová',
    club: 'Dukla Praha',
    primaryValue: '1,245',
    primaryLabel: 'bodů',
  },
};

/**
 * Podium card with avatar image.
 */
export const WithImage: Story = {
  args: {
    position: 1,
    name: 'Jiří Prskavec',
    club: 'USK Praha',
    imageUrl: 'https://i.pravatar.cc/150?img=33',
    primaryValue: '1:32.34',
    onClick: () => console.log('Clicked'),
    showArrow: true,
  },
};

/**
 * Minimal variant without background styling.
 */
export const Minimal: Story = {
  args: {
    position: 2,
    name: 'Vít Přindiš',
    club: 'USK Praha',
    primaryValue: '1,180',
    primaryLabel: 'bodů',
    variant: 'minimal',
  },
};

/**
 * Non-clickable card (no onClick, no arrow).
 */
export const NonClickable: Story = {
  args: {
    position: 1,
    name: 'Lukáš Rohan',
    club: 'USK Praha',
    primaryValue: '1:36.78',
  },
};

// ============================================================================
// Size Variants
// ============================================================================

/**
 * Small size variant.
 */
export const SizeSmall: Story = {
  args: {
    position: 1,
    name: 'Jiří Prskavec',
    club: 'USK Praha',
    primaryValue: '1:32.34',
    size: 'sm',
    onClick: () => console.log('Clicked'),
    showArrow: true,
  },
};

/**
 * Large size variant.
 */
export const SizeLarge: Story = {
  args: {
    position: 1,
    name: 'Jiří Prskavec',
    club: 'USK Praha',
    primaryValue: '1:32.34',
    size: 'lg',
    onClick: () => console.log('Clicked'),
    showArrow: true,
  },
};

// ============================================================================
// All Positions
// ============================================================================

/**
 * All three podium positions displayed together.
 */
export const AllPositions: Story = {
  args: {
    position: 1,
    name: 'Jiří Prskavec',
    club: 'USK Praha',
    primaryValue: '1:32.34',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <PodiumCard
        position={1}
        name="Jiří Prskavec"
        club="USK Praha"
        primaryValue="1:32.34"
        onClick={() => console.log('Gold')}
        showArrow
      />
      <PodiumCard
        position={2}
        name="Vít Přindiš"
        club="USK Praha"
        primaryValue="1:33.87"
        secondaryValue="+1.53"
        onClick={() => console.log('Silver')}
        showArrow
      />
      <PodiumCard
        position={3}
        name="Jakub Krejčí"
        club="Dukla Praha"
        primaryValue="1:34.21"
        secondaryValue="+1.87"
        onClick={() => console.log('Bronze')}
        showArrow
      />
    </div>
  ),
};

/**
 * Rankings style with points for all positions.
 */
export const RankingsStyle: Story = {
  args: {
    position: 1,
    name: 'Tereza Fišerová',
    club: 'Dukla Praha',
    primaryValue: '1,245',
    primaryLabel: 'bodů',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <PodiumCard
        position={1}
        name="Tereza Fišerová"
        club="Dukla Praha"
        primaryValue="1,245"
        primaryLabel="bodů"
      />
      <PodiumCard
        position={2}
        name="Kateřina Kudějová"
        club="USK Praha"
        primaryValue="1,180"
        primaryLabel="bodů"
      />
      <PodiumCard
        position={3}
        name="Antonie Galušková"
        club="Dukla Praha"
        primaryValue="1,056"
        primaryLabel="bodů"
      />
    </div>
  ),
};

/**
 * Horizontal grid layout (typical podium display).
 */
export const HorizontalGrid: Story = {
  args: {
    position: 1,
    name: 'Jiří Prskavec',
    club: 'USK Praha',
    primaryValue: '1:32.34',
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '800px' }}>
      <PodiumCard
        position={1}
        name="Jiří Prskavec"
        club="USK Praha"
        primaryValue="1:32.34"
        onClick={() => console.log('Gold')}
        showArrow
      />
      <PodiumCard
        position={2}
        name="Vít Přindiš"
        club="USK Praha"
        primaryValue="1:33.87"
        secondaryValue="+1.53"
        onClick={() => console.log('Silver')}
        showArrow
      />
      <PodiumCard
        position={3}
        name="Jakub Krejčí"
        club="Dukla Praha"
        primaryValue="1:34.21"
        secondaryValue="+1.87"
        onClick={() => console.log('Bronze')}
        showArrow
      />
    </div>
  ),
};

/**
 * Size comparison across all sizes.
 */
export const SizeComparison: Story = {
  args: {
    position: 1,
    name: 'Jiří Prskavec',
    club: 'USK Praha',
    primaryValue: '1:32.34',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px', fontSize: '14px', color: '#666' }}>Small</h4>
        <PodiumCard
          position={1}
          name="Jiří Prskavec"
          club="USK Praha"
          primaryValue="1:32.34"
          size="sm"
          onClick={() => {}}
          showArrow
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px', fontSize: '14px', color: '#666' }}>Medium (default)</h4>
        <PodiumCard
          position={1}
          name="Jiří Prskavec"
          club="USK Praha"
          primaryValue="1:32.34"
          size="md"
          onClick={() => {}}
          showArrow
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px', fontSize: '14px', color: '#666' }}>Large</h4>
        <PodiumCard
          position={1}
          name="Jiří Prskavec"
          club="USK Praha"
          primaryValue="1:32.34"
          size="lg"
          onClick={() => {}}
          showArrow
        />
      </div>
    </div>
  ),
};
