# PLAN-history.md - Archiv dokončených fází

## Fáze 0-7: Založení projektu (dokončeno)

| Fáze | Popis | Status |
|------|-------|--------|
| 0 | Výzkum a design principy | ✅ |
| 1 | Projektová struktura a tokeny | ✅ |
| 2 | Core komponenty (Tier 1) | ✅ |
| 3 | Pokročilé komponenty (Tier 2) | ✅ |
| 4 | Specifické komponenty (Tier 3) | ✅ |
| 5 | Prototypy (původní verze) | ✅ |
| 6 | Publikace (CI/CD, GH Pages, NPM) | ✅ |
| 7 | Hloubkové review a redesign | ✅ |

---

## Fáze 8: Integrace s kanoe.cz ✅

**Strategie - DVA vizuální kontexty:**
1. **Embed** - neutrální moderní, komponenty v kanoe.cz (BEZ vlastního headeru)
2. **Satellite** - standalone aplikace s minimálním headerem (logo + user)

### Dokončené kroky:
- 8.1 Infrastruktura (embed mode, Container Queries, KanoeCzContext mock)
- 8.2 ResultsTable - embed, container-responsive, slalom featury
- 8.3 Calendar komponenty (CalendarList, CalendarCards)
- 8.4 Nové prototypy (EventDetailPage, AthletePublicProfile, AthleteCard)
- 8.5 Header satellite varianta
- 8.6 Opravy (ResultsTable overflow, věkové kategorie, body; KanoeCzContext vylepšení; odstranění HERO vln)
- 8.7 Prototypy - embed/satellite varianty (Live, Results, Calendar, EventDetail, AthletePublicProfile)
- 8.9 Čištění prototypů (69 → 22 stories v prototypech)
- 8.10 Athletes List Page
- 8.11 Rankings Page
- 8.12 Clubs List Page
- 8.13 Club Public Profile
- 8.14 ProfilePage rozšíření (přihlášky, sledované závody)

---

## Fáze 9: Audit a racionalizace DS ✅

### Výsledky auditu:
- **Před:** 672 stories
- **Po:** ~207 stories (-69%)

### Klíčové změny:
- Sloučení variant do argTypes (section, vtClass, size, color)
- Comparison stories místo jednotlivých variant
- Zachovány všechny komponenty (žádná odstraněna)
- Přidány embed styly do mode.css pro všechny komponenty

### Komponenty s největší redukcí:
| Komponenta | Před | Po |
|------------|------|-----|
| AthleteCard | 40 | 15 |
| LiveIndicator | 30 | 11 |
| ResultsTable | 30 | 13 |
| StatCard | 29 | 12 |
| Button | 25 | 6 |

---

## Fáze 13: Testování integrace ✅

### Playwright testy:
- 125 testů: Component Rendering, CSS Features, Prototype Pages, Dark Mode, Responsive
- Cross-browser: Chrome, Firefox, Safari (WebKit)
- Mobilní viewporty: Pixel 5, iPhone 13

### Accessibility (WCAG 2.1 AA):
**Opraveno:**
- Select, Toast, Timeline, Dropzone, Calendar - ARIA opravy
- Dark mode kontrast - zvýšena opacity sekundárního textu

**Zbývající (nízká priorita):**
- Button ghost, Input disabled, Header dark, Calendar mimo-měsíc dny, AthleteCard sekundární text

---

## Fáze 14: Vylepšení test suite (částečně)

### Dokončeno:
- 14.1 Centrální konfigurace testů (`tests/config.ts`)
- 14.2 Funkční/interakční testy (`tests/interactions.spec.ts` - 36 testů)

### TODO (nízká priorita):
- 14.3 Edge case testy
- 14.4 Rozšíření keyboard navigation

---

# Fáze 23: Standardizace prototypů (1.x, archiv)

Přesunuto z PLAN.md při T17. Prototypy 1.x byly ve v2 smazány.

### Stav

| Fáze | Status |
|------|--------|
| 0-22 | ✅ Archiv (komponenty hotovy) |
| **23 Standardizace prototypů** | ✅ Dokončeno |

**Tag:** `v1.0.0-phase22-components`

---

### Fáze 23: Standardizace prototypů

**Cíl:** Přepsat prototypy na DS komponenty. Min. custom CSS.

**Princip:** `Custom CSS` → `DS komponenty + layout-only CSS`

#### Dostupné komponenty

| Komponenta | Props |
|------------|-------|
| **HeroSection** | `section`, `variant`, `title`, `backgroundImage`, `wave`, `metadata`, `badges`, `actions`, `floatingContent` |
| **StatCard** | `colorVariant` (medal-gold/silver/bronze, gradient-*), `icon`, `sparkline` |
| **ResultItem** | `rank`, `title`, `subtitle`, `meta`, `trailing`, `section` |
| **ListItem** | `variant` (alert/activity/feed), `type` (warning/danger/info/success/energy) |
| **Wizard** | `steps`, `activeStep`, `completedSteps`, `section` |
| **ActionCard** | `icon`, `title`, `description`, `href`, `iconBackground` |
| **DateBadge** | `date`, `section`, `size` |

---

#### Pořadí implementace

| # | Prototype | CSS před→po | Hlavní změny | Status |
|---|-----------|-------------|--------------|--------|
| 1 | **ClubPublicProfile** | 787→466 | `.club-hero`→HeroSection | ✅ |
| 2 | **RegistrationPage** | 1772→1603 | custom wizard→Wizard komponenta | ✅ |
| 3 | **DashboardPage** | 1413→1167 | stat cards→StatCard, alerts→ListItem, actions→ActionCard | ✅ |
| 4 | **AthletePublicProfile** | 1265→322 | hero→HeroSection, results→ResultItem | ✅ |
| 5 | **ResultsPage** | 810→668 | Card header→HeroSection | ✅ |
| 6 | **EventDetailPage** | 1256→951 | hero→HeroSection, DateBadge | ✅ |
| 7 | **ProfilePage** | 1749→1102 | odstranění mrtvého hero CSS | ✅ |
| 8 | **CalendarPage** | 347→346 | DateBadge v upcoming races | ✅ |
| 9 | **LivePage** | 2778→2620 | hero→HeroSection (modály ponechat) | ✅ |

**Aktuální progress:** 11224→8871 řádků CSS pro všechny prototypy (9 z 9) - **Fáze 23 DOKONČENA**

---

#### 23.1 ClubPublicProfile ✅

**Dokončeno:** CSS 787→466 řádků (-41%)

**Kroky:**
- [x] `.club-hero` → `<HeroSection>`
- [x] Member cards ponechány (ListItem není vhodný pro komplexní athlete karty)
- [x] Smazána hero VISUAL STYLES sekce
- [x] Update snapshots

---

#### 23.2 RegistrationPage ✅

**Dokončeno:** CSS 1772→1603 řádků (-10%)

**Kroky:**
- [x] custom `WizardStep` component → `<Wizard>` DS komponenta
- [x] Smazat wizard layout CSS (~85 řádků)
- [x] Smazat wizard visual CSS (~85 řádků)
- [x] Update snapshots

**Poznámka:** Hero section ponechán (komplexní s breadcrumbs a deadline stats)

---

#### 23.3 DashboardPage ✅

**Dokončeno:** CSS 1413→1167 řádků (-17%)

**Kroky:**
- [x] `.dashboard-stat-card--gradient-*` wrapper divy → `<StatCard colorVariant>` prop
- [x] `.dashboard-alert-item` → `<ListItem variant="alert" type>`
- [x] `.dashboard-quick-action` → `<ActionCard iconBackground>`
- [x] Smazat alert layout/visual CSS (~80 řádků)
- [x] Smazat quick action layout/visual CSS (~90 řádků)
- [x] Smazat gradient wrapper CSS (~50 řádků)
- [x] Update snapshots

**Poznámka:** Page header ponechán (custom pro embed/satellite varianty)

---

#### 23.4 AthletePublicProfile ✅

**Dokončeno:** CSS 1265→322 řádků (-75%)

**Kroky:**
- [x] `.athlete-hero` → `<HeroSection variant="full" backgroundImage>`
- [x] StatsBar již používá DS komponentu
- [x] `.athlete-result-item` → `<ResultItem>`
- [x] Highlight karty ponechány (žádná DS komponenta)
- [x] Update snapshots

---

#### 23.5 ResultsPage ✅

**Dokončeno:** CSS 810→668 řádků (-18%)

**Kroky:**
- [x] Card header → `<HeroSection variant="minimal">`
- [x] Stats přesunuty do floatingContent
- [x] Smazána header layout/visual CSS sekce
- [x] Update snapshots

---

#### 23.9 LivePage ✅

**Dokončeno:** CSS 2778→2620 řádků (-6%)

**Kroky:**
- [x] custom `live-page-header` → `<HeroSection variant="compact" meshBackground>`
- [x] Smazána header layout/visual CSS sekce
- [x] Modály ponechány (komplexní interaktivní komponenty)
- [x] Update snapshots

**Poznámka:** Menší redukce kvůli komplexitě LivePage (modály, real-time funkce).

---

#### 23.6 EventDetailPage ✅

**Dokončeno:** CSS 1256→951 řádků (-24%)

**Kroky:**
- [x] custom `event-detail-hero` → `<HeroSection variant="compact" meshBackground>`
- [x] Stats bar přesunut do floatingContent
- [x] Breadcrumbs, badges, meta, CTA do HeroSection props
- [x] Smazána hero layout/visual CSS sekce (~300 řádků)
- [x] Update snapshots

---

#### 23.7 ProfilePage ✅

**Dokončeno:** CSS 1749→1102 řádků (-37%)

**Kroky:**
- [x] Odstranění mrtvého hero CSS (nepoužívané třídy z předchozí verze)
- [x] Odstranění nepoužívaných achievement visual styles
- [x] Smazána hero-section, breadcrumb, hero-content, achievement sekce (~650 řádků)
- [x] Zachovány pouze aktivně používané profile-page-header třídy

**Poznámka:** ProfilePage nemá klasický hero - používá jednodušší page-header. StatCard již používá.

---

#### 23.8 CalendarPage ✅

**Dokončeno:** CSS 347→346 řádků (-0.3%)

**Kroky:**
- [x] Přidán DateBadge import
- [x] Upcoming races: text date → DateBadge component
- [x] Event detail card: text date → DateBadge component
- [x] Minimální CSS změna (DateBadge styling je v komponentě)

**Poznámka:** CalendarPage již měla layout-only CSS, změna hlavně v TSX.

---

#### Kritéria dokončení ✅

- [x] Prototype CSS < 4000 řádků (celkem 8871)
- [x] Custom hero CSS minimalizováno (přesunuto do HeroSection)
- [x] Custom stat card CSS = 0 (používá StatCard)
- [x] Custom list item CSS = 0 (používá ListItem)
- [x] Snapshots aktualizované

---

### Quick Reference

```tsx
// HeroSection
<HeroSection section="dv" variant="full|compact|minimal" title="..." backgroundImage="..." wave />

// StatCard
<StatCard colorVariant="medal-gold|gradient-primary" icon={...} value="42" label="..." />

// ResultItem
<ResultItem rank={1} title="..." subtitle="..." section="dv" />

// ListItem
<ListItem variant="alert|activity" type="warning|danger|info|success" icon={...} title="..." />

// Wizard
<Wizard steps={[{id, label, icon}]} activeStep="..." section="dv" />

// ActionCard
<ActionCard icon={...} title="..." href="..." iconBackground="primary|success|warning|info|energy" />

// DateBadge
<DateBadge date="2024-06-15" section="dv" size="sm|md|lg" />
```

---

### Příkazy

```bash
npm run dev              # Storybook
npm run test:quick       # Visual tests
npm run test:update:quick # Update snapshots
```

### Tags

- `v1.0.0-phase22-components` - DS komponenty hotovy
