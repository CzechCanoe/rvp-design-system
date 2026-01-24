import type { Meta, StoryObj } from '@storybook/react';
import { useState, useCallback } from 'react';
import { ResultsTable, type ResultEntry } from './ResultsTable';
import { RunDetailModal, type AthleteRunDetail, type GatePenalty, type RunDetail } from './RunDetailModal';
import { KanoeCzContext } from '../KanoeCzContext';

const meta: Meta<typeof ResultsTable> = {
  title: 'Components/ResultsTable',
  component: ResultsTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'striped', 'compact'],
    },
    styleVariant: {
      control: 'select',
      options: ['default', 'gradient', 'embed'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    section: {
      control: 'select',
      options: [undefined, 'dv', 'ry', 'vt'],
    },
    showAgeCategory: {
      control: 'boolean',
      description: 'Show age category column (U23, Junior, Senior, Master)',
    },
    showAgeCategoryRank: {
      control: 'boolean',
      description: 'Show rank within age category',
    },
    showPoints: {
      control: 'boolean',
      description: 'Show points column',
    },
    showAvatars: {
      control: 'select',
      options: [false, true, 'podium'],
      description: 'Show athlete avatars (false, true for all, "podium" for top 3)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResultsTable>;

// Sample data
const sampleResults: ResultEntry[] = [
  {
    id: 1,
    rank: 1,
    name: 'Jiří Prskavec',
    club: 'USK Praha',
    country: 'CZE',
    section: 'dv',
    category: 'K1M',
    ageCategory: 'Senior',
    ageCategoryRank: 1,
    run1Time: 92.34,
    run1Penalty: 0,
    run2Time: 89.12,
    run2Penalty: 2,
    totalTime: 89.12,
    timeDiff: 0,
    status: 'final',
    avatarUrl: 'https://i.pravatar.cc/150?u=prskavec',
  },
  {
    id: 2,
    rank: 2,
    name: 'Lukáš Rohan',
    club: 'Dukla Praha',
    country: 'CZE',
    section: 'dv',
    category: 'C1M',
    ageCategory: 'Senior',
    ageCategoryRank: 2,
    run1Time: 94.56,
    run1Penalty: 2,
    run2Time: 90.23,
    run2Penalty: 0,
    totalTime: 90.23,
    timeDiff: 1.11,
    status: 'final',
    avatarUrl: 'https://i.pravatar.cc/150?u=rohan',
  },
  {
    id: 3,
    rank: 3,
    name: 'Tereza Fišerová',
    club: 'Dukla Praha',
    country: 'CZE',
    section: 'dv',
    category: 'C1W',
    ageCategory: 'Senior',
    ageCategoryRank: 1,
    run1Time: 98.45,
    run1Penalty: 4,
    run2Time: 93.67,
    run2Penalty: 2,
    totalTime: 93.67,
    timeDiff: 4.55,
    status: 'final',
    avatarUrl: 'https://i.pravatar.cc/150?u=fiserova',
  },
  {
    id: 4,
    rank: 4,
    name: 'Vít Přindiš',
    club: 'Dukla Praha',
    country: 'CZE',
    section: 'dv',
    category: 'K1M',
    ageCategory: 'Senior',
    ageCategoryRank: 3,
    run1Time: 95.12,
    run1Penalty: 0,
    run2Time: 94.56,
    run2Penalty: 0,
    totalTime: 94.56,
    timeDiff: 5.44,
    status: 'final',
  },
  {
    id: 5,
    rank: 5,
    name: 'Jan Mašek',
    club: 'KK Rakovník',
    country: 'CZE',
    section: 'dv',
    category: 'K1M',
    ageCategory: 'U23',
    ageCategoryRank: 1,
    run1Time: 97.89,
    run1Penalty: 2,
    run2Time: 95.34,
    run2Penalty: 0,
    totalTime: 95.34,
    timeDiff: 6.22,
    status: 'final',
  },
  {
    id: 6,
    rank: 6,
    name: 'Michal Janeš',
    club: 'ASK Slavia Praha',
    country: 'CZE',
    section: 'dv',
    category: 'C1M',
    ageCategory: 'Junior',
    ageCategoryRank: 1,
    run1Time: 99.12,
    run1Penalty: 0,
    run2Time: 96.78,
    run2Penalty: 2,
    totalTime: 96.78,
    timeDiff: 7.66,
    status: 'final',
  },
];

const liveResults: ResultEntry[] = [
  {
    id: 1,
    rank: 1,
    previousRank: 2,
    name: 'Jiri Prskavec',
    club: 'USK Praha',
    section: 'dv',
    totalTime: 89.12,
    timeDiff: 0,
    status: 'live',
    highlighted: true,
  },
  {
    id: 2,
    rank: 2,
    previousRank: 1,
    name: 'Giovanni De Gennaro',
    club: 'Italia',
    country: 'ITA',
    section: 'dv',
    totalTime: 89.45,
    timeDiff: 0.33,
    status: 'live',
  },
  {
    id: 3,
    rank: 3,
    previousRank: 3,
    name: 'Lukas Rohan',
    club: 'Dukla Praha',
    section: 'dv',
    totalTime: 90.23,
    timeDiff: 1.11,
    status: 'final',
  },
  {
    id: 4,
    rank: undefined,
    name: 'Tereza Fiserova',
    club: 'Dukla Praha',
    section: 'dv',
    run1Time: 45.67,
    totalTime: undefined,
    status: 'live',
  },
  {
    id: 5,
    rank: 4,
    previousRank: 4,
    name: 'Vit Prindis',
    club: 'Dukla Praha',
    section: 'dv',
    totalTime: 94.56,
    timeDiff: 5.44,
    status: 'provisional',
  },
];

const statusResults: ResultEntry[] = [
  { id: 1, rank: 1, name: 'Jiri Prskavec', club: 'USK Praha', section: 'dv', totalTime: 89.12, timeDiff: 0, status: 'final' },
  { id: 2, rank: 2, name: 'Lukas Rohan', club: 'Dukla Praha', section: 'dv', totalTime: 90.23, timeDiff: 1.11, status: 'final' },
  { id: 3, rank: undefined, name: 'Jan Novak', club: 'KK Rakovnik', section: 'dv', status: 'dns' },
  { id: 4, rank: undefined, name: 'Petr Svoboda', club: 'ASK Slavia Praha', section: 'dv', run1Time: 45.67, status: 'dnf' },
  { id: 5, rank: undefined, name: 'Michal Jane', club: 'TJ Bohemians', section: 'dv', run1Time: 87.34, status: 'dsq' },
];

// =============================================================================
// BASIC EXAMPLES
// =============================================================================

export const Default: Story = {
  args: {
    results: sampleResults,
    caption: 'Vysledky zavodu - K1 muzi semifinale',
    showRuns: true,
  },
};

export const WithPodiumHighlights: Story = {
  args: {
    results: sampleResults,
    showPodiumHighlights: true,
    highlightPositions: 3,
    caption: 'Finale - top 3 zvyrazneno',
  },
};

export const LiveResults: Story = {
  args: {
    results: liveResults,
    showLiveIndicator: true,
    showPodiumHighlights: true,
    showCountry: true,
    caption: 'Live vysledky - semifinale',
  },
};

export const WithStatuses: Story = {
  args: {
    results: statusResults,
    caption: 'Vysledky se statusy (DNS, DNF, DSQ)',
  },
};

// =============================================================================
// VARIANTS
// =============================================================================

export const AllVariants: Story = {
  name: 'Table Variants',
  render: () => {
    const shortResults = sampleResults.slice(0, 4);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Default</h3>
          <ResultsTable results={shortResults} variant="default" />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Striped</h3>
          <ResultsTable results={shortResults} variant="striped" />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Compact</h3>
          <ResultsTable results={shortResults} variant="compact" size="sm" />
        </div>
      </div>
    );
  },
};

// =============================================================================
// STYLE VARIANTS
// =============================================================================

export const StyleVariantsComparison: Story = {
  name: 'Style Variants',
  render: () => {
    const shortResults = sampleResults.slice(0, 4);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Default Style</h3>
          <ResultsTable results={shortResults} styleVariant="default" showPodiumHighlights />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Gradient Style</h3>
          <ResultsTable results={shortResults} styleVariant="gradient" showPodiumHighlights />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Embed Style</h3>
          <ResultsTable results={shortResults} styleVariant="embed" showPodiumHighlights />
        </div>
      </div>
    );
  },
};

// =============================================================================
// SLALOM-SPECIFIC
// =============================================================================

const slalomQualificationResults: ResultEntry[] = [
  { id: 1, rank: 1, startNumber: 15, name: 'Jiří Prskavec', club: 'USK Praha', country: 'CZE', category: 'K1M', round: 'Q', run1Time: 92.34, run1Penalty: 0, run2Time: 89.12, run2Penalty: 2, totalTime: 91.12, timeDiff: 0, status: 'final', progressed: true },
  { id: 2, rank: 2, startNumber: 23, name: 'Giovanni De Gennaro', club: 'Italia', country: 'ITA', category: 'K1M', round: 'Q', run1Time: 93.56, run1Penalty: 0, run2Time: 91.23, run2Penalty: 0, totalTime: 91.23, timeDiff: 0.11, status: 'final', progressed: true },
  { id: 3, rank: 3, startNumber: 8, name: 'Peter Kauzer', club: 'KK Ljubljana', country: 'SLO', category: 'K1M', round: 'Q', run1Time: 94.12, run1Penalty: 2, run2Time: 92.45, run2Penalty: 0, totalTime: 92.45, timeDiff: 1.33, status: 'final', progressed: true },
  { id: 4, rank: 4, startNumber: 12, name: 'Hannes Aigner', club: 'KC Augsburg', country: 'GER', category: 'K1M', round: 'Q', run1Time: 95.67, run1Penalty: 0, run2Time: 93.12, run2Penalty: 0, totalTime: 93.12, timeDiff: 2.0, status: 'final', progressed: true },
  { id: 5, rank: 5, startNumber: 31, name: 'Vít Přindiš', club: 'Dukla Praha', country: 'CZE', category: 'K1M', round: 'Q', run1Time: 94.89, run1Penalty: 2, run2Time: 93.45, run2Penalty: 0, totalTime: 93.45, timeDiff: 2.33, status: 'final', progressed: true },
  { id: 6, rank: 6, startNumber: 5, name: 'Lukáš Rohan', club: 'Dukla Praha', country: 'CZE', category: 'C1M', round: 'Q', run1Time: 96.12, run1Penalty: 0, run2Time: 94.78, run2Penalty: 2, totalTime: 96.78, timeDiff: 5.66, status: 'final', progressed: false },
];

export const SlalomQualification: Story = {
  name: 'Slalom: Qualification with Progression',
  args: {
    results: slalomQualificationResults,
    styleVariant: 'default',
    showPodiumHighlights: false,
    showRuns: true,
    showCountry: true,
    showStartNumber: true,
    showProgression: true,
    caption: 'K1M Qualification - Top 5 progress to Semifinal',
    captionVisible: true,
  },
};

export const SlalomWorldCup: Story = {
  name: 'Slalom: World Cup Final',
  args: {
    results: [
      { id: 1, rank: 1, name: 'Jiri Prskavec', club: 'USK Praha', country: 'CZE', section: 'dv', category: 'K1M', run1Time: 92.34, run1Penalty: 0, run2Time: 89.12, run2Penalty: 2, totalTime: 91.12, timeDiff: 0, status: 'final' },
      { id: 2, rank: 2, name: 'Giovanni De Gennaro', club: 'Italia', country: 'ITA', section: 'dv', category: 'K1M', run1Time: 93.56, run1Penalty: 0, run2Time: 91.23, run2Penalty: 0, totalTime: 91.23, timeDiff: 0.11, status: 'final' },
      { id: 3, rank: 3, name: 'Peter Kauzer', club: 'KK Ljubljana', country: 'SLO', section: 'dv', category: 'K1M', run1Time: 94.12, run1Penalty: 2, run2Time: 92.45, run2Penalty: 0, totalTime: 92.45, timeDiff: 1.33, status: 'final' },
      { id: 4, rank: 4, name: 'Hannes Aigner', club: 'KC Augsburg', country: 'GER', section: 'dv', category: 'K1M', run1Time: 95.67, run1Penalty: 0, run2Time: 93.12, run2Penalty: 0, totalTime: 93.12, timeDiff: 2.0, status: 'final' },
      { id: 5, rank: 5, name: 'Vit Prindis', club: 'Dukla Praha', country: 'CZE', section: 'dv', category: 'K1M', run1Time: 94.89, run1Penalty: 2, run2Time: 93.45, run2Penalty: 0, totalTime: 93.45, timeDiff: 2.33, status: 'final' },
    ],
    variant: 'default',
    styleVariant: 'gradient',
    showRuns: true,
    showTimeDiff: true,
    showCountry: true,
    showPodiumHighlights: true,
    caption: 'ICF Canoe Slalom World Cup - K1 Men Final',
    captionVisible: true,
  },
};

// =============================================================================
// SPECIAL STATES
// =============================================================================

export const Loading: Story = {
  args: {
    results: [],
    loading: true,
    caption: 'Nacitani vysledku...',
  },
};

export const Empty: Story = {
  args: {
    results: [],
    emptyState: (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Zatim zadne vysledky</p>
        <p style={{ color: 'var(--color-text-secondary)' }}>Vysledky budou k dispozici po dokonceni zavodu</p>
      </div>
    ),
    caption: 'Prazdna tabulka',
  },
};

// =============================================================================
// AGE CATEGORY & POINTS
// =============================================================================

const resultsWithAgeCategoryAndPoints: ResultEntry[] = [
  { id: 1, rank: 1, name: 'Jiří Prskavec', club: 'USK Praha', category: 'K1M', ageCategory: 'Senior', points: 1000, totalTime: 89.12, timeDiff: 0, section: 'dv', status: 'final' },
  { id: 2, rank: 2, name: 'Vojtěch Heger', club: 'Dukla Praha', category: 'K1M', ageCategory: 'U23', points: 800, totalTime: 90.45, timeDiff: 1.33, section: 'dv', status: 'final' },
  { id: 3, rank: 3, name: 'Adam Novák', club: 'SK Trnávka', category: 'K1M', ageCategory: 'Junior', points: 650, totalTime: 91.23, timeDiff: 2.11, section: 'dv', status: 'final' },
  { id: 4, rank: 4, name: 'Petr Svoboda', club: 'Bohemians Praha', category: 'K1M', ageCategory: 'Senior', points: 525, totalTime: 92.67, timeDiff: 3.55, section: 'dv', status: 'final' },
  { id: 5, rank: 5, name: 'Karel Veselý', club: 'KK Roudnice', category: 'K1M', ageCategory: 'Master', points: 420, totalTime: 93.89, timeDiff: 4.77, section: 'dv', status: 'final' },
];

export const WithAgeCategoryAndPoints: Story = {
  args: {
    results: resultsWithAgeCategoryAndPoints,
    showAgeCategory: true,
    showPoints: true,
    showCategory: true,
    showClub: true,
    showTimeDiff: true,
  },
};

// =============================================================================
// EMBED MODE
// =============================================================================

export const EmbedInKanoeCz: Story = {
  name: 'Embed: V kontextu kanoe.cz',
  render: () => (
    <KanoeCzContext layout="full" showHeader showSidebar={false}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>Výsledky - K1 muži finále</h2>
      <ResultsTable
        results={sampleResults.slice(0, 6)}
        styleVariant="embed"
        showPodiumHighlights
        showRuns
        caption="K1M Final Results"
      />
    </KanoeCzContext>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const EmbedWithSidebar: Story = {
  name: 'Embed: S postranním panelem (úzký)',
  render: () => (
    <KanoeCzContext layout="sidebar" showHeader showSidebar>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>Výsledky kvalifikace</h2>
      <ResultsTable
        results={sampleResults.slice(0, 5)}
        styleVariant="embed"
        showPodiumHighlights
        showRuns={false}
        showClub
        caption="Qualification Results"
      />
    </KanoeCzContext>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// =============================================================================
// PODIUM & AVATARS (NEW DESIGN)
// =============================================================================

export const PodiumWithMedals: Story = {
  name: 'Podium: Medal Icons',
  args: {
    results: sampleResults,
    showPodiumHighlights: true,
    showRuns: true,
    showCountry: true,
    caption: 'Finále - nový design podium s medailemi',
  },
};

export const PodiumWithAvatars: Story = {
  name: 'Podium: With Athlete Avatars',
  args: {
    results: sampleResults,
    showPodiumHighlights: true,
    showAvatars: 'podium',
    showCountry: true,
    caption: 'Top 3 with avatars',
  },
};

export const AllAvatars: Story = {
  name: 'Avatars: All Rows',
  args: {
    results: sampleResults,
    showPodiumHighlights: true,
    showAvatars: true,
    showCountry: true,
    caption: 'All athletes with avatars',
  },
};

// =============================================================================
// COMPLETE DATA VIEW
// =============================================================================

const completeDataResults: ResultEntry[] = [
  {
    id: 1,
    rank: 1,
    name: 'Jiří Prskavec',
    club: 'USK Praha',
    country: 'CZE',
    category: 'K1M',
    ageCategory: 'Senior',
    ageCategoryRank: 1,
    points: 1000,
    run1Time: 92.34,
    run1Penalty: 0,
    run2Time: 89.12,
    run2Penalty: 2,
    totalTime: 89.12,
    timeDiff: 0,
    status: 'final',
    avatarUrl: 'https://i.pravatar.cc/150?u=prskavec',
  },
  {
    id: 2,
    rank: 2,
    name: 'Vojtěch Heger',
    club: 'Dukla Praha',
    country: 'CZE',
    category: 'K1M',
    ageCategory: 'U23',
    ageCategoryRank: 1,
    points: 800,
    run1Time: 93.56,
    run1Penalty: 0,
    run2Time: 91.23,
    run2Penalty: 0,
    totalTime: 91.23,
    timeDiff: 2.11,
    status: 'final',
    avatarUrl: 'https://i.pravatar.cc/150?u=heger',
  },
  {
    id: 3,
    rank: 3,
    name: 'Adam Novák',
    club: 'SK Trnávka',
    country: 'CZE',
    category: 'K1M',
    ageCategory: 'Junior',
    ageCategoryRank: 1,
    points: 650,
    run1Time: 94.12,
    run1Penalty: 2,
    run2Time: 92.45,
    run2Penalty: 0,
    totalTime: 92.45,
    timeDiff: 3.33,
    status: 'final',
    avatarUrl: 'https://i.pravatar.cc/150?u=novak',
  },
  {
    id: 4,
    rank: 4,
    name: 'Petr Svoboda',
    club: 'Bohemians Praha',
    country: 'CZE',
    category: 'K1M',
    ageCategory: 'Senior',
    ageCategoryRank: 2,
    points: 525,
    run1Time: 95.67,
    run1Penalty: 0,
    run2Time: 93.12,
    run2Penalty: 0,
    totalTime: 93.12,
    timeDiff: 4.0,
    status: 'final',
  },
  {
    id: 5,
    rank: 5,
    name: 'Karel Veselý',
    club: 'KK Roudnice',
    country: 'CZE',
    category: 'K1M',
    ageCategory: 'Master',
    ageCategoryRank: 1,
    points: 420,
    run1Time: 96.89,
    run1Penalty: 2,
    run2Time: 93.45,
    run2Penalty: 0,
    totalTime: 93.45,
    timeDiff: 4.33,
    status: 'final',
  },
];

export const CompleteDataView: Story = {
  name: 'Complete: All Data Fields',
  args: {
    results: completeDataResults,
    showPodiumHighlights: true,
    showAvatars: 'podium',
    showCountry: true,
    showCategory: true,
    showAgeCategory: true,
    showAgeCategoryRank: true,
    showRuns: true,
    showPoints: true,
    showTimeDiff: true,
    caption: 'Kompletní zobrazení všech dat',
    captionVisible: true,
  },
};

export const CompactWithAvatars: Story = {
  name: 'Compact: Mobile View',
  args: {
    results: sampleResults.slice(0, 5),
    variant: 'compact',
    size: 'sm',
    showPodiumHighlights: true,
    showAvatars: 'podium',
    showClub: false,
    showTimeDiff: false,
    caption: 'Compact mobile view',
  },
};

// =============================================================================
// RUN DETAIL MODAL - Interactive row click
// =============================================================================

/** Generate sample gate data for a run */
const generateGateData = (numGates: number, hasPenalties: boolean): GatePenalty[] => {
  const gates: GatePenalty[] = [];
  let cumulativeTime = 0;

  for (let i = 1; i <= numGates; i++) {
    // Approx 3-5 seconds per gate
    cumulativeTime += 3 + Math.random() * 2;

    // Random penalties if hasPenalties
    let penalty: 0 | 2 | 50 = 0;
    if (hasPenalties) {
      const rnd = Math.random();
      if (rnd < 0.08) penalty = 2; // 8% chance of 2s touch
      if (rnd < 0.02) penalty = 50; // 2% chance of miss
    }

    gates.push({
      gateNumber: i,
      penalty,
      direction: i % 4 === 0 ? 'up' : 'down',
      color: i % 3 === 0 ? 'red' : 'green',
      splitTime: cumulativeTime,
      diff: (Math.random() - 0.5) * 2, // -1 to +1 second diff
    });
  }

  return gates;
};

/** Generate sample run detail data */
const generateRunDetail = (runNumber: 1 | 2, hasPenalties: boolean = true): RunDetail => {
  const gates = generateGateData(24, hasPenalties);
  const totalPenalty = gates.reduce((sum, g) => sum + g.penalty, 0);
  const rawTime = 88 + Math.random() * 10; // 88-98 seconds

  return {
    runNumber,
    rawTime,
    totalPenalty,
    finalTime: rawTime + totalPenalty,
    status: 'finished',
    gates,
    runRank: Math.floor(Math.random() * 10) + 1,
    runDiff: Math.random() * 5,
  };
};

/** Interactive story with row click to show run detail modal */
const InteractiveResultsTable = () => {
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteRunDetail | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClick = useCallback((entry: ResultEntry) => {
    // Generate athlete detail from result entry
    const athleteDetail: AthleteRunDetail = {
      id: entry.id,
      name: entry.name,
      club: entry.club || '',
      category: entry.category || '',
      bib: Math.floor(Math.random() * 50) + 1,
      country: entry.country,
      avatarUrl: entry.avatarUrl,
      run1: generateRunDetail(1, true),
      run2: entry.status === 'final' ? generateRunDetail(2, false) : undefined,
      overallRank: entry.rank,
      overallDiff: entry.timeDiff,
    };
    setSelectedAthlete(athleteDetail);
    setModalOpen(true);
  }, []);

  return (
    <div>
      <p style={{ marginBottom: '1rem', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
        Klikněte na řádek pro zobrazení detailu jízdy s penalizacemi na branách.
      </p>
      <ResultsTable
        results={sampleResults}
        showPodiumHighlights
        showRuns
        showCountry
        onRowClick={handleRowClick}
        caption="Klikněte na řádek pro detail"
      />
      <RunDetailModal
        athlete={selectedAthlete}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        section="dv"
      />
    </div>
  );
};

export const WithRunDetailModal: Story = {
  name: 'Interactive: Row Click Detail',
  render: () => <InteractiveResultsTable />,
  parameters: {
    docs: {
      description: {
        story: 'Kliknutí na řádek otevře modální okno s detailem jízdy včetně penalizací na jednotlivých branách.',
      },
    },
  },
};

// =============================================================================
// RUN DETAIL MODAL - Standalone
// =============================================================================

const sampleAthleteDetail: AthleteRunDetail = {
  id: 1,
  name: 'Jiří Prskavec',
  club: 'USK Praha',
  category: 'K1M',
  bib: 7,
  country: 'CZE',
  avatarUrl: 'https://i.pravatar.cc/150?u=prskavec',
  run1: {
    runNumber: 1,
    rawTime: 90.45,
    totalPenalty: 4,
    finalTime: 94.45,
    status: 'finished',
    gates: [
      { gateNumber: 1, penalty: 0, direction: 'down', color: 'green', splitTime: 4.23, diff: -0.12 },
      { gateNumber: 2, penalty: 0, direction: 'down', color: 'green', splitTime: 8.56, diff: 0.08 },
      { gateNumber: 3, penalty: 2, direction: 'down', color: 'red', splitTime: 13.21, diff: 0.45 },
      { gateNumber: 4, penalty: 0, direction: 'up', color: 'green', splitTime: 18.34, diff: -0.22 },
      { gateNumber: 5, penalty: 0, direction: 'down', color: 'green', splitTime: 22.67, diff: -0.15 },
      { gateNumber: 6, penalty: 0, direction: 'down', color: 'red', splitTime: 27.89, diff: 0.03 },
      { gateNumber: 7, penalty: 0, direction: 'down', color: 'green', splitTime: 32.12, diff: -0.28 },
      { gateNumber: 8, penalty: 0, direction: 'up', color: 'green', splitTime: 37.45, diff: 0.11 },
      { gateNumber: 9, penalty: 0, direction: 'down', color: 'red', splitTime: 42.78, diff: -0.19 },
      { gateNumber: 10, penalty: 2, direction: 'down', color: 'green', splitTime: 48.01, diff: 0.67 },
      { gateNumber: 11, penalty: 0, direction: 'down', color: 'green', splitTime: 52.34, diff: 0.23 },
      { gateNumber: 12, penalty: 0, direction: 'up', color: 'green', splitTime: 57.67, diff: -0.34 },
      { gateNumber: 13, penalty: 0, direction: 'down', color: 'red', splitTime: 62.00, diff: 0.12 },
      { gateNumber: 14, penalty: 0, direction: 'down', color: 'green', splitTime: 66.33, diff: -0.45 },
      { gateNumber: 15, penalty: 0, direction: 'down', color: 'green', splitTime: 70.66, diff: 0.08 },
      { gateNumber: 16, penalty: 0, direction: 'up', color: 'green', splitTime: 75.89, diff: -0.21 },
      { gateNumber: 17, penalty: 0, direction: 'down', color: 'red', splitTime: 80.12, diff: 0.15 },
      { gateNumber: 18, penalty: 0, direction: 'down', color: 'green', splitTime: 84.45, diff: -0.33 },
      { gateNumber: 19, penalty: 0, direction: 'down', color: 'green', splitTime: 88.78, diff: 0.22 },
      { gateNumber: 20, penalty: 0, direction: 'up', color: 'green', splitTime: 93.01, diff: -0.18 },
    ],
    runRank: 3,
    runDiff: 2.11,
  },
  run2: {
    runNumber: 2,
    rawTime: 89.12,
    totalPenalty: 0,
    finalTime: 89.12,
    status: 'finished',
    gates: [
      { gateNumber: 1, penalty: 0, direction: 'down', color: 'green', splitTime: 4.01, diff: -0.34 },
      { gateNumber: 2, penalty: 0, direction: 'down', color: 'green', splitTime: 8.23, diff: -0.25 },
      { gateNumber: 3, penalty: 0, direction: 'down', color: 'red', splitTime: 12.56, diff: -0.18 },
      { gateNumber: 4, penalty: 0, direction: 'up', color: 'green', splitTime: 17.89, diff: -0.45 },
      { gateNumber: 5, penalty: 0, direction: 'down', color: 'green', splitTime: 22.12, diff: -0.23 },
      { gateNumber: 6, penalty: 0, direction: 'down', color: 'red', splitTime: 26.45, diff: -0.31 },
      { gateNumber: 7, penalty: 0, direction: 'down', color: 'green', splitTime: 30.78, diff: -0.42 },
      { gateNumber: 8, penalty: 0, direction: 'up', color: 'green', splitTime: 35.01, diff: -0.56 },
      { gateNumber: 9, penalty: 0, direction: 'down', color: 'red', splitTime: 39.34, diff: -0.38 },
      { gateNumber: 10, penalty: 0, direction: 'down', color: 'green', splitTime: 43.67, diff: -0.29 },
      { gateNumber: 11, penalty: 0, direction: 'down', color: 'green', splitTime: 48.00, diff: -0.45 },
      { gateNumber: 12, penalty: 0, direction: 'up', color: 'green', splitTime: 52.33, diff: -0.52 },
      { gateNumber: 13, penalty: 0, direction: 'down', color: 'red', splitTime: 56.66, diff: -0.33 },
      { gateNumber: 14, penalty: 0, direction: 'down', color: 'green', splitTime: 60.99, diff: -0.47 },
      { gateNumber: 15, penalty: 0, direction: 'down', color: 'green', splitTime: 65.32, diff: -0.28 },
      { gateNumber: 16, penalty: 0, direction: 'up', color: 'green', splitTime: 69.65, diff: -0.61 },
      { gateNumber: 17, penalty: 0, direction: 'down', color: 'red', splitTime: 73.98, diff: -0.39 },
      { gateNumber: 18, penalty: 0, direction: 'down', color: 'green', splitTime: 78.31, diff: -0.55 },
      { gateNumber: 19, penalty: 0, direction: 'down', color: 'green', splitTime: 82.64, diff: -0.42 },
      { gateNumber: 20, penalty: 0, direction: 'up', color: 'green', splitTime: 86.97, diff: -0.67 },
    ],
    runRank: 1,
    runDiff: 0,
  },
  overallRank: 1,
  overallDiff: 0,
};

const RunDetailModalDemo = () => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: '0.5rem 1rem',
          background: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
        }}
      >
        Otevřít detail jízdy
      </button>
      <RunDetailModal
        athlete={sampleAthleteDetail}
        open={open}
        onClose={() => setOpen(false)}
        section="dv"
      />
    </div>
  );
};

export const RunDetailModalStory: Story = {
  name: 'RunDetailModal: Standalone',
  render: () => <RunDetailModalDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Modální okno s detailem jízdy zobrazuje čistý čas, penalizace a grid branek s vizuálním rozlišením čisté/dotyk/vynechání.',
      },
    },
  },
};
