/**
 * ThemeContext - CSK RVP Design System
 *
 * Provides context for theme (light/dark) and display mode (utility/expressive).
 * Implements the dual-personality system from DESIGN_PRINCIPLES.md Section 3.
 *
 * Usage:
 * ```tsx
 * <ThemeProvider mode="expressive" theme="light">
 *   <App />
 * </ThemeProvider>
 *
 * // In components:
 * const { mode, theme, setMode, setTheme } = useTheme();
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
 * Display mode:
 * - utility: compact, efficient - for backoffice and admin interfaces
 * - expressive: generous, dramatic - for public-facing pages
 * - embed: neutral, modern - for components embedded in kanoe.cz (Joomla)
 */
export type DisplayMode = 'utility' | 'expressive' | 'embed';

/**
 * Color theme: light or dark
 */
export type ColorTheme = 'light' | 'dark' | 'system';

/**
 * Resolved theme (never 'system')
 */
export type ResolvedTheme = 'light' | 'dark';

/**
 * Theme context value
 */
export interface ThemeContextValue {
  /** Current display mode */
  mode: DisplayMode;
  /** Set display mode */
  setMode: (mode: DisplayMode) => void;
  /** Toggle between utility and expressive */
  toggleMode: () => void;

  /** Current theme preference */
  theme: ColorTheme;
  /** Resolved theme (accounts for system preference) */
  resolvedTheme: ResolvedTheme;
  /** Set theme */
  setTheme: (theme: ColorTheme) => void;
  /** Toggle between light and dark (sets explicit, not system) */
  toggleTheme: () => void;
}

/**
 * Theme provider props
 */
export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial display mode (default: 'utility') */
  defaultMode?: DisplayMode;
  /** Initial color theme (default: 'light') */
  defaultTheme?: ColorTheme;
  /** Storage key for persisting mode preference */
  modeStorageKey?: string;
  /** Storage key for persisting theme preference */
  themeStorageKey?: string;
  /** Disable persistence */
  disablePersistence?: boolean;
  /** Target element for applying data attributes (default: document.documentElement) */
  targetSelector?: string;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Get system color scheme preference
 */
function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Get stored value from localStorage
 */
function getStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Store value in localStorage
 */
function setStoredValue<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors
  }
}

/**
 * ThemeProvider component
 *
 * Wraps your application to provide theme context.
 * Applies data-theme and data-mode attributes to the target element.
 */
export function ThemeProvider({
  children,
  defaultMode = 'utility',
  defaultTheme = 'light',
  modeStorageKey = 'csk-display-mode',
  themeStorageKey = 'csk-color-theme',
  disablePersistence = false,
  targetSelector,
}: ThemeProviderProps) {
  // Initialize state from storage or defaults
  const [mode, setModeState] = useState<DisplayMode>(() =>
    disablePersistence ? defaultMode : getStoredValue(modeStorageKey, defaultMode)
  );

  const [theme, setThemeState] = useState<ColorTheme>(() =>
    disablePersistence ? defaultTheme : getStoredValue(themeStorageKey, defaultTheme)
  );

  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() =>
    getSystemTheme()
  );

  // Resolve theme (handle 'system' preference)
  const resolvedTheme: ResolvedTheme = useMemo(() => {
    return theme === 'system' ? systemTheme : theme;
  }, [theme, systemTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply data attributes to target element
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const target = targetSelector
      ? document.querySelector(targetSelector)
      : document.documentElement;

    if (target) {
      target.setAttribute('data-theme', resolvedTheme);
      target.setAttribute('data-mode', mode);
    }
  }, [resolvedTheme, mode, targetSelector]);

  // Setters with persistence
  const setMode = useCallback(
    (newMode: DisplayMode) => {
      setModeState(newMode);
      if (!disablePersistence) {
        setStoredValue(modeStorageKey, newMode);
      }
    },
    [disablePersistence, modeStorageKey]
  );

  const setTheme = useCallback(
    (newTheme: ColorTheme) => {
      setThemeState(newTheme);
      if (!disablePersistence) {
        setStoredValue(themeStorageKey, newTheme);
      }
    },
    [disablePersistence, themeStorageKey]
  );

  const toggleMode = useCallback(() => {
    const modes: DisplayMode[] = ['utility', 'expressive', 'embed'];
    const currentIndex = modes.indexOf(mode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setMode(modes[nextIndex]);
  }, [mode, setMode]);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  }, [resolvedTheme, setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      setMode,
      toggleMode,
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [mode, setMode, toggleMode, theme, resolvedTheme, setTheme, toggleTheme]
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
