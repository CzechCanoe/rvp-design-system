# RVP Design System

Design systém pro registrační a výsledkový servis Českého svazu kanoistů (ČSK).

Knihovna React komponent a design tokenů pro sjednocení vizuální identity veřejných a komunitních webových aplikací ČSK.

## Quick Start

### Instalace

```bash
npm install @czechcanoe/rvp-design-system
```

### Použití

```tsx
// Import komponent
import { Button, Card, Badge } from '@czechcanoe/rvp-design-system';

// Import stylů (nutné!)
import '@czechcanoe/rvp-design-system/styles';

function App() {
  return (
    <Card variant="elevated">
      <Badge section="dv">Divize vodáků</Badge>
      <h2>Vítejte v aplikaci</h2>
      <Button variant="primary">Začít</Button>
    </Card>
  );
}
```

### Theme Provider (volitelné)

Pro expresivní/utilitární režim a programovou kontrolu tématu:

```tsx
import { ThemeProvider, useTheme } from '@czechcanoe/rvp-design-system';

function App() {
  return (
    <ThemeProvider defaultColorTheme="light" defaultDisplayMode="expressive">
      <YourApp />
    </ThemeProvider>
  );
}

function ThemeToggle() {
  const { colorTheme, setColorTheme, displayMode, setDisplayMode } = useTheme();

  return (
    <>
      <button onClick={() => setColorTheme(colorTheme === 'light' ? 'dark' : 'light')}>
        Toggle dark mode
      </button>
      <button onClick={() => setDisplayMode(displayMode === 'utilitarian' ? 'expressive' : 'utilitarian')}>
        Toggle mode
      </button>
    </>
  );
}
```

## Komponenty

### Základní (Tier 1)

| Komponenta | Popis |
|------------|-------|
| `Button` | Tlačítko s variantami primary, secondary, ghost, danger, gradient |
| `Input` | Textový vstup s validací a různými stavy |
| `Select` | Rozbalovací výběr |
| `Checkbox` | Zaškrtávací pole |
| `Radio` | Přepínač |
| `Switch` | Přepínač on/off |
| `Card` | Karta s variantami surface, elevated, gradient, glass |
| `Badge` | Štítek pro status, CSK sekce (DV/RY/VT), VT třídy |
| `Table` | Tabulka s třídění a selekcí |

### Pokročilé (Tier 2)

| Komponenta | Popis |
|------------|-------|
| `Modal` | Dialogové okno s animacemi |
| `Tabs` | Záložky s variantami line, pills, gradient, glass |
| `Toast` / `ToastProvider` | Notifikace s různými pozicemi |
| `Navigation` / `Breadcrumbs` / `MainNav` | Navigační prvky |
| `Pagination` | Stránkování |
| `Progress` | Ukazatel průběhu (bar i kroky) |
| `Header` | Hlavička aplikace |
| `Avatar` / `AvatarGroup` | Profilové obrázky |
| `Dropdown` | Rozbalovací menu |

### Specifické pro ČSK (Tier 3)

| Komponenta | Popis |
|------------|-------|
| `Calendar` | Kalendář závodů |
| `AthleteCard` | Karta závodníka s hero variantou |
| `ResultsTable` | Výsledková tabulka s pozičním highlightingem |
| `LiveIndicator` | Indikátor živého přenosu |
| `StatCard` | Widget pro statistiky s trendy |
| `Timeline` | Workflow vizualizace |
| `Dropzone` | Upload souborů |
| `EmptyState` | Prázdný stav |
| `Skeleton` | Loading placeholder |

## Design Tokeny

Systém používá CSS custom properties pro konzistentní styling:

```css
/* Barvy */
--color-primary: ...
--color-secondary: ...
--color-surface: ...

/* CSK sekce */
--color-section-dv: ...  /* Divoká voda - modrá */
--color-section-ry: ...  /* Rychlostní - zelená */
--color-section-vt: ...  /* Vodní turistika - červená */

/* Typografie */
--font-family-base: 'Poppins', sans-serif;
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.125rem;

/* Spacing */
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-4: 1rem;
/* ... */

/* Shadows, transitions, radius... */
```

## Režimy zobrazení

### Utilitární režim (výchozí)
Pro backoffice a administraci - kompaktní spacing, méně animací.

### Expresivní režim
Pro veřejné stránky - větší spacing, dramatické animace, gradient efekty.

```tsx
<ThemeProvider defaultDisplayMode="expressive">
  <App />
</ThemeProvider>
```

## Přístupnost

- WCAG 2.1 AA kompatibilní
- Podpora `prefers-reduced-motion`
- Keyboard navigation
- ARIA atributy
- Dostatečný kontrast barev

## Prohlížeče

Testováno a podporováno:

- Chrome/Chromium (desktop + mobile)
- Firefox (desktop)
- Safari/WebKit (desktop + mobile)

## Vývoj

```bash
# Instalace závislostí
npm install

# Spuštění Storybook
npm run storybook

# Build knihovny
npm run build

# Spuštění testů
npm run test

# Type checking
npm run typecheck
```

## Storybook

Interaktivní dokumentace komponent je dostupná v Storybook:

```bash
npm run storybook
```

Storybook obsahuje:
- Všechny komponenty s variantami
- Prototypy stránek (kalendář, výsledky, live, profil, registrace, dashboard)
- Design tokeny přehled
- Příklady použití

## Struktura projektu

```
src/
├── components/     # React komponenty
├── context/        # ThemeProvider
├── hooks/          # React hooks
├── prototypes/     # Ukázkové stránky
├── tokens/         # CSS design tokeny
├── styles/         # Globální styly
└── index.ts        # Hlavní export
```

## Licence

AGPL-3.0

## Odkazy

- [Český svaz kanoistů](https://kanoe.cz)
- [GitHub Repository](https://github.com/CzechCanoe/rvp-design-system)
