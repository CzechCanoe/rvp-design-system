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
