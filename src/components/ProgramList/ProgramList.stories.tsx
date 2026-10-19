import type { Meta, StoryObj } from '@storybook/react';
import { Notice } from '../Notice';
import { ProgramList, type ProgramDay } from './ProgramList';
import './ProgramList.stories.css';

/** Sunday 4. 10. of Olympic Hopes 2026, reference Live6: two phases (C1 ženy and K1 muži, 2nd run) running at once. */
const sunday = (running: { c1: boolean; k1: boolean }): ProgramDay => ({
  label: 'Neděle 4. 10.',
  note: 'časy podle rozpisu, skutečné se liší',
  items: [
    { id: 'fore1', time: '09:25', title: 'Forerunners', subtitle: '1. jízda', state: 'official', muted: true },
    { id: 'c1w1', time: '09:30', title: 'C1 ženy', subtitle: '1. jízda', state: 'official' },
    { id: 'c1m1', time: '09:56', title: 'C1 muži', subtitle: '1. jízda', state: 'official' },
    { id: 'k1w1', time: '10:39', title: 'K1 ženy', subtitle: '1. jízda', state: 'provisional' },
    { id: 'k1m1', time: '11:21', title: 'K1 muži', subtitle: '1. jízda', state: 'provisional' },
    { id: 'fore2', time: '13:25', title: 'Forerunners', subtitle: '2. jízda', state: 'official' },
    {
      id: 'c1w2',
      time: '13:30',
      title: 'C1 ženy',
      subtitle: '2. jízda',
      progress: { done: 9, total: 14 },
      running: running.c1,
      state: running.c1 ? undefined : 'unknown',
      stateLabel: 'čeká',
      href: '#c1w2',
    },
    { id: 'c1m2', time: '13:56', title: 'C1 muži', subtitle: '2. jízda', state: 'unknown', stateLabel: 'čeká' },
    { id: 'k1w2', time: '14:39', title: 'K1 ženy', subtitle: '2. jízda', state: 'unknown', stateLabel: 'čeká' },
    {
      id: 'k1m2',
      time: '15:21',
      title: 'K1 muži',
      subtitle: '2. jízda',
      progress: { done: 8, total: 24 },
      note: 'předběhli rozpis o 40 min',
      running: running.k1,
      state: running.k1 ? undefined : 'unknown',
      stateLabel: 'čeká',
      href: '#k1m2',
    },
    { id: 'award', time: '16:30', title: 'Vyhlášení výsledků', subtitle: 'u cílového mola', state: 'unknown', stateLabel: 'čeká' },
  ],
});

const meta = {
  title: 'Components/ProgramList',
  component: ProgramList,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Event programme: one block per day, one row per phase (time · title and second line · state). ' +
          'Running rows (`running`) sit on the live ground with a Live badge, red is reserved for them. ' +
          'More phases can run at once: the component does not pick one, the application shows a `Notice` ' +
          'with the choice above the list and decides the default (the phase with the first athlete on course).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: { days: { control: false } },
  args: { days: [sunday({ c1: true, k1: true })] },
} satisfies Meta<typeof ProgramList>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Reference Live6: two phases running at once, the application offers both above the list. */
export const TwoRunningPhases: Story = {
  render: (args) => (
    <div className="pl-story">
      <div className="pl-story__body">
        <Notice tone="warn" title="Právě běží dvě kategorie naráz">
          <span className="pl-story__choice">
            <a href="#k1m2">K1 muži · 2. jízda</a>
            <a href="#c1w2">C1 ženy · 2. jízda</a>
          </span>
        </Notice>
        <ProgramList {...args} />
        <Notice tone="info">
          Když běží víc fází naráz, aplikace nevybírá za diváka. Nahoře nabídne obě, výchozí je ta s prvním jezdcem na
          trati.
        </Notice>
      </div>
    </div>
  ),
};

/** One running phase. */
export const OneRunningPhase: Story = {
  args: { days: [sunday({ c1: false, k1: true })] },
  render: (args) => (
    <div className="pl-story">
      <div className="pl-story__body">
        <ProgramList {...args} />
      </div>
    </div>
  ),
};

/** Two days; nothing is running yet. */
export const TwoDays: Story = {
  args: {
    days: [
      {
        label: 'Sobota 3. 10.',
        items: [
          { id: 'a', time: '09:15', title: 'K1 muži', subtitle: 'kvalifikace', state: 'official' },
          { id: 'b', time: '12:30', title: 'C1 muži', subtitle: 'kvalifikace', state: 'provisional' },
          { id: 'c', time: '15:00', title: 'K1 ženy', subtitle: 'kvalifikace', state: 'unknown', stateLabel: 'čeká', href: '#b' },
        ],
      },
      {
        label: 'Neděle 4. 10.',
        items: [
          { id: 'd', time: '09:30', title: 'K1 muži', subtitle: 'finále', state: 'unknown', stateLabel: 'čeká', href: '#d' },
          { id: 'e', time: '12:00', title: 'Vyhlášení výsledků', subtitle: 'u cílového mola' },
        ],
      },
    ],
  },
  render: (args) => (
    <div className="pl-story">
      <div className="pl-story__body">
        <ProgramList {...args} />
      </div>
    </div>
  ),
};
