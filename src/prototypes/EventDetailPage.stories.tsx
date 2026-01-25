import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Header } from '../components/Header';
import { MainNav } from '../components/Navigation';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Input } from '../components/Input';
import { Tabs } from '../components/Tabs';
import { LiveIndicator } from '../components/LiveIndicator';
import { ResultsTable, type ResultEntry } from '../components/ResultsTable';
import { CSKLogo } from '../components/CSKLogo';
import { KanoeCzContext } from '../components/KanoeCzContext';
import './EventDetailPage.css';

// ============================================================================
// Types
// ============================================================================

type EventStatus = 'upcoming' | 'registration' | 'live' | 'finished';

/** Display variant for the page */
type EventDetailPageVariant = 'standalone' | 'satellite' | 'embed';

/** Visual style variant */
type EventDetailPageStyle = 'default' | 'aesthetic';

interface EventDetailPageProps {
  /** Event status determines the page layout and available sections */
  status?: EventStatus;
  /** Section/discipline for theming */
  section?: 'dv' | 'ry' | 'vt';
  /** Show hero section */
  showHero?: boolean;
  /** Initial active tab */
  initialTab?: string;
  /** Display variant */
  variant?: EventDetailPageVariant;
  /** Visual style - default or aesthetic (Dynamic Sport) */
  style?: EventDetailPageStyle;
  /** Show stats bar in embed mode (default: false for embed, true for satellite) */
  showEmbedStats?: boolean;
  /** Show CTA button in embed hero (default: false for embed, true for satellite) */
  showEmbedCta?: boolean;
  /** Enable expressive "wow" decorations (diagonal stripe, energy glow) */
  expressive?: boolean;
}

// ============================================================================
// Sample Data
// ============================================================================

const eventData = {
  id: 'mcr-slalom-2026',
  title: 'MČR ve slalomu 2026',
  subtitle: 'Mistrovství České republiky v kanoistickém slalomu',
  dates: {
    start: new Date(2026, 4, 3),
    end: new Date(2026, 4, 5),
    registrationDeadline: new Date(2026, 3, 25),
  },
  location: {
    name: 'Praha – Troja',
    venue: 'Vodácký areál Troja',
    address: 'Vodácká 791/8, 171 00 Praha 7',
    coordinates: { lat: 50.1167, lng: 14.4167 },
  },
  organizer: {
    name: 'USK Praha',
    contact: 'zavody@uskpraha.cz',
    phone: '+420 123 456 789',
  },
  discipline: 'Slalom',
  level: 'MČR',
  section: 'dv' as const,
  categories: ['K1M', 'K1W', 'C1M', 'C1W', 'K1MJ', 'K1WJ', 'C1MJ', 'C1WJ'],
  stats: {
    entries: 156,
    clubs: 24,
    gates: 24,
    courseLength: 300,
  },
  schedule: [
    { time: '08:00', day: 1, event: 'Registrace účastníků', category: 'all' },
    { time: '09:00', day: 1, event: 'Tréninkové jízdy', category: 'all' },
    { time: '14:00', day: 1, event: '1. kvalifikační jízda K1M, K1W', category: 'K1' },
    { time: '08:00', day: 2, event: '2. kvalifikační jízda K1M, K1W', category: 'K1' },
    { time: '11:00', day: 2, event: 'Semifinále K1M, K1W', category: 'K1' },
    { time: '14:00', day: 2, event: '1. kvalifikační jízda C1M, C1W', category: 'C1' },
    { time: '08:00', day: 3, event: '2. kvalifikační jízda C1M, C1W', category: 'C1' },
    { time: '11:00', day: 3, event: 'Semifinále C1M, C1W', category: 'C1' },
    { time: '14:00', day: 3, event: 'Finále všech kategorií', category: 'all' },
    { time: '17:00', day: 3, event: 'Vyhlášení výsledků', category: 'all' },
  ],
  documents: [
    { id: 'prop', name: 'Propozice závodu', type: 'pdf', size: '245 KB' },
    { id: 'startlist', name: 'Startovní listina', type: 'pdf', size: '156 KB' },
    { id: 'map', name: 'Mapa areálu', type: 'pdf', size: '1.2 MB' },
    { id: 'results', name: 'Výsledky (PDF)', type: 'pdf', size: '312 KB' },
  ],
};

const generateResults = (category: string): ResultEntry[] => {
  const baseResults: Record<string, ResultEntry[]> = {
    'K1M': [
      { id: 1, rank: 1, name: 'Jiří Prskavec', club: 'USK Praha', category: 'K1M', totalTime: 92.34, timeDiff: 0, section: 'dv' },
      { id: 2, rank: 2, name: 'Vít Přindiš', club: 'USK Praha', category: 'K1M', totalTime: 93.87, timeDiff: 1.53, section: 'dv' },
      { id: 3, rank: 3, name: 'Jakub Krejčí', club: 'Dukla Praha', category: 'K1M', totalTime: 94.21, timeDiff: 1.87, section: 'dv' },
      { id: 4, rank: 4, name: 'Vavřinec Hradilek', club: 'Dukla Praha', category: 'K1M', totalTime: 95.45, timeDiff: 3.11, section: 'dv' },
      { id: 5, rank: 5, name: 'Ondřej Tunka', club: 'SK Trnávka', category: 'K1M', totalTime: 96.12, timeDiff: 3.78, section: 'dv' },
    ],
    'K1W': [
      { id: 101, rank: 1, name: 'Tereza Fišerová', club: 'Dukla Praha', category: 'K1W', totalTime: 98.45, timeDiff: 0, section: 'dv' },
      { id: 102, rank: 2, name: 'Kateřina Minařík Kudějová', club: 'USK Praha', category: 'K1W', totalTime: 99.23, timeDiff: 0.78, section: 'dv' },
      { id: 103, rank: 3, name: 'Antonie Galušková', club: 'Dukla Praha', category: 'K1W', totalTime: 100.56, timeDiff: 2.11, section: 'dv' },
    ],
  };
  return baseResults[category] || baseResults['K1M'];
};

const participants = [
  { id: 1, name: 'Jiří Prskavec', club: 'USK Praha', category: 'K1M', bib: 1, seed: 1 },
  { id: 2, name: 'Vít Přindiš', club: 'USK Praha', category: 'K1M', bib: 2, seed: 2 },
  { id: 3, name: 'Jakub Krejčí', club: 'Dukla Praha', category: 'K1M', bib: 3, seed: 3 },
  { id: 4, name: 'Tereza Fišerová', club: 'Dukla Praha', category: 'K1W', bib: 101, seed: 1 },
  { id: 5, name: 'Kateřina Minařík Kudějová', club: 'USK Praha', category: 'K1W', bib: 102, seed: 2 },
];

// Navigation items
const navItems = [
  { id: 'home', label: 'Domů', href: '#' },
  { id: 'calendar', label: 'Kalendář', href: '#' },
  { id: 'results', label: 'Výsledky', href: '#' },
  { id: 'athletes', label: 'Závodníci', href: '#' },
  { id: 'clubs', label: 'Kluby', href: '#' },
];

// Note: WaveDecoration removed for cleaner design (Phase 8.6.3)
// Note: Inline SVG icons replaced with Icon component (Phase 17.10)

// ============================================================================
// Helper Functions
// ============================================================================

function formatDate(date: Date): string {
  return date.toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatDateRange(start: Date, end: Date): string {
  const startDay = start.getDate();
  const endDay = end.getDate();
  const month = start.toLocaleDateString('cs-CZ', { month: 'long' });
  const year = start.getFullYear();
  return `${startDay}.–${endDay}. ${month} ${year}`;
}

function getStatusBadge(status: EventStatus) {
  switch (status) {
    case 'upcoming':
      return <Badge variant="info">Nadcházející</Badge>;
    case 'registration':
      return <Badge variant="warning">Registrace otevřena</Badge>;
    case 'live':
      return <LiveIndicator variant="live" size="md" label="LIVE" styleVariant="badge" />;
    case 'finished':
      return <Badge variant="success">Dokončeno</Badge>;
  }
}

function getDaysUntil(date: Date): number {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// ============================================================================
// Page Component
// ============================================================================

const EventDetailPage = ({
  status = 'upcoming',
  section = 'dv',
  showHero = true,
  initialTab = 'info',
  variant = 'standalone',
  style = 'default',
  showEmbedStats = false,
  showEmbedCta = false,
  expressive = false,
}: EventDetailPageProps) => {
  // Helper to check if we're in embed mode
  const isEmbed = variant === 'embed';
  const isAesthetic = style === 'aesthetic';
  // For embed mode, allow optional stats bar and CTA
  const showStats = !isEmbed || showEmbedStats;
  const showCta = !isEmbed || showEmbedCta;
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedCategory, setSelectedCategory] = useState('K1M');

  // Determine available tabs based on status
  const getTabs = () => {
    const baseTabs = [
      { id: 'info', label: 'Informace', content: null },
      { id: 'schedule', label: 'Program', content: null },
    ];

    if (status === 'registration' || status === 'upcoming') {
      baseTabs.push({ id: 'participants', label: 'Přihlášení', content: null });
    }

    if (status === 'live' || status === 'finished') {
      baseTabs.push({ id: 'results', label: 'Výsledky', content: null });
    }

    baseTabs.push({ id: 'documents', label: 'Dokumenty', content: null });

    return baseTabs;
  };

  const tabs = getTabs();
  const heroClass = `event-detail-hero event-detail-hero--${section}`;

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className="event-detail-info">
            <div className="event-detail-info__section">
              <h3 className="event-detail-info__title">O závodě</h3>
              <p className="event-detail-info__text">
                Mistrovství České republiky v kanoistickém slalomu je vrcholná domácí soutěž,
                která každoročně přiláká nejlepší české vodní slalomáře. Závod se koná na
                olympijském kanálu v Praze-Troji, který je považován za jednu z nejnáročnějších
                tratí na světě.
              </p>
            </div>

            <div className="event-detail-info__section">
              <h3 className="event-detail-info__title">Místo konání</h3>
              <Card variant="outlined" padding="md" className="event-detail-info__location-card">
                <div className="event-detail-info__location">
                  <div className="event-detail-info__location-icon">
                    <Icon name="map" size="sm" />
                  </div>
                  <div className="event-detail-info__location-details">
                    <div className="event-detail-info__location-name">{eventData.location.venue}</div>
                    <div className="event-detail-info__location-address">{eventData.location.address}</div>
                    <a href="#" className="event-detail-info__location-link">
                      Zobrazit na mapě <Icon name="external-link" size={14} />
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            <div className="event-detail-info__section">
              <h3 className="event-detail-info__title">Kategorie</h3>
              <div className="event-detail-info__categories">
                {eventData.categories.map((cat) => (
                  <Badge key={cat} variant="default" size="md">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="event-detail-info__section">
              <h3 className="event-detail-info__title">Organizátor</h3>
              <Card variant="outlined" padding="md">
                <div className="event-detail-info__organizer">
                  <div className="event-detail-info__organizer-name">{eventData.organizer.name}</div>
                  <div className="event-detail-info__organizer-contact">
                    <a href={`mailto:${eventData.organizer.contact}`}>{eventData.organizer.contact}</a>
                    <span> · </span>
                    <a href={`tel:${eventData.organizer.phone}`}>{eventData.organizer.phone}</a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="event-detail-schedule">
            <div className="event-detail-schedule__days">
              {[1, 2, 3].map((day) => (
                <div key={day} className="event-detail-schedule__day">
                  <h3 className="event-detail-schedule__day-title">
                    {day}. den – {new Date(eventData.dates.start.getTime() + (day - 1) * 24 * 60 * 60 * 1000).toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'numeric' })}
                  </h3>
                  <div className="event-detail-schedule__events">
                    {eventData.schedule
                      .filter((item) => item.day === day)
                      .map((item, index) => (
                        <div key={index} className="event-detail-schedule__event">
                          <span className="event-detail-schedule__time">{item.time}</span>
                          <span className="event-detail-schedule__name">{item.event}</span>
                          {item.category !== 'all' && (
                            <Badge variant="default" size="sm">{item.category}</Badge>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'participants':
        return (
          <div className="event-detail-participants">
            <div className="event-detail-participants__header">
              <div className="event-detail-participants__count">
                <strong>{eventData.stats.entries}</strong> přihlášených závodníků z <strong>{eventData.stats.clubs}</strong> klubů
              </div>
              <div className="event-detail-participants__filter">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="event-detail-participants__select"
                >
                  {eventData.categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            <Card variant="surface" padding="none">
              <table className="event-detail-participants__table">
                <thead>
                  <tr>
                    <th>St. č.</th>
                    <th>Jméno</th>
                    <th>Klub</th>
                    <th>Nasazení</th>
                  </tr>
                </thead>
                <tbody>
                  {participants
                    .filter((p) => p.category === selectedCategory)
                    .map((participant) => (
                      <tr key={participant.id}>
                        <td className="event-detail-participants__bib">{participant.bib}</td>
                        <td className="event-detail-participants__name">{participant.name}</td>
                        <td className="event-detail-participants__club">{participant.club}</td>
                        <td className="event-detail-participants__seed">{participant.seed}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Card>
          </div>
        );

      case 'results':
        return (
          <div className="event-detail-results">
            <div className="event-detail-results__header">
              <Tabs
                tabs={eventData.categories.slice(0, 4).map((cat) => ({
                  id: cat,
                  label: cat,
                  content: null,
                }))}
                activeTab={selectedCategory}
                onChange={setSelectedCategory}
                variant="pills"
                size="sm"
              />
            </div>
            <ResultsTable
              results={generateResults(selectedCategory)}
              variant="striped"
              styleVariant={isEmbed ? 'embed' : 'gradient'}
              size="md"
              showTimeDiff
              showClub
              showPodiumHighlights
              stickyHeader
            />
          </div>
        );

      case 'documents':
        return (
          <div className="event-detail-documents">
            <div className="event-detail-documents__list">
              {eventData.documents
                .filter((doc) => {
                  if (status === 'upcoming' || status === 'registration') {
                    return doc.id !== 'results';
                  }
                  return true;
                })
                .map((doc) => (
                  <Card
                    key={doc.id}
                    variant="outlined"
                    padding="md"
                    clickable
                    className="event-detail-documents__item"
                  >
                    <div className="event-detail-documents__icon">
                      <Icon name="file" size="sm" />
                    </div>
                    <div className="event-detail-documents__info">
                      <div className="event-detail-documents__name">{doc.name}</div>
                      <div className="event-detail-documents__meta">
                        {doc.type.toUpperCase()} · {doc.size}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" iconLeft={<Icon name="download" size="sm" />}>
                      Stáhnout
                    </Button>
                  </Card>
                ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Render header based on variant
  const renderHeader = () => {
    if (isEmbed) {
      return null;
    }

    if (variant === 'satellite') {
      return (
        <Header
          variant="satellite"
          size="sm"
          bordered
          brand={<CSKLogo />}
          appName="Detail závodu"
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
          <a href="#" className="event-detail-page__logo">
            <span className="event-detail-page__logo-text">CSK</span>
            <span className="event-detail-page__logo-subtitle">Český svaz kanoistů</span>
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

  // Build page class names
  const pageClasses = [
    'event-detail-page',
    isEmbed && 'event-detail-page--embed',
    isAesthetic && 'event-detail-page--aesthetic',
    expressive && 'event-detail-page--expressive',
  ].filter(Boolean).join(' ');

  const content = (
    <div className={pageClasses}>
      {/* Header */}
      {renderHeader()}

      {/* Hero Section */}
      {showHero && (
        <section className={heroClass}>
          <div className="event-detail-hero__background">
            <div className="event-detail-hero__gradient" />
            <div className="event-detail-hero__pattern" />
            {expressive && (
              <>
                <div className="event-detail-hero__diagonal-stripe" />
                <div className="event-detail-hero__grain" />
              </>
            )}
          </div>
          <div className="event-detail-hero__content">
            {!isEmbed && (
              <div className="event-detail-hero__breadcrumb">
                <a href="#">Kalendář</a>
                <span className="event-detail-hero__breadcrumb-separator">/</span>
                <a href="#">2026</a>
                <span className="event-detail-hero__breadcrumb-separator">/</span>
                <span>{eventData.title}</span>
              </div>
            )}

            <div className="event-detail-hero__header">
              <div className="event-detail-hero__badges">
                <Badge section={section} size="md">{section.toUpperCase()}</Badge>
                <Badge variant="default">{eventData.level}</Badge>
                {getStatusBadge(status)}
              </div>
              <h1 className="event-detail-hero__title">{eventData.title}</h1>
              {!isEmbed && (
                <p className="event-detail-hero__subtitle">{eventData.subtitle}</p>
              )}
            </div>

            <div className="event-detail-hero__meta">
              <span className="event-detail-hero__meta-item">
                <Icon name="calendar" size="sm" />
                {formatDateRange(eventData.dates.start, eventData.dates.end)}
              </span>
              <span className="event-detail-hero__meta-item">
                <Icon name="location" size="sm" />
                {eventData.location.name}
              </span>
              <span className="event-detail-hero__meta-item">
                <Icon name="users" size="sm" />
                {eventData.stats.entries} závodníků
              </span>
            </div>

            {/* Status-specific CTA */}
            {status === 'registration' && showCta && (
              <div className={`event-detail-hero__cta ${isEmbed ? 'event-detail-hero__cta--compact' : ''}`}>
                <Button variant="primary" size={isEmbed ? 'md' : 'lg'}>
                  Přihlásit se na závod
                </Button>
                <span className="event-detail-hero__deadline">
                  <Icon name="clock" size="sm" />
                  Deadline: {formatDate(eventData.dates.registrationDeadline)}
                </span>
              </div>
            )}

            {status === 'live' && showCta && (
              <div className={`event-detail-hero__cta ${isEmbed ? 'event-detail-hero__cta--compact' : ''}`}>
                <Button variant="primary" size={isEmbed ? 'md' : 'lg'}>
                  Sledovat LIVE výsledky
                </Button>
              </div>
            )}
          </div>
          {/* Note: WaveDecoration removed for cleaner design (Phase 8.6.3) */}
        </section>
      )}

      {/* Stats Bar */}
      {showStats && (
        <section className={`event-detail-stats ${isEmbed ? 'event-detail-stats--embed' : ''}`}>
          <div className="event-detail-stats__container">
            <div className="event-detail-stats__item">
              <span className="event-detail-stats__value">{eventData.stats.entries}</span>
              <span className="event-detail-stats__label">závodníků</span>
            </div>
            <div className="event-detail-stats__item">
              <span className="event-detail-stats__value">{eventData.stats.clubs}</span>
              <span className="event-detail-stats__label">klubů</span>
            </div>
            <div className="event-detail-stats__item">
              <span className="event-detail-stats__value">{eventData.stats.gates}</span>
              <span className="event-detail-stats__label">branek</span>
            </div>
            <div className="event-detail-stats__item">
              <span className="event-detail-stats__value">{eventData.stats.courseLength}m</span>
              <span className="event-detail-stats__label">délka tratě</span>
            </div>
          </div>
        </section>
      )}

      {/* Main content */}
      <main className="event-detail-page__main">
        <div className="event-detail-page__container">
          <div className="event-detail-page__content">
            {/* Tabs */}
            <div className="event-detail-page__tabs">
              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onChange={setActiveTab}
                variant="line"
                size="md"
              />
            </div>

            {/* Tab Content */}
            <div className="event-detail-page__tab-content">
              {renderTabContent()}
            </div>
          </div>

          {/* Sidebar - only in non-embed mode */}
          {!isEmbed && (
            <aside className="event-detail-page__sidebar">
              {/* Quick Info */}
              <Card variant="surface" className="event-detail-sidebar__card">
                <h3 className="event-detail-sidebar__title">Rychlé informace</h3>
                <div className="event-detail-sidebar__list">
                  <div className="event-detail-sidebar__item">
                    <span className="event-detail-sidebar__label">Disciplína</span>
                    <span className="event-detail-sidebar__value">{eventData.discipline}</span>
                  </div>
                  <div className="event-detail-sidebar__item">
                    <span className="event-detail-sidebar__label">Úroveň</span>
                    <span className="event-detail-sidebar__value">{eventData.level}</span>
                  </div>
                  <div className="event-detail-sidebar__item">
                    <span className="event-detail-sidebar__label">Sekce</span>
                    <span className="event-detail-sidebar__value">
                      <Badge section={section} size="sm">{section.toUpperCase()}</Badge>
                    </span>
                  </div>
                  {status === 'upcoming' && (
                    <div className="event-detail-sidebar__item event-detail-sidebar__item--highlight">
                      <span className="event-detail-sidebar__label">Zbývá</span>
                      <span className="event-detail-sidebar__value">
                        {getDaysUntil(eventData.dates.start)} dní
                      </span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Registration CTA */}
              {status === 'registration' && (
                <Card variant="aesthetic" className="event-detail-sidebar__card event-detail-sidebar__card--cta">
                  <h3 className="event-detail-sidebar__title">Přihlášky</h3>
                  <p className="event-detail-sidebar__text">
                    Registrace je otevřena do {formatDate(eventData.dates.registrationDeadline)}
                  </p>
                  <Button variant="secondary" size="md" fullWidth>
                    Přihlásit závodníka
                  </Button>
                </Card>
              )}

              {/* Location */}
              <Card variant="surface" className="event-detail-sidebar__card">
                <h3 className="event-detail-sidebar__title">Místo konání</h3>
                <div className="event-detail-sidebar__location">
                  <div className="event-detail-sidebar__location-name">{eventData.location.venue}</div>
                  <div className="event-detail-sidebar__location-address">{eventData.location.address}</div>
                  <Button variant="ghost" size="sm" iconLeft={<Icon name="map" size="sm" />}>
                    Zobrazit mapu
                  </Button>
                </div>
              </Card>

              {/* Contact */}
              <Card variant="surface" className="event-detail-sidebar__card">
                <h3 className="event-detail-sidebar__title">Kontakt</h3>
                <div className="event-detail-sidebar__contact">
                  <div className="event-detail-sidebar__contact-name">{eventData.organizer.name}</div>
                  <a href={`mailto:${eventData.organizer.contact}`} className="event-detail-sidebar__contact-link">
                    {eventData.organizer.contact}
                  </a>
                </div>
              </Card>
            </aside>
          )}
        </div>
      </main>

      {/* Footer - only in non-embed mode */}
      {!isEmbed && (
        <footer className="event-detail-page__footer">
          <div className="event-detail-page__footer-content">
            <p>© 2026 Český svaz kanoistů. Všechna práva vyhrazena.</p>
          </div>
        </footer>
      )}
    </div>
  );

  return content;
};

// ============================================================================
// Storybook Meta
// ============================================================================

const meta = {
  title: 'Prototypes/Event Detail Page',
  component: EventDetailPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Prototyp stránky detailu závodu CSK. Zobrazuje informace o závodě s různými stavy: nadcházející, registrace otevřena, probíhá (LIVE) a dokončeno.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['upcoming', 'registration', 'live', 'finished'],
      description: 'Event status determines available sections and CTA',
    },
    section: {
      control: 'select',
      options: ['dv', 'ry', 'vt'],
      description: 'Section/discipline for hero theming',
    },
    showHero: {
      control: 'boolean',
      description: 'Show hero section',
    },
    initialTab: {
      control: 'select',
      options: ['info', 'schedule', 'participants', 'results', 'documents'],
      description: 'Initial active tab',
    },
    variant: {
      control: 'select',
      options: ['standalone', 'satellite', 'embed'],
      description: 'Display variant for different integration contexts',
    },
    style: {
      control: 'select',
      options: ['default', 'aesthetic'],
      description: 'Visual style - default or aesthetic (Dynamic Sport)',
    },
    showEmbedStats: {
      control: 'boolean',
      description: 'Show stats bar in embed mode',
    },
    showEmbedCta: {
      control: 'boolean',
      description: 'Show CTA button in embed hero',
    },
    expressive: {
      control: 'boolean',
      description: 'Enable expressive "wow" decorations (diagonal stripe, grain texture)',
    },
  },
} satisfies Meta<typeof EventDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Phase 16.1: Consolidated Variants - Embed/Satellite/Expressive (all Aesthetic)
// Use Storybook Controls to change status, section, and initialTab
// ============================================================================

/**
 * Embed varianta pro vložení do kanoe.cz.
 * Aesthetic styl, bez vlastního headeru a footeru.
 */
export const Embed: Story = {
  name: 'Embed',
  args: {
    status: 'finished',
    section: 'dv',
    showHero: true,
    initialTab: 'results',
    variant: 'embed',
    style: 'aesthetic',
    showEmbedStats: false,
    showEmbedCta: false,
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="full"
        pageVariant="detail"
        pageTitle="MČR ve slalomu 2026"
        breadcrumbs={[
          { label: 'Domů', href: '#' },
          { label: 'Kalendář', href: '#' },
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
        story: `
**Embed varianta** pro vložení do kanoe.cz kontextu:
- Aesthetic styl (display fonts, energy accents, mesh backgrounds)
- Bez vlastního headeru a footeru
- Kompaktní hero a layout
- Použijte Controls pro změnu status (upcoming/registration/live/finished)
        `,
      },
    },
  },
};

/**
 * Satellite varianta pro standalone aplikace.
 * Aesthetic styl, minimální header s odkazem na kanoe.cz.
 */
export const Satellite: Story = {
  name: 'Satellite',
  args: {
    status: 'live',
    section: 'dv',
    showHero: true,
    initialTab: 'results',
    variant: 'satellite',
    style: 'aesthetic',
  },
  parameters: {
    docs: {
      description: {
        story: `
**Satellite varianta** pro standalone aplikace:
- Aesthetic styl (display fonts, energy accents, mesh backgrounds)
- Minimální header s odkazem zpět na kanoe.cz
- Vlastní footer a sidebar
- Použijte Controls pro změnu status a initialTab
        `,
      },
    },
  },
};

/**
 * Expressive Embed varianta - plný "wow" detail závodu v kanoe.cz kontextu.
 * Aesthetic styl s dramatickými efekty.
 */
export const ExpressiveEmbed: Story = {
  name: 'Expressive Embed',
  args: {
    status: 'registration',
    section: 'dv',
    showHero: true,
    initialTab: 'info',
    variant: 'embed',
    style: 'aesthetic',
    showEmbedStats: true,
    showEmbedCta: true,
    expressive: true,
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="full"
        pageVariant="detail"
        pageTitle="MČR ve slalomu 2026"
        breadcrumbs={[
          { label: 'Domů', href: '#' },
          { label: 'Kalendář', href: '#' },
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
        story: `
**Expressive Embed varianta** - plný "wow" detail závodu v kanoe.cz kontextu:
- Aesthetic styl (display fonts, energy accents, mesh backgrounds)
- Vložené do kanoe.cz layoutu
- Dramatický hero s CTA
- Stats bar
- Staggered reveal animace
- Použijte Controls pro změnu status (upcoming/registration/live/finished), sekce a záložky
        `,
      },
    },
  },
};
