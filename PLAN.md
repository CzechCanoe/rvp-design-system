# PLAN.md - CSK RVP Design System

## Aktuální stav

| Fáze | Krok | Status |
|------|------|--------|
| **8 - Integrace** | 8.9 Čištění prototypů | ✅ Hotovo |
| **8 - Integrace** | 8.10 Athletes List | ✅ Hotovo |
| **8 - Integrace** | 8.11 Rankings Page | ✅ Hotovo |
| **8 - Integrace** | 8.12 Clubs List | ✅ Hotovo |
| **8 - Integrace** | 8.13 Club Public Profile | ✅ Hotovo |
| **8 - Integrace** | 8.14 ProfilePage rozšíření | 🔲 Čeká |
| **9 - Audit DS** | 9.1-9.4 Audit a racionalizace | 🔲 Čeká |
| **13 - Testování** | Playwright testy integrace | 🔲 Později |

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

### 8.9 Čištění prototypů - VYMAZAT CREEPY STORIES ✅

**Problém:** Prototypy obsahují příliš mnoho stories. Většina jsou "creepy" standalone varianty s hero sekcemi, které nebudou použity. Užitečné jsou pouze Embed a Satellite varianty.

**Strategie:**
1. Prototypy BEZ embed/satellite variant → kompletně předělat
2. Prototypy S embed/satellite variantami → smazat standalone stories, nechat embed/satellite

#### 8.9.1 Prototypy k ÚPLNÉMU PŘEDĚLÁNÍ (nemají embed/satellite)

| Prototyp | Aktuální stories | Cílový stav |
|----------|-----------------|-------------|
| **ProfilePage** | 5× standalone s hero | 1× Satellite (interní profil) |
| **DashboardPage** | 5× standalone | 1× Satellite (admin dashboard) |
| **RegistrationPage** | 6× standalone s hero | 1× Satellite (wizard přihlášek) |

**Postup:**
- [x] ProfilePage → přidat `variant` prop, smazat creepy stories, přidat Satellite story
- [x] DashboardPage → přidat `variant` prop, sloučit admin varianty, přidat Satellite story
- [x] RegistrationPage → přidat `variant` prop, smazat hero stories, přidat Satellite story

#### 8.9.2 Prototypy k VYČIŠTĚNÍ (mají embed/satellite) ✅

| Prototyp | Smazat | Nechat |
|----------|--------|--------|
| **LivePage** | 7× standalone | Embed, Satellite, EmbedWithSidebar |
| **EventDetailPage** | 9× standalone | Embed, Satellite, EmbedWithSidebar |
| **ResultsPage** | 7× standalone | Embed, Satellite, EmbedWithSidebar, EmbedCompact |
| **CalendarPage** | 8× standalone | Embed, Satellite, EmbedWithSidebar, EmbedListView, EmbedCardsView |
| **AthletePublicProfile** | 3× sloučit | DivokaVoda (expressive), Embed, Satellite, EmbedWithSidebar |

**Postup:**
- [x] LivePage → smazat: Default, Static, Rychlostni, VodniTuristika, K1Zeny, FastUpdates, SlowUpdates
- [x] EventDetailPage → smazat: Upcoming, Registration, Live, Finished, Rychlostni, VodniTuristika, Schedule, Participants, Documents
- [x] ResultsPage → smazat: Default, Live, K1Zeny, C1Muzi, Compact, Rychlostni, VodniTuristika
- [x] CalendarPage → smazat: Default, DivokáVoda, Rychlostní, VodníTuristika, Compact, BezLive, ListView, CardsView
- [x] AthletePublicProfile → sloučit Rychlostni, VodniTuristika, BezFotky do jedné story s args

#### 8.9.3 Výsledný počet stories

| Prototyp | Před | Po |
|----------|------|-----|
| ProfilePage | 5 | 1 |
| DashboardPage | 5 | 1 |
| RegistrationPage | 6 | 1 |
| LivePage | 10 | 3 |
| EventDetailPage | 12 | 3 |
| ResultsPage | 11 | 4 |
| CalendarPage | 13 | 5 |
| AthletePublicProfile | 7 | 4 |
| **CELKEM** | **69** | **22** |

**Milestone M8.9:** Prototypy obsahují pouze užitečné varianty (Embed, Satellite)

---

### 8.10 Athletes List - nový prototyp ✅

**Účel:** Veřejný seznam závodníků pro kanoe.cz - vyhledávání, filtrování, featured athletes.

#### Funkcionalita:
- [x] **Featured Athletes** - sekce s vybranými závodníky (reprezentanti, mistři ČR)
- [x] **Vyhledávání** - fulltext search podle jména, klubu
- [x] **Filtry** - sekce (DV/RY/VT), VT třída (pro VT sekci)
- [x] **Seznam výsledků** - karty s AthleteCard komponentou
- [x] **Základní statistiky** - počet závodníků, klubů, reprezentantů, sekcí
- [x] **Řazení** - podle jména, žebříčku, klubu, roku narození
- [x] **Paginace** - stránkování výsledků

#### Varianty:
- [x] **Embed** - v KanoeCzContext, bez vlastního headeru
- [x] **Satellite** - standalone s satellite headerem
- [x] **EmbedWithSidebar** - demonstrace v úzkém sloupci

#### Komponenty využité:
- AthleteCard (featured + default varianty)
- Input (search)
- Select (VT třída, řazení)
- Tabs (sekce)
- Pagination
- Card (filtry panel)

---

### 8.11 Rankings Page - nový prototyp ✅

**Účel:** Veřejné žebříčky nahrazující Slalom World. MUST požadavek (FR-ZS-09).

#### Funkcionalita:
- [x] **Celkové žebříčky** - per sekce (DV/RY/VT), per disciplína
- [x] **Bodové tabulky** - slalom, sjezd, sprint, maratón...
- [x] **VT přehled** - výkonnostní třídy závodníků (M, A, B, C s počty a limity)
- [x] **Historické žebříčky** - archiv s upozorněním na migrovaná data ze SW
- [x] **Filtrace** - sezóna, kategorie, pohlaví, věková kategorie
- [x] **Top 3 podium** - vizuální zobrazení nejlepších závodníků

#### Varianty:
- [x] **Embed** - v KanoeCzContext, bez vlastního headeru
- [x] **Satellite** - standalone s satellite headerem
- [x] **EmbedRychlostni** - rychlostní kanoistika
- [x] **EmbedVodniTuristika** - VT třídy přehled
- [x] **EmbedArchive** - archivní data s upozorněním

#### Komponenty využité:
- ResultsTable (s custom renderCell pro body a počet závodů)
- Tabs (sekce)
- Select (sezóna, disciplína, kategorie, věková kat.)
- Badge (VT třída)
- Card (filtry)
- Pagination

---

### 8.12 Clubs List Page - nový prototyp ✅

**Účel:** Veřejný seznam klubů/oddílů pro kanoe.cz. Analogie k Athletes List.

#### Funkcionalita:
- [x] **Vyhledávání** - fulltext search podle názvu klubu, města
- [x] **Filtry** - sekce (DV/RY/VT), region/kraj
- [x] **Seznam klubů** - kompaktní karty s ClubCard komponentou
- [x] **Statistiky** - počet klubů, členů, závodníků, krajů
- [x] **Řazení** - podle názvu, počtu členů, závodníků, města
- [x] **Paginace** - stránkování výsledků

#### Varianty:
- [x] **Embed** - v KanoeCzContext, bez vlastního headeru
- [x] **Satellite** - standalone s satellite headerem

#### Komponenty využité:
- ClubCard (inline komponenta v prototypu)
- Badge (sekce klubu)
- Input (search)
- Select (filtry)
- Tabs (sekce)
- Pagination
- Card (filtry panel)

---

### 8.13 Club Public Profile - nový prototyp ✅

**Účel:** Veřejný profil klubu/oddílu. Analogie k Athlete Public Profile.

#### Funkcionalita:
- [x] **Header** - logo, název, kontakt, region
- [x] **Statistiky** - počet členů, závodníků, trenérů, juniorů
- [x] **Seznam členů** - aktivní závodníci klubu s Avatar komponentou
- [x] **Úspěchy klubu** - historické milníky (jako u závodníků)
- [x] **Kontakt** - adresa, e-mail, telefon, web
- [x] **Sekce** - ve kterých sekcích klub působí (DV/RY/VT)

#### Varianty:
- [x] **Expressive** - standalone s hero sekcí
- [x] **Embed** - v KanoeCzContext, bez vlastního headeru
- [x] **Satellite** - standalone s satellite headerem
- [x] **EmbedWithSidebar** - demonstrace container queries v úzkém sloupci

#### Komponenty využité:
- Avatar (členové klubu)
- Badge (sekce)
- Tabs (navigace)
- Button, Header (satellite)

---

### 8.14 Profile Page rozšíření - sledování závodů 🔲

**Účel:** Rozšíření interního profilu závodníka (ProfilePage) o přehled přihlášek a sledované závody.

#### Nová funkcionalita:
- [ ] **Moje přihlášky** - seznam nadcházejících závodů, na které jsem přihlášen
  - Stav přihlášky (potvrzeno, čeká na platbu...)
  - Quick actions (odhlásit se, detail závodu)
- [ ] **Zašpendlené závody** - závody které sleduji, i když nejsem přihlášen
  - Notifikace při zveřejnění: rozpis, startovka, propozice, výsledky
  - Rychlé přihlášení se
- [ ] **Historie přihlášek** - archiv minulých přihlášek s výsledky
- [ ] **Stav prohlídky** - varování před expirací

#### UI prvky:
- [ ] **Pin/Unpin button** na EventDetailPage a CalendarPage
- [ ] **Badge s počtem** zašpendlených závodů
- [ ] **Timeline/Feed** aktualizací sledovaných závodů

#### Varianty:
- [ ] **Satellite** - pouze satellite (interní aplikace)

---

**Milestone M8:** Prototypy demonstrují reálnou integraci do kanoe.cz

---

## Fáze 9: Audit a racionalizace DS 🔲

**Kontext:** Design systém narostl organicky. Je potřeba zhodnotit, co je skutečně potřeba, a nastavit systematickou úroveň rozsahu a podrobnosti.

**Cíl:** Postavit DS "na zem" - odstranit nepotřebné, zjednodušit přebujelé, sjednotit úroveň detailu.

### 9.1 Audit komponent - VÝZKUM

Projít všechny komponenty a vyhodnotit:

| Otázka | Kritérium |
|--------|-----------|
| **Je komponenta potřeba?** | Používá se v prototypech? Bude použita v reálné aplikaci? |
| **Jsou všechny varianty potřeba?** | Kolik variant se skutečně používá vs. kolik existuje "pro jistotu"? |
| **Je úroveň detailu přiměřená?** | Není komponenta over-engineered? Chybí naopak něco důležitého? |
| **Je konzistentní s ostatními?** | Stejné naming conventions, prop patterns, CSS struktura? |
| **Je kompatibilní s kanoe.cz?** | Jak vypadá v embed módu vedle Bootstrap 4 prvků? Nevyčnívá? |

#### 9.1.1 Audit Tier 1 (Core) - 10 komponent
- [ ] **Button** - varianty, velikosti, stavy
- [ ] **Badge** - varianty, section/vtClass speciality
- [ ] **Card** - varianty (surface, elevated, outlined, gradient, glass, featured)
- [ ] **Input** - typy, velikosti, stavy
- [ ] **Select** - komplexnost vs. použití
- [ ] **Checkbox** - potřebnost, varianty
- [ ] **Radio** - potřebnost, varianty
- [ ] **Switch** - potřebnost, varianty
- [ ] **Avatar** - velikosti, varianty
- [ ] **Skeleton** - potřebnost

#### 9.1.2 Audit Tier 2 (Advanced) - 10 komponent
- [ ] **Tabs** - varianty (line, pills, underline)
- [ ] **Modal** - potřebnost, varianty
- [ ] **Dropdown** - komplexnost
- [ ] **Pagination** - varianty
- [ ] **Toast** - potřebnost, varianty
- [ ] **Progress** - typy (bar, circular), potřebnost
- [ ] **EmptyState** - varianty, potřebnost
- [ ] **Dropzone** - potřebnost (použití v prototypech?)
- [ ] **Table** - duplicita s ResultsTable?
- [ ] **Timeline** - potřebnost, použití

#### 9.1.3 Audit Tier 3 (Specific) - 8 komponent
- [ ] **ResultsTable** - komplexnost, varianty, slalom-specifické featury
- [ ] **Calendar** - varianty (month view)
- [ ] **CalendarList** - duplicita s Calendar?
- [ ] **CalendarCards** - duplicita s Calendar?
- [ ] **LiveIndicator** - varianty
- [ ] **Header** - varianty (default, satellite)
- [ ] **Navigation** - komplexnost
- [ ] **AthleteCard** - varianty, použití
- [ ] **StatCard** - potřebnost, duplicita s Card?
- [ ] **KanoeCzContext** - mock komponenta, zachovat pro Storybook

#### 9.1.4 Audit Stories
- [ ] Kolik stories má každá komponenta?
- [ ] Jsou stories užitečné pro dokumentaci, nebo jen "pro ukázku"?
- [ ] Duplicitní stories (section varianty jako samostatné stories vs. args)?

#### 9.1.5 Audit kompatibility s kanoe.cz (embed mód)

Pro každou komponentu v embed módu ověřit vizuální soulad s Bootstrap 4 stylem kanoe.cz:

| Aspekt | Co kontrolovat |
|--------|----------------|
| **Barvy** | Text (#212529), borders (#dee2e6), pozadí (#f8f9fa) |
| **Border-radius** | Bootstrap 4 = 4px (.25rem), ne příliš zaoblené |
| **Shadows** | Minimální nebo žádné (Bootstrap 4 je flat) |
| **Typography** | Font-size, line-height, font-weight kompatibilní |
| **Spacing** | Padding/margin odpovídá Bootstrap spacing scale |
| **Interaktivní stavy** | Hover, focus, active - nevyčnívají |

**Kontrolní seznam pro embed (28 komponent):**

*Tier 1 - Core:*
- [ ] Button - nevypadá "příliš designově" vedle BS4 buttonů?
- [ ] Badge - velikost a styl odpovídá BS4 badges?
- [ ] Card - stíny a border-radius nejsou moc výrazné?
- [ ] Input - ladí s BS4 form-control?
- [ ] Select - ladí s BS4 custom-select?
- [ ] Checkbox - ladí s BS4 custom-checkbox?
- [ ] Radio - ladí s BS4 custom-radio?
- [ ] Switch - ladí s BS4 custom-switch?
- [ ] Avatar - neutrální vzhled?
- [ ] Skeleton - neutrální vzhled?

*Tier 2 - Advanced:*
- [ ] Tabs - styl odpovídá BS4 nav-tabs?
- [ ] Modal - styl odpovídá BS4 modal?
- [ ] Dropdown - styl odpovídá BS4 dropdown?
- [ ] Pagination - styl odpovídá BS4 pagination?
- [ ] Toast - styl odpovídá BS4 toast/alert?
- [ ] Progress - styl odpovídá BS4 progress?
- [ ] EmptyState - neutrální vzhled?
- [ ] Dropzone - neutrální vzhled?
- [ ] Table - styl odpovídá BS4 table?
- [ ] Timeline - neutrální vzhled?

*Tier 3 - Specific:*
- [ ] ResultsTable - header a řádky ladí s BS4 tables?
- [ ] Calendar/CalendarList/CalendarCards - neutrální vzhled?
- [ ] LiveIndicator - není moc výrazný?
- [ ] Header - satellite varianta je neutrální?
- [ ] Navigation - ladí s BS4 nav?
- [ ] AthleteCard - neutrální v embed?
- [ ] StatCard - neutrální v embed?

**Výstup:** Seznam komponent vyžadujících úpravu embed stylů v `mode.css`

---

### 9.2 Definice úrovně rozsahu DS

**Rozhodnutí k učinění:**

#### A) Šíře pokrytí
| Úroveň | Popis |
|--------|-------|
| **Minimální** | Pouze komponenty přímo potřebné pro prototypy |
| **Střední** | Core + komponenty pro běžné UI patterny |
| **Široká** | Kompletní UI toolkit pro jakoukoliv aplikaci |

→ **Doporučení:** Střední úroveň - pokrýt reálné potřeby, ne hypotetické

#### B) Hloubka variant
| Úroveň | Popis |
|--------|-------|
| **Minimální** | 1-2 varianty na komponentu |
| **Střední** | 3-4 varianty pro klíčové komponenty |
| **Široká** | 5+ variant, všechny edge cases |

→ **Doporučení:** Minimální až střední - každá varianta musí mít reálné využití

#### C) Režimy zobrazení
| Režim | Zachovat? |
|-------|-----------|
| **Utility** | ❓ Používá se vůbec? Nebo jen embed a expressive? |
| **Expressive** | ✅ Ano - pro AthletePublicProfile a podobné |
| **Embed** | ✅ Ano - hlavní use case |

---

### 9.3 Výstup auditu → Plán racionalizace

Po dokončení 9.1 a 9.2 vznikne konkrétní plán:

- [ ] **9.3.1** Seznam komponent k ODSTRANĚNÍ (nepoužívané)
- [ ] **9.3.2** Seznam komponent ke ZJEDNODUŠENÍ (příliš mnoho variant)
- [ ] **9.3.3** Seznam komponent k SJEDNOCENÍ (nekonzistentní API/styling)
- [ ] **9.3.4** Seznam stories k ODSTRANĚNÍ (duplicitní, neužitečné)
- [ ] **9.3.5** Aktualizace design tokenů (nepoužívané tokeny)
- [ ] **9.3.6** Seznam úprav embed stylů pro kompatibilitu s kanoe.cz

---

### 9.4 Implementace racionalizace

*(Konkrétní kroky doplníme po dokončení auditu)*

- [ ] Odstranit nepotřebné komponenty
- [ ] Zjednodušit přebujelé komponenty
- [ ] Sjednotit API a naming conventions
- [ ] Vyčistit CSS tokeny
- [ ] Upravit embed styly pro lepší kompatibilitu s kanoe.cz
- [ ] Aktualizovat dokumentaci

**Milestone M9:** DS je racionalizovaný, konzistentní a odpovídá reálným potřebám

---

## Fáze 13: Testování integrace 🔲

**Kontext:** Finální ověření, že komponenty fungují správně v embed kontextu a splňují požadavky na responzivitu a přístupnost.

### 13.1 Playwright testy
- [ ] Embed varianty všech prototypů
- [ ] Container query breakpoint testy
- [ ] Overflow/layout testy v úzkých kontejnerech

### 13.2 Cross-browser testování
- [ ] Chrome, Firefox, Safari
- [ ] Mobilní viewporty

### 13.3 Accessibility audit
- [ ] WCAG 2.1 AA compliance
- [ ] Kontrast textu na všech variantách
- [ ] Keyboard navigation

**Milestone M13:** Komponenty jsou otestované a připravené k nasazení

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
