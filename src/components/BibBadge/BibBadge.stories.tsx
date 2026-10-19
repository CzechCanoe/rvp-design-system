import type { Meta, StoryObj } from '@storybook/react';
import { BibBadge } from './BibBadge';

const meta = {
  title: 'Components/BibBadge',
  component: BibBadge,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'Start number in a monospaced 20 px frame.' } },
  },
  tags: ['autodocs'],
  args: { bib: 12 },
} satisfies Meta<typeof BibBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ThreeDigits: Story = { args: { bib: 128 } };
export const Text: Story = { args: { bib: 'T1' } };
