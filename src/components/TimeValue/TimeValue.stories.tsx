import type { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimeValue } from './TimeValue';
import type { Observed } from '../../types';

const meta = {
  title: 'Components/TimeValue',
  component: TimeValue,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A time or time difference in seconds, set in IBM Plex Mono with tabular digits; never wraps. ' +
          'Accepts a plain number or an `Observed<number>`: `known` renders the number (a known `0` is `0.00`), ' +
          '`not-yet`, `unavailable` and `null` all render as "not known" (—, read as „neznámo“). ' +
          '`align="decimal"` lines stacked values up on the decimal point; `sign` renders differences as `+1.53` / `−0.87`.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number', description: 'Seconds, `null`, or an `Observed<number>`' },
    precision: { control: 'inline-radio', options: [1, 2] },
    variant: { control: 'select', options: ['default', 'best', 'running', 'stale', 'muted'] },
    align: { control: 'inline-radio', options: [undefined, 'decimal'] },
    sign: { control: 'boolean' },
    unknownLabel: { control: 'text' },
  },
  args: {
    value: 89.81,
    precision: 2,
    variant: 'default',
    sign: false,
  },
} satisfies Meta<typeof TimeValue>;

export default meta;
type Story = StoryObj<typeof meta>;

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'max-content max-content',
  alignItems: 'baseline',
  columnGap: 'var(--csk-space-6)',
  rowGap: 'var(--csk-space-3)',
  fontSize: 'var(--csk-text-md)',
  color: 'var(--csk-color-text)',
};

const caption: CSSProperties = {
  fontFamily: 'var(--csk-font-sans)',
  fontSize: 'var(--csk-text-sm)',
  color: 'var(--csk-color-text-3)',
};

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <span style={caption}>{label}</span>
      <span>{children}</span>
    </>
  );
}

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={grid}>
      <Row label="default">
        <TimeValue value={89.83} />
      </Row>
      <Row label="best">
        <TimeValue value={89.81} variant="best" />
      </Row>
      <Row label="running">
        <TimeValue value={46.5} precision={1} variant="running" />
      </Row>
      <Row label="stale">
        <TimeValue value={90.38} variant="stale" />
      </Row>
      <Row label="muted">
        <TimeValue value={0} precision={1} variant="muted" />
      </Row>
      <Row label="running, 22 px">
        <span style={{ fontSize: '22px', fontWeight: 'var(--csk-font-weight-semibold)' }}>
          <TimeValue value={46.5} precision={1} variant="running" />
        </span>
      </Row>
    </div>
  ),
};

const observed: Array<[string, number | null | Observed<number>]> = [
  ['known 82.36', { state: 'known', value: 82.36 }],
  ['known 0 (real zero)', { state: 'known', value: 0 }],
  ['not-yet', { state: 'not-yet' }],
  ['unavailable · not-configured', { state: 'unavailable', reason: 'not-configured' }],
  ['unavailable · source-unreachable', { state: 'unavailable', reason: 'source-unreachable' }],
  ['unavailable · not-applicable', { state: 'unavailable', reason: 'not-applicable' }],
  ['null', null],
];

export const ObservedStates: Story = {
  render: () => (
    <div style={grid}>
      {observed.map(([label, value]) => (
        <Row key={label} label={label}>
          <TimeValue value={value} />
        </Row>
      ))}
    </div>
  ),
};

const stack: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  fontSize: 'var(--csk-text-sm)',
  lineHeight: 'var(--csk-line-height-snug)',
  color: 'var(--csk-color-text-2)',
};

export const Formats: Story = {
  render: () => (
    <div style={grid}>
      <Row label="sign (differences)">
        <span style={{ display: 'inline-flex', gap: 'var(--csk-space-4)' }}>
          <TimeValue value={1.53} sign />
          <TimeValue value={-0.87} sign />
          <TimeValue value={0} sign />
          <TimeValue value={12.4} sign precision={1} />
        </span>
      </Row>
      <Row label="precision 1 / 2">
        <span style={{ display: 'inline-flex', gap: 'var(--csk-space-4)' }}>
          <TimeValue value={102.45} precision={1} />
          <TimeValue value={102.45} precision={2} />
        </span>
      </Row>
      <Row label='align="decimal"'>
        <span style={stack}>
          <TimeValue value={9.5} align="decimal" />
          <TimeValue value={89.83} align="decimal" />
          <TimeValue value={102.45} align="decimal" variant="best" />
          <TimeValue value={{ state: 'not-yet' }} align="decimal" />
        </span>
      </Row>
      <Row label='align="decimal" + sign'>
        <span style={stack}>
          <TimeValue value={0} sign align="decimal" />
          <TimeValue value={1.53} sign align="decimal" />
          <TimeValue value={-0.87} sign align="decimal" />
          <TimeValue value={12.06} sign align="decimal" />
        </span>
      </Row>
    </div>
  ),
};
