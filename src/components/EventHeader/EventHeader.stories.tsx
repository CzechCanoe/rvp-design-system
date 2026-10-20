import type { Meta, StoryObj } from '@storybook/react';
import { EventHeader, type EventHeaderProps } from './EventHeader';
import { Avatar } from '../Avatar';
import { PageLayout } from '../PageLayout';
import { StatusBadge, type StatusBadgeState } from '../StatusBadge';
import { DataAge } from '../DataAge';
import { createTestClock } from '../../clock';
import { ContentPlaceholder, StoryDataAge } from '../PageLayout/layoutStoryParts';

const STATES: StatusBadgeState[] = ['official', 'provisional', 'review', 'unknown', 'live', 'stale'];

/** Fixed clock for the PageGutter story (nothing ticks in screenshots). */
const GUTTER_NOW = Date.UTC(2026, 9, 4, 12, 32, 10);
const gutterClock = createTestClock({ now: GUTTER_NOW });

const meta: Meta<typeof EventHeader> = {
  title: 'Components/EventHeader',
  component: EventHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Compact header of the live view. `condensed` is the one-row state for a scrolled page (back · name · status · data age, ' +
          'no subtitle); the application decides when to switch. `status` and `dataAge` are slots for StatusBadge and DataAge. ' +
          'The navy band spans the full width, its content follows the page container: inside a `PageLayout` the width of ' +
          'its `maxWidth` (CSS variable `--csk-page-max-width`), otherwise 1200 px; `maxWidth` sets it explicitly. ' +
          'The side gutter is the page gutter token `--csk-layout-gutter` (16 px phone, 24 px from 768 px), as in a padded PageLayout. ' +
          'When condensed, a DataAge in the `dataAge` slot renders its compact form (dot + „před 1 s“).',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    // Phone frame (390 px) unless a story turns it off with `parameters.phoneFrame: false`
    (Story, context) =>
      context.parameters.phoneFrame === false ? (
        <Story />
      ) : (
        <div style={{ maxWidth: 390 }}>
          <Story />
        </div>
      ),
  ],
};

export default meta;
type Story = StoryObj<typeof EventHeader>;

const base: EventHeaderProps = {
  title: 'Olympic Hopes 2026',
  subtitle: 'Roudnice nad Labem · neděle 4. 10. · 2. jízdy',
  backHref: '#zavody',
  status: <StatusBadge state="live" />,
  dataAge: <StoryDataAge />,
};

export const Default: Story = { args: base };

/**
 * Scrolled page: one row, name · status · data age; the subtitle is hidden, the name gets an ellipsis first.
 * The DataAge in the slot switches to its compact form („před 1 s“, full text in `title` and for screen readers).
 */
export const Condensed: Story = { args: { ...Default.args, condensed: true } };

export const LongTitle: Story = {
  args: {
    ...Default.args,
    title: 'Mistrovství České republiky ve slalomu na divoké vodě 2026',
  },
};

// Upright poster (5:7) and a square logo, inline so the story needs no network
const posterLogo =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140"><rect width="100" height="140" fill="white"/><rect x="8" y="8" width="84" height="70" fill="navy"/><path d="M8 105c14-12 28-12 42 0s28 12 42 0" stroke="navy" stroke-width="7" fill="none"/></svg>'
  );
const squareLogo =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="white"/><circle cx="50" cy="50" r="34" fill="navy"/></svg>'
  );

/**
 * Logo slot: `<Avatar shape="portrait" />` gives an upright 40 × 56 slot (5 : 7) for event posters,
 * `<Avatar shape="square" />` the 40 × 40 square. The image is contained, never cropped.
 */
export const LogoShapes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8 }}>
      <EventHeader
        {...base}
        logo={<Avatar src={posterLogo} alt="Plakát akce" shape="portrait" />}
      />
      <EventHeader
        {...base}
        logo={<Avatar src={squareLogo} alt="Logo akce" shape="square" />}
      />
    </div>
  ),
};

/**
 * The band is full width, its content is aligned with the page container (desktop 1280 px):
 * a default `PageLayout` (1200 px, as PageTitle) and `PageLayout maxWidth="lg"` (1024 px, as c123-live-mini).
 * EventHeader takes the width from the surrounding PageLayout; outside one, `maxWidth="lg"` does the same.
 */
export const ContainerWidth: Story = {
  parameters: { phoneFrame: false },
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <PageLayout stickyHeader={false} banner={<EventHeader {...base} />}>
        <div style={{ paddingBlock: 12 }}>
          <ContentPlaceholder label="PageLayout (maxWidth xl, 1200 px)" height={56} />
        </div>
      </PageLayout>
      <PageLayout stickyHeader={false} maxWidth="lg" banner={<EventHeader {...base} />}>
        <div style={{ paddingBlock: 12 }}>
          <ContentPlaceholder label='PageLayout maxWidth="lg" (1024 px)' height={56} />
        </div>
      </PageLayout>
    </div>
  ),
};

/**
 * Header and page content start on the same line: EventHeader uses the gutter token of the padded PageLayout
 * (`--csk-layout-gutter`, 16 px phone, 24 px from 768 px). Default and condensed header in a full-width page;
 * condensed renders the compact DataAge (dot + „před 4 s“) by itself. Snapshotted at 390 and 1280.
 */
export const PageGutter: Story = {
  parameters: { phoneFrame: false },
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {[false, true].map((condensed) => (
        <PageLayout
          key={String(condensed)}
          stickyHeader={false}
          banner={
            <EventHeader
              {...base}
              condensed={condensed}
              dataAge={<DataAge receivedAt={GUTTER_NOW - 4_000} clock={gutterClock} connection="ok" />}
            />
          }
        >
          <div style={{ paddingBlock: 12 }}>
            <ContentPlaceholder label={condensed ? 'Obsah stránky (condensed)' : 'Obsah stránky'} height={56} />
          </div>
        </PageLayout>
      ))}
    </div>
  ),
};

/**
 * Every StatusBadge state in the navy header (the status slot sets `data-tone="on-dark"`,
 * so the transparent "stale" state turns light). Checked by axe and snapshotted at 390 and 1280.
 */
export const StatusStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8 }}>
      {STATES.map((state) => (
        <EventHeader
          key={state}
          title="Olympic Hopes 2026"
          subtitle="Roudnice nad Labem · neděle 4. 10. · 2. jízdy"
          backHref="#zavody"
          status={<StatusBadge state={state} />}
          dataAge={<StoryDataAge />}
        />
      ))}
    </div>
  ),
};
