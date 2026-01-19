# DEVLOG.md - CSK RVP Design System

## 2026-01-19 - Iterace 0 / Plánování projektu

### Dokončeno
- [x] Analýza business požadavků z csk-rvp-analysis
- [x] Prostudování stávajících systémů (resources-private)
- [x] Definice technického stacku (React-first, Vite, Storybook)
- [x] Vytvoření PLAN.md s checklistem

### Rozhodnutí
1. **React-first přístup** - komponenty v React/TypeScript, CSS jako by-product
2. **Kompletní výzkum** - analýza 6-8 sportovních federací před návrhem
3. **Font na výzkum** - výběr fontu bude na základě výzkumu
4. **Storybook** - jako hlavní dokumentační nástroj místo HTML playbooks

### Poznámky
- timing-design-system slouží pouze jako technická reference, NE vizuální
- Vizuální styl musí být sportovní, motivující pro mladé, přístupný pro starší
- Důraz na "fancy" veřejné části vs. utilitární backoffice

### Další kroky
- Fáze 0.2: Audit kanoe.cz

---

## 2026-01-19 - Iterace 1 / Výzkum sportovních prezentací

### Dokončeno
- [x] Analýza ICF (canoeicf.com) - mega-menu navigace, fotografický přístup, disciplíny bez barevného kódování
- [x] Analýza World Athletics - fialová/oranžová paleta, custom font, Inside Track LIVE
- [x] Analýza UCI - widget architektura, live timing, vícenásobné filtry
- [x] Analýza FIS - blue primary, scalable typography, responsive-first
- [x] Analýza ČAS (atletika.cz) - Poppins + Open Sans, modrá/červená, AJAX přístup
- [x] Analýza FAČR (fotbal.cz) - Config font, institucionální profesionalita
- [x] Vytvoření dokumentu `docs/research/sports-presentation-research.md`

### Problémy a řešení
1. **Problém:** Paddle UK vrací 403 Forbidden
   **Řešení:** Nahrazeno analýzou ČUS (cuscz.cz)

### Poznámky
- Většina federací NEMÁ dark mode - příležitost pro CSK
- World Athletics má nejmodernější vizuál (fialová/oranžová)
- ČAS má dobrou českou referenci (Poppins + Open Sans)
- ICF nepoužívá barevné kódování disciplín - jen textové filtry
- Widget-based architektura je standard pro výsledky (FIS, UCI)

### Klíčová doporučení
1. Zachovat modrou základnu z kanoe.cz
2. Přidat expresivní akcenty pro veřejné sekce
3. Dark mode jako konkurenční výhoda
4. Poppins/Inter pro nadpisy, Open Sans pro body
5. Card-based systém pro události
6. Barevné kódování pro DV/RY/VT sekce (subtilní)

### Další kroky
- Fáze 0.2: Audit kanoe.cz - extrakce stávající palety

---

## 2026-01-19 - Iterace 2 / Audit kanoe.cz

### Dokončeno
- [x] Extrakce barevné palety z kanoe.cz (primární #1176a6, černá/bílá neutrály)
- [x] Analýza frontend stacku (Bootstrap 4.x, jQuery 3.1.1, DataTables)
- [x] Mapování používaných komponent (buttons, forms, tables, cards, modals)
- [x] Identifikace prvků k zachování (primární barva, badge systém, roční navigace)
- [x] Identifikace prvků k nahrazení (jQuery AJAX, DataTables styling, Joomla templates)
- [x] Integrace poznatků z UX personas (csk-rvp-analysis/T11_UX_PERSONAS.md)
- [x] Vytvoření dokumentu `docs/research/kanoe-cz-audit.md`

### Problémy a řešení
1. **Problém:** Některé stránky kanoe.cz vracely 404 (neexistující URL)
   **Řešení:** Použity alternativní URL (/zavody/slalom-sjezd, /odkazy/prihlaseni)

2. **Problém:** PLAN.md uváděl "Inspinia komponenty", ale systém používá Bootstrap 4
   **Řešení:** Opraveno v PLAN.md - aktuální stack je Bootstrap 4, jQuery, DataTables

### Poznámky
- Původní předpoklad "Inspinia" byl nesprávný - systém je čistý Bootstrap 4
- Frontend je technologicky zastaralý (jQuery, Bootstrap 4), ale funkční
- Klíčové zjištění: 3 fragmentované systémy bez jednotného designu
- UX personas poskytly cenný kontext pro prioritizaci komponent
- Dark mode zůstává konkurenční příležitost (žádná federace ho nemá)

### Klíčová zjištění
1. **Barevná paleta je minimalistická** - pouze primární modrá + neutrály
2. **Chybí sémantické barvy** - success/warning/error
3. **Chybí disciplínové barvy** - DV/RY/VT nejsou rozlišeny
4. **Typografie je generická** - žádný definovaný brand font
5. **Mobile experience je sekundární** - potřeba mobile-first přístup

### Další kroky
- Fáze 0.3: Design principy (mobile-first, WCAG 2.1, dual personality, dark mode)

---

## 2026-01-19 - Iterace 3 / Design principy

### Dokončeno
- [x] Mobile-first strategie - breakpointy, touch targets (44px), font size (16px min)
- [x] WCAG 2.1 AA požadavky - kontrastní poměry, klávesová navigace, ARIA standardy
- [x] Dual personality - utilitární (kompaktní) vs. expresivní (vzdušný) režim
- [x] Dark/light mode strategie - CSS variables, system preference, elevation model
- [x] Výběr fontu - Inter (nadpisy i body), JetBrains Mono (časy/data)
- [x] Barevný systém - primární paleta (#1176a6), neutrály, sémantické, disciplínové barvy
- [x] Spacing systém - 4px base škála
- [x] Další tokeny - radius, shadows, transitions, z-index
- [x] Vytvoření dokumentu `docs/DESIGN_PRINCIPLES.md`

### Rozhodnutí
1. **Inter místo Poppins** - lepší podpora češtiny, užší řez (efektivnější pro data-heavy UI), designován pro obrazovky
2. **Jednotný font** - Inter pro nadpisy i body text pro konzistenci (menší payload, snadnější maintenance)
3. **4px base grid** - standard pro moderní design systémy, umožňuje jemnější spacing
4. **CSS Variables** - pro dark mode přepínání místo duplicitních stylů
5. **Lucide Icons** - open-source, konzistentní, dobrá React podpora

### Poznámky
- Fáze 0 (výzkum a design principy) je kompletně dokončena
- Milestone M0 dosažen - design principy jsou připraveny ke schválení
- Disciplínové barvy (DV/RY/VT) a VT třídy (M/A/B/C) jsou definovány
- Dark mode je first-class citizen, ne dodatečná úprava

### Další kroky
- Fáze 1.1: Setup projektu (npm, TypeScript, Vite, Storybook)

---

## 2026-01-19 - Iterace 4 / Setup projektu (Fáze 1.1)

### Dokončeno
- [x] Inicializace npm projektu s `@czechcanoe/rvp-design-system` scope
- [x] Konfigurace TypeScript (strict mode, ESNext, bundler resolution)
- [x] Konfigurace Vite (library mode, React plugin, DTS generation)
- [x] Konfigurace Storybook 8 (react-vite, essential addons, dark/light preview)
- [x] Struktura složek (src/tokens, src/components, src/styles, src/utils, src/hooks)
- [x] Základní soubory (index.ts, globals.css, Introduction.mdx)
- [x] Aktualizace .gitignore pro moderní React projekt

### Rozhodnutí
1. **ESM-first** - `"type": "module"` v package.json, dual ESM/CJS export
2. **Path alias** - `@/*` mapuje na `src/*` pro čisté importy
3. **Vite library mode** - build jako knihovna s externím React
4. **vite-plugin-dts** - automatická generace TypeScript definic
5. **AGPL-3.0 licence** - v souladu s CSK projekty

### Poznámky
- Projekt je připraven pro `npm install` a `npm run storybook`
- Storybook preview má přepínač light/dark theme
- CSS reset připraven v globals.css
- Tokeny zatím placeholder - budou implementovány v 1.2

### Struktura projektu
```
src/
├── index.ts           # Main export
├── Introduction.mdx   # Storybook welcome page
├── tokens/
│   └── index.ts       # Design tokens (TBD)
├── components/        # React components (TBD)
├── styles/
│   └── globals.css    # CSS reset + variables
├── utils/             # Utility functions (TBD)
└── hooks/             # React hooks (TBD)
```

### Další kroky
- Fáze 1.2: Design Tokens (barvy, typografie, spacing)

---

## 2026-01-19 - Iterace 5 / Design Tokens - barvy (Fáze 1.2a)

### Dokončeno
- [x] Barevná paleta pro light theme (primitives)
- [x] CSK specifické barvy (sekce DV/RY/VT, VT třídy M/A/B/C)
- [x] Sémantické barvy (backgrounds, text, borders, interactive states, feedback)
- [x] Vytvoření `src/tokens/colors.css`
- [x] Vytvoření `src/tokens/index.css` (centrální import)

### Rozhodnutí
1. **CSS Custom Properties** - tokeny jako CSS proměnné pro snadné přepínání témat
2. **Třívrstvá architektura** - primitives → semantic → component (budoucnost)
3. **Plná škála pro hlavní barvy** - 50-900 pro primary, neutral, success, warning, error, info
4. **Disciplínové barvy** - DV modrá (#2563eb), RY zelená (#16a34a), VT červená (#dc2626)
5. **VT třídy** - M fialová, A červená, B oranžová, C zelená

### Poznámky
- Dark theme bude v dalším kroku (přepíše semantic vrstvu)
- Tokeny jsou připraveny na import do globals.css
- Struktura umožňuje budoucí rozšíření o component-level aliasy

### Další kroky
- Fáze 1.2c: Typografie tokeny
- Fáze 1.2d: Spacing, radius, shadows, transitions tokeny

---

## 2026-01-19 - Iterace 6 / Dark theme barvy (Fáze 1.2b)

### Dokončeno
- [x] Dark theme primitive colors (primary, neutral, success, warning, error, info)
- [x] Dark theme CSK-specific colors (disciplínové sekce, VT třídy)
- [x] Dark theme semantic colors (backgrounds, text, borders, interactive, feedback)
- [x] System preference detection via @media (prefers-color-scheme: dark)
- [x] Aktualizace `src/tokens/colors.css`

### Rozhodnutí
1. **Inverted neutral scale** - v dark mode je neutral-0 nejtmavší (#0a0a0a)
2. **Brighter accent colors** - primární 500 je #4da3cc místo #1176a6 pro lepší viditelnost
3. **87% opacity pro text** - bílý text na tmavém pozadí není 100% bílý pro komfort očí
4. **Elevation model** - světlejší pozadí = vyšší elevace (elevated bg je neutral-200 v dark mode)
5. **Dual implementation** - `[data-theme="dark"]` pro explicitní volbu + `@media prefers-color-scheme` pro auto

### Poznámky
- Dark theme používá stejné sémantické názvy jako light theme (bg-primary, text-primary, etc.)
- Přepínání témat funguje přes `data-theme` atribut na root elementu
- System preference se aplikuje pouze když není explicitní `data-theme="light"`
- CSK disciplínové barvy jsou jasnější verze (např. DV modrá #60a5fa místo #2563eb)

### Další kroky
- Fáze 1.2c: Typografie tokeny (font family, scale, weights, line-height)

---

## 2026-01-19 - Iterace 7 / Typography tokens (Fáze 1.2c)

### Dokončeno
- [x] Font families (Inter pro UI, JetBrains Mono pro časy/data)
- [x] Font size škála (xs 12px až 6xl 60px)
- [x] Font weights (normal, medium, semibold, bold)
- [x] Line heights (tight až loose)
- [x] Letter spacing (tighter až wider)
- [x] Typography presets (display, h1-h5, body, caption, lead)
- [x] Monospace presets pro časy (time-lg, time-md, time-sm, code)
- [x] Responsive typography (mobile-first adjustments)
- [x] Vytvoření `src/tokens/typography.css`
- [x] Aktualizace `src/tokens/index.css` (import typography)

### Rozhodnutí
1. **Inter jako primární font** - moderní, čitelný, výborná podpora češtiny, designed for screens
2. **JetBrains Mono pro časy** - monospace s ligaturami, perfektní pro výsledkové tabulky
3. **Composite tokens** - text-h1-size, text-h1-weight atd. pro snadnou aplikaci
4. **Mobile-first responsive** - headings se zmenšují na mobilech (display 60px → 36px)
5. **Time presets** - speciální nastavení pro live timing a výsledky

### Poznámky
- Typography tokeny vycházejí přesně z DESIGN_PRINCIPLES.md
- Responzivní úpravy zajistí čitelnost na všech zařízeních
- Presets zjednodušují aplikaci - stačí použít composite proměnné
- Fonty nejsou součástí CSS - musí být načteny z Google Fonts nebo lokálně

### Další kroky
- Fáze 1.2d: Spacing, radius, shadows, transitions tokeny

---

## 2026-01-19 - Iterace 8 / Spacing tokens (Fáze 1.2d partial)

### Dokončeno
- [x] Base spacing scale (4px increments, 0-96 steps)
- [x] Semantic component spacing (xs, sm, md, lg, xl)
- [x] Semantic layout spacing (section-sm to section-xl)
- [x] Dual personality spacing (utility mode compact, expressive mode generous)
- [x] Specific use case tokens (forms, cards, tables, buttons, navigation, modals)
- [x] Touch target spacing (44px pro WCAG 2.1)
- [x] Responsive adjustments for page gutters
- [x] Vytvoření `src/tokens/spacing.css`
- [x] Aktualizace `src/tokens/index.css`

### Rozhodnutí
1. **Rozšířená škála** - přidány mezikroky (0.5, 1.5, 2.5, 3.5) pro jemnější kontrolu
2. **Kompletní Tailwind-like škála** - 0-96 pro kompatibilitu s moderními design systémy
3. **Specifické use case tokeny** - předpřipravené hodnoty pro běžné komponenty (forms, cards, tables)
4. **Stack a Inline** - sémantické názvy pro vertikální a horizontální spacing

### Poznámky
- Spacing tokeny vycházejí z DESIGN_PRINCIPLES.md sekce 7 (základní škála) a sekce 3 (dual personality)
- Touch target 44px je důležitý pro WCAG 2.1 Level AA compliance
- Responsive adjustments pouze pro page gutters - zbytek je mobile-first

### Další kroky
- Fáze 1.2: Border radius tokeny
- Fáze 1.2: Shadows tokeny
- Fáze 1.2: Transitions tokeny

---

## 2026-01-19 - Iterace 9 / Border radius tokens (Fáze 1.2d partial)

### Dokončeno
- [x] Base radius scale (none až full)
- [x] Semantic component radius (buttons, inputs, cards, badges, modals)
- [x] Image and avatar radius presets
- [x] Vytvoření `src/tokens/radius.css`
- [x] Aktualizace `src/tokens/index.css`

### Rozhodnutí
1. **Rozšířená škála** - přidán 3xl (32px) pro velmi zaoblené elementy
2. **Sémantické aliasy** - komponenty používají pojmenované tokeny místo přímých hodnot
3. **Konzistence s design principy** - hodnoty odpovídají DESIGN_PRINCIPLES.md sekce 8.1

### Poznámky
- Radius tokeny jsou připraveny pro použití v komponentách
- Pill shape (radius-full: 9999px) pro buttons, badges, switches, progress bars
- Avatary mají variantu circular i square

### Další kroky
- Fáze 1.2: Shadows tokeny
- Fáze 1.2: Transitions tokeny

---

## 2026-01-19 - Iterace 10 / Shadow tokens (Fáze 1.2d partial)

### Dokončeno
- [x] Base shadow scale (none, sm, md, lg, xl, 2xl)
- [x] Inner shadows (inner, inner-lg)
- [x] Colored shadows (primary, success, warning, error)
- [x] Semantic component shadows (cards, buttons, inputs, dropdowns, modals, toast, navbar)
- [x] Dark mode shadow adjustments (více kontrastní stíny)
- [x] System preference detection (@media prefers-color-scheme)
- [x] Vytvoření `src/tokens/shadows.css`
- [x] Aktualizace `src/tokens/index.css`

### Rozhodnutí
1. **Multi-layer shadows** - md a lg používají dva stíny pro přirozenější vzhled
2. **Colored shadows pro interaktivní prvky** - primární barva pro focus states
3. **Darker shadows v dark mode** - vyšší opacity pro viditelnost na tmavém pozadí
4. **Semantic aliasy** - komponenty používají pojmenované tokeny (shadow-card, shadow-modal, etc.)
5. **Focus ring pattern** - 3px outline s 30% opacity primární barvy

### Poznámky
- Dark mode používá elevation model (světlejší pozadí = vyšší elevace) spolu se stíny
- Colored shadows používají přesné RGB hodnoty z barevných tokenů
- Modal backdrop je speciální stín přes celou obrazovku

### Další kroky
- Fáze 2: Core komponenty (Tier 1)

---

## 2026-01-19 - Iterace 11 / Transition tokens (Fáze 1.2d final)

### Dokončeno
- [x] Base transition durations (instant, fastest, fast, normal, moderate, slow, slower, slowest)
- [x] Easing functions (linear, in, out, in-out, bounce, elastic, spring)
- [x] Composite transitions (fast, base, slow, slower)
- [x] Dual personality mode tokens (utility: 100-200ms, expressive: 150-400ms)
- [x] Semantic component transitions (button, input, link, card, dropdown, modal, tooltip, sidebar, collapse, switch, tab, badge, skeleton, theme)
- [x] Animation properties with keyframe references
- [x] Keyframe definitions (fade, scale, slide, pulse, spin, bounce, live-pulse)
- [x] Reduced motion support (@media prefers-reduced-motion)
- [x] Vytvoření `src/tokens/transitions.css`
- [x] Aktualizace `src/tokens/index.css`

### Rozhodnutí
1. **Kompletní duration škála** - od 0ms do 500ms pro různé use cases
2. **Specializované easings** - bounce a elastic pro expresivní režim (attention-grabbing UI)
3. **Composite transitions pro komponenty** - předpřipravené multi-property transitions (např. button má bg, border, color, shadow, transform)
4. **Keyframes přímo v souboru** - základní animace jsou součástí tokenů pro snadné použití
5. **Live pulse animace** - specifická pro CSK live timing indikátory

### Poznámky
- **Milestone M1 dokončen** - všechny design tokeny jsou implementovány
- Fáze 1 (Projektová struktura a tokeny) je kompletně hotová
- Reduced motion respektuje WCAG 2.1 a uživatelské preference
- Dual personality (utility vs expressive) je konzistentní s ostatními tokeny
- Připraveno pro Fázi 2 - core komponenty

### Struktura tokenů (kompletní)
```
src/tokens/
├── index.css       # Central import
├── colors.css      # Color primitives + semantic + dark mode
├── typography.css  # Font families, sizes, weights, presets
├── spacing.css     # 4px scale, component/layout spacing, dual personality
├── radius.css      # Border radius scale + semantic
├── shadows.css     # Shadow scale + colored + semantic + dark mode
└── transitions.css # Durations, easings, animations, reduced motion
```

### Další kroky
- Fáze 2: Core komponenty (Button, Input, Select, Checkbox, Radio, Switch, Card, Badge, Table)

---

## 2026-01-19 - Iterace 12 / Button komponenta (Fáze 2.1)

### Dokončeno
- [x] Button komponenta s TypeScript a CSS
- [x] Varianty: primary, secondary, ghost, danger
- [x] Velikosti: sm (32px), md (44px), lg (52px)
- [x] Stavy: default, hover, active, disabled, loading
- [x] Podpora ikon (iconLeft, iconRight)
- [x] Full width modifikátor
- [x] Loading spinner s animací
- [x] WCAG 2.1 AA - focus visible, aria atributy
- [x] Storybook stories s autodocs
- [x] Export z hlavního indexu

### Rozhodnutí
1. **CSS namespace** - `.csk-button` prefix pro izolaci stylů
2. **forwardRef** - pro přístup k DOM elementu z rodičovských komponent
3. **min-height místo fixed height** - pro flexibilitu obsahu
4. **Loading state** - text zůstává ve stromě (visibility: hidden) pro zachování šířky
5. **Touch target** - minimum 44px (md), 32px (sm) pro mobilní zařízení

### Poznámky
- Button je první komponenta Fáze 2
- Používá design tokeny z Fáze 1 (colors, spacing, radius, transitions)
- Storybook stories demonstrují všechny varianty a stavy
- Připraveno pro rozšíření o IconButton a ButtonGroup

### Struktura komponent
```
src/components/
├── index.ts           # Central export
└── Button/
    ├── index.ts       # Public API
    ├── Button.tsx     # Component implementation
    ├── Button.css     # Styles
    └── Button.stories.tsx  # Storybook
```

### Další kroky
- Fáze 2: Input komponenta (text, password, search, number, validation)

---

## 2026-01-19 - Iterace 13 / Input komponenta (Fáze 2.2)

### Dokončeno
- [x] Input komponenta s TypeScript a CSS
- [x] Typy: text, password, email, search, number, tel, url
- [x] Velikosti: sm (32px), md (44px), lg (52px)
- [x] Stavy: default, error, success, disabled
- [x] Podpora ikon (iconLeft, iconRight)
- [x] Clearable mód pro vyhledávání
- [x] Label a helper text s ARIA propojením
- [x] Error message s role="alert"
- [x] WCAG 2.1 AA - focus visible, aria-invalid, aria-describedby
- [x] Storybook stories s autodocs
- [x] Export z hlavního indexu

### Rozhodnutí
1. **Wrapper pattern** - Input je obalen divem pro label a helper text
2. **Container pro ikony** - relativní pozicování pro absolutní ikony
3. **Clearable jako opt-in** - pouze pro search a kontrolované inputy
4. **Skryté nativní spinners** - number input bez šipek pro čistší vzhled
5. **Skryté nativní clear** - search input používá vlastní clear button

### Poznámky
- Input používá design tokeny z Fáze 1 (colors, spacing, radius, transitions)
- ARIA propojení zajišťuje přístupnost pro screen readery
- Error message má role="alert" pro okamžité oznámení
- Focus ring používá box-shadow s 30% opacity primární barvy

### Struktura komponent
```
src/components/
├── index.ts           # Central export
├── Button/
│   ├── index.ts
│   ├── Button.tsx
│   ├── Button.css
│   └── Button.stories.tsx
└── Input/
    ├── index.ts
    ├── Input.tsx
    ├── Input.css
    └── Input.stories.tsx
```

### Další kroky
- Fáze 2: Select komponenta (native, custom dropdown)

---

## 2026-01-19 - Iterace 14 / Select komponenta (Fáze 2.3)

### Dokončeno
- [x] Select komponenta s TypeScript a CSS
- [x] Použití nativního `<select>` pro optimální přístupnost a mobilní UX
- [x] Velikosti: sm (32px), md (44px), lg (52px)
- [x] Stavy: default, error, success, disabled
- [x] Podpora levé ikony (iconLeft)
- [x] Vlastní chevron ikona (skryté nativní šipky)
- [x] Placeholder jako první disabled option
- [x] Label a helper text s ARIA propojením
- [x] Error message s role="alert"
- [x] Podpora disabled options
- [x] WCAG 2.1 AA - focus visible, aria-invalid, aria-describedby
- [x] Storybook stories s autodocs a CSK-specifickými příklady
- [x] Export z hlavního indexu

### Rozhodnutí
1. **Native select** - místo custom dropdown pro lepší mobile UX a přístupnost (OS native pickers)
2. **Placeholder jako disabled option** - standardní pattern pro native selects
3. **Chevron vpravo** - konzistentní s Input komponentou (ikony na stejných pozicích)
4. **Appearance: none** - skryté nativní styly, plná kontrola nad vzhledem

### Poznámky
- Select používá stejnou strukturu jako Input (wrapper → label → container → element → helper)
- Nativní select má lepší UX na mobilních zařízeních (OS native picker)
- Storybook stories obsahují CSK-specifické příklady (země, disciplíny, kategorie, VT třídy)
- Build projde bez chyb

### Struktura komponent
```
src/components/
├── index.ts           # Central export
├── Button/
├── Input/
└── Select/
    ├── index.ts       # Public API
    ├── Select.tsx     # Component implementation
    ├── Select.css     # Styles
    └── Select.stories.tsx  # Storybook
```

### Další kroky
- Fáze 2: Checkbox komponenta

---

## 2026-01-19 - Iterace 15 / Checkbox komponenta (Fáze 2.4)

### Dokončeno
- [x] Checkbox komponenta s TypeScript a CSS
- [x] Velikosti: sm (16px), md (20px), lg (24px)
- [x] Stavy: default, error, success, disabled
- [x] Indeterminate stav pro částečný výběr (např. select all)
- [x] Label a helper text s ARIA propojením
- [x] Error message s role="alert"
- [x] Custom check a indeterminate ikony (SVG)
- [x] WCAG 2.1 AA - focus visible, aria-invalid, aria-describedby
- [x] Storybook stories s autodocs a CSK-specifickými příklady
- [x] Export z hlavního indexu

### Rozhodnutí
1. **Skrytý nativní checkbox** - appearance: none + custom visual box pro konzistentní vzhled
2. **SVG ikony** - inline SVG pro check a indeterminate ikony (nezávislé na icon library)
3. **Indeterminate via JavaScript** - nativní checkbox indeterminate se nastavuje pouze přes JS
4. **Dual ref handling** - interní ref pro indeterminate + forwarded ref pro rodiče

### Poznámky
- Checkbox používá design tokeny z Fáze 1 (colors, spacing, radius, transitions)
- Indeterminate stav je užitečný pro "Select all" patterny v tabulkách
- Storybook stories obsahují praktické příklady (registrační formulář, filtry, výběr v tabulce)
- Build projde bez chyb

### Struktura komponent
```
src/components/
├── index.ts           # Central export
├── Button/
├── Input/
├── Select/
└── Checkbox/
    ├── index.ts       # Public API
    ├── Checkbox.tsx   # Component implementation
    ├── Checkbox.css   # Styles
    └── Checkbox.stories.tsx  # Storybook
```

### Další kroky
- Fáze 2: Radio komponenta

---

## 2026-01-19 - Iterace 16 / Radio komponenta (Fáze 2.5)

### Dokončeno
- [x] Radio komponenta s TypeScript a CSS
- [x] Velikosti: sm (16px), md (20px), lg (24px)
- [x] Stavy: default, error, success, disabled
- [x] Circular design (radius-full) pro odlišení od Checkbox
- [x] Inner dot indicator místo checkmark ikony
- [x] Label a helper text s ARIA propojením
- [x] Error message s role="alert"
- [x] WCAG 2.1 AA - focus visible, aria-invalid, aria-describedby
- [x] Storybook stories s autodocs a CSK-specifickými příklady
- [x] Export z hlavního indexu

### Rozhodnutí
1. **Circular shape** - Radio je vždy kruhové (radius-full), na rozdíl od Checkbox (radius-sm/md)
2. **Inner dot** - místo SVG ikony používá jednoduchý kruhový prvek s scale animací
3. **Bez indeterminate** - Radio nemá indeterminate stav (to je specifické pro Checkbox)
4. **Same name pattern** - Radios se seskupují pomocí stejného `name` atributu

### Poznámky
- Radio komponenta sdílí strukturu s Checkbox (wrapper → label → control → text)
- Hlavní vizuální rozdíl: kruhový tvar vs. zaoblený čtverec
- Storybook stories obsahují CSK-specifické příklady (výběr sekce DV/RY/VT, VT třídy, typ členství)
- Build projde bez chyb

### Struktura komponent
```
src/components/
├── index.ts           # Central export
├── Button/
├── Input/
├── Select/
├── Checkbox/
└── Radio/
    ├── index.ts       # Public API
    ├── Radio.tsx      # Component implementation
    ├── Radio.css      # Styles
    └── Radio.stories.tsx  # Storybook
```

### Další kroky
- Fáze 2: Switch komponenta

---

## 2026-01-19 - Iterace 17 / Switch komponenta (Fáze 2.6)

### Dokončeno
- [x] Switch komponenta s TypeScript a CSS
- [x] Velikosti: sm (36x20px), md (44x24px), lg (52x28px)
- [x] Stavy: default, error, success, disabled
- [x] Pill-shaped track s posuvným thumb
- [x] Podpora label na levé nebo pravé straně (labelPosition prop)
- [x] Helper text a error message s ARIA propojením
- [x] role="switch" pro správnou sémantiku
- [x] WCAG 2.1 AA - focus visible, aria-invalid, aria-describedby
- [x] Storybook stories s autodocs a CSK-specifickými příklady
- [x] Export z hlavního indexu

### Rozhodnutí
1. **Pill-shaped track** - Switch má charakteristický oválný tvar (radius-full) na rozdíl od Checkbox (zaoblený čtverec)
2. **role="switch"** - použita správná ARIA role místo výchozího checkbox
3. **Thumb animace** - posun thumb zleva doprava při aktivaci pomocí CSS transition
4. **labelPosition prop** - možnost umístit label vlevo nebo vpravo od switch
5. **Konzistentní sizing** - track šířka odpovídá poměru 1.83:1 (šířka:výška)

### Poznámky
- Switch je vizuálně odlišitelný od Checkbox (pill vs. box)
- Vhodný pro okamžitě aplikované nastavení (on/off)
- Pro formuláře s submit akcí zvážit použití Checkbox
- Storybook stories obsahují CSK-specifické příklady (nastavení účtu, live results, přihlášení na závod)
- Build projde bez chyb

### Struktura komponent
```
src/components/
├── index.ts           # Central export
├── Button/
├── Input/
├── Select/
├── Checkbox/
├── Radio/
└── Switch/
    ├── index.ts       # Public API
    ├── Switch.tsx     # Component implementation
    ├── Switch.css     # Styles
    └── Switch.stories.tsx  # Storybook
```

### Další kroky
- Fáze 2: Card komponenta (surface, elevated, clickable)

---

## 2026-01-19 - Iterace 18 / Card komponenta (Fáze 2.7)

### Dokončeno
- [x] Card komponenta s TypeScript a CSS
- [x] Varianty: surface (subtilní pozadí), elevated (stín), outlined (viditelný border)
- [x] Padding: none, sm, md, lg
- [x] Clickable stav s hover/active efekty
- [x] Podpora link karty (href prop) - renderuje se jako `<a>`
- [x] Header a footer sloty s oddělovacími bordery
- [x] Klávesová navigace pro clickable karty (Enter, Space)
- [x] WCAG 2.1 AA - focus visible, role="button" pro clickable
- [x] Reduced motion support pro elevated hover animace
- [x] Storybook stories s autodocs a CSK-specifickými příklady
- [x] Export z hlavního indexu

### Rozhodnutí
1. **Conditional rendering** - anchor vs div místo ElementType pro lepší TypeScript podporu
2. **role="button" pro clickable** - non-link clickable karty mají správnou ARIA roli
3. **tabIndex: 0** - clickable karty jsou focusable klávesnicí
4. **translateY animace pro elevated** - subtilní lift efekt na hover (+2px)
5. **Header/footer padding** - konzistentní s body padding, ale s vlastními bordery

### Poznámky
- Card komponenta doplňuje formy (Button, Input, Select, Checkbox, Radio, Switch)
- Vhodná pro seznamy událostí, profily závodníků, výsledkové karty
- Storybook stories obsahují CSK-specifické příklady (AthleteCard, EventCard, ResultCard, StatCard)
- Build projde bez chyb

### Struktura komponent
```
src/components/
├── index.ts           # Central export
├── Button/
├── Input/
├── Select/
├── Checkbox/
├── Radio/
├── Switch/
└── Card/
    ├── index.ts       # Public API
    ├── Card.tsx       # Component implementation
    ├── Card.css       # Styles
    └── Card.stories.tsx  # Storybook
```

### Další kroky
- Fáze 2: Badge komponenta (status, VT, sekce)

---

## 2026-01-19 - Iterace 19 / Badge komponenta (Fáze 2.8)

### Dokončeno
- [x] Badge komponenta s TypeScript a CSS
- [x] Varianty: default, primary, success, warning, error, info
- [x] CSK sekce: dv (modrá), ry (zelená), vt (červená)
- [x] VT třídy: m (fialová), a (červená), b (oranžová), c (zelená)
- [x] Velikosti: sm (20px), md (24px), lg (32px)
- [x] Outlined varianta pro subtilní vzhled
- [x] Pill shape pro plně zaoblené rohy
- [x] Podpora ikon (iconLeft)
- [x] Storybook stories s autodocs a CSK-specifickými příklady
- [x] Export z hlavního indexu

### Rozhodnutí
1. **Priority řazení** - vtClass > section > variant pro určení barvy
2. **Outlined jako modifikátor** - ne samostatná varianta, kombinovatelné se všemi barvami
3. **Pill jako modifikátor** - radius-full pro notifikační badge a tagy
4. **Bez interaktivity** - Badge je čistě prezentační, ne klikatelný

### Poznámky
- Badge doplňuje Card a Button pro zobrazení stavů a kategorií
- CSK-specifické barvy jsou definovány v tokenech (section-dv, section-ry, section-vt, vt-m/a/b/c)
- Dark mode varianty automaticky použijí jasnější verze barev z tokenů
- Build projde bez chyb

### Struktura komponent
```
src/components/
├── index.ts           # Central export
├── Button/
├── Input/
├── Select/
├── Checkbox/
├── Radio/
├── Switch/
├── Card/
└── Badge/
    ├── index.ts       # Public API
    ├── Badge.tsx      # Component implementation
    ├── Badge.css      # Styles
    └── Badge.stories.tsx  # Storybook
```

### Další kroky
- Fáze 3: Modal komponenta (dialog, confirm, wizard)

---

## 2026-01-19 - Iterace 20 / Table komponenta (Fáze 2.9)

### Dokončeno
- [x] Table komponenta s TypeScript a CSS
- [x] Generický typ pro typově bezpečné sloupce a data
- [x] Varianty: default, striped, bordered
- [x] Velikosti: sm (kompaktní), md (default), lg (prostorný)
- [x] Sortable sloupce s třícyklickým přepínáním (asc → desc → none)
- [x] Selectable řádky s checkbox a indeterminate "select all"
- [x] Controlled i uncontrolled režim pro sort a selection
- [x] Custom cell rendering pomocí cell funkce
- [x] Sticky header pro dlouhé tabulky
- [x] Loading overlay se spinnerem
- [x] Empty state s custom obsahem
- [x] Caption pro accessibility (viditelný i sr-only)
- [x] WCAG 2.1 AA - aria-sort, focus visible, klávesová navigace
- [x] Storybook stories s CSK-specifickými příklady (athletes, results, events)
- [x] Export z hlavního indexu

### Rozhodnutí
1. **Generic component** - Table<T> pro typově bezpečné columns a data
2. **forwardRef wrapper** - speciální pattern pro generické komponenty s ref
3. **Třícyklový sort** - asc → desc → none (reset) pro intuitivní UX
4. **Dual mode** - controlled (sortKey/sortDirection) i uncontrolled (defaultSortKey)
5. **Czech collation** - localeCompare('cs') pro správné řazení českých znaků
6. **CSS-only spinner** - bez závislosti na externí icon knihovně

### Poznámky
- **Milestone M2 dokončen** - všechny core komponenty Fáze 2 jsou hotové
- Table doplňuje Badge pro zobrazení sekcí a stavů v buňkách
- Sticky header používá CSS position: sticky pro nativní výkon
- Responsive layout (scroll) místo card transformace na mobilu (lze přidat třídou)
- Build projde bez chyb

### Struktura komponent (kompletní Fáze 2)
```
src/components/
├── index.ts           # Central export
├── Button/            # Primary, secondary, ghost, danger
├── Input/             # Text, password, search, number, validation
├── Select/            # Native select s custom styling
├── Checkbox/          # Včetně indeterminate
├── Radio/             # Radio buttons
├── Switch/            # Toggle switch
├── Card/              # Surface, elevated, outlined, clickable
├── Badge/             # Variants, sections, VT classes
└── Table/             # Sortable, selectable, generic
    ├── index.ts       # Public API
    ├── Table.tsx      # Component implementation
    ├── Table.css      # Styles
    └── Table.stories.tsx  # Storybook
```

### Další kroky
- Fáze 3: Pokročilé komponenty (Modal, Tabs, Toast, Navigation, Pagination...)
