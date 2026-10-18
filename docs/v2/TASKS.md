# Rozpad práce v2 na issues

Každý task = jedno issue + jedna větev `feat/v2-<N>-<slug>` z `v2-klidna-voda` + PR zpět. Task je napsaný tak, aby ho zvládl agent bez kontextu konverzace: přečte `README.md`, `BRIEF.md`, soubory uvedené u tasku, udělá, ověří akceptační kritéria, do PR dá příkazy a výsledky, do `DEVLOG.md` přidá záznam.

Pořadí je závazné jen mezi fázemi; uvnitř fáze lze paralelně, pokud není uvedená závislost.

## Fáze 0: příprava (1 task)

**T0 Větev, lint pravidlo, kostra testů**
- Založit `v2-klidna-voda` z `main` (hotovo), přidat do CI job pro tuto větev (stejný workflow, jen `branches`).
- Skript `scripts/check-no-hex.js`: selže, když `src/components/**/*.css` nebo `src/styles/**` obsahuje `#[0-9a-f]{3,8}` mimo `src/tokens/`. Zapojit do `npm run lint`.
- Přidat Vitest + `@testing-library/react` (devDependencies), `npm run test:unit`, jeden smoke test.
- AK: CI zelené na větvi; `npm run lint` padá na záměrně vloženém hexu v komponentě.

## Fáze 1: tokeny a písma (3 tasky, T1 → T2 → T3)

**T1 Nové tokeny** (`TOKENS.md`)
- Přepsat `src/tokens/`: `primitives.css`, `semantic.css`, `typography.css`, `spacing.css`, `radius.css`, `shadows.css`, `embed.css`, `index.css`. Smazat `utility.css`, `expressive.css`, `aesthetic.css`, `gradients.css`, `mode.css`, `effects.css`, `transitions.css` (přechody jako 2 tokeny v `semantic.css`), `container-queries.css` ponechat.
- Každá proměnná `--csk-*`. Primitiva a sémantika podle `TOKENS.md`; chybějící sémantické názvy doplnit a do `TOKENS.md` zapsat.
- `ThemeContext`: odstranit `mode`, ponechat `theme: 'light' | 'system'` (dark zatím mapuje na light), `embed: boolean` → `data-mode="embed"`.
- AK: `dist/rvp-design-system.css` obsahuje jen `--csk-*` proměnné (skript v PR to spočítá); build i typecheck projdou; story `Tokens/Overview` ukazuje paletu a stavové barvy jako `reference/Main.html`.

**T2 Písma**
- Stáhnout Barlow Semi Condensed 500/600/700, IBM Plex Sans 400/500/600, IBM Plex Mono 400/600 (woff2, latin + latin-ext, licence OFL do `public/fonts/LICENSES`), odstranit Inter a JetBrains Mono.
- `@font-face` v `src/styles/fonts.css`, `font-display: swap`, `font-variant-numeric: tabular-nums` na `.csk-table`, `.csk-results-table`, `.csk-time`.
- AK: Storybook ukazuje nová písma bez FOUT na reload; `dist/` neobsahuje Inter.

**T3 Codemod a přetokenování základu**
- Skript `scripts/codemod-tokens.mjs` s mapou z `TOKENS.md`, spustit nad `src/components/**`.
- Komponenty ze sekce 1 `COMPONENTS.md` s verdiktem **Z**: jen přetokenovat, odstranit zakázané varianty, snapshoty přegenerovat.
- AK: `npm run lint` (včetně check-no-hex) projde; `npm run test:components` projde s novými snapshoty; v PR screenshot každé změněné komponenty.

## Fáze 2: základ a stavy (5 tasků, paralelně po T3)

**T4 Button, Card, Badge, Tabs, Pills, SearchInput, Avatar** (verdikt U) podle tabulky v `COMPONENTS.md` §1. Tabs: `variant="nav"`, `overflow="carousel"` s maskou, šipkami, doscrollováním aktivního, bez panelů; story s 8 třídami na 390 px.
- AK: stories pro každou variantu; `:global` hacky z live-mini (`ClassTabs.module.css`, `EventHeader.module.css`) se dají smazat, což se ověří ručně v live-mini (jen zpráva v PR, bez commitu tam).

**T5 StatusBadge, MarkBadge, PenaltyChip, GateGrid, BibBadge, Notice, StatTile** (`COMPONENTS.md` §2).
- AK: story `States/Overview` reprodukuje spodní pás z `reference/Main.html`; axe bez chyb; `prefers-reduced-motion` vypne pulz u `live`.

**T6 TimeValue, RunningTime, DataAge, Clock**
- `src/clock/`: typ `Clock`, `createBrowserClock()`, `createTestClock()` (ovládání `advance(ms)`, `flushFrames()`).
- `RunningTime` tiká přes `clock.requestFrame`, snapne na každou novou hodnotu, zmrzne 3 s po `receivedAt` (měřeno `clock.now()`), zobrazí `stale` s věkem.
- Unit testy s `createTestClock()`: tiká, mrzne po 3 s, po nové hodnotě se odmrazí, nikdy nevolá `Date.now`.
- AK: testy zelené; story s přepínáním stavů.

**T7 SegmentedControl, StarButton, FavoritesToggle, TableToolbar**
- AK: popisky `nowrap`, zalomení celého segmentu ověřené story na 360 px; dotykové plochy 44 px (Playwright měří bounding box).

**T8 Header, Subbar, Breadcrumbs, PageTitle, BottomBar, EventHeader, PageLayout**
- `Header variant="site" | "satellite" | "app"`, `Subbar`, `BottomBar` (jen mobil), `EventHeader` s `condensed`.
- AK: story `Layout/Tribuna` = horní část `reference/Zavod.html`; `Layout/LiveMobile` = horní část `reference/Live1.html`; `Layout/Urad` = `reference/Prihlaska.html` hlavička.

## Fáze 3: živé výsledky (4 tasky; T9 po T5–T7, zbytek paralelně po T9)

**T9 ResultsTable v2 + RunDetail** (`COMPONENTS.md` §3)
- Typy `Observed<T>`, `ResultRow`, `RunCell`, `Mark` exportované z DS.
- Mobil a desktop sloupce podle reference `Live1.html` / `Live2.html` / `Live4.html` a `Zavod.html`; container query, ne jen media query.
- Stories: BR 8 řádků, jednojízdový, kategorie (pořadí v kategorii + „3. celk.“), na trati v řádku, V revizi, DNS/DNF/NR, rozbalený řádek mobil i desktop, 100 řádků (výkon).
- AK: žádné zalamování v buňkách časů (test na 360 px); detail přes celou šířku bez odsazení; snapshoty mobil 390 + desktop 1280.

**T10 OnCoursePanel + OnCourseRider**
- Stavy `at-start` / `running` / `finished-pending`, `stale` celého panelu, `timeToBeat`, `featured`; mobil seznam, desktop 3 sloupce.
- AK: story se 3 jezdci a story se 6 jezdci (nic se neskrývá, panel roste); story `stale` = `reference/Live5.html`.

**T11 StartlistTable + ProgramList**
- AK: startovka na 390 px nepřetéká (sloupec Start 1./2. pod sebou); program s dvěma běžícími fázemi = `reference/Live6.html`.

**T12 Page stories Live**
- `Live/Running`, `Live/Expanded`, `Live/Startlist`, `Live/Official`, `Live/Disconnected`, `Live/Program` složené jen z DS komponent, bez lokálního CSS kromě layoutu stránky.
- AK: vizuální shoda s `reference/Live1–6.html` v rozumné toleranci (80 px), rozdíly vyjmenované v PR.

## Fáze 4: tribuna, úřad, profil (4 tasky, paralelně po fázi 2)

**T13 WeekendCalendar + DeadlineBadge** → story `Calendar/Season` = `reference/Kalendar.html`.
**T14 EntryTable + ProposalList + SummaryCard** → story `Entry/ClubEntry` = `reference/Prihlaska.html`; C2 jako dvouřádková loď; varování neblokuje.
**T15 ProfileHeader + SeasonSparkline + RivalsList** → stories `Athlete/PublicProfile` (`Profil.html`) a `Athlete/MobileProfile` (`ProfilMobil.html`).
**T16 Event/Detail page story** = `reference/Zavod.html` z komponent fází 2–3.

## Fáze 5: úklid a release (3 tasky, sériově)

**T17 Odstranit 1.x**
- Smazat komponenty s verdiktem X, `src/prototypes/`, utility třídy, staré stories, staré snapshoty; `tests/config.ts` přepsat na nové story ID; `npm run test` celé zelené.
- `docs/COMPONENT_API.md` přegenerovat; `CLAUDE.md`, `README.md`, `DESIGN_PRINCIPLES.md`, `PLAN.md` podle `MIGRATION.md`.

**T18 Hledání mezer nad c123-live-mini** (suchý test, bez commitu do live-mini; není to migrace, viz `MIGRATION.md` „Kdy migrovat“)
- Lokálně nainstalovat DS z `v2-klidna-voda` (`npm pack` → `npm i ../rvp-design-system-2.0.0.tgz` v live-mini na dočasné větvi), přepsat `ResultList`, `ClassTabs`, `OnCoursePanel`, `EventHeader` na v2 a zapsat do issue v DS, co chybělo. Chybějící věci se stanou T19.
- AK: seznam mezer v issue; žádná `:global` třída nezůstala nutná.

**T19 Doplnění mezer z T18 a merge do main**
- Opravit mezery, squash merge do `main` s `Release-As: 2.0.0` (viz `MIGRATION.md`), release PR, publish.

## Odhad

Fáze 0–1: 1 agent-den. Fáze 2: 3 paralelní agenti, 1–2 dny. Fáze 3: 2 agenti, 2 dny. Fáze 4: 2 agenti, 1–2 dny. Fáze 5: 1 agent + maintainer, 1–2 dny. Snapshoty v Playwright (5 prohlížečů) jsou nejdražší část CI; pro větev stačí chromium, celý běh až před merge.
