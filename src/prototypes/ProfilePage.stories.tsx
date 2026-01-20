import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Header } from '../components/Header';
import { MainNav } from '../components/Navigation';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Tabs } from '../components/Tabs';
import { Avatar } from '../components/Avatar';
import { StatCard } from '../components/StatCard';
import { Timeline, type TimelineItem } from '../components/Timeline';
import { Table, type ColumnDef } from '../components/Table';
import { Progress } from '../components/Progress';
import './ProfilePage.css';

// ============================================================================
// Types
// ============================================================================

interface ProfilePageProps {
  /** Athlete ID */
  athleteId?: string;
  /** Show edit controls (for own profile) */
  isOwnProfile?: boolean;
  /** Show admin controls */
  isAdmin?: boolean;
  /** Discipline section for theming */
  section?: 'dv' | 'ry' | 'vt';
}

interface AthleteResult {
  id: string;
  date: string;
  race: string;
  location: string;
  category: string;
  rank: number | null;
  totalEntries: number;
  time?: string;
  points?: number;
  status?: 'finished' | 'dnf' | 'dsq';
}

interface AthleteData {
  id: string;
  name: string;
  birthYear: number;
  club: string;
  clubId: string;
  section: 'dv' | 'ry' | 'vt';
  vtClass: 'm' | 'a' | 'b' | 'c';
  vtPoints: number;
  ranking: number;
  country: string;
  licenseNumber: string;
  imageUrl?: string;
  registrationDate: string;
  medicalExpiry: string;
  feesStatus: 'paid' | 'pending' | 'expired';
  rightToStart: boolean;
  totalRaces: number;
  podiums: number;
  wins: number;
  bestRanking: number;
}

// ============================================================================
// Sample Data
// ============================================================================

const athleteData: AthleteData = {
  id: 'CZE-12345',
  name: 'Jiří Prskavec',
  birthYear: 1993,
  club: 'USK Praha',
  clubId: 'USK001',
  section: 'dv',
  vtClass: 'm',
  vtPoints: 1250,
  ranking: 1,
  country: 'CZE',
  licenseNumber: 'RGC-2008-0042',
  registrationDate: '2008-03-15',
  medicalExpiry: '2026-06-30',
  feesStatus: 'paid',
  rightToStart: true,
  totalRaces: 312,
  podiums: 187,
  wins: 98,
  bestRanking: 1,
};

const ryAthleteData: AthleteData = {
  ...athleteData,
  id: 'CZE-67890',
  name: 'Martin Fuksa',
  club: 'Dukla Praha',
  section: 'ry',
  vtClass: 'm',
  ranking: 1,
  totalRaces: 245,
  podiums: 156,
  wins: 89,
};

const vtAthleteData: AthleteData = {
  ...athleteData,
  id: 'CZE-11111',
  name: 'Petr Novák',
  club: 'TJ Bohemians',
  section: 'vt',
  vtClass: 'a',
  ranking: 5,
  totalRaces: 78,
  podiums: 23,
  wins: 8,
};

const recentResults: AthleteResult[] = [
  {
    id: '1',
    date: '2026-01-12',
    race: 'Český pohár #1',
    location: 'Praha - Troja',
    category: 'K1M',
    rank: 1,
    totalEntries: 42,
    time: '92.34',
    points: 1000,
    status: 'finished',
  },
  {
    id: '2',
    date: '2025-11-28',
    race: 'MČR ve slalomu',
    location: 'Lipno',
    category: 'K1M',
    rank: 1,
    totalEntries: 56,
    time: '94.12',
    points: 1000,
    status: 'finished',
  },
  {
    id: '3',
    date: '2025-10-15',
    race: 'Podzimní slalom',
    location: 'Brandýs nad Labem',
    category: 'K1M',
    rank: 2,
    totalEntries: 38,
    time: '91.56',
    points: 800,
    status: 'finished',
  },
  {
    id: '4',
    date: '2025-09-22',
    race: 'Český pohár #5',
    location: 'Trnávka',
    category: 'K1M',
    rank: 1,
    totalEntries: 45,
    time: '93.78',
    points: 1000,
    status: 'finished',
  },
  {
    id: '5',
    date: '2025-08-18',
    race: 'Letní sprint',
    location: 'Praha - Troja',
    category: 'K1M',
    rank: null,
    totalEntries: 52,
    status: 'dnf',
  },
  {
    id: '6',
    date: '2025-07-05',
    race: 'Český pohár #4',
    location: 'Roudnice',
    category: 'K1M',
    rank: 1,
    totalEntries: 48,
    time: '95.23',
    points: 1000,
    status: 'finished',
  },
];

const timelineEvents: TimelineItem[] = [
  {
    id: '1',
    title: 'Změna VT třídy',
    description: 'Povýšení na třídu M na základě výsledků sezóny 2025',
    timestamp: '2026-01-01',
    status: 'completed',
    icon: '🏆',
  },
  {
    id: '2',
    title: 'Obnova zdravotní prohlídky',
    description: 'Platnost prodloužena do 30.6.2026',
    timestamp: '2025-06-15',
    status: 'completed',
    icon: '🏥',
  },
  {
    id: '3',
    title: 'Zaplacení příspěvků 2025',
    description: 'Roční členský příspěvek uhrazen',
    timestamp: '2025-02-01',
    status: 'completed',
    icon: '💳',
  },
  {
    id: '4',
    title: 'Změna VT třídy',
    description: 'Povýšení na třídu A na základě výsledků sezóny 2024',
    timestamp: '2025-01-01',
    status: 'completed',
    icon: '📈',
  },
  {
    id: '5',
    title: 'Registrace v oddíle USK Praha',
    description: 'Přestup z TJ Bohemians Praha',
    timestamp: '2015-01-15',
    status: 'completed',
    icon: '🔄',
  },
  {
    id: '6',
    title: 'První registrace',
    description: 'Registrace v TJ Bohemians Praha, sekce Divoká voda',
    timestamp: '2008-03-15',
    status: 'completed',
    icon: '🎉',
  },
];

// Navigation items
const navItems = [
  { id: 'home', label: 'Domů', href: '#' },
  { id: 'calendar', label: 'Kalendář', href: '#' },
  { id: 'results', label: 'Výsledky', href: '#' },
  { id: 'athletes', label: 'Závodníci', href: '#', active: true },
  { id: 'clubs', label: 'Kluby', href: '#' },
];

// ============================================================================
// Icons
// ============================================================================

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

function MedalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
      <path d="M11 12 5.12 2.2" />
      <path d="m13 12 5.88-9.8" />
      <path d="M8 7h8" />
      <circle cx="12" cy="17" r="5" />
      <path d="M12 18v-2h-.5" />
    </svg>
  );
}

function RaceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22,4 12,14.01 9,11.01" />
    </svg>
  );
}

function AlertCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// Note: WaveDecoration removed for cleaner design (Phase 8.6.3)

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

function getDaysUntil(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// ============================================================================
// Profile Page Component
// ============================================================================

function ProfilePage({ isOwnProfile = false, section = 'dv' }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Select athlete data based on section
  const athlete = section === 'ry' ? ryAthleteData : section === 'vt' ? vtAthleteData : athleteData;

  const medicalDaysLeft = getDaysUntil(athlete.medicalExpiry);
  const medicalStatus = medicalDaysLeft > 30 ? 'valid' : medicalDaysLeft > 0 ? 'expiring' : 'expired';

  // Table columns for results
  const resultColumns: ColumnDef<AthleteResult>[] = [
    {
      key: 'date',
      header: 'Datum',
      cell: (row) => formatDate(row.date),
      sortable: true,
    },
    {
      key: 'race',
      header: 'Závod',
      cell: (row) => (
        <div className="profile-result-race">
          <span className="profile-result-race-name">{row.race}</span>
          <span className="profile-result-race-location">{row.location}</span>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Kategorie',
      cell: (row) => <Badge outlined>{row.category}</Badge>,
    },
    {
      key: 'rank',
      header: 'Umístění',
      cell: (row) => {
        if (row.status === 'dnf') return <Badge variant="warning">DNF</Badge>;
        if (row.status === 'dsq') return <Badge variant="error">DSQ</Badge>;
        if (!row.rank) return '-';

        const rankClass = row.rank === 1 ? 'gold' : row.rank === 2 ? 'silver' : row.rank === 3 ? 'bronze' : '';
        return (
          <span className={`profile-result-rank ${rankClass ? `profile-result-rank--${rankClass}` : ''}`}>
            {row.rank}. / {row.totalEntries}
          </span>
        );
      },
      sortable: true,
    },
    {
      key: 'time',
      header: 'Čas',
      cell: (row) => row.time || '-',
    },
    {
      key: 'points',
      header: 'Body',
      cell: (row) => row.points ? <strong>{row.points}</strong> : '-',
      sortable: true,
    },
  ];

  return (
    <div className="profile-page">
      {/* Header */}
      <Header
        brand={<span className="profile-header-logo">CSK</span>}
        navigation={<MainNav items={navItems} />}
        userMenu={
          <Button variant="ghost" size="sm">Přihlásit se</Button>
        }
        bordered
      />

      {/* Hero Section */}
      <section className={`profile-hero-section profile-hero-section--${section}`}>
        <div className="profile-hero-section__background">
          <div className="profile-hero-section__gradient" />
          <div className="profile-hero-section__pattern" />
        </div>
        <div className="profile-hero-section__content">
          {/* Breadcrumb */}
          <nav className="profile-breadcrumb">
            <a href="#" className="profile-breadcrumb__link">Domů</a>
            <ChevronRightIcon />
            <a href="#" className="profile-breadcrumb__link">Závodníci</a>
            <ChevronRightIcon />
            <span className="profile-breadcrumb__current">{athlete.name}</span>
          </nav>

          {/* Hero Content */}
          <div className="profile-hero-content">
            {/* Avatar */}
            <div className="profile-hero-avatar">
              <Avatar
                name={athlete.name}
                src={athlete.imageUrl}
                size="xl"
              />
              {athlete.ranking <= 3 && (
                <div className={`profile-hero-ranking profile-hero-ranking--${athlete.ranking}`}>
                  #{athlete.ranking}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="profile-hero-info">
              <div className="profile-hero-name-row">
                <h1 className="profile-hero-name">{athlete.name}</h1>
                <span className="profile-hero-country">{athlete.country}</span>
              </div>
              <div className="profile-hero-badges">
                <Badge section={section} size="lg" glow>
                  {getSectionName(section)}
                </Badge>
                <Badge vtClass={athlete.vtClass} size="lg">
                  {getVtClassName(athlete.vtClass)}
                </Badge>
                <Badge outlined size="lg">{athlete.vtPoints} bodů</Badge>
              </div>
              <div className="profile-hero-meta">
                <div className="profile-hero-meta-item">
                  <span className="profile-hero-meta-label">Klub</span>
                  <span className="profile-hero-meta-value">{athlete.club}</span>
                </div>
                <div className="profile-hero-meta-item">
                  <span className="profile-hero-meta-label">Ročník</span>
                  <span className="profile-hero-meta-value">*{athlete.birthYear}</span>
                </div>
                <div className="profile-hero-meta-item">
                  <span className="profile-hero-meta-label">Registrace</span>
                  <span className="profile-hero-meta-value">{athlete.licenseNumber}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="profile-hero-actions">
              {isOwnProfile && (
                <Button variant="secondary" size="sm">
                  <EditIcon /> Upravit profil
                </Button>
              )}
              <Button variant="ghost" size="sm">
                <DownloadIcon /> Export
              </Button>
            </div>
          </div>

          {/* Achievement Showcase */}
          <div className="profile-achievements">
            <div className="profile-achievement profile-achievement--gold">
              <div className="profile-achievement__icon">
                <TrophyIcon />
              </div>
              <div className="profile-achievement__content">
                <span className="profile-achievement__value">{athlete.wins}</span>
                <span className="profile-achievement__label">Vítězství</span>
              </div>
            </div>
            <div className="profile-achievement profile-achievement--silver">
              <div className="profile-achievement__icon">
                <MedalIcon />
              </div>
              <div className="profile-achievement__content">
                <span className="profile-achievement__value">{athlete.podiums}</span>
                <span className="profile-achievement__label">Pódia</span>
              </div>
            </div>
            <div className="profile-achievement profile-achievement--bronze">
              <div className="profile-achievement__icon">
                <RaceIcon />
              </div>
              <div className="profile-achievement__content">
                <span className="profile-achievement__value">{athlete.totalRaces}</span>
                <span className="profile-achievement__label">Závodů</span>
              </div>
            </div>
            <div className="profile-achievement profile-achievement--rank">
              <div className="profile-achievement__icon">
                <StarIcon />
              </div>
              <div className="profile-achievement__content">
                <span className="profile-achievement__value">#{athlete.ranking}</span>
                <span className="profile-achievement__label">Žebříček</span>
              </div>
            </div>
          </div>
        </div>
        {/* Note: WaveDecoration removed for cleaner design (Phase 8.6.3) */}
      </section>

      {/* Main Content */}
      <main className="profile-main">
        <div className="profile-container">
          {/* Status Cards */}
          <div className="profile-status-grid">
            <Card className={`profile-status-card profile-status-card--${athlete.rightToStart ? 'valid' : 'invalid'}`}>
              <div className="profile-status-icon">
                {athlete.rightToStart ? <CheckCircleIcon /> : <AlertCircleIcon />}
              </div>
              <div className="profile-status-content">
                <h3 className="profile-status-title">Právo startu</h3>
                <p className="profile-status-value">
                  {athlete.rightToStart ? 'Aktivní' : 'Neaktivní'}
                </p>
              </div>
            </Card>

            <Card className={`profile-status-card profile-status-card--${medicalStatus}`}>
              <div className="profile-status-icon">
                {medicalStatus === 'valid' ? <CheckCircleIcon /> : <AlertCircleIcon />}
              </div>
              <div className="profile-status-content">
                <h3 className="profile-status-title">Zdravotní prohlídka</h3>
                <p className="profile-status-value">
                  {medicalStatus === 'expired'
                    ? 'Vypršela'
                    : `Platná do ${formatDate(athlete.medicalExpiry)}`}
                </p>
                {medicalStatus === 'expiring' && (
                  <p className="profile-status-warning">Zbývá {medicalDaysLeft} dní</p>
                )}
              </div>
            </Card>

            <Card className={`profile-status-card profile-status-card--${athlete.feesStatus === 'paid' ? 'valid' : 'invalid'}`}>
              <div className="profile-status-icon">
                {athlete.feesStatus === 'paid' ? <CheckCircleIcon /> : <AlertCircleIcon />}
              </div>
              <div className="profile-status-content">
                <h3 className="profile-status-title">Příspěvky 2026</h3>
                <p className="profile-status-value">
                  {athlete.feesStatus === 'paid'
                    ? 'Zaplaceno'
                    : athlete.feesStatus === 'pending'
                      ? 'Čeká na platbu'
                      : 'Nezaplaceno'}
                </p>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs
            tabs={[
              { id: 'overview', label: 'Přehled', content: null },
              { id: 'results', label: 'Výsledky', content: null },
              { id: 'history', label: 'Historie', content: null },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="gradient"
          />

          {/* Tab Content */}
          <div className="profile-tab-content">
            {activeTab === 'overview' && (
              <div className="profile-overview">
                {/* Stats Grid */}
                <div className="profile-stats-grid">
                  <StatCard
                    label="Celkem závodů"
                    value={athlete.totalRaces}
                    icon={<RaceIcon />}
                    trend="up"
                    trendValue="+12 tento rok"
                    styleVariant="gradient"
                  />
                  <StatCard
                    label="Vítězství"
                    value={athlete.wins}
                    icon={<TrophyIcon />}
                    trend="up"
                    trendValue="+4 tento rok"
                    styleVariant="gradient"
                  />
                  <StatCard
                    label="Pódia"
                    value={athlete.podiums}
                    icon={<MedalIcon />}
                    description={`${Math.round((athlete.podiums / athlete.totalRaces) * 100)}% úspěšnost`}
                    styleVariant="gradient"
                  />
                  <StatCard
                    label="Žebříček"
                    value={`#${athlete.ranking}`}
                    icon={<ChartIcon />}
                    description={`Nejlepší: #${athlete.bestRanking}`}
                    styleVariant="gradient"
                  />
                </div>

                {/* Recent Results */}
                <Card>
                  <div className="profile-section-header">
                    <h2 className="profile-section-title">Poslední výsledky</h2>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab('results')}>
                      Zobrazit vše
                    </Button>
                  </div>
                  <Table
                    columns={resultColumns}
                    data={recentResults.slice(0, 5)}
                    rowKey="id"
                  />
                </Card>

                {/* Season Progress */}
                <Card>
                  <h2 className="profile-section-title">Sezóna 2026</h2>
                  <div className="profile-season-stats">
                    <div className="profile-season-stat">
                      <span className="profile-season-label">Odjetých závodů</span>
                      <div className="profile-season-progress">
                        <Progress value={25} max={100} />
                        <span className="profile-season-value">3 / 12 plánovaných</span>
                      </div>
                    </div>
                    <div className="profile-season-stat">
                      <span className="profile-season-label">Průměrné umístění</span>
                      <span className="profile-season-big-value">1.3</span>
                    </div>
                    <div className="profile-season-stat">
                      <span className="profile-season-label">Celkové body</span>
                      <span className="profile-season-big-value">2 800</span>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'results' && (
              <Card>
                <div className="profile-section-header">
                  <h2 className="profile-section-title">Všechny výsledky</h2>
                  <Button variant="ghost" size="sm">
                    <DownloadIcon /> Export CSV
                  </Button>
                </div>
                <Table
                  columns={resultColumns}
                  data={recentResults}
                  rowKey="id"
                />
              </Card>
            )}

            {activeTab === 'history' && (
              <Card>
                <h2 className="profile-section-title">Historie závodníka</h2>
                <p className="profile-section-description">
                  Přehled důležitých událostí od registrace po současnost
                </p>
                <Timeline items={timelineEvents} />
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="profile-footer">
        <div className="profile-container">
          <p>&copy; 2026 Český svaz kanoistů. Design System Prototype.</p>
        </div>
      </footer>
    </div>
  );
}

// ============================================================================
// Stories
// ============================================================================

const meta: Meta<typeof ProfilePage> = {
  title: 'Prototypes/ProfilePage',
  component: ProfilePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Profil závodníka

Prototyp stránky profilu závodníka s hero sekcí, achievement showcase a disciplínovým themingem.

## Hlavní sekce
1. **Hero sekce** - gradient pozadí s fotkou, statistiky, badges
2. **Achievement showcase** - medaile a klíčové statistiky
3. **Status karty** - právo startu, zdravotní prohlídka, příspěvky
4. **Záložky** - Přehled, Výsledky, Historie

## Přehled (Overview)
- StatCardy s gradient stylem
- Tabulka posledních výsledků
- Průběh sezóny

## Výsledky
- Kompletní tabulka výsledků s řazením
- Export do CSV

## Historie
- Timeline životního cyklu závodníka
- Registrace, přestupy, změny VT třídy

## Discipline Theming
- DV (Divoká voda) - modrá
- RY (Rychlostní kanoistika) - zelená
- VT (Vodní turistika) - červená

## Use Cases (z business analýzy)
- UC-1.1: Registrace nového člena
- UC-1.2: Splnění práva startu
- UC-1.5: Obnova zdravotní prohlídky
- UC-1.8: Aktualizace výkonnostní třídy
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProfilePage>;

export const Default: Story = {
  args: {
    isOwnProfile: false,
    isAdmin: false,
    section: 'dv',
  },
};

export const OwnProfile: Story = {
  args: {
    isOwnProfile: true,
    isAdmin: false,
    section: 'dv',
  },
  parameters: {
    docs: {
      description: {
        story: 'Vlastní profil závodníka s možností úprav.',
      },
    },
  },
};

export const Rychlostni: Story = {
  args: {
    isOwnProfile: false,
    isAdmin: false,
    section: 'ry',
  },
  parameters: {
    docs: {
      description: {
        story: 'Profil závodníka sekce Rychlostní kanoistika se zeleným themingem.',
      },
    },
  },
};

export const VodniTuristika: Story = {
  args: {
    isOwnProfile: false,
    isAdmin: false,
    section: 'vt',
  },
  parameters: {
    docs: {
      description: {
        story: 'Profil závodníka sekce Vodní turistika s červeným themingem.',
      },
    },
  },
};

export const AdminView: Story = {
  args: {
    isOwnProfile: false,
    isAdmin: true,
    section: 'dv',
  },
  parameters: {
    docs: {
      description: {
        story: 'Administrátorský pohled s rozšířenými možnostmi.',
      },
    },
  },
};
