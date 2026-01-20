import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ThemeProvider, useTheme, type DisplayMode, type ColorTheme } from './ThemeContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { StatCard } from '../components/StatCard';

/**
 * ThemeProvider enables dual-mode (utility/expressive) and theme (light/dark) switching.
 *
 * The design system supports two display modes:
 * - **Utility mode**: Compact, efficient styling for admin/backoffice interfaces
 * - **Expressive mode**: Generous, dramatic styling for public-facing pages
 *
 * Combined with light/dark themes, this creates 4 possible combinations.
 */
const meta: Meta<typeof ThemeProvider> = {
  title: 'Context/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
ThemeProvider manages both display mode (utility vs expressive) and color theme (light vs dark).

## Usage

\`\`\`tsx
import { ThemeProvider, useTheme } from '@czechcanoe/rvp-design-system';

// Wrap your app
function App() {
  return (
    <ThemeProvider defaultMode="utility" defaultTheme="light">
      <YourApp />
    </ThemeProvider>
  );
}

// Use in components
function MyComponent() {
  const { mode, theme, setMode, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current mode: {mode}</p>
      <p>Current theme: {theme}</p>
      <button onClick={() => setMode('expressive')}>
        Switch to Expressive
      </button>
    </div>
  );
}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultMode: {
      control: 'select',
      options: ['utility', 'expressive'],
      description: 'Initial display mode',
    },
    defaultTheme: {
      control: 'select',
      options: ['light', 'dark', 'system'],
      description: 'Initial color theme',
    },
    disablePersistence: {
      control: 'boolean',
      description: 'Disable localStorage persistence',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

// Demo component showing theme controls
function ThemeDemo() {
  const { mode, theme, resolvedTheme, setMode, setTheme } = useTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      {/* Controls */}
      <Card>
        <div style={{ padding: 'var(--spacing-4)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-4)', fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>
            Theme Controls
          </h3>
          <div style={{ display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-1)' }}>
                Display Mode
              </div>
              <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                <Button
                  variant={mode === 'utility' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setMode('utility')}
                >
                  Utility
                </Button>
                <Button
                  variant={mode === 'expressive' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setMode('expressive')}
                >
                  Expressive
                </Button>
              </div>
            </div>

            <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: 'var(--spacing-4)' }}>
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-1)' }}>
                Color Theme
              </div>
              <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                <Button
                  variant={theme === 'light' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setTheme('light')}
                >
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                >
                  Dark
                </Button>
                <Button
                  variant={theme === 'system' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setTheme('system')}
                >
                  System
                </Button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'var(--spacing-4)', display: 'flex', gap: 'var(--spacing-4)' }}>
            <Badge variant="info">Mode: {mode}</Badge>
            <Badge variant="info">Theme: {theme}</Badge>
            <Badge variant="success">Resolved: {resolvedTheme}</Badge>
          </div>
        </div>
      </Card>

      {/* Demo Content */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-card-mode-gap)' }}>
        <StatCard
          label="Registered Athletes"
          value={1234}
          description="+12% from last month"
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          label="Active Events"
          value={42}
          description="This season"
          trend="up"
          trendValue="+8%"
          color="success"
        />
        <StatCard
          label="Total Clubs"
          value={89}
          description="Across all regions"
          color="warning"
        />
      </div>

      {/* Typography comparison */}
      <Card>
        <div style={{ padding: 'var(--spacing-card-mode-padding)' }}>
          <h1 style={{
            fontSize: 'var(--text-h1-size)',
            fontWeight: 'var(--text-h1-weight)',
            lineHeight: 'var(--text-h1-line-height)',
            marginBottom: 'var(--spacing-mode-md)'
          }}>
            Heading 1 - {mode} mode
          </h1>
          <h2 style={{
            fontSize: 'var(--text-h2-size)',
            fontWeight: 'var(--text-h2-weight)',
            lineHeight: 'var(--text-h2-line-height)',
            marginBottom: 'var(--spacing-mode-sm)'
          }}>
            Heading 2 - Subheadline
          </h2>
          <p style={{
            fontSize: 'var(--text-body-size)',
            fontWeight: 'var(--text-body-weight)',
            lineHeight: 'var(--text-body-line-height)',
            color: 'var(--color-text-secondary)'
          }}>
            Body text demonstrates the difference between utility (compact, 14px) and
            expressive (generous, 16px) modes. Notice how spacing and typography scale
            adjust automatically.
          </p>
        </div>
      </Card>

      {/* Button comparison */}
      <Card>
        <div style={{ padding: 'var(--spacing-card-mode-padding)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-mode-md)', fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>
            Buttons in {mode} mode
          </h3>
          <div style={{ display: 'flex', gap: 'var(--spacing-mode-sm)', flexWrap: 'wrap' }}>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="gradient">Gradient</Button>
            <Button variant="secondary">Secondary</Button>
          </div>
        </div>
      </Card>

      {/* Avatar sizes */}
      <Card>
        <div style={{ padding: 'var(--spacing-card-mode-padding)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-mode-md)', fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>
            Avatars scale with mode
          </h3>
          <div style={{ display: 'flex', gap: 'var(--spacing-mode-md)', alignItems: 'center' }}>
            <Avatar name="Jan Novák" size="sm" />
            <Avatar name="Marie Svobodová" size="md" />
            <Avatar name="Petr Horák" size="lg" />
            <Avatar name="Eva Králová" size="xl" />
          </div>
        </div>
      </Card>
    </div>
  );
}

// Wrapper that applies mode to a specific container
function ModeContainer({ mode, theme, children }: { mode: DisplayMode; theme: ColorTheme; children: React.ReactNode }) {
  return (
    <ThemeProvider defaultMode={mode} defaultTheme={theme} disablePersistence>
      <div data-mode={mode} data-theme={theme} style={{
        padding: 'var(--spacing-6)',
        background: 'var(--color-bg-primary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)'
      }}>
        {children}
      </div>
    </ThemeProvider>
  );
}

// Interactive demo
export const Interactive: Story = {
  render: () => (
    <ThemeProvider defaultMode="utility" defaultTheme="light" disablePersistence>
      <ThemeDemo />
    </ThemeProvider>
  ),
};

// Utility mode demo
export const UtilityMode: Story = {
  render: () => (
    <ModeContainer mode="utility" theme="light">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <h2 style={{ fontSize: 'var(--text-h2-size)', fontWeight: 'var(--text-h2-weight)' }}>
          Utility Mode
        </h2>
        <p style={{ fontSize: 'var(--text-body-size)', color: 'var(--color-text-secondary)' }}>
          Compact, efficient styling optimized for admin interfaces and data-heavy UIs.
          Smaller text, tighter spacing, subtle animations.
        </p>
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          <Button size="sm">Action</Button>
          <Button size="sm" variant="secondary">Cancel</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-3)' }}>
          <Card padding="sm">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>42</div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>Events</div>
            </div>
          </Card>
          <Card padding="sm">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>1.2k</div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>Athletes</div>
            </div>
          </Card>
          <Card padding="sm">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>89</div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>Clubs</div>
            </div>
          </Card>
        </div>
      </div>
    </ModeContainer>
  ),
};

// Expressive mode demo
export const ExpressiveMode: Story = {
  render: () => (
    <ModeContainer mode="expressive" theme="light">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
        <h1 style={{
          fontSize: 'var(--text-expr-h1-size)',
          fontWeight: 'var(--text-expr-h1-weight)',
          lineHeight: 'var(--text-expr-h1-line-height)',
          letterSpacing: 'var(--text-expr-h1-tracking)'
        }}>
          Expressive Mode
        </h1>
        <p style={{
          fontSize: 'var(--text-expr-lead-size)',
          lineHeight: 'var(--text-expr-lead-line-height)',
          color: 'var(--color-text-secondary)'
        }}>
          Generous, dramatic styling for public-facing pages. Larger typography,
          more whitespace, engaging animations. Perfect for athlete profiles,
          results pages, and marketing content.
        </p>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Button size="lg" variant="gradient">Get Started</Button>
          <Button size="lg" variant="secondary">Learn More</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-6)' }}>
          <Card variant="elevated" padding="lg">
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'var(--text-expr-stat-size)',
                fontWeight: 'var(--text-expr-stat-weight)',
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                42
              </div>
              <div style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)' }}>
                Events This Season
              </div>
            </div>
          </Card>
          <Card variant="elevated" padding="lg">
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'var(--text-expr-stat-size)',
                fontWeight: 'var(--text-expr-stat-weight)',
                background: 'var(--gradient-success)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                1.2k
              </div>
              <div style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)' }}>
                Registered Athletes
              </div>
            </div>
          </Card>
          <Card variant="elevated" padding="lg">
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'var(--text-expr-stat-size)',
                fontWeight: 'var(--text-expr-stat-weight)',
                background: 'var(--gradient-warning)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                89
              </div>
              <div style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)' }}>
                Partner Clubs
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ModeContainer>
  ),
};

// Side by side comparison
export const SideBySideComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          UTILITY MODE
        </h3>
        <ModeContainer mode="utility" theme="light">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
            <h2 style={{ fontSize: 'var(--text-h2-size)', fontWeight: 'var(--text-h2-weight)' }}>
              Dashboard
            </h2>
            <p style={{ fontSize: 'var(--text-body-size)', color: 'var(--color-text-secondary)' }}>
              Compact interface for data management and administration tasks.
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
              <Button size="sm">Save</Button>
              <Button size="sm" variant="secondary">Cancel</Button>
            </div>
            <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
              <Badge>Draft</Badge>
              <Badge variant="success">Published</Badge>
              <Badge section="dv">DV</Badge>
            </div>
          </div>
        </ModeContainer>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          EXPRESSIVE MODE
        </h3>
        <ModeContainer mode="expressive" theme="light">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
            <h2 style={{
              fontSize: 'var(--text-expr-h2-size)',
              fontWeight: 'var(--text-expr-h2-weight)',
              lineHeight: 'var(--text-expr-h2-line-height)'
            }}>
              Athlete Profile
            </h2>
            <p style={{
              fontSize: 'var(--text-expr-lead-size)',
              lineHeight: 'var(--text-expr-lead-line-height)',
              color: 'var(--color-text-secondary)'
            }}>
              Dramatic presentation for public-facing pages.
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
              <Button size="lg" variant="gradient">Follow</Button>
              <Button size="lg" variant="secondary">Message</Button>
            </div>
            <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
              <Badge size="lg" variant="gradient" pill glow>Champion</Badge>
              <Badge size="lg" variant="gradient-success" pill glow>Active</Badge>
              <Badge size="lg" section="dv" pill glow>DV</Badge>
            </div>
          </div>
        </ModeContainer>
      </div>
    </div>
  ),
};

// Dark mode variants
export const DarkModeVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          UTILITY + DARK
        </h3>
        <ModeContainer mode="utility" theme="dark">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
            <h2 style={{ fontSize: 'var(--text-h2-size)', fontWeight: 'var(--text-h2-weight)' }}>
              Admin Panel
            </h2>
            <p style={{ fontSize: 'var(--text-body-size)', color: 'var(--color-text-secondary)' }}>
              Dark theme for reduced eye strain during long sessions.
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
              <Button size="sm">Save</Button>
              <Button size="sm" variant="secondary">Cancel</Button>
            </div>
          </div>
        </ModeContainer>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: '#666' }}>
          EXPRESSIVE + DARK
        </h3>
        <ModeContainer mode="expressive" theme="dark">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
            <h2 style={{
              fontSize: 'var(--text-expr-h2-size)',
              fontWeight: 'var(--text-expr-h2-weight)'
            }}>
              Live Results
            </h2>
            <p style={{
              fontSize: 'var(--text-expr-lead-size)',
              color: 'var(--color-text-secondary)'
            }}>
              Immersive dark experience for live event viewing.
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
              <Button size="lg" variant="gradient">Watch Live</Button>
              <Button size="lg" variant="secondary">Results</Button>
            </div>
          </div>
        </ModeContainer>
      </div>
    </div>
  ),
};

// Token values reference
export const TokenReference: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <Card>
        <div style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', fontWeight: 600 }}>Utility Mode Tokens</h3>
          <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ textAlign: 'left', padding: '8px 0' }}>Token</th>
                <th style={{ textAlign: 'left', padding: '8px 0' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '4px 0' }}>--spacing-util-xs</td><td>4px</td></tr>
              <tr><td style={{ padding: '4px 0' }}>--spacing-util-sm</td><td>8px</td></tr>
              <tr><td style={{ padding: '4px 0' }}>--spacing-util-md</td><td>12px</td></tr>
              <tr><td style={{ padding: '4px 0' }}>--spacing-util-lg</td><td>16px</td></tr>
              <tr><td style={{ padding: '4px 0' }}>--spacing-util-xl</td><td>24px</td></tr>
              <tr style={{ borderTop: '1px solid var(--color-border)' }}>
                <td style={{ padding: '4px 0' }}>--motion-util-fast</td><td>100ms</td>
              </tr>
              <tr><td style={{ padding: '4px 0' }}>--motion-util-base</td><td>150ms</td></tr>
              <tr><td style={{ padding: '4px 0' }}>--motion-util-slow</td><td>200ms</td></tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <div style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', fontWeight: 600 }}>Expressive Mode Tokens</h3>
          <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ textAlign: 'left', padding: '8px 0' }}>Token</th>
                <th style={{ textAlign: 'left', padding: '8px 0' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '4px 0' }}>--spacing-expr-xs</td><td>8px</td></tr>
              <tr><td style={{ padding: '4px 0' }}>--spacing-expr-sm</td><td>16px</td></tr>
              <tr><td style={{ padding: '4px 0' }}>--spacing-expr-md</td><td>24px</td></tr>
              <tr><td style={{ padding: '4px 0' }}>--spacing-expr-lg</td><td>32px</td></tr>
              <tr><td style={{ padding: '4px 0' }}>--spacing-expr-xl</td><td>48px</td></tr>
              <tr style={{ borderTop: '1px solid var(--color-border)' }}>
                <td style={{ padding: '4px 0' }}>--motion-expr-fast</td><td>150ms</td>
              </tr>
              <tr><td style={{ padding: '4px 0' }}>--motion-expr-base</td><td>250ms</td></tr>
              <tr><td style={{ padding: '4px 0' }}>--motion-expr-slow</td><td>400ms</td></tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  ),
};
