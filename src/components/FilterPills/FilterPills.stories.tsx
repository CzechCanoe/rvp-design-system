import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterPills, type FilterPill } from './FilterPills';
import { Card } from '../Card';

const meta = {
  title: 'Components/FilterPills',
  component: FilterPills,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# FilterPills

Component for displaying active filters with remove functionality.

## Features

- Display active filters as removable pills
- Optional search query display
- Clear individual filters or all at once
- Size variants (sm, md, lg)
- Visual variants (default, subtle)
- Dark mode support
- Accessible with keyboard navigation

## Usage

Used in list pages (Athletes, Clubs, Calendar, Rankings) to show
and manage active filters.

\`\`\`tsx
<FilterPills
  filters={[
    { key: 'section', label: 'Divoká voda' },
    { key: 'region', label: 'Praha' },
  ]}
  searchQuery="Prskavec"
  onRemove={(key) => handleRemoveFilter(key)}
  onClearSearch={() => setSearchQuery('')}
  onClearAll={() => resetAllFilters()}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    filters: {
      description: 'Array of active filters to display',
      control: 'object',
    },
    searchQuery: {
      description: 'Optional search query to display as a filter',
      control: 'text',
    },
    searchLabel: {
      description: 'Label prefix for search filter',
      control: 'text',
    },
    clearAllLabel: {
      description: 'Label for clear all button',
      control: 'text',
    },
    size: {
      description: 'Size variant',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      description: 'Visual variant',
      control: 'select',
      options: ['default', 'subtle'],
    },
    bordered: {
      description: 'Show separator line at top',
      control: 'boolean',
    },
    hideWhenEmpty: {
      description: 'Hide component when no filters are active',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof FilterPills>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample filters
const sampleFilters: FilterPill[] = [
  { key: 'section', label: 'Divoká voda' },
  { key: 'region', label: 'Praha' },
];

// ============================================================================
// Stories
// ============================================================================

/**
 * Default filter pills with search query and multiple filters.
 */
export const Default: Story = {
  args: {
    filters: sampleFilters,
    searchQuery: 'Prskavec',
    onRemove: (key) => console.log('Remove filter:', key),
    onClearSearch: () => console.log('Clear search'),
    onClearAll: () => console.log('Clear all'),
  },
};

/**
 * Filter pills without search query.
 */
export const WithoutSearch: Story = {
  args: {
    filters: sampleFilters,
    onRemove: (key) => console.log('Remove filter:', key),
    onClearAll: () => console.log('Clear all'),
  },
};

/**
 * Only search query, no other filters.
 */
export const OnlySearch: Story = {
  args: {
    filters: [],
    searchQuery: 'slalom',
    onClearSearch: () => console.log('Clear search'),
    onClearAll: () => console.log('Clear all'),
  },
};

/**
 * Multiple filters with icons.
 */
export const WithIcons: Story = {
  args: {
    filters: [
      { key: 'section', label: 'Divoká voda', icon: 'activity' },
      { key: 'region', label: 'Praha', icon: 'map-pin' },
      { key: 'year', label: '2026', icon: 'calendar' },
    ],
    onRemove: (key) => console.log('Remove filter:', key),
    onClearAll: () => console.log('Clear all'),
  },
};

/**
 * Small size variant.
 */
export const Small: Story = {
  args: {
    filters: sampleFilters,
    searchQuery: 'Prskavec',
    size: 'sm',
    onRemove: (key) => console.log('Remove filter:', key),
    onClearSearch: () => console.log('Clear search'),
    onClearAll: () => console.log('Clear all'),
  },
};

/**
 * Large size variant.
 */
export const Large: Story = {
  args: {
    filters: sampleFilters,
    searchQuery: 'Prskavec',
    size: 'lg',
    onRemove: (key) => console.log('Remove filter:', key),
    onClearSearch: () => console.log('Clear search'),
    onClearAll: () => console.log('Clear all'),
  },
};

/**
 * Subtle visual variant.
 */
export const Subtle: Story = {
  args: {
    filters: sampleFilters,
    searchQuery: 'Prskavec',
    variant: 'subtle',
    onRemove: (key) => console.log('Remove filter:', key),
    onClearSearch: () => console.log('Clear search'),
    onClearAll: () => console.log('Clear all'),
  },
};

/**
 * Without border separator.
 */
export const NoBorder: Story = {
  args: {
    filters: sampleFilters,
    bordered: false,
    onRemove: (key) => console.log('Remove filter:', key),
    onClearAll: () => console.log('Clear all'),
  },
};

/**
 * Read-only pills (no remove buttons).
 */
export const ReadOnly: Story = {
  args: {
    filters: sampleFilters,
    searchQuery: 'Prskavec',
    bordered: false,
  },
};

/**
 * Many filters to show wrapping behavior.
 */
export const ManyFilters: Story = {
  args: {
    filters: [
      { key: 'section', label: 'Divoká voda' },
      { key: 'discipline', label: 'Slalom' },
      { key: 'region', label: 'Praha' },
      { key: 'year', label: '2026' },
      { key: 'category', label: 'K1 Muži' },
      { key: 'ageCategory', label: 'Senior' },
    ],
    searchQuery: 'Prskavec',
    onRemove: (key) => console.log('Remove filter:', key),
    onClearSearch: () => console.log('Clear search'),
    onClearAll: () => console.log('Clear all'),
  },
};

/**
 * Interactive example with state management.
 */
export const Interactive: Story = {
  args: {
    filters: [],
  },
  render: function InteractiveStory() {
    const [filters, setFilters] = useState<FilterPill[]>([
      { key: 'section', label: 'Divoká voda' },
      { key: 'region', label: 'Praha' },
    ]);
    const [searchQuery, setSearchQuery] = useState('Prskavec');

    const handleRemove = (key: string) => {
      setFilters((prev) => prev.filter((f) => f.key !== key));
    };

    const handleClearSearch = () => {
      setSearchQuery('');
    };

    const handleClearAll = () => {
      setFilters([]);
      setSearchQuery('');
    };

    const handleAddFilter = () => {
      const newFilter: FilterPill = {
        key: `filter-${Date.now()}`,
        label: `Filtr ${filters.length + 1}`,
      };
      setFilters((prev) => [...prev, newFilter]);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={handleAddFilter}>Přidat filtr</button>
          <button onClick={() => setSearchQuery('test')}>Nastavit hledání</button>
        </div>

        <Card variant="surface" padding="lg">
          <p style={{ marginBottom: '1rem' }}>Filtry závodníků</p>
          <FilterPills
            filters={filters}
            searchQuery={searchQuery}
            onRemove={handleRemove}
            onClearSearch={handleClearSearch}
            onClearAll={handleClearAll}
          />
        </Card>

        <p style={{ fontSize: '0.875rem', color: 'var(--csk-color-on-surface-muted)' }}>
          Aktivní filtry: {filters.length}, Hledání: {searchQuery || '(prázdné)'}
        </p>
      </div>
    );
  },
};

/**
 * Inside a Card - typical usage pattern.
 */
export const InsideCard: Story = {
  args: {
    filters: sampleFilters,
    searchQuery: 'Prskavec',
    onRemove: (key) => console.log('Remove filter:', key),
    onClearSearch: () => console.log('Clear search'),
    onClearAll: () => console.log('Clear all'),
  },
  decorators: [
    (Story) => (
      <Card variant="surface" padding="lg">
        <div style={{ marginBottom: '1rem' }}>
          <p>Filtry a vyhledávání</p>
          {/* Placeholder for filter inputs */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginTop: '0.5rem',
              padding: '0.5rem',
              background: 'var(--csk-color-surface-secondary)',
              borderRadius: 'var(--csk-radius-md)',
            }}
          >
            <span style={{ color: 'var(--csk-color-on-surface-muted)', fontSize: '0.875rem' }}>
              [Input a Select komponenty]
            </span>
          </div>
        </div>
        <Story />
      </Card>
    ),
  ],
};

/**
 * All size variants comparison.
 */
export const SizeComparison: Story = {
  args: {
    filters: sampleFilters,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Small</h4>
        <FilterPills
          filters={sampleFilters}
          searchQuery="test"
          size="sm"
          bordered={false}
          onRemove={(key) => console.log('Remove:', key)}
          onClearSearch={() => console.log('Clear search')}
          onClearAll={() => console.log('Clear all')}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Medium (default)</h4>
        <FilterPills
          filters={sampleFilters}
          searchQuery="test"
          size="md"
          bordered={false}
          onRemove={(key) => console.log('Remove:', key)}
          onClearSearch={() => console.log('Clear search')}
          onClearAll={() => console.log('Clear all')}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Large</h4>
        <FilterPills
          filters={sampleFilters}
          searchQuery="test"
          size="lg"
          bordered={false}
          onRemove={(key) => console.log('Remove:', key)}
          onClearSearch={() => console.log('Clear search')}
          onClearAll={() => console.log('Clear all')}
        />
      </div>
    </div>
  ),
};
