/**
 * Story-only building blocks for the Layout/* stories.
 *
 * Placeholders stand in for components owned by other v2 tasks
 * (Tabs carousel T4, StatusBadge T5, SegmentedControl T7, time values T6)
 * and are replaced by the real ones in the Page stories (T15+).
 */
import type { CSSProperties, ReactNode } from 'react';

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

const segStyle: CSSProperties = {
  display: 'inline-flex',
  background: 'var(--csk-color-surface-3)',
  borderRadius: 8,
  padding: 2,
};

/** Placeholder for SegmentedControl (T7). */
export function SegPlaceholder({ items, active }: { items: string[]; active: number }) {
  return (
    <div style={segStyle} role="group">
      {items.map((label, i) => (
        <span
          key={label}
          aria-current={i === active ? 'true' : undefined}
          style={{
            padding: '5px 10px',
            borderRadius: 6,
            fontSize: 13,
            whiteSpace: 'nowrap',
            fontWeight: i === active ? 600 : 500,
            color: i === active ? 'var(--csk-color-brand)' : 'var(--csk-color-text-2)',
            background: i === active ? 'var(--csk-color-surface)' : 'transparent',
          }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

/** Placeholder for the class pills (FilterPills / Tabs carousel, T4). */
export function PillsPlaceholder({
  items,
  active,
  carousel = false,
}: {
  items: string[];
  active: number;
  carousel?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 6,
        flexWrap: carousel ? 'nowrap' : 'wrap',
        overflow: 'hidden',
        ...(carousel ? { maskImage: 'linear-gradient(90deg, black 85%, transparent)' } : {}),
      }}
    >
      {items.map((label, i) => (
        <span
          key={label}
          style={{
            flex: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            height: carousel ? 30 : 32,
            padding: '0 12px',
            borderRadius: 999,
            border: '1px solid var(--csk-color-border)',
            fontSize: 13,
            fontWeight: 500,
            background: i === active ? 'var(--csk-color-brand)' : 'var(--csk-color-surface)',
            borderColor: i === active ? 'var(--csk-color-brand)' : 'var(--csk-color-border)',
            color: i === active ? 'var(--csk-color-text-on-fill)' : 'var(--csk-color-text-2)',
          }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

/** Placeholder for StatusBadge state="live" (T5). */
export function LivePlaceholder() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 22,
        padding: '0 8px',
        borderRadius: 4,
        background: 'var(--csk-color-live)',
        color: 'var(--csk-color-text-on-fill)',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        lineHeight: 1,
      }}
    >
      <i
        aria-hidden="true"
        style={{ width: 7, height: 7, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }}
      />
      Live
    </span>
  );
}

/** Placeholder pill used for Badge (section, level, status) until T4. */
export function TagPlaceholder({
  children,
  tone = 'level',
}: {
  children: ReactNode;
  tone?: 'dv' | 'level' | 'outline';
}) {
  const tones: Record<string, CSSProperties> = {
    dv: { background: 'var(--csk-color-section-dv)', color: 'var(--csk-color-text-on-fill)' },
    level: { background: 'var(--csk-color-highlight-bg)', color: 'var(--csk-color-highlight-text)' },
    outline: { border: '1px solid var(--csk-color-border)', color: 'var(--csk-color-text-2)' },
  };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 22,
        padding: '0 8px',
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        lineHeight: 1,
        ...tones[tone],
      }}
    >
      {children}
    </span>
  );
}

/** Outlined button look until Button v2 (T4) lands. */
export function LinkButton({ children, href = '#', small = false }: { children: ReactNode; href?: string; small?: boolean }) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: small ? 32 : 40,
        padding: small ? '0 10px' : '0 16px',
        borderRadius: 'var(--csk-radius-md)',
        border: '1px solid var(--csk-color-border)',
        background: 'var(--csk-color-surface)',
        color: 'var(--csk-color-text)',
        fontWeight: 600,
        fontSize: small ? 13 : 14,
        textDecoration: 'none',
      }}
    >
      {children}
    </a>
  );
}

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
