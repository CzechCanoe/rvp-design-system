import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Header } from '../components/Header';
import { MainNav } from '../components/Navigation';
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
    title: '3 zavodnici bez prava startu',
    description: 'Nemohou startovat na nadchazejicich zavodech',
    actionLabel: 'Zobrazit',
  },
  {
    id: '2',
    type: 'warning',
    title: '5 prohlidek expiruje do 30 dnu',
    description: 'Jan Novak, Petr Svoboda a dalsi...',
    actionLabel: 'Upozornit',
  },
  {
    id: '3',
    type: 'warning',
    title: '2 nezaplacene prispevky',
    description: 'Splatnost do 15.2.2026',
    actionLabel: 'Detail',
  },
  {
    id: '4',
    type: 'info',
    title: 'Uzaverka prihlasek: Cesky pohar #1',
    description: 'Zbyva 3 dny (do 22.1.2026)',
    actionLabel: 'Prihlasit',
  },
];

const upcomingRaces: RaceItem[] = [
  {
    id: '1',
    title: 'Cesky pohar #1',
    location: 'Praha - Troja',
    date: new Date(2026, 0, 25),
    section: 'dv',
    registeredAthletes: 8,
    totalSlots: 12,
    deadline: new Date(2026, 0, 22),
  },
  {
    id: '2',
    title: 'Zimni regata',
    location: 'Racice',
    date: new Date(2026, 1, 1),
    section: 'ry',
    registeredAthletes: 15,
    totalSlots: 20,
    deadline: new Date(2026, 0, 28),
  },
  {
    id: '3',
    title: 'Jarni sprint',
    location: 'Brandys nad Labem',
    date: new Date(2026, 1, 8),
    section: 'dv',
    registeredAthletes: 5,
    totalSlots: 15,
    deadline: new Date(2026, 1, 5),
    isLive: true,
  },
  {
    id: '4',
    title: 'MCR v maratonu',
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
    name: 'Jiri Prskavec',
    registrationNumber: 'RGC-2008-0042',
    section: 'dv',
    vtClass: 'm',
    rightToStart: true,
    medicalExpiry: new Date(2026, 5, 30),
    feesStatus: 'paid',
  },
  {
    id: '2',
    name: 'Vit Prindis',
    registrationNumber: 'RGC-2006-0128',
    section: 'dv',
    vtClass: 'm',
    rightToStart: true,
    medicalExpiry: new Date(2026, 3, 15),
    feesStatus: 'paid',
  },
  {
    id: '3',
    name: 'Jan Novak',
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
    name: 'Tereza Fiserova',
    registrationNumber: 'RGC-2012-0089',
    section: 'dv',
    vtClass: 'm',
    rightToStart: true,
    medicalExpiry: new Date(2026, 8, 20),
    feesStatus: 'paid',
  },
  {
    id: '6',
    name: 'Lukas Rohan',
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
    text: 'Nova registrace: <strong>Martin Dvorak</strong>',
    timestamp: new Date(2026, 0, 19, 14, 30),
  },
  {
    id: '2',
    type: 'payment',
    text: '<strong>Tereza Fiserova</strong> zaplatila prispevky',
    timestamp: new Date(2026, 0, 19, 11, 15),
  },
  {
    id: '3',
    type: 'race',
    text: 'Prihlaska na <strong>Cesky pohar #1</strong> potvrzena',
    timestamp: new Date(2026, 0, 18, 16, 45),
  },
  {
    id: '4',
    type: 'medical',
    text: '<strong>Vit Prindis</strong> - nova zdravotni prohlidka',
    timestamp: new Date(2026, 0, 18, 9, 20),
  },
  {
    id: '5',
    type: 'transfer',
    text: '<strong>Ondrej Karlik</strong> - prestup schvalen',
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

  if (hours < 1) return 'Prave ted';
  if (hours < 24) return `Pred ${hours}h`;

  const days = Math.floor(hours / 24);
  if (days === 1) return 'Vcera';
  return `Pred ${days} dny`;
};

const getMonthAbbr = (date: Date): string => {
  const months = [
    'led',
    'uno',
    'bre',
    'dub',
    'kve',
    'cvn',
    'cvc',
    'srp',
    'zar',
    'rij',
    'lis',
    'pro',
  ];
  return months[date.getMonth()];
};

const getSectionLabel = (section: 'dv' | 'ry' | 'vt'): string => {
  const labels = { dv: 'Divoka voda', ry: 'Rychlost', vt: 'VT' };
  return labels[section];
};

const getVtClassLabel = (vtClass: 'm' | 'a' | 'b' | 'c'): string => {
  return vtClass.toUpperCase();
};

const getRoleLabel = (role: string): string => {
  const labels: Record<string, string> = {
    club_admin: 'Oddilovy spravce',
    section_admin: 'Sekcni spravce',
    federation_admin: 'Svazovy spravce',
  };
  return labels[role] || role;
};

const getHeroSectionClass = (
  role: string,
  section?: 'dv' | 'ry' | 'vt'
): string => {
  if (role === 'section_admin' && section) {
    return `dashboard-hero-section--${section}`;
  }
  if (role === 'federation_admin') {
    return 'dashboard-hero-section--federation';
  }
  return '';
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
  trendUp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
      <polyline points="17,6 23,6 23,12" />
    </svg>
  ),
};

// Wave SVG for hero section
const WaveSVG = () => (
  <svg
    className="dashboard-page-wave"
    viewBox="0 0 1440 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path
      d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z"
      fill="currentColor"
    />
  </svg>
);

// ============================================================================
// Navigation Items
// ============================================================================

const navItems = [
  { id: 'dashboard', label: 'Dashboard', href: '#', active: true },
  { id: 'athletes', label: 'Zavodnici', href: '#' },
  { id: 'races', label: 'Zavody', href: '#' },
  { id: 'registrations', label: 'Prihlasky', href: '#' },
  { id: 'finance', label: 'Finance', href: '#' },
  { id: 'settings', label: 'Nastaveni', href: '#' },
];

// ============================================================================
// Select Options
// ============================================================================

const statusOptions = [
  { value: 'all', label: 'Vsichni' },
  { value: 'active', label: 'Aktivni' },
  { value: 'inactive', label: 'Neaktivni' },
];

const sectionOptions = [
  { value: 'all', label: 'Vsechny sekce' },
  { value: 'dv', label: 'Divoka voda' },
  { value: 'ry', label: 'Rychlost' },
  { value: 'vt', label: 'VT' },
];

// ============================================================================
// Page Component
// ============================================================================

const DashboardPage = ({
  role = 'club_admin',
  clubName = 'USK Praha',
  section,
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
      header: 'Jmeno',
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
      header: 'Pravo startu',
      cell: (row) =>
        row.rightToStart ? (
          <Badge variant="success" size="sm">
            Aktivni
          </Badge>
        ) : (
          <Badge variant="error" size="sm">
            Neaktivni
          </Badge>
        ),
    },
    {
      key: 'medicalExpiry',
      header: 'Zdravotni',
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
      header: 'Prispevky',
      cell: (row) => {
        const variants = {
          paid: 'success' as const,
          pending: 'warning' as const,
          expired: 'error' as const,
        };
        const labels = {
          paid: 'Zaplaceno',
          pending: 'Ceka',
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
              Napoveda
            </Button>
            <Avatar name="Jan Spravce" size="sm" />
          </div>
        }
      />

      {/* Hero Section */}
      <section
        className={`dashboard-hero-section ${getHeroSectionClass(role, section)}`}
      >
        <div className="dashboard-hero-section__background">
          <div className="dashboard-hero-section__gradient" />
          <div className="dashboard-hero-section__pattern" />
          <div className="dashboard-hero-section__pulse-rings">
            <div className="dashboard-pulse-ring" />
            <div className="dashboard-pulse-ring" />
            <div className="dashboard-pulse-ring" />
          </div>
        </div>
        <div className="dashboard-hero-section__content">
          <div className="dashboard-hero-content">
            <div className="dashboard-hero-welcome">
              <p className="dashboard-hero-greeting">Dobry den, Jane</p>
              <h1 className="dashboard-hero-title">{clubName}</h1>
              <p className="dashboard-hero-subtitle">
                <span className="dashboard-hero-badge">
                  {getRoleLabel(role)}
                </span>
                {section && (
                  <Badge section={section} size="sm">
                    {getSectionLabel(section)}
                  </Badge>
                )}
              </p>
            </div>
            <div className="dashboard-hero-actions">
              <Button variant="secondary" size="md">
                Exportovat
              </Button>
              <Button variant="gradient" size="md">
                + Novy zavodnik
              </Button>
            </div>
          </div>
        </div>
        <div className="dashboard-hero-section__wave">
          <WaveSVG />
        </div>
      </section>

      {/* Stats Grid */}
      <div className="dashboard-stats-section">
        <div className="dashboard-stats-grid">
          <div className="dashboard-stat-card--gradient-primary">
            <StatCard
              value={activeAthletesCount}
              label="Aktivni zavodnici"
              icon={Icons.users}
              color="primary"
              trend="up"
              trendValue="+2"
              secondaryValue={`${members.length} celkem`}
              clickable
            />
          </div>
          <div className="dashboard-stat-card--gradient-info">
            <StatCard
              value={upcomingRaces.length}
              label="Nadchazejici zavody"
              icon={Icons.calendar}
              color="info"
              secondaryValue="Nejblizsi za 6 dni"
              clickable
            />
          </div>
          <div className="dashboard-stat-card--gradient-warning">
            <StatCard
              value={inactiveAthletesCount}
              label="Bez prava startu"
              icon={Icons.clock}
              color={inactiveAthletesCount > 0 ? 'warning' : 'success'}
              description={
                inactiveAthletesCount > 0 ? 'Vyzaduje pozornost' : 'Vse v poradku'
              }
              clickable
            />
          </div>
          <div className="dashboard-stat-card--gradient-success">
            <StatCard
              value={registrationsThisMonth}
              label="Nove registrace"
              icon={Icons.userPlus}
              color="success"
              secondaryValue="Tento mesic"
              trend="up"
              trendValue="+50%"
              clickable
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          {/* Content Grid */}
          <div className="dashboard-content-grid">
            {/* Left Column */}
            <div className="dashboard-alerts">
              {/* Alerts Card */}
              <div className="dashboard-section-card">
                <div className="dashboard-section-header">
                  <h2 className="dashboard-section-title">
                    Upozorneni
                    {alerts.length > 0 && (
                      <span className="dashboard-section-badge">{alerts.length}</span>
                    )}
                  </h2>
                  <Button variant="ghost" size="sm">
                    Zobrazit vse
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
              </div>

              {/* Members Table */}
              <div className="dashboard-section-card">
                <div className="dashboard-section-header">
                  <h2 className="dashboard-section-title">Zavodnici</h2>
                  <Button variant="ghost" size="sm">
                    Zobrazit vse
                  </Button>
                </div>
                <div className="dashboard-members-header">
                  <div className="dashboard-members-search">
                    <Input
                      type="search"
                      placeholder="Hledat zavodnika..."
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
              </div>
            </div>

            {/* Right Column */}
            <div className="dashboard-races">
              {/* Upcoming Races */}
              <div className="dashboard-section-card">
                <div className="dashboard-section-header">
                  <h2 className="dashboard-section-title">Nadchazejici zavody</h2>
                  <Button variant="ghost" size="sm">
                    Kalendar
                  </Button>
                </div>
                <div className="dashboard-race-list">
                  {upcomingRaces.map((race) => (
                    <div
                      key={race.id}
                      className={`dashboard-race-item dashboard-race-item--${race.section}`}
                    >
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
              </div>

              {/* Quick Actions */}
              <div className="dashboard-section-card">
                <div className="dashboard-section-header">
                  <h2 className="dashboard-section-title">Rychle akce</h2>
                </div>
                <div className="dashboard-quick-actions">
                  <button className="dashboard-quick-action" type="button">
                    <div className="dashboard-quick-action-icon">{Icons.userPlus}</div>
                    <div className="dashboard-quick-action-text">
                      <p className="dashboard-quick-action-title">
                        Registrovat zavodnika
                      </p>
                      <p className="dashboard-quick-action-description">
                        Pridat noveho clena do oddilu
                      </p>
                    </div>
                    <div className="dashboard-quick-action-arrow">
                      {Icons.arrowRight}
                    </div>
                  </button>
                  <button className="dashboard-quick-action" type="button">
                    <div className="dashboard-quick-action-icon">{Icons.fileText}</div>
                    <div className="dashboard-quick-action-text">
                      <p className="dashboard-quick-action-title">Hromadna prihlaska</p>
                      <p className="dashboard-quick-action-description">
                        Prihlasit zavodniky na zavod
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
                      <p className="dashboard-quick-action-title">Sprava prispevku</p>
                      <p className="dashboard-quick-action-description">
                        Evidovat platby clenu
                      </p>
                    </div>
                    <div className="dashboard-quick-action-arrow">
                      {Icons.arrowRight}
                    </div>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="dashboard-section-card">
                <div className="dashboard-section-header">
                  <h2 className="dashboard-section-title">Posledni aktivita</h2>
                </div>
                <div className="dashboard-activity">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="dashboard-activity-item">
                      <div
                        className={`dashboard-activity-icon dashboard-activity-icon--${activity.type}`}
                      >
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
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>Cesky svaz kanoistu - Registracni a vysledkovy portal</p>
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
# Dashboard spravce

Redesignovany prototyp dashboardu pro spravce oddilu nebo sekce. Obsahuje:

## Nove vizualni prvky (Faze 7.8)
- **Hero sekce** - gradient pozadi s disciplinovym themingem
- **Wave dekorace** - plynuly prechod mezi hero a obsahem
- **Pulse rings** - animovane kruhy v hero sekci
- **Gradient stat cards** - statistiky s gradient pozadim
- **Vylepene karty** - section cards s gradient hlavickou

## Klicove prvky
- **Welcome sekce** - personalizovany pozdrav a rychle akce v hero
- **Statistiky** - gradient karty s klicovymi metrikami
- **Upozorneni** - urgentni polozky s gradient ikonami
- **Tabulka zavodniku** - s filtrovanim a vyhledavanim
- **Nadchazejici zavody** - s discipline-specific barvami
- **Rychle akce** - glass efekt s hover animacemi
- **Posledni aktivita** - feed zmen s barevnymi ikonami

## Role uzivatelu a theming
- **Oddilovy spravce** - primarni modry gradient
- **Sekcni spravce DV** - modry gradient (Divoka voda)
- **Sekcni spravce RY** - zeleny gradient (Rychlost)
- **Sekcni spravce VT** - cerveny gradient (Vodni turistika)
- **Svazovy spravce** - multi-color gradient (vsechny sekce)

## Funkce
- Filtrovani zavodniku dle stavu a sekce
- Vyhledavani zavodniku
- Barevne indikatory stavu
- Responsive layout pro vsechny velikosti obrazovky
- Dark mode podpora
- Reduced motion podpora
        `,
      },
    },
  },
  argTypes: {
    role: {
      control: 'select',
      options: ['club_admin', 'section_admin', 'federation_admin'],
      description: 'Role uzivatele',
    },
    clubName: {
      control: 'text',
      description: 'Nazev oddilu',
    },
    section: {
      control: 'select',
      options: ['dv', 'ry', 'vt'],
      description: 'Sekce (pro sekcniho spravce)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardPage>;

// ============================================================================
// Stories
// ============================================================================

export const ClubAdmin: Story = {
  name: 'Oddilovy spravce',
  args: {
    role: 'club_admin',
    clubName: 'USK Praha',
  },
};

export const SectionAdminDV: Story = {
  name: 'Sekcni spravce - Divoka voda',
  args: {
    role: 'section_admin',
    clubName: 'Sekce Divoka voda',
    section: 'dv',
  },
};

export const SectionAdminRY: Story = {
  name: 'Sekcni spravce - Rychlost',
  args: {
    role: 'section_admin',
    clubName: 'Sekce Rychlost',
    section: 'ry',
  },
};

export const SectionAdminVT: Story = {
  name: 'Sekcni spravce - Vodni turistika',
  args: {
    role: 'section_admin',
    clubName: 'Sekce Vodni turistika',
    section: 'vt',
  },
};

export const FederationAdmin: Story = {
  name: 'Svazovy spravce',
  args: {
    role: 'federation_admin',
    clubName: 'Cesky svaz kanoistu',
  },
};
