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
import { Icon } from '../components/Icon';
import { StatsBar } from '../components/StatsBar';
import { CSKLogo } from '../components/CSKLogo';
import { EmptyState } from '../components/EmptyState';
import { FilterPills, type FilterPill } from '../components/FilterPills';
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
// Page Component
// ============================================================================

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

  // Active filters for FilterPills
  const activeFilters: FilterPill[] = useMemo(() => {
    const filters: FilterPill[] = [];
    if (sectionFilter !== 'all') {
      filters.push({ key: 'section', label: sectionNames[sectionFilter] });
    }
    if (vtClassFilter !== 'all') {
      filters.push({ key: 'vtClass', label: `Třída ${vtClassFilter.toUpperCase()}` });
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
      <section className="athletes-list-header csk-mesh-bg--hero csk-grain">
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
              <h1 className="athletes-list-header__title csk-display">Registr závodníků</h1>
              <p className="athletes-list-header__subtitle">
                Kompletní seznam registrovaných závodníků Českého svazu kanoistů
              </p>
            </div>
          </div>

          {/* Statistics */}
          <StatsBar
            variant="floating"
            size="md"
            className="athletes-list-stats"
            items={[
              { key: 'total', value: stats.total, label: 'Závodníků', icon: 'users' },
              { key: 'representatives', value: stats.representatives, label: 'Reprezentantů', icon: 'medal' },
              { key: 'clubs', value: stats.clubs, label: 'Klubů', icon: 'building' },
              { key: 'sections', value: 3, label: 'Sekcí', icon: 'grid' },
            ]}
          />
        </div>
      </section>

      {/* Main Content */}
      <main className="prototype-athletes-list__main">
        <div className="prototype-athletes-list__container">

          {/* Featured Athletes */}
          {showFeatured && featuredAthletes.length > 0 && (
            <Card variant="aesthetic" className="athletes-list-featured csk-border-accent">
              <div className="athletes-list-featured__header">
                <h2 className="athletes-list-featured__title csk-headline">
                  <Icon name="star" size="lg" />
                  Reprezentanti a mistři
                </h2>
              </div>
              <div className="athletes-list-featured__grid">
                {featuredAthletes.map((athlete, index) => (
                  <div key={athlete.id} className={`csk-reveal csk-reveal-${index + 1}`}>
                    <AthleteCard
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
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Section Tabs */}
          <Card variant="surface" className="athletes-list-section-tabs">
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
          </Card>

          {/* Search and Filters */}
          <Card variant="surface" className="athletes-list-filters">
            <div className="athletes-list-filters__row">
              <div className="athletes-list-filters__search">
                <Input
                  type="search"
                  placeholder="Hledat závodníka, klub..."
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
                  iconLeft={<Icon name="download" />}
                >
                  Exportovat
                </Button>
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
            <EmptyState
              variant="card"
              size="lg"
              icon={<Icon name="user-search" size={64} />}
              title="Žádní závodníci nenalezeni"
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
  title: 'Prototypes/Athletes List Page',
  component: AthletesListPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Seznam závodníků - AESTHETIC Design

Prototyp stránky seznamu závodníků CSK s plným Aesthetic designem.

## Vizuální prvky (Phase 16.5)

- **Hero sekce** - Mesh gradient pozadí, display fonty, diagonální stripe
- **Stat karty** - Animované hover efekty, energy accent border
- **Featured sekce** - Staggered reveal animace, gradient border
- **Filtrování** - Pill-style tagy, aesthetic search bar
- **Grid karet** - Hover lift efekty, konzistentní spacing

## Varianty

| Varianta | Popis |
|----------|-------|
| **Embed** | Pro vložení do kanoe.cz (bez headeru/footeru) |
| **Satellite** | Standalone s minimálním headerem |

## Props

- \`showFeatured: false\` - skryje sekci reprezentantů
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
    showFeatured: {
      control: 'boolean',
      description: 'Show featured athletes section',
    },
  },
} satisfies Meta<typeof AthletesListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Integration Variants - Aesthetic (Phase 16.4)
// ============================================================================

/**
 * **EMBED varianta** - Aesthetic seznam závodníků v kontextu kanoe.cz
 *
 * Komponenta bez vlastního headeru a footeru, určená pro embedding
 * do existujícího webu kanoe.cz (Joomla + Bootstrap 4).
 *
 * **Aesthetic prvky:**
 * - Display fonty pro nadpisy
 * - Stat karty s hover efekty a energy accent
 * - Featured sekce se staggered reveal animací
 * - Pill-style filtrační tagy
 * - Hover lift efekty pro karty
 *
 * **Features dostupné přes props:**
 * - `showFeatured: false` - skryje sekci reprezentantů
 * - `initialSection` - přednastavenou sekci (dv, ry, vt)
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
        story: 'Aesthetic embed seznamu závodníků v kontextu kanoe.cz. Obsahuje mesh pozadí, display fonty, stat karty s hover efekty a staggered reveal animace pro featured sekci.',
      },
    },
  },
};

/**
 * **SATELLITE varianta** - Aesthetic standalone s minimálním headerem
 *
 * Samostatná aplikace registru závodníků s odkazem zpět na kanoe.cz.
 * Plný Aesthetic design s featured sekcí reprezentantů.
 *
 * **Aesthetic prvky:**
 * - Hero sekce s mesh gradient pozadím a diagonálním stripe
 * - Display fonty pro velké nadpisy
 * - Stat karty s energy accent a hover efekty
 * - Featured sekce se staggered reveal animací
 * - Pill-style filtrační tagy
 * - Hover lift efekty pro karty závodníků
 *
 * **Features dostupné přes props:**
 * - `showFeatured: false` - skryje sekci reprezentantů
 * - `initialSection` - přednastavenou sekci (dv, ry, vt)
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
        story: 'Aesthetic standalone seznamu závodníků se satellite headerem. Obsahuje plný hero s mesh pozadím, stat karty s energy accenty a staggered reveal animace.',
      },
    },
  },
};
