# RVP Design System v2 „Klidná voda“

Pracovní složka pro major release 2.0.0. Vznikla z revize designu v říjnu 2026 (projekt „CSK design“ na claude.ai; plátno s návrhem je tam, tady je jeho statická kopie v `reference/`).

| Soubor | Co v něm je | Kdo ho čte |
|---|---|---|
| `BRIEF.md` | Směr: proč v2, principy, co se mění a co zůstává | každý agent na začátku |
| `TOKENS.md` | Nový tokenový systém a mapování starých tokenů | agent na fázi 1 |
| `COMPONENTS.md` | Inventura komponent: zachovat / změnit / odstranit / nové, s API | agenti na fázích 2–4 |
| `MIGRATION.md` | Breaking changes, verze, větve, testy, dopad na c123-live-mini | maintainer, agent na fázi 5 |
| `TASKS.md` | Rozpad na issues s akceptačními kritérii a pořadím | orchestrátor |
| `reference/` | Statický HTML+CSS návrh obrazovek (zdroj pravdy pro vzhled) | každý agent při implementaci |

## Jak s tím pracovat

1. Větev `v2-klidna-voda` je integrační. Každý task z `TASKS.md` je vlastní issue a vlastní větev `feat/v2-<N>-<slug>` z `v2-klidna-voda`, PR zpět do ní.
2. `reference/*.html` se otevírá v prohlížeči přímo ze souboru (`rvp.css` je vedle). Je to návrh, ne kód k převzetí: komponenty se píšou znovu v konvencích repa (React + CSS, BEM třídy `csk-*`, stories, Playwright snapshoty).
3. Kde reference a `COMPONENTS.md` mlčí, platí dnešní chování komponenty. Kde si odporují, platí `COMPONENTS.md` a agent to napíše do PR.
4. Tokeny se nikdy nezapisují natvrdo do komponent. Když chybí, přidá se do `src/tokens/` a zapíše do `TOKENS.md`.
5. Release: na větvi `v2-klidna-voda` se neverzuje. Při merge do `main` dostane poslední commit footer `Release-As: 2.0.0` (viz `MIGRATION.md`).
