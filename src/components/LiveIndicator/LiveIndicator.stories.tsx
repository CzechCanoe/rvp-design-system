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
      options: ['sm', 'md', 'lg'],
      description: 'Size of the indicator dot and label',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
      description: 'Color variant (overridden by variant for special states)',
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
  parameters: {
    docs: {
      description: {
        story: 'Live variant with red pulsing dot and bold uppercase label. Used for live streaming or live results.',
      },
    },
  },
};

export const Recording: Story = {
  args: {
    variant: 'recording',
    label: 'REC',
  },
};

export const Offline: Story = {
  args: {
    variant: 'offline',
    label: 'Offline',
    pulse: false,
  },
};

export const Connecting: Story = {
  args: {
    variant: 'connecting',
    label: 'Connecting...',
  },
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
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'LiveIndicator comes in three sizes: sm (8px), md (10px), and lg (12px).',
      },
    },
  },
};

// =============================================================================
// COLORS
// =============================================================================

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
  parameters: {
    docs: {
      description: {
        story: 'Color variants for different status types. Note: variant prop overrides color for predefined states.',
      },
    },
  },
};

// =============================================================================
// VARIANTS
// =============================================================================

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <LiveIndicator variant="default" label="Default" />
      <LiveIndicator variant="live" label="LIVE" />
      <LiveIndicator variant="recording" label="REC" />
      <LiveIndicator variant="connecting" label="Connecting..." />
      <LiveIndicator variant="offline" label="Offline" />
    </div>
  ),
};

// =============================================================================
// PULSE & GLOW
// =============================================================================

export const WithoutPulse: Story = {
  args: {
    variant: 'live',
    label: 'LIVE',
    pulse: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Pulse animation can be disabled for static indicators.',
      },
    },
  },
};

export const WithGlow: Story = {
  args: {
    variant: 'live',
    label: 'LIVE',
    glow: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Glow effect adds a soft light around the indicator dot for emphasis.',
      },
    },
  },
};

export const GlowColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', padding: '16px', backgroundColor: '#1a1a1a', borderRadius: '8px' }}>
      <LiveIndicator color="error" label="Error" glow />
      <LiveIndicator color="success" label="Success" glow />
      <LiveIndicator color="warning" label="Warning" glow />
      <LiveIndicator color="info" label="Info" glow />
      <LiveIndicator color="primary" label="Primary" glow />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Glow effect works best on dark backgrounds.',
      },
    },
  },
};

// =============================================================================
// LABEL POSITIONS
// =============================================================================

export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <LiveIndicator variant="live" label="Label on right (default)" labelPosition="right" />
      <LiveIndicator variant="live" label="Label on left" labelPosition="left" />
    </div>
  ),
};

export const DotOnly: Story = {
  args: {
    variant: 'live',
  },
  parameters: {
    docs: {
      description: {
        story: 'Indicator can be used without a label for compact displays.',
      },
    },
  },
};

// =============================================================================
// INLINE USAGE
// =============================================================================

export const InlineWithText: Story = {
  render: () => (
    <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
      The race is currently <LiveIndicator variant="live" label="LIVE" inline size="sm" /> and you can watch it on the
      main screen. Connection status: <LiveIndicator variant="connecting" label="Connecting" inline size="sm" />
    </p>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use inline prop to embed the indicator within text content.',
      },
    },
  },
};

// =============================================================================
// CSK SPECIFIC EXAMPLES
// =============================================================================

export const LiveResults: Story = {
  name: 'CSK: Live Results Header',
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
      <LiveIndicator variant="live" label="LIVE" size="lg" glow />
      <div>
        <div style={{ fontWeight: 600, fontSize: '18px' }}>Mistrovství ČR ve vodním slalomu 2026</div>
        <div style={{ fontSize: '14px', color: '#666' }}>Semifinále C1M • Aktualizováno před 5 sekundami</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Live indicator used in a results page header to show real-time status.',
      },
    },
  },
};

export const TimingStatus: Story = {
  name: 'CSK: Timing System Status',
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
        <LiveIndicator color="success" label="Online" size="sm" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Finish Line</span>
        <LiveIndicator color="success" label="Online" size="sm" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Gate Judge 1</span>
        <LiveIndicator variant="connecting" label="Syncing" size="sm" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Gate Judge 2</span>
        <LiveIndicator variant="offline" label="Offline" size="sm" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple indicators showing the status of different timing system components.',
      },
    },
  },
};

export const StreamStatus: Story = {
  name: 'CSK: Video Stream Status',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', padding: '16px', backgroundColor: '#0a0a0a', borderRadius: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <LiveIndicator variant="recording" size="sm" glow />
        <span style={{ color: '#fff', fontSize: '12px' }}>01:23:45</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <LiveIndicator variant="live" label="LIVE" size="sm" glow />
        <span style={{ color: '#999', fontSize: '12px' }}>1,234 viewers</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Recording and live streaming indicators for video broadcast overlay.',
      },
    },
  },
};

export const ResultsRow: Story = {
  name: 'CSK: Results Table Row',
  render: () => (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f5f5f5' }}>
          <th style={{ padding: '12px', textAlign: 'left' }}>Pos</th>
          <th style={{ padding: '12px', textAlign: 'left' }}>Athlete</th>
          <th style={{ padding: '12px', textAlign: 'right' }}>Time</th>
          <th style={{ padding: '12px', textAlign: 'center' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ backgroundColor: '#fff4f4' }}>
          <td style={{ padding: '12px' }}>—</td>
          <td style={{ padding: '12px', fontWeight: 500 }}>Jan Novák</td>
          <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'monospace' }}>01:32.45</td>
          <td style={{ padding: '12px', textAlign: 'center' }}>
            <LiveIndicator variant="live" size="sm" />
          </td>
        </tr>
        <tr>
          <td style={{ padding: '12px' }}>1</td>
          <td style={{ padding: '12px', fontWeight: 500 }}>Petr Svoboda</td>
          <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'monospace' }}>01:28.12</td>
          <td style={{ padding: '12px', textAlign: 'center' }}>
            <LiveIndicator color="success" size="sm" pulse={false} />
          </td>
        </tr>
        <tr>
          <td style={{ padding: '12px' }}>2</td>
          <td style={{ padding: '12px', fontWeight: 500 }}>Martin Horák</td>
          <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'monospace' }}>01:29.87</td>
          <td style={{ padding: '12px', textAlign: 'center' }}>
            <LiveIndicator color="success" size="sm" pulse={false} />
          </td>
        </tr>
      </tbody>
    </table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Live indicator in a results table showing which athlete is currently on the course.',
      },
    },
  },
};

export const ConnectionBanner: Story = {
  name: 'CSK: Connection Status Banner',
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '8px 16px',
        backgroundColor: '#fef3c7',
        borderRadius: '4px',
        fontSize: '14px',
      }}
    >
      <LiveIndicator variant="connecting" size="sm" />
      <span>Obnovuje se spojení s časomírou...</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Connection status banner showing reconnection in progress.',
      },
    },
  },
};
