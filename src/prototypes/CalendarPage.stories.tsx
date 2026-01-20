import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { MainNav } from '../components/Navigation';
import { Calendar, type CalendarEvent } from '../components/Calendar';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Tabs } from '../components/Tabs';
import { LiveIndicator } from '../components/LiveIndicator';
import { EmptyState } from '../components/EmptyState';
import { KanoeCzContext } from '../components/KanoeCzContext';
import './CalendarPage.css';

// ============================================================================
// Page Component
// ============================================================================

/** Display variant for the page */
type CalendarPageVariant = 'standalone' | 'satellite' | 'embed';

interface CalendarPageProps {
  /** Initial section filter */
  initialSection?: 'all' | 'dv' | 'ry' | 'vt';
  /** Show live races */
  showLive?: boolean;
  /** Show hero section */
  showHero?: boolean;
  /** Display variant */
  variant?: CalendarPageVariant;
}

// Sample race data
const generateRaces = (year: number, month: number): CalendarEvent[] => {
  return [
    // DV - Divoká voda (Whitewater)
    {
      id: 'dv-mcr',
      title: 'MČR ve slalomu',
      start: new Date(year, month, 3),
      end: new Date(year, month, 5),
      section: 'dv',
      data: {
        location: 'Praha - Troja',
        discipline: 'Slalom',
        level: 'MČR',
        entries: 156,
        isLive: month === new Date().getMonth() && new Date().getDate() >= 3 && new Date().getDate() <= 5,
      },
    },
    {
      id: 'dv-cp1',
      title: 'Český pohár #1',
      start: new Date(year, month, 10),
      end: new Date(year, month, 11),
      section: 'dv',
      data: {
        location: 'Trnávka',
        discipline: 'Slalom',
        level: 'ČP',
        entries: 98,
      },
    },
    {
      id: 'dv-cp2',
      title: 'Český pohár #2',
      start: new Date(year, month, 17),
      end: new Date(year, month, 18),
      section: 'dv',
      data: {
        location: 'Praha - Troja',
        discipline: 'Slalom + Sjezd',
        level: 'ČP',
        entries: 112,
      },
    },
    {
      id: 'dv-nominace',
      title: 'Nominace na MS',
      start: new Date(year, month, 24),
      end: new Date(year, month, 25),
      section: 'dv',
      data: {
        location: 'Praha - Troja',
        discipline: 'Slalom',
        level: 'Nominace',
        entries: 42,
      },
    },

    // RY - Rychlostní kanoistika (Sprint/Marathon)
    {
      id: 'ry-regata',
      title: 'Regata Račice',
      start: new Date(year, month, 8),
      end: new Date(year, month, 9),
      section: 'ry',
      data: {
        location: 'Račice',
        discipline: 'Sprint',
        level: 'MČR',
        entries: 234,
      },
    },
    {
      id: 'ry-maraton',
      title: 'Český maraton',
      start: new Date(year, month, 22),
      section: 'ry',
      data: {
        location: 'Slapy',
        discipline: 'Maraton',
        level: 'MČR',
        entries: 89,
      },
    },

    // VT - Vodní turistika (Touring)
    {
      id: 'vt-vltava',
      title: 'Sjíždění Vltavy',
      start: new Date(year, month, 6),
      end: new Date(year, month, 7),
      section: 'vt',
      data: {
        location: 'Vyšší Brod - Boršov',
        discipline: 'Turistika',
        level: 'Veřejný',
        entries: 456,
      },
    },
    {
      id: 'vt-sazava',
      title: 'Vodácký víkend Sázava',
      start: new Date(year, month, 20),
      end: new Date(year, month, 21),
      section: 'vt',
      data: {
        location: 'Sázava',
        discipline: 'Turistika',
        level: 'Veřejný',
        entries: 178,
      },
    },

    // Administrative events
    {
      id: 'admin-deadline',
      title: 'Deadline přihlášek MČR',
      start: new Date(year, month, 1),
      variant: 'warning',
      data: {
        type: 'deadline',
      },
    },
    {
      id: 'admin-meeting',
      title: 'Valná hromada CSK',
      start: new Date(year, month, 15),
      variant: 'info',
      data: {
        location: 'Praha',
        type: 'meeting',
      },
    },
  ];
};

const sectionNames: Record<string, string> = {
  dv: 'Divoká voda',
  ry: 'Rychlostní',
  vt: 'Vodní turistika',
};

const sectionShortNames: Record<string, string> = {
  dv: 'DV',
  ry: 'RY',
  vt: 'VT',
};

// Navigation items
const navItems = [
  { id: 'home', label: 'Domů', href: '#' },
  { id: 'calendar', label: 'Kalendář', href: '#', active: true },
  { id: 'results', label: 'Výsledky', href: '#' },
  { id: 'athletes', label: 'Závodníci', href: '#' },
  { id: 'clubs', label: 'Kluby', href: '#' },
];

// Search icon
const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

// Location icon
const LocationIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// Calendar icon
const CalendarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// Users icon
const UsersIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// Arrow right icon
const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// Trophy icon
const TrophyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

// Star icon
const StarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// Wave decoration component
const WaveDecoration = ({ className = '' }: { className?: string }) => (
  <svg
    className={`calendar-page-wave ${className}`}
    viewBox="0 0 1440 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path
      d="M0 50C240 20 480 80 720 50C960 20 1200 80 1440 50V100H0V50Z"
      fill="currentColor"
    />
  </svg>
);

// CSK Logo component for satellite header
const CSKLogo = () => (
  <span className="prototype-calendar-page__logo">
    <span className="prototype-calendar-page__logo-text">CSK</span>
  </span>
);

const CalendarPage = ({ initialSection = 'all', showLive = true, showHero = true, variant = 'standalone' }: CalendarPageProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSection, setSelectedSection] = useState<string>(initialSection);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Generate races for current month
  const allRaces = useMemo(() => {
    return generateRaces(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  // Filter races by section and search query
  const filteredRaces = useMemo(() => {
    return allRaces.filter((race) => {
      // Section filter
      if (selectedSection !== 'all' && race.section !== selectedSection) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = race.title.toLowerCase().includes(query);
        const matchesLocation = (race.data?.location as string)?.toLowerCase().includes(query);
        return matchesTitle || matchesLocation;
      }

      return true;
    });
  }, [allRaces, selectedSection, searchQuery]);

  // Get upcoming races (sorted by date)
  const upcomingRaces = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return filteredRaces
      .filter((race) => race.start >= today || (race.end && race.end >= today))
      .sort((a, b) => a.start.getTime() - b.start.getTime())
      .slice(0, 5);
  }, [filteredRaces]);

  // Get featured events (MČR and Nominace)
  const featuredEvents = useMemo(() => {
    return allRaces
      .filter((race) => race.data?.level === 'MČR' || race.data?.level === 'Nominace')
      .slice(0, 3);
  }, [allRaces]);

  // Section tabs
  const sectionTabs = [
    { id: 'all', label: 'Všechny sekce' },
    { id: 'dv', label: 'Divoká voda' },
    { id: 'ry', label: 'Rychlostní' },
    { id: 'vt', label: 'Vodní turistika' },
  ];

  // Format date range
  const formatDateRange = (start: Date, end?: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    if (!end || start.getTime() === end.getTime()) {
      return start.toLocaleDateString('cs-CZ', options);
    }
    return `${start.toLocaleDateString('cs-CZ', { day: 'numeric' })}–${end.toLocaleDateString('cs-CZ', options)}`;
  };

  // Handle event click
  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  // Render header based on variant
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
          appName="Kalendář závodů"
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
          <a href="#" className="prototype-calendar-page__logo">
            <span className="prototype-calendar-page__logo-text">CSK</span>
            <span className="prototype-calendar-page__logo-subtitle">Český svaz kanoistů</span>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            clearable
            onClear={() => setSearchQuery('')}
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

  // Render footer based on variant
  const renderFooter = () => {
    if (variant === 'embed') {
      return null;
    }

    return (
      <footer className="prototype-calendar-page__footer">
        <div className="prototype-calendar-page__footer-content">
          <p>© 2026 Český svaz kanoistů. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    );
  };

  return (
    <div className={`prototype-calendar-page ${variant === 'embed' ? 'prototype-calendar-page--embed' : ''}`}>
      {/* Header */}
      {renderHeader()}

      {/* Hero Section */}
      {showHero && (
        <section className="calendar-page-hero">
          <div className="calendar-page-hero__background">
            <div className="calendar-page-hero__gradient" />
            <div className="calendar-page-hero__pattern" />
          </div>
          <div className="calendar-page-hero__content">
            <div className="calendar-page-hero__text">
              <h1 className="calendar-page-hero__title">Kalendář závodů</h1>
              <p className="calendar-page-hero__subtitle">
                Přehled všech závodů a akcí Českého svazu kanoistů pro sezónu {currentDate.getFullYear()}
              </p>
              <div className="calendar-page-hero__stats">
                <div className="calendar-page-hero__stat">
                  <span className="calendar-page-hero__stat-value">{allRaces.filter(r => r.section).length}</span>
                  <span className="calendar-page-hero__stat-label">závodů v měsíci</span>
                </div>
                <div className="calendar-page-hero__stat">
                  <span className="calendar-page-hero__stat-value">3</span>
                  <span className="calendar-page-hero__stat-label">sekce</span>
                </div>
                <div className="calendar-page-hero__stat">
                  <span className="calendar-page-hero__stat-value">{allRaces.filter(r => r.data?.level === 'MČR').length}</span>
                  <span className="calendar-page-hero__stat-label">MČR</span>
                </div>
              </div>
            </div>
          </div>
          <WaveDecoration className="calendar-page-hero__wave" />
        </section>
      )}

      {/* Featured Events Section */}
      {showHero && featuredEvents.length > 0 && (
        <section className="calendar-page-featured">
          <div className="calendar-page-featured__container">
            <div className="calendar-page-featured__header">
              <TrophyIcon />
              <h2 className="calendar-page-featured__title">Hlavní události sezóny</h2>
            </div>
            <div className="calendar-page-featured__grid">
              {featuredEvents.map((event, index) => (
                <button
                  key={event.id}
                  type="button"
                  className={`calendar-page-featured__card calendar-page-featured__card--${event.section || 'default'}`}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="calendar-page-featured__card-accent" />
                  <div className="calendar-page-featured__card-content">
                    <div className="calendar-page-featured__card-top">
                      {index === 0 && (
                        <span className="calendar-page-featured__card-star">
                          <StarIcon />
                        </span>
                      )}
                      {event.section && (
                        <Badge section={event.section as 'dv' | 'ry' | 'vt'} size="sm" glow>
                          {sectionShortNames[event.section]}
                        </Badge>
                      )}
                      {event.data?.level ? (
                        <Badge variant="default" size="sm" outlined>
                          {String(event.data.level)}
                        </Badge>
                      ) : null}
                    </div>
                    <h3 className="calendar-page-featured__card-title">{event.title}</h3>
                    <div className="calendar-page-featured__card-meta">
                      <span className="calendar-page-featured__card-date">
                        <CalendarIcon />
                        {formatDateRange(event.start, event.end)}
                      </span>
                      {event.data?.location ? (
                        <span className="calendar-page-featured__card-location">
                          <LocationIcon />
                          {String(event.data.location)}
                        </span>
                      ) : null}
                    </div>
                    {event.data?.entries ? (
                      <div className="calendar-page-featured__card-entries">
                        <UsersIcon />
                        <span>{String(event.data.entries)} přihlášených</span>
                      </div>
                    ) : null}
                  </div>
                  <div className="calendar-page-featured__card-arrow">
                    <ArrowRightIcon />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main content */}
      <main className="prototype-calendar-page__main">
        <div className="prototype-calendar-page__container">
          {/* Page header - only show if no hero */}
          {!showHero && (
            <div className="prototype-calendar-page__header">
              <h1 className="prototype-calendar-page__title">Kalendář závodů</h1>
              <p className="prototype-calendar-page__subtitle">
                Přehled všech závodů a akcí Českého svazu kanoistů
              </p>
            </div>
          )}

          {/* Filters */}
          <div className="prototype-calendar-page__filters">
            <Tabs
              tabs={sectionTabs.map((tab) => ({ ...tab, content: null }))}
              activeTab={selectedSection}
              onChange={(tabId) => setSelectedSection(tabId)}
              variant="pills"
            />

            <div className="prototype-calendar-page__filters-right">
              <Select
                options={[
                  { value: 'all', label: 'Všechny úrovně' },
                  { value: 'mcr', label: 'MČR' },
                  { value: 'cp', label: 'Český pohár' },
                  { value: 'krajske', label: 'Krajské' },
                  { value: 'verejne', label: 'Veřejné akce' },
                ]}
                defaultValue="all"
                size="sm"
              />
            </div>
          </div>

          {/* Content grid */}
          <div className="prototype-calendar-page__content">
            {/* Calendar */}
            <div className="prototype-calendar-page__calendar">
              <Calendar
                date={currentDate}
                onDateChange={setCurrentDate}
                events={filteredRaces}
                size="lg"
                onEventClick={handleEventClick}
                onDayClick={(date) => console.log('Day clicked:', date)}
              />
            </div>

            {/* Sidebar */}
            <aside className="prototype-calendar-page__sidebar">
              {/* Live races */}
              {showLive && upcomingRaces.some((race) => race.data?.isLive) && (
                <Card variant="outlined" padding="md" className="prototype-calendar-page__live-card">
                  <div className="prototype-calendar-page__live-header">
                    <LiveIndicator variant="live" size="md" label="LIVE" />
                    <span>Právě probíhá</span>
                  </div>
                  {upcomingRaces
                    .filter((race) => race.data?.isLive)
                    .map((race) => (
                      <div key={race.id} className="prototype-calendar-page__live-race">
                        <div className="prototype-calendar-page__race-title">{race.title}</div>
                        <div className="prototype-calendar-page__race-meta">
                          <LocationIcon />
                          <span>{String(race.data?.location || '')}</span>
                        </div>
                        <Button variant="primary" size="sm" fullWidth>
                          Sledovat živě
                        </Button>
                      </div>
                    ))}
                </Card>
              )}

              {/* Upcoming races */}
              <Card variant="surface" padding="none">
                <div className="prototype-calendar-page__upcoming-header">
                  <h2 className="prototype-calendar-page__upcoming-title">Nadcházející závody</h2>
                </div>

                {upcomingRaces.length > 0 ? (
                  <div className="prototype-calendar-page__upcoming-list">
                    {upcomingRaces.map((race) => (
                      <button
                        key={race.id}
                        type="button"
                        className={`prototype-calendar-page__upcoming-item ${
                          selectedEvent?.id === race.id ? 'prototype-calendar-page__upcoming-item--selected' : ''
                        }`}
                        onClick={() => handleEventClick(race)}
                      >
                        <div className="prototype-calendar-page__upcoming-date">
                          <CalendarIcon />
                          <span>{formatDateRange(race.start, race.end)}</span>
                        </div>
                        <div className="prototype-calendar-page__upcoming-content">
                          <div className="prototype-calendar-page__upcoming-name">
                            {race.section && (
                              <Badge section={race.section as 'dv' | 'ry' | 'vt'} size="sm">
                                {sectionShortNames[race.section]}
                              </Badge>
                            )}
                            <span>{race.title}</span>
                          </div>
                          <div className="prototype-calendar-page__upcoming-meta">
                            <span className="prototype-calendar-page__upcoming-location">
                              <LocationIcon />
                              {String(race.data?.location || '')}
                            </span>
                            {race.data?.entries ? (
                              <span className="prototype-calendar-page__upcoming-entries">
                                <UsersIcon />
                                {String(race.data.entries)} přihlášených
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <ArrowRightIcon />
                      </button>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="Žádné nadcházející závody"
                    description="V této sekci nejsou plánovány žádné závody."
                    size="sm"
                  />
                )}

                <div className="prototype-calendar-page__upcoming-footer">
                  <Button variant="ghost" size="sm" fullWidth>
                    Zobrazit všechny závody
                  </Button>
                </div>
              </Card>

              {/* Event detail (when selected) */}
              {selectedEvent && (
                <Card variant="elevated" padding="md" className="prototype-calendar-page__detail-card">
                  <div className="prototype-calendar-page__detail-header">
                    <h3 className="prototype-calendar-page__detail-title">{selectedEvent.title}</h3>
                    {selectedEvent.section && (
                      <Badge section={selectedEvent.section as 'dv' | 'ry' | 'vt'}>
                        {sectionNames[selectedEvent.section]}
                      </Badge>
                    )}
                  </div>

                  <div className="prototype-calendar-page__detail-info">
                    <div className="prototype-calendar-page__detail-row">
                      <CalendarIcon />
                      <span>{formatDateRange(selectedEvent.start, selectedEvent.end)}</span>
                    </div>
                    {selectedEvent.data?.location ? (
                      <div className="prototype-calendar-page__detail-row">
                        <LocationIcon />
                        <span>{String(selectedEvent.data.location)}</span>
                      </div>
                    ) : null}
                    {selectedEvent.data?.discipline ? (
                      <div className="prototype-calendar-page__detail-row">
                        <span className="prototype-calendar-page__detail-label">Disciplína:</span>
                        <span>{String(selectedEvent.data.discipline)}</span>
                      </div>
                    ) : null}
                    {selectedEvent.data?.level ? (
                      <div className="prototype-calendar-page__detail-row">
                        <span className="prototype-calendar-page__detail-label">Úroveň:</span>
                        <span>{String(selectedEvent.data.level)}</span>
                      </div>
                    ) : null}
                    {selectedEvent.data?.entries ? (
                      <div className="prototype-calendar-page__detail-row">
                        <UsersIcon />
                        <span>{String(selectedEvent.data.entries)} přihlášených závodníků</span>
                      </div>
                    ) : null}
                  </div>

                  <div className="prototype-calendar-page__detail-actions">
                    <Button variant="primary" fullWidth>
                      Detail závodu
                    </Button>
                    <Button variant="secondary" fullWidth>
                      Přihlásit se
                    </Button>
                  </div>
                </Card>
              )}
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
      {renderFooter()}
    </div>
  );
};

// ============================================================================
// Storybook Meta
// ============================================================================

const meta = {
  title: 'Prototypes/Calendar Page',
  component: CalendarPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Prototyp stránky kalendáře závodů CSK. Zobrazuje měsíční přehled závodů s filtry podle sekcí (DV, RY, VT) a seznamem nadcházejících událostí.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    initialSection: {
      control: 'select',
      options: ['all', 'dv', 'ry', 'vt'],
      description: 'Initial section filter',
    },
    showLive: {
      control: 'boolean',
      description: 'Show live races indicator',
    },
    showHero: {
      control: 'boolean',
      description: 'Show hero section with featured events',
    },
    variant: {
      control: 'select',
      options: ['standalone', 'satellite', 'embed'],
      description: 'Display variant for different integration contexts',
    },
  },
} satisfies Meta<typeof CalendarPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Výchozí zobrazení kalendáře s hero sekcí a featured events.
 */
export const Default: Story = {
  args: {
    initialSection: 'all',
    showLive: true,
    showHero: true,
  },
};

/**
 * Kalendář filtrovaný na sekci Divoká voda (DV).
 */
export const DivokáVoda: Story = {
  args: {
    initialSection: 'dv',
    showLive: true,
    showHero: true,
  },
};

/**
 * Kalendář filtrovaný na sekci Rychlostní kanoistika (RY).
 */
export const Rychlostní: Story = {
  args: {
    initialSection: 'ry',
    showLive: true,
    showHero: true,
  },
};

/**
 * Kalendář filtrovaný na sekci Vodní turistika (VT).
 */
export const VodníTuristika: Story = {
  args: {
    initialSection: 'vt',
    showLive: true,
    showHero: true,
  },
};

/**
 * Kompaktní zobrazení bez hero sekce.
 */
export const Compact: Story = {
  args: {
    initialSection: 'all',
    showLive: true,
    showHero: false,
  },
};

/**
 * Kalendář bez indikátoru živých závodů.
 */
export const BezLive: Story = {
  args: {
    initialSection: 'all',
    showLive: false,
    showHero: true,
  },
};

// ============================================================================
// Integration Variants (Phase 8.7.3)
// ============================================================================

/**
 * Embed varianta pro vložení do kanoe.cz.
 * Bez vlastního headeru a footeru, kompaktní styl.
 */
export const Embed: Story = {
  args: {
    initialSection: 'all',
    showLive: true,
    showHero: false,
    variant: 'embed',
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="full"
        pageVariant="subpage"
        pageTitle="Kalendář závodů 2026"
        breadcrumbs={[
          { label: 'Domů', href: '#' },
          { label: 'Závody', href: '#' },
          { label: 'Kalendář 2026' },
        ]}
      >
        <Story />
      </KanoeCzContext>
    ),
  ],
};

/**
 * Satellite varianta pro standalone aplikace.
 * Minimální header s odkazem na kanoe.cz.
 */
export const Satellite: Story = {
  args: {
    initialSection: 'all',
    showLive: true,
    showHero: false,
    variant: 'satellite',
  },
};

/**
 * Embed varianta se sidebarem v kanoe.cz layoutu.
 * Demonstrace container queries v úzkém sloupci.
 */
export const EmbedWithSidebar: Story = {
  args: {
    initialSection: 'dv',
    showLive: true,
    showHero: false,
    variant: 'embed',
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="sidebar"
        pageVariant="subpage"
        pageTitle="Kalendář - Divoká voda"
        breadcrumbs={[
          { label: 'Domů', href: '#' },
          { label: 'Divoká voda', href: '#' },
          { label: 'Kalendář' },
        ]}
      >
        <Story />
      </KanoeCzContext>
    ),
  ],
};
