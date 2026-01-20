# CSK Logo Guidelines - Integrace do Design Systému

Pravidla pro správné použití loga Českého svazu kanoistiky v rámci RVP design systému.

---

## 1. Varianty loga

### 1.1 Doporučené varianty

| Varianta | Použití | Pozadí |
|----------|---------|--------|
| **Plnobarevné** | Primární použití | Světlé pozadí |
| **Monochromatické** | Jednobarevné kontexty | Jakékoliv |
| **Inverzní (bílé)** | Tmavá a barevná pozadí | Tmavé, gradient |
| **Favicon** | Záložky, ikony | N/A |

### 1.2 Doporučení pro digitální použití

```css
/* Minimální velikosti pro čitelnost */
--logo-min-width-full: 120px;      /* Plná verze s textem */
--logo-min-width-compact: 32px;    /* Jen symbol */
--logo-min-height-header: 40px;    /* V navigaci */
```

---

## 2. Ochranná zóna

Logo musí mít kolem sebe dostatečný prostor pro zachování čitelnosti.

```
┌─────────────────────────────────┐
│                                 │
│    ┌───────────────────┐       │
│    │                   │       │
│    │   [CSK LOGO]      │       │  Ochranná zóna = 1/4 výšky loga
│    │                   │       │
│    └───────────────────┘       │
│                                 │
└─────────────────────────────────┘
```

### CSS implementace

```css
.csk-logo {
  /* Automatická ochranná zóna */
  padding: calc(var(--logo-height) * 0.25);
}

.csk-logo-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-4); /* 16px od okolních prvků */
}
```

---

## 3. Použití v komponentách

### 3.1 Header / Navigace

```jsx
// Doporučená implementace v Header komponentě
<Header>
  <Header.Logo
    src="/assets/csk-logo.svg"
    alt="Český svaz kanoistiky"
    height={40}
  />
  <Header.Nav>...</Header.Nav>
</Header>
```

**Pravidla:**
- Logo je vždy vlevo (LTR layout)
- Maximální výška v navigaci: 48px
- Na mobilu lze použít kompaktní variantu (jen symbol)
- Kliknutí vede na hlavní stránku

### 3.2 Footer

```jsx
<Footer>
  <Footer.Brand>
    <img
      src="/assets/csk-logo-white.svg"
      alt="ČSK"
      height={32}
    />
    <span>Český svaz kanoistiky</span>
  </Footer.Brand>
</Footer>
```

**Pravidla:**
- Inverzní (bílá) varianta na tmavém pozadí
- Menší velikost než v headeru (32px)
- Může být doplněno plným názvem organizace

### 3.3 Hero sekce

```jsx
<Hero variant="gradient">
  <Hero.Badge>
    <img src="/assets/csk-logo-white.svg" height={48} />
    <span>Oficiální výsledkový servis</span>
  </Hero.Badge>
</Hero>
```

**Pravidla:**
- Na gradient pozadí použít inverzní variantu
- Logo může být větší pro důraz (až 64px)
- Vždy s dostatečným kontrastem

### 3.4 Cards a widgety

```jsx
<Card variant="glass">
  <Card.Header>
    <img src="/assets/csk-symbol.svg" height={24} />
    <span>Mistrovství ČR</span>
  </Card.Header>
</Card>
```

**Pravidla:**
- V kartách použít menší symbol (24-32px)
- Vždy s popisným textem
- Zachovat ochrannou zónu

---

## 4. Barevné kombinace

### 4.1 Povolené kombinace

| Pozadí | Varianta loga | Kontrast |
|--------|--------------|----------|
| Bílé (#ffffff) | Plnobarevné | Vyhovuje |
| Světle šedé (#f5f5f5) | Plnobarevné | Vyhovuje |
| Primary gradient | Inverzní (bílé) | Vyhovuje |
| Tmavé (#171717+) | Inverzní (bílé) | Vyhovuje |
| Fotografie (světlá) | Plnobarevné + stín | Ověřit kontrast |
| Fotografie (tmavá) | Inverzní + stín | Ověřit kontrast |

### 4.2 Zakázané kombinace

- Logo na příliš podobném modrém pozadí
- Logo na rušivém vzoru bez overlay
- Logo s nízkou opacitou (< 80%)
- Logo s barevným filtrem/tint

### 4.3 CSS pomocné třídy

```css
/* Pro světlá pozadí */
.csk-logo--light-bg {
  /* Použít plnobarevnou variantu */
}

/* Pro tmavá pozadí */
.csk-logo--dark-bg {
  filter: brightness(0) invert(1);
  /* Nebo použít přímo white variantu SVG */
}

/* Pro fotografie - přidat stín pro čitelnost */
.csk-logo--on-image {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}
```

---

## 5. Responsive chování

### 5.1 Breakpointy

```css
/* Mobile (< 576px) */
@media (max-width: 575.98px) {
  .csk-logo {
    height: 32px;
  }
  .csk-logo-text {
    display: none; /* Pouze symbol */
  }
}

/* Tablet (576px - 1024px) */
@media (min-width: 576px) and (max-width: 1023.98px) {
  .csk-logo {
    height: 40px;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .csk-logo {
    height: 48px;
  }
}
```

### 5.2 Retina podpora

```html
<!-- Použít SVG pro ostrost na všech zařízeních -->
<img
  src="/assets/csk-logo.svg"
  alt="ČSK"
  width="120"
  height="40"
/>

<!-- Nebo srcset pro rastrové verze -->
<img
  src="/assets/csk-logo.png"
  srcset="/assets/csk-logo@2x.png 2x, /assets/csk-logo@3x.png 3x"
  alt="ČSK"
  width="120"
  height="40"
/>
```

---

## 6. Animace loga

### 6.1 Povolené animace

```css
/* Jemný fade-in při načtení */
.csk-logo-animated {
  animation: logoFadeIn var(--transition-slow) ease-out;
}

@keyframes logoFadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover efekt v navigaci */
.csk-logo:hover {
  transform: scale(1.02);
  transition: transform var(--transition-fast);
}

/* Reduced motion respekt */
@media (prefers-reduced-motion: reduce) {
  .csk-logo-animated,
  .csk-logo:hover {
    animation: none;
    transform: none;
  }
}
```

### 6.2 Zakázané animace

- Rotace loga
- Změna barev loga
- Morphing/deformace
- Rychlé blikání
- Permanentní animace

---

## 7. Co-branding

### 7.1 S disciplínovými logy

Při použití s disciplínovými logy (slalom, sprint, turistika):

```
┌────────────────────────────────────────┐
│  [CSK Logo]  │  [Disciplína Logo]      │
│              │                          │
│  Větší       │  Menší nebo stejné      │
└────────────────────────────────────────┘
```

**Pravidla:**
- CSK logo má prioritu (vlevo nebo nahoře)
- Disciplínové logo může být menší nebo stejně velké
- Zachovat mezeru minimálně 16px
- Používat konzistentní styl (oba plnobarevné nebo oba inverzní)

### 7.2 S partnerskými logy

```
┌────────────────────────────────────────┐
│  [CSK Logo]                            │
│                                        │
│  ─────────── (separator) ───────────   │
│                                        │
│  [Partner 1]  [Partner 2]  [Partner 3] │
└────────────────────────────────────────┘
```

**Pravidla:**
- CSK logo vždy prominence (nahoře nebo vlevo)
- Vizuální separátor mezi CSK a partnery
- Partnerská loga menší nebo stejná velikost
- Zachovat ochranné zóny všech log

---

## 8. Soubory a formáty

### 8.1 Doporučená struktura

```
/assets/
├── csk-logo.svg              # Plnobarevné, primární
├── csk-logo-white.svg        # Inverzní pro tmavá pozadí
├── csk-logo-mono.svg         # Monochromatické
├── csk-symbol.svg            # Pouze symbol (bez textu)
├── csk-symbol-white.svg      # Symbol inverzní
├── csk-favicon.svg           # Pro favicon
└── csk-favicon.ico           # Fallback ICO
```

### 8.2 Export specifikace

| Formát | Použití | Velikost |
|--------|---------|----------|
| SVG | Primární (web) | Optimalizované |
| PNG @1x | Fallback | 240×80px |
| PNG @2x | Retina | 480×160px |
| ICO | Favicon | 32×32, 16×16 |
| WEBP | Optimalizace | Podle potřeby |

---

## 9. Implementace v React

### 9.1 Logo komponenta

```tsx
// src/components/Logo/Logo.tsx
import React from 'react';
import './Logo.css';

export type LogoVariant = 'full' | 'symbol' | 'white' | 'mono';
export type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  animated?: boolean;
}

const sizeMap: Record<LogoSize, number> = {
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48,
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  animated = false,
}) => {
  const height = sizeMap[size];
  const src = `/assets/csk-logo${variant !== 'full' ? `-${variant}` : ''}.svg`;

  return (
    <img
      src={src}
      alt="Český svaz kanoistiky"
      height={height}
      className={`csk-logo csk-logo--${variant} csk-logo--${size} ${animated ? 'csk-logo--animated' : ''} ${className}`}
    />
  );
};
```

### 9.2 Použití

```tsx
// V Header
<Header.Logo>
  <Logo size="lg" />
</Header.Logo>

// Na tmavém pozadí
<Hero variant="dark">
  <Logo variant="white" size="xl" animated />
</Hero>

// V kartě
<Card.Header>
  <Logo variant="symbol" size="sm" />
</Card.Header>
```

---

## 10. Checklist pro implementaci

Před nasazením ověřte:

- [ ] Logo má dostatečnou ochrannou zónu
- [ ] Kontrast splňuje WCAG 2.1 AA (min. 3:1 pro grafiku)
- [ ] Na tmavém pozadí je použita inverzní varianta
- [ ] Na fotografiích je logo čitelné (případně s drop-shadow)
- [ ] Responsive breakpointy fungují správně
- [ ] Alt text je přítomný a správný
- [ ] Animace respektují prefers-reduced-motion
- [ ] SVG je optimalizované (SVGO)
- [ ] Favicon je nastavený správně

---

*Tento dokument je součástí CSK RVP Design System. Pro vizuální referenci viz Storybook.*
