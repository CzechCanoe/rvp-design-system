import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Button } from '../Button';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'EmptyState component for displaying when no data or results are available. Used for empty tables, no search results, first-time user states, and more.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'card', 'inline'],
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// BASIC EXAMPLES
// =============================================================================

export const Default: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your search or filters to find what you are looking for.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'No athletes yet',
    description: 'Start by registering your first athlete to the system.',
    action: <Button>Add Athlete</Button>,
  },
};

export const WithTwoActions: Story = {
  args: {
    title: 'No events scheduled',
    description: 'Create a new event or import from the federation calendar.',
    action: <Button>Create Event</Button>,
    secondaryAction: <Button variant="secondary">Import Calendar</Button>,
  },
};

// =============================================================================
// ALL VARIANTS & SIZES
// =============================================================================

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
      <EmptyState
        size="sm"
        variant="card"
        title="Small"
        description="Compact empty state for tight spaces."
      />
      <EmptyState
        size="md"
        variant="card"
        title="Medium (Default)"
        description="Standard empty state for most use cases."
      />
      <EmptyState
        size="lg"
        variant="card"
        title="Large"
        description="Prominent empty state for full-page or hero sections."
        action={<Button size="lg">Take Action</Button>}
      />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '500px' }}>
      <div>
        <h4 style={{ marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Default</h4>
        <EmptyState
          variant="default"
          title="Default Variant"
          description="Transparent background, minimal styling."
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Card</h4>
        <EmptyState
          variant="card"
          title="Card Variant"
          description="With background and border, suitable for contained areas."
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Inline</h4>
        <EmptyState
          variant="inline"
          title="Inline Variant"
          description="Horizontal layout for compact inline messages."
          action={<Button size="sm">Action</Button>}
        />
      </div>
    </div>
  ),
};

// =============================================================================
// CSK-SPECIFIC EXAMPLES
// =============================================================================

export const NoSearchResults: Story = {
  args: {
    title: 'Nenalezeni žádní závodníci',
    description: 'Zkuste upravit vyhledávací dotaz nebo filtry.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    action: <Button variant="secondary">Vymazat vyhledávání</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state for athlete search with no results.',
      },
    },
  },
};

export const NoEvents: Story = {
  args: {
    size: 'lg',
    variant: 'card',
    title: 'Žádné závody v tomto období',
    description: 'V tomto měsíci nejsou naplánovány žádné závody. Podívejte se na roční kalendář.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    action: <Button>Zobrazit roční kalendář</Button>,
    secondaryAction: <Button variant="secondary">Přihlásit se k odběru</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state for event calendar with no upcoming events.',
      },
    },
  },
};

export const LiveResultsPending: Story = {
  args: {
    variant: 'card',
    title: 'Čekáme na první výsledky',
    description: 'Závod právě probíhá. Výsledky se zobrazí automaticky.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state for live results before first athlete finishes.',
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    title: 'Nepodařilo se načíst data',
    description: 'Zkontrolujte připojení k internetu a zkuste to znovu.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: 'var(--color-error-500)' }}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    action: <Button>Zkusit znovu</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state styled as error state for failed data loading.',
      },
    },
  },
};
