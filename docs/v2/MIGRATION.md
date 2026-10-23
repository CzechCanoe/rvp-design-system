# Migrace a release 2.0.0 (as-built)

Breaking changes níže jsou porovnané se zveřejněnou verzí **1.2.0** (`git diff v1.2.0..main -- src`). Popis nových komponent je v `COMPONENTS.md`, úplné API v `docs/COMPONENT_API.md`. Zahrnuje i změny z T19 (#84: Button `href`, `DocumentList`, `ResultsPanel`, `TimeValue format`, smazaný `LiveIndicator`, token `--csk-ink-3`, …).

## Verze a větve

- Vývoj v2 běží přímo nad `main`: větve `feat/v2-<N>-<slug>` podle `TASKS.md`, PR do `main`, squash merge, konvenční commity. Breaking změny jako `feat!:` nebo s footerem `BREAKING CHANGE:`.
- Každý merge do `main` spustí CI a nasazení Storybooku na GitHub Pages. Tag `v1.2.0` a balíček 1.2.0 na GitHub Packages zůstávají nedotčené; `c123-live-mini` na `legacy-2026` je pinovaný lockfilem.
- Release Please drží rolling release PR na 2.0.0 (config má `bump-minor-pre-major: false`, takže `feat!:` znamená major). **Release PR (#45) se nemerguje do konce T19.** Jeho merge vytvoří tag `v2.0.0`, GitHub Release a spustí `publish.yml`. Poslední commit T19 nese footer `Release-As: 2.0.0`.
- Mezi fázemi byl `main` v přechodném stavu (část komponent v2, část 1.x). Kdo potřebuje stabilní 1.x, instaluje `@czechcanoe/rvp-design-system@1.2.0`.
- Řada 1.x se po 2.0.0 neudržuje.

## Breaking changes (do CHANGELOG a do PR popisu)

### Globální

1. **Tokeny**: všechny CSS proměnné jsou `--csk-*`; neprefixované `--color-*`, `--spacing-*`, `--text-*`, `--radius-*`, `--shadow-*`, `--gradient-*`, `--font-family-*` neexistují. Mapování 1.x → 2.0 je v `TOKENS.md`. Kdo v aplikaci používal `var(--color-…)`, musí přejít na sémantické `--csk-color-*`.
2. **Režimy**: `data-mode="utility"` a `"expressive"` zrušeny, zůstává jen `data-mode="embed"`. Soubory `utility.css`, `expressive.css`, `aesthetic.css`, `gradients.css`, `effects.css`, `mode.css` jsou pryč.
3. **ThemeProvider / useTheme**: pryč `defaultMode`, `modeStorageKey`, `mode`, `setMode`, `toggleMode`, `toggleTheme`, typ `DisplayMode`. Nově `embed?: boolean` (nastaví `data-mode="embed"`). `ColorTheme` je `'light' | 'system'` (uložené `'dark'` se mapuje na `light`; tmavé téma se ve 2.0 nekreslí). `useTheme()` vrací `theme`, `resolvedTheme`, `setTheme`, `embed`.
4. **Písma**: Inter a JetBrains Mono nahrazeny Barlow Semi Condensed, IBM Plex Sans a IBM Plex Mono. Woff2 soubory jsou v `dist/fonts/` (`exports` má nově `./fonts/*`), `@font-face` je v CSS balíčku. Aplikace, které si Inter nahrávaly samy a spoléhaly na `--font-family-sans`, musí přejít na `--csk-font-sans`.
5. **Utility třídy** `csk-reveal*` a `csk-mesh-bg*` zrušené.
6. **Prototypy** `src/prototypes/*` a jejich stories zrušené; nahrazují je Page stories (`Live/*`, `Event/Detail`, `Calendar/Season`, `Entry/ClubEntry`, `Athlete/*`).
7. **Peer dependencies** beze změny (`react` a `react-dom` ^18 || ^19).

### Odstraněné komponenty a exporty

Navigation (`MainNav`, `NavItem`, `BreadcrumbChevronIcon`), HeroSection (+ `HeroActionButton`), SectionHeader, StatsBar, StatCard, ActionCard, AthleteCard, ListItem, ResultItem, PodiumCard, DateBadge. `ResultsTable` 1.x je přepsaná (viz níže) včetně typů `ResultEntry`, `ResultStatus`, `ResultSection`, `ResultsTableColumn`, `ResultsTableSize`, `ResultsTableVariant` a komponenty `RunDetailModal`. Pryč jsou i typy `AvatarVariant` (nově `AvatarShape`), `HeaderSize`, `FilterPillsVariant`, `SearchFilterChip`.

`LiveIndicator` je smazaný včetně typů `LiveIndicatorProps`, `LiveIndicatorVariant`, `LiveIndicatorSize`, `LiveIndicatorColor` (T19); nahrazuje ho `StatusBadge state="live"`. `Calendar` / `CalendarList` s `showLive` ukazují místo tečky `StatusBadge state="live" size="sm"` (odznak „Live“). `FilterPills` zůstává pod tímto jménem (upravená komponenta, nepřejmenovaná na `Pills`). Beze změny API zůstávají `Calendar`, `CalendarList` (jen vzhled `showLive`, viz výše) a `KanoeCzContext`.

### Změny props a variant

| Komponenta | 1.2.0 | 2.0 |
|---|---|---|
| Button | `size` `sm`/`md`/`lg`; `accent="energy"`; `ButtonProps` jedno rozhraní, ref `HTMLButtonElement` | `size` `sm`/`md`; `accent` pryč; nová odkazová forma `href` / `as="a"` (`<a>` se stejným vzhledem). **`ButtonProps` je union** `ButtonAsButtonProps \| ButtonAsLinkProps` (společné `ButtonOwnProps`): JSX se nemění, ale `interface X extends ButtonProps` už nejde, náhrada `ButtonAsButtonProps`; **ref je `HTMLButtonElement \| HTMLAnchorElement`** (`useRef<HTMLButtonElement>` pro `<Button ref>` zúžit nebo přetypovat) |
| Badge | `variant` včetně `energy`; `size` včetně `lg`; `glow`, `outlined` | `variant` `level`, `outline`, `live` místo `energy`; `size` `sm`/`md`; `glow`, `outlined` pryč |
| Card | `variant` `surface`/`elevated`/`outlined`/`aesthetic` | `variant` `surface`/`outlined`; nový `tone` `default`/`highlight` |
| Input, Select | `energyFocus`, `displayLabel` | pryč; `Select` má navíc `state="warning"` |
| SearchInput | `size` včetně `lg`; `chips`, `activeChips`, `onChipToggle` | `size` `sm`/`md`; chipy pryč (použij `FilterPills` / `TableToolbarButton`) |
| Tabs | `variant` `line`/`pills`/`aesthetic`; `size` včetně `lg`; `energyAccent` | `variant` `line`/`pills`/`nav`; `size` `sm`/`md`; nové `overflow` (`wrap`/`scroll`/`carousel`), `previousLabel`, `nextLabel` |
| Avatar | `variant` (`circular`/`rounded`/`square`), `size` do `2xl` | `shape` (stejné hodnoty + nový `portrait` 5 : 7 pro loga akcí), `size` do `3xl`, nový `ring` |
| Icon | – | nový `filled` |
| FilterPills | `variant` `default`/`subtle`, `size` včetně `lg` | `variant` pryč, `size` `sm`/`md`, nový `onFilterToggle` |
| Header | `variant` `default`/`elevated`/`gradient`/`satellite`; `size`, `bordered`, `blurOnScroll`, `scrollThreshold` | `variant` `site`/`satellite`/`app`; uvedené props pryč; nový `club` (výchozí `maxWidth` je `full`) |
| PageLayout | `variant` `standalone`/`satellite`/`embed` | `variant` `tribuna`/`urad`/`embed`; nové sloty `banner`, `bottomBar`, `stickyHeader`; šířka kontejneru jako CSS proměnná `--csk-page-max-width` na kořeni (typ `PageLayoutMaxWidth`) |
| ResultsTable | props `results`, `section`, `variant`, `size`, `show*`, `renderCell`, `onRowClick`, … | nové `rows: ResultRow[]`, `columns`, `density`, `expandedId`, `onToggle`, `renderDetail`, `onFavoriteChange`, `clock`, `labels`; jiný datový model (`COMPONENTS.md` §3) |
| Table | obal s `overflow-x: auto` bez fokusu; řaditelná hlavička = `th` s `onClick` | API beze změny; přetékající obal (telefon) je focusovatelný (`tabIndex=0`, s `caption` `role="region"`), přibude tab stop; řaditelná hlavička je `<button type="button">` v `<th>` (klávesnice, `aria-sort` na `th`), selektory testů na `th` klik / fokus upravit |
| Calendar, CalendarList | `showLive` → `LiveIndicator` | `showLive` → `StatusBadge state="live" size="sm"` |
| TableToolbar (nová v 2.0) | – | `detailToggle` `'desktop'` (výchozí) / `'always'`: slot `detail` („Detailní“) je ve výchozím stavu **pod 769 px skrytý**; kdo ho chce i na telefonu, pošle `detailToggle="always"` (stejně `ResultsPanel detailToggle`) |
| EventHeader (nová v 2.0) | – | bez pevné výšky (`min-height`), dvouřádkový název pás zvětší; výška `condensed` = token `--csk-event-header-condensed-h` (36 px) pro `scroll-padding-top` |
| DropdownButton | `variant` `default`/`primary`/`ghost` | navíc `pill` (vzhled pilulky toolbaru, spouštěč 44 px) |

### Nové komponenty

`StatusBadge`, `MarkBadge`, `PenaltyChip`, `GateGrid`, `BibBadge`, `Notice`, `StatTile`, `TimeValue`, `RunningTime`, `DataAge`, `SegmentedControl`, `StarButton`, `FavoritesToggle`, `TableToolbar`, `Subbar`, `Breadcrumbs`, `PageTitle`, `BottomBar`, `EventHeader`, `ResultsPanel`, `RunDetail`, `StartlistTable`, `ProgramList`, `OnCoursePanel`, `OnCourseRider`, `WeekendCalendar`, `DocumentList`, `DeadlineBadge`, `EntryTable`, `ProposalList`, `SummaryCard`, `ProfileHeader`, `SeasonSparkline`, `RivalsList`, plus `Clock` (`createBrowserClock`, `createTestClock`, `ClockProvider`, `useClock`) a typ `Observed<T>`.

## Kdy migrovat c123-live-mini

**Až v M5 Live, ne dřív.** Venues jedou tag `legacy-2026` a větev `legacy/2026` bere jen `fix:` commity; bump DS na major tam nepatří. Na `main` se klient v M5 píše znovu proti kontraktu (handshake, SSE, `Observed` stavy, `Clock` pravidlo, on-course z `attempt.updated`), takže migrace dnešního klienta na v2 by byla práce, kterou M5 zahodí. DS v2 je postavený nezávisle, protože jeho model je vizuální, ne doménový. V M5 se stane zadáním UI: Page stories `Live/*` jsou kostra nového klienta, mapování kontraktu na `ResultRow` je jediná aplikační vrstva. Mezery v DS hledá předem suchý test (T18) a znovu začátek M5. Jediná výjimka: dílčí `fix:` na `legacy/2026`, pokud má být něco vidět na Jarním slalomu; bez DS.

## Poznámka pro konzumenty (z T18)

- Instalace lokálně zabaleného DS (`npm pack` → `npm i ./….tgz`) potřebuje `NODE_AUTH_TOKEN` pro GitHub Packages.
- Tgz zabalený z `main` nese do vydání verzi 1.x, takže npm může vzít 1.x z cache. Před instalací smaž záznam DS z lockfilu (a případně `node_modules/@czechcanoe/rvp-design-system`). Týká se hlavně migrace live-mini v M5.

## Dopad na c123-live-mini (M5 Live v rebuildu)

Definicí hotovo je `CLIENT-OBLIGATIONS.md` sekce „live-mini-client“. DS v2 jí umožňuje:

| Dnes v live-mini (vlastní) | Po v2 |
|---|---|
| `ResultList.tsx` + 423 ř. CSS | `ResultsPanel` (Card + `TableToolbar` + stavový řádek + tabulka + patička) s `ResultsTable` + `RunDetail`; mapování kontraktu → `ResultRow` zůstává v aplikaci (`utils/mapToResultsTable.ts` se přepíše) |
| `:global` na `.csk-table-toolbar` kvůli 390 px | nic: hledání drží min. 10rem, ovládací prvky se zalomí jako skupina na další řádek; „Detailní“ je pod 769 px skrytý sám (`detailToggle="desktop"`, výchozí), na 390 px tedy dva řádky |
| `DataViewSelector` / vlastní tlačítko „Kategorie“ | `Dropdown` se spouštěčem `DropdownButton variant="pill"` vedle `TableToolbarButton` |
| `ClassTabs.tsx` s `:global` karuselem | `Tabs variant="nav" overflow="carousel"` |
| `DataViewSelector.tsx` (pills ↔ dropdown) | `BottomBar` na mobilu, `SegmentedControl` na desktopu |
| `OnCoursePanel.tsx`, `GatePenalties.tsx` | `OnCoursePanel`, `OnCourseRider` (`penalty` u jezdce na trati), `GateGrid`, `PenaltyChip` (číslo branky v chipu, barva = penalizace, jako `GatePenalties`), `RunningTime` |
| `RunDetailExpand.tsx` | `RunDetail` |
| `StartlistTable.tsx` | `StartlistTable` |
| `ScheduleView.tsx` | `ProgramList` |
| `EventHeader.tsx` (`HeroSection minimal` + `EventHeader.module.css` `:global(.csk-hero-section__avatar .csk-avatar--rounded)` 100 × 140) | `EventHeader logo={<Avatar shape="portrait" src=… />}` (40 × 56; `shape="square"` 40 × 40); uvnitř `PageLayout maxWidth="lg"` se obsah hlavičky zarovná s kontejnerem sám, bez CSS aplikace; vlastní 14 px okraj hlavičky netřeba (okraj = `--csk-layout-gutter` jako `PageLayout padded`) |
| `StarButton`, `FavoritesToggle`, bib badge CSS ×3 | `StarButton`, `FavoritesToggle`, `BibBadge` |
| `ConnectionStatus.tsx` (nepoužitý), stav spojení jako badge v hero | `DataAge` s `connection`; v `EventHeader condensed` se vykreslí kompaktně sám (`variant="compact"`) |
| `NotificationPrompt.tsx` (nepoužitý) | `Notice` |
| `SectionHeading` inline styly v `EventList` | `PageTitle` / nadpis sekce v `Card` |
| 143 odkazů na neexistující `--csk-*` tokeny | skutečné `--csk-*` tokeny; všechny `.module.css` projít |

### Poznámky pro M5 (rozhodnutí maintainera v T19; v live-mini se zatím nic nemění)

a) **Pořadí stránky:** `EventHeader` → navigace (dny, třídy) → `OnCoursePanel` s `phaseLabel` „K1 muži · 2. jízda“ → `ResultsPanel`. Tak jsou složené `Live/Running` a `Live/Disconnected`.

b) **Přepínání pohledu na mobilu** přes `BottomBar` (Výsledky · Startovka · Na trati · Program), ne `SegmentedControl` uprostřed stránky.

c) **Desktop:** jeden šedý navigační pás dny · třídy · pohled (jako `Event/Detail`, `.event-page__filters`), ne tři samostatné řádky.

d) **Stavový řádek s poznámkou o průběhu:** `ResultsPanel state="provisional" status="po 2. jízdě · 8 z 24 v cíli"`; s `DataAge` ve stejném řádku `status={<><DataAge … /> · …</>}`. Text skládá aplikace z kontraktu.

e) **Stáří dat z heartbeatu kontraktu**, ne jen z WebSocketu: `DataAge receivedAt` = `clock.now()` při posledním heartbeatu nebo zprávě kontraktu (cokoli dorazilo naposled), `connection` podle heartbeatu; samotné otevřené spojení WebSocket neznamená čerstvá data.

Navíc z T19 pro M5: sticky zúžená hlavička + `scroll-padding-top: var(--csk-event-header-condensed-h)` na scrollujícím kontejneru (stories `Live/*`), „Detailní“ na telefonu nic neposílat navíc (výchozí `detailToggle="desktop"` ho skryje), „Kategorie“ jako `Dropdown` s `DropdownButton variant="pill"`.

Pořadí v live-mini: 1) bump na `^2.0.0` jako samostatný `chore:` commit (CLAUDE.md DS, pravidlo 6), 2) tokeny, 3) komponenta po komponentě, 4) smazat `:global` overridy a mrtvý kód, 5) tier-3 testy s fake `Clock` podle TEST-ARCHITECTURE §5.

## Testy a snapshoty (stav po T17)

- `tests/config.ts` obsahuje jen v2 story ID (komponenty `allComponents`, `viewportStories`, `layoutStories`, `pageStories`, `containerQueryComponents`); `QUARANTINE` je prázdná a má taková zůstat (chyby se opravují, ne karanténují). Tolerance: komponenty 30 px, Page stories a layouty 80 px, animované 100+ px.
- Snapshoty jsou jen chromium a jen světlé téma; generuje je výhradně CI (label `update-snapshots`), na ARM se spouští `--ignore-snapshots`. Plný běh přes všechny prohlížeče (firefox, webkit, mobile-chrome, mobile-safari, funkčně a axe) je `workflow_dispatch` s `browsers=all`; před vydáním 2.0.0 proběhl v T19 (výsledek v PR T19z).
- Unit vrstva (Vitest + Testing Library, `npm run test:unit`): `Badge`, `Button`, `DataAge`, `DocumentList`, `EntryTable`, `FavoritesToggle`, `OnCoursePanel`, `PenaltyChip`, `ResultsPanel`, `ResultsTable`, `RunningTime`, `StartlistTable`, `StatusBadge`, `Table`, `Tabs`, `TimeValue`, `WeekendCalendar`, `ThemeContext`, `Clock`. Časové chování se testuje s `createTestClock()`, nikdy s globálním fake-timer patchem; `src/clock/noRealTime.test.ts` staticky hlídá, že `TimeValue`, `RunningTime`, `DataAge` a `src/clock/` čtou čas jen přes `Clock`.
- Accessibility spec (`@axe-core/playwright`) běží nad stories z `tests/config.ts`; kontrast 4.5:1 je v tokenech ověřený (`--csk-color-text-3` od T19 i na `surface-2`, `TOKENS.md` „Změněno v T19“).
- CI (`.github/workflows/ci.yml`): lint (ESLint + `check-no-hex`), typecheck, unit testy, build, build Storybooku, Playwright chromium (jen při změně `src/`, `tests/`, `.storybook/`, `package*.json`, konfigurace Playwrightu nebo workflow).

## Dokumentace

- `README.md`, `CLAUDE.md`, `DESIGN_PRINCIPLES.md`, `PLAN.md` a `.storybook` Introduction popisují v2 (T17). `docs/DESIGN_PRINCIPLES.md` je označený jako historický, stejně jako `docs/branding/`, `docs/research/` a `docs/review/`; `docs/v2/` je aktuální.
- `docs/COMPONENT_API.md` se generuje skriptem `scripts/gen-component-api.mjs` (`npm run docs:api`, kontrola `npm run docs:api -- --check`) z TypeScript typů a JSDoc. Po změně API komponent ho přegeneruj.
- `DEVLOG.md` je append-only záznam za každou fázi.
