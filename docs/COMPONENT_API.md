# Component API

> Generováno skriptem `scripts/gen-component-api.mjs` (`npm run docs:api`) z TypeScript typů a JSDoc v `src/components/`. **Needitovat ručně**; po změně API spusť `npm run docs:api` (kontrola: `npm run docs:api -- --check`).

Import: `import { Button } from '@czechcanoe/rvp-design-system'`. Popisy props jsou z JSDoc (anglicky), typy a výchozí hodnoty ze zdrojového kódu. Záměr komponent je v `docs/v2/COMPONENTS.md`, změny proti 1.x v `docs/v2/MIGRATION.md`.

## Obsah

- **Základ a formuláře**: Button, Input, SearchInput, Select, Checkbox, Radio, Switch, Card, Badge, Avatar, AvatarGroup, Icon, Table, Td, Th, Modal, Dropdown, DropdownButton, ToastProvider, Pagination, Progress, Skeleton, SkeletonAvatar, SkeletonButton, SkeletonCard, SkeletonTable, SkeletonText, EmptyState, Dropzone, Timeline, Wizard, Calendar, CalendarList
- **Navigace a stránka**: Header, Subbar, Breadcrumbs, PageTitle, PageLayout, BottomBar, Tabs, FilterPills, SegmentedControl, TableToolbar, TableToolbarButton, CSKLogo
- **Stavy a čísla**: StatusBadge, MarkBadge, PenaltyChip, GateGrid, BibBadge, Notice, StatTile, TimeValue, RunningTime, DataAge, StarButton, FavoritesToggle, LiveIndicator
- **Živé výsledky**: EventHeader, ResultsPanel, AthleteName, PenaltyText, RankValue, ResultsTable, RunDetail, RunValue, StartlistTable, ProgramList, OnCoursePanel, OnCourseRider
- **Kalendář, přihlášky, profil**: WeekendCalendar, DOCUMENT_KIND_LABELS, DocumentList, DeadlineBadge, EntryTable, ProposalList, SummaryCard, ProfileHeader, SeasonSparkline, RivalsList

## Základ a formuláře

### Button

Zdroj: `src/components/Button/Button.tsx`

Button component for user actions.

Supports multiple variants (primary, secondary, ghost, danger),
sizes (md 40 px, sm 32 px; touch width at least 44 px), and states (disabled, loading).

With `href` (or `as="a"`) it renders a link with the identical look and focus ring,
for navigation such as "Propozice (PDF)" or "Přihlásit". Actions stay `<button>`.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `as?` | `"button" \| "a"` |  | Element: `button` (default) or `a` (link form, needs `href`) |
| `href?` | `string` |  | Link target: renders `<a>` with the identical look and focus ring. `rel` is passed through; without it `target="_blank"` gets `noopener noreferrer`. |
| `variant?` | `"primary" \| "secondary" \| "ghost" \| "danger"` | `'primary'` | Visual variant of the button |
| `size?` | `"sm" \| "md"` | `'md'` | Size of the button |
| `fullWidth?` | `boolean` | `false` | Full width button |
| `iconLeft?` | `ReactNode` |  | Icon to display before the label |
| `iconRight?` | `ReactNode` |  | Icon to display after the label |
| `loading?` | `boolean` | `false` | Loading state (behaves as disabled) |
| `disabled?` | `boolean` |  | Disabled. A `<button>` gets `disabled`; a link cannot be disabled natively, so it drops `href` (not focusable, not navigable), gets `role="link"` + `aria-disabled="true"` and ignores clicks. Same look in both forms. |
| `children?` | `ReactNode` |  | Children content |

### Input

Zdroj: `src/components/Input/Input.tsx`

Input component for text entry.

Supports multiple types (text, password, email, search, number, tel, url),
sizes (sm, md, lg), and validation states (default, error, success).

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `type?` | `"number" \| "text" \| "password" \| "email" \| "search" \| "tel" \| "url"` | `text` | Input type |
| `size?` | `"sm" \| "md" \| "lg"` | `md` | Size of the input |
| `state?` | `"default" \| "error" \| "success"` | `default` | Validation state |
| `fullWidth?` | `boolean` | `false` | Full width input |
| `label?` | `string` |  | Label text |
| `helperText?` | `string` |  | Helper text below input |
| `errorMessage?` | `string` |  | Error message (overrides helperText when state is error) |
| `iconLeft?` | `ReactNode` |  | Icon to display at the start of the input |
| `iconRight?` | `ReactNode` |  | Icon to display at the end of the input |
| `clearable?` | `boolean` | `false` | Clear button (for search inputs) |
| `onClear?` | `(() => void)` |  | Callback when clear button is clicked |

### SearchInput

Zdroj: `src/components/SearchInput/SearchInput.tsx`

SearchInput component.

Search field in two sizes (md 40 px, sm 34 px). Quick filters are separate
FilterPills placed next to it. Supports debounced search, loading states,
and keyboard navigation.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `size?` | `"sm" \| "md"` | `md` | Size of the input |
| `fullWidth?` | `boolean` | `false` | Full width input |
| `placeholder?` | `string` | `Hledat...` | Placeholder text |
| `value?` | `string` |  | Current search value |
| `onChange?` | `((value: string) => void)` |  | Callback when search value changes |
| `onSearch?` | `((value: string) => void)` |  | Callback when search is submitted (Enter key) |
| `loading?` | `boolean` | `false` | Show loading indicator |
| `debounceMs?` | `number` | `300` | Debounce delay for onChange in ms (0 to disable) |
| `icon?` | `ReactNode` |  | Custom icon for the search field |
| `showIcon?` | `boolean` | `true` | Show the search icon |
| `helperText?` | `string` |  | Helper text below input |
| `resultsCount?` | `number` |  | Show results count |

### Select

Zdroj: `src/components/Select/Select.tsx`

Select component for choosing from a list of options.

Uses native HTML select for optimal accessibility and mobile UX.
Supports sizes (sm, md, lg) and validation states (default, error, success).

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `options` | `SelectOption[]` |  | Options to display in the select |
| `size?` | `"sm" \| "md" \| "lg"` | `md` | Size of the select |
| `state?` | `"default" \| "error" \| "warning" \| "success"` | `default` | Validation state |
| `fullWidth?` | `boolean` | `false` | Full width select |
| `label?` | `string` |  | Label text |
| `helperText?` | `string` |  | Helper text below select |
| `errorMessage?` | `string` |  | Error message (overrides helperText when state is error) |
| `iconLeft?` | `ReactNode` |  | Icon to display at the start of the select |
| `placeholder?` | `string` |  | Placeholder text (displayed as first disabled option) |

### Checkbox

Zdroj: `src/components/Checkbox/Checkbox.tsx`

Checkbox component for boolean selections.

Supports sizes (sm, md, lg), validation states (default, error, success),
and indeterminate state for partial selections.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `size?` | `"sm" \| "md" \| "lg"` | `md` | Size of the checkbox |
| `state?` | `"default" \| "error" \| "success"` | `default` | Validation state |
| `indeterminate?` | `boolean` | `false` | Indeterminate state (partially checked) |
| `label?` | `ReactNode` |  | Label text |
| `helperText?` | `string` |  | Helper text below checkbox |
| `errorMessage?` | `string` |  | Error message (overrides helperText when state is error) |

### Radio

Zdroj: `src/components/Radio/Radio.tsx`

Radio component for single selection from a group.

Supports sizes (sm, md, lg) and validation states (default, error, success).
Use within a RadioGroup or with the same `name` prop to create exclusive selection.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `size?` | `"sm" \| "md" \| "lg"` | `md` | Size of the radio button |
| `state?` | `"default" \| "error" \| "success"` | `default` | Validation state |
| `label?` | `ReactNode` |  | Label text |
| `helperText?` | `string` |  | Helper text below radio |
| `errorMessage?` | `string` |  | Error message (overrides helperText when state is error) |

### Switch

Zdroj: `src/components/Switch/Switch.tsx`

Switch component for toggling between two states (on/off).

Supports sizes (sm, md, lg), validation states (default, error, success),
and configurable label position.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `size?` | `"sm" \| "md" \| "lg"` | `md` | Size of the switch |
| `state?` | `"default" \| "error" \| "success"` | `default` | Validation state |
| `label?` | `ReactNode` |  | Label text |
| `helperText?` | `string` |  | Helper text below switch |
| `errorMessage?` | `string` |  | Error message (overrides helperText when state is error) |
| `labelPosition?` | `"left" \| "right"` | `right` | Position of the label |

### Card

Zdroj: `src/components/Card/Card.tsx`

Card component for grouping related content.

Slots: `header`, body (children) and `footer`.
Supports variants (surface, outlined),
padding sizes (none, sm, md, lg), and clickable state.
Can render as a div or anchor based on props.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `tone?` | `"default" \| "highlight"` | `default` | Tone of the frame (default `default`) |
| `variant?` | `"surface" \| "outlined"` | `surface` | Visual variant of the card |
| `padding?` | `"none" \| "sm" \| "md" \| "lg"` | `md` | Padding inside the card |
| `clickable?` | `boolean` | `false` | Makes the card clickable with hover/active states |
| `href?` | `string` |  | Makes the card render as a link (requires href) |
| `target?` | `string` |  | Target for link (only used with href) |
| `rel?` | `string` |  | Rel attribute for link (only used with href) |
| `header?` | `ReactNode` |  | Header content |
| `footer?` | `ReactNode` |  | Footer content |
| `children?` | `ReactNode` |  | Children content |

### Badge

Zdroj: `src/components/Badge/Badge.tsx`

Badge component for displaying status, labels, and categories.

Variants: default, primary, success, warning, error, info, level (race level),
outline, live. CSK-specific sections (DV, RY, VT) and VT classes (M, A, B, C)
via props. Value states (official, provisional ...) are StatusBadge.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `variant?` | `"default" \| "primary" \| "success" \| "warning" \| "error" \| "info" \| "level" \| "outline" \| "live"` | `default` | Visual variant of the badge |
| `section?` | `"dv" \| "ry" \| "vt"` |  | CSK discipline section (overrides variant) |
| `vtClass?` | `"m" \| "a" \| "b" \| "c"` |  | VT class (overrides variant and section) |
| `size?` | `"sm" \| "md"` | `md` | Size of the badge |
| `pill?` | `boolean` | `false` | Use pill shape (fully rounded) |
| `icon?` | `ReactNode` |  | Optional icon to display before content |
| `children?` | `ReactNode` |  | Badge content |

### Avatar

Zdroj: `src/components/Avatar/Avatar.tsx`

Avatar component for displaying user profile images, initials, or icons.

Features:
- Image with fallback to initials or icon
- Multiple sizes and shape variants
- Status indicator support
- CSK section colors (DV, RY, VT)

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `src?` | `string` |  | Image source URL |
| `alt?` | `string` |  | Alt text for the image (required for accessibility) |
| `initials?` | `string` |  | Initials to display when no image is provided or image fails to load |
| `name?` | `string` |  | Full name to generate initials from (alternative to initials prop) |
| `size?` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl"` | `md` | Size of the avatar |
| `shape?` | `"circular" \| "rounded" \| "square" \| "portrait"` | `circular` | Shape. `square` is for event and club logos, `portrait` (5 : 7, width from `size`, e.g. md 40 × 56) for upright event posters and logos; both contain the image, never crop it |
| `ring?` | `boolean` | `false` | Ring around the avatar (profile header); on `data-tone="on-dark"` it turns translucent white |
| `color?` | `"default" \| "primary" \| "success" \| "warning" \| "error" \| "info" \| "dv" \| "ry" \| "vt"` | `default` | Background color for initials/fallback |
| `icon?` | `ReactNode` |  | Custom icon to display as fallback |
| `status?` | `"online" \| "offline" \| "busy" \| "away"` |  | Status indicator (online, offline, busy, away) |
| `className?` | `string` |  | Additional CSS class |

### AvatarGroup

Zdroj: `src/components/Avatar/Avatar.tsx`

AvatarGroup component for displaying a stack of avatars.
Shows a "+N" indicator when there are more avatars than the max.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `max?` | `number` | `5` | Maximum number of avatars to display before showing +N indicator |
| `size?` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl"` | `md` | Size of avatars in the group |
| `spacing?` | `"tight" \| "normal" \| "loose"` | `normal` | Spacing between avatars (overlap amount) |
| `children` | `ReactNode` |  | Children (Avatar components) |
| `className?` | `string` |  | Additional CSS class |

### Icon

Zdroj: `src/components/Icon/Icon.tsx`

Icon component - unified icon system for the design system

Uses Lucide React icons with semantic naming (`calendar`, `clock`, `star`, ...).

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `name` | `"x" \| "arrow-right" \| "chevron-down" \| "chevron-right" \| "chevron-up" \| "search" \| "close" \| "download" \| "edit" \| "external-link" \| "plus" \| "print" \| "refresh" \| "send" \| "share" \| "trash" \| "alert" \| "alert-circle" \| "alert-triangle" \| "warning" \| "danger" \| "x-circle" \| "check-circle" \| "check" \| "info" \| "bell" \| "file" \| "file-text" \| "grid" \| "cards" \| "list" \| "map" \| "map-pin" \| "location" \| "activity" \| "calendar" \| "clock" \| "play-circle" \| "trend-up" \| "medal" \| "star" \| "trophy" \| "cup" \| "world-champion" \| "national-champion" \| "race" \| "building" \| "globe" \| "graduation-cap" \| "mail" \| "phone" \| "user" \| "user-plus" \| "user-search" \| "users" \| "users-team" \| "credit-card" \| "payment" \| "chart" \| "clipboard-check" \| "fullscreen" \| "exit-fullscreen" \| "pin" \| "unpin" \| "promotion" \| "transfer" \| "medical"` |  | Icon name from the design system catalog |
| `size?` | `number \| "sm" \| "md" \| "lg" \| "xl"` | `md` | Icon size - defaults to 20 (medium) |
| `filled?` | `boolean` |  | Fill the glyph with currentColor (e.g. the "on" state of a star) |
| `className?` | `string` |  | Additional CSS class |
| `aria-label?` | `string` |  | Accessible label for screen readers |

### Table

Zdroj: `src/components/Table/Table.tsx`

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `columns` | `ColumnDef<T>[]` |  | Array of column definitions |
| `data` | `T[]` |  | Array of data objects |
| `variant?` | `"default" \| "striped" \| "bordered"` |  | Visual variant |
| `size?` | `"sm" \| "md" \| "lg"` |  | Table size |
| `rowKey?` | `string \| number \| symbol \| ((row: T, index: number) => string \| number)` |  | Row key accessor for React keys |
| `selectable?` | `boolean` |  | Whether to enable row selection |
| `selectedKeys?` | `Set<string \| number>` |  | Selected row keys |
| `onSelectionChange?` | `((selectedKeys: Set<string \| number>) => void)` |  | Callback when selection changes |
| `stickyHeader?` | `boolean` |  | Enable sticky header |
| `hoverable?` | `boolean` |  | Enable hover effect on rows |
| `emptyState?` | `ReactNode` |  | Custom empty state content |
| `loading?` | `boolean` |  | Loading state |
| `caption?` | `string` |  | Caption for accessibility |
| `captionVisible?` | `boolean` |  | Show caption visually |
| `defaultSortKey?` | `string` |  | Initial sort column key |
| `defaultSortDirection?` | `SortDirection` |  | Initial sort direction |
| `onSortChange?` | `((key: string \| null, direction: SortDirection) => void)` |  | Callback when sort changes (for controlled sorting) |
| `sortKey?` | `string \| null` |  | Controlled sort key |
| `sortDirection?` | `SortDirection` |  | Controlled sort direction |
| `rankKey?` | `string \| number \| symbol` |  | Key to use for rank-based highlighting (highlights rows where this value is 1, 2, or 3) |
| `ref?` | `ForwardedRef<HTMLTableElement>` |  |  |

### Td

Zdroj: `src/components/Table/Table.tsx`

_Bez vlastních props._

### Th

Zdroj: `src/components/Table/Table.tsx`

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `sortDirection?` | `SortDirection` |  | Sort state |
| `sortable?` | `boolean` |  | Whether this column is sortable |
| `onSort?` | `(() => void)` |  | Click handler for sort |

### Modal

Zdroj: `src/components/Modal/Modal.tsx`

Modal component for dialogs, confirmations, and overlays.

Features:
- Multiple sizes (sm, md, lg, xl, full)
- Style variants (default, danger)
- Backdrop blur effect
- Slide-in animation
- Focus trap for accessibility
- Keyboard navigation (Escape to close)
- Backdrop click to close (optional)
- Portal rendering for proper stacking
- WCAG 2.1 AA compliant (role="dialog", aria-modal, focus management)

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `open` | `boolean` |  | Whether the modal is open |
| `onClose` | `() => void` |  | Callback when the modal should close |
| `title?` | `ReactNode` |  | Modal title |
| `description?` | `ReactNode` |  | Modal description (appears below title) |
| `size?` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `md` | Size of the modal |
| `styleVariant?` | `"default" \| "danger"` | `default` | Style variant of the modal |
| `closeOnBackdropClick?` | `boolean` | `true` | Whether clicking the backdrop closes the modal |
| `closeOnEscape?` | `boolean` | `true` | Whether pressing Escape closes the modal |
| `showCloseButton?` | `boolean` | `true` | Whether to show the close button |
| `footer?` | `ReactNode` |  | Footer content (typically action buttons) |
| `scrollable?` | `boolean` | `false` | Whether the modal content should scroll |
| `aria-labelledby?` | `string` |  | Custom aria-labelledby (defaults to auto-generated title id) |
| `aria-describedby?` | `string` |  | Custom aria-describedby |
| `children?` | `ReactNode` |  | Children content |

### Dropdown

Zdroj: `src/components/Dropdown/Dropdown.tsx`

Dropdown component for menus and action lists.

Features:
- Multiple positions (bottom-start, bottom-end, top-start, top-end)
- Controlled and uncontrolled modes
- Keyboard navigation (Arrow keys, Enter, Escape)
- Focus management
- Outside click to close
- Portal rendering for proper stacking
- WCAG 2.1 AA compliant

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `trigger` | `ReactNode` |  | Trigger element that opens the dropdown |
| `items` | `DropdownItem[]` |  | Dropdown menu items |
| `position?` | `"bottom-start" \| "bottom-end" \| "top-start" \| "top-end"` | `bottom-start` | Position of the dropdown relative to trigger |
| `size?` | `"sm" \| "md" \| "lg"` | `md` | Size of the dropdown |
| `open?` | `boolean` |  | Whether the dropdown is open (controlled mode) |
| `onOpenChange?` | `((open: boolean) => void)` |  | Callback when open state changes |
| `minWidth?` | `number \| "trigger"` | `trigger` | Minimum width of the dropdown (defaults to trigger width) |
| `maxHeight?` | `number` | `300` | Maximum height before scrolling |
| `disabled?` | `boolean` | `false` | Whether to disable the dropdown |
| `aria-label?` | `string` | `Menu` | Accessible label for the menu |

### DropdownButton

Zdroj: `src/components/Dropdown/Dropdown.tsx`

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `children` | `ReactNode` |  | Button label |
| `size?` | `"sm" \| "md" \| "lg"` | `md` | Size of the button |
| `variant?` | `"default" \| "primary" \| "ghost"` | `default` | Variant styling |
| `open?` | `boolean` |  | Whether dropdown is open (for chevron rotation) |

### ToastProvider

Zdroj: `src/components/Toast/Toast.tsx`

ToastProvider component that manages toast notifications.

Features:
- Multiple variants (default, success, warning, error, info)
- Configurable position (6 positions)
- Auto-dismiss with configurable duration
- Progress bar visualization
- Pause on hover
- Action buttons
- WCAG 2.1 AA compliant (role="alert", aria-live)
- Stacking with max visible limit
- Slide-in/out animations

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `children` | `ReactNode` |  | Children components |
| `position?` | `"top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right"` | `bottom-right` | Default position for toasts |
| `duration?` | `number` | `5000` | Default duration for toasts (ms) |
| `maxToasts?` | `number` | `5` | Maximum number of visible toasts |
| `styleVariant?` | `"default"` | `default` | Default style variant |
| `showProgress?` | `boolean` | `true` | Whether to show progress bar by default |

### Pagination

Zdroj: `src/components/Pagination/Pagination.tsx`

Pagination component for navigating through pages of content.

Supports multiple variants (default, simple, minimal),
sizes (sm, md, lg), and configurable navigation buttons.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `currentPage` | `number` |  | Current page number (1-indexed) |
| `totalPages` | `number` |  | Total number of pages |
| `onPageChange` | `(page: number) => void` |  | Callback when page changes |
| `variant?` | `"default" \| "simple" \| "minimal"` | `default` | Visual variant |
| `size?` | `"sm" \| "md" \| "lg"` | `md` | Size of pagination controls |
| `siblingCount?` | `number` | `1` | Number of page buttons to show on each side of current page |
| `boundaryCount?` | `number` | `1` | Number of page buttons to always show at start and end |
| `showFirstLast?` | `boolean` | `true` | Show first/last page buttons |
| `showPrevNext?` | `boolean` | `true` | Show previous/next buttons |
| `labels?` | `{ first?: ReactNode; previous?: ReactNode; next?: ReactNode; last?: ReactNode; page?: ((page: number) => string); }` | `{}` | Custom labels for navigation buttons |
| `disabled?` | `boolean` | `false` | Disable all controls |
| `ariaLabel?` | `string` | `Navigace stránkování` | Accessible label for the navigation |

### Progress

Zdroj: `src/components/Progress/Progress.tsx`

Progress component for displaying progress indicators.

Supports two variants:
- `bar`: Traditional progress bar with percentage
- `steps`: Step-by-step wizard progress

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `variant?` | `"steps" \| "bar"` |  | Progress variant |
| `value` | `number` |  | Current progress value (0-100) |
| `max?` | `number` | `100` | Maximum value (default 100) |
| `size?` | `"sm" \| "md" \| "lg"` | `md` | Size of the progress bar Size of the step indicators |
| `color?` | `"primary" \| "success" \| "warning" \| "error" \| "info"` | `primary` | Color theme |
| `showLabel?` | `boolean` | `false` | Show percentage label |
| `labelFormat?` | `((value: number, max: number) => string)` |  | Custom label format |
| `striped?` | `boolean` | `false` | Show striped animation |
| `animated?` | `boolean` | `false` | Animate the stripes |
| `indeterminate?` | `boolean` | `false` | Use indeterminate loading state |
| `ariaLabel?` | `string` | `Kroky procesu` | Accessible label |
| `steps` | `ProgressStep[]` |  | Steps configuration |
| `currentStep` | `number` |  | Current active step (0-indexed) |
| `orientation?` | `"horizontal" \| "vertical"` | `horizontal` | Orientation of the steps |
| `clickable?` | `boolean` | `false` | Allow clicking on completed steps |
| `onStepClick?` | `((stepIndex: number) => void)` |  | Callback when a step is clicked |

### Skeleton

Zdroj: `src/components/Skeleton/Skeleton.tsx`

Skeleton component for displaying loading placeholders.

Used to indicate content is loading while maintaining layout structure.

Variants:
- text: For text lines with optional multi-line support
- circular: For avatars and icons
- rectangular: For images and cards
- rounded: For buttons and badges

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `variant?` | `"text" \| "circular" \| "rectangular" \| "rounded"` | `text` | Shape variant of the skeleton |
| `animation?` | `"pulse" \| "wave" \| "none"` | `pulse` | Animation type |
| `width?` | `string \| number` |  | Width of the skeleton (CSS value or number in px) |
| `height?` | `string \| number` |  | Height of the skeleton (CSS value or number in px) |
| `borderRadius?` | `string` |  | Border radius for rectangular variant (CSS value) |
| `lines?` | `number` | `3` | Number of lines for text variant |
| `lineGap?` | `string \| number` | `8` | Gap between lines for text variant |
| `lastLineWidth?` | `string \| number` | `80%` | Whether the last line should be shorter (for text variant) |

### SkeletonAvatar

Zdroj: `src/components/Skeleton/Skeleton.tsx`

SkeletonAvatar component for avatar placeholders.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `size?` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `md` | Avatar size |
| `animation?` | `"pulse" \| "wave" \| "none"` | `pulse` | Animation type |
| `borderRadius?` | `string` |  | Border radius for rectangular variant (CSS value) |
| `lines?` | `number` | `3` | Number of lines for text variant |
| `lineGap?` | `string \| number` | `8` | Gap between lines for text variant |
| `lastLineWidth?` | `string \| number` | `80%` | Whether the last line should be shorter (for text variant) |

### SkeletonButton

Zdroj: `src/components/Skeleton/Skeleton.tsx`

SkeletonButton component for button placeholders.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `size?` | `"sm" \| "md" \| "lg"` | `md` | Button size |
| `animation?` | `"pulse" \| "wave" \| "none"` | `pulse` | Animation type |
| `width?` | `string \| number` |  | Width of the skeleton (CSS value or number in px) |
| `height?` | `string \| number` |  | Height of the skeleton (CSS value or number in px) |
| `borderRadius?` | `string` |  | Border radius for rectangular variant (CSS value) |
| `lines?` | `number` | `3` | Number of lines for text variant |
| `lineGap?` | `string \| number` | `8` | Gap between lines for text variant |
| `lastLineWidth?` | `string \| number` | `80%` | Whether the last line should be shorter (for text variant) |

### SkeletonCard

Zdroj: `src/components/Skeleton/Skeleton.tsx`

SkeletonCard component for card placeholders with common layout.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `animation?` | `"pulse" \| "wave" \| "none"` | `pulse` | Animation type |
| `hasImage?` | `boolean` | `true` | Show image placeholder |
| `imageHeight?` | `number` | `200` | Image height |
| `lines?` | `number` | `3` | Number of text lines |
| `hasAvatar?` | `boolean` | `false` | Show avatar |
| `hasActions?` | `boolean` | `false` | Show action buttons |

### SkeletonTable

Zdroj: `src/components/Skeleton/Skeleton.tsx`

SkeletonTable component for table placeholders.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `animation?` | `"pulse" \| "wave" \| "none"` | `pulse` | Animation type |
| `rows?` | `number` | `5` | Number of rows |
| `columns?` | `number` | `4` | Number of columns |
| `hasHeader?` | `boolean` | `true` | Show header row |

### SkeletonText

Zdroj: `src/components/Skeleton/Skeleton.tsx`

SkeletonText component for text placeholder with predefined heights.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `fontSize?` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `md` | Font size to match (determines height) |
| `animation?` | `"pulse" \| "wave" \| "none"` | `pulse` | Animation type |
| `width?` | `string \| number` |  | Width of the skeleton (CSS value or number in px) |
| `height?` | `string \| number` |  | Height of the skeleton (CSS value or number in px) |
| `borderRadius?` | `string` |  | Border radius for rectangular variant (CSS value) |
| `lines?` | `number` | `3` | Number of lines for text variant |
| `lineGap?` | `string \| number` | `8` | Gap between lines for text variant |
| `lastLineWidth?` | `string \| number` | `80%` | Whether the last line should be shorter (for text variant) |

### EmptyState

Zdroj: `src/components/EmptyState/EmptyState.tsx`

EmptyState component for displaying when no data or results are available.

Common use cases:
- No search results
- Empty table/list
- No events in calendar
- First-time user onboarding

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `title?` | `string` |  | Title text |
| `description?` | `string` |  | Description text |
| `icon?` | `ReactNode` |  | Custom icon to display |
| `size?` | `"sm" \| "md" \| "lg"` | `md` | Size of the empty state |
| `variant?` | `"default" \| "card" \| "inline"` | `default` | Visual variant |
| `action?` | `ReactNode` |  | Primary action button/element |
| `secondaryAction?` | `ReactNode` |  | Secondary action button/element |
| `illustration?` | `ReactNode` |  | Custom illustration or image |
| `hideIcon?` | `boolean` | `false` | Hide the default icon when no custom icon is provided |

### Dropzone

Zdroj: `src/components/Dropzone/Dropzone.tsx`

Dropzone component for file uploads with drag & drop support.

Supports file type validation, size limits, multiple files,
image previews, and progress indicators.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `accept?` | `string` |  | Accepted file types (MIME types or extensions) |
| `multiple?` | `boolean` | `false` | Allow multiple files |
| `maxSize?` | `number` |  | Maximum file size in bytes |
| `maxFiles?` | `number` |  | Maximum number of files |
| `size?` | `"sm" \| "md" \| "lg"` | `md` | Dropzone size |
| `state?` | `"default" \| "error" \| "success"` | `default` | Validation state |
| `disabled?` | `boolean` | `false` | Disabled state |
| `showPreviews?` | `boolean` | `true` | Show file previews |
| `label?` | `string` |  | Custom label text |
| `hint?` | `string` |  | Custom hint text |
| `errorMessage?` | `string` |  | Error message |
| `files?` | `DropzoneFile[]` | `[]` | Currently selected files |
| `onFilesChange?` | `((files: DropzoneFile[]) => void)` |  | Callback when files are selected/dropped |
| `onFileRemove?` | `((file: DropzoneFile) => void)` |  | Callback when a file is removed |
| `onError?` | `((error: string) => void)` |  | Callback for validation errors |
| `icon?` | `ReactNode` |  | Custom icon render |
| `children?` | `ReactNode` |  | Custom content render |

### Timeline

Zdroj: `src/components/Timeline/Timeline.tsx`

Timeline component for displaying chronological events or workflow steps.

Use cases:
- Registration history
- Event schedule
- Application status tracking
- Activity feed

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `items` | `TimelineItem[]` |  | Timeline items to display |
| `variant?` | `"default" \| "compact" \| "card"` | `default` | Visual variant |
| `size?` | `"sm" \| "md" \| "lg"` | `md` | Size of the timeline |
| `color?` | `"default" \| "primary" \| "success" \| "warning" \| "error" \| "info"` | `default` | Default color for items without explicit color |
| `showConnector?` | `boolean` | `true` | Show connector lines between items |
| `reverse?` | `boolean` | `false` | Reverse the order (newest first vs oldest first) |
| `alternate?` | `boolean` | `false` | Alternate items left/right (only for default variant on larger screens) |
| `ariaLabel?` | `string` | `Časová osa` | Accessible label |
| `onItemClick?` | `((item: TimelineItem, index: number) => void)` |  | Callback when an item is clicked |

### Wizard

Zdroj: `src/components/Wizard/Wizard.tsx`

Wizard/Stepper component for multi-step processes like registration,
onboarding, or checkout flows.

Features:
- Horizontal and vertical layouts
- Active/completed/pending step states
- Connector lines between steps
- Section color variants (dv, ry, vt)
- Responsive: hides labels on mobile
- Optional step click navigation

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `steps` | `WizardStep[]` |  | Array of step definitions |
| `activeStep` | `string \| number` |  | Currently active step (id or index) |
| `completedSteps?` | `string[]` |  | Array of completed step ids |
| `section?` | `"dv" \| "ry" \| "vt" \| "generic"` |  | Section color variant |
| `variant?` | `"horizontal" \| "vertical"` | `horizontal` | Layout variant |
| `size?` | `"sm" \| "md" \| "lg"` | `md` | Size variant |
| `className?` | `string` |  | Additional CSS class |
| `onStepClick?` | `((stepId: string, index: number) => void)` |  | Click handler for step navigation |

### Calendar

Zdroj: `src/components/Calendar/Calendar.tsx`

Calendar component for displaying events in a grid format.

Supports month view with event display, navigation controls,
and CSK-specific section colors for disciplines.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `date?` | `Date` |  | Currently displayed date (controls which month/week is shown) |
| `defaultDate?` | `Date` |  | Default date when uncontrolled |
| `onDateChange?` | `((date: Date) => void)` |  | Callback when date changes (month/week navigation) |
| `view?` | `"month" \| "week"` | `month` | View mode |
| `size?` | `"sm" \| "md" \| "lg"` | `md` | Calendar size |
| `styleVariant?` | `"default" \| "embed"` | `default` | Style variant for visual appearance |
| `events?` | `CalendarEvent[]` | `[]` | Events to display |
| `onEventClick?` | `((event: CalendarEvent) => void)` |  | Callback when an event is clicked |
| `onDayClick?` | `((date: Date) => void)` |  | Callback when a day is clicked |
| `onEventHover?` | `((event: CalendarEvent \| null, element?: HTMLElement) => void)` |  | Callback when hovering over an event |
| `locale?` | `string` | `cs-CZ` | Locale for date formatting (default: 'cs-CZ') |
| `firstDayOfWeek?` | `0 \| 1` | `1` | First day of week (0 = Sunday, 1 = Monday, default: 1) |
| `renderEvent?` | `((event: CalendarEvent) => ReactNode)` |  | Custom render function for events |
| `showNavigation?` | `boolean` | `true` | Show navigation controls |
| `showTodayButton?` | `boolean` | `true` | Show today button |
| `maxEventsPerDay?` | `number` | `3` | Maximum events to show per day before "+N more" |
| `highlightToday?` | `boolean` | `true` | Highlight today |
| `showEventPreview?` | `boolean` | `false` | Show event preview tooltip on hover |
| `animated?` | `boolean` | `true` | Enable animated transitions |
| `showLive?` | `boolean` | `false` | Show live indicator for events with data.isLive |
| `weekendShowcase?` | `boolean` | `false` | Weekend showcase layout - the recommended layout for sports calendars. Weekdays are minimized (compact columns with event dots). Weekend days are prominent (large cards with full event details). Ideal for canoe racing calendars where 90% of events are on weekends. |

### CalendarList

Zdroj: `src/components/Calendar/CalendarList.tsx`

CalendarList component - displays events as a chronological list.

Alternative view to the grid Calendar, useful for embed contexts
and mobile views where vertical list is more appropriate.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `events` | `CalendarEvent[]` |  | Events to display in the list |
| `variant?` | `"default" \| "compact"` | `default` | Visual variant |
| `styleVariant?` | `"default" \| "embed"` | `default` | Style variant for visual appearance |
| `groupBy?` | `"month" \| "none" \| "day"` | `none` | Group events by day/month |
| `maxEvents?` | `number` |  | Maximum number of events to show (for pagination) |
| `onEventClick?` | `((event: CalendarEvent) => void)` |  | Callback when an event is clicked |
| `renderEvent?` | `((event: CalendarEvent) => ReactNode)` |  | Custom render function for events |
| `locale?` | `string` | `cs-CZ` | Locale for date formatting (default: 'cs-CZ') |
| `showEndDate?` | `boolean` | `true` | Show event end date if different from start |
| `showSection?` | `boolean` | `true` | Show section badges |
| `emptyMessage?` | `ReactNode` | `Žádné nadcházející události` | Empty state message |
| `title?` | `string` |  | Title for the list |
| `showViewAll?` | `boolean` | `false` | Show "View all" link |
| `onViewAllClick?` | `(() => void)` |  | Callback for "View all" click |
| `showLive?` | `boolean` | `false` | Show live indicator for events with data.isLive |

## Navigace a stránka

### Header

Zdroj: `src/components/Header/Header.tsx`

Header component for application headers.

Variants:
- `site`: navy band of kanoe.cz (48 px), followed by a `Subbar`
- `satellite`: standalone application with a link back to kanoe.cz
- `app`: compact 44 px bar for the office (application, club, user)

Navigation collapses into a drawer below 768 px (not for `satellite`).

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `brand?` | `ReactNode` |  | Logo or brand element |
| `navigation?` | `ReactNode` |  | Primary navigation element (links; `aria-current="page"` marks the active one) |
| `search?` | `ReactNode` |  | Search input or search trigger |
| `userMenu?` | `ReactNode` |  | User menu or avatar |
| `actions?` | `ReactNode` |  | Additional actions (e.g., notifications, settings) |
| `variant?` | `"site" \| "satellite" \| "app"` | `site` | Visual variant |
| `sticky?` | `boolean` | `false` | Whether header is sticky |
| `showMobileToggle?` | `boolean` | `true` | Whether to show mobile menu toggle (always off for `satellite`) |
| `mobileToggleLabel?` | `string` | `Menu` | Label for mobile toggle (accessibility) |
| `onMobileMenuChange?` | `((isOpen: boolean) => void)` |  | Callback when mobile menu state changes |
| `mobileMenuContent?` | `ReactNode` |  | Content for mobile menu drawer |
| `maxWidth?` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `full` | Maximum width constraint of the content |
| `appName?` | `string` |  | Application name (`satellite` and `app`) |
| `club?` | `ReactNode` |  | Club the user acts for (`app`), shown before the user menu |
| `homeLink?` | `string` | `https://kanoe.cz` | Link to main website for satellite variant (e.g., kanoe.cz) |
| `homeLinkLabel?` | `string` | `Zpět na kanoe.cz` | Label for home link |

### Subbar

Zdroj: `src/components/Subbar/Subbar.tsx`

Secondary band below `Header variant="site"` (action blue, 40 px).
Scrolls horizontally when the items do not fit.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `items` | `SubbarItem[]` |  | Section links |
| `maxWidth?` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `full` | Maximum width of the content (matches Header `maxWidth`) |

### Breadcrumbs

Zdroj: `src/components/Breadcrumbs/Breadcrumbs.tsx`

Breadcrumbs: location in the site hierarchy (13 px, muted, "/" separators).

Features:
- Automatic collapsing for long paths
- Custom separator support
- Accessible (aria-label, aria-current)
- Custom link renderer for router integration

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `items` | `BreadcrumbItem[]` |  | Array of breadcrumb items |
| `separator?` | `ReactNode` |  | Custom separator between items (default: /) |
| `maxItems?` | `number` | `0` | Maximum number of items to show before collapsing |
| `collapsedLabel?` | `string` | `…` | Label for collapsed items button |
| `renderLink?` | `((item: BreadcrumbItem, children: ReactNode) => ReactNode)` |  | Custom render function for links |

### PageTitle

Zdroj: `src/components/PageTitle/PageTitle.tsx`

Page heading with meta row and actions on the right. Replaces HeroSection.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `title` | `ReactNode` |  | The heading text |
| `as?` | `"h1" \| "h2"` | `h1` | Heading element (default `h1`) |
| `size?` | `"md" \| "lg"` | `lg` | `lg` 36 px (event, profile), `md` 24 px (office) |
| `variant?` | `"plain" \| "bar"` | `plain` | `plain` sits inside the page content, `bar` is a full-width white band with a bottom rule |
| `breadcrumbs?` | `ReactNode` |  | Breadcrumbs shown above the title |
| `logo?` | `ReactNode` |  | Square logo or avatar in front of the text block |
| `badges?` | `ReactNode` |  | Badge row above the title (section, level, live, data age) |
| `titleBefore?` | `ReactNode` |  | Inline content before the title (e.g. section badges in the office) |
| `titleAfter?` | `ReactNode` |  | Inline content after the title (e.g. status badge) |
| `meta?` | `ReactNode` |  | Meta row below the title (date, place, organiser, entries) |
| `aside?` | `ReactNode` |  | Secondary information on the right (e.g. deadline) |
| `actions?` | `ReactNode` |  | Actions on the right (buttons) |

### PageLayout

Zdroj: `src/components/PageLayout/PageLayout.tsx`

PageLayout provides the page structure: header area, optional banner,
centered content and footer.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `variant?` | `"tribuna" \| "urad" \| "embed"` | `tribuna` | Layout variant determines the surface and which slots render |
| `header?` | `ReactNode` |  | Header area, e.g. `<Header />` followed by `<Subbar />` (hidden in embed) |
| `banner?` | `ReactNode` |  | Full-width band between header and content, e.g. `<PageTitle variant="bar" />` (hidden in embed) |
| `bottomBar?` | `ReactNode` |  | Phone navigation after the content, e.g. `<BottomBar />` (hidden in embed) |
| `footer?` | `ReactNode` |  | Footer content (hidden in embed) |
| `children` | `ReactNode` |  | Main content |
| `maxWidth?` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `xl` | Maximum width of the content container (exposed as `--csk-page-max-width`) |
| `padded?` | `boolean` | `true` | Add side padding to the main content area (16 px phone, 24 px desktop) |
| `stickyHeader?` | `boolean` | `true` | Keep the header area at the top while scrolling |

### BottomBar

Zdroj: `src/components/BottomBar/BottomBar.tsx`

Bottom navigation for phones (60 px, 44 px touch targets).
Hidden when the container is 768 px or wider: the wrapper is a size container,
so the bar also behaves in narrow embeds on a wide viewport.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `items` | `BottomBarItem[]` |  | Navigation items (4 fit comfortably at 390 px) |
| `sticky?` | `boolean` | `false` | Stick to the bottom of the scrolling viewport |

### Tabs

Zdroj: `src/components/Tabs/Tabs.tsx`

Tabs component for organizing content into switchable panels.

Features:
- Three variants: line, pills, nav (navigation chips without panels)
- Two sizes: sm, md
- Overflow handling: wrap, scroll, carousel (edge mask, arrows, active tab scrolled into view)
- Animated underline for the line variant
- Full width option for equal tab widths
- Keyboard navigation (Arrow keys, Home, End)
- WCAG 2.1 AA compliant (role="tablist", aria-selected, focus management)
- Controlled and uncontrolled modes

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `tabs` | `TabItem[]` |  | Array of tab items |
| `activeTab?` | `string` |  | Currently active tab ID (controlled) |
| `defaultActiveTab?` | `string` |  | Default active tab ID (uncontrolled) |
| `onChange?` | `((tabId: string) => void)` |  | Callback when active tab changes |
| `variant?` | `"line" \| "pills" \| "nav"` | `line` | Visual variant |
| `size?` | `"sm" \| "md"` | `md` | Size of the tabs |
| `fullWidth?` | `boolean` | `false` | Whether tabs should stretch to fill container width |
| `orientation?` | `"horizontal"` | `horizontal` | Orientation - currently only horizontal is supported |
| `overflow?` | `"wrap" \| "scroll" \| "carousel"` | `wrap` | What happens when the tabs do not fit: `wrap` (default) wraps to more lines, `scroll` scrolls horizontally, `carousel` scrolls with an edge mask and arrows and keeps the active tab in view. |
| `previousLabel?` | `string` | `Předchozí` | Accessible label of the previous arrow (carousel only) |
| `nextLabel?` | `string` | `Další` | Accessible label of the next arrow (carousel only) |

### FilterPills

Zdroj: `src/components/FilterPills/FilterPills.tsx`

FilterPills component for displaying active filters with remove functionality.

Pills match the reference `.pill` (34 / 30 px high, active = navy). A pill is a
toggle (`onFilterToggle`, `aria-pressed`), can be dismissible ("U18 ✕") and a "clear all"
option resets all filters at once.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `filters` | `FilterPill[]` |  | Array of active filters to display |
| `searchQuery?` | `string` |  | Optional search query to display as a filter |
| `searchLabel?` | `string` | `Hledání` | Label prefix for search filter |
| `onFilterToggle?` | `((key: string) => void)` |  | Callback when a pill is toggled; renders the label as a toggle button (`aria-pressed`) |
| `onRemove?` | `((key: string) => void)` |  | Callback when a filter is removed |
| `onClearSearch?` | `(() => void)` |  | Callback when search is cleared |
| `onClearAll?` | `(() => void)` |  | Callback when all filters are cleared |
| `clearAllLabel?` | `string` | `Zrušit vše` | Label for clear all button |
| `size?` | `"sm" \| "md"` | `md` | Size: md = 34 px, sm = 30 px high |
| `bordered?` | `boolean` | `false` | Show separator line at top |
| `hideWhenEmpty?` | `boolean` | `true` | Hide if no filters are active |

### SegmentedControl

Zdroj: `src/components/SegmentedControl/SegmentedControl.tsx`

Radiogroup of mutually exclusive segments. Arrow keys move and select,
Home/End jump to the ends. Labels never wrap; when the row runs out of
space the whole segment moves to the next line.
Give the group an accessible name via `aria-label` or `aria-labelledby`.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `items` | `SegmentedControlItem[]` |  | Segments (days, view, round…) |
| `value` | `string` |  | Selected value (state is owned by the app) |
| `onChange` | `(value: string) => void` |  |  |
| `size?` | `"sm" \| "md"` | `md` |  |

### TableToolbar

Zdroj: `src/components/TableToolbar/TableToolbar.tsx`

Container for search + pills + favourites toggle + detail switch above a table.

One row while the search keeps at least 10rem (160 px). When the controls do not fit next to it
(390 px phone with round, category, ★ and "Detailní"), they move as a group to the next row and the
search takes the full first row; inside the group each control keeps its width and wraps whole.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `aria-label?` | `string` |  | Defines a string value that labels the current element. @see aria-labelledby. |
| `aria-labelledby?` | `string` |  | Identifies the element (or elements) that labels the current element. @see aria-describedby. |
| `search?` | `ReactNode` |  | Search field; grows to take the remaining width, never narrower than 10rem (e.g. SearchInput) |
| `children?` | `ReactNode` |  | Filter pills (TableToolbarButton); labels never wrap |
| `favorites?` | `ReactNode` |  | Favourites toggle (FavoritesToggle) |
| `detail?` | `ReactNode` |  | "Detailní" switch |

### TableToolbarButton

Zdroj: `src/components/TableToolbar/TableToolbar.tsx`

Pill button for the toolbar: 34 px visible, 44 px touch target, nowrap label.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `pressed?` | `boolean` |  | Sets aria-pressed and the selected look when defined |

### CSKLogo

Zdroj: `src/components/CSKLogo/CSKLogo.tsx`

CSK (Český svaz kanoistů) logo component for consistent branding
across all CSK web properties.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `size?` | `"sm" \| "md" \| "lg"` | `md` | Size variant |
| `subtitle?` | `string` |  | Optional subtitle (hidden on small screens) |
| `href?` | `string` |  | Link URL when clickable |
| `className?` | `string` |  | Additional CSS class |

## Stavy a čísla

### StatusBadge

Zdroj: `src/components/StatusBadge/StatusBadge.tsx`

State of a value (official, provisional, in review, unknown, live, stale).

States never rely on colour alone: the label is always rendered, "provisional"
and "review" differ in shape too (filled square vs. outlined italic pill), and
"unknown" has a dashed frame. Red is reserved for `live`. The pulsing dot of
`live` is the only animation and is disabled by `prefers-reduced-motion`.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `state` | `"official" \| "provisional" \| "review" \| "unknown" \| "live" \| "stale"` |  | State of the value |
| `size?` | `"sm" \| "md"` | `md` | Size of the badge |
| `label?` | `ReactNode` |  | Overrides the default Czech label |

### MarkBadge

Zdroj: `src/components/MarkBadge/MarkBadge.tsx`

Outlined result mark (DNS, DNF, DSQ…) shown in place of a time.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `mark` | `"DNS" \| "DNS-A" \| "DNS-B" \| "DNF" \| "DSQ" \| "NR"` |  | Result mark. Rendered instead of a time, never next to it. |

### PenaltyChip

Zdroj: `src/components/PenaltyChip/PenaltyChip.tsx`

Penalty of one gate (or a team total). Colour is never the only carrier: the value is always shown.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `penalty` | `number \| null` |  | Penalty seconds. 0 = clean, 2 = touch, 50 = miss, `null` = not judged (never 0). Team totals are plain numbers. |
| `gate?` | `number` |  | Gate number, used for the accessible name |
| `upstream?` | `boolean` | `false` | Gate negotiated upstream (italic + underline) |
| `size?` | `"sm" \| "md"` | `md` |  |

### GateGrid

Zdroj: `src/components/GateGrid/GateGrid.tsx`

Wrapping grid of per-gate penalties.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `gates` | `GateGridGate[]` |  |  |
| `size?` | `"sm" \| "md"` | `md` |  |
| `unavailable?` | `boolean` | `false` | Course configuration is not available |

### BibBadge

Zdroj: `src/components/BibBadge/BibBadge.tsx`

Start number in a monospaced frame (20 px high).

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `bib` | `string \| number` |  | Start number |

### Notice

Zdroj: `src/components/Notice/Notice.tsx`

Static note. Never blocks anything around it (no disabling of nearby buttons).

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `tone?` | `"info" \| "ok" \| "warn" \| "error"` | `info` |  |
| `title?` | `ReactNode` |  |  |

### StatTile

Zdroj: `src/components/StatTile/StatTile.tsx`

Number tile: label, big value, optional hint and delta.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `label` | `ReactNode` |  |  |
| `value` | `ReactNode` |  |  |
| `hint?` | `ReactNode` |  | Small explanatory line under the value |
| `delta?` | `ReactNode` |  | Change indicator, e.g. "▲2" |

### TimeValue

Zdroj: `src/components/TimeValue/TimeValue.tsx`

A time or time difference in IBM Plex Mono with tabular digits; never wraps.
Renders the three `Observed` states: `known` as the number, `not-yet` and
`unavailable` alike as "not known".

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `value` | `number \| Observed<number> \| null` |  | Time in seconds, plain or as an `Observed<number>`. `null`, `not-yet` and `unavailable` all render as "not known" (—); a known `0` renders as `0.00`. |
| `precision?` | `1 \| 2` | `2` | Decimal places (default 2; running times use 1). |
| `variant?` | `"default" \| "best" \| "running" \| "stale" \| "muted"` | `default` | Visual state of the value (default `default`). |
| `align?` | `"decimal"` |  | `decimal`: integer part right-aligned in a 3ch box so stacked values line up on the decimal point. |
| `sign?` | `boolean` | `false` | Signed difference: `+1.53` / `−0.87`; zero stays unsigned (`0.00`). |
| `unknownLabel?` | `string` | `neznámo` | Screen-reader text for a value that is not known (default `neznámo`). |

### RunningTime

Zdroj: `src/components/RunningTime/RunningTime.tsx`

A running time that ticks locally between deliveries, only through the
injected `Clock` (`requestFrame`). It snaps to every new value and freezes
`staleAfterSeconds` after receipt, measured on the same clock; it then shows
the frozen value as stale with its age. When the athlete leaves the course,
render `TimeValue` instead (this component never decides a finish).

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `elapsedSeconds` | `number` |  | Last delivered running time in seconds (`running.elapsedSeconds`), shown as delivered. |
| `receivedAt` | `number` |  | When `elapsedSeconds` arrived, in the clock's time (`clock.now()` at receipt). A new value is a new `elapsedSeconds` and/or `receivedAt`; the display snaps to it. |
| `clock?` | `Clock` |  | Clock to tick with; defaults to the nearest `ClockProvider`, else the browser clock. |
| `staleAfterSeconds?` | `number` | `3` | Seconds past receipt after which the tick stops and the value shows as stale (default 3). |
| `precision?` | `1 \| 2` | `1` | Decimal places (default 1). |
| `align?` | `"decimal"` |  | Passed to `TimeValue`. |
| `showAge?` | `boolean` | `true` | Show the age next to a stale value (default true). |
| `ageLabel?` | `string` |  | Text before the age (default `''`: just „před 4 s“). |
| `formatAge?` | `((ageSeconds: number) => string)` |  | Relative phrase for the age, see `DataAge`. |
| `staleLabel?` | `string` | `zastaveno` | Screen-reader text for a stale value (default `zastaveno`). |

### DataAge

Zdroj: `src/components/DataAge/DataAge.tsx`

How old the shown data is, measured from its receipt on the injected clock,
optionally with connection liveness. Inline, one line, never a banner.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `receivedAt` | `number \| null` |  | When the data arrived, in the clock's time (`clock.now()` at receipt, epoch ms). Never the server's `observedAt`. `null` = nothing received yet. |
| `clock?` | `Clock` |  | Clock to measure age with; defaults to the nearest `ClockProvider`, else the browser clock. |
| `mode?` | `"relative" \| "absolute"` | `relative` | `relative` → „aktualizováno před 1 s“ (ticks every second), `absolute` → „stav ze 14:32:10“. |
| `connection?` | `"ok" \| "reconnecting" \| "offline"` |  | Connection liveness as a dot + text in the same line (never a banner). Omit for no dot. |
| `label?` | `string` |  | Text before the age; default `aktualizováno` (relative) / `stav ze` (absolute); `''` for none. |
| `connectionLabels?` | `Partial<Record<DataAgeConnection, string>>` |  | Override connection texts (defaults: ok „připojeno“ for screen readers only, „obnovuji spojení“, „bez spojení“). |
| `emptyLabel?` | `string` | `zatím bez dat` | Text when `receivedAt` is `null` (default „zatím bez dat“). |
| `formatAge?` | `((ageSeconds: number) => string)` |  | Relative phrase for an age in seconds (default Czech: „právě teď“, „před 5 s“, „před 2 min“). |
| `locale?` | `string` | `cs-CZ` | Locale of the absolute time (default `cs-CZ`). |
| `timeZone?` | `string` |  | IANA time zone of the absolute time (default: the viewer's). |

### StarButton

Zdroj: `src/components/StarButton/StarButton.tsx`

Star toggle: 22 px glyph inside a 44 x 44 px touch target.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `pressed` | `boolean` |  | Whether the item is a favourite (state is owned by the app) |
| `label` | `string` |  | Accessible name, e.g. "Oblíbený: HNILICA Lukas" |
| `onPressedChange?` | `((pressed: boolean) => void)` |  |  |

### FavoritesToggle

Zdroj: `src/components/FavoritesToggle/FavoritesToggle.tsx`

"★ 2" filter toggle: 34 px visible pill inside a 44 px touch target.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `pressed` | `boolean` |  | Whether the "favourites only" filter is on (state is owned by the app) |
| `count` | `number` |  | Number of favourites shown next to the star |
| `label` | `string` |  | Accessible name, e.g. "Jen oblíbení" (the count is appended) |
| `onPressedChange?` | `((pressed: boolean) => void)` |  |  |

### LiveIndicator

Zdroj: `src/components/LiveIndicator/LiveIndicator.tsx`

LiveIndicator component for displaying live status, recording state, or connection status.

Used in:
- Live results pages
- Real-time timing displays
- Connection status indicators
- Recording status

The indicator consists of a pulsing dot with optional label text.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `variant?` | `"default" \| "live" \| "recording" \| "offline" \| "connecting"` | `default` | Visual variant of the indicator |
| `size?` | `"sm" \| "md" \| "lg" \| "xl"` | `md` | Size of the indicator |
| `color?` | `"default" \| "primary" \| "success" \| "warning" \| "error" \| "info"` | `default` | Color variant (overridden by variant for special states) |
| `styleVariant?` | `"default" \| "badge"` | `default` | Style variant for different visual treatments |
| `pulse?` | `boolean` | `true` | Enable pulse animation |
| `label?` | `ReactNode` |  | Show text label next to indicator |
| `labelPosition?` | `"left" \| "right"` | `right` | Position of the label relative to the dot |
| `inline?` | `boolean` | `false` | Display as inline element |
| `glow?` | `boolean` | `false` | Show glow effect around the dot |
| `energyGlow?` | `boolean` | `false` | Use energy (coral-orange) color with dramatic glow effect |

## Živé výsledky

### EventHeader

Zdroj: `src/components/EventHeader/EventHeader.tsx`

Compact live header (about 95 px on a phone, one row when `condensed`).
Navy band over the full width; the content is aligned with the page container.
The title never wraps in the condensed state.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `title` | `ReactNode` |  | Event name |
| `subtitle?` | `ReactNode` |  | Place · day · phase (hidden when condensed) |
| `status?` | `ReactNode` |  | Status element, typically `<StatusBadge state="live" />` |
| `dataAge?` | `ReactNode` |  | Data age element, typically `<DataAge />` ("aktualizováno před 1 s") |
| `backHref?` | `string` |  | Link back to the event list; omitted = no back link |
| `backLabel?` | `string` | `Závody` | Text of the back link |
| `logo?` | `ReactNode` |  | Optional event logo (hidden when condensed), typically `<Avatar shape="square" />` (40 × 40) or `<Avatar shape="portrait" />` for an upright poster (40 × 56, 5 : 7). The slot follows the shape. |
| `condensed?` | `boolean` | `false` | One-row variant for a scrolled page: back · name · status · data age; the subtitle and the logo are hidden. The application decides when to switch (scroll position); the component only draws it. |
| `maxWidth?` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` |  | Width of the content inside the full-width navy band, on the scale of `PageLayout maxWidth`. Default: the content width of the surrounding `PageLayout` (CSS variable `--csk-page-max-width`), outside a PageLayout `--csk-layout-max-width` (1200 px, as PageTitle). Inner gutter 14 px, 24 px from a 768 px wide header. |

### ResultsPanel

Zdroj: `src/components/ResultsPanel/ResultsPanel.tsx`

Results panel: one outlined card with the table toolbar (search · filters · ★ · Detailní),
a status line (StatusBadge + text), the table and a footer (counts left, links right).
Layout only: every value and state (search text, favourites, expanded rows) is the application's.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `search?` | `ReactNode` |  | Toolbar: search field, typically `<SearchInput size="sm" fullWidth />` |
| `filters?` | `ReactNode` |  | Toolbar: filter pills (`TableToolbarButton`, `FilterPills dismissible`) |
| `favorites?` | `ReactNode` |  | Toolbar: favourites toggle (`FavoritesToggle`) |
| `detail?` | `ReactNode` |  | Toolbar: "Detailní" switch (`Switch size="sm"`); the application expands the rows |
| `toolbarLabel?` | `string` | `Nástroje tabulky` | Accessible name of the toolbar |
| `state?` | `"official" \| "provisional" \| "review" \| "unknown" \| "live" \| "stale"` |  | Status line: state of the shown results as a `StatusBadge` |
| `status?` | `ReactNode` |  | Status line: text after the badge ("po 2. jízdě · 8 z 24 v cíli", a `DataAge`) |
| `children` | `ReactNode` |  | The table: `ResultsTable`, `StartlistTable` or an `EmptyState` |
| `footer?` | `ReactNode` |  | Footer, left: counts ("Zobrazeno 11 z 88") |
| `footerLinks?` | `ReactNode` |  | Footer, right: links ("Oficiální PDF", "Na kanoe.cz") |
| `tone?` | `"default" \| "highlight"` |  | Tone of the frame (default `default`) |

### AthleteName

Zdroj: `src/components/ResultsTable/cells.tsx`

Two-line name cell (name + tag, club under it); never wraps, both lines end with an ellipsis.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `name` | `ReactNode` |  |  |
| `categoryTag?` | `ReactNode` |  | Short category tag after the name, e.g. `U16`. |
| `secondary?` | `ReactNode` |  | Second line: club, or state badge + note. Omitted = one line. |

### PenaltyText

Zdroj: `src/components/ResultsTable/cells.tsx`

Compact penalty after a stacked time: „(2)“; not judged „(·)“, never „(0)“.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `penalty` | `ObservedNumber \| undefined` |  | Penalty seconds; `undefined` renders nothing, `null` / not known renders „(·)“ (not judged). |
| `notJudgedLabel?` | `string` | `neposouzeno` | Screen-reader text for a penalty that is not judged yet (default `neposouzeno`). |

### RankValue

Zdroj: `src/components/ResultsTable/cells.tsx`

Rank in the display face; no rank (`not-yet` / `unavailable`) renders as a muted „·“.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `rank` | `Observed<number>` |  |  |
| `podium?` | `1 \| 2 \| 3` |  | Podium place: coloured number. |
| `sub?` | `ReactNode` |  | Small line under the rank, e.g. „3. celk.“. |
| `noRankLabel?` | `string` | `bez pořadí` | Screen-reader text when there is no rank (default `bez pořadí`). |

### ResultsTable

Zdroj: `src/components/ResultsTable/ResultsTable.tsx`

Results table v2 (live and official results, start list).

The data model is visual (`ResultRow`, `RunCell`, `Observed<T>`); the
application maps its contract onto it and sorts the rows. Mobile columns:
chevron · # · ★ · name + club · runs (stacked, position = run number) ·
result + gap. Desktop columns (container query from 640 px, or `density`):
+ club column, runs side by side with `PenaltyChip` after the time, separate
gap column. Times never wrap. A mark replaces the time. The table has no
sticky header and no overflow wrapper: sticky headers belong to the page.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `rows` | `ResultRow[]` |  | Rows in display order (the application sorts; marks usually last). |
| `columns?` | `"single" \| "pair" \| "startlist"` | `single` | Column set (default `single`). |
| `density?` | `"mobile" \| "desktop"` |  | Forces mobile or desktop columns; omitted = container query (desktop from 640 px of table width). |
| `expandedId?` | `ResultRowId \| readonly ResultRowId[] \| null` |  | Expanded row(s): one id, or several (e.g. a „Detailní“ view). |
| `onToggle?` | `((id: ResultRowId, row: ResultRow) => void)` |  | Row clicked anywhere (or its expand button activated). Enables the expand column. |
| `renderDetail?` | `((row: ResultRow) => ReactNode)` |  | Content of an expanded row (usually `RunDetail`); spans the full table width, no indentation. Returning `undefined` renders no detail row at all (the row looks expanded but adds nothing); return `null` or an element for an (empty) detail row. Called on every table render for expanded rows only, because the detail may depend on application state the table cannot see. |
| `onFavoriteChange?` | `((row: ResultRow, favorite: boolean) => void)` |  | Favourite star toggled. Enables the favourites column; the state stays in `row.favorite`. |
| `clock?` | `Clock` |  | Clock for running times (else the nearest `ClockProvider`). |
| `labels?` | `Partial<ResultsTableLabels>` |  | Overrides of the Czech texts. Values are compared one by one (`Object.is`), so inline strings keep the memoised rows. An inline array (`runLabels`) or inline JSX label is a new object on every render and re-renders all rows: define those outside the component or memoise them. |
| `caption?` | `ReactNode` |  | Table caption for screen readers (visually hidden). |
| `emptyState?` | `ReactNode` |  | Content of an empty table (default `labels.empty`). |

### RunDetail

Zdroj: `src/components/ResultsTable/RunDetail.tsx`

Content of an expanded results row: bib, ranks (class + category), state
and one block per run (time, penalty, total, gates). Runs stack on mobile
and sit side by side from 640 px of its own width. Spans the full width,
no left indentation.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `bib?` | `string \| number` |  | Start number. |
| `ranks?` | `RunDetailRank[]` |  | Ranks shown next to the bib: class + category. |
| `state?` | `"official" \| "provisional" \| "review" \| "unknown" \| "live" \| "stale"` |  | Value state of the result. |
| `runs` | `RunDetailRun[]` |  | Runs; mobile one under another, desktop side by side. |
| `actions?` | `ReactNode` |  | Links under the summary (profile, follow…). |
| `loading?` | `boolean` | `false` | Detail is being loaded lazily: skeleton instead of the runs. |
| `density?` | `"mobile" \| "desktop"` |  | Forces the layout; omitted = container query (side by side from 640 px). |
| `clock?` | `Clock` |  | Clock for a running time (else the nearest `ClockProvider`). |
| `labels?` | `Partial<RunDetailLabels>` |  |  |

### RunValue

Zdroj: `src/components/ResultsTable/cells.tsx`

Value of one run slot: the mark instead of the time, a ticking `RunningTime`
while on course (frozen and dotted when stale; the age is the page's
`DataAge`), else the time (`best` highlighted).

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `run` | `RunCell \| undefined` |  | The run slot; `undefined` (missing slot) renders as not known. |
| `clock?` | `Clock` |  | Clock for a running time (else the nearest `ClockProvider`). |

### StartlistTable

Zdroj: `src/components/StartlistTable/StartlistTable.tsx`

Start list: start number, star, name + club, start times of the runs stacked
(position = run number; 390 px does not overflow). An excused DNS shows its
mark inline instead of the time.

Thin wrapper over `ResultsTable columns="startlist"` with its own row type:
a start-list row has no rank and no result, so the application never has to
invent them.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `labels?` | `Partial<StartlistTableLabels>` |  | Overrides of the Czech texts. |
| `rows` | `StartlistRow[]` |  | Rows in start order (the application sorts). |
| `onFavoriteChange?` | `((row: StartlistRow, favorite: boolean) => void)` |  | Favourite star toggled. Enables the favourites column; the state stays in `row.favorite`. |
| `density?` | `"mobile" \| "desktop"` |  | Forces mobile or desktop columns; omitted = container query (desktop from 640 px of table width). |
| `clock?` | `Clock` |  | Clock for running times (else the nearest `ClockProvider`). |
| `caption?` | `ReactNode` |  | Table caption for screen readers (visually hidden). |
| `emptyState?` | `ReactNode` |  | Content of an empty table (default `labels.empty`). |

### ProgramList

Zdroj: `src/components/ProgramList/ProgramList.tsx`

Event programme: one block per day, one row per phase (time · title and
second line · state). Running rows sit on the live ground with a Live badge;
more phases can run at once. The component never chooses one of them: the
application puts a `Notice` with the choice above the list.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `days` | `ProgramDay[]` |  | Days of the programme in display order. |
| `labels?` | `Partial<ProgramListLabels>` |  | Overrides of the Czech texts. |
| `headingLevel?` | `2 \| 3 \| 4 \| 5 \| 6` | `3` | Heading level of the day headings (default 3). |

### OnCoursePanel

Zdroj: `src/components/OnCoursePanel/OnCoursePanel.tsx`

Athletes currently on course, always above the results. Mobile: a list;
from 640 px of its own width: three columns (container query). Never hides
a rider: more riders make the panel taller. Without riders it renders
nothing; when the data stops it stays and turns stale.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `riders` | `OnCourseRiderData[]` |  | Athletes on course, in the order the application wants. All are shown; the panel grows. |
| `phaseLabel?` | `ReactNode` |  | Phase of the race, e.g. `K1 muži · 2. jízda`. |
| `leader?` | `{ name: string; time: ObservedNumber; }` |  | Current leader of the phase, shown in the header. |
| `collapsed?` | `boolean` | `false` | Only the header is shown (the riders stay mounted state-wise in the application). |
| `onCollapsedChange?` | `((collapsed: boolean) => void)` |  | Makes the header a toggle. Without it the panel cannot be collapsed by the user. |
| `stale?` | `boolean` | `false` | No fresh data (heartbeat lost): the riders are frozen, nothing is removed and no banner appears; the header says since when the state is from. |
| `receivedAt?` | `number \| null` | `null` | `clock.now()` of the last data received, for the „stav ze“ line of a stale panel. |
| `timeZone?` | `string` |  | IANA time zone of the „stav ze“ time (default: the viewer's). |
| `clock?` | `Clock` |  |  |
| `labels?` | `Partial<OnCoursePanelLabels>` |  |  |

### OnCourseRider

Zdroj: `src/components/OnCoursePanel/OnCourseRider.tsx`

One athlete in the on-course panel: bib, name, running time (or the finish
waiting for the result), split, gap, time to beat and the gate penalties.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `bib` | `string \| number` |  |  |
| `name` | `string` |  |  |
| `categoryTag?` | `string` |  | Short category tag after the name, e.g. `U16`. |
| `secondary?` | `ReactNode` |  | Second line while on course (club, previous run…). The start and the finish replace it with their status text. |
| `status` | `"at-start" \| "running" \| "finished-pending"` |  |  |
| `time?` | `RunningSpec` |  | `running`: the delivered running time (ticks through the `Clock`, freezes 3 s after receipt). Other statuses do not use it. |
| `finish?` | `{ time: ObservedNumber; penalty?: ObservedNumber; }` |  | `finished-pending`: finish time and penalties, not settled yet. |
| `gates?` | `GateGridGate[]` |  | Per-gate penalties; gates not passed yet are `penalty: null`. |
| `split?` | `number` |  | Number of the last split passed (`split 2`). |
| `toLeader?` | `number` |  | Gap to the leader in seconds, signed (− = ahead). |
| `timeToBeat?` | `OnCourseTimeToBeat` |  |  |
| `featured?` | `boolean` | `false` | The rider the page follows: a brand stripe and a semibold name. |
| `stale?` | `boolean` | `false` | No fresh data: everything on the rider is frozen (the panel passes this on). |
| `clock?` | `Clock` |  |  |
| `labels?` | `Partial<OnCourseRiderLabels>` |  |  |

## Kalendář, přihlášky, profil

### WeekendCalendar

Zdroj: `src/components/WeekendCalendar/WeekendCalendar.tsx`

Season calendar by weekends (reference Kalendar): every weekend is a block with the dates on the
left and the races on the right, weekday races sit between them as thin dashed rows. The current
weekend is highlighted (`current`, the application decides which one; the component never reads
the time). Under 720 px of its own width (container query) the dates become a band above the rows
and the columns of a race wrap under its title.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `weekends` | `CalendarGroup[]` |  | Weekends in order, weekday items between them |

### DOCUMENT_KIND_LABELS

Zdroj: `src/components/DocumentList/DocumentList.tsx`

Format suffixes (reference `Zavod.html`); `link` has none.

_Bez vlastních props._

### DocumentList

Zdroj: `src/components/DocumentList/DocumentList.tsx`

List of documents of an event (propositions, start lists, results) with the format suffix
after the name: "Propozice závodu (PDF)". Plain links, no buttons; the application formats dates.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `items` | `DocumentListItem[]` |  |  |
| `kindLabels?` | `Partial<Record<DocumentKind, string>>` |  | Override the format suffixes |

### DeadlineBadge

Zdroj: `src/components/DeadlineBadge/DeadlineBadge.tsx`

Entry deadline state of a race (reference Kalendar). Pure presentation: the application
computes the relative text ("za 5 dní") and passes the formatted date, so the component
never reads the time. `closing` uses the warning colour; an expired deadline is `closed`
(neutral, not an error). Nothing animates.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `kind` | `"open" \| "closing" \| "closed" \| "late"` |  | `open`: entries are open, `closing`: the deadline is near (warning colour), `closed`: entries are closed, `late`: late entries are accepted until `date`. |
| `date?` | `ReactNode` |  | Formatted deadline, e.g. "st 13. 5. 23:59". Under the badge; for `late` it is part of the label. |
| `label?` | `ReactNode` |  | Badge text computed by the application ("Uzávěrka za 5 dní"). Defaults to a fixed label per kind. |

### EntryTable

Zdroj: `src/components/EntryTable/EntryTable.tsx`

Office table of entered athletes/boats: checks as badges, age-category select in the cell and row actions.
A two-person boat (C2) is one entry rendered as two rows: category, fee and actions span both (`rowSpan`).
Checks are warnings: this component never disables or blocks anything.
On a phone the table scrolls horizontally inside the component (keyboard reachable).

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `caption` | `string` |  | Accessible name of the table (e.g. the class: `K1 muži`). |
| `boats` | `EntryBoat[]` |  |  |
| `checkColumns` | `ReactNode[]` |  | Headers of the check columns (e.g. Registrace, Příspěvky, Prohlídka). |
| `categoryOptions` | `SelectOption[]` |  | Options of the age category select. |
| `labels?` | `Partial<EntryTableLabels>` |  | Overrides of the Czech texts. |
| `onCategoryChange?` | `((boat: EntryBoat, category: string) => void)` |  |  |
| `onRemove?` | `((boat: EntryBoat) => void)` |  |  |
| `onReplaceMember?` | `((boat: EntryBoat) => void)` |  |  |

### ProposalList

Zdroj: `src/components/ProposalList/ProposalList.tsx`

Entries proposed by athletes with Confirm / Reject. Renders nothing when no proposal is waiting.
Rows stack on a narrow container (the buttons go under the text).

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `proposals` | `Proposal[]` |  |  |
| `labels?` | `Partial<ProposalListLabels>` |  |  |
| `onConfirm?` | `((proposal: Proposal) => void)` |  |  |
| `onReject?` | `((proposal: Proposal) => void)` |  |  |

### SummaryCard

Zdroj: `src/components/SummaryCard/SummaryCard.tsx`

Summary of an entry (boats, athletes, fee). Figures are given as text by the application.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `title?` | `ReactNode` | `Souhrn` | Card heading. |
| `rows` | `SummaryRow[]` |  | Counted rows, e.g. boats, athletes, minors. |
| `total?` | `SummaryRow` |  | Highlighted last row under a rule, e.g. the fee total. |
| `note?` | `ReactNode` |  | Small print under the card, e.g. payment instructions. |

### ProfileHeader

Zdroj: `src/components/ProfileHeader/ProfileHeader.tsx`

Header of an athlete profile: avatar, name, badges, meta line, number tiles and actions.
What may be shown about minors is decided by the application: pass only public data.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `name` | `string` |  | Full name; also the source of the avatar initials |
| `variant?` | `"page" \| "band"` | `page` | Layout variant (default `page`) |
| `avatar?` | `ReactNode` |  | Replaces the default initials `Avatar` (e.g. a portrait). The portrait itself is the application's data. |
| `badges?` | `ReactNode` |  | Badge row above the name (section, disciplines) |
| `meta?` | `ReactNode[]` |  | Meta items (club, birth year, RGC, active since); separated by a dot in `band` |
| `tiles?` | `ProfileHeaderTile[]` |  | Number tiles (`StatTile`): VT, ranking, season |
| `actions?` | `ReactNode` |  | Actions (follow, share); right of the block in `page`, top row in `band` |
| `topbar?` | `ReactNode` |  | `band` only: row above the avatar (back link, "Upravit profil") |
| `as?` | `"h1" \| "h2"` | `h1` | Heading element (default `h1`) |

### SeasonSparkline

Zdroj: `src/components/SeasonSparkline/SeasonSparkline.tsx`

Placement curve over a season as inline SVG (higher = better). The best point is a filled
brand dot with its label, provisional points are hollow amber rings. The chart carries
`<title>` and `<desc>` with all values; no animation.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `points` | `SeasonSparklinePoint[]` |  | Placements in race order (oldest first). Fewer than 2 points draw markers only. |
| `title?` | `ReactNode` |  | Visible title above the chart (also names the SVG) |
| `accessibleTitle?` | `string` | `Umístění v sezóně` | Plain-text title for the SVG `<title>`; defaults to "Umístění v sezóně" |
| `meta?` | `ReactNode` |  | Right of the title, e.g. "umístění v K1 muži" |
| `note?` | `ReactNode` |  | Note under the chart, e.g. why the last point is provisional |
| `worstPlace?` | `number` |  | Worst placement on the axis; defaults to the worst of the points |
| `labels?` | `Partial<SeasonSparklineLabels>` |  | Czech defaults, overridable |

### RivalsList

Zdroj: `src/components/RivalsList/RivalsList.tsx`

Rivals from the same birth year with the point gap to the viewer. Gaps are signed
(`+40 b.` = ahead of you, `−15 b.` = behind you), so colour is never the only cue.
Whether rivals may be listed at all (minors) is decided by the application.

| Prop | Typ | Výchozí | Popis |
|---|---|---|---|
| `items` | `RivalsListItem[]` |  | Rows in standings order, exactly one with `self` |
| `labels?` | `Partial<RivalsListLabels>` |  | Czech defaults, overridable |
