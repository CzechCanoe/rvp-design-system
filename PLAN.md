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
| **Expressive** | Aesthetic styl, bez kanoe.cz kontextu (pouze Athlete, Club, Event) |

Pro Calendar navíc zachovat různé prezentace (Grid/ListView).

---

### 16.1 Veřejné profily (Athlete, Club, Event)

**AthletePublicProfile** (5 → 3) ✅
- [x] Sloučit Aesthetic do Embed/Satellite
- [x] Embed - přepracovat na Aesthetic
- [x] Satellite - přepracovat na Aesthetic
- [x] Expressive - nová varianta (Aesthetic standalone)
- [x] Odstranit: DivokaVoda, EmbedWithSidebar

**ClubPublicProfile** (5 → 3) ✅
- [x] Sloučit Aesthetic do Embed/Satellite
- [x] Embed - přepracovat na Aesthetic
- [x] Satellite - přepracovat na Aesthetic
- [x] Expressive - ponechat, ověřit Aesthetic
- [x] Odstranit: EmbedWithSidebar

**EventDetailPage** (7 → 3) ✅
- [x] Sloučit AestheticRegistration/Live/Schedule/Documents do hlavních variant
- [x] Embed - přepracovat na Aesthetic
- [x] Satellite - přepracovat na Aesthetic
- [x] Expressive - nová varianta (Aesthetic bez kanoe.cz)
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

**ProfilePage** (1 → 2)
- [ ] Embed - nová varianta (Aesthetic)
- [ ] Satellite - přepracovat na Aesthetic

**AthletesListPage** (3 → 2)
- [ ] Embed - přepracovat na Aesthetic
- [ ] Satellite - přepracovat na Aesthetic
- [ ] Odstranit: EmbedWithSidebar

**ClubsListPage** (2 → 2)
- [ ] Embed - přepracovat na Aesthetic
- [ ] Satellite - přepracovat na Aesthetic

**RankingsPage** (5 → 2)
- [ ] Embed - přepracovat na Aesthetic (s section switcher)
- [ ] Satellite - přepracovat na Aesthetic
- [ ] Odstranit: EmbedRychlostni, EmbedVodniTuristika, EmbedArchive (jako props/tabs)

---

## Shrnutí změn

| Prototyp | Před | Po | Varianty |
|----------|------|-----|----------|
| AthletePublicProfile | 5 | 3 | Embed, Satellite, Expressive |
| ClubPublicProfile | 5 | 3 | Embed, Satellite, Expressive |
| EventDetailPage | 7 | 3 | Embed, Satellite, Expressive |
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

| Sekce | Prototypy | Iterace |
|-------|-----------|---------|
| 16.1 Veřejné profily | Athlete, Club, Event | 3 |
| 16.2 Calendar + Results | Calendar, Results | 2 |
| 16.3 LivePage + Registration | Live, Registration | 1 |
| 16.4 Vedlejší prototypy | Dashboard, Profile, AthletesList, ClubsList, Rankings | 3 |
| **Celkem** | **12 prototypů** | **~9** |

---

## Další krok

Pokračovat s **16.4 Vedlejší prototypy** - ProfilePage.

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
