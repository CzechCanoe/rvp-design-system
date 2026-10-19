/**
 * Deterministic data of the Live page stories (docs/v2/reference Live3 and Live6).
 * The results and on-course data come from the component fixtures.
 */
import type { ProgramDay } from '../../components/ProgramList';
import type { StartlistRow } from '../../components/StartlistTable';

/** K1 muži, 88 boats, the first 11 (1st run from 11:21, 2nd from 15:21, interval 45 s). */
const people: Array<[string, string, string]> = [
  ['SEMERAD Adam', 'U23', 'Klub kanoistiky Roudnice n. L.'],
  ['SEVČÍK Matej', 'U23', 'Športový klub polície Bratislava'],
  ['FRÖHLICH Jáchym', 'U23', 'Klub kanoistiky Roudnice n. L.'],
  ['SEMERAD Jakub', 'U23', 'Klub kanoistiky Roudnice n. L.'],
  ['FABIAN František', 'U18', 'Vodní sporty Ostrava'],
  ['JONÁK Matej', 'U18', 'Slovenská kanoistika'],
  ['UDOVIČIĆ Mihael', 'U18', 'KKK Zagreb'],
  ['HNILICA Lukas', 'U16', 'Slovenská kanoistika'],
  ['REZEK Adam', 'U16', 'SK Vodní slalom Č. Budějovice'],
  ['HRADECKÝ Daniel', 'U16', 'KK Roudnice n. L.'],
  ['KULTAN Andrej', 'U16', 'Kanoe Tatra klub Lipt. Mikuláš'],
];

const pad = (n: number) => String(n).padStart(2, '0');
const at = (hour: number, minute: number, index: number) => {
  const total = hour * 3600 + minute * 60 + index * 45;
  return `${pad(Math.floor(total / 3600))}:${pad(Math.floor((total % 3600) / 60))}:${pad(total % 60)}`;
};

export const startlistRows: StartlistRow[] = people.map(([name, categoryTag, club], i) => ({
  id: `k1m-${i + 1}`,
  bib: i + 1,
  name,
  categoryTag,
  club,
  favorite: i === 2,
  starts:
    i === 9
      ? [{ mark: 'DNS-A' }, { mark: 'DNS-A' }]
      : [{ time: at(11, 21, i + 1) }, { time: at(15, 21, i + 1) }],
}));

/** Sunday 4. 10., two phases running at once. */
export const sunday: ProgramDay = {
  label: 'Neděle 4. 10.',
  note: 'časy podle rozpisu, skutečné se liší',
  items: [
    { id: 'fore1', time: '09:25', title: 'Forerunners', subtitle: '1. jízda', state: 'official', muted: true },
    { id: 'c1w1', time: '09:30', title: 'C1 ženy', subtitle: '1. jízda', state: 'official' },
    { id: 'c1m1', time: '09:56', title: 'C1 muži', subtitle: '1. jízda', state: 'official' },
    { id: 'k1w1', time: '10:39', title: 'K1 ženy', subtitle: '1. jízda', state: 'provisional' },
    { id: 'k1m1', time: '11:21', title: 'K1 muži', subtitle: '1. jízda', state: 'provisional' },
    { id: 'fore2', time: '13:25', title: 'Forerunners', subtitle: '2. jízda', state: 'official' },
    {
      id: 'c1w2',
      time: '13:30',
      title: 'C1 ženy',
      subtitle: '2. jízda',
      progress: { done: 9, total: 14 },
      running: true,
      href: '#c1w2',
    },
    { id: 'c1m2', time: '13:56', title: 'C1 muži', subtitle: '2. jízda', state: 'unknown', stateLabel: 'čeká' },
    { id: 'k1w2', time: '14:39', title: 'K1 ženy', subtitle: '2. jízda', state: 'unknown', stateLabel: 'čeká' },
    {
      id: 'k1m2',
      time: '15:21',
      title: 'K1 muži',
      subtitle: '2. jízda',
      progress: { done: 8, total: 24 },
      note: 'předběhli rozpis o 40 min',
      running: true,
      href: '#k1m2',
    },
    { id: 'award', time: '16:30', title: 'Vyhlášení výsledků', subtitle: 'u cílového mola', state: 'unknown', stateLabel: 'čeká' },
  ],
};
