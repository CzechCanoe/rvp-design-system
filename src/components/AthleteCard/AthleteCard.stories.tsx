import type { Meta, StoryObj } from '@storybook/react';
import { AthleteCard } from './AthleteCard';
import { KanoeCzContext } from '../KanoeCzContext';

const meta: Meta<typeof AthleteCard> = {
  title: 'Components/AthleteCard',
  component: AthleteCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'featured'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    styleVariant: {
      control: 'select',
      options: ['default', 'gradient', 'glass', 'hero'],
    },
    section: {
      control: 'select',
      options: [undefined, 'dv', 'ry', 'vt'],
    },
    vtClass: {
      control: 'select',
      options: [undefined, 'm', 'a', 'b', 'c'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AthleteCard>;

// =============================================================================
// Basic Examples
// =============================================================================

export const Default: Story = {
  args: {
    name: 'Jiří Prskavec',
    club: 'USK Praha',
    clubId: 'USK01',
    section: 'dv',
    country: 'CZE',
  },
};

export const WithImage: Story = {
  args: {
    name: 'Kateřina Kudějová',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face',
    club: 'Dukla Praha',
    clubId: 'DUK01',
    section: 'dv',
    vtClass: 'm',
    country: 'CZE',
  },
};

export const WithVtClass: Story = {
  args: {
    name: 'Tomáš Novák',
    club: 'SK Slavia Praha',
    section: 'vt',
    vtClass: 'a',
    vtPoints: 1250,
    country: 'CZE',
    birthYear: 2005,
  },
};

export const WithRanking: Story = {
  args: {
    name: 'Anna Dvořáková',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face',
    club: 'TJ Bohemians Praha',
    section: 'ry',
    ranking: 3,
    country: 'CZE',
  },
};

export const WithStats: Story = {
  args: {
    name: 'Martin Svoboda',
    club: 'KK Roudnice',
    section: 'dv',
    vtClass: 'b',
    stats: [
      { label: 'Závody', value: 24 },
      { label: 'Vítězství', value: 8 },
      { label: 'Body', value: '1,450' },
    ],
    country: 'CZE',
    birthYear: 2003,
    licenseNumber: 'CZE-2003-0142',
  },
};

// =============================================================================
// Style Variants
// =============================================================================

export const GradientStyle: Story = {
  name: 'Style: Gradient',
  args: {
    name: 'Jiří Prskavec',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face',
    club: 'USK Praha',
    section: 'dv',
    vtClass: 'm',
    styleVariant: 'gradient',
    clickable: true,
    country: 'CZE',
  },
};

export const GlassStyle: Story = {
  name: 'Style: Glass',
  args: {
    name: 'Kateřina Kudějová',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face',
    club: 'Dukla Praha',
    section: 'dv',
    styleVariant: 'glass',
    clickable: true,
    country: 'CZE',
  },
  decorators: [
    (Story) => (
      <div style={{
        padding: '40px',
        background: 'linear-gradient(135deg, #1176a6 0%, #0d5a7d 100%)',
        borderRadius: '12px',
      }}>
        <Story />
      </div>
    ),
  ],
};

export const HeroStyle: Story = {
  name: 'Style: Hero',
  args: {
    name: 'Jiří Prskavec',
    club: 'USK Praha',
    section: 'dv',
    vtClass: 'm',
    ranking: 1,
    styleVariant: 'hero',
    backgroundUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
    clickable: true,
    country: 'CZE',
    variant: 'featured',
  },
};

export const HeroWithoutAvatar: Story = {
  name: 'Style: Hero (without avatar)',
  args: {
    name: 'Martin Fuksa',
    club: 'Dukla Praha',
    section: 'ry',
    vtClass: 'm',
    ranking: 1,
    styleVariant: 'hero',
    backgroundUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&h=400&fit=crop',
    clickable: true,
    country: 'CZE',
    stats: [
      { label: 'Závody', value: 48 },
      { label: 'Medaile', value: 32 },
    ],
  },
};

export const AllStyleVariants: Story = {
  name: 'All Style Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666', fontWeight: 600 }}>DEFAULT</div>
        <AthleteCard
          name="Závodník Default"
          club="USK Praha"
          section="dv"
          vtClass="a"
          clickable
        />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666', fontWeight: 600 }}>GRADIENT</div>
        <AthleteCard
          name="Závodník Gradient"
          club="Dukla Praha"
          section="ry"
          vtClass="m"
          styleVariant="gradient"
          clickable
        />
      </div>
      <div style={{
        padding: '24px',
        background: 'linear-gradient(135deg, #1176a6 0%, #0d5a7d 100%)',
        borderRadius: '12px',
        marginLeft: '-24px',
        marginRight: '-24px',
      }}>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>GLASS</div>
        <AthleteCard
          name="Závodník Glass"
          club="SK Slavia Praha"
          section="vt"
          vtClass="b"
          styleVariant="glass"
          clickable
        />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666', fontWeight: 600 }}>HERO</div>
        <AthleteCard
          name="Závodník Hero"
          club="TJ Bohemians"
          section="dv"
          ranking={1}
          styleVariant="hero"
          backgroundUrl="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop"
          clickable
        />
      </div>
    </div>
  ),
};

// =============================================================================
// Sizes
// =============================================================================

export const SizeSmall: Story = {
  args: {
    name: 'Jan Kowalski',
    club: 'KK Brandýs',
    section: 'vt',
    size: 'sm',
    country: 'CZE',
  },
};

export const SizeMedium: Story = {
  args: {
    name: 'Petr Holub',
    club: 'USK Praha',
    section: 'dv',
    size: 'md',
    country: 'CZE',
  },
};

export const SizeLarge: Story = {
  args: {
    name: 'Eva Černá',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face',
    club: 'Dukla Praha',
    section: 'ry',
    size: 'lg',
    country: 'CZE',
    birthYear: 2001,
  },
};

// =============================================================================
// Variants
// =============================================================================

export const Compact: Story = {
  args: {
    name: 'Lukáš Malý',
    club: 'SK Slavia Praha',
    section: 'dv',
    variant: 'compact',
    country: 'CZE',
  },
};

export const Featured: Story = {
  args: {
    name: 'Jiří Prskavec',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&crop=face',
    club: 'USK Praha',
    clubId: 'USK01',
    section: 'dv',
    vtClass: 'm',
    ranking: 1,
    variant: 'featured',
    country: 'CZE',
    birthYear: 1993,
    licenseNumber: 'CZE-1993-0001',
  },
};

export const FeaturedGradient: Story = {
  name: 'Featured + Gradient',
  args: {
    name: 'Kateřina Kudějová',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop&crop=face',
    club: 'Dukla Praha',
    section: 'dv',
    vtClass: 'm',
    ranking: 2,
    variant: 'featured',
    styleVariant: 'gradient',
    country: 'CZE',
    clickable: true,
  },
};

export const FeaturedGlass: Story = {
  name: 'Featured + Glass',
  args: {
    name: 'Martin Fuksa',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&h=256&fit=crop&crop=face',
    club: 'Dukla Praha',
    section: 'ry',
    vtClass: 'm',
    ranking: 1,
    variant: 'featured',
    styleVariant: 'glass',
    country: 'CZE',
    clickable: true,
  },
  decorators: [
    (Story) => (
      <div style={{
        padding: '40px',
        background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
        borderRadius: '12px',
      }}>
        <Story />
      </div>
    ),
  ],
};

// =============================================================================
// Sections (Disciplines)
// =============================================================================

export const SectionDV: Story = {
  name: 'Section: Divoká voda (DV)',
  args: {
    name: 'Vít Přindiš',
    club: 'Dukla Praha',
    section: 'dv',
    country: 'CZE',
  },
};

export const SectionRY: Story = {
  name: 'Section: Rychlostní (RY)',
  args: {
    name: 'Martin Fuksa',
    club: 'Dukla Praha',
    section: 'ry',
    country: 'CZE',
  },
};

export const SectionVT: Story = {
  name: 'Section: Výkonnostní třídy (VT)',
  args: {
    name: 'Nováček Začátečník',
    club: 'KK Brandýs',
    section: 'vt',
    vtClass: 'c',
    vtPoints: 450,
    country: 'CZE',
    birthYear: 2010,
  },
};

// =============================================================================
// VT Classes
// =============================================================================

export const VtClassM: Story = {
  name: 'VT: Třída M (Master)',
  args: {
    name: 'Olympijský Mistr',
    club: 'USK Praha',
    section: 'vt',
    vtClass: 'm',
    vtPoints: 2500,
    country: 'CZE',
  },
};

export const VtClassA: Story = {
  name: 'VT: Třída A',
  args: {
    name: 'Pokročilý Závodník',
    club: 'Dukla Praha',
    section: 'vt',
    vtClass: 'a',
    vtPoints: 1800,
    country: 'CZE',
  },
};

export const VtClassB: Story = {
  name: 'VT: Třída B',
  args: {
    name: 'Středně Pokročilý',
    club: 'SK Slavia Praha',
    section: 'vt',
    vtClass: 'b',
    vtPoints: 1200,
    country: 'CZE',
  },
};

export const VtClassC: Story = {
  name: 'VT: Třída C',
  args: {
    name: 'Začínající Závodník',
    club: 'KK Roudnice',
    section: 'vt',
    vtClass: 'c',
    vtPoints: 600,
    country: 'CZE',
  },
};

// =============================================================================
// Interactive
// =============================================================================

export const Clickable: Story = {
  args: {
    name: 'Klikatelný Závodník',
    club: 'USK Praha',
    section: 'dv',
    clickable: true,
    country: 'CZE',
  },
};

export const AsLink: Story = {
  args: {
    name: 'Závodník s odkazem',
    club: 'Dukla Praha',
    section: 'ry',
    href: '#athlete-profile',
    country: 'CZE',
  },
};

// =============================================================================
// Hover Effects Demo
// =============================================================================

export const HoverEffectsDemo: Story = {
  name: 'Hover Effects Demo',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
        Hover over the cards to see micro-interactions: avatar glow, image scale, badge lift, name color change.
      </p>
      <AthleteCard
        name="Hover Demo - Default"
        imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face"
        club="USK Praha"
        section="dv"
        vtClass="m"
        ranking={1}
        clickable
      />
      <AthleteCard
        name="Hover Demo - Featured"
        imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop&crop=face"
        club="Dukla Praha"
        section="ry"
        ranking={2}
        variant="featured"
        clickable
      />
      <AthleteCard
        name="Hover Demo - Gradient"
        imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face"
        club="SK Slavia"
        section="vt"
        vtClass="a"
        styleVariant="gradient"
        clickable
      />
    </div>
  ),
};

// =============================================================================
// List Examples
// =============================================================================

export const AthleteList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
      <AthleteCard
        name="Jiří Prskavec"
        imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face"
        club="USK Praha"
        section="dv"
        vtClass="m"
        ranking={1}
        clickable
      />
      <AthleteCard
        name="Kateřina Kudějová"
        imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face"
        club="Dukla Praha"
        section="dv"
        vtClass="m"
        ranking={2}
        clickable
      />
      <AthleteCard
        name="Vít Přindiš"
        imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face"
        club="Dukla Praha"
        section="dv"
        vtClass="m"
        ranking={3}
        clickable
      />
      <AthleteCard
        name="Tereza Fišerová"
        club="USK Praha"
        section="dv"
        vtClass="a"
        ranking={4}
        clickable
      />
    </div>
  ),
};

export const CompactList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '300px' }}>
      <AthleteCard
        name="Jan Novák"
        club="KK Brandýs"
        section="vt"
        variant="compact"
        clickable
      />
      <AthleteCard
        name="Marie Svobodová"
        club="SK Slavia"
        section="vt"
        variant="compact"
        clickable
      />
      <AthleteCard
        name="Petr Dvořák"
        club="USK Praha"
        section="vt"
        variant="compact"
        clickable
      />
    </div>
  ),
};

export const FeaturedGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
      <AthleteCard
        name="Jiří Prskavec"
        imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&crop=face"
        club="USK Praha"
        section="dv"
        vtClass="m"
        ranking={1}
        variant="featured"
        clickable
      />
      <AthleteCard
        name="Kateřina Kudějová"
        imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop&crop=face"
        club="Dukla Praha"
        section="dv"
        vtClass="m"
        ranking={2}
        variant="featured"
        clickable
      />
      <AthleteCard
        name="Martin Fuksa"
        imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&h=256&fit=crop&crop=face"
        club="Dukla Praha"
        section="ry"
        vtClass="m"
        ranking={1}
        variant="featured"
        clickable
      />
    </div>
  ),
};

export const HeroGrid: Story = {
  name: 'Hero Cards Grid',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
      <AthleteCard
        name="Jiří Prskavec"
        club="USK Praha"
        section="dv"
        vtClass="m"
        ranking={1}
        styleVariant="hero"
        backgroundUrl="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop"
        clickable
        stats={[
          { label: 'Závody', value: 156 },
          { label: 'Medaile', value: 89 },
        ]}
      />
      <AthleteCard
        name="Martin Fuksa"
        club="Dukla Praha"
        section="ry"
        vtClass="m"
        ranking={1}
        styleVariant="hero"
        backgroundUrl="https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&h=400&fit=crop"
        clickable
        stats={[
          { label: 'Závody', value: 124 },
          { label: 'Medaile', value: 67 },
        ]}
      />
      <AthleteCard
        name="Kateřina Kudějová"
        club="Dukla Praha"
        section="dv"
        vtClass="m"
        ranking={2}
        styleVariant="hero"
        backgroundUrl="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop"
        clickable
        stats={[
          { label: 'Závody', value: 98 },
          { label: 'Medaile', value: 45 },
        ]}
      />
    </div>
  ),
};

export const MixedSections: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '450px' }}>
      <AthleteCard
        name="Závodník DV"
        club="USK Praha"
        section="dv"
        vtClass="a"
        vtPoints={1850}
        birthYear={2002}
        clickable
      />
      <AthleteCard
        name="Závodník RY"
        club="Dukla Praha"
        section="ry"
        vtClass="b"
        vtPoints={1350}
        birthYear={2004}
        clickable
      />
      <AthleteCard
        name="Závodník VT"
        club="KK Brandýs"
        section="vt"
        vtClass="c"
        vtPoints={580}
        birthYear={2008}
        clickable
      />
    </div>
  ),
};

// =============================================================================
// Real-world Examples
// =============================================================================

export const StartList: Story = {
  name: 'Example: Startovní listina',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '500px' }}>
      <h3 style={{ margin: '0 0 12px', fontSize: '14px', color: '#666' }}>K1 Muži - Kvalifikace</h3>
      {[
        { start: 1, name: 'Jiří Prskavec', club: 'USK Praha', bib: 101 },
        { start: 2, name: 'Vít Přindiš', club: 'Dukla Praha', bib: 102 },
        { start: 3, name: 'Lukáš Rohan', club: 'USK Praha', bib: 103 },
        { start: 4, name: 'Ondřej Tunka', club: 'SK Slavia', bib: 104 },
      ].map((athlete, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            width: '32px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 600,
            color: '#666'
          }}>
            {athlete.start}.
          </span>
          <AthleteCard
            name={athlete.name}
            club={athlete.club}
            section="dv"
            variant="compact"
            clickable
            style={{ flex: 1 }}
          />
          <span style={{
            minWidth: '48px',
            padding: '4px 8px',
            fontSize: '12px',
            fontWeight: 600,
            textAlign: 'center',
            background: '#f3f4f6',
            borderRadius: '4px'
          }}>
            #{athlete.bib}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const SearchResults: Story = {
  name: 'Example: Výsledky vyhledávání',
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <div style={{
        padding: '8px 12px',
        marginBottom: '12px',
        fontSize: '13px',
        color: '#666',
        background: '#f9fafb',
        borderRadius: '6px'
      }}>
        Nalezeno 4 závodníci pro "Nov"
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <AthleteCard
          name="Jan Novák"
          club="KK Brandýs"
          clubId="BRA01"
          section="vt"
          vtClass="b"
          birthYear={2005}
          licenseNumber="CZE-2005-0234"
          clickable
        />
        <AthleteCard
          name="Marie Nováková"
          club="USK Praha"
          clubId="USK01"
          section="dv"
          vtClass="a"
          birthYear={2003}
          licenseNumber="CZE-2003-0089"
          clickable
        />
        <AthleteCard
          name="Petr Novotný"
          club="Dukla Praha"
          clubId="DUK01"
          section="ry"
          birthYear={2006}
          licenseNumber="CZE-2006-0156"
          clickable
        />
        <AthleteCard
          name="Anna Nováčková"
          club="SK Slavia Praha"
          clubId="SLA01"
          section="vt"
          vtClass="c"
          birthYear={2008}
          licenseNumber="CZE-2008-0312"
          clickable
        />
      </div>
    </div>
  ),
};

export const ClubRoster: Story = {
  name: 'Example: Soupiska klubu',
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        marginBottom: '16px',
        background: '#f9fafb',
        borderRadius: '8px'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1176a6',
          color: 'white',
          borderRadius: '8px',
          fontWeight: 700
        }}>
          USK
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>USK Praha</div>
          <div style={{ fontSize: '13px', color: '#666' }}>12 aktivních závodníků</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        <AthleteCard
          name="Jiří Prskavec"
          section="dv"
          vtClass="m"
          ranking={1}
          size="sm"
          clickable
        />
        <AthleteCard
          name="Tereza Fišerová"
          section="dv"
          vtClass="a"
          size="sm"
          clickable
        />
        <AthleteCard
          name="Lukáš Rohan"
          section="dv"
          vtClass="m"
          size="sm"
          clickable
        />
        <AthleteCard
          name="Jan Novák"
          section="vt"
          vtClass="b"
          size="sm"
          clickable
        />
      </div>
    </div>
  ),
};

// =============================================================================
// Featured Showcase
// =============================================================================

export const FeaturedShowcase: Story = {
  name: 'Featured Showcase',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Hero Section */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: '14px', color: '#666', fontWeight: 600 }}>HERO CARDS</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <AthleteCard
            name="Jiří Prskavec"
            club="USK Praha"
            section="dv"
            vtClass="m"
            ranking={1}
            styleVariant="hero"
            backgroundUrl="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop"
            clickable
          />
          <AthleteCard
            name="Martin Fuksa"
            club="Dukla Praha"
            section="ry"
            ranking={1}
            styleVariant="hero"
            backgroundUrl="https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&h=400&fit=crop"
            clickable
          />
        </div>
      </div>

      {/* Featured Cards */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: '14px', color: '#666', fontWeight: 600 }}>FEATURED CARDS</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <AthleteCard
            name="Jiří Prskavec"
            imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&crop=face"
            club="USK Praha"
            section="dv"
            vtClass="m"
            ranking={1}
            variant="featured"
            clickable
          />
          <AthleteCard
            name="Kateřina Kudějová"
            imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop&crop=face"
            club="Dukla Praha"
            section="dv"
            variant="featured"
            styleVariant="gradient"
            ranking={2}
            clickable
          />
          <AthleteCard
            name="Martin Fuksa"
            imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&h=256&fit=crop&crop=face"
            club="Dukla Praha"
            section="ry"
            ranking={1}
            variant="featured"
            clickable
          />
        </div>
      </div>

      {/* Gradient Cards */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: '14px', color: '#666', fontWeight: 600 }}>GRADIENT CARDS</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
          <AthleteCard
            name="Závodník DV"
            imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face"
            club="USK Praha"
            section="dv"
            vtClass="m"
            styleVariant="gradient"
            clickable
          />
          <AthleteCard
            name="Závodník RY"
            imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face"
            club="Dukla Praha"
            section="ry"
            vtClass="a"
            styleVariant="gradient"
            clickable
          />
        </div>
      </div>

      {/* Glass Cards on colored background */}
      <div style={{
        padding: '32px',
        background: 'linear-gradient(135deg, #1176a6 0%, #0d5a7d 50%, #16a34a 100%)',
        borderRadius: '16px',
        marginLeft: '-16px',
        marginRight: '-16px',
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '14px', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>GLASS CARDS</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <AthleteCard
            name="Glass Card 1"
            imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face"
            club="USK Praha"
            section="dv"
            vtClass="m"
            styleVariant="glass"
            clickable
          />
          <AthleteCard
            name="Glass Card 2"
            imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face"
            club="Dukla Praha"
            section="ry"
            styleVariant="glass"
            clickable
          />
        </div>
      </div>
    </div>
  ),
};

// =============================================================================
// Embed Mode (kanoe.cz integration)
// =============================================================================

export const EmbedInKanoeCz: Story = {
  name: 'Embed: V kontextu kanoe.cz',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'AthleteCard v embed režimu, zasazená do mock prostředí kanoe.cz. Neutrální styling bez stínů, border místo shadow.',
      },
    },
  },
  render: () => (
    <KanoeCzContext layout="sidebar">
      <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 600 }}>Závodníci klubu</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <AthleteCard
          name="Jiří Prskavec"
          club="USK Praha"
          section="dv"
          vtClass="m"
          ranking={1}
          clickable
        />
        <AthleteCard
          name="Vít Přindiš"
          club="Dukla Praha"
          section="dv"
          vtClass="m"
          ranking={2}
          clickable
        />
        <AthleteCard
          name="Tereza Fišerová"
          club="Dukla Praha"
          section="dv"
          vtClass="a"
          clickable
        />
      </div>
    </KanoeCzContext>
  ),
};

export const EmbedCompactList: Story = {
  name: 'Embed: Kompaktní seznam',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Kompaktní varianta AthleteCard v embed režimu - ideální pro startovní listiny a výsledkové tabulky.',
      },
    },
  },
  render: () => (
    <KanoeCzContext layout="full">
      <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 600 }}>K1 Muži - Startovní listina</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {[
          { start: 1, name: 'Jiří Prskavec', club: 'USK Praha', bib: 101 },
          { start: 2, name: 'Vít Přindiš', club: 'Dukla Praha', bib: 102 },
          { start: 3, name: 'Lukáš Rohan', club: 'USK Praha', bib: 103 },
          { start: 4, name: 'Ondřej Tunka', club: 'SK Slavia', bib: 104 },
          { start: 5, name: 'Jakub Krejčí', club: 'Dukla Praha', bib: 105 },
        ].map((athlete, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              width: '28px',
              textAlign: 'center',
              fontSize: '13px',
              fontWeight: 600,
              color: '#666'
            }}>
              {athlete.start}.
            </span>
            <AthleteCard
              name={athlete.name}
              club={athlete.club}
              section="dv"
              variant="compact"
              clickable
              style={{ flex: 1 }}
            />
            <span style={{
              minWidth: '44px',
              padding: '4px 8px',
              fontSize: '12px',
              fontWeight: 600,
              textAlign: 'center',
              background: '#f3f4f6',
              borderRadius: '4px',
              border: '1px solid #e5e7eb'
            }}>
              #{athlete.bib}
            </span>
          </div>
        ))}
      </div>
    </KanoeCzContext>
  ),
};

export const EmbedSearchResults: Story = {
  name: 'Embed: Výsledky vyhledávání',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'AthleteCard jako výsledky vyhledávání v registru závodníků embedovaném na kanoe.cz.',
      },
    },
  },
  render: () => (
    <KanoeCzContext layout="narrow">
      <div style={{
        padding: '8px 12px',
        marginBottom: '12px',
        fontSize: '13px',
        color: '#666',
        background: '#f9fafb',
        borderRadius: '6px',
        border: '1px solid #e5e7eb'
      }}>
        Nalezeno 4 závodníci pro "Novák"
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <AthleteCard
          name="Jan Novák"
          club="KK Brandýs"
          clubId="BRA01"
          section="vt"
          vtClass="b"
          birthYear={2005}
          licenseNumber="CZE-2005-0234"
          clickable
        />
        <AthleteCard
          name="Marie Nováková"
          club="USK Praha"
          clubId="USK01"
          section="dv"
          vtClass="a"
          birthYear={2003}
          licenseNumber="CZE-2003-0089"
          clickable
        />
        <AthleteCard
          name="Petr Novotný"
          club="Dukla Praha"
          clubId="DUK01"
          section="ry"
          birthYear={2006}
          licenseNumber="CZE-2006-0156"
          clickable
        />
        <AthleteCard
          name="Anna Nováčková"
          club="SK Slavia Praha"
          clubId="SLA01"
          section="vt"
          vtClass="c"
          birthYear={2008}
          licenseNumber="CZE-2008-0312"
          clickable
        />
      </div>
    </KanoeCzContext>
  ),
};

export const EmbedFeaturedAthletes: Story = {
  name: 'Embed: Hvězdy klubu',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Featured varianta AthleteCard v embed režimu pro zobrazení hvězd klubu na hlavní stránce.',
      },
    },
  },
  render: () => (
    <KanoeCzContext layout="full">
      <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 600 }}>Hvězdy českého kanoistiky</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <AthleteCard
          name="Jiří Prskavec"
          imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&crop=face"
          club="USK Praha"
          section="dv"
          vtClass="m"
          ranking={1}
          variant="featured"
          clickable
        />
        <AthleteCard
          name="Martin Fuksa"
          imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&h=256&fit=crop&crop=face"
          club="Dukla Praha"
          section="ry"
          vtClass="m"
          ranking={1}
          variant="featured"
          clickable
        />
        <AthleteCard
          name="Tereza Fišerová"
          imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop&crop=face"
          club="Dukla Praha"
          section="dv"
          vtClass="a"
          ranking={3}
          variant="featured"
          clickable
        />
      </div>
    </KanoeCzContext>
  ),
};
