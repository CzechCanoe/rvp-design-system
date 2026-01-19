# PLAN.md - CSK RVP Design System

## Aktuální stav
**Fáze:** 1 - Projektová struktura a tokeny
**Další krok:** 1.2 - Design Tokens (typografie, spacing, radius, shadows...)

---

## Fáze 0: Výzkum a design principy

### 0.1 Výzkum sportovních prezentací
- [x] Analýza ICF (canoeicf.com) - barvy, typografie, layout
- [x] Analýza World Athletics (worldathletics.org)
- [x] Analýza UCI (uci.org)
- [x] Analýza FIS (fis-ski.com)
- [x] Analýza českých svazů (ČAS, FAČR)
- [x] Analýza Paddle UK - nedostupné (403), nahrazeno ČUS
- [x] Vytvoření moodboardu s vizuálními referencemi
- [x] Dokument `docs/research/sports-presentation-research.md`

### 0.2 Audit kanoe.cz
- [x] Extrakce stávající barevné palety
- [x] Mapování komponent (Bootstrap 4, jQuery, DataTables)
- [x] Identifikace co zachovat vs. nahradit
- [x] Dokument `docs/research/kanoe-cz-audit.md`

### 0.3 Design principy
- [x] Mobile-first strategie
- [x] WCAG 2.1 AA požadavky
- [x] Dual personality (utilitární vs. expressive)
- [x] Dark/light mode strategie
- [x] Výběr fontu (na základě výzkumu)
- [x] Dokument `docs/DESIGN_PRINCIPLES.md`

**Milestone M0:** Design principy schváleny ✓

---

## Fáze 1: Projektová struktura a tokeny

### 1.1 Setup projektu
- [x] Inicializace npm projektu
- [x] Konfigurace TypeScript
- [x] Konfigurace Vite
- [x] Konfigurace Storybook 8
- [x] Struktura složek (src/tokens, src/components, etc.)

### 1.2 Design Tokens
- [x] Barevná paleta (light theme) - `src/tokens/colors.css`
- [x] CSK specifické barvy (sekce DV/RY/VT, VT třídy)
- [x] Barevná paleta (dark theme)
- [x] Typografie (font family, scale, weights) - `src/tokens/typography.css`
- [x] Spacing (4px base scale) - `src/tokens/spacing.css`
- [x] Border radius - `src/tokens/radius.css`
- [x] Shadows - `src/tokens/shadows.css`
- [ ] Transitions

**Milestone M1:** Tokeny hotové, Storybook story

---

## Fáze 2: Core komponenty (Tier 1)

- [ ] Button (primary, secondary, ghost, danger, sizes)
- [ ] Input (text, password, search, number, validation)
- [ ] Select (native, custom dropdown)
- [ ] Checkbox
- [ ] Radio
- [ ] Switch
- [ ] Card (surface, elevated, clickable)
- [ ] Badge (status, VT, sekce)
- [ ] Table (sortable, selectable)

**Milestone M2:** Core komponenty v Storybook

---

## Fáze 3: Pokročilé komponenty (Tier 2)

- [ ] Modal (dialog, confirm, wizard)
- [ ] Tabs (horizontal, pills)
- [ ] Toast (notifications provider)
- [ ] Navigation (main nav, breadcrumbs)
- [ ] Pagination
- [ ] Progress (bar, steps)
- [ ] Header (app header)
- [ ] Avatar (image, initials)
- [ ] Dropdown

**Milestone M3:** Pokročilé komponenty v Storybook

---

## Fáze 4: Specifické komponenty (Tier 3)

- [ ] Calendar (event grid)
- [ ] Dropzone (file upload)
- [ ] Timeline (workflow vizualizace)
- [ ] StatCard (dashboard widget)
- [ ] AthleteCard (profil závodníka)
- [ ] ResultsTable (s highlighty)
- [ ] LiveIndicator (pulsující)
- [ ] EmptyState
- [ ] Skeleton

**Milestone M4:** Use-case komponenty v Storybook

---

## Fáze 5: Prototypy

- [ ] prototype-calendar - Kalendář závodů
- [ ] prototype-results - Výsledky závodu
- [ ] prototype-live - Live výsledky
- [ ] prototype-registration - Self-service registrace
- [ ] prototype-profile - Profil závodníka
- [ ] prototype-dashboard - Dashboard správce

**Milestone M5:** Klikatelné prototypy

---

## Fáze 6: Dokumentace a publikace

- [ ] README.md s quick start
- [ ] Component API dokumentace
- [ ] Migration guide z Inspinia
- [ ] GitHub Actions CI/CD
- [ ] NPM publikace (@czechcanoe/rvp-design-system)
- [ ] GitHub Pages pro Storybook

**Milestone M6:** NPM release, dokumentace online

---

## Technický stack

- **React 18+** s TypeScript (strict mode)
- **Vite** pro build
- **Storybook 8** pro dokumentaci
- **CSS strategie:** TBD (Vanilla Extract / CSS Modules / Tailwind+CVA)
- **GitHub Actions** pro CI/CD

---

## Poznámky

- React-first přístup, CSS jako by-product
- Font bude vybrán během výzkumné fáze
- Kompletní výzkum sportovních federací před návrhem vizuálu
