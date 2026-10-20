# @czechcanoe/rvp-design-system

Design system „Klidná voda“ (v2) pro registrační a výsledkový portál Českého svazu kanoistů: kalendář závodů, výsledky, live výsledky, přihlášky klubů a profily závodníků.

[![CI](https://github.com/CzechCanoe/rvp-design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/CzechCanoe/rvp-design-system/actions/workflows/ci.yml)

## Storybook

Interaktivní dokumentace: [czechcanoe.github.io/rvp-design-system](https://czechcanoe.github.io/rvp-design-system)

## Principy

- **Jeden systém, tři tóny:** Tribuna (live, výsledky, kalendář; bílá plocha), Úřad (přihlášky, registr; šedá pracovní plocha, hustší tabulky), Moje (profil závodníka; telefon jako výchozí plátno).
- **Stavy hodnot jsou páteř:** Oficiální, Předběžné, V revizi, Neznámo, Live, Zastaveno. Komponenty přijímají `Observed<T>`, značky (DNS/DNF/DSQ) a stavy, ne doménu.
- **Barvy z loga ČSK a kanoe.cz:** svazová modrá `#004899`, akční modrá `#2a66b4`, červená jen pro LIVE a chyby. Bez gradientů a bez dekorací.
- **Čas přes `Clock`:** tikající čas a stáří dat se řídí injektovanými hodinami, komponenty nevolají `Date.now()`.

Podrobně: [`DESIGN_PRINCIPLES.md`](./DESIGN_PRINCIPLES.md), [`docs/v2/BRIEF.md`](./docs/v2/BRIEF.md).

## Režim embed

Jediný režim zobrazení je `embed` pro komponenty vložené do kanoe.cz (Bootstrap 4): menší rádiusy, bez stínů.

```tsx
import { ThemeProvider } from '@czechcanoe/rvp-design-system';

// Samostatná aplikace
<ThemeProvider>...</ThemeProvider>

// Embed na kanoe.cz (data-mode="embed")
<ThemeProvider embed>...</ThemeProvider>
```

Tmavé téma se ve 2.0 nekreslí; `theme: 'system'` se vykreslí světle.

## Komponenty

Úplné API: [`docs/COMPONENT_API.md`](./docs/COMPONENT_API.md) (generované z TypeScript typů, `npm run docs:api`). Záměr a pravidla komponent: [`docs/v2/COMPONENTS.md`](./docs/v2/COMPONENTS.md).

| Skupina | Komponenty |
|---------|------------|
| Základ a formuláře | Button, Input, SearchInput, Select, Checkbox, Radio, Switch, Card, Badge, Avatar, Icon, Table, Modal, Dropdown, Toast, Pagination, Progress, Skeleton, EmptyState, Dropzone, Timeline, Wizard, Calendar |
| Navigace a stránka | Header, Subbar, Breadcrumbs, PageTitle, PageLayout, BottomBar, Tabs, FilterPills, SegmentedControl, TableToolbar, CSKLogo |
| Stavy a čísla | StatusBadge, MarkBadge, PenaltyChip, GateGrid, BibBadge, Notice, StatTile, TimeValue, RunningTime, DataAge, StarButton, FavoritesToggle |
| Živé výsledky | EventHeader, ResultsTable, RunDetail, StartlistTable, ProgramList, OnCoursePanel |
| Kalendář, přihlášky, profil | WeekendCalendar, DeadlineBadge, EntryTable, ProposalList, SummaryCard, ProfileHeader, SeasonSparkline, RivalsList |

## Page stories

Celé obrazovky složené jen z komponent DS (bez prototypů): `Live/*` (Running, Expanded, Startlist, Official, Disconnected, Program), `Event/Detail`, `Calendar/Season`, `Entry/Club Entry`, `Athlete/*`, `Layout/*`. Jsou kostrou klientů a základem vizuálních snapshotů.

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
import { Badge, Button, Card, StatusBadge, TimeValue } from '@czechcanoe/rvp-design-system';
import '@czechcanoe/rvp-design-system/styles';

function App() {
  return (
    <Card variant="outlined">
      <Badge section="dv">Divoká voda</Badge>
      <StatusBadge state="provisional" />
      <TimeValue value={92.34} />
      <Button variant="primary">Přihlásit se</Button>
    </Card>
  );
}
```

Písma (Barlow Semi Condensed, IBM Plex Sans a Mono) jsou součástí balíčku (`dist/fonts/`). Migrace z 1.x: [`docs/v2/MIGRATION.md`](./docs/v2/MIGRATION.md).

## Vývoj

```bash
npm install
npm run storybook       # Storybook na :6006
npm run build           # knihovna (tsc + vite)
npm run lint            # ESLint + kontrola, že komponenty neobsahují hex barvy
npm run typecheck
npm run test:unit       # Vitest
npm run test            # Playwright (potřebuje Storybook; snapshoty generuje jen CI)
npm run docs:api        # přegeneruje docs/COMPONENT_API.md
```

Pravidla pro práci (větve, snapshoty, commity) jsou v [`CLAUDE.md`](./CLAUDE.md), stav a plán v [`PLAN.md`](./PLAN.md).

## Publikace

Verzi a `CHANGELOG.md` spravuje Release Please podle konvenčních commitů (`feat:`, `fix:`, `feat!:` pro breaking change). Merge release PR vytvoří tag, GitHub Release a spustí `publish.yml`, který publikuje na GitHub Packages. Verzi v `package.json` se neupravuje ručně.

## Struktura

```
src/
├── components/     # React komponenty (každá ve vlastní složce se stories)
├── stories/        # Page stories a Tokens/Overview
├── context/        # ThemeContext (theme, embed)
├── clock/          # Clock pro RunningTime, DataAge, ResultsTable
├── types/          # Observed<T>
├── hooks/          # interní hooky
├── tokens/         # CSS tokeny --csk-*
└── styles/         # Globální styly a fonty
```

## Licence

AGPL-3.0
