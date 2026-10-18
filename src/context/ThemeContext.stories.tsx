import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';

/**
 * ThemeProvider sets `data-theme` (light only in 2.0) and, with `embed`,
 * `data-mode="embed"` – the neutral wrapper for kanoe.cz.
 */
const meta: Meta<typeof ThemeProvider> = {
  title: 'Context/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
ThemeProvider mirrors the colour theme and the embed flag to data attributes the tokens react to.

- \`theme: 'light' | 'system'\` → \`data-theme\`. 2.0 draws only the light theme, so \`'system'\` resolves to \`'light'\`.
- \`embed\` → \`data-mode="embed"\`: smaller radii, no shadows (optional system font via \`data-font="system"\`).

## Usage

\`\`\`tsx
import { ThemeProvider, useTheme } from '@czechcanoe/rvp-design-system';

// Standalone app
<ThemeProvider>
  <App />
</ThemeProvider>

// Widget embedded in kanoe.cz
<ThemeProvider embed targetSelector="#csk-widget">
  <div id="csk-widget"><Widget /></div>
</ThemeProvider>

// In components
const { theme, resolvedTheme, setTheme, embed } = useTheme();
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultTheme: {
      control: 'select',
      options: ['light', 'system'],
      description: 'Initial colour theme',
    },
    embed: {
      control: 'boolean',
      description: 'Embed mode for kanoe.cz (data-mode="embed")',
    },
    disablePersistence: {
      control: 'boolean',
      description: 'Disable localStorage persistence',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

const panel: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--csk-space-3)',
  padding: 'var(--csk-space-4)',
  background: 'var(--csk-color-surface)',
  border: '1px solid var(--csk-color-border)',
  borderRadius: 'var(--csk-radius-lg)',
  fontFamily: 'var(--csk-font-sans)',
  fontSize: 'var(--csk-text-md)',
  color: 'var(--csk-color-text)',
};

const toggle = (active: boolean): React.CSSProperties => ({
  height: 32,
  padding: '0 var(--csk-space-3)',
  borderRadius: 'var(--csk-radius-pill)',
  border: '1px solid',
  borderColor: active ? 'var(--csk-color-brand)' : 'var(--csk-color-border)',
  background: active ? 'var(--csk-color-brand)' : 'var(--csk-color-surface)',
  color: active ? 'var(--csk-color-text-on-fill)' : 'var(--csk-color-text-2)',
  font: 'inherit',
  fontSize: 'var(--csk-text-sm)',
  fontWeight: 'var(--csk-font-weight-medium)',
  cursor: 'pointer',
});

/** Token-driven sample: radius and shadow change in embed mode */
function Sample({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--csk-space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          height: 40,
          padding: '0 var(--csk-space-4)',
          borderRadius: 'var(--csk-radius-md)',
          background: 'var(--csk-color-action)',
          color: 'var(--csk-color-text-on-fill)',
          fontWeight: 'var(--csk-font-weight-semibold)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          padding: 'var(--csk-space-3) var(--csk-space-4)',
          borderRadius: 'var(--csk-radius-lg)',
          background: 'var(--csk-color-surface)',
          border: '1px solid var(--csk-color-border)',
          boxShadow: 'var(--csk-shadow-sm)',
        }}
      >
        radius-lg + shadow-sm
      </span>
    </div>
  );
}

function ThemeState() {
  const { theme, resolvedTheme, setTheme, embed } = useTheme();
  return (
    <div style={panel}>
      <div style={{ display: 'flex', gap: 'var(--csk-space-2)', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ color: 'var(--csk-color-text-3)', fontSize: 'var(--csk-text-sm)' }}>Theme</span>
        <button type="button" style={toggle(theme === 'light')} onClick={() => setTheme('light')}>
          light
        </button>
        <button type="button" style={toggle(theme === 'system')} onClick={() => setTheme('system')}>
          system
        </button>
      </div>
      <div style={{ fontFamily: 'var(--csk-font-mono)', fontSize: 'var(--csk-text-sm)', color: 'var(--csk-color-text-2)' }}>
        theme: {theme} · resolvedTheme: {resolvedTheme} · embed: {String(embed)}
      </div>
      <Sample label="Přihlásit oddíl" />
    </div>
  );
}

export const Interactive: Story = {
  render: () => (
    <ThemeProvider disablePersistence targetSelector="#theme-demo-interactive">
      <div id="theme-demo-interactive">
        <ThemeState />
      </div>
    </ThemeProvider>
  ),
};

export const Embed: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--csk-space-6)' }}>
      <ThemeProvider disablePersistence targetSelector="#theme-demo-standalone">
        <div id="theme-demo-standalone">
          <ThemeState />
        </div>
      </ThemeProvider>
      <ThemeProvider embed disablePersistence targetSelector="#theme-demo-embed">
        <div id="theme-demo-embed">
          <ThemeState />
        </div>
      </ThemeProvider>
    </div>
  ),
};
