# @czechcanoe/rvp-design-system

Design system pro registrační a výsledkový portál Českého svazu kanoistů.

[![CI](https://github.com/CzechCanoe/rvp-design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/CzechCanoe/rvp-design-system/actions/workflows/ci.yml)

## Storybook

Interaktivní dokumentace: [czechcanoe.github.io/rvp-design-system](https://czechcanoe.github.io/rvp-design-system)

## Instalace

Balíček je publikován na GitHub Packages. Nejdřív nastav registry v `.npmrc`:

```ini
@czechcanoe:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Pak nainstaluj:

```bash
npm install @czechcanoe/rvp-design-system
```

## Použití

```tsx
import { Button, Card, Badge } from '@czechcanoe/rvp-design-system';
import '@czechcanoe/rvp-design-system/styles';

function App() {
  return (
    <Card variant="elevated">
      <Badge section="dv">Divoká voda</Badge>
      <Button variant="primary">Přihlásit se</Button>
    </Card>
  );
}
```

## Vývoj

```bash
# Instalace závislostí
npm install

# Spuštění Storybook
npm run storybook

# Build knihovny
npm run build

# Lint a typecheck
npm run lint
npm run typecheck

# Testy
npm run test
```

## Publikace

Nová verze se publikuje automaticky na GitHub Packages při push na `main`, pokud:
- Změnila se verze v `package.json`
- Změnily se soubory v `src/`

**Postup vydání nové verze:**

1. Aktualizuj verzi v `package.json`
2. Commit a push na `main`
3. Workflow automaticky publikuje na GitHub Packages

Pro manuální publikaci použij workflow dispatch v GitHub Actions.

## Struktura

```
src/
├── components/     # React komponenty
├── context/        # ThemeContext
├── tokens/         # CSS tokeny a režimy
├── prototypes/     # Celostránkové prototypy
├── hooks/          # Custom hooks
└── styles/         # Globální styly
```

## Licence

AGPL-3.0
