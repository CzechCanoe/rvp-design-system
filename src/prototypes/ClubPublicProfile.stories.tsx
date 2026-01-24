import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../components/Header';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Tabs } from '../components/Tabs';
import { Avatar } from '../components/Avatar';
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
// Icons
// ============================================================================

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

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

// CSK Logo component for satellite header
const CSKLogo = () => (
  <span className="club-public-profile__logo">CSK</span>
);

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
          size="sm"
          bordered
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

      {/* Hero Section */}
      <section className="club-hero">
        <div className="club-hero__background">
          <div className="club-hero__gradient" />
          <div className="club-hero__pattern" />
        </div>

        <div className="club-hero__content">
          {/* Logo/Avatar */}
          <div className="club-hero__logo">
            <div className="club-hero__logo-ring">
              {club.logoUrl ? (
                <img
                  src={club.logoUrl}
                  alt={club.name}
                  className="club-hero__logo-img"
                />
              ) : (
                <div className="club-hero__logo-initials">
                  {club.code}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="club-hero__info">
            <h1 className="club-hero__name">{club.shortName}</h1>
            <p className="club-hero__fullname">{club.name}</p>
            <div className="club-hero__badges">
              {club.sections.map(section => (
                <Badge key={section} section={section} size="lg" glow>
                  {getSectionName(section)}
                </Badge>
              ))}
            </div>
            <div className="club-hero__meta">
              <div className="club-hero__meta-item">
                <MapPinIcon />
                <span>{club.city}, {club.region}</span>
              </div>
              <div className="club-hero__meta-item">
                <CalendarIcon />
                <span>Založeno {club.founded}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="club-hero__actions">
            <Button variant="secondary" size="md">
              <ShareIcon /> Sdílet
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <div className="club-stats-banner">
        <div className="club-stats-banner__container">
          <div className="club-stats-banner__grid">
            <div className="club-stat-card club-stat-card--primary">
              <div className="club-stat-card__icon">
                <UsersIcon />
              </div>
              <div className="club-stat-card__value">{club.stats.members}</div>
              <div className="club-stat-card__label">Členů</div>
            </div>

            <div className="club-stat-card club-stat-card--gold">
              <div className="club-stat-card__icon">
                <TrophyIcon />
              </div>
              <div className="club-stat-card__value">{club.stats.athletes}</div>
              <div className="club-stat-card__label">Závodníků</div>
            </div>

            <div className="club-stat-card club-stat-card--silver">
              <div className="club-stat-card__icon">
                <GraduationCapIcon />
              </div>
              <div className="club-stat-card__value">{club.stats.coaches}</div>
              <div className="club-stat-card__label">Trenérů</div>
            </div>

            <div className="club-stat-card club-stat-card--bronze">
              <div className="club-stat-card__icon">
                <UserIcon />
              </div>
              <div className="club-stat-card__value">{club.stats.juniors}</div>
              <div className="club-stat-card__label">Juniorů</div>
            </div>
          </div>
        </div>
      </div>

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
                <article key={member.id} className="club-member-card">
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
                </article>
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
                <article key={index} className="club-highlight-card">
                  <span className="club-highlight-card__year">{highlight.year}</span>
                  <h3 className="club-highlight-card__title">{highlight.title}</h3>
                  <p className="club-highlight-card__description">{highlight.description}</p>
                  <span className="club-highlight-card__medal">{highlight.medal}</span>
                </article>
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
            <div className="club-contact">
              <div className="club-contact__card">
                <div className="club-contact__item">
                  <div className="club-contact__icon">
                    <MapPinIcon />
                  </div>
                  <div className="club-contact__content">
                    <span className="club-contact__label">Adresa</span>
                    <span className="club-contact__value">{club.address}</span>
                  </div>
                </div>

                <div className="club-contact__item">
                  <div className="club-contact__icon">
                    <MailIcon />
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
                    <PhoneIcon />
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
                    <GlobeIcon />
                  </div>
                  <div className="club-contact__content">
                    <span className="club-contact__label">Web</span>
                    <a href={`https://${club.web}`} target="_blank" rel="noopener noreferrer" className="club-contact__value club-contact__value--link">
                      {club.web}
                    </a>
                  </div>
                </div>
              </div>
            </div>
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
# Veřejný profil klubu - EXPRESSIVE Mode

Celostránkový profil klubu/oddílu s dramatickým vizuálním stylem pro veřejné zobrazení.

## Použití

Analogie k AthletePublicProfile, ale pro kluby a oddíly ČSK.

## Hlavní sekce

1. **Hero Section** - Logo klubu, název, sekce, lokalita
2. **Stats Banner** - Členové, závodníci, trenéři, junioři
3. **Aktivní závodníci** - Grid s kartami členů
4. **Úspěchy klubu** - Historické milníky
5. **Kontakt** - Adresa, e-mail, telefon, web

## Varianty

- **Standalone** - Plný profil s hero sekcí
- **Satellite** - S minimálním headerem pro standalone aplikace
- **Embed** - Pro vložení do kanoe.cz

## Design Tokens

Využívá expressive tokeny jako AthletePublicProfile.
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
// Integration Variants - Embed/Satellite only (Phase 8.13)
// ============================================================================

/**
 * Expressive standalone varianta - plný profil klubu s hero sekcí.
 */
export const Expressive: Story = {
  name: 'Expressive',
  args: {
    variant: 'standalone',
    aesthetic: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Expressive standalone profil klubu s plnou hero sekcí.',
      },
    },
  },
};

/**
 * Aesthetic varianta s "Dynamic Sport" stylem.
 * Display fonts, energy accents, mesh backgrounds, staggered animations.
 */
export const Aesthetic: Story = {
  name: 'Aesthetic (Dynamic Sport)',
  args: {
    variant: 'standalone',
    aesthetic: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
**Aesthetic mode** aktivuje "Dynamic Sport" vizuální styl:
- Plus Jakarta Sans display font pro nadpisy
- Mesh gradient pozadí
- Energy (coral-orange) akcenty a glow efekty
- Border-accent na stats a highlight kartách
- Staggered reveal animace pro členy a úspěchy
        `,
      },
    },
  },
};

/**
 * Embed varianta pro vložení do kanoe.cz.
 * Bez vlastního headeru a footeru, kompaktní styl.
 */
export const Embed: Story = {
  name: 'Embed (kanoe.cz)',
  args: {
    variant: 'embed',
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
        story: 'Embed varianta pro vložení do kanoe.cz - bez vlastního headeru a footeru.',
      },
    },
  },
};

/**
 * Satellite varianta pro standalone aplikace.
 * Minimální header s odkazem na kanoe.cz.
 */
export const Satellite: Story = {
  name: 'Satellite',
  args: {
    variant: 'satellite',
  },
  parameters: {
    docs: {
      description: {
        story: 'Satellite varianta pro standalone aplikace s minimálním headerem.',
      },
    },
  },
};

/**
 * Embed varianta se sidebarem v kanoe.cz layoutu.
 * Demonstrace container queries v úzkém sloupci.
 */
export const EmbedWithSidebar: Story = {
  name: 'Embed se sidebarem',
  args: {
    variant: 'embed',
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="sidebar"
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
        story: 'Embed varianta v úzkém sloupci - demonstrace container queries.',
      },
    },
  },
};
