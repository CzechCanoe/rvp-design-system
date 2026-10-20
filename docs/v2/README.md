# RVP Design System v2 „Klidná voda“

Pracovní složka pro major release 2.0.0. Vznikla z revize designu v říjnu 2026 (projekt „CSK design“ na claude.ai; plátno s návrhem je tam, tady je jeho statická kopie v `reference/`).

| Soubor | Co v něm je | Kdo ho čte |
|---|---|---|
| `BRIEF.md` | Směr: proč v2, principy, co se mění a co zůstává | každý agent na začátku |
| `TOKENS.md` | Nový tokenový systém a mapování starých tokenů | agent na fázi 1 |
| `COMPONENTS.md` | Komponenty podle skutečného stavu (as-built): záměr, pravidla, mechanismy; úplné props jsou v `docs/COMPONENT_API.md` | každý, kdo komponenty používá nebo mění |
| `MIGRATION.md` | Breaking changes proti 1.2.0, verze, větve, testy, dopad na c123-live-mini | maintainer, agent na fázi 5, konzumenti DS |
| `TASKS.md` | Rozpad na issues s akceptačními kritérii a pořadím | orchestrátor |
| `reference/` | Statický HTML+CSS návrh obrazovek (zdroj pravdy pro vzhled) | každý agent při implementaci |

## Jak s tím pracovat

1. Pracuje se přímo nad `main`. Každý task z `TASKS.md` je vlastní issue a vlastní větev `feat/v2-<N>-<slug>` z `main`, PR do `main`. Po každém merge se z `main` vybuildí Storybook na GitHub Pages (`.github/workflows/storybook-pages.yml`), takže rozpracovaný stav je vidět průběžně. Větev `v2-klidna-voda` byla jen pro tuto dokumentaci.
2. `reference/*.html` se otevírá v prohlížeči přímo ze souboru (`rvp.css` je vedle). Je to návrh, ne kód k převzetí: komponenty se píšou znovu v konvencích repa (React + CSS, BEM třídy `csk-*`, stories, Playwright snapshoty).
3. Kde reference a `COMPONENTS.md` mlčí, platí dnešní chování komponenty. Kde si odporují, platí `COMPONENTS.md` a agent to napíše do PR.
4. Tokeny se nikdy nezapisují natvrdo do komponent. Když chybí, přidá se do `src/tokens/` a zapíše do `TOKENS.md`.
5. Release: Release Please po prvním `feat!:` otevře rolling release PR „chore(main): release 2.0.0“. **Ten se nemerguje**, dokud neskončí fáze 5 (T19); feature PR se mergují normálně. Mezitím se nic nepublikuje na GitHub Packages (publish běží až po vydání release). Detaily v `MIGRATION.md`.
