import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';
import { Button } from '../Button';

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard',
  component: StatCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
StatCard komponenta pro zobrazení klíčových metrik na dashboardech.

## Funkce
- Trend indikátory (nahoru/dolů/neutrální)
- Ikona pro vizuální rozlišení
- Sekundární hodnota pro srovnání
- Sparkline mini-graf
- Footer pro akce nebo odkazy
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
    },
    styleVariant: {
      control: 'select',
      options: ['default', 'gradient', 'glass', 'gradient-subtle'],
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral', undefined],
    },
    animateTrend: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

// Common icons
const UsersIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CalendarIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CheckIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ChartIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

// =============================================================================
// Basic Examples
// =============================================================================

export const Default: Story = {
  args: {
    label: 'Celkem závodníků',
    value: '1,234',
    description: 'Aktivních registrací v systému',
  },
};

export const WithTrend: Story = {
  args: {
    label: 'Nové registrace',
    value: '156',
    description: 'Za poslední měsíc',
    trend: 'up',
    trendValue: '+12%',
    icon: UsersIcon,
  },
};

export const WithSecondaryValue: Story = {
  args: {
    label: 'Průměrný čas',
    value: '98.42',
    secondaryValue: '102.15',
    secondaryLabel: 'předchozí sezóna',
    trend: 'up',
    trendValue: '-3.6%',
    icon: ClockIcon,
  },
};

export const WithSparkline: Story = {
  args: {
    label: 'Registrace za měsíc',
    value: '156',
    trend: 'up',
    trendValue: '+12%',
    sparklineData: [45, 52, 38, 65, 72, 58, 80, 95, 110, 125, 140, 156],
    icon: ChartIcon,
  },
};

// =============================================================================
// Variants & Sizes
// =============================================================================

export const AllVariants: Story = {
  name: 'Card Variants',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      <StatCard label="Default" value="123" variant="default" icon={UsersIcon} />
      <StatCard label="Outlined" value="456" variant="outlined" icon={UsersIcon} />
      <StatCard label="Elevated" value="789" variant="elevated" icon={UsersIcon} />
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'Sizes',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      <StatCard label="Small" value="123" size="sm" icon={UsersIcon} />
      <StatCard label="Medium" value="456" size="md" icon={UsersIcon} />
      <StatCard label="Large" value="789" size="lg" icon={UsersIcon} />
    </div>
  ),
};

// =============================================================================
// Colors
// =============================================================================

export const AllColors: Story = {
  name: 'Colors',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      <StatCard label="Default" value="100" color="default" icon={UsersIcon} />
      <StatCard label="Primary" value="200" color="primary" icon={UsersIcon} />
      <StatCard label="Success" value="300" color="success" trend="up" trendValue="+15" icon={CheckIcon} />
      <StatCard label="Warning" value="12" color="warning" trend="down" trendValue="-3" icon={ClockIcon} />
      <StatCard label="Error" value="3" color="error" icon={UsersIcon} />
      <StatCard label="Info" value="500" color="info" icon={ChartIcon} />
    </div>
  ),
};

// =============================================================================
// Style Variants
// =============================================================================

export const StyleVariants: Story = {
  name: 'Style Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        <StatCard
          label="Default Style"
          value="1,234"
          styleVariant="default"
          trend="up"
          trendValue="+12%"
          icon={UsersIcon}
        />
        <StatCard
          label="Gradient Subtle"
          value="847"
          styleVariant="gradient-subtle"
          color="info"
          icon={UsersIcon}
        />
        <StatCard
          label="Gradient"
          value="5,847"
          styleVariant="gradient"
          color="primary"
          trend="up"
          trendValue="+124"
          icon={UsersIcon}
        />
      </div>
      <div
        style={{
          padding: '32px',
          background: 'linear-gradient(135deg, #1176a6 0%, #0d5a80 100%)',
          borderRadius: '12px',
        }}
      >
        <StatCard
          label="Glass Style"
          value="234"
          styleVariant="glass"
          trend="up"
          trendValue="+8"
          icon={UsersIcon}
        />
      </div>
    </div>
  ),
};

// =============================================================================
// Interactive
// =============================================================================

export const Clickable: Story = {
  args: {
    label: 'Nadcházející závody',
    value: '5',
    variant: 'elevated',
    clickable: true,
    icon: CalendarIcon,
  },
};

export const WithFooter: Story = {
  args: {
    label: 'Aktivní závodníci',
    value: '234',
    trend: 'up',
    trendValue: '+8%',
    icon: UsersIcon,
    footer: (
      <Button variant="ghost" size="sm" fullWidth>
        Zobrazit všechny závodníky
      </Button>
    ),
  },
};

export const Loading: Story = {
  args: {
    label: 'Celkem závodníků',
    value: '---',
    loading: true,
    icon: UsersIcon,
  },
};

// =============================================================================
// CSK Dashboard Example
// =============================================================================

export const DashboardGrid: Story = {
  name: 'Example: Dashboard Grid',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
      <StatCard
        label="Celkem členů"
        value="5,847"
        trend="up"
        trendValue="+124"
        variant="elevated"
        icon={UsersIcon}
      />
      <StatCard
        label="Aktivních klubů"
        value="187"
        trend="neutral"
        variant="elevated"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        }
      />
      <StatCard
        label="Závodů v sezóně"
        value="89"
        trend="up"
        trendValue="+5"
        variant="elevated"
        color="primary"
        icon={CalendarIcon}
      />
      <StatCard
        label="Čekajících žádostí"
        value="12"
        trend="down"
        trendValue="-3"
        variant="elevated"
        color="warning"
        icon={ClockIcon}
      />
    </div>
  ),
};
