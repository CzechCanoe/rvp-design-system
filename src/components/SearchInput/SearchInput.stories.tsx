import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchInput } from './SearchInput';
import { FilterPills } from '../FilterPills';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
SearchInput is a search field in two sizes (md 40 px, sm 34 px). Quick filters are separate FilterPills placed next to it (see the Toolbar story).

## Features
- Debounced search with configurable delay
- Filter chips for quick category selection
- Loading state with spinner
- Energy focus variant for Dynamic Sport aesthetic
- Full keyboard support (Enter to search, Escape to clear)
- Results count display
- Helper text support

## Use Cases
- Event, athlete and club search
- Table toolbar of live results (sm, 16 px font on touch)
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the input',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width input',
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

// =============================================================================
// Results and helper
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
// Toolbar (search + pills, 390 px)
// =============================================================================

export const Toolbar: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [favorites, setFavorites] = useState(false);
    return (
      <div
        style={{
          width: 390,
          display: 'flex',
          gap: 6,
          alignItems: 'center',
          padding: 8,
          background: 'var(--csk-color-surface)',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <SearchInput size="sm" fullWidth value={value} onChange={setValue} placeholder="Hledat jméno, klub…" />
        </div>
        <FilterPills
          size="md"
          filters={[{ key: 'fav', label: '★ 2', active: favorites }]}
          onFilterToggle={() => setFavorites((v) => !v)}
        />
      </div>
    );
  },
};
