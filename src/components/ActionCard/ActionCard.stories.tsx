import type { Meta, StoryObj } from '@storybook/react';
import { ActionCard } from './ActionCard';
import { Icon } from '../Icon';
import { Card } from '../Card';

const meta: Meta<typeof ActionCard> = {
  title: 'Components/ActionCard',
  component: ActionCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    iconBackground: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'info', 'energy'],
      description: 'Icon background color variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    showArrow: {
      control: 'boolean',
      description: 'Whether to show the arrow indicator',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionCard>;

// ============================================================================
// Basic Stories
// ============================================================================

export const Default: Story = {
  args: {
    icon: <Icon name="user-plus" size="md" />,
    title: 'Add Member',
    description: 'Register a new athlete to the system',
  },
};

export const WithoutDescription: Story = {
  args: {
    icon: <Icon name="edit" size="md" />,
    title: 'Settings',
  },
};

export const AsLink: Story = {
  args: {
    icon: <Icon name="users" size="md" />,
    title: 'View Members',
    description: 'Browse all registered athletes',
    href: '/members',
  },
};

export const AsButton: Story = {
  args: {
    icon: <Icon name="plus" size="md" />,
    title: 'Create Event',
    description: 'Add a new competition event',
    onClick: () => alert('Create event clicked!'),
  },
};

export const NoArrow: Story = {
  args: {
    icon: <Icon name="info" size="md" />,
    title: 'Information',
    description: 'Important notice for athletes',
    showArrow: false,
  },
};

// ============================================================================
// Icon Background Variants
// ============================================================================

export const IconPrimary: Story = {
  args: {
    icon: <Icon name="user" size="md" />,
    title: 'Primary Background',
    description: 'Default primary color gradient',
    iconBackground: 'primary',
  },
};

export const IconSuccess: Story = {
  args: {
    icon: <Icon name="check-circle" size="md" />,
    title: 'Success Background',
    description: 'Green success color gradient',
    iconBackground: 'success',
  },
};

export const IconWarning: Story = {
  args: {
    icon: <Icon name="alert-triangle" size="md" />,
    title: 'Warning Background',
    description: 'Orange warning color gradient',
    iconBackground: 'warning',
  },
};

export const IconInfo: Story = {
  args: {
    icon: <Icon name="info" size="md" />,
    title: 'Info Background',
    description: 'Blue info color gradient',
    iconBackground: 'info',
  },
};

export const IconEnergy: Story = {
  args: {
    icon: <Icon name="activity" size="md" />,
    title: 'Energy Background',
    description: 'Vibrant energy gradient',
    iconBackground: 'energy',
  },
};

// ============================================================================
// Size Variants
// ============================================================================

export const SizeSmall: Story = {
  args: {
    icon: <Icon name="user-plus" size="sm" />,
    title: 'Small Card',
    description: 'Compact action card',
    size: 'sm',
  },
};

export const SizeMedium: Story = {
  args: {
    icon: <Icon name="user-plus" size="md" />,
    title: 'Medium Card',
    description: 'Default medium size',
    size: 'md',
  },
};

export const SizeLarge: Story = {
  args: {
    icon: <Icon name="user-plus" size="lg" />,
    title: 'Large Card',
    description: 'Larger action card for emphasis',
    size: 'lg',
  },
};

// ============================================================================
// In Context
// ============================================================================

export const InCard: Story = {
  render: () => (
    <Card variant="surface" padding="lg">
      <h3 style={{ margin: '0 0 1rem', color: 'var(--color-text-primary)' }}>
        Quick Actions
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <ActionCard
          icon={<Icon name="user-plus" size="md" />}
          title="Register Athlete"
          description="Add a new athlete to your club"
          href="/register"
          iconBackground="primary"
        />
        <ActionCard
          icon={<Icon name="calendar" size="md" />}
          title="View Calendar"
          description="Browse upcoming competitions"
          href="/calendar"
          iconBackground="info"
        />
        <ActionCard
          icon={<Icon name="trophy" size="md" />}
          title="Results"
          description="Check competition results"
          href="/results"
          iconBackground="success"
        />
      </div>
    </Card>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
      }}
    >
      <ActionCard
        icon={<Icon name="user-plus" size="md" />}
        title="Přidat člena"
        description="Zaregistrovat nového závodníka"
        href="/members/add"
        iconBackground="primary"
      />
      <ActionCard
        icon={<Icon name="calendar" size="md" />}
        title="Kalendář závodů"
        description="Zobrazit nadcházející závody"
        href="/calendar"
        iconBackground="info"
      />
      <ActionCard
        icon={<Icon name="trophy" size="md" />}
        title="Výsledky"
        description="Prohlédnout výsledky závodů"
        href="/results"
        iconBackground="success"
      />
      <ActionCard
        icon={<Icon name="chart" size="md" />}
        title="Statistiky"
        description="Analýza výkonů klubu"
        href="/stats"
        iconBackground="energy"
      />
    </div>
  ),
};

// ============================================================================
// All Icon Backgrounds Comparison
// ============================================================================

export const AllIconBackgrounds: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <ActionCard
        icon={<Icon name="user" size="md" />}
        title="Primary"
        description="Default primary gradient"
        iconBackground="primary"
      />
      <ActionCard
        icon={<Icon name="check-circle" size="md" />}
        title="Success"
        description="Green success gradient"
        iconBackground="success"
      />
      <ActionCard
        icon={<Icon name="alert-triangle" size="md" />}
        title="Warning"
        description="Orange warning gradient"
        iconBackground="warning"
      />
      <ActionCard
        icon={<Icon name="info" size="md" />}
        title="Info"
        description="Blue info gradient"
        iconBackground="info"
      />
      <ActionCard
        icon={<Icon name="activity" size="md" />}
        title="Energy"
        description="Vibrant energy gradient"
        iconBackground="energy"
      />
    </div>
  ),
};

// ============================================================================
// All Sizes Comparison
// ============================================================================

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Card variant="surface" padding="md">
        <h4 style={{ margin: '0 0 0.75rem', color: 'var(--color-text-secondary)' }}>
          Small
        </h4>
        <ActionCard
          icon={<Icon name="user-plus" size="sm" />}
          title="Small Action Card"
          description="Compact size for dense layouts"
          size="sm"
        />
      </Card>
      <Card variant="surface" padding="md">
        <h4 style={{ margin: '0 0 0.75rem', color: 'var(--color-text-secondary)' }}>
          Medium (default)
        </h4>
        <ActionCard
          icon={<Icon name="user-plus" size="md" />}
          title="Medium Action Card"
          description="Default balanced size"
          size="md"
        />
      </Card>
      <Card variant="surface" padding="md">
        <h4 style={{ margin: '0 0 0.75rem', color: 'var(--color-text-secondary)' }}>
          Large
        </h4>
        <ActionCard
          icon={<Icon name="user-plus" size="lg" />}
          title="Large Action Card"
          description="Larger size for emphasis"
          size="lg"
        />
      </Card>
    </div>
  ),
};
