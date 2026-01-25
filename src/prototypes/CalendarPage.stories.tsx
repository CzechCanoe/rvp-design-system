import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { MainNav } from '../components/Navigation';
import { Calendar, type CalendarEvent } from '../components/Calendar';
import { CalendarList } from '../components/Calendar/CalendarList';
import { CalendarCards } from '../components/Calendar/CalendarCards';
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

/** Calendar view type */
type CalendarViewType = 'month' | 'list' | 'cards';

/** Visual style variant */
type CalendarPageStyle = 'default' | 'aesthetic';

interface CalendarPageProps {
  /** Initial section filter */
  initialSection?: 'all' | 'dv' | 'ry' | 'vt';
  /** Show live races */
  showLive?: boolean;
  /** Display variant */
  variant?: CalendarPageVariant;
  /** Initial view type */
  initialView?: CalendarViewType;
  /** Show view switcher */
  showViewSwitcher?: boolean;
  /** Visual style - default or aesthetic (Dynamic Sport) */
  style?: CalendarPageStyle;
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
        isLive: true, // Always show as live for demo purposes
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

// Note: TrophyIcon, StarIcon, WaveDecoration removed - hero section cleaned (Phase 8.6.3)

// Grid/Month view icon
const GridIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

// List view icon
const ListIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <circle cx="4" cy="6" r="1" fill="currentColor" />
    <circle cx="4" cy="12" r="1" fill="currentColor" />
    <circle cx="4" cy="18" r="1" fill="currentColor" />
  </svg>
);

// Cards view icon
const CardsIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="6" rx="1" />
    <rect x="2" y="11" width="20" height="6" rx="1" />
    <line x1="6" y1="6" x2="18" y2="6" />
    <line x1="6" y1="14" x2="18" y2="14" />
  </svg>
);

// CSK Logo component for satellite header
const CSKLogo = () => (
  <span className="prototype-calendar-page__logo">
    <span className="prototype-calendar-page__logo-text">CSK</span>
  </span>
);

const CalendarPage = ({
  initialSection = 'all',
  showLive = true,
  variant = 'standalone',
  initialView = 'month',
  showViewSwitcher = true,
  style = 'default',
}: CalendarPageProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSection, setSelectedSection] = useState<string>(initialSection);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [currentView, setCurrentView] = useState<CalendarViewType>(initialView);

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

  // Build page class names
  const isAesthetic = style === 'aesthetic';
  const pageClasses = [
    'prototype-calendar-page',
    variant === 'embed' && 'prototype-calendar-page--embed',
    isAesthetic && 'prototype-calendar-page--aesthetic',
  ].filter(Boolean).join(' ');

  return (
    <div className={pageClasses}>
      {/* Header */}
      {renderHeader()}

      {/* Main content - Clean design without hero waves (Phase 8.6.3) */}
      <main className="prototype-calendar-page__main">
        <div className="prototype-calendar-page__container">
          {/* Page header */}
          <div className="prototype-calendar-page__header">
            <h1 className="prototype-calendar-page__title">Kalendář závodů</h1>
            <p className="prototype-calendar-page__subtitle">
              Přehled všech závodů a akcí Českého svazu kanoistů
            </p>
          </div>

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

              {showViewSwitcher && (
                <div className="prototype-calendar-page__view-switcher">
                  <button
                    type="button"
                    className={`prototype-calendar-page__view-btn ${currentView === 'month' ? 'prototype-calendar-page__view-btn--active' : ''}`}
                    onClick={() => setCurrentView('month')}
                    aria-label="Měsíční pohled"
                    title="Měsíční pohled"
                  >
                    <GridIcon />
                  </button>
                  <button
                    type="button"
                    className={`prototype-calendar-page__view-btn ${currentView === 'list' ? 'prototype-calendar-page__view-btn--active' : ''}`}
                    onClick={() => setCurrentView('list')}
                    aria-label="Seznam"
                    title="Seznam"
                  >
                    <ListIcon />
                  </button>
                  <button
                    type="button"
                    className={`prototype-calendar-page__view-btn ${currentView === 'cards' ? 'prototype-calendar-page__view-btn--active' : ''}`}
                    onClick={() => setCurrentView('cards')}
                    aria-label="Měsíční karty"
                    title="Měsíční karty"
                  >
                    <CardsIcon />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content grid */}
          <div className="prototype-calendar-page__content">
            {/* Calendar - different views */}
            <div className="prototype-calendar-page__calendar">
              {currentView === 'month' && (
                <Calendar
                  date={currentDate}
                  onDateChange={setCurrentDate}
                  events={filteredRaces}
                  size="lg"
                  onEventClick={handleEventClick}
                  onDayClick={(date) => console.log('Day clicked:', date)}
                  showLive={showLive}
                  weekendShowcase={isAesthetic}
                />
              )}

              {currentView === 'list' && (
                <CalendarList
                  events={filteredRaces}
                  groupBy="month"
                  showSection
                  showEndDate
                  onEventClick={handleEventClick}
                  styleVariant={variant === 'embed' ? 'embed' : 'default'}
                  showLive={showLive}
                />
              )}

              {currentView === 'cards' && (
                <CalendarCards
                  events={filteredRaces}
                  maxMonths={4}
                  maxEventsPerMonth={5}
                  showSection
                  onEventClick={handleEventClick}
                  onMonthClick={(year, month) => {
                    setCurrentDate(new Date(year, month, 1));
                    setCurrentView('month');
                  }}
                  styleVariant={variant === 'embed' ? 'embed' : 'default'}
                />
              )}
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
    variant: {
      control: 'select',
      options: ['standalone', 'satellite', 'embed'],
      description: 'Display variant for different integration contexts',
    },
    initialView: {
      control: 'select',
      options: ['month', 'list', 'cards'],
      description: 'Initial calendar view type',
    },
    showViewSwitcher: {
      control: 'boolean',
      description: 'Show view type switcher buttons',
    },
    style: {
      control: 'select',
      options: ['default', 'aesthetic'],
      description: 'Visual style - default or aesthetic (Dynamic Sport)',
    },
  },
} satisfies Meta<typeof CalendarPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Consolidated Variants - Aesthetic Style (Phase 16.2)
// ============================================================================

/**
 * **Embed** - Aesthetic kalendář pro vložení do kanoe.cz.
 *
 * Vlastnosti:
 * - Mesh background, display typography
 * - Grid/month view jako výchozí pohled
 * - Live indikace pro probíhající závody
 * - Container queries pro responsivní chování
 * - View switcher pro přepínání pohledů
 */
export const Embed: Story = {
  args: {
    initialSection: 'all',
    showLive: true,
    variant: 'embed',
    initialView: 'month',
    showViewSwitcher: true,
    style: 'aesthetic',
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
 * **EmbedListView** - Aesthetic seznam závodů pro vložení do kanoe.cz.
 *
 * Vlastnosti:
 * - Kompaktní list view vhodný pro úzké sloupce
 * - Live indikace s pulsující animací
 * - Grupování podle měsíců
 * - Sidebar layout demonstrující container queries
 */
export const EmbedListView: Story = {
  args: {
    initialSection: 'all',
    showLive: true,
    variant: 'embed',
    initialView: 'list',
    showViewSwitcher: true,
    style: 'aesthetic',
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="sidebar"
        pageVariant="subpage"
        pageTitle="Nadcházející závody"
        breadcrumbs={[
          { label: 'Domů', href: '#' },
          { label: 'Závody' },
        ]}
      >
        <Story />
      </KanoeCzContext>
    ),
  ],
};

/**
 * **Satellite** - Aesthetic standalone kalendář.
 *
 * Vlastnosti:
 * - Minimální header s odkazem na kanoe.cz
 * - Plný Aesthetic styl s mesh background
 * - Grid/month view jako výchozí pohled
 * - Staggered reveal animations, energy accents
 */
export const Satellite: Story = {
  args: {
    initialSection: 'all',
    showLive: true,
    variant: 'satellite',
    initialView: 'month',
    showViewSwitcher: true,
    style: 'aesthetic',
  },
};

/**
 * **SatelliteListView** - Aesthetic standalone seznam závodů.
 *
 * Vlastnosti:
 * - Minimální header s odkazem na kanoe.cz
 * - List view s grupováním podle měsíců
 * - Live indikace pro probíhající závody
 * - Staggered reveal animations
 */
export const SatelliteListView: Story = {
  args: {
    initialSection: 'all',
    showLive: true,
    variant: 'satellite',
    initialView: 'list',
    showViewSwitcher: true,
    style: 'aesthetic',
  },
};
