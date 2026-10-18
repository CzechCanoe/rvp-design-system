# Tokeny v2

Cíl: jeden prefix, jedna paleta, žádné režimy kromě `embed`. Zdroj hodnot: `reference/rvp.css` (`:root` blok) a `reference/Main.html` (vizuální přehled).

## Stav v 1.x, kvůli kterému je to major

- `dist/rvp-design-system.css` definuje 1 098 neprefixovaných proměnných (`--color-*`, `--spacing-*`, `--text-*`, `--radius-*`, `--shadow-*`, `--gradient-*`) a jen 43 s prefixem `--csk-*` (FilterPills, SectionHeader, StatsBar).
- `c123-live-mini` používá v CSS 143 odkazů na `--csk-color-text-tertiary`, `--csk-color-primary`, `--csk-font-size-sm` atd., které v dist nejsou; běží na fallbackových hodnotách za čárkou. Konzument tedy dnes není napojený na tokeny DS.
- Režimy `utility` / `expressive` (`mode.css`, `utility.css`, `expressive.css`, `aesthetic.css`, `gradients.css`) zdvojují typografii a spacing a nikdo je nepřepíná.
- Primární barva `#1176a6` v `colors.css` neodpovídá kanoe.cz (web používá `#3274c5` v navigaci, logo `#004899` / `#e42313`).

## Pravidla v2

1. Každá proměnná začíná `--csk-`. Žádná jiná se neexportuje.
2. Dvě vrstvy: **primitiva** (`--csk-blue-700`, `--csk-gray-300`) a **sémantika** (`--csk-color-text`, `--csk-color-surface`). Komponenty používají jen sémantiku.
3. Režimy: jen `[data-mode="embed"]`, který přepisuje sémantiku (menší rádiusy, bez stínů, systémové písmo volitelně). `utility` / `expressive` / `aesthetic` / `gradients` se mažou včetně souborů.
4. Tmavý režim se v 2.0 nekreslí, ale sémantická vrstva je postavená tak, aby `[data-theme="dark"]` přepsal jen ji.
5. Hodnoty se neduplikují do komponent. Lint pravidlo (stylelint `declaration-property-value-disallowed-list` nebo jednoduchý skript v CI) zakáže hex v `src/components/**/*.css`.

## Primitiva

| Token | Hodnota | Původ |
|---|---|---|
| `--csk-navy` | `#004899` | logo ČSK (SVG, `fill`) |
| `--csk-blue` | `#2a66b4` | kanoe.cz navigace (`#3274c5`), ztmaveno pro kontrast 4.5:1 na bílé |
| `--csk-blue-dark` | `#1d4f8f` | hover / aktivní |
| `--csk-blue-100` | `#e8f0fa` | podložky, aktivní položky |
| `--csk-blue-200` | `#c9dbf1` | rámy zvýrazněných karet |
| `--csk-red` | `#e42313` | logo ČSK; jen LIVE, chyba, běžící čas |
| `--csk-red-100` | `#fdecea` | podložka chyby, běžící řádek v programu |
| `--csk-ink` | `#1b1f26` | text |
| `--csk-ink-2` | `#444b55` | vedlejší text |
| `--csk-ink-3` | `#6b7280` | popisky, meta (4.6:1 na bílé) |
| `--csk-line` | `#d9dee5` | rámy |
| `--csk-line-2` | `#eceff3` | oddělovače řádků |
| `--csk-ground` | `#ffffff` | plocha tribuny |
| `--csk-ground-2` | `#f4f6f8` | pracovní plocha, podklad detailu |
| `--csk-ground-3` | `#eaeef2` | segmenty, neutrální chipy |
| `--csk-green` / `--csk-green-100` | `#1f7a3a` / `#e4f3e8` | Oficiální, OK |
| `--csk-amber` / `--csk-amber-100` | `#9a5b00` / `#fff3dc` | Předběžné, varování |
| `--csk-violet` / `--csk-violet-100` | `#5b3fa6` / `#efeafa` | V revizi |
| `--csk-gray` / `--csk-gray-100` | `#8a919b` / `#f1f2f4` | Neznámo, stale |
| `--csk-dv` / `--csk-ry` / `--csk-vt` | `#1d4f8f` / `#1f7a3a` / `#b0471a` | sekce divoká voda, rychlost, turistika |
| `--csk-gold` / `--csk-silver` / `--csk-bronze` | `#d4a72c` / `#9aa5b1` / `#c0712f` | podium (proužek řádku); text pořadí `#8a6a00` / `#5f6b78` / `#8a4b1f` |

## Sémantika (výběr; úplný seznam vznikne ve fázi 1)

```
--csk-color-text, --csk-color-text-2, --csk-color-text-3
--csk-color-surface, --csk-color-surface-2, --csk-color-surface-3
--csk-color-border, --csk-color-border-2
--csk-color-brand (navy), --csk-color-action (blue), --csk-color-action-hover
--csk-color-live (red)
--csk-color-state-official / -provisional / -review / -unknown  (+ -bg varianty)
--csk-color-section-dv / -ry / -vt
--csk-color-podium-1 / -2 / -3
--csk-font-sans, --csk-font-display, --csk-font-mono
--csk-text-xs 11px, -sm 13px, -md 14px, -base 15px, -lg 17px, -xl 19px, -2xl 26px, -3xl 40px
--csk-space-1 4px … -8 32px (čtyřkový rastr)
--csk-radius-sm 4px, -md 6px, -lg 10px, -pill 999px
--csk-shadow-sm (jediný stín, jen pro Modal, Dropdown, Toast)
--csk-tap 44px
```

## Typografie

| Role | Písmo | Řezy | Poznámka |
|---|---|---|---|
| display | Barlow Semi Condensed | 500, 600, 700 | nadpisy, pořadí, velká čísla; zúžené jako Roboto Condensed na kanoe.cz |
| sans | IBM Plex Sans | 400, 500, 600 | text, tabulky, formuláře; `font-variant-numeric: tabular-nums` globálně v tabulkách |
| mono | IBM Plex Mono | 400, 600 | časy, rozdíly, startovní časy |

Fonty self-hosted v `public/fonts/` jako dnes Inter a JetBrains Mono (woff2, subset latin-ext). Inter a JetBrains Mono se odstraní.

## Mapování 1.x → 2.0 (pro codemod ve fázi 1)

| 1.x | 2.0 |
|---|---|
| `--color-primary-500` | `--csk-color-action` |
| `--color-primary-700` | `--csk-color-brand` |
| `--color-neutral-0/50/100` | `--csk-color-surface / -2 / -3` |
| `--color-neutral-700/900` | `--csk-color-text-2 / -text` |
| `--color-neutral-500` | `--csk-color-text-3` |
| `--color-neutral-200/300` | `--csk-color-border-2 / -border` |
| `--color-success-*`, `--color-warning-*`, `--color-error-*`, `--color-info-*` | `--csk-color-state-*`, `--csk-color-live` |
| `--color-energy-*`, `--gradient-*`, `--mesh-*` | bez náhrady, smazat |
| `--text-util-*`, `--text-expr-*`, `--spacing-util-*`, `--spacing-expr-*` | `--csk-text-*`, `--csk-space-*` |
| `--font-family-sans` (Inter) | `--csk-font-sans` (IBM Plex Sans) |
| `--font-family-display` | `--csk-font-display` (Barlow Semi Condensed) |
| `--font-family-mono` (JetBrains Mono) | `--csk-font-mono` (IBM Plex Mono) |
| `--radius-sm/md/lg/xl/full` | `--csk-radius-sm/md/lg/lg/pill` |
| `--shadow-sm/md/lg/xl` | `--csk-shadow-sm` (ostatní smazat) |

Názvy, které `c123-live-mini` už dnes používá (`--csk-color-text-tertiary`, `--csk-color-bg-secondary`, `--csk-font-size-sm`…), se **nepřebírají**; live-mini se migruje na nová jména ve fázi 5 (`MIGRATION.md`).
