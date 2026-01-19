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

## Použití

- **Počet závodníků** - celkový počet registrovaných závodníků
- **Aktivní členství** - počet aktivních členů klubu
- **Nadcházející závody** - počet naplánovaných událostí
- **Výkonnostní statistiky** - průměrné časy, body, umístění

## Funkce

- Trend indikátory (nahoru/dolů/neutrální)
- Ikona pro vizuální rozlišení
- Sekundární hodnota pro srovnání
- Footer pro akce nebo odkazy
- Klikatelný stav pro drill-down
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
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral', undefined],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

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

export const WithIcon: Story = {
  args: {
    label: 'Celkem závodníků',
    value: '1,234',
    description: 'Aktivních registrací v systému',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
};

export const WithTrendUp: Story = {
  args: {
    label: 'Nové registrace',
    value: '156',
    description: 'Za poslední měsíc',
    trend: 'up',
    trendValue: '+12%',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
      </svg>
    ),
  },
};

export const WithTrendDown: Story = {
  args: {
    label: 'Odhlášení ze závodů',
    value: '23',
    description: 'Za poslední týden',
    trend: 'down',
    trendValue: '-8%',
    color: 'warning',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="22" y1="11" x2="16" y2="11" />
      </svg>
    ),
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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
};

// =============================================================================
// Variants
// =============================================================================

export const Outlined: Story = {
  args: {
    label: 'Aktivní členství',
    value: '847',
    variant: 'outlined',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
};

export const Elevated: Story = {
  args: {
    label: 'Nadcházející závody',
    value: '12',
    variant: 'elevated',
    description: 'V příštích 30 dnech',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
};

// =============================================================================
// Sizes
// =============================================================================

export const Small: Story = {
  args: {
    label: 'Závodníci DV',
    value: '423',
    size: 'sm',
    color: 'info',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
  },
};

export const Large: Story = {
  args: {
    label: 'Celkový počet členů CSK',
    value: '5,847',
    size: 'lg',
    description: 'Včetně všech sekcí a kategorií',
    trend: 'up',
    trendValue: '+5.2%',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
};

// =============================================================================
// Colors
// =============================================================================

export const Primary: Story = {
  args: {
    label: 'Registrace v procesu',
    value: '34',
    color: 'primary',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
};

export const Success: Story = {
  args: {
    label: 'Schválené přihlášky',
    value: '89',
    color: 'success',
    trend: 'up',
    trendValue: '+15',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
};

export const Warning: Story = {
  args: {
    label: 'Čekající na platbu',
    value: '12',
    color: 'warning',
    description: 'Členské příspěvky po splatnosti',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
};

export const Error: Story = {
  args: {
    label: 'Zamítnuté registrace',
    value: '3',
    color: 'error',
    description: 'Neúplné dokumenty',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  },
};

// =============================================================================
// With Footer
// =============================================================================

export const WithFooter: Story = {
  args: {
    label: 'Aktivní závodníci',
    value: '234',
    trend: 'up',
    trendValue: '+8%',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
    footer: (
      <Button variant="ghost" size="sm" fullWidth>
        Zobrazit všechny závodníky
      </Button>
    ),
  },
};

// =============================================================================
// Clickable
// =============================================================================

export const Clickable: Story = {
  args: {
    label: 'Nadcházející závody',
    value: '5',
    variant: 'elevated',
    clickable: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
};

// =============================================================================
// Loading
// =============================================================================

export const Loading: Story = {
  args: {
    label: 'Celkem závodníků',
    value: '---',
    loading: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
  },
};

// =============================================================================
// CSK-Specific Examples
// =============================================================================

export const DashboardGrid: Story = {
  name: 'Dashboard Grid (CSK)',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
      }}
    >
      <StatCard
        label="Celkem členů"
        value="5,847"
        trend="up"
        trendValue="+124"
        variant="elevated"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        }
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
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        }
      />
      <StatCard
        label="Čekajících žádostí"
        value="12"
        trend="down"
        trendValue="-3"
        variant="elevated"
        color="warning"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        }
      />
    </div>
  ),
};

export const SectionStats: Story = {
  name: 'Statistiky sekcí (CSK)',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
      }}
    >
      <StatCard
        label="Divoká voda (DV)"
        value="2,145"
        description="Aktivních závodníků"
        color="info"
        trend="up"
        trendValue="+48"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 12c.5-1 1.5-2 3-2s2.5 1 3 2c.5 1 1.5 2 3 2s2.5-1 3-2c.5-1 1.5-2 3-2s2.5 1 3 2" />
            <path d="M2 17c.5-1 1.5-2 3-2s2.5 1 3 2c.5 1 1.5 2 3 2s2.5-1 3-2c.5-1 1.5-2 3-2s2.5 1 3 2" />
          </svg>
        }
      />
      <StatCard
        label="Rychlostní (RY)"
        value="1,892"
        description="Aktivních závodníků"
        color="success"
        trend="up"
        trendValue="+32"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        }
      />
      <StatCard
        label="Vodní turistika (VT)"
        value="1,810"
        description="Aktivních členů"
        color="error"
        trend="up"
        trendValue="+44"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
        }
      />
    </div>
  ),
};

export const RegistrationOverview: Story = {
  name: 'Přehled registrací (CSK)',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
      }}
    >
      <StatCard
        label="Nové žádosti"
        value="34"
        size="sm"
        color="primary"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        }
      />
      <StatCard
        label="Čeká na kontrolu"
        value="12"
        size="sm"
        color="warning"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        }
      />
      <StatCard
        label="Schváleno dnes"
        value="8"
        size="sm"
        color="success"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        }
      />
      <StatCard
        label="Zamítnuto"
        value="2"
        size="sm"
        color="error"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        }
      />
    </div>
  ),
};

export const PerformanceStats: Story = {
  name: 'Výkonnostní statistiky (CSK)',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        maxWidth: '600px',
      }}
    >
      <StatCard
        label="Nejlepší čas sezóny"
        value="94.32"
        secondaryValue="96.18"
        secondaryLabel="osobní rekord"
        trend="up"
        trendValue="-1.86s"
        variant="elevated"
        color="success"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="7" />
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
          </svg>
        }
      />
      <StatCard
        label="Průměrné umístění"
        value="4.2"
        secondaryValue="5.8"
        secondaryLabel="loňská sezóna"
        trend="up"
        trendValue="+1.6"
        variant="elevated"
        color="primary"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        }
      />
      <StatCard
        label="Závodů v sezóně"
        value="12"
        description="Z toho 8 dokončených"
        variant="outlined"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
          </svg>
        }
      />
      <StatCard
        label="Body do žebříčku"
        value="847"
        trend="up"
        trendValue="+156"
        variant="outlined"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        }
      />
    </div>
  ),
};
