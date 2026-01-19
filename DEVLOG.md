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
