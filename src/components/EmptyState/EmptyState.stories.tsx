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

// Basic example
export const Default: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your search or filters to find what you are looking for.',
  },
};

// With action button
export const WithAction: Story = {
  args: {
    title: 'No athletes yet',
    description: 'Start by registering your first athlete to the system.',
    action: <Button>Add Athlete</Button>,
  },
};

// With primary and secondary actions
export const WithTwoActions: Story = {
  args: {
    title: 'No events scheduled',
    description: 'Create a new event or import from the federation calendar.',
    action: <Button>Create Event</Button>,
    secondaryAction: <Button variant="secondary">Import Calendar</Button>,
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    title: 'No results',
    description: 'Try different search terms.',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    title: 'No results found',
    description: 'Try adjusting your search or filters to find what you are looking for.',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    title: 'Welcome to CSK Registration',
    description: 'Get started by creating your first event or registering athletes from your club.',
    action: <Button size="lg">Get Started</Button>,
  },
};

// Variants
export const DefaultVariant: Story = {
  args: {
    variant: 'default',
    title: 'No search results',
    description: 'Your search did not match any athletes.',
    action: <Button variant="secondary">Clear Search</Button>,
  },
};

export const CardVariant: Story = {
  args: {
    variant: 'card',
    title: 'Empty inbox',
    description: 'You have no new notifications.',
  },
};

export const InlineVariant: Story = {
  args: {
    variant: 'inline',
    title: 'No comments',
    description: 'Be the first to comment on this result.',
    action: <Button size="sm">Add Comment</Button>,
  },
};

// Custom icon
export const WithCustomIcon: Story = {
  args: {
    title: 'No events this month',
    description: 'Check back later or browse the annual calendar.',
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
  },
};

// Hide icon
export const WithoutIcon: Story = {
  args: {
    hideIcon: true,
    title: 'Filter applied',
    description: 'No athletes match your current filter criteria.',
    action: <Button variant="secondary">Reset Filters</Button>,
  },
};

// With illustration
export const WithIllustration: Story = {
  args: {
    title: 'No athletes found',
    description: 'Start by adding athletes to your club roster.',
    illustration: (
      <svg
        width="200"
        height="150"
        viewBox="0 0 200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="50"
          y="30"
          width="100"
          height="80"
          rx="8"
          fill="var(--color-bg-tertiary)"
          stroke="var(--color-border-default)"
          strokeWidth="2"
        />
        <circle cx="100" cy="60" r="15" fill="var(--color-bg-secondary)" stroke="var(--color-border-muted)" strokeWidth="2" />
        <rect x="70" y="85" width="60" height="8" rx="4" fill="var(--color-bg-secondary)" />
        <rect x="80" y="98" width="40" height="6" rx="3" fill="var(--color-bg-tertiary)" />
      </svg>
    ),
    action: <Button>Add Athlete</Button>,
  },
};

// CSK-specific: No search results
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

// CSK-specific: No events
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

// CSK-specific: No registrations
export const NoRegistrations: Story = {
  args: {
    title: 'Zatím žádné přihlášky',
    description: 'Na tento závod zatím nejsou žádní přihlášení závodníci.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    action: <Button>Přihlásit závodníka</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state for event registration list.',
      },
    },
  },
};

// CSK-specific: No results yet (live timing)
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

// CSK-specific: No club members
export const NoClubMembers: Story = {
  args: {
    size: 'lg',
    title: 'Váš klub nemá žádné členy',
    description: 'Začněte přidáním prvního člena do vašeho klubu nebo importem ze stávajícího systému.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
      </svg>
    ),
    action: <Button>Přidat člena</Button>,
    secondaryAction: <Button variant="secondary">Importovat data</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state for club member list - onboarding scenario.',
      },
    },
  },
};

// CSK-specific: Empty VT classification
export const NoVtClassification: Story = {
  args: {
    variant: 'card',
    size: 'sm',
    title: 'Bez VT klasifikace',
    description: 'Tento závodník zatím nemá přidělenou VT třídu.',
    hideIcon: true,
    action: <Button size="sm" variant="secondary">Přidělit VT třídu</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact empty state for athlete without VT classification.',
      },
    },
  },
};

// CSK-specific: No files uploaded
export const NoFilesUploaded: Story = {
  args: {
    variant: 'card',
    title: 'Žádné soubory',
    description: 'Přetáhněte soubory sem nebo klikněte pro výběr.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state for file upload area.',
      },
    },
  },
};

// Error state variant
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

// All sizes comparison
export const SizeComparison: Story = {
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
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all size variants.',
      },
    },
  },
};

// All variants comparison
export const VariantComparison: Story = {
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
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all visual variants.',
      },
    },
  },
};
