# Component API Reference

Kompletní reference API všech komponent CSK RVP Design System.

## Obsah

- [Tier 1 - Core komponenty](#tier-1---core-komponenty)
  - [Button](#button)
  - [Input](#input)
  - [Select](#select)
  - [Checkbox](#checkbox)
  - [Radio](#radio)
  - [Switch](#switch)
  - [Card](#card)
  - [Badge](#badge)
  - [Table](#table)
- [Tier 2 - Pokročilé komponenty](#tier-2---pokročilé-komponenty)
  - [Modal](#modal)
  - [Tabs](#tabs)
  - [Toast](#toast)
  - [Navigation](#navigation)
  - [Pagination](#pagination)
  - [Progress](#progress)
  - [Header](#header)
  - [Avatar](#avatar)
  - [Dropdown](#dropdown)
- [Tier 3 - Specifické komponenty](#tier-3---specifické-komponenty)
  - [Calendar](#calendar)
  - [Dropzone](#dropzone)
  - [Timeline](#timeline)
  - [StatCard](#statcard)
  - [AthleteCard](#athletecard)
  - [ResultsTable](#resultstable)
  - [LiveIndicator](#liveindicator)
  - [EmptyState](#emptystate)
  - [Skeleton](#skeleton)

---

## Tier 1 - Core komponenty

### Button

Tlačítko pro uživatelské akce.

```tsx
import { Button } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger' \| 'gradient' \| 'gradient-accent'` | `'primary'` | Vizuální varianta |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost tlačítka |
| `fullWidth` | `boolean` | `false` | Roztáhne na celou šířku |
| `iconLeft` | `ReactNode` | - | Ikona před textem |
| `iconRight` | `ReactNode` | - | Ikona za textem |
| `loading` | `boolean` | `false` | Stav načítání |
| `disabled` | `boolean` | `false` | Neaktivní stav |

#### Příklad

```tsx
<Button variant="gradient" size="lg" loading={isSubmitting}>
  Odeslat přihlášku
</Button>
```

---

### Input

Textový vstup s validací a ikonami.

```tsx
import { Input } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `type` | `'text' \| 'password' \| 'email' \| 'search' \| 'number' \| 'tel' \| 'url'` | `'text'` | Typ inputu |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `state` | `'default' \| 'error' \| 'success'` | `'default'` | Validační stav |
| `fullWidth` | `boolean` | `false` | Roztáhne na celou šířku |
| `label` | `string` | - | Popisek |
| `helperText` | `string` | - | Pomocný text |
| `errorMessage` | `string` | - | Chybová zpráva |
| `iconLeft` | `ReactNode` | - | Ikona na začátku |
| `iconRight` | `ReactNode` | - | Ikona na konci |
| `clearable` | `boolean` | `false` | Tlačítko pro vymazání |
| `onClear` | `() => void` | - | Callback pro vymazání |

#### Příklad

```tsx
<Input
  label="Email"
  type="email"
  state={errors.email ? 'error' : 'default'}
  errorMessage={errors.email}
  iconLeft={<MailIcon />}
/>
```

---

### Select

Výběrový prvek (dropdown).

```tsx
import { Select } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `options` | `SelectOption[]` | **required** | Možnosti výběru |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `state` | `'default' \| 'error' \| 'success'` | `'default'` | Validační stav |
| `fullWidth` | `boolean` | `false` | Roztáhne na celou šířku |
| `label` | `string` | - | Popisek |
| `helperText` | `string` | - | Pomocný text |
| `errorMessage` | `string` | - | Chybová zpráva |
| `placeholder` | `string` | - | Placeholder |
| `iconLeft` | `ReactNode` | - | Ikona na začátku |

#### SelectOption

```typescript
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

#### Příklad

```tsx
<Select
  label="Kategorie"
  placeholder="Vyberte kategorii"
  options={[
    { value: 'k1m', label: 'K1 Muži' },
    { value: 'k1w', label: 'K1 Ženy' },
    { value: 'c1m', label: 'C1 Muži' },
  ]}
/>
```

---

### Checkbox

Zaškrtávací pole.

```tsx
import { Checkbox } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `state` | `'default' \| 'error' \| 'success'` | `'default'` | Validační stav |
| `indeterminate` | `boolean` | `false` | Částečně zaškrtnutý |
| `label` | `ReactNode` | - | Popisek |
| `helperText` | `string` | - | Pomocný text |
| `errorMessage` | `string` | - | Chybová zpráva |

#### Příklad

```tsx
<Checkbox
  label="Souhlasím s pravidly závodu"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>
```

---

### Radio

Přepínač (radio button).

```tsx
import { Radio } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `state` | `'default' \| 'error' \| 'success'` | `'default'` | Validační stav |
| `label` | `ReactNode` | - | Popisek |
| `helperText` | `string` | - | Pomocný text |
| `errorMessage` | `string` | - | Chybová zpráva |

#### Příklad

```tsx
<Radio name="section" value="dv" label="Divoká voda" />
<Radio name="section" value="ry" label="Rychlostní" />
<Radio name="section" value="vt" label="Vodní turistika" />
```

---

### Switch

Přepínač (toggle).

```tsx
import { Switch } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `state` | `'default' \| 'error' \| 'success'` | `'default'` | Validační stav |
| `label` | `ReactNode` | - | Popisek |
| `helperText` | `string` | - | Pomocný text |
| `errorMessage` | `string` | - | Chybová zpráva |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Pozice popisku |

#### Příklad

```tsx
<Switch
  label="Zobrazit výsledky"
  checked={showResults}
  onChange={(e) => setShowResults(e.target.checked)}
/>
```

---

### Card

Karta pro seskupení souvisejícího obsahu.

```tsx
import { Card } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `variant` | `'surface' \| 'elevated' \| 'outlined' \| 'gradient' \| 'glass' \| 'featured'` | `'surface'` | Vizuální varianta |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Vnitřní odsazení |
| `clickable` | `boolean` | `false` | Klikací styl |
| `href` | `string` | - | URL pro odkaz |
| `target` | `string` | - | Target atribut |
| `header` | `ReactNode` | - | Hlavička karty |
| `footer` | `ReactNode` | - | Patička karty |

#### Příklad

```tsx
<Card variant="gradient" header={<h3>Nadcházející závod</h3>}>
  <p>Mezinárodní závod v Praze</p>
</Card>
```

---

### Badge

Štítek pro zobrazení stavu nebo kategorie.

```tsx
import { Badge } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'gradient' \| 'gradient-accent' \| 'gradient-success' \| 'gradient-error'` | `'default'` | Vizuální varianta |
| `section` | `'dv' \| 'ry' \| 'vt'` | - | CSK sekce (přepíše variant) |
| `vtClass` | `'m' \| 'a' \| 'b' \| 'c'` | - | VT třída (přepíše variant/section) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `outlined` | `boolean` | `false` | Obrysový styl |
| `pill` | `boolean` | `false` | Zaoblený tvar |
| `glow` | `boolean` | `false` | Efekt záře |
| `icon` | `ReactNode` | - | Ikona |

#### Příklad

```tsx
<Badge section="dv">Divoká voda</Badge>
<Badge vtClass="a" pill glow>Třída A</Badge>
<Badge variant="gradient-success">Kvalifikován</Badge>
```

---

### Table

Tabulka s řazením a výběrem.

```tsx
import { Table, Th, Td } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `columns` | `ColumnDef<T>[]` | **required** | Definice sloupců |
| `data` | `T[]` | **required** | Data |
| `variant` | `'default' \| 'striped' \| 'bordered'` | `'default'` | Vizuální varianta |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `rowKey` | `keyof T \| ((row: T, index: number) => string \| number)` | - | Klíč řádku |
| `selectable` | `boolean` | `false` | Povolení výběru |
| `selectedKeys` | `Set<string \| number>` | - | Vybrané klíče |
| `onSelectionChange` | `(keys: Set<string \| number>) => void` | - | Callback výběru |
| `stickyHeader` | `boolean` | `false` | Fixní hlavička |
| `hoverable` | `boolean` | `true` | Hover efekt |
| `sortKey` | `string \| null` | - | Řazený sloupec |
| `sortDirection` | `'asc' \| 'desc' \| null` | - | Směr řazení |
| `onSortChange` | `(key: string \| null, direction: SortDirection) => void` | - | Callback řazení |
| `rankKey` | `keyof T` | - | Klíč pro podium highlighting |
| `loading` | `boolean` | `false` | Stav načítání |
| `emptyState` | `ReactNode` | - | Prázdný stav |
| `caption` | `string` | - | Popisek (accessibility) |

#### ColumnDef

```typescript
interface ColumnDef<T> {
  key: string;
  header: ReactNode;
  cell?: (row: T, rowIndex: number) => ReactNode;
  accessor?: keyof T;
  sortable?: boolean;
  sortFn?: (a: T, b: T, direction: SortDirection) => number;
  width?: string;
  align?: 'left' | 'center' | 'right';
  headerAlign?: 'left' | 'center' | 'right';
}
```

#### Příklad

```tsx
<Table
  columns={[
    { key: 'rank', header: '#', accessor: 'rank', width: '60px', align: 'center' },
    { key: 'name', header: 'Jméno', accessor: 'name', sortable: true },
    { key: 'time', header: 'Čas', accessor: 'time', align: 'right' },
  ]}
  data={results}
  variant="striped"
  stickyHeader
  rankKey="rank"
/>
```

---

## Tier 2 - Pokročilé komponenty

### Modal

Modální dialog.

```tsx
import { Modal } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `open` | `boolean` | **required** | Stav otevření |
| `onClose` | `() => void` | **required** | Callback zavření |
| `title` | `ReactNode` | - | Titulek |
| `description` | `ReactNode` | - | Popis |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Velikost |
| `styleVariant` | `'default' \| 'gradient' \| 'glass' \| 'danger'` | `'default'` | Styl |
| `closeOnBackdropClick` | `boolean` | `true` | Zavřít při kliknutí na pozadí |
| `closeOnEscape` | `boolean` | `true` | Zavřít klávesou Escape |
| `showCloseButton` | `boolean` | `true` | Zobrazit tlačítko zavření |
| `footer` | `ReactNode` | - | Patička s akcemi |
| `scrollable` | `boolean` | `false` | Scrollovatelný obsah |

#### Příklad

```tsx
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Potvrdit přihlášku"
  styleVariant="gradient"
  footer={
    <>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>Zrušit</Button>
      <Button variant="primary" onClick={handleConfirm}>Potvrdit</Button>
    </>
  }
>
  <p>Opravdu chcete odeslat přihlášku?</p>
</Modal>
```

---

### Tabs

Záložky pro přepínání obsahu.

```tsx
import { Tabs } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `tabs` | `TabItem[]` | **required** | Záložky |
| `activeTab` | `string` | - | Aktivní záložka (controlled) |
| `defaultActiveTab` | `string` | - | Výchozí záložka (uncontrolled) |
| `onChange` | `(tabId: string) => void` | - | Callback změny |
| `variant` | `'line' \| 'pills' \| 'gradient' \| 'gradient-line' \| 'glass'` | `'line'` | Vizuální varianta |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `fullWidth` | `boolean` | `false` | Roztáhne na celou šířku |

#### TabItem

```typescript
interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}
```

#### Příklad

```tsx
<Tabs
  variant="gradient-line"
  tabs={[
    { id: 'results', label: 'Výsledky', content: <ResultsContent /> },
    { id: 'startlist', label: 'Startovka', content: <StartlistContent /> },
    { id: 'info', label: 'Informace', content: <InfoContent /> },
  ]}
/>
```

---

### Toast

Notifikace (vyžaduje ToastProvider).

```tsx
import { ToastProvider, useToast } from '@czechcanoe/rvp-design-system';
```

#### ToastProvider Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `position` | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'top-right'` | Pozice |
| `duration` | `number` | `5000` | Výchozí délka (ms) |
| `maxToasts` | `number` | `5` | Max. počet |
| `styleVariant` | `'default' \| 'gradient' \| 'glass'` | `'default'` | Styl |
| `showProgress` | `boolean` | `false` | Progress bar |

#### useToast Hook

```typescript
const { toast, success, warning, error, info, dismiss, dismissAll } = useToast();

// Metody
toast(message: ReactNode, options?: ToastOptions): string;
success(message: ReactNode, options?: ToastOptions): string;
warning(message: ReactNode, options?: ToastOptions): string;
error(message: ReactNode, options?: ToastOptions): string;
info(message: ReactNode, options?: ToastOptions): string;
dismiss(id: string): void;
dismissAll(): void;
```

#### Příklad

```tsx
// App wrapper
<ToastProvider position="bottom-right" styleVariant="gradient">
  <App />
</ToastProvider>

// Použití v komponentě
function MyComponent() {
  const { success, error } = useToast();

  const handleSubmit = async () => {
    try {
      await submitForm();
      success('Přihláška odeslána!');
    } catch {
      error('Nepodařilo se odeslat přihlášku.');
    }
  };
}
```

---

### Navigation

Navigační komponenty (Breadcrumbs, MainNav).

```tsx
import { Breadcrumbs, MainNav } from '@czechcanoe/rvp-design-system';
```

#### Breadcrumbs Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `items` | `BreadcrumbItem[]` | **required** | Položky |
| `separator` | `ReactNode` | `/` | Oddělovač |
| `maxItems` | `number` | - | Max. položek před kolapsem |
| `collapsedLabel` | `string` | `'...'` | Label pro kolaps |
| `renderLink` | `(item, children) => ReactNode` | - | Custom render linku |

#### MainNav Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `items` | `NavItem[]` | **required** | Položky navigace |
| `variant` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout |
| `styleVariant` | `'default' \| 'gradient' \| 'glass' \| 'pills'` | `'default'` | Styl |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `brand` | `ReactNode` | - | Logo/brand |
| `actions` | `ReactNode` | - | Akce |
| `showMobileToggle` | `boolean` | `true` | Mobile toggle |
| `onItemClick` | `(item: NavItem) => void` | - | Callback kliknutí |
| `renderLink` | `(item, children) => ReactNode` | - | Custom render linku |

#### Příklad

```tsx
<MainNav
  styleVariant="gradient"
  brand={<Logo />}
  items={[
    { id: 'calendar', label: 'Kalendář', href: '/calendar', active: true },
    { id: 'results', label: 'Výsledky', href: '/results' },
    { id: 'athletes', label: 'Závodníci', href: '/athletes' },
  ]}
  actions={<UserMenu />}
/>
```

---

### Pagination

Stránkování.

```tsx
import { Pagination } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `currentPage` | `number` | **required** | Aktuální stránka (1-indexed) |
| `totalPages` | `number` | **required** | Celkem stránek |
| `onPageChange` | `(page: number) => void` | **required** | Callback změny |
| `variant` | `'default' \| 'simple' \| 'minimal'` | `'default'` | Varianta |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `siblingCount` | `number` | `1` | Počet sousedních stránek |
| `boundaryCount` | `number` | `1` | Počet krajních stránek |
| `showFirstLast` | `boolean` | `true` | Zobrazit první/poslední |
| `showPrevNext` | `boolean` | `true` | Zobrazit předchozí/další |
| `disabled` | `boolean` | `false` | Neaktivní stav |

#### Příklad

```tsx
<Pagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
  variant="default"
/>
```

---

### Progress

Ukazatel průběhu (bar nebo kroky).

```tsx
import { Progress } from '@czechcanoe/rvp-design-system';
```

#### Progress Bar Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `variant` | `'bar'` | `'bar'` | Typ |
| `value` | `number` | **required** | Hodnota (0-100) |
| `max` | `number` | `100` | Maximum |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `color` | `'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | Barva |
| `showLabel` | `boolean` | `false` | Zobrazit procenta |
| `striped` | `boolean` | `false` | Pruhovaný |
| `animated` | `boolean` | `false` | Animovat pruhy |
| `indeterminate` | `boolean` | `false` | Neurčitý stav |

#### Progress Steps Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `variant` | `'steps'` | **required** | Typ |
| `steps` | `ProgressStep[]` | **required** | Kroky |
| `currentStep` | `number` | **required** | Aktuální krok (0-indexed) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `color` | `'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | Barva |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientace |
| `clickable` | `boolean` | `false` | Klikatelné kroky |
| `onStepClick` | `(stepIndex: number) => void` | - | Callback kliknutí |

#### Příklad

```tsx
<Progress variant="bar" value={75} color="success" showLabel />

<Progress
  variant="steps"
  currentStep={1}
  steps={[
    { id: 1, label: 'Osobní údaje' },
    { id: 2, label: 'Kategorie' },
    { id: 3, label: 'Potvrzení' },
  ]}
/>
```

---

### Header

Hlavička aplikace.

```tsx
import { Header } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `brand` | `ReactNode` | - | Logo/brand |
| `navigation` | `ReactNode` | - | Navigace |
| `search` | `ReactNode` | - | Vyhledávání |
| `userMenu` | `ReactNode` | - | User menu |
| `actions` | `ReactNode` | - | Akce |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `variant` | `'default' \| 'transparent' \| 'elevated' \| 'gradient' \| 'glass'` | `'default'` | Varianta |
| `sticky` | `boolean` | `false` | Fixní pozice |
| `bordered` | `boolean` | `false` | Spodní ohraničení |
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'full'` | Max. šířka |
| `blurOnScroll` | `boolean` | `false` | Blur efekt při scrollu |
| `scrollThreshold` | `number` | `50` | Práh pro blur |
| `showMobileToggle` | `boolean` | `true` | Mobile toggle |
| `mobileMenuContent` | `ReactNode` | - | Obsah mobile menu |
| `onMobileMenuChange` | `(isOpen: boolean) => void` | - | Callback mobile menu |

#### Příklad

```tsx
<Header
  variant="gradient"
  sticky
  blurOnScroll
  brand={<Logo />}
  navigation={<MainNav items={navItems} />}
  userMenu={<UserDropdown />}
/>
```

---

### Avatar

Avatar uživatele.

```tsx
import { Avatar, AvatarGroup } from '@czechcanoe/rvp-design-system';
```

#### Avatar Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `src` | `string` | - | URL obrázku |
| `alt` | `string` | - | Alt text |
| `initials` | `string` | - | Iniciály |
| `name` | `string` | - | Jméno pro generování iniciál |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Velikost |
| `variant` | `'circular' \| 'rounded' \| 'square'` | `'circular'` | Tvar |
| `color` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'dv' \| 'ry' \| 'vt'` | `'default'` | Barva pozadí |
| `icon` | `ReactNode` | - | Fallback ikona |
| `status` | `'online' \| 'offline' \| 'busy' \| 'away'` | - | Status indikátor |

#### AvatarGroup Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `max` | `number` | - | Max. avatarů |
| `size` | `AvatarSize` | `'md'` | Velikost |
| `spacing` | `'tight' \| 'normal' \| 'loose'` | `'normal'` | Překryv |

#### Příklad

```tsx
<Avatar src="/athlete.jpg" name="Jan Novák" size="lg" status="online" />

<AvatarGroup max={4}>
  <Avatar src="/user1.jpg" name="Jan" />
  <Avatar src="/user2.jpg" name="Petr" />
  <Avatar src="/user3.jpg" name="Anna" />
  <Avatar name="Martin" />
  <Avatar name="Eva" />
</AvatarGroup>
```

---

### Dropdown

Dropdown menu.

```tsx
import { Dropdown, DropdownButton } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `trigger` | `ReactNode` | **required** | Trigger element |
| `items` | `DropdownItem[]` | **required** | Položky menu |
| `position` | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end'` | `'bottom-start'` | Pozice |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `open` | `boolean` | - | Stav otevření (controlled) |
| `onOpenChange` | `(open: boolean) => void` | - | Callback změny |
| `minWidth` | `number \| 'trigger'` | `'trigger'` | Min. šířka |
| `maxHeight` | `number` | - | Max. výška |
| `disabled` | `boolean` | `false` | Neaktivní |

#### DropdownItem

```typescript
interface DropdownItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  description?: string;
  disabled?: boolean;
  divider?: boolean;
  href?: string;
  onClick?: () => void;
  closeOnClick?: boolean;
  variant?: 'default' | 'danger';
}
```

#### Příklad

```tsx
<Dropdown
  trigger={<DropdownButton>Akce</DropdownButton>}
  items={[
    { id: 'edit', label: 'Upravit', icon: <EditIcon /> },
    { id: 'duplicate', label: 'Duplikovat', icon: <CopyIcon /> },
    { id: 'divider', divider: true, label: '' },
    { id: 'delete', label: 'Smazat', icon: <TrashIcon />, variant: 'danger' },
  ]}
/>
```

---

## Tier 3 - Specifické komponenty

### Calendar

Kalendář událostí.

```tsx
import { Calendar } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `date` | `Date` | - | Zobrazené datum (controlled) |
| `defaultDate` | `Date` | `new Date()` | Výchozí datum |
| `onDateChange` | `(date: Date) => void` | - | Callback změny |
| `view` | `'month' \| 'week'` | `'month'` | Zobrazení |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `styleVariant` | `'default' \| 'gradient' \| 'glass' \| 'bordered'` | `'default'` | Styl |
| `events` | `CalendarEvent[]` | `[]` | Události |
| `onEventClick` | `(event: CalendarEvent) => void` | - | Callback kliknutí na událost |
| `onDayClick` | `(date: Date) => void` | - | Callback kliknutí na den |
| `locale` | `string` | `'cs-CZ'` | Lokalizace |
| `firstDayOfWeek` | `0 \| 1` | `1` | První den týdne |
| `showNavigation` | `boolean` | `true` | Zobrazit navigaci |
| `showTodayButton` | `boolean` | `true` | Tlačítko "dnes" |
| `maxEventsPerDay` | `number` | `3` | Max. událostí na den |
| `highlightToday` | `boolean` | `true` | Zvýraznit dnešek |
| `showEventPreview` | `boolean` | `false` | Tooltip při hoveru |
| `animated` | `boolean` | `true` | Animace přechodů |

#### CalendarEvent

```typescript
interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  section?: 'dv' | 'ry' | 'vt';
  data?: Record<string, unknown>;
}
```

#### Příklad

```tsx
<Calendar
  styleVariant="gradient"
  events={[
    {
      id: '1',
      title: 'MS ve slalomu',
      start: new Date(2024, 5, 15),
      end: new Date(2024, 5, 17),
      section: 'dv',
    },
  ]}
  onEventClick={(event) => navigate(`/event/${event.id}`)}
/>
```

---

### Dropzone

Upload souborů (drag & drop).

```tsx
import { Dropzone } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `accept` | `string` | - | Povolené typy (MIME) |
| `multiple` | `boolean` | `true` | Více souborů |
| `maxSize` | `number` | - | Max. velikost (bytes) |
| `maxFiles` | `number` | - | Max. počet souborů |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `state` | `'default' \| 'error' \| 'success'` | `'default'` | Stav |
| `disabled` | `boolean` | `false` | Neaktivní |
| `showPreviews` | `boolean` | `true` | Zobrazit náhledy |
| `label` | `string` | - | Popisek |
| `hint` | `string` | - | Nápověda |
| `errorMessage` | `string` | - | Chybová zpráva |
| `files` | `DropzoneFile[]` | - | Soubory |
| `onFilesChange` | `(files: DropzoneFile[]) => void` | - | Callback změny |
| `onFileRemove` | `(file: DropzoneFile) => void` | - | Callback odebrání |
| `onError` | `(error: string) => void` | - | Callback chyby |

#### Příklad

```tsx
<Dropzone
  accept="image/*,application/pdf"
  maxSize={5 * 1024 * 1024}
  maxFiles={3}
  label="Přetáhněte soubory nebo klikněte"
  hint="Podporované formáty: JPG, PNG, PDF (max 5 MB)"
  onFilesChange={setFiles}
/>
```

---

### Timeline

Časová osa.

```tsx
import { Timeline } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `items` | `TimelineItem[]` | **required** | Položky |
| `variant` | `'default' \| 'compact' \| 'card'` | `'default'` | Varianta |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `color` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Výchozí barva |
| `showConnector` | `boolean` | `true` | Zobrazit spojnice |
| `reverse` | `boolean` | `false` | Obrátit pořadí |
| `alternate` | `boolean` | `false` | Střídavé strany |
| `onItemClick` | `(item: TimelineItem, index: number) => void` | - | Callback kliknutí |

#### TimelineItem

```typescript
interface TimelineItem {
  id: string | number;
  title: string;
  description?: ReactNode;
  timestamp?: string;
  status?: 'completed' | 'current' | 'pending' | 'error';
  color?: TimelineColor;
  icon?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
}
```

#### Příklad

```tsx
<Timeline
  variant="card"
  items={[
    { id: 1, title: 'Přihláška odeslána', timestamp: '10:30', status: 'completed' },
    { id: 2, title: 'Čeká na schválení', status: 'current' },
    { id: 3, title: 'Platba', status: 'pending' },
  ]}
/>
```

---

### StatCard

Statistická karta pro dashboard.

```tsx
import { StatCard } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `title` | `string` | **required** | Titulek |
| `value` | `string \| number` | **required** | Hodnota |
| `variant` | `'default' \| 'outlined' \| 'elevated'` | `'default'` | Varianta |
| `styleVariant` | `'default' \| 'gradient' \| 'glass'` | `'default'` | Styl |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `color` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'dv' \| 'ry' \| 'vt'` | `'default'` | Barva |
| `trend` | `StatCardTrend` | - | Trend |
| `icon` | `ReactNode` | - | Ikona |
| `description` | `string` | - | Popis |
| `sparkline` | `number[]` | - | Data pro sparkline |
| `loading` | `boolean` | `false` | Načítání |

#### StatCardTrend

```typescript
interface StatCardTrend {
  value: number;
  direction: 'up' | 'down' | 'neutral';
  label?: string;
}
```

#### Příklad

```tsx
<StatCard
  title="Aktivních závodníků"
  value="1,234"
  styleVariant="gradient"
  color="primary"
  trend={{ value: 12, direction: 'up', label: 'vs. minulý měsíc' }}
  icon={<UsersIcon />}
  sparkline={[10, 25, 15, 30, 45, 35, 50]}
/>
```

---

### AthleteCard

Karta závodníka.

```tsx
import { AthleteCard } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `name` | `string` | **required** | Jméno |
| `imageUrl` | `string` | - | URL fotky |
| `club` | `string` | - | Klub |
| `clubId` | `string` | - | ID klubu |
| `birthYear` | `number` | - | Rok narození |
| `section` | `'dv' \| 'ry' \| 'vt'` | - | Sekce |
| `vtClass` | `'m' \| 'a' \| 'b' \| 'c'` | - | VT třída |
| `vtPoints` | `number` | - | VT body |
| `ranking` | `number` | - | Pořadí |
| `country` | `string` | - | Země (ISO kód) |
| `licenseNumber` | `string` | - | Číslo licence |
| `variant` | `'default' \| 'compact' \| 'featured'` | `'default'` | Varianta |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `styleVariant` | `'default' \| 'gradient' \| 'glass' \| 'hero'` | `'default'` | Styl |
| `backgroundUrl` | `string` | - | Pozadí (pro hero) |
| `clickable` | `boolean` | `false` | Klikací |
| `href` | `string` | - | URL odkazu |
| `stats` | `Array<{ label: string; value: string \| number }>` | - | Statistiky |
| `badge` | `ReactNode` | - | Custom badge |
| `actions` | `ReactNode` | - | Akce |

#### Příklad

```tsx
<AthleteCard
  name="Jan Novák"
  imageUrl="/athletes/jan-novak.jpg"
  club="USK Praha"
  section="dv"
  ranking={3}
  styleVariant="hero"
  backgroundUrl="/backgrounds/slalom.jpg"
  stats={[
    { label: 'Závody', value: 24 },
    { label: 'Medaile', value: 8 },
  ]}
/>
```

---

### ResultsTable

Tabulka výsledků závodu.

```tsx
import { ResultsTable } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `results` | `ResultEntry[]` | **required** | Výsledky |
| `variant` | `'default' \| 'striped' \| 'compact'` | `'default'` | Varianta |
| `styleVariant` | `'default' \| 'gradient' \| 'glass'` | `'default'` | Styl |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `section` | `'dv' \| 'ry' \| 'vt'` | - | Filtr sekce |
| `showRuns` | `boolean` | `true` | Zobrazit jízdy |
| `showTimeDiff` | `boolean` | `true` | Zobrazit rozdíl |
| `showCountry` | `boolean` | `true` | Zobrazit zemi |
| `showClub` | `boolean` | `true` | Zobrazit klub |
| `showCategory` | `boolean` | `false` | Zobrazit kategorii |
| `showPodiumHighlights` | `boolean` | `true` | Zvýraznit podium |
| `highlightPositions` | `number` | `3` | Počet zvýrazněných pozic |
| `showLiveIndicator` | `boolean` | `false` | Live indikátor |
| `stickyHeader` | `boolean` | `false` | Fixní hlavička |
| `onRowClick` | `(entry: ResultEntry) => void` | - | Callback kliknutí |
| `loading` | `boolean` | `false` | Načítání |
| `emptyState` | `ReactNode` | - | Prázdný stav |

#### ResultEntry

```typescript
interface ResultEntry {
  id: string | number;
  rank?: number;
  name: string;
  club?: string;
  country?: string;
  section?: 'dv' | 'ry' | 'vt';
  category?: string;
  run1Time?: number;
  run1Penalty?: number;
  run2Time?: number;
  run2Penalty?: number;
  totalTime?: number;
  timeDiff?: number;
  status?: 'dns' | 'dnf' | 'dsq' | 'final' | 'provisional' | 'live';
  highlighted?: boolean;
  previousRank?: number;
  meta?: Record<string, unknown>;
}
```

#### Příklad

```tsx
<ResultsTable
  styleVariant="gradient"
  results={results}
  showPodiumHighlights
  stickyHeader
  onRowClick={(entry) => navigate(`/athlete/${entry.id}`)}
/>
```

---

### LiveIndicator

Indikátor živého vysílání.

```tsx
import { LiveIndicator } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `variant` | `'default' \| 'live' \| 'recording' \| 'offline' \| 'connecting'` | `'default'` | Stav |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Velikost |
| `color` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Barva |
| `styleVariant` | `'default' \| 'gradient' \| 'glass' \| 'badge'` | `'default'` | Styl |
| `intensity` | `'subtle' \| 'normal' \| 'dramatic'` | `'normal'` | Intenzita animace |
| `pulse` | `boolean` | `true` | Pulzující animace |
| `label` | `ReactNode` | - | Text vedle indikátoru |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Pozice textu |
| `inline` | `boolean` | `false` | Inline zobrazení |
| `glow` | `boolean` | `false` | Efekt záře |

#### Příklad

```tsx
<LiveIndicator variant="live" label="ŽIVĚ" styleVariant="badge" intensity="dramatic" glow />
```

---

### EmptyState

Prázdný stav (žádná data).

```tsx
import { EmptyState } from '@czechcanoe/rvp-design-system';
```

#### Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `title` | `string` | - | Titulek |
| `description` | `string` | - | Popis |
| `icon` | `ReactNode` | - | Ikona |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Velikost |
| `variant` | `'default' \| 'card' \| 'inline'` | `'default'` | Varianta |
| `action` | `ReactNode` | - | Primární akce |
| `secondaryAction` | `ReactNode` | - | Sekundární akce |
| `illustration` | `ReactNode` | - | Ilustrace |
| `hideIcon` | `boolean` | `false` | Skrýt ikonu |

#### Příklad

```tsx
<EmptyState
  title="Žádné výsledky"
  description="Pro tento závod zatím nejsou k dispozici žádné výsledky."
  action={<Button onClick={refresh}>Obnovit</Button>}
/>
```

---

### Skeleton

Placeholder při načítání.

```tsx
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonCard,
  SkeletonTable,
} from '@czechcanoe/rvp-design-system';
```

#### Skeleton Props

| Prop | Typ | Default | Popis |
|------|-----|---------|-------|
| `variant` | `'text' \| 'circular' \| 'rectangular' \| 'rounded'` | `'text'` | Tvar |
| `animation` | `'pulse' \| 'wave' \| 'none'` | `'pulse'` | Animace |
| `width` | `string \| number` | - | Šířka |
| `height` | `string \| number` | - | Výška |
| `borderRadius` | `string` | - | Zaoblení |
| `lines` | `number` | `1` | Počet řádků (text) |
| `lineGap` | `string \| number` | - | Mezera mezi řádky |
| `lastLineWidth` | `string \| number` | - | Šířka posledního řádku |

#### Convenience komponenty

```tsx
<SkeletonText lines={3} fontSize="md" />
<SkeletonAvatar size="lg" />
<SkeletonButton size="md" />
<SkeletonCard hasImage lines={3} hasActions />
<SkeletonTable rows={5} columns={4} hasHeader />
```

#### Příklad

```tsx
{isLoading ? (
  <SkeletonCard hasImage hasAvatar lines={2} hasActions />
) : (
  <AthleteCard {...athlete} />
)}
```

---

## CSK Specifické typy

### Sekce

```typescript
type Section = 'dv' | 'ry' | 'vt';
// dv = Divoká voda
// ry = Rychlostní kanoistika
// vt = Vodní turistika
```

### VT Třídy

```typescript
type VtClass = 'm' | 'a' | 'b' | 'c';
// m = Mistrovská
// a = Třída A
// b = Třída B
// c = Třída C
```

### Barvy sekcí

Všechny komponenty s `color` prop podporují CSK sekce:

```tsx
<Badge color="dv">Divoká voda</Badge>
<Avatar color="ry" name="Jan" />
<StatCard color="vt" title="VT závodníci" value={500} />
```

---

## Přístupnost

Všechny komponenty jsou navrženy s ohledem na přístupnost (WCAG 2.1 AA):

- Správné ARIA atributy
- Podpora klávesové navigace
- Dostatečný barevný kontrast
- Respektování `prefers-reduced-motion`
- Screen reader kompatibilita

---

## Podpora prohlížečů

| Prohlížeč | Verze |
|-----------|-------|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 14+ |
| Edge | 90+ |
| Chrome Mobile | 90+ |
| Safari Mobile | 14+ |
