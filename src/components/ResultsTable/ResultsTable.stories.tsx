import type { Meta, StoryObj } from '@storybook/react';
import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ClockProvider, createTestClock } from '../../clock';
import { StatusBadge, type StatusBadgeState } from '../StatusBadge';
import { ResultsTable, type ResultsTableProps } from './ResultsTable';
import { RunDetail, type RunDetailRun } from './RunDetail';
import type { ResultRow, ResultRowId } from './types';
import { knownNumber } from './values';
import {
  STORY_NOW,
  brRows,
  categoryRows,
  dnsRow,
  gates,
  known,
  makeRows,
  markRows,
  onCourseRows,
  reviewRows,
  rezekDetail,
  singleRows,
  startlistRows,
} from './ResultsTable.fixtures';
import './ResultsTable.stories.css';

/** Static stories: frames are never flushed, so running times never tick in screenshots. */
const storyClock = createTestClock({ now: STORY_NOW });

const meta = {
  title: 'Components/ResultsTable',
  component: ResultsTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Results table v2. **The data model is visual, not domain:** `rows: ResultRow[]` with `Observed<T>` values, ' +
          '`RunCell` per run slot (position = run number) and `Mark`; the application maps its contract and sorts the rows.\n\n' +
          '- **Mobile** (default, below 640 px of the table width): chevron · # · ★ · name + club · runs (stacked) · result + gap.\n' +
          '- **Desktop** (container query from 640 px, or `density="desktop"`): + club column, runs side by side with ' +
          '`PenaltyChip` after the time, gap column.\n' +
          '- Podium: 3 px stripe + coloured rank. A mark replaces the time. A row on course ticks in its run cell ' +
          '(`RunningTime`, only via `Clock`). Times never wrap.\n' +
          '- Expanding: click anywhere on the row (or the chevron button); `renderDetail` (usually `RunDetail`) ' +
          'spans the full width without indentation.\n' +
          '- No sticky header inside an overflow wrapper: the table has neither; the page makes the header sticky.\n\n' +
          'Times are seconds only (`95.43`, no `m:ss`), as today. Stories use `createTestClock()` at a fixed time.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ClockProvider clock={storyClock}>
        <Story />
      </ClockProvider>
    ),
  ],
  argTypes: {
    columns: { control: 'inline-radio', options: ['single', 'pair', 'startlist'] },
    density: { control: 'inline-radio', options: [undefined, 'mobile', 'desktop'] },
    rows: { control: false },
    clock: { control: false },
    renderDetail: { control: false },
  },
  args: {
    rows: brRows,
    columns: 'pair',
    clock: storyClock,
  },
} satisfies Meta<typeof ResultsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const links = (
  <span className="rt-story__links">
    <a href="#profil">Profil závodníka</a>
    <a href="#sledovat">Sledovat ★</a>
  </span>
);

/** Detail of a row: REZEK has the reference detail (Live2), the others are derived from the row. */
function detailFor(row: ResultRow): ReactNode {
  if (row.id === 'k1m-35') return <RunDetail {...rezekDetail} actions={links} />;
  const runs: RunDetailRun[] = row.runs.map((r, i) => {
    const total = knownNumber(r.time);
    const penalty = r.penalty === undefined ? 0 : knownNumber(r.penalty);
    return {
      label: `${i + 1}. jízda`,
      time: total !== null && penalty !== null ? known(Math.round((total - penalty) * 100) / 100) : r.time,
      penalty,
      total: r.time,
      gates: total !== null ? gates(22, penalty ? { 7: penalty } : {}) : undefined,
      counts: Boolean(r.best),
      mark: r.mark,
      running: r.running,
    };
  });
  return <RunDetail bib={row.bib} ranks={[{ rank: row.rank, label: 've třídě' }]} runs={runs} actions={links} />;
}

interface FrameProps {
  state?: StatusBadgeState;
  status?: ReactNode;
  foot?: ReactNode;
  children: ReactNode;
}

function Frame({ state, status, foot, children }: FrameProps) {
  return (
    <div className="rt-story">
      <div className="rt-story__card">
        {(state || status) && (
          <div className="rt-story__status">
            {state && <StatusBadge state={state} />}
            {status && <span>{status}</span>}
          </div>
        )}
        {children}
        {foot && <div className="rt-story__foot">{foot}</div>}
      </div>
    </div>
  );
}

type InteractiveProps = Omit<ResultsTableProps, 'expandedId' | 'onToggle' | 'onFavoriteChange'> & {
  initialExpanded?: ResultRowId | null;
};

/** Table with local expand / favourite state (the application owns it in real use). */
function InteractiveTable({ rows: initialRows, initialExpanded = null, renderDetail = detailFor, ...props }: InteractiveProps) {
  const [rows, setRows] = useState(initialRows);
  const [expanded, setExpanded] = useState<ResultRowId | null>(initialExpanded);
  return (
    <ResultsTable
      {...props}
      rows={rows}
      expandedId={expanded}
      onToggle={(id) => setExpanded((current) => (current === id ? null : id))}
      onFavoriteChange={(row, favorite) =>
        setRows((current) => current.map((r) => (r.id === row.id ? { ...r, favorite } : r)))
      }
      renderDetail={renderDetail}
    />
  );
}

// ---------------------------------------------------------------------------
// Stories (snapshotted at 390 and 1280 px, see tests/config.ts resultsTableStories)
// ---------------------------------------------------------------------------

/** Best-run race (BR), 8 rows after the 2nd run (reference Live1 / Zavod): podium, penalties, review row, on course, waiting. */
export const Default: Story = {
  render: (args) => (
    <Frame state="provisional" status="K1 muži · po 2. jízdě · 8 z 24 v cíli">
      <InteractiveTable {...args} rows={brRows} columns="pair" />
    </Frame>
  ),
};

/** One run per athlete: time · penalty, result (with penalties) and gap. */
export const SingleRun: Story = {
  render: (args) => (
    <Frame state="official" status="K1 muži · finále · schváleno 20. 9. 16:40">
      <InteractiveTable {...args} rows={singleRows} columns="single" />
    </Frame>
  ),
};

/** Category view (reference Live4): rank in U18 with the class rank under it („3. celk.“); NR and DNF at the end. */
export const CategoryRanks: Story = {
  render: (args) => (
    <Frame
      state="official"
      status="pořadí v U18, vedle celkové"
      foot="7 v U18 · 31 celkem"
    >
      <InteractiveTable {...args} rows={categoryRows} columns="single" />
    </Frame>
  ),
};

/** Rows on course: the running time ticks in the run cell (here frozen by the test clock); one is stale (dotted), one in its 1st run. */
export const OnCourse: Story = {
  render: (args) => (
    <Frame state="live" status="K1 muži · 2. jízda · 3 na trati">
      <InteractiveTable {...args} rows={onCourseRows} columns="pair" />
    </Frame>
  ),
};

/** „V revizi“ tints the row and shows the badge with a note; „Předběžné“ only the badge. */
export const UnderReview: Story = {
  render: (args) => (
    <Frame state="provisional" status="K1 muži · po 2. jízdě">
      <InteractiveTable {...args} rows={reviewRows} columns="pair" />
    </Frame>
  ),
};

/**
 * Marks: DNF in one run (the other counts), NR (raced, not ranked: time muted, „mimo pořadí“), DSQ, DNS in both runs,
 * DNS-A without run marks (shown in the result cell), and unknown values (`unavailable`, „—“).
 */
export const Marks: Story = {
  render: (args) => (
    <Frame state="official" status="K1 muži · oficiální výsledky">
      <InteractiveTable {...args} rows={markRows} columns="pair" />
    </Frame>
  ),
};

/** Expanded row (reference Live2 / Zavod): `RunDetail` spans the full width, no indentation; stacked on mobile, side by side on desktop. */
export const Expanded: Story = {
  render: (args) => (
    <Frame state="provisional" status="K1 muži · po 2. jízdě">
      <InteractiveTable {...args} rows={[...brRows.slice(0, 4), dnsRow]} columns="pair" initialExpanded="k1m-35" />
    </Frame>
  ),
};

/** Start list: start number, star, name + club, start times stacked (position = run); DNS omluven inline. */
export const Startlist: Story = {
  render: (args) => (
    <Frame status="K1 muži · startovní listina">
      <InteractiveTable {...args} rows={startlistRows} columns="startlist" />
    </Frame>
  ),
};

export const Empty: Story = {
  render: (args) => (
    <Frame status="K1 muži">
      <ResultsTable {...args} rows={[]} columns="pair" emptyState="Zatím žádné výsledky" />
    </Frame>
  ),
};

// ---------------------------------------------------------------------------
// Not snapshotted
// ---------------------------------------------------------------------------

/** Container query, not media query: a 390 px wide table shows the mobile columns on any viewport. */
export const InNarrowContainer: Story = {
  render: (args) => (
    <div className="rt-story">
      <div className="rt-story__narrow rt-story__card">
        <InteractiveTable {...args} rows={brRows} columns="pair" />
      </div>
    </div>
  ),
};

function HundredRowsProbe(props: ResultsTableProps) {
  const rows = useMemo(() => makeRows(100), []);
  const [mount, setMount] = useState(0);
  const [measure, setMeasure] = useState<{ ms: number; run: number } | null>(null);
  const start = useRef(performance.now());
  const tableRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Forces layout, so the measure covers React render + commit + layout of all rows.
    void tableRef.current?.offsetHeight;
    setMeasure({ ms: performance.now() - start.current, run: mount });
  }, [mount]);

  return (
    <div className="rt-story">
      <div className="rt-story__probe">
        <button
          type="button"
          onClick={() => {
            start.current = performance.now();
            setMount((m) => m + 1);
          }}
        >
          Vykreslit znovu
        </button>
        <span>
          100 řádků vykresleno za <output data-testid="render-ms" data-run={measure?.run}>{measure === null ? '…' : measure.ms.toFixed(1)}</output> ms
          (render + commit + layout)
        </span>
      </div>
      <div className="rt-story__card" ref={tableRef}>
        <InteractiveTable key={mount} {...props} rows={rows} columns="pair" />
      </div>
    </div>
  );
}

/**
 * 100 rows (performance). The probe measures mounting the table (React render, commit and layout) in the
 * browser; `tests/results-table.spec.ts` asserts a budget and reports the time. Rows are memoised: as long as
 * unchanged rows keep the same `ResultRow` object and `labels` keep their values, expanding a row or toggling a
 * star re-renders only the affected rows, also with inline callbacks as in this story (the table calls the latest
 * `onToggle` / `onFavoriteChange` through stable wrappers). An expanded row re-renders with every table render,
 * because its detail comes from `renderDetail`. Running times tick inside their own cell.
 */
export const HundredRows: Story = {
  tags: ['no-snapshot'],
  render: (args) => <HundredRowsProbe {...args} />,
};
