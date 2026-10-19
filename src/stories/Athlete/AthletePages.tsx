import { useState, type ReactNode } from 'react';
import { BottomBar } from '../../components/BottomBar';
import { Badge } from '../../components/Badge';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { MarkBadge } from '../../components/MarkBadge';
import { Notice } from '../../components/Notice';
import { PageLayout } from '../../components/PageLayout';
import { BrandMark } from '../../components/PageLayout/layoutStoryParts';
import { ProfileHeader } from '../../components/ProfileHeader';
import { RivalsList } from '../../components/RivalsList';
import { SeasonSparkline } from '../../components/SeasonSparkline';
import { seasonPoints } from '../../components/SeasonSparkline/SeasonSparkline.fixtures';
import { SegmentedControl } from '../../components/SegmentedControl';
import { StatTile } from '../../components/StatTile';
import { StatusBadge } from '../../components/StatusBadge';
import { Subbar } from '../../components/Subbar';
import { Table, type ColumnDef } from '../../components/Table';
import { Tabs } from '../../components/Tabs';
import { TimeValue } from '../../components/TimeValue';
import {
  ATHLETE_NAME,
  mobileTiles,
  publicTiles,
  rivals,
  seasonResults,
  type SeasonResult,
} from './Athlete.fixtures';
import './Athlete.stories.css';

const iconProps = { viewBox: '0 0 24 24', 'aria-hidden': true } as const;

const siteNav = (
  <>
    <a href="#uvod">Úvod</a>
    <a href="#sporty">Sporty</a>
    <a href="#zavody">Závody</a>
    <a href="#zavodnici" aria-current="page">
      Závodníci
    </a>
    <a href="#treneri">Trenéři</a>
    <a href="#prihlasit">Přihlásit se</a>
  </>
);

const subbarItems = [
  { label: 'Závodníci', href: '#zavodnici', active: true },
  { label: 'Oddíly', href: '#oddily' },
  { label: 'Žebříčky a VT', href: '#zebricky' },
  { label: 'Reprezentace', href: '#reprezentace' },
];

function RankCell({ row }: { row: SeasonResult }) {
  if (row.rank === null) return <MarkBadge mark="DNF" />;
  return (
    <>
      <span className="athlete-page__rank">{row.rank}.</span> <span className="athlete-page__of">/ {row.of}</span>
    </>
  );
}

const resultColumns: ColumnDef<SeasonResult>[] = [
  { key: 'date', header: 'Datum', cell: (r) => <span className="athlete-page__muted">{r.date}</span> },
  {
    key: 'race',
    header: 'Závod',
    cell: (r) => (
      <>
        <a className="athlete-page__race" href="#zavod">
          {r.race}
        </a>
        <div className="athlete-page__sub">{r.place}</div>
      </>
    ),
  },
  { key: 'category', header: 'Kategorie', accessor: 'category' },
  { key: 'rank', header: 'Umístění', align: 'right', cell: (r) => <RankCell row={r} /> },
  {
    key: 'result',
    header: 'Výsledek',
    align: 'right',
    cell: (r) =>
      r.seconds !== undefined ? <TimeValue value={r.seconds} /> : r.text ? <span className="athlete-page__mono">{r.text}</span> : '·',
  },
  {
    key: 'diff',
    header: 'Ztráta',
    align: 'right',
    cell: (r) =>
      r.diff === null ? <span className="athlete-page__muted">–</span> : <TimeValue value={r.diff} sign variant="muted" precision={r.text ? 1 : 2} />,
  },
  {
    key: 'points',
    header: 'Body ČP',
    align: 'right',
    cell: (r) => (r.points === null ? <span className="athlete-page__muted">·</span> : r.points),
  },
  {
    key: 'status',
    header: <span className="athlete-page__sr">Stav</span>,
    cell: (r) => <StatusBadge state={r.status} size="sm" />,
  },
];

const stat = (label: string, value: ReactNode, hint?: string) => (
  <StatTile label={label} value={value} hint={hint} />
);

/** Reference Profil.html: public profile, desktop first, wraps to one column on a phone. */
export function PublicProfilePage() {
  const [tab, setTab] = useState('results');
  const [filter, setFilter] = useState('all');
  const tiles = publicTiles.map((t) =>
    t.id === 'vt-sjezd' ? { ...t, hint: <StatusBadge state="provisional" size="sm" /> } : t
  );

  return (
    <PageLayout
      className="athlete-page"
      padded
      maxWidth="xl"
      header={
        <>
          <Header variant="site" brand={<BrandMark />} navigation={siteNav} />
          <Subbar items={subbarItems} />
        </>
      }
      footer={<span className="athlete-page__foot">© 2026 Český svaz kanoistů · Profil vzniká z registru ČSK a oficiálních výsledků.</span>}
    >
      <div className="athlete-page__stack">
        <Breadcrumbs
          items={[{ label: 'Úvod', href: '#uvod' }, { label: 'Závodníci', href: '#zavodnici' }, { label: ATHLETE_NAME }]}
        />

        <ProfileHeader
          name={ATHLETE_NAME}
          badges={
            <>
              <Badge section="dv">Divoká voda</Badge>
              <Badge variant="level">Slalom</Badge>
              <Badge variant="level">K1</Badge>
              <Badge variant="level">Sjezd</Badge>
            </>
          }
          meta={[<a href="#klub">TJ Bohemians Praha</a>, 'ročník 2003', 'RGC 118 203', 'závodí od 2014']}
          tiles={tiles}
          actions={
            <>
              <Button variant="secondary">★ Sledovat</Button>
              <Button variant="secondary">Sdílet</Button>
            </>
          }
        />

        <div className="athlete-page__stats">
          {stat('Závodů 2026', 9)}
          {stat('Medaile 2026', '2 · 1 · 3')}
          {stat('Nejlepší výsledek', '1.', 'ČP #2, Troja')}
          {stat('Závodů celkem', 112, 'od 2014')}
        </div>

        <div className="athlete-page__cols">
          <div className="athlete-page__main">
            <Tabs
              variant="line"
              aria-label="Profil"
              tabs={[
                { id: 'results', label: 'Výsledky 2026' },
                { id: 'history', label: 'Historie sezón' },
                { id: 'vt', label: 'Vývoj VT' },
              ]}
              activeTab={tab}
              onChange={setTab}
            />
            <div className="athlete-page__toolbar">
              <SegmentedControl
                size="sm"
                aria-label="Disciplína"
                items={[
                  { value: 'all', label: 'Vše' },
                  { value: 'slalom', label: 'Slalom' },
                  { value: 'downhill', label: 'Sjezd' },
                  { value: 'cp', label: 'Jen ČP a MČR' },
                ]}
                value={filter}
                onChange={setFilter}
              />
              <a className="athlete-page__link athlete-page__toolbar-end" href="#csv">
                Export CSV
              </a>
            </div>
            <Card
              padding="none"
              footer={
                <div className="athlete-page__card-foot">
                  <span>9 startů v sezóně 2026</span>
                  <a className="athlete-page__link" href="#historie">
                    Starší sezóny
                  </a>
                </div>
              }
            >
              <Table<SeasonResult>
                aria-label="Výsledky závodníka v sezóně 2026"
                columns={resultColumns}
                data={seasonResults}
                rowKey="id"
              />
            </Card>
          </div>

          <aside className="athlete-page__aside" aria-label="Doplňující informace">
            <Card header={<h2 className="athlete-page__card-title">Oddíl</h2>}>
              <div className="athlete-page__club">
                <a className="athlete-page__club-name" href="#klub">
                  TJ Bohemians Praha
                </a>
                <span className="athlete-page__muted-2">oddíl kanoistiky · divoká voda · Praha 7</span>
                <span className="athlete-page__sub">člen od 2014</span>
              </div>
            </Card>
            <Card padding="none" header={<h2 className="athlete-page__card-title">Žebříčky</h2>}>
              <ul className="athlete-page__ranks">
                <li>
                  <span>Český pohár 2026, K1M</span>
                  <b>4.</b>
                </li>
                <li>
                  <span>Dlouhodobý žebříček DV</span>
                  <b>11.</b>
                </li>
                <li>
                  <span>ICF World Ranking</span>
                  <a className="athlete-page__link" href="#icf">
                    canoeicf.com ↗
                  </a>
                </li>
              </ul>
            </Card>
            <Notice tone="info" title="Co je na profilu veřejné">
              Jen to, co závodník, u nezletilých zákonný zástupce, povolil. Ročník a historie výsledků lze skrýt.
            </Notice>
          </aside>
        </div>
      </div>
    </PageLayout>
  );
}

const mobileBottomItems = [
  {
    id: 'me',
    label: 'Moje',
    href: '#moje',
    active: true,
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
      </svg>
    ),
  },
  {
    id: 'races',
    label: 'Závody',
    href: '#zavody',
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M4 10h16M9 3v4M15 3v4" />
      </svg>
    ),
  },
  {
    id: 'live',
    label: 'Live',
    href: '#live',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="3" />
        <path d="M6 6a8 8 0 0 0 0 12M18 6a8 8 0 0 1 0 12" />
      </svg>
    ),
  },
  {
    id: 'fav',
    label: 'Sledované',
    href: '#sledovane',
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l2.7 5.6 6.1.8-4.4 4.2 1.1 6.1L12 16.8 6.5 19.7l1.1-6.1L3.2 9.4l6.1-.8z" />
      </svg>
    ),
  },
];

const mobileColumns: ColumnDef<SeasonResult>[] = [
  { key: 'rank', header: 'Místo', cell: (r) => <span className="athlete-page__rank">{r.rank}.</span> },
  {
    key: 'race',
    header: 'Závod',
    cell: (r) => (
      <>
        <span className="athlete-page__race">{r.race.replace('Český pohár', 'ČP').replace(' ve slalomu', '')}</span>
        <div className="athlete-page__sub">
          {r.date} · K1M{r.seconds !== undefined && <> · <TimeValue value={r.seconds} /></>}
        </div>
      </>
    ),
  },
  {
    key: 'status',
    header: 'Body / stav',
    align: 'right',
    cell: (r) =>
      r.status === 'provisional' ? (
        <StatusBadge state="provisional" size="sm" />
      ) : (
        <span className="athlete-page__muted-2">{r.points === null ? '·' : `${r.points} b.`}</span>
      ),
  },
];

const recent = ['r2', 'r1', 'r3', 'r4'].map((id) => seasonResults.find((r) => r.id === id)!);

/** Reference ProfilMobil.html: "Moje" profile on a 390 px phone. */
export function MobileProfilePage() {
  return (
    <PageLayout
      className="athlete-page athlete-page--mobile"
      padded={false}
      maxWidth="sm"
      stickyHeader={false}
      header={
        <ProfileHeader
          variant="band"
          name={ATHLETE_NAME}
          topbar={<span>kanoe.cz · závodníci</span>}
          actions={<a href="#upravit">Upravit profil</a>}
          badges={
            <>
              <Badge variant="level">Slalom</Badge>
              <Badge variant="level">Sjezd</Badge>
            </>
          }
          meta={['TJ Bohemians Praha', 'K1', 'ročník 2003']}
          tiles={mobileTiles}
        />
      }
      bottomBar={<BottomBar items={mobileBottomItems} aria-label="Moje" />}
    >
      <div className="athlete-page__phone">
        <Card tone="highlight" padding="none">
          <div className="athlete-page__last-body">
            <div className="athlete-page__last-head">
              <span className="athlete-page__eyebrow">Poslední závod</span>
              <StatusBadge state="official" size="sm" />
              <span className="athlete-page__sub athlete-page__end">před 2 h</span>
            </div>
            <div className="athlete-page__last-main">
              <span className="athlete-page__big-rank">1.</span>
              <div className="athlete-page__last-text">
                <b>Český pohár #2, Troja</b>
                <span className="athlete-page__sub">K1 muži · 24 lodí · 17. 5. 2026</span>
                <span>
                  <TimeValue value={92.34} /> <span className="athlete-page__sub">· 2. jízda · 0 tr.</span>
                </span>
              </div>
            </div>
            <div className="athlete-page__last-actions">
              <Button size="sm" fullWidth>
                Sdílet výsledek
              </Button>
              <Button size="sm" variant="secondary" fullWidth>
                Celé výsledky
              </Button>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <SeasonSparkline
            points={seasonPoints}
            title="Sezóna 2026"
            meta="umístění v K1 muži"
            note="Poslední bod je předběžný (nedělní jízdy ještě neschválené)."
          />
        </Card>

        <Card
          padding="none"
          header={
            <div className="athlete-page__card-head">
              <h2 className="athlete-page__card-title">Soupeři z ročníku</h2>
              <span className="athlete-page__sub athlete-page__end">ČP 2026 · K1 muži</span>
            </div>
          }
        >
          <RivalsList items={rivals} aria-label="Soupeři z ročníku" />
        </Card>

        <Card
          padding="none"
          header={
            <div className="athlete-page__card-head">
              <h2 className="athlete-page__card-title">Výsledky</h2>
              <a className="athlete-page__link athlete-page__sub athlete-page__end" href="#sezony">
                všechny sezóny
              </a>
            </div>
          }
        >
          <Table<SeasonResult>
            aria-label="Poslední výsledky"
            columns={mobileColumns}
            data={recent}
            rowKey="id"
          />
        </Card>

        <Notice tone="info">
          Profil je veřejný. Ročník a historii si můžeš skrýt v nastavení, u nezletilých to potvrzuje zákonný zástupce.
        </Notice>
      </div>
    </PageLayout>
  );
}
