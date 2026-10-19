import type { SelectOption } from '../Select';
import type { EntryBoat, EntryCheck } from './EntryTable';
import type { Proposal } from '../ProposalList';

/** Age categories offered in the cell select. */
export const categoryOptions: SelectOption[] = [
  { value: 'adult', label: 'Dospělí' },
  { value: 'u23', label: 'U23' },
  { value: 'u18', label: 'U18' },
  { value: 'u16', label: 'U16' },
  { value: 'u14', label: 'U14' },
];

export const checkColumns = ['Registrace', 'Příspěvky', 'Prohlídka'];

const ok = (label: string): EntryCheck => ({ label, tone: 'ok' });
const warn = (label: string): EntryCheck => ({ label, tone: 'warn' });

/** K1 muži of reference Prihlaska.html: 4 boats, one expired medical, one year/category mismatch, one unpaid fee. */
export const k1Boats: EntryBoat[] = [
  {
    id: 'k1-1',
    category: 'adult',
    fee: '300',
    members: [
      { id: 'a', name: '[JMÉNO ZÁVODNÍKA]', regNo: 'RGC 118 203', year: 1999, rankingClass: '1', checks: [ok('platná'), ok('2026'), ok('do 2. 2027')] },
    ],
  },
  {
    id: 'k1-2',
    category: 'u18',
    fee: '300',
    members: [
      { id: 'b', name: '[JMÉNO ZÁVODNÍKA]', regNo: 'RGC 125 410', year: 2008, rankingClass: '2+', checks: [ok('platná'), ok('2026'), warn('propadla 3. 4.')] },
    ],
  },
  {
    id: 'k1-3',
    category: 'u18',
    categoryWarning: 'ročník 2011 odpovídá U16',
    fee: '300',
    members: [
      { id: 'c', name: '[JMÉNO ZÁVODNÍKA]', regNo: 'RGC 127 002', year: 2011, rankingClass: 'bez VT', checks: [ok('platná'), warn('2026 nezaplaceno'), ok('do 9. 2026')] },
    ],
  },
  {
    id: 'k1-4',
    category: 'adult',
    fee: '300',
    members: [
      { id: 'd', name: '[JMÉNO ZÁVODNÍKA]', regNo: 'RGC 119 555', year: 2001, rankingClass: 'M', checks: [ok('platná'), ok('2026'), ok('do 11. 2026')] },
    ],
  },
];

/** C2 mix of the reference: a full crew (háček + zadák) and a crew with an open seat. */
export const c2Boats: EntryBoat[] = [
  {
    id: 'c2-1',
    category: 'adult',
    fee: '400',
    members: [
      { id: 'e', name: '[JMÉNO ZÁVODNÍKA]', role: 'háček', year: 2003, rankingClass: '2', checks: [ok('platná'), ok('2026'), ok('do 3. 2027')] },
      { id: 'f', name: '[JMÉNO ZÁVODNÍKA]', role: 'zadák', year: 2004, rankingClass: '2', checks: [ok('platná'), ok('2026'), ok('do 1. 2027')] },
    ],
  },
  {
    id: 'c2-2',
    category: 'u18',
    fee: '400',
    members: [
      { id: 'g', name: '[JMÉNO ZÁVODNÍKA]', role: 'háček', year: 2007, rankingClass: '3', checks: [ok('platná'), ok('2026'), ok('do 5. 2027')] },
    ],
    openSeat: 'druhé místo v lodi je volné',
  },
];

export const proposals: Proposal[] = [
  { id: 'p1', name: '[JMÉNO ZÁVODNÍKA]', detail: '1999 · RGC 118 203', category: 'K1 muži', proposedAt: 'navrhl út 9:12' },
  { id: 'p2', name: '[JMÉNO ZÁVODNÍKA]', detail: '2002 · RGC 121 877', category: 'C1 ženy', proposedAt: 'navrhla po 20:40' },
];
