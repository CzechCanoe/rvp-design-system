# PLAN-history.md - Archiv dokončených fází

## Fáze 0-7: Založení projektu (dokončeno)

| Fáze | Popis | Status |
|------|-------|--------|
| 0 | Výzkum a design principy | ✅ |
| 1 | Projektová struktura a tokeny | ✅ |
| 2 | Core komponenty (Tier 1) | ✅ |
| 3 | Pokročilé komponenty (Tier 2) | ✅ |
| 4 | Specifické komponenty (Tier 3) | ✅ |
| 5 | Prototypy (původní verze) | ✅ |
| 6 | Publikace (CI/CD, GH Pages, NPM) | ✅ |
| 7 | Hloubkové review a redesign | ✅ |

---

## Fáze 8: Integrace s kanoe.cz ✅

**Strategie - DVA vizuální kontexty:**
1. **Embed** - neutrální moderní, komponenty v kanoe.cz (BEZ vlastního headeru)
2. **Satellite** - standalone aplikace s minimálním headerem (logo + user)

### Dokončené kroky:
- 8.1 Infrastruktura (embed mode, Container Queries, KanoeCzContext mock)
- 8.2 ResultsTable - embed, container-responsive, slalom featury
- 8.3 Calendar komponenty (CalendarList, CalendarCards)
- 8.4 Nové prototypy (EventDetailPage, AthletePublicProfile, AthleteCard)
- 8.5 Header satellite varianta
- 8.6 Opravy (ResultsTable overflow, věkové kategorie, body; KanoeCzContext vylepšení; odstranění HERO vln)
- 8.7 Prototypy - embed/satellite varianty (Live, Results, Calendar, EventDetail, AthletePublicProfile)
- 8.9 Čištění prototypů (69 → 22 stories v prototypech)
- 8.10 Athletes List Page
- 8.11 Rankings Page
- 8.12 Clubs List Page
- 8.13 Club Public Profile
- 8.14 ProfilePage rozšíření (přihlášky, sledované závody)

---

## Fáze 9: Audit a racionalizace DS ✅

### Výsledky auditu:
- **Před:** 672 stories
- **Po:** ~207 stories (-69%)

### Klíčové změny:
- Sloučení variant do argTypes (section, vtClass, size, color)
- Comparison stories místo jednotlivých variant
- Zachovány všechny komponenty (žádná odstraněna)
- Přidány embed styly do mode.css pro všechny komponenty

### Komponenty s největší redukcí:
| Komponenta | Před | Po |
|------------|------|-----|
| AthleteCard | 40 | 15 |
| LiveIndicator | 30 | 11 |
| ResultsTable | 30 | 13 |
| StatCard | 29 | 12 |
| Button | 25 | 6 |

---

## Fáze 13: Testování integrace ✅

### Playwright testy:
- 125 testů: Component Rendering, CSS Features, Prototype Pages, Dark Mode, Responsive
- Cross-browser: Chrome, Firefox, Safari (WebKit)
- Mobilní viewporty: Pixel 5, iPhone 13

### Accessibility (WCAG 2.1 AA):
**Opraveno:**
- Select, Toast, Timeline, Dropzone, Calendar - ARIA opravy
- Dark mode kontrast - zvýšena opacity sekundárního textu

**Zbývající (nízká priorita):**
- Button ghost, Input disabled, Header dark, Calendar mimo-měsíc dny, AthleteCard sekundární text

---

## Fáze 14: Vylepšení test suite (částečně)

### Dokončeno:
- 14.1 Centrální konfigurace testů (`tests/config.ts`)
- 14.2 Funkční/interakční testy (`tests/interactions.spec.ts` - 36 testů)

### TODO (nízká priorita):
- 14.3 Edge case testy
- 14.4 Rozšíření keyboard navigation
