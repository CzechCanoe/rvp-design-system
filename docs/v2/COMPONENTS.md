# Komponenty v2

Reference vzhledu: `reference/*.html` + `reference/rvp.css`. Třídy v referenci (`.lv-tbl`, `.nm`, `.runs`, `.pen`…) jsou pracovní, v DS dostanou BEM jména `csk-<komponenta>__<část>--<varianta>` jako dnes.

Legenda: **Z** zachovat (jen přetokenovat) · **U** upravit (změna API nebo variant) · **X** odstranit · **N** nové.

## 1. Základ

| Komponenta | Verdikt | Změna |
|---|---|---|
| Button | U | varianty `primary` (akční modrá), `secondary`, `ghost`, `danger`; `gradient`, `gradient-energy` pryč; výška 40 / 32 (`sm`); min. šířka dotyku 44 |
| Input, Select, Checkbox, Radio, Switch | Z | `font-size: 16px` na `pointer: coarse` (řeší TODO #160 z live-mini) |
| SearchInput | U | `size="sm"` 34 px; filtr chipy pryč (nahrazuje `FilterPills`) |
| Card | U | varianty `surface`, `outlined`; `elevated`, `gradient`, `aesthetic` pryč; sloty `header` / `body` / `footer` |
| Badge | U | varianty `section` (dv / ry / vt), `level` (ČP, MČR, NKZ…), `outline`, `live`; stavové varianty přebírá `StatusBadge` |
| Icon | Z | doplnit: `wave`, `flag`, `clock`, `list`, `star`, `star-filled`, `chevron-down/right`, `check`, `search`, `filter`, `calendar`, `pin`, `doc` |
| Avatar | Z | `shape="square"` pro loga akcí (ruší `:global(.csk-avatar--rounded)` override) |
| Modal, Toast, Dropdown, Pagination, Skeleton, EmptyState, Progress, Timeline, Wizard, Calendar, Dropzone, Table | Z | přetokenovat; `Table` zůstává obecná, výsledky mají vlastní komponentu |
| Tabs | U | `variant="nav"` bez panelů (ruší `:global(.csk-tabs__panel{display:none})`), `overflow="carousel"` s maskou, šipkami a doscrollováním aktivního (přebírá `ClassTabs` z live-mini), `size="sm"` |
| FilterPills | U | sjednotit s pilulkami v referenci (`.pill`, 30–34 px, aktivní navy); `dismissible` pro „U18 ✕“ |
| Header, PageLayout | U | `Header variant="site"` = modrý pás kanoe.cz (navy, 48 px) + `Subbar` (akční modrá, 40 px); `variant="satellite"` zůstává pro samostatné aplikace; `variant="app"` = 44 px pro úřad (název aplikace, oddíl, uživatel) |
| Navigation | X | nahrazuje `Header` + `Subbar` + `BottomBar` |
| HeroSection | X | nahrazuje `EventHeader` (kompaktní) a `PageTitle` |
| KanoeCzContext | Z | jen jako Storybook dekorátor pro embed režim |
| CSKLogo | Z | |
| SectionHeader, StatsBar, StatCard, ActionCard, AthleteCard, ListItem, ResultItem, PodiumCard, DateBadge | X | zrušené v rámci odstranění „aesthetic“ vrstvy; `StatCard` nahrazuje `StatTile`, `DateBadge` nahrazuje `WeekendHeader` v kalendáři |

## 2. Stavy a čísla (nové, sdílené napříč)

| Komponenta | Verdikt | API |
|---|---|---|
| `StatusBadge` | N | `state: 'official' \| 'provisional' \| 'review' \| 'unknown' \| 'live' \| 'stale'`, `size: 'sm' \| 'md'`, volitelný `label` (výchozí česky: Oficiální, Předběžné, V revizi, Neznámo, Live, Zastaveno). `live` má pulzující tečku, vypnutou při `prefers-reduced-motion`. |
| `MarkBadge` | N | `mark: 'DNS' \| 'DNS-A' \| 'DNS-B' \| 'DNF' \| 'DSQ' \| 'NR'`, obrysová varianta; vždy místo času, nikdy vedle něj |
| `TimeValue` | N | `value: number \| null`, `precision: 1 \| 2`, `variant: 'default' \| 'best' \| 'running' \| 'stale' \| 'muted'`, `align="decimal"` (celá část na 3ch doprava, jako dnes `TimeValue` v live-mini), `sign` pro rozdíly (`+1.53`, `−0.87`) |
| `RunningTime` | N | `elapsedSeconds`, `receivedAt`, `clock: Clock`, `staleAfterSeconds = 3`; tiká lokálně přes injektovaný `Clock` (`now`, `setTimeout`, `clearTimeout`, `requestFrame`, `cancelFrame`), po `staleAfterSeconds` od příjmu zmrzne a přepne `TimeValue` na `stale` s věkem. Nikdy `Date.now()` přímo (TEST-ARCHITECTURE §5). Export `createBrowserClock()` a `createTestClock()`. |
| `PenaltyChip` | N | `penalty: 0 \| 2 \| 50 \| null \| number`, `gate?: number`, `upstream?: boolean` (kurzíva + podtržení), `null` = neposouzeno (tečkovaný rám, nikdy 0); týmové součty (4, 52, 100, 150) jako číslo |
| `GateGrid` | N | `gates: Array<{ gate, penalty, upstream }>`, `size: 'sm' \| 'md'`, zalamuje se, `unavailable` → text „bez konfigurace tratě“ |
| `BibBadge` | N | `bib: number \| string`, mono, 20 px |
| `DataAge` | N | `receivedAt`, `clock`, `mode: 'relative' \| 'absolute'` → „aktualizováno před 1 s“ / „stav ze 14:32:10“; `connection: 'ok' \| 'reconnecting' \| 'offline'` jako tečka + text v jednom řádku, nikdy banner přes obsah |
| `Notice` | N | statická poznámka `tone: 'info' \| 'ok' \| 'warn' \| 'error'`, volitelný `title`; nahrazuje inline `note-*` v referenci; nikdy neblokuje (žádné `disabled` na tlačítka kolem) |
| `SegmentedControl` | N | `items`, `value`, `onChange`, `size: 'sm' \| 'md'`; dny, pohled, kolo. Popisky `nowrap`, při přetečení se celý segment zalomí na další řádek, nikdy text |
| `StarButton`, `FavoritesToggle` | N | hvězdička 22 px s dotykovou plochou 44 px; toggle „★ 2“ 34 px vysoký; stav drží aplikace |
| `StatTile` | N | `label`, `value`, `hint?`, `delta?` („▲2“); nahrazuje StatCard |

## 3. Živé výsledky (přebírá a rozšiřuje `c123-live-mini`)

| Komponenta | Verdikt | API |
|---|---|---|
| `EventHeader` | N | kompaktní hlavička: `title`, `subtitle` (místo · den · fáze), `status: StatusBadge state`, `dataAge`, `backHref`, `logo?`; výška ≈ 95 px na mobilu, při scrollu se stáhne na jeden řádek (`condensed` prop, chování řeší aplikace) |
| `BottomBar` | N | 4 položky `{ icon, label, href, active }`, výška 60 px, cíle 44 px, aktivní s podložkou `blue-100`; jen mobil |
| `ResultsTable` | U (přepis) | **datový model je vizuální, ne doménový.** `rows: ResultRow[]`, `columns: 'single' \| 'pair' \| 'startlist'`, `density: 'mobile' \| 'desktop'` (nebo container query), `expandedId`, `onToggle`, `renderDetail(row)`. `ResultRow = { id, rank: Observed<number>, categoryRank?: { rank, category }, podium?: 1\|2\|3, bib, name, categoryTag?, club, favorite, runs: RunCell[], result: Observed<number>, diff?: Observed<number>, mark?: Mark, state?: 'provisional' \| 'review', running?: boolean }`. Mobil: chevron · # · ★ · jméno+klub · jízdy (stacked, pozice = číslo jízdy) · výsledek+ztráta. Desktop: + sloupec oddíl, jízdy vedle sebe s `PenaltyChip` za časem. Podium: proužek 3 px + barevné číslo. Značka místo času. Řádek na trati: běžící čas v buňce jízdy. Žádný `thead` sticky uvnitř `overflow` obalu (řeší se na úrovni stránky). |
| `RunDetail` | N | obsah rozbaleného řádku: `bib`, `ranks` (třída + kategorie), `state`, `runs: Array<{ label, time, penalty, total, gates, counts: boolean, startedAt?, note? }>`; mobil pod sebou, desktop vedle sebe; přes celou šířku tabulky, bez levého odsazení |
| `OnCoursePanel` | N | `riders: OnCourseRider[]`, `phaseLabel`, `leader?`, `collapsed`; mobil seznam, desktop 3 sloupce; prázdný = nerenderuje se, nikdy se nemaže při výpadku (dostane `stale`) |
| `OnCourseRider` | N | `bib`, `name`, `categoryTag`, `status: 'at-start' \| 'running' \| 'finished-pending'`, `time` (`RunningTime` props), `gates`, `split?`, `toLeader?` (± s), `timeToBeat?: { mode: 'target' \| 'delta', value, holder }`, `featured` |
| `StartlistTable` | N | sloupce St.č. · ★ · jméno+klub · Start 1./2. (pod sebou); DNS omluven inline |
| `ProgramList` | N | `days: Array<{ label, items }>`, položka `{ time, title, subtitle, state, progress?, href, running }`; běžící řádky s podložkou `red-100`; víc běžících fází naráz: aplikace nad seznam dá `Notice` s výběrem |
| `TableToolbar` | N | kontejner pro hledání + pilulky + ★ + přepínač „Detailní“; na mobilu `SearchInput` roste, pilulky `nowrap` |

### Zachovat z live-mini (vyladěné chování, nesmí se ztratit)

Dvouřádková buňka jména bez zalamování s ellipsis a klubem pod jménem · časy zarovnané na desetinnou tečku · BR stack „pozice = číslo jízdy“ se zvýrazněnou lepší jízdou · podium proužek + barevné číslo · rozbalení řádku klikem kamkoli, detail se načítá líně se skeletonem · Na trati nahoře, sbalovací · oblíbení klíčované bib + třída · karusel tříd s maskou a doscrollováním · toolbar v hlavičce tabulky · DNS/DNF/DSQ na konci · tiché držení dat při reconnectu · 16 px input na dotyku · 0.5 rem okraj stránky na mobilu.

### Co musí komponenty umět kvůli rebuildu (`c123-server/docs/arch/CLIENT-OBLIGATIONS.md`)

| Povinnost | Kde v DS |
|---|---|
| tři stavy `Observed` na každém poli, `0` ≠ `not-yet` ≠ `unavailable` | `TimeValue`, `ResultsTable` (`Observed<T>` typ exportovaný z DS) |
| `unavailable` vykreslit jako „neznámo“, `not-applicable` smí sloupec skrýt | `ResultsTable.columns`, `GateGrid` |
| `provisional` a `underReview` odlišené od sebe i od ustálené hodnoty, obojí naráz | `StatusBadge` (amber vs violet), řádek s `state` |
| běžící čas tiká jen přes `Clock`, mrzne po 3 s od příjmu, ukáže stáří | `RunningTime`, `DataAge` |
| výpadek heartbeatu: vše stale, nic nemazat, žádný banner | `DataAge.connection`, `OnCoursePanel` stale, `StatusBadge state="stale"` |
| `penalty: null` = neposouzeno, ne 0 | `PenaltyChip` |
| značka má přednost před časem | `MarkBadge` v `ResultsTable` |
| `non-ranked` raced-but-unranked | `ResultsTable` řádek `rank: unavailable` + `MarkBadge mark="NR"` („mimo pořadí“) |
| pořadí v kategorii vedle pořadí ve třídě | `ResultRow.categoryRank`, `RunDetail.ranks` |
| `timeToBeat` target / delta + držitel | `OnCourseRider.timeToBeat` |
| více fází naráz, výchozí první jezdec na trati | `ProgramList` + `Notice`; výběr dělá aplikace |
| `prefers-reduced-motion` u každé animace | `StatusBadge live`, `OnCoursePanel` vstup řádku, karusel |
| labely tokenů jen na klientovi | DS nese české výchozí popisky, vše přepsatelné přes props |

## 4. Tribuna, úřad, profil (stránkové komponenty)

| Komponenta | Verdikt | API |
|---|---|---|
| `Subbar` | N | sekundární pás pod `Header` (akční modrá), položky s `active` |
| `Breadcrumbs` | N | |
| `PageTitle` | N | nadpis + meta řádek + akce vpravo; nahrazuje HeroSection |
| `WeekendCalendar` | N | `weekends: Array<{ label, dates, current?, events: CalendarEventRow[] }>`, mezi nimi `weekday` položky tence; řádek události: sekce, úroveň, název, místo, pořadatel, dny, stav přihlášek (`StatusBadge`-like: uzávěrka za N dní / uzavřeno / dohlášky do), dokumenty, výsledky/live |
| `DeadlineBadge` | N | `kind: 'open' \| 'closing' \| 'closed' \| 'late'`, `date`; text počítá aplikace |
| `EntryTable` | N | úřad: tabulka závodníků/lodí s kontrolami jako `Badge` (ok / warn), `select` v buňce, C2 jako dvouřádková loď s `rowSpan`, akce „vyměnit člena“ / „odebrat“; varování nikdy neblokuje tlačítko odeslat |
| `ProposalList` | N | návrhy od závodníků s Potvrdit / Odmítnout |
| `SummaryCard` | N | souhrn přihlášky (lodě, závodníci, startovné) |
| `ProfileHeader` | N | jméno, oddíl, ročník, RGC, VT dlaždice (`StatTile`), akce |
| `SeasonSparkline` | N | křivka umístění za sezónu (inline SVG, předběžný bod odlišený) |
| `RivalsList` | N | soupeři z ročníku s bodovým rozdílem (soukromí nezletilých řeší aplikace) |

## 5. Co se z 1.x přebírá do stories jako „prototypy“

Prototypy 1.x (`src/prototypes/`) se mažou. Nahrazují je stories typu „Page“ v Storybooku postavené z v2 komponent, jedna na obrazovku z reference: `Live/Running`, `Live/Expanded`, `Live/Startlist`, `Live/Official`, `Live/Disconnected`, `Live/Program`, `Event/Detail`, `Calendar/Season`, `Entry/ClubEntry`, `Athlete/PublicProfile`, `Athlete/MobileProfile`. Vizuální snapshoty se dělají nad nimi.
