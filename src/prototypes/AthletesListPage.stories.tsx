import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Tabs } from '../components/Tabs';
import { Pagination } from '../components/Pagination';
import { AthleteCard } from '../components/AthleteCard';
import { KanoeCzContext } from '../components/KanoeCzContext';
import './AthletesListPage.css';

// ============================================================================
// Types
// ============================================================================

type AthletesListPageVariant = 'standalone' | 'satellite' | 'embed';

interface AthletesListPageProps {
  /** Display variant */
  variant?: AthletesListPageVariant;
  /** Initial section filter */
  initialSection?: 'all' | 'dv' | 'ry' | 'vt';
  /** Show featured athletes section */
  showFeatured?: boolean;
}

interface Athlete {
  id: number;
  name: string;
  club: string;
  clubId: string;
  section: 'dv' | 'ry' | 'vt';
  vtClass?: 'm' | 'a' | 'b' | 'c';
  vtPoints?: number;
  ranking?: number;
  birthYear: number;
  country: string;
  imageUrl?: string;
  isFeatured?: boolean;
  isRepresentative?: boolean;
}

// ============================================================================
// Sample Data
// ============================================================================

const sampleAthletes: Athlete[] = [
  // Featured/Representatives
  { id: 1, name: 'Jiří Prskavec', club: 'USK Praha', clubId: 'USK', section: 'dv', ranking: 1, birthYear: 1993, country: 'CZE', imageUrl: 'https://i.pravatar.cc/150?u=prskavec', isFeatured: true, isRepresentative: true },
  { id: 2, name: 'Tereza Fišerová', club: 'Dukla Praha', clubId: 'DUK', section: 'dv', ranking: 1, birthYear: 1997, country: 'CZE', imageUrl: 'https://i.pravatar.cc/150?u=fiserova', isFeatured: true, isRepresentative: true },
  { id: 3, name: 'Martin Fuksa', club: 'Dukla Praha', clubId: 'DUK', section: 'ry', ranking: 1, birthYear: 1993, country: 'CZE', imageUrl: 'https://i.pravatar.cc/150?u=fuksa', isFeatured: true, isRepresentative: true },
  { id: 4, name: 'Lukáš Rohan', club: 'USK Praha', clubId: 'USK', section: 'dv', ranking: 2, birthYear: 1996, country: 'CZE', imageUrl: 'https://i.pravatar.cc/150?u=rohan', isFeatured: true, isRepresentative: true },

  // Regular athletes
  { id: 5, name: 'Vít Přindiš', club: 'USK Praha', clubId: 'USK', section: 'dv', ranking: 3, birthYear: 1990, country: 'CZE' },
  { id: 6, name: 'Jakub Krejčí', club: 'Dukla Praha', clubId: 'DUK', section: 'dv', ranking: 4, birthYear: 1995, country: 'CZE' },
  { id: 7, name: 'Vavřinec Hradilek', club: 'Dukla Praha', clubId: 'DUK', section: 'dv', ranking: 5, birthYear: 1987, country: 'CZE' },
  { id: 8, name: 'Kateřina Kudějová', club: 'USK Praha', clubId: 'USK', section: 'dv', ranking: 2, birthYear: 1990, country: 'CZE', imageUrl: 'https://i.pravatar.cc/150?u=kudejova' },
  { id: 9, name: 'Antonie Galušková', club: 'Dukla Praha', clubId: 'DUK', section: 'dv', ranking: 3, birthYear: 2000, country: 'CZE' },
  { id: 10, name: 'Gabriela Satková', club: 'USK Praha', clubId: 'USK', section: 'dv', ranking: 4, birthYear: 1999, country: 'CZE' },

  // Sprint athletes
  { id: 11, name: 'Josef Dostál', club: 'Dukla Praha', clubId: 'DUK', section: 'ry', ranking: 2, birthYear: 1993, country: 'CZE', imageUrl: 'https://i.pravatar.cc/150?u=dostal' },
  { id: 12, name: 'Radek Šlouf', club: 'Dukla Praha', clubId: 'DUK', section: 'ry', ranking: 3, birthYear: 1985, country: 'CZE' },
  { id: 13, name: 'Jakub Zavřel', club: 'SK Brandýs', clubId: 'BRA', section: 'ry', ranking: 4, birthYear: 1998, country: 'CZE' },
  { id: 14, name: 'Anežka Paloudová', club: 'Dukla Praha', clubId: 'DUK', section: 'ry', ranking: 1, birthYear: 1996, country: 'CZE' },

  // VT athletes
  { id: 15, name: 'Petr Novák', club: 'TJ Jablonec', clubId: 'JAB', section: 'vt', vtClass: 'm', vtPoints: 1250, birthYear: 1985, country: 'CZE' },
  { id: 16, name: 'Jana Malá', club: 'KK Roudnice', clubId: 'ROU', section: 'vt', vtClass: 'a', vtPoints: 980, birthYear: 1990, country: 'CZE' },
  { id: 17, name: 'Tomáš Horák', club: 'SK Trnávka', clubId: 'TRN', section: 'vt', vtClass: 'a', vtPoints: 920, birthYear: 1988, country: 'CZE' },
  { id: 18, name: 'Lucie Svobodová', club: 'Bohemians Praha', clubId: 'BOH', section: 'vt', vtClass: 'b', vtPoints: 750, birthYear: 1995, country: 'CZE' },
  { id: 19, name: 'Martin Veselý', club: 'TJ Jablonec', clubId: 'JAB', section: 'vt', vtClass: 'b', vtPoints: 680, birthYear: 1992, country: 'CZE' },
  { id: 20, name: 'Eva Černá', club: 'KK Roudnice', clubId: 'ROU', section: 'vt', vtClass: 'c', vtPoints: 450, birthYear: 2000, country: 'CZE' },

  // More DV athletes
  { id: 21, name: 'Ondřej Tunka', club: 'SK Trnávka', clubId: 'TRN', section: 'dv', ranking: 6, birthYear: 1997, country: 'CZE' },
  { id: 22, name: 'Filip Roháč', club: 'Bohemians Praha', clubId: 'BOH', section: 'dv', ranking: 7, birthYear: 1994, country: 'CZE' },
  { id: 23, name: 'David Novák', club: 'USK Praha', clubId: 'USK', section: 'dv', ranking: 8, birthYear: 1999, country: 'CZE' },
  { id: 24, name: 'Štěpán Král', club: 'Dukla Praha', clubId: 'DUK', section: 'dv', ranking: 9, birthYear: 1998, country: 'CZE' },
];

const vtClassOptions = [
  { value: 'all', label: 'Všechny třídy' },
  { value: 'm', label: 'Třída M' },
  { value: 'a', label: 'Třída A' },
  { value: 'b', label: 'Třída B' },
  { value: 'c', label: 'Třída C' },
];

const sortOptions = [
  { value: 'name', label: 'Jméno A-Z' },
  { value: 'ranking', label: 'Žebříček' },
  { value: 'club', label: 'Klub' },
  { value: 'birthYear', label: 'Rok narození' },
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

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const UserSearchIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="7" r="4" />
    <path d="M10.3 15H7a4 4 0 0 0-4 4v2" />
    <circle cx="17" cy="17" r="3" />
    <path d="M21 21l-1.9-1.9" />
  </svg>
);

// ============================================================================
// Page Component
// ============================================================================

const CSKLogo = () => (
  <span className="prototype-athletes-list__logo">
    <span className="prototype-athletes-list__logo-text">CSK</span>
  </span>
);

const AthletesListPage = ({
  variant = 'standalone',
  initialSection = 'all',
  showFeatured = true,
}: AthletesListPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sectionFilter, setSectionFilter] = useState<string>(initialSection);
  const [vtClassFilter, setVtClassFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('ranking');
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
    { id: 'all', label: 'Všichni', content: null },
    { id: 'dv', label: 'Divoká voda', content: null },
    { id: 'ry', label: 'Rychlostní', content: null },
    { id: 'vt', label: 'Vodní turistika', content: null },
  ];

  // Featured athletes
  const featuredAthletes = useMemo(() => {
    return sampleAthletes.filter(a => a.isFeatured);
  }, []);

  // Filtered athletes
  const filteredAthletes = useMemo(() => {
    let result = sampleAthletes.filter(a => !a.isFeatured);

    // Section filter
    if (sectionFilter !== 'all') {
      result = result.filter(a => a.section === sectionFilter);
    }

    // VT class filter (only for VT section)
    if (sectionFilter === 'vt' && vtClassFilter !== 'all') {
      result = result.filter(a => a.vtClass === vtClassFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        a =>
          a.name.toLowerCase().includes(query) ||
          a.club.toLowerCase().includes(query) ||
          a.clubId.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name, 'cs');
        case 'ranking':
          return (a.ranking || 999) - (b.ranking || 999);
        case 'club':
          return a.club.localeCompare(b.club, 'cs');
        case 'birthYear':
          return b.birthYear - a.birthYear;
        default:
          return 0;
      }
    });

    return result;
  }, [sectionFilter, vtClassFilter, searchQuery, sortBy]);

  // Paginated athletes
  const paginatedAthletes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAthletes.slice(start, start + itemsPerPage);
  }, [filteredAthletes, currentPage]);

  const totalPages = Math.ceil(filteredAthletes.length / itemsPerPage);

  // Active filters for tags
  const activeFilters = useMemo(() => {
    const filters: Array<{ key: string; label: string; value: string }> = [];
    if (sectionFilter !== 'all') {
      filters.push({ key: 'section', label: sectionNames[sectionFilter], value: sectionFilter });
    }
    if (vtClassFilter !== 'all') {
      filters.push({ key: 'vtClass', label: `Třída ${vtClassFilter.toUpperCase()}`, value: vtClassFilter });
    }
    return filters;
  }, [sectionFilter, vtClassFilter, sectionNames]);

  const clearFilter = (key: string) => {
    if (key === 'section') setSectionFilter('all');
    if (key === 'vtClass') setVtClassFilter('all');
  };

  const clearAllFilters = () => {
    setSectionFilter('all');
    setVtClassFilter('all');
    setSearchQuery('');
  };

  // Statistics
  const stats = useMemo(() => {
    const total = sampleAthletes.length;
    const representatives = sampleAthletes.filter(a => a.isRepresentative).length;
    const clubs = new Set(sampleAthletes.map(a => a.clubId)).size;
    const sections = {
      dv: sampleAthletes.filter(a => a.section === 'dv').length,
      ry: sampleAthletes.filter(a => a.section === 'ry').length,
      vt: sampleAthletes.filter(a => a.section === 'vt').length,
    };
    return { total, representatives, clubs, sections };
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
          appName="Registr závodníků"
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
      <footer className="prototype-athletes-list__footer">
        <div className="prototype-athletes-list__footer-content">
          <p>© 2026 Český svaz kanoistů. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    );
  };

  return (
    <div className={`prototype-athletes-list ${variant === 'embed' ? 'prototype-athletes-list--embed' : ''}`}>
      {renderHeader()}

      {/* Page Header */}
      <section className="athletes-list-header">
        <div className="athletes-list-header__container">
          {variant !== 'embed' && (
            <div className="athletes-list-header__breadcrumb">
              <a href="#">Úvod</a>
              <span>/</span>
              <span>Závodníci</span>
            </div>
          )}
          <div className="athletes-list-header__content">
            <div>
              <h1 className="athletes-list-header__title">Registr závodníků</h1>
              <p className="athletes-list-header__subtitle">
                Kompletní seznam registrovaných závodníků Českého svazu kanoistů
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="athletes-list-stats">
            <div className="athletes-list-stats__item">
              <span className="athletes-list-stats__value">{stats.total}</span>
              <span className="athletes-list-stats__label">Závodníků</span>
            </div>
            <div className="athletes-list-stats__item">
              <span className="athletes-list-stats__value">{stats.representatives}</span>
              <span className="athletes-list-stats__label">Reprezentantů</span>
            </div>
            <div className="athletes-list-stats__item">
              <span className="athletes-list-stats__value">{stats.clubs}</span>
              <span className="athletes-list-stats__label">Klubů</span>
            </div>
            <div className="athletes-list-stats__item">
              <span className="athletes-list-stats__value">3</span>
              <span className="athletes-list-stats__label">Sekcí</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="prototype-athletes-list__main">
        <div className="prototype-athletes-list__container">

          {/* Featured Athletes */}
          {showFeatured && featuredAthletes.length > 0 && (
            <section className="athletes-list-featured">
              <div className="athletes-list-featured__header">
                <h2 className="athletes-list-featured__title">
                  <StarIcon />
                  Reprezentanti a mistři
                </h2>
              </div>
              <div className="athletes-list-featured__grid">
                {featuredAthletes.map(athlete => (
                  <AthleteCard
                    key={athlete.id}
                    name={athlete.name}
                    imageUrl={athlete.imageUrl}
                    club={athlete.club}
                    clubId={athlete.clubId}
                    section={athlete.section}
                    ranking={athlete.ranking}
                    birthYear={athlete.birthYear}
                    country={athlete.country}
                    variant="featured"
                    size="md"
                    clickable
                    href={`#athlete-${athlete.id}`}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Section Tabs */}
          <div className="athletes-list-section-tabs">
            <Tabs
              tabs={sectionTabs}
              activeTab={sectionFilter}
              onChange={(id) => {
                setSectionFilter(id);
                setCurrentPage(1);
                if (id !== 'vt') setVtClassFilter('all');
              }}
              variant="pills"
              size="md"
            />
          </div>

          {/* Search and Filters */}
          <Card variant="surface" className="athletes-list-filters">
            <div className="athletes-list-filters__row">
              <div className="athletes-list-filters__search">
                <Input
                  type="search"
                  placeholder="Hledat závodníka, klub..."
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
              <div className="athletes-list-filters__selects">
                {sectionFilter === 'vt' && (
                  <Select
                    options={vtClassOptions}
                    value={vtClassFilter}
                    onChange={(e) => {
                      setVtClassFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    size="md"
                    className="athletes-list-filters__select"
                  />
                )}
              </div>
              <div className="athletes-list-filters__actions">
                <Button
                  variant="secondary"
                  size="md"
                  iconLeft={<UsersIcon />}
                >
                  Exportovat
                </Button>
              </div>
            </div>

            {/* Active Filter Tags */}
            {(activeFilters.length > 0 || searchQuery) && (
              <div className="athletes-list-filters__tags">
                {searchQuery && (
                  <span className="athletes-list-filters__tag">
                    Hledání: "{searchQuery}"
                    <button
                      className="athletes-list-filters__tag-remove"
                      onClick={() => setSearchQuery('')}
                      aria-label="Zrušit hledání"
                    >
                      <CloseIcon />
                    </button>
                  </span>
                )}
                {activeFilters.map(filter => (
                  <span key={filter.key} className="athletes-list-filters__tag">
                    {filter.label}
                    <button
                      className="athletes-list-filters__tag-remove"
                      onClick={() => clearFilter(filter.key)}
                      aria-label={`Zrušit filtr ${filter.label}`}
                    >
                      <CloseIcon />
                    </button>
                  </span>
                ))}
                <button className="athletes-list-filters__clear" onClick={clearAllFilters}>
                  Zrušit vše
                </button>
              </div>
            )}
          </Card>

          {/* Results Header */}
          <div className="athletes-list-results__header">
            <span className="athletes-list-results__count">
              Nalezeno <strong>{filteredAthletes.length}</strong> závodníků
            </span>
            <div className="athletes-list-results__sort">
              <span className="athletes-list-results__sort-label">Řadit:</span>
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                size="sm"
              />
            </div>
          </div>

          {/* Athletes Grid or Empty State */}
          {paginatedAthletes.length > 0 ? (
            <>
              <div className="athletes-list-grid">
                {paginatedAthletes.map(athlete => (
                  <AthleteCard
                    key={athlete.id}
                    name={athlete.name}
                    imageUrl={athlete.imageUrl}
                    club={athlete.club}
                    clubId={athlete.clubId}
                    section={athlete.section}
                    vtClass={athlete.vtClass}
                    vtPoints={athlete.vtPoints}
                    ranking={athlete.ranking}
                    birthYear={athlete.birthYear}
                    country={athlete.country}
                    variant="default"
                    size="md"
                    clickable
                    href={`#athlete-${athlete.id}`}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="athletes-list-pagination">
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
            <div className="athletes-list-empty">
              <div className="athletes-list-empty__icon">
                <UserSearchIcon />
              </div>
              <h3 className="athletes-list-empty__title">Žádní závodníci nenalezeni</h3>
              <p className="athletes-list-empty__description">
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
  title: 'Prototypes/Athletes List Page',
  component: AthletesListPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Prototyp stránky seznamu závodníků CSK. Zobrazuje registrované závodníky s vyhledáváním, filtrováním podle sekcí a VT tříd, a featured sekci s reprezentanty.',
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
    showFeatured: {
      control: 'boolean',
      description: 'Show featured athletes section',
    },
  },
} satisfies Meta<typeof AthletesListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Integration Variants - Embed/Satellite only (Phase 8.10)
// ============================================================================

/**
 * **EMBED varianta** - Seznam závodníků vložený do kanoe.cz layoutu.
 *
 * Komponenta bez vlastního headeru a footeru, určená pro embedding
 * do existujícího webu kanoe.cz (Joomla + Bootstrap 4).
 */
export const Embed: Story = {
  args: {
    variant: 'embed',
    initialSection: 'all',
    showFeatured: true,
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="full"
        pageVariant="subpage"
        pageTitle="Závodníci"
        breadcrumbs={[
          { label: 'Úvod', href: '#' },
          { label: 'Registr', href: '#' },
          { label: 'Závodníci' },
        ]}
      >
        <Story />
      </KanoeCzContext>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Seznam závodníků embedovaný v kontextu kanoe.cz. Bez vlastního headeru/footeru.',
      },
    },
  },
};

/**
 * **SATELLITE varianta** - Standalone seznam závodníků s minimálním headerem.
 *
 * Pro samostatnou aplikaci registru závodníků s odkazem zpět na kanoe.cz.
 */
export const Satellite: Story = {
  args: {
    variant: 'satellite',
    initialSection: 'all',
    showFeatured: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Standalone aplikace registru závodníků s minimálním satellite headerem.',
      },
    },
  },
};

/**
 * **EMBED + Sidebar** - Seznam závodníků v úzkém sloupci.
 *
 * Demonstrace responzivity v omezeném prostoru.
 */
export const EmbedWithSidebar: Story = {
  args: {
    variant: 'embed',
    initialSection: 'all',
    showFeatured: false, // Hide featured in narrow layout
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="sidebar"
        showSidebar={true}
        pageVariant="subpage"
        pageTitle="Závodníci"
        breadcrumbs={[
          { label: 'Úvod', href: '#' },
          { label: 'Závodníci' },
        ]}
      >
        <Story />
      </KanoeCzContext>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Seznam závodníků v layoutu se sidebarem. Featured sekce je skryta pro úsporu místa.',
      },
    },
  },
};
