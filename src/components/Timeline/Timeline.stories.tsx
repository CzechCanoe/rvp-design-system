import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, type TimelineItem } from './Timeline';
import { Button } from '../Button';
import { Badge } from '../Badge';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Timeline komponenta pro zobrazení chronologických událostí nebo workflow kroků.

## Varianty
- \`default\` - standardní timeline
- \`compact\` - kompaktní verze pro activity feeds
- \`card\` - s kartovým pozadím
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'compact', 'card'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

// Basic items
const basicItems: TimelineItem[] = [
  { id: 1, title: 'Registrace přijata', timestamp: '15. ledna 2024', status: 'completed', description: 'Vaše registrace byla přijata.' },
  { id: 2, title: 'Platba ověřena', timestamp: '16. ledna 2024', status: 'completed', description: 'Platba členského příspěvku připsána.' },
  { id: 3, title: 'Ověření dokumentů', timestamp: '17. ledna 2024', status: 'current', description: 'Probíhá kontrola dokumentů.' },
  { id: 4, title: 'Schválení registrace', status: 'pending', description: 'Čeká na finální schválení.' },
];

// =============================================================================
// BASIC STORIES
// =============================================================================

export const Default: Story = {
  args: { items: basicItems },
};

export const Compact: Story = {
  args: { items: basicItems, variant: 'compact' },
};

export const Card: Story = {
  args: { items: basicItems, variant: 'card' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px' }}>Small</h4>
        <Timeline items={basicItems.slice(0, 3)} size="sm" />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px' }}>Medium</h4>
        <Timeline items={basicItems.slice(0, 3)} size="md" />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px' }}>Large</h4>
        <Timeline items={basicItems.slice(0, 3)} size="lg" />
      </div>
    </div>
  ),
};

// =============================================================================
// WITH ACTIONS
// =============================================================================

const itemsWithActions: TimelineItem[] = [
  {
    id: 1,
    title: 'Přihláška čeká na platbu',
    timestamp: 'Dnes',
    status: 'current',
    description: 'Pro dokončení přihlášky uhraďte startovné.',
    actions: (
      <>
        <Button size="sm" variant="primary">Zaplatit</Button>
        <Button size="sm" variant="ghost">Zrušit</Button>
      </>
    ),
  },
  { id: 2, title: 'Potvrzení přihlášky', status: 'pending' },
  { id: 3, title: 'Závod', status: 'pending' },
];

export const WithActions: Story = {
  args: { items: itemsWithActions, variant: 'card' },
};

// =============================================================================
// CSK-SPECIFIC STORIES
// =============================================================================

export const RaceApplication: Story = {
  args: {
    items: [
      { id: 1, title: 'Přihláška odeslána', timestamp: '1. 3. 2024', status: 'completed', description: 'Přihláška na MČR slalom odeslána.' },
      { id: 2, title: 'Potvrzení pořadatelem', timestamp: '2. 3. 2024', status: 'completed' },
      { id: 3, title: 'Startovné uhrazeno', timestamp: '3. 3. 2024', status: 'completed', meta: <span>VS: 2024030001</span> },
      { id: 4, title: 'Zveřejnění startovky', timestamp: '10. 3. 2024', status: 'current' },
      { id: 5, title: 'Závod', timestamp: '15. - 16. 3. 2024', status: 'pending' },
    ],
    variant: 'default',
  },
  parameters: {
    docs: { description: { story: 'Timeline pro sledování stavu přihlášky na závod.' } },
  },
};

export const AthleteRegistration: Story = {
  args: {
    items: [
      { id: 1, title: 'Založení profilu', timestamp: '10. 1. 2024', status: 'completed' },
      { id: 2, title: 'Přiřazení k oddílu', timestamp: '10. 1. 2024', status: 'completed', meta: <Badge section="dv" size="sm">DV</Badge> },
      { id: 3, title: 'Lékařská prohlídka', timestamp: '15. 1. 2024', status: 'completed', description: 'Platná do 15. 1. 2025' },
      { id: 4, title: 'Přidělení VT třídy', timestamp: '20. 1. 2024', status: 'completed', meta: <Badge vtClass="b" size="sm">VT B</Badge> },
      { id: 5, title: 'Registrace kompletní', timestamp: '20. 1. 2024', status: 'completed' },
    ],
    variant: 'card',
  },
  parameters: {
    docs: { description: { story: 'Timeline pro historii registrace závodníka.' } },
  },
};

export const ActivityFeed: Story = {
  args: {
    items: [
      { id: 1, title: 'Nový výsledek', timestamp: 'Před 2 hodinami', status: 'completed', color: 'success', description: '1. místo - K1M' },
      { id: 2, title: 'Přihláška potvrzena', timestamp: 'Před 5 hodinami', status: 'completed', color: 'primary' },
      { id: 3, title: 'VT třída aktualizována', timestamp: 'Včera', status: 'completed', color: 'info', description: 'B → A' },
      { id: 4, title: 'Lékařská prohlídka brzy vyprší', timestamp: 'Před 3 dny', status: 'completed', color: 'warning' },
    ],
    variant: 'compact',
    size: 'sm',
  },
  parameters: {
    docs: { description: { story: 'Kompaktní timeline pro activity feed.' } },
  },
};
