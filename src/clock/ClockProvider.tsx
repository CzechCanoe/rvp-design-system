import type { ReactNode } from 'react';
import type { Clock } from './Clock';
import { ClockContext } from './ClockContext';

export interface ClockProviderProps {
  /** Clock for every time-aware component below (RunningTime, DataAge). */
  clock: Clock;
  children?: ReactNode;
}

/**
 * Provides one `Clock` to a subtree. Applications put it at the root with
 * their own clock (the one they use to stamp `receivedAt`); tests and stories
 * pass `createTestClock()`. Without a provider, components use a shared
 * `createBrowserClock()`. A component's own `clock` prop wins over the provider.
 */
export function ClockProvider({ clock, children }: ClockProviderProps) {
  return <ClockContext.Provider value={clock}>{children}</ClockContext.Provider>;
}
