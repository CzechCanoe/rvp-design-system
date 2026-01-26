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
      options: ['default', 'aesthetic'],
    },
    colorVariant: {
      control: 'select',
      options: [
        'default',
        'medal-gold',
        'medal-silver',
        'medal-bronze',
        'gradient-primary',
        'gradient-success',
        'gradient-warning',
        'gradient-info',
      ],
    },
    iconGradient: {
      control: 'boolean',
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral', undefined],
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
      <StatCard label="Info" value="500" color="info" icon={UsersIcon} />
    </div>
  ),
};

// =============================================================================
// Style Variants
// =============================================================================

export const StyleVariants: Story = {
  name: 'Style Variants',
  render: () => (
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
        label="Aesthetic Style"
        value="5,847"
        styleVariant="aesthetic"
        color="primary"
        trend="up"
        trendValue="+124"
        icon={UsersIcon}
      />
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

// =============================================================================
// Medal Variants (Phase 22.4)
// =============================================================================

const TrophyIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const MedalIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

export const MedalVariants: Story = {
  name: 'Medal Variants',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      <StatCard
        label="Zlaté medaile"
        value="12"
        colorVariant="medal-gold"
        icon={TrophyIcon}
        description="Mistrovské tituly"
      />
      <StatCard
        label="Stříbrné medaile"
        value="23"
        colorVariant="medal-silver"
        icon={MedalIcon}
        description="Druhá místa"
      />
      <StatCard
        label="Bronzové medaile"
        value="18"
        colorVariant="medal-bronze"
        icon={MedalIcon}
        description="Třetí místa"
      />
    </div>
  ),
};

export const MedalGold: Story = {
  args: {
    label: 'Zlaté medaile',
    value: '12',
    colorVariant: 'medal-gold',
    icon: TrophyIcon,
    description: 'Mistrovské tituly',
  },
};

export const MedalSilver: Story = {
  args: {
    label: 'Stříbrné medaile',
    value: '23',
    colorVariant: 'medal-silver',
    icon: MedalIcon,
    description: 'Druhá místa',
  },
};

export const MedalBronze: Story = {
  args: {
    label: 'Bronzové medaile',
    value: '18',
    colorVariant: 'medal-bronze',
    icon: MedalIcon,
    description: 'Třetí místa',
  },
};

// =============================================================================
// Gradient Variants (Phase 22.4)
// =============================================================================

export const GradientVariants: Story = {
  name: 'Gradient Variants',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      <StatCard
        label="Aktivní závodníci"
        value="1,234"
        colorVariant="gradient-primary"
        icon={UsersIcon}
        trend="up"
        trendValue="+5%"
      />
      <StatCard
        label="Dokončené registrace"
        value="89%"
        colorVariant="gradient-success"
        icon={CheckIcon}
        trend="up"
        trendValue="+12%"
      />
      <StatCard
        label="Čekající schválení"
        value="23"
        colorVariant="gradient-warning"
        icon={ClockIcon}
        trend="down"
        trendValue="-3"
      />
      <StatCard
        label="Nadcházející závody"
        value="8"
        colorVariant="gradient-info"
        icon={CalendarIcon}
      />
    </div>
  ),
};

export const GradientPrimary: Story = {
  args: {
    label: 'Aktivní závodníci',
    value: '1,234',
    colorVariant: 'gradient-primary',
    icon: UsersIcon,
    trend: 'up',
    trendValue: '+5%',
  },
};

export const GradientSuccess: Story = {
  args: {
    label: 'Dokončené registrace',
    value: '89%',
    colorVariant: 'gradient-success',
    icon: CheckIcon,
    trend: 'up',
    trendValue: '+12%',
  },
};

export const GradientWarning: Story = {
  args: {
    label: 'Čekající schválení',
    value: '23',
    colorVariant: 'gradient-warning',
    icon: ClockIcon,
    trend: 'down',
    trendValue: '-3',
  },
};

export const GradientInfo: Story = {
  args: {
    label: 'Nadcházející závody',
    value: '8',
    colorVariant: 'gradient-info',
    icon: CalendarIcon,
  },
};

// =============================================================================
// Icon Gradient (Phase 22.4)
// =============================================================================

export const IconGradientVariant: Story = {
  name: 'Icon with Gradient Background',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      <StatCard
        label="Default Icon"
        value="123"
        icon={UsersIcon}
        description="Standard icon background"
      />
      <StatCard
        label="Gradient Icon"
        value="456"
        icon={UsersIcon}
        iconGradient
        description="Gradient icon background"
      />
    </div>
  ),
};

export const WithIconGradient: Story = {
  args: {
    label: 'Aktivní členové',
    value: '456',
    icon: UsersIcon,
    iconGradient: true,
    description: 'S gradient pozadím ikony',
    trend: 'up',
    trendValue: '+8%',
  },
};

// =============================================================================
// Sparkline Slot (Phase 22.4)
// =============================================================================

// Simple SVG sparkline for demo
const DemoSparkline = () => (
  <svg viewBox="0 0 200 40" style={{ width: '100%', height: '40px' }}>
    <defs>
      <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--color-primary-500)" stopOpacity="0.3" />
        <stop offset="100%" stopColor="var(--color-primary-500)" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M0 30 L20 25 L40 28 L60 20 L80 22 L100 15 L120 18 L140 10 L160 12 L180 8 L200 5"
      fill="none"
      stroke="var(--color-primary-500)"
      strokeWidth="2"
    />
    <path
      d="M0 30 L20 25 L40 28 L60 20 L80 22 L100 15 L120 18 L140 10 L160 12 L180 8 L200 5 L200 40 L0 40 Z"
      fill="url(#sparklineGradient)"
    />
  </svg>
);

const DemoSparklineSuccess = () => (
  <svg viewBox="0 0 200 40" style={{ width: '100%', height: '40px' }}>
    <defs>
      <linearGradient id="sparklineGradientSuccess" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--color-success-500)" stopOpacity="0.3" />
        <stop offset="100%" stopColor="var(--color-success-500)" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M0 35 L20 32 L40 30 L60 28 L80 25 L100 20 L120 18 L140 15 L160 12 L180 8 L200 5"
      fill="none"
      stroke="var(--color-success-500)"
      strokeWidth="2"
    />
    <path
      d="M0 35 L20 32 L40 30 L60 28 L80 25 L100 20 L120 18 L140 15 L160 12 L180 8 L200 5 L200 40 L0 40 Z"
      fill="url(#sparklineGradientSuccess)"
    />
  </svg>
);

export const WithSparkline: Story = {
  args: {
    label: 'Měsíční registrace',
    value: '1,234',
    trend: 'up',
    trendValue: '+12%',
    sparkline: <DemoSparkline />,
  },
};

export const SparklineVariants: Story = {
  name: 'Sparkline Examples',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      <StatCard
        label="Měsíční registrace"
        value="1,234"
        trend="up"
        trendValue="+12%"
        icon={UsersIcon}
        sparkline={<DemoSparkline />}
      />
      <StatCard
        label="Aktivní licence"
        value="892"
        trend="up"
        trendValue="+8%"
        color="success"
        icon={CheckIcon}
        sparkline={<DemoSparklineSuccess />}
      />
    </div>
  ),
};

// =============================================================================
// Combined Example - Dashboard with all new variants
// =============================================================================

export const AdvancedDashboard: Story = {
  name: 'Example: Advanced Dashboard',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Medal row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <StatCard
          label="Zlaté medaile"
          value="12"
          colorVariant="medal-gold"
          icon={TrophyIcon}
        />
        <StatCard
          label="Stříbrné"
          value="23"
          colorVariant="medal-silver"
          icon={MedalIcon}
        />
        <StatCard
          label="Bronzové"
          value="18"
          colorVariant="medal-bronze"
          icon={MedalIcon}
        />
      </div>

      {/* Gradient row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <StatCard
          label="Závodníci"
          value="5,847"
          colorVariant="gradient-primary"
          icon={UsersIcon}
          trend="up"
          trendValue="+5%"
        />
        <StatCard
          label="Dokončeno"
          value="89%"
          colorVariant="gradient-success"
          icon={CheckIcon}
        />
        <StatCard
          label="Čekající"
          value="23"
          colorVariant="gradient-warning"
          icon={ClockIcon}
        />
        <StatCard
          label="Závody"
          value="8"
          colorVariant="gradient-info"
          icon={CalendarIcon}
        />
      </div>

      {/* Sparkline row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        <StatCard
          label="Trend registrací"
          value="1,234"
          trend="up"
          trendValue="+12%"
          icon={UsersIcon}
          iconGradient
          sparkline={<DemoSparkline />}
        />
        <StatCard
          label="Aktivní licence"
          value="892"
          trend="up"
          trendValue="+8%"
          color="success"
          icon={CheckIcon}
          sparkline={<DemoSparklineSuccess />}
        />
      </div>
    </div>
  ),
};
