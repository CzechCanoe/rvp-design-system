import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';
import './TokensOverview.css';

/**
 * Tokens/Overview – palette, value states and scales of the v2 token system
 * (docs/v2/TOKENS.md), laid out like docs/v2/reference/Main.html.
 * Values are read from the rendered CSS, so the story always shows what
 * src/tokens/ ships (including [data-mode="embed"] overrides).
 */

type TokenRow = { token: string; note: string };

const PRIMITIVES: TokenRow[] = [
  { token: '--csk-navy', note: 'logo ČSK' },
  { token: '--csk-blue', note: 'kanoe.cz navigace, 4.5:1 na bílé' },
  { token: '--csk-blue-dark', note: 'hover / aktivní' },
  { token: '--csk-blue-100', note: 'podložky, aktivní položky' },
  { token: '--csk-blue-200', note: 'rámy zvýrazněných karet' },
  { token: '--csk-red', note: 'logo ČSK; jen LIVE, chyba, běžící čas' },
  { token: '--csk-red-100', note: 'podložka chyby, běžící řádek' },
  { token: '--csk-red-dark', note: 'text chybové hlášky' },
  { token: '--csk-ink', note: 'text' },
  { token: '--csk-ink-2', note: 'vedlejší text' },
  { token: '--csk-ink-3', note: 'popisky, meta' },
  { token: '--csk-line', note: 'rámy' },
  { token: '--csk-line-2', note: 'oddělovače řádků' },
  { token: '--csk-white', note: 'text na plných barvách' },
  { token: '--csk-ground', note: 'plocha tribuny' },
  { token: '--csk-ground-2', note: 'pracovní plocha, podklad detailu' },
  { token: '--csk-ground-3', note: 'segmenty, neutrální chipy' },
  { token: '--csk-green', note: 'Oficiální, OK' },
  { token: '--csk-green-100', note: 'podložka Oficiální' },
  { token: '--csk-green-dark', note: 'text potvrzení' },
  { token: '--csk-amber', note: 'Předběžné, varování' },
  { token: '--csk-amber-100', note: 'podložka Předběžné' },
  { token: '--csk-amber-dark', note: 'text varování' },
  { token: '--csk-violet', note: 'V revizi' },
  { token: '--csk-violet-100', note: 'podložka V revizi' },
  { token: '--csk-gray', note: 'Neznámo, stale (ne pro text)' },
  { token: '--csk-gray-100', note: 'podložka Neznámo' },
  { token: '--csk-dv', note: 'divoká voda' },
  { token: '--csk-ry', note: 'rychlost' },
  { token: '--csk-vt', note: 'turistika' },
  { token: '--csk-gold', note: 'podium 1, proužek' },
  { token: '--csk-silver', note: 'podium 2, proužek' },
  { token: '--csk-bronze', note: 'podium 3, proužek' },
  { token: '--csk-gold-dark', note: 'podium 1, pořadí' },
  { token: '--csk-silver-dark', note: 'podium 2, pořadí' },
  { token: '--csk-bronze-dark', note: 'podium 3, pořadí' },
];

const SEMANTIC: { group: string; rows: TokenRow[] }[] = [
  {
    group: 'Text',
    rows: [
      { token: '--csk-color-text', note: 'text, hodnoty' },
      { token: '--csk-color-text-2', note: 'vedlejší text' },
      { token: '--csk-color-text-3', note: 'popisky, meta' },
      { token: '--csk-color-text-on-fill', note: 'text na brand/action/live/sekci' },
    ],
  },
  {
    group: 'Plochy a linky',
    rows: [
      { token: '--csk-color-surface', note: 'tribuna, karty, pole' },
      { token: '--csk-color-surface-2', note: 'pracovní plocha, hover řádku' },
      { token: '--csk-color-surface-3', note: 'segmenty, chipy' },
      { token: '--csk-color-overlay', note: 'podklad modalu' },
      { token: '--csk-color-border', note: 'rámy' },
      { token: '--csk-color-border-2', note: 'oddělovače řádků' },
    ],
  },
  {
    group: 'Značka a akce',
    rows: [
      { token: '--csk-color-brand', note: 'modrý pás, aktivní tab, vybraná pilulka' },
      { token: '--csk-color-action', note: 'primární tlačítko, odkazy' },
      { token: '--csk-color-action-hover', note: 'hover / aktivní' },
      { token: '--csk-color-focus', note: 'focus outline' },
      { token: '--csk-color-highlight-bg', note: 'podložka, aktivní položka, úroveň závodu' },
      { token: '--csk-color-highlight-border', note: 'rám zvýrazněné karty' },
      { token: '--csk-color-highlight-text', note: 'text na podložce' },
    ],
  },
  {
    group: 'Live',
    rows: [
      { token: '--csk-color-live', note: 'LIVE, běžící čas' },
      { token: '--csk-color-live-bg', note: 'běžící řádek v programu' },
    ],
  },
  {
    group: 'Stavy hodnoty',
    rows: [
      { token: '--csk-color-state-official', note: 'Oficiální' },
      { token: '--csk-color-state-official-bg', note: '' },
      { token: '--csk-color-state-official-text', note: '' },
      { token: '--csk-color-state-provisional', note: 'Předběžné' },
      { token: '--csk-color-state-provisional-bg', note: '' },
      { token: '--csk-color-state-provisional-text', note: '' },
      { token: '--csk-color-state-review', note: 'V revizi' },
      { token: '--csk-color-state-review-bg', note: '' },
      { token: '--csk-color-state-review-text', note: '' },
      { token: '--csk-color-state-unknown', note: 'Neznámo (ne pro text)' },
      { token: '--csk-color-state-unknown-bg', note: '' },
      { token: '--csk-color-state-unknown-text', note: '' },
      { token: '--csk-color-state-stale', note: 'Zastaveno (tečkované podtržení)' },
    ],
  },
  {
    group: 'Zpětná vazba',
    rows: [
      { token: '--csk-color-success', note: 'potvrzení' },
      { token: '--csk-color-success-bg', note: '' },
      { token: '--csk-color-success-text', note: '' },
      { token: '--csk-color-warning', note: 'varování (nikdy neblokuje)' },
      { token: '--csk-color-warning-bg', note: '' },
      { token: '--csk-color-warning-text', note: '' },
      { token: '--csk-color-error', note: 'chyba' },
      { token: '--csk-color-error-bg', note: '' },
      { token: '--csk-color-error-text', note: '' },
      { token: '--csk-color-info', note: 'informace' },
      { token: '--csk-color-info-bg', note: '' },
      { token: '--csk-color-info-text', note: '' },
    ],
  },
  {
    group: 'Sekce a podium',
    rows: [
      { token: '--csk-color-section-dv', note: 'divoká voda' },
      { token: '--csk-color-section-ry', note: 'rychlost' },
      { token: '--csk-color-section-vt', note: 'turistika' },
      { token: '--csk-color-podium-1', note: 'proužek řádku' },
      { token: '--csk-color-podium-2', note: '' },
      { token: '--csk-color-podium-3', note: '' },
      { token: '--csk-color-podium-1-text', note: 'pořadí' },
      { token: '--csk-color-podium-2-text', note: '' },
      { token: '--csk-color-podium-3-text', note: '' },
    ],
  },
];

const TEXT_SIZES = ['xs', 'sm', 'md', 'base', 'lg', 'xl', '2xl', '3xl'].map((s) => `--csk-text-${s}`);
const SPACES = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => `--csk-space-${n}`);
const RADII = ['sm', 'md', 'lg', 'pill'].map((r) => `--csk-radius-${r}`);
const OTHER = [
  '--csk-font-sans',
  '--csk-font-display',
  '--csk-font-mono',
  '--csk-shadow-sm',
  '--csk-tap',
  '--csk-layout-max-width',
  '--csk-transition-fast',
  '--csk-transition-slow',
];

const ALL_TOKENS = [
  ...PRIMITIVES.map((r) => r.token),
  ...SEMANTIC.flatMap((g) => g.rows.map((r) => r.token)),
  ...TEXT_SIZES,
  ...SPACES,
  ...RADII,
  ...OTHER,
];

/** Reads the computed value of every listed token; re-reads when data-mode/data-theme change. */
function useTokenValues(ref: React.RefObject<HTMLElement | null>): Record<string, string> {
  const [values, setValues] = useState<Record<string, string>>({});
  useEffect(() => {
    const read = () => {
      if (!ref.current) return;
      const cs = getComputedStyle(ref.current);
      setValues(Object.fromEntries(ALL_TOKENS.map((t) => [t, cs.getPropertyValue(t).trim()])));
    };
    // Defer one frame so attributes set by decorators/providers are applied first
    const frame = requestAnimationFrame(read);
    const observer = new MutationObserver(read);
    for (const el of [document.documentElement, document.body]) {
      observer.observe(el, { attributes: true, attributeFilter: ['data-mode', 'data-theme', 'data-font'] });
    }
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [ref]);
  return values;
}

function Swatch({
  token,
  title,
  note,
  values,
  small,
  dark,
  outlined,
}: {
  token: string;
  title: string;
  note?: string;
  values: Record<string, string>;
  small?: boolean;
  dark?: boolean;
  outlined?: boolean;
}) {
  const className = [
    'tokens-overview__swatch',
    small && 'tokens-overview__swatch--small',
    outlined && 'tokens-overview__swatch--outlined',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <div
      className={className}
      style={{
        background: `var(${token})`,
        color: dark ? 'var(--csk-color-text-on-fill)' : 'var(--csk-color-text)',
      }}
    >
      <b>{title}</b>
      <span className="tokens-overview__mono">
        {values[token] ?? ''}
        {note ? ` · ${note}` : ''}
      </span>
      <span className="tokens-overview__mono">{token}</span>
    </div>
  );
}

function ColorTable({ rows, values }: { rows: TokenRow[]; values: Record<string, string> }) {
  return (
    <div className="tokens-overview__table-wrap">
      <table className="tokens-overview__table">
        <thead>
          <tr>
            <th aria-label="Ukázka" />
            <th>Token</th>
            <th>Hodnota</th>
            <th>Použití</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.token}>
              <td>
                <span className="tokens-overview__chip" style={{ background: `var(${r.token})` }} />
              </td>
              <td>
                <code>{r.token}</code>
              </td>
              <td>
                <code>{values[r.token] ?? ''}</code>
              </td>
              <td className="tokens-overview__muted">{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScaleTable({
  tokens,
  values,
  sample,
}: {
  tokens: string[];
  values: Record<string, string>;
  sample: (token: string) => React.ReactNode;
}) {
  return (
    <div className="tokens-overview__table-wrap">
      <table className="tokens-overview__table">
        <thead>
          <tr>
            <th>Token</th>
            <th>Hodnota</th>
            <th>Ukázka</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((t) => (
            <tr key={t}>
              <td>
                <code>{t}</code>
              </td>
              <td>
                <code>{values[t] ?? ''}</code>
              </td>
              <td>{sample(t)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TokensOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useTokenValues(ref);

  return (
    <div ref={ref} className="tokens-overview">
      <header className="tokens-overview__head">
        <div>
          <h1>Klidná voda</h1>
          <p className="tokens-overview__lede">
            Jeden vizuální jazyk ve dvou registrech. Veřejný: bílá, svazová modrá, vzduch. Pracovní: stejné
            tokeny, hustší, tabulkový. Pohyb jen tam, kde se něco opravdu děje.
          </p>
        </div>
        <div className="tokens-overview__head-badges">
          <span className="tokens-overview__badge tokens-overview__badge--dv">Divoká voda</span>
          <span className="tokens-overview__badge tokens-overview__badge--ry">Rychlost</span>
          <span className="tokens-overview__badge tokens-overview__badge--vt">Turistika</span>
        </div>
      </header>

      <div className="tokens-overview__cols">
        <section className="tokens-overview__section">
          <h3>Barvy, odvozené z kanoe.cz a loga ČSK</h3>
          <div className="tokens-overview__swatches">
            <Swatch token="--csk-color-brand" title="Svazová modrá" note="logo" values={v} dark />
            <Swatch token="--csk-color-action" title="Akce, odkazy" note="kanoe.cz" values={v} dark />
            <Swatch token="--csk-color-live" title="Červená" note="jen LIVE, chyba" values={v} dark />
            <Swatch token="--csk-color-highlight-bg" title="Modrá podložka" values={v} />
            <Swatch token="--csk-color-text" title="Text" values={v} small dark />
            <Swatch token="--csk-color-text-3" title="Vedlejší" values={v} small dark />
            <Swatch token="--csk-color-border" title="Linky" values={v} small />
            <Swatch token="--csk-color-surface-2" title="Pracovní plocha" values={v} small outlined />
          </div>
          <p className="tokens-overview__muted">
            Žádné gradienty ani mesh pozadí. Fotografie jen v hero veřejných stránek, stejně jako na kanoe.cz.
          </p>
        </section>

        <section className="tokens-overview__section">
          <h3>Písmo</h3>
          <div className="tokens-overview__type">
            <div className="tokens-overview__display-sample">Český pohár ve slalomu, Troja</div>
            <div className="tokens-overview__muted">
              Barlow Semi Condensed 600/700 (<code>--csk-font-display</code>): nadpisy, pořadí, čísla v hero.
            </div>
            <div>
              IBM Plex Sans 400/500/600 (<code>--csk-font-sans</code>) pro text, formuláře a tabulky. Tabulkové
              číslice, aby sloupce časů stály pod sebou.
            </div>
            <div className="tokens-overview__times">
              <span className="tokens-overview__mono">1:32.34</span>
              <span className="tokens-overview__mono" style={{ color: 'var(--csk-color-text-3)' }}>
                +0:01.53
              </span>
              <span className="tokens-overview__mono" style={{ color: 'var(--csk-color-live)' }}>
                0:46.50
              </span>
              <span className="tokens-overview__muted">
                IBM Plex Mono (<code>--csk-font-mono</code>) pro časy a rozdíly
              </span>
            </div>
          </div>
        </section>
      </div>

      <section className="tokens-overview__section">
        <h3>Stavy hodnoty, to, co dnešní systémy neumějí říct</h3>
        <div className="tokens-overview__states">
          <div className="tokens-overview__state">
            <span className="tokens-overview__badge tokens-overview__badge--official">Oficiální</span>
            Schválené vrchním rozhodčím a počtářem. Jediný stav bez označení v tabulce.
          </div>
          <div className="tokens-overview__state">
            <span className="tokens-overview__badge tokens-overview__badge--provisional">Předběžné</span>
            Hodnota se ještě může pohnout. Živé výsledky, nepotvrzené VT, průběžný žebříček.
          </div>
          <div className="tokens-overview__state">
            <span className="tokens-overview__badge tokens-overview__badge--review">V revizi</span>
            Rozhodčí hodnotu přezkoumávají. Může platit zároveň s Předběžné, proto jiná barva i tvar textu.
          </div>
          <div className="tokens-overview__state">
            <span className="tokens-overview__badge tokens-overview__badge--unknown">Neznámo</span>
            Ještě nedorazilo, nebo k dispozici není. Nikdy nula, nikdy pomlčka tvářící se jako hodnota.
          </div>
        </div>
        <div className="tokens-overview__strip">
          <span className="tokens-overview__badge tokens-overview__badge--live">
            <i className="tokens-overview__live-dot" aria-hidden="true" /> Live
          </span>
          <span className="tokens-overview__pair">
            <span className="tokens-overview__mono tokens-overview__running">0:46.50</span>
            <span className="tokens-overview__muted">běží</span>
          </span>
          <span className="tokens-overview__pair">
            <span className="tokens-overview__mono tokens-overview__stale">0:46.50</span>
            <span className="tokens-overview__muted">zastaveno, bez dat 6 s</span>
          </span>
          <span className="tokens-overview__pair tokens-overview__pair--center">
            <span className="tokens-overview__pen tokens-overview__pen--0">0</span>
            <span className="tokens-overview__pen tokens-overview__pen--2">2</span>
            <span className="tokens-overview__pen tokens-overview__pen--50">50</span>
            <span className="tokens-overview__pen tokens-overview__pen--none">·</span>
            <span className="tokens-overview__muted">branky: čistá, dotek, minutí, neposouzeno</span>
          </span>
          <span className="tokens-overview__pair tokens-overview__pair--center">
            <span className="tokens-overview__badge tokens-overview__badge--outline">DNS</span>
            <span className="tokens-overview__badge tokens-overview__badge--outline">DNF</span>
            <span className="tokens-overview__badge tokens-overview__badge--outline">DSQ</span>
            <span className="tokens-overview__muted">značky místo času, nikdy vedle něj</span>
          </span>
        </div>
      </section>

      <div className="tokens-overview__cols">
        <section className="tokens-overview__section">
          <h3>Varování nikdy neblokuje</h3>
          <div className="tokens-overview__note tokens-overview__note--warning">
            <b>Prohlídka propadla 3. 4. 2026.</b> Za splnění podmínek ručí oddíl. Přihlášku můžete odeslat,
            pořadatel varování uvidí.
          </div>
          <div className="tokens-overview__note tokens-overview__note--info">
            Pozdní přihláška: do pátku 18:00 bez penalizace (DNS-A).
          </div>
          <div className="tokens-overview__note tokens-overview__note--success">Přihláška odeslána.</div>
          <div className="tokens-overview__note tokens-overview__note--error">
            Platbu se nepodařilo spárovat, zkontrolujte variabilní symbol{' '}
            <span className="tokens-overview__mono">2026051703</span>.
          </div>
        </section>

        <section className="tokens-overview__section">
          <h3>Podium a úrovně</h3>
          <div className="tokens-overview__podium">
            {[1, 2, 3].map((rank) => (
              <div key={rank} className={`tokens-overview__podium-row tokens-overview__podium-row--${rank}`}>
                <span className="tokens-overview__rank">{rank}</span>
                <span>Závodník {rank}</span>
                <span className="tokens-overview__mono" style={{ marginLeft: 'auto' }}>
                  1:3{rank}.34
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 'var(--csk-space-2)', flexWrap: 'wrap' }}>
            <span className="tokens-overview__badge tokens-overview__badge--level">ČP</span>
            <span className="tokens-overview__badge tokens-overview__badge--level">MČR</span>
            <span className="tokens-overview__badge tokens-overview__badge--level">NKZ</span>
            <span className="tokens-overview__badge tokens-overview__badge--level">Veřejný</span>
          </div>
        </section>
      </div>

      <section className="tokens-overview__section">
        <h2>Primitiva</h2>
        <p className="tokens-overview__muted">Surová paleta. Komponenty je nepoužívají, jen sémantickou vrstvu.</p>
        <ColorTable rows={PRIMITIVES} values={v} />
      </section>

      <section className="tokens-overview__section">
        <h2>Sémantika</h2>
        <p className="tokens-overview__muted">
          Jediná barevná vrstva pro komponenty. Tmavý režim (2.x) přepíše jen ji.
        </p>
        {SEMANTIC.map((g) => (
          <React.Fragment key={g.group}>
            <h3>{g.group}</h3>
            <ColorTable rows={g.rows} values={v} />
          </React.Fragment>
        ))}
      </section>

      <section className="tokens-overview__section">
        <h2>Škály</h2>
        <h3>Velikosti písma</h3>
        <ScaleTable
          tokens={TEXT_SIZES}
          values={v}
          sample={(t) => <span style={{ fontSize: `var(${t})` }}>Troja 1:32.34</span>}
        />
        <h3>Mezery (čtyřkový rastr)</h3>
        <ScaleTable
          tokens={SPACES}
          values={v}
          sample={(t) => <span className="tokens-overview__bar" style={{ width: `var(${t})` }} />}
        />
        <h3>Rádiusy</h3>
        <ScaleTable
          tokens={RADII}
          values={v}
          sample={(t) => <span className="tokens-overview__radius" style={{ borderRadius: `var(${t})` }} />}
        />
        <h3>Ostatní</h3>
        <ScaleTable
          tokens={OTHER}
          values={v}
          sample={(t) =>
            t === '--csk-shadow-sm' ? (
              <span className="tokens-overview__shadow" style={{ boxShadow: `var(${t})` }} />
            ) : t.startsWith('--csk-font-') ? (
              <span style={{ fontFamily: `var(${t})` }}>Český pohár 1:32.34</span>
            ) : null
          }
        />
      </section>
    </div>
  );
}

const meta: Meta = {
  title: 'Tokens/Overview',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <TokensOverview />,
};
