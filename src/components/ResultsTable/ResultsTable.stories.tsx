import type { Meta, StoryObj } from '@storybook/react';
import { ResultsTable, type ResultEntry } from './ResultsTable';
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
      options: ['default', 'gradient', 'glass', 'embed'],
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
    showPoints: {
      control: 'boolean',
      description: 'Show points column',
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
    name: 'Jiri Prskavec',
    club: 'USK Praha',
    country: 'CZE',
    section: 'dv',
    category: 'K1M',
    run1Time: 92.34,
    run1Penalty: 0,
    run2Time: 89.12,
    run2Penalty: 2,
    totalTime: 89.12,
    timeDiff: 0,
    status: 'final',
  },
  {
    id: 2,
    rank: 2,
    name: 'Lukas Rohan',
    club: 'Dukla Praha',
    country: 'CZE',
    section: 'dv',
    category: 'C1M',
    run1Time: 94.56,
    run1Penalty: 2,
    run2Time: 90.23,
    run2Penalty: 0,
    totalTime: 90.23,
    timeDiff: 1.11,
    status: 'final',
  },
  {
    id: 3,
    rank: 3,
    name: 'Tereza Fiserova',
    club: 'Dukla Praha',
    country: 'CZE',
    section: 'dv',
    category: 'C1W',
    run1Time: 98.45,
    run1Penalty: 4,
    run2Time: 93.67,
    run2Penalty: 2,
    totalTime: 93.67,
    timeDiff: 4.55,
    status: 'final',
  },
  {
    id: 4,
    rank: 4,
    name: 'Vit Prindis',
    club: 'Dukla Praha',
    country: 'CZE',
    section: 'dv',
    category: 'K1M',
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
    name: 'Jan Masek',
    club: 'KK Rakovnik',
    country: 'CZE',
    section: 'dv',
    category: 'K1M',
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
    name: 'Michal Jane',
    club: 'ASK Slavia Praha',
    country: 'CZE',
    section: 'dv',
    category: 'C1M',
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
        <div
          style={{
            padding: '1.5rem',
            background: 'linear-gradient(135deg, var(--color-primary-50), var(--color-accent-50))',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <h3 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Glass Style</h3>
          <ResultsTable results={shortResults} styleVariant="glass" showPodiumHighlights />
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
