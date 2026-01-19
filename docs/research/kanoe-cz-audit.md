# Audit kanoe.cz a stávajících systémů

Analýza vizuálního jazyka, komponent a technologií používaných v současných systémech ČSK.

---

## 1. Přehled analyzovaných systémů

| Systém | URL | Účel |
|--------|-----|------|
| **Hlavní web** | kanoe.cz | Prezentace, novinky, navigace |
| **Registr ČSK** | csk.kanoe.cz | Správa členů, klubů, oddílů |
| **Přihlášky** | prihlasky.kanoe.cz | Přihlašování na závody |
| **Slalom World** | slalom-world.com | Výsledkový servis (externí) |

---

## 2. Barevná paleta

### 2.1 Extrahované barvy

| Barva | Hex | Použití |
|-------|-----|---------|
| **Primární modrá** | `#1176a6` | Tlačítka, CTA prvky, hlavní akcent |
| **Černá** | `#000000` | Text, navigace, pozadí |
| **Bílá** | `#ffffff` | Pozadí, text na tmavém |
| **Světle šedá** | `#f5f5f5` | Text na modrém pozadí |
| **Tmavá tyrkysová** | `darkturquoise` | Hover efekty |
| **Polo-průhledná černá** | `rgba(0,0,0,0.5)` | Overlay, cookie bar |

### 2.2 Hodnocení palety

**Pozitiva:**
- Konzistentní primární modrá napříč systémy
- Dobrý kontrast pro čitelnost
- Neutrální základ umožňuje flexibilitu

**Negativa:**
- Omezená barevná škála (chybí sekundární a terciární barvy)
- Žádné disciplínové rozlišení (DV/RY/VT)
- Chybí sémantické barvy (success, warning, error)
- Tmavá tyrkysová jako hover je nekonzistentní

### 2.3 Doporučení pro nový systém

```
Zachovat:
- #1176a6 jako základ primární barvy (kontinuita s brandem)

Přidat:
- Sekundární barva (kontrastní akcent)
- Sémantické barvy (zelená/červená/oranžová)
- Disciplínové barvy (DV/RY/VT)
- VT třídy (M, A, B, C)
- Neutrální škálu (šedé 100-900)
```

---

## 3. Typografie

### 3.1 Současný stav

| Vlastnost | Hodnota | Poznámka |
|-----------|---------|----------|
| **Font family** | System fonts | Žádný definovaný brand font |
| **Nadpisy** | Sans-serif | Bez hierarchie |
| **Body text** | Sans-serif | Standardní velikost |
| **Tabulky** | Monospace-like | Pro data |

### 3.2 Hodnocení

- **Výhoda:** Rychlé načítání (žádné custom fonty)
- **Nevýhoda:** Generický vzhled, chybí identita
- **Nevýhoda:** Nejasná typografická hierarchie

### 3.3 Doporučení

Na základě výzkumu sportovních federací:
- **Nadpisy:** Poppins nebo Inter (bold, moderní, sportovní feel)
- **Body:** Open Sans nebo Source Sans Pro (čitelnost)
- **Monospace:** JetBrains Mono (pro data/časy)

---

## 4. Technologický stack

### 4.1 Frontend (AS-IS)

| Technologie | Verze | Poznámka |
|-------------|-------|----------|
| **CSS Framework** | Bootstrap 4.x | Utility-first, grid system |
| **JavaScript** | jQuery 3.1.1 | DOM manipulace, AJAX |
| **Tabulky** | DataTables | Sortování, filtrování |
| **CMS** | Joomla | Hlavní web kanoe.cz |

### 4.2 Komponenty Bootstrap 4

Používané komponenty:
- **Grid system** (12-column)
- **Buttons** (primary, secondary)
- **Forms** (inputs, selects)
- **Tables** (striped, bordered)
- **Cards** (basic)
- **Modals** (dialogs)
- **Navigation** (navbar, dropdowns)
- **Alerts** (notifications)

### 4.3 DataTables integrace

- Server-side processing
- Custom styling (limitované)
- Export funkce (PDF, Excel)
- Responsive breakpoints

---

## 5. Layout vzory

### 5.1 Navigace

```
┌─────────────────────────────────────────────────────────────┐
│  LOGO    │  Úvod  │  Sporty ▼  │  Závody ▼  │  Přihlášení  │
└─────────────────────────────────────────────────────────────┘
           │
           └──► Dropdown menu s disciplínami
```

**Poznámky:**
- Horizontální hlavní navigace
- Mega-menu pro sporty
- Roční navigace (2015-2026) pro kalendář
- Chybí breadcrumbs

### 5.2 Tabulky závodů

| Sloupec | Obsah |
|---------|-------|
| Datum | DD.MM.YYYY - DD.MM.YYYY |
| Název | Odkaz na detail + mapa |
| Typ | MS, ME, SP, ČP, NKZ |
| Disciplína | sl, sj, sp (zkratky) |
| Stav | (prázdný) |

**Badge systém:**
- MS, ME, SP - světové/evropské akce
- WRR, MEZ - mezinárodní
- MČR, ČP - domácí
- NKZ - nominační

### 5.3 Formuláře

- Standardní Bootstrap 4 layout
- Vertikální uspořádání
- Inline validace (částečná)
- Chybí loading states

---

## 6. Identifikace prvků

### 6.1 Zachovat

| Prvek | Důvod |
|-------|-------|
| **Primární modrá #1176a6** | Brand kontinuita |
| **Badge systém pro typy závodů** | Funguje, uživatelé zvyklí |
| **Roční navigace** | Intuitivní pro kalendář |
| **Tabulkový výpis závodů** | Efektivní pro přehled |
| **DataTables funkcionalita** | Export, řazení, filtrování |

### 6.2 Vylepšit

| Prvek | Problém | Řešení |
|-------|---------|--------|
| **Barevná paleta** | Příliš limitovaná | Rozšířit o sémantické a disciplínové barvy |
| **Typografie** | Generická | Definovat font systém |
| **Buttons** | Základní Bootstrap | Custom design, více variant |
| **Cards** | Nevyužité | Card-based layout pro výsledky |
| **Mobile experience** | Základní responsive | Mobile-first redesign |
| **Dark mode** | Neexistuje | Implementovat |

### 6.3 Nahradit

| Prvek | Problém | Náhrada |
|-------|---------|---------|
| **Bootstrap 4 grid** | Zastaralý | CSS Grid / Flexbox nativní |
| **jQuery AJAX** | Zastaralé | Fetch API / React Query |
| **DataTables styling** | Těžko customizovatelné | Custom table komponenta |
| **Joomla templates** | Rigidní | React komponenty |
| **Inline CSS** | Neudržitelné | Design tokens |

---

## 7. UX problémy k řešení

Na základě analýzy person (T11_UX_PERSONAS.md):

### 7.1 Pro mladé závodníky (Ondra, 14 let)
- **Problém:** Žádný osobní profil
- **Problém:** Výsledky s týdenním zpožděním
- **Problém:** 3 různé weby
- **Řešení:** PWA s notifikacemi, jednotný portál

### 7.2 Pro dospělé závodníky (Tereza, 26 let)
- **Problém:** Nelze se přihlásit sama
- **Problém:** Neví stav prohlídky
- **Řešení:** Self-service, dashboard

### 7.3 Pro oddílové správce (Petr, 45 let)
- **Problém:** 2 různé loginy
- **Problém:** Ruční hromadné operace
- **Řešení:** Jednotný systém, batch operace

---

## 8. Technická doporučení

### 8.1 CSS strategie

Doporučená cesta: **CSS Modules + Design Tokens**

```
Tokens → CSS Variables → Component Styles
```

Alternativy:
- Tailwind + CVA (utility-first)
- Vanilla Extract (type-safe)

### 8.2 Komponenty priority

**Tier 1 (Core):**
1. Button (primární, sekundární, ghost, danger)
2. Input (text, search, number)
3. Select
4. Table (s DataTables funkcionalitou)
5. Badge (typy závodů, VT, sekce)
6. Card

**Tier 2 (Navigation):**
1. Header/Navbar
2. Dropdown menu
3. Breadcrumbs
4. Pagination
5. Tabs

**Tier 3 (Domain-specific):**
1. ResultsTable (s highlighty)
2. AthleteCard
3. LiveIndicator
4. CalendarGrid

---

## 9. Shrnutí

### Klíčové zjištění

1. **Technologie jsou zastaralé** - Bootstrap 4 a jQuery potřebují modernizaci
2. **Vizuální identita je slabá** - chybí definovaný brand, fonty, rozšířená paleta
3. **UX je fragmentovaný** - 3+ systémy bez jednotného designu
4. **Mobile experience je sekundární** - potřeba mobile-first přístup
5. **Dark mode neexistuje** - konkurenční příležitost

### Prioritní akce

1. Definovat design tokens (barvy, typografie, spacing)
2. Vytvořit core komponenty (Button, Input, Table, Badge)
3. Implementovat responsive grid systém
4. Připravit dark mode variantu
5. Navrhnout jednotnou navigaci

---

## Reference

- **Business analýza:** `../csk-rvp-analysis/`
- **Architektura AS-IS:** `T2_ARCHITEKTURA_AS_IS.md`
- **UX Personas:** `T11_UX_PERSONAS.md`
- **Výzkum federací:** `sports-presentation-research.md`

---

*Další krok: Design principy (`docs/DESIGN_PRINCIPLES.md`)*
