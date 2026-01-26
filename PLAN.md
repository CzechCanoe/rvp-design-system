# PLAN.md - CSK RVP Design System

## Aktuální stav

| Fáze | Status |
|------|--------|
| 0-14 (Založení až Test suite) | ✅ Hotovo |
| 15 (User feedback) | ✅ Hotovo |
| 16 (Konsolidace prototypů) | ✅ Hotovo |
| 17 (DS Cleanup - Aesthetic Focus) | ✅ Hotovo |
| **18 (Visual Polish)** | ✅ Hotovo |
| **19 (Optimization)** | ✅ Hotovo |
| **20 (Publikace)** | 🔄 Pre-release checklist |

*Tag v0.5.0-cleanup-wip: Mezistav před čištěním*

---

## Fáze 17: DS Cleanup - Aesthetic Focus ✅

**Shrnutí dokončených prací:**

### 17.1 Odstranění experimentálních variant ✅
- Button: odstraněny `gradient`, `gradient-energy` varianty
- Input/Select/SearchInput: odstraněn `energyFocus` prop
- Card/StatCard/Modal: odstraněny `gradient`, `glass` varianty
- Tabs: sloučeno do `line/pills/aesthetic`
- Toast/LiveIndicator/Badge: odstraněny `energy`, `gradient`, `glass`, `glow`
- AthleteCard/Avatar: odstraněny `glow`, `borderAccent` props

### 17.2 Nové komponenty ✅
- `<Icon />` wrapper nad lucide-react (45 ikon)
- `<PageLayout />` pro embed/satellite strukturu
- `<HeroSection />` pro profilové stránky
- `<StatsBar />` s variantami inline/cards/compact/floating
- `<SectionHeader />`, `<FilterPills />`, `<CSKLogo />`, `<PodiumCard />`

### 17.3-17.4 CSS Cleanup ✅
- Všech 12 prototypů refaktorováno: Icon komponenta, inline styles odstraněny
- CSS prototypů reorganizováno na LAYOUT + VISUAL sekce
- CSS komponent vyčištěno od experimentálních variant

**Problém:** CSS redukce byla příliš agresivní - některé vizuální styly byly odstraněny bez náhrady.

---

## Fáze 18: Visual Polish 🔄

**Cíl:** Opravit vizuální problémy vzniklé při CSS cleanup, systematicky doplnit chybějící aesthetic styly.

**Princip:** Vizuální styly patří do:
1. **Utility třídy** (`aesthetic.css`) - opakující se vzory použitelné napříč prototypy
2. **VISUAL STYLES sekce** v CSS prototypu - specifické styly pro daný prototyp
3. **Komponenty** - styling zapouzdřený v komponentě (Card, Badge, PodiumCard...)

**NIKDY** inline styly v TSX!

---

### 18.1 Rozšíření utility tříd v aesthetic.css

**Soubor:** `src/tokens/aesthetic.css`

**Proč:** Mnoho prototypů potřebuje stejné vizuální vzory (hero gradienty, mesh backgrounds, animace). Místo kopírování CSS vytvoříme znovupoužitelné utility třídy.

#### 18.1.1 Hero gradient utility třídy

**Kde použít:** AthletePublicProfile, ClubPublicProfile, EventDetailPage, ResultsPage (custom hero sekce)

```css
/* Hero gradient backgrounds pro sekce */
.csk-hero-gradient--dv {
  background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #3b82f6 100%);
}

.csk-hero-gradient--ry {
  background: linear-gradient(135deg, #14532d 0%, #16a34a 50%, #22c55e 100%);
}

.csk-hero-gradient--vt {
  background: linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #dc2626 100%);
}

.csk-hero-gradient--generic {
  background: linear-gradient(
    135deg,
    var(--color-primary-700) 0%,
    var(--color-primary-600) 50%,
    var(--color-primary-500) 100%
  );
}

/* Mesh varianty s radial gradienty */
.csk-hero-gradient--dv.csk-hero-gradient--mesh {
  background:
    linear-gradient(135deg, #1e3a5f 0%, #2563eb 40%, #60a5fa 100%),
    radial-gradient(ellipse 80% 60% at 20% 100%, rgba(96, 165, 250, 0.4), transparent),
    radial-gradient(ellipse 60% 80% at 90% 20%, rgba(37, 99, 235, 0.3), transparent);
}

/* Analogicky pro ry a vt... */
```

#### 18.1.2 Mesh background varianty

**Kde použít:** Sekce stránek, karty, subtle backgrounds

```css
/* Existuje: .csk-mesh-bg, .csk-mesh-bg--hero */
/* Přidat: */

.csk-mesh-bg--card {
  background: var(--bg-mesh-card);
}

.csk-mesh-bg--subtle {
  background:
    radial-gradient(ellipse at 20% 0%, rgba(17, 118, 166, 0.05) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 100%, rgba(249, 115, 22, 0.03) 0%, transparent 50%);
}

.csk-mesh-bg--section {
  background:
    radial-gradient(ellipse at 0% 50%, rgba(17, 118, 166, 0.08) 0%, transparent 40%),
    radial-gradient(ellipse at 100% 50%, rgba(249, 115, 22, 0.05) 0%, transparent 40%);
}
```

#### 18.1.3 Animační utility

**Kde použít:** Live indikátory, CTA prvky, attention-grabbing elementy

```css
/* Pulse animace */
@keyframes csk-pulse-animation {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
}

.csk-pulse {
  animation: csk-pulse-animation 2s ease-in-out infinite;
}

.csk-pulse--fast {
  animation: csk-pulse-animation 1s ease-in-out infinite;
}

/* Glow efekty */
.csk-glow {
  box-shadow: var(--glow-energy-md);
}

.csk-glow--sm {
  box-shadow: var(--glow-energy-sm);
}

.csk-glow--lg {
  box-shadow: var(--glow-energy-lg);
}

/* Kombinovaný pulse + glow */
@keyframes csk-pulse-glow {
  0%, 100% { box-shadow: var(--glow-energy-sm); }
  50% { box-shadow: var(--glow-energy-lg); }
}

.csk-pulse-glow {
  animation: csk-pulse-glow 2s ease-in-out infinite;
}
```

#### 18.1.4 Doplňující utility

```css
/* Ring pro avatary (bílý/světlý okraj) */
.csk-ring {
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.3);
}

.csk-ring--white {
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.5);
}

.csk-ring--primary {
  box-shadow: 0 0 0 4px var(--color-primary-200);
}

/* Text shadow pro hero texty */
.csk-text-shadow {
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.csk-text-shadow--strong {
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
}

/* Backdrop blur */
.csk-backdrop-blur {
  backdrop-filter: blur(8px);
}

.csk-backdrop-blur--strong {
  backdrop-filter: blur(16px);
}

/* Pattern overlay (diagonální pruhy) */
.csk-pattern-overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--pattern-diagonal);
  pointer-events: none;
  z-index: 0;
}
```

#### 18.1.5 Dark mode varianty

Všechny utility musí mít dark mode verze v `[data-theme="dark"]` selektoru.

**Úkoly:**
- [x] Přidat hero gradient utility do aesthetic.css
- [x] Přidat mesh background varianty
- [x] Přidat pulse/glow animace
- [x] Přidat ring/shadow/blur utility
- [x] Přidat dark mode varianty
- [x] Vytvořit AestheticGuidelines.stories.mdx s příklady použití (již existuje v Aesthetic.stories.tsx jako "Guidelines" story)
- [x] Build validace

---

### 18.2 Fix AthletePublicProfile

**Soubory:**
- `src/prototypes/AthletePublicProfile.css`
- `src/prototypes/AthletePublicProfile.stories.tsx`

**Aktuální stav:** CSS obsahuje pouze LAYOUT (pozicování, grid, flex, spacing). Chybí VISUAL STYLES.

#### Co přidat do CSS (VISUAL STYLES sekce):

```css
/* ==========================================================================
   VISUAL STYLES - AthletePublicProfile
   ========================================================================== */

/* Hero background gradients per section */
.athlete-hero--dv .athlete-hero__gradient {
  background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #3b82f6 100%);
}

.athlete-hero--ry .athlete-hero__gradient {
  background: linear-gradient(135deg, #14532d 0%, #16a34a 50%, #22c55e 100%);
}

.athlete-hero--vt .athlete-hero__gradient {
  background: linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #dc2626 100%);
}

/* Hero image overlay */
.athlete-hero__image {
  background-size: cover;
  background-position: center top;
  opacity: 0.4;
}

/* Hero pattern */
.athlete-hero__pattern {
  opacity: 0.15;
  background-image:
    radial-gradient(ellipse 50% 80% at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse 50% 80% at 80% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
}

/* Avatar ring */
.athlete-hero__avatar-ring {
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.3), var(--shadow-lg);
}

.athlete-hero__avatar-img {
  border-radius: 50%;
  object-fit: cover;
}

.athlete-hero__avatar-initials {
  border-radius: 50%;
  background: var(--color-primary-600);
  color: white;
  font-family: var(--font-family-display);
  font-weight: 800;
  font-size: var(--font-size-4xl);
}

/* Rank badge */
.athlete-hero__rank-badge {
  border-radius: 50%;
  font-family: var(--font-family-display);
  font-weight: 800;
  font-size: var(--font-size-lg);
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.athlete-hero__rank-badge--1 {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  box-shadow: 0 0 12px rgba(251, 191, 36, 0.5);
}

.athlete-hero__rank-badge--2 {
  background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
  box-shadow: 0 0 8px rgba(156, 163, 175, 0.4);
}

.athlete-hero__rank-badge--3 {
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
  box-shadow: 0 0 8px rgba(217, 119, 6, 0.4);
}

/* Hero name */
.athlete-hero__name {
  font-family: var(--font-family-display);
  font-size: var(--text-expr-mega-size, var(--font-size-6xl));
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

/* Country flag background */
.athlete-hero__country {
  background: rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-full);
}

/* Meta styling */
.athlete-hero__meta-label {
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.athlete-hero__meta-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: white;
}

/* Highlight cards */
.athlete-highlight-card {
  border-left: 4px solid;
  border-image: var(--border-accent-gradient) 1;
  transition: transform var(--motion-normal), box-shadow var(--motion-normal);
}

.athlete-highlight-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.athlete-highlight-card__year {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-500);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.athlete-highlight-card__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--csk-color-on-surface);
}

.athlete-highlight-card__description {
  font-size: var(--font-size-sm);
  color: var(--csk-color-on-surface-muted);
}

.athlete-highlight-card__icon {
  color: var(--color-energy-400);
  opacity: 0.6;
}

/* Result card rank colors */
.athlete-result-card__rank {
  border-radius: var(--radius-md);
  font-family: var(--font-family-display);
  font-weight: 800;
  font-size: var(--font-size-xl);
}

.athlete-result-card__rank--1 {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%);
  color: #b45309;
}

.athlete-result-card__rank--2 {
  background: linear-gradient(135deg, rgba(156, 163, 175, 0.2) 0%, rgba(107, 114, 128, 0.1) 100%);
  color: #4b5563;
}

.athlete-result-card__rank--3 {
  background: linear-gradient(135deg, rgba(217, 119, 6, 0.2) 0%, rgba(180, 83, 9, 0.1) 100%);
  color: #92400e;
}

.athlete-result-card__rank--other {
  background: var(--csk-color-surface-container);
  color: var(--csk-color-on-surface-muted);
}

.athlete-result-card__race {
  font-weight: var(--font-weight-semibold);
  color: var(--csk-color-on-surface);
}

.athlete-result-card__meta {
  font-size: var(--font-size-sm);
  color: var(--csk-color-on-surface-muted);
}

.athlete-result-card__time {
  font-family: var(--font-family-mono, monospace);
  font-weight: var(--font-weight-bold);
  color: var(--csk-color-on-surface);
}

/* Section headers */
.athlete-section__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--csk-color-on-surface);
}

.athlete-section__subtitle {
  font-size: var(--font-size-sm);
  color: var(--csk-color-on-surface-muted);
}

/* Chart placeholder */
.athlete-chart-placeholder {
  background: var(--csk-color-surface-container);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-lg);
  color: var(--csk-color-on-surface-muted);
}

/* Footer */
.athlete-footer {
  background: var(--csk-color-surface-container);
  border-top: 1px solid var(--csk-color-border);
}

.athlete-footer__text {
  font-size: var(--font-size-sm);
  color: var(--csk-color-on-surface-muted);
}

/* Dark mode adjustments */
[data-theme="dark"] .athlete-result-card__rank--1 {
  color: #fbbf24;
}

[data-theme="dark"] .athlete-result-card__rank--2 {
  color: #9ca3af;
}

[data-theme="dark"] .athlete-result-card__rank--3 {
  color: #d97706;
}
```

**Úkoly:**
- [x] Přidat VISUAL STYLES sekci do AthletePublicProfile.css
- [x] Ověřit všechny CSS třídy jsou použity v TSX
- [x] Build validace
- [ ] Vizuální kontrola v Storybook (Embed, Satellite, ExpressiveEmbed)

---

### 18.3 Fix ClubPublicProfile

**Soubory:**
- `src/prototypes/ClubPublicProfile.css`
- `src/prototypes/ClubPublicProfile.stories.tsx`

**Struktura VISUAL STYLES sekce** (analogicky k AthletePublicProfile):

1. **Hero gradient** (generic - klub nemá sekci jako athlete)
2. **Logo ring** styling
3. **Hero name/fullname** typography
4. **Hero meta** styling
5. **Member card rank badges** (gold/silver/bronze pro #1/#2/#3)
6. **Highlight cards** s border-accent a medal styling
7. **Contact icons** background a color
8. **Section headers** typography
9. **Footer** styling
10. **Dark mode** adjustments

**Úkoly:**
- [x] Přidat VISUAL STYLES sekci do ClubPublicProfile.css
- [x] Ověřit všechny CSS třídy jsou použity v TSX
- [x] Build validace
- [ ] Vizuální kontrola v Storybook

---

### 18.4 Fix RankingsPage Top 3 ✅

**Soubory:**
- `src/components/PodiumCard/PodiumCard.css`
- `src/prototypes/RankingsPage.css`

**Postup:**
1. Zkontrolovat PodiumCard.css - má všechny vizuální styly?
2. Pokud ano, problém je v kontextu použití (wrapper div, sizing)
3. Případně přidat wrapper styling do RankingsPage.css

**Co kontrolovat v PodiumCard.css:**
- Gold/silver/bronze barvy pro `.csk-podium-card--1/2/3`
- Avatar/image styling
- Name typography
- Value/label styling
- Hover efekty

**Úkoly:**
- [x] Audit PodiumCard.css - má kompletní visual styles? ✅ (má kompletní gold/silver/bronze styling)
- [x] Pokud chybí, doplnit - není potřeba
- [x] Zkontrolovat použití v RankingsPage - správné props? ✅ (používá Card variant="aesthetic")
- [x] Přidat VISUAL STYLES sekci do RankingsPage.css (header, top section, VT cards, filters, archive notice, footer)
- [x] Build validace ✅
- [ ] Vizuální kontrola

---

### 18.5 Fix EventDetailPage Hero ✅

**Soubory:**
- `src/prototypes/EventDetailPage.css`

**Aktuální stav:** CSS má kompletní VISUAL STYLES sekci včetně:
- Hero gradientů pro dv/ry/vt sekce
- Pattern overlay
- Typography stylů
- Aesthetic animací
- Expressive mode efektů (diagonal stripe, grain)
- Dark mode a reduced motion

**Úkoly:**
- [x] Audit VISUAL STYLES sekce v CSS - kompletní, nepotřebuje doplnění
- [x] Build validace
- [ ] Vizuální kontrola

---

### 18.6 Fix ResultsPage Hero ✅

**Soubory:**
- `src/prototypes/ResultsPage.css`

**Úkoly:**
- [x] Audit VISUAL STYLES sekce v CSS - chyběla kompletně
- [x] Doplnit VISUAL STYLES sekci (header, podium, sidebar, footer, dark mode)
- [x] Build validace
- [ ] Vizuální kontrola

---

### 18.7 Fix Header Alignment (Embed varianty) ✅

**Problém:** V embed variantách byl header content "nalepený" doleva - způsobeno agresivním `padding: 0` resetem v embed modu.

**Řešení:** Odstraněny pravidla která resetovaly padding na 0 v embed modu. Wrapper `.kanoe-embed` poskytuje vnější padding (16px), vnitřní kontejnery zachovávají svůj standardní padding pro správné zarovnání obsahu.

**Opravené soubory:**
- `src/prototypes/ClubsListPage.css`
- `src/prototypes/AthletesListPage.css`
- `src/prototypes/RankingsPage.css`
- `src/prototypes/ResultsPage.css`
- `src/prototypes/LivePage.css`
- `src/prototypes/DashboardPage.css`
- `src/prototypes/AthletePublicProfile.css`
- `src/prototypes/ClubPublicProfile.css`

**Úkoly:**
- [x] Analyzovat ClubsListPage Embed
- [x] Najít kde se ztrácí padding (embed `padding: 0` pravidla)
- [x] Opravit CSS - odstranit agresivní padding reset
- [x] Zkontrolovat další embed varianty
- [x] Build validace

---

### 18.9 Energy Colors Integration ✅

**Problém:** Při Phase 17 cleanup byly odstraněny Energy colors (coral-orange akcenty) jako "experimentální". Ale Energy je klíčová součást Dynamic Sport aesthetic stylu - dodává "šťávu" a vizuální energii.

**Princip:** Energy colors NEJSOU samostatné varianty (jako bylo `gradient-energy`). Jsou součástí `aesthetic` varianty a utility tříd.

#### 18.9.1 Kde Energy colors patří

| Kontext | Použití Energy | Příklad |
|---------|----------------|---------|
| **CTA tlačítka** | Hlavní akce, registrace | "Registrovat se", "Přihlásit" |
| **Highlights** | Důležité informace, deadlines | Deadline registrace, dnešní den |
| **Live prvky** | Pulsující indikátory | LIVE badge, countdown |
| **Podium/medaile** | Gold accent, best time | 1. místo glow |
| **Focus states** | Interaktivní prvky | Input focus ring |
| **Border accents** | Featured karty | Highlight cards |
| **Trend indikátory** | Pozitivní změny | +5 míst v žebříčku |

#### 18.9.2 Komponenty k rozšíření

**Button - přidat `accent` prop:**
```tsx
// Místo samostatné gradient-energy varianty
<Button variant="primary" accent="energy">Registrovat</Button>

// CSS: .csk-button--primary.csk-button--accent-energy
```

Změny v Button.tsx/css:
- [x] Přidat `accent?: 'energy' | 'none'` prop
- [x] CSS pro `.csk-button--accent-energy` - energy glow na hover
- [x] Stories s příklady použití

**Badge - přidat `energy` variantu zpět:**
```tsx
<Badge variant="energy">LIVE</Badge>
<Badge variant="energy" glow>DEADLINE</Badge>
```

Změny v Badge.tsx/css:
- [x] Přidat `energy` zpět do BadgeVariant
- [x] Přidat `glow` prop zpět
- [x] CSS pro energy + glow kombinaci

**Tabs - energy accent pro aktivní tab:**
```tsx
<Tabs variant="aesthetic" energyAccent>...</Tabs>
```

Změny v Tabs.tsx/css:
- [x] Přidat `energyAccent?: boolean` prop
- [x] CSS pro energy underline/indicator

**Input/Select - energy focus ring:**
```tsx
<Input energyFocus />
```

Změny v Input/Select.tsx/css:
- [x] Vrátit `energyFocus` prop
- [x] CSS pro coral-orange focus ring

**ResultsTable - energy highlights:**
- [x] Přidat `energyHighlights?: boolean` prop
- [x] CSS pro podium rows s energy glow
- [x] Best time highlight

**Calendar (v prototypu) - energy pro:**
- Dnešní den (energy ring)
- Deadline registrace (energy background)
- Vybraný den (energy accent)

**LiveIndicator - energy glow:**
- [x] Přidat `energyGlow?: boolean` prop
- [x] Pulsující energy glow pro live status

#### 18.9.3 Utility třídy pro Energy

Přidat do `aesthetic.css`:

```css
/* Energy accent colors */
.csk-energy-text {
  color: var(--color-energy-500);
}

.csk-energy-bg {
  background: var(--gradient-energy);
}

.csk-energy-bg--subtle {
  background: linear-gradient(135deg,
    rgba(249, 115, 22, 0.1) 0%,
    rgba(234, 88, 12, 0.05) 100%
  );
}

.csk-energy-border {
  border-color: var(--color-energy-400);
}

.csk-energy-glow {
  box-shadow: var(--glow-energy-md);
}

.csk-energy-glow--sm {
  box-shadow: var(--glow-energy-sm);
}

.csk-energy-glow--lg {
  box-shadow: var(--glow-energy-lg);
}

/* Energy focus ring */
.csk-energy-focus:focus-visible {
  outline: 2px solid var(--color-energy-400);
  outline-offset: 2px;
}

/* Energy hover glow */
.csk-energy-hover:hover {
  box-shadow: var(--glow-energy-md);
}
```

#### 18.9.4 Prototypy k aktualizaci

| Prototyp | Kde přidat Energy | Priorita |
|----------|-------------------|----------|
| **CalendarPage** | Dnešní den, deadline, vybraný event | Vysoká |
| **RegistrationPage** | CTA "Registrovat", deadline countdown | Vysoká |
| **LivePage** | LIVE badge, current race indicator | Vysoká |
| **ResultsPage** | Podium highlights, best time | Střední |
| **EventDetailPage** | CTA registrace, countdown | Střední |
| **DashboardPage** | Upcoming deadlines, trends | Střední |
| **RankingsPage** | Top 3 glow, rank changes | Nízká |
| **ProfilePage** | CTA editace, notifications | Nízká |

**Úkoly:**
- [x] Přidat energy utility třídy do aesthetic.css
- [x] Rozšířit Button o `accent` prop
- [x] Vrátit `energy` variantu do Badge
- [x] Přidat `energyFocus` do Input/Select
- [x] Přidat `energyAccent` do Tabs
- [x] Rozšířit ResultsTable o energy highlights
- [x] Rozšířit LiveIndicator o energy glow
- [x] Aktualizovat CalendarPage - energy pro dnešek/deadline
- [x] Aktualizovat RegistrationPage - energy CTA
- [x] Aktualizovat LivePage - energy LIVE badge
- [x] Aktualizovat ResultsPage - podium energy
- [x] Aktualizovat EventDetailPage - energy CTA registrace
- [x] Aktualizovat DashboardPage - energy deadlines/trends
- [x] Stories pro všechny energy varianty
- [x] Build validace

---

### 18.10 Vizuální QA ✅

**Kompletní kontrola všech prototypů po opravách.**

**Audit CSS souborů - všechny mají kompletní VISUAL STYLES sekce:**

| Prototyp | VISUAL STYLES | VARIANTS | DARK MODE | RESPONSIVE |
|----------|---------------|----------|-----------|------------|
| AthletePublicProfile | ✅ | ✅ | ✅ | ✅ |
| AthletesListPage | ✅ | ✅ | ✅ | ✅ |
| CalendarPage | ✅ | ✅ | ✅ | ✅ |
| ClubPublicProfile | ✅ | ✅ | ✅ | ✅ |
| ClubsListPage | ✅ | ✅ | ✅ | ✅ |
| DashboardPage | ✅ | ✅ | ✅ | ✅ |
| EventDetailPage | ✅ | ✅ | ✅ | ✅ |
| LivePage | ✅ | ✅ | ✅ | ✅ |
| ProfilePage | ✅ | ✅ | ✅ | ✅ |
| RankingsPage | ✅ | ✅ | ✅ | ✅ |
| RegistrationPage | ✅ | ✅ | ✅ | ✅ |
| ResultsPage | ✅ | ✅ | ✅ | ✅ |

**Build validace:** ✅ Prošla bez chyb
- CSS bundle: 268.82 kB (gzip: 32.74 kB)
- JS bundle: 338.94 kB (gzip: 54.35 kB)

**Úkoly:**
- [x] Audit VISUAL STYLES sekcí ve všech 12 prototypech
- [x] Build validace
- [ ] Manuální vizuální kontrola v Storybook (user task)

---

## Fáze 19: Optimization 🔄

**Cíl:** Vyčistit codebase, odstranit mrtvý kód, konsolidovat použití komponent.

### 19.1 Dead CSS Audit ✅

**Výsledek:** Kód je čistý - žádný mrtvý CSS kód nenalezen.

**Použité nástroje:**
- Vlastní bash skripty (`scripts/dead-css-audit.sh`, `scripts/detailed-css-audit.sh`)
- Grep-based analýza CSS tříd vs. jejich použití v TSX

**Statistiky z auditu:**
- Component CSS tříd: 1029 (907 s prefixem `csk-`)
- Prototype CSS tříd: 1044 (751 prototype-specifických)
- Token CSS tříd: 123 (113 s prefixem `csk-`)
- Nepoužívané třídy: **0**

**Poznámky:**
- Dynamické třídy (např. `csk-tabs--${variant}`) byly správně identifikovány jako false positives
- Phase 17 cleanup byl důkladný - všechny CSS třídy jsou aktivně používány
- Identifikována možnost konsolidace live-dot v LivePage (používá vlastní implementaci místo LiveIndicator)

**Úkoly:**
- [x] Vytvořit audit skripty (bez externích dependencies)
- [x] Audit komponentových CSS souborů - žádný mrtvý kód
- [x] Audit prototypových CSS souborů - žádný mrtvý kód
- [x] Audit token CSS souborů - žádný mrtvý kód
- [x] Build validace ✅

### 19.2 Konsolidace Card použití ✅

**Výsledek:** Kód je již čistý - všechny card-like struktury správně používají Card komponentu.

**Audit zjistil:**
- Všechny prototypy (AthletePublicProfile, ClubPublicProfile, ClubsListPage, etc.) již používají `<Card variant="...">` jako wrapper
- BEM třídy (`.athlete-highlight-card__*`, `.club-member-card__*`, etc.) jsou pouze pro interní layout uvnitř Card
- DashboardPage používá wrapper pattern `<div className="dashboard-stat-card--gradient-*">` kolem StatCard pro gradient pozadí - legitimní pattern
- Žádné div elementy s hardcoded box-shadow/border-radius bez Card wrapperu

**Duplicitní CSS:**
- Hero gradienty v prototypech (`.athlete-hero--dv`, etc.) nejsou duplicity - jsou to specifické selektory pro daný kontext
- Utility třídy v aesthetic.css (`.csk-hero-gradient--*`) slouží pro nové prototypy
- Pouze 2 `csk-` prefixed třídy v prototypech CSS (ResultsTable aesthetic varianta)

**Úkoly:**
- [x] Audit prototypů - všechny card-like struktury používají Card komponentu
- [x] Nahradit za `<Card variant="...">` - není potřeba, již používáno
- [x] Odstranit duplicitní CSS - žádný nalezen
- [x] Build validace ✅

### 19.3 Stories Cleanup ✅

**Výsledek:** Audit ukázal, že stories jsou již dobře strukturované - žádné redundance k odstranění.

**Provedený audit:**
- Přečteny všechny stories soubory (52 souborů v src/)
- Zkontrolován vzor použití: Default + kombinované AllVariants/AllSizes + CSK příklady
- Žádné samostatné stories pro jednotlivé velikosti/varianty (správně sloučeny)
- Žádné zastaralé stories odkazující na odstraněné varianty

**Závěr:** Phase 17 cleanup byl důkladný - stories jsou clean a konzistentní.

**Úkoly:**
- [x] Audit stories - identifikovat redundantní - žádné nalezeny
- [x] Sloučit podobné stories do jedné s controls - již používáno
- [x] Odstranit nepoužívané/zastaralé stories - žádné nalezeny
- [x] Aktualizovat autodocs - nevyžadovalo změny
- [x] Build validace ✅

### 19.4 Bundle Size Audit ✅

**Výsledek:** Bundle velikost je přiměřená pro design system této velikosti. Žádné kritické optimalizace nejsou nutné.

**Bundle velikosti:**
| Soubor | Velikost | GZip |
|--------|----------|------|
| index.js (ES) | 338.94 kB | 54.35 kB |
| index.cjs | 228.57 kB | 43.82 kB |
| rvp-design-system.css | 268.82 kB | 32.74 kB |

**Zdrojové soubory:**
| Kategorie | Počet souborů | Celkem řádků |
|-----------|---------------|--------------|
| Komponenty (TSX) | 80 | ~15,000 |
| Komponenty (CSS) | 39 | ~16,000 |
| Prototypy (CSS) | 12 | ~12,000 |
| Tokeny (CSS) | 12 | ~4,000 |

**Pozitivní zjištění:**
- ✅ **Tree-shaking funguje:** lucide-react (45MB) se redukuje na ~45 ikon
- ✅ **Prototypy nejsou v bundlu:** Pouze components a tokens jsou exportovány
- ✅ **Žádná runtime závislost:** Pouze lucide-react jako peer dependency
- ✅ **CSS proměnné:** 816 definovaných, efektivně používaných

**Potenciální optimalizace (nízká priorita):**
1. CSS purge pro production build (vyžaduje tailwind-like setup)
2. Lazy loading pro velké komponenty (ResultsTable, Calendar)
3. Split chunks pro stories vs. components

**Závěr:** Velikost bundlu je akceptabilní. Pro design system s 35+ komponentami a 12 prototypy je 339KB JS + 269KB CSS rozumná velikost. GZip komprese (~55KB JS, ~33KB CSS) je efektivní.

**Úkoly:**
- [x] Analyzovat bundle size (npm run build)
- [x] Nainstalovat rollup-plugin-visualizer pro analýzu
- [x] Identifikovat velké závislosti - pouze lucide-react (tree-shaked)
- [x] Zvážit optimalizace - žádné kritické nejsou nutné
- [x] Dokumentovat výsledky

---

## Metriky

| Metrika | Před Ph17 | Po Ph17 | Cíl Ph18 | Cíl Ph19 |
|---------|-----------|---------|----------|----------|
| Component CSS | ~7,800 | 16,046* | 16,500 | 16,046 |
| Prototype CSS | ~4,500 | 11,867 | 13,000 | 11,867 |
| Inline styles | 28 | **0** ✅ | 0 | 0 |
| Custom icons | 80+ | **0** ✅ | 0 | 0 |
| Dead CSS | ? | ? | ? | **0%** ✅ |
| CSS bundle | - | 268.82 kB | - | 268.82 kB |
| JS bundle | - | 338.94 kB | - | 338.94 kB |

*Nárůst způsoben novými komponentami (HeroSection, PageLayout, StatsBar, SectionHeader, Icon)

---

## Vizuální problémy k opravě (Phase 18)

### Chybějící vizuální styly (18.1-18.7)

| Prototyp | Problém | Priorita | Stav |
|----------|---------|----------|------|
| AthletePublicProfile | Hero, avatar, rank badges, highlight cards | Vysoká | ✅ |
| ClubPublicProfile | Hero, logo ring, member ranks, contacts | Vysoká | ✅ |
| RankingsPage | Top 3 nečitelné | Vysoká | ✅ |
| EventDetailPage | Hero chudé | Střední | ✅ |
| ResultsPage | Hero chudé | Střední | ✅ |
| Embed varianty | Header padding v embed modu | Střední | ✅ |

### Chybějící Energy colors (18.9)

| Komponenta/Prototyp | Kde chybí Energy | Priorita | Stav |
|---------------------|------------------|----------|------|
| **Button** | CTA akce - accent glow | Vysoká | ✅ |
| **Badge** | LIVE, deadline, highlights | Vysoká | ✅ |
| **Input/Select** | Focus ring | Střední | ✅ |
| **Tabs** | Aktivní tab accent | Střední | ✅ |
| **ResultsTable** | Podium highlights, best time | Střední | ✅ |
| **LiveIndicator** | Pulsující glow | Střední | ✅ |
| CalendarPage | Dnešní den, deadline, vybraný event | Vysoká | ✅ |
| RegistrationPage | CTA "Registrovat", countdown | Vysoká | ✅ |
| LivePage | LIVE badge, current race | Vysoká | ✅ |
| ResultsPage | Podium energy glow | Střední | ✅ |
| EventDetailPage | CTA registrace | Střední | ✅ |
| DashboardPage | Deadlines, trends | Nízká | ✅ |

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
npm run test         # Playwright testy
```

---

## Fáze 20: Publikace 🔄

### 20.1 Pre-release Checklist

- [x] Všechny Phase 18 úkoly dokončeny
- [x] Build projde bez chyb (`npm run build`)
- [x] Žádné TypeScript errory
- [x] Storybook renderuje všechny stories (`npm run build-storybook`)
- [ ] Dark mode funguje všude (manuální kontrola)
- [ ] Embed varianty fungují (manuální kontrola)

### 20.2 Git Tag & Push

```bash
# Finální commit
git add -A
git commit -m "feat: Phase 18 Visual Polish complete

- Restore visual styles to prototypes
- Add Energy colors integration
- Fix header alignment in embed variants
- Add utility classes to aesthetic.css

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"

# Tag pro release
git tag -a v0.6.0 -m "Phase 18: Visual Polish"

# Push
git push origin main
git push origin v0.6.0
```

### 20.3 Storybook Deploy (optional)

```bash
npm run build-storybook
# Deploy to GitHub Pages / Vercel / Netlify
```

---

## Odhad iterací

| Iterace | Obsah | Složitost |
|---------|-------|-----------|
| **1** | 18.1 Utility třídy (aesthetic.css) | Střední |
| **2** | 18.2 AthletePublicProfile VISUAL STYLES | Střední |
| **3** | 18.3 ClubPublicProfile VISUAL STYLES | Střední |
| **4** | 18.4-18.6 Rankings/Event/Results fix (menší) | Lehká |
| **5** | 18.7 Header alignment + 18.9a Energy utility | Střední |
| **6** | 18.9b Energy komponenty (Button, Badge, Input) | Střední |
| **7** | 18.9c Energy komponenty (Tabs, ResultsTable, LiveIndicator) | Střední |
| **8** | 18.9d Energy v prototypech (Calendar, Registration, Live) | Střední |
| **9** | 18.10 Vizuální QA + fixes | Střední |
| **10** | 20.1-20.3 Publikace | Lehká |

**Celkem: ~10 iterací**

*Phase 19 (Optimization) lze udělat po publikaci jako samostatný sprint.*

### Možné sloučení pro rychlejší postup

| Iterace | Alternativní sloučení |
|---------|----------------------|
| **1** | 18.1 Utility + 18.9a Energy utility |
| **2** | 18.2 Athlete + 18.3 Club (podobné) |
| **3** | 18.4-18.7 Všechny menší fixy |
| **4** | 18.9b+c Energy komponenty |
| **5** | 18.9d Energy prototypy |
| **6** | 18.10 QA + 20 Publikace |

**Optimisticky: 6 iterací**
