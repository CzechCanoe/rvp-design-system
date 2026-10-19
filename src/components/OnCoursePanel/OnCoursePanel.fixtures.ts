/**
 * Deterministic data for the OnCoursePanel / OnCourseRider stories and tests
 * (docs/v2/reference Live1 and Live5). Never reads real time: running times are
 * relative to STORY_NOW on a test clock.
 */
import type { GateGridGate } from '../GateGrid';
import type { OnCourseRiderData } from './OnCoursePanel';

/** Fixed story time: 2026-10-04 14:32:52 Europe/Prague. */
export const STORY_NOW = Date.UTC(2026, 9, 4, 12, 32, 52);
/** Live5: the last data came 42 s earlier, at 14:32:10. */
export const STALE_SINCE = STORY_NOW - 42_000;

const UPSTREAM = new Set([5, 8, 11, 12, 19, 20]);

/** `passed` gates carry their penalty (default 0), the rest are not judged yet (`null`). */
export function gatesUntil(passed: number, total: number, penalties: Record<number, number> = {}): GateGridGate[] {
  return Array.from({ length: total }, (_, i) => {
    const gate = i + 1;
    return { gate, penalty: gate <= passed ? (penalties[gate] ?? 0) : null, upstream: UPSTREAM.has(gate) };
  });
}

/** Reference Live1: HNILICA runs (featured), REZEK waits for the result, FABIAN is at the start. */
export function liveRiders(now: number = STORY_NOW): OnCourseRiderData[] {
  return [
    {
      bib: 41,
      name: 'HNILICA Lukas',
      categoryTag: 'U16',
      secondary: 'Slovenská kanoistika · 1. jízda 89.83',
      status: 'running',
      time: { elapsedSeconds: 46.1, receivedAt: now - 400 },
      split: 2,
      toLeader: -0.87,
      gates: gatesUntil(12, 22, { 3: 2 }),
      featured: true,
    },
    {
      bib: 35,
      name: 'REZEK Adam',
      categoryTag: 'U16',
      status: 'finished-pending',
      finish: { time: 90.38, penalty: 2 },
    },
    { bib: 38, name: 'FABIAN František', categoryTag: 'U18', status: 'at-start' },
  ];
}

/** Six on course at once: the panel just grows. */
export function sixRiders(now: number = STORY_NOW): OnCourseRiderData[] {
  const [hnilica, rezek, fabian] = liveRiders(now);
  return [
    hnilica,
    {
      bib: 44,
      name: 'KULTAN Andrej',
      categoryTag: 'U16',
      secondary: 'Kanoe Tatra klub Lipt. Mikuláš',
      status: 'running',
      time: { elapsedSeconds: 31.8, receivedAt: now - 700 },
      split: 1,
      toLeader: 1.42,
      gates: gatesUntil(8, 22, { 6: 50 }),
    },
    {
      bib: 47,
      name: 'ŠEVČÍK Matyáš',
      categoryTag: 'U18',
      secondary: 'TJ Dukla Praha',
      status: 'running',
      time: { elapsedSeconds: 12.3, receivedAt: now - 200 },
      gates: gatesUntil(4, 22),
    },
    rezek,
    {
      bib: 36,
      name: 'ČERMÁKOVÁ Eliška',
      categoryTag: 'U16',
      status: 'finished-pending',
      finish: { time: 93.12, penalty: null },
    },
    fabian,
  ];
}
