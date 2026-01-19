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
   BASIC EXAMPLES
   ========================================================================== */

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const Checked: Story = {
  args: {
    label: 'Dark mode',
    defaultChecked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Auto-save',
    helperText: 'Automatically save changes as you work',
    defaultChecked: true,
  },
};

/* ==========================================================================
   SIZES
   ========================================================================== */

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small switch',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Medium switch (default)',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large switch',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch size="sm" label="Small switch" />
      <Switch size="md" label="Medium switch (default)" />
      <Switch size="lg" label="Large switch" />
    </div>
  ),
};

/* ==========================================================================
   LABEL POSITIONS
   ========================================================================== */

export const LabelRight: Story = {
  args: {
    label: 'Label on the right',
    labelPosition: 'right',
  },
};

export const LabelLeft: Story = {
  args: {
    label: 'Label on the left',
    labelPosition: 'left',
  },
};

export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch label="Label on the right (default)" labelPosition="right" />
      <Switch label="Label on the left" labelPosition="left" />
    </div>
  ),
};

/* ==========================================================================
   STATES
   ========================================================================== */

export const Disabled: Story = {
  args: {
    label: 'Disabled switch',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked switch',
    disabled: true,
    defaultChecked: true,
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Enable feature',
    state: 'error',
    errorMessage: 'This feature is currently unavailable',
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Feature enabled',
    state: 'success',
    defaultChecked: true,
    helperText: 'Feature is active and working',
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch label="Default state" defaultChecked />
      <Switch label="Error state" state="error" errorMessage="Cannot enable this feature" />
      <Switch label="Success state" state="success" defaultChecked helperText="Successfully enabled" />
      <Switch label="Disabled unchecked" disabled />
      <Switch label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

/* ==========================================================================
   WITHOUT LABEL
   ========================================================================== */

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Toggle setting',
  },
};

/* ==========================================================================
   INTERACTIVE EXAMPLE
   ========================================================================== */

export const Interactive: Story = {
  render: function InteractiveDemo() {
    const [checked, setChecked] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <Switch
          label={checked ? 'ON' : 'OFF'}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Switch is currently: <strong>{checked ? 'ON' : 'OFF'}</strong>
        </span>
      </div>
    );
  },
};

/* ==========================================================================
   CSK-SPECIFIC EXAMPLES
   ========================================================================== */

/**
 * Settings panel example for user preferences.
 */
export const UserSettings: Story = {
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
          Nastavení účtu
        </h3>
        <Switch
          label="Notifikace"
          helperText="Dostávat upozornění o nových závodech"
          checked={settings.notifications}
          onChange={() => toggleSetting('notifications')}
        />
        <Switch
          label="E-mailové aktualizace"
          helperText="Zasílat týdenní přehled výsledků"
          checked={settings.emailUpdates}
          onChange={() => toggleSetting('emailUpdates')}
        />
        <Switch
          label="Tmavý režim"
          helperText="Použít tmavé barevné schéma"
          checked={settings.darkMode}
          onChange={() => toggleSetting('darkMode')}
        />
        <Switch
          label="Veřejný profil"
          helperText="Zobrazit profil ve veřejném vyhledávání"
          checked={settings.publicProfile}
          onChange={() => toggleSetting('publicProfile')}
        />
      </div>
    );
  },
};

/**
 * Live results toggle example.
 */
export const LiveResultsToggle: Story = {
  render: function LiveResultsDemo() {
    const [liveEnabled, setLiveEnabled] = useState(true);

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '16px',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: '8px',
        }}
      >
        <span
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: liveEnabled ? 'var(--color-success-500)' : 'var(--color-neutral-400)',
            animation: liveEnabled ? 'pulse 2s infinite' : 'none',
          }}
        />
        <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>
          {liveEnabled ? 'LIVE' : 'Offline'}
        </span>
        <Switch
          label="Auto-refresh"
          checked={liveEnabled}
          onChange={(e) => setLiveEnabled(e.target.checked)}
          size="sm"
        />
      </div>
    );
  },
};

/**
 * Event registration toggles.
 */
export const EventRegistration: Story = {
  render: function EventRegistrationDemo() {
    const [options, setOptions] = useState({
      needsAccommodation: false,
      needsFood: true,
      wantsStartingList: true,
    });

    const toggleOption = (key: keyof typeof options) => {
      setOptions({ ...options, [key]: !options[key] });
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
          Přihlášení na závod - Další možnosti
        </h3>
        <Switch
          label="Požaduji ubytování"
          helperText="Ubytování v ceně 350 Kč/noc"
          checked={options.needsAccommodation}
          onChange={() => toggleOption('needsAccommodation')}
        />
        <Switch
          label="Stravování"
          helperText="Oběd a večeře v ceně 200 Kč/den"
          checked={options.needsFood}
          onChange={() => toggleOption('needsFood')}
        />
        <Switch
          label="Zasílat startovní listinu"
          helperText="E-mailem den před závodem"
          checked={options.wantsStartingList}
          onChange={() => toggleOption('wantsStartingList')}
        />
      </div>
    );
  },
};

/**
 * Admin feature flags example.
 */
export const AdminFeatureFlags: Story = {
  render: function AdminFeatureFlagsDemo() {
    const [features, setFeatures] = useState({
      betaFeatures: false,
      debugMode: false,
      maintenanceMode: false,
    });

    const toggleFeature = (key: keyof typeof features) => {
      setFeatures({ ...features, [key]: !features[key] });
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
          Feature Flags (Admin)
        </h3>
        <Switch
          label="Beta funkce"
          helperText="Povolit experimentální funkce"
          checked={features.betaFeatures}
          onChange={() => toggleFeature('betaFeatures')}
        />
        <Switch
          label="Debug mód"
          helperText="Zobrazit vývojářské informace"
          checked={features.debugMode}
          onChange={() => toggleFeature('debugMode')}
        />
        <Switch
          label="Režim údržby"
          helperText="Omezit přístup pro veřejnost"
          checked={features.maintenanceMode}
          onChange={() => toggleFeature('maintenanceMode')}
          state={features.maintenanceMode ? 'error' : 'default'}
        />
      </div>
    );
  },
};
