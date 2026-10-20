# PLAN.md - CSK RVP Design System v2 „Klidná voda“

Zadání, rozpad na tasky a reference jsou v `docs/v2/` (`README.md`, `BRIEF.md`, `TASKS.md`). Plán 1.x (fáze 0–23) je archivovaný v `PLAN-history.md`. Historie práce je v `DEVLOG.md` (append only, čte se jen při diagnostice).

## Stav

| Fáze | Obsah | Status |
|------|-------|--------|
| 0 | T0 příprava (lint no-hex, Vitest, Pages) | hotovo |
| 1 | T1 tokeny, T2 písma, T3 codemod a přetokenování | hotovo |
| 2 | T4 základ (Button, Card, Badge, Tabs, SearchInput, Avatar), T5 stavy, T6 čas, T7 ovladače, T8 layout | hotovo |
| 3 | T9 ResultsTable + RunDetail, T10 OnCoursePanel, T11 StartlistTable + ProgramList, T12 Live page stories | hotovo |
| 4 | T13 WeekendCalendar, T14 EntryTable + ProposalList + SummaryCard, T15 profil, T16 Event/Detail | hotovo |
| 5 | T17a smazání 1.x, **T17 dokumentace a finální testovací konfigurace** | hotovo (T17 v review) |
| 5 | T18 suchý test nad `c123-live-mini` (hledání mezer, bez commitu tam) | běží paralelně |
| 5 | T19 mezery z T18, změny API z #84, vydání 2.0.0 | čeká na T18 |

Verze `package.json` a `CHANGELOG.md` spravuje Release Please. Release PR „chore(main): release 2.0.0“ (#45) se **nemerguje**, dokud T19 neskončí a poslední commit nenese footer `Release-As: 2.0.0`.

## Další krok

1. T18: výstup (seznam mezer) jde do issue v DS.
2. T19 (#84): rozhodnutí maintainera z 20. 10. 2026, bod 1–12 (Button `href`, `DocumentList`, `ResultsPanel`, `TimeValue format`, `DataAge` barvy, token `--csk-ink-3`, Avatar `portrait`, oprava `GateGrid`/`PenaltyChip`, axe u `Table` na mobilu, …). Dokumentaci těchto komponent (`docs/v2/COMPONENTS.md`, `MIGRATION.md`) doplní T19; `docs/COMPONENT_API.md` stačí přegenerovat (`npm run docs:api`).
3. Smazat `LiveIndicator` (nahrazuje ho `StatusBadge state="live"`; používá ho `Calendar` / `CalendarList` `showLive`).
4. Před vydáním: plný běh CI přes všechny prohlížeče (`gh workflow run ci.yml --ref <větev> -f browsers=all`).

## Backlog 2.1

- #85 EntryTable: kartový režim ≤ 640 px (jedna loď = jedna karta, C2 se dvěma členy); v 2.0.0 zůstává vodorovný scroll uvnitř komponenty.
- Tmavý režim (tokeny jsou připravené, `[data-theme="dark"]` přepíše jen sémantickou vrstvu).
- Sdílecí kartičky výsledků, Kayak Cross a klasifikační standingy jako samostatné komponenty (mimo scope v2).
- Případně `docs:api -- --check` jako krok v CI, aby se `docs/COMPONENT_API.md` nemohl rozejít s kódem.

## Pravidla (zkrácená, plná verze v `CLAUDE.md`)

- Větev `feat/v2-<N>-<slug>` z `main`, PR do `main`, squash merge, konvenční commity (`feat!:` pro breaking).
- Tokeny jen `--csk-*`, žádný hex v komponentách, čas jen přes `Clock`.
- Snapshoty generuje jen CI (label `update-snapshots`); lokálně `npx playwright test --project=chromium --ignore-snapshots`.
- Po změně API komponent `npm run docs:api`.
