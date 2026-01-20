# Vizuální audit a analýza mezer

Dokument porovnává současnou implementaci CSK RVP Design System s top světovými referencemi (World Athletics, FIS, UCI) a identifikuje konkrétní vizuální nedostatky.

---

## 1. Srovnání s referencemi

### 1.1 World Athletics (worldathletics.org)

| Aspekt | World Athletics | CSK současný stav | Gap |
|--------|-----------------|-------------------|-----|
| **Barevná paleta** | Fialová/oranžová (#bd94ff/#ff873c), dramatická | Modrá (#1176a6) + neutrály, konzervativní | Chybí expresivní akcenty |
| **Gradienty** | Hero sekce s gradientem, karty s overlay | Pouze AthleteCard featured má gradient | Minimální použití gradientů |
| **Typografie nadpisů** | Custom font "World Athletics", bold, uppercase | Inter regular/medium, bez uppercase | Méně výrazné nadpisy |
| **Hero sekce** | Full-width banner s gradientem a velkým textem | Neimplementováno | Chybí hero komponenta |
| **Shadows** | Soft, vícevrstvé, generous | Pouze sm/md/lg škála, subtle | Shadow systém je slabý |
| **Whitespace** | Generous, expresivní | Kompaktní, utilitární | Chybí expresivní režim |
| **Animace** | Smooth transitions, hover efekty | Základní transitions | Chybí micro-interactions |

### 1.2 FIS (fis-ski.com)

| Aspekt | FIS | CSK současný stav | Gap |
|--------|-----|-------------------|-----|
| **Widget systém** | Modulární, konzistentní cards pro výsledky | Card + StatCard existují | Podobný přístup |
| **Border radius** | 4px konzistentně | 4-16px variabilní | OK |
| **Leaderboard** | Pozice highlighting (1-3 zlatá/stříbrná/bronz) | ResultsTable bez position styling | Chybí medailové zvýraznění |
| **Live timing** | Prominent indikátor, real-time feel | LiveIndicator existuje | OK, ale méně dramatický |
| **Responsive** | Mobile-first, touch optimized | Mobile support existuje | OK |
| **Sticky headers** | Tabulky se sticky headers | Table bez sticky | Chybí sticky headers |

### 1.3 UCI (uci.org)

| Aspekt | UCI | CSK současný stav | Gap |
|--------|-----|-------------------|-----|
| **Data vizualizace** | Sparkline grafy, trendy | StatCard má trend badge | Chybí sparkline/mini grafy |
| **Filtry** | Multi-select, tabs, dropdown kombinace | Tabs + Select existují | OK |
| **Countdown** | Event countdown timer | Neimplementováno | Chybí countdown komponenta |
| **Rankings** | Tabulky s position badges | Table bez ranking styling | Chybí ranking vizualizace |

---

## 2. Konkrétní vizuální nedostatky

### 2.1 Buttons (Button.css)

**Současný stav:**
- Flat design bez shadows
- Hover = pouze barva změní
- Žádné gradient varianty
- Transitions jsou subtle

**Chybí:**
- [ ] Gradient primary varianta (expresivní režim)
- [ ] Subtle shadow na hover (`--shadow-button-hover` není použit)
- [ ] Animated hover efekt (scale nebo glow)
- [ ] Loading state s progress indikátorem

**Porovnání:**
```
World Athletics button:
- Gradient background (purple → deeper purple)
- Shadow na hover
- Scale 1.02 na hover
- Bold uppercase text

CSK button:
- Flat solid background
- Pouze color change na hover
- Žádný scale
- Regular text
```

### 2.2 Cards (Card.css)

**Současný stav:**
- 3 varianty (surface, elevated, outlined)
- Elevated má shadow-card (pouze shadow-sm)
- Hover zvětší shadow a translateY(-2px)

**Chybí:**
- [ ] Gradient background varianta
- [ ] Glassmorphism efekt (backdrop-blur + semi-transparent)
- [ ] Více dramatický hover (shadow-lg místo shadow-md)
- [ ] Colored border accent varianta

**Porovnání:**
```
World Athletics card:
- Subtle gradient overlay
- Generous padding (32px+)
- Dramatic shadow (multiple layers)
- Image overlay s gradient

CSK card:
- Flat background
- Standard padding (16-24px)
- Subtle shadow
- Bez overlay efektů
```

### 2.3 Header (Header.css)

**Současný stav:**
- 3 varianty (default, transparent, elevated)
- Elevated má shadow-md
- Žádný blur efekt

**Chybí:**
- [ ] Backdrop-blur při scrollu
- [ ] Gradient background varianta
- [ ] Transition při scroll (transparent → solid)
- [ ] Mega-menu pattern

### 2.4 AthleteCard (AthleteCard.css)

**Současný stav:**
- Featured varianta má basic gradient (bg-secondary → bg-primary)
- Section border accent (DV/RY/VT)
- Hover s translateY a shadow

**Chybí:**
- [ ] Hero varianta s fotografickým overlay
- [ ] Gradient glow efekt kolem avataru
- [ ] Achievement/medal showcase
- [ ] Dramatičtější featured styling

### 2.5 StatCard (StatCard.css)

**Současný stav:**
- Trend indicator (up/down/neutral)
- Icon container s background
- Loading state

**Chybí:**
- [ ] Sparkline mini-graf
- [ ] Gradient background varianta
- [ ] Animated number transitions
- [ ] Comparison s předchozím obdobím

### 2.6 ResultsTable (ResultsTable.css)

**Současný stav:**
- Základní tabulka s highlighting
- Sortable columns
- Row hover

**Chybí:**
- [ ] Position medals (1-3 zlatá/stříbrná/bronz)
- [ ] Sticky header
- [ ] Animated row changes (pro live)
- [ ] Position delta indikátor (↑↓)
- [ ] Personal best highlighting

### 2.7 LiveIndicator (LiveIndicator.css)

**Současný stav:**
- Pulsující dot s textem
- Červená barva

**Chybí:**
- [ ] Gradient glow efekt
- [ ] Dramatičtější pulsování
- [ ] Varianty (compact, prominent)
- [ ] Sound wave animation varianta

---

## 3. Chybějící vizuální prvky

### 3.1 Design tokeny

| Token | Stav | Potřeba |
|-------|------|---------|
| Gradienty | ❌ Neexistují | Definovat gradient scale |
| Glow efekty | ❌ Neexistují | Definovat glow shadows |
| Expresivní spacing | ❌ Neexistují | 1.5x spacing scale |
| Backdrop blur | ❌ Neexistují | blur-sm, blur-md, blur-lg |
| Expresivní transitions | ❌ Neexistují | Delší, dramatic curves |

### 3.2 Chybějící komponenty

| Komponenta | Priorita | Účel |
|------------|----------|------|
| **HeroSection** | Vysoká | Landing pages, event pages |
| **CountdownTimer** | Střední | Event countdown |
| **Sparkline** | Střední | Mini-grafy ve StatCard |
| **MedalBadge** | Vysoká | 1-2-3 pozice |
| **PhotoOverlay** | Střední | Fotografické karty |
| **GradientCard** | Vysoká | Expresivní varianta Card |

### 3.3 Chybějící vizuální patterns

1. **Fotografický přístup (ICF style)**
   - Akční fotky s gradient overlay
   - Text na fotografii s readable contrast
   - Fullbleed image sekce

2. **Branded feel (CSK identita)**
   - Logo integrace v komponentách
   - Disciplínové vizuální elementy
   - Vodní/sportovní motivy (vlny, dynamické tvary)

3. **Expresivní vs. utilitární režim**
   - Definováno v DESIGN_PRINCIPLES.md
   - Neimplementováno v komponentách
   - Chybí context provider pro přepínání

---

## 4. Prioritizace redesignu

### Vysoká priorita (největší vizuální dopad)

1. **Gradient tokeny** - základ pro expresivní komponenty
2. **Button redesign** - nejčastěji používaná komponenta
3. **Card gradient/glow varianty** - hero karty, featured content
4. **ResultsTable medals** - sportovní specifika
5. **Header backdrop blur** - moderní feel

### Střední priorita

6. **AthleteCard hero varianta** - profil highlight
7. **StatCard sparklines** - dashboard vizualizace
8. **LiveIndicator dramatičtější** - live experience
9. **HeroSection komponenta** - landing pages

### Nižší priorita

10. **Expresivní režim systém** - dual-mode
11. **Countdown timer** - event pages
12. **Branded patterns** - vizuální identita

---

## 5. Závěr

Současná implementace je **funkčně kompletní** ale **vizuálně konzervativní**. Komponenty splňují utilitární účel, ale chybí jim "wow" faktor top sportovních prezentací.

**Klíčové zjištění:** Design systém je na úrovni kvalitního Bootstrap/Tailwind projektu, ale nedosahuje vizuální úrovně World Athletics nebo FIS.

**Doporučení:** Fáze 7.3-7.10 by měly postupně implementovat:
1. Gradient a glow tokeny (7.3)
2. Redesign core komponent s expresivními variantami (7.4)
3. Specifické sportovní prvky - medals, rankings (7.6)
4. Branded vizuální prvky (7.7)
5. Dual-mode expresivní/utilitární systém (7.9)

---

*Dokument vytvořen: 2026-01-20*
*Součást fáze 7.1 - Vizuální audit*
