import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Notice } from '../Notice';
import { StartlistTable, type StartlistRow, type StartlistTableProps } from './StartlistTable';
import './StartlistTable.stories.css';

/** K1 muži, 88 boats; the first 11 of reference Live3 (1st run from 11:21, 2nd from 15:21, interval 45 s). */
const people: Array<[string, string, string]> = [
  ['SEMERAD Adam', 'U23', 'Klub kanoistiky Roudnice n. L.'],
  ['SEVČÍK Matej', 'U23', 'Športový klub polície Bratislava'],
  ['FRÖHLICH Jáchym', 'U23', 'Klub kanoistiky Roudnice n. L.'],
  ['SEMERAD Jakub', 'U23', 'Klub kanoistiky Roudnice n. L.'],
  ['FABIAN František', 'U18', 'Vodní sporty Ostrava'],
  ['JONÁK Matej', 'U18', 'Slovenská kanoistika'],
  ['UDOVIČIĆ Mihael', 'U18', 'KKK Zagreb'],
  ['HNILICA Lukas', 'U16', 'Slovenská kanoistika'],
  ['REZEK Adam', 'U16', 'SK Vodní slalom Č. Budějovice'],
  ['HRADECKÝ Daniel', 'U16', 'KK Roudnice n. L.'],
  ['KULTAN Andrej', 'U16', 'Kanoe Tatra klub Lipt. Mikuláš'],
];

const pad = (n: number) => String(n).padStart(2, '0');
/** Start time = base + index × 45 s (the first athlete starts one interval after the base), formatted `h:mm:ss`. */
const at = (baseHour: number, baseMinute: number, index: number) => {
  const total = baseHour * 3600 + baseMinute * 60 + index * 45;
  return `${pad(Math.floor(total / 3600))}:${pad(Math.floor((total % 3600) / 60))}:${pad(total % 60)}`;
};

export const startlistRows: StartlistRow[] = people.map(([name, categoryTag, club], i) => ({
  id: `k1m-${i + 1}`,
  bib: i + 1,
  name,
  categoryTag,
  club,
  favorite: i === 2,
  // The 10th athlete is excused: DNS inline instead of both start times
  starts:
    i === 9
      ? [{ mark: 'DNS-A' }, { mark: 'DNS-A' }]
      : [{ time: at(11, 21, i + 1) }, { time: at(15, 21, i + 1) }],
}));

function Frame({ status, foot, children }: { status?: string; foot?: string; children: React.ReactNode }) {
  return (
    <div className="sl-story">
      <div className="sl-story__card">
        {status && <div className="sl-story__status">{status}</div>}
        {children}
        {foot && <div className="sl-story__foot">{foot}</div>}
      </div>
    </div>
  );
}

/** Table with local favourite state (the application owns it in real use). */
function Interactive({ rows: initial, ...props }: StartlistTableProps) {
  const [rows, setRows] = useState(initial);
  return (
    <StartlistTable
      {...props}
      rows={rows}
      onFavoriteChange={(row, favorite) =>
        setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, favorite } : r)))
      }
    />
  );
}

const meta = {
  title: 'Components/StartlistTable',
  component: StartlistTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Start list. Columns: start number · ★ · name + club · **Start 1. / 2. stacked** (position = run number), ' +
          'so 390 px never overflows. An excused DNS (`mark: "DNS-A"`) shows inline instead of the time.\n\n' +
          'Own row type `StartlistRow` (no rank, no result); the component is a thin wrapper over ' +
          '`ResultsTable columns="startlist"` and maps the rows. Start times arrive formatted by the application.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: { rows: { control: false }, clock: { control: false } },
  args: { rows: startlistRows },
} satisfies Meta<typeof StartlistTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Reference Live3: pre-race start list with a favourite and an excused DNS. */
export const Default: Story = {
  render: (args) => (
    <Frame status="K1 muži · 88 lodí · 1. jízda od 11:21, 2. jízda od 15:21 · interval 45 s" foot="Zobrazeno 11 z 88">
      <Interactive {...args} />
    </Frame>
  ),
};

/** Single start per athlete (e.g. final): the Start column holds one line. */
export const SingleStart: Story = {
  render: (args) => (
    <Frame status="K1 muži · finále">
      <Interactive {...args} rows={startlistRows.slice(0, 5).map((r) => ({ ...r, starts: r.starts.slice(0, 1) }))} />
    </Frame>
  ),
};

/** With a note above the list, as the application would show it before the first result. */
export const WithNotice: Story = {
  render: (args) => (
    <Frame>
      <div className="sl-story__notice">
        <Notice tone="info">
          Výsledky se objeví, jakmile dojede první loď. Hvězdičkou si označ své, pošleme upozornění na start a cíl.
        </Notice>
      </div>
      <Interactive {...args} rows={startlistRows.slice(0, 4)} />
    </Frame>
  ),
};

export const Empty: Story = {
  render: (args) => (
    <Frame status="K1 muži">
      <StartlistTable {...args} rows={[]} />
    </Frame>
  ),
};
