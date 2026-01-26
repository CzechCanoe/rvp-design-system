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

#### 22.1 Visual Regression Setup ✅
- [x] Nainstalovat `@storybook/test-runner` + `playwright` (již nainstalováno)
- [x] Vytvořit baseline screenshots pro všechny prototypy (58 testů, 70 snímků)
- [x] Rozšířit `tests/config.ts` o všechny prototype varianty (29 stories)
- [x] Dokumentovat postup v `tests/visual/README.md`

**Výsledky:**
- 58 visual regression testů pro prototypy (light + dark mode)
- 70 baseline screenshots vygenerováno
- Všechny testy projdou: `npm run test` (2.5 min na Chromium)

**Pokryté prototypy:**
| Kategorie | Počet stories |
|-----------|---------------|
| Embed | 13 (včetně list views) |
| Satellite | 13 |
| Expressive | 3 |
| **Celkem** | **29 stories × 2 (light/dark) = 58 testů** |

**Soubory:**
- `tests/config.ts` - rozšířená konfigurace s všemi prototypy
- `tests/visual/README.md` - dokumentace workflow
- `tests/prototypes.spec.ts-snapshots/` - baseline screenshots

#### 22.2 Section Color System ✅
- [x] Přidat `--section-color` CSS custom property pattern do `tokens/colors.css`
- [x] Vytvořit utility classes `.csk-section-dv`, `.csk-section-ry`, `.csk-section-vt`, `.csk-section-federation`
- [x] Dokumentovat v Storybook (SectionColors story v Aesthetic.stories.tsx)
- [x] Srovnat screenshots (57 testů, 0 regresí)

**Implementace:**
- `src/tokens/colors.css` - 4 section utility classes s CSS custom properties:
  - `--section-color`, `--section-color-light`, `--section-color-dark`
  - `--section-color-rgb`, `--section-gradient`
- `src/stories/Aesthetic.stories.tsx` - nová SectionColors story s dokumentací

**Výsledky:**
- 57 prototype visual regression testů prošlo bez regresí
- Section color system ready pro adopci v prototypech (22.10+)

**Kód v colors.css:**
```css
/* Section Color System - utility classes */
.csk-section-dv {
  --section-color: var(--color-section-dv);
  --section-color-light: var(--color-section-dv-light);
  --section-color-dark: #1e3a5f;
  --section-color-rgb: 37, 99, 235;
  --section-gradient: var(--gradient-section-dv);
}
/* ... analogicky pro ry, vt, federation */

.csk-section-federation {
  --section-color: var(--color-primary);
  --section-color-light: var(--color-primary-400);
  --section-color-dark: var(--color-primary-700);
  --section-color-rgb: 17, 118, 166;
}
```

**Pattern nahrazení v prototypech:**
```css
/* PŘED (opakuje se 100×): */
.xxx--dv .element { color: var(--color-section-dv); }
.xxx--ry .element { color: var(--color-section-ry); }
.xxx--vt .element { color: var(--color-section-vt); }

/* PO (1×): */
.element { color: var(--section-color, var(--color-primary)); }
```

**Kritéria dokončení:**
- [x] `npm run test:visual` - 0 změn (pouze infrastruktura)
- [x] Nové CSS classes existují v colors.css
- [x] Story ukazuje section colors

#### 22.3 HeroSection Component Enhancement ✅
- [x] Rozšířit existující `HeroSection` o:
  - `section` prop pro automatické gradients (dv/ry/vt/federation) - již existovalo
  - `backgroundImage` prop s automatickým overlay - již existovalo
  - `wave` prop pro tvarový divider - **přidáno**
  - Pattern overlay (radial gradients) - již existovalo (`patternOverlay` prop)
- [x] Varianty: `variant="full" | "compact" | "minimal"` - již existovalo (size-based)
- [x] Stories existují v `HeroSection.stories.tsx` - rozšířeno o wave examples
- [x] Visual regression testy: 58 passed (0 regresí)

**Implementace:**
- `wave` prop přidán do `HeroSection.tsx` s SVG wave divider
- `waveColor` prop pro vlastní barvu wave
- CSS pro wave divider v `HeroSection.css`:
  - `.csk-hero-section__wave` - positioning
  - `.csk-hero-section__wave-svg` - SVG styling s currentColor
  - Automatická úprava paddingu pomocí `:has(.csk-hero-section__wave)`
- Nové stories: `WithWave`, `FullWithWave`, `MinimalWithWave`

**Poznámka:** HeroSection již měla většinu požadovaných funkcí z předchozích fází. Přidán pouze wave divider.

**Úspora:** ~1750 řádků (hero-related CSS z 7 prototypů) - bude realizována v 22.10-22.13

**Soubory k úpravě:**
- `src/components/HeroSection/HeroSection.tsx`
- `src/components/HeroSection/HeroSection.css`
- `src/components/HeroSection/HeroSection.stories.tsx`

**Nové props (TypeScript interface):**
```typescript
interface HeroSectionProps {
  // Existující
  children: React.ReactNode;
  className?: string;

  // Nové
  section?: 'dv' | 'ry' | 'vt' | 'federation' | 'generic';
  variant?: 'gradient' | 'image' | 'minimal';
  backgroundImage?: string;
  wave?: boolean;
  pattern?: boolean;  // radial gradient overlay
  size?: 'sm' | 'md' | 'lg';  // padding velikost
}
```

**CSS struktura (HeroSection.css):**
```css
/* Base */
.csk-hero-section { position: relative; overflow: hidden; }
.csk-hero-section__background { position: absolute; inset: 0; z-index: 0; }
.csk-hero-section__gradient { position: absolute; inset: 0; }
.csk-hero-section__image { position: absolute; inset: 0; object-fit: cover; }
.csk-hero-section__pattern { position: absolute; inset: 0; /* radial gradients */ }
.csk-hero-section__content { position: relative; z-index: 1; }
.csk-hero-section__wave { position: absolute; bottom: 0; left: 0; right: 0; }

/* Section gradients - používá --section-color z 22.2 */
.csk-hero-section--gradient {
  background: linear-gradient(135deg,
    var(--section-color-dark) 0%,
    var(--section-color) 50%,
    var(--section-color-light) 100%);
}

/* Image variant s overlay */
.csk-hero-section--image .csk-hero-section__gradient {
  background: linear-gradient(135deg,
    rgba(var(--section-color-rgb), 0.85) 0%,
    rgba(var(--section-color-rgb), 0.7) 100%);
}

/* Size variants */
.csk-hero-section--sm { padding: var(--spacing-8) var(--spacing-4); }
.csk-hero-section--md { padding: var(--spacing-10) var(--spacing-4) var(--spacing-16); }
.csk-hero-section--lg { padding: var(--spacing-12) var(--spacing-4) var(--spacing-20); }
```

**Wave SVG komponenta (inline):**
```tsx
const WaveDivider = () => (
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="csk-hero-section__wave-svg">
    <path fill="currentColor" d="M0,0 C480,60 960,60 1440,0 L1440,60 L0,60 Z" />
  </svg>
);
```

**Pattern overlay CSS:**
```css
.csk-hero-section__pattern {
  background-image:
    radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 40%),
    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 60%);
}
```

**Stories k vytvoření:**
```typescript
// HeroSection.stories.tsx
export const GradientDV: Story = { args: { section: 'dv', variant: 'gradient' } };
export const GradientRY: Story = { args: { section: 'ry', variant: 'gradient' } };
export const GradientVT: Story = { args: { section: 'vt', variant: 'gradient' } };
export const WithImage: Story = { args: { section: 'dv', variant: 'image', backgroundImage: '...' } };
export const WithWave: Story = { args: { section: 'dv', wave: true } };
export const Minimal: Story = { args: { variant: 'minimal' } };
```

**Kritéria dokončení:**
- [x] Všechny props fungují
- [x] Stories pokrývají všechny varianty
- [x] `npm run test:visual` - 0 regresí
- [x] TypeScript types exportovány

#### 22.4 StatCard Variants ✅
- [x] Přidat varianty do `StatCard`:
  - `colorVariant="medal-gold" | "medal-silver" | "medal-bronze"`
  - `colorVariant="gradient-primary" | "gradient-success" | "gradient-warning" | "gradient-info"`
  - `iconGradient` prop pro gradient pozadí ikony
- [x] Přidat sparkline slot
- [x] Aktualizovat stories
- [x] Build prošel bez chyb

**Úspora:** ~400 řádků (při adopci v prototypech)

**Implementace:**
- `colorVariant` prop přidán (nezávislý na existujícím `variant`)
- `iconGradient` boolean prop pro gradient pozadí ikony
- `sparkline` slot pro mini grafy
- 3 medal varianty: gold, silver, bronze
- 4 gradient varianty: primary, success, warning, info
- Dark mode podpora pro všechny varianty
- Nové stories: MedalVariants, GradientVariants, IconGradientVariant, SparklineVariants, AdvancedDashboard

**Soubory:**
- `src/components/StatCard/StatCard.tsx` - nové props
- `src/components/StatCard/StatCard.css` - ~150 řádků nových stylů
- `src/components/StatCard/StatCard.stories.tsx` - 15+ nových stories
- `src/components/StatCard/index.ts` - export StatCardColorVariant type

**Kritéria dokončení:**
- [x] 8 nových variant funguje (3 medal + 4 gradient + iconGradient)
- [x] Sparkline slot renderuje children
- [x] Stories pro každou variantu
- [x] Build prošel, TypeScript types exportovány

#### 22.5 ResultItem / TimelineItem Component
- [ ] Vytvořit novou komponentu `ResultItem`:
  - `rank` prop s automatickým medal stylingem (1-3)
  - `variant="default" | "compact" | "detailed"`
  - Border-left accent podle ranku
  - Hover efekty
- [ ] Přidat `ResultItem.stories.tsx`
- [ ] Srovnat screenshots

**Úspora:** ~300 řádků

**Nové soubory:**
- `src/components/ResultItem/ResultItem.tsx`
- `src/components/ResultItem/ResultItem.css`
- `src/components/ResultItem/ResultItem.stories.tsx`
- `src/components/ResultItem/index.ts`

**Props interface:**
```typescript
interface ResultItemProps {
  rank?: number;  // 1-3 = medal styling, 4+ = default
  title: string;
  subtitle?: string;
  meta?: React.ReactNode;  // datum, místo, atd.
  trailing?: React.ReactNode;  // čas, body, badge
  variant?: 'default' | 'compact' | 'detailed';
  href?: string;
  onClick?: () => void;
  className?: string;
}
```

**CSS struktura:**
```css
.csk-result-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-4);
  border-left: 4px solid transparent;
  transition: all var(--transition-fast);
}

.csk-result-item:hover {
  background: var(--color-bg-secondary);
  transform: translateX(4px);
}

/* Medal ranks */
.csk-result-item--rank-1 {
  border-left-color: #ffd700;
  background: linear-gradient(90deg, rgba(255,215,0,0.08) 0%, transparent 30%);
}
.csk-result-item--rank-2 {
  border-left-color: #c0c0c0;
  background: linear-gradient(90deg, rgba(192,192,192,0.08) 0%, transparent 30%);
}
.csk-result-item--rank-3 {
  border-left-color: #cd7f32;
  background: linear-gradient(90deg, rgba(205,127,50,0.08) 0%, transparent 30%);
}

/* Compact variant */
.csk-result-item--compact {
  padding: var(--spacing-3);
  gap: var(--spacing-3);
}
```

**Rank badge (interní subkomponenta):**
```tsx
const RankBadge = ({ rank }: { rank: number }) => {
  if (rank > 3) return <span className="csk-result-item__rank">{rank}.</span>;
  const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
  return <span className="csk-result-item__medal">{medals[rank]}</span>;
};
```

**Stories:**
```typescript
export const Gold: Story = { args: { rank: 1, title: 'MS Praha 2024', subtitle: 'C1M' } };
export const Silver: Story = { args: { rank: 2, ... } };
export const Bronze: Story = { args: { rank: 3, ... } };
export const NoMedal: Story = { args: { rank: 7, ... } };
export const Compact: Story = { args: { variant: 'compact', ... } };
```

**Kritéria dokončení:**
- [ ] Export z `src/components/index.ts`
- [ ] 3 medal varianty + default fungují
- [ ] Hover efekt funguje
- [ ] `npm run test:visual` - 0 regresí

#### 22.6 ListItem Component
- [ ] Vytvořit novou komponentu `ListItem`:
  - `variant="alert" | "activity" | "feed"`
  - `type="warning" | "danger" | "info" | "success" | "energy"`
  - Icon container s gradient pozadím
  - Divider support
- [ ] Přidat `ListItem.stories.tsx`
- [ ] Srovnat screenshots

**Úspora:** ~250 řádků

**Nové soubory:**
- `src/components/ListItem/ListItem.tsx`
- `src/components/ListItem/ListItem.css`
- `src/components/ListItem/ListItem.stories.tsx`
- `src/components/ListItem/index.ts`

**Props interface:**
```typescript
interface ListItemProps {
  icon?: React.ReactNode;
  type?: 'default' | 'warning' | 'danger' | 'info' | 'success' | 'energy';
  variant?: 'default' | 'alert' | 'activity' | 'feed';
  title: string;
  description?: string;
  timestamp?: string;
  action?: React.ReactNode;  // button, link
  divider?: boolean;
  onClick?: () => void;
  className?: string;
}
```

**CSS struktura:**
```css
.csk-list-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  padding: var(--spacing-4) var(--spacing-5);
  transition: background-color var(--transition-fast);
}

.csk-list-item--divider {
  border-bottom: 1px solid var(--color-border);
}

.csk-list-item:hover {
  background-color: var(--color-surface-secondary);
}

/* Icon container s type-based gradient */
.csk-list-item__icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.csk-list-item--warning .csk-list-item__icon {
  background: linear-gradient(135deg, var(--color-warning-100) 0%, var(--color-warning-50) 100%);
  color: var(--color-warning-600);
}

.csk-list-item--danger .csk-list-item__icon {
  background: linear-gradient(135deg, var(--color-danger-100) 0%, var(--color-danger-50) 100%);
  color: var(--color-danger-600);
}

.csk-list-item--energy .csk-list-item__icon {
  background: var(--gradient-energy-subtle);
  color: var(--color-energy-600);
}

/* Alert variant - left border accent */
.csk-list-item--alert.csk-list-item--energy {
  border-left: 3px solid var(--color-energy-500);
}
```

**Stories:**
```typescript
export const AlertWarning: Story = { args: { variant: 'alert', type: 'warning', title: 'Expiring license' } };
export const AlertDanger: Story = { args: { variant: 'alert', type: 'danger', title: 'Payment overdue' } };
export const AlertEnergy: Story = { args: { variant: 'alert', type: 'energy', title: 'Urgent action needed' } };
export const Activity: Story = { args: { variant: 'activity', title: 'John registered', timestamp: '2 hours ago' } };
export const WithAction: Story = { args: { action: <Button size="sm">View</Button> } };
```

**Kritéria dokončení:**
- [ ] Export z `src/components/index.ts`
- [ ] 5 type variant + 3 variant varianty
- [ ] Divider funguje
- [ ] `npm run test:visual` - 0 regresí

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

**Nové soubory:**
- `src/components/Wizard/Wizard.tsx`
- `src/components/Wizard/Wizard.css`
- `src/components/Wizard/WizardStep.tsx` (interní)
- `src/components/Wizard/Wizard.stories.tsx`
- `src/components/Wizard/index.ts`

**Props interface:**
```typescript
interface WizardStep {
  id: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
}

interface WizardProps {
  steps: WizardStep[];
  activeStep: string | number;  // id nebo index
  completedSteps?: string[];    // array of completed step ids
  section?: 'dv' | 'ry' | 'vt';  // pro barevnou variantu
  variant?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**CSS struktura:**
```css
.csk-wizard {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.csk-wizard__step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
}

.csk-wizard__circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-tertiary);
  border: 2px solid var(--color-border-secondary);
  color: var(--color-text-tertiary);
  z-index: 1;
  transition: all var(--transition-normal);
}

/* Connector line */
.csk-wizard__line {
  position: absolute;
  top: 24px;
  left: calc(50% + 24px);
  right: calc(-50% + 24px);
  height: 3px;
  background: var(--color-border-primary);
}

/* Active step - používá --section-color */
.csk-wizard__step--active .csk-wizard__circle {
  background: var(--section-color, var(--color-primary));
  border-color: var(--section-color, var(--color-primary));
  color: white;
  box-shadow: 0 0 0 4px rgba(var(--section-color-rgb, var(--color-primary-rgb)), 0.1);
}

/* Completed step */
.csk-wizard__step--completed .csk-wizard__circle {
  background: var(--color-success);
  border-color: var(--color-success);
  color: white;
}

.csk-wizard__step--completed .csk-wizard__line {
  background: var(--color-success);
}

/* Responsive - hide labels on mobile */
@media (max-width: 640px) {
  .csk-wizard__label { display: none; }
  .csk-wizard__circle { width: 40px; height: 40px; }
}
```

**Stories:**
```typescript
export const ThreeSteps: Story = { args: { steps: [...], activeStep: 1 } };
export const FourSteps: Story = { args: { steps: [...], activeStep: 2 } };
export const WithCompleted: Story = { args: { completedSteps: ['step-1', 'step-2'] } };
export const SectionDV: Story = { args: { section: 'dv' } };
export const Vertical: Story = { args: { variant: 'vertical' } };
```

**Kritéria dokončení:**
- [ ] Export z `src/components/index.ts`
- [ ] Active/completed/pending stavy fungují
- [ ] Connector lines správně pozicované
- [ ] Responsive chování
- [ ] `npm run test:visual` - 0 regresí

#### 22.8 ActionCard Component
- [ ] Vytvořit novou komponentu `ActionCard`:
  - Icon + title + description + arrow layout
  - Hover efekt (translateX)
  - `href` nebo `onClick` prop
- [ ] Přidat `ActionCard.stories.tsx`
- [ ] Srovnat screenshots

**Úspora:** ~150 řádků

**Nové soubory:**
- `src/components/ActionCard/ActionCard.tsx`
- `src/components/ActionCard/ActionCard.css`
- `src/components/ActionCard/ActionCard.stories.tsx`
- `src/components/ActionCard/index.ts`

**Props interface:**
```typescript
interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  href?: string;
  onClick?: () => void;
  iconBackground?: 'primary' | 'success' | 'warning' | 'info' | 'energy';
  showArrow?: boolean;
  className?: string;
}
```

**CSS struktura:**
```css
.csk-action-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-4);
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, var(--color-surface-secondary) 0%, var(--color-surface-primary) 100%);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all var(--transition-normal);
  text-decoration: none;
  color: inherit;
}

.csk-action-card:hover {
  border-color: var(--color-primary-300);
  background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-surface-primary) 100%);
  transform: translateX(4px);
  box-shadow: var(--shadow-md);
}

.csk-action-card__icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-400) 100%);
  color: #fff;
  flex-shrink: 0;
}

.csk-action-card__arrow {
  color: var(--color-text-muted);
  transition: transform var(--transition-fast);
}

.csk-action-card:hover .csk-action-card__arrow {
  transform: translateX(4px);
  color: var(--color-primary);
}
```

**Stories:**
```typescript
export const Default: Story = { args: { icon: <UserPlus />, title: 'Add member', description: 'Register new athlete' } };
export const WithoutDescription: Story = { args: { icon: <Settings />, title: 'Settings' } };
export const EnergyIcon: Story = { args: { iconBackground: 'energy' } };
export const AsLink: Story = { args: { href: '/members' } };
```

**Kritéria dokončení:**
- [ ] Export z `src/components/index.ts`
- [ ] Hover efekt funguje
- [ ] Funguje jako link (href) i button (onClick)
- [ ] `npm run test:visual` - 0 regresí

#### 22.9 DateBadge Component
- [ ] Vytvořit novou komponentu `DateBadge`:
  - `date` prop (Date object)
  - `section` prop pro barevnou variantu
  - `size="sm" | "md" | "lg"`
- [ ] Přidat `DateBadge.stories.tsx`
- [ ] Srovnat screenshots

**Úspora:** ~100 řádků

**Nové soubory:**
- `src/components/DateBadge/DateBadge.tsx`
- `src/components/DateBadge/DateBadge.css`
- `src/components/DateBadge/DateBadge.stories.tsx`
- `src/components/DateBadge/index.ts`

**Props interface:**
```typescript
interface DateBadgeProps {
  date: Date | string;
  section?: 'dv' | 'ry' | 'vt' | 'generic';
  size?: 'sm' | 'md' | 'lg';
  locale?: string;  // default 'cs-CZ'
  className?: string;
}
```

**Komponenta:**
```tsx
export const DateBadge = ({ date, section = 'generic', size = 'md', locale = 'cs-CZ' }) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleDateString(locale, { month: 'short' }).toUpperCase();

  return (
    <div className={`csk-date-badge csk-date-badge--${size} csk-date-badge--${section}`}>
      <span className="csk-date-badge__day">{day}</span>
      <span className="csk-date-badge__month">{month}</span>
    </div>
  );
};
```

**CSS struktura:**
```css
.csk-date-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--color-primary-100) 0%, var(--color-primary-50) 100%);
  border: 1px solid var(--color-primary-200);
}

/* Sizes */
.csk-date-badge--sm { width: 44px; height: 44px; }
.csk-date-badge--md { width: 56px; height: 56px; }
.csk-date-badge--lg { width: 72px; height: 72px; }

.csk-date-badge__day {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: 1;
}

.csk-date-badge__month {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
  text-transform: uppercase;
}

/* Section variants - používá section color system */
.csk-date-badge--dv {
  background: linear-gradient(135deg, var(--color-section-dv-light, #dbeafe) 0%, #eff6ff 100%);
  border-color: var(--color-section-dv);
}

.csk-date-badge--ry {
  background: linear-gradient(135deg, var(--color-section-ry-light, #dcfce7) 0%, #f0fdf4 100%);
  border-color: var(--color-section-ry);
}

.csk-date-badge--vt {
  background: linear-gradient(135deg, var(--color-section-vt-light, #fee2e2) 0%, #fef2f2 100%);
  border-color: var(--color-section-vt);
}
```

**Stories:**
```typescript
export const Default: Story = { args: { date: new Date() } };
export const SectionDV: Story = { args: { date: '2024-06-15', section: 'dv' } };
export const SectionRY: Story = { args: { date: '2024-07-20', section: 'ry' } };
export const SectionVT: Story = { args: { date: '2024-08-10', section: 'vt' } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
```

**Kritéria dokončení:**
- [ ] Export z `src/components/index.ts`
- [ ] 3 section varianty + generic
- [ ] 3 size varianty
- [ ] Locale formatting funguje
- [ ] `npm run test:visual` - 0 regresí

#### 22.10 Prototype Adoption - Batch 1 (Calendar, Results)
- [ ] CalendarPage: Adoptovat DateBadge
- [ ] ResultsPage: Adoptovat HeroSection, ResultItem
- [ ] Smazat nahrazený CSS kód
- [ ] Srovnat screenshots - **musí být pixel-perfect**

**CalendarPage změny:**
```
Soubory:
- src/prototypes/CalendarPage.tsx
- src/prototypes/CalendarPage.css

Nahradit:
- .calendar-event-date → <DateBadge date={event.date} section={event.section} />

Smazat z CSS (~30 řádků):
- .calendar-event-date a všechny related styles
```

**ResultsPage změny:**
```
Soubory:
- src/prototypes/ResultsPage.tsx
- src/prototypes/ResultsPage.css

Nahradit:
- .results-page-hero → <HeroSection section={section} variant="gradient" wave>
- .result-item → <ResultItem rank={...} title={...} />

Smazat z CSS (~200 řádků):
- .results-page-hero__* (všechny hero related)
- .result-item--gold/silver/bronze
- hero gradient variants pro dv/ry/vt
```

**Kritéria dokončení:**
- [ ] CalendarPage renderuje DateBadge komponenty
- [ ] ResultsPage používá HeroSection a ResultItem
- [ ] `npm run test:visual` - 0 regresí (pixel-perfect)
- [ ] CSS soubory zmenšeny o ~230 řádků

#### 22.11 Prototype Adoption - Batch 2 (Profiles)
- [ ] AthletePublicProfile: HeroSection, StatCard variants, ResultItem
- [ ] ClubPublicProfile: HeroSection, StatCard variants, ListItem
- [ ] ProfilePage: HeroSection, StatCard variants
- [ ] Smazat nahrazený CSS kód
- [ ] Srovnat screenshots

**AthletePublicProfile změny:**
```
Soubory:
- src/prototypes/AthletePublicProfile.tsx
- src/prototypes/AthletePublicProfile.css

Nahradit:
- .athlete-hero → <HeroSection section={section} variant="image" backgroundImage={...} wave>
- .athlete-stat-card--medal-* → <StatCard variant="medal-gold|silver|bronze" />
- .athlete-result-item → <ResultItem rank={...} />

Smazat z CSS (~400 řádků):
- .athlete-hero__* hero sekce
- .athlete-stat-card--medal-* varianty
- .athlete-result-item--rank-* varianty
- section gradient duplicity (dv/ry/vt)
```

**ClubPublicProfile změny:**
```
Soubory:
- src/prototypes/ClubPublicProfile.tsx
- src/prototypes/ClubPublicProfile.css

Nahradit:
- .club-hero → <HeroSection section="generic" variant="gradient" wave>
- .club-stat-card--medal-* → <StatCard variant="medal-*" />
- .club-member-item → <ListItem variant="default" />

Smazat z CSS (~250 řádků):
- .club-hero__* hero sekce
- medal stat varianty
- member item styles
```

**ProfilePage změny:**
```
Soubory:
- src/prototypes/ProfilePage.tsx
- src/prototypes/ProfilePage.css

Nahradit:
- .profile-hero → <HeroSection section={section} variant="gradient">
- .profile-achievement → <StatCard variant="medal-*" />

Smazat z CSS (~300 řádků):
- .profile-hero__* sekce
- .profile-achievement__icon--gold/silver/bronze
- section variant duplicity
```

**Kritéria dokončení:**
- [ ] 3 prototypy používají nové komponenty
- [ ] `npm run test:visual` - 0 regresí
- [ ] CSS soubory zmenšeny o ~950 řádků celkem

#### 22.12 Prototype Adoption - Batch 3 (Dashboard, Registration)
- [ ] DashboardPage: HeroSection, StatCard variants, ListItem, ActionCard
- [ ] RegistrationPage: HeroSection, Wizard
- [ ] Smazat nahrazený CSS kód
- [ ] Srovnat screenshots

**DashboardPage změny:**
```
Soubory:
- src/prototypes/DashboardPage.tsx
- src/prototypes/DashboardPage.css

Nahradit:
- .dashboard-hero-section → <HeroSection section={section} variant="gradient" wave>
- .dashboard-stat-card--gradient-* → <StatCard variant="gradient-*" />
- .dashboard-alert-item → <ListItem variant="alert" type={...} />
- .dashboard-quick-action → <ActionCard icon={...} title={...} />

Smazat z CSS (~450 řádků):
- .dashboard-hero-section__* kompletní hero
- .dashboard-stat-card--gradient-* varianty
- .dashboard-alert-item + .dashboard-alert-icon--* typy
- .dashboard-quick-action + hover efekty
- section variant duplicity (dv/ry/vt/federation)
```

**RegistrationPage změny:**
```
Soubory:
- src/prototypes/RegistrationPage.tsx
- src/prototypes/RegistrationPage.css

Nahradit:
- .registration-page-hero → <HeroSection section={section} variant="gradient" wave>
- .registration-page__wizard + .registration-wizard-step → <Wizard steps={...} activeStep={...} />

Smazat z CSS (~350 řádků):
- .registration-page-hero__* kompletní hero
- .registration-page__wizard layout
- .registration-wizard-step__* circle, line, states
- section variant duplicity
```

**Kritéria dokončení:**
- [ ] 2 prototypy používají nové komponenty
- [ ] Wizard komponenta plně nahrazuje custom implementation
- [ ] `npm run test:visual` - 0 regresí
- [ ] CSS soubory zmenšeny o ~800 řádků celkem

#### 22.13 Prototype Adoption - Batch 4 (Live, Event)
- [ ] LivePage: HeroSection, StatCard variants, ListItem
- [ ] EventDetailPage: HeroSection, StatCard variants
- [ ] Smazat nahrazený CSS kód
- [ ] Srovnat screenshots

**LivePage změny:**
```
Soubory:
- src/prototypes/LivePage.tsx
- src/prototypes/LivePage.css

Nahradit:
- .live-page-hero → <HeroSection section={section} variant="gradient">
- stat cards s gradient → <StatCard variant="gradient-*" />
- activity/alert items → <ListItem variant="activity|alert" />

Smazat z CSS (~500 řádků):
- .live-page-hero__* kompletní hero
- gradient stat card varianty
- activity/alert item styles
- section variant duplicity

POZOR: LivePage má komplexní modální okna - ty NEZASAHOVAT, pouze hero a list items.
```

**EventDetailPage změny:**
```
Soubory:
- src/prototypes/EventDetailPage.tsx
- src/prototypes/EventDetailPage.css

Nahradit:
- .event-detail-hero → <HeroSection section={section} variant="gradient" wave>
- sidebar stat cards → <StatCard variant="gradient-*" />

Smazat z CSS (~350 řádků):
- .event-detail-hero__* kompletní hero
- stat card gradient varianty
- section variant duplicity (dv/ry/vt)
```

**Kritéria dokončení:**
- [ ] 2 prototypy používají nové komponenty
- [ ] LivePage modály zůstávají nedotčeny
- [ ] `npm run test:visual` - 0 regresí
- [ ] CSS soubory zmenšeny o ~850 řádků celkem

#### 22.14 Final Cleanup
- [ ] Audit všech prototype CSS souborů - odstranit mrtvý kód
- [ ] Aktualizovat bundle size metriky
- [ ] Finální visual regression test - full suite
- [ ] Aktualizovat dokumentaci

**CSS Audit checklist:**
```bash
# Pro každý prototype CSS soubor:
# 1. Grep pro nepoužívané selektory
# 2. Ověřit že všechny .xxx--dv/ry/vt byly nahrazeny section systemem
# 3. Ověřit že hero, stat, list, wizard styly byly odstraněny

# Očekávané velikosti po cleanup:
# CalendarPage.css:    348 → ~320 řádků (-8%)
# ResultsPage.css:     811 → ~600 řádků (-26%)
# AthletePublicProfile.css: 1265 → ~850 řádků (-33%)
# ClubPublicProfile.css:    788 → ~550 řádků (-30%)
# ProfilePage.css:     1750 → ~1400 řádků (-20%)
# DashboardPage.css:   1414 → ~950 řádků (-33%)
# RegistrationPage.css: 1773 → ~1400 řádků (-21%)
# EventDetailPage.css: 1257 → ~900 řádků (-28%)
# LivePage.css:        2779 → ~2250 řádků (-19%)
# CELKEM:              12185 → ~9220 řádků (-24%)
```

**Bundle size měření:**
```bash
npm run build
# Zaznamenat nové velikosti do PLAN.md metriky sekce
```

**Dokumentace k aktualizaci:**
- [ ] `src/components/index.ts` - exporty nových komponent
- [ ] `PLAN.md` - metriky, shrnutí fáze 22
- [ ] Případně `PROJECT.md` - nové komponenty

**Finální visual regression:**
```bash
npm run test:visual
# Všechny testy musí projít
# Žádné vizuální rozdíly oproti baseline
```

**Kritéria dokončení fáze 22:**
- [ ] Všechny visual testy projdou
- [ ] CSS redukce ≥ 20% (12185 → <9750)
- [ ] 6 nových komponent exportováno
- [ ] 2 komponenty rozšířeny (HeroSection, StatCard)
- [ ] Žádné TODO komentáře v kódu
- [ ] Bundle size změřen a zaznamenán

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

**Pokračovat s 22.5 ResultItem Component** - vytvořit novou komponentu pro zobrazení výsledků s medal stylingem, border-left accent a hover efekty.

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
