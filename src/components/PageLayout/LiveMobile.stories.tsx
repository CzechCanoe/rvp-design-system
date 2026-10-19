import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './PageLayout';
import { EventHeader } from '../EventHeader';
import { BottomBar } from '../BottomBar';
import { StatusBadge } from '../StatusBadge';
import { SegmentedControl } from '../SegmentedControl';
import { Tabs } from '../Tabs';
import { StoryDataAge, ContentPlaceholder, bottomBarItems } from './layoutStoryParts';

/**
 * Top part of `docs/v2/reference/Live1.html` (live on a phone, 390 px):
 * EventHeader, day and class navigation, content, BottomBar.
 */
const meta: Meta<typeof PageLayout> = {
  title: 'Layout/LiveMobile',
  component: PageLayout,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

const classes = ['Forerunners', 'C1 ženy', 'C1 muži', 'K1 ženy', 'K1 muži', 'C2 mix'].map((label) => ({
  id: label,
  label,
}));
const days = [
  { value: 'sat', label: 'So 3. 10.' },
  { value: 'sun', label: 'Ne 4. 10.' },
];
const noop = () => {};

const Phone = ({ condensed = false }: { condensed?: boolean }) => (
  <div
    style={{
      width: '100%',
      maxWidth: 390,
      height: 720,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--csk-color-surface-2)',
      fontSize: 14,
    }}
  >
    <EventHeader
      condensed={condensed}
      backHref="#zavody"
      title="Olympic Hopes 2026"
      subtitle="Roudnice nad Labem · neděle 4. 10. · 2. jízdy"
      status={<StatusBadge state="live" />}
      dataAge={<StoryDataAge />}
    />

    <div
      style={{
        background: 'var(--csk-color-surface)',
        borderBottom: '1px solid var(--csk-color-border)',
        padding: '8px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div>
        <SegmentedControl items={days} value="sun" onChange={noop} size="sm" aria-label="Den" />
      </div>
      <Tabs
        variant="nav"
        size="sm"
        overflow="carousel"
        tabs={classes}
        activeTab="K1 muži"
        aria-label="Třída"
      />
    </div>

    <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
      <ContentPlaceholder label="Na trati (T11)" height={150} />
      <ContentPlaceholder label="Tabulka výsledků (T9)" height={260} />
    </div>

    <BottomBar items={bottomBarItems} />
  </div>
);

export const Default: Story = { render: () => <Phone /> };

export const Condensed: Story = {
  render: () => <Phone condensed />,
  parameters: {
    docs: { description: { story: 'Scrolled state: one row, switched by the application.' } },
  },
};
