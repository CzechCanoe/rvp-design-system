import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeader } from './SectionHeader';
import { Button } from '../Button';
import { Badge } from '../Badge';

const meta: Meta<typeof SectionHeader> = {
  title: 'Layout/SectionHeader',
  component: SectionHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the header',
    },
    bordered: {
      control: 'boolean',
      description: 'Add bottom border',
    },
    title: {
      control: 'text',
      description: 'Section title',
    },
    description: {
      control: 'text',
      description: 'Optional description below the title',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

/* ==========================================================================
   DEFAULT
   ========================================================================== */

export const Default: Story = {
  args: {
    title: 'Section Title',
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

/* ==========================================================================
   WITH ACTION
   ========================================================================== */

export const WithAction: Story = {
  args: {
    title: 'Recent Results',
    action: (
      <Button variant="ghost" size="sm">
        View All
      </Button>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Section header with action button on the right.',
      },
    },
  },
};

/* ==========================================================================
   WITH BADGE
   ========================================================================== */

export const WithBadge: Story = {
  args: {
    title: 'Notifications',
    badge: <Badge variant="primary">5</Badge>,
    action: (
      <Button variant="ghost" size="sm">
        Mark all read
      </Button>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Section header with badge showing a count.',
      },
    },
  },
};

/* ==========================================================================
   WITH DESCRIPTION
   ========================================================================== */

export const WithDescription: Story = {
  args: {
    title: 'Athlete Rankings',
    description: 'Current standings based on 2026 season results',
    action: (
      <Button variant="secondary" size="sm">
        Export
      </Button>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Section header with description text.',
      },
    },
  },
};

/* ==========================================================================
   SIZE VARIANTS
   ========================================================================== */

export const Sizes: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <SectionHeader
        title="Small Header"
        size="sm"
        action={<Button variant="ghost" size="sm">Action</Button>}
      />
      <SectionHeader
        title="Medium Header"
        size="md"
        action={<Button variant="ghost" size="sm">Action</Button>}
      />
      <SectionHeader
        title="Large Header"
        size="lg"
        action={<Button variant="secondary" size="sm">Action</Button>}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different size variants: sm, md, lg.',
      },
    },
  },
};

/* ==========================================================================
   BORDERED
   ========================================================================== */

export const Bordered: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <SectionHeader
          title="Bordered Small"
          size="sm"
          bordered
          action={<Button variant="ghost" size="sm">View</Button>}
        />
        <p style={{ margin: 0, color: 'var(--csk-color-on-surface-muted)' }}>
          Content below the bordered header.
        </p>
      </div>
      <div>
        <SectionHeader
          title="Bordered Medium"
          size="md"
          bordered
          action={<Button variant="ghost" size="sm">View</Button>}
        />
        <p style={{ margin: 0, color: 'var(--csk-color-on-surface-muted)' }}>
          Content below the bordered header.
        </p>
      </div>
      <div>
        <SectionHeader
          title="Bordered Large"
          size="lg"
          bordered
          action={<Button variant="secondary" size="sm">View</Button>}
        />
        <p style={{ margin: 0, color: 'var(--csk-color-on-surface-muted)' }}>
          Content below the bordered header.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Bordered variant adds a bottom border and margin.',
      },
    },
  },
};

/* ==========================================================================
   REAL WORLD EXAMPLES
   ========================================================================== */

export const DashboardExample: Story = {
  name: 'Example: Dashboard Sections',
  render: () => (
    <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <SectionHeader
          title="Upcoming Events"
          badge={<Badge variant="info">3</Badge>}
          action={<Button variant="ghost" size="sm">Calendar</Button>}
          bordered
        />
        <div
          style={{
            padding: '16px',
            background: 'var(--csk-color-surface-container)',
            borderRadius: '8px',
          }}
        >
          Event list would go here...
        </div>
      </div>

      <div>
        <SectionHeader
          title="Recent Results"
          description="Last 7 days"
          action={<Button variant="ghost" size="sm">View All</Button>}
          bordered
        />
        <div
          style={{
            padding: '16px',
            background: 'var(--csk-color-surface-container)',
            borderRadius: '8px',
          }}
        >
          Results table would go here...
        </div>
      </div>

      <div>
        <SectionHeader
          title="Club Members"
          badge={<Badge variant="success">Active</Badge>}
          action={<Button variant="secondary" size="sm">Add Member</Button>}
          bordered
        />
        <div
          style={{
            padding: '16px',
            background: 'var(--csk-color-surface-container)',
            borderRadius: '8px',
          }}
        >
          Members grid would go here...
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world dashboard section examples with badges and actions.',
      },
    },
  },
};
