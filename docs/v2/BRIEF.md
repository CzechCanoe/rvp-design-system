# Brief v2 „Klidná voda“

## Proč v2

Verze 1.x vznikla v lednu 2026 jako první „posprejování“ území popsaného v `csk-rvp-analysis`. Od té doby:

- analýza prošla revizí (`csk-rvp-analysis`, větev `revize-2026-09`) a popisuje procesy a role přesněji;
- běží Rebuild 2026/27 ekosystému c123 (`c123-server/docs/arch`), který po živém klientovi vyžaduje stavy, které 1.x neumí vyjádřit (`CLIENT-OBLIGATIONS.md`, sekce „Rendering clients“ a „live-mini-client“);
- jediný konzument, `c123-live-mini`, si k 1.x dopsal ~12 vlastních komponent a čtyři `:global(.csk-*)` overridy, a jeho CSS odkazuje na tokeny `--csk-*`, které v `dist/` z větší části neexistují (43 `--csk-*` proti 1 098 neprefixovaným), takže ve skutečnosti běží na fallbackových hodnotách.

Závěr revize: 1.x překombinovala vizuál (gradienty, mesh, energy barva, tři režimy zobrazení, aesthetic varianty) a nedodala to, co registrační a výsledkové systémy postrádají: čitelné tabulky, jasné stavy hodnot, formuláře bez překvapení, obrazovky, které fungují na telefonu u vody.

## Kritická kvalita

**Použitelnost.** Úkon zvládne člověk, který systém používá zřídka, bez školení a bez telefonátu (`CSK_RVP_Business_Analyza.md` A.7.1). Plný provoz na mobilu. Chybové hlášky říkají, co dál. Varování nikdy neblokuje.

## Principy

1. **Kontinuita s kanoe.cz, ne poslušnost.** Barvy z loga ČSK a z kanoe.cz (`TOKENS.md`), modrý pás nahoře, bílá plocha, žádné gradienty a mesh pozadí. Tón nastavuje nový systém, kanoe.cz ho může dotáhnout. Embed na kanoe.cz nesmí vypadat cize.
2. **Jeden systém, tři tóny.** *Tribuna* (live, výsledky, kalendář): bílá, vzduch, energie jen z dat (běžící čas, LIVE). *Úřad* (přihlášky, registr): šedá pracovní plocha, hustší tabulky, žádné hero. *Moje* (vlastní prostor závodníka): stejné tokeny, telefon jako výchozí plátno, obsah navíc (křivka, soupeři), ne jiný vzhled.
3. **Stavy hodnot jsou páteř.** Oficiální · Předběžné · V revizi · Neznámo · Live · Zastaveno (stale). Každá komponenta, která zobrazuje výsledek nebo čas, je umí vyjádřit. Předběžné a V revizi mohou platit zároveň a liší se barvou i tvarem.
4. **Komponenty přijímají stavy, ne doménu.** DS nezná `ResultEntry` s `run1Time`. Zná `Observed<T>` (`known` / `not-yet` / `unavailable`), značky (DNS/DNF/DSQ) a vizuální varianty. Mapování z kontraktu dělá aplikace.
5. **Pohyb jen u dat.** Tikající čas, změna pořadí, nový stav. Nic dekorativního. `prefers-reduced-motion` se respektuje všude.
6. **Mobil nejdřív u všeho, kde je divák nebo závodník.** 390 px je výchozí plátno pro live a profil; desktop přidává sloupce, neodebírá informace.
7. **Žádné `:global` overridy u konzumentů.** Když aplikace potřebuje variantu, DS ji dostane. `c123-live-mini` je po v2 bez vlastních komponent tabulky, karusel tabů, bib badge, hvězdičky a stacked buněk.

## Co se mění

- Tokeny: jeden prefix `--csk-*`, jedna paleta, bez režimů `utility` / `expressive`. `embed` zůstává jako jediný režim (neutrální obal pro kanoe.cz).
- Písmo: Barlow Semi Condensed (nadpisy, pořadí, čísla v hero) + IBM Plex Sans (text, tabulky, formuláře, tabulkové číslice) + IBM Plex Mono (časy, rozdíly). Self-hosted jako dnes Inter.
- Barvy: svazová modrá `#004899` (logo), akční modrá `#2a66b4` (kanoe.cz), červená `#e42313` jen pro LIVE a chyby. Stavové: zelená Oficiální, jantar Předběžné, fialová V revizi, šedá Neznámo.
- Komponenty pro živé výsledky převzaté z `c123-live-mini` a rozšířené o povinnosti rebuildu (`COMPONENTS.md`).
- Prototypy: nahrazují se referencí v `reference/` a novými stories; dnešních 12 prototypů se maže (fáze 5).

## Co zůstává

- Technologie: React 18/19 peer, Vite build (ESM + CJS + d.ts), CSS bez CSS-in-JS, BEM třídy `csk-*`, Storybook, Playwright vizuální testy, Release Please, GitHub Packages.
- Z komponent 1.x většina základu (Button, Input, Select, Checkbox, Radio, Switch, Card, Badge, Modal, Toast, Pagination, Skeleton, EmptyState, Icon, Avatar, Table, Dropdown, SearchInput, Tabs, PageLayout, Header, Progress, Timeline, Wizard, Calendar) s přetokenováním a odstraněním `gradient` / `energy` / `aesthetic` variant.
- Z `c123-live-mini` vše, co dalo práci vyladit (viz `COMPONENTS.md`, „Zachovat z live-mini“).

## Mimo scope v2

- Tmavý režim (připravit tokeny tak, aby šel doplnit v 2.x, ale nekreslit).
- Sdílecí kartičky výsledků.
- Kayak Cross a klasifikační standingy jako samostatné komponenty (jen stavy v tabulce, viz `COMPONENTS.md`).
- Guardian / rodičovské obrazovky (analýza je má jako otevřené rozhodnutí).
