# PLAN.md - CSK RVP Design System

## Aktuální stav

| Fáze | Status |
|------|--------|
| 0-14 (Založení až Test suite) | ✅ Hotovo |
| 15 (User feedback) | ✅ Hotovo |
| **16 (Konsolidace prototypů)** | 🔄 Aktivní |

*Detaily dokončených fází viz `PLAN-history.md`*

---

## Fáze 16: Konsolidace prototypů

**Cíl:** Sjednotit všechny prototypy na Aesthetic styl s konzistentními variantami.

### Cílové varianty pro každý prototyp

| Varianta | Popis |
|----------|-------|
| **Embed** | Aesthetic styl, vložené do kanoe.cz kontextu |
| **Satellite** | Aesthetic styl, samostatná hlavička |
| **ExpressiveEmbed** | Aesthetic styl s "wow" efekty, v kanoe.cz kontextu (pouze Athlete, Club, Event) |

Pro Calendar navíc zachovat různé prezentace (Grid/ListView).

---

### 16.1 Veřejné profily (Athlete, Club, Event)

**AthletePublicProfile** (5 → 3) ✅
- [x] Sloučit Aesthetic do Embed/Satellite
- [x] Embed - přepracovat na Aesthetic
- [x] Satellite - přepracovat na Aesthetic
- [x] ExpressiveEmbed - "wow" varianta v kanoe.cz kontextu
- [x] Odstranit: DivokaVoda, EmbedWithSidebar

**ClubPublicProfile** (5 → 3) ✅
- [x] Sloučit Aesthetic do Embed/Satellite
- [x] Embed - přepracovat na Aesthetic
- [x] Satellite - přepracovat na Aesthetic
- [x] ExpressiveEmbed - "wow" varianta v kanoe.cz kontextu
- [x] Odstranit: EmbedWithSidebar

**EventDetailPage** (7 → 3) ✅
- [x] Sloučit AestheticRegistration/Live/Schedule/Documents do hlavních variant
- [x] Embed - přepracovat na Aesthetic
- [x] Satellite - přepracovat na Aesthetic
- [x] ExpressiveEmbed - "wow" varianta v kanoe.cz kontextu
- [x] Odstranit: EmbedWithSidebar

### 16.2 Calendar + Results

**CalendarPage** (9 → 4) ✅
- [x] Embed - Aesthetic grid view
- [x] EmbedListView - Aesthetic list view
- [x] Satellite - Aesthetic (grid default)
- [x] SatelliteListView - Aesthetic list view
- [x] Sloučit: Aesthetic*, LiveEventIndication jako features
- [x] Odstranit: EmbedWithSidebar, EmbedCardsView, původní varianty

**ResultsPage** (4 → 2) ✅
- [x] Embed - přepracovat na Aesthetic
- [x] Satellite - přepracovat na Aesthetic
- [x] Compact jako feature/prop (ne samostatná story)
- [x] Odstranit: EmbedWithSidebar, EmbedCompact

### 16.3 LivePage + Registration

**LivePage** (5 → 2) ✅
- [x] Embed - ověřit plný Aesthetic
- [x] Satellite - ověřit plný Aesthetic
- [x] MobileFullscreen, FavoriteAthletes jako features v hlavních variantách
- [x] Odstranit: EmbedWithSidebar

**RegistrationPage** (6 → 2) ✅
- [x] Embed - nová varianta (Aesthetic)
- [x] Satellite - sloučit všechny Aesthetic* sekce
- [x] CrewRegistration jako feature (dokumentováno v docstrings)
- [x] Odstranit: jednotlivé Aesthetic* stories

### 16.4 Vedlejší prototypy

**DashboardPage** (1 → 2) ✅
- [x] Embed - nová varianta (Aesthetic)
- [x] Satellite - přepracovat na Aesthetic

**ProfilePage** (1 → 2) ✅
- [x] Embed - nová varianta (Aesthetic)
- [x] Satellite - přepracovat na Aesthetic

**AthletesListPage** (3 → 2) ✅
- [x] Embed - přepracovat na Aesthetic
- [x] Satellite - přepracovat na Aesthetic
- [x] Odstranit: EmbedWithSidebar

**ClubsListPage** (2 → 2) ✅
- [x] Embed - přepracovat na Aesthetic
- [x] Satellite - přepracovat na Aesthetic

**RankingsPage** (5 → 2) ✅
- [x] Embed - přepracovat na Aesthetic (s section switcher)
- [x] Satellite - přepracovat na Aesthetic
- [x] Odstranit: EmbedRychlostni, EmbedVodniTuristika, EmbedArchive (jako props/tabs)

### 16.5 Polish a opravy 🔄

#### Priorita 1: Cards layout fix ✅

**Problém:** V AthletePublicProfile a ClubPublicProfile mají Cards (např. Results, Achievements) divné okraje nahoře i po stranách. Také dochází ke kolizi obsahu se Share tlačítkem v headeru.

**Řešení:**
- [x] Opravit CSS spacing pro Cards - odstranit nadbytečné okraje
  - Embed mód: odstraněn horizontální padding (kanoe-embed container ho poskytuje)
  - Hero: negative margin breakout pro full-width efekt v embed kontextu
  - Main content: snížen vertikální padding, odstraněn horizontální
- [x] Vyřešit kolizi se Share tlačítkem (z-index nebo layout adjustment)
  - Embed mód: Share tlačítko absolutně pozicionované v pravém horním rohu
  - Kompaktnější styl tlačítka v embed módu
- [x] Ověřit konzistenci napříč variantami - build prošel

---

#### Priorita 2: Aesthetic styl pro seznamy

**Problém:** AthletesListPage, ClubsListPage a RankingsPage vůbec nevypadají jako Aesthetic styl. Jsou to "plain" seznamy bez vizuální identity.

**Cíl:** Přepracovat na Aesthetic styl konzistentní s ostatními prototypy:
- Display fonty pro nadpisy (font-family: var(--font-display))
- Gradient/mesh pozadí nebo subtle patterns
- Energy accenty pro interaktivní prvky
- Card-based layout místo plain tabulek (nebo aesthetic tabulky)
- Micro-animace při hover/focus

**Úkoly:**
- [x] AthletesListPage - přepracovat na Aesthetic ✅
  - Hero sekce s mesh gradient, diagonal stripe, grain texture
  - Stats bar s energy accent borders a hover efekty
  - Featured sekce se staggered reveal animacemi
  - Filtry stylované jako pills/chips s primary gradient
  - Grid karet s hover lift efekty
- [x] ClubsListPage - přepracovat na Aesthetic ✅
  - Hero sekce s mesh gradient, diagonal stripe, grain texture
  - Stats bar s různými energy accent barvami a hover efekty
  - Karty klubů s gradient logo pozadím, hover lift, accent border
  - Filtry stylované jako aesthetic pills s primary gradient
  - Empty state s aesthetic stylem (dashed border, kulatá ikona)
- [x] RankingsPage - přepracovat na Aesthetic ✅
  - Hero sekce s mesh gradient, diagonal stripe, grain texture
  - Stats bar s energy accent borders a hover efekty (4 barvy)
  - Dramatický podium pro top 3 se staggered reveal animacemi
  - Podium karty s gradient pozadím, colored borders, hover shadows
  - VT class overview s hover efekty a gradient badges
  - Section switcher (DV/RY/VT) jako aesthetic pill tabs
  - Filtry s uppercase labels a aesthetic styling

---

#### Priorita 3: Hero/Header vylepšení ✅

**Stav:** Po analýze zjištěno, že aesthetic hero je již implementován.

**AthletePublicProfile** již má:
- [x] Background: action photo závodníka (actionImageUrl) s fallback na portrait
- [x] Overlay: gradient s section barvou (DV modrý, RY zelený, VT červený)
- [x] Content: jméno (display font), klub, vlajka, ranking badge s animací
- [x] Stats bar: wins, podiums, závody, world ranking (floating cards)
- [x] Hover efekty na background image (parallax-like scale)
- [x] Aesthetic mode: mesh background, energy glow, border-accent

**ClubPublicProfile** již má:
- [x] Background: gradient pattern (solid, bez foto)
- [x] Content: název klubu (display font), logo/initials, sekce badges
- [x] Stats bar: členové, závodníci, trenéři, junioři (floating cards)
- [x] Aesthetic mode: mesh background, energy glow, border-accent, staggered reveal

**Poznámka:** ClubPublicProfile nemá background image, protože kluby typicky nemají "action photo". Gradient pozadí je vhodné řešení.

---

#### Priorita 4: Calendar komponenta ✅

**Problém:** Kalendářní mřížka má špatné zarovnání. Většina závodů je o víkendu, takže jsou namačkané vpravo. Dny pondělí-čtvrtek jsou často prázdné.

**Reference:** https://jakubbican.github.io/pages/terminovka (tabulkový/listový formát)

**Řešení:** Weekend-focused layout
- [x] Analyzovat aktuální Calendar grid implementaci
- [x] Navrhnout lepší layout - vybrán Option C: Weekend-focused layout
  - Víkendové sloupce (So/Ne) mají šířku 1.8fr
  - Všední dny (Po-Pá) mají šířku 1fr
  - Výsledek: víkend dostává ~52% prostoru, všední dny ~48%
- [x] Implementovat `weekendFocused` prop do Calendar komponenty
- [x] Přidat CSS styly s container query responsivitou
- [x] Přidat stories pro dokumentaci nové vlastnosti
- [x] Aplikovat v CalendarPage aesthetic variantách
- [x] ListView a Cards varianty - potvrzeno OK (nepoužívají grid)

---

#### Priorita 5: EventDetail vylepšení ✅

**Problém:** EventDetailPage Embed a ExpressiveEmbed varianty jsou chudobné oproti Satellite variantě. Satellite má dramatický hero, stats bar, sidebar - Embed/ExpressiveEmbed jsou plain.

**Řešení:** Přeneseny "wow" prvky ze Satellite do Embed/ExpressiveEmbed variant:
- [x] Přidány volitelné `showEmbedStats` a `showEmbedCta` props
- [x] Embed zachován kompaktní (bez stats a CTA jako default)
- [x] ExpressiveEmbed dostává:
  - Kompaktní stats bar s border-accent a energy glow
  - CTA tlačítko v hero
  - Diagonal stripe animace
  - Grain texture overlay
  - Větší hero padding
  - Energy glow efekty na title a hover stavy
- [x] Nový `expressive` prop pro aktivaci "wow" dekorací
- [x] CSS pro embed stats bar, kompaktní CTA, expressive dekorace

---

#### Priorita 6: ProfilePage konzistence ✅

**Problém:** ProfilePage (přihlášený uživatel) vypadá jinak od zbytku design systému.

**Řešení:** Přidán aesthetic mode konzistentní s AthletePublicProfile:
- [x] Přidán `aesthetic` prop do ProfilePageProps
- [x] Mesh background pro aesthetic variantu
- [x] Diagonal stripe a grain texture dekorace v hero
- [x] Display font pro jméno (font-family: var(--font-display))
- [x] Energy glow efekty na avatar a ranking badge
- [x] Floating stats cards s border-accent (4 barvy)
- [x] Staggered reveal animace pro cards
- [x] Zachovány funkční rozdíly (edit tlačítka, status karty)
- [x] Reduced motion support

---

**Celkový odhad:** ~6-8 iterací

---

## Shrnutí změn

| Prototyp | Před | Po | Varianty |
|----------|------|-----|----------|
| AthletePublicProfile | 5 | 3 | Embed, Satellite, ExpressiveEmbed |
| ClubPublicProfile | 5 | 3 | Embed, Satellite, ExpressiveEmbed |
| EventDetailPage | 7 | 3 | Embed, Satellite, ExpressiveEmbed |
| CalendarPage | 9 | 4 | Embed, EmbedListView, Satellite, SatelliteListView |
| ResultsPage | 4 | 2 | Embed, Satellite |
| LivePage | 5 | 2 | Embed, Satellite |
| RegistrationPage | 6 | 2 | Embed, Satellite |
| DashboardPage | 1 | 2 | Embed, Satellite |
| ProfilePage | 1 | 2 | Embed, Satellite |
| AthletesListPage | 3 | 2 | Embed, Satellite |
| ClubsListPage | 2 | 2 | Embed, Satellite |
| RankingsPage | 5 | 2 | Embed, Satellite |
| **Celkem** | **53** | **29** | |

---

## Odhad iterací

| Sekce | Popis | Iterace |
|-------|-------|---------|
| 16.1 Veřejné profily | ✅ Athlete, Club, Event | 3 |
| 16.2 Calendar + Results | ✅ Calendar, Results | 2 |
| 16.3 LivePage + Registration | ✅ Live, Registration | 1 |
| 16.4 Vedlejší prototypy | ✅ Dashboard, Profile, AthletesList, ClubsList, Rankings | 3 |
| **16.5 Polish a opravy** | Cards fix, Aesthetic seznamy, Hero, Calendar, EventDetail, Profile | **6-8** |
| **Celkem** | | **~15-17** |

---

## Další krok

**Fáze 16.5 dokončena!** Všechny priority (1-6) jsou hotové. Design system je konzistentní s Aesthetic stylem.

---

## Tech stack

- **React 18+** s TypeScript (strict mode)
- **Vite** pro build
- **Storybook 8** pro dokumentaci
- **CSS custom properties** + režimy (utility/expressive/embed)

## Příkazy

```bash
npm run dev          # Storybook dev server
npm run build        # Production build
npm run test         # Playwright testy
```
