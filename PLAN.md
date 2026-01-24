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

### 15.0 Aesthetic Refresh - "Dynamic Sport" (P0)

**Cíl:** Aplikovat novou vizuální identitu na celý DS pro osobitější vzhled.

#### Foundation (HOTOVO)
- [x] Plus Jakarta Sans display font (`--font-family-display`)
- [x] Energy accent color (coral-orange #f97316, škála 50-900)
- [x] Mesh backgrounds (`--bg-mesh-hero`, `--bg-mesh-card`, `--bg-mesh-primary`)
- [x] Grain texture (`--texture-grain`, `.csk-grain`)
- [x] Diagonal patterns (`--pattern-diagonal`, `.csk-diagonal`)
- [x] Angular clip-paths (`--clip-angle-sm/md/lg`, `.csk-angle`)
- [x] Border accent (`--border-accent-gradient`, `.csk-border-accent`)
- [x] Staggered reveals (`.csk-reveal`, `.csk-reveal-1` až `-6`)
- [x] Sport easings (`--ease-snap`, `--ease-sport`)
- [x] `gradient-energy` Button variant
- [x] Aesthetic.stories.tsx showcase

#### Komponenty - Detailní plán

**Button (HOTOVO):**
- [x] `gradient-energy` varianta
- [x] Display font pro large size (`font-family: var(--font-family-display)`)
- [x] Hover glow efekt - `glow` prop pro energy glow on hover

**Card (HOTOVO):**
- [x] Nová varianta `aesthetic`:
  - Mesh background (`--bg-mesh-card`)
  - Border-accent left side
  - Display font pro title (`.csk-card__title`)
  - Energy glow on hover
- [x] Props: `meshBg?: boolean`, `borderAccent?: boolean`
- [x] Update Card.stories.tsx (Aesthetic, Modifiers, AestheticLiveEvent)

**Header (HOTOVO):**
- [x] Display font pro brand/title text (`csk-header__brand-title`, `csk-header__app-title`)
- [x] Energy CTA button v actions slotu (stories ukázka)
- [x] Update Header.stories.tsx s DisplayFontShowcase

**Badge (HOTOVO):**
- [x] Nová varianta `energy` (coral-orange)
- [x] Display font pro `size="lg"`
- [x] Glow efekt pro `glow` prop s energy barvou
- [x] Update Badge.stories.tsx

**ResultsTable (HOTOVO):**
- [x] Display font pro rank čísla (`.csk-results-table__rank`)
- [x] Energy color pro live indikátor místo red
- [x] Border-accent pro featured řádky (`.csk-results-table__tr--featured`)
- [x] Větší rank čísla pro podium (gold/silver/bronze)
- [x] Live badge component (`.csk-results-table__live-badge`)
- [x] Mesh background wrapper varianta (`.csk-results-table-wrapper--aesthetic`)

**Avatar (HOTOVO):**
- [x] Energy glow varianta (`glow` prop s `--glow-energy-md`)
- [x] Border-accent ring option (`borderAccent` prop)
- [x] Update Avatar.stories.tsx

**Input/Select (forms):** *(HOTOVO)*
- [x] Energy focus ring varianta (`energyFocus` prop s coral-orange glow)
- [x] Display font pro labels (`displayLabel` prop)
- [x] Update stories (EnergyFocus, DisplayLabel, AestheticForm)

**Tabs:** *(1 iterace)*
- [ ] Energy underline varianta (`variant="energy"`)
- [ ] Display font pro tab labels

**Alert/Toast:** *(1 iterace)*
- [ ] Energy varianta pro info/highlight (`variant="energy"`)
- [ ] Display font pro title

#### Prototypy - Detailní plán *(4 iterace celkem)*

**LivePage:** *(1 iterace)*
- [ ] Hero: mesh background, grain, display typography, energy LIVE badge, staggered reveal
- [ ] Results: ResultsTable aesthetic, energy live indicators
- [ ] Oncourse: border-accent pro aktivní závodníky

**AthletePublicPage:** *(1 iterace)*
- [ ] Hero s mesh background + display typography
- [ ] Stats cards s border-accent + energy highlights

**ClubPublicProfile:** *(společně s Athlete)*
- [ ] Obdobně jako AthletePublicPage

**EventDetailPage:** *(1 iterace)*
- [ ] Header s energy CTA ("Sledovat live")
- [ ] Display typography + schedule border-accent

**CalendarPage:** *(1 iterace)*
- [ ] Featured events s border-accent + energy badge pro live
- [ ] Mesh background hero

**RegistrationPage:** *(společně s Calendar)*
- [ ] Energy CTA + form inputs s energy focus

#### Cleanup - Odstranit nepotřebné varianty (HOTOVO)

**Button:**
- [x] Odstranit `gradient-accent` (nahrazeno `gradient-energy`)
- [x] Finální varianty: primary, secondary, ghost, danger, gradient, gradient-energy

**Badge:**
- [x] Odstranit `gradient-accent`, `gradient-success`, `gradient-error`
- [x] Přidat `energy` variantu (vibrant coral-orange)
- [x] Finální varianty: default, primary, success, warning, error, info, gradient, energy
- [x] Section varianty: dv, ry, vt + vtClass (beze změny)

**Card (HOTOVO):**
- [x] Odstranit `glass` variantu (není use case)
- [x] Sloučit `featured` → `aesthetic` (duplicita)
- [x] Finální varianty: surface, elevated, outlined, gradient, aesthetic

**Header:**
- [x] Odstranit `transparent` a `glass` varianty
- [x] Finální varianty: default, elevated, gradient, satellite (4 varianty)

**ResultsTable:**
- [x] Odstranit `glass` style
- [x] Finální style varianty: default, gradient, embed

#### Dokumentace *(HOTOVO)*
- [x] DESIGN_PRINCIPLES.md: "Dynamic Sport Aesthetic" sekce (energy color, display font)
- [x] Aesthetic Guidelines story: display font vs body, energy vs primary, mesh contexts, animations

---

### 15.1 Kritické - LivePage (P0) *(3 iterace)*

**Cíl:** LivePage musí být vymazlená namax - první nasazení.

- [ ] **Oncourse redesign** - více závodníků na trati současně
- [ ] **Detail jízdy** - rozklik s penalizacemi na branách, časy
- [ ] **Mobile fullscreen** - využít celou obrazovku, schovat menu
- [ ] **Výběr "svých jezdců"** - sledování + notifikace kdy jedou
- [ ] **Detailní schedule** - pouč se z Canoe123 XML
- [ ] **Odstranit neužitečné** - "Další na startu", "Aktuální pořadí" → sekundárně

Reference: https://live.results.cz/liveres.php (jak to NEMÁ vypadat)

### 15.2 Kritické - Results komponenta (P1) *(2 iterace)*

**Cíl:** Results je klíčová komponenta, musí být super vymazlená.

- [ ] **Top 3 styling** - přehodnotit barevné pozadí (vypadá jako Excel fail)
- [ ] **Avatary závodníků** - alespoň pro top pozice
- [ ] **Kompletní data** - věkové kategorie, pořadí ve věk. kat., 2 jízdy, penalizace, body
- [ ] **Detail jízdy** - rozklik na penalizace bran, časy startu/cíle
- [ ] **Modrá čára vpravo** - vysvětlit účel nebo změnit
- [ ] **Zredukovat varianty** - příliš mnoho headerů/tabulek

### 15.3 Rozbité věci (P2) *(2 iterace)*

- [ ] **DashboardPage** - úplně rozbitá
- [ ] **CalendarPage EmbedWithSidebar** - rozbitá
- [ ] **AthletePublicPage small mobile** - nefunguje
- [ ] **AthletePublicPage header cards** - překrývají obsah na mobilech

### 15.4 Design vylepšení (P3) *(2 iterace)*

**AthletePublicPage / ClubPublicProfile:**
- [ ] Pozadí headeru - akční fotka místo tváře (2x stejná tvář)
- [ ] (CZ CZE) chip - odstranit duplicitu
- [ ] Ikony kariérních úspěchů - méně dětinské
- [ ] Export button - k čemu? Zvážit odstranění

**Calendar:**
- [ ] Většina závodů o víkendu - přizpůsobit prezentaci

**Results Page:**
- [ ] Top 3 karty nejsou zajímavé - přehodnotit

### 15.5 Nové koncepty *(2 iterace)*

- [ ] **Sdílená hledací komponenta** - fulltext + chipy pro rychlé filtry
- [ ] **Registration UX** - přidávání jezdců, vícečlenné posádky
- [ ] **Event indikace live** - že závod běží a má live results

---

## Odhad iterací

| Sekce | Iterace |
|-------|---------|
| 15.0 Komponenty (~~Avatar~~, ~~Forms~~, Tabs, Alert) | 2 |
| 15.0 Prototypy | 4 |
| ~~15.0 Cleanup + Dokumentace~~ | ~~2~~ ✅ |
| 15.1 LivePage (P0) | 3 |
| 15.2 Results (P1) | 2 |
| 15.3 Rozbité věci (P2) | 2 |
| 15.4 Design vylepšení (P3) | 2 |
| 15.5 Nové koncepty | 2 |
| **Celkem** | **~19** |

---

## Další krok

**→ 15.0 Komponenty (Tabs, Alert) → Prototypy → 15.1 LivePage**

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
