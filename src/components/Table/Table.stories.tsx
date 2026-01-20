import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { Table, type ColumnDef } from './Table';
import { Badge } from '../Badge';

// Note: Table is a generic component, so we use render functions for all stories
// instead of args to avoid TypeScript inference issues with Storybook

const meta: Meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Table component for displaying tabular data with sorting and selection support.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

// Sample data types
interface Athlete {
  id: number;
  name: string;
  club: string;
  section: 'dv' | 'ry' | 'vt';
  category: string;
  points: number;
}

interface Result {
  id: number;
  rank: number;
  bib: string;
  name: string;
  club: string;
  time: string;
  penalty: number;
  total: string;
}

// Sample athletes data
const athletes: Athlete[] = [
  { id: 1, name: 'Jan Novák', club: 'USK Praha', section: 'dv', category: 'C1M', points: 1250 },
  { id: 2, name: 'Petra Svobodová', club: 'TJ Brandýs', section: 'dv', category: 'K1W', points: 1180 },
  { id: 3, name: 'Martin Dvořák', club: 'KK Roudnice', section: 'ry', category: 'K2M', points: 980 },
  { id: 4, name: 'Eva Černá', club: 'SK Hradec', section: 'vt', category: 'K1W', points: 720 },
  { id: 5, name: 'Tomáš Procházka', club: 'VK Smíchov', section: 'dv', category: 'C1M', points: 1320 },
  { id: 6, name: 'Lucie Horáková', club: 'USK Praha', section: 'ry', category: 'K1W', points: 1050 },
];

// Sample results data
const results: Result[] = [
  { id: 1, rank: 1, bib: '101', name: 'Tomáš Procházka', club: 'VK Smíchov', time: '92.45', penalty: 0, total: '92.45' },
  { id: 2, rank: 2, bib: '105', name: 'Jan Novák', club: 'USK Praha', time: '93.12', penalty: 2, total: '95.12' },
  { id: 3, rank: 3, bib: '108', name: 'Jakub Král', club: 'KK Roudnice', time: '94.88', penalty: 0, total: '94.88' },
  { id: 4, rank: 4, bib: '112', name: 'Petr Malý', club: 'TJ Brandýs', time: '95.21', penalty: 4, total: '99.21' },
  { id: 5, rank: 5, bib: '103', name: 'Adam Veselý', club: 'SK Hradec', time: '96.55', penalty: 2, total: '98.55' },
];

// Column definitions for athletes
const athleteColumns: ColumnDef<Athlete>[] = [
  {
    key: 'name',
    header: 'Jméno',
    accessor: 'name',
    sortable: true,
  },
  {
    key: 'club',
    header: 'Klub',
    accessor: 'club',
    sortable: true,
  },
  {
    key: 'section',
    header: 'Sekce',
    cell: (row) => <Badge section={row.section} size="sm">{row.section.toUpperCase()}</Badge>,
    sortable: true,
  },
  {
    key: 'category',
    header: 'Kategorie',
    accessor: 'category',
    sortable: true,
  },
  {
    key: 'points',
    header: 'Body',
    accessor: 'points',
    sortable: true,
    align: 'right',
  },
];

// Column definitions for results
const resultColumns: ColumnDef<Result>[] = [
  {
    key: 'rank',
    header: '#',
    accessor: 'rank',
    width: '60px',
    align: 'center',
    cell: (row) => (
      <span style={{ fontWeight: row.rank <= 3 ? 'bold' : 'normal' }}>
        {row.rank}
      </span>
    ),
  },
  {
    key: 'bib',
    header: 'Č.',
    accessor: 'bib',
    width: '60px',
    align: 'center',
  },
  {
    key: 'name',
    header: 'Jméno',
    accessor: 'name',
    sortable: true,
  },
  {
    key: 'club',
    header: 'Klub',
    accessor: 'club',
  },
  {
    key: 'time',
    header: 'Čas',
    accessor: 'time',
    align: 'right',
    sortable: true,
    cell: (row) => (
      <span style={{ fontFamily: 'var(--font-family-mono)' }}>{row.time}</span>
    ),
  },
  {
    key: 'penalty',
    header: 'Trest',
    accessor: 'penalty',
    align: 'center',
    cell: (row) => (
      row.penalty > 0 ? (
        <Badge variant="error" size="sm">{row.penalty}</Badge>
      ) : (
        <span style={{ color: 'var(--color-text-tertiary)' }}>0</span>
      )
    ),
  },
  {
    key: 'total',
    header: 'Celkem',
    accessor: 'total',
    align: 'right',
    sortable: true,
    cell: (row) => (
      <span style={{ fontFamily: 'var(--font-family-mono)', fontWeight: 'bold' }}>
        {row.total}
      </span>
    ),
  },
];

// =============================================================================
// Stories
// =============================================================================

export const Default = {
  render: () => (
    <Table columns={athleteColumns} data={athletes} rowKey="id" />
  ),
};

export const Striped = {
  render: () => (
    <Table columns={athleteColumns} data={athletes} rowKey="id" variant="striped" />
  ),
};

export const Bordered = {
  render: () => (
    <Table columns={athleteColumns} data={athletes} rowKey="id" variant="bordered" />
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Small</h3>
        <Table columns={athleteColumns} data={athletes.slice(0, 3)} rowKey="id" size="sm" />
      </div>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Medium (default)</h3>
        <Table columns={athleteColumns} data={athletes.slice(0, 3)} rowKey="id" size="md" />
      </div>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Large</h3>
        <Table columns={athleteColumns} data={athletes.slice(0, 3)} rowKey="id" size="lg" />
      </div>
    </div>
  ),
};

export const Sortable = {
  render: () => (
    <Table
      columns={athleteColumns}
      data={athletes}
      rowKey="id"
      defaultSortKey="points"
      defaultSortDirection="desc"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Click on column headers to sort. Click again to reverse, third click to clear.',
      },
    },
  },
};

export const Selectable = {
  render: () => {
    const SelectableTable = () => {
      const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(new Set([1, 3]));

      return (
        <div>
          <p style={{ marginBottom: '1rem' }}>
            Selected: {selectedKeys.size > 0 ? Array.from(selectedKeys).join(', ') : 'none'}
          </p>
          <Table
            columns={athleteColumns}
            data={athletes}
            rowKey="id"
            selectable
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          />
        </div>
      );
    };

    return <SelectableTable />;
  },
};

export const ResultsTable = {
  render: () => (
    <Table
      columns={resultColumns}
      data={results}
      rowKey="id"
      variant="striped"
      caption="C1M Finále - Slalom Troja 2026"
      captionVisible
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Race results table with monospace times, penalty badges, and visible caption.',
      },
    },
  },
};

export const Loading = {
  render: () => (
    <Table columns={athleteColumns} data={athletes} rowKey="id" loading />
  ),
};

export const Empty = {
  render: () => (
    <Table
      columns={athleteColumns}
      data={[]}
      rowKey="id"
      emptyState={
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
            Žádní závodníci nenalezeni
          </p>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.875rem' }}>
            Zkuste upravit filtry vyhledávání
          </p>
        </div>
      }
    />
  ),
};

export const StickyHeader = {
  render: () => {
    // Generate more data for scrolling
    const moreAthletes = [...athletes, ...athletes, ...athletes].map((a, i) => ({
      ...a,
      id: i + 1,
      name: `${a.name} ${Math.floor(i / 6) + 1}`,
    }));

    return (
      <div style={{ height: '300px', overflow: 'hidden' }}>
        <Table
          columns={athleteColumns}
          data={moreAthletes}
          rowKey="id"
          stickyHeader
          variant="striped"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Header stays visible when scrolling through a long table.',
      },
    },
  },
};

export const CustomCellRendering = {
  render: () => {
    interface Event {
      id: number;
      name: string;
      date: string;
      location: string;
      sections: ('dv' | 'ry' | 'vt')[];
      status: 'upcoming' | 'live' | 'finished';
    }

    const events: Event[] = [
      { id: 1, name: 'Slalom Troja', date: '2026-05-15', location: 'Praha', sections: ['dv'], status: 'live' },
      { id: 2, name: 'Sprint ČR', date: '2026-05-20', location: 'Račice', sections: ['ry'], status: 'upcoming' },
      { id: 3, name: 'Sjezd Vltava', date: '2026-06-01', location: 'Český Krumlov', sections: ['dv', 'vt'], status: 'upcoming' },
      { id: 4, name: 'Regata Praha', date: '2026-04-10', location: 'Praha', sections: ['ry'], status: 'finished' },
    ];

    const eventColumns: ColumnDef<Event>[] = [
      {
        key: 'name',
        header: 'Závod',
        accessor: 'name',
        sortable: true,
      },
      {
        key: 'date',
        header: 'Datum',
        accessor: 'date',
        sortable: true,
        cell: (row) => new Date(row.date).toLocaleDateString('cs-CZ'),
      },
      {
        key: 'location',
        header: 'Místo',
        accessor: 'location',
      },
      {
        key: 'sections',
        header: 'Sekce',
        cell: (row) => (
          <div style={{ display: 'flex', gap: '4px' }}>
            {row.sections.map((s) => (
              <Badge key={s} section={s} size="sm">{s.toUpperCase()}</Badge>
            ))}
          </div>
        ),
      },
      {
        key: 'status',
        header: 'Stav',
        cell: (row) => {
          const statusConfig = {
            upcoming: { variant: 'info' as const, label: 'Připravuje se' },
            live: { variant: 'success' as const, label: 'LIVE' },
            finished: { variant: 'default' as const, label: 'Ukončen' },
          };
          const config = statusConfig[row.status];
          return <Badge variant={config.variant} size="sm">{config.label}</Badge>;
        },
      },
    ];

    return <Table columns={eventColumns} data={events} rowKey="id" />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom cell rendering with badges for sections and status.',
      },
    },
  },
};

export const ControlledSort = {
  render: () => {
    const ControlledSortTable = () => {
      const [sortKey, setSortKey] = useState<string | null>('points');
      const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>('desc');

      return (
        <div>
          <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span>Sort: {sortKey || 'none'} ({sortDirection || 'none'})</span>
            <button
              onClick={() => {
                setSortKey(null);
                setSortDirection(null);
              }}
              style={{
                padding: '4px 8px',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                background: 'var(--color-bg-primary)',
                cursor: 'pointer',
              }}
            >
              Reset
            </button>
          </div>
          <Table
            columns={athleteColumns}
            data={athletes}
            rowKey="id"
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSortChange={(key, dir) => {
              setSortKey(key);
              setSortDirection(dir);
            }}
          />
        </div>
      );
    };

    return <ControlledSortTable />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled sorting with external state management.',
      },
    },
  },
};

// =============================================================================
// New Stories for Enhanced Table (Redesign Phase 7.4)
// =============================================================================

export const RankHighlighting = {
  render: () => (
    <Table
      columns={resultColumns}
      data={results}
      rowKey="id"
      rankKey="rank"
      caption="C1M Finále - Slalom Troja 2026"
      captionVisible
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Results table with automatic podium position highlighting (gold, silver, bronze gradient backgrounds).',
      },
    },
  },
};

export const GradientHeader = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Default - Gradient Header</h3>
        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Modern gradient header with white text and subtle text shadow.
        </p>
        <Table columns={athleteColumns} data={athletes.slice(0, 3)} rowKey="id" />
      </div>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Striped Variant</h3>
        <Table columns={athleteColumns} data={athletes} rowKey="id" variant="striped" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Enhanced table headers with gradient backgrounds for a modern, professional look.',
      },
    },
  },
};

export const HoverEffects = {
  render: () => (
    <div>
      <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
        Hover over rows to see the subtle slide animation and left border accent.
      </p>
      <Table
        columns={athleteColumns}
        data={athletes}
        rowKey="id"
        hoverable
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Rows have smooth hover transitions with subtle translateX and left border accent.',
      },
    },
  },
};

export const FeaturedShowcase = {
  render: () => {
    interface RaceResult {
      id: number;
      rank: number;
      bib: string;
      name: string;
      nationality: string;
      time: string;
      diff: string;
    }

    const raceResults: RaceResult[] = [
      { id: 1, rank: 1, bib: '7', name: 'Jessica Fox', nationality: 'AUS', time: '98.32', diff: '-' },
      { id: 2, rank: 2, bib: '12', name: 'Mallory Franklin', nationality: 'GBR', time: '99.15', diff: '+0.83' },
      { id: 3, rank: 3, bib: '5', name: 'Tereza Fišerová', nationality: 'CZE', time: '99.87', diff: '+1.55' },
      { id: 4, rank: 4, bib: '3', name: 'Ricarda Funk', nationality: 'GER', time: '100.24', diff: '+1.92' },
      { id: 5, rank: 5, bib: '9', name: 'Camille Prigent', nationality: 'FRA', time: '101.56', diff: '+3.24' },
      { id: 6, rank: 6, bib: '15', name: 'Elena Lilik', nationality: 'GER', time: '102.03', diff: '+3.71' },
    ];

    const raceColumns: ColumnDef<RaceResult>[] = [
      {
        key: 'rank',
        header: 'Rank',
        accessor: 'rank',
        width: '70px',
        align: 'center',
        cell: (row) => (
          <span style={{
            fontWeight: row.rank <= 3 ? 'bold' : 'normal',
            fontSize: row.rank <= 3 ? '1.1em' : '1em',
          }}>
            {row.rank <= 3 ? ['🥇', '🥈', '🥉'][row.rank - 1] : row.rank}
          </span>
        ),
      },
      {
        key: 'bib',
        header: 'Bib',
        accessor: 'bib',
        width: '60px',
        align: 'center',
      },
      {
        key: 'name',
        header: 'Athlete',
        accessor: 'name',
        sortable: true,
        cell: (row) => (
          <span style={{ fontWeight: row.rank <= 3 ? '600' : '400' }}>
            {row.name}
          </span>
        ),
      },
      {
        key: 'nationality',
        header: 'NAT',
        accessor: 'nationality',
        width: '70px',
        align: 'center',
        cell: (row) => (
          <Badge variant="default" size="sm">{row.nationality}</Badge>
        ),
      },
      {
        key: 'time',
        header: 'Time',
        accessor: 'time',
        align: 'right',
        sortable: true,
        cell: (row) => (
          <span style={{
            fontFamily: 'var(--font-family-mono)',
            fontWeight: row.rank === 1 ? 'bold' : 'normal',
            color: row.rank === 1 ? 'var(--color-success-600)' : 'inherit',
          }}>
            {row.time}
          </span>
        ),
      },
      {
        key: 'diff',
        header: 'Diff',
        accessor: 'diff',
        align: 'right',
        cell: (row) => (
          <span style={{
            fontFamily: 'var(--font-family-mono)',
            color: row.rank === 1 ? 'var(--color-text-tertiary)' : 'var(--color-error-500)',
            fontSize: '0.9em',
          }}>
            {row.diff}
          </span>
        ),
      },
    ];

    return (
      <div>
        <div style={{
          background: 'var(--gradient-primary)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
          marginBottom: '-8px',
        }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.25rem' }}>
            ICF Canoe Slalom World Cup 2026
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>
            K1 Women Final - Prague
          </div>
        </div>
        <Table
          columns={raceColumns}
          data={raceResults}
          rowKey="id"
          rankKey="rank"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete showcase of enhanced table features: gradient header, rank highlighting, badges, and professional styling.',
      },
    },
  },
};
