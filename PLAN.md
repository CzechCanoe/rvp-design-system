# PLAN.md - CSK RVP Design System

## Aktuální stav

| Fáze | Krok | Status |
|------|------|--------|
| **8 - Integrace s kanoe.cz** | 8.5 Header satellite | 🔲 Další |

---

## Fáze 8: Integrace s kanoe.cz

**Kontext:** Komponenty budou embedovány do Joomla šablony na kanoe.cz (Bootstrap 4, jQuery). Potřebují embed mode, container queries a vizuální kompatibilitu.

**Strategie - tři vizuální kontexty:**
1. **Embed** - neutrální moderní, pro komponenty v kanoe.cz
2. **Standalone** - pro satelitní aplikace (Registr, Přihlášky)
3. **Expressive** - wow faktor pro veřejné profily

### 8.1 Infrastruktura pro embed režim ✅
- [x] Display mode `embed` v ThemeContext
- [x] CSS pravidla `[data-mode="embed"]`
- [x] Container Queries foundation
- [x] KanoeCzContext mock + integration stories

### 8.2 ResultsTable refaktoring ✅
- [x] Embed varianta (bez stínů, kompaktní padding, border místo shadow)
- [x] Container-responsive sloupce (skrývání při úzké šířce)
- [x] Slalom-specifické zobrazení (1./2. jízda, Q/SF/F, postupy)
- [x] Stories: "V kontextu kanoe.cz", "Slalom kvalifikace"

### 8.3 Calendar refaktoring ✅
- [x] List view (chronologický seznam) - CalendarList komponenta
- [x] Embed mode + container query responzivita
- [x] Cards view (měsíční karty) - CalendarCards komponenta

### 8.4 Nové šablony ✅
- [x] **Event Detail Page** - před/během/po závodu
- [x] **Athlete Public Profile (EXPRESSIVE)** - celostránkový wow profil
- [x] **Athlete Card (embed)** - kompaktní verze + embed stories

### 8.5 Header satellite varianta
- [ ] Variant `satellite` - logo + user + kontextové akce
- [ ] Pro standalone aplikace

### 8.6 Vizuální harmonizace
- [ ] WCAG kontrast na hero gradientech ≥ 4.5:1
- [ ] Realistická data v prototypech

### 8.7 Testování integrace
- [ ] Playwright testy pro embed varianty
- [ ] Container query breakpoint testy
- [ ] WCAG contrast audit

**Milestone M8:** Komponenty připravené pro embed do kanoe.cz

---

## Backlog (nedokončené z předchozích fází)

### Fáze 6: Publikace
- [ ] GitHub Actions CI/CD
- [ ] NPM publikace (@czechcanoe/rvp-design-system)
- [ ] GitHub Pages pro Storybook

---

## Dokončené fáze (reference)

| Fáze | Popis | Milestone |
|------|-------|-----------|
| 0 | Výzkum a design principy | M0 ✅ |
| 1 | Projektová struktura a tokeny | M1 ✅ |
| 2 | Core komponenty (Tier 1) | M2 ✅ |
| 3 | Pokročilé komponenty (Tier 2) | M3 ✅ |
| 4 | Specifické komponenty (Tier 3) | M4 ✅ |
| 5 | Prototypy | M5 ✅ |
| 6 | Dokumentace (částečně) | - |
| 7 | Hloubkové review a redesign | M7 ✅ |

*Detaily dokončených fází viz `PLAN-history.md`*

---

## Tech stack

- **React 18+** s TypeScript (strict mode)
- **Vite** pro build
- **Storybook 8** pro dokumentaci
- **CSS custom properties** + režimy (utility/expressive/embed)

---

## Klíčové principy

- **Light mode = primární** (kanoe.cz, veřejné stránky)
- **Dark mode = sekundární** (live výsledky, volitelné)
- **Mobile-first** responsive design
- **WCAG 2.1 AA** accessibility
