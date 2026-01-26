# PLAN.md - CSK RVP Design System

## Stav

| Fáze | Status |
|------|--------|
| 0-22 | ✅ Archiv (komponenty hotovy) |
| **23 Standardizace prototypů** | 🔄 Aktivní |

**Tag:** `v1.0.0-phase22-components`

---

## Fáze 23: Standardizace prototypů

**Cíl:** Přepsat prototypy na DS komponenty. Min. custom CSS.

**Princip:** `Custom CSS` → `DS komponenty + layout-only CSS`

### Dostupné komponenty

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

### Pořadí implementace

| # | Prototype | CSS před→po | Hlavní změny | Status |
|---|-----------|-------------|--------------|--------|
| 1 | **ClubPublicProfile** | 787→466 | `.club-hero`→HeroSection | ✅ |
| 2 | **RegistrationPage** | 1772→1603 | custom wizard→Wizard komponenta | ✅ |
| 3 | **DashboardPage** | 1413→1167 | stat cards→StatCard, alerts→ListItem, actions→ActionCard | ✅ |
| 4 | **AthletePublicProfile** | 1265→322 | hero→HeroSection, results→ResultItem | ✅ |
| 5 | **ResultsPage** | 810→250 | Card header→HeroSection | |
| 6 | **EventDetailPage** | 1256→300 | hero→HeroSection, DateBadge | |
| 7 | **ProfilePage** | 1749→400 | hero→HeroSection, achievements→StatCard, activity→ListItem | |
| 8 | **CalendarPage** | 347→250 | optional DateBadge | |
| 9 | **LivePage** | 2778→1500 | hero→HeroSection (modály ponechat) | |

**Aktuální progress:** 5237→4537 řádků CSS pro dokončené prototypy (4 z 9)

---

### 23.1 ClubPublicProfile ✅

**Dokončeno:** CSS 787→466 řádků (-41%)

**Kroky:**
- [x] `.club-hero` → `<HeroSection>`
- [x] Member cards ponechány (ListItem není vhodný pro komplexní athlete karty)
- [x] Smazána hero VISUAL STYLES sekce
- [x] Update snapshots

---

### 23.2 RegistrationPage ✅

**Dokončeno:** CSS 1772→1603 řádků (-10%)

**Kroky:**
- [x] custom `WizardStep` component → `<Wizard>` DS komponenta
- [x] Smazat wizard layout CSS (~85 řádků)
- [x] Smazat wizard visual CSS (~85 řádků)
- [x] Update snapshots

**Poznámka:** Hero section ponechán (komplexní s breadcrumbs a deadline stats)

---

### 23.3 DashboardPage ✅

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

### 23.4 AthletePublicProfile ✅

**Dokončeno:** CSS 1265→322 řádků (-75%)

**Kroky:**
- [x] `.athlete-hero` → `<HeroSection variant="full" backgroundImage>`
- [x] StatsBar již používá DS komponentu
- [x] `.athlete-result-item` → `<ResultItem>`
- [x] Highlight karty ponechány (žádná DS komponenta)
- [x] Update snapshots

---

### 23.5-23.9 (analogicky)

| Prototype | Hlavní změna |
|-----------|--------------|
| ResultsPage | Card header → HeroSection |
| EventDetailPage | hero → HeroSection + DateBadge |
| ProfilePage | hero → HeroSection, achievements → StatCard |
| CalendarPage | optional DateBadge |
| LivePage | hero → HeroSection (modály ponechat) |

---

### Kritéria dokončení

- [ ] Prototype CSS < 4000 řádků
- [ ] Custom hero CSS = 0
- [ ] Custom stat card CSS = 0
- [ ] Custom list item CSS = 0
- [ ] Snapshots aktualizované

---

## Quick Reference

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

## Příkazy

```bash
npm run dev              # Storybook
npm run test:quick       # Visual tests
npm run test:update:quick # Update snapshots
```

## Tags

- `v1.0.0-phase22-components` - DS komponenty hotovy
