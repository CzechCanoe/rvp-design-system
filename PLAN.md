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
| 5 | T17a smazání 1.x, T17 dokumentace a finální testovací konfigurace | hotovo |
| 5 | T18 suchý test nad `c123-live-mini` (hledání mezer, bez commitu tam) | hotovo (#83) |
| 5 | T19 mezery z T18, změny API z #84, vydání 2.0.0 | T19a #89, T19b #90, T19c #88 hotovo; T19z (token `--csk-ink-3`, docs, běh všech prohlížečů) v review; zbývá commit `Release-As: 2.0.0` |

Verze `package.json` a `CHANGELOG.md` spravuje Release Please. Release PR „chore(main): release 2.0.0“ (#45) se **nemerguje**, dokud T19 neskončí a poslední commit nenese footer `Release-As: 2.0.0`.

## Další krok

1. Maintainer porovná v1 / v2 (Storybook na GitHub Pages) a zreviduje T19z.
2. Poslední commit na `main` s footerem `Release-As: 2.0.0` (samostatný commit po T19z), pak merge release PR #45 → tag `v2.0.0`, GitHub Release, publish na GitHub Packages.
3. Konzumenti (`c123-live-mini` v M5) bumpují na `^2.0.0` samostatným `chore:` commitem; postup v `docs/v2/MIGRATION.md`.

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
