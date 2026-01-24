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

**Avatar:**
- [ ] Energy glow varianta (`--glow-energy-md`)
- [ ] Border-accent ring option
- [ ] Update Avatar.stories.tsx

**Input/Select/Textarea (forms):**
- [ ] Energy focus ring varianta
- [ ] Display font pro labels (optional prop)

**Tabs:**
- [ ] Energy underline varianta
- [ ] Display font pro tab labels

**Alert/Toast:**
- [ ] Energy varianta pro info/highlight
- [ ] Display font pro title

#### Prototypy - Detailní plán

**LivePage (priorita #1):**
- [ ] Hero sekce:
  - Mesh background (`--bg-mesh-hero`)
  - Grain overlay
  - Display typography pro název závodu
  - Energy badge pro "LIVE" indikátor
  - Staggered reveal animace
- [ ] Results sekce:
  - ResultsTable s aesthetic variantou
  - Energy live indicators
  - Display font pro rank
- [ ] Oncourse sekce:
  - Border-accent pro aktivní závodníky
  - Energy highlights

**AthletePublicPage:**
- [ ] Hero s mesh background
- [ ] Display typography pro jméno
- [ ] Stats cards s border-accent
- [ ] Energy accenty pro highlights (medaile, rekordy)

**ClubPublicProfile:**
- [ ] Obdobně jako AthletePublicPage

**EventDetailPage:**
- [ ] Header s energy CTA ("Sledovat live")
- [ ] Display typography pro název
- [ ] Schedule s border-accent pro aktuální položku

**CalendarPage:**
- [ ] Featured events s border-accent
- [ ] Energy badge pro live závody
- [ ] Mesh background pro hero/filter sekci

**RegistrationPage:**
- [ ] Energy CTA pro hlavní akci
- [ ] Form inputs s energy focus

#### Cleanup - Odstranit nepotřebné varianty (HOTOVO)

**Button:**
- [x] Odstranit `gradient-accent` (nahrazeno `gradient-energy`)
- [x] Finální varianty: primary, secondary, ghost, danger, gradient, gradient-energy

**Badge:**
- [x] Odstranit `gradient-accent`, `gradient-success`, `gradient-error`
- [x] Přidat `energy` variantu (vibrant coral-orange)
- [x] Finální varianty: default, primary, success, warning, error, info, gradient, energy
- [x] Section varianty: dv, ry, vt + vtClass (beze změny)

**Card:**
- [ ] Zhodnotit `glass` variantu - ponechat pouze pokud má jasný use case
- [ ] Zhodnotit `featured` vs nová aesthetic varianta - možná sloučit

**Header:**
- [x] Odstranit `transparent` a `glass` varianty
- [x] Finální varianty: default, elevated, gradient, satellite (4 varianty)

**ResultsTable:**
- [x] Odstranit `glass` style
- [x] Finální style varianty: default, gradient, embed

#### Dokumentace
- [ ] Aktualizovat DESIGN_PRINCIPLES.md:
  - Přidat sekci "Dynamic Sport Aesthetic"
  - Dokumentovat energy color usage
  - Display font guidelines
- [ ] Aesthetic Guidelines story:
  - Kdy použít display font vs body font
  - Energy vs primary color usage
  - Mesh backgrounds appropriate contexts
  - Animation guidelines

---

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

**→ 15.0 Aesthetic aplikace na komponenty → 15.1 LivePage**

Pořadí:
1. Aplikovat aesthetic na Card, Header, Badge, ResultsTable
2. Opravit rozbité věci (15.3) paralelně
3. LivePage s plnou aesthetic integrací

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
