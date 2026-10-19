import type { Meta, StoryObj } from '@storybook/react';
import { Notice } from './Notice';

const meta = {
  title: 'Components/Notice',
  component: Notice,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Static note (info, ok, warn, error). Never blocks: do not disable nearby buttons because of it.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: { tone: { control: 'select', options: ['info', 'ok', 'warn', 'error'] } },
  args: { tone: 'info', children: 'Pozdní přihláška: do pátku 18:00 bez penalizace (DNS-A).', style: { maxWidth: 520 } },
} satisfies Meta<typeof Notice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Info: Story = {};
export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 520 }}>
      <Notice tone="info">Pozdní přihláška: do pátku 18:00 bez penalizace (DNS-A).</Notice>
      <Notice tone="ok">Přihláška byla odeslána.</Notice>
      <Notice tone="warn" title="Prohlídka propadla 3. 4. 2026.">
        Za splnění podmínek ručí oddíl.
      </Notice>
      <Notice tone="error">Platbu se nepodařilo spárovat.</Notice>
    </div>
  ),
};
export const Ok: Story = { args: { tone: 'ok', children: 'Přihláška byla odeslána.' } };
export const Warn: Story = {
  args: {
    tone: 'warn',
    title: 'Prohlídka propadla 3. 4. 2026.',
    children: 'Za splnění podmínek ručí oddíl. Přihlášku můžete odeslat, pořadatel varování uvidí.',
  },
};
export const ErrorTone: Story = {
  name: 'Error',
  args: {
    tone: 'error',
    children: (
      <>
        Platbu se nepodařilo spárovat, zkontrolujte variabilní symbol{' '}
        <span style={{ fontFamily: 'var(--csk-font-mono)' }}>2026051703</span>.
      </>
    ),
  },
};
