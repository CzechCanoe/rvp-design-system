/**
 * Central test configuration for design system tests
 * Single source of truth for story IDs and test parameters
 */

// Component tier definitions
export type ComponentTier = 'core' | 'advanced' | 'specific';

export interface ComponentConfig {
  name: string;
  storyId: string;
  tier: ComponentTier;
  /** CSS features to verify in cross-browser tests */
  cssFeatures?: string[];
  /** Higher tolerance for animated components */
  maxDiffPixels?: number;
}

export interface PrototypeConfig {
  name: string;
  storyId: string;
  /** Higher tolerance for pages with animations */
  maxDiffPixels?: number;
  /** Extended timeout for complex pages */
  timeout?: number;
}

// =============================================================================
// COMPONENTS
// =============================================================================

export const coreComponents: ComponentConfig[] = [
  { name: 'Button', storyId: 'components-button--default', tier: 'core' },
  { name: 'Button-Variants', storyId: 'components-button--variants', tier: 'core', cssFeatures: ['gradients', 'transitions'] },
  { name: 'Input', storyId: 'components-input--default', tier: 'core' },
  { name: 'Input-States', storyId: 'components-input--states', tier: 'core' },
  { name: 'Select', storyId: 'components-select--default', tier: 'core' },
  { name: 'Checkbox', storyId: 'components-checkbox--default', tier: 'core' },
  { name: 'Radio', storyId: 'components-radio--default', tier: 'core' },
  { name: 'Switch', storyId: 'components-switch--default', tier: 'core' },
  { name: 'Card', storyId: 'components-card--default', tier: 'core' },
  { name: 'Card-Variants', storyId: 'components-card--variants', tier: 'core', cssFeatures: ['flexbox', 'shadows', 'gradients'] },
  { name: 'Badge', storyId: 'components-badge--default', tier: 'core' },
  { name: 'Badge-CskSections', storyId: 'components-badge--csk-sections', tier: 'core', cssFeatures: ['gradients', 'colors'] },
  { name: 'Avatar', storyId: 'components-avatar--default', tier: 'core' },
];

export const advancedComponents: ComponentConfig[] = [
  { name: 'Table', storyId: 'components-table--default', tier: 'advanced', cssFeatures: ['grid', 'sticky-header'] },
  { name: 'Modal', storyId: 'components-modal--default', tier: 'advanced' },
  { name: 'Modal-StyleVariants', storyId: 'components-modal--all-style-variants', tier: 'advanced', cssFeatures: ['backdrop-filter', 'animations'] },
  { name: 'Tabs', storyId: 'components-tabs--default', tier: 'advanced', cssFeatures: ['flexbox', 'underline'] },
  { name: 'Toast', storyId: 'components-toast--all-style-variants', tier: 'advanced' },
  { name: 'Breadcrumbs', storyId: 'components-navigation-breadcrumbs--default', tier: 'advanced' },
  { name: 'Pagination', storyId: 'components-pagination--default', tier: 'advanced' },
  { name: 'ProgressBar', storyId: 'components-progress--bar-default', tier: 'advanced' },
  { name: 'ProgressSteps', storyId: 'components-progress--steps-default', tier: 'advanced' },
  { name: 'Dropdown', storyId: 'components-dropdown--default', tier: 'advanced' },
];

export const specificComponents: ComponentConfig[] = [
  { name: 'Header', storyId: 'components-header--default', tier: 'specific' },
  { name: 'Header-Glass', storyId: 'components-header--glass', tier: 'specific', cssFeatures: ['backdrop-filter'] },
  { name: 'Calendar', storyId: 'components-calendar--default', tier: 'specific', cssFeatures: ['grid', 'responsive'] },
  { name: 'Dropzone', storyId: 'components-dropzone--default', tier: 'specific' },
  { name: 'Timeline', storyId: 'components-timeline--default', tier: 'specific' },
  { name: 'StatCard', storyId: 'components-statcard--default', tier: 'specific' },
  { name: 'AthleteCard', storyId: 'components-athletecard--default', tier: 'specific' },
  { name: 'ResultsTable', storyId: 'components-resultstable--default', tier: 'specific' },
  { name: 'LiveIndicator', storyId: 'components-liveindicator--default', tier: 'specific', cssFeatures: ['animations', 'keyframes'], maxDiffPixels: 100 },
  { name: 'EmptyState', storyId: 'components-emptystate--default', tier: 'specific' },
  { name: 'Skeleton', storyId: 'components-skeleton--default', tier: 'specific', cssFeatures: ['animations', 'shimmer'] },
];

/** All components for visual regression testing */
export const allComponents: ComponentConfig[] = [
  ...coreComponents,
  ...advancedComponents,
  ...specificComponents,
];

/** Components with CSS features worth cross-browser testing */
export const crossBrowserComponents = allComponents.filter(c => c.cssFeatures && c.cssFeatures.length > 0);

// =============================================================================
// PROTOTYPES - Complete coverage for Phase 22 CSS Consolidation
// =============================================================================

/**
 * Embed prototypes - for embedding into kanoe.cz
 *
 * Story ID format follows Storybook convention:
 * - 'Prototypes/Calendar Page' → 'prototypes-calendar-page--*'
 * - 'Prototypes/ProfilePage' → 'prototypes-profilepage--*' (no space = no hyphen)
 */
export const embedPrototypes: PrototypeConfig[] = [
  // Calendar Page
  { name: 'CalendarPage-Embed', storyId: 'prototypes-calendar-page--embed' },
  { name: 'CalendarPage-EmbedListView', storyId: 'prototypes-calendar-page--embed-list-view' },
  // Results & Live
  { name: 'ResultsPage-Embed', storyId: 'prototypes-results-page--embed' },
  { name: 'LivePage-Embed', storyId: 'prototypes-live-page--embed', maxDiffPixels: 6000, timeout: 30000 },
  // Lists
  { name: 'AthletesListPage-Embed', storyId: 'prototypes-athletes-list-page--embed' },
  { name: 'ClubsListPage-Embed', storyId: 'prototypes-clubs-list-page--embed' },
  { name: 'RankingsPage-Embed', storyId: 'prototypes-rankings-page--embed' },
  // Profiles (note: no space in title = no hyphen in storyId)
  { name: 'AthletePublicProfile-Embed', storyId: 'prototypes-athletepublicprofile--embed' },
  { name: 'ClubPublicProfile-Embed', storyId: 'prototypes-clubpublicprofile--embed' },
  // Event Detail
  { name: 'EventDetailPage-Embed', storyId: 'prototypes-event-detail-page--embed' },
  // Registration (countdown timer causes pixel variance)
  { name: 'RegistrationPage-Embed', storyId: 'prototypes-registration-page--embed', maxDiffPixels: 1500 },
  // Dashboard & Profile (ProfilePage has no space in title)
  { name: 'DashboardPage-Embed', storyId: 'prototypes-dashboard-page--embed', timeout: 60000 },
  { name: 'ProfilePage-Embed', storyId: 'prototypes-profilepage--embed' },
];

/** Satellite prototypes - standalone pages with minimal header */
export const satellitePrototypes: PrototypeConfig[] = [
  // Calendar Page
  { name: 'CalendarPage-Satellite', storyId: 'prototypes-calendar-page--satellite' },
  { name: 'CalendarPage-SatelliteListView', storyId: 'prototypes-calendar-page--satellite-list-view' },
  // Results & Live
  { name: 'ResultsPage-Satellite', storyId: 'prototypes-results-page--satellite', maxDiffPixels: 500 },
  { name: 'LivePage-Satellite', storyId: 'prototypes-live-page--satellite', maxDiffPixels: 6000, timeout: 30000 },
  // Lists
  { name: 'AthletesListPage-Satellite', storyId: 'prototypes-athletes-list-page--satellite' },
  { name: 'ClubsListPage-Satellite', storyId: 'prototypes-clubs-list-page--satellite' },
  { name: 'RankingsPage-Satellite', storyId: 'prototypes-rankings-page--satellite' },
  // Profiles
  { name: 'AthletePublicProfile-Satellite', storyId: 'prototypes-athletepublicprofile--satellite' },
  { name: 'ClubPublicProfile-Satellite', storyId: 'prototypes-clubpublicprofile--satellite' },
  // Event Detail
  { name: 'EventDetailPage-Satellite', storyId: 'prototypes-event-detail-page--satellite' },
  // Registration (countdown timer causes pixel variance)
  { name: 'RegistrationPage-Satellite', storyId: 'prototypes-registration-page--satellite', maxDiffPixels: 1500 },
  // Dashboard & Profile
  { name: 'DashboardPage-Satellite', storyId: 'prototypes-dashboard-page--satellite', timeout: 60000 },
  { name: 'ProfilePage-Satellite', storyId: 'prototypes-profilepage--satellite' },
];

/** Expressive embed prototypes - with enhanced visual styling */
export const expressivePrototypes: PrototypeConfig[] = [
  { name: 'AthletePublicProfile-ExpressiveEmbed', storyId: 'prototypes-athletepublicprofile--expressive-embed' },
  { name: 'ClubPublicProfile-ExpressiveEmbed', storyId: 'prototypes-clubpublicprofile--expressive-embed' },
  { name: 'EventDetailPage-ExpressiveEmbed', storyId: 'prototypes-event-detail-page--expressive-embed' },
];

/** All prototypes for visual regression testing (complete coverage) */
export const allPrototypes: PrototypeConfig[] = [
  ...embedPrototypes,
  ...satellitePrototypes,
  ...expressivePrototypes,
];

/** Prototypes for cross-browser testing (key representatives) */
export const crossBrowserPrototypes: PrototypeConfig[] = [
  { name: 'CalendarPage', storyId: 'prototypes-calendar-page--embed', maxDiffPixels: 150 },
  { name: 'LivePage', storyId: 'prototypes-live-page--embed', maxDiffPixels: 6000 },
  { name: 'DashboardPage', storyId: 'prototypes-dashboard-page--satellite', maxDiffPixels: 200 },
  { name: 'AthleteProfile', storyId: 'prototypes-athletepublicprofile--embed', maxDiffPixels: 150 },
  { name: 'EventDetail', storyId: 'prototypes-event-detail-page--embed', maxDiffPixels: 150 },
];

// =============================================================================
// TEST DEFAULTS
// =============================================================================

export const testDefaults = {
  /** Default pixel tolerance for visual regression */
  maxDiffPixels: 30,
  /** Pixel tolerance for prototypes (larger, more variance) */
  prototypeMaxDiffPixels: 80,
  /** Default timeout for component loading */
  componentTimeout: 10000,
  /** Extended timeout for complex pages */
  prototypeTimeout: 30000,
  /** Wait time after load for animations to settle */
  settleTime: 500,
  /** Extended settle time for prototypes */
  prototypeSettleTime: 1500,
};

// =============================================================================
// CONTAINER QUERY COMPONENTS
// =============================================================================

export interface ContainerQueryComponent {
  name: string;
  storyId: string;
  breakpoints: number[];
  selector: string;
}

export const containerQueryComponents: ContainerQueryComponent[] = [
  {
    name: 'Calendar',
    storyId: 'components-calendar--default',
    breakpoints: [350, 500],
    selector: '.csk-calendar',
  },
  {
    name: 'CalendarList',
    storyId: 'components-calendarlist--default',
    breakpoints: [300, 400],
    selector: '.csk-calendar-list',
  },
  {
    name: 'CalendarCards',
    storyId: 'components-calendarcards--default',
    breakpoints: [320, 600, 900],
    selector: '.csk-calendar-cards',
  },
  {
    name: 'ResultsTable',
    storyId: 'components-resultstable--default',
    breakpoints: [400, 600, 800],
    selector: '.csk-results-table-wrapper',
  },
];

// =============================================================================
// ACCESSIBILITY TEST COMPONENTS
// =============================================================================

export const a11yCoreComponents = coreComponents.map(c => ({
  name: c.name.replace('-', ' '),
  storyId: c.storyId,
}));

export const a11yAdvancedComponents = advancedComponents
  .filter(c => !c.name.includes('StyleVariants')) // Skip variant showcases
  .map(c => ({
    name: c.name.replace('-', ' '),
    storyId: c.storyId,
  }));

export const a11ySpecificComponents = specificComponents
  .filter(c => !c.name.includes('Glass')) // Skip glass variant
  .map(c => ({
    name: c.name.replace('-', ' '),
    storyId: c.storyId,
  }));
