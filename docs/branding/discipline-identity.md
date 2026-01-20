# Disciplínové vizuální identity (DV/RY/VT)

Vizuální rozlišení tří hlavních sekcí Českého svazu kanoistiky pro jasnou identifikaci obsahu.

---

## 1. Přehled disciplín

| Zkratka | Název | Anglicky | Barva | Charakter |
|---------|-------|----------|-------|-----------|
| **DV** | Divoká voda | Whitewater | Modrá | Dynamický, adrenalin |
| **RY** | Rychlostní | Sprint/Racing | Zelená | Rychlý, čistý |
| **VT** | Vodní turistika | Touring | Červená | Výdrž, komunita |

---

## 2. Barevné palety

### 2.1 Divoká voda (DV) - Modrá

```css
:root {
  /* DV Primary palette */
  --color-dv-50: #eff6ff;
  --color-dv-100: #dbeafe;
  --color-dv-200: #bfdbfe;
  --color-dv-300: #93c5fd;
  --color-dv-400: #60a5fa;
  --color-dv-500: #3b82f6;   /* Primary */
  --color-dv-600: #2563eb;   /* Aktuální section color */
  --color-dv-700: #1d4ed8;
  --color-dv-800: #1e40af;
  --color-dv-900: #1e3a8a;

  /* DV Semantic */
  --color-section-dv: var(--color-dv-600);
  --color-section-dv-light: var(--color-dv-100);
  --color-section-dv-dark: var(--color-dv-800);

  /* DV Gradient */
  --gradient-dv: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  --gradient-dv-vibrant: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  --gradient-dv-hero: linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #60a5fa 100%);
}
```

**Asociace:** Voda, rychlost, akce, adrenalin, divočina
**Použití:** Slalom, sjezd, freestyle, wildwater

### 2.2 Rychlostní (RY) - Zelená

```css
:root {
  /* RY Primary palette */
  --color-ry-50: #f0fdf4;
  --color-ry-100: #dcfce7;
  --color-ry-200: #bbf7d0;
  --color-ry-300: #86efac;
  --color-ry-400: #4ade80;
  --color-ry-500: #22c55e;   /* Primary */
  --color-ry-600: #16a34a;   /* Aktuální section color */
  --color-ry-700: #15803d;
  --color-ry-800: #166534;
  --color-ry-900: #14532d;

  /* RY Semantic */
  --color-section-ry: var(--color-ry-600);
  --color-section-ry-light: var(--color-ry-100);
  --color-section-ry-dark: var(--color-ry-800);

  /* RY Gradient */
  --gradient-ry: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  --gradient-ry-vibrant: linear-gradient(135deg, #22c55e 0%, #166534 100%);
  --gradient-ry-hero: linear-gradient(135deg, #14532d 0%, #16a34a 50%, #4ade80 100%);
}
```

**Asociace:** Rychlost, příroda, čistota, výkon, preciznost
**Použití:** Sprint, maraton, rychlostní kanoistika

### 2.3 Vodní turistika (VT) - Červená

```css
:root {
  /* VT Primary palette */
  --color-vt-50: #fef2f2;
  --color-vt-100: #fee2e2;
  --color-vt-200: #fecaca;
  --color-vt-300: #fca5a5;
  --color-vt-400: #f87171;
  --color-vt-500: #ef4444;   /* Primary */
  --color-vt-600: #dc2626;   /* Aktuální section color */
  --color-vt-700: #b91c1c;
  --color-vt-800: #991b1b;
  --color-vt-900: #7f1d1d;

  /* VT Semantic */
  --color-section-vt: var(--color-vt-600);
  --color-section-vt-light: var(--color-vt-100);
  --color-section-vt-dark: var(--color-vt-800);

  /* VT Gradient */
  --gradient-vt: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  --gradient-vt-vibrant: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
  --gradient-vt-hero: linear-gradient(135deg, #7f1d1d 0%, #dc2626 50%, #f87171 100%);
}
```

**Asociace:** Energie, vášeň, komunita, dobrodružství, tradice
**Použití:** Turistika, sjíždění řek, vodácké akce

---

## 3. VT Výkonnostní třídy

Vodní turistika má specifický systém výkonnostních tříd:

### 3.1 Barevné kódování

| Třída | Barva | Hex | Význam |
|-------|-------|-----|--------|
| **M** | Fialová | `#7c3aed` | Mistr - nejvyšší úroveň |
| **A** | Červená | `#dc2626` | Třída A - pokročilý |
| **B** | Oranžová | `#f59e0b` | Třída B - mírně pokročilý |
| **C** | Zelená | `#22c55e` | Třída C - základní |

### 3.2 CSS implementace

```css
:root {
  /* VT Classes */
  --color-vt-class-m: #7c3aed;
  --color-vt-class-m-light: #ede9fe;
  --color-vt-class-a: #dc2626;
  --color-vt-class-a-light: #fee2e2;
  --color-vt-class-b: #f59e0b;
  --color-vt-class-b-light: #fef3c7;
  --color-vt-class-c: #22c55e;
  --color-vt-class-c-light: #dcfce7;
}

/* VT Class badges */
.badge-vt-m {
  background: var(--color-vt-class-m);
  color: white;
}
.badge-vt-a {
  background: var(--color-vt-class-a);
  color: white;
}
.badge-vt-b {
  background: var(--color-vt-class-b);
  color: var(--color-neutral-900);
}
.badge-vt-c {
  background: var(--color-vt-class-c);
  color: white;
}
```

---

## 4. Badge komponenty

### 4.1 Section badge (DV/RY/VT)

```css
/* Základní section badge */
.badge-section {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Varianty */
.badge-section--dv {
  background: var(--color-section-dv);
  color: white;
}

.badge-section--ry {
  background: var(--color-section-ry);
  color: white;
}

.badge-section--vt {
  background: var(--color-section-vt);
  color: white;
}

/* Outline varianty */
.badge-section--dv-outline {
  background: transparent;
  border: 1.5px solid var(--color-section-dv);
  color: var(--color-section-dv);
}

.badge-section--ry-outline {
  background: transparent;
  border: 1.5px solid var(--color-section-ry);
  color: var(--color-section-ry);
}

.badge-section--vt-outline {
  background: transparent;
  border: 1.5px solid var(--color-section-vt);
  color: var(--color-section-vt);
}

/* Soft varianty */
.badge-section--dv-soft {
  background: var(--color-section-dv-light);
  color: var(--color-section-dv);
}

.badge-section--ry-soft {
  background: var(--color-section-ry-light);
  color: var(--color-section-ry);
}

.badge-section--vt-soft {
  background: var(--color-section-vt-light);
  color: var(--color-section-vt);
}
```

### 4.2 Gradient badge

```css
/* Gradient varianty pro expresivní režim */
.badge-section--dv-gradient {
  background: var(--gradient-dv);
  color: white;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
}

.badge-section--ry-gradient {
  background: var(--gradient-ry);
  color: white;
  box-shadow: 0 2px 8px rgba(22, 163, 74, 0.3);
}

.badge-section--vt-gradient {
  background: var(--gradient-vt);
  color: white;
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
}
```

---

## 5. Navigace a tabs

### 5.1 Disciplínové tabs

```css
/* Tab navigace podle disciplíny */
.tabs-discipline {
  display: flex;
  gap: var(--spacing-1);
  background: var(--color-bg-secondary);
  padding: var(--spacing-1);
  border-radius: var(--radius-md);
}

.tabs-discipline__tab {
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
  cursor: pointer;
  border: none;
  background: transparent;
}

.tabs-discipline__tab:hover {
  background: var(--color-bg-tertiary);
}

/* Aktivní stavy podle disciplíny */
.tabs-discipline__tab--dv.active {
  background: var(--color-section-dv);
  color: white;
}

.tabs-discipline__tab--ry.active {
  background: var(--color-section-ry);
  color: white;
}

.tabs-discipline__tab--vt.active {
  background: var(--color-section-vt);
  color: white;
}
```

### 5.2 Sidebar navigace

```css
/* Sidebar s barevným indikátorem */
.sidebar-nav__item {
  position: relative;
  padding: var(--spacing-3) var(--spacing-4);
  border-left: 3px solid transparent;
  transition: all var(--transition-fast);
}

.sidebar-nav__item--dv.active {
  background: var(--color-section-dv-light);
  border-left-color: var(--color-section-dv);
  color: var(--color-section-dv);
}

.sidebar-nav__item--ry.active {
  background: var(--color-section-ry-light);
  border-left-color: var(--color-section-ry);
  color: var(--color-section-ry);
}

.sidebar-nav__item--vt.active {
  background: var(--color-section-vt-light);
  border-left-color: var(--color-section-vt);
  color: var(--color-section-vt);
}
```

---

## 6. Cards s disciplínovou identitou

### 6.1 Card s barevným akcentem

```css
/* Card s horním barevným pruhem */
.card-discipline {
  background: var(--color-bg-elevated);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.card-discipline__accent {
  height: 4px;
}

.card-discipline--dv .card-discipline__accent {
  background: var(--gradient-dv);
}

.card-discipline--ry .card-discipline__accent {
  background: var(--gradient-ry);
}

.card-discipline--vt .card-discipline__accent {
  background: var(--gradient-vt);
}

/* Hover efekt */
.card-discipline:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

### 6.2 Card s gradient pozadím

```css
/* Plně zabarvená karta */
.card-discipline-full {
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  color: white;
}

.card-discipline-full--dv {
  background: var(--gradient-dv-hero);
}

.card-discipline-full--ry {
  background: var(--gradient-ry-hero);
}

.card-discipline-full--vt {
  background: var(--gradient-vt-hero);
}
```

---

## 7. Hero sekce

### 7.1 Disciplínové hero

```css
/* Hero sekce pro disciplínu */
.hero-discipline {
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  overflow: hidden;
}

.hero-discipline--dv {
  background: var(--gradient-dv-hero);
}

.hero-discipline--ry {
  background: var(--gradient-ry-hero);
}

.hero-discipline--vt {
  background: var(--gradient-vt-hero);
}

/* Dekorativní vlna */
.hero-discipline::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: url('/assets/patterns/wave-subtle.svg') no-repeat bottom center;
  background-size: 100% auto;
  opacity: 0.2;
}
```

### 7.2 Mini hero (page header)

```css
/* Menší hero pro podstránky */
.hero-mini-discipline {
  padding: var(--spacing-12) var(--spacing-6);
  color: white;
}

.hero-mini-discipline--dv {
  background: var(--gradient-dv);
}

.hero-mini-discipline--ry {
  background: var(--gradient-ry);
}

.hero-mini-discipline--vt {
  background: var(--gradient-vt);
}
```

---

## 8. Ikony a symboly

### 8.1 Doporučené ikony (Lucide)

| Disciplína | Ikony | Použití |
|------------|-------|---------|
| **DV** | `waves`, `mountain`, `zap`, `compass` | Dynamika, příroda |
| **RY** | `timer`, `trophy`, `target`, `gauge` | Rychlost, výkon |
| **VT** | `map`, `users`, `tent`, `sun` | Komunita, outdoor |

### 8.2 Barevné ikony

```css
/* Ikony v disciplínových barvách */
.icon-dv { color: var(--color-section-dv); }
.icon-ry { color: var(--color-section-ry); }
.icon-vt { color: var(--color-section-vt); }

/* Ikony s kruhovým pozadím */
.icon-circle-dv {
  background: var(--color-section-dv-light);
  color: var(--color-section-dv);
  padding: var(--spacing-2);
  border-radius: 50%;
}

.icon-circle-ry {
  background: var(--color-section-ry-light);
  color: var(--color-section-ry);
  padding: var(--spacing-2);
  border-radius: 50%;
}

.icon-circle-vt {
  background: var(--color-section-vt-light);
  color: var(--color-section-vt);
  padding: var(--spacing-2);
  border-radius: 50%;
}
```

---

## 9. Tabulky s disciplínami

### 9.1 Row highlighting

```css
/* Řádky tabulky podle disciplíny */
.table-row--dv {
  border-left: 3px solid var(--color-section-dv);
}

.table-row--ry {
  border-left: 3px solid var(--color-section-ry);
}

.table-row--vt {
  border-left: 3px solid var(--color-section-vt);
}

/* Hover s disciplínovou barvou */
.table-row--dv:hover {
  background: var(--color-section-dv-light);
}

.table-row--ry:hover {
  background: var(--color-section-ry-light);
}

.table-row--vt:hover {
  background: var(--color-section-vt-light);
}
```

### 9.2 Cell badge

```css
/* Badge v buňce tabulky */
.cell-discipline {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
}

.cell-discipline__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.cell-discipline__dot--dv { background: var(--color-section-dv); }
.cell-discipline__dot--ry { background: var(--color-section-ry); }
.cell-discipline__dot--vt { background: var(--color-section-vt); }
```

---

## 10. React komponenty

### 10.1 DisciplineBadge

```tsx
// src/components/DisciplineBadge/DisciplineBadge.tsx
import React from 'react';
import './DisciplineBadge.css';

export type Discipline = 'dv' | 'ry' | 'vt';
export type BadgeVariant = 'solid' | 'outline' | 'soft' | 'gradient';

interface DisciplineBadgeProps {
  discipline: Discipline;
  variant?: BadgeVariant;
  label?: string;
  className?: string;
}

const disciplineLabels: Record<Discipline, string> = {
  dv: 'Divoká voda',
  ry: 'Rychlostní',
  vt: 'Vodní turistika',
};

const disciplineShort: Record<Discipline, string> = {
  dv: 'DV',
  ry: 'RY',
  vt: 'VT',
};

export const DisciplineBadge: React.FC<DisciplineBadgeProps> = ({
  discipline,
  variant = 'solid',
  label,
  className = '',
}) => {
  const displayLabel = label ?? disciplineShort[discipline];

  return (
    <span
      className={`
        badge-section
        badge-section--${discipline}${variant !== 'solid' ? `-${variant}` : ''}
        ${className}
      `}
      title={disciplineLabels[discipline]}
    >
      {displayLabel}
    </span>
  );
};
```

### 10.2 VTClassBadge

```tsx
// src/components/VTClassBadge/VTClassBadge.tsx
import React from 'react';
import './VTClassBadge.css';

export type VTClass = 'm' | 'a' | 'b' | 'c';

interface VTClassBadgeProps {
  vtClass: VTClass;
  showLabel?: boolean;
  className?: string;
}

const vtClassLabels: Record<VTClass, string> = {
  m: 'Mistr',
  a: 'Třída A',
  b: 'Třída B',
  c: 'Třída C',
};

export const VTClassBadge: React.FC<VTClassBadgeProps> = ({
  vtClass,
  showLabel = false,
  className = '',
}) => {
  return (
    <span
      className={`badge-vt-${vtClass} ${className}`}
      title={vtClassLabels[vtClass]}
    >
      {showLabel ? vtClassLabels[vtClass] : vtClass.toUpperCase()}
    </span>
  );
};
```

### 10.3 DisciplineHero

```tsx
// src/components/DisciplineHero/DisciplineHero.tsx
import React from 'react';
import './DisciplineHero.css';

interface DisciplineHeroProps {
  discipline: Discipline;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export const DisciplineHero: React.FC<DisciplineHeroProps> = ({
  discipline,
  title,
  subtitle,
  backgroundImage,
  size = 'md',
  children,
}) => {
  return (
    <section
      className={`
        hero-discipline
        hero-discipline--${discipline}
        hero-discipline--${size}
      `}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className="hero-discipline__content">
        <DisciplineBadge discipline={discipline} variant="gradient" />
        <h1 className="hero-discipline__title">{title}</h1>
        {subtitle && <p className="hero-discipline__subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
};
```

---

## 11. Použití

### 11.1 Kalendář závodů

```tsx
<EventCard
  title="MS ve slalomu"
  date="2024-08-15"
  location="Troja"
>
  <DisciplineBadge discipline="dv" />
  <Badge>MS</Badge>
</EventCard>
```

### 11.2 Výsledky

```tsx
<ResultsTable>
  <ResultsRow
    position={1}
    athlete="Jan Novák"
    club="USK Praha"
    discipline="dv"
  />
</ResultsTable>
```

### 11.3 Profil závodníka

```tsx
<AthleteProfile>
  <DisciplineHero
    discipline="ry"
    title="Tereza Svobodová"
    subtitle="Reprezentant ČR - Sprint"
  />
</AthleteProfile>
```

---

## 12. Dark mode adaptace

```css
/* Dark mode disciplínové barvy */
[data-theme="dark"] {
  --color-section-dv: #60a5fa;
  --color-section-dv-light: rgba(96, 165, 250, 0.15);

  --color-section-ry: #4ade80;
  --color-section-ry-light: rgba(74, 222, 128, 0.15);

  --color-section-vt: #f87171;
  --color-section-vt-light: rgba(248, 113, 113, 0.15);

  --color-vt-class-m: #a78bfa;
  --color-vt-class-m-light: rgba(167, 139, 250, 0.15);
}
```

---

## 13. Checklist

- [ ] Všechny tři disciplíny mají konzistentní barevné palety
- [ ] VT třídy (M/A/B/C) mají jasné barevné rozlišení
- [ ] Badge komponenty existují ve všech variantách
- [ ] Hero sekce podporují všechny disciplíny
- [ ] Dark mode adaptace je kompletní
- [ ] Ikony jsou konzistentní s charakterem disciplíny
- [ ] Tabulky podporují disciplínový highlighting
- [ ] Accessibility - barva není jediným rozlišovacím prvkem

---

*Tento dokument je součástí CSK RVP Design System branded elements.*
