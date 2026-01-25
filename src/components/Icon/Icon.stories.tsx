import type { Meta, StoryObj } from '@storybook/react';
import { Icon, iconNames, type IconName } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
      description: 'Icon name from the design system catalog',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Icon size preset or custom number',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class for styling',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

/* ==========================================================================
   DEFAULT
   ========================================================================== */

export const Default: Story = {
  args: {
    name: 'calendar',
    size: 'md',
  },
};

/* ==========================================================================
   SIZES
   ========================================================================== */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Icon name="calendar" size="sm" />
        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>sm (16px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="calendar" size="md" />
        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>md (20px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="calendar" size="lg" />
        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>lg (24px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="calendar" size="xl" />
        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>xl (32px)</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon size presets: sm (16px), md (20px), lg (24px), xl (32px). Custom numeric sizes are also supported.',
      },
    },
  },
};

/* ==========================================================================
   ICON CATALOG - NAVIGATION & UI
   ========================================================================== */

const IconGridItem = ({ name }: { name: IconName }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      padding: '12px',
      borderRadius: '8px',
      backgroundColor: 'var(--color-surface-secondary)',
      minWidth: '100px',
    }}
  >
    <Icon name={name} size="lg" />
    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center' }}>{name}</span>
  </div>
);

export const NavigationIcons: Story = {
  render: () => {
    const icons: IconName[] = [
      'arrow-right',
      'chevron-down',
      'chevron-right',
      'chevron-up',
      'search',
      'close',
    ];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {icons.map((name) => (
          <IconGridItem key={name} name={name} />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation and UI control icons.',
      },
    },
  },
};

/* ==========================================================================
   ICON CATALOG - ACTIONS
   ========================================================================== */

export const ActionIcons: Story = {
  render: () => {
    const icons: IconName[] = [
      'download',
      'edit',
      'external-link',
      'plus',
      'print',
      'refresh',
      'send',
      'share',
      'trash',
    ];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {icons.map((name) => (
          <IconGridItem key={name} name={name} />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Action and interaction icons.',
      },
    },
  },
};

/* ==========================================================================
   ICON CATALOG - STATUS & FEEDBACK
   ========================================================================== */

export const StatusIcons: Story = {
  render: () => {
    const icons: IconName[] = [
      'alert',
      'alert-circle',
      'check',
      'check-circle',
      'info',
      'bell',
    ];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {icons.map((name) => (
          <IconGridItem key={name} name={name} />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Status and feedback icons for alerts, notifications, and confirmations.',
      },
    },
  },
};

/* ==========================================================================
   ICON CATALOG - CONTENT & MEDIA
   ========================================================================== */

export const ContentIcons: Story = {
  render: () => {
    const icons: IconName[] = [
      'file',
      'file-text',
      'grid',
      'cards',
      'list',
      'map',
      'map-pin',
    ];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {icons.map((name) => (
          <IconGridItem key={name} name={name} />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Content and media display icons.',
      },
    },
  },
};

/* ==========================================================================
   ICON CATALOG - TIME & ACTIVITY
   ========================================================================== */

export const TimeActivityIcons: Story = {
  render: () => {
    const icons: IconName[] = [
      'activity',
      'calendar',
      'clock',
      'play-circle',
      'trend-up',
    ];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {icons.map((name) => (
          <IconGridItem key={name} name={name} />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Time and activity-related icons.',
      },
    },
  },
};

/* ==========================================================================
   ICON CATALOG - ACHIEVEMENTS & RANKINGS
   ========================================================================== */

export const AchievementIcons: Story = {
  render: () => {
    const icons: IconName[] = [
      'medal',
      'star',
      'trophy',
      'cup',
      'world-champion',
      'national-champion',
      'race',
    ];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {icons.map((name) => (
          <IconGridItem key={name} name={name} />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Achievement and ranking icons for sports results and competitions.',
      },
    },
  },
};

/* ==========================================================================
   ICON CATALOG - USERS & ORGANIZATIONS
   ========================================================================== */

export const UserOrganizationIcons: Story = {
  render: () => {
    const icons: IconName[] = [
      'building',
      'globe',
      'graduation-cap',
      'mail',
      'phone',
      'user',
      'user-plus',
      'user-search',
      'users',
      'users-team',
    ];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {icons.map((name) => (
          <IconGridItem key={name} name={name} />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'User and organization icons for profiles, teams, and contacts.',
      },
    },
  },
};

/* ==========================================================================
   ICON CATALOG - MISCELLANEOUS
   ========================================================================== */

export const MiscIcons: Story = {
  render: () => {
    const icons: IconName[] = [
      'chart',
      'clipboard-check',
      'fullscreen',
      'exit-fullscreen',
      'pin',
      'unpin',
      'promotion',
    ];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {icons.map((name) => (
          <IconGridItem key={name} name={name} />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Miscellaneous utility icons.',
      },
    },
  },
};

/* ==========================================================================
   ALL ICONS
   ========================================================================== */

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', maxWidth: '900px' }}>
      {iconNames.map((name) => (
        <IconGridItem key={name} name={name} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete catalog of all available icons in the design system.',
      },
    },
  },
};

/* ==========================================================================
   WITH COLOR
   ========================================================================== */

export const WithColor: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Icon name="check-circle" size="lg" className="text-success" style={{ color: 'var(--color-success)' }} />
      <Icon name="alert" size="lg" style={{ color: 'var(--color-warning)' }} />
      <Icon name="alert-circle" size="lg" style={{ color: 'var(--color-error)' }} />
      <Icon name="info" size="lg" style={{ color: 'var(--color-info)' }} />
      <Icon name="trophy" size="lg" style={{ color: 'var(--color-accent-primary)' }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons can be colored using CSS color property or design system color tokens.',
      },
    },
  },
};
