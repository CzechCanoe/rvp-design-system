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
import { HeroSection } from '../components/HeroSection';
import { ResultsTable, type ResultEntry } from '../components/ResultsTable';
import { KanoeCzContext } from '../components/KanoeCzContext';
import { Icon } from '../components/Icon';
import { CSKLogo } from '../components/CSKLogo';
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

/** Race status from C123 XML */
type RaceStatus = 'scheduled' | 'entered' | 'startListOK' | 'comingUp' | 'delayed' | 'canceled' | 'postponed' | 'inProgress' | 'completed' | 'final';

/** Schedule entry from C123 XML format */
interface ScheduleEntry {
  /** Race ID e.g. "K1M-ZS_BR1_25" */
  raceId: string;
  /** Class/Category ID */
  classId: string;
  /** Discipline ID: BR1, BR2, TSR, QUA, SEM, FIN */
  disId: 'BR1' | 'BR2' | 'TSR' | 'QUA' | 'SEM' | 'FIN';
  /** Display name */
  displayName: string;
  /** Start time */
  startTime: Date;
  /** Status */
  status: RaceStatus;
  /** Number of athletes */
  athleteCount: number;
  /** Number finished */
  finishedCount: number;
  /** Start interval in seconds */
  startInterval: number;
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

/** Sample schedule data - based on C123 XML format */
const generateScheduleData = (): ScheduleEntry[] => {
  const now = new Date();
  const baseTime = new Date(now);
  baseTime.setHours(9, 0, 0, 0);

  return [
    {
      raceId: 'K1M-ZS_BR1_03',
      classId: 'K1M',
      disId: 'BR1',
      displayName: 'K1 Muži - 1. jízda',
      startTime: new Date(baseTime.getTime()),
      status: 'completed',
      athleteCount: 24,
      finishedCount: 24,
      startInterval: 60,
    },
    {
      raceId: 'K1W-ZS_BR1_03',
      classId: 'K1W',
      disId: 'BR1',
      displayName: 'K1 Ženy - 1. jízda',
      startTime: new Date(baseTime.getTime() + 30 * 60000),
      status: 'completed',
      athleteCount: 16,
      finishedCount: 16,
      startInterval: 60,
    },
    {
      raceId: 'C1M-ZS_BR1_03',
      classId: 'C1M',
      disId: 'BR1',
      displayName: 'C1 Muži - 1. jízda',
      startTime: new Date(baseTime.getTime() + 50 * 60000),
      status: 'completed',
      athleteCount: 18,
      finishedCount: 18,
      startInterval: 60,
    },
    {
      raceId: 'C1W-ZS_BR1_03',
      classId: 'C1W',
      disId: 'BR1',
      displayName: 'C1 Ženy - 1. jízda',
      startTime: new Date(baseTime.getTime() + 70 * 60000),
      status: 'completed',
      athleteCount: 12,
      finishedCount: 12,
      startInterval: 60,
    },
    // Lunch break
    {
      raceId: 'K1M-ZS_BR2_03',
      classId: 'K1M',
      disId: 'BR2',
      displayName: 'K1 Muži - 2. jízda',
      startTime: new Date(baseTime.getTime() + 180 * 60000),
      status: 'inProgress',
      athleteCount: 24,
      finishedCount: 8,
      startInterval: 60,
    },
    {
      raceId: 'K1W-ZS_BR2_03',
      classId: 'K1W',
      disId: 'BR2',
      displayName: 'K1 Ženy - 2. jízda',
      startTime: new Date(baseTime.getTime() + 210 * 60000),
      status: 'scheduled',
      athleteCount: 16,
      finishedCount: 0,
      startInterval: 60,
    },
    {
      raceId: 'C1M-ZS_BR2_03',
      classId: 'C1M',
      disId: 'BR2',
      displayName: 'C1 Muži - 2. jízda',
      startTime: new Date(baseTime.getTime() + 230 * 60000),
      status: 'scheduled',
      athleteCount: 18,
      finishedCount: 0,
      startInterval: 60,
    },
    {
      raceId: 'C1W-ZS_BR2_03',
      classId: 'C1W',
      disId: 'BR2',
      displayName: 'C1 Ženy - 2. jízda',
      startTime: new Date(baseTime.getTime() + 250 * 60000),
      status: 'scheduled',
      athleteCount: 12,
      finishedCount: 0,
      startInterval: 60,
    },
  ];
};

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
// SchedulePanel Component - Detailed race schedule based on C123 XML
// ============================================================================

interface SchedulePanelProps {
  schedule: ScheduleEntry[];
  currentRaceId?: string;
  onRaceSelect?: (entry: ScheduleEntry) => void;
  section?: 'dv' | 'ry' | 'vt';
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const SchedulePanel = ({
  schedule,
  currentRaceId,
  onRaceSelect,
  section = 'dv',
  collapsed = false,
  onToggleCollapse,
}: SchedulePanelProps) => {
  // Format time for display
  const formatScheduleTime = (date: Date): string => {
    return date.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
  };

  // Get status badge variant and text
  const getStatusInfo = (status: RaceStatus): { variant: 'default' | 'success' | 'warning' | 'error' | 'info'; text: string } => {
    switch (status) {
      case 'completed':
      case 'final':
        return { variant: 'success', text: 'Dokončeno' };
      case 'inProgress':
        return { variant: 'error', text: 'Probíhá' };
      case 'comingUp':
        return { variant: 'warning', text: 'Brzy' };
      case 'delayed':
        return { variant: 'warning', text: 'Zpožděno' };
      case 'canceled':
        return { variant: 'default', text: 'Zrušeno' };
      case 'postponed':
        return { variant: 'info', text: 'Odloženo' };
      default:
        return { variant: 'default', text: 'Naplánováno' };
    }
  };

  // Find current race (inProgress)
  const currentRace = schedule.find(s => s.status === 'inProgress');

  // Split into completed and upcoming
  const completedRaces = schedule.filter(s => s.status === 'completed' || s.status === 'final');
  const upcomingRaces = schedule.filter(s => s.status !== 'completed' && s.status !== 'final' && s.status !== 'inProgress');

  return (
    <div className={`live-page-schedule live-page-schedule--${section}`}>
      <div className="live-page-schedule__header">
        <div className="live-page-schedule__header-left">
          <Icon name="clock" size="sm" />
          <h3 className="live-page-schedule__title">Časový program</h3>
        </div>
        {onToggleCollapse && (
          <button
            className="live-page-schedule__toggle"
            onClick={onToggleCollapse}
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Rozbalit program' : 'Sbalit program'}
          >
            <Icon name={collapsed ? 'chevron-down' : 'chevron-up'} size="sm" />
          </button>
        )}
      </div>

      {!collapsed && (
        <div className="live-page-schedule__content">
          {/* Current Race - Highlighted */}
          {currentRace && (
            <div className="live-page-schedule__current">
              <div className="live-page-schedule__current-label">
                <Icon name="play-circle" size="sm" />
                <span>Právě probíhá</span>
              </div>
              <button
                className={`live-page-schedule__item live-page-schedule__item--current ${currentRace.raceId === currentRaceId ? 'live-page-schedule__item--selected' : ''}`}
                onClick={() => onRaceSelect?.(currentRace)}
                type="button"
              >
                <div className="live-page-schedule__item-time">
                  {formatScheduleTime(currentRace.startTime)}
                </div>
                <div className="live-page-schedule__item-info">
                  <span className="live-page-schedule__item-name">{currentRace.displayName}</span>
                  <span className="live-page-schedule__item-progress">
                    {currentRace.finishedCount}/{currentRace.athleteCount} závodníků
                  </span>
                </div>
                <div className="live-page-schedule__item-status">
                  <Badge variant="energy" size="sm" glow>
                    <span className="live-page-schedule__live-dot" />
                    LIVE
                  </Badge>
                </div>
              </button>
            </div>
          )}

          {/* Upcoming Races */}
          {upcomingRaces.length > 0 && (
            <div className="live-page-schedule__section">
              <div className="live-page-schedule__section-label">Nadcházející</div>
              <div className="live-page-schedule__list">
                {upcomingRaces.map((entry) => {
                  const statusInfo = getStatusInfo(entry.status);
                  return (
                    <button
                      key={entry.raceId}
                      className={`live-page-schedule__item ${entry.raceId === currentRaceId ? 'live-page-schedule__item--selected' : ''}`}
                      onClick={() => onRaceSelect?.(entry)}
                      type="button"
                    >
                      <div className="live-page-schedule__item-time">
                        {formatScheduleTime(entry.startTime)}
                      </div>
                      <div className="live-page-schedule__item-info">
                        <span className="live-page-schedule__item-name">{entry.displayName}</span>
                        <span className="live-page-schedule__item-meta">
                          {entry.athleteCount} závodníků • interval {entry.startInterval}s
                        </span>
                      </div>
                      {entry.status !== 'scheduled' && (
                        <Badge variant={statusInfo.variant} size="sm">
                          {statusInfo.text}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Completed Races - Collapsible */}
          {completedRaces.length > 0 && (
            <div className="live-page-schedule__section live-page-schedule__section--completed">
              <div className="live-page-schedule__section-label">
                <Icon name="check-circle" size="sm" />
                Dokončené ({completedRaces.length})
              </div>
              <div className="live-page-schedule__list live-page-schedule__list--completed">
                {completedRaces.map((entry) => (
                  <button
                    key={entry.raceId}
                    className={`live-page-schedule__item live-page-schedule__item--completed ${entry.raceId === currentRaceId ? 'live-page-schedule__item--selected' : ''}`}
                    onClick={() => onRaceSelect?.(entry)}
                    type="button"
                  >
                    <div className="live-page-schedule__item-time">
                      {formatScheduleTime(entry.startTime)}
                    </div>
                    <div className="live-page-schedule__item-info">
                      <span className="live-page-schedule__item-name">{entry.displayName}</span>
                    </div>
                    <Badge variant="success" size="sm">
                      <Icon name="check-circle" size="sm" />
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

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
            <Icon name="close" size="md" />
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
  const [scheduleData] = useState<ScheduleEntry[]>(() => generateScheduleData());
  const [selectedRaceId, setSelectedRaceId] = useState<string>('K1M-ZS_BR2_03');
  const [scheduleCollapsed, setScheduleCollapsed] = useState(false);
  const [nextUpCollapsed, setNextUpCollapsed] = useState(false);
  const [podiumCollapsed, setPodiumCollapsed] = useState(false);

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

  // Handle schedule race selection
  const handleRaceSelect = useCallback((entry: ScheduleEntry) => {
    setSelectedRaceId(entry.raceId);
    // Could also update selectedCategory based on classId
    if (['K1M', 'K1W', 'C1M', 'C1W'].includes(entry.classId)) {
      setSelectedCategory(entry.classId);
    }
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
          {isFullscreen ? <Icon name="exit-fullscreen" size="md" /> : <Icon name="fullscreen" size="md" />}
        </button>
      )}

      {/* Header - hidden in fullscreen */}
      {!isFullscreen && renderHeader()}

      {/* Page Header - Using HeroSection component */}
      <HeroSection
        variant="compact"
        section={section}
        title="MČR ve slalomu 2026"
        meshBackground
        patternOverlay
        badges={
          <Badge variant="energy" size="lg" glow>
            <span className="live-page-live-dot" />
            LIVE
          </Badge>
        }
        metadata={[
          { key: 'datetime', label: 'Datum', value: '3. května 2026 • 14:32', icon: 'calendar' },
          { key: 'location', label: 'Místo', value: 'Praha – Troja', icon: 'location' },
          { key: 'athletes', label: 'Závodníků', value: '70', icon: 'users' },
        ]}
        subtitle={
          <Badge section={section}>
            {sectionNames[section]}
          </Badge>
        }
        breadcrumbs={
          variant !== 'embed' && (
            <div className="live-page-breadcrumb csk-reveal csk-reveal-1">
              <a href="#">Výsledky</a>
              <span>/</span>
              <a href="#">2026</a>
              <span>/</span>
              <span>MČR ve slalomu</span>
            </div>
          )
        }
        className={`live-page-hero live-page-hero--${section} ${variant === 'embed' ? 'live-page-hero--embed' : ''}`}
      />

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
                  <LiveIndicator variant="live" size="sm" energyGlow />
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

              {/* Next Up Card - Collapsible (secondary importance) */}
              <div className={`prototype-live-page__next-card ${nextUpCollapsed ? 'prototype-live-page__next-card--collapsed' : ''}`}>
                <div className="prototype-live-page__next-header">
                  <h3 className="prototype-live-page__next-title">Další na startu</h3>
                  <button
                    className="prototype-live-page__next-toggle"
                    onClick={() => setNextUpCollapsed(prev => !prev)}
                    aria-expanded={!nextUpCollapsed}
                    aria-label={nextUpCollapsed ? 'Rozbalit' : 'Sbalit'}
                  >
                    {nextUpCollapsed ? <Icon name="chevron-down" size="sm" /> : <Icon name="chevron-up" size="sm" />}
                  </button>
                </div>
                {!nextUpCollapsed && (
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
                )}
              </div>
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
                    <Icon name="star" size="sm" fill={showFavoritesOnly ? 'currentColor' : 'none'} />
                    <span className="live-page-favorites-toggle__count">
                      {favoriteAthletes.size}
                    </span>
                  </button>
                  <Input
                    type="search"
                    placeholder="Hledat závodníka..."
                    size="sm"
                    iconLeft={<Icon name="search" size="md" />}
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
                  <Button variant="ghost" size="sm" iconLeft={<Icon name="refresh" size="sm" />}>
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
                            <Icon name="star" size="sm" fill={isFavorite ? 'currentColor' : 'none'} />
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

            {/* Right Sidebar - Schedule + Activity Feed */}
            <aside className="prototype-live-page__sidebar">
              {/* Schedule Panel - Primary element */}
              <SchedulePanel
                schedule={scheduleData}
                currentRaceId={selectedRaceId}
                onRaceSelect={handleRaceSelect}
                section={section}
                collapsed={scheduleCollapsed}
                onToggleCollapse={() => setScheduleCollapsed(prev => !prev)}
              />

              {/* Mini Podium - Top 3 (Collapsible, secondary) */}
              <div className={`live-page-podium live-page-podium--${section} ${podiumCollapsed ? 'live-page-podium--collapsed' : ''}`}>
                <div className="live-page-podium__header">
                  <Icon name="trophy" size="md" />
                  <h3 className="live-page-podium__title">Aktuální pořadí</h3>
                  <button
                    className="live-page-podium__toggle"
                    onClick={() => setPodiumCollapsed(prev => !prev)}
                    aria-expanded={!podiumCollapsed}
                    aria-label={podiumCollapsed ? 'Rozbalit pořadí' : 'Sbalit pořadí'}
                  >
                    {podiumCollapsed ? <Icon name="chevron-down" size="sm" /> : <Icon name="chevron-up" size="sm" />}
                  </button>
                </div>
                {!podiumCollapsed && (
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
                )}
              </div>

              {/* Activity Feed */}
              <Card variant="surface" className="prototype-live-page__feed-card">
                <div className="prototype-live-page__feed-header">
                  <h3 className="prototype-live-page__feed-title">
                    <Icon name="activity" size="sm" />
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
// Story Variants (2 aesthetic variants: Embed, Satellite)
// ============================================================================

/**
 * **EMBED varianta** - Live výsledky vložené do kanoe.cz layoutu.
 *
 * Aesthetic design s plnou funkcionalitou:
 * - Mesh gradient hero header
 * - Immersive real-time updates
 * - Favorite athletes tracking (star icon)
 * - Fullscreen mode toggle (enableFullscreen prop)
 * - Collapsible schedule, podium, and next-up panels
 *
 * Bez vlastního headeru/footeru - používá layout hostitelské stránky.
 */
export const Embed: Story = {
  args: {
    initialCategory: 'K1M',
    simulateLive: true,
    updateInterval: 3000,
    section: 'dv',
    variant: 'embed',
    enableFullscreen: true,
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
 * Aesthetic design s plnou funkcionalitou:
 * - Mesh gradient hero header
 * - Satellite header with CSK branding
 * - Favorite athletes tracking (star icon)
 * - Fullscreen mode toggle (bottom-right button)
 * - Collapsible schedule, podium, and next-up panels
 *
 * Standalone aplikace s odkazem zpět na kanoe.cz.
 */
export const Satellite: Story = {
  args: {
    initialCategory: 'K1M',
    simulateLive: true,
    updateInterval: 3000,
    section: 'dv',
    variant: 'satellite',
    enableFullscreen: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Standalone aplikace live výsledků s Aesthetic designem. Obsahuje satellite header s odkazem na kanoe.cz, fullscreen režim a sledování oblíbených závodníků.',
      },
    },
  },
};

