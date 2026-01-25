import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { MainNav } from '../components/Navigation';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Checkbox } from '../components/Checkbox';
import { Tabs } from '../components/Tabs';
import { Table } from '../components/Table';
import { Modal } from '../components/Modal';
import { ToastProvider, useToast } from '../components/Toast';
import { EmptyState } from '../components/EmptyState';
import { KanoeCzContext } from '../components/KanoeCzContext';
import { Icon } from '../components/Icon';
import { CSKLogo } from '../components/CSKLogo';
import './RegistrationPage.css';

// ============================================================================
// Types
// ============================================================================

/** Display variant for the page */
type RegistrationPageVariant = 'standalone' | 'satellite' | 'embed';

interface RegistrationPageProps {
  /** Club name */
  clubName?: string;
  /** Race ID */
  raceId?: string;
  /** Initial step */
  initialStep?: number;
  /** Section (discipline) */
  section?: 'dv' | 'ry' | 'vt';
  /** Display variant - standalone (full), satellite (minimal header), embed (no chrome) */
  variant?: RegistrationPageVariant;
}

interface Athlete {
  id: number;
  rgc: string;
  name: string;
  birthYear: number;
  category: string;
  vt: string;
  healthCheck: 'valid' | 'expiring' | 'expired';
  healthCheckExpiry: Date;
  fees: 'paid' | 'unpaid';
  selected?: boolean;
}

interface RegistrationEntry {
  id: number;
  athlete: Athlete;
  boatCategory: string;
  ageCategory: string;
  discipline: string;
  partner?: Athlete; // For C2 categories
}

/** Mode for athlete selection modal */
type AthleteSelectionMode = 'single' | 'partner';

// ============================================================================
// Sample Data
// ============================================================================

const generateAthletes = (): Athlete[] => {
  const today = new Date();
  return [
    { id: 1, rgc: 'CZE-12345', name: 'Jan Novák', birthYear: 2008, category: 'K1M', vt: 'A', healthCheck: 'valid', healthCheckExpiry: new Date(today.getFullYear(), today.getMonth() + 6, 15), fees: 'paid' },
    { id: 2, rgc: 'CZE-12346', name: 'Petr Svoboda', birthYear: 2007, category: 'K1M', vt: 'B', healthCheck: 'valid', healthCheckExpiry: new Date(today.getFullYear(), today.getMonth() + 3, 20), fees: 'paid' },
    { id: 3, rgc: 'CZE-12347', name: 'Martin Dvořák', birthYear: 2009, category: 'K1M', vt: 'C', healthCheck: 'expiring', healthCheckExpiry: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14), fees: 'paid' },
    { id: 4, rgc: 'CZE-12348', name: 'Tomáš Procházka', birthYear: 2006, category: 'K1M', vt: 'B', healthCheck: 'valid', healthCheckExpiry: new Date(today.getFullYear(), today.getMonth() + 8, 10), fees: 'unpaid' },
    { id: 5, rgc: 'CZE-12349', name: 'David Černý', birthYear: 2010, category: 'K1M', vt: 'D', healthCheck: 'expired', healthCheckExpiry: new Date(today.getFullYear(), today.getMonth() - 1, 5), fees: 'paid' },
    { id: 6, rgc: 'CZE-12350', name: 'Jakub Veselý', birthYear: 2008, category: 'C1M', vt: 'B', healthCheck: 'valid', healthCheckExpiry: new Date(today.getFullYear(), today.getMonth() + 5, 25), fees: 'paid' },
    { id: 7, rgc: 'CZE-12351', name: 'Filip Horák', birthYear: 2007, category: 'C1M', vt: 'A', healthCheck: 'valid', healthCheckExpiry: new Date(today.getFullYear(), today.getMonth() + 4, 12), fees: 'paid' },
    { id: 8, rgc: 'CZE-12352', name: 'Anna Nováková', birthYear: 2008, category: 'K1W', vt: 'B', healthCheck: 'valid', healthCheckExpiry: new Date(today.getFullYear(), today.getMonth() + 7, 8), fees: 'paid' },
    { id: 9, rgc: 'CZE-12353', name: 'Tereza Králová', birthYear: 2009, category: 'K1W', vt: 'C', healthCheck: 'expiring', healthCheckExpiry: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7), fees: 'paid' },
    { id: 10, rgc: 'CZE-12354', name: 'Lucie Marková', birthYear: 2007, category: 'C1W', vt: 'B', healthCheck: 'valid', healthCheckExpiry: new Date(today.getFullYear(), today.getMonth() + 9, 30), fees: 'paid' },
  ];
};

const raceData = {
  id: 'cp-2026-02',
  name: 'Český pohár #2 ve slalomu',
  date: '17.–18. května 2026',
  location: 'Praha – Troja',
  section: 'dv' as const,
  deadline: new Date(2026, 4, 10, 23, 59),
  disciplines: [
    { id: 'slalom', name: 'Slalom', categories: ['K1M', 'K1W', 'C1M', 'C1W', 'C2M', 'C2X'] },
    { id: 'sjezd', name: 'Sjezd', categories: ['K1M', 'K1W', 'C1M', 'C1W'] },
  ],
  ageCategories: [
    { id: 'juniors', name: 'Junioři', years: [2007, 2008, 2009] },
    { id: 'cadets', name: 'Kadeti', years: [2010, 2011, 2012] },
    { id: 'seniors', name: 'Dospělí', years: null },
  ],
  fees: {
    individual: 250,
    team: 400,
  },
};

// Navigation items
const navItems = [
  { id: 'home', label: 'Domů', href: '#' },
  { id: 'calendar', label: 'Kalendář', href: '#' },
  { id: 'results', label: 'Výsledky', href: '#' },
  { id: 'registration', label: 'Přihlášky', href: '#', active: true },
  { id: 'clubs', label: 'Kluby', href: '#' },
];

// Section display names
const sectionNames: Record<string, string> = {
  dv: 'Divoká voda',
  ry: 'Rychlostní kanoistika',
  vt: 'Vodní turistika',
};

// ============================================================================
// CSK Logo Component (for satellite header)
// ============================================================================

// Note: All icons now use the Icon component from the design system

// ============================================================================
// Helper Functions
// ============================================================================

function formatDate(date: Date): string {
  return date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatDateShort(date: Date): string {
  return date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' });
}

function getHealthCheckStatus(athlete: Athlete): { label: string; variant: 'success' | 'warning' | 'error' } {
  if (athlete.healthCheck === 'expired') {
    return { label: 'Propadlá', variant: 'error' };
  }
  if (athlete.healthCheck === 'expiring') {
    return { label: `Expiruje ${formatDateShort(athlete.healthCheckExpiry)}`, variant: 'warning' };
  }
  return { label: 'Platná', variant: 'success' };
}

function calculateAge(birthYear: number): number {
  return new Date().getFullYear() - birthYear;
}

function isCrewCategory(category: string): boolean {
  return category.startsWith('C2');
}

// ============================================================================
// Wizard Step Component
// ============================================================================

interface WizardStepProps {
  step: number;
  currentStep: number;
  label: string;
  icon: React.ReactNode;
  isLast?: boolean;
}

const WizardStep = ({ step, currentStep, label, icon, isLast = false }: WizardStepProps) => {
  const isActive = step === currentStep;
  const isCompleted = step < currentStep;

  return (
    <div className={`registration-wizard-step ${isActive ? 'registration-wizard-step--active' : ''} ${isCompleted ? 'registration-wizard-step--completed' : ''}`}>
      <div className="registration-wizard-step__indicator">
        <div className="registration-wizard-step__circle">
          {isCompleted ? <Icon name="check-circle" size="sm" /> : icon}
        </div>
        {!isLast && <div className="registration-wizard-step__line" />}
      </div>
      <div className="registration-wizard-step__content">
        <span className="registration-wizard-step__number">Krok {step + 1}</span>
        <span className="registration-wizard-step__label">{label}</span>
      </div>
    </div>
  );
};

// ============================================================================
// Inner Page Component (needs ToastProvider context)
// ============================================================================

const RegistrationPageInner = ({
  clubName = 'TJ Bohemians Praha',
  initialStep = 0,
  section = 'dv',
  variant = 'standalone',
}: RegistrationPageProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [athletes] = useState<Athlete[]>(generateAthletes);
  const [entries, setEntries] = useState<RegistrationEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState(raceData.disciplines[0].id);
  const [selectedBoatCategory, setSelectedBoatCategory] = useState('K1M');
  const [showAthleteModal, setShowAthleteModal] = useState(false);
  const [selectionMode, setSelectionMode] = useState<AthleteSelectionMode>('single');
  const [pendingCrewEntry, setPendingCrewEntry] = useState<{
    athlete: Athlete;
    boatCategory: string;
    ageCategory: string;
    discipline: string;
  } | null>(null);
  const [keepModalOpen, setKeepModalOpen] = useState(false);
  const [headerData, setHeaderData] = useState({
    teamLeader: '',
    teamLeaderPhone: '',
    teamLeaderEmail: '',
    submitter: '',
    notes: '',
  });

  const toast = useToast();

  // Filter athletes by search and category
  const filteredAthletes = useMemo(() => {
    return athletes.filter((a) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!a.name.toLowerCase().includes(query) && !a.rgc.toLowerCase().includes(query)) {
          return false;
        }
      }
      // Filter by selected boat category base (K1, C1, etc.)
      const boatBase = selectedBoatCategory.replace(/[MW]$/, '');
      const athleteBase = a.category.replace(/[MW]$/, '');
      const athleteGender = a.category.endsWith('W') ? 'W' : 'M';
      const selectedGender = selectedBoatCategory.endsWith('W') ? 'W' : 'M';

      if (athleteGender !== selectedGender) return false;
      if (boatBase !== athleteBase && boatBase !== 'C2') return false; // C2 can have K and C paddlers

      return true;
    });
  }, [athletes, searchQuery, selectedBoatCategory]);

  // Get age category for athlete
  const getAgeCategoryForAthlete = (athlete: Athlete): string => {
    for (const ageCat of raceData.ageCategories) {
      if (ageCat.years && ageCat.years.includes(athlete.birthYear)) {
        return ageCat.name;
      }
    }
    return 'Dospělí';
  };

  // Add athlete to entries (handles both single and crew categories)
  const addAthleteToEntry = (athlete: Athlete) => {
    // Check if this is a crew category (C2)
    if (isCrewCategory(selectedBoatCategory)) {
      if (selectionMode === 'single') {
        // First athlete selected for C2 - store and ask for partner
        setPendingCrewEntry({
          athlete,
          boatCategory: selectedBoatCategory,
          ageCategory: getAgeCategoryForAthlete(athlete),
          discipline: selectedDiscipline,
        });
        setSelectionMode('partner');
        toast.info(`Nyní vyberte partnera pro ${athlete.name}.`, { title: 'Vyberte partnera' });
      } else {
        // Second athlete (partner) selected
        if (pendingCrewEntry) {
          const newEntry: RegistrationEntry = {
            id: Date.now(),
            athlete: pendingCrewEntry.athlete,
            boatCategory: pendingCrewEntry.boatCategory,
            ageCategory: pendingCrewEntry.ageCategory,
            discipline: pendingCrewEntry.discipline,
            partner: athlete,
          };
          setEntries([...entries, newEntry]);
          toast.success(
            `Posádka ${pendingCrewEntry.athlete.name} + ${athlete.name} byla přidána.`,
            { title: 'Posádka přidána' }
          );
          // Reset crew selection state
          setPendingCrewEntry(null);
          setSelectionMode('single');
          if (!keepModalOpen) {
            setShowAthleteModal(false);
          }
        }
      }
    } else {
      // Single boat category (K1, C1)
      const newEntry: RegistrationEntry = {
        id: Date.now(),
        athlete,
        boatCategory: selectedBoatCategory,
        ageCategory: getAgeCategoryForAthlete(athlete),
        discipline: selectedDiscipline,
      };
      setEntries([...entries, newEntry]);
      if (!keepModalOpen) {
        setShowAthleteModal(false);
      }
      toast.success(`${athlete.name} byl přidán do přihlášky.`, { title: 'Závodník přidán' });
    }
  };

  // Cancel crew selection and go back to single mode
  const cancelCrewSelection = () => {
    setPendingCrewEntry(null);
    setSelectionMode('single');
  };

  // Open modal with reset state
  const openAthleteModal = () => {
    setSelectionMode('single');
    setPendingCrewEntry(null);
    setShowAthleteModal(true);
  };

  // Close modal with cleanup
  const closeAthleteModal = () => {
    setShowAthleteModal(false);
    setSelectionMode('single');
    setPendingCrewEntry(null);
  };

  // Remove entry
  const removeEntry = (entryId: number) => {
    setEntries(entries.filter((e) => e.id !== entryId));
    toast.info('Závodník byl odebrán z přihlášky.', { title: 'Závodník odebrán' });
  };

  // Calculate totals
  const totalFees = useMemo(() => {
    return entries.reduce((sum, entry) => {
      const isTeam = entry.boatCategory.startsWith('C2');
      return sum + (isTeam ? raceData.fees.team : raceData.fees.individual);
    }, 0);
  }, [entries]);

  // Steps configuration
  const steps = [
    { id: 'header', label: 'Záhlaví přihlášky', icon: <Icon name="file-text" size="md" /> },
    { id: 'athletes', label: 'Výběr závodníků', icon: <Icon name="users" size="sm" /> },
    { id: 'summary', label: 'Shrnutí a odeslání', icon: <Icon name="clipboard-check" size="md" /> },
  ];

  // Calculate time to deadline
  const timeToDeadline = useMemo(() => {
    const now = new Date();
    const diff = raceData.deadline.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 0) return { days, hours, text: `${days} dní, ${hours} hodin` };
    if (hours > 0) return { days: 0, hours, text: `${hours} hodin` };
    return { days: 0, hours: 0, text: 'Uzávěrka proběhla' };
  }, []);

  // Validation for header step
  const isHeaderValid = headerData.teamLeader.trim() !== '' &&
    headerData.teamLeaderPhone.trim() !== '' &&
    headerData.teamLeaderEmail.trim() !== '';

  // Count warnings in entries
  const entriesWithWarnings = entries.filter(
    (e) => e.athlete.healthCheck !== 'valid' || e.athlete.fees === 'unpaid'
  ).length;

  // Render header based on variant (embed has no header - uses host layout)
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
          appName="Přihlášky"
          homeLink="https://kanoe.cz"
          homeLinkLabel="kanoe.cz"
          userMenu={
            <div className="registration-page__user-info">
              <span className="registration-page__club-name">{clubName}</span>
              <Button variant="ghost" size="sm">
                Odhlásit
              </Button>
            </div>
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
          <a href="#" className="registration-page__logo">
            <span className="registration-page__logo-text">CSK</span>
            <span className="registration-page__logo-subtitle">Český svaz kanoistů</span>
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
          <div className="registration-page__user-info">
            <span className="registration-page__club-name">{clubName}</span>
            <Button variant="ghost" size="sm">
              Odhlásit
            </Button>
          </div>
        }
      />
    );
  };

  // Render page header based on variant
  const renderPageHeader = () => {
    // Both embed and satellite use compact header
    if (variant === 'embed' || variant === 'satellite') {
      return (
        <section className="registration-page-header registration-page-header--satellite">
          <div className="registration-page-header__content">
            {variant === 'satellite' && (
              <div className="registration-page-header__breadcrumb">
                <a href="https://kanoe.cz" className="registration-page-header__breadcrumb-link">Domů</a>
                <span className="registration-page-header__breadcrumb-separator">/</span>
                <a href="#" className="registration-page-header__breadcrumb-link">Přihlášky</a>
                <span className="registration-page-header__breadcrumb-separator">/</span>
                <span>{raceData.name}</span>
              </div>
            )}
            <div className="registration-page-header__row">
              <div className="registration-page-header__info">
                <div className="registration-page-header__badges">
                  <Badge section={section} size="sm">
                    {sectionNames[section]}
                  </Badge>
                </div>
                <h1 className="registration-page-header__title">{raceData.name}</h1>
                <p className="registration-page-header__meta">
                  <span className="registration-page-header__meta-item">
                    <Icon name="calendar" size="sm" />
                    {raceData.date}
                  </span>
                  <span className="registration-page-header__meta-item">
                    <Icon name="location" size="sm" />
                    {raceData.location}
                  </span>
                  <span className="registration-page-header__meta-item">
                    <Icon name="clock" size="sm" />
                    {timeToDeadline.text} do uzávěrky
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      );
    }
    // Standalone: hero section
    return (
      <section className={`registration-page-hero registration-page-hero--${section}`}>
        <div className="registration-page-hero__background">
          <div className="registration-page-hero__gradient" />
          <div className="registration-page-hero__pattern" />
        </div>
        <div className="registration-page-hero__content">
          {/* Breadcrumb */}
          <nav className="registration-page-hero__breadcrumb">
            <a href="#" className="registration-page-hero__breadcrumb-link">Přihlášky</a>
            <Icon name="chevron-right" size="sm" />
            <a href="#" className="registration-page-hero__breadcrumb-link">Kalendář závodů</a>
            <Icon name="chevron-right" size="sm" />
            <span className="registration-page-hero__breadcrumb-current">{raceData.name}</span>
          </nav>

          <div className="registration-page-hero__main">
            <div className="registration-page-hero__text">
              <div className="registration-page-hero__badges">
                <Badge section={section} size="md">
                  {sectionNames[section]}
                </Badge>
                <Badge variant="default" size="md" outlined>
                  Český pohár
                </Badge>
              </div>
              <h1 className="registration-page-hero__title">{raceData.name}</h1>
              <div className="registration-page-hero__meta">
                <span className="registration-page-hero__meta-item">
                  <Icon name="calendar" size="sm" />
                  {raceData.date}
                </span>
                <span className="registration-page-hero__meta-item">
                  <Icon name="location" size="sm" />
                  {raceData.location}
                </span>
              </div>
            </div>

            <div className="registration-page-hero__stats">
              <div className="registration-page-hero__stat registration-page-hero__stat--deadline">
                <div className="registration-page-hero__stat-icon">
                  <Icon name="clock" size="sm" />
                </div>
                <div className="registration-page-hero__stat-content">
                  <span className="registration-page-hero__stat-value">{timeToDeadline.days}</span>
                  <span className="registration-page-hero__stat-label">dní do uzávěrky</span>
                </div>
              </div>
              <div className="registration-page-hero__stat">
                <div className="registration-page-hero__stat-icon">
                  <Icon name="users" size="sm" />
                </div>
                <div className="registration-page-hero__stat-content">
                  <span className="registration-page-hero__stat-value">{athletes.length}</span>
                  <span className="registration-page-hero__stat-label">závodníků v oddílu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Table data for entries
  const entriesTableData = entries.filter((e) => e.discipline === selectedDiscipline).map((entry) => {
    const healthStatus = getHealthCheckStatus(entry.athlete);
    const isCrew = isCrewCategory(entry.boatCategory);
    const partnerHealthStatus = entry.partner ? getHealthCheckStatus(entry.partner) : null;

    // Build name display with partner for C2 categories
    const nameDisplay = isCrew && entry.partner ? (
      <div className="registration-page__crew-names">
        <span className="registration-page__crew-primary">{entry.athlete.name}</span>
        <span className="registration-page__crew-separator">+</span>
        <span className="registration-page__crew-partner">{entry.partner.name}</span>
      </div>
    ) : entry.athlete.name;

    // Build RGC display
    const rgcDisplay = isCrew && entry.partner ? (
      <div className="registration-page__crew-rgc">
        <span>{entry.athlete.rgc}</span>
        <span className="registration-page__crew-rgc-separator">/</span>
        <span>{entry.partner.rgc}</span>
      </div>
    ) : entry.athlete.rgc;

    // Build status display (check both athletes for C2)
    const hasHealthIssue = entry.athlete.healthCheck !== 'valid' ||
      (entry.partner && entry.partner.healthCheck !== 'valid');
    const hasFeeIssue = entry.athlete.fees === 'unpaid' ||
      (entry.partner && entry.partner.fees === 'unpaid');

    return {
      id: entry.id,
      name: nameDisplay,
      rgc: rgcDisplay,
      category: (
        <div className="registration-page__category-cell">
          {isCrew && <Icon name="users-team" size="sm" />}
          <span>{entry.boatCategory}</span>
        </div>
      ),
      ageCategory: entry.ageCategory,
      vt: isCrew && entry.partner
        ? `${entry.athlete.vt}/${entry.partner.vt}`
        : entry.athlete.vt,
      status: (
        <div className="registration-page__status-cell">
          {hasHealthIssue && (
            <Badge variant={healthStatus.variant === 'error' || partnerHealthStatus?.variant === 'error' ? 'error' : 'warning'} size="sm">
              <Icon name="alert-circle" size="sm" /> Prohlídka
            </Badge>
          )}
          {hasFeeIssue && (
            <Badge variant="warning" size="sm">
              <Icon name="alert-circle" size="sm" /> Příspěvky
            </Badge>
          )}
          {!hasHealthIssue && !hasFeeIssue && (
            <Badge variant="success" size="sm">
              <Icon name="check-circle" size="sm" /> OK
            </Badge>
          )}
        </div>
      ),
      actions: (
        <Button
          variant="ghost"
          size="sm"
          iconLeft={<Icon name="trash" size="sm" />}
          onClick={() => removeEntry(entry.id)}
          aria-label="Odebrat závodníka"
        />
      ),
    };
  });

  // Table data for summary
  const summaryTableData = entries.map((entry) => ({
    id: entry.id,
    discipline: raceData.disciplines.find((d) => d.id === entry.discipline)?.name || '',
    name: entry.athlete.name,
    category: `${entry.boatCategory} / ${entry.ageCategory}`,
    fee: `${entry.boatCategory.startsWith('C2') ? raceData.fees.team : raceData.fees.individual} Kč`,
  }));

  // Build page class names - all variants use aesthetic design
  const pageClasses = [
    'registration-page',
    `registration-page--${section}`,
    'registration-page--aesthetic',
    variant === 'satellite' && 'registration-page--satellite',
    variant === 'embed' && 'registration-page--embed',
  ].filter(Boolean).join(' ');

  return (
    <div className={pageClasses}>
      {/* Header */}
      {renderHeader()}

      {/* Page Header / Hero Section */}
      {renderPageHeader()}

      {/* Main content */}
      <main className="registration-page__main">
        <div className="registration-page__container">
          {/* Wizard Progress */}
          <div className="registration-page__wizard">
            <div className="registration-page__wizard-steps">
              {steps.map((step, index) => (
                <WizardStep
                  key={step.id}
                  step={index}
                  currentStep={currentStep}
                  label={step.label}
                  icon={step.icon}
                  isLast={index === steps.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="registration-page__content">
            {/* Main Panel */}
            <div className="registration-page__main-panel">
              {/* Step 0: Header */}
              {currentStep === 0 && (
                <Card variant="surface" padding="lg" className="registration-page__step-card">
                  <div className="registration-page__step-header">
                    <div className="registration-page__step-icon">
                      <Icon name="file-text" size="md" />
                    </div>
                    <div>
                      <h2 className="registration-page__section-title">Záhlaví přihlášky</h2>
                      <p className="registration-page__section-desc">
                        Vyplňte kontaktní údaje vedoucího družstva, který bude zodpovědný za přihlášku.
                      </p>
                    </div>
                  </div>

                  <div className="registration-page__form">
                    <div className="registration-page__form-row">
                      <Input
                        label="Vedoucí družstva *"
                        placeholder="Jméno a příjmení"
                        value={headerData.teamLeader}
                        onChange={(e) => setHeaderData({ ...headerData, teamLeader: e.target.value })}
                        fullWidth
                      />
                    </div>
                    <div className="registration-page__form-row registration-page__form-row--split">
                      <Input
                        label="Telefon *"
                        type="tel"
                        placeholder="+420 xxx xxx xxx"
                        value={headerData.teamLeaderPhone}
                        onChange={(e) => setHeaderData({ ...headerData, teamLeaderPhone: e.target.value })}
                        fullWidth
                      />
                      <Input
                        label="E-mail *"
                        type="email"
                        placeholder="email@example.com"
                        value={headerData.teamLeaderEmail}
                        onChange={(e) => setHeaderData({ ...headerData, teamLeaderEmail: e.target.value })}
                        fullWidth
                      />
                    </div>
                    <div className="registration-page__form-row">
                      <Input
                        label="Přihlašující osoba"
                        placeholder="Pokud se liší od vedoucího"
                        value={headerData.submitter}
                        onChange={(e) => setHeaderData({ ...headerData, submitter: e.target.value })}
                        fullWidth
                      />
                    </div>
                    <div className="registration-page__form-row">
                      <Input
                        label="Poznámky pro pořadatele"
                        placeholder="Případné poznámky k přihlášce..."
                        value={headerData.notes}
                        onChange={(e) => setHeaderData({ ...headerData, notes: e.target.value })}
                        fullWidth
                      />
                    </div>
                  </div>

                  <div className="registration-page__form-actions">
                    <Button
                      variant="primary"
                      onClick={() => setCurrentStep(1)}
                      disabled={!isHeaderValid}
                    >
                      Pokračovat k výběru závodníků
                    </Button>
                  </div>
                </Card>
              )}

              {/* Step 1: Athletes */}
              {currentStep === 1 && (
                <>
                  <Card variant="surface" padding="lg" className="registration-page__step-card">
                    <div className="registration-page__athletes-header">
                      <div className="registration-page__step-header">
                        <div className="registration-page__step-icon">
                          <Icon name="users" size="sm" />
                        </div>
                        <div>
                          <h2 className="registration-page__section-title">Výběr závodníků</h2>
                          <p className="registration-page__section-desc">
                            Přidejte závodníky z vašeho oddílu do přihlášky.
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="primary"
                        iconLeft={<Icon name="user-plus" size="md" />}
                        onClick={openAthleteModal}
                      >
                        Přidat závodníka
                      </Button>
                    </div>

                    <div className="registration-page__discipline-select">
                      <Tabs
                        tabs={raceData.disciplines.map((d) => ({
                          id: d.id,
                          label: d.name,
                          content: null,
                        }))}
                        activeTab={selectedDiscipline}
                        onChange={(id) => setSelectedDiscipline(id)}
                        variant="pills"
                        size="sm"
                      />
                    </div>

                    {entries.length > 0 ? (
                      <div className="registration-page__entries-table">
                        <Table
                          columns={[
                            { key: 'name', header: 'Závodník', sortable: true },
                            { key: 'rgc', header: 'RGC' },
                            { key: 'category', header: 'Kategorie' },
                            { key: 'ageCategory', header: 'Věk. kat.' },
                            { key: 'vt', header: 'VT' },
                            { key: 'status', header: 'Stav' },
                            { key: 'actions', header: '' },
                          ]}
                          data={entriesTableData}
                          rowKey="id"
                          variant="striped"
                          size="sm"
                        />
                      </div>
                    ) : (
                      <EmptyState
                        title="Zatím žádní závodníci"
                        description='Klikněte na tlačítko "Přidat závodníka" pro přidání členů oddílu do přihlášky.'
                        action={
                          <Button
                            variant="primary"
                            iconLeft={<Icon name="user-plus" size="md" />}
                            onClick={openAthleteModal}
                          >
                            Přidat závodníka
                          </Button>
                        }
                      />
                    )}
                  </Card>

                  <div className="registration-page__step-actions">
                    <Button variant="secondary" onClick={() => setCurrentStep(0)}>
                      Zpět
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setCurrentStep(2)}
                      disabled={entries.length === 0}
                    >
                      Pokračovat ke shrnutí
                    </Button>
                  </div>
                </>
              )}

              {/* Step 2: Summary */}
              {currentStep === 2 && (
                <>
                  <Card variant="surface" padding="lg" className="registration-page__step-card">
                    <div className="registration-page__step-header">
                      <div className="registration-page__step-icon registration-page__step-icon--success">
                        <Icon name="clipboard-check" size="md" />
                      </div>
                      <div>
                        <h2 className="registration-page__section-title">Shrnutí přihlášky</h2>
                        <p className="registration-page__section-desc">
                          Zkontrolujte údaje a odešlete přihlášku.
                        </p>
                      </div>
                    </div>

                    <div className="registration-page__summary-section">
                      <h3 className="registration-page__summary-subtitle">Kontaktní údaje</h3>
                      <div className="registration-page__summary-grid">
                        <div className="registration-page__summary-item">
                          <span className="registration-page__summary-label">Vedoucí družstva</span>
                          <span className="registration-page__summary-value">{headerData.teamLeader}</span>
                        </div>
                        <div className="registration-page__summary-item">
                          <span className="registration-page__summary-label">Telefon</span>
                          <span className="registration-page__summary-value">{headerData.teamLeaderPhone}</span>
                        </div>
                        <div className="registration-page__summary-item">
                          <span className="registration-page__summary-label">E-mail</span>
                          <span className="registration-page__summary-value">{headerData.teamLeaderEmail}</span>
                        </div>
                        {headerData.submitter && (
                          <div className="registration-page__summary-item">
                            <span className="registration-page__summary-label">Přihlašující</span>
                            <span className="registration-page__summary-value">{headerData.submitter}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="registration-page__summary-section">
                      <h3 className="registration-page__summary-subtitle">
                        Přihlášení závodníci ({entries.length})
                        {entriesWithWarnings > 0 && (
                          <Badge variant="warning" size="sm" style={{ marginLeft: '8px' }}>
                            {entriesWithWarnings} s upozorněním
                          </Badge>
                        )}
                      </h3>
                      <Table
                        columns={[
                          { key: 'discipline', header: 'Disciplína' },
                          { key: 'name', header: 'Závodník' },
                          { key: 'category', header: 'Kategorie' },
                          { key: 'fee', header: 'Startovné' },
                        ]}
                        data={summaryTableData}
                        rowKey="id"
                        variant="default"
                        size="sm"
                      />
                    </div>

                    <div className="registration-page__summary-total">
                      <span className="registration-page__summary-total-label">Celkem startovné:</span>
                      <span className="registration-page__summary-total-value">{totalFees} Kč</span>
                    </div>

                    {entriesWithWarnings > 0 && (
                      <div className="registration-page__warning-box">
                        <Icon name="alert-circle" size="sm" />
                        <div>
                          <strong>Upozornění:</strong> {entriesWithWarnings} závodník(ů) má nevyhovující stav
                          (propadlá prohlídka nebo nezaplacené příspěvky). Přihlášku lze odeslat,
                          ale pořadatel bude informován.
                        </div>
                      </div>
                    )}

                    <div className="registration-page__confirmation">
                      <Checkbox
                        label="Potvrzuji správnost údajů a souhlasím s podmínkami závodu"
                        id="confirm"
                      />
                    </div>
                  </Card>

                  <div className="registration-page__step-actions">
                    <Button variant="secondary" onClick={() => setCurrentStep(1)}>
                      Zpět k úpravám
                    </Button>
                    <Button
                      variant="primary"
                      accent="energy"
                      iconLeft={<Icon name="send" size="sm" />}
                      onClick={() => {
                        toast.success('Vaše přihláška byla úspěšně odeslána. Potvrzení obdržíte e-mailem.', {
                          title: 'Přihláška odeslána',
                        });
                      }}
                    >
                      Odeslat přihlášku
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <aside className="registration-page__sidebar">
              {/* Registration Summary Card */}
              <Card variant="surface" padding="md" className="registration-page__summary-card">
                <div className="registration-page__card-header">
                  <h3 className="registration-page__card-title">Souhrn přihlášky</h3>
                </div>
                <div className="registration-page__summary-stats">
                  <div className="registration-page__stat">
                    <span className="registration-page__stat-value">{entries.length}</span>
                    <span className="registration-page__stat-label">Závodníků</span>
                  </div>
                  <div className="registration-page__stat">
                    <span className="registration-page__stat-value">{totalFees}</span>
                    <span className="registration-page__stat-label">Kč celkem</span>
                  </div>
                </div>

                {entries.length > 0 && (
                  <div className="registration-page__entries-by-discipline">
                    {raceData.disciplines.map((disc) => {
                      const count = entries.filter((e) => e.discipline === disc.id).length;
                      if (count === 0) return null;
                      return (
                        <div key={disc.id} className="registration-page__discipline-count">
                          <span>{disc.name}</span>
                          <Badge variant="default" size="sm">{count}</Badge>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>

              {/* Deadline Card - with energy glow for urgency */}
              <Card variant="outlined" padding="md" className={`registration-page__deadline-card registration-page__deadline-card--${section} csk-energy-glow--sm`}>
                <div className="registration-page__deadline-header">
                  <Icon name="clock" size="sm" />
                  <h3 className="registration-page__card-title">Uzávěrka přihlášek</h3>
                </div>
                <p className="registration-page__deadline-date">{formatDate(raceData.deadline)}</p>
                <div className="registration-page__deadline-countdown">
                  <div className="registration-page__countdown-item">
                    <span className="registration-page__countdown-value">{timeToDeadline.days}</span>
                    <span className="registration-page__countdown-label">dní</span>
                  </div>
                  <span className="registration-page__countdown-separator">:</span>
                  <div className="registration-page__countdown-item">
                    <span className="registration-page__countdown-value">{timeToDeadline.hours}</span>
                    <span className="registration-page__countdown-label">hodin</span>
                  </div>
                </div>
              </Card>

              {/* Club Info Card */}
              <Card variant="outlined" padding="md">
                <h3 className="registration-page__card-title">Přihlašující oddíl</h3>
                <p className="registration-page__club-name-large">{clubName}</p>
                <p className="registration-page__club-detail">
                  {athletes.length} registrovaných závodníků
                </p>
              </Card>

              {/* Help Card */}
              <Card variant="outlined" padding="md" className="registration-page__help-card">
                <h3 className="registration-page__card-title">Potřebujete pomoc?</h3>
                <p className="registration-page__help-text">
                  V případě problémů s přihláškou kontaktujte pořadatele závodu nebo sekretariát ČSK.
                </p>
                <Button variant="ghost" size="sm" fullWidth>
                  Kontaktovat podporu
                </Button>
              </Card>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer (not rendered in embed mode) */}
      {variant !== 'embed' && (
        <footer className="registration-page__footer">
          <div className="registration-page__footer-content">
            <p>© 2026 Český svaz kanoistů. Všechna práva vyhrazena.</p>
          </div>
        </footer>
      )}

      {/* Athlete Selection Modal */}
      <Modal
        open={showAthleteModal}
        onClose={closeAthleteModal}
        title={selectionMode === 'partner' ? 'Vyberte partnera pro posádku' : 'Přidat závodníka'}
        size="lg"
      >
        <div className="registration-page__modal-content">
          {/* Pending crew indicator */}
          {pendingCrewEntry && selectionMode === 'partner' && (
            <div className="registration-page__pending-crew">
              <div className="registration-page__pending-crew-info">
                <Icon name="users-team" size="sm" />
                <span className="registration-page__pending-crew-label">Posádka {pendingCrewEntry.boatCategory}:</span>
                <span className="registration-page__pending-crew-name">{pendingCrewEntry.athlete.name}</span>
                <span className="registration-page__pending-crew-plus">+</span>
                <span className="registration-page__pending-crew-waiting">čeká na partnera...</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconLeft={<Icon name="x" size="sm" />}
                onClick={cancelCrewSelection}
              >
                Zrušit
              </Button>
            </div>
          )}

          <div className="registration-page__modal-filters">
            <Input
              type="search"
              placeholder="Hledat podle jména nebo RGC..."
              iconLeft={<Icon name="search" size="md" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              clearable
              onClear={() => setSearchQuery('')}
              fullWidth
            />
            <Select
              label="Lodní kategorie"
              options={[
                { value: 'K1M', label: 'K1 Muži' },
                { value: 'K1W', label: 'K1 Ženy' },
                { value: 'C1M', label: 'C1 Muži' },
                { value: 'C1W', label: 'C1 Ženy' },
                { value: 'C2M', label: 'C2 Muži' },
                { value: 'C2X', label: 'C2 Mix' },
              ]}
              value={selectedBoatCategory}
              onChange={(e) => {
                setSelectedBoatCategory(e.target.value);
                // Reset crew selection when changing category
                if (pendingCrewEntry) {
                  cancelCrewSelection();
                }
              }}
              disabled={selectionMode === 'partner'} // Lock category when selecting partner
            />
          </div>

          <div className="registration-page__athlete-list">
            {filteredAthletes.length > 0 ? (
              filteredAthletes.map((athlete) => {
                const healthStatus = getHealthCheckStatus(athlete);
                // Check if athlete is already added to entries for this discipline
                const alreadyAdded = entries.some(
                  (e) => (e.athlete.id === athlete.id || e.partner?.id === athlete.id) && e.discipline === selectedDiscipline
                );
                // In partner mode, also exclude the first selected athlete
                const isFirstAthlete = pendingCrewEntry?.athlete.id === athlete.id;
                const isDisabled = alreadyAdded || isFirstAthlete;

                return (
                  <div
                    key={athlete.id}
                    className={`registration-page__athlete-item ${isDisabled ? 'registration-page__athlete-item--disabled' : ''} ${isFirstAthlete ? 'registration-page__athlete-item--selected' : ''}`}
                  >
                    <div className="registration-page__athlete-info">
                      <div className="registration-page__athlete-name">
                        {athlete.name}
                        <span className="registration-page__athlete-rgc">{athlete.rgc}</span>
                      </div>
                      <div className="registration-page__athlete-meta">
                        <span>Ročník {athlete.birthYear} ({calculateAge(athlete.birthYear)} let)</span>
                        <span>•</span>
                        <span>VT: {athlete.vt}</span>
                      </div>
                    </div>
                    <div className="registration-page__athlete-status">
                      <Badge variant={healthStatus.variant} size="sm">
                        {athlete.healthCheck === 'valid' ? <Icon name="check-circle" size="sm" /> : <Icon name="alert-circle" size="sm" />}
                        {healthStatus.label}
                      </Badge>
                      {athlete.fees === 'unpaid' && (
                        <Badge variant="warning" size="sm">
                          <Icon name="alert-circle" size="sm" /> Nezaplaceno
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant={selectionMode === 'partner' && !isDisabled ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => addAthleteToEntry(athlete)}
                      disabled={isDisabled}
                      iconLeft={selectionMode === 'partner' && !isDisabled ? <Icon name="plus" size="sm" /> : undefined}
                    >
                      {isFirstAthlete ? 'Vybrán' : alreadyAdded ? 'Přidáno' : selectionMode === 'partner' ? 'Přidat partnera' : 'Přidat'}
                    </Button>
                  </div>
                );
              })
            ) : (
              <EmptyState
                title="Žádní závodníci"
                description="Pro zadaná kritéria nebyli nalezeni žádní závodníci."
                size="sm"
              />
            )}
          </div>

          {/* Keep modal open checkbox - only show for single athletes */}
          {selectionMode === 'single' && (
            <div className="registration-page__modal-footer">
              <Checkbox
                label="Přidat další závodníky (nezavírat dialog)"
                id="keep-modal-open"
                checked={keepModalOpen}
                onChange={(e) => setKeepModalOpen(e.target.checked)}
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

// ============================================================================
// Page Component (with ToastProvider wrapper)
// ============================================================================

const RegistrationPage = (props: RegistrationPageProps) => {
  return (
    <ToastProvider position="bottom-right">
      <RegistrationPageInner {...props} />
    </ToastProvider>
  );
};

// ============================================================================
// Storybook Meta
// ============================================================================

const meta = {
  title: 'Prototypes/Registration Page',
  component: RegistrationPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Prototyp stránky pro oddílové přihlašování na závody. Aesthetic design s 3-krokovým wizard procesem, podporou C2 posádek a discipline theming.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['embed', 'satellite', 'standalone'],
      description: 'Display variant - embed (in kanoe.cz), satellite (minimal header), standalone (full)',
    },
    clubName: {
      control: 'text',
      description: 'Name of the club making the registration',
    },
    initialStep: {
      control: { type: 'range', min: 0, max: 2, step: 1 },
      description: 'Initial step of the registration process (0: header, 1: athletes, 2: summary)',
    },
    section: {
      control: 'select',
      options: ['dv', 'ry', 'vt'],
      description: 'Discipline section for theming',
    },
  },
} satisfies Meta<typeof RegistrationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Story Variants (2 aesthetic variants: Embed, Satellite)
// ============================================================================

/**
 * **EMBED varianta** - Přihlášky vložené do kanoe.cz layoutu.
 *
 * Aesthetic design s plnou funkcionalitou:
 * - 3-krokový wizard (záhlaví → závodníci → shrnutí)
 * - Podpora C2 posádek (vícečlenné přihlášky)
 * - Discipline theming (dv/ry/vt)
 * - Validace zdravotních prohlídek a příspěvků
 *
 * Bez vlastního headeru/footeru - používá layout hostitelské stránky.
 *
 * **Přepínání kroků:** Použij `initialStep` (0/1/2)
 * **C2 registrace:** V kroku 1, vyber kategorii C2M/C2X a přidej dva závodníky
 */
export const Embed: Story = {
  args: {
    variant: 'embed',
    clubName: 'TJ Bohemians Praha',
    initialStep: 0,
    section: 'dv',
  },
  decorators: [
    (Story) => (
      <KanoeCzContext
        layout="full"
        pageVariant="detail"
        pageTitle="Přihláška - Český pohár #2 ve slalomu"
        breadcrumbs={[
          { label: 'Úvod', href: '#' },
          { label: 'Přihlášky', href: '#' },
          { label: 'Český pohár #2' },
        ]}
      >
        <Story />
      </KanoeCzContext>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Přihlášky embedované v kontextu kanoe.cz. Bez vlastního headeru/footeru - používá layout hostitelské stránky.',
      },
    },
  },
};

/**
 * **SATELLITE varianta** - Standalone přihlášky s minimálním headerem.
 *
 * Aesthetic design s plnou funkcionalitou:
 * - Satellite header with CSK branding
 * - 3-krokový wizard (záhlaví → závodníci → shrnutí)
 * - Podpora C2 posádek (vícečlenné přihlášky)
 * - Discipline theming (dv/ry/vt)
 *
 * Standalone aplikace s odkazem zpět na kanoe.cz.
 *
 * **Přepínání kroků:** Použij `initialStep` (0/1/2)
 * **Disciplíny:** `section` = dv (modrá) / ry (zelená) / vt (červená)
 */
export const Satellite: Story = {
  args: {
    variant: 'satellite',
    clubName: 'TJ Bohemians Praha',
    initialStep: 0,
    section: 'dv',
  },
  parameters: {
    docs: {
      description: {
        story: 'Standalone aplikace přihlášek s Aesthetic designem. Obsahuje satellite header s odkazem na kanoe.cz.',
      },
    },
  },
};
