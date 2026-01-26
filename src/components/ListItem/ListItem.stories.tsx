import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from './ListItem';
import { Button } from '../Button';
import { Card } from '../Card';
import { Icon } from '../Icon';

const meta: Meta<typeof ListItem> = {
  title: 'Components/ListItem',
  component: ListItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'warning', 'danger', 'info', 'success', 'energy'],
      description: 'Color type for icon container',
    },
    variant: {
      control: 'select',
      options: ['default', 'alert', 'activity', 'feed'],
      description: 'Style variant',
    },
    title: {
      control: 'text',
      description: 'Main title',
    },
    description: {
      control: 'text',
      description: 'Description or subtitle',
    },
    timestamp: {
      control: 'text',
      description: 'Timestamp text',
    },
    divider: {
      control: 'boolean',
      description: 'Show bottom border divider',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListItem>;

// ============================================================================
// Basic Stories
// ============================================================================

export const Default: Story = {
  args: {
    icon: <Icon name="user" />,
    title: 'Jan Novák registered for competition',
    description: 'MS Praha 2024 - C1M',
    timestamp: '2 hours ago',
  },
};

export const WithAction: Story = {
  args: {
    icon: <Icon name="bell" />,
    title: 'New notification',
    description: 'You have a new message from the organizer',
    action: <Button size="sm" variant="ghost">View</Button>,
  },
};

export const Clickable: Story = {
  args: {
    icon: <Icon name="calendar" />,
    title: 'Competition starts tomorrow',
    description: 'Remember to check in before 8:00',
    onClick: () => console.log('Clicked!'),
  },
};

export const AsLink: Story = {
  args: {
    icon: <Icon name="external-link" />,
    title: 'View full results',
    description: 'Results are now available on the official website',
    href: '#results',
  },
};

// ============================================================================
// Type Variants
// ============================================================================

export const TypeDefault: Story = {
  args: {
    icon: <Icon name="info" />,
    type: 'default',
    title: 'Default type',
    description: 'Neutral styling for general content',
  },
};

export const TypeWarning: Story = {
  args: {
    icon: <Icon name="alert-triangle" />,
    type: 'warning',
    title: 'License expires in 30 days',
    description: 'Renew your license to continue competing',
  },
};

export const TypeDanger: Story = {
  args: {
    icon: <Icon name="alert-circle" />,
    type: 'danger',
    title: 'Payment overdue',
    description: 'Your registration fee is 14 days overdue',
  },
};

export const TypeInfo: Story = {
  args: {
    icon: <Icon name="info" />,
    type: 'info',
    title: 'Start list published',
    description: 'Check your start time for tomorrow',
  },
};

export const TypeSuccess: Story = {
  args: {
    icon: <Icon name="check-circle" />,
    type: 'success',
    title: 'Registration confirmed',
    description: 'You are registered for MS Praha 2024',
  },
};

export const TypeEnergy: Story = {
  args: {
    icon: <Icon name="activity" />,
    type: 'energy',
    title: 'Urgent action needed',
    description: 'Complete your profile to participate',
  },
};

// ============================================================================
// Alert Variant
// ============================================================================

export const AlertWarning: Story = {
  args: {
    icon: <Icon name="alert-triangle" />,
    variant: 'alert',
    type: 'warning',
    title: 'License expiring soon',
    description: 'Your annual license expires in 30 days. Renew now to avoid interruption.',
    action: <Button size="sm" variant="primary">Renew</Button>,
  },
};

export const AlertDanger: Story = {
  args: {
    icon: <Icon name="x-circle" />,
    variant: 'alert',
    type: 'danger',
    title: 'Payment failed',
    description: 'We could not process your payment. Please update your card details.',
    action: <Button size="sm" variant="danger">Update</Button>,
  },
};

export const AlertInfo: Story = {
  args: {
    icon: <Icon name="info" />,
    variant: 'alert',
    type: 'info',
    title: 'New feature available',
    description: 'You can now export your results in PDF format.',
    action: <Button size="sm" variant="ghost">Learn more</Button>,
  },
};

export const AlertSuccess: Story = {
  args: {
    icon: <Icon name="check-circle" />,
    variant: 'alert',
    type: 'success',
    title: 'Profile complete',
    description: 'Your athlete profile is now 100% complete.',
  },
};

export const AlertEnergy: Story = {
  args: {
    icon: <Icon name="activity" />,
    variant: 'alert',
    type: 'energy',
    title: 'Action required',
    description: 'Complete medical examination before the deadline.',
    action: <Button size="sm" variant="primary">Upload</Button>,
  },
};

// ============================================================================
// Activity Variant
// ============================================================================

export const Activity: Story = {
  args: {
    icon: <Icon name="user-plus" />,
    variant: 'activity',
    title: 'Jan Novák registered',
    description: 'New member joined your club',
    timestamp: '2 hours ago',
    onClick: () => console.log('View activity'),
  },
};

export const ActivityWithAction: Story = {
  args: {
    icon: <Icon name="check" />,
    variant: 'activity',
    type: 'success',
    title: 'Result approved',
    description: 'Your 1:32.45 time was verified',
    timestamp: '5 minutes ago',
    action: <Button size="sm" variant="ghost">View</Button>,
  },
};

// ============================================================================
// Feed Variant
// ============================================================================

export const Feed: Story = {
  args: {
    icon: <Icon name="trophy" />,
    variant: 'feed',
    type: 'success',
    title: 'Jan Novák won gold medal',
    description: 'Congratulations! First place in C1M at MS Praha 2024 with time 1:32.45.',
    timestamp: 'Yesterday',
    onClick: () => console.log('View details'),
  },
};

// ============================================================================
// Lists
// ============================================================================

export const AlertsList: Story = {
  render: () => (
    <Card variant="surface" padding="none">
      <ListItem
        icon={<Icon name="alert-triangle" />}
        variant="alert"
        type="warning"
        title="License expiring soon"
        description="Your license expires in 30 days"
        action={<Button size="sm" variant="primary">Renew</Button>}
      />
      <ListItem
        icon={<Icon name="credit-card" />}
        variant="alert"
        type="danger"
        title="Payment overdue"
        description="Registration fee is 14 days overdue"
        action={<Button size="sm" variant="danger">Pay now</Button>}
      />
      <ListItem
        icon={<Icon name="calendar" />}
        variant="alert"
        type="info"
        title="Upcoming competition"
        description="MS Praha starts in 3 days"
        action={<Button size="sm" variant="ghost">Details</Button>}
      />
      <ListItem
        icon={<Icon name="check-circle" />}
        variant="alert"
        type="success"
        title="Medical certificate valid"
        description="Valid until December 2024"
      />
    </Card>
  ),
};

export const ActivityList: Story = {
  render: () => (
    <Card variant="surface" padding="none">
      <ListItem
        icon={<Icon name="user-plus" />}
        variant="activity"
        title="Petr Svoboda registered"
        description="New athlete joined the club"
        timestamp="5 minutes ago"
        divider
        onClick={() => {}}
      />
      <ListItem
        icon={<Icon name="check" />}
        variant="activity"
        type="success"
        title="Result approved"
        description="Jan Novák - MS Praha C1M"
        timestamp="1 hour ago"
        divider
        onClick={() => {}}
      />
      <ListItem
        icon={<Icon name="calendar" />}
        variant="activity"
        type="info"
        title="Event updated"
        description="Schedule changed for SP Augsburg"
        timestamp="3 hours ago"
        divider
        onClick={() => {}}
      />
      <ListItem
        icon={<Icon name="trophy" />}
        variant="activity"
        type="warning"
        title="Results pending"
        description="Awaiting official results from ME Tacen"
        timestamp="Yesterday"
        onClick={() => {}}
      />
    </Card>
  ),
};

export const FeedList: Story = {
  render: () => (
    <Card variant="surface" padding="none">
      <ListItem
        icon={<Icon name="trophy" />}
        variant="feed"
        type="success"
        title="Jan Novák won gold medal!"
        description="First place in C1M at Mistrovství světa Praha 2024 with time 1:32.45. Congratulations!"
        timestamp="2 hours ago"
        onClick={() => {}}
      />
      <ListItem
        icon={<Icon name="calendar" />}
        variant="feed"
        type="info"
        title="MS Praha 2024 registration open"
        description="Registration for World Championship in Prague is now open. Don't miss the deadline!"
        timestamp="Yesterday"
        onClick={() => {}}
      />
      <ListItem
        icon={<Icon name="users" />}
        variant="feed"
        title="Czech team announced"
        description="The national team for European Championship has been selected. See the full list."
        timestamp="3 days ago"
        onClick={() => {}}
      />
    </Card>
  ),
};

// ============================================================================
// All Types Showcase
// ============================================================================

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Card variant="surface" padding="none">
        <h4 style={{ padding: '1rem', margin: 0, borderBottom: '1px solid var(--color-border-primary)' }}>
          Default Variant - All Types
        </h4>
        <ListItem
          icon={<Icon name="info" />}
          type="default"
          title="Default Type"
          description="Neutral styling"
          divider
        />
        <ListItem
          icon={<Icon name="alert-triangle" />}
          type="warning"
          title="Warning Type"
          description="For warnings and cautions"
          divider
        />
        <ListItem
          icon={<Icon name="alert-circle" />}
          type="danger"
          title="Danger Type"
          description="For errors and critical alerts"
          divider
        />
        <ListItem
          icon={<Icon name="info" />}
          type="info"
          title="Info Type"
          description="For informational messages"
          divider
        />
        <ListItem
          icon={<Icon name="check-circle" />}
          type="success"
          title="Success Type"
          description="For success states"
          divider
        />
        <ListItem
          icon={<Icon name="activity" />}
          type="energy"
          title="Energy Type"
          description="For urgent or highlighted items"
        />
      </Card>

      <Card variant="surface" padding="none">
        <h4 style={{ padding: '1rem', margin: 0, borderBottom: '1px solid var(--color-border-primary)' }}>
          Alert Variant - All Types
        </h4>
        <ListItem
          icon={<Icon name="alert-triangle" />}
          variant="alert"
          type="warning"
          title="Warning Alert"
          description="With left border accent"
        />
        <ListItem
          icon={<Icon name="alert-circle" />}
          variant="alert"
          type="danger"
          title="Danger Alert"
          description="Critical notification"
        />
        <ListItem
          icon={<Icon name="info" />}
          variant="alert"
          type="info"
          title="Info Alert"
          description="Informational notice"
        />
        <ListItem
          icon={<Icon name="check-circle" />}
          variant="alert"
          type="success"
          title="Success Alert"
          description="Action completed"
        />
        <ListItem
          icon={<Icon name="activity" />}
          variant="alert"
          type="energy"
          title="Energy Alert"
          description="Urgent action needed"
        />
      </Card>
    </div>
  ),
};
