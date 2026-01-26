# Visual Regression Testing

Visual regression testy zajišťují, že CSS změny nenarušují existující vzhled komponent a prototypů.

## Přehled

Používáme **Playwright** pro screenshot-based visual regression testing:

- **Baseline screenshots**: Referenční snímky uložené v `*-snapshots/` složkách
- **Light/Dark mode**: Každý prototype testován v obou režimech
- **Cross-browser**: Chromium (primární), Firefox, WebKit
- **Responsive**: Desktop a mobile viewporty

## Příkazy

```bash
# Spustit visual testy (vyžaduje běžící Storybook nebo ho spustí automaticky)
npm run test

# Aktualizovat baseline screenshots (po záměrné vizuální změně)
npm run test:update

# Zobrazit HTML report
npm run test:report
```

## Workflow pro Phase 22 CSS Consolidation

### Před refaktorem

1. Ověř, že všechny testy projdou:
   ```bash
   npm run test
   ```

2. Pokud baseline neexistují, vygeneruj je:
   ```bash
   npm run test:update
   ```

### Během refaktoru

1. Proveď CSS změny (extrakce do DS komponent)
2. Spusť testy:
   ```bash
   npm run test
   ```
3. **Očekávaný výsledek: 0 vizuálních změn** (pixel-perfect)
4. Pokud testy selžou, zkontroluj diff a oprav CSS

### Po záměrné vizuální změně

1. Zkontroluj HTML report:
   ```bash
   npm run test:report
   ```
2. Ověř, že změny jsou správné
3. Aktualizuj baseline:
   ```bash
   npm run test:update
   ```

## Struktura testů

```
tests/
├── config.ts                    # Centrální konfigurace (story IDs)
├── prototypes.spec.ts           # Visual testy pro prototypy
├── prototypes.spec.ts-snapshots/  # Baseline screenshots
├── components.spec.ts           # Visual testy pro komponenty
├── components.spec.ts-snapshots/
├── cross-browser.spec.ts        # Cross-browser testy
├── accessibility.spec.ts        # A11y testy
├── interactions.spec.ts         # Interaction testy
└── visual/
    └── README.md                # Tato dokumentace
```

## Testované prototypy

### Embed varianty (13 stories)
Pro vložení do kanoe.cz:
- CalendarPage (2 views: grid, list)
- ResultsPage, LivePage
- AthletesListPage, ClubsListPage, RankingsPage
- AthletePublicProfile, ClubPublicProfile
- EventDetailPage, RegistrationPage
- DashboardPage, ProfilePage

### Satellite varianty (13 stories)
Standalone s minimálním headerem:
- Stejné stránky jako Embed

### Expressive varianty (3 stories)
S rozšířeným vizuálním stylingem:
- AthletePublicProfile-ExpressiveEmbed
- ClubPublicProfile-ExpressiveEmbed
- EventDetailPage-ExpressiveEmbed

**Celkem: ~29 stories × 2 (light/dark) = ~58 screenshots**

## Tolerance

| Typ | maxDiffPixels | Poznámka |
|-----|---------------|----------|
| Komponenty | 30 | Striktní |
| Prototypy | 80 | Mírně tolerantnější |
| LivePage | 6000 | Animace, živý obsah |

## Řešení problémů

### Testy selhávají po čisté instalaci
```bash
# Vygeneruj baseline
npm run test:update
```

### Font rendering differences
Testy běží na Linux (CI), lokální rozdíly mohou nastat na macOS/Windows.
Použij Docker nebo CI pro konzistentní výsledky.

### Animované komponenty
Animace jsou automaticky disabled (`animations: 'disabled'`).
Pro komponenty s neustálými animacemi (LiveIndicator) použij vyšší tolerance.

### Timeout errors
Zvyš timeout v `config.ts`:
```typescript
{ name: 'ComplexPage', storyId: '...', timeout: 60000 }
```

## CI/CD

Testy běží automaticky na:
- Push do main
- Pull requests

Baseline screenshots jsou součástí repozitáře (git LFS doporučeno pro velké soubory).
