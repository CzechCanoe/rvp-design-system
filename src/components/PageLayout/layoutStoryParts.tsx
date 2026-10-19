/**
 * Story-only building blocks for the Layout/* stories.
 * Only content of later phases (results table, on-course panel, forms) is still a placeholder.
 */
import { DataAge } from '../DataAge';
import { createTestClock } from '../../clock';

const STORY_NOW = Date.UTC(2026, 9, 4, 12, 32, 10);
const storyClock = createTestClock({ now: STORY_NOW });

/** DataAge on a fixed clock: "aktualizováno před 1 s". */
export function StoryDataAge() {
  return <DataAge receivedAt={STORY_NOW - 1_000} clock={storyClock} />;
}

export function BrandMark({ name = 'Český svaz kanoistů' }: { name?: string }) {
  return (
    <a href="#uvod" className="csk-header__brand-link" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span className="csk-header__brand-mark" aria-hidden="true" />
      <span className="csk-header__brand-title">{name}</span>
    </a>
  );
}

export const siteNav = (
  <>
    <a href="#uvod">Úvod</a>
    <a href="#sporty">Sporty</a>
    <a href="#zavody" aria-current="page">
      Závody
    </a>
    <a href="#zavodnici">Závodníci</a>
    <a href="#treneri">Trenéři</a>
    <a href="#prihlasit">Přihlásit se</a>
  </>
);

export const subbarItems = [
  { label: 'Výsledky', href: '#vysledky', active: true },
  { label: 'Kalendář', href: '#kalendar' },
  { label: 'Žebříčky a VT', href: '#zebricky' },
  { label: 'Live', href: '#live' },
  { label: 'Online přihlašování', href: '#prihlasky' },
];

/** Grey block that marks where the page content continues. */
export function ContentPlaceholder({ height = 160, label }: { height?: number; label: string }) {
  return (
    <div
      style={{
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--csk-radius-lg)',
        border: '1px dashed var(--csk-color-border)',
        color: 'var(--csk-color-text-2)',
        fontSize: 13,
      }}
    >
      {label}
    </div>
  );
}

const iconProps = { viewBox: '0 0 24 24', 'aria-hidden': true } as const;

export const bottomBarItems = [
  {
    label: 'Výsledky',
    href: '#vysledky',
    active: true,
    icon: (
      <svg {...iconProps}>
        <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />
      </svg>
    ),
  },
  {
    label: 'Startovka',
    href: '#startovka',
    icon: (
      <svg {...iconProps}>
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
      </svg>
    ),
  },
  {
    label: 'Na trati',
    href: '#na-trati',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    label: 'Program',
    href: '#program',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </svg>
    ),
  },
];
