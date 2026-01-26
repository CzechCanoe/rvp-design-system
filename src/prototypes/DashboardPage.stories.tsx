import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Header } from '../components/Header';
import { MainNav } from '../components/Navigation';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Icon } from '../components/Icon';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { StatCard } from '../components/StatCard';
import { Table, type ColumnDef } from '../components/Table';
import { Avatar } from '../components/Avatar';
import { LiveIndicator } from '../components/LiveIndicator';
import { CSKLogo } from '../components/CSKLogo';
import { KanoeCzContext } from '../components/KanoeCzContext';
import { ListItem } from '../components/ListItem';
import { ActionCard } from '../components/ActionCard';
import './DashboardPage.css';

// ============================================================================
// Types
// ============================================================================

/** Display variant for the page */
type DashboardPageVariant = 'standalone' | 'satellite' | 'embed';

interface DashboardPageProps {
  /** User role */
  role?: 'club_admin' | 'section_admin' | 'federation_admin';
  /** Club name (for club admin) */
  clubName?: string;
  /** Section (for section admin) */
  section?: 'dv' | 'ry' | 'vt';
  /** Display variant - standalone (full header), satellite (minimal header) */
  variant?: DashboardPageVariant;
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

// Note: getHeroSectionClass removed - hero section cleaned (Phase 8.6.3)

// ============================================================================
// CSK Logo Component (for satellite header)
// ============================================================================

// Note: Icons migrated to Icon component (Phase 17.11)
// Note: WaveSVG and pulse rings removed for cleaner design (Phase 8.6.3)

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
  variant = 'standalone',
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
    const iconNames = {
      registration: 'user-plus' as const,
      payment: 'credit-card' as const,
      medical: 'medical' as const,
      race: 'trophy' as const,
      transfer: 'transfer' as const,
    };
    return <Icon name={iconNames[type]} size="sm" />;
  };

  const activeAthletesCount = members.filter((m) => m.rightToStart).length;
  const inactiveAthletesCount = members.filter((m) => !m.rightToStart).length;
  const registrationsThisMonth = 3;

  // Render header based on variant
  const renderHeader = () => {
    // Embed variant: no header (uses host page layout)
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
          appName="Dashboard"
          homeLink="https://kanoe.cz"
          homeLinkLabel="kanoe.cz"
          userMenu={
            <Button variant="ghost" size="sm">
              Jan Spravce
            </Button>
          }
        />
      );
    }
    // Default: standalone with full navigation
    return (
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
    );
  };

  // Render page header based on variant
  const renderPageHeader = () => {
    // Embed variant: compact header integrated with content
    if (variant === 'embed') {
      return (
        <section className="dashboard-page-header dashboard-page-header--embed">
          <div className="dashboard-page-header__content">
            <div className="dashboard-page-header__row">
              <div className="dashboard-page-header__info">
                <h2 className="dashboard-page-header__title">{clubName}</h2>
                <p className="dashboard-page-header__meta">
                  <span className="dashboard-page-header__badge">
                    {getRoleLabel(role)}
                  </span>
                  {section && (
                    <Badge section={section} size="sm">
                      {getSectionLabel(section)}
                    </Badge>
                  )}
                </p>
              </div>
              <div className="dashboard-page-header__actions">
                <Button variant="secondary" size="sm">
                  Exportovat
                </Button>
                <Button variant="primary" size="sm">
                  + Novy zavodnik
                </Button>
              </div>
            </div>
          </div>
        </section>
      );
    }
    if (variant === 'satellite') {
      return (
        <section className="dashboard-page-header dashboard-page-header--satellite">
          <div className="dashboard-page-header__content">
            <div className="dashboard-page-header__breadcrumb">
              <a href="https://kanoe.cz" className="dashboard-page-header__breadcrumb-link">Domů</a>
              <span className="dashboard-page-header__breadcrumb-separator">/</span>
              <span>Dashboard</span>
            </div>
            <div className="dashboard-page-header__row">
              <div className="dashboard-page-header__info">
                <h1 className="dashboard-page-header__title">{clubName}</h1>
                <p className="dashboard-page-header__meta">
                  <span className="dashboard-page-header__badge">
                    {getRoleLabel(role)}
                  </span>
                  {section && (
                    <Badge section={section} size="sm">
                      {getSectionLabel(section)}
                    </Badge>
                  )}
                </p>
              </div>
              <div className="dashboard-page-header__actions">
                <Button variant="secondary" size="sm">
                  Exportovat
                </Button>
                <Button variant="primary" size="sm">
                  + Novy zavodnik
                </Button>
              </div>
            </div>
          </div>
        </section>
      );
    }
    // Default: standalone page header
    return (
      <section className={`dashboard-page-header dashboard-page-header--${section || 'default'}`}>
        <div className="dashboard-page-header__content">
          <div className="dashboard-page-header__welcome">
            <p className="dashboard-page-header__greeting">Dobry den, Jane</p>
            <h1 className="dashboard-page-header__title">{clubName}</h1>
            <p className="dashboard-page-header__subtitle">
              <span className="dashboard-page-header__badge">
                {getRoleLabel(role)}
              </span>
              {section && (
                <Badge section={section} size="sm">
                  {getSectionLabel(section)}
                </Badge>
              )}
            </p>
          </div>
          <div className="dashboard-page-header__actions">
            <Button variant="secondary" size="md">
              Exportovat
            </Button>
            <Button variant="primary" size="md">
              + Novy zavodnik
            </Button>
          </div>
        </div>
      </section>
    );
  };

  const pageClassName = [
    'dashboard-page',
    variant === 'satellite' && 'dashboard-page--satellite',
    variant === 'embed' && 'dashboard-page--embed',
  ].filter(Boolean).join(' ');

  return (
    <div className={pageClassName}>
      {/* Header */}
      {renderHeader()}

      {/* Page Header */}
      {renderPageHeader()}

      {/* Stats Grid - using StatCard colorVariant prop */}
      <div className="dashboard-stats-section">
        <div className="dashboard-stats-grid">
          <StatCard
            value={activeAthletesCount}
            label="Aktivni zavodnici"
            icon={<Icon name="users" />}
            colorVariant="gradient-primary"
            trend="up"
            trendValue="+2"
            secondaryValue={`${members.length} celkem`}
            clickable
          />
          <StatCard
            value={upcomingRaces.length}
            label="Nadchazejici zavody"
            icon={<Icon name="calendar" />}
            colorVariant="gradient-info"
            secondaryValue="Nejblizsi za 6 dni"
            clickable
          />
          <StatCard
            value={inactiveAthletesCount}
            label="Bez prava startu"
            icon={<Icon name="clock" />}
            colorVariant={inactiveAthletesCount > 0 ? 'gradient-warning' : 'gradient-success'}
            description={
              inactiveAthletesCount > 0 ? 'Vyzaduje pozornost' : 'Vse v poradku'
            }
            clickable
          />
          <StatCard
            value={registrationsThisMonth}
            label="Nove registrace"
            icon={<Icon name="user-plus" />}
            colorVariant="gradient-success"
            secondaryValue="Tento mesic"
            trend="up"
            trendValue="+50%"
            clickable
          />
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
              <Card variant="surface" padding="none" className="dashboard-section-card">
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
                    <ListItem
                      key={alert.id}
                      icon={
                        alert.type === 'warning' ? <Icon name="warning" size="sm" /> :
                        alert.type === 'danger' ? <Icon name="danger" size="sm" /> :
                        <Icon name="info" size="sm" />
                      }
                      type={alert.type}
                      variant="alert"
                      title={alert.title}
                      description={alert.description}
                      action={alert.actionLabel && (
                        <Button variant="ghost" size="sm">
                          {alert.actionLabel}
                        </Button>
                      )}
                      divider
                    />
                  ))}
                </div>
              </Card>

              {/* Members Table */}
              <Card variant="surface" padding="none" className="dashboard-section-card">
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
              </Card>
            </div>

            {/* Right Column */}
            <div className="dashboard-races">
              {/* Upcoming Races */}
              <Card variant="surface" padding="none" className="dashboard-section-card">
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
                          {race.isLive && <LiveIndicator size="sm" energyGlow />}
                        </div>
                        <p className="dashboard-race-location">{race.location}</p>
                        <div className="dashboard-race-meta">
                          <Badge section={race.section} size="sm">
                            {getSectionLabel(race.section)}
                          </Badge>
                          <span className="dashboard-race-meta-item">
                            <Icon name="users" size="sm" />
                            {race.registeredAthletes}/{race.totalSlots}
                          </span>
                          <span className="dashboard-race-meta-item">
                            <Icon name="clock" size="sm" />
                            do {formatDate(race.deadline)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions - using ActionCard component */}
              <Card variant="surface" padding="none" className="dashboard-section-card">
                <div className="dashboard-section-header">
                  <h2 className="dashboard-section-title">Rychle akce</h2>
                </div>
                <div className="dashboard-quick-actions">
                  <ActionCard
                    icon={<Icon name="user-plus" />}
                    title="Registrovat zavodnika"
                    description="Pridat noveho clena do oddilu"
                    iconBackground="primary"
                    onClick={() => {}}
                  />
                  <ActionCard
                    icon={<Icon name="file-text" />}
                    title="Hromadna prihlaska"
                    description="Prihlasit zavodniky na zavod"
                    iconBackground="info"
                    onClick={() => {}}
                  />
                  <ActionCard
                    icon={<Icon name="credit-card" />}
                    title="Sprava prispevku"
                    description="Evidovat platby clenu"
                    iconBackground="success"
                    onClick={() => {}}
                  />
                </div>
              </Card>

              {/* Recent Activity */}
              <Card variant="surface" padding="none" className="dashboard-section-card">
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
              </Card>
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
# Dashboard správce

Aesthetic prototyp dashboardu pro správce oddílu nebo sekce. Dvě varianty:
- **Embed** - vložený do kanoe.cz layoutu
- **Satellite** - standalone s minimálním headerem

## Klíčové prvky
- **Page header** - personalizovaný pozdrav a rychlé akce
- **Statistiky** - gradient karty s klíčovými metrikami
- **Upozornění** - urgentní položky s akcemi
- **Tabulka závodníků** - s filtrováním a vyhledáváním
- **Nadcházející závody** - s discipline-specific barvami
- **Rychlé akce** - hover animace
- **Poslední aktivita** - feed změn

## Role uživatelů
- \`club_admin\` - Oddílový správce
- \`section_admin\` - Sekční správce (DV/RY/VT)
- \`federation_admin\` - Svazový správce
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['embed', 'satellite'],
      description: 'Display variant',
    },
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
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Story Variants (2 aesthetic variants: Embed, Satellite)
// ============================================================================

/**
 * **EMBED varianta** - Dashboard vložený do kanoe.cz layoutu.
 *
 * Aesthetic design pro interní správu:
 * - Gradient stat karty s metrikami
 * - Upozornění a urgentní položky
 * - Tabulka závodníků s filtrováním
 * - Nadcházející závody s discipline barvami
 * - Rychlé akce a aktivita feed
 *
 * Bez vlastního headeru/footeru - používá layout hostitelské stránky.
 *
 * **Role:** `role` = club_admin / section_admin / federation_admin
 * **Sekce:** `section` = dv (modrá) / ry (zelená) / vt (červená)
 */
export const Embed: Story = {
  args: {
    variant: 'embed',
    role: 'club_admin',
    clubName: 'USK Praha',
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="full"
        pageVariant="detail"
        pageTitle="Dashboard - USK Praha"
        breadcrumbs={[
          { label: 'Úvod', href: '#' },
          { label: 'Správa', href: '#' },
          { label: 'Dashboard' },
        ]}
      >
        <Story />
      </KanoeCzContext>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Dashboard embedovaný v kontextu kanoe.cz. Bez vlastního headeru/footeru - používá layout hostitelské stránky.',
      },
    },
  },
};

/**
 * **SATELLITE varianta** - Standalone dashboard s minimálním headerem.
 *
 * Aesthetic design pro interní správu:
 * - Satellite header s CSK brandingem
 * - Breadcrumb navigace zpět na kanoe.cz
 * - Gradient stat karty s metrikami
 * - Upozornění a urgentní položky
 * - Tabulka závodníků s filtrováním
 *
 * Standalone aplikace s odkazem zpět na kanoe.cz.
 *
 * **Role:** `role` = club_admin / section_admin / federation_admin
 * **Sekce:** `section` = dv (modrá) / ry (zelená) / vt (červená)
 */
export const Satellite: Story = {
  args: {
    variant: 'satellite',
    role: 'club_admin',
    clubName: 'USK Praha',
  },
  parameters: {
    docs: {
      description: {
        story: 'Standalone dashboard s Aesthetic designem. Obsahuje satellite header s odkazem na kanoe.cz.',
      },
    },
  },
};
