import { useEffect, useReducer, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RunningTime } from './RunningTime';
import { TimeValue } from '../TimeValue';
import { DataAge, type DataAgeConnection } from '../DataAge';
import { Button } from '../Button';
import { createBrowserClock, createTestClock } from '../../clock';
import { RUNNING_STALE_AFTER_SECONDS } from './runningDisplay';

/** Fixed story time: 2026-10-04 14:32:10 Europe/Prague. Stories never read real time unless marked. */
const STORY_NOW = Date.UTC(2026, 9, 4, 12, 32, 10);

/** Static stories: frames are never flushed, so nothing ticks in screenshots. */
const storyClock = createTestClock({ now: STORY_NOW });

const meta = {
  title: 'Components/RunningTime',
  component: RunningTime,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Running time of an athlete on course. Ticks locally between deliveries only through the injected `Clock` ' +
          '(`clock.requestFrame`), snaps to every new value (`elapsedSeconds` + `receivedAt`), and ' +
          `${RUNNING_STALE_AFTER_SECONDS} s after receipt (measured with \`clock.now()\`) freezes and shows the value as stale ` +
          'with its age (`DataAge`). `receivedAt` is `clock.now()` at the moment the application received the value, ' +
          'never the server\'s `observedAt`. The clock comes from the `clock` prop, else the nearest `ClockProvider`, ' +
          'else a shared browser clock. When the athlete leaves the course, render `TimeValue` instead.\n\n' +
          'All stories except **Real Clock** use `createTestClock()` with a fixed time, so screenshots never tick.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    clock: { control: false },
    elapsedSeconds: { control: 'number' },
    receivedAt: { control: 'number', description: '`clock.now()` at receipt (story clock is at 2026-10-04 14:32:10)' },
    staleAfterSeconds: { control: 'number' },
    precision: { control: 'inline-radio', options: [1, 2] },
    align: { control: 'inline-radio', options: [undefined, 'decimal'] },
    showAge: { control: 'boolean' },
  },
  args: {
    elapsedSeconds: 46.1,
    receivedAt: STORY_NOW - 400,
    clock: storyClock,
  },
} satisfies Meta<typeof RunningTime>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------------------
   Static stories (snapshotted)
   --------------------------------------------------------------------------- */

export const Running: Story = {};

export const Stale: Story = {
  args: { elapsedSeconds: 86.0, receivedAt: STORY_NOW - 7_000 },
};

const panel: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '358px',
  maxWidth: '100%',
  background: 'var(--csk-color-surface)',
  border: '1px solid var(--csk-color-highlight-border)',
  borderRadius: 'var(--csk-radius-lg)',
  overflow: 'hidden',
  fontFamily: 'var(--csk-font-sans)',
  fontSize: 'var(--csk-text-md)',
  color: 'var(--csk-color-text)',
};

const row: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--csk-space-2)',
  padding: 'var(--csk-space-2) var(--csk-space-3)',
  borderBottom: '1px solid var(--csk-color-border-2)',
};

const bib: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '26px',
  height: '20px',
  padding: '0 var(--csk-space-1)',
  border: '1px solid var(--csk-color-border)',
  borderRadius: 'var(--csk-radius-sm)',
  fontFamily: 'var(--csk-font-mono)',
  fontSize: 'var(--csk-text-xs)',
  fontWeight: 'var(--csk-font-weight-semibold)',
  color: 'var(--csk-color-text-2)',
};

const metaText: CSSProperties = { fontSize: 'var(--csk-text-xs)', color: 'var(--csk-color-text-3)' };

function Rider({ no, name, status, children }: { no: number; name: string; status: string; children: ReactNode }) {
  return (
    <div style={row}>
      <span style={bib}>{no}</span>
      <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, lineHeight: 'var(--csk-line-height-snug)' }}>
        <b style={{ fontWeight: 'var(--csk-font-weight-medium)', whiteSpace: 'nowrap' }}>{name}</b>
        <span style={metaText}>{status}</span>
      </span>
      <span style={{ fontSize: 'var(--csk-text-base)', fontWeight: 'var(--csk-font-weight-semibold)' }}>{children}</span>
    </div>
  );
}

/** Lifecycle of an on-course row: at start (app renders TimeValue), running, stale, finished (app renders TimeValue). */
export const States: Story = {
  render: () => (
    <div style={panel}>
      <Rider no={38} name="FABIAN František" status="na startu · TimeValue muted">
        <TimeValue value={0} precision={1} variant="muted" />
      </Rider>
      <Rider no={41} name="HNILICA Lukas" status="na trati · 0,4 s od příjmu">
        <span style={{ fontSize: '22px' }}>
          <RunningTime elapsedSeconds={46.1} receivedAt={STORY_NOW - 400} clock={storyClock} />
        </span>
      </Rider>
      <Rider no={44} name="KREJČÍ Ondřej" status="na trati · právě přijato">
        <RunningTime elapsedSeconds={12.38} receivedAt={STORY_NOW} clock={storyClock} />
      </Rider>
      <Rider no={47} name="NOVÁK Jan" status="na trati · feed 7 s mlčí">
        <RunningTime elapsedSeconds={71.2} receivedAt={STORY_NOW - 7_000} clock={storyClock} />
      </Rider>
      <Rider no={35} name="REZEK Adam" status="v cíli · TimeValue stale">
        <TimeValue value={90.38} variant="stale" />
      </Rider>
      <Rider no={52} name="SVOBODA Petr" status="neznámo · TimeValue unavailable">
        <TimeValue value={{ state: 'unavailable', reason: 'source-unreachable' }} precision={1} />
      </Rider>
    </div>
  ),
};

/* ---------------------------------------------------------------------------
   Interactive: state switching (acceptance story). Starts frozen at the fixed
   story time; it only moves when a button is pressed or "Přehrát" is on.
   --------------------------------------------------------------------------- */

type Phase = 'at-start' | 'on-course' | 'unknown';

const STATIC_START_ELAPSED = 46.1;

function StateSwitchingDemo() {
  const [clock] = useState(() => createTestClock({ now: STORY_NOW }));
  const [, rerender] = useReducer((n: number) => n + 1, 0);
  const [phase, setPhase] = useState<Phase>('on-course');
  const [delivered, setDelivered] = useState({ elapsedSeconds: STATIC_START_ELAPSED, receivedAt: STORY_NOW });
  const [connection, setConnection] = useState<DataAgeConnection>('ok');
  const [feed, setFeed] = useState(true);
  const [playing, setPlaying] = useState(false);
  const feedRef = useRef(feed);
  feedRef.current = feed;

  /** What upstream would say right now: the athlete keeps moving whatever the feed does. */
  const upstreamElapsed = () =>
    Math.round((STATIC_START_ELAPSED + (clock.now() - STORY_NOW) / 1000) * 100) / 100;

  const deliver = () => {
    setDelivered({ elapsedSeconds: upstreamElapsed(), receivedAt: clock.now() });
  };

  const step = (ms: number) => {
    clock.advance(ms);
    clock.flushFrames();
    rerender();
  };

  // "Přehrát": drive the test clock from real frames; the feed delivers once per clock second.
  useEffect(() => {
    if (!playing) return undefined;
    const real = createBrowserClock();
    let last: number | undefined;
    let lastDelivery = clock.now();
    let handle = real.requestFrame(function frame(t) {
      if (last !== undefined) clock.advance(Math.min(t - last, 250));
      last = t;
      if (feedRef.current && clock.now() - lastDelivery >= 1000) {
        lastDelivery = clock.now();
        setDelivered({ elapsedSeconds: upstreamElapsed(), receivedAt: clock.now() });
      }
      clock.flushFrames();
      rerender();
      handle = real.requestFrame(frame);
    });
    return () => real.cancelFrame(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, clock]);

  const sinceReceipt = ((clock.now() - delivered.receivedAt) / 1000).toFixed(1);
  const sinceStart = ((clock.now() - STORY_NOW) / 1000).toFixed(1);

  const toggle = <T,>(value: T, current: T, set: (v: T) => void, label: string) => (
    <Button size="sm" variant={value === current ? 'primary' : 'secondary'} aria-pressed={value === current} onClick={() => set(value)}>
      {label}
    </Button>
  );

  const controls: CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 'var(--csk-space-2)', alignItems: 'center' };
  const label: CSSProperties = { ...metaText, minWidth: '72px' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--csk-space-4)', maxWidth: '520px' }}>
      <div style={panel}>
        <div style={{ ...row, justifyContent: 'space-between', color: 'var(--csk-color-text-2)', fontSize: 'var(--csk-text-xs)' }}>
          <span style={{ fontWeight: 'var(--csk-font-weight-semibold)', textTransform: 'uppercase', letterSpacing: 'var(--csk-letter-spacing-caps)' }}>
            Na trati
          </span>
          <DataAge receivedAt={delivered.receivedAt} clock={clock} connection={connection} />
        </div>
        <Rider
          no={41}
          name="HNILICA Lukas"
          status={phase === 'at-start' ? 'na startu' : phase === 'unknown' ? 'čas neznámo' : 'na trati'}
        >
          <span style={{ fontSize: '22px' }}>
            {phase === 'on-course' && (
              <RunningTime elapsedSeconds={delivered.elapsedSeconds} receivedAt={delivered.receivedAt} clock={clock} />
            )}
            {phase === 'at-start' && <TimeValue value={0} precision={1} variant="muted" />}
            {phase === 'unknown' && <TimeValue value={{ state: 'not-yet' }} precision={1} />}
          </span>
        </Rider>
      </div>

      <div style={controls}>
        <span style={label}>Stav</span>
        {toggle<Phase>('at-start', phase, setPhase, 'Na startu')}
        {toggle<Phase>('on-course', phase, setPhase, 'Na trati')}
        {toggle<Phase>('unknown', phase, setPhase, 'Neznámo')}
      </div>
      <div style={controls}>
        <span style={label}>Čas</span>
        <Button size="sm" variant="secondary" onClick={() => step(500)}>+0,5 s</Button>
        <Button size="sm" variant="secondary" onClick={() => step(1_000)}>+1 s</Button>
        <Button size="sm" variant="secondary" onClick={() => step(RUNNING_STALE_AFTER_SECONDS * 1000)}>
          +{RUNNING_STALE_AFTER_SECONDS} s bez dat
        </Button>
        <Button size="sm" variant="secondary" onClick={deliver}>Nová hodnota</Button>
      </div>
      <div style={controls}>
        <span style={label}>Přehrávání</span>
        <Button size="sm" variant={playing ? 'primary' : 'secondary'} aria-pressed={playing} onClick={() => setPlaying((p) => !p)}>
          {playing ? 'Zastavit' : 'Přehrát'}
        </Button>
        <Button size="sm" variant={feed ? 'secondary' : 'primary'} aria-pressed={!feed} onClick={() => setFeed((f) => !f)}>
          {feed ? 'Feed: posílá 1× za s' : 'Feed: výpadek'}
        </Button>
      </div>
      <div style={controls}>
        <span style={label}>Spojení</span>
        {toggle<DataAgeConnection>('ok', connection, setConnection, 'ok')}
        {toggle<DataAgeConnection>('reconnecting', connection, setConnection, 'reconnecting')}
        {toggle<DataAgeConnection>('offline', connection, setConnection, 'offline')}
      </div>
      <p style={{ ...metaText, margin: 0, fontFamily: 'var(--csk-font-mono)' }}>
        hodiny +{sinceStart} s · poslední hodnota {delivered.elapsedSeconds.toFixed(2)} přijata před {sinceReceipt} s
      </p>
    </div>
  );
}

export const StateSwitching: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Switch the rider state, move the test clock, deliver a new value, or play in real time with a working or quiet feed. ' +
          `Without a new value the time freezes ${RUNNING_STALE_AFTER_SECONDS} s after receipt and shows its age; "Nová hodnota" unfreezes it.`,
      },
    },
  },
  render: () => <StateSwitchingDemo />,
};

/* ---------------------------------------------------------------------------
   Real clock: ticks in real time. Excluded from snapshots (not listed in
   tests/config.ts) - never add it there.
   --------------------------------------------------------------------------- */

function RealClockDemo() {
  const [real] = useState(() => createBrowserClock());
  const [delivered, setDelivered] = useState(() => ({ elapsedSeconds: 0, receivedAt: real.now() }));
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--csk-space-4)' }}>
      <span style={{ fontSize: '22px', fontWeight: 'var(--csk-font-weight-semibold)' }}>
        <RunningTime elapsedSeconds={delivered.elapsedSeconds} receivedAt={delivered.receivedAt} />
      </span>
      <Button
        size="sm"
        variant="secondary"
        onClick={() =>
          setDelivered((d) => {
            const now = real.now();
            return { elapsedSeconds: d.elapsedSeconds + Math.min(now - d.receivedAt, 3000) / 1000, receivedAt: now };
          })
        }
      >
        Nová hodnota
      </Button>
    </div>
  );
}

export const RealClock: Story = {
  tags: ['no-snapshot'],
  parameters: {
    docs: {
      description: {
        story:
          'No `clock` prop and no `ClockProvider`: the shared browser clock is used and the time really ticks. ' +
          'Not deterministic, so never snapshotted.',
      },
    },
  },
  render: () => <RealClockDemo />,
};
