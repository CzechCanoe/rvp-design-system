# Design Principles - CSK RVP Design System

Základní principy a standardy pro vizuální a technický design systému registračního a výsledkového servisu Českého svazu kanoistů.

---

## 1. Mobile-First strategie

### 1.1 Přístup

Design systém je navržen **mobile-first** - komponenty jsou primárně optimalizovány pro mobilní zařízení a následně rozšířeny pro větší obrazovky.

### 1.2 Breakpointy

```css
/* Mobile-first breakpoints */
--breakpoint-sm: 576px;   /* Small devices (landscape phones) */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Desktops */
--breakpoint-xl: 1280px;  /* Large desktops */
--breakpoint-2xl: 1536px; /* Extra large screens */
```

### 1.3 Pravidla

| Pravidlo | Popis |
|----------|-------|
| **Touch targets** | Minimálně 44×44px pro interaktivní prvky |
| **Font size** | Minimálně 16px pro body text (zabránění zoom na iOS) |
| **Spacing** | Dostatečné mezery mezi prvky pro touch interakci |
| **Content priority** | Nejdůležitější obsah nahoře |
| **Progressive enhancement** | Základní funkcionalita bez JS |

### 1.4 Responsive patterns

```
Mobile (< 576px):
├── Single column layout
├── Stacked navigation (hamburger)
├── Full-width buttons
└── Collapsed tables (cards)

Tablet (768px - 1024px):
├── Two column layout
├── Hybrid navigation
├── Side-by-side forms
└── Responsive tables

Desktop (> 1024px):
├── Multi-column layout
├── Full horizontal navigation
├── Complex dashboards
└── Full-featured tables
```

---

## 2. Přístupnost (WCAG 2.1 AA)

### 2.1 Závazek

Design systém splňuje **WCAG 2.1 Level AA** standardy. Každá komponenta musí projít accessibility auditem před release.

### 2.2 Kontrastní poměry

| Typ obsahu | Minimální kontrast |
|------------|-------------------|
| **Běžný text** | 4.5:1 |
| **Velký text** (24px+ / 18.66px+ bold) | 3:1 |
| **UI komponenty a grafika** | 3:1 |
| **Deaktivované prvky** | Výjimka (není požadován) |

### 2.3 Barevné požadavky

```
1. Barva NIKDY není jediným indikátorem:
   ✗ Červený text pro chybu
   ✓ Červený text + ikona + border pro chybu

2. Každý stav má textovou alternativu:
   ✗ Zelené kolečko = aktivní
   ✓ Zelené kolečko s popiskem "Aktivní"

3. Focus states jsou viditelné:
   - Outline minimálně 2px
   - Kontrast vůči pozadí 3:1
```

### 2.4 Klávesová navigace

| Požadavek | Implementace |
|-----------|--------------|
| **Tab order** | Logické pořadí odpovídající vizuálnímu |
| **Focus trap** | V modálech a dropdown menu |
| **Skip links** | Pro přeskočení navigace |
| **Escape** | Zavře modály, dropdown, popovery |
| **Arrow keys** | Navigace v menu, tabs, select |

### 2.5 ARIA standardy

```jsx
// Povinné atributy pro interaktivní komponenty
<button aria-label="Zavřít dialog">×</button>
<input aria-invalid="true" aria-describedby="error-msg" />
<div role="alert" aria-live="polite">Změny uloženy</div>
```

### 2.6 Screen reader podpora

- Všechny obrázky mají `alt` text
- Ikony mají `aria-label` nebo jsou `aria-hidden`
- Tabulky používají `<th scope="col/row">`
- Formuláře mají asociované `<label>`

---

## 3. Dual Personality

Design systém rozlišuje dva režimy použití s odlišným vizuálním stylem.

### 3.1 Utilitární režim (Backoffice)

**Použití:** Registrace, správa členství, přihlašování na závody, administrace

**Charakteristiky:**
| Aspekt | Hodnota |
|--------|---------|
| **Hustota** | Kompaktní (condensed spacing) |
| **Barvy** | Převážně neutrální, minimální akcenty |
| **Animace** | Subtilní, rychlé (150ms) |
| **Typografie** | Funkční, menší velikosti |
| **Ikony** | Outline, monochromatické |
| **Cíl** | Efektivita, produktivita |

```css
/* Utilitární spacing scale */
--spacing-util-xs: 4px;
--spacing-util-sm: 8px;
--spacing-util-md: 12px;
--spacing-util-lg: 16px;
--spacing-util-xl: 24px;
```

### 3.2 Expresivní režim (Public)

**Použití:** Profily závodníků, výsledky, live timing, veřejné stránky

**Charakteristiky:**
| Aspekt | Hodnota |
|--------|---------|
| **Hustota** | Vzdušný (generous spacing) |
| **Barvy** | Živé, disciplínové akcenty |
| **Animace** | Výraznější, delší (300ms) |
| **Typografie** | Dramatická, větší nadpisy |
| **Ikony** | Filled, barevné |
| **Cíl** | Engagement, wow efekt |

```css
/* Expresivní spacing scale */
--spacing-expr-xs: 8px;
--spacing-expr-sm: 16px;
--spacing-expr-md: 24px;
--spacing-expr-lg: 32px;
--spacing-expr-xl: 48px;
```

### 3.3 Přepínání mezi režimy

```jsx
// Context-based theming
<ThemeProvider mode="utility">
  <AdminDashboard />
</ThemeProvider>

<ThemeProvider mode="expressive">
  <AthleteProfile />
</ThemeProvider>
```

---

## 4. Dark/Light Mode strategie

### 4.1 Přístup

Design systém podporuje **system preference** s možností manuálního přepnutí. Dark mode je first-class citizen, ne dodatečná úprava.

### 4.2 Implementace

```css
/* CSS Variables pro dynamické přepínání */
:root {
  color-scheme: light dark;
}

/* Light theme (default) */
:root, [data-theme="light"] {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f5f5f5;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #666666;
  --color-border: #e0e0e0;
}

/* Dark theme */
[data-theme="dark"] {
  --color-bg-primary: #121212;
  --color-bg-secondary: #1e1e1e;
  --color-text-primary: #f5f5f5;
  --color-text-secondary: #a0a0a0;
  --color-border: #333333;
}

/* System preference detection */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* Dark theme variables */
  }
}
```

### 4.3 Pravidla pro dark mode

| Pravidlo | Popis |
|----------|-------|
| **Elevace místo stínů** | Světlejší plochy = vyšší elevace |
| **Desaturované barvy** | Primární barvy jsou méně saturované |
| **Zachovaný kontrast** | Stejné WCAG požadavky jako light mode |
| **Obrázky** | Snížená opacity nebo tmavší overlay |
| **Bílý text na tmavém** | Max 87% opacity pro komfort |

### 4.4 Barevné úpravy pro dark mode

```css
/* Light mode */
--color-primary: #1176a6;      /* Brand blue */
--color-success: #22c55e;
--color-warning: #f59e0b;
--color-error: #ef4444;

/* Dark mode - desaturated */
--color-primary: #4da3cc;      /* Lighter, less saturated */
--color-success: #4ade80;
--color-warning: #fbbf24;
--color-error: #f87171;
```

### 4.5 Toggle komponenta

```jsx
// Theme toggle s persistencí
function ThemeToggle() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') || 'system'
  );

  // Options: 'light' | 'dark' | 'system'
}
```

---

## 5. Typografie

### 5.1 Výběr fontů

Na základě výzkumu sportovních federací a českých svazů:

| Role | Font | Zdůvodnění |
|------|------|------------|
| **Nadpisy** | Inter | Moderní, čitelný, skvělá čeština, sportovní feel |
| **Body text** | Inter | Konzistentní systém, výborná čitelnost |
| **Monospace** | JetBrains Mono | Pro časy, výsledky, kód |

**Poznámka:** Inter místo původně zvažovaného Poppins - Inter má lepší podporu českých znaků, užší řez (efektivnější pro data-heavy UI) a je designován pro obrazovky.

### 5.2 Typografická škála

```css
/* Base: 16px = 1rem */
--font-size-xs: 0.75rem;    /* 12px - captions, labels */
--font-size-sm: 0.875rem;   /* 14px - secondary text */
--font-size-base: 1rem;     /* 16px - body text */
--font-size-lg: 1.125rem;   /* 18px - lead text */
--font-size-xl: 1.25rem;    /* 20px - h5 */
--font-size-2xl: 1.5rem;    /* 24px - h4 */
--font-size-3xl: 1.875rem;  /* 30px - h3 */
--font-size-4xl: 2.25rem;   /* 36px - h2 */
--font-size-5xl: 3rem;      /* 48px - h1 */
--font-size-6xl: 3.75rem;   /* 60px - display */
```

### 5.3 Font weights

```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### 5.4 Line heights

```css
--line-height-tight: 1.25;    /* Nadpisy */
--line-height-snug: 1.375;    /* Kompaktní text */
--line-height-normal: 1.5;    /* Body text */
--line-height-relaxed: 1.625; /* Dlouhý text */
```

### 5.5 Hierarchie

| Element | Size | Weight | Line-height | Tracking |
|---------|------|--------|-------------|----------|
| **Display** | 60px | 700 | 1.1 | -0.02em |
| **H1** | 48px | 700 | 1.2 | -0.01em |
| **H2** | 36px | 600 | 1.25 | 0 |
| **H3** | 30px | 600 | 1.3 | 0 |
| **H4** | 24px | 600 | 1.35 | 0 |
| **H5** | 20px | 500 | 1.4 | 0 |
| **Body** | 16px | 400 | 1.5 | 0 |
| **Small** | 14px | 400 | 1.5 | 0 |
| **Caption** | 12px | 400 | 1.4 | 0.01em |

---

## 6. Barevný systém

### 6.1 Primární paleta

```css
/* Brand colors - zachovaná kontinuita s kanoe.cz */
--color-primary-50: #e6f4f9;
--color-primary-100: #cce9f3;
--color-primary-200: #99d3e7;
--color-primary-300: #66bddb;
--color-primary-400: #33a7cf;
--color-primary-500: #1176a6;  /* Hlavní brand barva */
--color-primary-600: #0e5e85;
--color-primary-700: #0b4664;
--color-primary-800: #072f43;
--color-primary-900: #041721;
```

### 6.2 Neutrální škála

```css
--color-neutral-0: #ffffff;
--color-neutral-50: #fafafa;
--color-neutral-100: #f5f5f5;
--color-neutral-200: #e5e5e5;
--color-neutral-300: #d4d4d4;
--color-neutral-400: #a3a3a3;
--color-neutral-500: #737373;
--color-neutral-600: #525252;
--color-neutral-700: #404040;
--color-neutral-800: #262626;
--color-neutral-900: #171717;
--color-neutral-950: #0a0a0a;
```

### 6.3 Sémantické barvy

```css
/* Success */
--color-success-light: #dcfce7;
--color-success: #22c55e;
--color-success-dark: #16a34a;

/* Warning */
--color-warning-light: #fef3c7;
--color-warning: #f59e0b;
--color-warning-dark: #d97706;

/* Error */
--color-error-light: #fee2e2;
--color-error: #ef4444;
--color-error-dark: #dc2626;

/* Info */
--color-info-light: #dbeafe;
--color-info: #3b82f6;
--color-info-dark: #2563eb;
```

### 6.4 Disciplínové barvy

```css
/* Sekce ČSK */
--color-section-dv: #2563eb;   /* Divoká voda - modrá */
--color-section-ry: #16a34a;   /* Rychlostní - zelená */
--color-section-vt: #dc2626;   /* Vodní turistika - červená */

/* VT třídy */
--color-vt-m: #7c3aed;         /* Mistr - fialová */
--color-vt-a: #dc2626;         /* Třída A - červená */
--color-vt-b: #f59e0b;         /* Třída B - oranžová */
--color-vt-c: #22c55e;         /* Třída C - zelená */
```

### 6.5 Použití barev

| Účel | Light mode | Dark mode |
|------|------------|-----------|
| **Background** | neutral-0 | neutral-900 |
| **Surface** | neutral-50 | neutral-800 |
| **Surface elevated** | neutral-0 | neutral-700 |
| **Text primary** | neutral-900 | neutral-50 |
| **Text secondary** | neutral-600 | neutral-400 |
| **Border** | neutral-200 | neutral-700 |
| **Border strong** | neutral-300 | neutral-600 |

---

## 7. Spacing systém

### 7.1 Základní škála (4px base)

```css
--spacing-0: 0;
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 20px;
--spacing-6: 24px;
--spacing-8: 32px;
--spacing-10: 40px;
--spacing-12: 48px;
--spacing-16: 64px;
--spacing-20: 80px;
--spacing-24: 96px;
```

### 7.2 Sémantické názvy

```css
/* Component spacing */
--spacing-component-xs: var(--spacing-1);   /* 4px */
--spacing-component-sm: var(--spacing-2);   /* 8px */
--spacing-component-md: var(--spacing-4);   /* 16px */
--spacing-component-lg: var(--spacing-6);   /* 24px */
--spacing-component-xl: var(--spacing-8);   /* 32px */

/* Layout spacing */
--spacing-section-sm: var(--spacing-8);     /* 32px */
--spacing-section-md: var(--spacing-12);    /* 48px */
--spacing-section-lg: var(--spacing-16);    /* 64px */
--spacing-section-xl: var(--spacing-24);    /* 96px */
```

---

## 8. Další tokeny

### 8.1 Border radius

```css
--radius-none: 0;
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

### 8.2 Shadows

```css
/* Light mode shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);

/* Dark mode - elevation via lighter backgrounds instead */
```

### 8.3 Transitions

```css
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
--transition-slower: 500ms ease;
```

### 8.4 Z-index škála

```css
--z-base: 0;
--z-dropdown: 100;
--z-sticky: 200;
--z-fixed: 300;
--z-modal-backdrop: 400;
--z-modal: 500;
--z-popover: 600;
--z-tooltip: 700;
--z-toast: 800;
```

---

## 9. Ikony

### 9.1 Doporučený systém

**Lucide Icons** - open-source, konzistentní, dobrá podpora React.

```jsx
import { Calendar, User, Trophy } from 'lucide-react';
```

### 9.2 Pravidla

| Pravidlo | Hodnota |
|----------|---------|
| **Výchozí velikost** | 24px |
| **Stroke width** | 1.5px (utilitární) / 2px (expresivní) |
| **Touch target** | Min 44px |
| **Barva** | currentColor (dědí z textu) |

---

## 10. Motion principy

### 10.1 Účel animací

1. **Feedback** - potvrzení akce uživatele
2. **Orientace** - kam se obsah přesouvá
3. **Engagement** - přitáhnutí pozornosti (expresivní režim)

### 10.2 Timing

```css
/* Utilitární režim - rychlé, subtilní */
--motion-util-fast: 100ms;
--motion-util-base: 150ms;
--motion-util-slow: 200ms;

/* Expresivní režim - výraznější */
--motion-expr-fast: 150ms;
--motion-expr-base: 250ms;
--motion-expr-slow: 400ms;
```

### 10.3 Respektování preferencí

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Shrnutí

| Princip | Klíčové body |
|---------|--------------|
| **Mobile-first** | 44px touch targets, 16px min font, single-column base |
| **WCAG 2.1 AA** | 4.5:1 kontrast, keyboard nav, ARIA |
| **Dual personality** | Utilitární (kompaktní) vs. Expresivní (vzdušný) |
| **Dark mode** | System preference, CSS variables, elevation model |
| **Typografie** | Inter jako primární font, 16px base, 4px vertical rhythm |
| **Barvy** | #1176a6 primární, disciplínové kódování, sémantické stavy |

---

*Tento dokument je živý standard. Aktualizace probíhají na základě testování a feedbacku.*
