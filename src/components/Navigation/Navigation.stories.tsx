import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';
import { MainNav, type NavItem } from './MainNav';
import { Button } from '../Button';

// =============================================================================
// BREADCRUMBS
// =============================================================================

const breadcrumbsMeta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Breadcrumbs component for showing navigation hierarchy. Supports collapsing for long paths and custom link renderers for router integration.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    maxItems: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Maximum number of items to show before collapsing (0 = no collapse)',
    },
    collapsedLabel: {
      control: 'text',
      description: 'Label for collapsed items',
    },
  },
};

export default breadcrumbsMeta;
type BreadcrumbsStory = StoryObj<typeof Breadcrumbs>;

// Basic breadcrumbs data
const basicBreadcrumbs: BreadcrumbItem[] = [
  { id: 'home', label: 'Domů', href: '/' },
  { id: 'events', label: 'Kalendář závodů', href: '/kalendar' },
  { id: 'current', label: 'MČR slalom 2024' },
];

export const Default: BreadcrumbsStory = {
  args: {
    items: basicBreadcrumbs,
  },
};

// With icons
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const breadcrumbsWithIcons: BreadcrumbItem[] = [
  { id: 'home', label: 'Domů', href: '/', icon: <HomeIcon /> },
  { id: 'events', label: 'Kalendář závodů', href: '/kalendar' },
  { id: 'year', label: '2024', href: '/kalendar/2024' },
  { id: 'current', label: 'MČR slalom' },
];

export const WithIcons: BreadcrumbsStory = {
  args: {
    items: breadcrumbsWithIcons,
  },
};

// Long path
const longBreadcrumbs: BreadcrumbItem[] = [
  { id: 'home', label: 'Domů', href: '/' },
  { id: 'athletes', label: 'Závodníci', href: '/zavodnici' },
  { id: 'clubs', label: 'Kluby', href: '/zavodnici/kluby' },
  { id: 'club', label: 'USK Praha', href: '/zavodnici/kluby/usk-praha' },
  { id: 'members', label: 'Členové', href: '/zavodnici/kluby/usk-praha/clenove' },
  { id: 'current', label: 'Jan Novák' },
];

export const LongPath: BreadcrumbsStory = {
  args: {
    items: longBreadcrumbs,
  },
};

export const CollapsedPath: BreadcrumbsStory = {
  args: {
    items: longBreadcrumbs,
    maxItems: 4,
  },
};

// Custom separator
export const CustomSeparator: BreadcrumbsStory = {
  args: {
    items: basicBreadcrumbs,
    separator: (
      <span style={{ margin: '0 4px', color: 'var(--color-text-tertiary)' }}>›</span>
    ),
  },
};

// CSK-specific examples
const resultsBreadcrumbs: BreadcrumbItem[] = [
  { id: 'home', label: 'Domů', href: '/' },
  { id: 'results', label: 'Výsledky', href: '/vysledky' },
  { id: 'year', label: '2024', href: '/vysledky/2024' },
  { id: 'event', label: 'MČR slalom - Troja', href: '/vysledky/2024/mcr-slalom-troja' },
  { id: 'current', label: 'K1 Muži' },
];

export const ResultsPage: BreadcrumbsStory = {
  args: {
    items: resultsBreadcrumbs,
  },
  parameters: {
    docs: {
      description: {
        story: 'Příklad použití drobečkové navigace na stránce výsledků.',
      },
    },
  },
};

const profileBreadcrumbs: BreadcrumbItem[] = [
  { id: 'home', label: 'Domů', href: '/' },
  { id: 'athletes', label: 'Závodníci', href: '/zavodnici' },
  { id: 'current', label: 'Jan Novák' },
];

export const AthleteProfile: BreadcrumbsStory = {
  args: {
    items: profileBreadcrumbs,
  },
  parameters: {
    docs: {
      description: {
        story: 'Příklad použití drobečkové navigace na profilu závodníka.',
      },
    },
  },
};

// =============================================================================
// MAIN NAVIGATION
// =============================================================================

export const MainNavMeta: Meta<typeof MainNav> = {
  title: 'Components/Navigation/MainNav',
  component: MainNav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'MainNav component for primary site navigation. Supports horizontal and vertical layouts, gradient/glass/pills style variants, animated active states, and responsive mobile menu.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Navigation layout variant',
    },
    styleVariant: {
      control: 'select',
      options: ['default', 'gradient', 'glass', 'pills'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the navigation',
    },
    showMobileToggle: {
      control: 'boolean',
      description: 'Whether to show mobile menu toggle',
    },
  },
};

type MainNavStory = StoryObj<typeof MainNav>;

// Basic navigation items
const basicNavItems: NavItem[] = [
  { id: 'home', label: 'Domů', href: '/', active: true },
  { id: 'calendar', label: 'Kalendář závodů', href: '/kalendar' },
  { id: 'results', label: 'Výsledky', href: '/vysledky' },
  { id: 'athletes', label: 'Závodníci', href: '/zavodnici' },
  { id: 'clubs', label: 'Kluby', href: '/kluby' },
];

export const HorizontalNav: MainNavStory = {
  args: {
    items: basicNavItems,
    variant: 'horizontal',
    size: 'md',
  },
};

export const VerticalNav: MainNavStory = {
  args: {
    items: basicNavItems,
    variant: 'vertical',
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

// With dropdown
const navItemsWithDropdown: NavItem[] = [
  { id: 'home', label: 'Domů', href: '/' },
  { id: 'calendar', label: 'Kalendář závodů', href: '/kalendar' },
  {
    id: 'sections',
    label: 'Sekce',
    children: [
      { id: 'dv', label: 'Divoká voda', href: '/sekce/divoka-voda' },
      { id: 'ry', label: 'Rychlostní kanoistika', href: '/sekce/rychlostni' },
      { id: 'vt', label: 'Vodní turistika', href: '/sekce/vodni-turistika' },
    ],
  },
  { id: 'results', label: 'Výsledky', href: '/vysledky' },
  { id: 'about', label: 'O nás', href: '/o-nas' },
];

export const WithDropdown: MainNavStory = {
  args: {
    items: navItemsWithDropdown,
    variant: 'horizontal',
  },
};

// With icons
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const navItemsWithIcons: NavItem[] = [
  { id: 'home', label: 'Domů', href: '/', active: true },
  { id: 'calendar', label: 'Kalendář', href: '/kalendar', icon: <CalendarIcon /> },
  { id: 'results', label: 'Výsledky', href: '/vysledky', icon: <TrophyIcon /> },
  { id: 'athletes', label: 'Závodníci', href: '/zavodnici', icon: <UsersIcon /> },
];

export const WithIcons_MainNav: MainNavStory = {
  name: 'With Icons',
  args: {
    items: navItemsWithIcons,
    variant: 'horizontal',
  },
};

// With brand and actions
const LogoPlaceholder = () => (
  <div
    style={{
      width: '120px',
      height: '32px',
      background: 'var(--color-interactive-default)',
      borderRadius: 'var(--radius-sm)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 600,
      fontSize: '14px',
    }}
  >
    CSK
  </div>
);

export const WithBrandAndActions: MainNavStory = {
  args: {
    items: basicNavItems,
    variant: 'horizontal',
    brand: <LogoPlaceholder />,
    actions: (
      <>
        <Button variant="ghost" size="sm">
          Přihlásit se
        </Button>
        <Button variant="primary" size="sm">
          Registrace
        </Button>
      </>
    ),
  },
};

// CSK full example
const cskNavItems: NavItem[] = [
  { id: 'home', label: 'Domů', href: '/', active: true },
  { id: 'calendar', label: 'Kalendář závodů', href: '/kalendar', icon: <CalendarIcon /> },
  { id: 'results', label: 'Výsledky', href: '/vysledky', icon: <TrophyIcon /> },
  {
    id: 'sections',
    label: 'Sekce',
    children: [
      { id: 'dv', label: 'Divoká voda', href: '/sekce/divoka-voda' },
      { id: 'ry', label: 'Rychlostní kanoistika', href: '/sekce/rychlostni' },
      { id: 'vt', label: 'Vodní turistika', href: '/sekce/vodni-turistika' },
    ],
  },
  { id: 'athletes', label: 'Závodníci', href: '/zavodnici', icon: <UsersIcon /> },
  {
    id: 'info',
    label: 'Informace',
    children: [
      { id: 'about', label: 'O svazu', href: '/o-svazu' },
      { id: 'contact', label: 'Kontakty', href: '/kontakty' },
      { id: 'documents', label: 'Dokumenty', href: '/dokumenty' },
    ],
  },
];

export const CSKFullExample: MainNavStory = {
  args: {
    items: cskNavItems,
    variant: 'horizontal',
    brand: <LogoPlaceholder />,
    actions: (
      <>
        <Button variant="ghost" size="sm">
          Přihlásit se
        </Button>
        <Button variant="primary" size="sm">
          Registrace
        </Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Kompletní příklad hlavní navigace pro web CSK.',
      },
    },
  },
};

// Sizes comparison
export const NavSizes: MainNavStory = {
  render: () => (
    <div style={{ display: 'grid', gap: '32px' }}>
      <div>
        <h3 style={{ margin: '0 0 8px', padding: '16px' }}>Small</h3>
        <MainNav items={basicNavItems.slice(0, 4)} size="sm" />
      </div>
      <div>
        <h3 style={{ margin: '0 0 8px', padding: '16px' }}>Medium (default)</h3>
        <MainNav items={basicNavItems.slice(0, 4)} size="md" />
      </div>
      <div>
        <h3 style={{ margin: '0 0 8px', padding: '16px' }}>Large</h3>
        <MainNav items={basicNavItems.slice(0, 4)} size="lg" />
      </div>
    </div>
  ),
};

// With disabled items
const navWithDisabled: NavItem[] = [
  { id: 'home', label: 'Domů', href: '/', active: true },
  { id: 'calendar', label: 'Kalendář závodů', href: '/kalendar' },
  { id: 'results', label: 'Výsledky', href: '/vysledky' },
  { id: 'live', label: 'Live (brzy)', href: '/live', disabled: true },
  { id: 'athletes', label: 'Závodníci', href: '/zavodnici' },
];

export const WithDisabledItem: MainNavStory = {
  args: {
    items: navWithDisabled,
    variant: 'horizontal',
  },
};

// Dashboard sidebar example
const dashboardNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Přehled', href: '/dashboard', active: true, icon: <HomeIcon /> },
  { id: 'events', label: 'Moje závody', href: '/dashboard/zavody', icon: <CalendarIcon /> },
  { id: 'results', label: 'Moje výsledky', href: '/dashboard/vysledky', icon: <TrophyIcon /> },
  {
    id: 'profile',
    label: 'Profil',
    children: [
      { id: 'info', label: 'Osobní údaje', href: '/dashboard/profil' },
      { id: 'licenses', label: 'Licence', href: '/dashboard/licence' },
      { id: 'settings', label: 'Nastavení', href: '/dashboard/nastaveni' },
    ],
  },
];

export const DashboardSidebar: MainNavStory = {
  args: {
    items: dashboardNavItems,
    variant: 'vertical',
    brand: <LogoPlaceholder />,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '500px', display: 'flex' }}>
        <Story />
        <div style={{ flex: 1, padding: '24px', background: 'var(--color-bg-secondary)' }}>
          <h2>Obsah stránky</h2>
          <p>Zde je hlavní obsah dashboardu.</p>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Příklad vertikální navigace pro dashboard závodníka.',
      },
    },
  },
};

// Combined example - page with breadcrumbs and nav
export const CombinedExample: MainNavStory = {
  render: () => (
    <div>
      <MainNav
        items={cskNavItems}
        variant="horizontal"
        brand={<LogoPlaceholder />}
        actions={
          <>
            <Button variant="ghost" size="sm">
              Přihlásit se
            </Button>
            <Button variant="primary" size="sm">
              Registrace
            </Button>
          </>
        }
      />
      <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--color-border-default)' }}>
        <Breadcrumbs items={resultsBreadcrumbs} />
      </div>
      <div style={{ padding: '24px' }}>
        <h1>K1 Muži - Výsledky</h1>
        <p>Obsah stránky s výsledky...</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Kombinovaný příklad hlavní navigace s drobečkovou navigací.',
      },
    },
  },
};

// =============================================================================
// NEW STYLE VARIANTS (Phase 7.5 Redesign)
// =============================================================================

// Gradient variant - branded look
export const GradientNav: MainNavStory = {
  args: {
    items: basicNavItems,
    variant: 'horizontal',
    styleVariant: 'gradient',
    brand: (
      <div
        style={{
          width: '120px',
          height: '32px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 600,
          fontSize: '14px',
        }}
      >
        CSK
      </div>
    ),
    actions: (
      <>
        <Button variant="secondary" size="sm">
          Přihlásit se
        </Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigace s gradient pozadím pro branded look. Vhodné pro hlavní stránky a hero sekce.',
      },
    },
  },
};

// Glass variant - frosted glass effect
export const GlassNav: MainNavStory = {
  args: {
    items: basicNavItems,
    variant: 'horizontal',
    styleVariant: 'glass',
    brand: <LogoPlaceholder />,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          background: 'linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-800) 100%)',
          minHeight: '200px',
          padding: '0',
        }}
      >
        <Story />
        <div style={{ padding: '24px', color: 'white' }}>
          <h2>Obsah za navigací</h2>
          <p>Glass efekt vytváří frosted glass vzhled nad barevným pozadím.</p>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Navigace s frosted glass efektem. Skvěle funguje nad barevným nebo obrázkovým pozadím.',
      },
    },
  },
};

// Pills variant - nav items as pills
export const PillsNav: MainNavStory = {
  args: {
    items: basicNavItems,
    variant: 'horizontal',
    styleVariant: 'pills',
    brand: <LogoPlaceholder />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigace s pill stylem pro aktivní položky. Aktivní stav má gradient pozadí.',
      },
    },
  },
};

// All style variants showcase
export const AllStyleVariants: MainNavStory = {
  render: () => (
    <div style={{ display: 'grid', gap: '32px' }}>
      <div>
        <h3 style={{ margin: '0 0 8px', padding: '16px' }}>Default</h3>
        <MainNav items={basicNavItems.slice(0, 4)} styleVariant="default" />
      </div>
      <div>
        <h3 style={{ margin: '0 0 8px', padding: '16px' }}>Gradient</h3>
        <MainNav items={basicNavItems.slice(0, 4)} styleVariant="gradient" />
      </div>
      <div
        style={{
          background: 'linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-800) 100%)',
        }}
      >
        <h3 style={{ margin: '0 0 8px', padding: '16px', color: 'white' }}>Glass (na barevném pozadí)</h3>
        <MainNav items={basicNavItems.slice(0, 4)} styleVariant="glass" />
      </div>
      <div>
        <h3 style={{ margin: '0 0 8px', padding: '16px' }}>Pills</h3>
        <MainNav items={basicNavItems.slice(0, 4)} styleVariant="pills" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Porovnání všech stylových variant navigace.',
      },
    },
  },
};

// Hover and active states demo
export const HoverActiveStates: MainNavStory = {
  args: {
    items: [
      { id: 'home', label: 'Domů', href: '/', active: true },
      { id: 'calendar', label: 'Kalendář závodů', href: '/kalendar' },
      { id: 'results', label: 'Výsledky', href: '/vysledky' },
      { id: 'athletes', label: 'Závodníci (hover me)', href: '/zavodnici' },
      { id: 'disabled', label: 'Disabled', href: '/disabled', disabled: true },
    ],
    variant: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrace hover a aktivních stavů. Aktivní položka má animovaný gradient underline.',
      },
    },
  },
};

// Gradient with dropdown
export const GradientWithDropdown: MainNavStory = {
  args: {
    items: navItemsWithDropdown,
    variant: 'horizontal',
    styleVariant: 'gradient',
    brand: (
      <div
        style={{
          width: '120px',
          height: '32px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 600,
          fontSize: '14px',
        }}
      >
        CSK
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Gradient navigace s dropdown menu. Dropdown má gradient accent linku nahoře.',
      },
    },
  },
};

// Featured showcase - CSK branded navigation
export const FeaturedShowcase: MainNavStory = {
  render: () => (
    <div>
      {/* Hero section with gradient nav */}
      <MainNav
        items={cskNavItems}
        variant="horizontal"
        styleVariant="gradient"
        size="lg"
        brand={
          <div
            style={{
              width: '140px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: '16px',
              letterSpacing: '0.05em',
            }}
          >
            ČSK
          </div>
        }
        actions={
          <>
            <Button variant="secondary" size="sm">
              Přihlásit se
            </Button>
            <Button
              variant="primary"
              size="sm"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: 'white',
              }}
            >
              Registrace
            </Button>
          </>
        }
      />
      {/* Content */}
      <div
        style={{
          background: 'linear-gradient(180deg, var(--color-primary-50) 0%, var(--color-bg-primary) 100%)',
          padding: '48px 24px',
          minHeight: '300px',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Český svaz kanoistů</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)' }}>
            Registrační a výsledkový portál pro českou kanoistiku
          </p>
          <div style={{ marginTop: '32px' }}>
            <Breadcrumbs items={basicBreadcrumbs} />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Kompletní ukázka branded navigace pro hlavní stránku CSK.',
      },
    },
  },
};
