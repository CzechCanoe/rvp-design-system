import { Badge } from '../Badge';
import { Button } from '../Button';
import { StatusBadge } from '../StatusBadge';
import type { CalendarGroup } from './WeekendCalendar';

/** May 2026 of reference Kalendar. Fixed text, no dates computed: stories are deterministic. */

const results = <StatusBadge state="official" label="Výsledky" />;

export const mayWeekends: CalendarGroup[] = [
  {
    label: 'Víkend',
    dates: '9.–10. 5.',
    note: 'so, ne',
    events: [
      {
        id: 'cp1',
        section: 'dv',
        level: 'ČP',
        title: 'Český pohár #1 ve slalomu',
        href: '#zavod',
        details: ['Praha – Troja', 'USK Praha', 'so i ne'],
        deadline: { kind: 'closed' },
        documents: [
          { label: 'Propozice', href: '#propozice' },
          { label: 'Startovky', href: '#startovky' },
        ],
        status: results,
      },
      {
        id: 'regata',
        section: 'ry',
        level: 'Veřejný',
        title: 'Jarní regata Račice',
        href: '#zavod',
        details: ['Račice', 'KK Račice', 'so'],
        deadline: { kind: 'closed' },
        documents: [{ label: 'Propozice', href: '#propozice' }],
        status: results,
      },
    ],
  },
  {
    kind: 'weekday',
    dates: 'St 13. 5.',
    note: 'mimo víkend',
    events: [
      {
        id: 'skoleni',
        section: 'vt',
        title: 'Školení rozhodčích, Brno',
        href: '#zavod',
        details: ['seminář'],
        deadline: { kind: 'closing', label: 'Uzávěrka za 2 dny' },
        documents: [{ label: 'Pozvánka', href: '#pozvanka' }],
      },
    ],
  },
  {
    label: 'Tento víkend',
    dates: '16.–17. 5.',
    note: 'so, ne',
    current: true,
    events: [
      {
        id: 'cp2',
        section: 'dv',
        level: 'ČP',
        title: 'Český pohár #2 ve slalomu',
        href: '#zavod',
        favorite: true,
        details: ['Praha – Troja', 'USK Praha', 'so i ne', '112 lodí'],
        deadline: { kind: 'late', date: 'pá 18:00' },
        documents: [
          { label: 'Propozice', href: '#propozice' },
          { label: 'Startovky', href: '#startovky' },
        ],
        status: <StatusBadge state="live" />,
      },
      {
        id: 'berounka',
        section: 'dv',
        level: 'Veřejný',
        title: 'Sjezd na Berounce',
        href: '#zavod',
        details: ['Beroun', 'TJ Bohemians Praha', 'ne'],
        deadline: { kind: 'closed' },
        documents: [{ label: 'Propozice', href: '#propozice' }],
        status: <StatusBadge state="unknown" label="ne 14:00" />,
      },
      {
        id: 'sazava',
        section: 'vt',
        title: 'Vodácký víkend Sázava',
        href: '#zavod',
        details: ['Týnec nad Sázavou', 'so i ne', 'bez online přihlášky'],
        entryNote: 'Přihláška u pořadatele',
        documents: [{ label: 'Pozvánka', href: '#pozvanka' }],
      },
    ],
  },
  {
    label: 'Víkend',
    dates: '23.–24. 5.',
    note: 'so, ne',
    events: [
      {
        id: 'nkz',
        section: 'dv',
        level: 'NKZ',
        title: 'Nominační závod, Lipno',
        href: '#zavod',
        details: ['Lipno', 'SK Lipno', 'so i ne'],
        deadline: { kind: 'closing', label: 'Uzávěrka za 5 dní', date: 'st 13. 5. 23:59' },
        documents: [{ label: 'Propozice', href: '#propozice' }],
        status: (
          <Button size="sm" href="#prihlaska">
            Přihlásit
          </Button>
        ),
      },
      {
        id: 'mcr',
        section: 'ry',
        level: 'MČR',
        title: 'MČR dlouhé tratě',
        href: '#zavod',
        details: ['Labe aréna Račice', 'so i ne'],
        deadline: { kind: 'closing', label: 'Uzávěrka za 6 dní' },
        documentsNote: (
          <>
            <Badge variant="warning">Propozice chybí</Badge>
            <span>lhůta 6 týdnů uplynula</span>
          </>
        ),
        status: (
          <Button size="sm" variant="secondary" href="#prihlaska">
            Přihlásit
          </Button>
        ),
      },
    ],
  },
  {
    label: 'Víkend',
    dates: '30.–31. 5.',
    note: 'so, ne',
    events: [
      {
        id: 'wc',
        section: 'dv',
        level: 'Zahraničí',
        title: 'ICF World Cup #1, Augsburg',
        href: '#zavod',
        details: ['Německo', 'reprezentace'],
        entryNote: 'Nominace RDA',
        documents: [{ label: 'canoeicf.com ↗', href: '#icf' }],
      },
    ],
  },
];
