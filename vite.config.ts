import { defineConfig, createLogger } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// fonts.css uses relative ./fonts/ URLs on purpose (public/fonts is copied to dist/fonts);
// silence only those expected "didn't resolve at build time" warnings.
const logger = createLogger();
const warn = logger.warn.bind(logger);
const skip = (msg: string) => msg.includes("didn't resolve at build time") && msg.includes("./fonts/");
logger.warnOnce = (msg, opts) => {
  if (!skip(msg)) logger.warn(msg, opts);
};
logger.warn = (msg, opts) => {
  if (msg.includes("didn't resolve at build time") && msg.includes('./fonts/')) return;
  warn(msg, opts);
};

export default defineConfig({
  customLogger: logger,
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/test/**'],
      outDir: 'dist',
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'RvpDesignSystem',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
