# PLAN.md - CSK RVP Design System

## Aktuální stav

| Fáze | Krok | Status |
|------|------|--------|
| **6 - Publikace** | CI/CD, GH Pages, NPM ✅ | Hotovo |
| **8 - Integrace s kanoe.cz** | 8.7 Prototypy varianty ✅ | Hotovo |
| **8 - Integrace s kanoe.cz** | 8.8 Testování integrace | 🔲 Další |

---

## Fáze 8: Integrace s kanoe.cz

**Kontext:** Komponenty budou embedovány do Joomla šablony na kanoe.cz (Bootstrap 4, jQuery). Potřebují embed mode a vizuální kompatibilitu.

**Strategie - DVA vizuální kontexty:**
1. **Embed** - neutrální moderní, komponenty v kanoe.cz (BEZ vlastního headeru)
2. **Satellite** - standalone aplikace s minimálním headerem (logo + user)

**DŮLEŽITÉ:** Žádné HERO sekce s vlnami. Čistý, integrovaný design.

### 8.1 Infrastruktura ✅
- [x] Display mode `embed` v ThemeContext
- [x] CSS pravidla `[data-mode="embed"]` v mode.css
- [x] Container Queries foundation
- [x] KanoeCzContext mock komponenta

### 8.2 ResultsTable - základ ✅
- [x] Embed varianta (bez stínů, kompaktní)
- [x] Container-responsive sloupce
- [x] Slalom: 1./2. jízda, Q/SF/F, postupy

### 8.3 Calendar komponenty ✅
- [x] CalendarList (chronologický seznam)
- [x] CalendarCards (měsíční karty)
- [x] Embed mode

### 8.4 Nové prototypy - základ ✅
- [x] EventDetailPage (před/během/po)
- [x] AthletePublicProfile (expressive)
- [x] AthleteCard embed

### 8.5 Header satellite ✅
- [x] Typ `satellite` v HeaderVariant
- [x] Props: appName, homeLink, homeLinkLabel
- [x] CSS styly (.csk-header--satellite, home-link, app-name)
- [x] Stories (Satellite, SatelliteRegistr, SatellitePrihlasky, SatelliteLive)

---

### 8.6 Opravy a refaktoring ✅

#### 8.6.1 ResultsTable opravy ✅
- [x] **FIX: Přetékání medailových řádků** (odstraněn medal emoji pseudo-element)
- [x] **Přidat věkové kategorie** (ageCategory prop + showAgeCategory)
- [x] **Přidat body** (points prop + showPoints)

#### 8.6.2 KanoeCzContext vylepšení ✅
- [x] Přidat skutečné logo kanoe.cz (SVG paddle + text)
- [x] Věrnější simulace layoutu (topbar, header, breadcrumb, footer)
- [x] Více variant layoutu (homepage, subpage, detail)
- [x] Props: pageVariant, pageTitle, breadcrumbs

#### 8.6.3 Odstranit HERO vlny ze všech prototypů ✅
- [x] LivePage - odstranit hero sekci s vlnou (nahrazeno čistým headerem)
- [x] ResultsPage - odstranit hero sekci s vlnou (nahrazeno čistým headerem)
- [x] CalendarPage - odstraněn WaveDecoration, showHero prop
- [x] DashboardPage - odstraněn WaveSVG, pulse rings, zjednodušen header
- [x] EventDetailPage - odstraněn WaveDecoration z hero
- [x] ProfilePage - odstraněn WaveDecoration z hero
- [x] RegistrationPage - odstraněn WaveDecoration z hero
- [x] AthletePublicProfile - AthleteCard.hero varianta zachována jako expressive styl

---

### 8.7 Prototypy - DVĚ varianty každého

**Každý prototyp musí existovat ve DVOU variantách:**
1. **Embed** - v KanoeCzContext mocku, bez vlastního headeru
2. **Satellite** - standalone s satellite headerem

#### 8.7.1 Live Results ✅
- [x] Embed varianta (v KanoeCzContext)
- [x] Satellite varianta (standalone)
- [x] EmbedWithSidebar varianta (demonstrace container queries)

#### 8.7.2 Results Page ✅
- [x] Embed varianta (v KanoeCzContext)
- [x] Satellite varianta (standalone)
- [x] EmbedWithSidebar varianta (demonstrace container queries)
- [x] EmbedCompact varianta (pouze tabulka)

#### 8.7.3 Calendar ✅
- [x] Embed varianta (v KanoeCzContext)
- [x] Satellite varianta (standalone)
- [x] EmbedWithSidebar varianta (demonstrace container queries)

#### 8.7.4 Event Detail ✅
- [x] Embed varianta (v KanoeCzContext)
- [x] Satellite varianta (standalone)
- [x] EmbedWithSidebar varianta (demonstrace container queries)

#### 8.7.5 Athlete Public Profile ✅
- [x] Embed varianta (v KanoeCzContext)
- [x] Satellite varianta (standalone)
- [x] EmbedWithSidebar varianta (demonstrace container queries)

---

### 8.8 Testování integrace
- [ ] Playwright testy pro embed varianty
- [ ] Container query breakpoint testy
- [ ] Overflow/layout testy

**Milestone M8:** Prototypy demonstrují reálnou integraci do kanoe.cz

---

## Fáze 6: Publikace ✅

### 6.1 GitHub Actions CI/CD ✅
- [x] CI workflow (lint, typecheck, build, test)
- [x] Storybook deploy workflow (GitHub Pages)
- [x] GitHub Packages publish workflow (automaticky na push)

### 6.2 Konfigurace ✅
- [x] `.nvmrc` pro konzistentní Node verzi
- [x] `README.md` s dokumentací
- [x] `publishConfig` pro GitHub Packages v package.json

**Po vytvoření repozitáře na GitHubu:**
1. Nastavit GitHub Pages (Settings → Pages → GitHub Actions)
2. Publikace funguje automaticky přes `GITHUB_TOKEN` (není třeba secret)

---

## Dokončené fáze

| Fáze | Popis | Milestone |
|------|-------|-----------|
| 0 | Výzkum a design principy | M0 ✅ |
| 1 | Projektová struktura a tokeny | M1 ✅ |
| 2 | Core komponenty (Tier 1) | M2 ✅ |
| 3 | Pokročilé komponenty (Tier 2) | M3 ✅ |
| 4 | Specifické komponenty (Tier 3) | M4 ✅ |
| 5 | Prototypy (původní verze) | M5 ✅ |
| 6 | Publikace (CI/CD, GH Pages, NPM) | M6 ✅ |
| 7 | Hloubkové review a redesign | M7 ✅ |

*Detaily viz `PLAN-history.md`*

---

## Tech stack

- **React 18+** s TypeScript (strict mode)
- **Vite** pro build
- **Storybook 8** pro dokumentaci
- **CSS custom properties** + režimy (utility/expressive/embed)

---

## Klíčové principy

- **Light mode = primární**
- **Žádné HERO vlny** - čistý design
- **Embed = bez vlastního headeru**
- **Satellite = minimální header**
- **WCAG 2.1 AA** accessibility
