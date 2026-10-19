import { useContext } from 'react';
import type { Clock } from './Clock';
import { ClockContext, getDefaultClock } from './ClockContext';

/**
 * Resolves the clock for a component: `override` (the component's `clock`
 * prop) → nearest `ClockProvider` → shared browser clock.
 */
export function useClock(override?: Clock): Clock {
  const fromContext = useContext(ClockContext);
  return override ?? fromContext ?? getDefaultClock();
}
