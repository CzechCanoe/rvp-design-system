/**
 * ThemeContext - CSK RVP Design System
 *
 * Provides the colour theme and the embed flag and mirrors them to data
 * attributes, which the tokens (src/tokens/) react to:
 * - `data-theme="light"` – the only theme drawn in 2.0. `theme: 'system'` is
 *   accepted and currently resolves to light (dark arrives in 2.x by
 *   overriding the semantic tokens, without an API change).
 * - `data-mode="embed"` – set while `embed` is true: neutral wrapper for
 *   components embedded in kanoe.cz (smaller radii, no shadows).
 *
 * Usage:
 * ```tsx
 * <ThemeProvider embed>
 *   <App />
 * </ThemeProvider>
 *
 * // In components:
 * const { theme, resolvedTheme, setTheme, embed } = useTheme();
 * ```
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';

/**
 * Colour theme preference. 'system' follows the OS once a dark theme exists;
 * in 2.0 it resolves to 'light'.
 */
export type ColorTheme = 'light' | 'system';

/**
 * Theme actually applied as `data-theme` (never 'system').
 */
export type ResolvedTheme = 'light';

/**
 * Theme context value
 */
export interface ThemeContextValue {
  /** Current theme preference */
  theme: ColorTheme;
  /** Theme applied to the document (always 'light' in 2.0) */
  resolvedTheme: ResolvedTheme;
  /** Set theme preference */
  setTheme: (theme: ColorTheme) => void;
  /** Whether embed mode (`data-mode="embed"`) is active */
  embed: boolean;
}

/**
 * Theme provider props
 */
export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial colour theme (default: 'light') */
  defaultTheme?: ColorTheme;
  /** Embed mode for kanoe.cz: sets `data-mode="embed"` on the target (default: false) */
  embed?: boolean;
  /** Storage key for persisting the theme preference */
  themeStorageKey?: string;
  /** Disable persistence */
  disablePersistence?: boolean;
  /** Target element for applying data attributes (default: document.documentElement) */
  targetSelector?: string;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Normalize a theme value from props or storage. 1.x stored 'dark', which
 * maps to 'light' until a dark theme is drawn.
 */
function normalizeTheme(value: unknown, fallback: ColorTheme): ColorTheme {
  if (value === 'light' || value === 'system') return value;
  if (value === 'dark') return 'light';
  return fallback;
}

/**
 * Get stored value from localStorage
 */
function getStoredValue(key: string): unknown {
  if (typeof window === 'undefined') return undefined;
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as unknown) : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Store value in localStorage
 */
function setStoredValue(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors
  }
}

function getTarget(targetSelector?: string): Element | null {
  if (typeof document === 'undefined') return null;
  return targetSelector ? document.querySelector(targetSelector) : document.documentElement;
}

/**
 * ThemeProvider component
 *
 * Wraps your application to provide theme context.
 * Applies `data-theme` (and `data-mode="embed"` when `embed`) to the target element.
 */
export function ThemeProvider({
  children,
  defaultTheme = 'light',
  embed = false,
  themeStorageKey = 'csk-color-theme',
  disablePersistence = false,
  targetSelector,
}: ThemeProviderProps) {
  const initialTheme = normalizeTheme(defaultTheme, 'light');

  const [theme, setThemeState] = useState<ColorTheme>(() =>
    disablePersistence
      ? initialTheme
      : normalizeTheme(getStoredValue(themeStorageKey), initialTheme)
  );

  // 'system' would follow prefers-color-scheme; 2.0 has no dark theme, so
  // every preference resolves to light.
  const resolvedTheme: ResolvedTheme = 'light';

  // Apply data-theme to the target element
  useEffect(() => {
    const target = getTarget(targetSelector);
    target?.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme, targetSelector]);

  // Apply data-mode="embed" while embed is on; remove it again when it turns off
  useEffect(() => {
    if (!embed) return;
    const target = getTarget(targetSelector);
    if (!target) return;
    target.setAttribute('data-mode', 'embed');
    return () => target.removeAttribute('data-mode');
  }, [embed, targetSelector]);

  const setTheme = useCallback(
    (newTheme: ColorTheme) => {
      const next = normalizeTheme(newTheme, 'light');
      setThemeState(next);
      if (!disablePersistence) {
        setStoredValue(themeStorageKey, next);
      }
    },
    [disablePersistence, themeStorageKey]
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme, embed }),
    [theme, resolvedTheme, setTheme, embed]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 *
 * @throws Error if used outside of ThemeProvider
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Hook to access theme context (returns undefined if not in provider)
 *
 * Useful for optional theme support in components
 */
export function useThemeOptional(): ThemeContextValue | undefined {
  return useContext(ThemeContext);
}

export default ThemeProvider;
