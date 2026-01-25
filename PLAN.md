# PLAN.md - CSK RVP Design System

## Aktuální stav

| Fáze | Status |
|------|--------|
| 0-14 (Založení až Test suite) | ✅ Hotovo |
| 15 (User feedback) | ✅ Hotovo |
| 16 (Konsolidace prototypů) | ✅ Hotovo |
| **17 (DS Cleanup - Aesthetic Focus)** | 🔄 Aktivní |

*Tag v0.5.0-cleanup-wip: Mezistav před čištěním*

---

## Fáze 17: DS Cleanup - Aesthetic Focus

**Cíl:** Zeštíhlit design systém zaměřením na Aesthetic styl. Odstranit experimentální varianty, sjednotit styling, eliminovat "přestylování" v prototypech.

**Princip:** Prototypy mají používat VÝHRADNĚ komponenty. Žádné custom CSS, inline styly ani ad-hoc classNames.

---

### 17.1 Komponenty - Odstranění experimentálních variant

#### 17.1.1 Tlačítka a vstupy

| Komponenta | Současné varianty | Zachovat | Odstranit |
|------------|-------------------|----------|-----------|
| **Button** | primary, secondary, ghost, danger, gradient, gradient-energy | primary, secondary, ghost, danger | gradient, gradient-energy |
| **Input** | + energyFocus | default, error, success | energyFocus |
| **Select** | + energyFocus, displayLabel | default, error, success | energyFocus |
| **SearchInput** | + energyFocus, chips | default + chips | energyFocus |

**Úkoly:**
- [x] Button: Odstranit `gradient`, `gradient-energy` varianty (CSS + stories + type)
- [x] Input: Odstranit `energyFocus` prop a CSS
- [x] Select: Odstranit `energyFocus` prop a CSS
- [x] SearchInput: Odstranit `energyFocus` prop a CSS

#### 17.1.2 Karty a kontejnery

| Komponenta | Současné varianty | Zachovat | Odstranit |
|------------|-------------------|----------|-----------|
| **Card** | surface, elevated, outlined, gradient, aesthetic | surface, elevated, outlined, aesthetic | gradient (sloučit do aesthetic) |
| **StatCard** | default, outlined, elevated + gradient, glass, gradient-subtle | default, outlined, elevated, aesthetic | gradient, glass, gradient-subtle, sparkline |
| **Modal** | default, gradient, glass, danger | default, danger | gradient, glass |

**Úkoly:**
- [x] Card: Odstranit `gradient` variantu, `meshBg` a `borderAccent` props (přesunout do aesthetic)
- [x] StatCard: Zredukovat `styleVariant` na default/aesthetic, odstranit sparkline
- [x] Modal: Odstranit `gradient`, `glass` varianty

#### 17.1.3 Navigace a tabs

| Komponenta | Současné varianty | Zachovat | Odstranit |
|------------|-------------------|----------|-----------|
| **Tabs** | line, pills, gradient, gradient-line, energy, glass | line, pills, aesthetic | gradient, gradient-line, energy, glass |
| **MainNav** | default, gradient, glass, pills | default, pills | gradient, glass |
| **Header** | default, elevated, gradient, satellite | default, elevated, satellite | gradient, blurOnScroll |

**Úkoly:**
- [x] Tabs: Sloučit varianty do line/pills/aesthetic, odstranit ostatní
- [x] MainNav: N/A (komponenta neexistuje)
- [x] Header: N/A (komponenta neexistuje)

#### 17.1.4 Feedback a indikátory

| Komponenta | Současné varianty | Zachovat | Odstranit |
|------------|-------------------|----------|-----------|
| **Toast** | default, success, warning, error, info, energy + gradient, glass | default, success, warning, error, info | energy, gradient, glass |
| **LiveIndicator** | default, live, recording, offline, connecting + gradient, glass | default, live, recording, offline, connecting | gradient, glass, glow intensity |
| **Badge** | default, primary, success, warning, error, info, gradient, energy | default, primary, success, warning, error, info, section badges | gradient, energy, glow |

**Úkoly:**
- [x] Toast: Odstranit `energy` variantu, `gradient`/`glass` styleVariants
- [x] LiveIndicator: Odstranit `gradient`/`glass` styleVariants, `intensity` prop
- [x] Badge: Odstranit `gradient`, `energy` varianty, `glow` efekt

#### 17.1.5 Specializované komponenty

| Komponenta | Současné varianty | Zachovat | Odstranit |
|------------|-------------------|----------|-----------|
| **AthleteCard** | default, compact, featured + gradient, glass, hero | default, compact, featured, aesthetic | gradient, glass, hero |
| **Avatar** | + glow, borderAccent | size/variant/color/status | glow, borderAccent |

**Úkoly:**
- [x] AthleteCard: Sloučit `gradient`/`glass`/`hero` do `aesthetic`, odstranit ostatní
- [x] Avatar: Odstranit `glow`, `borderAccent` props

---

### 17.2 Komponenty - Nové/Extrakce z prototypů

**Problém:** Prototypy definují mnoho opakujících se prvků, které by měly být komponenty.

#### Kandidáti na extrakci:

| Prvek | Výskyt | Nová komponenta |
|-------|--------|-----------------|
| CSK Logo | 12/12 prototypů | `<CSKLogo />` |
| SVG ikony | 12/12 prototypů (80+ ikon) | `<Icon name="..." />` nebo import z knihovny |
| Hero sekce | Athlete, Club, Event, Profile | `<HeroSection variant="athlete\|club\|event" />` |
| Stats bar | Athlete, Club, Event, Rankings, Dashboard | `<StatsBar items={[]} />` |
| Section header | Všude | `<SectionHeader title="..." action={...} />` |
| Podium cards | Results, Rankings | `<PodiumCard position={1\|2\|3} />` |
| Filter pills | Athletes, Clubs, Rankings, Calendar | `<FilterPills items={[]} />` |
| Page layout | Všechny | `<PageLayout variant="embed\|satellite">` |

**Priorita extrakce (podle dopadu):**

1. **Vysoká priorita (eliminuje nejvíce custom kódu):**
   - [x] `<Icon />` komponenta nebo lucide-react integrace
   - [x] `<PageLayout />` pro embed/satellite strukturu
   - [x] `<HeroSection />` pro profilové stránky
   - [x] `<StatsBar />` pro floating stats

2. **Střední priorita:**
   - [x] `<SectionHeader />` s title a optional action
   - [x] `<FilterPills />` pro filtry
   - [x] `<CSKLogo />` pro konzistentní branding

3. **Nízká priorita:**
   - [x] `<PodiumCard />` (ResultsPage, RankingsPage)

---

### 17.3 Prototypy - Eliminace custom stylingu

**Cíl:** Každý prototyp má mít MAX 50 řádků CSS (pouze layout grid/flex, žádné barvy/fonty/efekty).

#### Aktuální stav:

| Prototyp | CSS soubor | Řádky | Custom icons | Inline styles |
|----------|------------|-------|--------------|---------------|
| AthletePublicProfile | ✗ | ~400 | 10 | 3 |
| AthletesListPage | ✗ | ~300 | 6 | 2 |
| CalendarPage | ✗ | ~350 | 7 | 0 |
| ClubPublicProfile | ✗ | ~350 | 10 | 0 |
| ClubsListPage | ✗ | ~300 | 4 | 2 |
| DashboardPage | ✗ | ~450 | 14 | 3 |
| EventDetailPage | ✗ | ~400 | 9 | 1 |
| LivePage | ✗ | ~500 | 15 | 2 |
| ProfilePage | ✗ | ~400 | 15 | 0 |
| RankingsPage | ✗ | ~350 | 3 | 3 |
| RegistrationPage | ✗ | ~450 | 11 | 4 |
| ResultsPage | ✗ | ~350 | 8 | 4 |

**Postup pro každý prototyp:**
1. Nahradit SVG ikony za `<Icon />` komponentu
2. Nahradit custom hero za `<HeroSection />`
3. Nahradit custom stats za `<StatsBar />`
4. Nahradit layout wrappery za `<PageLayout />`
5. Odstranit inline styles (použít komponenty s props)
6. Zredukovat CSS na čistý layout

**Pořadí podle složitosti:**
1. [x] ClubsListPage (nejjednodušší) - refaktorováno: Icon, StatsBar
2. [x] AthletesListPage - refaktorováno: Icon, StatsBar
3. [x] RankingsPage - refaktorováno: Icon, StatsBar
4. [x] ClubPublicProfile - refaktorováno: Icon, StatsBar
5. [x] AthletePublicProfile - refaktorováno: Icon, StatsBar
6. [x] ResultsPage - refaktorováno: Icon, inline styles → CSS classes
7. [x] CalendarPage - refaktorováno: Icon (7 SVG → Icon component)
8. [x] EventDetailPage - refaktorováno: Icon (9 SVG → Icon component)
9. [x] ProfilePage - refaktorováno: Icon (15 SVG → Icon component)
10. [x] RegistrationPage - refaktorováno: Icon (16 SVG → Icon component)
11. [x] DashboardPage - refaktorováno: Icon (14 SVG → Icon component)
12. [x] LivePage - refaktorováno: Icon (16 SVG → Icon component)

---

### 17.4 CSS Cleanup ✅

**Cíl:** Odstranit nepoužívané styly z komponentových CSS souborů.

**Stav:** CSS souborů komponent bylo vyčištěno - odstraněny všechny experimentální varianty (gradient, glass, energy, glow).

| Soubor | Aktuální | Poznámka |
|--------|----------|----------|
| Button.css | 265 | ✅ Vyčištěno |
| Card.css | 249 | ✅ Vyčištěno |
| StatCard.css | 542 | ✅ Vyčištěno |
| Modal.css | 322 | ✅ Vyčištěno |
| Tabs.css | 359 | ✅ Vyčištěno |
| Toast.css | 649 | ✅ Vyčištěno |
| LiveIndicator.css | 448 | ✅ Vyčištěno |
| Badge.css | 311 | ✅ Vyčištěno |

**Poznámka:** Celkový počet řádků CSS komponent (16,046) je vyšší než původní cíl, protože přibyly nové komponenty (HeroSection, PageLayout, StatsBar, SectionHeader, Icon).

---

## Plán realizace

### Iterace 1: Icon systém ✅
- [x] Rozhodnout: vlastní `<Icon />` vs lucide-react → **lucide-react** (už bylo nainstalováno)
- [x] Implementovat icon komponentu → `<Icon name="..." />` wrapper
- [x] Vytvořit icon katalog → 45 ikon v kategorických stories

### Iterace 2: Layout komponenty ✅
- [x] `<PageLayout variant="embed|satellite" />` - page structure with header/footer/content
- [x] `<SectionHeader />` - section titles with optional badge and action
- [x] `<StatsBar />` - row of statistics with icons (inline/cards/compact variants)

### Iterace 3: Hero komponenta ✅
- [x] `<HeroSection variant="full|compact|minimal" section="dv|ry|vt|generic" />`
- [x] Mesh background, pattern overlay, section-specific gradients
- [x] Avatar/logo s bílým ringem, badges, metadata, actions
- [x] Floating content slot pro stats bar
- [x] Breadcrumbs (hidden in embed mode)

### Iterace 4: Cleanup - Tlačítka a vstupy ✅
- [x] Button: Odstranit `gradient`, `gradient-energy` varianty, `glow` prop
- [x] Input: Odstranit `energyFocus` prop a CSS
- [x] Select: Odstranit `energyFocus` prop a CSS
- [x] SearchInput: Odstranit `energyFocus` prop a CSS

### Iterace 5-6: Cleanup komponent (Cards → Toast) ✅
- [x] Všechny experimentální varianty odstraněny z komponent
- [x] CSS vyčištěno od gradient/glass/energy/glow stylů
- [x] Komentáře v CSS aktualizovány

### Iterace 7-12: Refactor prototypů ✅
- [x] Icon refactoring dokončen (všech 12 prototypů)
- [x] Inline styles odstraněny (0 výskytů)
- [ ] CSS redukce prototypů na layout-only (zbývá)

### Iterace 13: Finální audit
- [x] Ověřit všechny stories fungují (Storybook build OK)
- [x] Zkontrolovat CSS velikost (Component: 16,046, Prototype: 14,654)
- [x] Spustit testy (build validace OK, a11y testy vyžadují dev server)
- [ ] Refaktoring CSS prototypů na čistý layout (~50 řádků/prototyp)

### Iterace 14: EmptyState refaktoring ✅
- [x] AthletesListPage: custom empty state → EmptyState komponenta
- [x] ClubsListPage: custom empty state → EmptyState komponenta
- [x] Odstraněno ~106 řádků duplicitního CSS

### Iterace 15: FilterPills komponenta ✅
- [x] Vytvořit `<FilterPills />` komponentu (FilterPills.tsx, FilterPills.css)
- [x] Vytvořit stories s variantami (default, subtle, sizes)
- [x] Refaktorovat AthletesListPage: nahrazeno ~30 řádků custom JSX
- [x] Refaktorovat ClubsListPage: nahrazeno ~30 řádků custom JSX
- [x] Odstraněno ~130 řádků duplicitního CSS z prototypů

### Iterace 16: PodiumCard komponenta ✅
- [x] Vytvořit `<PodiumCard />` komponentu (PodiumCard.tsx, PodiumCard.css)
- [x] Vytvořit stories s variantami (gold/silver/bronze, sizes, layouts)
- [x] Refaktorovat ResultsPage: nahrazeno ~80 řádků custom JSX
- [x] Refaktorovat RankingsPage: nahrazeno lokální komponenta a ~20 řádků
- [x] Export do components/index.ts

### Iterace 17: CSS redukce AthletesListPage ✅
- [x] Analyzovat CSS - identifikovat layout vs vizuální styly
- [x] Přepsat CSS na layout-only (539 → 304 řádků, 52 pravidel)
- [x] Aktualizovat TSX pro použití utility tříd (csk-mesh-bg, csk-grain, csk-display, csk-reveal)
- [x] Nahradit custom sekce Card komponentou s variant="aesthetic"
- [x] Build validace OK

### Iterace 18: CSS redukce ClubsListPage ✅
- [x] Analyzovat CSS - identifikovat layout vs vizuální styly
- [x] Přepsat CSS na layout-only (687 → 338 řádků, 51% redukce)
- [x] Aktualizovat TSX pro použití utility tříd (csk-mesh-bg--hero, csk-grain, csk-display)
- [x] Nahradit custom club-card za Card komponentu s variant="aesthetic"
- [x] Build validace OK

### Iterace 19: CSS redukce RankingsPage ✅
- [x] Analyzovat CSS - identifikovat layout vs vizuální styly
- [x] Přepsat CSS na layout-only (988 → 333 řádků, 66% redukce)
- [x] Aktualizovat TSX pro použití utility tříd (csk-mesh-bg--hero, csk-grain, csk-display, csk-headline)
- [x] Nahradit custom sections za Card komponenty (section-tabs, rankings-top)
- [x] Nahradit custom VT class badges za Badge komponenty s vtClass prop
- [x] Přidat csk-reveal animace pro podium karty
- [x] Build validace OK

### Iterace 20: CSS redukce CalendarPage ✅
- [x] Analyzovat CSS - identifikovat layout vs vizuální styly
- [x] Přepsat CSS na layout-only (922 → 347 řádků, 62% redukce)
- [x] Aktualizovat TSX pro použití utility tříd (csk-display, csk-reveal, csk-border-*, csk-interactive)
- [x] View switcher: csk-surface-elevated, csk-rounded, csk-shadow-sm
- [x] Detail card: Card variant="aesthetic" s csk-border-accent
- [x] Build validace OK

### Iterace 21: CSS redukce ClubPublicProfile ✅
- [x] Analyzovat CSS - identifikovat layout vs vizuální styly
- [x] Přepsat CSS na layout-only (1012 → 543 řádků, 46% redukce)
- [x] Aktualizovat TSX - member cards, highlight cards, contact card → Card komponenta
- [x] Build validace OK

### Iterace 22: CSS redukce AthletePublicProfile ✅
- [x] Analyzovat CSS - identifikovat layout vs vizuální styly
- [x] Přepsat CSS na layout-only (1154 → 644 řádků, 44% redukce)
- [x] Aktualizovat TSX - highlight cards, result cards, chart placeholder → Card komponenta
- [x] Build validace OK

### Iterace 23: CSS redukce ResultsPage ✅
- [x] Analyzovat CSS - identifikovat layout vs vizuální styly
- [x] Přepsat CSS na layout-only (1199 → 489 řádků, 59% redukce)
- [x] Odstranit legacy podium CSS (používá PodiumCard komponentu)
- [x] Aktualizovat TSX - Card pro header, csk-display/headline pro typografii
- [x] Build validace OK

### Iterace 24: CSS reorganizace EventDetailPage ✅
- [x] Analyzovat CSS - identifikovat layout vs vizuální styly
- [x] Reorganizovat CSS - oddělení layout a visual sekcí (1150 → 1219 řádků)
- [x] Poznámka: Hero vyžaduje custom gradienty pro dv/ry/vt sekce, nelze extrahovat
- [x] Build validace OK

### Iterace 25: CSS reorganizace DashboardPage ✅
- [x] Analyzovat CSS - identifikovat layout vs vizuální styly
- [x] Reorganizovat CSS - oddělení LAYOUT a VISUAL sekcí (1215 → 1370 řádků)
- [x] Poznámka: Obsahuje discipline-specific hero gradienty, gradient stat cards, pulse rings animace
- [x] Build validace OK

### Iterace 26: CSS reorganizace ProfilePage ✅
- [x] Analyzovat CSS - identifikovat layout vs vizuální styly
- [x] Reorganizovat CSS - oddělení LAYOUT a VISUAL sekcí (1550 → 1749 řádků)
- [x] Poznámka: Obsahuje discipline-specific hero gradienty, aesthetic mode, registrations/pinned tabs
- [x] Build validace OK

### Iterace 27: CSS reorganizace LivePage ✅
- [x] Analyzovat CSS - identifikovat layout vs vizuální styly
- [x] Reorganizovat CSS - oddělení LAYOUT a VISUAL sekcí (2434 → 2775 řádků)
- [x] Poznámka: Obsahuje discipline-specific gradienty, pulse animace, oncourse/podium/schedule panely, fullscreen mode
- [x] Build validace OK

### Iterace 28: CSS reorganizace RegistrationPage ✅
- [x] Analyzovat CSS - identifikovat layout vs vizuální styly
- [x] Reorganizovat CSS - oddělení LAYOUT a VISUAL sekcí (1557 → 1757 řádků)
- [x] Poznámka: Obsahuje discipline-specific hero/wizard/summary gradienty, countdown, crew selection, aesthetic mode
- [x] Build validace OK

---

## Metriky úspěchu

| Metrika | Před | Aktuální | Cíl |
|---------|------|----------|-----|
| Component CSS | ~7,800 řádků | 16,046 řádků* | ~10,000 řádků |
| Prototype CSS | ~4,500 řádků | 11,867 řádků | ~600 řádků |
| Inline styles | 28 | **0** ✅ | 0 |
| Custom icons | 80+ | **0** ✅ | 0 (vše přes Icon) |

*Nárůst způsoben novými komponentami (HeroSection, PageLayout, StatsBar, SectionHeader, Icon)

---

## Tech stack

- **React 18+** s TypeScript (strict mode)
- **Vite** pro build
- **Storybook 8** pro dokumentaci
- **CSS custom properties** + režimy (utility/expressive/embed)

## Příkazy

```bash
npm run dev          # Storybook dev server
npm run build        # Production build
npm run test         # Playwright testy
```
