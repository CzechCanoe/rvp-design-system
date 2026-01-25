import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { MainNav } from '../components/Navigation';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Tabs } from '../components/Tabs';
import { LiveIndicator } from '../components/LiveIndicator';
import { Pagination } from '../components/Pagination';
import { ResultsTable, type ResultEntry } from '../components/ResultsTable';
import { KanoeCzContext } from '../components/KanoeCzContext';
import { Icon } from '../components/Icon';
import { CSKLogo } from '../components/CSKLogo';
import { PodiumCard } from '../components/PodiumCard';
import './ResultsPage.css';

// ============================================================================
// Types
// ============================================================================

/** Display variant for the page */
type ResultsPageVariant = 'standalone' | 'satellite' | 'embed';

interface ResultsPageProps {
  /** Race ID */
  raceId?: string;
  /** Initial category filter */
  initialCategory?: string;
  /** Whether the race is currently live */
  isLive?: boolean;
  /** Show hero section */
  showHero?: boolean;
  /** Show podium section */
  showPodium?: boolean;
  /** Section/discipline for theming */
  section?: 'dv' | 'ry' | 'vt';
  /** Display variant - standalone (full), satellite (minimal header), embed (no chrome) */
  variant?: ResultsPageVariant;
}

// ============================================================================
// Sample Data
// ============================================================================

const generateResults = (category: string): ResultEntry[] => {
  const baseResults: Record<string, ResultEntry[]> = {
    'K1M': [
      { id: 1, rank: 1, name: 'Jiří Prskavec', club: 'USK Praha', category: 'K1M', totalTime: 92.34, timeDiff: 0, section: 'dv' },
      { id: 2, rank: 2, name: 'Vít Přindiš', club: 'USK Praha', category: 'K1M', totalTime: 93.87, timeDiff: 1.53, section: 'dv' },
      { id: 3, rank: 3, name: 'Jakub Krejčí', club: 'Dukla Praha', category: 'K1M', totalTime: 94.21, timeDiff: 1.87, section: 'dv' },
      { id: 4, rank: 4, name: 'Vavřinec Hradilek', club: 'Dukla Praha', category: 'K1M', totalTime: 95.45, timeDiff: 3.11, section: 'dv' },
      { id: 5, rank: 5, name: 'Ondřej Tunka', club: 'SK Trnávka', category: 'K1M', totalTime: 96.12, timeDiff: 3.78, section: 'dv' },
      { id: 6, rank: 6, name: 'Filip Roháč', club: 'Bohemians Praha', category: 'K1M', totalTime: 97.34, timeDiff: 5.00, section: 'dv' },
      { id: 7, rank: 7, name: 'Martin Sládek', club: 'KK Roudnice', category: 'K1M', totalTime: 98.56, timeDiff: 6.22, section: 'dv' },
      { id: 8, rank: 8, name: 'Tomáš Ježek', club: 'SK Hradec Králové', category: 'K1M', totalTime: 99.23, timeDiff: 6.89, section: 'dv' },
      { id: 9, rank: 9, name: 'David Novák', club: 'USK Praha', category: 'K1M', totalTime: 100.45, timeDiff: 8.11, section: 'dv' },
      { id: 10, rank: 10, name: 'Petr Svoboda', club: 'Dukla Praha', category: 'K1M', totalTime: 101.23, timeDiff: 8.89, section: 'dv' },
      { id: 11, rank: 11, name: 'Jan Horák', club: 'KK Brandýs', category: 'K1M', totalTime: 102.56, timeDiff: 10.22, section: 'dv' },
      { id: 12, rank: 12, name: 'Lukáš Dvořák', club: 'SK Trnávka', category: 'K1M', totalTime: 103.89, timeDiff: 11.55, section: 'dv' },
      { id: 13, rank: undefined, name: 'Marek Procházka', club: 'Bohemians Praha', category: 'K1M', status: 'dnf', section: 'dv' },
      { id: 14, rank: undefined, name: 'Štěpán Král', club: 'KK Roudnice', category: 'K1M', status: 'dsq', section: 'dv' },
    ],
    'K1W': [
      { id: 101, rank: 1, name: 'Tereza Fišerová', club: 'Dukla Praha', category: 'K1W', totalTime: 98.45, timeDiff: 0, section: 'dv' },
      { id: 102, rank: 2, name: 'Kateřina Minařík Kudějová', club: 'USK Praha', category: 'K1W', totalTime: 99.23, timeDiff: 0.78, section: 'dv' },
      { id: 103, rank: 3, name: 'Antonie Galušková', club: 'Dukla Praha', category: 'K1W', totalTime: 100.56, timeDiff: 2.11, section: 'dv' },
      { id: 104, rank: 4, name: 'Veronika Vojtová', club: 'USK Praha', category: 'K1W', totalTime: 101.34, timeDiff: 2.89, section: 'dv' },
      { id: 105, rank: 5, name: 'Monika Jančová', club: 'SK Trnávka', category: 'K1W', totalTime: 102.45, timeDiff: 4.00, section: 'dv' },
      { id: 106, rank: 6, name: 'Barbora Seemanová', club: 'Bohemians Praha', category: 'K1W', totalTime: 103.78, timeDiff: 5.33, section: 'dv' },
      { id: 107, rank: 7, name: 'Eva Rybářová', club: 'KK Roudnice', category: 'K1W', totalTime: 104.23, timeDiff: 5.78, section: 'dv' },
      { id: 108, rank: 8, name: 'Jana Nováková', club: 'SK Hradec Králové', category: 'K1W', totalTime: 105.67, timeDiff: 7.22, section: 'dv' },
    ],
    'C1M': [
      { id: 201, rank: 1, name: 'Lukáš Rohan', club: 'USK Praha', category: 'C1M', totalTime: 96.78, timeDiff: 0, section: 'dv' },
      { id: 202, rank: 2, name: 'Jan Masopust', club: 'Dukla Praha', category: 'C1M', totalTime: 97.45, timeDiff: 0.67, section: 'dv' },
      { id: 203, rank: 3, name: 'Vojtěch Heger', club: 'Dukla Praha', category: 'C1M', totalTime: 98.23, timeDiff: 1.45, section: 'dv' },
      { id: 204, rank: 4, name: 'Matěj Beňuš', club: 'SK Trnávka', category: 'C1M', totalTime: 99.56, timeDiff: 2.78, section: 'dv' },
      { id: 205, rank: 5, name: 'Tomáš Kořínek', club: 'Bohemians Praha', category: 'C1M', totalTime: 100.89, timeDiff: 4.11, section: 'dv' },
      { id: 206, rank: 6, name: 'David Vlček', club: 'KK Roudnice', category: 'C1M', totalTime: 101.34, timeDiff: 4.56, section: 'dv' },
    ],
    'C1W': [
      { id: 301, rank: 1, name: 'Gabriela Satková', club: 'USK Praha', category: 'C1W', totalTime: 104.23, timeDiff: 0, section: 'dv' },
      { id: 302, rank: 2, name: 'Martina Satkova', club: 'Dukla Praha', category: 'C1W', totalTime: 105.67, timeDiff: 1.44, section: 'dv' },
      { id: 303, rank: 3, name: 'Tereza Kneblová', club: 'SK Trnávka', category: 'C1W', totalTime: 106.45, timeDiff: 2.22, section: 'dv' },
      { id: 304, rank: 4, name: 'Klára Veselá', club: 'Bohemians Praha', category: 'C1W', totalTime: 107.89, timeDiff: 3.66, section: 'dv' },
    ],
  };

  return baseResults[category] || [];
};

const categories = [
  { id: 'K1M', name: 'K1 Muži', count: 14 },
  { id: 'K1W', name: 'K1 Ženy', count: 8 },
  { id: 'C1M', name: 'C1 Muži', count: 6 },
  { id: 'C1W', name: 'C1 Ženy', count: 4 },
];

// Navigation items
const navItems = [
  { id: 'home', label: 'Domů', href: '#' },
  { id: 'calendar', label: 'Kalendář', href: '#' },
  { id: 'results', label: 'Výsledky', href: '#', active: true },
  { id: 'athletes', label: 'Závodníci', href: '#' },
  { id: 'clubs', label: 'Kluby', href: '#' },
];

// Note: Inline SVG icons replaced with Icon component (Phase 17.8)

// ============================================================================
// Helper Functions
// ============================================================================

function formatTime(seconds: number | undefined): string {
  if (seconds === undefined || seconds === null) return '-';
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toFixed(2).padStart(5, '0')}`;
}

function formatTimeDiff(seconds: number | undefined): string {
  if (seconds === undefined || seconds === null || seconds === 0) return '';
  return `+${formatTime(seconds)}`;
}

// ============================================================================
// Page Component
// ============================================================================

const ResultsPage = ({
  initialCategory = 'K1M',
  isLive = false,
  showHero = true,
  showPodium = true,
  section = 'dv',
  variant = 'standalone',
}: ResultsPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Get results for selected category
  const results = useMemo(() => {
    let data = generateResults(selectedCategory);

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      data = data.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.club?.toLowerCase().includes(query)
      );
    }

    return data;
  }, [selectedCategory, searchQuery]);

  // Get podium (top 3)
  const podium = useMemo(() => {
    return results
      .filter((r) => r.rank && r.rank <= 3)
      .sort((a, b) => (a.rank || 0) - (b.rank || 0));
  }, [results]);

  // Category tabs
  const categoryTabs = categories.map((cat) => ({
    id: cat.id,
    label: (
      <span className="prototype-results-page__tab-label">
        {cat.name}
        <Badge variant="default" size="sm">
          {cat.count}
        </Badge>
      </span>
    ),
    content: null,
  }));

  // Pagination
  const pageSize = 20;
  const totalPages = Math.ceil(results.length / pageSize);
  const paginatedResults = results.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Header rendering based on variant
  const renderHeader = () => {
    if (variant === 'embed') {
      return null; // No header for embed - KanoeCzContext provides it
    }

    if (variant === 'satellite') {
      return (
        <Header
          variant="satellite"
          size="sm"
          bordered
          brand={<CSKLogo />}
          appName="Výsledky"
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
        variant="default"
        size="md"
        bordered
        brand={
          <a href="#" className="prototype-results-page__logo">
            <span className="prototype-results-page__logo-text">CSK</span>
            <span className="prototype-results-page__logo-subtitle">Český svaz kanoistů</span>
          </a>
        }
        navigation={
          <MainNav
            items={navItems}
            variant="horizontal"
            showMobileToggle={false}
            onItemClick={(item) => console.log('Nav click:', item)}
          />
        }
        search={
          <Input
            type="search"
            placeholder="Hledat..."
            size="sm"
            iconLeft={<Icon name="search" size="md" />}
          />
        }
        userMenu={
          <Button variant="primary" size="sm">
            Přihlásit se
          </Button>
        }
      />
    );
  };

  // Footer rendering based on variant
  const renderFooter = () => {
    if (variant === 'embed') {
      return null; // No footer for embed - KanoeCzContext provides it
    }

    return (
      <footer className="prototype-results-page__footer">
        <div className="prototype-results-page__footer-content">
          <p>© 2026 Český svaz kanoistů. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    );
  };

  return (
    <div className={`prototype-results-page ${variant === 'embed' ? 'prototype-results-page--embed' : ''}`}>
      {/* Header */}
      {renderHeader()}

      {/* Page Header - Clean design without waves */}
      {showHero && (
        <Card variant="surface" className={`results-page-header results-page-header--${section}`}>
          <div className="results-page-header__container">
            <div className="results-page-header__breadcrumb">
              <a href="#">Výsledky</a>
              <span>/</span>
              <a href="#">2026</a>
              <span>/</span>
              <span>MČR ve slalomu</span>
            </div>
            <div className="results-page-header__content">
              <div className="results-page-header__left">
                <div className="results-page-header__title-row">
                  <h1 className="results-page-header__title csk-display">MČR ve slalomu 2026</h1>
                  {isLive && <LiveIndicator variant="live" size="md" label="LIVE" energyGlow />}
                  {!isLive && <Badge variant="success" glow>Oficiální výsledky</Badge>}
                </div>
                <div className="results-page-header__meta">
                  <span className="results-page-header__meta-item">
                    <Icon name="calendar" size="sm" />
                    3.–5. května 2026
                  </span>
                  <span className="results-page-header__meta-item">
                    <Icon name="location" size="sm" />
                    Praha – Troja
                  </span>
                  <span className="results-page-header__meta-item">
                    <Icon name="users" size="sm" />
                    156 závodníků
                  </span>
                </div>
              </div>
              <div className="results-page-header__stats">
                <div className="results-page-header__stat csk-reveal csk-reveal-1">
                  <span className="results-page-header__stat-value csk-display">4</span>
                  <span className="results-page-header__stat-label">kategorie</span>
                </div>
                <div className="results-page-header__stat csk-reveal csk-reveal-2">
                  <span className="results-page-header__stat-value csk-display">156</span>
                  <span className="results-page-header__stat-label">závodníků</span>
                </div>
                <div className="results-page-header__stat csk-reveal csk-reveal-3">
                  <span className="results-page-header__stat-value csk-display">24</span>
                  <span className="results-page-header__stat-label">branek</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Podium Section - Using PodiumCard component with energy glow */}
      {showHero && showPodium && podium.length >= 3 && !searchQuery && (
        <section className="results-page-podium results-page-podium--energy csk-reveal">
          <div className="results-page-podium__container">
            <div className="results-page-podium__header">
              <Icon name="trophy" size="md" />
              <h2 className="results-page-podium__title csk-headline">Stupně vítězů – {categories.find(c => c.id === selectedCategory)?.name}</h2>
            </div>
            <div className="results-page-podium__grid">
              <PodiumCard
                position={1}
                name={podium[0].name}
                club={podium[0].club}
                primaryValue={formatTime(podium[0].totalTime)}
                onClick={() => console.log('Clicked:', podium[0].name)}
                showArrow
              />
              <PodiumCard
                position={2}
                name={podium[1].name}
                club={podium[1].club}
                primaryValue={formatTime(podium[1].totalTime)}
                secondaryValue={formatTimeDiff(podium[1].timeDiff)}
                onClick={() => console.log('Clicked:', podium[1].name)}
                showArrow
              />
              <PodiumCard
                position={3}
                name={podium[2].name}
                club={podium[2].club}
                primaryValue={formatTime(podium[2].totalTime)}
                secondaryValue={formatTimeDiff(podium[2].timeDiff)}
                onClick={() => console.log('Clicked:', podium[2].name)}
                showArrow
              />
            </div>
          </div>
        </section>
      )}

      {/* Main content */}
      <main className="prototype-results-page__main">
        <div className="prototype-results-page__container">
          {/* Content */}
          <div className="prototype-results-page__content">
            {/* Results Section */}
            <div className="prototype-results-page__results">
              {/* Category Tabs */}
              <div className="prototype-results-page__filters">
                <div className="prototype-results-page__filters-left">
                  <Tabs
                    tabs={categoryTabs}
                    activeTab={selectedCategory}
                    onChange={(id) => {
                      setSelectedCategory(id);
                      setCurrentPage(1);
                    }}
                    variant="pills"
                    size="sm"
                  />
                </div>
                <div className="prototype-results-page__filters-right">
                  <Input
                    type="search"
                    placeholder="Hledat závodníka..."
                    size="sm"
                    iconLeft={<Icon name="search" size="md" />}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    clearable
                    onClear={() => setSearchQuery('')}
                    className="prototype-results-page__search-input"
                  />
                  <Select
                    options={[
                      { value: 'final', label: 'Finále' },
                      { value: 'semifinal', label: 'Semifinále' },
                      { value: 'qualification', label: 'Kvalifikace' },
                    ]}
                    defaultValue="final"
                    size="sm"
                  />
                </div>
              </div>

              {/* Results Header */}
              <div className="prototype-results-page__results-header">
                <h2 className="prototype-results-page__results-title csk-headline">
                  Výsledky
                  <span className="prototype-results-page__results-count">
                    ({results.length} závodníků)
                  </span>
                </h2>
                <div className="prototype-results-page__results-actions">
                  <Button variant="ghost" size="sm" iconLeft={<Icon name="print" size="sm" />}>
                    Tisk
                  </Button>
                  <Button variant="ghost" size="sm" iconLeft={<Icon name="share" size="sm" />}>
                    Sdílet
                  </Button>
                </div>
              </div>

              {/* Results Table */}
              <ResultsTable
                results={paginatedResults}
                variant="striped"
                styleVariant="gradient"
                size="md"
                showRuns={false}
                showTimeDiff={true}
                showClub={true}
                showPodiumHighlights={true}
                stickyHeader
                onRowClick={(entry) => console.log('Row clicked:', entry)}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="prototype-results-page__pagination">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="prototype-results-page__sidebar">
              {/* Race Info */}
              <Card variant="surface" className="prototype-results-page__race-info">
                <h3 className="prototype-results-page__race-info-title">Informace o závodě</h3>
                <div className="prototype-results-page__race-info-list">
                  <div className="prototype-results-page__race-info-item">
                    <span className="prototype-results-page__race-info-label">Organizátor</span>
                    <span className="prototype-results-page__race-info-value">USK Praha</span>
                  </div>
                  <div className="prototype-results-page__race-info-item">
                    <span className="prototype-results-page__race-info-label">Rozhodčí</span>
                    <span className="prototype-results-page__race-info-value">Jan Novák</span>
                  </div>
                  <div className="prototype-results-page__race-info-item">
                    <span className="prototype-results-page__race-info-label">Délka tratě</span>
                    <span className="prototype-results-page__race-info-value">300 m</span>
                  </div>
                  <div className="prototype-results-page__race-info-item">
                    <span className="prototype-results-page__race-info-label">Počet branek</span>
                    <span className="prototype-results-page__race-info-value">24</span>
                  </div>
                  <div className="prototype-results-page__race-info-item">
                    <span className="prototype-results-page__race-info-label">Stav výsledků</span>
                    <span className="prototype-results-page__race-info-value">
                      {isLive ? (
                        <Badge variant="warning" size="sm">Probíhá</Badge>
                      ) : (
                        <Badge variant="success" size="sm">Oficiální</Badge>
                      )}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Categories */}
              <Card variant="surface" className="prototype-results-page__categories">
                <div className="prototype-results-page__categories-header">
                  <h3 className="prototype-results-page__categories-title">Kategorie</h3>
                </div>
                <div className="prototype-results-page__categories-list">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      className={`prototype-results-page__category-item ${
                        selectedCategory === cat.id ? 'prototype-results-page__category-item--active' : ''
                      }`}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setCurrentPage(1);
                      }}
                    >
                      <span className="prototype-results-page__category-name">{cat.name}</span>
                      <span className="prototype-results-page__category-count">
                        {cat.count}
                        <Icon name="chevron-right" size="sm" />
                      </span>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Downloads */}
              <Card variant="surface" className="prototype-results-page__downloads">
                <h3 className="prototype-results-page__downloads-title">Ke stažení</h3>
                <div className="prototype-results-page__downloads-list">
                  <Button variant="secondary" size="sm" fullWidth iconLeft={<Icon name="download" size="sm" />}>
                    Výsledky PDF
                  </Button>
                  <Button variant="secondary" size="sm" fullWidth iconLeft={<Icon name="download" size="sm" />}>
                    Výsledky Excel
                  </Button>
                  <Button variant="secondary" size="sm" fullWidth iconLeft={<Icon name="download" size="sm" />}>
                    Startovní listina
                  </Button>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
      {renderFooter()}
    </div>
  );
};

// ============================================================================
// Storybook Meta
// ============================================================================

const meta = {
  title: 'Prototypes/Results Page',
  component: ResultsPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Prototyp stránky výsledků závodu CSK. Zobrazuje výsledkovou listinu s dramatickým pódiem, hero sekcí a filtrováním podle kategorií.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    initialCategory: {
      control: 'select',
      options: ['K1M', 'K1W', 'C1M', 'C1W'],
      description: 'Initial category filter',
    },
    isLive: {
      control: 'boolean',
      description: 'Whether the race is currently live',
    },
    showHero: {
      control: 'boolean',
      description: 'Show hero section',
    },
    showPodium: {
      control: 'boolean',
      description: 'Show podium section',
    },
    section: {
      control: 'select',
      options: ['dv', 'ry', 'vt'],
      description: 'Section/discipline for hero theming',
    },
    variant: {
      control: 'select',
      options: ['standalone', 'satellite', 'embed'],
      description: 'Display variant - standalone (full header), satellite (minimal), embed (no chrome)',
    },
  },
} satisfies Meta<typeof ResultsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Aesthetic Variants - Embed/Satellite (Phase 16.2)
// ============================================================================

/**
 * **EMBED varianta** - Aesthetic styl pro vložení do kanoe.cz
 *
 * Výsledky v plném Aesthetic designu bez vlastního headeru/footeru.
 * Určeno pro embedding do existujícího webu kanoe.cz (Joomla + Bootstrap 4).
 *
 * **Features dostupné přes props:**
 * - `showHero: false` - kompaktní režim bez hero sekce
 * - `showPodium: false` - skryje sekci stupňů vítězů
 * - `isLive: true` - live indikátor
 */
export const Embed: Story = {
  args: {
    initialCategory: 'K1M',
    isLive: false,
    showHero: true,
    showPodium: true,
    section: 'dv',
    variant: 'embed',
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="full"
        pageVariant="detail"
        pageTitle="MČR ve slalomu 2026 - Výsledky"
        breadcrumbs={[
          { label: 'Úvod', href: '#' },
          { label: 'Výsledky', href: '#' },
          { label: 'MČR ve slalomu 2026' },
        ]}
      >
        <Story />
      </KanoeCzContext>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Aesthetic embed výsledků v kontextu kanoe.cz. Pro kompaktní zobrazení použijte `showHero: false, showPodium: false`.',
      },
    },
  },
};

/**
 * **SATELLITE varianta** - Aesthetic standalone s minimálním headerem
 *
 * Samostatná aplikace výsledků s odkazem zpět na kanoe.cz.
 * Plný Aesthetic design s gradient hero sekcí a interaktivním pódiem.
 *
 * **Features dostupné přes props:**
 * - `showHero: false` - kompaktní režim bez hero sekce
 * - `showPodium: false` - skryje sekci stupňů vítězů
 * - `isLive: true` - live indikátor
 */
export const Satellite: Story = {
  args: {
    initialCategory: 'K1M',
    isLive: false,
    showHero: true,
    showPodium: true,
    section: 'dv',
    variant: 'satellite',
  },
  parameters: {
    docs: {
      description: {
        story: 'Aesthetic standalone výsledků se satellite headerem. Pro kompaktní zobrazení použijte `showHero: false, showPodium: false`.',
      },
    },
  },
};

