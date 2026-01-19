# Výzkum sportovních prezentací

Analýza vizuální identity a UX vzorů předních světových a domácích sportovních federací pro design systém CSK.

---

## 1. Mezinárodní kanoistická federace (ICF)

**URL:** canoeicf.com

### Barevná paleta
- **Primární:** Tmavě modrá/navy (navigace, hlavičky)
- **Sekundární:** Bílá/světle šedá (obsahové pozadí)
- **Akcent:** Červená/korálová (v partnerských logech)
- **Podpůrné:** Modré gradienty v obrazech

### Typografie
- Drupal-based systém se standardními web fonty
- Víceúrovňová hierarchie nadpisů
- Serifový přístup pro čitelnost

### Layout vzory
- **Navigace:** Mega-menu s disciplínami (Slalom, Sprint, Marathon...)
- **Hero:** Obrazový karusel s featured novinkami
- **Karty:** Novinky s obrázky, titulky a taxonomy tagy
- **Grid:** Multi-column pro události a partnery

### Klíčové poznatky
- Fotograficky orientovaný design s akčními záběry
- Disciplíny NEJSOU barevně odlišeny (textové filtry)
- Události organizovány chronologicky, ne vizuálně
- Žádný dark mode
- Live coverage jako externí odkaz, ne embedded

---

## 2. World Athletics

**URL:** worldathletics.org

### Barevná paleta
- **Primární:** Fialová/Violet (#bd94ff)
- **Sekundární:** Oranžová (#ff873c)
- **Neutrální:** Černý text na bílém pozadí

### Typografie
- **Primární font:** 'World Athletics' (custom)
- **Sekundární:** 'PP Formula' (weights: 400, 600, 900)
- Fallback: Arial, sans-serif
- Base size: 16px

### Layout vzory
- Horizontální navigace s dropdown menu
- Full-width hero bannery
- Grid layout pro video galerie
- Generous whitespace

### Klíčové poznatky
- **Inside Track LIVE** - real-time leaderboardy, split časy
- Moderní, současný design
- Vysoká kvalita fotografií
- Geo-restricted obsah (broadcasting matrix)
- Žádný dark mode

---

## 3. Union Cycliste Internationale (UCI)

**URL:** uci.org

### Barevná paleta
- Specifické barvy nejsou v markup viditelné
- Profesionální sportovní estetika

### Layout vzory
- Hierarchická navigace (disciplíny → submenu)
- Widget-based architektura (rankingWidget, raceHub)
- Tabs pro results/rankings

### Klíčové poznatky
- Live timing a video feeds
- Vícenásobné filtrovací systémy
- Countdown timery pro události
- Vícejazyčná lokalizace
- Data-centric přístup

---

## 4. Mezinárodní lyžařská federace (FIS)

**URL:** fis-ski.com

### Barevná paleta
- **Primární:** Deep blue (`ftw-bg-fis-primary`)
- **Sekundární:** Světlejší variace pro hover stavy
- **Pozadí:** Bílá s tmavými overlay

### Typografie
- Scalable system (xs, sm, md)
- Desktop/mobile varianty
- Tracking: -0.42px
- Line-height: 130-150%

### Layout vzory
- **Grid:** 3 columns desktop → 1-2 mobile
- **Karty:** Latest results, Leaderboards, Championships
- **Navigace:** Disciplíny (Alpine, Cross-Country, Ski Jumping)

### Klíčové poznatky
- Widget-based zobrazení výsledků
- Rounded corners (4px) pro moderní vzhled
- Konzistentní component reuse
- Responsive-first development
- Pouze light mode

---

## 5. Český atletický svaz (ČAS)

**URL:** atletika.cz

### Barevná paleta
- **Primární:** Modrá (#0b5ea0)
- **Akcent:** Červená (#d92530)
- **Neutrální:** Šedé (#646464, #f2f2f2)
- **Inverze:** Barvy se prohazují při otevření org menu

### Typografie
- **Nadpisy:** Poppins (bold, uppercase)
- **Body:** Open Sans
- Navigation: 1.3rem, font-weight 700
- Body: 1.6rem, line-height 1.5
- Headings: až 3rem

### Layout vzory
- **Grid:** 3fr + 1fr (main + sidebar)
- **Tabulky:** responsive-flip pro mobile
- **Karty:** box-shadow, hover states

### Klíčové poznatky
- **Červený/modrý toggle** - organizační flexibilita
- Tabulky s alternujícími řádky
- AJAX bez reload (Naja framework)
- Extensive CSS custom properties
- Accessibility-first přístup

---

## 6. Fotbalová asociace ČR (FAČR)

**URL:** fotbal.cz

### Barevná paleta
- Minimalistický přístup
- Bílé pozadí, tmavý text
- Modré akcenty (UEFA/FIFA affiliate)

### Typografie
- **Primární:** Config (400, 600, 700)
- **Display:** Maison Neue Extended (600)
- WOFF2/WOFF formáty

### Layout vzory
- Modulární card-based systém
- Responsive image optimization
- Breadcrumb navigace
- Two-column footer

### Klíčové poznatky
- Institucionální profesionalita
- Čistý grid layout
- Broadcast partnership integration
- Multi-language support (CZ/EN)

---

## Shrnutí a doporučení pro CSK Design System

### Společné vzory úspěšných federací

| Aspekt | Zjištění |
|--------|----------|
| **Barvy** | 2-3 primární barvy + neutrální škála |
| **Typografie** | Custom nebo premium fonty, jasná hierarchie |
| **Layout** | Card-based systémy, responsive grids |
| **Navigace** | Mega-menu nebo disciplínová hierarchie |
| **Výsledky** | Widget/tab-based prezentace, live indikátory |
| **Dark mode** | Většina federací NEMÁ dark mode |

### Doporučení pro CSK

1. **Barevná paleta**
   - Zachovat kontinuitu s kanoe.cz (modrá základna)
   - Přidat expresivní akcenty pro veřejné sekce
   - Připravit dark mode jako konkurenční výhodu

2. **Typografie**
   - Zvážit Poppins/Inter pro nadpisy (moderní, čitelné)
   - Open Sans/Source Sans pro body text
   - Jasná hierarchie: 3-4 úrovně nadpisů

3. **Layout patterns**
   - Card-based systém pro události a výsledky
   - Responsive grid (3 → 2 → 1 column)
   - Widget architektura pro dashboard komponenty

4. **Disciplínové rozlišení**
   - Barevné kódování pro DV/RY/VT sekce
   - Subtilní, ne dominantní (učit se od ICF)

5. **Live výsledky**
   - Pulsující indikátor (jako timing-design-system)
   - Real-time aktualizace bez reload
   - Mobilní optimalizace priority

6. **Česká specifika**
   - Inspirace z atletika.cz (Poppins + Open Sans)
   - Dual-color přepínání může fungovat pro sekce
   - AJAX/SPA přístup pro plynulost

### Vizuální moodboard reference

| Federace | Síla | Využít pro |
|----------|------|------------|
| World Athletics | Fialová/oranžová kombinace, moderní feel | Inspirace pro barevné akcenty |
| FIS | Widget systém, rounded corners | Results components |
| ČAS | Česká lokalizace, Poppins font | Typography baseline |
| ICF | Fotografický přístup, mega-menu | Navigation patterns |

---

## Další kroky

- [ ] Audit kanoe.cz - extrakce stávající palety
- [ ] Výběr konkrétních fontů
- [ ] Definice barevných tokenů
- [ ] Design principles dokument
