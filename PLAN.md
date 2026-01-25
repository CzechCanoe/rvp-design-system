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
- [ ] Card: Odstranit `gradient` variantu, `meshBg` a `borderAccent` props (přesunout do aesthetic)
- [ ] StatCard: Zredukovat `styleVariant` na default/aesthetic, odstranit sparkline
- [ ] Modal: Odstranit `gradient`, `glass` varianty

#### 17.1.3 Navigace a tabs

| Komponenta | Současné varianty | Zachovat | Odstranit |
|------------|-------------------|----------|-----------|
| **Tabs** | line, pills, gradient, gradient-line, energy, glass | line, pills, aesthetic | gradient, gradient-line, energy, glass |
| **MainNav** | default, gradient, glass, pills | default, pills | gradient, glass |
| **Header** | default, elevated, gradient, satellite | default, elevated, satellite | gradient, blurOnScroll |

**Úkoly:**
- [ ] Tabs: Sloučit varianty do line/pills/aesthetic, odstranit ostatní
- [ ] MainNav: Odstranit `gradient`, `glass` varianty
- [ ] Header: Odstranit `gradient` variantu, `blurOnScroll` prop

#### 17.1.4 Feedback a indikátory

| Komponenta | Současné varianty | Zachovat | Odstranit |
|------------|-------------------|----------|-----------|
| **Toast** | default, success, warning, error, info, energy + gradient, glass | default, success, warning, error, info | energy, gradient, glass |
| **LiveIndicator** | default, live, recording, offline, connecting + gradient, glass | default, live, recording, offline, connecting | gradient, glass, glow intensity |
| **Badge** | default, primary, success, warning, error, info, gradient, energy | default, primary, success, warning, error, info, section badges | gradient, energy, glow |

**Úkoly:**
- [ ] Toast: Odstranit `energy` variantu, `gradient`/`glass` styleVariants
- [ ] LiveIndicator: Odstranit `gradient`/`glass` styleVariants, `intensity` prop
- [ ] Badge: Odstranit `gradient`, `energy` varianty, `glow` efekt

#### 17.1.5 Specializované komponenty

| Komponenta | Současné varianty | Zachovat | Odstranit |
|------------|-------------------|----------|-----------|
| **AthleteCard** | default, compact, featured + gradient, glass, hero | default, compact, featured, aesthetic | gradient, glass, hero |
| **Avatar** | + glow, borderAccent | size/variant/color/status | glow, borderAccent |

**Úkoly:**
- [ ] AthleteCard: Sloučit `gradient`/`glass`/`hero` do `aesthetic`, odstranit ostatní
- [ ] Avatar: Odstranit `glow`, `borderAccent` props

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
   - [ ] `<FilterPills />` pro filtry
   - [ ] `<CSKLogo />` pro konzistentní branding

3. **Nízká priorita:**
   - [ ] `<PodiumCard />` (pouze 2 použití)

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
1. [ ] ClubsListPage (nejjednodušší)
2. [ ] AthletesListPage
3. [ ] RankingsPage
4. [ ] ClubPublicProfile
5. [ ] AthletePublicProfile
6. [ ] ResultsPage
7. [ ] CalendarPage
8. [ ] EventDetailPage
9. [ ] ProfilePage
10. [ ] RegistrationPage
11. [ ] DashboardPage
12. [ ] LivePage (nejsložitější)

---

### 17.4 CSS Cleanup

**Cíl:** Odstranit nepoužívané styly z komponentových CSS souborů.

| Soubor | Před | Očekávaný po |
|--------|------|--------------|
| Button.css | 336 | ~200 |
| Card.css | 305 | ~200 |
| StatCard.css | 749 | ~300 |
| Modal.css | 383 | ~250 |
| Tabs.css | 524 | ~250 |
| MainNav.css | 748 | ~400 |
| Header.css | 543 | ~350 |
| Toast.css | 813 | ~400 |
| LiveIndicator.css | 657 | ~350 |
| Badge.css | 383 | ~250 |
| AthleteCard.css | 854 | ~400 |
| Input.css | 482 | ~350 |
| SearchInput.css | 481 | ~350 |
| Select.css | 425 | ~300 |
| Avatar.css | 416 | ~300 |
| **Celkem** | ~7,799 | ~4,650 |

**Očekávaná redukce:** ~40% CSS

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

### Iterace 5-6: Cleanup komponent (Cards → Toast)
- Podle 17.1.2 - 17.1.5 odstraňovat experimentální varianty

### Iterace 7-12: Refactor prototypů
- Podle 17.3 postupně přepisovat prototypy na komponenty

### Iterace 13: Finální audit
- [ ] Ověřit všechny stories fungují
- [ ] Zkontrolovat CSS velikost
- [ ] Spustit testy

---

## Metriky úspěchu

| Metrika | Před | Cíl |
|---------|------|-----|
| CSS celkem | ~16,600 řádků | ~10,000 řádků |
| Prototype CSS | ~4,500 řádků | ~600 řádků |
| Inline styles | 28 | 0 |
| Custom icons | 80+ | 0 (vše přes Icon) |
| Story počet | 318 | ~200 |

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
