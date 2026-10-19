import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ClockProvider, createBrowserClock, createTestClock } from '../../clock';
import { OnCoursePanel } from './OnCoursePanel';
import { OnCourseRider } from './OnCourseRider';
import { STALE_SINCE, STORY_NOW, gatesUntil, liveRiders, sixRiders } from './OnCoursePanel.fixtures';
import './OnCoursePanel.stories.css';

/** Static stories: frames are never flushed, so running times never tick in screenshots. */
const storyClock = createTestClock({ now: STORY_NOW });

const meta = {
  title: 'Components/OnCoursePanel',
  component: OnCoursePanel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "Athletes on course, above the results. Mobile: a list; from 640 px of the panel's own width: three columns " +
          '(container query). Every rider has one of three states (`at-start`, `running`, `finished-pending`); the panel ' +
          'never hides a rider, more riders make it taller. With no riders it renders nothing. When the data stops, ' +
          '`stale` freezes all values, adds `StatusBadge stale` and „stav ze“ and keeps every rider (no banner). ' +
          'Running times tick only through the `Clock`; the entry fade of a row respects `prefers-reduced-motion`.\n\n' +
          'All stories except **Real Clock** use `createTestClock()` with a fixed time.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ClockProvider clock={storyClock}>
        <div className="oc-story">
          <div className="oc-story__inner">
            <Story />
          </div>
        </div>
      </ClockProvider>
    ),
  ],
  argTypes: {
    riders: { control: false },
    clock: { control: false },
    stale: { control: 'boolean' },
    collapsed: { control: 'boolean' },
  },
  args: {
    riders: liveRiders(),
    phaseLabel: 'K1 muži · 2. jízda',
    timeZone: 'Europe/Prague',
  },
} satisfies Meta<typeof OnCoursePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Reference Live1: HNILICA runs (featured, split + gap to the leader), REZEK finished and waiting, FABIAN at the start. */
export const ThreeRiders: Story = {};

/** Six riders at once: nothing is hidden, the panel grows (two rows of three on desktop). */
export const SixRiders: Story = { args: { riders: sixRiders() } };

/** Reference Live5: the heartbeat is lost. Same riders, frozen and dotted, „stav ze 14:32:10“, no banner. */
export const Stale: Story = {
  args: {
    stale: true,
    receivedAt: STALE_SINCE,
    riders: liveRiders().map((r) =>
      r.status === 'running'
        ? {
            ...r,
            featured: false,
            toLeader: undefined,
            split: undefined,
            secondary: undefined,
            time: { elapsedSeconds: 46.5, receivedAt: STALE_SINCE },
          }
        : r
    ),
  },
};

/** Six riders, stale: still all there. */
export const StaleSixRiders: Story = {
  args: {
    stale: true,
    receivedAt: STALE_SINCE,
    riders: sixRiders().map((r) =>
      r.status === 'running' ? { ...r, time: r.time && { ...r.time, receivedAt: STALE_SINCE } } : r
    ),
  },
};

/** Time to beat, both modes: a target to undercut and the signed gap to the holder. */
export const TimeToBeat: Story = {
  args: {
    riders: [
      { ...liveRiders()[0], timeToBeat: { mode: 'target', value: 89.81, holder: 'HNILICA' } },
      {
        bib: 44,
        name: 'KULTAN Andrej',
        categoryTag: 'U16',
        secondary: 'Kanoe Tatra klub Lipt. Mikuláš',
        status: 'running',
        time: { elapsedSeconds: 61.2, receivedAt: STORY_NOW - 300 },
        gates: gatesUntil(14, 22, { 9: 2 }),
        timeToBeat: { mode: 'delta', value: 1.35, holder: 'HNILICA' },
      },
      {
        bib: 35,
        name: 'REZEK Adam',
        categoryTag: 'U16',
        status: 'finished-pending',
        finish: { time: 90.38, penalty: 2 },
        timeToBeat: { mode: 'delta', value: 0.57, holder: 'HNILICA' },
      },
    ],
  },
};

/** The leader of the phase in the header. */
export const WithLeader: Story = {
  args: { leader: { name: 'HNILICA Lukas', time: 89.81 } },
};

function CollapsibleDemo() {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <OnCoursePanel
      riders={liveRiders()}
      phaseLabel="K1 muži · 2. jízda"
      collapsed={collapsed}
      onCollapsedChange={setCollapsed}
    />
  );
}

/** Collapsible: only the header remains; the toggle is a button with `aria-expanded`. */
export const Collapsed: Story = { render: () => <CollapsibleDemo /> };

/** In a 390 px container the list stays a list even on a wide screen (container query, not viewport). */
export const InNarrowContainer: Story = {
  decorators: [
    (Story) => (
      <div className="oc-story__narrow">
        <Story />
      </div>
    ),
  ],
};

/** No riders: nothing is rendered (the panel never shows an empty frame). */
export const Empty: Story = {
  args: { riders: [] },
  render: (args) => (
    <>
      <OnCoursePanel {...args} />
      <p className="oc-story__note">Žádný jezdec na trati: panel se nerenderuje.</p>
    </>
  ),
};

/** Riders on their own, all three states (the component composes outside the panel too). */
export const RiderStates: Story = {
  render: () => (
    <div className="oc-story__narrow" style={{ background: 'var(--csk-color-surface)' }}>
      {liveRiders().map((r) => (
        <OnCourseRider key={r.bib} {...r} />
      ))}
    </div>
  ),
};

function RealClockDemo() {
  const [real] = useState(() => createBrowserClock());
  const [receivedAt] = useState(() => real.now());
  return (
    <OnCoursePanel
      clock={real}
      riders={[
        {
          bib: 41,
          name: 'HNILICA Lukas',
          categoryTag: 'U16',
          status: 'running',
          time: { elapsedSeconds: 12, receivedAt },
          gates: gatesUntil(4, 22),
          featured: true,
        },
      ]}
      phaseLabel="K1 muži · 2. jízda"
    />
  );
}

export const RealClock: Story = {
  tags: ['no-snapshot'],
  parameters: {
    docs: {
      description: {
        story:
          'Browser clock: the running time ticks for 3 s after receipt, then freezes as stale. ' +
          'Not deterministic, so never snapshotted.',
      },
    },
  },
  render: () => <RealClockDemo />,
};
