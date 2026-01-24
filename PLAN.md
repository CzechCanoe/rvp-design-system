# PLAN.md - CSK RVP Design System

## Aktuální stav

| Fáze | Status |
|------|--------|
| 0-7 (Založení) | ✅ Hotovo |
| 8 (Integrace kanoe.cz) | ✅ Hotovo |
| 9 (Audit DS) | ✅ Hotovo |
| 13 (Testování) | ✅ Hotovo |
| 14 (Test suite) | ✅ Částečně |
| **15 (User feedback)** | 🔄 Aktivní |

*Detaily dokončených fází viz `PLAN-history.md`*

---

## Fáze 15: User Feedback Review

**Kontext:** Souhrnné připomínky po procházení Storybooku. Live bude první nasazená věc.

### 15.1 Kritické - LivePage (P0)

**Cíl:** LivePage musí být vymazlená namax - první nasazení.

- [ ] **Oncourse redesign** - více závodníků na trati současně
- [ ] **Detail jízdy** - rozklik s penalizacemi na branách, časy
- [ ] **Mobile fullscreen** - využít celou obrazovku, schovat menu
- [ ] **Výběr "svých jezdců"** - sledování + notifikace kdy jedou
- [ ] **Detailní schedule** - pouč se z Canoe123 XML
- [ ] **Odstranit neužitečné** - "Další na startu", "Aktuální pořadí" → sekundárně

Reference: https://live.results.cz/liveres.php (jak to NEMÁ vypadat)

### 15.2 Kritické - Results komponenta (P1)

**Cíl:** Results je klíčová komponenta, musí být super vymazlená.

- [ ] **Top 3 styling** - přehodnotit barevné pozadí (vypadá jako Excel fail)
- [ ] **Avatary závodníků** - alespoň pro top pozice
- [ ] **Kompletní data** - věkové kategorie, pořadí ve věk. kat., 2 jízdy, penalizace, body
- [ ] **Detail jízdy** - rozklik na penalizace bran, časy startu/cíle
- [ ] **Modrá čára vpravo** - vysvětlit účel nebo změnit
- [ ] **Zredukovat varianty** - příliš mnoho headerů/tabulek

### 15.3 Rozbitév věci (P2)

- [ ] **DashboardPage** - úplně rozbitá
- [ ] **CalendarPage EmbedWithSidebar** - rozbitá
- [ ] **AthletePublicPage small mobile** - nefunguje
- [ ] **AthletePublicPage header cards** - překrývají obsah na mobilech

### 15.4 Design vylepšení (P3)

**AthletePublicPage / ClubPublicProfile:**
- [ ] Pozadí headeru - akční fotka místo tváře (2x stejná tvář)
- [ ] (CZ CZE) chip - odstranit duplicitu
- [ ] Ikony kariérních úspěchů - méně dětinské
- [ ] Export button - k čemu? Zvážit odstranění

**Calendar:**
- [ ] Většina závodů o víkendu - přizpůsobit prezentaci
- [ ] Reference: https://jakubbican.github.io/pages/terminovka

**Results Page:**
- [ ] Top 3 karty nejsou zajímavé - přehodnotit

### 15.5 Nové koncepty

- [ ] **Sdílená hledací komponenta** - fulltext + chipy pro rychlé filtry
- [ ] **Registration UX** - přidávání jezdců, vícečlenné posádky
- [ ] **Event indikace live** - že závod běží a má live results

### 15.6 Rozhodnutí k diskuzi

| Téma | Otázka |
|------|--------|
| **Glass varianty** | Mají smysl? Udělat demo s reálným kontextem |
| **Header varianty** | Příliš mnoho - zredukovat? |
| **Hutný header bez fotky** | Jak v kontextu kanoe.cz? |

---

## Další krok

**→ Začít s 15.3 (rozbitév věci) a pak 15.1 (LivePage)**

Důvod: Opravit rozbitév věci je rychlé a uklidí cestu pro práci na Live.

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
