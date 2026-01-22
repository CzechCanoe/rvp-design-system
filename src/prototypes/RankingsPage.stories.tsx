import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Select } from '../components/Select';
import { Tabs } from '../components/Tabs';
import { Pagination } from '../components/Pagination';
import { Badge } from '../components/Badge';
import { ResultsTable, type ResultEntry } from '../components/ResultsTable';
import { KanoeCzContext } from '../components/KanoeCzContext';
import './RankingsPage.css';

// ============================================================================
// Types
// ============================================================================

type RankingsPageVariant = 'standalone' | 'satellite' | 'embed';

interface RankingsPageProps {
  /** Display variant */
  variant?: RankingsPageVariant;
  /** Initial section filter */
  initialSection?: 'dv' | 'ry' | 'vt';
  /** Initial discipline */
  initialDiscipline?: string;
  /** Initial season */
  initialSeason?: string;
  /** Show top athletes podium */
  showPodium?: boolean;
  /** Show archive notice for historical data */
  isArchive?: boolean;
}

interface RankingEntry {
  id: number;
  rank: number;
  name: string;
  club: string;
  clubId: string;
  section: 'dv' | 'ry' | 'vt';
  category: string;
  ageCategory?: string;
  points: number;
  races: number;
  bestResult?: string;
  birthYear: number;
  country: string;
  imageUrl?: string;
  vtClass?: 'm' | 'a' | 'b' | 'c';
}

// ============================================================================
// Sample Data
// ============================================================================

const sampleRankings: RankingEntry[] = [
  // Divoká voda - Slalom
  { id: 1, rank: 1, name: 'Jiří Prskavec', club: 'USK Praha', clubId: 'USK', section: 'dv', category: 'K1M', ageCategory: 'Senior', points: 2850, races: 12, bestResult: '1. MS', birthYear: 1993, country: 'CZE', imageUrl: 'https://i.pravatar.cc/150?u=prskavec' },
  { id: 2, rank: 2, name: 'Lukáš Rohan', club: 'USK Praha', clubId: 'USK', section: 'dv', category: 'C1M', ageCategory: 'Senior', points: 2720, races: 11, bestResult: '2. MS', birthYear: 1996, country: 'CZE', imageUrl: 'https://i.pravatar.cc/150?u=rohan' },
  { id: 3, rank: 3, name: 'Vít Přindiš', club: 'USK Praha', clubId: 'USK', section: 'dv', category: 'K1M', ageCategory: 'Senior', points: 2680, races: 10, bestResult: '3. ME', birthYear: 1990, country: 'CZE', imageUrl: 'https://i.pravatar.cc/150?u=prindis' },
  { id: 4, rank: 4, name: 'Tereza Fišerová', club: 'Dukla Praha', clubId: 'DUK', section: 'dv', category: 'C1W', ageCategory: 'Senior', points: 2540, races: 12, bestResult: '1. ME', birthYear: 1997, country: 'CZE', imageUrl: 'https://i.pravatar.cc/150?u=fiserova' },
  { id: 5, rank: 5, name: 'Jakub Krejčí', club: 'Dukla Praha', clubId: 'DUK', section: 'dv', category: 'K1M', ageCategory: 'U23', points: 2450, races: 9, birthYear: 1995, country: 'CZE' },
  { id: 6, rank: 6, name: 'Kateřina Kudějová', club: 'USK Praha', clubId: 'USK', section: 'dv', category: 'K1W', ageCategory: 'Senior', points: 2380, races: 11, bestResult: '2. ME', birthYear: 1990, country: 'CZE' },
  { id: 7, rank: 7, name: 'Vavřinec Hradilek', club: 'Dukla Praha', clubId: 'DUK', section: 'dv', category: 'K1M', ageCategory: 'Senior', points: 2320, races: 8, birthYear: 1987, country: 'CZE' },
  { id: 8, rank: 8, name: 'Antonie Galušková', club: 'Dukla Praha', clubId: 'DUK', section: 'dv', category: 'K1W', ageCategory: 'U23', points: 2280, races: 10, birthYear: 2000, country: 'CZE' },
  { id: 9, rank: 9, name: 'Gabriela Satková', club: 'USK Praha', clubId: 'USK', section: 'dv', category: 'C1W', ageCategory: 'U23', points: 2150, races: 9, birthYear: 1999, country: 'CZE' },
  { id: 10, rank: 10, name: 'Ondřej Tunka', club: 'SK Trnávka', clubId: 'TRN', section: 'dv', category: 'K1M', ageCategory: 'Junior', points: 2080, races: 8, birthYear: 1997, country: 'CZE' },

  // Rychlostní kanoistika
  { id: 11, rank: 1, name: 'Martin Fuksa', club: 'Dukla Praha', clubId: 'DUK', section: 'ry', category: 'C1M', ageCategory: 'Senior', points: 3100, races: 14, bestResult: '1. MS', birthYear: 1993, country: 'CZE', imageUrl: 'https://i.pravatar.cc/150?u=fuksa' },
  { id: 12, rank: 2, name: 'Josef Dostál', club: 'Dukla Praha', clubId: 'DUK', section: 'ry', category: 'K1M', ageCategory: 'Senior', points: 2950, races: 13, bestResult: '2. OH', birthYear: 1993, country: 'CZE', imageUrl: 'https://i.pravatar.cc/150?u=dostal' },
  { id: 13, rank: 3, name: 'Radek Šlouf', club: 'Dukla Praha', clubId: 'DUK', section: 'ry', category: 'K2M', ageCategory: 'Senior', points: 2780, races: 12, birthYear: 1985, country: 'CZE', imageUrl: 'https://i.pravatar.cc/150?u=slouf' },
  { id: 14, rank: 4, name: 'Anežka Paloudová', club: 'Dukla Praha', clubId: 'DUK', section: 'ry', category: 'K1W', ageCategory: 'Senior', points: 2650, races: 11, birthYear: 1996, country: 'CZE' },
  { id: 15, rank: 5, name: 'Jakub Zavřel', club: 'SK Brandýs', clubId: 'BRA', section: 'ry', category: 'K1M', ageCategory: 'U23', points: 2520, races: 10, birthYear: 1998, country: 'CZE' },

  // Vodní turistika
  { id: 16, rank: 1, name: 'Petr Novák', club: 'TJ Jablonec', clubId: 'JAB', section: 'vt', category: 'K1M', points: 1250, races: 8, birthYear: 1985, country: 'CZE', vtClass: 'm' },
  { id: 17, rank: 2, name: 'Jana Malá', club: 'KK Roudnice', clubId: 'ROU', section: 'vt', category: 'K1W', points: 980, races: 7, birthYear: 1990, country: 'CZE', vtClass: 'a' },
  { id: 18, rank: 3, name: 'Tomáš Horák', club: 'SK Trnávka', clubId: 'TRN', section: 'vt', category: 'K1M', points: 920, races: 6, birthYear: 1988, country: 'CZE', vtClass: 'a' },
  { id: 19, rank: 4, name: 'Lucie Svobodová', club: 'Bohemians Praha', clubId: 'BOH', section: 'vt', category: 'K1W', points: 750, races: 5, birthYear: 1995, country: 'CZE', vtClass: 'b' },
  { id: 20, rank: 5, name: 'Martin Veselý', club: 'TJ Jablonec', clubId: 'JAB', section: 'vt', category: 'K1M', points: 680, races: 6, birthYear: 1992, country: 'CZE', vtClass: 'b' },
  { id: 21, rank: 6, name: 'Eva Černá', club: 'KK Roudnice', clubId: 'ROU', section: 'vt', category: 'K1W', points: 450, races: 4, birthYear: 2000, country: 'CZE', vtClass: 'c' },
];

const seasonOptions = [
  { value: '2026', label: 'Sezóna 2026' },
  { value: '2025', label: 'Sezóna 2025' },
  { value: '2024', label: 'Sezóna 2024' },
  { value: '2023', label: 'Sezóna 2023' },
  { value: '2022', label: 'Sezóna 2022' },
];

const disciplineOptionsDV = [
  { value: 'all', label: 'Všechny disciplíny' },
  { value: 'slalom', label: 'Slalom' },
  { value: 'sjezd', label: 'Sjezd' },
  { value: 'sprint', label: 'Sprint' },
];

const disciplineOptionsRY = [
  { value: 'all', label: 'Všechny disciplíny' },
  { value: '200m', label: '200 m' },
  { value: '500m', label: '500 m' },
  { value: '1000m', label: '1000 m' },
  { value: 'maraton', label: 'Maratón' },
];

const categoryOptions = [
  { value: 'all', label: 'Všechny kategorie' },
  { value: 'K1M', label: 'K1 Muži' },
  { value: 'K1W', label: 'K1 Ženy' },
  { value: 'C1M', label: 'C1 Muži' },
  { value: 'C1W', label: 'C1 Ženy' },
  { value: 'C2M', label: 'C2 Muži' },
];

const ageCategoryOptions = [
  { value: 'all', label: 'Všechny věkové kat.' },
  { value: 'Junior', label: 'Junioři' },
  { value: 'U23', label: 'U23' },
  { value: 'Senior', label: 'Senioři' },
  { value: 'Master', label: 'Masters' },
];

// ============================================================================
// Icons
// ============================================================================

const MedalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

// ============================================================================
// Page Component
// ============================================================================

const CSKLogo = () => (
  <span className="prototype-rankings__logo">
    <span className="prototype-rankings__logo-text">CSK</span>
  </span>
);

const RankingsPage = ({
  variant = 'standalone',
  initialSection = 'dv',
  initialDiscipline = 'all',
  initialSeason = '2026',
  showPodium = true,
  isArchive = false,
}: RankingsPageProps) => {
  const [sectionFilter, setSectionFilter] = useState<string>(initialSection);
  const [disciplineFilter, setDisciplineFilter] = useState<string>(initialDiscipline);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [ageCategoryFilter, setAgeCategoryFilter] = useState<string>('all');
  const [seasonFilter, setSeasonFilter] = useState<string>(initialSeason);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Section tabs
  const sectionTabs = [
    { id: 'dv', label: 'Divoká voda', content: null },
    { id: 'ry', label: 'Rychlostní', content: null },
    { id: 'vt', label: 'Vodní turistika', content: null },
  ];

  // Get discipline options based on section
  const getDisciplineOptions = () => {
    if (sectionFilter === 'ry') return disciplineOptionsRY;
    return disciplineOptionsDV;
  };

  // Filtered rankings
  const filteredRankings = useMemo(() => {
    let result = sampleRankings.filter(r => r.section === sectionFilter);

    if (categoryFilter !== 'all') {
      result = result.filter(r => r.category === categoryFilter);
    }

    if (ageCategoryFilter !== 'all') {
      result = result.filter(r => r.ageCategory === ageCategoryFilter);
    }

    // Re-rank after filtering
    return result.map((r, idx) => ({ ...r, rank: idx + 1 }));
  }, [sectionFilter, categoryFilter, ageCategoryFilter]);

  // Top 3 for podium
  const topThree = useMemo(() => {
    return filteredRankings.slice(0, 3);
  }, [filteredRankings]);

  // Paginated results
  const paginatedRankings = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRankings.slice(start, start + itemsPerPage);
  }, [filteredRankings, currentPage]);

  const totalPages = Math.ceil(filteredRankings.length / itemsPerPage);

  // Convert to ResultsTable format
  const tableResults: ResultEntry[] = paginatedRankings.map(r => ({
    id: r.id,
    rank: r.rank,
    name: r.name,
    club: r.club,
    country: r.country,
    section: r.section,
    category: r.category,
    ageCategory: r.ageCategory,
    points: r.points,
    meta: {
      races: r.races,
      bestResult: r.bestResult,
      vtClass: r.vtClass,
    },
  }));

  // Statistics
  const stats = useMemo(() => {
    const sectionRankings = sampleRankings.filter(r => r.section === sectionFilter);
    const total = sectionRankings.length;
    const clubs = new Set(sectionRankings.map(r => r.clubId)).size;
    const topPoints = Math.max(...sectionRankings.map(r => r.points));
    const avgPoints = Math.round(sectionRankings.reduce((sum, r) => sum + r.points, 0) / total);
    return { total, clubs, topPoints, avgPoints };
  }, [sectionFilter]);

  // VT class statistics
  const vtStats = useMemo(() => {
    if (sectionFilter !== 'vt') return null;
    const vtRankings = sampleRankings.filter(r => r.section === 'vt');
    return {
      m: { count: vtRankings.filter(r => r.vtClass === 'm').length, minPoints: 1000 },
      a: { count: vtRankings.filter(r => r.vtClass === 'a').length, minPoints: 700 },
      b: { count: vtRankings.filter(r => r.vtClass === 'b').length, minPoints: 400 },
      c: { count: vtRankings.filter(r => r.vtClass === 'c').length, minPoints: 0 },
    };
  }, [sectionFilter]);

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
          appName="Žebříčky"
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
      <footer className="prototype-rankings__footer">
        <div className="prototype-rankings__footer-content">
          <p>© 2026 Český svaz kanoistů. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    );
  };

  // Get initials for avatar placeholder
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2);
  };

  // Podium card component
  const PodiumCard = ({ athlete, position }: { athlete: RankingEntry; position: 1 | 2 | 3 }) => {
    const positionClass = position === 1 ? 'gold' : position === 2 ? 'silver' : 'bronze';
    return (
      <div className={`rankings-podium-card rankings-podium-card--${positionClass}`}>
        <span className="rankings-podium-card__rank">{position}</span>
        <div className="rankings-podium-card__avatar">
          {athlete.imageUrl ? (
            <img src={athlete.imageUrl} alt={athlete.name} />
          ) : (
            <span className="rankings-podium-card__avatar-placeholder">
              {getInitials(athlete.name)}
            </span>
          )}
        </div>
        <h3 className="rankings-podium-card__name">{athlete.name}</h3>
        <p className="rankings-podium-card__club">{athlete.club}</p>
        <span className="rankings-podium-card__points">{athlete.points} bodů</span>
      </div>
    );
  };

  return (
    <div className={`prototype-rankings ${variant === 'embed' ? 'prototype-rankings--embed' : ''}`}>
      {renderHeader()}

      {/* Page Header */}
      <section className="rankings-header">
        <div className="rankings-header__container">
          {variant !== 'embed' && (
            <div className="rankings-header__breadcrumb">
              <a href="#">Úvod</a>
              <span>/</span>
              <span>Žebříčky</span>
            </div>
          )}
          <div className="rankings-header__content">
            <div>
              <h1 className="rankings-header__title">Žebříčky závodníků</h1>
              <p className="rankings-header__subtitle">
                Celkové žebříčky a bodové přehledy České kanoistiky
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="rankings-stats">
            <div className="rankings-stats__item">
              <span className="rankings-stats__value">{stats.total}</span>
              <span className="rankings-stats__label">Závodníků</span>
            </div>
            <div className="rankings-stats__item">
              <span className="rankings-stats__value">{stats.clubs}</span>
              <span className="rankings-stats__label">Klubů</span>
            </div>
            <div className="rankings-stats__item">
              <span className="rankings-stats__value">{stats.topPoints}</span>
              <span className="rankings-stats__label">Max. bodů</span>
            </div>
            <div className="rankings-stats__item">
              <span className="rankings-stats__value">{stats.avgPoints}</span>
              <span className="rankings-stats__label">Průměr bodů</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="prototype-rankings__main">
        <div className="prototype-rankings__container">

          {/* Archive Notice */}
          {isArchive && (
            <div className="rankings-archive-notice">
              <div className="rankings-archive-notice__icon">
                <InfoIcon />
              </div>
              <div className="rankings-archive-notice__content">
                <h3 className="rankings-archive-notice__title">Archivní žebříček</h3>
                <p className="rankings-archive-notice__text">
                  Prohlížíte archivní data z předchozích sezón. Tato data byla migrována ze systému Slalom World.
                </p>
              </div>
            </div>
          )}

          {/* Section Tabs */}
          <div className="rankings-section-tabs">
            <Tabs
              tabs={sectionTabs}
              activeTab={sectionFilter}
              onChange={(id) => {
                setSectionFilter(id);
                setDisciplineFilter('all');
                setCategoryFilter('all');
                setAgeCategoryFilter('all');
                setCurrentPage(1);
              }}
              variant="pills"
              size="md"
            />
          </div>

          {/* Top 3 Podium */}
          {showPodium && topThree.length >= 3 && (
            <section className="rankings-top">
              <div className="rankings-top__header">
                <h2 className="rankings-top__title">
                  <MedalIcon />
                  Top 3 závodníci
                </h2>
              </div>
              <div className="rankings-top__podium">
                {topThree.map((athlete, idx) => (
                  <PodiumCard
                    key={athlete.id}
                    athlete={athlete}
                    position={(idx + 1) as 1 | 2 | 3}
                  />
                ))}
              </div>
            </section>
          )}

          {/* VT Class Overview */}
          {sectionFilter === 'vt' && vtStats && (
            <div className="rankings-vt-overview">
              <div className="rankings-vt-class rankings-vt-class--m">
                <div className="rankings-vt-class__badge">M</div>
                <div className="rankings-vt-class__label">Třída M</div>
                <div className="rankings-vt-class__count">{vtStats.m.count} závodníků</div>
                <div className="rankings-vt-class__points">od {vtStats.m.minPoints} bodů</div>
              </div>
              <div className="rankings-vt-class rankings-vt-class--a">
                <div className="rankings-vt-class__badge">A</div>
                <div className="rankings-vt-class__label">Třída A</div>
                <div className="rankings-vt-class__count">{vtStats.a.count} závodníků</div>
                <div className="rankings-vt-class__points">od {vtStats.a.minPoints} bodů</div>
              </div>
              <div className="rankings-vt-class rankings-vt-class--b">
                <div className="rankings-vt-class__badge">B</div>
                <div className="rankings-vt-class__label">Třída B</div>
                <div className="rankings-vt-class__count">{vtStats.b.count} závodníků</div>
                <div className="rankings-vt-class__points">od {vtStats.b.minPoints} bodů</div>
              </div>
              <div className="rankings-vt-class rankings-vt-class--c">
                <div className="rankings-vt-class__badge">C</div>
                <div className="rankings-vt-class__label">Třída C</div>
                <div className="rankings-vt-class__count">{vtStats.c.count} závodníků</div>
                <div className="rankings-vt-class__points">začátečníci</div>
              </div>
            </div>
          )}

          {/* Filters */}
          <Card variant="surface" className="rankings-filters">
            <div className="rankings-filters__row">
              <div className="rankings-filters__group">
                <label className="rankings-filters__label">Sezóna</label>
                <Select
                  options={seasonOptions}
                  value={seasonFilter}
                  onChange={(e) => setSeasonFilter(e.target.value)}
                  size="md"
                />
              </div>
              {sectionFilter !== 'vt' && (
                <div className="rankings-filters__group">
                  <label className="rankings-filters__label">Disciplína</label>
                  <Select
                    options={getDisciplineOptions()}
                    value={disciplineFilter}
                    onChange={(e) => {
                      setDisciplineFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    size="md"
                  />
                </div>
              )}
              <div className="rankings-filters__group">
                <label className="rankings-filters__label">Kategorie</label>
                <Select
                  options={categoryOptions}
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  size="md"
                />
              </div>
              {sectionFilter !== 'vt' && (
                <div className="rankings-filters__group">
                  <label className="rankings-filters__label">Věková kat.</label>
                  <Select
                    options={ageCategoryOptions}
                    value={ageCategoryFilter}
                    onChange={(e) => {
                      setAgeCategoryFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    size="md"
                  />
                </div>
              )}
              <div className="rankings-filters__actions">
                <Button
                  variant="secondary"
                  size="md"
                  iconLeft={<DownloadIcon />}
                >
                  Export PDF
                </Button>
              </div>
            </div>
          </Card>

          {/* Rankings Table Header */}
          <div className="rankings-table-header">
            <h2 className="rankings-table-title">
              Celkový žebříček {sectionFilter === 'dv' ? 'Divoká voda' : sectionFilter === 'ry' ? 'Rychlostní kanoistika' : 'Vodní turistika'}
            </h2>
            <span className="rankings-table-info">
              Zobrazeno <strong>{paginatedRankings.length}</strong> z <strong>{filteredRankings.length}</strong> závodníků
            </span>
          </div>

          {/* Rankings Table */}
          <ResultsTable
            results={tableResults}
            variant="striped"
            styleVariant="default"
            size="md"
            showClub={true}
            showCategory={true}
            showAgeCategory={sectionFilter !== 'vt'}
            showPoints={true}
            showTimeDiff={false}
            showPodiumHighlights={true}
            highlightPositions={3}
            caption={`Žebříček ${sectionFilter.toUpperCase()} - Sezóna ${seasonFilter}`}
            renderCell={(entry, columnKey) => {
              if (columnKey === 'totalTime') {
                // Show races count instead of time
                const races = entry.meta?.races as number | undefined;
                return (
                  <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>
                    {races} závodů
                  </span>
                );
              }
              if (columnKey === 'name' && entry.section === 'vt' && entry.meta?.vtClass) {
                const vtClass = entry.meta.vtClass as 'm' | 'a' | 'b' | 'c';
                return (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                    {entry.name}
                    <Badge
                      vtClass={vtClass}
                      size="sm"
                    />
                  </span>
                );
              }
              return undefined;
            }}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="rankings-pagination">
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
  title: 'Prototypes/Rankings Page',
  component: RankingsPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Prototyp stránky žebříčků CSK. Zobrazuje celkové žebříčky závodníků s filtrováním podle sekcí, disciplín a kategorií. Nahrazuje funkcionalitu Slalom World.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standalone', 'satellite', 'embed'],
      description: 'Display variant',
    },
    initialSection: {
      control: 'select',
      options: ['dv', 'ry', 'vt'],
      description: 'Initial section filter',
    },
    initialSeason: {
      control: 'select',
      options: ['2026', '2025', '2024', '2023'],
      description: 'Initial season',
    },
    showPodium: {
      control: 'boolean',
      description: 'Show top 3 podium section',
    },
    isArchive: {
      control: 'boolean',
      description: 'Show archive notice for historical data',
    },
  },
} satisfies Meta<typeof RankingsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Integration Variants - Embed/Satellite only (Phase 8.11)
// ============================================================================

/**
 * **EMBED varianta** - Žebříčky vložené do kanoe.cz layoutu.
 *
 * Komponenta bez vlastního headeru a footeru, určená pro embedding
 * do existujícího webu kanoe.cz (Joomla + Bootstrap 4).
 */
export const Embed: Story = {
  args: {
    variant: 'embed',
    initialSection: 'dv',
    showPodium: true,
    isArchive: false,
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="full"
        pageVariant="subpage"
        pageTitle="Žebříčky"
        breadcrumbs={[
          { label: 'Úvod', href: '#' },
          { label: 'Výsledky', href: '#' },
          { label: 'Žebříčky' },
        ]}
      >
        <Story />
      </KanoeCzContext>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Žebříčky embedované v kontextu kanoe.cz. Bez vlastního headeru/footeru.',
      },
    },
  },
};

/**
 * **SATELLITE varianta** - Standalone žebříčky s minimálním headerem.
 *
 * Pro samostatnou aplikaci žebříčků s odkazem zpět na kanoe.cz.
 */
export const Satellite: Story = {
  args: {
    variant: 'satellite',
    initialSection: 'dv',
    showPodium: true,
    isArchive: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Standalone aplikace žebříčků s minimálním satellite headerem.',
      },
    },
  },
};

/**
 * **EMBED + Rychlostní kanoistika** - Žebříčky rychlostní kanoistiky.
 */
export const EmbedRychlostni: Story = {
  args: {
    variant: 'embed',
    initialSection: 'ry',
    showPodium: true,
    isArchive: false,
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="full"
        pageVariant="subpage"
        pageTitle="Žebříčky - Rychlostní kanoistika"
        breadcrumbs={[
          { label: 'Úvod', href: '#' },
          { label: 'Rychlostní', href: '#' },
          { label: 'Žebříčky' },
        ]}
      >
        <Story />
      </KanoeCzContext>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Žebříčky rychlostní kanoistiky s podiem.',
      },
    },
  },
};

/**
 * **EMBED + Vodní turistika** - Žebříčky vodní turistiky s VT třídami.
 */
export const EmbedVodniTuristika: Story = {
  args: {
    variant: 'embed',
    initialSection: 'vt',
    showPodium: false,
    isArchive: false,
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="full"
        pageVariant="subpage"
        pageTitle="Žebříčky - Vodní turistika"
        breadcrumbs={[
          { label: 'Úvod', href: '#' },
          { label: 'Vodní turistika', href: '#' },
          { label: 'Výkonnostní třídy' },
        ]}
      >
        <Story />
      </KanoeCzContext>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Přehled výkonnostních tříd vodní turistiky. Zobrazuje VT třídy (M, A, B, C) s počty závodníků a bodovými limity.',
      },
    },
  },
};

/**
 * **EMBED + Archivní data** - Historické žebříčky z dřívějších sezón.
 */
export const EmbedArchive: Story = {
  args: {
    variant: 'embed',
    initialSection: 'dv',
    initialSeason: '2023',
    showPodium: true,
    isArchive: true,
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="full"
        pageVariant="subpage"
        pageTitle="Archiv žebříčků"
        breadcrumbs={[
          { label: 'Úvod', href: '#' },
          { label: 'Výsledky', href: '#' },
          { label: 'Archiv', href: '#' },
          { label: 'Žebříčky 2023' },
        ]}
      >
        <Story />
      </KanoeCzContext>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Archivní žebříčky z předchozích sezón. Zobrazuje upozornění o archivních datech migrovaných ze Slalom World.',
      },
    },
  },
};
