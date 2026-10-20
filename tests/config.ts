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
  /** CSS features this component relies on (informational) */
  cssFeatures?: string[];
  /** Higher tolerance for animated components */
  maxDiffPixels?: number;
}

// =============================================================================
// COMPONENTS
// =============================================================================

export const coreComponents: ComponentConfig[] = [
  { name: 'Button', storyId: 'components-button--default', tier: 'core' },
  { name: 'Button-Variants', storyId: 'components-button--variants', tier: 'core', cssFeatures: ['transitions'] },
  { name: 'Input', storyId: 'components-input--default', tier: 'core' },
  { name: 'Input-States', storyId: 'components-input--states', tier: 'core' },
  { name: 'Select', storyId: 'components-select--default', tier: 'core' },
  { name: 'Select-Warning', storyId: 'components-select--warning', tier: 'core' },
  { name: 'Checkbox', storyId: 'components-checkbox--default', tier: 'core' },
  { name: 'Radio', storyId: 'components-radio--default', tier: 'core' },
  { name: 'Switch', storyId: 'components-switch--default', tier: 'core' },
  { name: 'Card', storyId: 'components-card--default', tier: 'core' },
  { name: 'Card-Variants', storyId: 'components-card--variants', tier: 'core', cssFeatures: ['flexbox'] },
  { name: 'Badge', storyId: 'components-badge--default', tier: 'core' },
  { name: 'Badge-CskSections', storyId: 'components-badge--csk-sections', tier: 'core', cssFeatures: ['colors'] },
  { name: 'Avatar', storyId: 'components-avatar--default', tier: 'core' },
];

export const advancedComponents: ComponentConfig[] = [
  { name: 'Table', storyId: 'components-table--default', tier: 'advanced', cssFeatures: ['grid', 'sticky-header'] },
  { name: 'Modal', storyId: 'components-modal--default', tier: 'advanced' },
  { name: 'Modal-StyleVariants', storyId: 'components-modal--all-style-variants', tier: 'advanced', cssFeatures: ['backdrop-filter', 'animations'] },
  { name: 'Tabs', storyId: 'components-tabs--default', tier: 'advanced', cssFeatures: ['flexbox', 'underline'] },
  { name: 'Toast', storyId: 'components-toast--default', tier: 'advanced' },
  { name: 'Breadcrumbs', storyId: 'components-breadcrumbs--default', tier: 'advanced' },
  { name: 'Pagination', storyId: 'components-pagination--default', tier: 'advanced' },
  { name: 'ProgressBar', storyId: 'components-progress--bar-default', tier: 'advanced' },
  { name: 'ProgressSteps', storyId: 'components-progress--steps-default', tier: 'advanced' },
  { name: 'Dropdown', storyId: 'components-dropdown--default', tier: 'advanced' },
];

export const specificComponents: ComponentConfig[] = [
  { name: 'Header', storyId: 'components-header--default', tier: 'specific' },
  { name: 'Header-App', storyId: 'components-header--app', tier: 'specific' },
  { name: 'Header-Satellite', storyId: 'components-header--satellite', tier: 'specific' },
  { name: 'Subbar', storyId: 'components-subbar--default', tier: 'specific' },
  { name: 'PageTitle', storyId: 'components-pagetitle--default', tier: 'specific' },
  { name: 'BottomBar', storyId: 'components-bottombar--default', tier: 'specific' },
  { name: 'EventHeader', storyId: 'components-eventheader--default', tier: 'specific' },
  { name: 'EventHeader-Condensed', storyId: 'components-eventheader--condensed', tier: 'specific' },
  { name: 'Calendar', storyId: 'components-calendar--default', tier: 'specific', cssFeatures: ['grid', 'responsive'] },
  { name: 'Dropzone', storyId: 'components-dropzone--default', tier: 'specific' },
  { name: 'Timeline', storyId: 'components-timeline--default', tier: 'specific' },
  { name: 'ResultsTable', storyId: 'components-resultstable--default', tier: 'specific' },
  { name: 'StatusBadge-AllStates', storyId: 'components-statusbadge--all-states', tier: 'specific' },
  { name: 'StatusBadge-Live', storyId: 'components-statusbadge--live', tier: 'specific', cssFeatures: ['animations', 'keyframes'], maxDiffPixels: 100 },
  { name: 'MarkBadge-AllMarks', storyId: 'components-markbadge--all-marks', tier: 'specific' },
  { name: 'PenaltyChip-AllStates', storyId: 'components-penaltychip--all-states', tier: 'specific' },
  // v2 T19a (#84.11): with a gate the chip shows the gate number, the colour carries the penalty
  { name: 'PenaltyChip-GateNumbers', storyId: 'components-penaltychip--gate-numbers', tier: 'specific' },
  { name: 'GateGrid', storyId: 'components-gategrid--default', tier: 'specific' },
  { name: 'GateGrid-Unavailable', storyId: 'components-gategrid--unavailable', tier: 'specific' },
  { name: 'BibBadge', storyId: 'components-bibbadge--default', tier: 'specific' },
  { name: 'Notice-AllTones', storyId: 'components-notice--all-tones', tier: 'specific' },
  { name: 'StatTile', storyId: 'components-stattile--with-delta', tier: 'specific' },
  { name: 'States-Overview', storyId: 'states-overview--default', tier: 'specific' },
  { name: 'EmptyState', storyId: 'components-emptystate--default', tier: 'specific' },
  { name: 'Skeleton', storyId: 'components-skeleton--default', tier: 'specific', cssFeatures: ['animations', 'shimmer'] },
  { name: 'SegmentedControl', storyId: 'components-segmentedcontrol--default', tier: 'specific' },
  { name: 'SegmentedControl-Wrapping360', storyId: 'components-segmentedcontrol--wrapping-360', tier: 'specific' },
  { name: 'StarButton', storyId: 'components-starbutton--default', tier: 'specific' },
  { name: 'FavoritesToggle', storyId: 'components-favoritestoggle--default', tier: 'specific' },
  { name: 'FavoritesToggle-Counts', storyId: 'components-favoritestoggle--counts', tier: 'specific' },
  { name: 'TableToolbar', storyId: 'components-tabletoolbar--default', tier: 'specific' },
  { name: 'TableToolbar-Mobile', storyId: 'components-tabletoolbar--mobile', tier: 'specific' },
  { name: 'TableToolbar-DetailOn', storyId: 'components-tabletoolbar--detail-on', tier: 'specific' },
  { name: 'Icon-FilledStar', storyId: 'components-icon--filled-star', tier: 'specific' },
  // T6 time components: stories use createTestClock() at a fixed time, so nothing ticks.
  // Never list RunningTime 'Real Clock' (components-runningtime--real-clock, tag no-snapshot): it ticks in real time.
  // 'State Switching' (interactive acceptance story) is checked by axe only; its controls are Buttons owned by T4.
  { name: 'TimeValue-Variants', storyId: 'components-timevalue--variants', tier: 'specific' },
  { name: 'TimeValue-ObservedStates', storyId: 'components-timevalue--observed-states', tier: 'specific' },
  { name: 'TimeValue-Formats', storyId: 'components-timevalue--formats', tier: 'specific' },
  { name: 'TimeValue-ClockFormat', storyId: 'components-timevalue--clock-format', tier: 'specific' },
  { name: 'RunningTime-States', storyId: 'components-runningtime--states', tier: 'specific' },
  { name: 'DataAge-Overview', storyId: 'components-dataage--overview', tier: 'specific' },
  // v2 T15: profile components and the additive variants they need (on-dark tone, Avatar 3xl/ring, Card highlight)
  { name: 'Avatar-LargeAndRing', storyId: 'components-avatar--large-and-ring', tier: 'specific' },
  { name: 'Card-Highlight', storyId: 'components-card--highlight', tier: 'specific' },
  { name: 'Badge-OnDark', storyId: 'components-badge--on-dark', tier: 'specific' },
  { name: 'StatTile-OnDark', storyId: 'components-stattile--on-dark', tier: 'specific' },
  { name: 'ProfileHeader-Page', storyId: 'components-profileheader--page', tier: 'specific' },
  { name: 'ProfileHeader-Band', storyId: 'components-profileheader--band', tier: 'specific' },
  { name: 'ProfileHeader-WithoutTiles', storyId: 'components-profileheader--without-tiles', tier: 'specific' },
  { name: 'SeasonSparkline', storyId: 'components-seasonsparkline--default', tier: 'specific' },
  { name: 'SeasonSparkline-AllOfficial', storyId: 'components-seasonsparkline--all-official', tier: 'specific' },
  { name: 'SeasonSparkline-TwoRaces', storyId: 'components-seasonsparkline--two-races', tier: 'specific' },
  { name: 'RivalsList', storyId: 'components-rivalslist--default', tier: 'specific' },
  { name: 'RivalsList-LeaderAndTie', storyId: 'components-rivalslist--leader-and-tie', tier: 'specific' },
  { name: 'RivalsList-LongName', storyId: 'components-rivalslist--long-name', tier: 'specific' },
  // T13: DeadlineBadge has no time-dependent state (the application passes the text), so the stories are deterministic.
  { name: 'DeadlineBadge-AllKinds', storyId: 'components-deadlinebadge--all-kinds', tier: 'specific' },
  { name: 'WeekendCalendar', storyId: 'components-weekendcalendar--default', tier: 'specific', cssFeatures: ['grid', 'container-queries'] },
  { name: 'WeekendCalendar-InNarrowContainer', storyId: 'components-weekendcalendar--in-narrow-container', tier: 'specific', cssFeatures: ['container-queries'] },
  // v2 T19 (#84.1, .2, .5, .10, T18 gap 2): Button link form, DocumentList, EventHeader logo/condensed, Avatar portrait, TableToolbar at 390
  { name: 'Button-AsLink', storyId: 'components-button--as-link', tier: 'specific' },
  { name: 'DocumentList', storyId: 'components-documentlist--default', tier: 'specific' },
  { name: 'DocumentList-KindsAndDates', storyId: 'components-documentlist--kinds-and-dates', tier: 'specific' },
  { name: 'Avatar-Portrait', storyId: 'components-avatar--portrait', tier: 'specific' },
  { name: 'EventHeader-LogoShapes', storyId: 'components-eventheader--logo-shapes', tier: 'specific' },
  { name: 'TableToolbar-Crowded390', storyId: 'components-tabletoolbar--crowded-390', tier: 'specific' },
  { name: 'TableToolbar-OneRow390', storyId: 'components-tabletoolbar--one-row-390', tier: 'specific' },
];

/** All components for visual regression testing */
export const allComponents: ComponentConfig[] = [
  ...coreComponents,
  ...advancedComponents,
  ...specificComponents,
];

/**
 * Layout stories (T8): full page tops, snapshotted at desktop 1280 and phone 390
 * by tests/layout.spec.ts.
 */
export const layoutStories: Array<{ name: string; storyId: string; a11y?: boolean }> = [
  { name: 'Layout-Tribuna', storyId: 'layout-tribuna--default' },
  { name: 'Layout-LiveMobile', storyId: 'layout-livemobile--default' },
  { name: 'Layout-LiveMobile-Condensed', storyId: 'layout-livemobile--condensed' },
  // a11y off: the KanoeCzContext mock itself has axe violations (1.x mock, kept only as the embed host decorator)
  { name: 'Layout-Tribuna-Embed', storyId: 'layout-tribuna--embed', a11y: false },
  { name: 'Layout-Urad', storyId: 'layout-urad--default' },
  // v2 T19: EventHeader content aligned with the PageLayout container (1200 and 1024)
  { name: 'EventHeader-ContainerWidth', storyId: 'components-eventheader--container-width' },
];

/**
 * Responsive stories snapshotted at phone 390 and desktop 1280 by tests/components.spec.ts
 * ('Components - <viewport>'). v2 T9: ResultsTable + RunDetail (columns switch by container query).
 * The live tables of T10-T12 can add their stories here.
 * Not listed: components-resultstable--hundred-rows (performance probe with a measured time) and
 * components-resultstable--in-narrow-container (functional container-query check), both in
 * tests/results-table.spec.ts.
 */
export const viewportStories: Array<{ name: string; storyId: string }> = [
  { name: 'ResultsTable-BR', storyId: 'components-resultstable--default' },
  { name: 'ResultsTable-SingleRun', storyId: 'components-resultstable--single-run' },
  { name: 'ResultsTable-CategoryRanks', storyId: 'components-resultstable--category-ranks' },
  { name: 'ResultsTable-OnCourse', storyId: 'components-resultstable--on-course' },
  { name: 'ResultsTable-UnderReview', storyId: 'components-resultstable--under-review' },
  { name: 'ResultsTable-Marks', storyId: 'components-resultstable--marks' },
  { name: 'ResultsTable-Expanded', storyId: 'components-resultstable--expanded' },
  { name: 'ResultsTable-Startlist', storyId: 'components-resultstable--startlist' },
  { name: 'ResultsTable-Empty', storyId: 'components-resultstable--empty' },
  { name: 'EventHeader-StatusStates', storyId: 'components-eventheader--status-states' },
  { name: 'StartlistTable', storyId: 'components-startlisttable--default' },
  { name: 'StartlistTable-SingleStart', storyId: 'components-startlisttable--single-start' },
  { name: 'StartlistTable-WithNotice', storyId: 'components-startlisttable--with-notice' },
  { name: 'StartlistTable-Empty', storyId: 'components-startlisttable--empty' },
  { name: 'ProgramList-TwoRunningPhases', storyId: 'components-programlist--two-running-phases' },
  { name: 'ProgramList-OneRunningPhase', storyId: 'components-programlist--one-running-phase' },
  { name: 'ProgramList-TwoDays', storyId: 'components-programlist--two-days' },
  { name: 'RunDetail', storyId: 'components-rundetail--default' },
  { name: 'RunDetail-SingleRun', storyId: 'components-rundetail--single-run' },
  { name: 'RunDetail-OnCourse', storyId: 'components-rundetail--on-course' },
  { name: 'RunDetail-Loading', storyId: 'components-rundetail--loading' },
  // v2 T10: OnCoursePanel (3 columns by container query). Not listed: Empty (renders nothing), RealClock (ticks).
  { name: 'OnCoursePanel-ThreeRiders', storyId: 'components-oncoursepanel--three-riders' },
  { name: 'OnCoursePanel-SixRiders', storyId: 'components-oncoursepanel--six-riders' },
  { name: 'OnCoursePanel-Stale', storyId: 'components-oncoursepanel--stale' },
  { name: 'OnCoursePanel-StaleSixRiders', storyId: 'components-oncoursepanel--stale-six-riders' },
  { name: 'OnCoursePanel-TimeToBeat', storyId: 'components-oncoursepanel--time-to-beat' },
  { name: 'OnCoursePanel-WithLeader', storyId: 'components-oncoursepanel--with-leader' },
  { name: 'OnCoursePanel-Collapsed', storyId: 'components-oncoursepanel--collapsed' },
  { name: 'OnCoursePanel-InNarrowContainer', storyId: 'components-oncoursepanel--in-narrow-container' },
  { name: 'OnCoursePanel-RiderStates', storyId: 'components-oncoursepanel--rider-states' },
  { name: 'OnCoursePanel-RunningPenalty', storyId: 'components-oncoursepanel--running-penalty' },
  // v2 T14: office components (EntryTable scrolls horizontally inside itself on a phone)
  { name: 'EntryTable-SingleBoats', storyId: 'components-entrytable--single-boats' },
  { name: 'EntryTable-TwoPersonBoats', storyId: 'components-entrytable--two-person-boats' },
  { name: 'EntryTable-Empty', storyId: 'components-entrytable--empty' },
  { name: 'ProposalList', storyId: 'components-proposallist--default' },
  { name: 'ProposalList-Single', storyId: 'components-proposallist--single-proposal' },
  { name: 'SummaryCard', storyId: 'components-summarycard--default' },
  // v2 T13: WeekendCalendar (dates column / band by container query)
  { name: 'WeekendCalendar-Default', storyId: 'components-weekendcalendar--default' },
  { name: 'WeekendCalendar-CurrentWeekend', storyId: 'components-weekendcalendar--current-weekend' },
  // v2 T19 (#84.3): ResultsPanel (toolbar + status line + ResultsTable + footer)
  { name: 'ResultsPanel', storyId: 'components-resultspanel--default' },
  { name: 'ResultsPanel-Official', storyId: 'components-resultspanel--official' },
  { name: 'ResultsPanel-TableOnly', storyId: 'components-resultspanel--table-only' },
];

/**
 * Live page stories (v2 T12, reference Live1-6): full pages composed of design system components,
 * snapshotted at phone 390 (primary canvas) and desktop 1280 by tests/live-pages.spec.ts.
 * Page tolerance (`pageStoryMaxDiffPixels`, 80 px, see CLAUDE.md Testování). All use one fixed test clock.
 */
export const pageStories: Array<{ name: string; storyId: string }> = [
  { name: 'Live-Running', storyId: 'live--running' },
  { name: 'Live-Expanded', storyId: 'live--expanded' },
  { name: 'Live-Startlist', storyId: 'live--startlist' },
  { name: 'Live-Official', storyId: 'live--official' },
  { name: 'Live-Disconnected', storyId: 'live--disconnected' },
  { name: 'Live-Program', storyId: 'live--program' },
  // v2 T14: club entry (reference Prihlaska.html); functional checks in tests/entry.spec.ts
  { name: 'Entry-ClubEntry', storyId: 'entry--club-entry' },
  // v2 T15: athlete pages (references Profil.html, ProfilMobil.html)
  { name: 'Athlete-PublicProfile', storyId: 'athlete--public-profile' },
  { name: 'Athlete-MobileProfile', storyId: 'athlete--mobile-profile' },
  // v2 T13: Calendar page (reference Kalendar). Same spec/tolerance; the file is live-pages.spec.ts.
  { name: 'Calendar-Season', storyId: 'calendar--season' },
  { name: 'Event-Detail', storyId: 'event-detail--default' },
];

export const pageStoryMaxDiffPixels = 80;

// =============================================================================
// TEST DEFAULTS
// =============================================================================

export const testDefaults = {
  /** Default pixel tolerance for visual regression */
  maxDiffPixels: 30,
  /** Default timeout for component loading */
  componentTimeout: 10000,
  /** Wait time after load for animations to settle */
  settleTime: 500,
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
    selector: '.csk-results-table',
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
  .map(c => ({
    name: c.name.replace('-', ' '),
    storyId: c.storyId,
  }));

// ---------------------------------------------------------------------------
// Quarantine: known failures that pre-date v2 and are fixed by the owning v2
// task (the task that retokenizes/rewrites/deletes the component). Keyed by the
// full title path (describe blocks + test title joined by ' › ', no file name). Quarantined tests are
// reported as skipped (test.fixme) so CI stays green and the debt stays visible.
// A task that touches a quarantined component must remove its entries; T17a
// emptied the list (all entries belonged to deleted 1.x tests).
// ---------------------------------------------------------------------------
export type QuarantineOwner = 'T1' | 'T3' | 'T4' | 'T5' | 'T7' | 'T8' | 'T17';

export const QUARANTINE: Record<string, { reason: string; owner: QuarantineOwner }> = {
};
