# Vodní a sportovní vizuální prvky

Dekorativní prvky, vzory a pozadí pro vytvoření autentického vodáckého/sportovního vizuálu v CSK design systému.

---

## 1. Vodní vlny (Wave patterns)

### 1.1 Typy vln

| Typ | Použití | Charakter |
|-----|---------|-----------|
| **Subtle wave** | Separátory, pozadí | Jemná, 1 vlna |
| **Dynamic wave** | Hero sekce | Dramatická, 2-3 vlny |
| **Layered waves** | Fullscreen pozadí | Vícevrstvé, parallax |
| **Micro ripple** | Dekorace karet | Velmi jemné vlnění |

### 1.2 SVG Wave - Subtle

```svg
<!-- wave-subtle.svg - pro sekce separátory -->
<svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
  <path
    d="M0 50C240 20 480 80 720 50C960 20 1200 80 1440 50V100H0V50Z"
    fill="currentColor"
  />
</svg>
```

### 1.3 SVG Wave - Dynamic

```svg
<!-- wave-dynamic.svg - pro hero sekce -->
<svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
  <!-- Zadní vrstva (světlejší) -->
  <path
    d="M0 100C360 50 720 150 1080 100C1260 75 1440 100 1440 100V200H0V100Z"
    fill="currentColor"
    fill-opacity="0.3"
  />
  <!-- Střední vrstva -->
  <path
    d="M0 120C288 80 576 160 864 120C1152 80 1440 120 1440 120V200H0V120Z"
    fill="currentColor"
    fill-opacity="0.5"
  />
  <!-- Přední vrstva (plná) -->
  <path
    d="M0 140C240 100 480 180 720 140C960 100 1200 160 1440 140V200H0V140Z"
    fill="currentColor"
  />
</svg>
```

### 1.4 CSS implementace

```css
/* Wave separator */
.wave-separator {
  width: 100%;
  height: 60px;
  background: url('/assets/patterns/wave-subtle.svg') no-repeat center;
  background-size: 100% 100%;
  color: var(--color-bg-secondary);
}

.wave-separator--primary {
  color: var(--color-primary-500);
}

.wave-separator--flip {
  transform: scaleY(-1);
}

/* Hero wave background */
.hero-wave-bg {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: url('/assets/patterns/wave-dynamic.svg') no-repeat bottom center;
  background-size: 100% auto;
  color: var(--color-bg-primary);
  pointer-events: none;
}

/* Animated wave */
@keyframes waveMove {
  0% { transform: translateX(0); }
  50% { transform: translateX(-25px); }
  100% { transform: translateX(0); }
}

.wave-animated {
  animation: waveMove 6s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .wave-animated {
    animation: none;
  }
}
```

---

## 2. Vodní kruhy (Ripple effects)

### 2.1 Statické ripple pozadí

```css
/* Ripple pattern - pro pozadí sekcí */
.ripple-pattern {
  background-image:
    radial-gradient(
      circle at 20% 80%,
      var(--color-primary-100) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      var(--color-primary-50) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 50% 50%,
      var(--color-primary-100) 0%,
      transparent 30%
    );
}

/* Jemnější verze pro karty */
.ripple-subtle {
  background:
    radial-gradient(
      circle at 100% 100%,
      var(--color-primary-50) 0%,
      transparent 50%
    );
}
```

### 2.2 Animované ripple (pro interakce)

```css
/* Click ripple efekt */
.ripple-click {
  position: relative;
  overflow: hidden;
}

.ripple-click::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: var(--color-primary-200);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: width 0.6s, height 0.6s, opacity 0.6s;
}

.ripple-click:active::after {
  width: 200%;
  height: 200%;
  opacity: 0.3;
}
```

---

## 3. Dynamické tvary (Motion shapes)

### 3.1 Pádlo / veslo motiv

```svg
<!-- paddle-accent.svg - dekorativní prvek -->
<svg viewBox="0 0 100 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Stylizované pádlo -->
  <ellipse cx="50" cy="50" rx="30" ry="45" fill="currentColor" fill-opacity="0.1"/>
  <rect x="45" y="90" width="10" height="180" rx="5" fill="currentColor" fill-opacity="0.1"/>
</svg>
```

### 3.2 Speed lines

```css
/* Speed lines - pro live/racing sekce */
.speed-lines {
  background:
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 10px,
      var(--color-primary-100) 10px,
      var(--color-primary-100) 11px
    );
}

/* Animované speed lines */
@keyframes speedMove {
  0% { background-position: 0 0; }
  100% { background-position: 30px 30px; }
}

.speed-lines--animated {
  animation: speedMove 1s linear infinite;
}
```

### 3.3 Curved motion paths

```css
/* Curved accent - pro hero sekce */
.curved-accent {
  position: absolute;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(
      ellipse 80% 50% at 0% 100%,
      var(--color-primary-500) 0%,
      transparent 50%
    );
  opacity: 0.1;
  pointer-events: none;
}

/* Alternativní verze */
.curved-accent--right {
  background:
    radial-gradient(
      ellipse 80% 50% at 100% 0%,
      var(--color-accent-500) 0%,
      transparent 50%
    );
}
```

---

## 4. Hero patterns / backgrounds

### 4.1 Gradient hero

```css
/* Základní hero gradient */
.hero-gradient {
  background: var(--gradient-hero-primary);
  color: var(--color-text-inverse);
}

/* Hero s wave overlay */
.hero-gradient-wave {
  background:
    url('/assets/patterns/wave-subtle.svg') no-repeat bottom center,
    var(--gradient-hero-primary);
  background-size: 100% 80px, 100% 100%;
}

/* Hero s vodním vzorem */
.hero-water-pattern {
  background:
    radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255,255,255,0.05) 0%, transparent 40%),
    var(--gradient-hero-primary);
}
```

### 4.2 Dot pattern hero

```css
/* Tečkovaný vzor - pro sportovní sekce */
.hero-dots {
  background-color: var(--color-primary-600);
  background-image:
    radial-gradient(
      circle,
      rgba(255,255,255,0.1) 1px,
      transparent 1px
    );
  background-size: 24px 24px;
}

/* Hustší verze */
.hero-dots--dense {
  background-size: 16px 16px;
}
```

### 4.3 Mesh gradient hero

```css
/* Moderní mesh gradient */
.hero-mesh {
  background-color: var(--color-primary-700);
  background-image:
    radial-gradient(at 40% 20%, var(--color-primary-400) 0px, transparent 50%),
    radial-gradient(at 80% 0%, var(--color-accent-400) 0px, transparent 50%),
    radial-gradient(at 0% 50%, var(--color-primary-600) 0px, transparent 50%),
    radial-gradient(at 80% 50%, var(--color-primary-500) 0px, transparent 50%),
    radial-gradient(at 0% 100%, var(--color-primary-800) 0px, transparent 50%),
    radial-gradient(at 80% 100%, var(--color-accent-600) 0px, transparent 50%);
}
```

### 4.4 Disciplínové hero gradienty

```css
/* Divoká voda - dynamický modrý */
.hero-dv {
  background: linear-gradient(
    135deg,
    #1e40af 0%,
    #2563eb 30%,
    #3b82f6 60%,
    #60a5fa 100%
  );
}

/* Rychlostní - čistý zelený */
.hero-ry {
  background: linear-gradient(
    135deg,
    #14532d 0%,
    #166534 30%,
    #22c55e 70%,
    #4ade80 100%
  );
}

/* Vodní turistika - teplý červený */
.hero-vt {
  background: linear-gradient(
    135deg,
    #7f1d1d 0%,
    #b91c1c 30%,
    #ef4444 70%,
    #f87171 100%
  );
}
```

---

## 5. Glassmorphism prvky

### 5.1 Glass card

```css
/* Glassmorphism karta */
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-glass);
}

/* Dark mode glass */
[data-theme="dark"] .glass-card {
  background: rgba(23, 23, 23, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Glass na tmavém pozadí (hero) */
.glass-on-dark {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### 5.2 Glass badge

```css
.badge-glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}
```

---

## 6. Dekorativní accent tvary

### 6.1 Corner accent

```css
/* Rohový dekorativní prvek */
.corner-accent {
  position: relative;
}

.corner-accent::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: linear-gradient(
    135deg,
    transparent 50%,
    var(--color-primary-100) 50%
  );
  border-radius: 0 var(--radius-lg) 0 0;
}
```

### 6.2 Diagonal stripe

```css
/* Diagonální pruh - pro cards */
.diagonal-stripe {
  position: relative;
  overflow: hidden;
}

.diagonal-stripe::before {
  content: '';
  position: absolute;
  top: 0;
  left: -50%;
  width: 200%;
  height: 4px;
  background: var(--gradient-primary);
  transform: rotate(-3deg);
}
```

### 6.3 Bottom accent bar

```css
/* Spodní barevný pruh */
.bottom-accent {
  position: relative;
}

.bottom-accent::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-primary);
  border-radius: 0 0 var(--radius-md) var(--radius-md);
}

/* Disciplínové varianty */
.bottom-accent--dv::after { background: var(--gradient-section-dv); }
.bottom-accent--ry::after { background: var(--gradient-section-ry); }
.bottom-accent--vt::after { background: var(--gradient-section-vt); }
```

---

## 7. CSS tokeny pro vzory

Do `src/tokens/patterns.css`:

```css
:root {
  /* Wave heights */
  --pattern-wave-sm: 40px;
  --pattern-wave-md: 80px;
  --pattern-wave-lg: 120px;
  --pattern-wave-xl: 200px;

  /* Dot sizes */
  --pattern-dot-sm: 12px;
  --pattern-dot-md: 24px;
  --pattern-dot-lg: 32px;

  /* Glass blur */
  --blur-glass-subtle: 8px;
  --blur-glass-medium: 12px;
  --blur-glass-strong: 20px;

  /* Glass backgrounds */
  --glass-light: rgba(255, 255, 255, 0.7);
  --glass-medium: rgba(255, 255, 255, 0.5);
  --glass-dark: rgba(0, 0, 0, 0.3);

  /* Pattern opacity */
  --pattern-opacity-subtle: 0.05;
  --pattern-opacity-medium: 0.1;
  --pattern-opacity-strong: 0.2;
}
```

---

## 8. Použití v komponentách

### 8.1 Hero komponenta

```tsx
<Hero
  variant="gradient"
  pattern="wave"
  discipline="dv"
>
  <Hero.Content>
    <h1>Mistrovství ČR ve slalomu</h1>
  </Hero.Content>
</Hero>
```

### 8.2 Section separator

```tsx
<SectionSeparator variant="wave" color="primary" />

// nebo jako CSS class
<div className="wave-separator wave-separator--primary" />
```

### 8.3 Card s dekorací

```tsx
<Card
  variant="glass"
  accent="bottom"
  accentColor="dv"
>
  <Card.Content>...</Card.Content>
</Card>
```

---

## 9. Performance doporučení

1. **SVG před rastrovou grafikou** - Menší soubory, škálovatelnost
2. **CSS gradienty před obrázky** - Rychlejší rendering
3. **Backdrop-filter opatrně** - Může zpomalovat na mobilech
4. **Animace na GPU** - Používat transform, opacity
5. **Reduced motion respekt** - Vždy mít fallback

```css
@media (prefers-reduced-motion: reduce) {
  .wave-animated,
  .speed-lines--animated {
    animation: none;
  }
}

/* Fallback pro backdrop-filter */
@supports not (backdrop-filter: blur(12px)) {
  .glass-card {
    background: rgba(255, 255, 255, 0.95);
  }
}
```

---

## 10. Checklist

- [ ] Wave SVG soubory jsou v `/assets/patterns/`
- [ ] CSS tokeny pro patterns jsou v `tokens/patterns.css`
- [ ] Všechny animace respektují `prefers-reduced-motion`
- [ ] Backdrop-filter má fallback
- [ ] Hero varianty pro všechny disciplíny
- [ ] Glass efekty fungují v light i dark mode
- [ ] Performance testováno na mobilech

---

*Tento dokument je součástí CSK RVP Design System branded elements.*
