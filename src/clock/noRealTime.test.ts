import { describe, expect, it } from 'vitest';

/**
 * Static guard: time-aware components and the clock plumbing read time only
 * through the injected Clock. `browserClock.ts` is the one allowed place.
 */
const sources = {
  ...import.meta.glob('../components/{TimeValue,RunningTime,DataAge}/*.{ts,tsx}', {
    query: '?raw',
    import: 'default',
    eager: true,
  }),
  ...import.meta.glob('./*.{ts,tsx}', { query: '?raw', import: 'default', eager: true }),
} as Record<string, string>;

const REAL_TIME =
  /\bDate\.now\b|\bperformance\.now\b|(?<![\w.])(?:setTimeout|setInterval|requestAnimationFrame|cancelAnimationFrame|clearTimeout|clearInterval)\s*\(|globalThis\.|window\./;

const stripComments = (code: string) => code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');

describe('no real time outside createBrowserClock', () => {
  // browserClock.ts is the allowed place; Clock.ts only declares the interface (method signatures).
  const files = Object.entries(sources).filter(
    ([path]) =>
      !path.includes('.test.') &&
      !path.includes('.stories.') &&
      !path.endsWith('/browserClock.ts') &&
      !path.endsWith('/Clock.ts')
  );

  it('finds the sources it guards', () => {
    expect(files.map(([p]) => p.split('/').pop())).toEqual(
      expect.arrayContaining(['RunningTime.tsx', 'DataAge.tsx', 'TimeValue.tsx', 'testClock.ts', 'useClock.ts'])
    );
  });

  it.each(files)('%s reads no real time source', (_path, code) => {
    expect(stripComments(code)).not.toMatch(REAL_TIME);
  });
});
