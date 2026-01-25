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
import { Icon } from '../components/Icon';
import { CSKLogo } from '../components/CSKLogo';
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

// Note: Inline SVG icons replaced with Icon component (Phase 17.9)

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
            iconLeft={<Icon name="search" size="md" />}
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
      <footer className="prototype-calendar-page__footer csk-border-top csk-bg-secondary">
        <div className="prototype-calendar-page__footer-content">
          <p className="csk-text-sm csk-text-tertiary">© 2026 Český svaz kanoistů. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    );
  };

  // Build page class names
  const isAesthetic = style === 'aesthetic';
  const pageClasses = [
    'prototype-calendar-page',
    variant === 'embed' && 'prototype-calendar-page--embed',
  ].filter(Boolean).join(' ');

  return (
    <div className={pageClasses}>
      {/* Header */}
      {renderHeader()}

      {/* Main content - Clean design without hero waves (Phase 8.6.3) */}
      <main className="prototype-calendar-page__main">
        <div className="prototype-calendar-page__container">
          {/* Page header */}
          <div className={`prototype-calendar-page__header ${isAesthetic ? 'csk-reveal' : ''}`}>
            <h1 className={`prototype-calendar-page__title ${isAesthetic ? 'csk-display' : ''}`}>Kalendář závodů</h1>
            <p className="prototype-calendar-page__subtitle csk-text-secondary">
              Přehled všech závodů a akcí Českého svazu kanoistů
            </p>
          </div>

          {/* Filters */}
          <div className={`prototype-calendar-page__filters csk-border-bottom ${isAesthetic ? 'csk-reveal csk-reveal-2' : ''}`}>
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
                <div className="prototype-calendar-page__view-switcher csk-surface-elevated csk-rounded">
                  <button
                    type="button"
                    className={`prototype-calendar-page__view-btn csk-rounded-sm csk-interactive ${currentView === 'month' ? 'csk-surface csk-shadow-sm csk-text-primary' : 'csk-text-tertiary'}`}
                    onClick={() => setCurrentView('month')}
                    aria-label="Měsíční pohled"
                    title="Měsíční pohled"
                  >
                    <Icon name="grid" size={18} />
                  </button>
                  <button
                    type="button"
                    className={`prototype-calendar-page__view-btn csk-rounded-sm csk-interactive ${currentView === 'list' ? 'csk-surface csk-shadow-sm csk-text-primary' : 'csk-text-tertiary'}`}
                    onClick={() => setCurrentView('list')}
                    aria-label="Seznam"
                    title="Seznam"
                  >
                    <Icon name="list" size={18} />
                  </button>
                  <button
                    type="button"
                    className={`prototype-calendar-page__view-btn csk-rounded-sm csk-interactive ${currentView === 'cards' ? 'csk-surface csk-shadow-sm csk-text-primary' : 'csk-text-tertiary'}`}
                    onClick={() => setCurrentView('cards')}
                    aria-label="Měsíční karty"
                    title="Měsíční karty"
                  >
                    <Icon name="cards" size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content grid */}
          <div className="prototype-calendar-page__content">
            {/* Calendar - different views */}
            <div className={`prototype-calendar-page__calendar ${isAesthetic ? 'csk-reveal csk-reveal-3' : ''}`}>
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
                <Card variant="outlined" padding="md" className={`prototype-calendar-page__live-card csk-border-energy ${isAesthetic ? 'csk-reveal csk-reveal-2' : ''}`}>
                  <div className="prototype-calendar-page__live-header csk-text-energy">
                    <LiveIndicator variant="live" size="md" label="LIVE" />
                    <span className="csk-font-semibold">Právě probíhá</span>
                  </div>
                  {upcomingRaces
                    .filter((race) => race.data?.isLive)
                    .map((race) => (
                      <div key={race.id} className="prototype-calendar-page__live-race">
                        <div className="prototype-calendar-page__race-title csk-font-semibold csk-text-primary">{race.title}</div>
                        <div className="prototype-calendar-page__race-meta csk-text-sm csk-text-secondary">
                          <Icon name="location" size="sm" />
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
              <Card variant="surface" padding="none" className={isAesthetic ? 'csk-reveal csk-reveal-3' : ''}>
                <div className="prototype-calendar-page__upcoming-header csk-border-bottom">
                  <h2 className={`prototype-calendar-page__upcoming-title csk-text-lg csk-font-semibold ${isAesthetic ? 'csk-headline' : ''}`}>Nadcházející závody</h2>
                </div>

                {upcomingRaces.length > 0 ? (
                  <div className="prototype-calendar-page__upcoming-list">
                    {upcomingRaces.map((race) => (
                      <button
                        key={race.id}
                        type="button"
                        className={`prototype-calendar-page__upcoming-item csk-interactive csk-border-bottom ${
                          selectedEvent?.id === race.id ? 'csk-bg-primary-subtle csk-border-left-accent' : ''
                        }`}
                        onClick={() => handleEventClick(race)}
                      >
                        <div className="prototype-calendar-page__upcoming-date csk-text-sm csk-text-secondary">
                          <Icon name="calendar" size="sm" />
                          <span>{formatDateRange(race.start, race.end)}</span>
                        </div>
                        <div className="prototype-calendar-page__upcoming-content">
                          <div className="prototype-calendar-page__upcoming-name csk-font-medium csk-text-primary">
                            {race.section && (
                              <Badge section={race.section as 'dv' | 'ry' | 'vt'} size="sm">
                                {sectionShortNames[race.section]}
                              </Badge>
                            )}
                            <span>{race.title}</span>
                          </div>
                          <div className="prototype-calendar-page__upcoming-meta csk-text-sm csk-text-tertiary">
                            <span className="prototype-calendar-page__upcoming-location">
                              <Icon name="location" size="sm" />
                              {String(race.data?.location || '')}
                            </span>
                            {race.data?.entries ? (
                              <span className="prototype-calendar-page__upcoming-entries">
                                <Icon name="users" size="sm" />
                                {String(race.data.entries)} přihlášených
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <Icon name="arrow-right" size="sm" className="csk-text-tertiary" />
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

                <div className="prototype-calendar-page__upcoming-footer csk-border-top">
                  <Button variant="ghost" size="sm" fullWidth>
                    Zobrazit všechny závody
                  </Button>
                </div>
              </Card>

              {/* Event detail (when selected) */}
              {selectedEvent && (
                <Card variant={isAesthetic ? 'aesthetic' : 'elevated'} padding="md" className={`prototype-calendar-page__detail-card ${isAesthetic ? 'csk-border-accent' : ''}`}>
                  <div className="prototype-calendar-page__detail-header">
                    <h3 className={`prototype-calendar-page__detail-title csk-text-lg csk-font-semibold ${isAesthetic ? 'csk-headline' : ''}`}>{selectedEvent.title}</h3>
                    {selectedEvent.section && (
                      <Badge section={selectedEvent.section as 'dv' | 'ry' | 'vt'}>
                        {sectionNames[selectedEvent.section]}
                      </Badge>
                    )}
                  </div>

                  <div className="prototype-calendar-page__detail-info csk-text-sm csk-text-secondary">
                    <div className="prototype-calendar-page__detail-row">
                      <Icon name="calendar" size="sm" />
                      <span>{formatDateRange(selectedEvent.start, selectedEvent.end)}</span>
                    </div>
                    {selectedEvent.data?.location ? (
                      <div className="prototype-calendar-page__detail-row">
                        <Icon name="location" size="sm" />
                        <span>{String(selectedEvent.data.location)}</span>
                      </div>
                    ) : null}
                    {selectedEvent.data?.discipline ? (
                      <div className="prototype-calendar-page__detail-row">
                        <span className="prototype-calendar-page__detail-label csk-font-medium csk-text-tertiary">Disciplína:</span>
                        <span>{String(selectedEvent.data.discipline)}</span>
                      </div>
                    ) : null}
                    {selectedEvent.data?.level ? (
                      <div className="prototype-calendar-page__detail-row">
                        <span className="prototype-calendar-page__detail-label csk-font-medium csk-text-tertiary">Úroveň:</span>
                        <span>{String(selectedEvent.data.level)}</span>
                      </div>
                    ) : null}
                    {selectedEvent.data?.entries ? (
                      <div className="prototype-calendar-page__detail-row">
                        <Icon name="users" size="sm" />
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
