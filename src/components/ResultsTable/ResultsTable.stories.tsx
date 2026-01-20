import type { Meta, StoryObj } from '@storybook/react';
import { ResultsTable, type ResultEntry } from './ResultsTable';

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

const mixedSectionResults: ResultEntry[] = [
  {
    id: 1,
    rank: 1,
    name: 'Jiri Prskavec',
    club: 'USK Praha',
    section: 'dv',
    totalTime: 89.12,
    timeDiff: 0,
    status: 'final',
  },
  {
    id: 2,
    rank: 2,
    name: 'Martin Fuksa',
    club: 'Dukla Praha',
    section: 'ry',
    totalTime: 192.45,
    timeDiff: 103.33,
    status: 'final',
  },
  {
    id: 3,
    rank: 3,
    name: 'Vojtech Heger',
    club: 'TJ Bohemians',
    section: 'vt',
    totalTime: 245.67,
    timeDiff: 156.55,
    status: 'final',
  },
  {
    id: 4,
    rank: 4,
    name: 'Tereza Fiserova',
    club: 'Dukla Praha',
    section: 'dv',
    totalTime: 93.67,
    timeDiff: 4.55,
    status: 'final',
  },
  {
    id: 5,
    rank: 5,
    name: 'Josef Dostal',
    club: 'Dukla Praha',
    section: 'ry',
    totalTime: 198.23,
    timeDiff: 109.11,
    status: 'final',
  },
];

const liveResults: ResultEntry[] = [
  {
    id: 1,
    rank: 1,
    name: 'Jiri Prskavec',
    club: 'USK Praha',
    section: 'dv',
    totalTime: 89.12,
    timeDiff: 0,
    status: 'final',
  },
  {
    id: 2,
    rank: 2,
    name: 'Lukas Rohan',
    club: 'Dukla Praha',
    section: 'dv',
    totalTime: 90.23,
    timeDiff: 1.11,
    status: 'live',
    highlighted: true,
  },
  {
    id: 3,
    rank: undefined,
    name: 'Tereza Fiserova',
    club: 'Dukla Praha',
    section: 'dv',
    run1Time: 45.67,
    totalTime: undefined,
    status: 'live',
  },
  {
    id: 4,
    rank: 3,
    name: 'Vit Prindis',
    club: 'Dukla Praha',
    section: 'dv',
    totalTime: 94.56,
    timeDiff: 5.44,
    status: 'provisional',
  },
];

const statusResults: ResultEntry[] = [
  {
    id: 1,
    rank: 1,
    name: 'Jiri Prskavec',
    club: 'USK Praha',
    section: 'dv',
    totalTime: 89.12,
    timeDiff: 0,
    status: 'final',
  },
  {
    id: 2,
    rank: 2,
    name: 'Lukas Rohan',
    club: 'Dukla Praha',
    section: 'dv',
    totalTime: 90.23,
    timeDiff: 1.11,
    status: 'final',
  },
  {
    id: 3,
    rank: undefined,
    name: 'Jan Novak',
    club: 'KK Rakovnik',
    section: 'dv',
    status: 'dns',
  },
  {
    id: 4,
    rank: undefined,
    name: 'Petr Svoboda',
    club: 'ASK Slavia Praha',
    section: 'dv',
    run1Time: 45.67,
    status: 'dnf',
  },
  {
    id: 5,
    rank: undefined,
    name: 'Michal Jane',
    club: 'TJ Bohemians',
    section: 'dv',
    run1Time: 87.34,
    status: 'dsq',
  },
];

// Position change data for live updates
const positionChangeResults: ResultEntry[] = [
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
    previousRank: 5,
    name: 'Lukas Rohan',
    club: 'Dukla Praha',
    section: 'dv',
    totalTime: 90.23,
    timeDiff: 1.11,
    status: 'live',
    highlighted: true,
  },
  {
    id: 4,
    rank: 4,
    previousRank: 3,
    name: 'Tereza Fiserova',
    club: 'Dukla Praha',
    section: 'dv',
    totalTime: 93.67,
    timeDiff: 4.55,
    status: 'final',
  },
  {
    id: 5,
    rank: 5,
    previousRank: 4,
    name: 'Vit Prindis',
    club: 'Dukla Praha',
    section: 'dv',
    totalTime: 94.56,
    timeDiff: 5.44,
    status: 'final',
  },
];

// Stories
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

export const MixedSections: Story = {
  args: {
    results: mixedSectionResults,
    showPodiumHighlights: true,
    caption: 'Vysledky napric disciplinami',
  },
};

export const LiveResults: Story = {
  args: {
    results: liveResults,
    showLiveIndicator: true,
    showPodiumHighlights: true,
    caption: 'Live vysledky - semifinale',
  },
};

export const WithStatuses: Story = {
  args: {
    results: statusResults,
    caption: 'Vysledky se statusy (DNS, DNF, DSQ)',
  },
};

export const CompactVariant: Story = {
  args: {
    results: sampleResults.slice(0, 10),
    variant: 'compact',
    size: 'sm',
    showRuns: false,
    caption: 'Kompaktni zobrazeni',
  },
};

export const StripedVariant: Story = {
  args: {
    results: sampleResults,
    variant: 'striped',
    showRuns: true,
    caption: 'Pruhovane radky',
  },
};

export const WithCountryAndCategory: Story = {
  args: {
    results: sampleResults,
    showCountry: true,
    showCategory: true,
    showRuns: false,
    caption: 'S kodem zeme a kategorii',
  },
};

export const FilteredBySection: Story = {
  args: {
    results: mixedSectionResults,
    section: 'dv',
    caption: 'Pouze divoka voda',
  },
};

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
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Vysledky budou k dispozici po dokonceni zavodu
        </p>
      </div>
    ),
    caption: 'Prazdna tabulka',
  },
};

export const StickyHeader: Story = {
  args: {
    results: [...sampleResults, ...sampleResults, ...sampleResults],
    stickyHeader: true,
    showRuns: true,
    caption: 'Sticky header pro dlouhe tabulky',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '400px', overflow: 'auto' }}>
        <Story />
      </div>
    ),
  ],
};

export const ClickableRows: Story = {
  args: {
    results: sampleResults,
    onRowClick: (entry) => alert(`Clicked on: ${entry.name}`),
    caption: 'Klikatelne radky',
  },
};

export const FullFeatures: Story = {
  args: {
    results: sampleResults,
    variant: 'default',
    size: 'md',
    showRuns: true,
    showTimeDiff: true,
    showCountry: true,
    showCategory: true,
    showPodiumHighlights: true,
    highlightPositions: 3,
    caption: 'Slalom - K1 muzi finale',
    captionVisible: true,
    stickyHeader: true,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '500px', overflow: 'auto' }}>
        <Story />
      </div>
    ),
  ],
};

// =============================================================================
// NEW: Style Variant Stories
// =============================================================================

export const StyleDefault: Story = {
  name: 'Style: Default',
  args: {
    results: sampleResults.slice(0, 5),
    styleVariant: 'default',
    showPodiumHighlights: true,
    caption: 'Default style - clean modern look',
    captionVisible: true,
  },
};

export const StyleGradient: Story = {
  name: 'Style: Gradient',
  args: {
    results: sampleResults.slice(0, 5),
    styleVariant: 'gradient',
    showPodiumHighlights: true,
    caption: 'Gradient style - branded header',
    captionVisible: true,
  },
};

export const StyleGlass: Story = {
  name: 'Style: Glass',
  args: {
    results: sampleResults.slice(0, 5),
    styleVariant: 'glass',
    showPodiumHighlights: true,
    caption: 'Glass style - glassmorphism effect',
    captionVisible: true,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, var(--color-primary-100), var(--color-accent-100))',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

// =============================================================================
// NEW: Position Change Animation Story
// =============================================================================

export const PositionChanges: Story = {
  name: 'Position Changes (Live Updates)',
  args: {
    results: positionChangeResults,
    showPodiumHighlights: true,
    showLiveIndicator: true,
    caption: 'Live vysledky s animaci zmeny pozice',
    captionVisible: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows position change indicators when previousRank differs from current rank. Green arrows indicate movement up, red arrows indicate movement down.',
      },
    },
  },
};

// =============================================================================
// Real-world example: Slalom World Cup
// =============================================================================

export const SlalomWorldCup: Story = {
  args: {
    results: [
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
        totalTime: 91.12,
        timeDiff: 0,
        status: 'final',
      },
      {
        id: 2,
        rank: 2,
        name: 'Giovanni De Gennaro',
        club: 'Italia',
        country: 'ITA',
        section: 'dv',
        category: 'K1M',
        run1Time: 93.56,
        run1Penalty: 0,
        run2Time: 91.23,
        run2Penalty: 0,
        totalTime: 91.23,
        timeDiff: 0.11,
        status: 'final',
      },
      {
        id: 3,
        rank: 3,
        name: 'Peter Kauzer',
        club: 'KK Ljubljana',
        country: 'SLO',
        section: 'dv',
        category: 'K1M',
        run1Time: 94.12,
        run1Penalty: 2,
        run2Time: 92.45,
        run2Penalty: 0,
        totalTime: 92.45,
        timeDiff: 1.33,
        status: 'final',
      },
      {
        id: 4,
        rank: 4,
        name: 'Hannes Aigner',
        club: 'KC Augsburg',
        country: 'GER',
        section: 'dv',
        category: 'K1M',
        run1Time: 95.67,
        run1Penalty: 0,
        run2Time: 93.12,
        run2Penalty: 0,
        totalTime: 93.12,
        timeDiff: 2.0,
        status: 'final',
      },
      {
        id: 5,
        rank: 5,
        name: 'Vit Prindis',
        club: 'Dukla Praha',
        country: 'CZE',
        section: 'dv',
        category: 'K1M',
        run1Time: 94.89,
        run1Penalty: 2,
        run2Time: 93.45,
        run2Penalty: 0,
        totalTime: 93.45,
        timeDiff: 2.33,
        status: 'final',
      },
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
// All Style Variants Comparison
// =============================================================================

export const StyleVariantsComparison: Story = {
  name: 'All Style Variants',
  render: () => {
    const shortResults = sampleResults.slice(0, 4);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Default Style</h3>
          <ResultsTable
            results={shortResults}
            styleVariant="default"
            showPodiumHighlights
            caption="Clean modern look with subtle shadow"
          />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Gradient Style</h3>
          <ResultsTable
            results={shortResults}
            styleVariant="gradient"
            showPodiumHighlights
            caption="Branded header with gradient"
          />
        </div>
        <div
          style={{
            padding: '1.5rem',
            background: 'linear-gradient(135deg, var(--color-primary-50), var(--color-accent-50))',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <h3 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Glass Style</h3>
          <ResultsTable
            results={shortResults}
            styleVariant="glass"
            showPodiumHighlights
            caption="Glassmorphism effect - best on colored backgrounds"
          />
        </div>
      </div>
    );
  },
};

// =============================================================================
// Live Demo with Position Changes
// =============================================================================

export const LiveDemo: Story = {
  name: 'Live Results Demo',
  render: () => {
    const liveData: ResultEntry[] = [
      {
        id: 1,
        rank: 1,
        previousRank: 3,
        name: 'Jiri Prskavec',
        club: 'USK Praha',
        country: 'CZE',
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
        previousRank: 2,
        name: 'Lukas Rohan',
        club: 'Dukla Praha',
        country: 'CZE',
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
        country: 'CZE',
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
        country: 'CZE',
        section: 'dv',
        totalTime: 94.56,
        timeDiff: 5.44,
        status: 'provisional',
      },
    ];

    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            Live results with position change indicators, pulsing live dots, and row animations.
            Position changes show arrows with the number of positions gained (green) or lost (red).
          </p>
        </div>
        <ResultsTable
          results={liveData}
          styleVariant="gradient"
          showPodiumHighlights
          showLiveIndicator
          showCountry
          caption="ICF World Cup - K1M Semifinal (LIVE)"
          captionVisible
        />
      </div>
    );
  },
};

// =============================================================================
// EMBED MODE - kanoe.cz Integration
// =============================================================================

import { KanoeCzContext } from '../KanoeCzContext';

export const EmbedStyle: Story = {
  name: 'Style: Embed',
  args: {
    results: sampleResults.slice(0, 5),
    styleVariant: 'embed',
    showPodiumHighlights: true,
    caption: 'Embed style - for kanoe.cz integration',
    captionVisible: true,
  },
};

export const EmbedInKanoeCz: Story = {
  name: 'Embed: V kontextu kanoe.cz',
  render: () => (
    <KanoeCzContext layout="full" showHeader showSidebar={false}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>
        Výsledky - K1 muži finále
      </h2>
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
      <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>
        Výsledky kvalifikace
      </h2>
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
    docs: {
      description: {
        story: 'Tests container query responsiveness - club column should hide when container is narrow.',
      },
    },
  },
};

// =============================================================================
// SLALOM-SPECIFIC STORIES
// =============================================================================

const slalomQualificationResults: ResultEntry[] = [
  {
    id: 1,
    rank: 1,
    startNumber: 15,
    name: 'Jiří Prskavec',
    club: 'USK Praha',
    country: 'CZE',
    category: 'K1M',
    round: 'Q',
    run1Time: 92.34,
    run1Penalty: 0,
    run2Time: 89.12,
    run2Penalty: 2,
    totalTime: 91.12,
    timeDiff: 0,
    status: 'final',
    progressed: true,
  },
  {
    id: 2,
    rank: 2,
    startNumber: 23,
    name: 'Giovanni De Gennaro',
    club: 'Italia',
    country: 'ITA',
    category: 'K1M',
    round: 'Q',
    run1Time: 93.56,
    run1Penalty: 0,
    run2Time: 91.23,
    run2Penalty: 0,
    totalTime: 91.23,
    timeDiff: 0.11,
    status: 'final',
    progressed: true,
  },
  {
    id: 3,
    rank: 3,
    startNumber: 8,
    name: 'Peter Kauzer',
    club: 'KK Ljubljana',
    country: 'SLO',
    category: 'K1M',
    round: 'Q',
    run1Time: 94.12,
    run1Penalty: 2,
    run2Time: 92.45,
    run2Penalty: 0,
    totalTime: 92.45,
    timeDiff: 1.33,
    status: 'final',
    progressed: true,
  },
  {
    id: 4,
    rank: 4,
    startNumber: 12,
    name: 'Hannes Aigner',
    club: 'KC Augsburg',
    country: 'GER',
    category: 'K1M',
    round: 'Q',
    run1Time: 95.67,
    run1Penalty: 0,
    run2Time: 93.12,
    run2Penalty: 0,
    totalTime: 93.12,
    timeDiff: 2.0,
    status: 'final',
    progressed: true,
  },
  {
    id: 5,
    rank: 5,
    startNumber: 31,
    name: 'Vít Přindiš',
    club: 'Dukla Praha',
    country: 'CZE',
    category: 'K1M',
    round: 'Q',
    run1Time: 94.89,
    run1Penalty: 2,
    run2Time: 93.45,
    run2Penalty: 0,
    totalTime: 93.45,
    timeDiff: 2.33,
    status: 'final',
    progressed: true,
  },
  {
    id: 6,
    rank: 6,
    startNumber: 5,
    name: 'Lukáš Rohan',
    club: 'Dukla Praha',
    country: 'CZE',
    category: 'C1M',
    round: 'Q',
    run1Time: 96.12,
    run1Penalty: 0,
    run2Time: 94.78,
    run2Penalty: 2,
    totalTime: 96.78,
    timeDiff: 5.66,
    status: 'final',
    progressed: false,
  },
  {
    id: 7,
    rank: 7,
    startNumber: 19,
    name: 'Jan Mašek',
    club: 'KK Rakovník',
    country: 'CZE',
    category: 'K1M',
    round: 'Q',
    run1Time: 98.45,
    run1Penalty: 2,
    run2Time: 97.12,
    run2Penalty: 0,
    totalTime: 97.12,
    timeDiff: 6.0,
    status: 'final',
    progressed: false,
  },
];

export const SlalomQualification: Story = {
  name: 'Slalom: Kvalifikace s postupy',
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
  parameters: {
    docs: {
      description: {
        story: 'Slalom qualification results showing start numbers, both runs, and progression indicators (checkmarks for athletes who qualified for the next round).',
      },
    },
  },
};

export const SlalomQualificationEmbed: Story = {
  name: 'Slalom: Kvalifikace (embed v kanoe.cz)',
  render: () => (
    <KanoeCzContext layout="full" showHeader>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>
        K1 muži - Kvalifikace
      </h2>
      <p style={{ marginBottom: '1rem', color: '#666', fontSize: '0.875rem' }}>
        Top 5 postupuje do semifinále
      </p>
      <ResultsTable
        results={slalomQualificationResults}
        styleVariant="embed"
        showPodiumHighlights={false}
        showRuns
        showCountry
        showStartNumber
        showProgression
        caption="K1M Qualification"
      />
    </KanoeCzContext>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

const slalomRoundsResults: ResultEntry[] = [
  { id: 1, rank: 1, name: 'Jiří Prskavec', club: 'USK Praha', round: 'F', totalTime: 89.12, timeDiff: 0, status: 'final' },
  { id: 2, rank: 2, name: 'Giovanni De Gennaro', club: 'Italia', round: 'F', totalTime: 89.45, timeDiff: 0.33, status: 'final' },
  { id: 3, rank: 3, name: 'Peter Kauzer', club: 'KK Ljubljana', round: 'F', totalTime: 90.23, timeDiff: 1.11, status: 'final' },
  { id: 4, rank: 1, name: 'Vít Přindiš', club: 'Dukla Praha', round: 'SF', totalTime: 91.45, timeDiff: 0, status: 'final', progressed: true },
  { id: 5, rank: 2, name: 'Lukáš Rohan', club: 'Dukla Praha', round: 'SF', totalTime: 92.12, timeDiff: 0.67, status: 'final', progressed: true },
  { id: 6, rank: 1, name: 'Jan Mašek', club: 'KK Rakovník', round: 'Q', totalTime: 93.45, timeDiff: 0, status: 'final', progressed: true },
  { id: 7, rank: 2, name: 'Michal Jane', club: 'TJ Bohemians', round: 'Q', totalTime: 94.12, timeDiff: 0.67, status: 'final', progressed: false },
];

export const SlalomWithRounds: Story = {
  name: 'Slalom: S označením kol (Q/SF/F)',
  args: {
    results: slalomRoundsResults,
    styleVariant: 'default',
    showPodiumHighlights: true,
    showRound: true,
    showProgression: true,
    caption: 'Slalom results with round indicators',
    captionVisible: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows round badges (Q = Qualification, SF = Semifinal, F = Final) and progression checkmarks.',
      },
    },
  },
};

// =============================================================================
// CONTAINER QUERY DEMO
// =============================================================================

export const ContainerQueryDemo: Story = {
  name: 'Container Query: Responsive Columns',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Full width (~800px+)</h3>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
          All columns visible
        </p>
        <div style={{ width: '100%' }}>
          <ResultsTable
            results={slalomQualificationResults.slice(0, 3)}
            styleVariant="embed"
            showRuns
            showCountry
            showStartNumber
            showProgression
          />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Medium width (~500px)</h3>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
          Club and run columns hidden
        </p>
        <div style={{ width: '500px', maxWidth: '100%' }}>
          <ResultsTable
            results={slalomQualificationResults.slice(0, 3)}
            styleVariant="embed"
            showRuns
            showCountry
            showStartNumber
            showProgression
          />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Narrow width (~350px)</h3>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
          Only essential columns (rank, name, time, progression)
        </p>
        <div style={{ width: '350px', maxWidth: '100%' }}>
          <ResultsTable
            results={slalomQualificationResults.slice(0, 3)}
            styleVariant="embed"
            showRuns
            showCountry
            showStartNumber
            showProgression
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates container query-based responsive column hiding. As the container width decreases, less important columns are automatically hidden.',
      },
    },
  },
};

// Sample data with age categories and points
const resultsWithAgeCategoryAndPoints: ResultEntry[] = [
  {
    id: 1,
    rank: 1,
    name: 'Jiří Prskavec',
    club: 'USK Praha',
    category: 'K1M',
    ageCategory: 'Senior',
    points: 1000,
    totalTime: 89.12,
    timeDiff: 0,
    section: 'dv',
    status: 'final',
  },
  {
    id: 2,
    rank: 2,
    name: 'Vojtěch Heger',
    club: 'Dukla Praha',
    category: 'K1M',
    ageCategory: 'U23',
    points: 800,
    totalTime: 90.45,
    timeDiff: 1.33,
    section: 'dv',
    status: 'final',
  },
  {
    id: 3,
    rank: 3,
    name: 'Adam Novák',
    club: 'SK Trnávka',
    category: 'K1M',
    ageCategory: 'Junior',
    points: 650,
    totalTime: 91.23,
    timeDiff: 2.11,
    section: 'dv',
    status: 'final',
  },
  {
    id: 4,
    rank: 4,
    name: 'Petr Svoboda',
    club: 'Bohemians Praha',
    category: 'K1M',
    ageCategory: 'Senior',
    points: 525,
    totalTime: 92.67,
    timeDiff: 3.55,
    section: 'dv',
    status: 'final',
  },
  {
    id: 5,
    rank: 5,
    name: 'Karel Veselý',
    club: 'KK Roudnice',
    category: 'K1M',
    ageCategory: 'Master',
    points: 420,
    totalTime: 93.89,
    timeDiff: 4.77,
    section: 'dv',
    status: 'final',
  },
  {
    id: 6,
    rank: 6,
    name: 'Tomáš Dvořák',
    club: 'KK Brandýs',
    category: 'K1M',
    ageCategory: 'U23',
    points: 340,
    totalTime: 95.12,
    timeDiff: 6.00,
    section: 'dv',
    status: 'final',
  },
];

/**
 * Tabulka s věkovými kategoriemi a body.
 * Důležité pro bodovací závody a přehledy výsledků.
 */
export const WithAgeCategoryAndPoints: Story = {
  args: {
    results: resultsWithAgeCategoryAndPoints,
    showAgeCategory: true,
    showPoints: true,
    showCategory: true,
    showClub: true,
    showTimeDiff: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabulka zobrazující věkové kategorie (Senior, U23, Junior, Master) a body získané v závodě. Důležité pro bodovací soutěže a seriály závodů.',
      },
    },
  },
};

/**
 * Kompaktní tabulka s body - pro přehledy seriálů.
 */
export const PointsTableCompact: Story = {
  args: {
    results: resultsWithAgeCategoryAndPoints,
    variant: 'compact',
    size: 'sm',
    showAgeCategory: true,
    showPoints: true,
    showCategory: false,
    showClub: false,
    showTimeDiff: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Kompaktní verze bodovací tabulky - vhodná pro celkové pořadí seriálu závodů.',
      },
    },
  },
};
