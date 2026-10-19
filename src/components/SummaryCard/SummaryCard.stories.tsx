import type { Meta, StoryObj } from '@storybook/react';
import { SummaryCard } from './SummaryCard';

const meta: Meta<typeof SummaryCard> = {
  title: 'Components/SummaryCard',
  component: SummaryCard,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SummaryCard>;

export const Default: Story = {
  args: {
    rows: [
      { label: 'Lodí', value: 6 },
      { label: 'Závodníků', value: 7 },
      { label: 'Z toho nezletilých', value: 3 },
    ],
    total: { label: 'Startovné', value: '2 000 Kč' },
    note: 'Pořadatel: převodem, VS 2026052302. QR kód se objeví po odeslání.',
  },
};
