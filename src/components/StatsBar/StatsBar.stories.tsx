import type { Meta, StoryObj } from '@storybook/react';
import { StatsBar } from './StatsBar';
import type { StatsBarItem } from './StatsBar';

const meta: Meta<typeof StatsBar> = {
  title: 'Layout/StatsBar',
  component: StatsBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['inline', 'cards', 'compact', 'floating'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    dividers: {
      control: 'boolean',
      description: 'Show dividers between items (inline variant only)',
    },
    centered: {
      control: 'boolean',
      description: 'Center align the stats',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatsBar>;

const eventStats: StatsBarItem[] = [
  { key: 'entries', value: '156', label: 'Entries', icon: 'users' },
  { key: 'clubs', value: '24', label: 'Clubs', icon: 'building' },
  { key: 'gates', value: '23', label: 'Gates', icon: 'activity' },
  { key: 'length', value: '280m', label: 'Course', icon: 'map' },
];

const athleteStats: StatsBarItem[] = [
  { key: 'races', value: '47', label: 'Races', icon: 'trophy' },
  { key: 'medals', value: '12', label: 'Medals', icon: 'medal' },
  { key: 'points', value: '2,450', label: 'Points', icon: 'star' },
  { key: 'rank', value: '#3', label: 'Ranking', icon: 'trend-up' },
];

const clubStats: StatsBarItem[] = [
  { key: 'athletes', value: '89', label: 'Athletes', icon: 'users' },
  { key: 'coaches', value: '8', label: 'Coaches', icon: 'user' },
  { key: 'events', value: '12', label: 'Events', icon: 'calendar' },
];

/* ==========================================================================
   DEFAULT
   ========================================================================== */

export const Default: Story = {
  args: {
    items: eventStats,
    variant: 'inline',
    size: 'md',
  },
};

/* ==========================================================================
   VARIANTS
   ========================================================================== */

export const Inline: Story = {
  args: {
    items: eventStats,
    variant: 'inline',
  },
  parameters: {
    docs: {
      description: {
        story: 'Horizontal row with icon, value, and label inline.',
      },
    },
  },
};

export const InlineWithDividers: Story = {
  args: {
    items: eventStats,
    variant: 'inline',
    dividers: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline variant with dividers between items.',
      },
    },
  },
};

export const Cards: Story = {
  args: {
    items: athleteStats,
    variant: 'cards',
  },
  parameters: {
    docs: {
      description: {
        story: 'Each stat in a mini card container.',
      },
    },
  },
};

export const Compact: Story = {
  args: {
    items: eventStats,
    variant: 'compact',
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal styling with icon and value inline. Labels shown on hover.',
      },
    },
  },
};

export const Floating: Story = {
  args: {
    items: athleteStats,
    variant: 'floating',
    size: 'lg',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '40px', background: 'var(--csk-color-surface-container)' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Aesthetic floating cards with shadows, border-accent gradients, and hover effects. Perfect for hero sections and profile pages.',
      },
    },
  },
};

/* ==========================================================================
   SIZE VARIANTS
   ========================================================================== */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '12px', color: 'var(--csk-color-on-surface-muted)' }}>
          Small
        </p>
        <StatsBar items={clubStats} variant="cards" size="sm" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '12px', color: 'var(--csk-color-on-surface-muted)' }}>
          Medium (default)
        </p>
        <StatsBar items={clubStats} variant="cards" size="md" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '12px', color: 'var(--csk-color-on-surface-muted)' }}>
          Large
        </p>
        <StatsBar items={clubStats} variant="cards" size="lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different size variants affect value and label font sizes.',
      },
    },
  },
};

/* ==========================================================================
   CENTERED
   ========================================================================== */

export const Centered: Story = {
  args: {
    items: athleteStats,
    variant: 'cards',
    centered: true,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Center aligned stats for hero sections.',
      },
    },
  },
};

/* ==========================================================================
   REAL WORLD EXAMPLES
   ========================================================================== */

export const EventHeader: Story = {
  name: 'Example: Event Header',
  render: () => (
    <div
      style={{
        padding: '24px',
        background: 'var(--csk-color-surface-container)',
        borderRadius: '12px',
      }}
    >
      <h2 style={{ margin: '0 0 4px', fontSize: '20px' }}>MČR ve slalomu 2026</h2>
      <p style={{ margin: '0 0 16px', color: 'var(--csk-color-on-surface-muted)', fontSize: '14px' }}>
        Praha Troja • 15. - 16. června 2026
      </p>
      <StatsBar items={eventStats} variant="inline" dividers size="sm" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Event header with stats bar showing event info.',
      },
    },
  },
};

export const AthleteProfile: Story = {
  name: 'Example: Athlete Profile',
  render: () => (
    <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'var(--csk-color-primary)',
          margin: '0 auto 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 700,
        }}
      >
        JP
      </div>
      <h2 style={{ margin: '0 0 4px', fontSize: '24px' }}>Jan Přikryl</h2>
      <p style={{ margin: '0 0 20px', color: 'var(--csk-color-on-surface-muted)' }}>
        USK Praha • K1 / C1
      </p>
      <StatsBar items={athleteStats} variant="cards" centered />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Athlete profile header with centered stats.',
      },
    },
  },
};

export const ClubDashboard: Story = {
  name: 'Example: Club Dashboard',
  render: () => (
    <div>
      <StatsBar items={clubStats} variant="cards" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Club dashboard stats in large card format.',
      },
    },
  },
};

export const CompactLiveBar: Story = {
  name: 'Example: Compact Live Bar',
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        background: 'var(--csk-color-surface-container)',
        borderRadius: '8px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#ef4444',
            animation: 'pulse 1.5s infinite',
          }}
        />
        <span style={{ fontWeight: 600, fontSize: '14px' }}>LIVE</span>
      </div>
      <StatsBar
        items={[
          { key: 'remaining', value: '12', label: 'Remaining', icon: 'users' },
          { key: 'finished', value: '144', label: 'Finished', icon: 'check-circle' },
          { key: 'current', value: 'K1M Semi', label: 'Current', icon: 'play-circle' },
        ]}
        variant="compact"
        size="sm"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact stats bar for live event status.',
      },
    },
  },
};
