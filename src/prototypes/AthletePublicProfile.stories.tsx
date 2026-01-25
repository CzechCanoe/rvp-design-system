import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../components/Header';
import { MainNav } from '../components/Navigation';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Icon } from '../components/Icon';
import { StatsBar, type StatsBarItem } from '../components/StatsBar';
import { CSKLogo } from '../components/CSKLogo';
import { KanoeCzContext } from '../components/KanoeCzContext';
import './AthletePublicProfile.css';

// ============================================================================
// Types
// ============================================================================

/** Display variant for the page */
type AthletePublicProfileVariant = 'standalone' | 'satellite' | 'embed';

interface AthletePublicProfileProps {
  /** Athlete section/discipline for theming */
  section?: 'dv' | 'ry' | 'vt';
  /** Show background image */
  showBackgroundImage?: boolean;
  /** Display variant */
  variant?: AthletePublicProfileVariant;
  /** Aesthetic mode - display fonts, energy accents, mesh backgrounds */
  aesthetic?: boolean;
}

// ============================================================================
// Sample Data
// ============================================================================

const athleteData = {
  id: 'CZE-12345',
  name: 'Jiří Prskavec',
  birthYear: 1993,
  club: 'USK Praha',
  country: 'CZE',
  countryFlag: '🇨🇿',
  section: 'dv' as const,
  vtClass: 'm' as const,
  vtPoints: 1250,
  ranking: 1,
  imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=faces',
  // Action photo for hero background (different from portrait)
  actionImageUrl: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=1920&h=1080&fit=crop',
  stats: {
    wins: 98,
    podiums: 187,
    totalRaces: 312,
    worldRanking: 1,
  },
  highlights: [
    {
      year: '2021',
      title: 'Olympijské zlato',
      description: 'Tokio 2020 - K1 muži',
      iconType: 'olympic-gold' as HighlightType,
    },
    {
      year: '2023',
      title: 'Mistr světa',
      description: 'Lee Valley, Velká Británie - K1',
      iconType: 'world' as HighlightType,
    },
    {
      year: '2024',
      title: 'Celkový vítěz SP',
      description: 'Světový pohár - K1 muži',
      iconType: 'cup' as HighlightType,
    },
  ],
  recentResults: [
    { id: '1', race: 'Český pohár #1', location: 'Praha - Troja', date: '2026-01-12', rank: 1, time: '92.34', category: 'K1M' },
    { id: '2', race: 'MČR ve slalomu', location: 'Lipno', date: '2025-11-28', rank: 1, time: '94.12', category: 'K1M' },
    { id: '3', race: 'Podzimní slalom', location: 'Brandýs nad Labem', date: '2025-10-15', rank: 2, time: '91.56', category: 'K1M' },
    { id: '4', race: 'Český pohár #5', location: 'Trnávka', date: '2025-09-22', rank: 1, time: '93.78', category: 'K1M' },
    { id: '5', race: 'Český pohár #4', location: 'Roudnice', date: '2025-07-05', rank: 1, time: '95.23', category: 'K1M' },
    { id: '6', race: 'Letní sprint', location: 'Praha - Troja', date: '2025-08-18', rank: 3, time: '94.67', category: 'K1M' },
  ],
};

const ryAthleteData = {
  ...athleteData,
  id: 'CZE-67890',
  name: 'Martin Fuksa',
  club: 'Dukla Praha',
  section: 'ry' as const,
  imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
  actionImageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop',
  stats: {
    wins: 89,
    podiums: 156,
    totalRaces: 245,
    worldRanking: 2,
  },
  highlights: [
    {
      year: '2023',
      title: 'Mistr světa',
      description: 'Duisburg, Německo - C1 1000m',
      iconType: 'world' as HighlightType,
    },
    {
      year: '2022',
      title: 'Mistr Evropy',
      description: 'Mnichov, Německo - C1 1000m',
      iconType: 'world' as HighlightType,
    },
    {
      year: '2024',
      title: 'Celkový vítěz SP',
      description: 'Světový pohár - C1 muži',
      iconType: 'cup' as HighlightType,
    },
  ],
};

const vtAthleteData = {
  ...athleteData,
  id: 'CZE-11111',
  name: 'Petr Novák',
  club: 'TJ Bohemians',
  section: 'vt' as const,
  vtClass: 'a' as const,
  vtPoints: 890,
  ranking: 5,
  imageUrl: undefined,
  actionImageUrl: 'https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=1920&h=1080&fit=crop',
  stats: {
    wins: 12,
    podiums: 34,
    totalRaces: 78,
    worldRanking: null,
  },
  highlights: [
    {
      year: '2025',
      title: 'Mistr ČR',
      description: 'VT třída A - sjezd',
      iconType: 'national' as HighlightType,
    },
    {
      year: '2024',
      title: 'Postup do třídy A',
      description: 'Na základě výsledků sezóny 2024',
      iconType: 'promotion' as HighlightType,
    },
  ],
};

// Navigation items
const navItems = [
  { id: 'home', label: 'Domů', href: '#' },
  { id: 'calendar', label: 'Kalendář', href: '#' },
  { id: 'results', label: 'Výsledky', href: '#' },
  { id: 'athletes', label: 'Závodníci', href: '#', active: true },
  { id: 'clubs', label: 'Kluby', href: '#' },
];

// ============================================================================
// Icons - using Icon component from design system
// ============================================================================

// Map highlight types to Icon names
type HighlightType = 'olympic-gold' | 'olympic-silver' | 'olympic-bronze' | 'world' | 'cup' | 'national' | 'promotion';

function getHighlightIconName(type: HighlightType): 'medal' | 'globe' | 'cup' | 'star' | 'promotion' | 'trophy' {
  switch (type) {
    case 'olympic-gold':
    case 'olympic-silver':
    case 'olympic-bronze':
      return 'medal';
    case 'world':
      return 'globe';
    case 'cup':
      return 'cup';
    case 'national':
      return 'star';
    case 'promotion':
      return 'promotion';
    default:
      return 'trophy';
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
}

function getSectionName(section: 'dv' | 'ry' | 'vt'): string {
  const names = {
    dv: 'Divoká voda',
    ry: 'Rychlostní kanoistika',
    vt: 'Vodní turistika',
  };
  return names[section];
}

function getVtClassName(vtClass: 'm' | 'a' | 'b' | 'c'): string {
  const names = {
    m: 'Mistrovská třída',
    a: 'Třída A',
    b: 'Třída B',
    c: 'Třída C',
  };
  return names[vtClass];
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return '';
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

function getRankClass(rank: number): string {
  if (rank === 1) return 'athlete-result-card__rank--1';
  if (rank === 2) return 'athlete-result-card__rank--2';
  if (rank === 3) return 'athlete-result-card__rank--3';
  return 'athlete-result-card__rank--other';
}

// ============================================================================
// AthletePublicProfile Component
// ============================================================================

function AthletePublicProfile({
  section = 'dv',
  showBackgroundImage = true,
  variant = 'standalone',
  aesthetic = false,
}: AthletePublicProfileProps) {
  // Helper to check if we're in embed mode
  const isEmbed = variant === 'embed';
  // Select data based on section
  const athlete = section === 'ry' ? ryAthleteData : section === 'vt' ? vtAthleteData : athleteData;

  // Build class names
  const rootClasses = [
    'athlete-public-profile',
    isEmbed && 'athlete-public-profile--embed',
    aesthetic && 'athlete-public-profile--aesthetic',
  ].filter(Boolean).join(' ');

  // Use action photo for hero background, fall back to portrait if not available
  const heroBackgroundUrl = athlete.actionImageUrl || athlete.imageUrl;
  const heroBackgroundStyle = showBackgroundImage && heroBackgroundUrl
    ? { backgroundImage: `url(${heroBackgroundUrl})` }
    : { background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' };

  // Render header based on variant
  const renderHeader = () => {
    if (isEmbed) {
      return null;
    }

    if (variant === 'satellite') {
      return (
        <Header
          variant="satellite"
          size="sm"
          bordered
          brand={<CSKLogo />}
          appName="Profil závodníka"
          homeLink="https://kanoe.cz"
          homeLinkLabel="kanoe.cz"
          userMenu={
            <Button variant="ghost" size="sm">
              Přihlásit se
            </Button>
          }
        />
      );
    }

    // Default: standalone with full navigation
    return (
      <Header
        brand={<span className="athlete-public-profile__logo">CSK</span>}
        navigation={<MainNav items={navItems} />}
        userMenu={<Button variant="ghost" size="sm">Přihlásit se</Button>}
        bordered
      />
    );
  };

  // Render footer based on variant
  const renderFooter = () => {
    if (isEmbed) {
      return null;
    }

    return (
      <footer className="athlete-footer">
        <div className="athlete-footer__container">
          <p className="athlete-footer__text">
            © 2026 Český svaz kanoistů. Veřejný profil závodníka.
          </p>
        </div>
      </footer>
    );
  };

  return (
    <div className={rootClasses} data-mode="expressive">
      {/* Header */}
      {renderHeader()}

      {/* Hero Section */}
      <section className={`athlete-hero athlete-hero--${section}`}>
        <div className="athlete-hero__background">
          <div
            className="athlete-hero__image"
            style={heroBackgroundStyle}
          />
          <div className="athlete-hero__gradient" />
          <div className="athlete-hero__pattern" />
        </div>

        <div className="athlete-hero__content">
          {/* Avatar */}
          <div className="athlete-hero__avatar">
            <div className="athlete-hero__avatar-ring">
              {athlete.imageUrl ? (
                <img
                  src={athlete.imageUrl}
                  alt={athlete.name}
                  className="athlete-hero__avatar-img"
                />
              ) : (
                <div className="athlete-hero__avatar-initials">
                  {getInitials(athlete.name)}
                </div>
              )}
            </div>
            {athlete.ranking <= 3 && (
              <div className={`athlete-hero__rank-badge athlete-hero__rank-badge--${athlete.ranking}`}>
                #{athlete.ranking}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="athlete-hero__info">
            <h1 className="athlete-hero__name">{athlete.name}</h1>
            <div className="athlete-hero__subtitle">
              <span className="athlete-hero__country" title={athlete.country}>
                <span className="athlete-hero__country-flag">{athlete.countryFlag}</span>
              </span>
              <div className="athlete-hero__badges">
                <Badge section={section} size="lg">
                  {getSectionName(section)}
                </Badge>
                <Badge vtClass={athlete.vtClass} size="lg">
                  {getVtClassName(athlete.vtClass)}
                </Badge>
                <Badge outlined size="lg">{athlete.vtPoints} bodů</Badge>
              </div>
            </div>
            <div className="athlete-hero__meta">
              <div className="athlete-hero__meta-item">
                <span className="athlete-hero__meta-label">Klub</span>
                <span className="athlete-hero__meta-value">{athlete.club}</span>
              </div>
              <div className="athlete-hero__meta-item">
                <span className="athlete-hero__meta-label">Ročník</span>
                <span className="athlete-hero__meta-value">*{athlete.birthYear}</span>
              </div>
              <div className="athlete-hero__meta-item">
                <span className="athlete-hero__meta-label">ID</span>
                <span className="athlete-hero__meta-value">{athlete.id}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="athlete-hero__actions">
            <Button variant="secondary" size="md">
              <Icon name="share" size="sm" /> Sdílet
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Banner - using StatsBar component */}
      <div className="athlete-stats-banner">
        <div className="athlete-stats-banner__container">
          <StatsBar
            variant="cards"
            size="lg"
            items={[
              { key: 'wins', icon: 'trophy', value: athlete.stats.wins, label: 'Vítězství' },
              { key: 'podiums', icon: 'medal', value: athlete.stats.podiums, label: 'Pódia' },
              { key: 'races', icon: 'activity', value: athlete.stats.totalRaces, label: 'Závodů' },
              { key: 'world', icon: 'globe', value: athlete.stats.worldRanking ? `#${athlete.stats.worldRanking}` : '-', label: 'Svět. žebříček' },
            ] satisfies StatsBarItem[]}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="athlete-main">
        <div className="athlete-main__container">
          {/* Career Highlights */}
          <section className="athlete-section">
            <div className="athlete-section__header">
              <div>
                <h2 className="athlete-section__title">Kariérní úspěchy</h2>
                <p className="athlete-section__subtitle">Největší milníky v kariéře</p>
              </div>
            </div>
            <div className="athlete-highlights">
              {athlete.highlights.map((highlight, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  className="athlete-highlight-card"
                  clickable
                >
                  <span className="athlete-highlight-card__year">{highlight.year}</span>
                  <h3 className="athlete-highlight-card__title">{highlight.title}</h3>
                  <p className="athlete-highlight-card__description">{highlight.description}</p>
                  <span className="athlete-highlight-card__icon">
                    <Icon name={getHighlightIconName(highlight.iconType)} size="xl" />
                  </span>
                </Card>
              ))}
            </div>
          </section>

          {/* Recent Results */}
          <section className="athlete-section">
            <div className="athlete-section__header">
              <div>
                <h2 className="athlete-section__title">Poslední výsledky</h2>
                <p className="athlete-section__subtitle">Výsledky z posledních závodů</p>
              </div>
              <Button variant="ghost">Zobrazit všechny</Button>
            </div>
            <div className="athlete-results-grid">
              {athlete.recentResults.map((result) => (
                <Card
                  key={result.id}
                  variant="outlined"
                  className="athlete-result-card"
                  clickable
                >
                  <div className={`athlete-result-card__rank ${getRankClass(result.rank)}`}>
                    {result.rank}.
                  </div>
                  <div className="athlete-result-card__info">
                    <h3 className="athlete-result-card__race">{result.race}</h3>
                    <div className="athlete-result-card__meta">
                      <span>{result.location}</span>
                      <span>{formatDate(result.date)}</span>
                      <span>{result.category}</span>
                    </div>
                  </div>
                  <div className="athlete-result-card__time">{result.time}</div>
                </Card>
              ))}
            </div>
          </section>

          {/* Season Progress (Placeholder) */}
          <section className="athlete-section">
            <div className="athlete-section__header">
              <div>
                <h2 className="athlete-section__title">Sezóna 2026</h2>
                <p className="athlete-section__subtitle">Průběh aktuální sezóny</p>
              </div>
            </div>
            <Card variant="outlined" className="athlete-chart-placeholder">
              📊 Graf výkonnosti - připravuje se
            </Card>
          </section>
        </div>
      </main>

      {/* Footer */}
      {renderFooter()}
    </div>
  );
}

// ============================================================================
// Stories
// ============================================================================

const meta: Meta<typeof AthletePublicProfile> = {
  title: 'Prototypes/AthletePublicProfile',
  component: AthletePublicProfile,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Veřejný profil závodníka - EXPRESSIVE Mode

Celostránkový "wow" profil závodníka s dramatickým vizuálním stylem pro veřejné zobrazení.

## Použití

Tento prototyp využívá **expressive mode** s většími fonty, dramatickými gradienty a animovanými prvky.

## Hlavní sekce

1. **Hero Section** - Full-height hero s velkým avatarem, mega jménem a disciplínovým gradientem
2. **Stats Banner** - Floating karty se statistikami (vítězství, pódia, závody, světový žebříček)
3. **Kariérní úspěchy** - Vizuální karty s největšími milníky
4. **Poslední výsledky** - Kompaktní grid výsledků s pořadím
5. **Sezóna** - Placeholder pro graf výkonnosti

## Discipline Theming

- **DV (Divoká voda)** - modrý gradient
- **RY (Rychlostní kanoistika)** - zelený gradient
- **VT (Vodní turistika)** - červený gradient

## Design Tokens

Využívá expressive tokeny:
- \`--text-expr-mega-*\` - mega typography pro jméno
- \`--text-expr-stat-*\` - statistiky
- \`--shadow-expr-*\` - dramatické stíny
- \`--spacing-expr-*\` - štědré odsazení

## Rozdíl od ProfilePage

| ProfilePage | AthletePublicProfile |
|------------|---------------------|
| Utility mode | Expressive mode |
| Interní/admin | Veřejný wow profil |
| Kompaktní | Dramatický fullscreen |
| Registrační data | Kariérní úspěchy |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    section: {
      control: 'select',
      options: ['dv', 'ry', 'vt'],
      description: 'Athlete section/discipline for theming',
    },
    showBackgroundImage: {
      control: 'boolean',
      description: 'Show background image in hero',
    },
    variant: {
      control: 'select',
      options: ['standalone', 'satellite', 'embed'],
      description: 'Display variant for different integration contexts',
    },
    aesthetic: {
      control: 'boolean',
      description: 'Enable aesthetic mode with display fonts, energy accents, mesh backgrounds',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AthletePublicProfile>;

// ============================================================================
// Phase 16.1: Consolidated Variants - Embed/Satellite/Expressive (all Aesthetic)
// Use Storybook Controls to change section (dv/ry/vt) and showBackgroundImage
// ============================================================================

/**
 * Embed varianta pro vložení do kanoe.cz.
 * Aesthetic styl, bez vlastního headeru a footeru.
 */
export const Embed: Story = {
  name: 'Embed',
  args: {
    section: 'dv',
    showBackgroundImage: true,
    variant: 'embed',
    aesthetic: true,
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="full"
        pageVariant="detail"
        pageTitle="Jiří Prskavec - Profil závodníka"
        breadcrumbs={[
          { label: 'Domů', href: '#' },
          { label: 'Závodníci', href: '#' },
          { label: 'Jiří Prskavec' },
        ]}
      >
        <Story />
      </KanoeCzContext>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: `
**Embed varianta** pro vložení do kanoe.cz kontextu:
- Aesthetic styl (display fonts, energy accents, mesh backgrounds)
- Bez vlastního headeru a footeru
- Kompaktní layout optimalizovaný pro vložení
- Container queries pro responsivní chování
        `,
      },
    },
  },
};

/**
 * Satellite varianta pro standalone aplikace.
 * Aesthetic styl, minimální header s odkazem na kanoe.cz.
 */
export const Satellite: Story = {
  name: 'Satellite',
  args: {
    section: 'dv',
    showBackgroundImage: true,
    variant: 'satellite',
    aesthetic: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Satellite varianta** pro standalone aplikace:
- Aesthetic styl (display fonts, energy accents, mesh backgrounds)
- Minimální header s odkazem zpět na kanoe.cz
- Vlastní footer
- Plný "wow" profil s dramatickým hero
        `,
      },
    },
  },
};

/**
 * Expressive varianta - plný "wow" profil bez kanoe.cz kontextu.
 * Aesthetic styl, kompletní standalone aplikace.
 */
export const ExpressiveEmbed: Story = {
  name: 'Expressive Embed',
  args: {
    section: 'dv',
    showBackgroundImage: true,
    variant: 'embed',
    aesthetic: true,
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="full"
        pageVariant="detail"
        pageTitle="Jiří Prskavec - Profil závodníka"
        breadcrumbs={[
          { label: 'Domů', href: '#' },
          { label: 'Závodníci', href: '#' },
          { label: 'Jiří Prskavec' },
        ]}
      >
        <Story />
      </KanoeCzContext>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: `
**Expressive Embed varianta** - plný "wow" profil v kanoe.cz kontextu:
- Aesthetic styl (display fonts, energy accents, mesh backgrounds)
- Vložené do kanoe.cz layoutu
- Dramatický fullscreen hero
- Staggered reveal animace pro career highlights
- Použijte Controls pro změnu sekce (dv/ry/vt)
        `,
      },
    },
  },
};
