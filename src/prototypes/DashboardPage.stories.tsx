import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Header } from '../components/Header';
import { MainNav } from '../components/Navigation';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { StatCard } from '../components/StatCard';
import { Table, type ColumnDef } from '../components/Table';
import { Avatar } from '../components/Avatar';
import { LiveIndicator } from '../components/LiveIndicator';
import './DashboardPage.css';

// ============================================================================
// Types
// ============================================================================

interface DashboardPageProps {
  /** User role */
  role?: 'club_admin' | 'section_admin' | 'federation_admin';
  /** Club name (for club admin) */
  clubName?: string;
  /** Section (for section admin) */
  section?: 'dv' | 'ry' | 'vt';
}

interface AlertItem {
  id: string;
  type: 'warning' | 'danger' | 'info';
  title: string;
  description: string;
  actionLabel?: string;
}

interface RaceItem {
  id: string;
  title: string;
  location: string;
  date: Date;
  section: 'dv' | 'ry' | 'vt';
  registeredAthletes: number;
  totalSlots: number;
  deadline: Date;
  isLive?: boolean;
}

interface MemberItem {
  id: string;
  name: string;
  registrationNumber: string;
  section: 'dv' | 'ry' | 'vt';
  vtClass: 'm' | 'a' | 'b' | 'c';
  rightToStart: boolean;
  medicalExpiry: Date;
  feesStatus: 'paid' | 'pending' | 'expired';
}

interface ActivityItem {
  id: string;
  type: 'registration' | 'payment' | 'medical' | 'race' | 'transfer';
  text: string;
  timestamp: Date;
}

// ============================================================================
// Sample Data
// ============================================================================

const alerts: AlertItem[] = [
  {
    id: '1',
    type: 'danger',
    title: '3 závodníci bez práva startu',
    description: 'Nemohou startovat na nadcházejících závodech',
    actionLabel: 'Zobrazit',
  },
  {
    id: '2',
    type: 'warning',
    title: '5 prohlídek expiruje do 30 dnů',
    description: 'Jan Novák, Petr Svoboda a další...',
    actionLabel: 'Upozornit',
  },
  {
    id: '3',
    type: 'warning',
    title: '2 nezaplacené příspěvky',
    description: 'Splatnost do 15.2.2026',
    actionLabel: 'Detail',
  },
  {
    id: '4',
    type: 'info',
    title: 'Uzávěrka přihlášek: Český pohár #1',
    description: 'Zbývá 3 dny (do 22.1.2026)',
    actionLabel: 'Přihlásit',
  },
];

const upcomingRaces: RaceItem[] = [
  {
    id: '1',
    title: 'Český pohár #1',
    location: 'Praha - Troja',
    date: new Date(2026, 0, 25),
    section: 'dv',
    registeredAthletes: 8,
    totalSlots: 12,
    deadline: new Date(2026, 0, 22),
  },
  {
    id: '2',
    title: 'Zimní regata',
    location: 'Račice',
    date: new Date(2026, 1, 1),
    section: 'ry',
    registeredAthletes: 15,
    totalSlots: 20,
    deadline: new Date(2026, 0, 28),
  },
  {
    id: '3',
    title: 'Jarní sprint',
    location: 'Brandýs nad Labem',
    date: new Date(2026, 1, 8),
    section: 'dv',
    registeredAthletes: 5,
    totalSlots: 15,
    deadline: new Date(2026, 1, 5),
    isLive: true,
  },
  {
    id: '4',
    title: 'MČR v maratonu',
    location: 'Slapy',
    date: new Date(2026, 1, 15),
    section: 'ry',
    registeredAthletes: 3,
    totalSlots: 10,
    deadline: new Date(2026, 1, 12),
  },
];

const members: MemberItem[] = [
  {
    id: '1',
    name: 'Jiří Prskavec',
    registrationNumber: 'RGC-2008-0042',
    section: 'dv',
    vtClass: 'm',
    rightToStart: true,
    medicalExpiry: new Date(2026, 5, 30),
    feesStatus: 'paid',
  },
  {
    id: '2',
    name: 'Vít Přindiš',
    registrationNumber: 'RGC-2006-0128',
    section: 'dv',
    vtClass: 'm',
    rightToStart: true,
    medicalExpiry: new Date(2026, 3, 15),
    feesStatus: 'paid',
  },
  {
    id: '3',
    name: 'Jan Novák',
    registrationNumber: 'RGC-2015-0234',
    section: 'dv',
    vtClass: 'a',
    rightToStart: false,
    medicalExpiry: new Date(2026, 0, 10),
    feesStatus: 'expired',
  },
  {
    id: '4',
    name: 'Petr Svoboda',
    registrationNumber: 'RGC-2018-0456',
    section: 'ry',
    vtClass: 'b',
    rightToStart: true,
    medicalExpiry: new Date(2026, 1, 5),
    feesStatus: 'paid',
  },
  {
    id: '5',
    name: 'Tereza Fišerová',
    registrationNumber: 'RGC-2012-0089',
    section: 'dv',
    vtClass: 'm',
    rightToStart: true,
    medicalExpiry: new Date(2026, 8, 20),
    feesStatus: 'paid',
  },
  {
    id: '6',
    name: 'Lukáš Rohan',
    registrationNumber: 'RGC-2010-0167',
    section: 'dv',
    vtClass: 'm',
    rightToStart: true,
    medicalExpiry: new Date(2026, 4, 12),
    feesStatus: 'pending',
  },
];

const recentActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'registration',
    text: 'Nová registrace: <strong>Martin Dvořák</strong>',
    timestamp: new Date(2026, 0, 19, 14, 30),
  },
  {
    id: '2',
    type: 'payment',
    text: '<strong>Tereza Fišerová</strong> zaplatila příspěvky',
    timestamp: new Date(2026, 0, 19, 11, 15),
  },
  {
    id: '3',
    type: 'race',
    text: 'Přihláška na <strong>Český pohár #1</strong> potvrzena',
    timestamp: new Date(2026, 0, 18, 16, 45),
  },
  {
    id: '4',
    type: 'medical',
    text: '<strong>Vít Přindiš</strong> - nová zdravotní prohlídka',
    timestamp: new Date(2026, 0, 18, 9, 20),
  },
  {
    id: '5',
    type: 'transfer',
    text: '<strong>Ondřej Karlík</strong> - přestup schválen',
    timestamp: new Date(2026, 0, 17, 13, 0),
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric' });
};

const formatTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (hours < 1) return 'Právě teď';
  if (hours < 24) return `Před ${hours}h`;

  const days = Math.floor(hours / 24);
  if (days === 1) return 'Včera';
  return `Před ${days} dny`;
};

const getMonthAbbr = (date: Date): string => {
  const months = [
    'led',
    'úno',
    'bře',
    'dub',
    'kvě',
    'čvn',
    'čvc',
    'srp',
    'zář',
    'říj',
    'lis',
    'pro',
  ];
  return months[date.getMonth()];
};

const getSectionLabel = (section: 'dv' | 'ry' | 'vt'): string => {
  const labels = { dv: 'Divoká voda', ry: 'Rychlost', vt: 'VT' };
  return labels[section];
};

const getVtClassLabel = (vtClass: 'm' | 'a' | 'b' | 'c'): string => {
  return vtClass.toUpperCase();
};

// ============================================================================
// Icons
// ============================================================================

const Icons = {
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  ),
  danger: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  ),
  userPlus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  ),
  fileText: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10,9 9,9 8,9" />
    </svg>
  ),
  creditCard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  arrowRight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12,5 19,12 12,19" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0012 0V2z" />
    </svg>
  ),
  medical: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  transfer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="17,1 21,5 17,9" />
      <path d="M3 11V9a4 4 0 014-4h14" />
      <polyline points="7,23 3,19 7,15" />
      <path d="M21 13v2a4 4 0 01-4 4H3" />
    </svg>
  ),
};

// ============================================================================
// Navigation Items
// ============================================================================

const navItems = [
  { id: 'dashboard', label: 'Dashboard', href: '#', active: true },
  { id: 'athletes', label: 'Závodníci', href: '#' },
  { id: 'races', label: 'Závody', href: '#' },
  { id: 'registrations', label: 'Přihlášky', href: '#' },
  { id: 'finance', label: 'Finance', href: '#' },
  { id: 'settings', label: 'Nastavení', href: '#' },
];

// ============================================================================
// Select Options
// ============================================================================

const statusOptions = [
  { value: 'all', label: 'Všichni' },
  { value: 'active', label: 'Aktivní' },
  { value: 'inactive', label: 'Neaktivní' },
];

const sectionOptions = [
  { value: 'all', label: 'Všechny sekce' },
  { value: 'dv', label: 'Divoká voda' },
  { value: 'ry', label: 'Rychlost' },
  { value: 'vt', label: 'VT' },
];

// ============================================================================
// Page Component
// ============================================================================

const DashboardPage = ({
  role = 'club_admin',
  clubName = 'USK Praha',
}: DashboardPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sectionFilter, setSectionFilter] = useState('all');

  // Filter members
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && member.rightToStart) ||
      (statusFilter === 'inactive' && !member.rightToStart);
    const matchesSection =
      sectionFilter === 'all' || member.section === sectionFilter;
    return matchesSearch && matchesStatus && matchesSection;
  });

  // Table columns
  const columns: ColumnDef<MemberItem>[] = [
    {
      key: 'name',
      header: 'Jméno',
      cell: (row) => (
        <div className="dashboard-member-name">
          <Avatar name={row.name} size="sm" />
          <div className="dashboard-member-info">
            <span className="dashboard-member-fullname">{row.name}</span>
            <span className="dashboard-member-id">{row.registrationNumber}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'section',
      header: 'Sekce',
      cell: (row) => (
        <Badge section={row.section} size="sm">
          {getSectionLabel(row.section)}
        </Badge>
      ),
    },
    {
      key: 'vtClass',
      header: 'VT',
      cell: (row) => (
        <Badge vtClass={row.vtClass} size="sm">
          {getVtClassLabel(row.vtClass)}
        </Badge>
      ),
    },
    {
      key: 'rightToStart',
      header: 'Právo startu',
      cell: (row) =>
        row.rightToStart ? (
          <Badge variant="success" size="sm">
            Aktivní
          </Badge>
        ) : (
          <Badge variant="error" size="sm">
            Neaktivní
          </Badge>
        ),
    },
    {
      key: 'medicalExpiry',
      header: 'Zdravotní',
      cell: (row) => {
        const now = new Date();
        const daysUntil = Math.ceil(
          (row.medicalExpiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );
        const isExpired = daysUntil < 0;
        const isExpiring = daysUntil >= 0 && daysUntil <= 30;

        return (
          <span
            style={{
              color: isExpired
                ? 'var(--color-danger)'
                : isExpiring
                  ? 'var(--color-warning)'
                  : 'var(--color-text-secondary)',
              fontWeight: isExpired || isExpiring ? 500 : 400,
            }}
          >
            {formatDate(row.medicalExpiry)}
          </span>
        );
      },
    },
    {
      key: 'feesStatus',
      header: 'Příspěvky',
      cell: (row) => {
        const variants = {
          paid: 'success' as const,
          pending: 'warning' as const,
          expired: 'error' as const,
        };
        const labels = {
          paid: 'Zaplaceno',
          pending: 'Čeká',
          expired: 'Po splatnosti',
        };
        return (
          <Badge variant={variants[row.feesStatus]} size="sm">
            {labels[row.feesStatus]}
          </Badge>
        );
      },
    },
  ];

  const getActivityIcon = (type: ActivityItem['type']) => {
    const icons = {
      registration: Icons.userPlus,
      payment: Icons.creditCard,
      medical: Icons.medical,
      race: Icons.trophy,
      transfer: Icons.transfer,
    };
    return icons[type];
  };

  const activeAthletesCount = members.filter((m) => m.rightToStart).length;
  const inactiveAthletesCount = members.filter((m) => !m.rightToStart).length;
  const registrationsThisMonth = 3;

  return (
    <div className="dashboard-page">
      {/* Header */}
      <Header
        sticky
        brand={<span className="dashboard-header-logo">Kanoe.cz</span>}
        navigation={<MainNav items={navItems} />}
        actions={
          <div className="dashboard-header-actions">
            <Button variant="ghost" size="sm">
              Nápověda
            </Button>
            <Avatar name="Jan Správce" size="sm" />
          </div>
        }
      />

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          {/* Welcome Section */}
          <div className="dashboard-welcome">
            <div className="dashboard-welcome-text">
              <p className="dashboard-welcome-greeting">Dobrý den, Jene</p>
              <h1 className="dashboard-welcome-title">{clubName}</h1>
              <p className="dashboard-welcome-subtitle">
                {role === 'club_admin' && 'Správa oddílu'}
                {role === 'section_admin' && 'Správa sekce'}
                {role === 'federation_admin' && 'Správa svazu'}
              </p>
            </div>
            <div className="dashboard-welcome-actions">
              <Button variant="secondary" size="md">
                Exportovat
              </Button>
              <Button variant="primary" size="md">
                + Nový závodník
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="dashboard-stats-grid">
            <StatCard
              value={activeAthletesCount}
              label="Aktivní závodníci"
              icon={Icons.users}
              color="primary"
              trend="up"
              trendValue="+2"
              secondaryValue={`${members.length} celkem`}
              clickable
            />
            <StatCard
              value={upcomingRaces.length}
              label="Nadcházející závody"
              icon={Icons.calendar}
              color="info"
              secondaryValue="Nejbližší za 6 dní"
              clickable
            />
            <StatCard
              value={inactiveAthletesCount}
              label="Bez práva startu"
              icon={Icons.clock}
              color={inactiveAthletesCount > 0 ? 'warning' : 'success'}
              description={
                inactiveAthletesCount > 0 ? 'Vyžaduje pozornost' : 'Vše v pořádku'
              }
              clickable
            />
            <StatCard
              value={registrationsThisMonth}
              label="Nové registrace"
              icon={Icons.userPlus}
              color="success"
              secondaryValue="Tento měsíc"
              trend="up"
              trendValue="+50%"
              clickable
            />
          </div>

          {/* Content Grid */}
          <div className="dashboard-content-grid">
            {/* Left Column */}
            <div className="dashboard-alerts">
              {/* Alerts Card */}
              <Card>
                <div className="dashboard-section-header">
                  <h2 className="dashboard-section-title">
                    Upozornění
                    {alerts.length > 0 && (
                      <span className="dashboard-section-badge">{alerts.length}</span>
                    )}
                  </h2>
                  <Button variant="ghost" size="sm">
                    Zobrazit vše
                  </Button>
                </div>
                <div className="dashboard-alert-list">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="dashboard-alert-item">
                      <div
                        className={`dashboard-alert-icon dashboard-alert-icon--${alert.type}`}
                      >
                        {alert.type === 'warning' && Icons.warning}
                        {alert.type === 'danger' && Icons.danger}
                        {alert.type === 'info' && Icons.info}
                      </div>
                      <div className="dashboard-alert-content">
                        <p className="dashboard-alert-title">{alert.title}</p>
                        <p className="dashboard-alert-description">
                          {alert.description}
                        </p>
                      </div>
                      {alert.actionLabel && (
                        <div className="dashboard-alert-action">
                          <Button variant="ghost" size="sm">
                            {alert.actionLabel}
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Members Table */}
              <Card>
                <div className="dashboard-section-header">
                  <h2 className="dashboard-section-title">Závodníci</h2>
                  <Button variant="ghost" size="sm">
                    Zobrazit vše
                  </Button>
                </div>
                <div className="dashboard-members-header">
                  <div className="dashboard-members-search">
                    <Input
                      type="search"
                      placeholder="Hledat závodníka..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      size="sm"
                    />
                  </div>
                  <div className="dashboard-members-filters">
                    <Select
                      options={statusOptions}
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      size="sm"
                    />
                    <Select
                      options={sectionOptions}
                      value={sectionFilter}
                      onChange={(e) => setSectionFilter(e.target.value)}
                      size="sm"
                    />
                  </div>
                </div>
                <Table
                  columns={columns}
                  data={filteredMembers}
                  rowKey="id"
                  hoverable
                />
              </Card>
            </div>

            {/* Right Column */}
            <div className="dashboard-races">
              {/* Upcoming Races */}
              <Card>
                <div className="dashboard-section-header">
                  <h2 className="dashboard-section-title">Nadcházející závody</h2>
                  <Button variant="ghost" size="sm">
                    Kalendář
                  </Button>
                </div>
                <div className="dashboard-race-list">
                  {upcomingRaces.map((race) => (
                    <div key={race.id} className="dashboard-race-item">
                      <div className="dashboard-race-date">
                        <span className="dashboard-race-date-day">
                          {race.date.getDate()}
                        </span>
                        <span className="dashboard-race-date-month">
                          {getMonthAbbr(race.date)}
                        </span>
                      </div>
                      <div className="dashboard-race-content">
                        <div className="dashboard-race-header">
                          <h3 className="dashboard-race-title">{race.title}</h3>
                          {race.isLive && <LiveIndicator size="sm" />}
                        </div>
                        <p className="dashboard-race-location">{race.location}</p>
                        <div className="dashboard-race-meta">
                          <Badge section={race.section} size="sm">
                            {getSectionLabel(race.section)}
                          </Badge>
                          <span className="dashboard-race-meta-item">
                            {Icons.users}
                            {race.registeredAthletes}/{race.totalSlots}
                          </span>
                          <span className="dashboard-race-meta-item">
                            {Icons.clock}
                            do {formatDate(race.deadline)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card>
                <div className="dashboard-section-header">
                  <h2 className="dashboard-section-title">Rychlé akce</h2>
                </div>
                <div className="dashboard-quick-actions">
                  <button className="dashboard-quick-action" type="button">
                    <div className="dashboard-quick-action-icon">{Icons.userPlus}</div>
                    <div className="dashboard-quick-action-text">
                      <p className="dashboard-quick-action-title">
                        Registrovat závodníka
                      </p>
                      <p className="dashboard-quick-action-description">
                        Přidat nového člena do oddílu
                      </p>
                    </div>
                    <div className="dashboard-quick-action-arrow">
                      {Icons.arrowRight}
                    </div>
                  </button>
                  <button className="dashboard-quick-action" type="button">
                    <div className="dashboard-quick-action-icon">{Icons.fileText}</div>
                    <div className="dashboard-quick-action-text">
                      <p className="dashboard-quick-action-title">Hromadná přihláška</p>
                      <p className="dashboard-quick-action-description">
                        Přihlásit závodníky na závod
                      </p>
                    </div>
                    <div className="dashboard-quick-action-arrow">
                      {Icons.arrowRight}
                    </div>
                  </button>
                  <button className="dashboard-quick-action" type="button">
                    <div className="dashboard-quick-action-icon">
                      {Icons.creditCard}
                    </div>
                    <div className="dashboard-quick-action-text">
                      <p className="dashboard-quick-action-title">Správa příspěvků</p>
                      <p className="dashboard-quick-action-description">
                        Evidovat platby členů
                      </p>
                    </div>
                    <div className="dashboard-quick-action-arrow">
                      {Icons.arrowRight}
                    </div>
                  </button>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card>
                <div className="dashboard-section-header">
                  <h2 className="dashboard-section-title">Poslední aktivita</h2>
                </div>
                <div className="dashboard-activity">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="dashboard-activity-item">
                      <div className="dashboard-activity-icon">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="dashboard-activity-content">
                        <p
                          className="dashboard-activity-text"
                          dangerouslySetInnerHTML={{ __html: activity.text }}
                        />
                        <p className="dashboard-activity-time">
                          {formatTime(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>Český svaz kanoistů - Registrační a výsledkový portál</p>
      </footer>
    </div>
  );
};

// ============================================================================
// Storybook Configuration
// ============================================================================

const meta: Meta<typeof DashboardPage> = {
  title: 'Prototypes/Dashboard Page',
  component: DashboardPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Dashboard správce

Prototyp dashboardu pro správce oddílu nebo sekce. Obsahuje:

## Klíčové prvky
- **Welcome sekce** - personalizovaný pozdrav a rychlé akce
- **Statistiky** - přehled klíčových metrik (aktivní závodníci, nadcházející závody, upozornění)
- **Upozornění** - urgentní položky vyžadující pozornost (expirující prohlídky, nezaplacené příspěvky)
- **Tabulka závodníků** - s filtrováním a vyhledáváním
- **Nadcházející závody** - s přehledem přihlášených
- **Rychlé akce** - nejčastější úkony
- **Poslední aktivita** - feed změn v oddíle

## Role uživatelů
- **Oddílový správce** - spravuje závodníky svého oddílu
- **Sekční správce** - přehled napříč oddíly v sekci
- **Svazový správce** - celkový přehled

## Funkce
- Filtrování závodníků dle stavu a sekce
- Vyhledávání závodníků
- Barevné indikátory stavu (právo startu, zdravotní prohlídka, příspěvky)
- Responsive layout pro všechny velikosti obrazovky
        `,
      },
    },
  },
  argTypes: {
    role: {
      control: 'select',
      options: ['club_admin', 'section_admin', 'federation_admin'],
      description: 'Role uživatele',
    },
    clubName: {
      control: 'text',
      description: 'Název oddílu',
    },
    section: {
      control: 'select',
      options: ['dv', 'ry', 'vt'],
      description: 'Sekce (pro sekčního správce)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardPage>;

// ============================================================================
// Stories
// ============================================================================

export const ClubAdmin: Story = {
  name: 'Oddílový správce',
  args: {
    role: 'club_admin',
    clubName: 'USK Praha',
  },
};

export const SectionAdmin: Story = {
  name: 'Sekční správce',
  args: {
    role: 'section_admin',
    clubName: 'Sekce Divoká voda',
    section: 'dv',
  },
};

export const FederationAdmin: Story = {
  name: 'Svazový správce',
  args: {
    role: 'federation_admin',
    clubName: 'Český svaz kanoistů',
  },
};
