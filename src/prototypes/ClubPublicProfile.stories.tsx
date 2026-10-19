import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../components/Header';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Tabs } from '../components/Tabs';
import { Avatar } from '../components/Avatar';
import { Icon } from '../components/Icon';
import { StatsBar } from '../components/StatsBar';
import { HeroSection, HeroActionButton } from '../components/HeroSection';
import { CSKLogo } from '../components/CSKLogo';
import { KanoeCzContext } from '../components/KanoeCzContext';
import './ClubPublicProfile.css';

// ============================================================================
// Types
// ============================================================================

/** Display variant for the page */
type ClubPublicProfileVariant = 'standalone' | 'satellite' | 'embed';

interface ClubPublicProfileProps {
  /** Display variant */
  variant?: ClubPublicProfileVariant;
  /** Club ID to display */
  clubId?: string;
  /** Aesthetic mode - display fonts, energy accents, mesh backgrounds */
  aesthetic?: boolean;
}

interface ClubMember {
  id: string;
  name: string;
  birthYear: number;
  category: string;
  section: 'dv' | 'ry' | 'vt';
  ranking?: number;
  imageUrl?: string;
}


// ============================================================================
// Sample Data
// ============================================================================

const clubData = {
  id: 'USK',
  name: 'Univerzitní sportovní klub Praha',
  shortName: 'USK Praha',
  code: 'USK',
  founded: 1953,
  city: 'Praha',
  region: 'Praha',
  address: 'Vodácká 245/2, 170 00 Praha 7 - Troja',
  email: 'info@uskpraha.cz',
  web: 'www.uskpraha.cz',
  phone: '+420 123 456 789',
  sections: ['dv', 'ry'] as const,
  logoUrl: '',
  stats: {
    members: 245,
    athletes: 128,
    coaches: 12,
    juniors: 45,
  },
  highlights: [
    {
      year: '2025',
      title: 'Nejlepší klub ČR',
      description: 'Celkové hodnocení sezóny 2025',
      medal: '🏆',
    },
    {
      year: '2024',
      title: 'MČR družstev',
      description: '1. místo v kategorii mužů',
      medal: '🥇',
    },
    {
      year: '2023',
      title: '70 let klubu',
      description: 'Oslava založení klubu',
      medal: '🎉',
    },
  ],
};

const clubMembers: ClubMember[] = [
  { id: 'CZE-12345', name: 'Jiří Prskavec', birthYear: 1993, category: 'K1M', section: 'dv', ranking: 1, imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop&crop=faces' },
  { id: 'CZE-12346', name: 'Vít Přindiš', birthYear: 1989, category: 'K1M', section: 'dv', ranking: 3, imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces' },
  { id: 'CZE-12347', name: 'Tereza Fišerová', birthYear: 1997, category: 'C1W', section: 'dv', ranking: 2, imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces' },
  { id: 'CZE-12348', name: 'Lukáš Rohan', birthYear: 1995, category: 'C1M', section: 'dv', ranking: 5 },
  { id: 'CZE-12349', name: 'Ondřej Tunka', birthYear: 1994, category: 'K1M', section: 'dv', ranking: 8 },
  { id: 'CZE-12350', name: 'Jakub Krejčí', birthYear: 2000, category: 'K1M', section: 'ry', ranking: 12 },
  { id: 'CZE-12351', name: 'Adéla Házová', birthYear: 1998, category: 'K1W', section: 'ry', ranking: 4, imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces' },
  { id: 'CZE-12352', name: 'Martin Doktor', birthYear: 1974, category: 'C1M', section: 'ry' },
];


// ============================================================================
// Helper Functions
// ============================================================================

function getSectionName(section: 'dv' | 'ry' | 'vt'): string {
  const names = {
    dv: 'Divoká voda',
    ry: 'Rychlostní kanoistika',
    vt: 'Vodní turistika',
  };
  return names[section];
}


// ============================================================================
// ClubPublicProfile Component
// ============================================================================

function ClubPublicProfile({
  variant = 'standalone',
  aesthetic = false,
}: ClubPublicProfileProps) {
  const isEmbed = variant === 'embed';
  const club = clubData;
  const members = clubMembers;

  // Build class names
  const rootClasses = [
    'club-public-profile',
    isEmbed && 'club-public-profile--embed',
    aesthetic && 'club-public-profile--aesthetic',
  ].filter(Boolean).join(' ');

  // Tab content
  const tabs = [
    { id: 'members', label: 'Členové', content: null },
    { id: 'achievements', label: 'Úspěchy', content: null },
    { id: 'contact', label: 'Kontakt', content: null },
  ];

  // Render header based on variant
  const renderHeader = () => {
    if (isEmbed) {
      return null;
    }

    if (variant === 'satellite') {
      return (
        <Header
          variant="satellite"
          brand={<CSKLogo />}
          appName="Profil klubu"
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

    // Default: standalone
    return null;
  };

  // Render footer based on variant
  const renderFooter = () => {
    if (isEmbed) {
      return null;
    }

    return (
      <footer className="club-profile-footer">
        <div className="club-profile-footer__container">
          <p className="club-profile-footer__text">
            © 2026 Český svaz kanoistů. Veřejný profil klubu.
          </p>
        </div>
      </footer>
    );
  };

  return (
    <div className={rootClasses}>
      {/* Header */}
      {renderHeader()}

      {/* Hero Section - using DS component */}
      <HeroSection
        variant="compact"
        section="generic"
        title={club.shortName}
        subtitle={club.name}
        avatarSrc={club.logoUrl || undefined}
        avatarInitials={club.code}
        avatarShape="rounded"
        badges={
          <>
            {club.sections.map(section => (
              <Badge key={section} section={section} size="lg">
                {getSectionName(section)}
              </Badge>
            ))}
          </>
        }
        metadata={[
          { key: 'location', label: 'Lokalita', value: `${club.city}, ${club.region}`, icon: 'map-pin' },
          { key: 'founded', label: 'Založeno', value: club.founded, icon: 'calendar' },
        ]}
        actions={
          <HeroActionButton label="Sdílet" icon="share" />
        }
        floatingContent={
          <StatsBar
            variant="floating"
            size="lg"
            items={[
              { key: 'members', icon: 'users', value: club.stats.members, label: 'Členů' },
              { key: 'athletes', icon: 'trophy', value: club.stats.athletes, label: 'Závodníků' },
              { key: 'coaches', icon: 'graduation-cap', value: club.stats.coaches, label: 'Trenérů' },
              { key: 'juniors', icon: 'user', value: club.stats.juniors, label: 'Juniorů' },
            ]}
          />
        }
        wave
      />

      {/* Main Content */}
      <main className="club-main">
        <div className="club-main__container">
          {/* Navigation Tabs */}
          <div className="club-tabs">
            <Tabs
              tabs={tabs}
              activeTab="members"
              onChange={() => {}}
              variant="line"
              size="lg"
            />
          </div>

          {/* Active Members */}
          <section className="club-section">
            <div className="club-section__header">
              <div>
                <h2 className="club-section__title">Aktivní závodníci</h2>
                <p className="club-section__subtitle">Reprezentanti a aktivní členové klubu</p>
              </div>
              <Button variant="ghost">Zobrazit všechny</Button>
            </div>
            <div className="club-members-grid">
              {members.map((member) => (
                <Card
                  key={member.id}
                  variant="outlined"
                  className="club-member-card"
                  clickable
                >
                  <div className="club-member-card__avatar">
                    {member.imageUrl ? (
                      <Avatar
                        src={member.imageUrl}
                        alt={member.name}
                        size="lg"
                      />
                    ) : (
                      <Avatar
                        name={member.name}
                        size="lg"
                      />
                    )}
                    {member.ranking && member.ranking <= 3 && (
                      <div className={`club-member-card__rank club-member-card__rank--${member.ranking}`}>
                        #{member.ranking}
                      </div>
                    )}
                  </div>
                  <div className="club-member-card__info">
                    <h3 className="club-member-card__name">{member.name}</h3>
                    <div className="club-member-card__meta">
                      <span className="club-member-card__category">{member.category}</span>
                      <span className="club-member-card__year">*{member.birthYear}</span>
                    </div>
                    <Badge section={member.section} size="sm">
                      {member.section.toUpperCase()}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Club Achievements */}
          <section className="club-section">
            <div className="club-section__header">
              <div>
                <h2 className="club-section__title">Úspěchy klubu</h2>
                <p className="club-section__subtitle">Nejvýznamnější momenty v historii</p>
              </div>
            </div>
            <div className="club-highlights">
              {club.highlights.map((highlight, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  className="club-highlight-card"
                  clickable
                >
                  <span className="club-highlight-card__year">{highlight.year}</span>
                  <h3 className="club-highlight-card__title">{highlight.title}</h3>
                  <p className="club-highlight-card__description">{highlight.description}</p>
                  <span className="club-highlight-card__medal">{highlight.medal}</span>
                </Card>
              ))}
            </div>
          </section>

          {/* Contact Info */}
          <section className="club-section">
            <div className="club-section__header">
              <div>
                <h2 className="club-section__title">Kontakt</h2>
                <p className="club-section__subtitle">Spojte se s námi</p>
              </div>
            </div>
            <Card variant="outlined" className="club-contact__card">
              <div className="club-contact__item">
                <div className="club-contact__icon">
                  <Icon name="map-pin" />
                </div>
                <div className="club-contact__content">
                  <span className="club-contact__label">Adresa</span>
                  <span className="club-contact__value">{club.address}</span>
                </div>
              </div>

              <div className="club-contact__item">
                <div className="club-contact__icon">
                  <Icon name="mail" />
                </div>
                <div className="club-contact__content">
                  <span className="club-contact__label">E-mail</span>
                  <a href={`mailto:${club.email}`} className="club-contact__value club-contact__value--link">
                    {club.email}
                  </a>
                </div>
              </div>

              <div className="club-contact__item">
                <div className="club-contact__icon">
                  <Icon name="phone" />
                </div>
                <div className="club-contact__content">
                  <span className="club-contact__label">Telefon</span>
                  <a href={`tel:${club.phone}`} className="club-contact__value club-contact__value--link">
                    {club.phone}
                  </a>
                </div>
              </div>

              <div className="club-contact__item">
                <div className="club-contact__icon">
                  <Icon name="globe" />
                </div>
                <div className="club-contact__content">
                  <span className="club-contact__label">Web</span>
                  <a href={`https://${club.web}`} target="_blank" rel="noopener noreferrer" className="club-contact__value club-contact__value--link">
                    {club.web}
                  </a>
                </div>
              </div>
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

const meta: Meta<typeof ClubPublicProfile> = {
  title: 'Prototypes/ClubPublicProfile',
  component: ClubPublicProfile,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Veřejný profil klubu - Aesthetic Mode

Celostránkový profil klubu/oddílu s "Dynamic Sport" vizuálním stylem pro veřejné zobrazení.

## Použití

Analogie k AthletePublicProfile, ale pro kluby a oddíly ČSK.

## Hlavní sekce

1. **Hero Section** - Logo klubu, název, sekce, lokalita
2. **Stats Banner** - Členové, závodníci, trenéři, junioři
3. **Aktivní závodníci** - Grid s kartami členů
4. **Úspěchy klubu** - Historické milníky
5. **Kontakt** - Adresa, e-mail, telefon, web

## Varianty (Phase 16.1)

| Varianta | Popis |
|----------|-------|
| **Embed** | Aesthetic styl, vložené do kanoe.cz kontextu |
| **Satellite** | Aesthetic styl, minimální header s odkazem na kanoe.cz |
| **Expressive** | Aesthetic styl, kompletní standalone aplikace |

## Aesthetic Design

Všechny varianty využívají "Dynamic Sport" vizuální styl:
- Plus Jakarta Sans display font pro nadpisy
- Mesh gradient pozadí
- Energy (coral-orange) akcenty a glow efekty
- Border-accent na stats a highlight kartách
- Staggered reveal animace pro členy a úspěchy
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
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
type Story = StoryObj<typeof ClubPublicProfile>;

// ============================================================================
// Phase 16.1: Consolidated Variants - Embed/Satellite/Expressive (all Aesthetic)
// ============================================================================

/**
 * Embed varianta pro vložení do kanoe.cz.
 * Aesthetic styl, bez vlastního headeru a footeru.
 */
export const Embed: Story = {
  name: 'Embed',
  args: {
    variant: 'embed',
    aesthetic: true,
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="full"
        pageVariant="detail"
        pageTitle="USK Praha - Profil klubu"
        breadcrumbs={[
          { label: 'Domů', href: '#' },
          { label: 'Kluby', href: '#' },
          { label: 'USK Praha' },
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
- Plný profil klubu s dramatickým hero
        `,
      },
    },
  },
};

/**
 * Expressive Embed varianta - plný "wow" profil klubu v kanoe.cz kontextu.
 * Aesthetic styl s dramatickými efekty.
 */
export const ExpressiveEmbed: Story = {
  name: 'Expressive Embed',
  args: {
    variant: 'embed',
    aesthetic: true,
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="full"
        pageVariant="detail"
        pageTitle="USK Praha - Profil klubu"
        breadcrumbs={[
          { label: 'Domů', href: '#' },
          { label: 'Kluby', href: '#' },
          { label: 'USK Praha' },
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
**Expressive Embed varianta** - plný "wow" profil klubu v kanoe.cz kontextu:
- Aesthetic styl (display fonts, energy accents, mesh backgrounds)
- Vložené do kanoe.cz layoutu
- Dramatický fullscreen hero
- Staggered reveal animace pro členy a úspěchy
        `,
      },
    },
  },
};
