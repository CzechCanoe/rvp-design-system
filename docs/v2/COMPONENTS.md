# Komponenty v2 (as-built)

Popis komponent podle skutečného stavu na `main` po fázích 0–5 (T17a, T19; změny z T19 shrnuje sekce 9). Původní zadání (inventura zachovat / změnit / odstranit / nové) tenhle soubor nahrazuje; kde se skutečnost od zadání lišila, je to uvedeno v sekci „Odchylky od zadání“.

- **Úplné API (props, typy, výchozí hodnoty, JSDoc)** je v [`docs/COMPONENT_API.md`](../COMPONENT_API.md), generované skriptem `npm run docs:api`. Tenhle soubor tabulky props neduplikuje, popisuje záměr, doménová pravidla a mechanismy napříč komponentami.
- Reference vzhledu: `reference/*.html` + `reference/rvp.css`. Třídy v referenci (`.lv-tbl`, `.nm`, `.runs`, `.pen`…) jsou pracovní, v DS mají BEM jména `csk-<komponenta>__<část>--<varianta>`.
- Komponenty (až na pár funkčních, např. `Icon`, `PageLayout`, `FilterPills`, `SegmentedControl`, `StarButton`) jsou `forwardRef`; všechny předávají `className` a zbylé HTML atributy kořenovému prvku a nepoužívají hex ani `Date.now`.

Legenda stavu vůči 1.x: **Z** beze změny API (jen přetokenováno) · **U** upraveno · **X** odstraněno · **N** nové.

## 1. Základ

| Komponenta | Stav | Jak je to teď |
|---|---|---|
| Button | U | `variant`: `primary` (akční modrá), `secondary`, `ghost`, `danger`; `size`: `sm` 32 px / `md` 40 px (`lg` pryč); min. šířka dotyku 44 px; `accent="energy"` pryč. Odkazová forma: `href` nebo `as="a"` → `<a>` se stejnými třídami (vzhled, velikosti, fokus); vypnutý odkaz nemá `href` (nefokusovatelný, nenaviguje), dostane `role="link"` + `aria-disabled="true"` a ignoruje kliky; `rel` se předává beze změny, `target="_blank"` bez `rel` dostane `noopener noreferrer`. Typy: `ButtonProps = ButtonAsButtonProps \| ButtonAsLinkProps` (společné `ButtonOwnProps`), ref `HTMLButtonElement \| HTMLAnchorElement` |
| Input, Checkbox, Radio, Switch | U | `size`: `sm` / `md` / `lg` zůstává; `Input` bez `energyFocus` a `displayLabel`; `font-size: 16px` na `pointer: coarse` |
| Select | U | navíc `state="warning"` (jantarový rám, varování nikdy neblokuje); bez `energyFocus` a `displayLabel`; 16 px na dotyku |
| SearchInput | U | `size`: `sm` 34 px / `md` 40 px (`lg` pryč); filtr chipy (`chips`, `activeChips`, `onChipToggle`) pryč, nahrazuje je `FilterPills` / `TableToolbarButton` vedle pole |
| Card | U | `variant`: `surface`, `outlined` (`elevated`, `aesthetic` pryč); `tone="highlight"` = rám a podložka `--csk-color-highlight-*` (zvýrazněná karta, např. jezdec, kterého stránka sleduje); sloty `header` / `children` / `footer` |
| Badge | U | `variant`: `default`, `primary`, `success`, `warning`, `error`, `info`, `level` (úroveň závodu ČP, MČR, NKZ…), `outline`, `live`; `section` (`dv` / `ry` / `vt`), `vtClass` (`m` / `a` / `b` / `c`, malými); `size` `sm` / `md`; `energy`, `glow`, `outlined` pryč; hodnotové stavy (Oficiální, Předběžné…) jsou `StatusBadge`; v kontejneru `data-tone="on-dark"` se přepíše podložka (`--csk-color-on-dark-pad`) |
| Avatar | U | `shape`: `circular`, `rounded`, `square`, `portrait` (přejmenovaný dřívější `variant`; `square` je pro loga akcí a klubů, obrázek se vejde bez ořezu, ruší `:global(.csk-avatar--rounded)` override v live-mini; `portrait` 5 : 7 s `object-fit: contain` pro loga akcí na výšku, šířka podle `size`, md 40 × 56); `size` rozšířeno o `3xl` (profil); `ring` (kroužek kolem, na `data-tone="on-dark"` poloprůhledně bílý); `AvatarGroup` beze změny |
| Icon | U | stejné názvy jako v 1.x; přibyl `filled` (vyplněný glyf, např. zapnutá hvězda, nahrazuje zamýšlený `star-filled`) |
| Modal, Dropdown, Toast, Pagination, Skeleton, EmptyState, Progress, Timeline, Wizard, Dropzone, Table | Z | přetokenováno; `Table` zůstává obecná tabulka, výsledky mají `ResultsTable`. `Table` měří přetečení obalu (`ResizeObserver`): jen když tabulka opravdu přetéká (telefon), dostane obal `tabIndex=0` (posun klávesnicí, `:focus-visible` rám), s `caption` navíc `role="region"` pojmenovaný captionem. Řaditelná hlavička (`Th sortable`) je nativní `<button type="button">` v `<th>` (Enter / Space, cyklus asc → desc → bez řazení), `aria-sort` je na `th` |
| Calendar, CalendarList | Z | měsíční / týdenní mřížka a seznam z 1.x; `styleVariant="embed"`, `weekendShowcase`, `showLive` zůstávají (`showLive` ukazuje `StatusBadge state="live" size="sm"`). Pro kalendář sezóny po víkendech je `WeekendCalendar`. `CalendarCards` je jen Storybook komponenta, z balíčku se neexportuje |
| Tabs | U | `variant`: `line`, `pills`, `nav` (navigační chipy bez panelů, ruší `:global(.csk-tabs__panel{display:none})`); `size` `sm` / `md`; `overflow`: `wrap` (výchozí), `scroll`, `carousel` (maska okrajů, šipky s `previousLabel` / `nextLabel`, doscrollování aktivního; přebírá `ClassTabs` z live-mini); `aesthetic` a `energyAccent` pryč |
| FilterPills | U | zůstává pod jménem `FilterPills` (nepřejmenováno); pilulky 34 / 30 px (`size` `md` / `sm`), aktivní navy, `onFilterToggle` (pilulka je přepínač s `aria-pressed`), `dismissible` pro „U18 ✕“; `variant` pryč |
| Header | U | `variant`: `site` (modrý pás kanoe.cz 48 px, za ním `Subbar`), `satellite` (samostatná aplikace s odkazem zpět na kanoe.cz), `app` (44 px pro úřad: `appName`, `club`, `userMenu`); `default`, `elevated`, `gradient`, `size`, `bordered`, `blurOnScroll`, `scrollThreshold` pryč; `maxWidth` |
| PageLayout | U | `variant`: `tribuna` (bílá plocha), `urad` (šedá pracovní plocha), `embed` (jen obsah, bez header/banner/bottomBar/footer); sloty `header`, `banner`, `children`, `bottomBar`, `footer`; `stickyHeader`, `padded` (16 px telefon / 24 px desktop), `maxWidth` (`PageLayoutMaxWidth`: `sm` 640 / `md` 768 / `lg` 1024 / `xl` 1200 / `full`). Šířku kontejneru vystavuje na kořeni jako CSS proměnnou `--csk-page-max-width`, takže pás přes celou šířku v `header` / `banner` (`EventHeader`) zarovná obsah s kontejnerem sám. Dřívější `standalone` je `tribuna` |
| Subbar | N | sekundární pás pod `Header variant="site"` (akční modrá 40 px), `items: SubbarItem[]` s `active`, vodorovně scrolluje |
| Breadcrumbs | N | cesta v hierarchii (13 px, lomítka), `maxItems` s kolapsem, `renderLink` pro router |
| PageTitle | N | nadpis stránky (`as` `h1` / `h2`, `size` `lg` 36 px / `md` 24 px) s `variant` `plain` nebo `bar` (bílý pás s linkou pro úřad), sloty `breadcrumbs`, `logo`, `badges`, `titleBefore`, `titleAfter`, `meta`, `aside`, `actions`; nahrazuje HeroSection |
| BottomBar | N | spodní navigace telefonu: `items: { icon, label, href, active }[]` (4 se vejdou na 390 px), 60 px, cíle 44 px; wrapper je size container, od 768 px šířky kontejneru se skryje (chová se správně i v úzkém embedu) |
| CSKLogo | Z | |
| KanoeCzContext | Z | jen Storybook dekorátor pro embed (mock kanoe.cz, má vlastní axe chyby, proto je `a11y: false` u embed layout story) |
| LiveIndicator | X | smazaný v T19 (komponenta, typy `LiveIndicatorProps`, `LiveIndicatorVariant`, `LiveIndicatorSize`, `LiveIndicatorColor`); nahrazuje ho `StatusBadge state="live"` |

## 2. Stavy a čísla

| Komponenta | Co dělá |
|---|---|
| `StatusBadge` | `state`: `official`, `provisional`, `review`, `unknown`, `live`, `stale`; `size` `sm` / `md`; `label` přepisuje české výchozí (Oficiální, Předběžné, V revizi, Neznámo, Live, Zastaveno; `STATUS_BADGE_LABELS`). Stav není jen barva: Předběžné a V revizi se liší tvarem (plný čtverec vs. obrysová kurzíva), Neznámo má čárkovaný rám, červená je jen u `live`. Pulzující tečka u `live` je jediná animace a vypíná ji `prefers-reduced-motion`. V kontejneru `data-tone="on-dark"` má `stale` světlý text (navy `EventHeader` obaluje slot `status`). |
| `MarkBadge` | `mark`: `DNS`, `DNS-A`, `DNS-B`, `DNF`, `DSQ`, `DSQ-R` (Diskvalifikován v jízdě), `DQB` (Diskvalifikován za nesportovní chování), `CAP` (Převrhl se), `RAL` (Zařazen na poslední místo; drží pořadí, v `ResultsTable` s `rank: known`), `NR`; obrysová, všechny stejný tvar a barva; vždy místo času, nikdy vedle něj; `MARK_DESCRIPTIONS` pro čtečky a `title` (přepsatelné) |
| `TimeValue` | čas v IBM Plex Mono s tabulkovými číslicemi, nikdy se nezalamuje. `value: number \| Observed<number> \| null`: `null`, `not-yet` i `unavailable` se vykreslí jako „—“ (čtečka: „neznámo“), známá `0` jako `0.00`. `format`: `seconds` (výchozí, `96.05`, přesnost 2) / `clock` (`m:ss.d` pro sjezd, např. `14:02.6`, výchozí přesnost 1, od hodiny `h:mm:ss.d`; zaokrouhluje se před rozdělením, 59.96 → `1:00.0`). `precision` 1 / 2 přepisuje výchozí přesnost formátu, `variant`: `default`, `best`, `running`, `stale`, `muted`, `align="decimal"` (celá část na 3ch doprava), `sign` (`+1.53`, `−0.87`, `+1:02.3`). |
| `RunningTime` | tikající čas přes injektovaný `Clock` (`requestFrame`): `elapsedSeconds`, `receivedAt`, `clock?` (jinak nejbližší `ClockProvider`, jinak browser clock), `staleAfterSeconds = 3` (`RUNNING_STALE_AFTER_SECONDS`). Snapne na každou novou hodnotu, po 3 s od příjmu zmrzne a ukáže `stale` s věkem (`showAge`, `ageLabel`, `formatAge`). Nerozhoduje o dojezdu: po odchodu z trati se vykreslí `TimeValue`. |
| `DataAge` | stáří dat od `receivedAt` (čas `clock.now()` při příjmu, nikdy server `observedAt`; `null` = zatím nic): `mode` `relative` („aktualizováno před 1 s“, tiká po sekundě) / `absolute` („stav ze 14:32:10“, `timeZone`); `connection`: `ok` / `reconnecting` / `offline` jako tečka + text v jednom řádku, nikdy banner; tečka `ok` zelená, `reconnecting` jantar (`--csk-color-warning`), `offline` šedá (`--csk-color-state-unknown`), červená nikdy. Texty přes `label`, `connectionLabels`, `emptyLabel`, `formatAge`. |
| `PenaltyChip` | `penalty: number \| null` (0 čistě, 2 dotyk, 50 netrefení, `null` neposouzeno; týmové součty jako číslo), `gate?`, `upstream?` (kurzíva + podtržení), `size`; `penaltyTone()`. **S `gate`** je text chipu číslo branky a barva nese penalizaci (0 šedá, 2 jantar, 50 červená, `null` tečkovaný rám s číslem branky, nikdy 0); penalizace je v `title` (hover) i `aria-label` („Branka 3: 2 s“). **Bez `gate`** (součet penalizace v buňce jízdy, týmové součty) chip ukazuje hodnotu, taky s `title`. Barva nikdy není jediný nositel |
| `GateGrid` | `gates: { gate, penalty, upstream? }[]` jako `PenaltyChip` s `gate` (číslo branky, barva = penalizace, penalizace v `title` / `aria-label`), zalamuje se; `unavailable` → text „bez konfigurace tratě“. Používají ho `OnCourseRider` a `RunDetail` |
| `BibBadge` | `bib: number \| string`, mono, 20 px |
| `Notice` | statická poznámka `tone`: `info`, `ok`, `warn`, `error`; `title?`; nikdy neblokuje a nic kolem sebe nevypíná |
| `StatTile` | `label`, `value`, `hint?`, `delta?` („▲2“); v `data-tone="on-dark"` světlé písmo na průsvitné podložce |
| `SegmentedControl` | radiogroup `items`, `value`, `onChange`, `size` `sm` / `md`; šipky, Home/End; popisky `nowrap`, při přetečení se celý segment zalomí na další řádek; stav drží aplikace |
| `StarButton`, `FavoritesToggle` | hvězdička 22 px v dotykové ploše 44 px (`pressed`, `label`, `onPressedChange`); toggle „★ N“ 34 px viditelný v ploše 44 px (`pressed`, `count`, `label`): `count` 0 → jen ☆, jinak „★ N“ (plnost hvězdy podle počtu, stisk = navy pilulka), `aria-label` „Jen oblíbení (N)“; stav drží aplikace |
| `TableToolbar`, `TableToolbarButton` | kontejner nad tabulkou: sloty `search`, `children` (pilulky `TableToolbarButton` s `pressed`), `favorites`, `detail` (přepínač „Detailní“). Hledání `flex: 1 1 10rem` (min. 10rem); `children`, `favorites` a `detail` jsou v obalu `.csk-table-toolbar__controls`, který se při nedostatku místa zalomí jako skupina na další řádek (hledání pak přes celý první řádek); prvky se zalamují celé, popisky `nowrap`. Bez container query; skrytí „Detailní“ na mobilu je volba aplikace (prop neposlat) |

## 3. Živé výsledky

Datový model je **vizuální, ne doménový**: aplikace namapuje kontrakt na tyto tvary a seřadí řádky, komponenta nikdy nepočítá pořadí.

| Komponenta | Co dělá |
|---|---|
| `EventHeader` | kompaktní navy hlavička: `title`, `subtitle` (místo · den · fáze), `status` (typicky `StatusBadge`), `dataAge` (typicky `DataAge`), `backHref` + `backLabel`, `logo`, `condensed`, `maxWidth`. Navy pás jde přes celou šířku, obsah (`__inner`) má `max-width: var(--csk-page-max-width, var(--csk-layout-max-width))`: uvnitř `PageLayout` lícuje s kontejnerem stránky (1200 výchozí, 1024 u `maxWidth="lg"`), mimo něj ho určí `maxWidth` (škála `PageLayoutMaxWidth`). Okraj 14 px, od 768 px šířky hlavičky 24 px. `condensed` (při scrollu, přepíná aplikace) = jeden řádek zpět · název · stav · stáří dat, podtitul a logo skryté; název ustoupí první (do 5rem), pak výpustka stáří dat. `logo` 40 × 40 (`Avatar shape="square"`), s `Avatar shape="portrait"` 40 × 56. Slot `status` má `data-tone="on-dark"`, takže čitelné jsou i stavy `stale` a ostatní. |
| `ResultsTable` | `rows: ResultRow[]`, `columns`: `single` / `pair` / `startlist`, `density` (jinak container query od 640 px šířky tabulky), `expandedId` (jedno id i pole pro „Detailní“), `onToggle`, `renderDetail`, `onFavoriteChange`, `clock`, `labels` (+ `RESULTS_TABLE_LABELS`), `caption`, `emptyState`. Mobil: chevron · # · ★ · jméno + klub · jízdy (stacked, pozice = číslo jízdy) · výsledek + ztráta; desktop navíc sloupec klubu a jízdy vedle sebe s `PenaltyChip` za časem. Podium = proužek 3 px + barevné číslo. Značka nahradí čas. Žádný sticky `thead` ani overflow obal (řeší stránka). Řádky jsou `memo` (viz upozornění níže). |
| `ResultsPanel` (N) | panel výsledků v jedné `Card`: toolbar (`search`, `filters`, `favorites`, `detail`, `toolbarLabel` → `TableToolbar`), stavový řádek (`state` → `StatusBadge`, `status` text nebo `DataAge`), tabulka (`children`: `ResultsTable`, `StartlistTable` nebo `EmptyState`), patička (`footer` počty vlevo, `footerLinks` odkazy vpravo). Jen layout: stav filtrů, hledání a rozbalení drží aplikace; hodiny a mapování dat zůstávají v aplikaci (ve stories `_shared/LiveResults`). |
| `RunDetail` | obsah rozbaleného řádku: `bib`, `ranks` (třída + kategorie), `state`, `runs: RunDetailRun[]`, `actions`, `loading` (skeleton při líném načítání), `density`, `clock`, `labels`. Mobil pod sebou, od 640 px vedle sebe, přes celou šířku tabulky bez odsazení. |
| `StartlistTable` | tenký wrapper nad `ResultsTable columns="startlist"` s vlastním typem řádku `StartlistRow` (`bib`, `name`, `categoryTag`, `club`, `favorite`, `starts: { time?, mark? }[]`); starty pod sebou (pozice = číslo jízdy), omluvené DNS inline; 390 px nepřetéká |
| `ProgramList` | `days: { label, note?, items }[]`, položka `{ id?, time, title, subtitle?, state?, stateLabel?, progress?, note?, href?, running?, muted? }`. Běžící řádky mají podložku `live-bg` a odznak Live; víc běžících fází naráz je v pořádku, výběr nad seznamem dělá aplikace přes `Notice`. `headingLevel` (výchozí 3) pro nadpisy dnů. `muted` ztlumí fázi, `note` je krátká poznámka za podtitulem, `stateLabel` přepíše popisek stavu („čeká“). |
| `OnCoursePanel` | `riders: OnCourseRiderData[]`, `phaseLabel`, `leader`, `collapsed` + `onCollapsedChange` (bez callbacku nejde sbalit), `stale`, `receivedAt`, `timeZone`, `clock`, `labels`. Mobil seznam, od 640 px tři sloupce; nikdy neskrývá jezdce (panel roste); bez jezdců se nerenderuje; při výpadku dat zůstane a zmrzne (`stale`, řádek „stav ze“), nic se nemaže a neukazuje banner. |
| `OnCourseRider` | `bib`, `name`, `categoryTag`, `secondary`, `status`: `at-start` / `running` / `finished-pending`, `time: RunningSpec`, `finish`, `gates`, `split`, `toLeader` (± s), `timeToBeat: { mode: 'target' \| 'delta', value, holder }`, `penalty?: ObservedNumber` (průběžná penalizace u `running`, kontrakt `outcome.penaltySeconds`; „+2 tr.“, neznámá „(·) tr.“, nikdy „+0 tr.“; vynechaná = nic), `featured`, `stale` (branky se neztlumí, zastavení nese tečkovaný čas, odznak Zastaveno a „stav ze“) |
| `AthleteName`, `RankValue`, `RunValue`, `PenaltyText` | buňky tabulky exportované pro ostatní živé tabulky: dvouřádkové jméno s elipsou, pořadí (podium, pod-řádek „3. celk.“), hodnota jízdy (značka / běžící čas / čas, `best` zvýrazněná), penalizace „(2)“ / „(·)“ |

### Datové tvary

```ts
type ObservedNumber = Observed<number> | number | null;     // pro hodnoty buněk
interface RunCell {                                          // pozice v runs[] = číslo jízdy
  time: ObservedNumber; penalty?: ObservedNumber; best?: boolean;
  mark?: Mark; running?: RunningSpec; start?: ReactNode;
}
interface ResultRow {
  id; rank: Observed<number>; categoryRank?: { rank, category }; podium?: 1 | 2 | 3;
  bib; name; categoryTag?; club?; favorite?; runs: RunCell[];
  result: Observed<number>; diff?: Observed<number>;         // diff chybí = vedoucí „–“, not-yet = „čeká“
  mark?: Mark; state?: 'provisional' | 'review'; running?: boolean; note?: ReactNode;
}
interface RunningSpec { elapsedSeconds; receivedAt; staleAfterSeconds? }
```

Rozšíření oproti zadání: `ResultRow.note` (poznámka za odznakem stavu, např. „branka 16“), `RunCell.start` (startovní čas), `RunDetailRun.meta` / `note` / `mark` / `running`, `ObservedNumber` místo čistého `number`, `ResultRow.running` ztlumí výsledek a ukáže „na trati“.

### Pravidla, která se nesmí ztratit

- `rank`, `result`, `diff` jsou `Observed<number>`: `not-yet` a `unavailable` vypadají stejně („neznámo“, pořadí „·“), `0` je skutečná nula. `NR` (jel, mimo pořadí) ponechá čas ztlumený a čte „mimo pořadí“; ostatní značky mají přednost před časem.
- `diff: not-yet` = pořadí se ještě může změnit, výsledek je ztlumený, slot čte „čeká“.
- **Paměť řádků (`memo`):** `ResultsTable` porovnává `labels` po hodnotách (`Object.is`), takže inline řetězce nevadí, ale inline pole (`runLabels`) a inline JSX popisky jsou při každém renderu nový objekt a překreslí všechny řádky. Definuj je mimo komponentu nebo zmemoizuj.
- `renderDetail` vracející `undefined` nevykreslí detailní řádek vůbec; `null` nebo element ano. Volá se při každém renderu tabulky jen pro rozbalené řádky.
- `RunCell.time: null` (nebo nedostupné `Observed`) je „—“, nikdy `0.00`.
- Zachovat z live-mini: jméno na dva řádky bez zalamování, časy na desetinnou tečku, BR stack „pozice = číslo jízdy“ se zvýrazněnou lepší jízdou, rozbalení řádku klikem kamkoli, detail líně se skeletonem, Na trati nahoře a sbalovací, oblíbení klíčovaná bib + třída (drží aplikace), karusel tříd, toolbar v hlavičce tabulky, DNS/DNF/DSQ na konci, tiché držení dat při reconnectu, 16 px input na dotyku.

### Povinnosti rebuildu (`c123-server/docs/arch/CLIENT-OBLIGATIONS.md`) a kde jsou splněny

| Povinnost | Kde v DS |
|---|---|
| tři stavy `Observed`, `0` ≠ `not-yet` ≠ `unavailable` | `Observed<T>` (`src/types/`, exportovaný), `TimeValue`, `ResultsTable` |
| `unavailable` jako „neznámo“, `not-applicable` smí sloupec skrýt | aplikace skrývá sloupce (`columns`), `GateGrid unavailable` |
| `provisional` a `underReview` odlišené, obojí naráz | `StatusBadge` (jantar vs. fialová), `ResultRow.state` |
| běžící čas tiká jen přes `Clock`, mrzne po 3 s, ukáže stáří | `RunningTime`, `DataAge` |
| výpadek heartbeatu: vše stale, nic nemazat, žádný banner | `DataAge connection`, `OnCoursePanel stale`, `StatusBadge state="stale"`, `RunValue` zmrzlá hodnota |
| `penalty: null` = neposouzeno | `PenaltyChip`, `PenaltyText`, `GateGrid` |
| značka má přednost před časem | `MarkBadge` v `ResultsTable` |
| `non-ranked` | `mark: 'NR'` na řádku (`rank` bez pořadí) |
| pořadí v kategorii vedle třídy | `ResultRow.categoryRank`, `RunDetail.ranks` |
| `timeToBeat` target / delta + držitel | `OnCourseRider.timeToBeat` |
| více fází naráz | `ProgramList` + `Notice` |
| `prefers-reduced-motion` | `StatusBadge live`, `OnCoursePanel`, `Tabs carousel`, tokeny přechodů |
| labely jen na klientovi | české výchozí `*_LABELS` + prop `labels` u každé komponenty s texty |

## 4. Tribuna, úřad, profil

| Komponenta | Co dělá |
|---|---|
| `WeekendCalendar` | `weekends: CalendarGroup[]`: `{ id?, kind: 'weekend' \| 'weekday', label?, dates, note?, current?, events }`; řádek události `CalendarEventRow`: `section`, `level`, `title`, `href`, `favorite`, `details[]`, `deadline` (props `DeadlineBadge`), `entryNote`, `documents`, `documentsNote`, `status`. Víkend je rámovaný blok s datem vlevo, `weekday` tenký čárkovaný řádek. `current` určuje aplikace, komponenta nečte čas. Pod 720 px šířky kontejneru se datum stane pásem nad řádky. |
| `DeadlineBadge` | `kind`: `open`, `closing`, `closed`, `late`; `date?` (formátované), `label?` (text spočítaný aplikací, např. „Uzávěrka za 5 dní“); prošlá uzávěrka je neutrální `closed`, ne chyba; nic se nehýbe |
| `EntryTable` | úřad: `boats: EntryBoat[]` (`members` 1 nebo 2, `category`, `categoryWarning`, `fee`, `openSeat`), `checkColumns`, `categoryOptions`, `caption`, `labels`, `onCategoryChange`, `onRemove`, `onReplaceMember`. Kontroly jsou odznaky `ok` / `warn` / `error` / `neutral`; C2 jsou dva řádky s `rowSpan` pro kategorii, startovné a akce; varování nikdy neblokuje. Na telefonu scrolluje vodorovně uvnitř komponenty (focusovatelný region); kartový režim je backlog 2.1 (#85). |
| `DocumentList` (N) | seznam dokumentů akce: `items: { label, href, kind: 'pdf' \| 'xlsx' \| 'xml' \| 'link', date?, formats?, id? }[]`. Bez `formats` je celé „Název (PDF)“ jeden odkaz (sufix podle `kind`, `link` bez sufixu); s `formats` je název text a každý formát vlastní podtržený odkaz „(PDF · XLSX · XML)“ s `aria-label` „název, XLSX“. `date` je text od aplikace (DS datum neformátuje). `kindLabels` přepisuje sufixy, výchozí `DOCUMENT_KIND_LABELS` |
| `ProposalList` | návrhy od závodníků s Potvrdit / Odmítnout (`proposals`, `onConfirm`, `onReject`); bez návrhů se nerenderuje; na úzkém kontejneru se tlačítka zalomí pod text |
| `SummaryCard` | `title`, `rows: { label, value }[]`, `total` (zvýrazněný poslední řádek), `note`; čísla dodává aplikace jako text |
| `ProfileHeader` | `name`, `variant`: `page` / `band` (navy pás, `data-tone="on-dark"`), `avatar`, `badges`, `meta[]`, `tiles` (`StatTile`), `actions`, `topbar`, `as`. Co smí být vidět u nezletilých, rozhoduje aplikace: předává jen veřejná data. |
| `SeasonSparkline` | křivka umístění za sezónu jako inline SVG (`points: { label, place, provisional? }[]`, `worstPlace`, `title`, `meta`, `note`); nejlepší bod plný, předběžný bod dutý jantarový; `<title>` a `<desc>` obsahují všechny hodnoty; bez animace |
| `RivalsList` | soupeři z ročníku (`items: { id, rank, name, club?, points, self?, href? }[]`) se znaménkovým rozdílem bodů (`+40 b.`, `−15 b.`); to, zda smí být soupeři vidět (nezletilí), řeší aplikace |

## 5. Page stories (náhrada prototypů 1.x)

Stránky složené jen z komponent DS, jedna na obrazovku z reference, s fixním časem a fake `Clock` (snapshoty `pageStories` v `tests/config.ts`, tolerance 80 px, chromium 390 a 1280): `Live/Running`, `Live/Expanded`, `Live/Startlist`, `Live/Official`, `Live/Disconnected`, `Live/Program`, `Event/Detail`, `Calendar/Season`, `Entry/ClubEntry`, `Athlete/PublicProfile`, `Athlete/MobileProfile`. Layout stories (`layoutStories`): `Layout/Tribuna` (+ embed), `Layout/LiveMobile` (+ condensed), `Layout/Urad`. Sdílené pomocné komponenty stories jsou v `src/stories/_shared/` (`LiveResults`: `LiveResultsPanel` drží stav toolbaru stránky kolem DS `ResultsPanel` a `LiveResults` rozbalování; `storyClock`) a nejsou součástí balíčku.

## 6. Mechanismy napříč komponentami

- **`Observed<T>`** (`src/types/observed.ts`): `known` (volitelně `provisional`) / `not-yet` / `unavailable` (s `reason`). Kontraktový typ c123 je do něj přiřaditelný.
- **`Clock`** (`src/clock/`): `now`, `setTimeout`, `clearTimeout`, `requestFrame`, `cancelFrame`; `createBrowserClock()`, `createTestClock()`, `ClockProvider`, `useClock()`. Komponenta bere `clock` z propu, jinak z nejbližšího `ClockProvider`, jinak browser clock.
- **`data-tone="on-dark"`**: kontejner na tmavém (navy) pásu přepíše podložky `Badge`, `StatTile`, `StatusBadge stale` a kroužek `Avatar` (tokeny `--csk-color-on-dark-pad` / `-ring`). Nastavují ho `EventHeader` (slot `status`) a `ProfileHeader variant="band"`; aplikace ho může dát na vlastní tmavý pás.
- **Container queries**: layout `ResultsTable`, `RunDetail`, `OnCoursePanel`, `WeekendCalendar`, `BottomBar`, `ProposalList` se řídí šířkou vlastního kontejneru (640 / 720 / 768 px), takže funguje i v úzkém embedu.
- **Texty**: každá komponenta s vlastními texty exportuje české výchozí `*_LABELS` a přijímá `labels?: Partial<…>`.
- **Režimy**: jediný je `data-mode="embed"` (`<ThemeProvider embed>`); `ThemeProvider` má `defaultTheme` `light` / `system` (dark se nekreslí), `useTheme()` vrací `theme`, `resolvedTheme`, `setTheme`, `embed`.
- **Interní hook** `useIsomorphicLayoutEffect` je v `src/hooks/` (používá `Tabs` a `ResultsTable`), z balíčku se neexportuje.

## 7. Odstraněno z 1.x

| Co | Čím se nahrazuje |
|---|---|
| Navigation (`MainNav`, `NavItem`) | `Header` + `Subbar` + `BottomBar` |
| HeroSection | `PageTitle`, `EventHeader`, `ProfileHeader` |
| SectionHeader, StatsBar, StatCard | nadpisy v `Card` / `PageTitle`, `StatTile` |
| ActionCard, ListItem, ResultItem, PodiumCard, AthleteCard | odstraněno bez přímé náhrady (kompozice z `Card`, `Badge`, `ResultsTable`) |
| DateBadge | datum v `WeekendCalendar` / `DeadlineBadge` |
| `ResultsTable` 1.x (`ResultEntry`, `ResultsTableColumn`…) a `RunDetailModal` | `ResultsTable` v2 + `RunDetail` (nový datový model, viz výše) |
| `src/prototypes/` (12 prototypů) | Page stories |
| utility třídy `csk-reveal*`, `csk-mesh-bg*` a režimy `utility` / `expressive` | bez náhrady |

## 8. Odchylky od původního zadání

| Zadání | Skutečnost |
|---|---|
| `Pills` jako přejmenované `FilterPills` | zůstalo `FilterPills`; pilulky v toolbaru tabulky jsou `TableToolbarButton` |
| Icon: nové názvy `wave`, `flag`, `star-filled`, `filter`, `doc`… | pouze prop `filled` (hvězda); ostatní názvy se nepřidávaly |
| `ResultsTable`: `ResultRow.runs: RunCell[]` s `RunCell` jen z `time`+`penalty` | `RunCell` navíc `best`, `mark`, `running`, `start`; `ObservedNumber` |
| `StartlistTable` jako samostatná tabulka | tenký wrapper nad `ResultsTable columns="startlist"` s vlastním `StartlistRow` |
| `GateGrid`: `unavailable` → text | prop `unavailable?: boolean` |
| `OnCourseRider.time` jako `RunningTime` props | `RunningSpec` (`elapsedSeconds`, `receivedAt`, `staleAfterSeconds?`) |
| `PageLayout` varianty implicitně | `tribuna`, `urad`, `embed` se sloty `header`, `banner`, `bottomBar`, `footer` |
| `TimeValue value: number \| null` | navíc `Observed<number>` |
| `RunningTime` / `DataAge` v seznamu knihovny | exportováno také `RUNNING_STALE_AFTER_SECONDS`, `STATUS_BADGE_LABELS`, `MARK_DESCRIPTIONS`, `*_LABELS` |
| `LiveIndicator` odstranit | smazán v T19; `Calendar` / `CalendarList` `showLive` ukazují `StatusBadge state="live" size="sm"` (odznak s popiskem „Live“ místo samotné tečky) |
| `DocumentList` položka = jeden `kind` (#84.2) | navíc `formats` pro řádek „Výsledky sobota, oficiální (PDF · XLSX · XML)“ z `reference/Zavod.html` |
| `TableToolbar` na 390 px: dva řádky nebo skrytí „Detailní“ (návrh T18) | zalomení skupiny ovládacích prvků až při nedostatku místa; Live1 na 390 px zůstává jednořádkový, nic se neskrývá |
| neposouzená branka čárkovaně (`reference` `.pen-n` dashed) | tečkovaný rám v barvě `--csk-color-state-unknown` (#84.11 „tečkovaný“) |

## 9. Změny v T19 (#84)

Rozhodnutí maintainera z 20. 10. 2026 a mezery ze suchého testu T18 (#83), popsané výše u komponent:

- **BREAKING:** `LiveIndicator` smazán (→ `StatusBadge state="live"`); `ButtonProps` je union `ButtonAsButtonProps | ButtonAsLinkProps` a ref `HTMLButtonElement | HTMLAnchorElement` (`interface X extends ButtonProps` už nejde, náhrada `ButtonAsButtonProps`).
- **Oprava regrese:** `PenaltyChip` s `gate` / `GateGrid` ukazuje číslo branky, barva = penalizace (dřív hodnota penalizace).
- **Nové:** `ResultsPanel`, `DocumentList`, `Button href` / `as="a"`, `Avatar shape="portrait"`, `TimeValue format="clock"`, `MarkBadge` `DSQ-R` / `DQB` / `CAP` / `RAL`, `OnCourseRider.penalty`, `EventHeader maxWidth`, CSS proměnná `--csk-page-max-width` z `PageLayout`.
- **Upravené chování:** `DataAge` barvy teček (offline šedá, reconnecting jantar, nikdy červená), `FavoritesToggle` pro `count` 0, `TableToolbar` zalomení ovládacích prvků, `EventHeader` šířka a zúžený mód, `Table` při přetečení focusovatelný scroll region (`tabIndex=0`, s `caption` `role="region"` pojmenovaný captionem; jen když opravdu přetéká) a řaditelné hlavičky ovladatelné klávesnicí (`<button>` v `<th>`, #92).
- **Token:** `--csk-ink-3` `#626a75` (AA i na `surface-2`), viz `TOKENS.md` „Změněno v T19“; `--csk-color-state-unknown-text` je zpět `ink-3`.
