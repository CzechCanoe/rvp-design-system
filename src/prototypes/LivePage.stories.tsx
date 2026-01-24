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
import { KanoeCzContext } from '../components/KanoeCzContext';
import './LivePage.css';

// ============================================================================
// Types
// ============================================================================

/** Display variant for the page */
type LivePageVariant = 'standalone' | 'satellite' | 'embed';

interface LivePageProps {
  /** Initial category filter */
  initialCategory?: string;
  /** Simulate live updates */
  simulateLive?: boolean;
  /** Update interval in milliseconds */
  updateInterval?: number;
  /** Discipline section for theming */
  section?: 'dv' | 'ry' | 'vt';
  /** Display variant - standalone (full), satellite (minimal header), embed (no chrome) */
  variant?: LivePageVariant;
  /** Enable fullscreen mode toggle (primarily for mobile) */
  enableFullscreen?: boolean;
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

/** Gate penalty detail for run detail modal */
interface GatePenalty {
  gateNumber: number;
  /** Penalty type: 2s touch, 50s miss, etc. */
  penalty: 0 | 2 | 50;
  /** Gate direction: up or down */
  direction: 'up' | 'down';
  /** Gate color */
  color: 'green' | 'red';
  /** Split time at this gate (cumulative) */
  splitTime?: number;
  /** Diff to leader at this gate */
  diff?: number;
}

/** Run detail for the modal */
interface RunDetail {
  runNumber: 1 | 2;
  /** Raw time without penalties */
  rawTime: number;
  /** Total penalty seconds */
  totalPenalty: number;
  /** Final time (raw + penalty) */
  finalTime: number;
  /** Status */
  status: 'finished' | 'live' | 'dns' | 'dnf' | 'dsq';
  /** Gate penalties */
  gates: GatePenalty[];
  /** Rank in this run */
  runRank?: number;
  /** Diff to leader in this run */
  runDiff?: number;
}

/** Athlete detail for the modal */
interface AthleteRunDetail {
  id: number;
  name: string;
  club: string;
  category: string;
  bib: number;
  country?: string;
  /** Run 1 detail */
  run1?: RunDetail;
  /** Run 2 detail */
  run2?: RunDetail;
  /** Overall rank */
  overallRank?: number;
  /** Overall time diff */
  overallDiff?: number;
}

/** Athlete currently on course */
interface OncourseAthlete {
  bib: number;
  name: string;
  club: string;
  category: string;
  /** Current running time in seconds */
  runningTime: number;
  /** Position on course: 'start' | 'split1' | 'split2' | 'split3' | 'finish-zone' */
  position: 'start' | 'split1' | 'split2' | 'split3' | 'finish-zone';
  /** Last split time if available */
  lastSplit?: { time: number; diff?: number };
  /** Is this the featured athlete (expanded view) */
  featured?: boolean;
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

/** Initial oncourse athletes - multiple athletes on course simultaneously */
const initialOncourseAthletes: OncourseAthlete[] = [
  {
    bib: 14,
    name: 'David Novák',
    club: 'USK Praha',
    category: 'K1M',
    runningTime: 45.67,
    position: 'split2',
    lastSplit: { time: 31.45, diff: 0.12 },
    featured: true,
  },
  {
    bib: 13,
    name: 'Petr Svoboda',
    club: 'Dukla Praha',
    category: 'K1M',
    runningTime: 78.34,
    position: 'finish-zone',
    lastSplit: { time: 68.92, diff: -0.87 },
  },
  {
    bib: 12,
    name: 'Martin Dvořák',
    club: 'SK Trnávka',
    category: 'K1M',
    runningTime: 12.45,
    position: 'start',
  },
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

/** Generate sample gate data for a run */
const generateGateData = (numGates: number, hasPenalties: boolean): GatePenalty[] => {
  const gates: GatePenalty[] = [];
  let cumulativeTime = 0;

  for (let i = 1; i <= numGates; i++) {
    // Approx 3-5 seconds per gate
    cumulativeTime += 3 + Math.random() * 2;

    // Random penalties if hasPenalties
    let penalty: 0 | 2 | 50 = 0;
    if (hasPenalties) {
      const rnd = Math.random();
      if (rnd < 0.08) penalty = 2; // 8% chance of 2s touch
      if (rnd < 0.02) penalty = 50; // 2% chance of miss
    }

    gates.push({
      gateNumber: i,
      penalty,
      direction: i % 4 === 0 ? 'up' : 'down',
      color: i % 3 === 0 ? 'red' : 'green',
      splitTime: cumulativeTime,
      diff: (Math.random() - 0.5) * 2, // -1 to +1 second diff
    });
  }

  return gates;
};

/** Generate sample run detail data */
const generateRunDetail = (runNumber: 1 | 2, hasPenalties: boolean = true): RunDetail => {
  const gates = generateGateData(24, hasPenalties);
  const totalPenalty = gates.reduce((sum, g) => sum + g.penalty, 0);
  const rawTime = 88 + Math.random() * 10; // 88-98 seconds

  return {
    runNumber,
    rawTime,
    totalPenalty,
    finalTime: rawTime + totalPenalty,
    status: 'finished',
    gates,
    runRank: Math.floor(Math.random() * 10) + 1,
    runDiff: Math.random() * 5,
  };
};

// Note: sampleAthleteDetail available for stories if needed
// const sampleAthleteDetail: AthleteRunDetail = {
//   id: 1, name: 'Jiří Prskavec', club: 'USK Praha', category: 'K1M',
//   bib: 7, country: 'CZE', run1: generateRunDetail(1, true),
//   run2: generateRunDetail(2, false), overallRank: 1, overallDiff: 0,
// };

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

// Fullscreen icons
const FullscreenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </svg>
);

const ExitFullscreenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
  </svg>
);

// Star icons for favorites
const StarIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ActivityIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

// Trophy icon for podium
const TrophyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

// Note: Wave decoration and pulse rings removed for cleaner design (Phase 8.6.3)

// Close icon
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ============================================================================
// RunDetailModal Component
// ============================================================================

interface RunDetailModalProps {
  athlete: AthleteRunDetail | null;
  open: boolean;
  onClose: () => void;
  section?: 'dv' | 'ry' | 'vt';
}

const RunDetailModal = ({ athlete, open, onClose, section = 'dv' }: RunDetailModalProps) => {
  const [activeRun, setActiveRun] = useState<1 | 2>(1);

  if (!open || !athlete) return null;

  const currentRun = activeRun === 1 ? athlete.run1 : athlete.run2;

  // Format time helper
  const fmtTime = (seconds: number | undefined): string => {
    if (seconds === undefined) return '-';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toFixed(2).padStart(5, '0')}`;
  };

  // Format diff helper
  const fmtDiff = (diff: number | undefined): string => {
    if (diff === undefined || diff === 0) return '-';
    const sign = diff > 0 ? '+' : '';
    return `${sign}${diff.toFixed(2)}`;
  };

  // Get penalty badge color
  const getPenaltyClass = (penalty: number): string => {
    if (penalty === 0) return 'run-detail__gate--clean';
    if (penalty === 2) return 'run-detail__gate--touch';
    return 'run-detail__gate--miss';
  };

  return (
    <div className="run-detail__backdrop" onClick={onClose}>
      <div
        className={`run-detail__modal run-detail__modal--${section}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="run-detail-title"
      >
        {/* Header */}
        <div className="run-detail__header">
          <div className="run-detail__header-left">
            <div className="run-detail__athlete-info">
              <div className="run-detail__avatar">
                {getInitials(athlete.name)}
              </div>
              <div>
                <h2 id="run-detail-title" className="run-detail__name csk-display">
                  #{athlete.bib} {athlete.name}
                </h2>
                <p className="run-detail__club">{athlete.club} • {athlete.category}</p>
              </div>
            </div>
            {athlete.overallRank && (
              <div className="run-detail__overall">
                <span className="run-detail__overall-rank csk-display">
                  {athlete.overallRank}.
                </span>
                <span className="run-detail__overall-label">celkově</span>
              </div>
            )}
          </div>
          <button className="run-detail__close" onClick={onClose} aria-label="Zavřít">
            <CloseIcon />
          </button>
        </div>

        {/* Run Tabs */}
        <div className="run-detail__tabs">
          <button
            className={`run-detail__tab ${activeRun === 1 ? 'run-detail__tab--active' : ''}`}
            onClick={() => setActiveRun(1)}
          >
            <span>1. jízda</span>
            {athlete.run1 && (
              <span className="run-detail__tab-time">{fmtTime(athlete.run1.finalTime)}</span>
            )}
          </button>
          <button
            className={`run-detail__tab ${activeRun === 2 ? 'run-detail__tab--active' : ''}`}
            onClick={() => setActiveRun(2)}
          >
            <span>2. jízda</span>
            {athlete.run2 && (
              <span className="run-detail__tab-time">{fmtTime(athlete.run2.finalTime)}</span>
            )}
          </button>
        </div>

        {/* Run Summary */}
        {currentRun && (
          <div className="run-detail__summary">
            <div className="run-detail__summary-item">
              <span className="run-detail__summary-label">Čistý čas</span>
              <span className="run-detail__summary-value">{fmtTime(currentRun.rawTime)}</span>
            </div>
            <div className="run-detail__summary-item">
              <span className="run-detail__summary-label">Penalizace</span>
              <span className={`run-detail__summary-value ${currentRun.totalPenalty > 0 ? 'run-detail__summary-value--penalty' : ''}`}>
                {currentRun.totalPenalty > 0 ? `+${currentRun.totalPenalty}s` : '0s'}
              </span>
            </div>
            <div className="run-detail__summary-item run-detail__summary-item--total">
              <span className="run-detail__summary-label">Celkem</span>
              <span className="run-detail__summary-value csk-display">{fmtTime(currentRun.finalTime)}</span>
            </div>
            {currentRun.runRank && (
              <div className="run-detail__summary-item">
                <span className="run-detail__summary-label">Pořadí v jízdě</span>
                <span className="run-detail__summary-value">{currentRun.runRank}.</span>
              </div>
            )}
          </div>
        )}

        {/* Gate Grid */}
        {currentRun && (
          <div className="run-detail__gates">
            <h3 className="run-detail__gates-title">Brány ({currentRun.gates.length})</h3>
            <div className="run-detail__gates-legend">
              <span className="run-detail__legend-item run-detail__legend-item--clean">
                <span className="run-detail__legend-dot" />
                Čistá
              </span>
              <span className="run-detail__legend-item run-detail__legend-item--touch">
                <span className="run-detail__legend-dot" />
                Dotyk (+2s)
              </span>
              <span className="run-detail__legend-item run-detail__legend-item--miss">
                <span className="run-detail__legend-dot" />
                Vynechání (+50s)
              </span>
            </div>
            <div className="run-detail__gates-grid">
              {currentRun.gates.map((gate) => (
                <div
                  key={gate.gateNumber}
                  className={`run-detail__gate ${getPenaltyClass(gate.penalty)}`}
                  title={`Brána ${gate.gateNumber}: ${gate.penalty === 0 ? 'čistá' : gate.penalty === 2 ? 'dotyk 2s' : 'vynechání 50s'}`}
                >
                  <span className={`run-detail__gate-number ${gate.color === 'red' ? 'run-detail__gate-number--red' : ''}`}>
                    {gate.gateNumber}
                    {gate.direction === 'up' && <span className="run-detail__gate-arrow">↑</span>}
                  </span>
                  {gate.penalty > 0 && (
                    <span className="run-detail__gate-penalty">+{gate.penalty}</span>
                  )}
                  {gate.splitTime && (
                    <span className="run-detail__gate-split">{fmtTime(gate.splitTime)}</span>
                  )}
                  {gate.diff !== undefined && (
                    <span className={`run-detail__gate-diff ${gate.diff < 0 ? 'run-detail__gate-diff--faster' : 'run-detail__gate-diff--slower'}`}>
                      {fmtDiff(gate.diff)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No run data fallback */}
        {!currentRun && (
          <div className="run-detail__empty">
            <p>Data pro tuto jízdu nejsou k dispozici.</p>
          </div>
        )}
      </div>
    </div>
  );
};

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

// CSK Logo for satellite header
const CSKLogo = () => (
  <span className="prototype-live-page__logo">
    <span className="prototype-live-page__logo-text">CSK</span>
  </span>
);

const LivePage = ({
  initialCategory = 'K1M',
  simulateLive = true,
  updateInterval = 3000,
  section = 'dv',
  variant = 'standalone',
  enableFullscreen = true,
}: LivePageProps) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [feedItems, setFeedItems] = useState<FeedItem[]>(initialFeedItems);
  const [oncourseAthletes, setOncourseAthletes] = useState<OncourseAthlete[]>(initialOncourseAthletes);
  const [featuredBib, setFeaturedBib] = useState<number>(14);
  const [runDetailOpen, setRunDetailOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteRunDetail | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [favoriteAthletes, setFavoriteAthletes] = useState<Set<number>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Handle row click to open run detail modal
  const handleRowClick = useCallback((entry: ResultEntry) => {
    // Generate athlete detail from result entry
    const athleteDetail: AthleteRunDetail = {
      id: entry.id as number,
      name: entry.name,
      club: entry.club || '',
      category: entry.category || '',
      bib: Math.floor(Math.random() * 50) + 1,
      country: 'CZE',
      run1: generateRunDetail(1, true),
      run2: entry.status === 'final' ? generateRunDetail(2, false) : undefined,
      overallRank: entry.rank,
      overallDiff: entry.timeDiff,
    };
    setSelectedAthlete(athleteDetail);
    setRunDetailOpen(true);
  }, []);

  // Toggle favorite athlete
  const toggleFavorite = useCallback((athleteId: number, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    setFavoriteAthletes(prev => {
      const next = new Set(prev);
      if (next.has(athleteId)) {
        next.delete(athleteId);
      } else {
        next.add(athleteId);
      }
      return next;
    });
  }, []);

  // Toggle fullscreen mode
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  // Section names for display
  const sectionNames: Record<string, string> = {
    dv: 'Divoká voda',
    ry: 'Rychlostní kanoistika',
    vt: 'Vodní turistika',
  };

  // Get featured athlete for detailed view
  const featuredAthlete = oncourseAthletes.find(a => a.bib === featuredBib) || oncourseAthletes[0];

  // Handle featured athlete card click - must be after featuredAthlete definition
  const handleFeaturedClick = useCallback(() => {
    if (!featuredAthlete) return;
    const athleteDetail: AthleteRunDetail = {
      id: featuredAthlete.bib,
      name: featuredAthlete.name,
      club: featuredAthlete.club,
      category: featuredAthlete.category,
      bib: featuredAthlete.bib,
      country: 'CZE',
      run1: generateRunDetail(1, true),
      overallRank: undefined,
      overallDiff: undefined,
    };
    setSelectedAthlete(athleteDetail);
    setRunDetailOpen(true);
  }, [featuredAthlete]);

  // Current run splits for featured athlete (detailed view)
  const currentRunSplits = useMemo(() => {
    if (!featuredAthlete) return [];
    const positions = ['start', 'split1', 'split2', 'split3', 'finish-zone'];
    const posIndex = positions.indexOf(featuredAthlete.position);
    return [
      { label: 'Split 1', time: posIndex >= 1 ? 15.23 : undefined, diff: posIndex >= 1 ? -0.34 : undefined },
      { label: 'Split 2', time: posIndex >= 2 ? 31.45 : undefined, diff: posIndex >= 2 ? 0.12 : undefined },
      { label: 'Split 3', time: posIndex >= 3 ? 52.18 : undefined, diff: posIndex >= 3 ? -0.56 : undefined },
      { label: 'Cíl', time: undefined },
    ];
  }, [featuredAthlete]);

  // Simulate running timers for all oncourse athletes
  useEffect(() => {
    if (!simulateLive || !autoUpdate) return;

    const timer = setInterval(() => {
      setOncourseAthletes((prev) =>
        prev.map(athlete => ({
          ...athlete,
          runningTime: athlete.runningTime + 0.01,
        }))
      );
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

    // Filter by favorites if enabled
    if (showFavoritesOnly && favoriteAthletes.size > 0) {
      data = data.filter((r) => favoriteAthletes.has(r.id as number));
    }

    return data;
  }, [selectedCategory, searchQuery, showFavoritesOnly, favoriteAthletes]);

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
          appName="Live výsledky"
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
    );
  };

  // Footer rendering based on variant
  const renderFooter = () => {
    if (variant === 'embed') {
      return null; // No footer for embed - KanoeCzContext provides it
    }

    return (
      <footer className="prototype-live-page__footer">
        <div className="prototype-live-page__footer-content">
          <p>© 2026 Český svaz kanoistů. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    );
  };

  // Build class names
  const pageClassNames = [
    'prototype-live-page',
    `prototype-live-page--${section}`,
    variant === 'embed' ? 'prototype-live-page--embed' : '',
    isFullscreen ? 'prototype-live-page--fullscreen' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={pageClassNames}>
      {/* Fullscreen toggle button - floating */}
      {enableFullscreen && (
        <button
          className={`live-page-fullscreen-toggle ${isFullscreen ? 'live-page-fullscreen-toggle--active' : ''}`}
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? 'Ukončit fullscreen' : 'Fullscreen režim'}
          title={isFullscreen ? 'Ukončit fullscreen' : 'Fullscreen režim'}
        >
          {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
        </button>
      )}

      {/* Header - hidden in fullscreen */}
      {!isFullscreen && renderHeader()}

      {/* Page Header - Aesthetic design with mesh background */}
      <section className={`live-page-header live-page-header--${section} live-page-header--aesthetic csk-grain`}>
        <div className="live-page-header__container">
          <div className="live-page-header__breadcrumb csk-reveal csk-reveal-1">
            <a href="#">Výsledky</a>
            <span>/</span>
            <a href="#">2026</a>
            <span>/</span>
            <span>MČR ve slalomu</span>
          </div>
          <div className="live-page-header__content">
            <div className="live-page-header__left">
              <div className="live-page-header__title-row csk-reveal csk-reveal-2">
                <h1 className="live-page-header__title csk-display">MČR ve slalomu 2026</h1>
                <Badge variant="energy" size="lg" glow>
                  <span className="live-page-header__live-dot" />
                  LIVE
                </Badge>
              </div>
              <div className="live-page-header__meta csk-reveal csk-reveal-3">
                <span className="live-page-header__meta-item">
                  <CalendarIcon />
                  3. května 2026 • 14:32
                </span>
                <span className="live-page-header__meta-item">
                  <LocationIcon />
                  Praha – Troja
                </span>
                <span className="live-page-header__meta-item">
                  <UsersIcon />
                  70 závodníků
                </span>
                <Badge section={section}>
                  {sectionNames[section]}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="prototype-live-page__main">
        <div className="prototype-live-page__container">

          {/* Content - Three Column Layout */}
          <div className="prototype-live-page__content">
            {/* Left Sidebar - Oncourse Athletes */}
            <div className="prototype-live-page__current-run">
              {/* Oncourse Overview - All athletes on course */}
              <div className={`live-page-oncourse live-page-oncourse--${section}`}>
                <div className="live-page-oncourse__header">
                  <span className="live-page-oncourse__label">Na trati</span>
                  <LiveIndicator variant="live" size="sm" glow />
                  <Badge variant="default" size="sm">{oncourseAthletes.length}</Badge>
                </div>

                {/* Oncourse lanes - compact view of all athletes */}
                <div className="live-page-oncourse__lanes">
                  {oncourseAthletes.map((athlete) => (
                    <button
                      key={athlete.bib}
                      className={`live-page-oncourse__lane ${athlete.bib === featuredBib ? 'live-page-oncourse__lane--featured' : ''}`}
                      onClick={() => setFeaturedBib(athlete.bib)}
                      type="button"
                    >
                      <div className="live-page-oncourse__lane-avatar">
                        <span>{getInitials(athlete.name)}</span>
                      </div>
                      <div className="live-page-oncourse__lane-info">
                        <span className="live-page-oncourse__lane-name">
                          #{athlete.bib} {athlete.name}
                        </span>
                        <span className="live-page-oncourse__lane-position">
                          {athlete.position === 'start' && 'Start'}
                          {athlete.position === 'split1' && 'Split 1'}
                          {athlete.position === 'split2' && 'Split 2'}
                          {athlete.position === 'split3' && 'Split 3'}
                          {athlete.position === 'finish-zone' && 'Cílová zóna'}
                        </span>
                      </div>
                      <div className={`live-page-oncourse__lane-time ${autoUpdate ? 'live-page-oncourse__lane-time--running' : ''}`}>
                        {formatRunningTime(athlete.runningTime)}
                      </div>
                      {athlete.lastSplit?.diff !== undefined && (
                        <span className={`live-page-oncourse__lane-diff ${athlete.lastSplit.diff < 0 ? 'live-page-oncourse__lane-diff--faster' : 'live-page-oncourse__lane-diff--slower'}`}>
                          {athlete.lastSplit.diff < 0 ? '' : '+'}{athlete.lastSplit.diff.toFixed(2)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Athlete Card - Detailed view (click for full detail) */}
              {featuredAthlete && (
                <div
                  className={`live-page-current-card live-page-current-card--${section} live-page-current-card--aesthetic csk-border-accent`}
                  onClick={handleFeaturedClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleFeaturedClick(); }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="live-page-current-card__glow" />
                  <div className="live-page-current-card__content">
                    <div className="live-page-current-card__header">
                      <span className="live-page-current-card__label">Detail jízdy</span>
                    </div>

                    <div className="live-page-current-card__athlete">
                      <div className="live-page-current-card__avatar">
                        <div className="live-page-current-card__avatar-ring" />
                        <span className="live-page-current-card__avatar-text">
                          {getInitials(featuredAthlete.name)}
                        </span>
                      </div>
                      <h4 className="live-page-current-card__name">{featuredAthlete.name}</h4>
                      <p className="live-page-current-card__club">{featuredAthlete.club}</p>
                      <div className="live-page-current-card__badges">
                        <Badge variant="default" size="sm">#{featuredAthlete.bib}</Badge>
                        <Badge section={section} size="sm">{featuredAthlete.category}</Badge>
                      </div>
                    </div>

                    <div className="live-page-current-card__timer-container">
                      <div className="live-page-current-card__timer-label">Aktuální čas</div>
                      <div className={`live-page-current-card__timer ${autoUpdate ? 'live-page-current-card__timer--running' : ''}`}>
                        {formatRunningTime(featuredAthlete.runningTime)}
                      </div>
                    </div>

                    <div className="live-page-current-card__splits">
                      {currentRunSplits.map((split, index) => (
                        <div key={index} className={`live-page-current-card__split ${split.time !== undefined ? 'live-page-current-card__split--completed' : ''}`}>
                          <div className="live-page-current-card__split-indicator">
                            {split.time !== undefined ? (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                              </svg>
                            ) : (
                              <span className="live-page-current-card__split-dot" />
                            )}
                          </div>
                          <div className="live-page-current-card__split-content">
                            <span className="live-page-current-card__split-label">{split.label}</span>
                            <span className="live-page-current-card__split-time">
                              {split.time !== undefined ? formatTime(split.time) : '—'}
                            </span>
                          </div>
                          {split.diff !== undefined && (
                            <span className={`live-page-current-card__split-diff ${split.diff < 0 ? 'live-page-current-card__split-diff--faster' : 'live-page-current-card__split-diff--slower'}`}>
                              {split.diff < 0 ? '' : '+'}{split.diff.toFixed(2)}s
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

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
                  {/* Favorites toggle */}
                  <button
                    className={`live-page-favorites-toggle ${showFavoritesOnly ? 'live-page-favorites-toggle--active' : ''}`}
                    onClick={() => setShowFavoritesOnly(prev => !prev)}
                    title={showFavoritesOnly ? 'Zobrazit všechny' : 'Zobrazit pouze sledované'}
                    disabled={favoriteAthletes.size === 0}
                  >
                    <StarIcon filled={showFavoritesOnly} />
                    <span className="live-page-favorites-toggle__count">
                      {favoriteAthletes.size}
                    </span>
                  </button>
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

              {/* Results Table - Aesthetic wrapper */}
              <div className="csk-results-table-wrapper--aesthetic">
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
                  onRowClick={handleRowClick}
                  renderCell={(entry, columnKey) => {
                    if (columnKey === 'name') {
                      const isFavorite = favoriteAthletes.has(entry.id as number);
                      return (
                        <div className="live-page-results-row">
                          <button
                            className={`live-page-favorite-btn ${isFavorite ? 'live-page-favorite-btn--active' : ''}`}
                            onClick={(e) => toggleFavorite(entry.id as number, e)}
                            title={isFavorite ? 'Odebrat ze sledovaných' : 'Přidat ke sledovaným'}
                            aria-label={isFavorite ? 'Odebrat ze sledovaných' : 'Přidat ke sledovaným'}
                          >
                            <StarIcon filled={isFavorite} />
                          </button>
                          <span className="live-page-results-row__name">
                            {entry.name}
                            {entry.section && (
                              <span className={`csk-results-table__section csk-results-table__section--${entry.section}`}>
                                {entry.section.toUpperCase()}
                              </span>
                            )}
                          </span>
                        </div>
                      );
                    }
                    return undefined; // Use default rendering
                  }}
                />
              </div>
            </div>

            {/* Right Sidebar - Activity Feed */}
            <aside className="prototype-live-page__sidebar">
              {/* Mini Podium - Top 3 */}
              <div className={`live-page-podium live-page-podium--${section}`}>
                <div className="live-page-podium__header">
                  <TrophyIcon />
                  <h3 className="live-page-podium__title">Aktuální pořadí</h3>
                </div>
                <div className="live-page-podium__list">
                  {results.slice(0, 3).map((athlete, index) => (
                    <div key={athlete.id} className={`live-page-podium__item live-page-podium__item--${index + 1}`}>
                      <div className="live-page-podium__rank">{index + 1}</div>
                      <div className="live-page-podium__info">
                        <span className="live-page-podium__name">{athlete.name}</span>
                        <span className="live-page-podium__time">{formatTime(athlete.totalTime)}</span>
                      </div>
                      {index === 0 && <span className="live-page-podium__medal">🥇</span>}
                      {index === 1 && <span className="live-page-podium__medal">🥈</span>}
                      {index === 2 && <span className="live-page-podium__medal">🥉</span>}
                    </div>
                  ))}
                </div>
              </div>

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
      {renderFooter()}

      {/* Run Detail Modal */}
      <RunDetailModal
        athlete={selectedAthlete}
        open={runDetailOpen}
        onClose={() => setRunDetailOpen(false)}
        section={section}
      />
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
          'Prototyp stránky živých výsledků CSK. Zobrazuje aktuálně probíhající závod s real-time aktualizacemi, živým feedem událostí a aktuálním závodníkem na trati. Redesignováno s immersive hero sekcí a discipline-specific themingem.',
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
    section: {
      control: 'select',
      options: ['dv', 'ry', 'vt'],
      description: 'Discipline section for theming (DV = Whitewater, RY = Sprint, VT = Touring)',
    },
    variant: {
      control: 'select',
      options: ['standalone', 'satellite', 'embed'],
      description: 'Display variant - standalone (full header), satellite (minimal), embed (no chrome)',
    },
    enableFullscreen: {
      control: 'boolean',
      description: 'Enable fullscreen mode toggle button',
    },
  },
} satisfies Meta<typeof LivePage>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Integration Variants - Embed/Satellite only (Phase 8.9)
// ============================================================================

/**
 * **EMBED varianta** - Live výsledky vložené do kanoe.cz layoutu.
 *
 * Komponenta bez vlastního headeru a footeru, určená pro embedding
 * do existujícího webu kanoe.cz (Joomla + Bootstrap 4).
 *
 * Používá data-mode="embed" pro neutrální styling.
 */
export const Embed: Story = {
  args: {
    initialCategory: 'K1M',
    simulateLive: true,
    updateInterval: 3000,
    section: 'dv',
    variant: 'embed',
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="full"
        pageVariant="detail"
        pageTitle="Live výsledky - MČR ve slalomu 2026"
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
        story: 'Live výsledky embedované v kontextu kanoe.cz. Bez vlastního headeru/footeru - používá layout hostitelské stránky.',
      },
    },
  },
};

/**
 * **SATELLITE varianta** - Standalone live výsledky s minimálním headerem.
 *
 * Pro samostatnou aplikaci live výsledků s odkazem zpět na kanoe.cz.
 * Header obsahuje pouze logo CSK, název aplikace a přihlášení.
 */
export const Satellite: Story = {
  args: {
    initialCategory: 'K1M',
    simulateLive: true,
    updateInterval: 3000,
    section: 'dv',
    variant: 'satellite',
  },
  parameters: {
    docs: {
      description: {
        story: 'Standalone aplikace live výsledků s minimálním satellite headerem. Obsahuje odkaz zpět na kanoe.cz.',
      },
    },
  },
};

/**
 * **EMBED + Sidebar** - Live výsledky v úzkém sloupci s postranním panelem.
 *
 * Demonstrace responzivity v omezeném prostoru typickém pro
 * Joomla šablony s postranním panelem.
 */
export const EmbedWithSidebar: Story = {
  args: {
    initialCategory: 'K1M',
    simulateLive: true,
    updateInterval: 3000,
    section: 'dv',
    variant: 'embed',
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="sidebar"
        showSidebar={true}
        pageVariant="detail"
        pageTitle="Live výsledky"
        breadcrumbs={[
          { label: 'Úvod', href: '#' },
          { label: 'Divoká voda', href: '#' },
          { label: 'Live výsledky' },
        ]}
      >
        <Story />
      </KanoeCzContext>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Live výsledky v layoutu se sidebarem. Demonstrace container queries a responzivity v úzkém prostoru.',
      },
    },
  },
};

// ============================================================================
// Interactive Features - Fullscreen & Favorites (Phase 15.1)
// ============================================================================

/**
 * **Mobile Fullscreen Mode** - Maximized view for mobile devices.
 *
 * Features:
 * - Floating fullscreen toggle button (bottom-right)
 * - In fullscreen: hides header, footer, sidebar
 * - Oncourse panel becomes horizontal strip
 * - Optimized for small screens
 *
 * Click the fullscreen button in bottom-right to toggle.
 */
export const MobileFullscreen: Story = {
  args: {
    initialCategory: 'K1M',
    simulateLive: true,
    updateInterval: 3000,
    section: 'dv',
    variant: 'standalone',
    enableFullscreen: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
    docs: {
      description: {
        story: 'Fullscreen režim optimalizovaný pro mobilní zařízení. Klikněte na tlačítko v pravém dolním rohu pro přepnutí do fullscreen režimu, který schová navigaci a sidebar pro maximální využití obrazovky.',
      },
    },
  },
};

/**
 * **Favorite Athletes** - Track your athletes during the race.
 *
 * Features:
 * - Star icon next to each athlete name to add/remove favorites
 * - Favorites toggle button in filter bar
 * - Filter to show only favorite athletes
 *
 * Try clicking the star icon next to athlete names to favorite them,
 * then use the star filter button to show only favorites.
 */
export const FavoriteAthletes: Story = {
  args: {
    initialCategory: 'K1M',
    simulateLive: true,
    updateInterval: 3000,
    section: 'dv',
    variant: 'standalone',
    enableFullscreen: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Funkce sledování oblíbených závodníků. Klikněte na hvězdičku u jména závodníka pro přidání do sledovaných. Pomocí tlačítka s hvězdičkou ve filtru můžete zobrazit pouze sledované závodníky.',
      },
    },
  },
};
