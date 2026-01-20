# Claude Code Instructions - CSK RVP Design System

## Projekt

Designový systém pro veřejné sekce webů ČSK: kalendář závodů, výsledky, live výsledky, registrace, profily závodníků a klubů.

**GitHub:** bude upřesněno | **Licence:** bude upřesněno

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
                  | 'gradient' | 'gradient-accent' | 'gradient-success' | 'gradient-error';
type BadgeSection = 'dv' | 'ry' | 'vt';
type BadgeVtClass = 'm' | 'a' | 'b' | 'c';  // LOWERCASE!

// Card
type CardVariant = 'surface' | 'elevated' | 'outlined' | 'gradient' | 'glass' | 'featured';

// Button
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
                   | 'gradient' | 'gradient-accent' | 'gradient-success';

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

1. Přečti `PLAN.md` – aktuální stav a další kroky (kompaktní, ~100 řádků)
2. Pokud je krok příliš velký, rozděl na menší části

### Během práce

1. **Implementace:** Pracuj v blocích (~70 % kontextu)
2. **Průběžně:** Aktualizuj `PLAN.md` při změnách plánu
3. **Po dokončení kroku:** Označ `- [x]` v PLAN.md

### Po dokončení bloku/iterace

1. **PLAN.md:** Označ dokončené kroky, aktualizuj "Další krok"
2. **DEVLOG.md:** **POUZE APPEND** (viz níže)
3. **Commit:** Potvrď změny

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
| `PLAN.md` | Aktuální plán (~100 řádků) | **Vždy na začátku** |
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

## kanoe.cz kontext

- **Tech stack:** Bootstrap 4, jQuery 3.1.1, Joomla, DataTables
- **Primární barva:** `#1176a6`
- **Grid:** 12-column Bootstrap
- **Embed komponenty:** používají `data-mode="embed"` pro neutrální styling
