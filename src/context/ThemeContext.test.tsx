import { afterEach, describe, expect, it } from 'vitest';
import { act, render, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';

const root = document.documentElement;

afterEach(() => {
  localStorage.clear();
  root.removeAttribute('data-theme');
  root.removeAttribute('data-mode');
});

describe('ThemeProvider', () => {
  it('applies data-theme="light" and no data-mode by default', () => {
    render(<ThemeProvider disablePersistence>x</ThemeProvider>);
    expect(root).toHaveAttribute('data-theme', 'light');
    expect(root).not.toHaveAttribute('data-mode');
  });

  it("resolves 'system' to light (no dark theme in 2.0)", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider defaultTheme="system" disablePersistence>
        {children}
      </ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('system');
    expect(result.current.resolvedTheme).toBe('light');
    expect(root).toHaveAttribute('data-theme', 'light');
  });

  it("maps a stored 1.x 'dark' preference to light", () => {
    localStorage.setItem('csk-color-theme', JSON.stringify('dark'));
    const wrapper = ({ children }: { children: ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('light');
  });

  it('persists the theme preference', () => {
    const wrapper = ({ children }: { children: ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => result.current.setTheme('system'));
    expect(result.current.theme).toBe('system');
    expect(localStorage.getItem('csk-color-theme')).toBe(JSON.stringify('system'));
  });

  it('sets data-mode="embed" while embed is on and removes it afterwards', () => {
    const { rerender, unmount } = render(<ThemeProvider embed disablePersistence>x</ThemeProvider>);
    expect(root).toHaveAttribute('data-mode', 'embed');

    rerender(<ThemeProvider embed={false} disablePersistence>x</ThemeProvider>);
    expect(root).not.toHaveAttribute('data-mode');

    rerender(<ThemeProvider embed disablePersistence>x</ThemeProvider>);
    unmount();
    expect(root).not.toHaveAttribute('data-mode');
  });

  it('exposes embed in the context and honours targetSelector', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider embed targetSelector="#embed-target" disablePersistence>
        <div id="embed-target">{children}</div>
      </ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.embed).toBe(true);
    const target = document.getElementById('embed-target');
    expect(target).toHaveAttribute('data-mode', 'embed');
    expect(target).toHaveAttribute('data-theme', 'light');
    expect(root).not.toHaveAttribute('data-mode');
  });
});
