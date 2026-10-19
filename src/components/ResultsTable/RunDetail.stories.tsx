import type { Meta, StoryObj } from '@storybook/react';
import { ClockProvider, createTestClock } from '../../clock';
import { RunDetail } from './RunDetail';
import { NOT_YET, STORY_NOW, gates, known, rezekDetail, rezekRuns } from './ResultsTable.fixtures';
import './ResultsTable.stories.css';

/** Static stories: frames are never flushed, so running times never tick in screenshots. */
const storyClock = createTestClock({ now: STORY_NOW });

const links = (
  <span className="rt-story__links">
    <a href="#profil">Profil závodníka</a>
    <a href="#sledovat">Sledovat ★</a>
  </span>
);

const meta = {
  title: 'Components/RunDetail',
  component: RunDetail,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Content of an expanded `ResultsTable` row: bib, ranks (class + category), state and one block per run ' +
          '(time, penalty, total, gates, start time, note). Runs stack on mobile and sit side by side from 640 px ' +
          'of its own width (container query) or with `density="desktop"`. Spans the full width, no left indentation. ' +
          '`loading` shows a skeleton while the application loads the detail lazily.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ClockProvider clock={storyClock}>
        <div className="rt-story">
          <div className="rt-story__card">
            <Story />
          </div>
        </div>
      </ClockProvider>
    ),
  ],
  argTypes: {
    density: { control: 'inline-radio', options: [undefined, 'mobile', 'desktop'] },
    state: {
      control: 'select',
      options: [undefined, 'official', 'provisional', 'review', 'unknown', 'live', 'stale'],
    },
    runs: { control: false },
    clock: { control: false },
  },
  args: { ...rezekDetail, actions: links },
} satisfies Meta<typeof RunDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Best-run race, REZEK Adam after the 2nd run (reference Live2 / Zavod): the 2nd run counts, gates 19 and 20 not judged yet. */
export const Default: Story = {};

/** One run: a single block. */
export const SingleRun: Story = {
  args: {
    bib: 14,
    ranks: [
      { rank: known(3), label: 'celkově' },
      { rank: known(1), label: 'v U18' },
    ],
    state: 'official',
    runs: [{ ...rezekRuns[0], label: 'Finále', counts: true, meta: undefined }],
  },
};

/** 2nd run in progress: the time ticks (here frozen by the test clock), gates not judged yet are dotted. */
export const OnCourse: Story = {
  args: {
    bib: 27,
    ranks: [{ rank: known(7), label: 've třídě' }],
    state: 'live',
    runs: [
      { ...rezekRuns[0], time: known(92.6), penalty: known(0), total: known(92.6), gates: gates(22), counts: true },
      {
        label: '2. jízda',
        time: NOT_YET,
        penalty: null,
        total: NOT_YET,
        gates: gates(22, Object.fromEntries(Array.from({ length: 10 }, (_, i) => [i + 13, null]))),
        counts: false,
        startedAt: '15:24',
        running: { elapsedSeconds: 46.1, receivedAt: STORY_NOW - 400 },
      },
    ],
  },
};

/** Detail loaded lazily: skeleton in place of the runs. */
export const Loading: Story = {
  args: { runs: [], loading: true, state: undefined, ranks: undefined },
};
