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
// Variants Comparison
// =============================================================================

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666', fontWeight: 600 }}>DEFAULT</div>
        <AthleteCard
          name="Jan Novák"
          club="USK Praha"
          section="dv"
          vtClass="a"
          clickable
        />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666', fontWeight: 600 }}>COMPACT</div>
        <AthleteCard
          name="Marie Svobodová"
          club="Dukla Praha"
          section="ry"
          variant="compact"
          clickable
        />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666', fontWeight: 600 }}>FEATURED</div>
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
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666', fontWeight: 600 }}>SIZE: SM</div>
        <AthleteCard name="Jan Kowalski" club="KK Brandýs" section="vt" size="sm" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666', fontWeight: 600 }}>SIZE: MD (default)</div>
        <AthleteCard name="Petr Holub" club="USK Praha" section="dv" size="md" />
      </div>
      <div>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666', fontWeight: 600 }}>SIZE: LG</div>
        <AthleteCard
          name="Eva Černá"
          imageUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face"
          club="Dukla Praha"
          section="ry"
          size="lg"
          birthYear={2001}
        />
      </div>
    </div>
  ),
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
// Sections (use argTypes to switch)
// =============================================================================

export const SectionShowcase: Story = {
  name: 'Sections (DV/RY/VT)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '450px' }}>
      <AthleteCard
        name="Vít Přindiš"
        club="Dukla Praha"
        section="dv"
        vtClass="m"
        vtPoints={2200}
        birthYear={1995}
        clickable
      />
      <AthleteCard
        name="Martin Fuksa"
        club="Dukla Praha"
        section="ry"
        vtClass="m"
        vtPoints={2100}
        birthYear={1993}
        clickable
      />
      <AthleteCard
        name="Nováček Začátečník"
        club="KK Brandýs"
        section="vt"
        vtClass="c"
        vtPoints={450}
        birthYear={2010}
        clickable
      />
    </div>
  ),
};

// =============================================================================
// VT Classes (use argTypes to switch)
// =============================================================================

export const VtClassesShowcase: Story = {
  name: 'VT Classes (M/A/B/C)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '450px' }}>
      <AthleteCard name="Třída M (Master)" club="USK Praha" section="vt" vtClass="m" vtPoints={2500} />
      <AthleteCard name="Třída A" club="Dukla Praha" section="vt" vtClass="a" vtPoints={1800} />
      <AthleteCard name="Třída B" club="SK Slavia Praha" section="vt" vtClass="b" vtPoints={1200} />
      <AthleteCard name="Třída C" club="KK Roudnice" section="vt" vtClass="c" vtPoints={600} />
    </div>
  ),
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

// =============================================================================
// Real-world Example
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

export const EmbedFeaturedAthletes: Story = {
  name: 'Embed: Hvězdy kanoistiky',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Featured varianta AthleteCard v embed režimu pro zobrazení hvězd na hlavní stránce.',
      },
    },
  },
  render: () => (
    <KanoeCzContext layout="full">
      <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 600 }}>Hvězdy české kanoistiky</h2>
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
