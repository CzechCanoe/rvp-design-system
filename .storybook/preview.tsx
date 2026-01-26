import React, { useEffect } from 'react';
import type { Preview, Decorator } from '@storybook/react';

import '../src/styles/globals.css';
import '../src/tokens/index.css';

// Decorator to apply theme and mode to document
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme || 'light';
  const mode = context.globals.mode || 'utility';

  useEffect(() => {
    // Apply theme to both document and iframe body
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Apply mode to both document and iframe body
    document.documentElement.setAttribute('data-mode', mode);
    document.body.setAttribute('data-mode', mode);
  }, [mode]);

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
        order: ['Introduction', 'CzechCanoe Aesthetic', 'Prototypes', 'Components', 'Context', '*'],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
    mode: {
      description: 'Display mode for components',
      defaultValue: 'utility',
      toolbar: {
        title: 'Mode',
        icon: 'component',
        items: [
          { value: 'utility', title: 'Utility (compact)' },
          { value: 'expressive', title: 'Expressive (generous)' },
          { value: 'embed', title: 'Embed (kanoe.cz)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
