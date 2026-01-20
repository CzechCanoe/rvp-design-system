# Fotografické overlay styly

Pravidla pro práci s fotografiemi v CSK design systému - overlay efekty, text na fotografiích, hero sekce s pozadím.

---

## 1. Typy overlay

### 1.1 Přehled

| Typ | Účel | Opacity | Kontrast textu |
|-----|------|---------|---------------|
| **Solid dark** | Čitelnost textu | 50-70% | Bílý text |
| **Gradient fade** | Přechod k obsahu | 30-60% | Bílý text |
| **Brand tint** | Barevná identita | 40-60% | Bílý text |
| **Duotone** | Stylizace | 100% | Dle světlosti |
| **Glassmorphism** | Moderní feel | 20-40% | Závisí na pozadí |

---

## 2. Solid overlay

### 2.1 Tmavý overlay (primary)

```css
/* Standardní tmavý overlay */
.photo-overlay-dark {
  position: relative;
}

.photo-overlay-dark::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.photo-overlay-dark > * {
  position: relative;
  z-index: 2;
}

/* Varianty intenzity */
.photo-overlay-dark--light::before { background: rgba(0, 0, 0, 0.3); }
.photo-overlay-dark--medium::before { background: rgba(0, 0, 0, 0.5); }
.photo-overlay-dark--heavy::before { background: rgba(0, 0, 0, 0.7); }
```

### 2.2 Světlý overlay

```css
/* Pro tmavé fotografie kde potřebujeme tmavý text */
.photo-overlay-light {
  position: relative;
}

.photo-overlay-light::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.85);
  z-index: 1;
}

.photo-overlay-light--subtle::before { background: rgba(255, 255, 255, 0.7); }
.photo-overlay-light--medium::before { background: rgba(255, 255, 255, 0.85); }
.photo-overlay-light--heavy::before { background: rgba(255, 255, 255, 0.95); }
```

---

## 3. Gradient overlay

### 3.1 Vertikální gradient (bottom fade)

```css
/* Tmavý gradient zespodu - pro hero s textem dole */
.photo-gradient-bottom {
  position: relative;
}

.photo-gradient-bottom::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 40%,
    transparent 100%
  );
  z-index: 1;
}

/* Mírnější verze */
.photo-gradient-bottom--soft::before {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.2) 30%,
    transparent 60%
  );
}
```

### 3.2 Vertikální gradient (top fade)

```css
/* Pro hero s navigací nahoře */
.photo-gradient-top {
  position: relative;
}

.photo-gradient-top::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 30%,
    transparent 60%
  );
  z-index: 1;
}
```

### 3.3 Diagonální gradient

```css
/* Dynamický diagonální gradient */
.photo-gradient-diagonal {
  position: relative;
}

.photo-gradient-diagonal::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 40%,
    transparent 70%
  );
  z-index: 1;
}
```

### 3.4 Radiální gradient (spotlight)

```css
/* Spotlight efekt - pro athlete cards */
.photo-gradient-spotlight {
  position: relative;
}

.photo-gradient-spotlight::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    transparent 30%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: 1;
}
```

---

## 4. Brand tint overlay

### 4.1 Primary brand tint

```css
/* Modrý brand tint */
.photo-tint-primary {
  position: relative;
}

.photo-tint-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(17, 118, 166, 0.5); /* --color-primary-500 */
  mix-blend-mode: multiply;
  z-index: 1;
}

/* Jemnější verze */
.photo-tint-primary--soft::before {
  background: rgba(17, 118, 166, 0.3);
}
```

### 4.2 Disciplínové tinty

```css
/* Divoká voda - modrý tint */
.photo-tint-dv::before {
  background: rgba(37, 99, 235, 0.4);
  mix-blend-mode: multiply;
}

/* Rychlostní - zelený tint */
.photo-tint-ry::before {
  background: rgba(22, 163, 74, 0.4);
  mix-blend-mode: multiply;
}

/* Vodní turistika - červený tint */
.photo-tint-vt::before {
  background: rgba(220, 38, 38, 0.4);
  mix-blend-mode: multiply;
}
```

### 4.3 Gradient tint

```css
/* Brand gradient overlay */
.photo-tint-gradient {
  position: relative;
}

.photo-tint-gradient::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(17, 118, 166, 0.6) 0%,
    rgba(245, 158, 11, 0.4) 100%
  );
  mix-blend-mode: overlay;
  z-index: 1;
}
```

---

## 5. Duotone efekty

### 5.1 CSK Duotone

```css
/* Modrý duotone */
.photo-duotone-primary {
  position: relative;
  filter: grayscale(100%);
}

.photo-duotone-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    #1176a6 0%,
    #041721 100%
  );
  mix-blend-mode: screen;
  z-index: 1;
}
```

### 5.2 Disciplínové duotone

```css
/* DV - dynamický modrý */
.photo-duotone-dv {
  filter: grayscale(100%);
}
.photo-duotone-dv::before {
  background: linear-gradient(135deg, #60a5fa 0%, #1e3a8a 100%);
  mix-blend-mode: color;
}

/* RY - svěží zelený */
.photo-duotone-ry {
  filter: grayscale(100%);
}
.photo-duotone-ry::before {
  background: linear-gradient(135deg, #4ade80 0%, #14532d 100%);
  mix-blend-mode: color;
}

/* VT - energický červený */
.photo-duotone-vt {
  filter: grayscale(100%);
}
.photo-duotone-vt::before {
  background: linear-gradient(135deg, #f87171 0%, #7f1d1d 100%);
  mix-blend-mode: color;
}
```

---

## 6. Glassmorphism na fotografiích

### 6.1 Glass card na photo pozadí

```css
/* Content box na photo pozadí */
.photo-glass-content {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
}

/* Tmavší verze */
.photo-glass-content--dark {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### 6.2 Glass header na hero photo

```css
/* Navigace s blur efektem */
.photo-glass-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 7. Text na fotografiích

### 7.1 Pravidla čitelnosti

| Text barva | Min. kontrast | Overlay požadavek |
|------------|--------------|-------------------|
| Bílá | 4.5:1 | Min. 40% tmavý overlay |
| Černá | 4.5:1 | Min. 70% světlý overlay |

### 7.2 Text shadows pro čitelnost

```css
/* Text shadow pro nadpisy na fotografiích */
.photo-text-shadow {
  text-shadow:
    0 1px 3px rgba(0, 0, 0, 0.3),
    0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Silnější shadow pro menší text */
.photo-text-shadow--strong {
  text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.5),
    0 4px 16px rgba(0, 0, 0, 0.3);
}

/* Pro tmavé fotografie */
.photo-text-glow {
  text-shadow:
    0 0 20px rgba(255, 255, 255, 0.5),
    0 0 40px rgba(255, 255, 255, 0.3);
}
```

### 7.3 Background blur pro text

```css
/* Blur pozadí pod textem */
.photo-text-backdrop {
  display: inline-block;
  padding: var(--spacing-2) var(--spacing-4);
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  border-radius: var(--radius-sm);
}
```

---

## 8. Image treatments

### 8.1 Objektová pozice

```css
/* Pro athlete photos - zaměření na obličej */
.photo-focus-top {
  object-fit: cover;
  object-position: center top;
}

.photo-focus-center {
  object-fit: cover;
  object-position: center center;
}

/* Pro action photos */
.photo-focus-action {
  object-fit: cover;
  object-position: center 30%;
}
```

### 8.2 Aspect ratio containers

```css
/* Hero aspect ratios */
.photo-aspect-hero { aspect-ratio: 21 / 9; }
.photo-aspect-wide { aspect-ratio: 16 / 9; }
.photo-aspect-standard { aspect-ratio: 4 / 3; }
.photo-aspect-square { aspect-ratio: 1 / 1; }
.photo-aspect-portrait { aspect-ratio: 3 / 4; }

/* Responsive hero */
.photo-aspect-hero-responsive {
  aspect-ratio: 21 / 9;
}

@media (max-width: 768px) {
  .photo-aspect-hero-responsive {
    aspect-ratio: 16 / 9;
  }
}

@media (max-width: 480px) {
  .photo-aspect-hero-responsive {
    aspect-ratio: 4 / 3;
  }
}
```

### 8.3 Image filters

```css
/* Zvýšení kontrastu pro lepší overlay efekt */
.photo-enhance {
  filter: contrast(1.05) brightness(0.95);
}

/* Desaturace pro brand tint */
.photo-desaturate {
  filter: saturate(0.7);
}

/* Pro hover efekty */
.photo-hover-enhance {
  transition: filter var(--transition-base);
}

.photo-hover-enhance:hover {
  filter: brightness(1.1) contrast(1.05);
}
```

---

## 9. React komponenty

### 9.1 PhotoOverlay komponenta

```tsx
// src/components/PhotoOverlay/PhotoOverlay.tsx
import React from 'react';
import './PhotoOverlay.css';

export type OverlayType =
  | 'dark'
  | 'light'
  | 'gradient-bottom'
  | 'gradient-top'
  | 'gradient-diagonal'
  | 'tint-primary'
  | 'tint-dv'
  | 'tint-ry'
  | 'tint-vt'
  | 'duotone-primary';

export type OverlayIntensity = 'light' | 'medium' | 'heavy';

interface PhotoOverlayProps {
  src: string;
  alt: string;
  overlay?: OverlayType;
  intensity?: OverlayIntensity;
  aspectRatio?: 'hero' | 'wide' | 'standard' | 'square' | 'portrait';
  className?: string;
  children?: React.ReactNode;
}

export const PhotoOverlay: React.FC<PhotoOverlayProps> = ({
  src,
  alt,
  overlay = 'dark',
  intensity = 'medium',
  aspectRatio = 'wide',
  className = '',
  children,
}) => {
  return (
    <div
      className={`
        photo-overlay
        photo-overlay--${overlay}
        photo-overlay--${overlay}--${intensity}
        photo-aspect-${aspectRatio}
        ${className}
      `}
    >
      <img src={src} alt={alt} className="photo-overlay__image" />
      <div className="photo-overlay__content">
        {children}
      </div>
    </div>
  );
};
```

### 9.2 Použití

```tsx
// Hero s gradient overlay
<PhotoOverlay
  src="/images/race-action.jpg"
  alt="Závodník ve slalomu"
  overlay="gradient-bottom"
  aspectRatio="hero"
>
  <h1 className="photo-text-shadow">Mistrovství ČR 2024</h1>
  <p>Trojany, 15.-17. srpna</p>
</PhotoOverlay>

// Athlete card s duotone
<PhotoOverlay
  src={athlete.photo}
  alt={athlete.name}
  overlay="duotone-dv"
  aspectRatio="portrait"
>
  <div className="photo-glass-content">
    <h2>{athlete.name}</h2>
  </div>
</PhotoOverlay>

// Disciplínový hero
<PhotoOverlay
  src="/images/sprint-race.jpg"
  alt="Rychlostní kanoistika"
  overlay="tint-ry"
  intensity="light"
  aspectRatio="wide"
>
  <Logo variant="white" size="lg" />
  <h1>Rychlostní kanoistika</h1>
</PhotoOverlay>
```

---

## 10. CSS tokeny

Do `src/tokens/overlays.css`:

```css
:root {
  /* Overlay opacities */
  --overlay-light: 0.3;
  --overlay-medium: 0.5;
  --overlay-heavy: 0.7;

  /* Text shadows for photos */
  --text-shadow-photo: 0 1px 3px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2);
  --text-shadow-photo-strong: 0 2px 4px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.3);

  /* Glass on photo */
  --glass-photo-light: rgba(255, 255, 255, 0.15);
  --glass-photo-dark: rgba(0, 0, 0, 0.3);

  /* Overlay blur */
  --overlay-blur-subtle: 8px;
  --overlay-blur-medium: 16px;
  --overlay-blur-strong: 24px;
}
```

---

## 11. Accessibility checklist

- [ ] Text má dostatečný kontrast (4.5:1 pro normální, 3:1 pro velký)
- [ ] Overlay není jediným zdrojem informace
- [ ] Alternativní text pro obrázky
- [ ] Focus states jsou viditelné i na fotografiích
- [ ] Reduced motion respektuje animované overlays
- [ ] Fallback pro backdrop-filter

```css
/* Fallback pro backdrop-filter */
@supports not (backdrop-filter: blur(16px)) {
  .photo-glass-content {
    background: rgba(0, 0, 0, 0.7);
  }
}
```

---

## 12. Performance doporučení

1. **Lazy loading** - Použít `loading="lazy"` pro off-screen obrázky
2. **Responsive images** - Použít `srcset` pro různé velikosti
3. **Optimalizace** - WebP formát s JPEG fallback
4. **CDN** - Servírovat obrázky z CDN
5. **Placeholder** - Low-quality placeholder během načítání

```html
<img
  src="image-800.webp"
  srcset="
    image-400.webp 400w,
    image-800.webp 800w,
    image-1200.webp 1200w
  "
  sizes="(max-width: 600px) 100vw, 800px"
  loading="lazy"
  alt="Popis"
/>
```

---

*Tento dokument je součástí CSK RVP Design System branded elements.*
