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

#### Priorita 3: Hero/Header vylepšení

**Problém:** AthletePublicProfile a ClubPublicProfile nemají aesthetic hero/header. Header je příliš jednoduchý.

**Cíl:** Dramatický hero jako v EventDetailPage Satellite variantě:
- Fullwidth hero s background image (action photo / club photo)
- Gradient overlay pro čitelnost textu
- Velké display fonty pro jméno
- Stats bar pod hero (wins, podiums, ranking)
- Animované entry efekty

**Úkoly:**
- [ ] AthletePublicProfile - přidat aesthetic hero
  - Background: action photo závodníka (actionImageUrl)
  - Overlay: gradient s section barvou
  - Content: jméno, klub, vlajka, ranking badge
  - Stats bar: wins, podiums, world ranking
- [ ] ClubPublicProfile - přidat aesthetic hero
  - Background: klubové foto nebo pattern
  - Content: název klubu, logo, počet členů, sekce
- [ ] Review dalších kandidátů na hero (EventDetail Embed/ExpressiveEmbed?)

---

#### Priorita 4: Calendar komponenta

**Problém:** Kalendářní mřížka má špatné zarovnání. Většina závodů je o víkendu, takže jsou namačkané vpravo. Dny pondělí-čtvrtek jsou často prázdné.

**Reference:** https://jakubbican.github.io/pages/terminovka (správné zarovnání)

**Řešení:**
- [ ] Analyzovat aktuální Calendar grid implementaci
- [ ] Navrhnout lepší layout:
  - Option A: Začínat týden od pondělí (standard EU)
  - Option B: Kompaktní víkendový pohled
  - Option C: Smart collapsing prázdných dnů
- [ ] Implementovat vybranou variantu
- [ ] Ověřit ListView a Cards varianty (ty jsou OK)

---

#### Priorita 5: EventDetail vylepšení

**Problém:** EventDetailPage Embed a ExpressiveEmbed varianty jsou chudobné oproti Satellite variantě. Satellite má dramatický hero, stats bar, sidebar - Embed/ExpressiveEmbed jsou plain.

**Cíl:** Přenést "wow" prvky ze Satellite do Embed/ExpressiveEmbed variant (v rámci embed kontextu):
- Kompaktní ale dramatický hero (menší výška, ale stále vizuálně zajímavý)
- Stats bar pod hero
- Lepší vizuální hierarchie

**Úkoly:**
- [ ] Porovnat Satellite vs Embed screenshoty
- [ ] Identifikovat klíčové "wow" prvky v Satellite
- [ ] Přenést/adaptovat pro Embed (respektovat kanoe.cz kontext)
- [ ] Přenést/adaptovat pro ExpressiveEmbed (může být víc "wow")

---

#### Priorita 6: ProfilePage konzistence

**Problém:** ProfilePage (přihlášený uživatel) vypadá jinak od zbytku design systému.

**Cíl:** Sjednotit vizuální styl s ostatními prototypy:
- Aesthetic header/hero
- Konzistentní Card styling
- Stejné spacing a typography

**Úkoly:**
- [ ] Screenshotnout ProfilePage Embed a Satellite
- [ ] Porovnat s AthletePublicProfile (veřejný profil)
- [ ] Sjednotit vizuální prvky
- [ ] Zachovat funkční rozdíly (edit tlačítka, dashboard prvky)

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

Pokračovat s **16.5 Polish a opravy** - Priorita 3: Hero/Header vylepšení (AthletesListPage ✅, ClubsListPage ✅, RankingsPage ✅ hotovo).

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
