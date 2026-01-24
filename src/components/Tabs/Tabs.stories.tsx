import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, type TabItem } from './Tabs';
import { Badge } from '../Badge';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tabs component for organizing content into switchable panels. Supports multiple variants (line, pills, gradient, glass), three sizes, and full WCAG keyboard navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'pills', 'gradient', 'gradient-line', 'energy', 'glass'],
      description: 'Visual variant of the tabs',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the tabs',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether tabs should stretch to fill container width',
    },
    tabs: {
      control: 'object',
      description: 'Array of tab items',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Basic tabs data
const basicTabs: TabItem[] = [
  {
    id: 'overview',
    label: 'Přehled',
    content: (
      <div>
        <h3>Přehled</h3>
        <p>Toto je obsah záložky Přehled. Zobrazuje základní informace o vybrané položce.</p>
      </div>
    ),
  },
  {
    id: 'details',
    label: 'Detaily',
    content: (
      <div>
        <h3>Detaily</h3>
        <p>Detailní informace a specifikace. Tato sekce obsahuje rozšířené údaje.</p>
      </div>
    ),
  },
  {
    id: 'history',
    label: 'Historie',
    content: (
      <div>
        <h3>Historie</h3>
        <p>Chronologický přehled změn a událostí spojených s touto položkou.</p>
      </div>
    ),
  },
];

// =============================================================================
// BASIC EXAMPLES
// =============================================================================

export const Default: Story = {
  args: {
    tabs: basicTabs,
    variant: 'line',
    size: 'md',
  },
};

export const Pills: Story = {
  args: {
    tabs: basicTabs,
    variant: 'pills',
    size: 'md',
  },
};

export const FullWidth: Story = {
  args: {
    tabs: basicTabs,
    variant: 'line',
    fullWidth: true,
  },
};

// =============================================================================
// ENERGY VARIANT (Dynamic Sport Aesthetic)
// =============================================================================

export const Energy: Story = {
  args: {
    tabs: basicTabs,
    variant: 'energy',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Energy variant with coral-orange underline glow. Part of the Dynamic Sport aesthetic.',
      },
    },
  },
};

export const EnergyLarge: Story = {
  args: {
    tabs: basicTabs,
    variant: 'energy',
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Energy variant in large size uses display font (Plus Jakarta Sans) for emphasis.',
      },
    },
  },
};

// =============================================================================
// WITH DISABLED TAB
// =============================================================================

const tabsWithDisabled: TabItem[] = [
  {
    id: 'active',
    label: 'Aktivní',
    content: <p>Obsah aktivní záložky.</p>,
  },
  {
    id: 'disabled',
    label: 'Nedostupné',
    content: <p>Tento obsah není přístupný.</p>,
    disabled: true,
  },
  {
    id: 'another',
    label: 'Další',
    content: <p>Obsah další záložky.</p>,
  },
];

export const WithDisabledTab: Story = {
  args: {
    tabs: tabsWithDisabled,
    variant: 'line',
  },
};

// =============================================================================
// WITH ICONS
// =============================================================================

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const tabsWithIcons: TabItem[] = [
  {
    id: 'events',
    label: 'Závody',
    icon: <CalendarIcon />,
    content: (
      <div>
        <h3>Nadcházející závody</h3>
        <p>Seznam plánovaných závodů a jejich detaily.</p>
      </div>
    ),
  },
  {
    id: 'results',
    label: 'Výsledky',
    icon: <TrophyIcon />,
    content: (
      <div>
        <h3>Výsledky</h3>
        <p>Přehled dosažených výsledků a umístění.</p>
      </div>
    ),
  },
  {
    id: 'profile',
    label: 'Profil',
    icon: <UserIcon />,
    content: (
      <div>
        <h3>Profil závodníka</h3>
        <p>Osobní údaje a nastavení účtu.</p>
      </div>
    ),
  },
];

export const WithIcons: Story = {
  args: {
    tabs: tabsWithIcons,
    variant: 'line',
  },
};

// =============================================================================
// CONTROLLED
// =============================================================================

const ControlledExample = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <strong>Aktivní záložka:</strong> {activeTab}
        <button
          onClick={() => setActiveTab('history')}
          style={{ marginLeft: '12px', padding: '4px 8px' }}
        >
          Přejít na Historii
        </button>
      </div>
      <Tabs tabs={basicTabs} activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

// =============================================================================
// CSK-SPECIFIC EXAMPLE: Section Filter
// =============================================================================

const sectionFilterTabs: TabItem[] = [
  {
    id: 'all',
    label: 'Všechny sekce',
    content: <p>Zobrazuje závody všech sekcí.</p>,
  },
  {
    id: 'dv',
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        Divoká voda
        <Badge section="dv" size="sm">
          12
        </Badge>
      </span>
    ),
    content: <p>Závody sekce Divoká voda (slalom, sjezd).</p>,
  },
  {
    id: 'ry',
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        Rychlostní
        <Badge section="ry" size="sm">
          8
        </Badge>
      </span>
    ),
    content: <p>Závody rychlostní kanoistiky (sprint, maraton).</p>,
  },
  {
    id: 'vt',
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        Vodní turistika
        <Badge section="vt" size="sm">
          24
        </Badge>
      </span>
    ),
    content: <p>Závody vodní turistiky (TZ).</p>,
  },
];

export const SectionFilter: Story = {
  args: {
    tabs: sectionFilterTabs,
    variant: 'pills',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Příklad filtrování podle sekcí CSK s počtem závodů.',
      },
    },
  },
};

// =============================================================================
// ALL VARIANTS SHOWCASE
// =============================================================================

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '48px' }}>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Line Variant</h3>
        <Tabs tabs={basicTabs} variant="line" />
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Pills Variant</h3>
        <Tabs tabs={basicTabs} variant="pills" />
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Gradient Pills</h3>
        <Tabs tabs={basicTabs} variant="gradient" />
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Gradient Line</h3>
        <Tabs tabs={basicTabs} variant="gradient-line" />
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Energy (Dynamic Sport)</h3>
        <Tabs tabs={basicTabs} variant="energy" />
      </div>
      <div
        style={{
          background: 'var(--gradient-primary-deep)',
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <h3 style={{ marginBottom: '16px', color: 'white' }}>Glass (on gradient background)</h3>
        <Tabs tabs={basicTabs} variant="glass" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all available style variants.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '48px' }}>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Small</h3>
        <Tabs tabs={basicTabs} size="sm" />
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Medium (default)</h3>
        <Tabs tabs={basicTabs} size="md" />
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Large</h3>
        <Tabs tabs={basicTabs} size="lg" />
      </div>
    </div>
  ),
};
