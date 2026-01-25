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
import './RegistrationPage.css';

// ============================================================================
// Types
// ============================================================================

/** Display variant for the page */
type RegistrationPageVariant = 'standalone' | 'satellite';

/** Visual style variant */
type RegistrationPageStyle = 'default' | 'aesthetic';

interface RegistrationPageProps {
  /** Club name */
  clubName?: string;
  /** Race ID */
  raceId?: string;
  /** Initial step */
  initialStep?: number;
  /** Section (discipline) */
  section?: 'dv' | 'ry' | 'vt';
  /** Display variant - standalone (full header with hero), satellite (minimal header) */
  variant?: RegistrationPageVariant;
  /** Visual style - default or aesthetic (Dynamic Sport) */
  style?: RegistrationPageStyle;
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

const CSKLogo = () => (
  <span className="registration-page__satellite-logo">
    <span className="registration-page__satellite-logo-text">CSK</span>
  </span>
);

// ============================================================================
// Icons
// ============================================================================

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const UserPlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const UsersTeamIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const FileTextIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const ClipboardCheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="2" />
    <path d="M9 14l2 2 4-4" />
  </svg>
);

// Note: WaveDecoration removed for cleaner design (Phase 8.6.3)

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
          {isCompleted ? <CheckCircleIcon /> : icon}
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
  style = 'default',
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
    { id: 'header', label: 'Záhlaví přihlášky', icon: <FileTextIcon /> },
    { id: 'athletes', label: 'Výběr závodníků', icon: <UsersIcon /> },
    { id: 'summary', label: 'Shrnutí a odeslání', icon: <ClipboardCheckIcon /> },
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

  // Render header based on variant
  const renderHeader = () => {
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
            iconLeft={<SearchIcon />}
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
    if (variant === 'satellite') {
      return (
        <section className="registration-page-header registration-page-header--satellite">
          <div className="registration-page-header__content">
            <div className="registration-page-header__breadcrumb">
              <a href="https://kanoe.cz" className="registration-page-header__breadcrumb-link">Domů</a>
              <span className="registration-page-header__breadcrumb-separator">/</span>
              <a href="#" className="registration-page-header__breadcrumb-link">Přihlášky</a>
              <span className="registration-page-header__breadcrumb-separator">/</span>
              <span>{raceData.name}</span>
            </div>
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
                    <CalendarIcon />
                    {raceData.date}
                  </span>
                  <span className="registration-page-header__meta-item">
                    <LocationIcon />
                    {raceData.location}
                  </span>
                  <span className="registration-page-header__meta-item">
                    <ClockIcon />
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
            <ChevronRightIcon />
            <a href="#" className="registration-page-hero__breadcrumb-link">Kalendář závodů</a>
            <ChevronRightIcon />
            <span className="registration-page-hero__breadcrumb-current">{raceData.name}</span>
          </nav>

          <div className="registration-page-hero__main">
            <div className="registration-page-hero__text">
              <div className="registration-page-hero__badges">
                <Badge section={section} size="md" glow>
                  {sectionNames[section]}
                </Badge>
                <Badge variant="default" size="md" outlined>
                  Český pohár
                </Badge>
              </div>
              <h1 className="registration-page-hero__title">{raceData.name}</h1>
              <div className="registration-page-hero__meta">
                <span className="registration-page-hero__meta-item">
                  <CalendarIcon />
                  {raceData.date}
                </span>
                <span className="registration-page-hero__meta-item">
                  <LocationIcon />
                  {raceData.location}
                </span>
              </div>
            </div>

            <div className="registration-page-hero__stats">
              <div className="registration-page-hero__stat registration-page-hero__stat--deadline">
                <div className="registration-page-hero__stat-icon">
                  <ClockIcon />
                </div>
                <div className="registration-page-hero__stat-content">
                  <span className="registration-page-hero__stat-value">{timeToDeadline.days}</span>
                  <span className="registration-page-hero__stat-label">dní do uzávěrky</span>
                </div>
              </div>
              <div className="registration-page-hero__stat">
                <div className="registration-page-hero__stat-icon">
                  <UsersIcon />
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
          {isCrew && <UsersTeamIcon />}
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
              <AlertIcon /> Prohlídka
            </Badge>
          )}
          {hasFeeIssue && (
            <Badge variant="warning" size="sm">
              <AlertIcon /> Příspěvky
            </Badge>
          )}
          {!hasHealthIssue && !hasFeeIssue && (
            <Badge variant="success" size="sm">
              <CheckCircleIcon /> OK
            </Badge>
          )}
        </div>
      ),
      actions: (
        <Button
          variant="ghost"
          size="sm"
          iconLeft={<TrashIcon />}
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

  // Build page class names
  const isAesthetic = style === 'aesthetic';
  const pageClasses = [
    'registration-page',
    `registration-page--${section}`,
    variant === 'satellite' && 'registration-page--satellite',
    isAesthetic && 'registration-page--aesthetic',
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
                      <FileTextIcon />
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
                          <UsersIcon />
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
                        iconLeft={<UserPlusIcon />}
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
                            iconLeft={<UserPlusIcon />}
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
                        <ClipboardCheckIcon />
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
                        <AlertIcon />
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
                      iconLeft={<SendIcon />}
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

              {/* Deadline Card */}
              <Card variant="outlined" padding="md" className={`registration-page__deadline-card registration-page__deadline-card--${section}`}>
                <div className="registration-page__deadline-header">
                  <ClockIcon />
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

      {/* Footer */}
      <footer className="registration-page__footer">
        <div className="registration-page__footer-content">
          <p>© 2026 Český svaz kanoistů. Všechna práva vyhrazena.</p>
        </div>
      </footer>

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
                <UsersTeamIcon />
                <span className="registration-page__pending-crew-label">Posádka {pendingCrewEntry.boatCategory}:</span>
                <span className="registration-page__pending-crew-name">{pendingCrewEntry.athlete.name}</span>
                <span className="registration-page__pending-crew-plus">+</span>
                <span className="registration-page__pending-crew-waiting">čeká na partnera...</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconLeft={<XIcon />}
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
              iconLeft={<SearchIcon />}
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
                        {athlete.healthCheck === 'valid' ? <CheckCircleIcon /> : <AlertIcon />}
                        {healthStatus.label}
                      </Badge>
                      {athlete.fees === 'unpaid' && (
                        <Badge variant="warning" size="sm">
                          <AlertIcon /> Nezaplaceno
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant={selectionMode === 'partner' && !isDisabled ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => addAthleteToEntry(athlete)}
                      disabled={isDisabled}
                      iconLeft={selectionMode === 'partner' && !isDisabled ? <PlusIcon /> : undefined}
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
          'Prototyp stránky pro oddílové přihlašování na závody. Umožňuje vyplnit záhlaví přihlášky, vybrat závodníky z oddílu a odeslat přihlášku pořadateli. Redesign s hero sekcí, vizuálním wizard progress a discipline theming.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standalone', 'satellite'],
      description: 'Display variant',
    },
    clubName: {
      control: 'text',
      description: 'Name of the club making the registration',
    },
    initialStep: {
      control: { type: 'range', min: 0, max: 2, step: 1 },
      description: 'Initial step of the registration process',
    },
    section: {
      control: 'select',
      options: ['dv', 'ry', 'vt'],
      description: 'Discipline section for theming',
    },
    style: {
      control: 'select',
      options: ['default', 'aesthetic'],
      description: 'Visual style - default or aesthetic (Dynamic Sport)',
    },
  },
} satisfies Meta<typeof RegistrationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Satellite varianta - přihlášky s minimálním headerem pro interní aplikace.
 *
 * Použij args pro přepnutí:
 * - `initialStep: 0/1/2` - krok wizardu (záhlaví / výběr závodníků / shrnutí)
 * - `section: 'dv'/'ry'/'vt'` - disciplína (divoká voda / rychlost / vodní turistika)
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
        story: `Wizard pro oddílové přihlašování na závody se satellite headerem. Čistý design pro interní aplikace.

**Použij args pro přepnutí kroku:**
- \`initialStep: 0\` - Záhlaví přihlášky (kontaktní údaje)
- \`initialStep: 1\` - Výběr závodníků
- \`initialStep: 2\` - Shrnutí a odeslání

**Disciplíny (mění barevné téma):**
- \`section: 'dv'\` - Divoká voda (modrá)
- \`section: 'ry'\` - Rychlost (zelená)
- \`section: 'vt'\` - Vodní turistika (červená)`,
      },
    },
  },
};

// ============================================================================
// Aesthetic Variants - Dynamic Sport visual style (Phase 15.0)
// ============================================================================

/**
 * Aesthetic varianta - Záhlaví přihlášky (krok 1).
 * Mesh backgrounds, display typography, energy accents.
 */
export const AestheticHeader: Story = {
  args: {
    variant: 'standalone',
    clubName: 'TJ Bohemians Praha',
    initialStep: 0,
    section: 'dv',
    style: 'aesthetic',
  },
};

/**
 * Aesthetic varianta - Výběr závodníků (krok 2).
 * Staggered reveals, hover glow effects.
 */
export const AestheticAthletes: Story = {
  args: {
    variant: 'standalone',
    clubName: 'TJ Bohemians Praha',
    initialStep: 1,
    section: 'dv',
    style: 'aesthetic',
  },
};

/**
 * Aesthetic varianta - Shrnutí a odeslání (krok 3).
 * Energy CTA, border accents on summary cards.
 */
export const AestheticSummary: Story = {
  args: {
    variant: 'standalone',
    clubName: 'TJ Bohemians Praha',
    initialStep: 2,
    section: 'dv',
    style: 'aesthetic',
  },
};

/**
 * Aesthetic varianta - Rychlostní kanoistika.
 * Zelené barevné schéma s aesthetic efekty.
 */
export const AestheticRychlost: Story = {
  args: {
    variant: 'standalone',
    clubName: 'SK Slavia Praha',
    initialStep: 0,
    section: 'ry',
    style: 'aesthetic',
  },
};

// ============================================================================
// Crew Registration Stories - C2 multi-athlete selection
// ============================================================================

/**
 * C2 Crew Registration - Vícečlenné posádky.
 * Demonstrace UX pro registraci C2 kategorií (dva závodníci v lodi).
 *
 * **Workflow:**
 * 1. Vyber kategorii C2M nebo C2X
 * 2. Klikni na "Přidat závodníka"
 * 3. Vyber prvního závodníka - zobrazí se indikátor "čeká na partnera"
 * 4. Vyber druhého závodníka (partnera)
 * 5. Posádka je přidána do přihlášky
 *
 * **Tipy:**
 * - Checkbox "Přidat další závodníky" ponechá dialog otevřený
 * - Kategorie je zamčena během výběru partnera
 * - Zrušení výběru vrátí do normálního režimu
 */
export const CrewRegistration: Story = {
  args: {
    variant: 'standalone',
    clubName: 'USK Praha',
    initialStep: 1,
    section: 'dv',
    style: 'aesthetic',
  },
  parameters: {
    docs: {
      description: {
        story: `Demonstrace registrace vícečlenných posádek (C2).

**Jak to funguje:**
1. V dialogu "Přidat závodníka" vyberte kategorii C2M nebo C2X
2. Klikněte na prvního člena posádky
3. Zobrazí se indikátor s vybraným závodníkem a výzva k výběru partnera
4. Kategorie je zamčena - nelze měnit během výběru
5. Vyberte partnera - posádka se vytvoří

**V tabulce se zobrazí:**
- Oba členové posádky (jméno + partner)
- Oba RGC kódy
- Kombinovaný VT rating
- Stav obou závodníků`,
      },
    },
  },
};
