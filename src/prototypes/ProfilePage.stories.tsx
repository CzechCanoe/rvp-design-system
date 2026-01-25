import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Tabs } from '../components/Tabs';
import { Avatar } from '../components/Avatar';
import { StatCard } from '../components/StatCard';
import { Timeline, type TimelineItem } from '../components/Timeline';
import { Table, type ColumnDef } from '../components/Table';
import { Progress } from '../components/Progress';
import { KanoeCzContext } from '../components/KanoeCzContext';
import './ProfilePage.css';

// ============================================================================
// Types
// ============================================================================

/** Display variant for the page */
type ProfilePageVariant = 'embed' | 'satellite';

interface ProfilePageProps {
  /** Athlete ID */
  athleteId?: string;
  /** Show edit controls (for own profile) */
  isOwnProfile?: boolean;
  /** Show admin controls */
  isAdmin?: boolean;
  /** Discipline section for theming */
  section?: 'dv' | 'ry' | 'vt';
  /** Display variant - embed (no header, in kanoe.cz context), satellite (minimal header) */
  variant?: ProfilePageVariant;
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

interface Registration {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  location: string;
  category: string;
  status: 'confirmed' | 'pending_payment' | 'waitlist' | 'cancelled';
  registeredAt: string;
  price?: number;
  disciplines?: string[];
}

interface PinnedEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  status: 'upcoming' | 'registration_open' | 'registration_closed' | 'live' | 'finished';
  hasStartList: boolean;
  hasResults: boolean;
  hasSchedule: boolean;
  hasPropositions: boolean;
  registrationDeadline?: string;
  updates: PinnedEventUpdate[];
}

interface PinnedEventUpdate {
  id: string;
  type: 'startlist' | 'results' | 'schedule' | 'propositions' | 'info';
  title: string;
  timestamp: string;
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

// My Registrations sample data
const myRegistrations: Registration[] = [
  {
    id: 'reg-1',
    eventId: 'evt-101',
    eventName: 'Český pohár #2',
    eventDate: '2026-02-15',
    location: 'Praha - Troja',
    category: 'K1M',
    status: 'confirmed',
    registeredAt: '2026-01-10',
    price: 350,
    disciplines: ['K1 slalom', 'K1 sprint'],
  },
  {
    id: 'reg-2',
    eventId: 'evt-102',
    eventName: 'Jarní sjezd Vltavy',
    eventDate: '2026-03-08',
    location: 'Vyšší Brod',
    category: 'K1M',
    status: 'pending_payment',
    registeredAt: '2026-01-18',
    price: 450,
    disciplines: ['K1 sjezd'],
  },
  {
    id: 'reg-3',
    eventId: 'evt-103',
    eventName: 'Český pohár #3',
    eventDate: '2026-04-12',
    location: 'Trnávka',
    category: 'K1M',
    status: 'waitlist',
    registeredAt: '2026-01-20',
    price: 350,
    disciplines: ['K1 slalom'],
  },
];

// Pinned events sample data
const pinnedEvents: PinnedEvent[] = [
  {
    id: 'pin-1',
    name: 'MČR ve slalomu 2026',
    date: '2026-06-20',
    location: 'Lipno',
    status: 'registration_open',
    hasStartList: false,
    hasResults: false,
    hasSchedule: true,
    hasPropositions: true,
    registrationDeadline: '2026-06-10',
    updates: [
      { id: 'u1', type: 'propositions', title: 'Propozice zveřejněny', timestamp: '2026-01-15T10:00:00' },
      { id: 'u2', type: 'schedule', title: 'Časový rozpis upraven', timestamp: '2026-01-18T14:30:00' },
    ],
  },
  {
    id: 'pin-2',
    name: 'Světový pohár Praha',
    date: '2026-05-15',
    location: 'Praha - Troja',
    status: 'upcoming',
    hasStartList: false,
    hasResults: false,
    hasSchedule: false,
    hasPropositions: false,
    updates: [],
  },
  {
    id: 'pin-3',
    name: 'Český pohár #1',
    date: '2026-01-12',
    location: 'Praha - Troja',
    status: 'finished',
    hasStartList: true,
    hasResults: true,
    hasSchedule: true,
    hasPropositions: true,
    updates: [
      { id: 'u3', type: 'results', title: 'Výsledky zveřejněny', timestamp: '2026-01-12T18:00:00' },
    ],
  },
];

// Registration history (past registrations with results)
const registrationHistory: (Registration & { result?: { rank: number; totalEntries: number; time?: string; points?: number } })[] = [
  {
    id: 'hist-1',
    eventId: 'evt-001',
    eventName: 'Český pohár #1',
    eventDate: '2026-01-12',
    location: 'Praha - Troja',
    category: 'K1M',
    status: 'confirmed',
    registeredAt: '2025-12-20',
    price: 350,
    disciplines: ['K1 slalom'],
    result: { rank: 1, totalEntries: 42, time: '92.34', points: 1000 },
  },
  {
    id: 'hist-2',
    eventId: 'evt-099',
    eventName: 'MČR ve slalomu 2025',
    eventDate: '2025-11-28',
    location: 'Lipno',
    category: 'K1M',
    status: 'confirmed',
    registeredAt: '2025-11-01',
    price: 500,
    disciplines: ['K1 slalom', 'K1 sprint'],
    result: { rank: 1, totalEntries: 56, time: '94.12', points: 1000 },
  },
  {
    id: 'hist-3',
    eventId: 'evt-098',
    eventName: 'Podzimní slalom',
    eventDate: '2025-10-15',
    location: 'Brandýs nad Labem',
    category: 'K1M',
    status: 'confirmed',
    registeredAt: '2025-10-01',
    price: 300,
    disciplines: ['K1 slalom'],
    result: { rank: 2, totalEntries: 38, time: '91.56', points: 800 },
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

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="17" x2="12" y2="22" />
      <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.89A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.89A2 2 0 0 0 5 15.24Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function UnpinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="2" x2="22" y2="22" />
      <line x1="12" y1="17" x2="12" y2="22" />
      <path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.89A2 2 0 0 0 5 15.24V17h12" />
      <path d="M15 9.34V6h1a2 2 0 0 0 0-4H7.89" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
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

function getRegistrationStatusLabel(status: Registration['status']): string {
  const labels = {
    confirmed: 'Potvrzeno',
    pending_payment: 'Čeká na platbu',
    waitlist: 'Náhradník',
    cancelled: 'Zrušeno',
  };
  return labels[status];
}

function getRegistrationStatusVariant(status: Registration['status']): 'success' | 'warning' | 'info' | 'error' {
  const variants: Record<Registration['status'], 'success' | 'warning' | 'info' | 'error'> = {
    confirmed: 'success',
    pending_payment: 'warning',
    waitlist: 'info',
    cancelled: 'error',
  };
  return variants[status];
}

function getEventStatusLabel(status: PinnedEvent['status']): string {
  const labels = {
    upcoming: 'Připravuje se',
    registration_open: 'Přihlášky otevřeny',
    registration_closed: 'Přihlášky uzavřeny',
    live: 'Probíhá',
    finished: 'Ukončeno',
  };
  return labels[status];
}

function getEventStatusVariant(status: PinnedEvent['status']): 'default' | 'success' | 'warning' | 'info' | 'error' {
  const variants: Record<PinnedEvent['status'], 'default' | 'success' | 'warning' | 'info' | 'error'> = {
    upcoming: 'default',
    registration_open: 'success',
    registration_closed: 'warning',
    live: 'error',
    finished: 'info',
  };
  return variants[status];
}

function formatRelativeTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));

  if (minutes < 60) return `před ${minutes} min`;
  if (hours < 24) return `před ${hours} hod`;
  if (days < 7) return `před ${days} dny`;
  return formatDate(timestamp);
}

// ============================================================================
// CSK Logo for satellite header
// ============================================================================

const CSKLogo = () => (
  <span className="profile-page__logo">
    <span className="profile-page__logo-text">CSK</span>
  </span>
);

// ============================================================================
// Profile Page Component
// ============================================================================

function ProfilePage({ isOwnProfile = false, section = 'dv', variant = 'satellite' }: ProfilePageProps) {
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

  // Header rendering based on variant
  const renderHeader = () => {
    // Embed variant: no header (provided by host page)
    if (variant === 'embed') {
      return null;
    }

    // Satellite variant: minimal header with CSK branding
    return (
      <Header
        variant="satellite"
        size="sm"
        bordered
        brand={<CSKLogo />}
        appName="Můj profil"
        homeLink="https://kanoe.cz"
        homeLinkLabel="kanoe.cz"
        userMenu={
          <Button variant="ghost" size="sm">
            {athlete.name}
          </Button>
        }
      />
    );
  };

  // Get CSS class based on variant
  const pageClassName = `profile-page ${variant === 'embed' ? 'profile-page--embed' : 'profile-page--satellite'}`;

  return (
    <div className={pageClassName}>
      {/* Header (only for satellite) */}
      {renderHeader()}

      {/* Page Header - Clean design for both variants */}
      {(variant === 'satellite' || variant === 'embed') && (
        <section className="profile-page-header">
          <div className="profile-page-header__container">
            <nav className="profile-page-header__breadcrumb">
              <a href="#">Domů</a>
              <ChevronRightIcon />
              <span>Můj profil</span>
            </nav>
            <div className="profile-page-header__content">
              <div className="profile-page-header__avatar">
                <Avatar name={athlete.name} src={athlete.imageUrl} size="lg" />
              </div>
              <div className="profile-page-header__info">
                <h1 className="profile-page-header__name">{athlete.name}</h1>
                <div className="profile-page-header__badges">
                  <Badge section={section}>{getSectionName(section)}</Badge>
                  <Badge vtClass={athlete.vtClass}>{getVtClassName(athlete.vtClass)}</Badge>
                  <Badge outlined>{athlete.club}</Badge>
                </div>
              </div>
              {isOwnProfile && (
                <div className="profile-page-header__actions">
                  <Button variant="secondary" size="sm">
                    <EditIcon /> Upravit
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

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
              { id: 'registrations', label: `Přihlášky (${myRegistrations.length})`, content: null },
              { id: 'pinned', label: `Sledované (${pinnedEvents.length})`, content: null },
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

            {activeTab === 'registrations' && (
              <div className="profile-registrations">
                {/* Upcoming Registrations */}
                <Card>
                  <div className="profile-section-header">
                    <h2 className="profile-section-title">Moje přihlášky</h2>
                    <Button variant="primary" size="sm">
                      <CalendarIcon /> Nová přihláška
                    </Button>
                  </div>
                  <p className="profile-section-description">
                    Nadcházející závody, na které jste přihlášen/a
                  </p>

                  {myRegistrations.length === 0 ? (
                    <div className="profile-empty-state">
                      <CalendarIcon />
                      <p>Zatím nemáte žádné přihlášky</p>
                      <Button variant="primary" size="sm">Prohlédnout kalendář</Button>
                    </div>
                  ) : (
                    <div className="profile-registrations-list">
                      {myRegistrations.map((reg) => (
                        <div key={reg.id} className="profile-registration-item">
                          <div className="profile-registration-item__date">
                            <span className="profile-registration-item__day">
                              {new Date(reg.eventDate).getDate()}
                            </span>
                            <span className="profile-registration-item__month">
                              {new Date(reg.eventDate).toLocaleDateString('cs-CZ', { month: 'short' })}
                            </span>
                          </div>
                          <div className="profile-registration-item__content">
                            <div className="profile-registration-item__header">
                              <h3 className="profile-registration-item__name">{reg.eventName}</h3>
                              <Badge variant={getRegistrationStatusVariant(reg.status)}>
                                {getRegistrationStatusLabel(reg.status)}
                              </Badge>
                            </div>
                            <div className="profile-registration-item__meta">
                              <span><MapPinIcon /> {reg.location}</span>
                              <span><RaceIcon /> {reg.category}</span>
                              {reg.disciplines && (
                                <span>{reg.disciplines.join(', ')}</span>
                              )}
                            </div>
                            {reg.status === 'pending_payment' && reg.price && (
                              <div className="profile-registration-item__payment">
                                <AlertCircleIcon />
                                <span>K úhradě: {reg.price} Kč</span>
                                <Button variant="primary" size="sm">Zaplatit</Button>
                              </div>
                            )}
                          </div>
                          <div className="profile-registration-item__actions">
                            <Button variant="ghost" size="sm" title="Detail závodu">
                              <ExternalLinkIcon />
                            </Button>
                            {reg.status !== 'cancelled' && (
                              <Button variant="ghost" size="sm" title="Odhlásit se">
                                Odhlásit
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>

                {/* Registration History Summary */}
                <Card>
                  <div className="profile-section-header">
                    <h2 className="profile-section-title">Historie přihlášek</h2>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab('history')}>
                      Zobrazit vše
                    </Button>
                  </div>
                  <div className="profile-registration-history">
                    {registrationHistory.slice(0, 3).map((reg) => (
                      <div key={reg.id} className="profile-registration-history-item">
                        <div className="profile-registration-history-item__info">
                          <span className="profile-registration-history-item__name">{reg.eventName}</span>
                          <span className="profile-registration-history-item__date">{formatDate(reg.eventDate)}</span>
                        </div>
                        {reg.result && (
                          <div className="profile-registration-history-item__result">
                            <span className={`profile-result-rank ${reg.result.rank <= 3 ? `profile-result-rank--${reg.result.rank === 1 ? 'gold' : reg.result.rank === 2 ? 'silver' : 'bronze'}` : ''}`}>
                              {reg.result.rank}. místo
                            </span>
                            <span className="profile-registration-history-item__points">{reg.result.points} b.</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'pinned' && (
              <div className="profile-pinned">
                {/* Pinned Events */}
                <Card>
                  <div className="profile-section-header">
                    <h2 className="profile-section-title">Sledované závody</h2>
                    <Badge variant="info">
                      <BellIcon /> Notifikace zapnuty
                    </Badge>
                  </div>
                  <p className="profile-section-description">
                    Závody, které sledujete. Dostanete upozornění při zveřejnění startovky, výsledků nebo aktualizaci propozic.
                  </p>

                  {pinnedEvents.length === 0 ? (
                    <div className="profile-empty-state">
                      <PinIcon />
                      <p>Zatím nesledujete žádné závody</p>
                      <Button variant="primary" size="sm">Prohlédnout kalendář</Button>
                    </div>
                  ) : (
                    <div className="profile-pinned-list">
                      {pinnedEvents.map((event) => (
                        <div key={event.id} className={`profile-pinned-item profile-pinned-item--${event.status}`}>
                          <div className="profile-pinned-item__header">
                            <div className="profile-pinned-item__title">
                              <h3 className="profile-pinned-item__name">{event.name}</h3>
                              <Badge variant={getEventStatusVariant(event.status)} size="sm">
                                {getEventStatusLabel(event.status)}
                              </Badge>
                            </div>
                            <Button variant="ghost" size="sm" title="Přestat sledovat">
                              <UnpinIcon />
                            </Button>
                          </div>

                          <div className="profile-pinned-item__meta">
                            <span><CalendarIcon /> {formatDate(event.date)}</span>
                            <span><MapPinIcon /> {event.location}</span>
                            {event.registrationDeadline && event.status === 'registration_open' && (
                              <span className="profile-pinned-item__deadline">
                                <ClockIcon /> Přihlášky do {formatDate(event.registrationDeadline)}
                              </span>
                            )}
                          </div>

                          <div className="profile-pinned-item__documents">
                            <span className={event.hasPropositions ? 'available' : 'unavailable'}>
                              Propozice {event.hasPropositions ? '✓' : '–'}
                            </span>
                            <span className={event.hasSchedule ? 'available' : 'unavailable'}>
                              Rozpis {event.hasSchedule ? '✓' : '–'}
                            </span>
                            <span className={event.hasStartList ? 'available' : 'unavailable'}>
                              Startovka {event.hasStartList ? '✓' : '–'}
                            </span>
                            <span className={event.hasResults ? 'available' : 'unavailable'}>
                              Výsledky {event.hasResults ? '✓' : '–'}
                            </span>
                          </div>

                          {event.updates.length > 0 && (
                            <div className="profile-pinned-item__updates">
                              <h4>Poslední aktualizace</h4>
                              {event.updates.slice(0, 2).map((update) => (
                                <div key={update.id} className="profile-pinned-item__update">
                                  <BellIcon />
                                  <span className="profile-pinned-item__update-title">{update.title}</span>
                                  <span className="profile-pinned-item__update-time">
                                    {formatRelativeTime(update.timestamp)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="profile-pinned-item__actions">
                            <Button variant="ghost" size="sm">
                              <ExternalLinkIcon /> Detail závodu
                            </Button>
                            {event.status === 'registration_open' && (
                              <Button variant="primary" size="sm">
                                Přihlásit se
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
# Profil závodníka (interní)

Aesthetic prototyp interní stránky profilu závodníka pro přihlášené uživatele.
Dvě varianty: Embed (v kanoe.cz kontextu) a Satellite (standalone s minimálním headerem).

## Hlavní sekce
1. **Page header** - avatar, jméno, discipline badges, akce
2. **Status karty** - právo startu, zdravotní prohlídka, příspěvky
3. **Záložky** - Přehled, Přihlášky, Sledované, Výsledky, Historie

## Varianty
- **Embed** - vložený do kanoe.cz layoutu
- **Satellite** - standalone s minimálním headerem

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
  argTypes: {
    variant: {
      control: 'select',
      options: ['embed', 'satellite'],
      description: 'Display variant',
    },
    section: {
      control: 'select',
      options: ['dv', 'ry', 'vt'],
      description: 'Discipline section for theming',
    },
    isOwnProfile: {
      control: 'boolean',
      description: 'Show edit controls',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfilePage>;

// ============================================================================
// Story Variants (2 aesthetic variants: Embed, Satellite)
// ============================================================================

/**
 * **EMBED varianta** - Profil vložený do kanoe.cz layoutu.
 *
 * Aesthetic design pro interní profil závodníka:
 * - Page header s avatar, jméno, discipline badges
 * - Status karty (právo startu, zdravotní prohlídka, příspěvky)
 * - Záložky: Přehled, Přihlášky, Sledované, Výsledky, Historie
 * - Statistiky sezóny a posledních výsledků
 *
 * Bez vlastního headeru/footeru - používá layout hostitelské stránky.
 *
 * **Sekce:** `section` = dv (modrá) / ry (zelená) / vt (červená)
 */
export const Embed: Story = {
  args: {
    isOwnProfile: true,
    section: 'dv',
    variant: 'embed',
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="full"
        pageVariant="detail"
        pageTitle="Můj profil"
        breadcrumbs={[
          { label: 'Úvod', href: '#' },
          { label: 'Závodníci', href: '#' },
          { label: 'Jiří Prskavec' },
        ]}
      >
        <Story />
      </KanoeCzContext>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Profil závodníka embedovaný v kontextu kanoe.cz. Bez vlastního headeru/footeru - používá layout hostitelské stránky.',
      },
    },
  },
};

/**
 * **SATELLITE varianta** - Standalone profil s minimálním headerem.
 *
 * Aesthetic design pro interní profil závodníka:
 * - Satellite header s CSK brandingem a odkazem na kanoe.cz
 * - Page header s avatar, jméno, discipline badges
 * - Status karty (právo startu, zdravotní prohlídka, příspěvky)
 * - Záložky: Přehled, Přihlášky, Sledované, Výsledky, Historie
 *
 * Standalone aplikace s odkazem zpět na kanoe.cz.
 *
 * **Sekce:** `section` = dv (modrá) / ry (zelená) / vt (červená)
 */
export const Satellite: Story = {
  args: {
    isOwnProfile: true,
    section: 'dv',
    variant: 'satellite',
  },
  parameters: {
    docs: {
      description: {
        story: 'Standalone profil závodníka s Aesthetic designem. Obsahuje satellite header s odkazem na kanoe.cz.',
      },
    },
  },
};
