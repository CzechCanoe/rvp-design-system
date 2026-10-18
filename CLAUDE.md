# Claude Code Instructions - CSK RVP Design System

## Projekt

Designový systém pro veřejné sekce webů ČSK: kalendář závodů, výsledky, live výsledky, registrace, profily závodníků a klubů.

**GitHub:** CzechCanoe/rvp-design-system | **Licence:** AGPL-3.0

---

## v2 „Klidná voda“: probíhá, čti nejdřív

Na `main` běží přechod na major verzi 2.0.0. Zadání je v `docs/v2/` (`README.md` → `BRIEF.md` → `TASKS.md`; `TOKENS.md`, `COMPONENTS.md`, `MIGRATION.md`, `reference/` podle tasku). Platí:

- Práce jde po issues „v2 T<N>“, větev `feat/v2-<N>-<slug>` z `main`, PR do `main`. Storybook se po každém merge nasazuje na GitHub Pages.
- Rolling release PR od Release Please („chore(main): release 2.0.0“) se **nemerguje** až do konce fáze 5. Feature PR se mergují normálně.
- Kde `docs/v2` a tenhle soubor nesouhlasí (typy, režimy, barvy níže), platí `docs/v2`. Quick Reference níže popisuje 1.x a aktualizuje se v T17.
- Tokeny jen `--csk-*`, nikdy hex v komponentách; `src/prototypes/` se v T17 maže, nové obrazovky jsou Page stories.

---

## Quick Reference

### Struktura src/
```
src/
├── components/     # React komponenty (Button, Card, Badge, ...)
├── context/        # ThemeContext (mode, theme)
├── tokens/         # CSS tokeny
│   ├── colors.css, typography.css, spacing.css, ...
│   ├── utility.css, expressive.css, embed.css  # režimy
│   ├── mode.css                                 # přepínání režimů
│   └── container-queries.css                    # CQ foundation
├── prototypes/     # Celostránkové prototypy
├── hooks/          # Custom hooks
└── styles/         # Globální styly
```

### Hlavní typy (pro stories)

```typescript
// Badge
type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
                  | 'gradient' | 'energy';
type BadgeSection = 'dv' | 'ry' | 'vt';
type BadgeVtClass = 'm' | 'a' | 'b' | 'c';  // LOWERCASE!

// Card
type CardVariant = 'surface' | 'elevated' | 'outlined' | 'gradient' | 'aesthetic';

// Button
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
                   | 'gradient' | 'gradient-energy';

// Display modes
type DisplayMode = 'utility' | 'expressive' | 'embed';
type ColorTheme = 'light' | 'dark' | 'system';
```

### Klíčové soubory
| Co | Kde |
|----|-----|
| ThemeContext | `src/context/ThemeContext.tsx` |
| Přepínání režimů | `src/tokens/mode.css` |
| Embed tokeny | `src/tokens/embed.css` |
| kanoe.cz mock | `src/components/KanoeCzContext/` |

### Příkazy
```bash
npm run dev          # Storybook dev server
npm run build        # Production build
npm run build-storybook  # Static Storybook
```

---

## Testování - Metodika

### Dostupné test scripty

| Script | Co testuje | Čas | Kdy použít |
|--------|------------|-----|------------|
| `npm run test` | Vše (1645 testů × 5 prohlížečů) | 30+ min | CI/CD, před release |
| `npm run test:quick` | Prototypy, pouze chromium | ~4-5 min | **Běžný vývoj** |
| `npm run test:proto` | Prototypy, všechny prohlížeče | ~20 min | Cross-browser check |
| `npm run test:components` | Komponenty, pouze chromium | ~2 min | Změny v komponentách |
| `npm run test:update:quick` | Update snapshots (proto/chromium) | ~4 min | **Jen CI** (workflow), lokálně ne |
| `npm run test:update:components` | Update snapshots komponent (chromium) | ~2 min | **Jen CI** (workflow), lokálně ne |

### Snapshoty: CI je jediná autorita

- **Lokálně na ARM/RPi** spouštěj `npx playwright test --project=chromium --ignore-snapshots` (funkční testy, axe, bounding boxy). ARM renderuje jinak, takže porovnání snapshotů dělá **jen CI**; snapshoty lokálně negeneruj ani necommituj.
- **Záměrná změna UI:** přidej na PR label `update-snapshots`. Workflow `update-snapshots.yml` přegeneruje chromium snapshoty (komponenty, container-queries, cross-browser), commitne je jako `test: update snapshots (CI)`, label odebere a spustí CI na novém HEAD. Počkej na ten commit (`git pull`). Prototypy: `workflow_dispatch` workflow `Update snapshots` s `prototypes: true`.
- **Label `skip-snapshots`** na PR: celý Playwright běh s `--ignore-snapshots`. `tests/prototypes.spec.ts` běží na CI vždy s `--ignore-snapshots` (do T17).
- **Tag `@prototype`:** testy, které renderují prototyp (celý `prototypes.spec.ts` a prototypové testy v `cross-browser`/`container-queries`), CI vždy pouští s `--ignore-snapshots`; label `update-snapshots` je neaktualizuje (jen `workflow_dispatch` s `prototypes: true`).
- **Karanténa:** známé předexistující faily jsou v `QUARANTINE` v `tests/config.ts` (klíč = názvy describe + test, owner = v2 task, který komponentu přetokenuje/přepíše/smaže); CI je hlásí jako skipped. Task, který sáhne na komponentu v karanténě, musí její záznamy odstranit. Nové faily způsobené záměrně rozbitým stylováním mezi T1 a T3 lze přidat s `owner: 'T3'`; T17 seznam vyprázdní.
- **Diff obrázky** jsou v artifactu `playwright-report` daného runu (jen při selhání); do PR dej odkaz na run/artifact.

### Správný postup při vývoji

1. **Po změně kódu:** Spusť `npm run test:quick`
2. **Pokud test selže:**
   - **Prohlédni diff obrázek** (`test-results/*/...-diff.png`)
   - Rozhodni, zda je změna:
     - **Záměrná** → update snapshots
     - **Nezáměrná regrese** → oprav kód
     - **Flaky (rendering variance)** → zvyš `maxDiffPixels` v `tests/config.ts`
3. **NIKDY nezvyšuj toleranci bez kontroly diffu!**

### Tolerance (maxDiffPixels)

- **Výchozí komponenty:** 30 px
- **Výchozí prototypy:** 80 px
- **Animované prvky** (LiveIndicator, Skeleton): 100+ px
- **Dynamický obsah** (countdown): 1500+ px
- **Minor rendering variance** (fonty, ikony): 500 px

### Konfigurace

- `tests/config.ts` - definice komponent a prototypů s tolerancemi
- `playwright.config.ts` - projekty (prohlížeče), timeouty

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

1. Během v2: přečti `docs/v2/README.md` a issue svého tasku. `PLAN.md` je stav 1.x a přepíše se v T17.
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
| `PLAN.md` | Plán 1.x, historický | Jen při diagnostice |
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
