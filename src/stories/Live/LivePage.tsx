import { useState, type ReactNode } from 'react';
import { ClockProvider, createTestClock } from '../../clock';
import { BottomBar } from '../../components/BottomBar';
import { Card } from '../../components/Card';
import { FilterPills } from '../../components/FilterPills';
import { Icon } from '../../components/Icon';
import { DataAge } from '../../components/DataAge';
import { EventHeader } from '../../components/EventHeader';
import { FavoritesToggle } from '../../components/FavoritesToggle';
import { PageLayout } from '../../components/PageLayout';
import { ResultsTable, RunDetail, type ResultRow, type ResultRowId } from '../../components/ResultsTable';
import { STORY_NOW, known, rezekDetail } from '../../components/ResultsTable/ResultsTable.fixtures';
import { knownNumber } from '../../components/ResultsTable/values';
import { SearchInput } from '../../components/SearchInput';
import { SegmentedControl } from '../../components/SegmentedControl';
import { StartlistTable, type StartlistRow } from '../../components/StartlistTable';
import { StatusBadge, type StatusBadgeState } from '../../components/StatusBadge';
import { TableToolbar, TableToolbarButton } from '../../components/TableToolbar';
import { Tabs } from '../../components/Tabs';
import './Live.stories.css';

/** One fixed clock for all Live stories (2026-10-04 15:24:45 Europe/Prague): nothing ticks in screenshots. */
export const liveClock = createTestClock({ now: STORY_NOW });
export { STORY_NOW };

const iconProps = { viewBox: '0 0 24 24', 'aria-hidden': true } as const;
type Section = 'results' | 'startlist' | 'on-course' | 'program';

const bottomItems = (active: Section) => [
  {
    id: 'results',
    label: 'Výsledky',
    href: '#vysledky',
    active: active === 'results',
    icon: (
      <svg {...iconProps}>
        <path d="M4 6h16M4 12h10M4 18h13" />
      </svg>
    ),
  },
  {
    id: 'startlist',
    label: 'Startovka',
    href: '#startovka',
    active: active === 'startlist',
    icon: (
      <svg {...iconProps}>
        <path d="M5 21V4M5 4h12l-2 4 2 4H5" />
      </svg>
    ),
  },
  {
    id: 'on-course',
    label: 'Na trati',
    href: '#na-trati',
    active: active === 'on-course',
    icon: (
      <svg {...iconProps}>
        <path d="M3 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      </svg>
    ),
  },
  {
    id: 'program',
    label: 'Program',
    href: '#program',
    active: active === 'program',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
  },
];

const classTabs = (labels: string[]) => labels.map((label) => ({ id: label, label }));
export const CLASSES = classTabs(['Forerunners', 'C1 ženy', 'C1 muži', 'K1 ženy', 'K1 muži', 'C2 mix']);
export const CLASS_CODES = classTabs(['FOR', 'K1M', 'C1W', 'C1M', 'K1W', 'C2X', '3×C1']);

export interface LiveNavProps {
  days: Array<{ value: string; label: string }>;
  day: string;
  classes?: Array<{ id: string; label: string }>;
  activeClass?: string;
  /** Extra segmented control (e.g. Kvalifikace / Finále). */
  phases?: Array<{ value: string; label: string }>;
  phase?: string;
}

/** Day, class and phase navigation under the header. Stateful here; the application owns it in real use. */
export function LiveNav({ days, day: initialDay, classes, activeClass: initialClass, phases, phase: initialPhase }: LiveNavProps) {
  const [day, setDay] = useState(initialDay);
  const [klass, setClass] = useState(initialClass);
  const [phase, setPhase] = useState(initialPhase);
  return (
    <div className="live-page__nav">
      <div className="live-page__nav-inner">
        {days.length > 0 && (
          <div className="live-page__nav-row">
            <SegmentedControl items={days} value={day} onChange={setDay} size="sm" aria-label="Den" />
          </div>
        )}
        {classes && (
          <Tabs
            variant="nav"
            size="sm"
            overflow="carousel"
            tabs={classes}
            activeTab={klass}
            onChange={setClass}
            aria-label="Třída"
          />
        )}
        {phases && phase && (
          <div className="live-page__nav-row">
            <SegmentedControl items={phases} value={phase} onChange={setPhase} size="sm" aria-label="Fáze" />
          </div>
        )}
      </div>
    </div>
  );
}

export interface LivePageProps {
  title: ReactNode;
  subtitle: ReactNode;
  /** Header status; default (undefined) is the Live badge, `null` shows none. */
  status?: ReactNode;
  dataAge?: ReactNode;
  condensed?: boolean;
  section?: Section;
  nav: ReactNode;
  children: ReactNode;
}

/** Page frame of the Live stories: EventHeader, navigation band, content ground and BottomBar. */
export function LivePage({ title, subtitle, status, dataAge, condensed, section = 'results', nav, children }: LivePageProps) {
  return (
    <ClockProvider clock={liveClock}>
      <PageLayout
        className="live-page"
        padded={false}
        maxWidth="full"
        header={
          <>
            <EventHeader
              backHref="#zavody"
              title={title}
              subtitle={subtitle}
              status={status === undefined ? <StatusBadge state="live" /> : status}
              dataAge={dataAge}
              condensed={condensed}
            />
            {nav}
          </>
        }
        bottomBar={<BottomBar items={bottomItems(section)} />}
      >
        <div className="live-page__body">
          <div className="live-page__body-inner">{children}</div>
        </div>
      </PageLayout>
    </ClockProvider>
  );
}

/** „Aktualizováno před N s“ on the fixed clock. */
export const ageAt = (secondsAgo: number) => <DataAge receivedAt={STORY_NOW - secondsAgo * 1000} clock={liveClock} />;

export interface ResultsCardProps {
  /** Status badge and text above the table. */
  state?: StatusBadgeState;
  status?: ReactNode;
  foot?: ReactNode;
  footLinks?: ReactNode;
  children: ReactNode;
  /** Active category filter shown as a dismissible pill instead of the Kategorie button. */
  activeCategory?: string;
  /** Number of favourites; `undefined` = no favourites toggle. */
  favorites?: number;
  searchLabel?: string;
}

/** Toolbar + status line + table + footer in one outlined card. */
export function ResultsCard({
  state,
  status,
  foot,
  footLinks,
  children,
  activeCategory,
  favorites,
  searchLabel = 'Hledat závodníka',
}: ResultsCardProps) {
  const [q, setQ] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  return (
    <Card
      variant="surface"
      padding="none"
      footer={
        foot || footLinks ? (
          <div className="live-page__foot">
            {foot && <span>{foot}</span>}
            {footLinks && <span className="live-page__foot-links">{footLinks}</span>}
          </div>
        ) : undefined
      }
    >
      <TableToolbar
        aria-label="Nástroje tabulky"
        search={
          <SearchInput size="sm" fullWidth aria-label={searchLabel} placeholder={searchLabel} value={q} onChange={setQ} />
        }
        favorites={
          favorites === undefined ? undefined : (
            <FavoritesToggle pressed={onlyFavorites} onPressedChange={setOnlyFavorites} count={favorites} label="Jen oblíbení" />
          )
        }
      >
        {activeCategory ? (
          <FilterPills
            size="sm"
            aria-label="Aktivní filtry"
            filters={[{ key: activeCategory, label: activeCategory, dismissible: true }]}
            onRemove={() => {}}
          />
        ) : (
          <TableToolbarButton>
            Kategorie <Icon name="chevron-down" size="sm" aria-hidden />
          </TableToolbarButton>
        )}
      </TableToolbar>
      {(state || status) && (
        <div className="live-page__status">
          {state && <StatusBadge state={state} />}
          {status && <span>{status}</span>}
        </div>
      )}
      {children}
    </Card>
  );
}

const detailActions = (
  <>
    <a className="live-page__link" href="#profil">Profil závodníka</a>
    <a className="live-page__link" href="#sledovat">Sledovat <Icon name="star" size="sm" aria-hidden /></a>
  </>
);

/** Detail of an expanded row: REZEK has the reference detail (Live2), the others a short one derived from the row. */
function renderDetail(row: ResultRow): ReactNode {
  if (row.id === 'k1m-35') return <RunDetail {...rezekDetail} actions={detailActions} />;
  return (
    <RunDetail
      bib={row.bib}
      ranks={[{ rank: row.rank, label: 've třídě' }]}
      runs={row.runs.map((r, i) => {
        const total = knownNumber(r.time);
        const penalty = r.penalty === undefined ? 0 : knownNumber(r.penalty);
        return {
          label: `${i + 1}. jízda`,
          // time without penalties = total - penalty; unknown when either is not known
          time: total !== null && penalty !== null ? known(Math.round((total - penalty) * 100) / 100) : null,
          penalty,
          total: r.time,
          counts: Boolean(r.best),
        };
      })}
      actions={detailActions}
    />
  );
}

export interface LiveResultsProps {
  rows: ResultRow[];
  columns?: 'single' | 'pair';
  initialExpanded?: ResultRowId | null;
}

/** ResultsTable with local expand / favourite state (the application owns it in real use). */
export function LiveResults({ rows: initial, columns = 'pair', initialExpanded = null }: LiveResultsProps) {
  const [rows, setRows] = useState(initial);
  const [expanded, setExpanded] = useState<ResultRowId | null>(initialExpanded);
  return (
    <ResultsTable
      rows={rows}
      columns={columns}
      clock={liveClock}
      expandedId={expanded}
      onToggle={(id) => setExpanded((current) => (current === id ? null : id))}
      onFavoriteChange={(row, favorite) =>
        setRows((current) => current.map((r) => (r.id === row.id ? { ...r, favorite } : r)))
      }
      renderDetail={renderDetail}
    />
  );
}

/** Start list with local favourite state. */
export function LiveStartlist({ rows: initial }: { rows: StartlistRow[] }) {
  const [rows, setRows] = useState(initial);
  return (
    <StartlistTable
      rows={rows}
      clock={liveClock}
      onFavoriteChange={(row, favorite) =>
        setRows((current) => current.map((r) => (r.id === row.id ? { ...r, favorite } : r)))
      }
    />
  );
}
