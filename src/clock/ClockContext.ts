import { createContext } from 'react';
import type { Clock } from './Clock';
import { createBrowserClock } from './browserClock';

/** Clock from the nearest `ClockProvider`; `null` means "use the default browser clock". */
export const ClockContext = createContext<Clock | null>(null);

let defaultClock: Clock | undefined;

/** Shared browser clock used when neither a `clock` prop nor a `ClockProvider` is given. */
export function getDefaultClock(): Clock {
  if (!defaultClock) defaultClock = createBrowserClock();
  return defaultClock;
}
