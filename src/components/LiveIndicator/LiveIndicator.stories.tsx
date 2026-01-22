import type { Meta, StoryObj } from '@storybook/react';
import { LiveIndicator } from './LiveIndicator';

const meta: Meta<typeof LiveIndicator> = {
  title: 'Components/LiveIndicator',
  component: LiveIndicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'LiveIndicator component for displaying live status, recording state, or connection status. Commonly used in live results, real-time timing displays, and streaming indicators.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'live', 'recording', 'offline', 'connecting'],
      description: 'Predefined variant with associated color and behavior',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the indicator dot and label',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
      description: 'Color variant (overridden by variant for special states)',
    },
    styleVariant: {
      control: 'select',
      options: ['default', 'gradient', 'glass', 'badge'],
      description: 'Style variant for different visual treatments',
    },
    intensity: {
      control: 'select',
      options: ['subtle', 'normal', 'dramatic'],
      description: 'Animation intensity level',
    },
    pulse: {
      control: 'boolean',
      description: 'Enable pulse animation',
    },
    glow: {
      control: 'boolean',
      description: 'Show glow effect around the dot',
    },
    label: {
      control: 'text',
      description: 'Text label next to the indicator',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the label relative to the dot',
    },
    inline: {
      control: 'boolean',
      description: 'Display as inline element',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LiveIndicator>;

// =============================================================================
// BASIC EXAMPLES
// =============================================================================

export const Default: Story = {
  args: {
    label: 'Status',
  },
};

export const Live: Story = {
  args: {
    variant: 'live',
    label: 'LIVE',
  },
};

// =============================================================================
// VARIANTS & COLORS
// =============================================================================

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <LiveIndicator variant="default" label="Default" />
      <LiveIndicator variant="live" label="LIVE" />
      <LiveIndicator variant="recording" label="REC" />
      <LiveIndicator variant="connecting" label="Connecting..." />
      <LiveIndicator variant="offline" label="Offline" pulse={false} />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <LiveIndicator color="default" label="Default (gray)" />
      <LiveIndicator color="primary" label="Primary" />
      <LiveIndicator color="success" label="Success" />
      <LiveIndicator color="warning" label="Warning" />
      <LiveIndicator color="error" label="Error" />
      <LiveIndicator color="info" label="Info" />
    </div>
  ),
};

// =============================================================================
// SIZES
// =============================================================================

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      <LiveIndicator size="sm" variant="live" label="Small" />
      <LiveIndicator size="md" variant="live" label="Medium" />
      <LiveIndicator size="lg" variant="live" label="Large" />
      <LiveIndicator size="xl" variant="live" label="Extra Large" />
    </div>
  ),
};

// =============================================================================
// STYLE VARIANTS
// =============================================================================

export const StyleVariantsComparison: Story = {
  name: 'Style Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', textTransform: 'uppercase' }}>Default</div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <LiveIndicator variant="live" label="LIVE" styleVariant="default" />
          <LiveIndicator color="success" label="Online" styleVariant="default" />
          <LiveIndicator color="info" label="Info" styleVariant="default" />
        </div>
      </div>
      <div>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', textTransform: 'uppercase' }}>Gradient</div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <LiveIndicator variant="live" label="LIVE" styleVariant="gradient" glow />
          <LiveIndicator color="success" label="Online" styleVariant="gradient" glow />
          <LiveIndicator color="info" label="Info" styleVariant="gradient" glow />
        </div>
      </div>
      <div>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', textTransform: 'uppercase' }}>Badge</div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <LiveIndicator variant="live" label="LIVE" styleVariant="badge" />
          <LiveIndicator color="success" label="Online" styleVariant="badge" />
          <LiveIndicator color="info" label="Info" styleVariant="badge" />
        </div>
      </div>
      <div
        style={{
          padding: '16px',
          background: 'linear-gradient(135deg, #1176a6 0%, #0b4664 100%)',
          borderRadius: '8px',
        }}
      >
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', textTransform: 'uppercase' }}>
          Glass (on colored background)
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <LiveIndicator variant="live" label="LIVE" styleVariant="glass" />
          <LiveIndicator color="success" label="Online" styleVariant="glass" />
          <LiveIndicator color="info" label="Info" styleVariant="glass" />
        </div>
      </div>
    </div>
  ),
};

// =============================================================================
// INTENSITY LEVELS
// =============================================================================

export const IntensityComparison: Story = {
  name: 'Intensity Levels',
  render: () => (
    <div style={{ display: 'flex', gap: '48px', padding: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <LiveIndicator variant="live" label="LIVE" intensity="subtle" glow size="lg" />
        <div style={{ fontSize: '12px', color: '#666', marginTop: '12px' }}>Subtle</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LiveIndicator variant="live" label="LIVE" intensity="normal" glow size="lg" />
        <div style={{ fontSize: '12px', color: '#666', marginTop: '12px' }}>Normal</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LiveIndicator variant="live" label="LIVE" intensity="dramatic" glow size="lg" />
        <div style={{ fontSize: '12px', color: '#666', marginTop: '12px' }}>Dramatic</div>
      </div>
    </div>
  ),
};

// =============================================================================
// LABEL & POSITION
// =============================================================================

export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <LiveIndicator variant="live" label="Label on right (default)" labelPosition="right" />
      <LiveIndicator variant="live" label="Label on left" labelPosition="left" />
      <LiveIndicator variant="live" /> {/* Dot only */}
    </div>
  ),
};

export const InlineWithText: Story = {
  render: () => (
    <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
      The race is currently <LiveIndicator variant="live" label="LIVE" inline size="sm" /> and you can watch it on the
      main screen. Connection status: <LiveIndicator variant="connecting" label="Connecting" inline size="sm" />
    </p>
  ),
};

// =============================================================================
// CSK EXAMPLES
// =============================================================================

export const LiveResultsHeader: Story = {
  name: 'Example: Live Results Header',
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        backgroundColor: '#fafafa',
        borderRadius: '8px',
      }}
    >
      <LiveIndicator variant="live" label="LIVE" size="lg" glow styleVariant="gradient" intensity="dramatic" />
      <div>
        <div style={{ fontWeight: 600, fontSize: '18px' }}>Mistrovství ČR ve vodním slalomu 2026</div>
        <div style={{ fontSize: '14px', color: '#666' }}>Semifinále C1M</div>
      </div>
    </div>
  ),
};

export const TimingSystemStatus: Story = {
  name: 'Example: Timing System Status',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '16px',
        backgroundColor: '#fafafa',
        borderRadius: '8px',
        maxWidth: '300px',
      }}
    >
      <div style={{ fontWeight: 600, fontSize: '14px', color: '#666', textTransform: 'uppercase' }}>
        Timing System Status
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Start Gate</span>
        <LiveIndicator color="success" label="Online" size="sm" styleVariant="badge" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Finish Line</span>
        <LiveIndicator color="success" label="Online" size="sm" styleVariant="badge" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Gate Judge 1</span>
        <LiveIndicator variant="connecting" label="Syncing" size="sm" styleVariant="badge" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Gate Judge 2</span>
        <LiveIndicator variant="offline" label="Offline" size="sm" styleVariant="badge" />
      </div>
    </div>
  ),
};
