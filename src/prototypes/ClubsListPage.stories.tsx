import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Tabs } from '../components/Tabs';
import { Pagination } from '../components/Pagination';
import { Badge } from '../components/Badge';
import { Icon } from '../components/Icon';
import { StatsBar } from '../components/StatsBar';
import { CSKLogo } from '../components/CSKLogo';
import { EmptyState } from '../components/EmptyState';
import { FilterPills, type FilterPill } from '../components/FilterPills';
import { KanoeCzContext } from '../components/KanoeCzContext';
import './ClubsListPage.css';

// ============================================================================
// Types
// ============================================================================

type ClubsListPageVariant = 'standalone' | 'satellite' | 'embed';

interface ClubsListPageProps {
  /** Display variant */
  variant?: ClubsListPageVariant;
  /** Initial section filter */
  initialSection?: 'all' | 'dv' | 'ry' | 'vt';
}

interface Club {
  id: number;
  name: string;
  code: string;
  city: string;
  region: string;
  sections: Array<'dv' | 'ry' | 'vt'>;
  memberCount: number;
  athleteCount: number;
  coachCount: number;
  logoUrl?: string;
}

// ============================================================================
// Sample Data
// ============================================================================

// Generate SVG logo as data URI - styled monogram with club colors
const createClubLogo = (code: string, primaryColor: string, secondaryColor: string = '#ffffff'): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56">
    <defs>
      <linearGradient id="bg${code}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${primaryColor};stop-opacity:0.8" />
      </linearGradient>
    </defs>
    <rect width="56" height="56" rx="8" fill="url(#bg${code})"/>
    <text x="28" y="36" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="${secondaryColor}">${code.substring(0, 3)}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const sampleClubs: Club[] = [
  { id: 1, name: 'USK Praha', code: 'USK', city: 'Praha', region: 'Praha', sections: ['dv', 'ry'], memberCount: 245, athleteCount: 128, coachCount: 12, logoUrl: createClubLogo('USK', '#1e3a5f') },
  { id: 2, name: 'Dukla Praha', code: 'DUK', city: 'Praha', region: 'Praha', sections: ['dv', 'ry'], memberCount: 312, athleteCount: 156, coachCount: 18, logoUrl: createClubLogo('DUK', '#c41e3a') },
  { id: 3, name: 'SK Brandýs nad Labem', code: 'BRA', city: 'Brandýs nad Labem', region: 'Středočeský', sections: ['ry'], memberCount: 87, athleteCount: 42, coachCount: 5, logoUrl: createClubLogo('BRA', '#2d5a27') },
  { id: 4, name: 'TJ Jablonec nad Nisou', code: 'JAB', city: 'Jablonec nad Nisou', region: 'Liberecký', sections: ['vt', 'dv'], memberCount: 156, athleteCount: 78, coachCount: 8, logoUrl: createClubLogo('JAB', '#1e88e5') },
  { id: 5, name: 'KK Roudnice nad Labem', code: 'ROU', city: 'Roudnice nad Labem', region: 'Ústecký', sections: ['vt'], memberCount: 94, athleteCount: 45, coachCount: 4, logoUrl: createClubLogo('ROU', '#6a1b9a') },
  { id: 6, name: 'SK Trnávka', code: 'TRN', city: 'Trnávka', region: 'Pardubický', sections: ['dv', 'vt'], memberCount: 112, athleteCount: 56, coachCount: 6, logoUrl: createClubLogo('TRN', '#00695c') },
  { id: 7, name: 'Bohemians Praha', code: 'BOH', city: 'Praha', region: 'Praha', sections: ['dv', 'ry', 'vt'], memberCount: 198, athleteCount: 89, coachCount: 10, logoUrl: createClubLogo('BOH', '#2e7d32') },
  { id: 8, name: 'KK Hradec Králové', code: 'HKR', city: 'Hradec Králové', region: 'Královéhradecký', sections: ['dv'], memberCount: 134, athleteCount: 67, coachCount: 7, logoUrl: createClubLogo('HKR', '#d84315') },
  { id: 9, name: 'SK Slavoj Český Krumlov', code: 'CKR', city: 'Český Krumlov', region: 'Jihočeský', sections: ['dv'], memberCount: 89, athleteCount: 43, coachCount: 5, logoUrl: createClubLogo('CKR', '#5d4037') },
  { id: 10, name: 'TJ Lokomotiva Beroun', code: 'BER', city: 'Beroun', region: 'Středočeský', sections: ['dv', 'vt'], memberCount: 76, athleteCount: 34, coachCount: 4, logoUrl: createClubLogo('BER', '#37474f') },
  { id: 11, name: 'KK Olomouc', code: 'OLO', city: 'Olomouc', region: 'Olomoucký', sections: ['ry', 'vt'], memberCount: 145, athleteCount: 72, coachCount: 8, logoUrl: createClubLogo('OLO', '#0277bd') },
  { id: 12, name: 'SK Žilina', code: 'ZIL', city: 'Žilina', region: 'Zlínský', sections: ['dv'], memberCount: 67, athleteCount: 31, coachCount: 3, logoUrl: createClubLogo('ZIL', '#558b2f') },
  { id: 13, name: 'TJ Přerov', code: 'PRE', city: 'Přerov', region: 'Olomoucký', sections: ['ry'], memberCount: 54, athleteCount: 26, coachCount: 3, logoUrl: createClubLogo('PRE', '#7b1fa2') },
  { id: 14, name: 'KK Brno', code: 'BRN', city: 'Brno', region: 'Jihomoravský', sections: ['dv', 'ry', 'vt'], memberCount: 223, athleteCount: 112, coachCount: 14, logoUrl: createClubLogo('BRN', '#c62828') },
  { id: 15, name: 'SK Opava', code: 'OPA', city: 'Opava', region: 'Moravskoslezský', sections: ['vt'], memberCount: 48, athleteCount: 22, coachCount: 2, logoUrl: createClubLogo('OPA', '#00838f') },
  { id: 16, name: 'TJ Ostrava', code: 'OST', city: 'Ostrava', region: 'Moravskoslezský', sections: ['dv', 'ry'], memberCount: 167, athleteCount: 84, coachCount: 9, logoUrl: createClubLogo('OST', '#1565c0') },
  { id: 17, name: 'KK Plzeň', code: 'PLZ', city: 'Plzeň', region: 'Plzeňský', sections: ['dv'], memberCount: 98, athleteCount: 48, coachCount: 5, logoUrl: createClubLogo('PLZ', '#f9a825') },
  { id: 18, name: 'SK Liberec', code: 'LIB', city: 'Liberec', region: 'Liberecký', sections: ['dv', 'vt'], memberCount: 121, athleteCount: 59, coachCount: 6, logoUrl: createClubLogo('LIB', '#0d47a1') },
];

const regionOptions = [
  { value: 'all', label: 'Všechny kraje' },
  { value: 'Praha', label: 'Praha' },
  { value: 'Středočeský', label: 'Středočeský' },
  { value: 'Jihočeský', label: 'Jihočeský' },
  { value: 'Plzeňský', label: 'Plzeňský' },
  { value: 'Karlovarský', label: 'Karlovarský' },
  { value: 'Ústecký', label: 'Ústecký' },
  { value: 'Liberecký', label: 'Liberecký' },
  { value: 'Královéhradecký', label: 'Královéhradecký' },
  { value: 'Pardubický', label: 'Pardubický' },
  { value: 'Olomoucký', label: 'Olomoucký' },
  { value: 'Moravskoslezský', label: 'Moravskoslezský' },
  { value: 'Jihomoravský', label: 'Jihomoravský' },
  { value: 'Zlínský', label: 'Zlínský' },
  { value: 'Vysočina', label: 'Vysočina' },
];

const sortOptions = [
  { value: 'name', label: 'Název A-Z' },
  { value: 'members', label: 'Počet členů' },
  { value: 'athletes', label: 'Počet závodníků' },
  { value: 'city', label: 'Město' },
];


// ============================================================================
// Club Card Component
// ============================================================================

interface ClubCardProps {
  club: Club;
  onClick?: () => void;
}

const ClubCard = ({ club, onClick }: ClubCardProps) => {
  const sectionLabels: Record<string, string> = {
    dv: 'DV',
    ry: 'RY',
    vt: 'VT',
  };

  return (
    <Card
      variant="aesthetic"
      padding="none"
      className={`club-card ${onClick ? 'club-card--clickable' : ''}`}
      clickable={!!onClick}
      onClick={onClick}
    >
      <div className="club-card__header">
        <div className="club-card__logo">
          {club.logoUrl ? (
            <img src={club.logoUrl} alt={`${club.name} logo`} />
          ) : (
            club.code.substring(0, 2)
          )}
        </div>
        <div className="club-card__info">
          <h3 className="club-card__name">{club.name}</h3>
          <span className="club-card__code">{club.code}</span>
          <div className="club-card__location">
            <Icon name="map-pin" size="sm" />
            <span>{club.city}, {club.region}</span>
          </div>
        </div>
      </div>

      <div className="club-card__stats">
        <div className="club-card__stat">
          <span className="club-card__stat-value">{club.memberCount}</span>
          <span className="club-card__stat-label">Členů</span>
        </div>
        <div className="club-card__stat">
          <span className="club-card__stat-value">{club.athleteCount}</span>
          <span className="club-card__stat-label">Závodníků</span>
        </div>
        <div className="club-card__stat">
          <span className="club-card__stat-value">{club.coachCount}</span>
          <span className="club-card__stat-label">Trenérů</span>
        </div>
      </div>

      <div className="club-card__sections">
        {club.sections.map(section => (
          <Badge key={section} section={section} size="sm">
            {sectionLabels[section]}
          </Badge>
        ))}
      </div>
    </Card>
  );
};

// ============================================================================
// Page Component
// ============================================================================

const ClubsListPage = ({
  variant = 'standalone',
  initialSection = 'all',
}: ClubsListPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sectionFilter, setSectionFilter] = useState<string>(initialSection);
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Section names for display
  const sectionNames: Record<string, string> = {
    all: 'Všechny sekce',
    dv: 'Divoká voda',
    ry: 'Rychlostní kanoistika',
    vt: 'Vodní turistika',
  };

  // Section tabs
  const sectionTabs = [
    { id: 'all', label: 'Všechny', content: null },
    { id: 'dv', label: 'Divoká voda', content: null },
    { id: 'ry', label: 'Rychlostní', content: null },
    { id: 'vt', label: 'Vodní turistika', content: null },
  ];

  // Filtered clubs
  const filteredClubs = useMemo(() => {
    let result = [...sampleClubs];

    // Section filter
    if (sectionFilter !== 'all') {
      result = result.filter(c => c.sections.includes(sectionFilter as 'dv' | 'ry' | 'vt'));
    }

    // Region filter
    if (regionFilter !== 'all') {
      result = result.filter(c => c.region === regionFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        c =>
          c.name.toLowerCase().includes(query) ||
          c.code.toLowerCase().includes(query) ||
          c.city.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name, 'cs');
        case 'members':
          return b.memberCount - a.memberCount;
        case 'athletes':
          return b.athleteCount - a.athleteCount;
        case 'city':
          return a.city.localeCompare(b.city, 'cs');
        default:
          return 0;
      }
    });

    return result;
  }, [sectionFilter, regionFilter, searchQuery, sortBy]);

  // Paginated clubs
  const paginatedClubs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredClubs.slice(start, start + itemsPerPage);
  }, [filteredClubs, currentPage]);

  const totalPages = Math.ceil(filteredClubs.length / itemsPerPage);

  // Active filters for FilterPills
  const activeFilters: FilterPill[] = useMemo(() => {
    const filters: FilterPill[] = [];
    if (sectionFilter !== 'all') {
      filters.push({ key: 'section', label: sectionNames[sectionFilter] });
    }
    if (regionFilter !== 'all') {
      filters.push({ key: 'region', label: regionFilter });
    }
    return filters;
  }, [sectionFilter, regionFilter, sectionNames]);

  const clearFilter = (key: string) => {
    if (key === 'section') setSectionFilter('all');
    if (key === 'region') setRegionFilter('all');
  };

  const clearAllFilters = () => {
    setSectionFilter('all');
    setRegionFilter('all');
    setSearchQuery('');
  };

  // Statistics
  const stats = useMemo(() => {
    const total = sampleClubs.length;
    const totalMembers = sampleClubs.reduce((sum, c) => sum + c.memberCount, 0);
    const totalAthletes = sampleClubs.reduce((sum, c) => sum + c.athleteCount, 0);
    const regions = new Set(sampleClubs.map(c => c.region)).size;
    return { total, totalMembers, totalAthletes, regions };
  }, []);

  // Header rendering based on variant
  const renderHeader = () => {
    if (variant === 'embed') {
      return null;
    }

    if (variant === 'satellite') {
      return (
        <Header
          variant="satellite"
          size="sm"
          bordered
          brand={<CSKLogo />}
          appName="Registr klubů"
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

    return null;
  };

  // Footer rendering based on variant
  const renderFooter = () => {
    if (variant === 'embed') {
      return null;
    }

    return (
      <footer className="prototype-clubs-list__footer">
        <div className="prototype-clubs-list__footer-content">
          <p>© 2026 Český svaz kanoistů. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    );
  };

  return (
    <div className={`prototype-clubs-list ${variant === 'embed' ? 'prototype-clubs-list--embed' : ''}`}>
      {renderHeader()}

      {/* Page Header */}
      <section className="clubs-list-header csk-mesh-bg--hero csk-grain">
        <div className="clubs-list-header__container">
          {variant !== 'embed' && (
            <div className="clubs-list-header__breadcrumb">
              <a href="#">Úvod</a>
              <span>/</span>
              <span>Kluby</span>
            </div>
          )}
          <div className="clubs-list-header__content">
            <div>
              <h1 className="clubs-list-header__title csk-display">Registr klubů a oddílů</h1>
              <p className="clubs-list-header__subtitle">
                Kompletní seznam klubů a oddílů Českého svazu kanoistů
              </p>
            </div>
          </div>

          {/* Statistics */}
          <StatsBar
            variant="floating"
            size="lg"
            className="clubs-list-stats"
            items={[
              { key: 'clubs', value: stats.total, label: 'Klubů' },
              { key: 'members', value: stats.totalMembers.toLocaleString('cs'), label: 'Členů' },
              { key: 'athletes', value: stats.totalAthletes.toLocaleString('cs'), label: 'Závodníků' },
              { key: 'regions', value: stats.regions, label: 'Krajů' },
            ]}
          />
        </div>
      </section>

      {/* Main Content */}
      <main className="prototype-clubs-list__main">
        <div className="prototype-clubs-list__container">

          {/* Section Tabs */}
          <div className="clubs-list-section-tabs">
            <Tabs
              tabs={sectionTabs}
              activeTab={sectionFilter}
              onChange={(id) => {
                setSectionFilter(id);
                setCurrentPage(1);
              }}
              variant="pills"
              size="md"
            />
          </div>

          {/* Search and Filters */}
          <Card variant="surface" className="clubs-list-filters">
            <div className="clubs-list-filters__row">
              <div className="clubs-list-filters__search">
                <Input
                  type="search"
                  placeholder="Hledat klub, město..."
                  size="md"
                  iconLeft={<Icon name="search" />}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  clearable
                  onClear={() => setSearchQuery('')}
                  fullWidth
                />
              </div>
              <div className="clubs-list-filters__selects">
                <Select
                  options={regionOptions}
                  value={regionFilter}
                  onChange={(e) => {
                    setRegionFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  size="md"
                  className="clubs-list-filters__select"
                />
              </div>
            </div>

            {/* Active Filter Pills */}
            <FilterPills
              filters={activeFilters}
              searchQuery={searchQuery}
              onRemove={clearFilter}
              onClearSearch={() => setSearchQuery('')}
              onClearAll={clearAllFilters}
            />
          </Card>

          {/* Results Header */}
          <div className="clubs-list-results__header">
            <span className="clubs-list-results__count">
              Nalezeno <strong>{filteredClubs.length}</strong> klubů
            </span>
            <div className="clubs-list-results__sort">
              <span className="clubs-list-results__sort-label">Řadit:</span>
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                size="sm"
              />
            </div>
          </div>

          {/* Clubs Grid or Empty State */}
          {paginatedClubs.length > 0 ? (
            <>
              <div className="clubs-list-grid">
                {paginatedClubs.map(club => (
                  <ClubCard
                    key={club.id}
                    club={club}
                    onClick={() => console.log(`Navigate to club: ${club.code}`)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="clubs-list-pagination">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    variant="default"
                    size="md"
                    siblingCount={1}
                    showFirstLast={true}
                    showPrevNext={true}
                  />
                </div>
              )}
            </>
          ) : (
            <EmptyState
              variant="card"
              size="lg"
              icon={<Icon name="building" size={64} />}
              title="Žádné kluby nenalezeny"
              description="Zkuste změnit vyhledávací kritéria nebo zrušit některé filtry."
              action={
                <Button variant="secondary" size="md" onClick={clearAllFilters}>
                  Zrušit filtry
                </Button>
              }
            />
          )}
        </div>
      </main>

      {renderFooter()}
    </div>
  );
};

// ============================================================================
// Storybook Meta
// ============================================================================

const meta = {
  title: 'Prototypes/Clubs List Page',
  component: ClubsListPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Seznam klubů - AESTHETIC Design

Prototyp stránky seznamu klubů CSK s plným Aesthetic designem.

## Vizuální prvky (Phase 16.5)

- **Hero sekce** - Mesh gradient pozadí, display fonty, diagonální stripe
- **Stat karty** - Animované hover efekty, energy accent border (různé barvy)
- **Karty klubů** - Gradient logo pozadí, hover lift efekty, accent border
- **Filtrování** - Aesthetic pill tabs, gradient tagy
- **Empty state** - Dashed border, kulaté ikony

## Varianty

| Varianta | Popis |
|----------|-------|
| **Embed** | Pro vložení do kanoe.cz (bez headeru/footeru) |
| **Satellite** | Standalone s minimálním headerem |

## Props

- \`initialSection\` - přednastavená sekce (all, dv, ry, vt)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standalone', 'satellite', 'embed'],
      description: 'Display variant - standalone (full header), satellite (minimal), embed (no chrome)',
    },
    initialSection: {
      control: 'select',
      options: ['all', 'dv', 'ry', 'vt'],
      description: 'Initial section filter',
    },
  },
} satisfies Meta<typeof ClubsListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Integration Variants - Aesthetic (Phase 16.4)
// ============================================================================

/**
 * **EMBED varianta** - Aesthetic seznam klubů v kontextu kanoe.cz
 *
 * Komponenta bez vlastního headeru a footeru, určená pro embedding
 * do existujícího webu kanoe.cz (Joomla + Bootstrap 4).
 *
 * **Aesthetic prvky:**
 * - Display fonty pro nadpisy
 * - Stat karty s hover efekty a energy accent
 * - Karty klubů s gradient logo pozadím
 * - Pill-style filtrační tagy
 * - Hover lift efekty pro karty
 *
 * **Features dostupné přes props:**
 * - `initialSection` - přednastavenou sekci (dv, ry, vt)
 */
export const Embed: Story = {
  args: {
    variant: 'embed',
    initialSection: 'all',
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="full"
        pageVariant="subpage"
        pageTitle="Kluby a oddíly"
        breadcrumbs={[
          { label: 'Úvod', href: '#' },
          { label: 'Registr', href: '#' },
          { label: 'Kluby a oddíly' },
        ]}
      >
        <Story />
      </KanoeCzContext>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Aesthetic embed seznamu klubů v kontextu kanoe.cz. Obsahuje display fonty, stat karty s hover efekty a gradient logo pozadí pro karty klubů.',
      },
    },
  },
};

/**
 * **SATELLITE varianta** - Aesthetic standalone s minimálním headerem
 *
 * Samostatná aplikace registru klubů s odkazem zpět na kanoe.cz.
 * Plný Aesthetic design s filtrováním podle sekcí a krajů.
 *
 * **Aesthetic prvky:**
 * - Hero sekce s mesh gradient pozadím a diagonálním stripe
 * - Display fonty pro velké nadpisy
 * - Stat karty s energy accent a hover efekty (různé barvy)
 * - Karty klubů s gradient logo pozadím a hover lift
 * - Pill-style filtrační tagy
 *
 * **Features dostupné přes props:**
 * - `initialSection` - přednastavenou sekci (dv, ry, vt)
 */
export const Satellite: Story = {
  args: {
    variant: 'satellite',
    initialSection: 'all',
  },
  parameters: {
    docs: {
      description: {
        story: 'Aesthetic standalone seznamu klubů se satellite headerem. Obsahuje plný hero s mesh pozadím, stat karty s energy accenty a karty klubů s hover efekty.',
      },
    },
  },
};
