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
