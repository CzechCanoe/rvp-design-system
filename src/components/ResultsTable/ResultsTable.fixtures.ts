/**
 * Deterministic data for the ResultsTable / RunDetail stories and tests
 * (docs/v2/reference Live1, Live2, Live4, Zavod). Never reads real time:
 * running times are relative to STORY_NOW on a test clock.
 */
import type { Observed } from '../../types';
import type { GateGridGate } from '../GateGrid';
import type { RunDetailProps, RunDetailRun } from './RunDetail';
import type { ResultRow, RunCell } from './types';

/** Fixed story time: 2026-10-04 15:24:45 Europe/Prague. */
export const STORY_NOW = Date.UTC(2026, 9, 4, 13, 24, 45);

export const known = (value: number): Observed<number> => ({ state: 'known', value });
export const NOT_YET: Observed<number> = { state: 'not-yet' };
export const UNAVAILABLE: Observed<number> = { state: 'unavailable' };

const run = (time: number, penalty?: number, best?: boolean): RunCell => ({
  time: known(time),
  penalty,
  best,
});

// ---------------------------------------------------------------------------
// K1 muži, best-run race after the 2nd run (Live1, Zavod)
// ---------------------------------------------------------------------------

export const brRows: ResultRow[] = [
  {
    id: 'k1m-41',
    rank: known(1),
    podium: 1,
    bib: 41,
    name: 'HNILICA Lukas',
    categoryTag: 'U16',
    club: 'Slovenská kanoistika',
    favorite: true,
    runs: [run(89.83), run(89.81, undefined, true)],
    result: known(89.81),
  },
  {
    id: 'k1m-35',
    rank: known(2),
    podium: 2,
    bib: 35,
    name: 'REZEK Adam',
    categoryTag: 'U16',
    club: 'SK Vodní slalom Č. Budějovice',
    runs: [run(98.05, 2), run(90.38, undefined, true)],
    result: known(90.38),
    diff: known(0.57),
  },
  {
    id: 'k1m-38',
    rank: known(3),
    podium: 3,
    bib: 38,
    name: 'FABIAN František',
    categoryTag: 'U18',
    club: 'Vodní sporty Ostrava',
    favorite: true,
    runs: [run(94.48, 2), run(91.52, undefined, true)],
    result: known(91.52),
    diff: known(1.71),
  },
  {
    id: 'k1m-33',
    rank: known(4),
    bib: 33,
    name: 'DUSIK Krzysztof',
    categoryTag: 'U16',
    club: 'KS Pieniny Szczawnica',
    runs: [run(95.63, 2), run(91.59, undefined, true)],
    result: known(91.59),
    diff: known(1.78),
  },
  {
    id: 'k1m-30',
    rank: known(5),
    bib: 30,
    name: 'STYBNAR Matěj',
    categoryTag: 'U18',
    club: 'SKUP Olomouc',
    runs: [run(93.73), run(92.1, 4, true)],
    result: known(92.1),
    diff: known(2.29),
    state: 'review',
    note: 'branka 16',
  },
  {
    id: 'k1m-29',
    rank: known(6),
    bib: 29,
    name: 'ROUSEK David',
    categoryTag: 'U16',
    club: 'KK Opava',
    runs: [run(300.82, 158), run(92.37, undefined, true)],
    result: known(92.37),
    diff: known(2.56),
  },
  {
    id: 'k1m-27',
    rank: known(7),
    bib: 27,
    name: 'KULTAN Andrej',
    categoryTag: 'U16',
    club: 'Kanoe Tatra klub Lipt. Mikuláš',
    runs: [run(92.6, undefined, true), { time: NOT_YET, running: { elapsedSeconds: 46.1, receivedAt: STORY_NOW - 400 } }],
    result: known(92.6),
    running: true,
  },
  {
    id: 'k1m-25',
    rank: known(8),
    bib: 25,
    name: 'UHLÍK Jan',
    categoryTag: 'U16',
    club: 'TJ Jiskra Bechyně',
    runs: [run(93.87, undefined, true), { time: NOT_YET }],
    result: known(93.87),
    diff: NOT_YET,
  },
];

export const dnsRow: ResultRow = {
  id: 'k1m-21',
  rank: UNAVAILABLE,
  bib: 21,
  name: 'HRADECKÝ Daniel',
  categoryTag: 'U16',
  club: 'KK Roudnice n. L.',
  runs: [
    { time: NOT_YET, mark: 'DNS' },
    { time: NOT_YET, mark: 'DNS' },
  ],
  result: UNAVAILABLE,
  mark: 'DNS',
};

// ---------------------------------------------------------------------------
// K1 muži finále, one run (Live4): overall and the U18 category view
// ---------------------------------------------------------------------------

export const singleRows: ResultRow[] = [
  {
    id: 'f-12',
    rank: known(1),
    podium: 1,
    bib: 12,
    name: 'HOLUB Martin',
    categoryTag: 'U23',
    club: 'Dukla Praha',
    runs: [run(94.02, 0)],
    result: known(94.02),
  },
  {
    id: 'f-9',
    rank: known(2),
    podium: 2,
    bib: 9,
    name: 'MAREK Jakub',
    club: 'USK Praha',
    runs: [run(95.11, 2)],
    result: known(97.11),
    diff: known(3.09),
  },
  {
    id: 'f-14',
    rank: known(3),
    podium: 3,
    bib: 14,
    name: 'BICAN Vojtěch',
    categoryTag: 'U18',
    club: 'SKVS České Budějovice',
    runs: [run(96.85, 2)],
    result: known(98.85),
    diff: known(4.83),
  },
  {
    id: 'f-16',
    rank: known(4),
    bib: 16,
    name: 'ŠITRA Štěpán',
    categoryTag: 'U18',
    club: 'SKVS České Budějovice',
    runs: [run(100.39, 0)],
    result: known(100.39),
    diff: known(6.37),
  },
  {
    id: 'f-7',
    rank: known(5),
    bib: 7,
    name: 'KRÁL Ondřej',
    club: 'KK Brandýs n. L.',
    runs: [run(99.52, 2)],
    result: known(101.52),
    diff: known(7.5),
  },
  {
    id: 'f-18',
    rank: known(6),
    bib: 18,
    name: 'MERENUS Matouš',
    categoryTag: 'U18',
    club: 'KK Česká Lípa',
    runs: [run(101.13, 4)],
    result: known(105.13),
    diff: known(11.11),
  },
];

export const categoryRows: ResultRow[] = [
  {
    id: 'u18-14',
    rank: known(3),
    categoryRank: { rank: known(1), category: 'U18' },
    podium: 1,
    bib: 14,
    name: 'BICAN Vojtěch',
    categoryTag: 'U18',
    club: 'SKVS České Budějovice',
    runs: [run(96.85, 2)],
    result: known(98.85),
  },
  {
    id: 'u18-16',
    rank: known(4),
    categoryRank: { rank: known(2), category: 'U18' },
    podium: 2,
    bib: 16,
    name: 'ŠITRA Štěpán',
    categoryTag: 'U18',
    club: 'SKVS České Budějovice',
    runs: [run(100.39, 0)],
    result: known(100.39),
    diff: known(1.54),
  },
  {
    id: 'u18-18',
    rank: known(7),
    categoryRank: { rank: known(3), category: 'U18' },
    podium: 3,
    bib: 18,
    name: 'MERENUS Matouš',
    categoryTag: 'U18',
    club: 'KK Česká Lípa',
    runs: [run(101.13, 4)],
    result: known(105.13),
    diff: known(6.28),
  },
  {
    id: 'u18-20',
    rank: known(9),
    categoryRank: { rank: known(4), category: 'U18' },
    bib: 20,
    name: 'DOLEŽAL Štěpán',
    categoryTag: 'U18',
    club: 'KK Kralupy',
    runs: [run(104.9, 2)],
    result: known(106.9),
    diff: known(8.05),
  },
  {
    id: 'u18-22',
    rank: known(12),
    categoryRank: { rank: known(5), category: 'U18' },
    bib: 22,
    name: 'NOVÁK Tomáš',
    categoryTag: 'U18',
    club: 'USK Praha',
    runs: [run(108.21, 6)],
    result: known(114.21),
    diff: known(15.36),
  },
  {
    id: 'u18-24',
    rank: UNAVAILABLE,
    categoryRank: { rank: UNAVAILABLE, category: 'U18' },
    bib: 24,
    name: 'VESELÝ Jan',
    categoryTag: 'U18',
    club: 'TJ Bohemians Praha',
    runs: [run(99.4, 0)],
    result: known(99.4),
    mark: 'NR',
  },
  {
    id: 'u18-26',
    rank: UNAVAILABLE,
    categoryRank: { rank: UNAVAILABLE, category: 'U18' },
    bib: 26,
    name: 'MILYANOVÁ Anežka',
    categoryTag: 'U18',
    club: 'Loko Žatec',
    runs: [{ time: NOT_YET, mark: 'DNF' }],
    result: UNAVAILABLE,
    mark: 'DNF',
    note: 'branka 14',
  },
];

// ---------------------------------------------------------------------------
// Marks (pair): NR, DNF in one run, DSQ, DNS, DNS-A without run marks, unknown
// ---------------------------------------------------------------------------

export const markRows: ResultRow[] = [
  brRows[0],
  {
    id: 'm-3',
    rank: known(2),
    podium: 2,
    bib: 3,
    name: 'PAVLÍK Ondřej',
    club: 'TJ Dolní Počernice',
    runs: [run(93.4, 0, true), { time: NOT_YET, mark: 'DNF' }],
    result: known(93.4),
    diff: known(3.59),
  },
  {
    id: 'm-11',
    rank: UNAVAILABLE,
    bib: 11,
    name: 'VESELÝ Jan',
    categoryTag: 'U18',
    club: 'TJ Bohemians Praha',
    runs: [run(99.4, 0, true), run(101.2, 2)],
    result: known(99.4),
    mark: 'NR',
  },
  {
    id: 'm-6',
    rank: UNAVAILABLE,
    bib: 6,
    name: 'STRNAD Petr',
    club: 'KVS Plzeň',
    runs: [run(95.2, 2), { time: NOT_YET, mark: 'DSQ' }],
    result: UNAVAILABLE,
    mark: 'DSQ',
  },
  dnsRow,
  {
    id: 'm-15',
    rank: UNAVAILABLE,
    bib: 15,
    name: 'KOLÁŘ Vít',
    club: 'Kanoe Brno',
    runs: [],
    result: UNAVAILABLE,
    mark: 'DNS-A',
  },
  {
    id: 'm-19',
    rank: UNAVAILABLE,
    bib: 19,
    name: 'ŘÍHA Adam',
    club: 'KK Opava',
    runs: [{ time: UNAVAILABLE, penalty: null }, { time: UNAVAILABLE }],
    result: UNAVAILABLE,
    diff: UNAVAILABLE,
  },
];

// ---------------------------------------------------------------------------
// On course (pair): fresh and stale running times, 1st run in progress
// ---------------------------------------------------------------------------

export const onCourseRows: ResultRow[] = [
  brRows[0],
  brRows[1],
  {
    ...brRows[6],
    rank: known(3),
  },
  {
    id: 'k1m-24',
    rank: known(4),
    bib: 24,
    name: 'ŠTĚPÁNEK Karel',
    categoryTag: 'U18',
    club: 'Slavia Praha',
    runs: [
      run(94.1, 2, true),
      { time: NOT_YET, running: { elapsedSeconds: 61.8, receivedAt: STORY_NOW - 5_200 } },
    ],
    result: known(96.1),
    running: true,
  },
  {
    id: 'k1m-44',
    rank: NOT_YET,
    bib: 44,
    name: 'MACH Ondřej',
    club: 'KK Kroměříž',
    runs: [{ time: NOT_YET, running: { elapsedSeconds: 12.3, receivedAt: STORY_NOW - 200 } }],
    result: NOT_YET,
    running: true,
  },
];

// ---------------------------------------------------------------------------
// Review / provisional rows
// ---------------------------------------------------------------------------

export const reviewRows: ResultRow[] = [
  brRows[0],
  brRows[4],
  {
    id: 'k1m-31',
    rank: known(6),
    bib: 31,
    name: 'KOUBA Filip',
    categoryTag: 'U16',
    club: 'KK Veselí n. L.',
    runs: [run(96.4, 2), run(92.48, 2, true)],
    result: known(92.48),
    diff: known(2.67),
    state: 'provisional',
    note: 'branky 19, 20 neposouzené',
  },
  { ...brRows[5], rank: known(7) },
];

// ---------------------------------------------------------------------------
// Start list (two starts per athlete)
// ---------------------------------------------------------------------------

export const startlistRows: ResultRow[] = [
  { bib: 25, name: 'UHLÍK Jan', tag: 'U16', club: 'TJ Jiskra Bechyně', s1: '10:21:00', s2: '14:51:00' },
  { bib: 27, name: 'KULTAN Andrej', tag: 'U16', club: 'Kanoe Tatra klub Lipt. Mikuláš', s1: '10:22:00', s2: '14:52:30' },
  { bib: 29, name: 'ROUSEK David', tag: 'U16', club: 'KK Opava', s1: '10:23:00', s2: '14:54:00' },
  { bib: 30, name: 'STYBNAR Matěj', tag: 'U18', club: 'SKUP Olomouc', s1: '10:24:00', s2: '14:55:30' },
].map((s, i) => ({
  id: `s-${s.bib}`,
  rank: NOT_YET,
  bib: s.bib,
  name: s.name,
  categoryTag: s.tag,
  club: s.club,
  favorite: i === 1,
  runs: i === 2 ? [{ time: NOT_YET, start: s.s1 }, { time: NOT_YET, mark: 'DNS-A' as const }] : [
    { time: NOT_YET, start: s.s1 },
    { time: NOT_YET, start: s.s2 },
  ],
  result: NOT_YET,
}));

// ---------------------------------------------------------------------------
// 100 rows (performance)
// ---------------------------------------------------------------------------

const SURNAMES = ['NOVÁK', 'SVOBODA', 'DVOŘÁK', 'ČERNÝ', 'PROCHÁZKA', 'KUČERA', 'VESELÝ', 'HORÁK', 'NĚMEC', 'POKORNÝ'];
const FIRST = ['Jan', 'Petr', 'Tomáš', 'Jakub', 'Ondřej', 'Vojtěch', 'Adam', 'Matěj', 'Filip', 'David'];
const CLUBS = ['USK Praha', 'Dukla Praha', 'KK Opava', 'SKVS České Budějovice', 'KK Roudnice n. L.', 'Loko Trutnov'];
const TAGS = ['U16', 'U18', 'U23', undefined];

/** Deterministic pseudo-random sequence (LCG), same rows on every render. */
function lcg(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

export function makeRows(count: number, seed = 7): ResultRow[] {
  const rnd = lcg(seed);
  const rows = Array.from({ length: count }, (_, i) => {
    const t1 = 88 + rnd() * 30;
    const t2 = 88 + rnd() * 30;
    const p1 = [0, 0, 2, 4, 50][Math.floor(rnd() * 5)];
    const p2 = [0, 0, 0, 2, 52][Math.floor(rnd() * 5)];
    const total1 = Math.round((t1 + p1) * 100) / 100;
    const total2 = Math.round((t2 + p2) * 100) / 100;
    return { i, total1, total2, p1, p2, best: Math.min(total1, total2) };
  }).sort((a, b) => a.best - b.best);
  const leader = rows[0].best;
  return rows.map((r, idx) => {
    const marked = idx >= count - 3;
    return {
      id: `r-${r.i}`,
      rank: marked ? UNAVAILABLE : known(idx + 1),
      podium: !marked && idx < 3 ? ((idx + 1) as 1 | 2 | 3) : undefined,
      bib: 100 + r.i,
      name: `${SURNAMES[r.i % SURNAMES.length]} ${FIRST[(r.i * 7) % FIRST.length]}`,
      categoryTag: TAGS[r.i % TAGS.length],
      club: CLUBS[r.i % CLUBS.length],
      favorite: r.i % 17 === 0,
      runs: marked
        ? [{ time: NOT_YET, mark: 'DNS' as const }, { time: NOT_YET, mark: 'DNS' as const }]
        : [
            { time: known(r.total1), penalty: r.p1 || undefined, best: r.total1 <= r.total2 },
            { time: known(r.total2), penalty: r.p2 || undefined, best: r.total2 < r.total1 },
          ],
      result: marked ? UNAVAILABLE : known(r.best),
      diff: marked || idx === 0 ? undefined : known(Math.round((r.best - leader) * 100) / 100),
      mark: marked ? ('DNS' as const) : undefined,
    };
  });
}

// ---------------------------------------------------------------------------
// RunDetail (Live2 / Zavod: REZEK Adam, bib 35)
// ---------------------------------------------------------------------------

const UPSTREAM = new Set([5, 8, 11, 12, 19, 20]);

export function gates(count: number, penalties: Record<number, number | null> = {}): GateGridGate[] {
  return Array.from({ length: count }, (_, i) => {
    const gate = i + 1;
    return { gate, penalty: gate in penalties ? penalties[gate] : 0, upstream: UPSTREAM.has(gate) };
  });
}

export const rezekRuns: RunDetailRun[] = [
  {
    label: '1. jízda',
    time: known(96.05),
    penalty: known(2),
    total: known(98.05),
    gates: gates(22, { 16: 2 }),
    counts: false,
    startedAt: '11:22',
    meta: '14. po 1. jízdě',
  },
  {
    label: '2. jízda',
    time: known(90.38),
    penalty: known(0),
    total: known(90.38),
    gates: gates(22, { 19: null, 20: null }),
    counts: true,
    startedAt: '15:24',
    note: 'Branky 19 a 20 zatím neposouzené, čas se ještě může změnit.',
  },
];

export const rezekDetail: RunDetailProps = {
  bib: 35,
  ranks: [
    { rank: known(2), label: 've třídě' },
    { rank: known(1), label: 'v U16', diff: known(0) },
  ],
  state: 'provisional',
  runs: rezekRuns,
};
