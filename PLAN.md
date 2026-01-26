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
| 2 | **RegistrationPage** | 1772→400 | custom wizard→Wizard komponenta | |
| 3 | **DashboardPage** | 1413→350 | stat cards→StatCard, alerts→ListItem, actions→ActionCard | |
| 4 | **AthletePublicProfile** | 1265→322 | hero→HeroSection, results→ResultItem | ✅ |
| 5 | **ResultsPage** | 810→250 | Card header→HeroSection | |
| 6 | **EventDetailPage** | 1256→300 | hero→HeroSection, DateBadge | |
| 7 | **ProfilePage** | 1749→400 | hero→HeroSection, achievements→StatCard, activity→ListItem | |
| 8 | **CalendarPage** | 347→250 | optional DateBadge | |
| 9 | **LivePage** | 2778→1500 | hero→HeroSection (modály ponechat) | |

**Aktuální progress:** 2052→788 řádků CSS pro dokončené prototypy

---

### 23.1 ClubPublicProfile ✅

**Dokončeno:** CSS 787→466 řádků (-41%)

**Kroky:**
- [x] `.club-hero` → `<HeroSection>`
- [x] Member cards ponechány (ListItem není vhodný pro komplexní athlete karty)
- [x] Smazána hero VISUAL STYLES sekce
- [x] Update snapshots

---

### 23.2 RegistrationPage

```tsx
// PŘED: custom .registration-wizard-step (~200 řádků)
// PO:
<HeroSection section={event.section} variant="compact" title="Registrace" wave />

<Wizard
  steps={[
    { id: 'personal', label: 'Osobní údaje', icon: 'user' },
    { id: 'category', label: 'Kategorie', icon: 'flag' },
    { id: 'payment', label: 'Platba', icon: 'credit-card' },
  ]}
  activeStep={currentStep}
  section={event.section}
/>
```

**Kroky:**
- [ ] custom hero → `<HeroSection>`
- [ ] `.registration-wizard-step` → `<Wizard>`
- [ ] Smazat wizard VISUAL STYLES
- [ ] Update snapshots

---

### 23.3 DashboardPage

```tsx
// PŘED: custom stat cards, alert items, quick actions
// PO:
<HeroSection variant="minimal" title={`Vítejte, ${user.name}`} wave />

<StatCard colorVariant="gradient-primary" icon={<Icon name="calendar" />} value="12" label="Závodů" />

{alerts.map(a => (
  <ListItem variant="alert" type={a.type} icon={<Icon name={a.icon} />} title={a.title} />
))}

<ActionCard icon={<Icon name="user-plus" />} title="Přidat člena" href="/add" iconBackground="primary" />
```

**Kroky:**
- [ ] custom hero → `<HeroSection variant="minimal">`
- [ ] `.dashboard-stat-card--gradient-*` → `<StatCard colorVariant>`
- [ ] `.dashboard-alert-item` → `<ListItem variant="alert">`
- [ ] `.dashboard-quick-action` → `<ActionCard>`
- [ ] Update snapshots

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
