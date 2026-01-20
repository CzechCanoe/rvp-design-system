# Review barevné palety - Fáze 7.3

## Hodnocení současného stavu

### Primární barvy

| Token | Hodnota | Hodnocení |
|-------|---------|-----------|
| `--color-primary-500` | #1176a6 | ✅ OK - zachovává kontinuitu s kanoe.cz |
| Primary scale (50-900) | 10 úrovní | ✅ OK - kompletní škála |

**Závěr:** Primární modrá je vhodná pro brand kontinuitu, ale je konzervativní.

### Neutrální barvy

| Aspekt | Hodnocení |
|--------|-----------|
| Škála 0-950 | ✅ OK - 13 úrovní, dostatečná granularita |
| Light mode kontrast | ✅ OK - WCAG AA splněno |
| Dark mode adaptace | ✅ OK - invertovaná škála |

### Feedback barvy (Success, Warning, Error, Info)

| Aspekt | Hodnocení |
|--------|-----------|
| Kompletnost škál | ✅ OK - každá má 50-900 |
| Sémantické aliasy | ✅ OK - bg, border, text varianty |
| Dark mode adaptace | ✅ OK - jasnější pro tmavé pozadí |

### CSK specifické barvy

| Token | Účel | Hodnocení |
|-------|------|-----------|
| `--color-section-dv` | Divoká voda | ✅ OK |
| `--color-section-ry` | Rychlostní | ✅ OK |
| `--color-section-vt` | Vodní turistika | ✅ OK |
| `--color-vt-*` | VT třídy | ✅ OK |

---

## Identifikované nedostatky

### 1. Chybí expresivní akcentní barvy

**Problém:** World Athletics používá fialovou/oranžovou kombinaci pro dramatický efekt. Naše paleta má pouze konzervativní modrou.

**Doporučení:** Přidat sekundární akcentní barvu pro:
- Hero sekce
- CTA tlačítka
- Featured content

**Návrh:** Oranžová/jantarová jako kontrast k modré:
```css
--color-accent-500: #f59e0b; /* Warm amber */
```

### 2. Chybí gradient tokeny

**Problém:** Visual-gap-analysis identifikoval, že reference (World Athletics, FIS) používají gradienty pro:
- Hero backgrounds
- Button varianty
- Card overlays
- Feature highlights

**Doporučení:** Definovat gradient scale:
- Brand gradient (primary → darker)
- Accent gradient (accent → primary)
- Hero gradient (dramatic, expresivní)
- Overlay gradient (pro fotografie)

### 3. Chybí glow/glow shadow tokeny

**Problém:** Pro moderní "premium" feel chybí:
- Colored glow efekty kolem interaktivních prvků
- Neon-style highlights pro live indikátory

### 4. Chybí backdrop blur tokeny

**Problém:** Moderní UI používá glassmorphism efekty:
- Header při scrollu
- Modal backgrounds
- Elevated cards

---

## Rozhodnutí

### Zachovat beze změny
- ✅ Primární modrá škála (#1176a6)
- ✅ Neutrální škála
- ✅ Feedback barvy
- ✅ CSK specifické barvy (DV/RY/VT)

### Přidat nové tokeny
1. **Akcentní barva** - warm accent pro CTA a highlights
2. **Gradient tokeny** - pro expresivní režim
3. **Glow tokeny** - pro premium interactive states
4. **Backdrop blur tokeny** - pro glassmorphism

---

## Implementační plán

### Krok 1: Přidat akcentní barvu do colors.css
```css
/* Accent (Warm) - for CTA, highlights, expressive mode */
--color-accent-50: #fffbeb;
--color-accent-100: #fef3c7;
--color-accent-200: #fde68a;
--color-accent-300: #fcd34d;
--color-accent-400: #fbbf24;
--color-accent-500: #f59e0b;
--color-accent-600: #d97706;
--color-accent-700: #b45309;
--color-accent-800: #92400e;
--color-accent-900: #78350f;
```

### Krok 2: Přidat gradient tokeny (nový soubor gradients.css)
- Brand gradients
- Accent gradients
- Hero gradients
- Overlay gradients

### Krok 3: Přidat glow tokeny do shadows.css
- Primary glow
- Accent glow
- Live indicator glow

### Krok 4: Přidat blur tokeny (nový soubor effects.css)
- Backdrop blur scale
- Glassmorphism utilities

---

*Review provedeno: 2026-01-20*
*Součást fáze 7.3 - Redesign tokenů*
