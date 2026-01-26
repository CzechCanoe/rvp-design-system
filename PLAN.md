# PLAN.md - CSK RVP Design System

## Aktuální stav

| Fáze | Status |
|------|--------|
| 0-14 (Založení až Test suite) | ✅ Hotovo |
| 15 (User feedback) | ✅ Hotovo |
| 16 (Konsolidace prototypů) | ✅ Hotovo |
| 17 (DS Cleanup - Aesthetic Focus) | ✅ Hotovo |
| 18 (Visual Polish) | ✅ Hotovo |
| 19 (Optimization) | ✅ Hotovo |
| 20 (Publikace) | ✅ Hotovo |
| 21 (Post-release Polish) | ✅ Hotovo |
| **22 (CSS Consolidation)** | 🔄 **Aktivní** |

**Aktivní fáze: 22 - Konsolidace CSS z prototypů do DS komponent**

---

## Fáze 22: CSS Consolidation

### Cíl
Redukce ~3750 řádků duplicitního CSS v prototypech přesunem opakujících se vzorů do DS komponent.

### Analýza (dokončena)

| Soubor | Řádků CSS | Poznámka |
|--------|-----------|----------|
| LivePage.css | 2 779 | Největší - modály, animace |
| ProfilePage.css | 1 750 | Hero, achievements |
| RegistrationPage.css | 1 773 | Wizard, formuláře |
| DashboardPage.css | 1 414 | Stats, alerts |
| AthletePublicProfile.css | 1 265 | Hero, timeline |
| EventDetailPage.css | 1 257 | Hero, tabs |
| ResultsPage.css | 811 | Podium |
| ClubPublicProfile.css | 788 | Hero, members |
| CalendarPage.css | 348 | Layout-only |
| **Celkem** | **~12 185** | |

### Kroky

#### 22.1 Visual Regression Setup
- [ ] Nainstalovat `@storybook/test-runner` + `playwright`
- [ ] Vytvořit baseline screenshots pro všechny prototypy (všechny varianty)
- [ ] Nastavit CI job pro vizuální porovnání
- [ ] Dokumentovat postup v `tests/visual/README.md`

**Příkazy:**
```bash
npm install -D @storybook/test-runner playwright
npx playwright install chromium
```

**Baseline prototypy k zachycení:**
- CalendarPage (utility, expressive, embed, satellite, aesthetic × light/dark)
- EventDetailPage (dv/ry/vt × utility/expressive/embed/aesthetic × light/dark)
- LivePage (dv/ry/vt × utility/aesthetic × light/dark)
- ResultsPage (dv/ry/vt × utility/aesthetic × light/dark)
- AthletePublicProfile (dv/ry/vt × utility/embed/aesthetic × light/dark)
- ClubPublicProfile (utility/embed/aesthetic × light/dark)
- ProfilePage (dv/ry/vt × utility/satellite/aesthetic × light/dark)
- RegistrationPage (dv/ry/vt × utility/satellite/aesthetic × light/dark)
- DashboardPage (dv/ry/vt/federation × utility/satellite/embed/aesthetic × light/dark)

#### 22.2 Section Color System
- [ ] Přidat `--section-color` CSS custom property pattern do `tokens/colors.css`
- [ ] Vytvořit utility classes `.csk-section-dv`, `.csk-section-ry`, `.csk-section-vt`
- [ ] Dokumentovat v Storybook (Colors story)
- [ ] Srovnat screenshots (žádná vizuální změna)

**Implementace:**
```css
/* tokens/colors.css */
.csk-section-dv { --section-color: var(--color-section-dv); --section-color-light: ...; --section-color-dark: ...; }
.csk-section-ry { --section-color: var(--color-section-ry); ... }
.csk-section-vt { --section-color: var(--color-section-vt); ... }
```

#### 22.3 HeroSection Component Enhancement
- [ ] Rozšířit existující `HeroSection` o:
  - `section` prop pro automatické gradients (dv/ry/vt/federation)
  - `backgroundImage` prop s automatickým overlay
  - `wave` prop pro tvarový divider
  - Pattern overlay (radial gradients)
- [ ] Přidat varianty: `variant="gradient" | "image" | "minimal"`
- [ ] Přidat `HeroSection.stories.tsx` s všemi variantami
- [ ] Srovnat screenshots

**Úspora:** ~1750 řádků (hero-related CSS z 7 prototypů)

#### 22.4 StatCard Variants
- [ ] Přidat varianty do `StatCard`:
  - `variant="medal-gold" | "medal-silver" | "medal-bronze"`
  - `variant="gradient-primary" | "gradient-success" | "gradient-warning" | "gradient-info"`
  - `iconBackground="gradient"` prop
- [ ] Přidat sparkline slot
- [ ] Aktualizovat stories
- [ ] Srovnat screenshots

**Úspora:** ~400 řádků

#### 22.5 ResultItem / TimelineItem Component
- [ ] Vytvořit novou komponentu `ResultItem`:
  - `rank` prop s automatickým medal stylingem (1-3)
  - `variant="default" | "compact" | "detailed"`
  - Border-left accent podle ranku
  - Hover efekty
- [ ] Přidat `ResultItem.stories.tsx`
- [ ] Srovnat screenshots

**Úspora:** ~300 řádků

#### 22.6 ListItem Component
- [ ] Vytvořit novou komponentu `ListItem`:
  - `variant="alert" | "activity" | "feed"`
  - `type="warning" | "danger" | "info" | "success" | "energy"`
  - Icon container s gradient pozadím
  - Divider support
- [ ] Přidat `ListItem.stories.tsx`
- [ ] Srovnat screenshots

**Úspora:** ~250 řádků

#### 22.7 Wizard / Stepper Component
- [ ] Vytvořit novou komponentu `Wizard`:
  - `steps` array prop
  - `activeStep` prop
  - `completedSteps` prop
  - Connector lines mezi kroky
  - Responsive (ikonky only na mobilu)
- [ ] Přidat `Wizard.stories.tsx`
- [ ] Srovnat screenshots

**Úspora:** ~200 řádků

#### 22.8 ActionCard Component
- [ ] Vytvořit novou komponentu `ActionCard`:
  - Icon + title + description + arrow layout
  - Hover efekt (translateX)
  - `href` nebo `onClick` prop
- [ ] Přidat `ActionCard.stories.tsx`
- [ ] Srovnat screenshots

**Úspora:** ~150 řádků

#### 22.9 DateBadge Component
- [ ] Vytvořit novou komponentu `DateBadge`:
  - `date` prop (Date object)
  - `section` prop pro barevnou variantu
  - `size="sm" | "md" | "lg"`
- [ ] Přidat `DateBadge.stories.tsx`
- [ ] Srovnat screenshots

**Úspora:** ~100 řádků

#### 22.10 Prototype Adoption - Batch 1 (Calendar, Results)
- [ ] CalendarPage: Adoptovat DateBadge
- [ ] ResultsPage: Adoptovat HeroSection, ResultItem
- [ ] Smazat nahrazený CSS kód
- [ ] Srovnat screenshots - **musí být pixel-perfect**

#### 22.11 Prototype Adoption - Batch 2 (Profiles)
- [ ] AthletePublicProfile: HeroSection, StatCard variants, ResultItem
- [ ] ClubPublicProfile: HeroSection, StatCard variants, ListItem
- [ ] ProfilePage: HeroSection, StatCard variants
- [ ] Smazat nahrazený CSS kód
- [ ] Srovnat screenshots

#### 22.12 Prototype Adoption - Batch 3 (Dashboard, Registration)
- [ ] DashboardPage: HeroSection, StatCard variants, ListItem, ActionCard
- [ ] RegistrationPage: HeroSection, Wizard
- [ ] Smazat nahrazený CSS kód
- [ ] Srovnat screenshots

#### 22.13 Prototype Adoption - Batch 4 (Live, Event)
- [ ] LivePage: HeroSection, StatCard variants, ListItem
- [ ] EventDetailPage: HeroSection, StatCard variants
- [ ] Smazat nahrazený CSS kód
- [ ] Srovnat screenshots

#### 22.14 Final Cleanup
- [ ] Audit všech prototype CSS souborů - odstranit mrtvý kód
- [ ] Aktualizovat bundle size metriky
- [ ] Finální visual regression test - full suite
- [ ] Aktualizovat dokumentaci

### Metriky úspěchu

| Metrika | Před | Cíl |
|---------|------|-----|
| Prototype CSS řádků | 12 185 | < 8 500 |
| Nové komponenty | 0 | 6 |
| Rozšířené komponenty | 0 | 2 |
| Visual regressions | N/A | 0 |

### Rizika a mitigace

| Riziko | Pravděpodobnost | Mitigace |
|--------|-----------------|----------|
| Vizuální rozdíly po refaktoru | Střední | Pixel-perfect visual regression testing |
| Příliš generické komponenty | Nízká | Začít specificky, generalizovat postupně |
| Breaking changes v props | Střední | Zachovat zpětnou kompatibilitu, deprecation warnings |

### Odhad iterací

| Krok | Iterací | Poznámka |
|------|---------|----------|
| 22.1 Visual Regression | 1-2 | Setup + baseline |
| 22.2 Section Colors | 1 | Jednoduchý |
| 22.3 HeroSection | 2 | Největší komponenta |
| 22.4 StatCard | 1 | |
| 22.5 ResultItem | 1 | |
| 22.6 ListItem | 1 | |
| 22.7 Wizard | 2 | Komplexnější |
| 22.8 ActionCard | 1 | Jednoduchý |
| 22.9 DateBadge | 1 | Jednoduchý |
| 22.10 Batch 1 | 1 | 2 prototypy |
| 22.11 Batch 2 | 2 | 3 prototypy |
| 22.12 Batch 3 | 1 | 2 prototypy |
| 22.13 Batch 4 | 1 | 2 prototypy |
| 22.14 Cleanup | 1 | |
| **Celkem** | **~16-18** | |

### Další krok

**Začít s 22.1 Visual Regression Setup** - bez baseline screenshots nelze bezpečně refaktorovat.

### Git tag

```
v1.0.0-phase21-complete
```
Návratový bod před Phase 22.

---

## Shrnutí dokončených fází

### Fáze 17: DS Cleanup - Aesthetic Focus
- Odstranění experimentálních variant (gradient-energy, glass, glow)
- Nové komponenty: Icon, PageLayout, HeroSection, StatsBar, SectionHeader, FilterPills, CSKLogo, PodiumCard
- CSS reorganizace na LAYOUT + VISUAL STYLES sekce
- Všech 12 prototypů refaktorováno

### Fáze 18: Visual Polish
- Rozšíření utility tříd v `aesthetic.css` (hero gradienty, mesh backgrounds, animace)
- VISUAL STYLES sekce pro všechny prototypy
- Energy colors integration (Button accent, Badge energy, energyFocus, energyAccent)
- Fix header alignment v embed variantách

### Fáze 19: Optimization
- **Dead CSS Audit:** 0 mrtvého kódu (kód byl již čistý)
- **Card Consolidation:** Všechny prototypy správně používají Card komponentu
- **Stories Cleanup:** Stories jsou dobře strukturované
- **Bundle Size:** 339KB JS + 269KB CSS (přiměřené pro 35+ komponent)

### Fáze 20: Publikace
- Pre-release checklist ✅
- Build validace ✅
- Storybook build ✅

### Fáze 21: Post-release Polish
Dodatečné vizuální opravy po uživatelském testování:

| Oprava | Popis |
|--------|-------|
| Hero akční fotka | Reálná fotka Prskavce z kanoe.cz (MS Bratislava 2021) |
| Průhledný gradient | Hero gradient rgba 65-75% pro viditelnost fotky |
| Z-index stacking | image (0) < gradient (1) < pattern (2) |
| Rank badge embed | Menší badge v embed variantách (36px vs 64px) |
| EventDetailPage embed | Vylepšené hero s energy accent gradienty |
| LivePage embed | Opravený header padding |

---

## Metriky

| Metrika | Hodnota |
|---------|---------|
| Komponenty | 35+ |
| Prototypy | 12 |
| CSS bundle | 268.82 kB (gzip: 32.74 kB) |
| JS bundle | 338.94 kB (gzip: 54.35 kB) |
| Inline styles | 0 |
| Dead CSS | 0% |

---

## Tech stack

- **React 18+** s TypeScript (strict mode)
- **Vite** pro build
- **Storybook 8** pro dokumentaci
- **CSS custom properties** + režimy (utility/expressive/embed)
- **lucide-react** pro ikony

## Příkazy

```bash
npm run dev          # Storybook dev server
npm run build        # Production build
npm run build-storybook  # Static Storybook
npm run test         # Playwright testy
```

---

## Struktura src/

```
src/
├── components/     # React komponenty (35+)
├── context/        # ThemeContext (mode, theme)
├── tokens/         # CSS tokeny
│   ├── colors.css, typography.css, spacing.css
│   ├── utility.css, expressive.css, embed.css
│   ├── aesthetic.css  # Utility třídy pro Dynamic Sport styl
│   └── mode.css       # Přepínání režimů
├── prototypes/     # 12 celostránkových prototypů
├── hooks/          # Custom hooks
└── styles/         # Globální styly
```

---

## Další rozvoj (budoucí fáze)

### Aktivní: Fáze 22 - CSS Consolidation
Viz detailní plán výše.

### Budoucí rozšíření:

1. **Fáze 23: NPM publikace** - Balíček pro použití v jiných projektech
2. **Fáze 24: Accessibility audit** - WCAG 2.1 AA compliance
3. **Fáze 25: Performance optimization** - CSS purge, lazy loading
4. **Fáze 26: Další prototypy** - Nové stránky podle potřeb ČSK
