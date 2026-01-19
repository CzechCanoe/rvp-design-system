import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { Header } from '../components/Header';
import { MainNav } from '../components/Navigation';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Tabs } from '../components/Tabs';
import { Switch } from '../components/Switch';
import { LiveIndicator } from '../components/LiveIndicator';
import { ResultsTable, type ResultEntry } from '../components/ResultsTable';
import './LivePage.css';

// ============================================================================
// Types
// ============================================================================

interface LivePageProps {
  /** Initial category filter */
  initialCategory?: string;
  /** Simulate live updates */
  simulateLive?: boolean;
  /** Update interval in milliseconds */
  updateInterval?: number;
}

interface FeedItem {
  id: number;
  type: 'finish' | 'start' | 'penalty' | 'dsq' | 'leader';
  timestamp: Date;
  athleteName: string;
  content: string;
  result?: string;
  isNew?: boolean;
}

interface CurrentRun {
  bib: number;
  name: string;
  club: string;
  category: string;
  startTime: number;
  splits: {
    label: string;
    time?: number;
    diff?: number;
  }[];
}

// ============================================================================
// Sample Data
// ============================================================================

const generateLiveResults = (category: string): ResultEntry[] => {
  const baseResults: Record<string, ResultEntry[]> = {
    'K1M': [
      { id: 1, rank: 1, name: 'Jiří Prskavec', club: 'USK Praha', category: 'K1M', totalTime: 92.34, timeDiff: 0, section: 'dv', status: 'final' },
      { id: 2, rank: 2, name: 'Vít Přindiš', club: 'USK Praha', category: 'K1M', totalTime: 93.87, timeDiff: 1.53, section: 'dv', status: 'final' },
      { id: 3, rank: 3, name: 'Jakub Krejčí', club: 'Dukla Praha', category: 'K1M', totalTime: 94.21, timeDiff: 1.87, section: 'dv', status: 'final' },
      { id: 4, rank: 4, name: 'Vavřinec Hradilek', club: 'Dukla Praha', category: 'K1M', totalTime: 95.45, timeDiff: 3.11, section: 'dv', status: 'final' },
      { id: 5, rank: 5, name: 'Ondřej Tunka', club: 'SK Trnávka', category: 'K1M', totalTime: 96.12, timeDiff: 3.78, section: 'dv', status: 'final' },
      { id: 6, rank: 6, name: 'Filip Roháč', club: 'Bohemians Praha', category: 'K1M', totalTime: 97.34, timeDiff: 5.00, section: 'dv', status: 'final' },
      { id: 7, rank: 7, name: 'Martin Sládek', club: 'KK Roudnice', category: 'K1M', totalTime: 98.56, timeDiff: 6.22, section: 'dv', status: 'final' },
      { id: 8, rank: 8, name: 'Tomáš Ježek', club: 'SK Hradec Králové', category: 'K1M', totalTime: 99.23, timeDiff: 6.89, section: 'dv', status: 'final' },
    ],
    'K1W': [
      { id: 101, rank: 1, name: 'Tereza Fišerová', club: 'Dukla Praha', category: 'K1W', totalTime: 98.45, timeDiff: 0, section: 'dv', status: 'final' },
      { id: 102, rank: 2, name: 'Kateřina Minařík Kudějová', club: 'USK Praha', category: 'K1W', totalTime: 99.23, timeDiff: 0.78, section: 'dv', status: 'final' },
      { id: 103, rank: 3, name: 'Antonie Galušková', club: 'Dukla Praha', category: 'K1W', totalTime: 100.56, timeDiff: 2.11, section: 'dv', status: 'final' },
      { id: 104, rank: 4, name: 'Veronika Vojtová', club: 'USK Praha', category: 'K1W', totalTime: 101.34, timeDiff: 2.89, section: 'dv', status: 'final' },
    ],
    'C1M': [
      { id: 201, rank: 1, name: 'Lukáš Rohan', club: 'USK Praha', category: 'C1M', totalTime: 96.78, timeDiff: 0, section: 'dv', status: 'final' },
      { id: 202, rank: 2, name: 'Jan Masopust', club: 'Dukla Praha', category: 'C1M', totalTime: 97.45, timeDiff: 0.67, section: 'dv', status: 'final' },
      { id: 203, rank: 3, name: 'Vojtěch Heger', club: 'Dukla Praha', category: 'C1M', totalTime: 98.23, timeDiff: 1.45, section: 'dv', status: 'final' },
    ],
    'C1W': [
      { id: 301, rank: 1, name: 'Gabriela Satková', club: 'USK Praha', category: 'C1W', totalTime: 104.23, timeDiff: 0, section: 'dv', status: 'final' },
      { id: 302, rank: 2, name: 'Martina Satkova', club: 'Dukla Praha', category: 'C1W', totalTime: 105.67, timeDiff: 1.44, section: 'dv', status: 'final' },
    ],
  };

  return baseResults[category] || [];
};

const categories = [
  { id: 'K1M', name: 'K1 Muži', count: 24, finished: 8 },
  { id: 'K1W', name: 'K1 Ženy', count: 16, finished: 4 },
  { id: 'C1M', name: 'C1 Muži', count: 18, finished: 3 },
  { id: 'C1W', name: 'C1 Ženy', count: 12, finished: 2 },
];

const nextAthletes = [
  { bib: 15, name: 'Jan Horák', club: 'KK Brandýs' },
  { bib: 16, name: 'Lukáš Dvořák', club: 'SK Trnávka' },
  { bib: 17, name: 'Marek Procházka', club: 'Bohemians Praha' },
];

const initialFeedItems: FeedItem[] = [
  { id: 1, type: 'finish', timestamp: new Date(Date.now() - 30000), athleteName: 'Tomáš Ježek', content: 'dokončil jízdu', result: '1:39.23 (+6.89)' },
  { id: 2, type: 'penalty', timestamp: new Date(Date.now() - 45000), athleteName: 'Tomáš Ježek', content: 'penalizace 2s na bráně 18', result: undefined },
  { id: 3, type: 'start', timestamp: new Date(Date.now() - 60000), athleteName: 'Tomáš Ježek', content: 'odstartoval', result: undefined },
  { id: 4, type: 'finish', timestamp: new Date(Date.now() - 120000), athleteName: 'Martin Sládek', content: 'dokončil jízdu', result: '1:38.56 (+6.22)' },
  { id: 5, type: 'leader', timestamp: new Date(Date.now() - 180000), athleteName: 'Jiří Prskavec', content: 'nový nejlepší čas!', result: '1:32.34' },
  { id: 6, type: 'finish', timestamp: new Date(Date.now() - 240000), athleteName: 'Filip Roháč', content: 'dokončil jízdu', result: '1:37.34 (+5.00)' },
  { id: 7, type: 'dsq', timestamp: new Date(Date.now() - 300000), athleteName: 'Štěpán Král', content: 'diskvalifikován - vynechaná branka 12', result: undefined },
];

// Navigation items
const navItems = [
  { id: 'home', label: 'Domů', href: '#' },
  { id: 'calendar', label: 'Kalendář', href: '#' },
  { id: 'results', label: 'Výsledky', href: '#' },
  { id: 'live', label: 'LIVE', href: '#', active: true },
  { id: 'athletes', label: 'Závodníci', href: '#' },
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

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const ActivityIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

// ============================================================================
// Helper Functions
// ============================================================================

function formatTime(seconds: number | undefined): string {
  if (seconds === undefined || seconds === null) return '-';
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toFixed(2).padStart(5, '0')}`;
}

function formatRunningTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const hundredths = Math.floor((seconds % 1) * 100);
  return `${minutes}:${secs.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
}

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);

  if (diffSecs < 60) return 'právě teď';
  if (diffSecs < 3600) return `před ${Math.floor(diffSecs / 60)} min`;
  return date.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// ============================================================================
// Page Component
// ============================================================================

const LivePage = ({
  initialCategory = 'K1M',
  simulateLive = true,
  updateInterval = 3000,
}: LivePageProps) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [feedItems, setFeedItems] = useState<FeedItem[]>(initialFeedItems);
  const [runningTime, setRunningTime] = useState(45.67);

  // Current run data
  const currentRun: CurrentRun = {
    bib: 14,
    name: 'David Novák',
    club: 'USK Praha',
    category: 'K1M',
    startTime: Date.now() - 45670,
    splits: [
      { label: 'Split 1', time: 15.23, diff: -0.34 },
      { label: 'Split 2', time: 31.45, diff: 0.12 },
      { label: 'Split 3', time: undefined },
      { label: 'Cíl', time: undefined },
    ],
  };

  // Simulate running timer
  useEffect(() => {
    if (!simulateLive || !autoUpdate) return;

    const timer = setInterval(() => {
      setRunningTime((prev) => prev + 0.01);
    }, 10);

    return () => clearInterval(timer);
  }, [simulateLive, autoUpdate]);

  // Simulate live feed updates
  const addFeedItem = useCallback(() => {
    const types: FeedItem['type'][] = ['finish', 'start', 'penalty'];
    const athletes = ['Jan Horák', 'Lukáš Dvořák', 'Marek Procházka', 'Štěpán Veselý'];
    const type = types[Math.floor(Math.random() * types.length)];
    const athlete = athletes[Math.floor(Math.random() * athletes.length)];

    let content = '';
    let result: string | undefined;

    switch (type) {
      case 'finish':
        content = 'dokončil jízdu';
        result = `1:${(35 + Math.random() * 10).toFixed(2)} (+${(Math.random() * 8).toFixed(2)})`;
        break;
      case 'start':
        content = 'odstartoval';
        break;
      case 'penalty':
        content = `penalizace 2s na bráně ${Math.floor(Math.random() * 20) + 1}`;
        break;
    }

    const newItem: FeedItem = {
      id: Date.now(),
      type,
      timestamp: new Date(),
      athleteName: athlete,
      content,
      result,
      isNew: true,
    };

    setFeedItems((prev) => [newItem, ...prev.slice(0, 19)]);

    // Remove "new" flag after animation
    setTimeout(() => {
      setFeedItems((prev) =>
        prev.map((item) =>
          item.id === newItem.id ? { ...item, isNew: false } : item
        )
      );
    }, 2000);
  }, []);

  useEffect(() => {
    if (!simulateLive || !autoUpdate) return;

    const interval = setInterval(addFeedItem, updateInterval);
    return () => clearInterval(interval);
  }, [simulateLive, autoUpdate, updateInterval, addFeedItem]);

  // Get results for selected category
  const results = useMemo(() => {
    let data = generateLiveResults(selectedCategory);

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

  // Category tabs
  const categoryTabs = categories.map((cat) => ({
    id: cat.id,
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {cat.name}
        <Badge variant="default" size="sm">
          {cat.finished}/{cat.count}
        </Badge>
      </span>
    ),
    content: null,
  }));

  // Calculate progress
  const currentCat = categories.find((c) => c.id === selectedCategory);
  const progress = currentCat ? (currentCat.finished / currentCat.count) * 100 : 0;

  return (
    <div className="prototype-live-page">
      {/* Header */}
      <Header
        variant="default"
        size="md"
        bordered
        brand={
          <a href="#" className="prototype-live-page__logo">
            <span className="prototype-live-page__logo-text">CSK</span>
            <span className="prototype-live-page__logo-subtitle">Český svaz kanoistů</span>
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
            iconLeft={<SearchIcon />}
          />
        }
        userMenu={
          <Button variant="primary" size="sm">
            Přihlásit se
          </Button>
        }
      />

      {/* Main content */}
      <main className="prototype-live-page__main">
        <div className="prototype-live-page__container">
          {/* Race Header */}
          <div className="prototype-live-page__race-header">
            <div className="prototype-live-page__breadcrumb">
              <a href="#">Výsledky</a>
              <span className="prototype-live-page__breadcrumb-separator">/</span>
              <a href="#">2026</a>
              <span className="prototype-live-page__breadcrumb-separator">/</span>
              <span>MČR ve slalomu</span>
            </div>

            <h1 className="prototype-live-page__title">
              MČR ve slalomu 2026
              <LiveIndicator variant="live" size="lg" label="LIVE" glow />
            </h1>

            <div className="prototype-live-page__subtitle">
              <span className="prototype-live-page__info-item">
                <CalendarIcon />
                3. května 2026 • 14:32
              </span>
              <span className="prototype-live-page__info-item">
                <LocationIcon />
                Praha – Troja
              </span>
              <span className="prototype-live-page__info-item">
                <UsersIcon />
                70 závodníků
              </span>
              <Badge section="dv">Divoká voda</Badge>
            </div>
          </div>

          {/* Content - Three Column Layout */}
          <div className="prototype-live-page__content">
            {/* Left Sidebar - Current Run */}
            <div className="prototype-live-page__current-run">
              {/* Current Athlete Card */}
              <Card variant="elevated" className="prototype-live-page__current-card">
                <div className="prototype-live-page__current-header">
                  <h3 className="prototype-live-page__current-title">
                    Na trati
                  </h3>
                  <LiveIndicator variant="live" size="sm" />
                </div>

                <div className="prototype-live-page__current-athlete">
                  <div className="prototype-live-page__current-avatar">
                    {getInitials(currentRun.name)}
                  </div>
                  <h4 className="prototype-live-page__current-name">{currentRun.name}</h4>
                  <p className="prototype-live-page__current-club">{currentRun.club}</p>
                  <p className="prototype-live-page__current-bib">#{currentRun.bib} • {currentRun.category}</p>
                </div>

                <div className="prototype-live-page__current-timer">
                  <div className="prototype-live-page__current-timer-label">Aktuální čas</div>
                  <div className={`prototype-live-page__current-timer-value ${autoUpdate ? 'prototype-live-page__current-timer-value--running' : ''}`}>
                    {formatRunningTime(runningTime)}
                  </div>
                </div>

                <div className="prototype-live-page__current-splits">
                  {currentRun.splits.map((split, index) => (
                    <div key={index} className="prototype-live-page__split">
                      <div className="prototype-live-page__split-label">{split.label}</div>
                      <div className={`prototype-live-page__split-value ${split.time === undefined ? 'prototype-live-page__split-value--pending' : ''}`}>
                        {split.time !== undefined ? formatTime(split.time) : '—'}
                      </div>
                      {split.diff !== undefined && (
                        <div className={`prototype-live-page__split-diff ${split.diff < 0 ? 'prototype-live-page__split-diff--faster' : 'prototype-live-page__split-diff--slower'}`}>
                          {split.diff < 0 ? '' : '+'}{split.diff.toFixed(2)}s
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Next Up Card */}
              <Card variant="surface" className="prototype-live-page__next-card">
                <h3 className="prototype-live-page__next-title">Další na startu</h3>
                <div className="prototype-live-page__next-list">
                  {nextAthletes.map((athlete, index) => (
                    <div key={athlete.bib} className="prototype-live-page__next-item">
                      <div className="prototype-live-page__next-number">{index + 1}</div>
                      <div className="prototype-live-page__next-info">
                        <p className="prototype-live-page__next-name">#{athlete.bib} {athlete.name}</p>
                        <p className="prototype-live-page__next-club">{athlete.club}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Center - Results */}
            <div className="prototype-live-page__results">
              {/* Category Tabs */}
              <div className="prototype-live-page__filters">
                <div className="prototype-live-page__filters-left">
                  <Tabs
                    tabs={categoryTabs}
                    activeTab={selectedCategory}
                    onChange={(id) => setSelectedCategory(id)}
                    variant="pills"
                    size="sm"
                  />
                </div>
                <div className="prototype-live-page__filters-right">
                  <Input
                    type="search"
                    placeholder="Hledat závodníka..."
                    size="sm"
                    iconLeft={<SearchIcon />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    clearable
                    onClear={() => setSearchQuery('')}
                    style={{ width: '200px' }}
                  />
                </div>
              </div>

              {/* Results Header */}
              <div className="prototype-live-page__results-header">
                <h2 className="prototype-live-page__results-title">
                  Průběžné výsledky
                  <span className="prototype-live-page__results-count">
                    ({results.length} závodníků)
                  </span>
                </h2>
                <div className="prototype-live-page__results-actions">
                  <div className="prototype-live-page__auto-update">
                    <Switch
                      checked={autoUpdate}
                      onChange={(e) => setAutoUpdate(e.target.checked)}
                      size="sm"
                    />
                    <span>Auto-refresh</span>
                  </div>
                  <Button variant="ghost" size="sm" iconLeft={<RefreshIcon />}>
                    Obnovit
                  </Button>
                </div>
              </div>

              {/* Results Table */}
              <ResultsTable
                results={results}
                variant="striped"
                size="md"
                showRuns={false}
                showTimeDiff={true}
                showClub={true}
                showPodiumHighlights={true}
                showLiveIndicator={true}
                stickyHeader
                onRowClick={(entry) => console.log('Row clicked:', entry)}
              />
            </div>

            {/* Right Sidebar - Activity Feed */}
            <aside className="prototype-live-page__sidebar">
              {/* Activity Feed */}
              <Card variant="surface" className="prototype-live-page__feed-card">
                <div className="prototype-live-page__feed-header">
                  <h3 className="prototype-live-page__feed-title">
                    <ActivityIcon />
                    Průběh závodu
                    <span className="prototype-live-page__feed-count">
                      ({feedItems.length})
                    </span>
                  </h3>
                </div>
                <div className="prototype-live-page__feed-list">
                  {feedItems.map((item) => (
                    <div
                      key={item.id}
                      className={`prototype-live-page__feed-item ${item.isNew ? 'prototype-live-page__feed-item--new' : ''}`}
                    >
                      <div className="prototype-live-page__feed-item-header">
                        <span className={`prototype-live-page__feed-item-type prototype-live-page__feed-item-type--${item.type}`}>
                          {item.type === 'finish' && 'Cíl'}
                          {item.type === 'start' && 'Start'}
                          {item.type === 'penalty' && 'Penalizace'}
                          {item.type === 'dsq' && 'DSQ'}
                          {item.type === 'leader' && 'Nový leader'}
                        </span>
                        <span className="prototype-live-page__feed-item-time">
                          {formatTimestamp(item.timestamp)}
                        </span>
                      </div>
                      <div className="prototype-live-page__feed-item-content">
                        <strong>{item.athleteName}</strong> {item.content}
                      </div>
                      {item.result && (
                        <div className="prototype-live-page__feed-item-result">
                          {item.result}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Race Progress */}
              <Card variant="surface" className="prototype-live-page__progress-card">
                <h3 className="prototype-live-page__progress-title">Průběh kategorie</h3>
                <div className="prototype-live-page__progress-stats">
                  <div className="prototype-live-page__progress-stat">
                    <div className="prototype-live-page__progress-stat-value">
                      {currentCat?.finished || 0}
                    </div>
                    <div className="prototype-live-page__progress-stat-label">Dokončeno</div>
                  </div>
                  <div className="prototype-live-page__progress-stat">
                    <div className="prototype-live-page__progress-stat-value">
                      {(currentCat?.count || 0) - (currentCat?.finished || 0)}
                    </div>
                    <div className="prototype-live-page__progress-stat-label">Zbývá</div>
                  </div>
                </div>
                <div className="prototype-live-page__progress-bar-container">
                  <div className="prototype-live-page__progress-bar">
                    <div
                      className="prototype-live-page__progress-bar-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <div className="prototype-live-page__progress-text">
                  {progress.toFixed(0)}% dokončeno
                </div>
              </Card>

              {/* Race Info */}
              <Card variant="surface" className="prototype-live-page__race-info">
                <h3 className="prototype-live-page__race-info-title">Informace o závodě</h3>
                <div className="prototype-live-page__race-info-list">
                  <div className="prototype-live-page__race-info-item">
                    <span className="prototype-live-page__race-info-label">Organizátor</span>
                    <span className="prototype-live-page__race-info-value">USK Praha</span>
                  </div>
                  <div className="prototype-live-page__race-info-item">
                    <span className="prototype-live-page__race-info-label">Délka tratě</span>
                    <span className="prototype-live-page__race-info-value">300 m</span>
                  </div>
                  <div className="prototype-live-page__race-info-item">
                    <span className="prototype-live-page__race-info-label">Počet branek</span>
                    <span className="prototype-live-page__race-info-value">24</span>
                  </div>
                  <div className="prototype-live-page__race-info-item">
                    <span className="prototype-live-page__race-info-label">Stav</span>
                    <span className="prototype-live-page__race-info-value">
                      <Badge variant="warning" size="sm">Probíhá</Badge>
                    </span>
                  </div>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="prototype-live-page__footer">
        <div className="prototype-live-page__footer-content">
          <p>© 2026 Český svaz kanoistů. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
};

// ============================================================================
// Storybook Meta
// ============================================================================

const meta = {
  title: 'Prototypes/Live Page',
  component: LivePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Prototyp stránky živých výsledků CSK. Zobrazuje aktuálně probíhající závod s real-time aktualizacemi, živým feedem událostí a aktuálním závodníkem na trati.',
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
    simulateLive: {
      control: 'boolean',
      description: 'Simulate live updates',
    },
    updateInterval: {
      control: { type: 'range', min: 1000, max: 10000, step: 500 },
      description: 'Update interval in milliseconds',
    },
  },
} satisfies Meta<typeof LivePage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Výchozí zobrazení živých výsledků s automatickými aktualizacemi.
 */
export const Default: Story = {
  args: {
    initialCategory: 'K1M',
    simulateLive: true,
    updateInterval: 3000,
  },
};

/**
 * Živé výsledky bez simulace - statický pohled.
 */
export const Static: Story = {
  args: {
    initialCategory: 'K1M',
    simulateLive: false,
    updateInterval: 3000,
  },
};

/**
 * Živé výsledky kategorie K1 Ženy.
 */
export const K1Zeny: Story = {
  args: {
    initialCategory: 'K1W',
    simulateLive: true,
    updateInterval: 3000,
  },
};

/**
 * Rychlé aktualizace (1s interval).
 */
export const FastUpdates: Story = {
  args: {
    initialCategory: 'K1M',
    simulateLive: true,
    updateInterval: 1000,
  },
};

/**
 * Pomalé aktualizace (5s interval).
 */
export const SlowUpdates: Story = {
  args: {
    initialCategory: 'K1M',
    simulateLive: true,
    updateInterval: 5000,
  },
};
