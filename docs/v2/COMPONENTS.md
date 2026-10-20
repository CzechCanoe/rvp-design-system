# Komponenty v2 (as-built)

Popis komponent podle skutečného stavu na `main` po fázích 0–4 a T17a (Fáze 5: T18 a T19 ještě mohou API měnit, viz „Co přijde v T19“). Původní zadání (inventura zachovat / změnit / odstranit / nové) tenhle soubor nahrazuje; kde se skutečnost od zadání lišila, je to uvedeno v sekci „Odchylky od zadání“.

- **Úplné API (props, typy, výchozí hodnoty, JSDoc)** je v [`docs/COMPONENT_API.md`](../COMPONENT_API.md), generované skriptem `npm run docs:api`. Tenhle soubor tabulky props neduplikuje, popisuje záměr, doménová pravidla a mechanismy napříč komponentami.
- Reference vzhledu: `reference/*.html` + `reference/rvp.css`. Třídy v referenci (`.lv-tbl`, `.nm`, `.runs`, `.pen`…) jsou pracovní, v DS mají BEM jména `csk-<komponenta>__<část>--<varianta>`.
- Komponenty (až na pár funkčních, např. `Icon`, `PageLayout`, `FilterPills`, `SegmentedControl`, `StarButton`) jsou `forwardRef`; všechny předávají `className` a zbylé HTML atributy kořenovému prvku a nepoužívají hex ani `Date.now`.

Legenda stavu vůči 1.x: **Z** beze změny API (jen přetokenováno) · **U** upraveno · **X** odstraněno · **N** nové.

## 1. Základ

| Komponenta | Stav | Jak je to teď |
|---|---|---|
| Button | U | `variant`: `primary` (akční modrá), `secondary`, `ghost`, `danger`; `size`: `sm` 32 px / `md` 40 px (`lg` pryč); min. šířka dotyku 44 px; `accent="energy"` pryč |
| Input, Checkbox, Radio, Switch | U | `size`: `sm` / `md` / `lg` zůstává; `Input` bez `energyFocus` a `displayLabel`; `font-size: 16px` na `pointer: coarse` |
| Select | U | navíc `state="warning"` (jantarový rám, varování nikdy neblokuje); bez `energyFocus` a `displayLabel`; 16 px na dotyku |
| SearchInput | U | `size`: `sm` 34 px / `md` 40 px (`lg` pryč); filtr chipy (`chips`, `activeChips`, `onChipToggle`) pryč, nahrazuje je `FilterPills` / `TableToolbarButton` vedle pole |
| Card | U | `variant`: `surface`, `outlined` (`elevated`, `aesthetic` pryč); `tone="highlight"` = rám a podložka `--csk-color-highlight-*` (zvýrazněná karta, např. jezdec, kterého stránka sleduje); sloty `header` / `children` / `footer` |
| Badge | U | `variant`: `default`, `primary`, `success`, `warning`, `error`, `info`, `level` (úroveň závodu ČP, MČR, NKZ…), `outline`, `live`; `section` (`dv` / `ry` / `vt`), `vtClass` (`m` / `a` / `b` / `c`, malými); `size` `sm` / `md`; `energy`, `glow`, `outlined` pryč; hodnotové stavy (Oficiální, Předběžné…) jsou `StatusBadge`; v kontejneru `data-tone="on-dark"` se přepíše podložka (`--csk-color-on-dark-pad`) |
| Avatar | U | `shape`: `circular`, `rounded`, `square` (přejmenovaný dřívější `variant`; `square` je pro loga akcí a klubů, obrázek se vejde bez ořezu, ruší `:global(.csk-avatar--rounded)` override v live-mini); `size` rozšířeno o `3xl` (profil); `ring` (kroužek kolem, na `data-tone="on-dark"` poloprůhledně bílý); `AvatarGroup` beze změny |
| Icon | U | stejné názvy jako v 1.x; přibyl `filled` (vyplněný glyf, např. zapnutá hvězda, nahrazuje zamýšlený `star-filled`) |
| Modal, Dropdown, Toast, Pagination, Skeleton, EmptyState, Progress, Timeline, Wizard, Dropzone, Table | Z | přetokenováno; `Table` zůstává obecná tabulka, výsledky mají `ResultsTable` |
| Calendar, CalendarList | Z | měsíční / týdenní mřížka a seznam z 1.x; `styleVariant="embed"`, `weekendShowcase`, `showLive` zůstávají. Pro kalendář sezóny po víkendech je `WeekendCalendar`. `CalendarCards` je jen Storybook komponenta, z balíčku se neexportuje |
| Tabs | U | `variant`: `line`, `pills`, `nav` (navigační chipy bez panelů, ruší `:global(.csk-tabs__panel{display:none})`); `size` `sm` / `md`; `overflow`: `wrap` (výchozí), `scroll`, `carousel` (maska okrajů, šipky s `previousLabel` / `nextLabel`, doscrollování aktivního; přebírá `ClassTabs` z live-mini); `aesthetic` a `energyAccent` pryč |
| FilterPills | U | zůstává pod jménem `FilterPills` (nepřejmenováno); pilulky 34 / 30 px (`size` `md` / `sm`), aktivní navy, `onFilterToggle` (pilulka je přepínač s `aria-pressed`), `dismissible` pro „U18 ✕“; `variant` pryč |
| Header | U | `variant`: `site` (modrý pás kanoe.cz 48 px, za ním `Subbar`), `satellite` (samostatná aplikace s odkazem zpět na kanoe.cz), `app` (44 px pro úřad: `appName`, `club`, `userMenu`); `default`, `elevated`, `gradient`, `size`, `bordered`, `blurOnScroll`, `scrollThreshold` pryč; `maxWidth` |
| PageLayout | U | `variant`: `tribuna` (bílá plocha), `urad` (šedá pracovní plocha), `embed` (jen obsah, bez header/banner/bottomBar/footer); sloty `header`, `banner`, `children`, `bottomBar`, `footer`; `stickyHeader`, `padded` (16 px telefon / 24 px desktop), `maxWidth`. Dřívější `standalone` je `tribuna` |
| Subbar | N | sekundární pás pod `Header variant="site"` (akční modrá 40 px), `items: SubbarItem[]` s `active`, vodorovně scrolluje |
| Breadcrumbs | N | cesta v hierarchii (13 px, lomítka), `maxItems` s kolapsem, `renderLink` pro router |
| PageTitle | N | nadpis stránky (`as` `h1` / `h2`, `size` `lg` 36 px / `md` 24 px) s `variant` `plain` nebo `bar` (bílý pás s linkou pro úřad), sloty `breadcrumbs`, `logo`, `badges`, `titleBefore`, `titleAfter`, `meta`, `aside`, `actions`; nahrazuje HeroSection |
| BottomBar | N | spodní navigace telefonu: `items: { icon, label, href, active }[]` (4 se vejdou na 390 px), 60 px, cíle 44 px; wrapper je size container, od 768 px šířky kontejneru se skryje (chová se správně i v úzkém embedu) |
| CSKLogo | Z | |
| KanoeCzContext | Z | jen Storybook dekorátor pro embed (mock kanoe.cz, má vlastní axe chyby, proto je `a11y: false` u embed layout story) |
| LiveIndicator | X | zrušený, nahrazuje ho `StatusBadge state="live"`; na `main` zatím zůstává v kódu (`Calendar` / `CalendarList` `showLive`, má `energyGlow`), T19 ho smaže. Nepoužívat |

## 2. Stavy a čísla

| Komponenta | Co dělá |
|---|---|
| `StatusBadge` | `state`: `official`, `provisional`, `review`, `unknown`, `live`, `stale`; `size` `sm` / `md`; `label` přepisuje české výchozí (Oficiální, Předběžné, V revizi, Neznámo, Live, Zastaveno; `STATUS_BADGE_LABELS`). Stav není jen barva: Předběžné a V revizi se liší tvarem (plný čtverec vs. obrysová kurzíva), Neznámo má čárkovaný rám, červená je jen u `live`. Pulzující tečka u `live` je jediná animace a vypíná ji `prefers-reduced-motion`. V kontejneru `data-tone="on-dark"` má `stale` světlý text (navy `EventHeader` obaluje slot `status`). |
| `MarkBadge` | `mark`: `DNS`, `DNS-A`, `DNS-B`, `DNF`, `DSQ`, `NR`; obrysová; vždy místo času, nikdy vedle něj; `MARK_DESCRIPTIONS` pro čtečky |
| `TimeValue` | čas v IBM Plex Mono s tabulkovými číslicemi, nikdy se nezalamuje. `value: number \| Observed<number> \| null`: `null`, `not-yet` i `unavailable` se vykreslí jako „—“ (čtečka: „neznámo“), známá `0` jako `0.00`. `precision` 1 / 2 (výchozí 2), `variant`: `default`, `best`, `running`, `stale`, `muted`, `align="decimal"` (celá část na 3ch doprava), `sign` (`+1.53`, `−0.87`). |
| `RunningTime` | tikající čas přes injektovaný `Clock` (`requestFrame`): `elapsedSeconds`, `receivedAt`, `clock?` (jinak nejbližší `ClockProvider`, jinak browser clock), `staleAfterSeconds = 3` (`RUNNING_STALE_AFTER_SECONDS`). Snapne na každou novou hodnotu, po 3 s od příjmu zmrzne a ukáže `stale` s věkem (`showAge`, `ageLabel`, `formatAge`). Nerozhoduje o dojezdu: po odchodu z trati se vykreslí `TimeValue`. |
| `DataAge` | stáří dat od `receivedAt` (čas `clock.now()` při příjmu, nikdy server `observedAt`; `null` = zatím nic): `mode` `relative` („aktualizováno před 1 s“, tiká po sekundě) / `absolute` („stav ze 14:32:10“, `timeZone`); `connection`: `ok` / `reconnecting` / `offline` jako tečka + text v jednom řádku, nikdy banner. Texty přes `label`, `connectionLabels`, `emptyLabel`, `formatAge`. |
| `PenaltyChip` | `penalty: number \| null` (0 čistě, 2 dotyk, 50 netrefení, `null` neposouzeno = tečkovaný rám, nikdy 0; týmové součty jako číslo), `gate?`, `upstream?` (kurzíva + podtržení), `size`; `penaltyTone()` |
| `GateGrid` | `gates: { gate, penalty, upstream? }[]`, zalamuje se; `unavailable` → text „bez konfigurace tratě“ |
| `BibBadge` | `bib: number \| string`, mono, 20 px |
| `Notice` | statická poznámka `tone`: `info`, `ok`, `warn`, `error`; `title?`; nikdy neblokuje a nic kolem sebe nevypíná |
| `StatTile` | `label`, `value`, `hint?`, `delta?` („▲2“); v `data-tone="on-dark"` světlé písmo na průsvitné podložce |
| `SegmentedControl` | radiogroup `items`, `value`, `onChange`, `size` `sm` / `md`; šipky, Home/End; popisky `nowrap`, při přetečení se celý segment zalomí na další řádek; stav drží aplikace |
| `StarButton`, `FavoritesToggle` | hvězdička 22 px v dotykové ploše 44 px (`pressed`, `label`, `onPressedChange`); toggle „★ N“ 34 px viditelný v ploše 44 px (`pressed`, `count`, `label`); stav drží aplikace |
| `TableToolbar`, `TableToolbarButton` | kontejner nad tabulkou: sloty `search`, `children` (pilulky `TableToolbarButton` s `pressed`), `favorites`, `detail` (přepínač „Detailní“); na mobilu pole roste, pilulky `nowrap` |

## 3. Živé výsledky

Datový model je **vizuální, ne doménový**: aplikace namapuje kontrakt na tyto tvary a seřadí řádky, komponenta nikdy nepočítá pořadí.

| Komponenta | Co dělá |
|---|---|
| `EventHeader` | kompaktní navy hlavička: `title`, `subtitle` (místo · den · fáze), `status` (typicky `StatusBadge`), `dataAge` (typicky `DataAge`), `backHref` + `backLabel`, `logo`, `condensed` (jeden řádek při scrollu; přepíná aplikace). Slot `status` má `data-tone="on-dark"`, takže čitelné jsou i stavy `stale` a ostatní. |
| `ResultsTable` | `rows: ResultRow[]`, `columns`: `single` / `pair` / `startlist`, `density` (jinak container query od 640 px šířky tabulky), `expandedId` (jedno id i pole pro „Detailní“), `onToggle`, `renderDetail`, `onFavoriteChange`, `clock`, `labels` (+ `RESULTS_TABLE_LABELS`), `caption`, `emptyState`. Mobil: chevron · # · ★ · jméno + klub · jízdy (stacked, pozice = číslo jízdy) · výsledek + ztráta; desktop navíc sloupec klubu a jízdy vedle sebe s `PenaltyChip` za časem. Podium = proužek 3 px + barevné číslo. Značka nahradí čas. Žádný sticky `thead` ani overflow obal (řeší stránka). Řádky jsou `memo` (viz upozornění níže). |
| `RunDetail` | obsah rozbaleného řádku: `bib`, `ranks` (třída + kategorie), `state`, `runs: RunDetailRun[]`, `actions`, `loading` (skeleton při líném načítání), `density`, `clock`, `labels`. Mobil pod sebou, od 640 px vedle sebe, přes celou šířku tabulky bez odsazení. |
| `StartlistTable` | tenký wrapper nad `ResultsTable columns="startlist"` s vlastním typem řádku `StartlistRow` (`bib`, `name`, `categoryTag`, `club`, `favorite`, `starts: { time?, mark? }[]`); starty pod sebou (pozice = číslo jízdy), omluvené DNS inline; 390 px nepřetéká |
| `ProgramList` | `days: { label, note?, items }[]`, položka `{ id?, time, title, subtitle?, state?, stateLabel?, progress?, note?, href?, running?, muted? }`. Běžící řádky mají podložku `live-bg` a odznak Live; víc běžících fází naráz je v pořádku, výběr nad seznamem dělá aplikace přes `Notice`. `headingLevel` (výchozí 3) pro nadpisy dnů. `muted` ztlumí fázi, `note` je krátká poznámka za podtitulem, `stateLabel` přepíše popisek stavu („čeká“). |
| `OnCoursePanel` | `riders: OnCourseRiderData[]`, `phaseLabel`, `leader`, `collapsed` + `onCollapsedChange` (bez callbacku nejde sbalit), `stale`, `receivedAt`, `timeZone`, `clock`, `labels`. Mobil seznam, od 640 px tři sloupce; nikdy neskrývá jezdce (panel roste); bez jezdců se nerenderuje; při výpadku dat zůstane a zmrzne (`stale`, řádek „stav ze“), nic se nemaže a neukazuje banner. |
| `OnCourseRider` | `bib`, `name`, `categoryTag`, `secondary`, `status`: `at-start` / `running` / `finished-pending`, `time: RunningSpec`, `finish`, `gates`, `split`, `toLeader` (± s), `timeToBeat: { mode: 'target' \| 'delta', value, holder }`, `featured`, `stale` |
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
| `ProposalList` | návrhy od závodníků s Potvrdit / Odmítnout (`proposals`, `onConfirm`, `onReject`); bez návrhů se nerenderuje; na úzkém kontejneru se tlačítka zalomí pod text |
| `SummaryCard` | `title`, `rows: { label, value }[]`, `total` (zvýrazněný poslední řádek), `note`; čísla dodává aplikace jako text |
| `ProfileHeader` | `name`, `variant`: `page` / `band` (navy pás, `data-tone="on-dark"`), `avatar`, `badges`, `meta[]`, `tiles` (`StatTile`), `actions`, `topbar`, `as`. Co smí být vidět u nezletilých, rozhoduje aplikace: předává jen veřejná data. |
| `SeasonSparkline` | křivka umístění za sezónu jako inline SVG (`points: { label, place, provisional? }[]`, `worstPlace`, `title`, `meta`, `note`); nejlepší bod plný, předběžný bod dutý jantarový; `<title>` a `<desc>` obsahují všechny hodnoty; bez animace |
| `RivalsList` | soupeři z ročníku (`items: { id, rank, name, club?, points, self?, href? }[]`) se znaménkovým rozdílem bodů (`+40 b.`, `−15 b.`); to, zda smí být soupeři vidět (nezletilí), řeší aplikace |

## 5. Page stories (náhrada prototypů 1.x)

Stránky složené jen z komponent DS, jedna na obrazovku z reference, s fixním časem a fake `Clock` (snapshoty `pageStories` v `tests/config.ts`, tolerance 80 px, chromium 390 a 1280): `Live/Running`, `Live/Expanded`, `Live/Startlist`, `Live/Official`, `Live/Disconnected`, `Live/Program`, `Event/Detail`, `Calendar/Season`, `Entry/ClubEntry`, `Athlete/PublicProfile`, `Athlete/MobileProfile`. Layout stories (`layoutStories`): `Layout/Tribuna` (+ embed), `Layout/LiveMobile` (+ condensed), `Layout/Urad`. Sdílené pomocné komponenty stories jsou v `src/stories/_shared/` (`ResultsCard`, `storyClock`) a nejsou součástí balíčku.

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
| `LiveIndicator` odstranit | zatím v kódu kvůli `Calendar` / `CalendarList`, maže T19 |

## 9. Co přijde v T19 (nepopsáno zde)

Issue #84 mění nebo přidává: Button `href` / `as`, `DocumentList`, `ResultsPanel` (z `_shared/ResultsCard`), `TimeValue format`, `FavoritesToggle` pro `count` 0, `DataAge` barvy spojení, `EventHeader` max-width, token `--csk-ink-3`, Avatar `portrait`, oprava textu chipu v `GateGrid` / `PenaltyChip` (číslo branky, ne hodnota), axe u `Table`. Dokumentaci těchto komponent doplní T19; tabulky props se jen přegenerují (`npm run docs:api`).
