import type { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataAge } from './DataAge';
import { createTestClock } from '../../clock';

/** Fixed story time: 2026-10-04 14:32:10 Europe/Prague. The test clock never moves here. */
const STORY_NOW = Date.UTC(2026, 9, 4, 12, 32, 10);
const storyClock = createTestClock({ now: STORY_NOW });
const TZ = 'Europe/Prague';

const meta = {
  title: 'Components/DataAge',
  component: DataAge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'How old the shown data is, measured from its receipt on the injected `Clock` (`receivedAt` = `clock.now()` ' +
          'when the data arrived, never the server\'s `observedAt`). `mode="relative"` → „aktualizováno před 1 s“, updated ' +
          'through `clock.setTimeout` exactly when the text changes; `mode="absolute"` → „stav ze 14:32:10“. ' +
          '`connection` adds a dot + text in the same line (never a banner over content): `ok` green, `reconnecting` amber, ' +
          '`offline` grey (never red: red is LIVE only). Colour and size of the text are inherited, ' +
          'so it works on the surface and on the brand band. Stories use `createTestClock()` at a fixed time.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    clock: { control: false },
    receivedAt: { control: 'number', description: '`clock.now()` at receipt (story clock is at 2026-10-04 14:32:10)' },
    mode: { control: 'inline-radio', options: ['relative', 'absolute'] },
    connection: { control: 'inline-radio', options: [undefined, 'ok', 'reconnecting', 'offline'] },
    label: { control: 'text' },
    emptyLabel: { control: 'text' },
    timeZone: { control: 'text' },
  },
  args: {
    receivedAt: STORY_NOW - 1_000,
    clock: storyClock,
    mode: 'relative',
    timeZone: TZ,
  },
} satisfies Meta<typeof DataAge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'max-content minmax(0, max-content)',
  alignItems: 'center',
  columnGap: 'var(--csk-space-6)',
  rowGap: 'var(--csk-space-3)',
  fontFamily: 'var(--csk-font-sans)',
  fontSize: 'var(--csk-text-sm)',
  color: 'var(--csk-color-text-2)',
};

const caption: CSSProperties = { color: 'var(--csk-color-text-3)', fontSize: 'var(--csk-text-xs)' };

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <span style={caption}>{label}</span>
      <span style={{ minWidth: 0 }}>{children}</span>
    </>
  );
}

const band: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--csk-space-2)',
  width: '358px',
  maxWidth: '100%',
  padding: 'var(--csk-space-2) var(--csk-space-3)',
  borderRadius: 'var(--csk-radius-md)',
  background: 'var(--csk-color-brand)',
  color: 'var(--csk-color-text-on-fill)',
  fontFamily: 'var(--csk-font-sans)',
  fontSize: 'var(--csk-text-xs)',
};

export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--csk-space-6)' }}>
      <div style={grid}>
        <Row label="relative · 0,4 s">
          <DataAge receivedAt={STORY_NOW - 400} clock={storyClock} />
        </Row>
        <Row label="relative · 1 s">
          <DataAge receivedAt={STORY_NOW - 1_000} clock={storyClock} />
        </Row>
        <Row label="relative · 12 s">
          <DataAge receivedAt={STORY_NOW - 12_000} clock={storyClock} />
        </Row>
        <Row label="relative · 2 min">
          <DataAge receivedAt={STORY_NOW - 125_000} clock={storyClock} />
        </Row>
        <Row label="relative · 1 h">
          <DataAge receivedAt={STORY_NOW - 3_700_000} clock={storyClock} />
        </Row>
        <Row label="absolute">
          <DataAge receivedAt={STORY_NOW} clock={storyClock} mode="absolute" timeZone={TZ} />
        </Row>
        <Row label="bez dat">
          <DataAge receivedAt={null} clock={storyClock} />
        </Row>
        <Row label="connection ok">
          <DataAge receivedAt={STORY_NOW - 1_000} clock={storyClock} connection="ok" />
        </Row>
        <Row label="connection reconnecting">
          <DataAge receivedAt={STORY_NOW - 12_000} clock={storyClock} connection="reconnecting" />
        </Row>
        <Row label="connection offline">
          <DataAge receivedAt={STORY_NOW - 95_000} clock={storyClock} connection="offline" mode="absolute" timeZone={TZ} />
        </Row>
      </div>

      <div style={band}>
        <span>‹ Závody</span>
        <DataAge
          receivedAt={STORY_NOW - 1_000}
          clock={storyClock}
          connection="ok"
          style={{ marginLeft: 'auto' }}
        />
      </div>
      <div style={band}>
        <span>‹ Závody</span>
        <DataAge
          receivedAt={STORY_NOW - 12_000}
          clock={storyClock}
          connection="reconnecting"
          style={{ marginLeft: 'auto' }}
        />
      </div>
      <div style={band}>
        <span>‹ Závody</span>
        <DataAge
          receivedAt={STORY_NOW - 34_000}
          clock={storyClock}
          connection="offline"
          style={{ marginLeft: 'auto' }}
        />
      </div>
    </div>
  ),
};
