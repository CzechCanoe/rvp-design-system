# Migrace a release 2.0.0

## Verze a větve

- Vývoj v2 běží přímo nad `main`: větve `feat/v2-<N>-<slug>` podle `TASKS.md`, PR do `main`, squash merge, konvenční commity. Breaking změny jako `feat!:` nebo s footerem `BREAKING CHANGE:`.
- Každý merge do `main` spustí CI a nasazení Storybooku na GitHub Pages, takže rozpracovaný v2 je kdykoli k prohlédnutí. Tag `v1.2.0` a balíček 1.2.0 na GitHub Packages zůstávají nedotčené; `c123-live-mini` na `legacy-2026` je pinovaný lockfilem.
- Release Please po prvním `feat!:` otevře rolling release PR na 2.0.0 (config má `bump-minor-pre-major: false`, takže `feat!:` znamená major). **Release PR se nemerguje až do konce fáze 5.** Jeho merge vytvoří tag `v2.0.0`, GitHub Release a spustí `publish.yml`. Poslední commit T19 nese pro jistotu footer `Release-As: 2.0.0`.
- Mezi fázemi je `main` v přechodném stavu (část komponent v2, část 1.x). To je záměr; kdo potřebuje stabilní 1.x, instaluje `@czechcanoe/rvp-design-system@1.2.0`.
- Řada 1.x se po 2.0.0 neudržuje.

## Breaking changes (do CHANGELOG a do PR popisu)

1. **Tokeny**: všechny proměnné přejmenované na `--csk-*`; neprefixované `--color-*`, `--spacing-*`, `--text-*`, `--radius-*`, `--shadow-*`, `--gradient-*` neexistují. Mapování v `TOKENS.md`.
2. **Režimy**: `data-mode="utility" | "expressive"` bez účinku; zůstává jen `data-mode="embed"`. `ThemeProvider` ztrácí prop `mode` (ponechá `theme` pro budoucí dark).
3. **Písma**: Inter a JetBrains Mono nahrazeny IBM Plex Sans / Mono a Barlow Semi Condensed. Cesty k fontům v `dist/` se mění.
4. **Odstraněné komponenty**: Navigation, HeroSection, SectionHeader, StatsBar, StatCard, ActionCard, AthleteCard, ListItem, ResultItem, PodiumCard, DateBadge, FilterPills (přejmenováno na `Pills`), `ResultsTable` 1.x (`ResultEntry` model) včetně `RunDetailModal`.
5. **Odstraněné varianty**: `Button gradient | gradient-energy`, `Card elevated | gradient | aesthetic`, `Badge gradient | energy`, `Tabs energyAccent`, `LiveIndicator` (nahrazuje `StatusBadge state="live"`).
6. **Utility třídy** `csk-reveal`, `csk-mesh-bg--*`, `csk-color-on-surface-muted` zrušené.
7. **Prototypy** `src/prototypes/*` a jejich stories zrušené; nahrazeny Page stories z v2 komponent.
8. **Nový povinný peer**: žádný. `react` ^18 || ^19 zůstává.

## Kdy migrovat c123-live-mini

**Až v M5 Live, ne dřív.** Venues jedou tag `legacy-2026` a větev `legacy/2026` bere jen `fix:` commity; bump DS na major tam nepatří. Na `main` se klient v M5 píše znovu proti kontraktu (handshake, SSE, `Observed` stavy, `Clock` pravidlo, on-course z `attempt.updated`), takže migrace dnešního klienta na v2 by byla práce, kterou M5 zahodí. DS v2 se staví teď a nezávisle, protože jeho model je vizuální, ne doménový. V M5 se stane zadáním UI: Page stories `Live/*` jsou kostra nového klienta, mapování kontraktu na `ResultRow` je jediná aplikační vrstva. Mezery v DS se hledají předem suchým testem (T18) a znovu na začátku M5. Jediná výjimka: dílčí `fix:` na `legacy/2026` (nižší hero, ztráta na mobilu), pokud má být něco vidět na Jarním slalomu; bez DS.

## Dopad na c123-live-mini (M5 Live v rebuildu)

Migrace live-mini je součástí milníku M5 a definicí hotovo je `CLIENT-OBLIGATIONS.md` sekce „live-mini-client“. DS v2 jí má umožnit tohle:

| Dnes v live-mini (vlastní) | Po v2 |
|---|---|
| `ResultList.tsx` + 423 ř. CSS | `ResultsTable` + `RunDetail` + `TableToolbar`; mapování kontraktu → `ResultRow` zůstává v aplikaci (`utils/mapToResultsTable.ts` se přepíše) |
| `ClassTabs.tsx` s `:global` karuselem | `Tabs variant="nav" overflow="carousel"` |
| `DataViewSelector.tsx` (pills ↔ dropdown) | `BottomBar` na mobilu, `SegmentedControl` na desktopu |
| `OnCoursePanel.tsx`, `GatePenalties.tsx` | `OnCoursePanel`, `OnCourseRider`, `GateGrid`, `PenaltyChip`, `RunningTime` |
| `RunDetailExpand.tsx` | `RunDetail` |
| `StartlistTable.tsx` | `StartlistTable` |
| `ScheduleView.tsx` | `ProgramList` |
| `EventHeader.tsx` (`HeroSection minimal` + avatar override) | `EventHeader` |
| `StarButton`, `FavoritesToggle`, bib badge CSS ×3 | `StarButton`, `FavoritesToggle`, `BibBadge` |
| `ConnectionStatus.tsx` (nepoužitý), stav spojení jako badge v hero | `DataAge` s `connection` |
| `NotificationPrompt.tsx` (nepoužitý) | `Notice` |
| `SectionHeading` inline styly v `EventList` | `PageTitle` / nadpis sekce v `Card` |
| 143 odkazů na neexistující `--csk-*` tokeny | skutečné `--csk-*` tokeny; všechny `.module.css` projít |

Pořadí v live-mini: 1) bump na `^2.0.0` jako samostatný `chore:` commit (CLAUDE.md DS, pravidlo 6), 2) tokeny, 3) komponenta po komponentě, 4) smazat `:global` overridy a mrtvý kód, 5) tier-3 testy s fake `Clock` podle TEST-ARCHITECTURE §5.

## Testy a snapshoty

- Vizuální snapshoty (`tests/*-snapshots/`) se po v2 **všechny přegenerují**; diffy proti 1.x nemají smysl. Postup: v každé fázi `npm run test:update:quick` jen pro stories, kterých se fáze týká, a diff obrázek přiložit do PR.
- `tests/config.ts` se přepisuje ve fázi 5 (nové story ID, tolerance podle CLAUDE.md: komponenty 30 px, stránky 80 px, animované 100+ px).
- Přibývá unit vrstva (Vitest + Testing Library) pro `RunningTime`, `DataAge`, `TimeValue` a `SegmentedControl`: časové chování se testuje s `createTestClock()`, nikdy s globálním fake-timer patchem (TEST-ARCHITECTURE §5).
- Accessibility spec (`@axe-core/playwright`) zůstává a rozšiřuje se o nové stories; kontrast 4.5:1 je v tokenech ověřený, komponenty ho nesmí rozbít opacitou.
- CI (`.github/workflows/ci.yml`) beze změny: lint, typecheck, build, build-storybook, Playwright chromium.

## Dokumentace

- `README.md`, `CLAUDE.md` (Quick Reference typů, kanoe.cz kontext: primární barva už není `#1176a6`), `DESIGN_PRINCIPLES.md` (přepsat na principy z `BRIEF.md`, sekce Dynamic Sport Aesthetic pryč), `docs/COMPONENT_API.md` (přegenerovat), `PLAN.md` (nový plán = `TASKS.md`), `DEVLOG.md` append-only záznam za každou fázi.
- `docs/branding/`, `docs/research/`, `docs/review/` zůstávají jako historie; `docs/v2/` je aktuální.
