import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Switch component for toggling between two states (on/off). Use switches for settings that take effect immediately. For forms with a submit action, consider using checkboxes instead.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the switch',
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Validation state',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the label',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below switch',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message (shown when state is error)',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ==========================================================================
   DEFAULT
   ========================================================================== */

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

/* ==========================================================================
   SIZES
   ========================================================================== */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch size="sm" label="Small switch" />
      <Switch size="md" label="Medium switch (default)" />
      <Switch size="lg" label="Large switch" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three sizes: sm, md (default), lg.',
      },
    },
  },
};

/* ==========================================================================
   STATES
   ========================================================================== */

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch label="Default state" defaultChecked />
      <Switch label="Error state" state="error" errorMessage="Cannot enable this feature" />
      <Switch label="Success state" state="success" defaultChecked helperText="Successfully enabled" />
      <Switch label="Disabled unchecked" disabled />
      <Switch label="Disabled checked" disabled defaultChecked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Validation states: default, error, success, and disabled.',
      },
    },
  },
};

/* ==========================================================================
   LABEL POSITIONS
   ========================================================================== */

export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch label="Label on the right (default)" labelPosition="right" />
      <Switch label="Label on the left" labelPosition="left" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label can be positioned on the left or right of the switch.',
      },
    },
  },
};

/* ==========================================================================
   CSK EXAMPLE: USER SETTINGS
   ========================================================================== */

export const UserSettings: Story = {
  name: 'Example: User Settings',
  render: function UserSettingsDemo() {
    const [settings, setSettings] = useState({
      notifications: true,
      emailUpdates: false,
      darkMode: false,
      publicProfile: true,
    });

    const toggleSetting = (key: keyof typeof settings) => {
      setSettings({ ...settings, [key]: !settings[key] });
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '300px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
          Account Settings
        </h3>
        <Switch
          label="Notifications"
          helperText="Receive notifications about new races"
          checked={settings.notifications}
          onChange={() => toggleSetting('notifications')}
        />
        <Switch
          label="Email updates"
          helperText="Send weekly results summary"
          checked={settings.emailUpdates}
          onChange={() => toggleSetting('emailUpdates')}
        />
        <Switch
          label="Dark mode"
          helperText="Use dark color scheme"
          checked={settings.darkMode}
          onChange={() => toggleSetting('darkMode')}
        />
        <Switch
          label="Public profile"
          helperText="Show profile in public search"
          checked={settings.publicProfile}
          onChange={() => toggleSetting('publicProfile')}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'User settings panel example with interactive switches.',
      },
    },
  },
};
