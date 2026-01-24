# Design Principles - CSK RVP Design System

Základní principy designu pro veřejné sekce webů Českého svazu kanoistů.

---

## Dynamic Sport Aesthetic

Vizuální identita DS postavená na energickém, moderním a sportovním vzhledu.

### Klíčové prvky

| Prvek | Token / Class | Použití |
|-------|---------------|---------|
| **Display font** | `--font-family-display` | Headlines, rank čísla, brand text |
| **Energy color** | `--color-energy-500` (#f97316) | Live indikátory, CTA, highlights |
| **Mesh backgrounds** | `--bg-mesh-hero`, `--bg-mesh-card` | Hero sekce, featured cards |
| **Border accent** | `--border-accent-gradient` | Zvýraznění karet, řádků |
| **Glow effects** | `--glow-energy-sm/md/lg` | Hover states, live prvky |

### Display Font vs Body Font

```
Display font (Plus Jakarta Sans):
├── Headlines (h1-h4)
├── Brand/app titles
├── Rank čísla v tabulkách
├── Large badges
├── Large buttons
└── Card titles (.csk-card__title)

Body font (Inter):
├── Body text
├── Form inputs
├── Table content
├── Small/medium badges
└── Navigation links
```

### Energy vs Primary Color

| Kontext | Barva | Příklad |
|---------|-------|---------|
| **Live/urgentní stavy** | Energy (coral-orange) | LIVE badge, aktivní závodník |
| **CTA tlačítka** | Energy gradient | "Sledovat live", "Registrovat" |
| **Highlights** | Energy | Featured řádky, notifikace |
| **Standardní interakce** | Primary (blue) | Odkazy, sekundární tlačítka |
| **Branded prvky** | Primary gradient | Header, discipline badges |

### Mesh Backgrounds

```css
/* Hero sekce - výrazný gradient mesh */
--bg-mesh-hero: radial-gradient(ellipse at 0% 0%, rgba(17, 118, 166, 0.2)...)

/* Cards - subtilní mesh */
--bg-mesh-card: radial-gradient(ellipse at 0% 0%, rgba(17, 118, 166, 0.08)...)

/* Primary - obecné použití */
--bg-mesh-primary: radial-gradient(...)
```

**Kdy použít:**
- Hero sekce na landing pages
- Featured/aesthetic karty
- Pozadí důležitých sekcí (ne pro běžný obsah)

**Kdy nepoužívat:**
- Embed komponenty (mají být neutrální)
- Formuláře (odvádí pozornost)
- Tabulky s mnoha řádky

### Animation Guidelines

```css
/* Sport easing - snappy, energický */
--ease-sport: cubic-bezier(0.22, 1, 0.36, 1);

/* Snap easing - s bounce efektem */
--ease-snap: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Staggered reveals - postupné zobrazení */
.csk-reveal-1 { animation-delay: 0ms; }
.csk-reveal-2 { animation-delay: 50ms; }
...
```

**Doporučení:**
- Používat `--ease-sport` pro většinu přechodů
- Staggered reveals pro hero sekce a seznamy
- Respektovat `prefers-reduced-motion`

---

## Kompatibilita s kanoe.cz

DS je navržen pro postupnou integraci do stávajícího webu kanoe.cz.

### Tři režimy zobrazení

| Režim | Účel | Aktivace |
|-------|------|----------|
| **Utility** | Plné DS styly | Default |
| **Expressive** | Výrazné animace | `data-mode="expressive"` |
| **Embed** | Neutrální pro kanoe.cz | `data-mode="embed"` |

### Embed Mode

V embed režimu jsou aesthetic prvky tlumené:
- Žádné mesh backgrounds
- Minimální animace
- Konzistentní s Bootstrap 4 vzhledem kanoe.cz
- Respektuje primární barvu kanoe.cz (#1176a6)

---

## Komponenty s Aesthetic variantami

| Komponenta | Aesthetic prvky |
|------------|-----------------|
| **Button** | `gradient-energy` varianta, `glow` prop, display font pro lg |
| **Badge** | `energy` varianta, display font pro lg, glow |
| **Card** | `aesthetic` varianta, `meshBg`, `borderAccent` props |
| **Header** | `.csk-header__brand-title`, `.csk-header__app-title` |
| **ResultsTable** | Display font rank, energy live, featured rows |

---

## CSS Utility Classes

```css
/* Display typography */
.csk-display          /* Display font + weight */
.csk-headline         /* Headline preset */

/* Backgrounds & textures */
.csk-mesh-bg          /* Primary mesh background */
.csk-mesh-bg--hero    /* Hero mesh background */
.csk-grain            /* Grain texture overlay */
.csk-diagonal         /* Diagonal pattern overlay */

/* Shapes */
.csk-angle            /* Angular clip-path (md) */
.csk-angle--sm/--lg   /* Size variants */

/* Accents */
.csk-border-accent    /* Border-accent gradient left */
.csk-hover-glow       /* Energy glow on hover */

/* Animations */
.csk-reveal           /* Reveal animation */
.csk-reveal-1 až -6   /* Staggered delays */
```

---

## Příklady použití

### Live Event Card

```tsx
<Card variant="aesthetic" clickable>
  <Badge variant="energy" size="lg" pill glow>ŽIVĚ</Badge>
  <h3 className="csk-card__title">Český pohár #3</h3>
  <Button variant="gradient-energy" glow>Sledovat live</Button>
</Card>
```

### Featured Results Row

```tsx
<tr className="csk-results-table__tr--featured csk-results-table__tr--live">
  <td>
    <span className="csk-results-table__rank">1</span>
    <span className="csk-results-table__live-indicator" />
  </td>
  ...
</tr>
```

### Hero Section

```tsx
<section className="csk-mesh-bg--hero csk-grain">
  <h1 className="csk-display csk-reveal csk-reveal-1">
    MČR ve slalomu
  </h1>
  <Badge variant="energy" className="csk-reveal csk-reveal-2">
    ŽIVĚ
  </Badge>
</section>
```
