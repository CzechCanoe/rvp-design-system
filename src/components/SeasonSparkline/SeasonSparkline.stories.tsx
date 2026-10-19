import type { Meta, StoryObj } from '@storybook/react';
import { SeasonSparkline } from './SeasonSparkline';
import { seasonPoints } from './SeasonSparkline.fixtures';

const meta = {
  title: 'Components/SeasonSparkline',
  component: SeasonSparkline,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Placement curve over a season (inline SVG, higher = better). The best point is a filled dot with its label, a provisional point is a hollow amber ring. Values are in the SVG `<title>`/`<desc>`; static, no motion.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 366 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SeasonSparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    points: seasonPoints,
    title: 'Sezóna 2026',
    meta: 'umístění v K1 muži',
    note: 'Poslední bod je předběžný (nedělní jízdy ještě neschválené).',
  },
};

export const AllOfficial: Story = {
  args: { points: seasonPoints.map((p) => ({ ...p, provisional: false })), title: 'Sezóna 2026' },
};

export const TwoRaces: Story = {
  args: {
    points: [
      { label: 'ČP #1', place: 5 },
      { label: 'ČP #2', place: 2 },
    ],
    title: 'Začátek sezóny',
  },
};

export const SingleRace: Story = {
  args: { points: [{ label: 'ČP #1', place: 5 }], title: 'První závod' },
};
