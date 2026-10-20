# Design Principles - CSK RVP Design System v2 „Klidná voda“

Principy designu pro veřejné sekce webů Českého svazu kanoistů a pro registrační a výsledkové aplikace. Zdroj: `docs/v2/BRIEF.md` (proč v2), `docs/v2/TOKENS.md` (hodnoty), `docs/v2/COMPONENTS.md` (komponenty). Starší dokument 1.x (Dynamic Sport Aesthetic, tři režimy zobrazení, gradienty) už neplatí.

**Kritická kvalita: použitelnost.** Úkon zvládne člověk, který systém používá zřídka, bez školení a bez telefonátu. Plný provoz na mobilu. Chybové hlášky říkají, co dál. Varování nikdy neblokuje.

---

## 1. Kontinuita s kanoe.cz, ne poslušnost

- Barvy z loga ČSK a z kanoe.cz: svazová modrá `#004899` (`--csk-navy`, pás nahoře, aktivní prvky), akční modrá `#2a66b4` (`--csk-blue`, tlačítka, odkazy), červená `#e42313` (`--csk-red`) **jen pro LIVE, chyby a běžící čas**.
- Modrý pás nahoře, bílá plocha, žádné gradienty, mesh pozadí, glow efekty ani oranžová „energy“ barva.
- Embed na kanoe.cz nesmí vypadat cize: `data-mode="embed"` (`<ThemeProvider embed>`) zmenší rádiusy a vypne stíny; nic dalšího se v embedu nemění.

## 2. Jeden systém, tři tóny

| Tón | Kde | Charakter |
|-----|-----|-----------|
| **Tribuna** | live, výsledky, kalendář, detail závodu | bílá plocha, vzduch, energie jen z dat (běžící čas, LIVE) |
| **Úřad** | přihlášky, registr | šedá pracovní plocha, hustší tabulky, žádné hero, `Header variant="app"` |
| **Moje** | vlastní prostor závodníka | stejné tokeny, telefon jako výchozí plátno, obsah navíc (křivka, soupeři), ne jiný vzhled |

Tóny nejsou režimy a nemají vlastní tokeny: liší se `PageLayout variant` (`tribuna`, `urad`, `embed`) a hustotou obsahu. Na tmavém pásu (profil, `EventHeader`) platí `data-tone="on-dark"`, které přepíše podložky Badge, StatTile, StatusBadge a kroužek Avataru.

## 3. Stavy hodnot jsou páteř

Oficiální (zelená) · Předběžné (jantar) · V revizi (fialová) · Neznámo (šedá, čárkovaný rám) · Live (červená, pulzující tečka) · Zastaveno / stale (šedá, tečkované podtržení).

- Každá komponenta, která zobrazuje výsledek nebo čas, je umí vyjádřit (`StatusBadge`, `TimeValue`, `ResultsTable`).
- Předběžné a V revizi mohou platit zároveň a liší se barvou i tvarem. **Barva nikdy není jediný nositel významu**: vždy je tu text, tvar nebo číslo.
- `0` ≠ „ještě není“ ≠ „nedostupné“ (`Observed<T>`: `known` / `not-yet` / `unavailable`). Neznámá hodnota se vykreslí jako „neznámo“, nikdy jako nula. `penalty: null` je neposouzeno, ne 0.
- Značka (DNS, DNF, DSQ, NR) nahrazuje čas, nikdy není vedle něj.
- Ztráta spojení nic nemaže a nezobrazuje banner přes obsah: hodnoty zmrznou, `DataAge` řekne od kdy.

## 4. Komponenty přijímají stavy, ne doménu

DS nezná `ResultEntry` s `run1Time`. Zná `Observed<T>`, značky a vizuální varianty. Mapování z kontraktu (c123, registrační systém) dělá aplikace; komponenta nikdy neřadí řádky a nepočítá pořadí. Texty jsou české výchozí a přepsatelné přes `labels`.

## 5. Čas jen přes `Clock`

Tikání, mrznutí po 3 s a stáří dat se řídí injektovaným `Clock` (`src/clock/`). Komponenty nevolají `Date.now()`, `setTimeout` ani `requestAnimationFrame` přímo; testy používají `createTestClock()`. Komponenty, které závisí na „teď“ (`WeekendCalendar`, `DeadlineBadge`), nečtou čas vůbec: aplikace předá hotový text a příznak `current`.

## 6. Mobil nejdřív

- 390 px je výchozí plátno pro live a profil; desktop přidává sloupce, neodebírá informace.
- Layout se řídí **container queries**, ne jen viewportem (komponenta v úzkém embedu se chová jako na telefonu). Základ je v `src/tokens/container-queries.css`.
- Dotykové cíle 44 px (`--csk-tap`), text vstupů 16 px na `pointer: coarse` (iOS nezoomuje).
- Časy a čísla se nezalamují (`nowrap`, IBM Plex Mono, tabulkové číslice, zarovnání na desetinnou tečku); jména a kluby se zkracují elipsou.

## 7. Přístupnost (WCAG 2.1 AA)

- Kontrast textu 4.5:1 je ověřený v tokenech; komponenty ho nesmí rozbít opacitou. Stavové texty mají vlastní tmavší tokeny (`--csk-color-state-*-text`).
- Klávesnice: viditelný fokus (`--csk-color-focus`), šipky v `Tabs` a `SegmentedControl`, `Escape` v `Modal` a `Dropdown`.
- ARIA: správné role (`tablist`, `radiogroup`, `dialog`), `aria-current`, `aria-pressed` u přepínačů, `<title>` a `<desc>` u grafů, skryté popisky pro stavy (`neznámo`, `zastaveno`).
- Axe spec (`tests/accessibility.spec.ts`) běží nad všemi stories v konfiguraci.

## 8. Pohyb jen u dat

Tikající čas, změna pořadí, nový stav, pulz `Live`. Nic dekorativního. `prefers-reduced-motion` se respektuje všude (přechody `--csk-transition-*` jsou pak `0s`, pulz je vypnutý, snapshoty běží s `reducedMotion: 'reduce'`).

## 9. Typografie a barvy

| Role | Písmo | Použití |
|------|-------|---------|
| display | Barlow Semi Condensed 500/600/700 | nadpisy, pořadí, velká čísla |
| sans | IBM Plex Sans 400/500/600 | text, tabulky, formuláře |
| mono | IBM Plex Mono 400/600 | časy, rozdíly, startovní časy |

Fonty jsou self-hosted (`dist/fonts/`). Barvy sekcí: divoká voda `--csk-dv`, rychlost `--csk-ry`, vodní turistika `--csk-vt`. Podium: zlatý, stříbrný a bronzový proužek řádku, číslo pořadí v tmavším odstínu. Stavy hodnot a hlášky/validace jsou oddělené rodiny tokenů (`--csk-color-state-*` vs. `--csk-color-success|warning|error|info*`).

## 10. Tokeny a CSS

- Jediný prefix `--csk-*`, dvě vrstvy: primitiva (`--csk-blue`) a sémantika (`--csk-color-action`). Komponenty používají **jen sémantiku**.
- Žádný hex, `Date.now`, `:global` ani utility třídy v komponentách (`npm run lint` kontroluje hex).
- BEM třídy `csk-<komponenta>__<část>--<varianta>`; aplikace nepřepisuje DS přes `:global`. Když potřebuje variantu, DS ji dostane.
- Tmavý režim se ve 2.0 nekreslí; sémantická vrstva je postavená tak, aby `[data-theme="dark"]` přepsal jen ji.

## 11. Rozhodovací pravidla pro novou komponentu

1. Existuje už? Zkontroluj `docs/COMPONENT_API.md` a Storybook, než přidáš variantu nebo novou komponentu.
2. Přijímá stavy a čísla, ne doménový objekt? Vypíše `Observed<T>` poctivě?
3. Funguje na 390 px bez vodorovného posunu stránky a v úzkém kontejneru?
4. Je čitelná bez barvy? Má české výchozí popisky přepsatelné přes props?
5. Má stories (včetně prázdného a nedostupného stavu), unit test pro čas a snapshot v `tests/config.ts`?
