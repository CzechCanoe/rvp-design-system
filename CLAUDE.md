# Claude Code Instructions - CSK RVP Design System

## Projekt

Designový systém pro veřejné sekce webů ČSK: kalendář závodů, výsledky, live výsledky, registrace, profily závodníků a klubů.

**GitHub:** CzechCanoe/rvp-design-system | **Licence:** AGPL-3.0

---

## v2 „Klidná voda“

Na `main` je major verze 2.0.0 (vydání po T19). Zadání a stav jsou v `docs/v2/` (`README.md` → `BRIEF.md` → `TASKS.md`; `TOKENS.md`, `COMPONENTS.md` = as-built popis komponent, `MIGRATION.md` = breaking changes, `reference/` = vzhled obrazovek). Platí:

- Práce jde po issues „v2 T<N>“, větev `feat/v2-<N>-<slug>` z `main`, PR do `main`. Storybook se po každém merge nasazuje na GitHub Pages.
- Rolling release PR od Release Please („chore(main): release 2.0.0“) se **nemerguje** až do konce T19. Feature PR se mergují normálně.
- Tokeny jen `--csk-*`, nikdy hex v komponentách (`npm run lint` to hlídá). Žádné režimy `utility` / `expressive`, gradienty ani prototypy: obrazovky jsou Page stories (`src/stories/`).
- Čas jen přes `Clock` (`src/clock/`), v komponentách nikdy `Date.now()` ani `setTimeout`.

---

## Quick Reference

### Struktura src/
```
src/
├── components/     # React komponenty (Button, ResultsTable, StatusBadge, ...), každá ve vlastní složce
├── stories/        # Page stories (Live, Event, Calendar, Entry, Athlete), Tokens/Overview, sdílené helpery
├── context/        # ThemeContext (theme, embed)
├── clock/          # Clock, createBrowserClock, createTestClock, ClockProvider
├── types/          # Observed<T>
├── hooks/          # interní hooky (useIsomorphicLayoutEffect), nejsou veřejné API
├── tokens/         # CSS tokeny --csk-*
│   ├── primitives.css, semantic.css            # paleta, sémantická vrstva
│   ├── typography.css, spacing.css, radius.css, shadows.css
│   ├── embed.css                               # jediný režim: data-mode="embed"
│   └── container-queries.css                   # CQ foundation
└── styles/         # Globální styly a fonty
```

### Hlavní typy (pro stories)

```typescript
// Stavy hodnot a čísla
type StatusBadgeState = 'official' | 'provisional' | 'review' | 'unknown' | 'live' | 'stale';
type Mark = 'DNS' | 'DNS-A' | 'DNS-B' | 'DNF' | 'DSQ' | 'DSQ-R' | 'DQB' | 'CAP' | 'RAL' | 'NR';
type TimeValueFormat = 'seconds' | 'clock';  // clock = m:ss.d (sjezd)
type Observed<T> = { state: 'known'; value: T; provisional?: boolean }
                 | { state: 'not-yet' } | { state: 'unavailable'; reason?: string };

// Badge
type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
                  | 'level' | 'outline' | 'live';
type BadgeSection = 'dv' | 'ry' | 'vt';
type BadgeVtClass = 'm' | 'a' | 'b' | 'c';  // LOWERCASE!

// Card, Button
type CardVariant = 'surface' | 'outlined';   // + tone="default" | "highlight"
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
// ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps (href / as="a" → <a>)

// Layout a režimy
type PageLayoutVariant = 'tribuna' | 'urad' | 'embed';
type HeaderVariant = 'site' | 'satellite' | 'app';
type ColorTheme = 'light' | 'system';        // v2.0 kreslí jen světlé téma
// <ThemeProvider embed> nastaví data-mode="embed"; na tmavém pásu platí data-tone="on-dark"
```

Úplný přehled props je v `docs/COMPONENT_API.md` (generováno, viz níže).

### Klíčové soubory
| Co | Kde |
|----|-----|
| ThemeContext | `src/context/ThemeContext.tsx` |
| Tokeny (paleta, sémantika) | `src/tokens/primitives.css`, `src/tokens/semantic.css`; popis v `docs/v2/TOKENS.md` |
| Embed tokeny | `src/tokens/embed.css` |
| Clock | `src/clock/` (`Clock.mdx` = pravidla) |
| Exporty | `src/index.ts`, `src/components/index.ts` |
| kanoe.cz mock (jen dekorátor embed stories) | `src/components/KanoeCzContext/` |
| Konfigurace vizuálních testů | `tests/config.ts` |
| API komponent | `docs/COMPONENT_API.md` (generované) |

### Příkazy
```bash
npm run dev               # Vite dev server
npm run storybook         # Storybook dev server (:6006)
npm run build             # Production build (tsc + vite)
npm run build-storybook   # Static Storybook
npm run lint              # ESLint + check-no-hex
npm run typecheck         # tsc --noEmit
npm run test:unit         # Vitest
npm run docs:api          # přegeneruje docs/COMPONENT_API.md (po každé změně API komponent)
```

**Po změně API komponenty** (props, typy, JSDoc) spusť `npm run docs:api` a commitni výsledek; `npm run docs:api -- --check` ověří, že je soubor aktuální. `docs/v2/COMPONENTS.md` popisuje záměr a doménová pravidla, ne tabulky props.

---

## Testování - Metodika

### Dostupné test scripty

| Script | Co testuje | Čas | Kdy použít |
|--------|------------|-----|------------|
| `npm run test` | Vše (jen light, jen chromium; na ARM s `--ignore-snapshots`) | ~3 min | CI/CD, před release |
| `npm run test:components` | Komponenty (`components.spec.ts`), chromium | ~1-2 min | Změny v komponentách |
| `npm run test:update` | Update snapshots všech specs (chromium) | ~3 min | **Jen CI** (workflow), lokálně ne |

### Snapshoty: CI je jediná autorita

- **Lokálně na ARM/RPi** spouštěj `npx playwright test --project=chromium --ignore-snapshots` (funkční testy, axe, bounding boxy). ARM renderuje jinak, takže porovnání snapshotů dělá **jen CI**; snapshoty lokálně negeneruj ani necommituj.
- **Záměrná změna UI:** přidej na PR label `update-snapshots`. Workflow `update-snapshots.yml` přegeneruje chromium snapshoty všech specs, commitne je jako `test: update snapshots (CI)`, label odebere a vždy (i bez změn snapshotů) spustí CI na HEAD. Počkej na ten commit (`git pull`). Bot commit (GITHUB_TOKEN) spustí `pull_request` run, který skončí `action_required` (bot = first-time contributor) a PR ho nezobrazí; výsledek dispatchnutého CI se proto hlásí jako commit status `CI (dispatched run)` (job `report-status` v `ci.yml`) a PR ho ukáže. Vlastní finální commit po commitu bota není potřeba.
- **Změna pod prahem porovnání** (např. jemná úprava barvy tokenu): label přepíše jen snapshoty, které porovnání neprojdou (`--update-snapshots=changed`), takže by baseline zůstala se starou barvou. Pak dispatchni workflow ručně s `mode=all`: `gh workflow run update-snapshots.yml --ref <větev> -f mode=all` (přepíše všechny snapshoty; výchozí `mode` je `changed`, label vždy `changed`). Commit bota stáhni (`git pull`) a pár PNG zkontroluj.
- **Playwright na PR** běží jen při změně `src/`, `tests/`, `.storybook/`, `package*.json`, `playwright.config.ts` nebo `.github/workflows/` (job `changes` v `ci.yml`); dispatchnuté běhy vždy. Lint, typecheck, unit testy a build běží vždy.
- **Jen light, snapshoty jen chromium:** v2 kreslí pouze světlé téma; žádné `-dark` varianty. PR CI pouští `--project=chromium`. **Plný běh před release:** dispatchni CI s `browsers=all` (`gh workflow run ci.yml --ref <větev> -f browsers=all`); firefox, webkit, mobile-chrome a mobile-safari běží s `--ignore-snapshots` (jen funkční testy a axe), jejich snapshoty se neudržují.
- **Karanténa:** známé předexistující faily lze zapsat do `QUARANTINE` v `tests/config.ts` (klíč = názvy describe + test, owner = v2 task); CI je hlásí jako skipped. Seznam je nyní prázdný; task, který sáhne na komponentu v karanténě, musí její záznamy odstranit.
- **Diff obrázky** jsou v artifactu `playwright-report` daného runu (jen při selhání); do PR dej odkaz na run/artifact.

### Správný postup při vývoji

1. **Po změně kódu:** Spusť `npm run test:components` (nebo scoped `npx playwright test --project=chromium --ignore-snapshots <soubor>`)
2. **Pokud test selže:**
   - **Prohlédni diff obrázek** (`test-results/*/...-diff.png`)
   - Rozhodni, zda je změna:
     - **Záměrná** → update snapshots
     - **Nezáměrná regrese** → oprav kód
     - **Flaky (rendering variance)** → zvyš `maxDiffPixels` v `tests/config.ts`
3. **NIKDY nezvyšuj toleranci bez kontroly diffu!**

### Tolerance (maxDiffPixels)

- **Výchozí komponenty:** 30 px
- **Page stories a layouty** (`pageStories`, `layoutStories`): 80 px
- **Animované prvky** (StatusBadge live, Skeleton): 100+ px
- **Dynamický obsah** (countdown): 1500+ px
- **Minor rendering variance** (fonty, ikony): 500 px

### Konfigurace

- `tests/config.ts` - definice komponent a layout stories s tolerancemi
- `playwright.config.ts` - projekty (chromium + firefox/webkit/mobile pro plný běh), timeouty

---

## Důležitá pravidla

1. **Read-only:**
   - `../csk-rvp-analysis/` - analýza systémů ČSK
   - `resources-private/` - zdroje stávajících systémů

---

## Jazyk

- User communication: **Czech**
- Documentation (README, docs): **Czech**
- Code, comments, commit messages: **English**

---

## Proces

### Před zahájením práce

1. Přečti `PLAN.md` (stav v2, krátký), `docs/v2/README.md` a issue svého tasku.
2. Pokud je krok příliš velký, rozděl na menší části

### Během práce

1. **Implementace:** Pracuj v blocích (~70 % kontextu)
2. **Průběžně:** rozhodnutí mimo zadání piš do PR do sekce „Rozhodnuto bez maintainera“
3. **Mimo rozsah tasku nic neměň**; chybějící token doplň do `src/tokens/` a `docs/v2/TOKENS.md`

### Po dokončení bloku/iterace

1. **Issue a PR:** akceptační kritéria z `docs/v2/TASKS.md` odškrtnutá v PR, příkazy a exit kódy v popisu
2. **DEVLOG.md:** **POUZE APPEND** (viz níže)
3. **Commit:** konvenční, squash merge přes PR

### DEVLOG.md - pravidla

⚠️ **DEVLOG.md se NEČTE na začátku iterace!**

- Slouží jako append-only log pro historii
- Čte se pouze při diagnostice problémů
- Po každé iteraci přidej záznam na konec pomocí:

```bash
cat >> DEVLOG.md << 'EOF'

---

## YYYY-MM-DD - Fáze X.Y: Popis

### Dokončeno
- [x] Úkol 1
- [x] Úkol 2

### Problémy a řešení
1. **Problém:** popis
   **Řešení:** jak vyřešeno

### Poznámky
Důležitá rozhodnutí, úkoly na příště
EOF
```

---

## Soubory projektu

| Soubor | Účel | Kdy číst |
|--------|------|----------|
| `docs/v2/` | Zadání v2 (brief, tokeny, komponenty, tasky) | **Vždy na začátku během v2** |
| `PLAN.md` | Stav v2 a backlog 2.1 (krátký) | **Vždy na začátku** |
| `DESIGN_PRINCIPLES.md` | Principy designu v2 | Při návrhu nové komponenty |
| `docs/COMPONENT_API.md` | API komponent (generované) | Při práci s props |
| `PLAN-history.md` | Plán 1.x, historický | Jen při diagnostice |
| `CLAUDE.md` | Pokyny + quick reference | Vždy (automaticky) |
| `DEVLOG.md` | Historie práce | **Jen při diagnostice** |
| `PROJECT.md` | Přehled projektu | Při potřebě kontextu |

---

## Commit Message Format

```
feat: add penalty grid with keyboard navigation
fix: correct gate grouping logic
refactor: extract WebSocket logic to hook
docs: update component API documentation
```

---

## Versioning & Releases

Tento projekt používá **Release Please** (commit-based) pro automatické verzování. **Neměň ručně `package.json` version ani `CHANGELOG.md`** — Release Please obojí spravuje přes rolling release PR.

### Jak to funguje

1. Každý push do `main` spustí `.github/workflows/release-please.yml`.
2. Release Please drží otevřený **release PR** (label `autorelease: pending`) s přehledem nahromaděných změn a navrženou další verzí.
3. Merge release PR vytvoří:
   - Commit `chore(main): release X.Y.Z` v `main`
   - Git tag `vX.Y.Z`
   - GitHub Release s vygenerovaným CHANGELOGem
   - Spustí `publish.yml` → publikuje `@czechcanoe/rvp-design-system@X.Y.Z` na GitHub Packages

### Commit typy a pravidla bumpu

| Commit typ | Bump | V CHANGELOGu |
|---|---|---|
| `feat:` | **minor** | ✓ Features |
| `fix:` / `perf:` | **patch** | ✓ Bug Fixes / Performance |
| `feat!:` nebo `BREAKING CHANGE:` | **major** | ✓ Features |
| `revert:` / `docs:` | žádný | ✓ Reverts / Documentation |
| `chore:` / `ci:` / `test:` / `style:` / `refactor:` / `build:` | **žádný** | skryté |
| `chore(deps):` / `chore(deps-dev):` (dependabot) | **žádný** | skryté |

### Pravidla pro agenty připravující PR

0. **Během v2:** release PR na 2.0.0 nechat otevřený až do T19; breaking změny značit `feat!:`. Merge release PR dělá jen maintainer.

1. **Vždy používat conventional commits** (`feat:`, `fix:`, `chore:`...). Release Please podle prefixu určí bump.
2. **Neměnit `package.json` version ani `CHANGELOG.md`** v běžných PR — spravuje je Release Please.
3. **Nemergnout release PR společně s feature PR** — release PR musí být v release cyklu poslední.
4. **PR title by měl zachovat commit prefix** (u squash merge dbát na to, ať výsledný commit zůstává conventional).
5. **Nekomitovat stav skillů** — `.superpowers/` a `.claude/` jsou lokální per-session stav. Preferovat `git add <file>` před `git add -A`.
6. **Konzumenti aktualizují deps samostatně** — po vydání nové DS verze je bump `^X.Y.0` v konzumujících projektech (c123-live-mini, ...) samostatný `chore:` commit v tamním repu.

### Vynucený přechod na konkrétní verzi

Pro vynucený skok verze (např. major jump) přidej do commitu v daném release cyklu footer:

```
Release-As: 2.0.0
```

---

## kanoe.cz kontext

- **Tech stack:** Bootstrap 4, jQuery 3.1.1, Joomla, DataTables
- **Barvy (v2):** svazová modrá `#004899` (logo), akční modrá `#2a66b4` (kanoe.cz navigace), červená `#e42313` jen LIVE a chyby; viz `docs/v2/TOKENS.md`. Hodnota `#1176a6` z 1.x se na kanoe.cz nepoužívá.
- **Grid:** 12-column Bootstrap
- **Embed komponenty:** používají `data-mode="embed"` pro neutrální styling
