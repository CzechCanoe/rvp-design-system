import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  // public/fonts is served at /fonts/ (preloaded in preview-head.html)
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    // fonts.css uses relative ./fonts/ URLs (left unresolved by Vite). In dev they resolve
    // against the iframe document (/fonts/); emit the built preview CSS (it holds the @font-face rules) at the site root so they
    // resolve to /fonts/ in the static build too, matching the preloads in preview-head.html.
    config.build = config.build ?? {};
    config.build.rollupOptions = config.build.rollupOptions ?? {};
    const output = (config.build.rollupOptions.output ?? {}) as Record<string, unknown>;
    config.build.rollupOptions.output = {
      ...output,
      assetFileNames: (asset: { name?: string }) =>
        asset.name === 'preview.css' ? '[name]-[hash][extname]' : 'assets/[name]-[hash][extname]',
    };
    return config;
  },
};

export default config;
