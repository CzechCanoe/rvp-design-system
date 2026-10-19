import React, { useEffect } from 'react';
import type { Preview, Decorator } from '@storybook/react';

import '../src/styles/globals.css';
import '../src/tokens/index.css';

// Decorator to apply the (light-only) theme and embed mode to document
const withTheme: Decorator = (Story, context) => {
  const embed = context.globals.embed === 'on';

  useEffect(() => {
    // v2 draws only the light theme
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.setAttribute('data-theme', 'light');
  }, []);

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
        order: ['Introduction', 'Tokens', 'Components', 'Context', '*'],
      },
    },
  },
  globalTypes: {
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
