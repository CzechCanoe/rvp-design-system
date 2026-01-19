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
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    section: {
      control: 'select',
      options: [undefined, 'dv', 'ry', 'vt'],
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
    name: 'Lukáš Rohan',
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
    name: 'Tereza Fišerová',
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
    name: 'Vít Přindiš',
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
    name: 'Jan Mašek',
    club: 'KK Rakovník',
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
    name: 'Michal Jáně',
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
    name: 'Jiří Prskavec',
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
    name: 'Vojtěch Heger',
    club: 'TJ Bohemians',
    section: 'vt',
    totalTime: 245.67,
    timeDiff: 156.55,
    status: 'final',
  },
  {
    id: 4,
    rank: 4,
    name: 'Tereza Fišerová',
    club: 'Dukla Praha',
    section: 'dv',
    totalTime: 93.67,
    timeDiff: 4.55,
    status: 'final',
  },
  {
    id: 5,
    rank: 5,
    name: 'Josef Dostál',
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
    name: 'Jiří Prskavec',
    club: 'USK Praha',
    section: 'dv',
    totalTime: 89.12,
    timeDiff: 0,
    status: 'final',
  },
  {
    id: 2,
    rank: 2,
    name: 'Lukáš Rohan',
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
    name: 'Tereza Fišerová',
    club: 'Dukla Praha',
    section: 'dv',
    run1Time: 45.67,
    totalTime: undefined,
    status: 'live',
  },
  {
    id: 4,
    rank: 3,
    name: 'Vít Přindiš',
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
    name: 'Jiří Prskavec',
    club: 'USK Praha',
    section: 'dv',
    totalTime: 89.12,
    timeDiff: 0,
    status: 'final',
  },
  {
    id: 2,
    rank: 2,
    name: 'Lukáš Rohan',
    club: 'Dukla Praha',
    section: 'dv',
    totalTime: 90.23,
    timeDiff: 1.11,
    status: 'final',
  },
  {
    id: 3,
    rank: undefined,
    name: 'Jan Novák',
    club: 'KK Rakovník',
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
    name: 'Michal Jáně',
    club: 'TJ Bohemians',
    section: 'dv',
    run1Time: 87.34,
    status: 'dsq',
  },
];

// Stories
export const Default: Story = {
  args: {
    results: sampleResults,
    caption: 'Výsledky závodu - K1 muži semifinále',
    showRuns: true,
  },
};

export const WithPodiumHighlights: Story = {
  args: {
    results: sampleResults,
    showPodiumHighlights: true,
    highlightPositions: 3,
    caption: 'Finále - top 3 zvýrazněno',
  },
};

export const MixedSections: Story = {
  args: {
    results: mixedSectionResults,
    showPodiumHighlights: true,
    caption: 'Výsledky napříč disciplínami',
  },
};

export const LiveResults: Story = {
  args: {
    results: liveResults,
    showLiveIndicator: true,
    showPodiumHighlights: true,
    caption: 'Live výsledky - semifinále',
  },
};

export const WithStatuses: Story = {
  args: {
    results: statusResults,
    caption: 'Výsledky se statusy (DNS, DNF, DSQ)',
  },
};

export const CompactVariant: Story = {
  args: {
    results: sampleResults.slice(0, 10),
    variant: 'compact',
    size: 'sm',
    showRuns: false,
    caption: 'Kompaktní zobrazení',
  },
};

export const StripedVariant: Story = {
  args: {
    results: sampleResults,
    variant: 'striped',
    showRuns: true,
    caption: 'Pruhované řádky',
  },
};

export const WithCountryAndCategory: Story = {
  args: {
    results: sampleResults,
    showCountry: true,
    showCategory: true,
    showRuns: false,
    caption: 'S kódem země a kategorií',
  },
};

export const FilteredBySection: Story = {
  args: {
    results: mixedSectionResults,
    section: 'dv',
    caption: 'Pouze divoká voda',
  },
};

export const Loading: Story = {
  args: {
    results: [],
    loading: true,
    caption: 'Načítání výsledků...',
  },
};

export const Empty: Story = {
  args: {
    results: [],
    emptyState: (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Zatím žádné výsledky</p>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Výsledky budou k dispozici po dokončení závodu
        </p>
      </div>
    ),
    caption: 'Prázdná tabulka',
  },
};

export const StickyHeader: Story = {
  args: {
    results: [...sampleResults, ...sampleResults, ...sampleResults],
    stickyHeader: true,
    showRuns: true,
    caption: 'Sticky header pro dlouhé tabulky',
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
    caption: 'Klikatelné řádky',
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
    caption: 'Slalom - K1 muži finále',
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

// Real-world example: Slalom World Cup
export const SlalomWorldCup: Story = {
  args: {
    results: [
      {
        id: 1,
        rank: 1,
        name: 'Jiří Prskavec',
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
        name: 'Vít Přindiš',
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
    showRuns: true,
    showTimeDiff: true,
    showCountry: true,
    showPodiumHighlights: true,
    caption: 'ICF Canoe Slalom World Cup - K1 Men Final',
    captionVisible: true,
  },
};
