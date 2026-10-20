import type { ProfileHeaderTile } from '../../components/ProfileHeader';
import type { RivalsListItem } from '../../components/RivalsList';
import type { TimeValueFormat } from '../../components/TimeValue';

/** Deterministic data of the athlete page stories (references Profil.html, ProfilMobil.html). */

export const ATHLETE_NAME = 'Jan Novák';

export type ResultStatus = 'official' | 'provisional';

export interface SeasonResult {
  id: string;
  date: string;
  race: string;
  place: string;
  category: string;
  rank: number | null;
  of?: number;
  /** Result time in seconds. */
  seconds?: number;
  /** `clock` for downhill (`14:02.6`, TimeValue `format="clock"`); slalom stays in seconds. */
  format?: TimeValueFormat;
  /** Gap to the winner in seconds; null = no gap shown. */
  diff: number | null;
  points: number | null;
  status: ResultStatus;
  dnf?: boolean;
}

export const seasonResults: SeasonResult[] = [
  { id: 'r1', date: '17. 5.', race: 'Český pohár #2 ve slalomu', place: 'Praha – Troja', category: 'K1 muži', rank: 1, of: 24, seconds: 92.34, diff: null, points: 100, status: 'official' },
  { id: 'r2', date: '18. 5.', race: 'Český pohár #2 ve slalomu', place: 'Praha – Troja · neděle', category: 'K1 muži', rank: 2, of: 24, seconds: 93.1, diff: 0.41, points: 80, status: 'provisional' },
  { id: 'r3', date: '10. 5.', race: 'Český pohár #1 ve slalomu', place: 'Praha – Troja', category: 'K1 muži', rank: 5, of: 26, seconds: 95.02, diff: 2.9, points: 45, status: 'official' },
  { id: 'r4', date: '26. 4.', race: 'Jarní slalom, České Budějovice', place: 'veřejný závod', category: 'K1 muži', rank: 3, of: 31, seconds: 101.77, diff: 4.12, points: null, status: 'official' },
  { id: 'r5', date: '12. 4.', race: 'Sjezd na Otavě', place: 'Sušice · klasický sjezd', category: 'K1 muži', rank: 7, of: 19, seconds: 842.6, format: 'clock', diff: 31.2, points: null, status: 'official' },
  { id: 'r6', date: '29. 3.', race: 'Zimní pohár, Roudnice', place: 'halový slalom', category: 'K1 muži', rank: null, diff: null, points: null, status: 'official', dnf: true },
];

export const publicTiles: ProfileHeaderTile[] = [
  { id: 'vt-slalom', label: 'VT slalom K1', value: '1', hint: 'platí do 31. 12. 2027' },
  { id: 'vt-sjezd', label: 'VT sjezd K1', value: '2+' },
  { id: 'cp', label: 'Český pohár 2026 · K1 muži', value: '4.', hint: '320 b. po 3 z 6 závodů' },
];

export const mobileTiles: ProfileHeaderTile[] = [
  { id: 'vt', label: 'VT slalom', value: '1' },
  { id: 'cp', label: 'ČP 2026', value: '4.', delta: '▲2' },
  { id: 'races', label: 'Závodů 2026', value: '9' },
];

export const rivals: RivalsListItem[] = [
  { id: 'a', rank: 3, name: 'Jakub Dvořák', club: 'Dukla', points: 360, href: '#soupeř-a' },
  { id: 'me', rank: 4, name: 'Já', club: 'Bohemians', points: 320, self: true },
  { id: 'b', rank: 5, name: 'Matyáš Kopecký', club: 'Brandýs', points: 305, href: '#soupeř-b' },
  { id: 'c', rank: 6, name: 'Ondřej Marek', club: 'Bohemians', points: 275, href: '#soupeř-c' },
];
