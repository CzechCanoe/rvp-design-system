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
