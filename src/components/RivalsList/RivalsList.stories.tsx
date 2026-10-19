import type { Meta, StoryObj } from '@storybook/react';
import { RivalsList } from './RivalsList';

const meta = {
  title: 'Components/RivalsList',
  component: RivalsList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Standings cut around the viewer with the point gap per rival (`+40 b.` ahead, `−15 b.` behind). Listing minors is decided by the application.',
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
} satisfies Meta<typeof RivalsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Soupeři z ročníku',
    items: [
      { id: 'a', rank: 3, name: 'Jakub Dvořák', club: 'Dukla', points: 360, href: '#a' },
      { id: 'me', rank: 4, name: 'Já', club: 'Bohemians', points: 320, self: true },
      { id: 'b', rank: 5, name: 'Matyáš Kopecký', club: 'Brandýs', points: 305, href: '#b' },
      { id: 'c', rank: 6, name: 'Ondřej Marek', club: 'Bohemians', points: 275, href: '#c' },
    ],
  },
};

export const LeaderAndTie: Story = {
  args: {
    'aria-label': 'Soupeři z ročníku',
    items: [
      { id: 'me', rank: 1, name: 'Já', club: 'Bohemians', points: 320, self: true },
      { id: 'a', rank: 1, name: 'Jakub Dvořák', club: 'Dukla', points: 320 },
      { id: 'b', rank: 3, name: 'Matyáš Kopecký', club: 'Brandýs', points: 305 },
    ],
  },
};

export const LongName: Story = {
  args: {
    'aria-label': 'Soupeři z ročníku',
    items: [
      { id: 'a', rank: 3, name: 'Alexandr Maximilián Novotný-Dvořáček', club: 'Bohemians', points: 360 },
      { id: 'me', rank: 4, name: 'Já', club: 'Bohemians', points: 320, self: true },
    ],
  },
};
