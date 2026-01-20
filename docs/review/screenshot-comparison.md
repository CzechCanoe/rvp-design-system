# Screenshot Comparison: CSK vs. Reference Design Systems

Dokument porovnává aktuální vizuální stav CSK RVP Design System s top referencemi na základě Playwright screenshotů.

---

## 1. Přehled screenshotů

Všechny screenshoty jsou generovány automaticky pomocí Playwright a jsou uloženy v:
- `tests/components.spec.ts-snapshots/` - jednotlivé komponenty
- `tests/prototypes.spec.ts-snapshots/` - kompletní stránky

### 1.1 Komponenty (light mode)

| Komponenta | Screenshot | Velikost |
|------------|------------|----------|
| Button | `Button-light-chromium-linux.png` | 2 KB |
| Button (All Variants) | `Button-AllVariants-light-chromium-linux.png` | 5 KB |
| Card | `Card-light-chromium-linux.png` | 5 KB |
| Card (All Variants) | `Card-AllVariants-light-chromium-linux.png` | 8 KB |
| Badge | `Badge-light-chromium-linux.png` | 1 KB |
| Badge (CSK Sections) | `Badge-CskSections-light-chromium-linux.png` | 8 KB |
| Input | `Input-light-chromium-linux.png` | 2 KB |
| Input (All States) | `Input-AllStates-light-chromium-linux.png` | 15 KB |
| Table | `Table-light-chromium-linux.png` | 27 KB |
| Header | `Header-light-chromium-linux.png` | 8 KB |
| AthleteCard | `AthleteCard-light-chromium-linux.png` | 7 KB |
| StatCard | `StatCard-light-chromium-linux.png` | 6 KB |
| ResultsTable | `ResultsTable-light-chromium-linux.png` | 42 KB |
| LiveIndicator | `LiveIndicator-light-chromium-linux.png` | 1 KB |
| Calendar | `Calendar-light-chromium-linux.png` | 42 KB |
| Timeline | `Timeline-light-chromium-linux.png` | 35 KB |

### 1.2 Prototypy (light mode)

| Stránka | Screenshot | Velikost |
|---------|------------|----------|
| Calendar Page | `CalendarPage-light-chromium-linux.png` | 99 KB |
| Results Page | `ResultsPage-light-chromium-linux.png` | 225 KB |
| Live Page | `LivePage-light-chromium-linux.png` | 187 KB |
| Profile Page | `ProfilePage-light-chromium-linux.png` | 113 KB |
| Registration Page | `RegistrationPage-light-chromium-linux.png` | 92 KB |
| Dashboard Page | `DashboardPage-ClubAdmin-light-chromium-linux.png` | 191 KB |

---

## 2. Detailní srovnání klíčových komponent

### 2.1 Button

**CSK aktuální stav:**
- Flat design, solid background colors
- Varianty: primary, secondary, ghost, danger, outline
- Hover: pouze změna barvy (darker shade)
- Žádné shadows, žádné gradienty
- Text: Inter regular, sentence case

**World Athletics reference:**
- Gradient backgrounds (purple → deeper purple)
- Subtle shadow i v default stavu
- Hover: scale(1.02) + enhanced shadow
- Text: bold, uppercase
- Rounded corners: větší (8-12px)

**Gap analýza:**
| Aspekt | CSK | World Athletics | Rozdíl |
|--------|-----|-----------------|--------|
| Background | Solid | Gradient | ❌ Chybí |
| Shadow | None | Subtle | ❌ Chybí |
| Hover effect | Color only | Scale + shadow | ❌ Chybí |
| Typography | Regular | Bold uppercase | ⚠️ Méně výrazné |
| Border radius | 4px | 8-12px | ⚠️ Menší |

**Doporučení:**
- Přidat `variant="gradient"` pro expresivní použití
- Implementovat hover s `transform: scale(1.02)` a shadow
- Přidat expresivní variantu s uppercase text

---

### 2.2 Card

**CSK aktuální stav:**
- 3 varianty: surface (flat), elevated (shadow-sm), outlined
- Hover na clickable: translateY(-2px), shadow-md
- Padding: 16-24px
- Border radius: 8px

**World Athletics/FIS reference:**
- Gradient overlay na image cards
- Dramatické shadows (multiple layers)
- Hover: výrazný lift efekt
- Padding: 24-32px (více "air")
- Glassmorphism efekty na premium cards

**Gap analýza:**
| Aspekt | CSK | Reference | Rozdíl |
|--------|-----|-----------|--------|
| Image overlay | None | Gradient | ❌ Chybí |
| Shadow depth | 1 layer | 2-3 layers | ⚠️ Slabší |
| Hover lift | 2px | 4-8px | ⚠️ Méně dramatický |
| Padding | 16-24px | 24-32px | ⚠️ Těsnější |
| Glassmorphism | None | Premium cards | ❌ Chybí |

**Doporučení:**
- Přidat `variant="gradient"` s gradient overlay
- Implementovat `variant="glass"` s backdrop-blur
- Zvětšit hover lift na 4px pro expresivní režim

---

### 2.3 Header

**CSK aktuální stav:**
- 3 varianty: default (solid), transparent, elevated
- Background: bg-surface nebo transparent
- Žádný blur efekt
- Statická pozice

**World Athletics/FIS reference:**
- Sticky header s backdrop-blur při scrollu
- Gradient background možnost
- Transition z transparent → solid
- Mega-menu pro komplexní navigaci

**Gap analýza:**
| Aspekt | CSK | Reference | Rozdíl |
|--------|-----|-----------|--------|
| Sticky | No | Yes | ❌ Chybí |
| Backdrop blur | No | On scroll | ❌ Chybí |
| Scroll transition | No | Yes | ❌ Chybí |
| Mega-menu | No | Complex nav | ❌ Chybí |

**Doporučení:**
- Přidat `sticky` prop s scroll-aware behavior
- Implementovat backdrop-blur při scrollu
- Přidat mega-menu pattern pro hlavní navigaci

---

### 2.4 ResultsTable

**CSK aktuální stav:**
- Základní tabulkový layout
- Sortable columns
- Row highlighting na hover
- Position column bez speciálního stylingu

**FIS/World Athletics reference:**
- Position medals (1-3): zlatá/stříbrná/bronzová barva
- Sticky header pro dlouhé tabulky
- Animated row changes (pro live timing)
- Position delta indikátory (↑↓)
- Personal best highlighting

**Gap analýza:**
| Aspekt | CSK | Reference | Rozdíl |
|--------|-----|-----------|--------|
| Position medals | No | Gold/Silver/Bronze | ❌ Chybí |
| Sticky header | No | Yes | ❌ Chybí |
| Live animations | No | Row transitions | ❌ Chybí |
| Position delta | No | ↑↓ indicators | ❌ Chybí |
| PB highlight | No | Special styling | ❌ Chybí |

**Doporučení:**
- Implementovat medal styling pro pozice 1-3
- Přidat sticky header option
- Přidat position delta column s animacemi

---

### 2.5 AthleteCard

**CSK aktuální stav:**
- Default a featured varianty
- Featured má basic linear gradient
- Section color accent (DV/RY/VT border)
- Hover s translateY a shadow

**World Athletics reference:**
- Hero varianta s fullbleed fotkou
- Gradient overlay na fotografii
- Achievement/medal showcase
- Animated hover s glow efekt

**Gap analýza:**
| Aspekt | CSK | Reference | Rozdíl |
|--------|-----|-----------|--------|
| Hero variant | No | Full photo | ❌ Chybí |
| Photo overlay | No | Gradient | ❌ Chybí |
| Medal showcase | No | Achievements | ❌ Chybí |
| Glow on hover | No | Subtle glow | ❌ Chybí |

**Doporučení:**
- Přidat `variant="hero"` s fullbleed fotkou
- Implementovat gradient overlay pro fotografické karty
- Přidat medal/achievement props

---

### 2.6 StatCard

**CSK aktuální stav:**
- Value, label, trend indicator
- Icon container s background
- Loading state
- Trend: up/down/neutral badge

**UCI/FIS reference:**
- Sparkline mini-grafy
- Gradient background varianty
- Animated number transitions
- Comparison s předchozím obdobím

**Gap analýza:**
| Aspekt | CSK | Reference | Rozdíl |
|--------|-----|-----------|--------|
| Sparkline | No | Mini chart | ❌ Chybí |
| Gradient bg | No | Yes | ❌ Chybí |
| Number animation | No | Count up | ❌ Chybí |
| Period comparison | No | vs. last period | ❌ Chybí |

**Doporučení:**
- Přidat sparkline komponenta nebo prop
- Implementovat gradient background variantu
- Přidat animované čísla pro dashboard feel

---

### 2.7 LiveIndicator

**CSK aktuální stav:**
- Pulsující červený dot
- "LIVE" text
- Jednoduchá pulse animace

**World Athletics/FIS reference:**
- Dramatic glow efekt
- Více intenzivní pulsování
- Varianty: compact, prominent
- Někdy sound wave animace

**Gap analýza:**
| Aspekt | CSK | Reference | Rozdíl |
|--------|-----|-----------|--------|
| Glow effect | No | Red glow | ❌ Chybí |
| Pulse intensity | Subtle | Dramatic | ⚠️ Slabší |
| Size variants | No | Compact/Large | ❌ Chybí |

**Doporučení:**
- Přidat box-shadow glow efekt
- Zvýšit intenzitu pulse animace
- Přidat size varianty

---

## 3. Srovnání prototypů

### 3.1 Calendar Page

**CSK aktuální stav:**
- Kalendářová mřížka s událostmi
- Filtrování podle sekce
- Card-based event display
- Kompaktní layout

**Reference (FIS events, World Athletics calendar):**
- Hero sekce s featured event
- Vizuálně bohatší event karty
- Fotografické pozadí pro featured
- Countdown pro blížící se události

**Hlavní gap:** Chybí hero sekce a featured events highlighting

---

### 3.2 Results Page

**CSK aktuální stav:**
- ResultsTable komponenta
- Filtrování a sorting
- Basic position display

**Reference (FIS results, World Athletics records):**
- Dramatický leaderboard pro top 3
- Medal podium vizualizace
- Animated transitions pro live
- Position change indicators

**Hlavní gap:** Chybí medal/podium vizualizace pro top pozice

---

### 3.3 Live Page

**CSK aktuální stav:**
- LiveIndicator komponenta
- Auto-refresh výsledky
- Timeline událostí

**Reference (Inside Track LIVE, FIS live timing):**
- Immersive full-screen layout
- Dramatic real-time animace
- Sound/notification options
- Split view pro více závodů

**Hlavní gap:** Méně "dramatický" live feel, chybí immersive režim

---

### 3.4 Profile Page

**CSK aktuální stav:**
- AthleteCard s daty
- Statistiky a výsledky
- Timeline kariéry

**Reference (World Athletics athlete profiles):**
- Hero header s velkou fotkou
- Achievement showcase (medaile, rekordy)
- Interaktivní grafy výkonnosti
- Social sharing

**Hlavní gap:** Chybí hero header a medal showcase

---

## 4. Shrnutí priorit

### Vysoká priorita (největší vizuální dopad)

1. **Button gradient variant** - nejčastěji viditelná komponenta
2. **Card gradient/glass variants** - hero sekce, featured content
3. **ResultsTable medals** - sportovní specifika, okamžitě rozpoznatelné
4. **Header backdrop blur** - moderní feel

### Střední priorita

5. **AthleteCard hero variant** - profily jsou důležité
6. **StatCard sparklines** - dashboard vizualizace
7. **LiveIndicator glow** - live experience
8. **HeroSection komponenta** - chybí úplně

### Nižší priorita

9. **Sticky table headers** - UX improvement
10. **Countdown timer** - event specific
11. **Mega-menu navigation** - komplexní implementace

---

## 5. Způsob prohlížení screenshotů

Screenshoty lze prohlížet:

1. **Přímo v souborovém systému:**
   ```bash
   # Light mode komponenty
   ls tests/components.spec.ts-snapshots/*-light-*.png

   # Dark mode komponenty
   ls tests/components.spec.ts-snapshots/*-dark-*.png

   # Prototypy
   ls tests/prototypes.spec.ts-snapshots/*.png
   ```

2. **V Playwright report:**
   ```bash
   npm run test:visual
   npx playwright show-report
   ```

3. **Ve Storybook:**
   ```bash
   npm run storybook
   # Navigovat na jednotlivé komponenty
   ```

---

*Dokument vytvořen: 2026-01-20*
*Součást fáze 7.1 - Screenshot comparison*
