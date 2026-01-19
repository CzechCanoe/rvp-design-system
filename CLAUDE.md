# Claude Code Instructions - DESIGN SYSTÉM pro registrační a výsledkový servis Českého svazu kanoistů

## Projekt

Designový systém bude sloužit jako sjednocující knihovna pro veřejné nebo komunitní sekce webových stránek, jako jsou: kalendář závodů, portál výsledků, live výsledky, registrační systém, veřejné profily závodníků a klubů, správa členství.

**GitHub:** bude upřesněno | **Licence:** bude upřesněno

---

## Důležitá pravidla

1. **Read-only:**
   - `../csk-rvp-analysis/` - analýza systémů a procesů CSK
   - `resources-private` - zdroje stávajících systémů - zastaralá grafika a hrozné UX, ale rozsah +/- odpovídající

---

## Cesty a dokumentace

| Účel | Cesta |
|---------|------|
| **Tento projekt** | `/workspace/csk/rvp-design-system/` |
| **Zadání projektu** | `./PROJECT.md` |

---

## Jazyk

- User communication: **Czech**
- Documentation (README, docs): **Czech**
- Code, comments, commit messages: **English**

---

## Proces

### Před zahájením práce

1. Přečtěte si `PLAN.md` – zjistěte aktuální stav a další kroky.
2. Upravte `PLAN.md` – pokud je krok příliš velký, rozdělte jej na menší části.

### Během práce

1. **Plánování:** Nejprve aktualizujte `PLAN.md` o nové kroky.
2. **Implementace:** Pracujte v blocích (~70 % využití kontextu).
3. **Odeslání:** Nejpozději po každém bloku.
4. **Aktualizace PLAN.md:** Po dokončení kroku označte `- [x]`.
5. Nezpracovávejte více než jeden blok před vyčištěním/kompaktováním.

### Po dokončení bloku/iterace

1. **PLAN.md:** Označte dokončené kroky jako `- [x]`
2. **DEVLOG.md:** Přidejte záznam o tom, co bylo provedeno:
   - Co se podařilo
   - Jaké problémy nastaly a jak byly vyřešeny
   - Poznámky k rozhodnutím
3. **Commit:** Potvrďte změny včetně dokumentace

### Formát záznamu DEVLOG.md

```markdown
## RRRR-MM-DD - Iterace X / Popis práce

### Dokončeno
- [x] Popis úkolu 1
- [x] Popis úkolu 2

### Problémy a řešení
1. **Problém:** [popis]
   **Řešení:** [jak bylo vyřešeno]

### Poznámky
[Důležitá rozhodnutí, odchylky od plánu, úkoly na příště]
```

### Když nastanou problémy

- Aktualizujte `PLAN.md` o nové sekce a kroky
- Napište do `DEVLOG.md`, co nefungovalo
- Dokončete práci a předejte ji nové instanci

---

## Soubory projektu

| Soubor | Účel |
|------|---- -----|
| `PROJECT.md` | Přehled projektu a motivace (stabilní) |
| `PLAN.md` | Plán implementace s políčky pro zaškrtnutí (průběžně aktualizovat) |
| `DEVLOG.md` | Vývojový deník (přidávat záznamy po každé iteraci) |
| `CLAUDE.md` | Pokyny pro Claude Code (tento soubor) |

---

## Commit Message Format

```
feat: add penalty grid with keyboard navigation
fix: correct gate grouping logic
refactor: extract WebSocket logic to hook
```

---

*Project overview → see `./PROJECT.md`*
