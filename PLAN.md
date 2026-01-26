# PLAN.md - CSK RVP Design System

## Aktuální stav

| Fáze | Status |
|------|--------|
| 0-14 (Založení až Test suite) | ✅ Hotovo |
| 15 (User feedback) | ✅ Hotovo |
| 16 (Konsolidace prototypů) | ✅ Hotovo |
| 17 (DS Cleanup - Aesthetic Focus) | ✅ Hotovo |
| 18 (Visual Polish) | ✅ Hotovo |
| 19 (Optimization) | ✅ Hotovo |
| 20 (Publikace) | ✅ Hotovo |
| 21 (Post-release Polish) | ✅ Hotovo |

**Projekt je dokončen a připraven k použití.**

---

## Shrnutí dokončených fází

### Fáze 17: DS Cleanup - Aesthetic Focus
- Odstranění experimentálních variant (gradient-energy, glass, glow)
- Nové komponenty: Icon, PageLayout, HeroSection, StatsBar, SectionHeader, FilterPills, CSKLogo, PodiumCard
- CSS reorganizace na LAYOUT + VISUAL STYLES sekce
- Všech 12 prototypů refaktorováno

### Fáze 18: Visual Polish
- Rozšíření utility tříd v `aesthetic.css` (hero gradienty, mesh backgrounds, animace)
- VISUAL STYLES sekce pro všechny prototypy
- Energy colors integration (Button accent, Badge energy, energyFocus, energyAccent)
- Fix header alignment v embed variantách

### Fáze 19: Optimization
- **Dead CSS Audit:** 0 mrtvého kódu (kód byl již čistý)
- **Card Consolidation:** Všechny prototypy správně používají Card komponentu
- **Stories Cleanup:** Stories jsou dobře strukturované
- **Bundle Size:** 339KB JS + 269KB CSS (přiměřené pro 35+ komponent)

### Fáze 20: Publikace
- Pre-release checklist ✅
- Build validace ✅
- Storybook build ✅

### Fáze 21: Post-release Polish
Dodatečné vizuální opravy po uživatelském testování:

| Oprava | Popis |
|--------|-------|
| Hero akční fotka | Reálná fotka Prskavce z kanoe.cz (MS Bratislava 2021) |
| Průhledný gradient | Hero gradient rgba 65-75% pro viditelnost fotky |
| Z-index stacking | image (0) < gradient (1) < pattern (2) |
| Rank badge embed | Menší badge v embed variantách (36px vs 64px) |
| EventDetailPage embed | Vylepšené hero s energy accent gradienty |
| LivePage embed | Opravený header padding |

---

## Metriky

| Metrika | Hodnota |
|---------|---------|
| Komponenty | 35+ |
| Prototypy | 12 |
| CSS bundle | 268.82 kB (gzip: 32.74 kB) |
| JS bundle | 338.94 kB (gzip: 54.35 kB) |
| Inline styles | 0 |
| Dead CSS | 0% |

---

## Tech stack

- **React 18+** s TypeScript (strict mode)
- **Vite** pro build
- **Storybook 8** pro dokumentaci
- **CSS custom properties** + režimy (utility/expressive/embed)
- **lucide-react** pro ikony

## Příkazy

```bash
npm run dev          # Storybook dev server
npm run build        # Production build
npm run build-storybook  # Static Storybook
npm run test         # Playwright testy
```

---

## Struktura src/

```
src/
├── components/     # React komponenty (35+)
├── context/        # ThemeContext (mode, theme)
├── tokens/         # CSS tokeny
│   ├── colors.css, typography.css, spacing.css
│   ├── utility.css, expressive.css, embed.css
│   ├── aesthetic.css  # Utility třídy pro Dynamic Sport styl
│   └── mode.css       # Přepínání režimů
├── prototypes/     # 12 celostránkových prototypů
├── hooks/          # Custom hooks
└── styles/         # Globální styly
```

---

## Další rozvoj (budoucí fáze)

Projekt je v produkčním stavu. Možné budoucí rozšíření:

1. **NPM publikace** - Balíček pro použití v jiných projektech
2. **Další prototypy** - Nové stránky podle potřeb ČSK
3. **Accessibility audit** - WCAG 2.1 AA compliance
4. **Performance optimization** - CSS purge, lazy loading
5. **Dokumentace** - Rozšířené guidelines pro vývojáře
