# PLAN.md - CSK RVP Design System

## Aktuální stav
**Fáze:** 7 - Hloubkové review a redesign
**Další krok:** 7.4 Redesign core komponent (Tier 1) - Badge

**Problém:** Současná implementace nedosahuje vizuální úrovně studovaných referencí (World Athletics, FIS, ICF). Komponenty jsou funkční, ale "utilitární" - chybí vizuální polish, branded feel, moderní detaily.

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
- [x] Transitions - `src/tokens/transitions.css`

**Milestone M1:** Tokeny hotové, Storybook story ✅

---

## Fáze 2: Core komponenty (Tier 1)

- [x] Button (primary, secondary, ghost, danger, sizes)
- [x] Input (text, password, search, number, validation)
- [x] Select (native, custom dropdown)
- [x] Checkbox
- [x] Radio
- [x] Switch
- [x] Card (surface, elevated, clickable)
- [x] Badge (status, VT, sekce)
- [x] Table (sortable, selectable)

**Milestone M2:** Core komponenty v Storybook ✅

---

## Fáze 3: Pokročilé komponenty (Tier 2)

- [x] Modal (dialog, confirm, wizard)
- [x] Tabs (horizontal, pills)
- [x] Toast (notifications provider)
- [x] Navigation (main nav, breadcrumbs)
- [x] Pagination
- [x] Progress (bar, steps)
- [x] Header (app header)
- [x] Avatar (image, initials)
- [x] Dropdown

**Milestone M3:** Pokročilé komponenty v Storybook ✅

---

## Fáze 4: Specifické komponenty (Tier 3)

- [x] Calendar (event grid)
- [x] Dropzone (file upload)
- [x] Timeline (workflow vizualizace)
- [x] StatCard (dashboard widget)
- [x] AthleteCard (profil závodníka)
- [x] ResultsTable (s highlighty)
- [x] LiveIndicator (pulsující)
- [x] EmptyState
- [x] Skeleton

**Milestone M4:** Use-case komponenty v Storybook ✅

---

## Fáze 5: Prototypy

- [x] prototype-calendar - Kalendář závodů
- [x] prototype-results - Výsledky závodu
- [x] prototype-live - Live výsledky
- [x] prototype-registration - přihlašování na závody - oddílová přihláška
- [x] prototype-profile - Profil závodníka
- [x] prototype-dashboard - Dashboard správce

**Milestone M5:** Klikatelné prototypy ✅

---

## Fáze 6: Dokumentace a publikace

- [x] kontrola, že jsou všechny komponenty správně includované a propojené, že storybook obsahuje vše co má
- [x] kompletace a otestování buildů
- [x] pořízení screenshotů všech prototypů a storybooků s playwright, kontrola proti screenshotům
- [ ] README.md s quick start
- [ ] Component API dokumentace
- [ ] GitHub Actions CI/CD
- [ ] NPM publikace (@czechcanoe/rvp-design-system)
- [ ] GitHub Pages pro Storybook

**Milestone M6:** NPM release, dokumentace online

---

## Fáze 7: Hloubkové review a redesign

### 7.1 Vizuální audit a analýza mezer
- [x] Porovnání současných komponent s top referencemi (World Athletics, FIS, UCI)
- [x] Dokumentace konkrétních vizuálních nedostatků
- [x] Screenshot comparison - naše komponenty vs. reference
- [x] Identifikace chybějících vizuálních prvků (gradienty, shadows, micro-interactions)
- [x] Dokument `docs/review/visual-gap-analysis.md`

### 7.2 Light mode priorita (technický fix)
- [x] Změna výchozího chování - light mode jako default
- [x] Storybook: explicitní `data-theme="light"` v preview
- [x] Odstranění automatického dark mode z `prefers-color-scheme`
- [x] Dark mode pouze explicitním přepnutím
- [x] Testování static build

### 7.3 Redesign tokenů
- [x] Review barevné palety - je dostatečně expresivní?
- [x] Přidání gradient tokenů (pro hero sekce, karty)
- [x] Vylepšení shadow systému (více úrovní, měkčí)
- [x] Review typografie - dostatečně výrazné nadpisy?
- [x] Nové tokeny pro "expresivní režim" (větší spacing, dramatičtější)

### 7.4 Redesign core komponent (Tier 1)
- [x] **Button** - gradient varianty, lepší hover states, subtle shadows
- [x] **Card** - gradient backgrounds, glassmorphism efekty pro elevated
- [ ] **Badge** - více variant, pill style, gradient backgrounds
- [ ] **Input/Select** - modernější focus states, floating labels?
- [ ] **Table** - lepší row highlights, sticky headers, micro-animations

### 7.5 Redesign pokročilých komponent (Tier 2)
- [ ] **Header** - gradient background, blur efekt při scrollu
- [ ] **Navigation** - aktivní stavy, hover animace
- [ ] **Modal** - backdrop blur, slide-in animace
- [ ] **Tabs** - animated underline, pill varianty
- [ ] **Toast** - slide-in animace, progress bar

### 7.6 Redesign specifických komponent (Tier 3)
- [ ] **AthleteCard** - hero varianta s gradient overlay
- [ ] **ResultsTable** - highlighting pro pozice, animované změny
- [ ] **LiveIndicator** - dramatičtější pulsování, gradient glow
- [ ] **StatCard** - trend šipky, sparkline grafy, gradient backgrounds
- [ ] **Calendar** - hover efekty, event preview

### 7.7 Branded visual elements
- [ ] CSK logo integrace guidelines
- [ ] Vodní/sportovní vizuální prvky (vlny, dynamické tvary?)
- [ ] Hero patterns/backgrounds
- [ ] Fotografické overlay styly
- [ ] Disciplínové vizuální identity (DV/RY/VT)

### 7.8 Redesign prototypů
- [ ] **CalendarPage** - hero sekce, featured events, vizuálně bohatší
- [ ] **ResultsPage** - dramatický leaderboard, pozice highlighting
- [ ] **LivePage** - immersive experience, real-time feel
- [ ] **ProfilePage** - hero header s fotkou, achievement showcase
- [ ] **RegistrationPage** - přehledný wizard, progress indication
- [ ] **DashboardPage** - widget karty, statistiky s grafy

### 7.9 Expresivní vs. utilitární režim
- [ ] Implementace dual-mode systému (jak definováno v DESIGN_PRINCIPLES.md)
- [ ] Expresivní spacing scale
- [ ] Expresivní animace (delší, dramatičtější)
- [ ] Context provider pro přepínání režimů
- [ ] Storybook stories pro oba režimy

### 7.10 Finální polish
- [ ] Konzistence napříč všemi komponentami
- [ ] Micro-interactions audit
- [ ] Reduced motion support
- [ ] Performance check (CSS bundle size)
- [ ] Cross-browser testing

**Milestone M7:** Vizuálně atraktivní design systém na úrovni top sportovních federací

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

### Poznámky k fázi 7 (redesign)

**Klíčové vizuální inspirace z research:**
- World Athletics: fialová/oranžová kombinace, moderní feel, generous whitespace
- FIS: widget systém, rounded corners (4px), konzistentní component reuse
- ICF: fotografický přístup, akční záběry, mega-menu navigace
- ČAS: Poppins font, červeno-modrý toggle, AJAX plynulost

**Co chybí v současné implementaci:**
1. Gradienty (hero sekce, karty, buttony)
2. Soft shadows s více úrovněmi
3. Micro-interactions a animace
4. Branded feel (CSK identita)
5. Expresivní režim (je definovaný, ale neimplementovaný)
6. Fotografické overlay styly
7. Dramatické hover states

**Priorita režimů:**
- **Light mode = primární** (kanoe.cz integrace, veřejné stránky)
- **Dark mode = sekundární** (live výsledky na mobilech, volitelné)

**Cílová kvalita:**
Design systém by měl být na úrovni World Athletics nebo FIS - ne generický Bootstrap/Tailwind look.
