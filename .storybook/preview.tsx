import React, { useEffect } from 'react';
import type { Preview, Decorator } from '@storybook/react';

import '../src/styles/globals.css';
import '../src/tokens/index.css';

// Decorator to apply theme and embed mode to document
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme || 'light';
  const embed = context.globals.embed === 'on';

  useEffect(() => {
    // Apply theme to both document and iframe body
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Embed is the only display mode (v2): data-mode="embed" or no attribute
    for (const el of [document.documentElement, document.body]) {
      if (embed) el.setAttribute('data-mode', 'embed');
      else el.removeAttribute('data-mode');
    }
  }, [embed]);

  return <Story />;
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true, // We handle backgrounds via theme
    },
    options: {
      storySort: {
        order: ['Introduction', 'Tokens', 'CzechCanoe Aesthetic', 'Prototypes', 'Components', 'Context', '*'],
      },
    },
  },
  globalTypes: {
    theme: {
      // 2.0 draws only the light theme; 'dark' only sets data-theme="dark"
      // (no dark tokens yet, renders light) and is kept for the dark-mode test runs.
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark (not drawn in 2.0)' },
        ],
        dynamicTitle: true,
      },
    },
    embed: {
      description: 'Embed mode for kanoe.cz (data-mode="embed")',
      defaultValue: 'off',
      toolbar: {
        title: 'Embed',
        icon: 'component',
        items: [
          { value: 'off', title: 'Standalone' },
          { value: 'on', title: 'Embed (kanoe.cz)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
