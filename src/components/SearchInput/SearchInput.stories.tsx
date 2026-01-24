import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchInput, type SearchFilterChip } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
SearchInput component combines a search field with optional filter chips for quick filtering.

## Features
- Debounced search with configurable delay
- Filter chips for quick category selection
- Loading state with spinner
- Energy focus variant for Dynamic Sport aesthetic
- Full keyboard support (Enter to search, Escape to clear)
- Results count display
- Helper text support

## Use Cases
- Calendar page event search with section filters (DV, RY, VT)
- Athletes list search with club/class filters
- Registration search with category filters
- Results search with discipline filters
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width input',
    },
    energyFocus: {
      control: 'boolean',
      description: 'Use energy (coral-orange) focus ring',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading indicator',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    debounceMs: {
      control: 'number',
      description: 'Debounce delay in milliseconds',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show search icon',
    },
  },
  args: {
    placeholder: 'Hledat závody, závodníky...',
    size: 'md',
    fullWidth: false,
    energyFocus: false,
    loading: false,
    disabled: false,
    debounceMs: 300,
    showIcon: true,
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

// =============================================================================
// Basic Stories
// =============================================================================

export const Default: Story = {
  args: {},
};

export const WithValue: Story = {
  args: {
    value: 'slalom',
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Hledat závodníky podle jména nebo klubu...',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

// =============================================================================
// Sizes
// =============================================================================

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SearchInput size="sm" placeholder="Small search..." />
      <SearchInput size="md" placeholder="Medium search (default)..." />
      <SearchInput size="lg" placeholder="Large search..." />
    </div>
  ),
};

// =============================================================================
// States
// =============================================================================

export const Loading: Story = {
  args: {
    loading: true,
    value: 'Načítání...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled search',
  },
};

export const EnergyFocus: Story = {
  args: {
    energyFocus: true,
    placeholder: 'Klikni pro energy focus efekt...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dynamic Sport aesthetic with coral-orange energy focus ring.',
      },
    },
  },
};

// =============================================================================
// With Chips
// =============================================================================

const sectionChips: SearchFilterChip[] = [
  { id: 'dv', label: 'Divoká voda', color: 'dv' },
  { id: 'ry', label: 'Rychlostní', color: 'ry' },
  { id: 'vt', label: 'Vodní turistika', color: 'vt' },
];

export const WithChips: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [activeChips, setActiveChips] = useState<string[]>([]);

    const handleChipToggle = (chipId: string, active: boolean) => {
      setActiveChips((prev) =>
        active ? [...prev, chipId] : prev.filter((id) => id !== chipId)
      );
    };

    return (
      <SearchInput
        value={value}
        onChange={setValue}
        placeholder="Hledat závody..."
        chips={sectionChips}
        activeChips={activeChips}
        onChipToggle={handleChipToggle}
        fullWidth
      />
    );
  },
};

export const WithActiveChips: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [activeChips, setActiveChips] = useState<string[]>(['dv']);

    const handleChipToggle = (chipId: string, active: boolean) => {
      setActiveChips((prev) =>
        active ? [...prev, chipId] : prev.filter((id) => id !== chipId)
      );
    };

    return (
      <SearchInput
        value={value}
        onChange={setValue}
        placeholder="Hledat závody..."
        chips={sectionChips}
        activeChips={activeChips}
        onChipToggle={handleChipToggle}
        fullWidth
      />
    );
  },
};

// =============================================================================
// With Results Count
// =============================================================================

export const WithResultsCount: Story = {
  render: () => {
    const [value, setValue] = useState('slalom');

    return (
      <SearchInput
        value={value}
        onChange={setValue}
        placeholder="Hledat..."
        resultsCount={42}
        fullWidth
      />
    );
  },
};

export const NoResults: Story = {
  render: () => {
    const [value, setValue] = useState('xyz123');

    return (
      <SearchInput
        value={value}
        onChange={setValue}
        placeholder="Hledat..."
        resultsCount={0}
        fullWidth
      />
    );
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'Můžete hledat podle jména, klubu nebo registračního čísla',
    fullWidth: true,
  },
};

// =============================================================================
// Interactive Example
// =============================================================================

const categoryChips: SearchFilterChip[] = [
  { id: 'mcr', label: 'MČR' },
  { id: 'cp', label: 'Český pohár' },
  { id: 'nominace', label: 'Nominace' },
  { id: 'trenink', label: 'Trénink' },
];

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [activeChips, setActiveChips] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<number | undefined>(undefined);

    const handleSearch = (searchValue: string) => {
      setLoading(true);
      setResults(undefined);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        if (searchValue) {
          setResults(Math.floor(Math.random() * 100));
        } else {
          setResults(undefined);
        }
      }, 500);
    };

    const handleChipToggle = (chipId: string, active: boolean) => {
      setActiveChips((prev) =>
        active ? [...prev, chipId] : prev.filter((id) => id !== chipId)
      );
      handleSearch(value);
    };

    return (
      <div style={{ maxWidth: 500 }}>
        <SearchInput
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            handleSearch(newValue);
          }}
          onSearch={handleSearch}
          placeholder="Hledat závody..."
          chips={categoryChips}
          activeChips={activeChips}
          onChipToggle={handleChipToggle}
          loading={loading}
          resultsCount={results}
          helperText="Stiskni Enter pro okamžité vyhledání"
          fullWidth
          energyFocus
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive example with debounced search, loading states, and filter chips.',
      },
    },
  },
};

// =============================================================================
// Calendar Search Example
// =============================================================================

export const CalendarSearch: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [activeChips, setActiveChips] = useState<string[]>([]);

    const chips: SearchFilterChip[] = [
      { id: 'dv', label: 'DV', color: 'dv' },
      { id: 'ry', label: 'RY', color: 'ry' },
      { id: 'vt', label: 'VT', color: 'vt' },
      { id: 'live', label: 'LIVE', color: 'energy' },
    ];

    const handleChipToggle = (chipId: string, active: boolean) => {
      setActiveChips((prev) =>
        active ? [...prev, chipId] : prev.filter((id) => id !== chipId)
      );
    };

    return (
      <div style={{ maxWidth: 400 }}>
        <SearchInput
          value={value}
          onChange={setValue}
          placeholder="Hledat závody..."
          chips={chips}
          activeChips={activeChips}
          onChipToggle={handleChipToggle}
          size="lg"
          fullWidth
          energyFocus
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example search for calendar page with section filters and LIVE indicator chip.',
      },
    },
  },
};

// =============================================================================
// Athletes Search Example
// =============================================================================

export const AthletesSearch: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [activeChips, setActiveChips] = useState<string[]>([]);

    const chips: SearchFilterChip[] = [
      { id: 'junior', label: 'Junioři' },
      { id: 'senior', label: 'Senioři' },
      { id: 'vt-m', label: 'VT M', color: 'vt' },
      { id: 'vt-a', label: 'VT A', color: 'vt' },
    ];

    const handleChipToggle = (chipId: string, active: boolean) => {
      setActiveChips((prev) =>
        active ? [...prev, chipId] : prev.filter((id) => id !== chipId)
      );
    };

    return (
      <div style={{ maxWidth: 450 }}>
        <SearchInput
          value={value}
          onChange={setValue}
          placeholder="Hledat závodníky podle jména nebo klubu..."
          chips={chips}
          activeChips={activeChips}
          onChipToggle={handleChipToggle}
          helperText="Např. 'Přindiš', 'USK Praha', 'CZE'"
          fullWidth
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example search for athletes list with category filters.',
      },
    },
  },
};

// =============================================================================
// Dark Mode
// =============================================================================

export const DarkMode: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [activeChips, setActiveChips] = useState<string[]>(['dv']);

    const handleChipToggle = (chipId: string, active: boolean) => {
      setActiveChips((prev) =>
        active ? [...prev, chipId] : prev.filter((id) => id !== chipId)
      );
    };

    return (
      <div
        data-theme="dark"
        style={{
          padding: 24,
          backgroundColor: 'var(--color-bg-primary)',
          borderRadius: 8,
        }}
      >
        <SearchInput
          value={value}
          onChange={setValue}
          placeholder="Hledat závody..."
          chips={sectionChips}
          activeChips={activeChips}
          onChipToggle={handleChipToggle}
          resultsCount={24}
          fullWidth
          energyFocus
        />
      </div>
    );
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'SearchInput in dark mode with energy focus.',
      },
    },
  },
};
