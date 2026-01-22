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

const sampleClubs: Club[] = [
  { id: 1, name: 'USK Praha', code: 'USK', city: 'Praha', region: 'Praha', sections: ['dv', 'ry'], memberCount: 245, athleteCount: 128, coachCount: 12, logoUrl: '' },
  { id: 2, name: 'Dukla Praha', code: 'DUK', city: 'Praha', region: 'Praha', sections: ['dv', 'ry'], memberCount: 312, athleteCount: 156, coachCount: 18, logoUrl: '' },
  { id: 3, name: 'SK Brandýs nad Labem', code: 'BRA', city: 'Brandýs nad Labem', region: 'Středočeský', sections: ['ry'], memberCount: 87, athleteCount: 42, coachCount: 5, logoUrl: '' },
  { id: 4, name: 'TJ Jablonec nad Nisou', code: 'JAB', city: 'Jablonec nad Nisou', region: 'Liberecký', sections: ['vt', 'dv'], memberCount: 156, athleteCount: 78, coachCount: 8, logoUrl: '' },
  { id: 5, name: 'KK Roudnice nad Labem', code: 'ROU', city: 'Roudnice nad Labem', region: 'Ústecký', sections: ['vt'], memberCount: 94, athleteCount: 45, coachCount: 4, logoUrl: '' },
  { id: 6, name: 'SK Trnávka', code: 'TRN', city: 'Trnávka', region: 'Pardubický', sections: ['dv', 'vt'], memberCount: 112, athleteCount: 56, coachCount: 6, logoUrl: '' },
  { id: 7, name: 'Bohemians Praha', code: 'BOH', city: 'Praha', region: 'Praha', sections: ['dv', 'ry', 'vt'], memberCount: 198, athleteCount: 89, coachCount: 10, logoUrl: '' },
  { id: 8, name: 'KK Hradec Králové', code: 'HKR', city: 'Hradec Králové', region: 'Královéhradecký', sections: ['dv'], memberCount: 134, athleteCount: 67, coachCount: 7, logoUrl: '' },
  { id: 9, name: 'SK Slavoj Český Krumlov', code: 'CKR', city: 'Český Krumlov', region: 'Jihočeský', sections: ['dv'], memberCount: 89, athleteCount: 43, coachCount: 5, logoUrl: '' },
  { id: 10, name: 'TJ Lokomotiva Beroun', code: 'BER', city: 'Beroun', region: 'Středočeský', sections: ['dv', 'vt'], memberCount: 76, athleteCount: 34, coachCount: 4, logoUrl: '' },
  { id: 11, name: 'KK Olomouc', code: 'OLO', city: 'Olomouc', region: 'Olomoucký', sections: ['ry', 'vt'], memberCount: 145, athleteCount: 72, coachCount: 8, logoUrl: '' },
  { id: 12, name: 'SK Žilina', code: 'ZIL', city: 'Žilina', region: 'Zlínský', sections: ['dv'], memberCount: 67, athleteCount: 31, coachCount: 3, logoUrl: '' },
  { id: 13, name: 'TJ Přerov', code: 'PRE', city: 'Přerov', region: 'Olomoucký', sections: ['ry'], memberCount: 54, athleteCount: 26, coachCount: 3, logoUrl: '' },
  { id: 14, name: 'KK Brno', code: 'BRN', city: 'Brno', region: 'Jihomoravský', sections: ['dv', 'ry', 'vt'], memberCount: 223, athleteCount: 112, coachCount: 14, logoUrl: '' },
  { id: 15, name: 'SK Opava', code: 'OPA', city: 'Opava', region: 'Moravskoslezský', sections: ['vt'], memberCount: 48, athleteCount: 22, coachCount: 2, logoUrl: '' },
  { id: 16, name: 'TJ Ostrava', code: 'OST', city: 'Ostrava', region: 'Moravskoslezský', sections: ['dv', 'ry'], memberCount: 167, athleteCount: 84, coachCount: 9, logoUrl: '' },
  { id: 17, name: 'KK Plzeň', code: 'PLZ', city: 'Plzeň', region: 'Plzeňský', sections: ['dv'], memberCount: 98, athleteCount: 48, coachCount: 5, logoUrl: '' },
  { id: 18, name: 'SK Liberec', code: 'LIB', city: 'Liberec', region: 'Liberecký', sections: ['dv', 'vt'], memberCount: 121, athleteCount: 59, coachCount: 6, logoUrl: '' },
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
// Icons
// ============================================================================

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
  </svg>
);

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
    <div
      className={`club-card ${onClick ? 'club-card--clickable' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
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
            <MapPinIcon />
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
    </div>
  );
};

// ============================================================================
// Page Component
// ============================================================================

const CSKLogo = () => (
  <span className="prototype-clubs-list__logo">
    <span className="prototype-clubs-list__logo-text">CSK</span>
  </span>
);

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

  // Active filters for tags
  const activeFilters = useMemo(() => {
    const filters: Array<{ key: string; label: string; value: string }> = [];
    if (sectionFilter !== 'all') {
      filters.push({ key: 'section', label: sectionNames[sectionFilter], value: sectionFilter });
    }
    if (regionFilter !== 'all') {
      filters.push({ key: 'region', label: regionFilter, value: regionFilter });
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
      <section className="clubs-list-header">
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
              <h1 className="clubs-list-header__title">Registr klubů a oddílů</h1>
              <p className="clubs-list-header__subtitle">
                Kompletní seznam klubů a oddílů Českého svazu kanoistů
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="clubs-list-stats">
            <div className="clubs-list-stats__item">
              <span className="clubs-list-stats__value">{stats.total}</span>
              <span className="clubs-list-stats__label">Klubů</span>
            </div>
            <div className="clubs-list-stats__item">
              <span className="clubs-list-stats__value">{stats.totalMembers.toLocaleString('cs')}</span>
              <span className="clubs-list-stats__label">Členů</span>
            </div>
            <div className="clubs-list-stats__item">
              <span className="clubs-list-stats__value">{stats.totalAthletes.toLocaleString('cs')}</span>
              <span className="clubs-list-stats__label">Závodníků</span>
            </div>
            <div className="clubs-list-stats__item">
              <span className="clubs-list-stats__value">{stats.regions}</span>
              <span className="clubs-list-stats__label">Krajů</span>
            </div>
          </div>
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
                  iconLeft={<SearchIcon />}
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

            {/* Active Filter Tags */}
            {(activeFilters.length > 0 || searchQuery) && (
              <div className="clubs-list-filters__tags">
                {searchQuery && (
                  <span className="clubs-list-filters__tag">
                    Hledání: "{searchQuery}"
                    <button
                      className="clubs-list-filters__tag-remove"
                      onClick={() => setSearchQuery('')}
                      aria-label="Zrušit hledání"
                    >
                      <CloseIcon />
                    </button>
                  </span>
                )}
                {activeFilters.map(filter => (
                  <span key={filter.key} className="clubs-list-filters__tag">
                    {filter.label}
                    <button
                      className="clubs-list-filters__tag-remove"
                      onClick={() => clearFilter(filter.key)}
                      aria-label={`Zrušit filtr ${filter.label}`}
                    >
                      <CloseIcon />
                    </button>
                  </span>
                ))}
                <button className="clubs-list-filters__clear" onClick={clearAllFilters}>
                  Zrušit vše
                </button>
              </div>
            )}
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
            <div className="clubs-list-empty">
              <div className="clubs-list-empty__icon">
                <BuildingIcon />
              </div>
              <h3 className="clubs-list-empty__title">Žádné kluby nenalezeny</h3>
              <p className="clubs-list-empty__description">
                Zkuste změnit vyhledávací kritéria nebo zrušit některé filtry.
              </p>
              <Button variant="secondary" size="md" onClick={clearAllFilters} style={{ marginTop: '16px' }}>
                Zrušit filtry
              </Button>
            </div>
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
        component:
          'Prototyp stránky seznamu klubů CSK. Zobrazuje registrované kluby a oddíly s vyhledáváním, filtrováním podle sekcí a krajů.',
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
// Integration Variants - Embed/Satellite only (Phase 8.12)
// ============================================================================

/**
 * **EMBED varianta** - Seznam klubů vložený do kanoe.cz layoutu.
 *
 * Komponenta bez vlastního headeru a footeru, určená pro embedding
 * do existujícího webu kanoe.cz (Joomla + Bootstrap 4).
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
        story: 'Seznam klubů embedovaný v kontextu kanoe.cz. Bez vlastního headeru/footeru.',
      },
    },
  },
};

/**
 * **SATELLITE varianta** - Standalone seznam klubů s minimálním headerem.
 *
 * Pro samostatnou aplikaci registru klubů s odkazem zpět na kanoe.cz.
 */
export const Satellite: Story = {
  args: {
    variant: 'satellite',
    initialSection: 'all',
  },
  parameters: {
    docs: {
      description: {
        story: 'Standalone aplikace registru klubů s minimálním satellite headerem.',
      },
    },
  },
};
