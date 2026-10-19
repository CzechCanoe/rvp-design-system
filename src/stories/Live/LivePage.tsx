import { useState, type ReactNode } from 'react';
import { ClockProvider } from '../../clock';
import { BottomBar } from '../../components/BottomBar';
import { EventHeader } from '../../components/EventHeader';
import { PageLayout } from '../../components/PageLayout';
import { SegmentedControl } from '../../components/SegmentedControl';
import { StartlistTable, type StartlistRow } from '../../components/StartlistTable';
import { StatusBadge } from '../../components/StatusBadge';
import { Tabs } from '../../components/Tabs';
import { liveClock } from '../_shared/storyClock';
import './Live.stories.css';

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
