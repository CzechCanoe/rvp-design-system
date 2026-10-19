import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './PageLayout';
import { Header } from '../Header';
import { Subbar } from '../Subbar';
import { Breadcrumbs } from '../Breadcrumbs';
import { PageTitle } from '../PageTitle';
import { KanoeCzContext } from '../KanoeCzContext';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { StatusBadge } from '../StatusBadge';
import { SegmentedControl } from '../SegmentedControl';
import { Tabs } from '../Tabs';
import { BrandMark, siteNav, subbarItems, StoryDataAge, ContentPlaceholder } from './layoutStoryParts';

/**
 * Top part of `docs/v2/reference/Zavod.html` (event detail, desktop):
 * navy site band, action-blue subbar, breadcrumbs, PageTitle with logo,
 * badges, meta row and actions, and the filter toolbar.
 */
const meta: Meta<typeof PageLayout> = {
  title: 'Layout/Tribuna',
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
const views = [
  { value: 'results', label: 'Výsledky' },
  { value: 'startlist', label: 'Startovka' },
  { value: 'oncourse', label: 'Na trati' },
  { value: 'program', label: 'Program' },
];
const noop = () => {};

const Page = ({ variant = 'tribuna' }: { variant?: 'tribuna' | 'embed' }) => (
  <PageLayout
    variant={variant}
    header={
      <>
        <Header variant="site" brand={<BrandMark />} navigation={siteNav} />
        <Subbar items={subbarItems} />
      </>
    }
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: 18, paddingBottom: 40 }}>
      <Breadcrumbs
        items={[
          { label: 'Úvod', href: '#uvod' },
          { label: 'Závody', href: '#zavody' },
          { label: '2026' },
          { label: 'Olympic Hopes 2026' },
        ]}
      />

      <PageTitle
        logo="OH"
        badges={
          <>
            <Badge section="dv">Divoká voda</Badge>
            <Badge variant="level">Slalom</Badge>
            <Badge variant="level">Mezinárodní</Badge>
            <StatusBadge state="live" />
            <span style={{ fontSize: 13 }}>
              <StoryDataAge />
            </span>
          </>
        }
        title="Olympic Hopes 2026"
        meta={
          <>
            <span>
              <b>3.–4. října 2026</b>
            </span>
            <span>Roudnice nad Labem, KK Roudnice n. L.</span>
            <span>
              Pořádá <a href="#o">KK Roudnice n. L.</a>
            </span>
            <span>246 lodí</span>
          </>
        }
        actions={
          <>
            <Button variant="secondary">Propozice (PDF)</Button>
            <Button variant="secondary">★ Sledovat</Button>
          </>
        }
      />

      <div
        style={{
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '10px 12px',
          background: 'var(--csk-color-surface-2)',
          borderRadius: 'var(--csk-radius-lg)',
        }}
      >
        <SegmentedControl items={days} value="sun" onChange={noop} aria-label="Den" />
        <span style={{ width: 1, height: 24, background: 'var(--csk-color-border)' }} />
        <div style={{ flex: '1 1 320px', minWidth: 0 }}>
          <Tabs variant="nav" size="sm" tabs={classes} activeTab="K1 muži" aria-label="Třída" />
        </div>
        <div>
          <SegmentedControl items={views} value="results" onChange={noop} aria-label="Pohled" />
        </div>
      </div>

      <ContentPlaceholder label="Na trati a tabulka výsledků (T9, T10)" height={240} />
    </div>
  </PageLayout>
);

export const Default: Story = { render: () => <Page /> };

/** Embed on kanoe.cz: content only, native look inside the Bootstrap page. */
export const Embed: Story = {
  render: () => (
    <KanoeCzContext pageVariant="subpage" pageTitle="Olympic Hopes 2026">
      <Page variant="embed" />
    </KanoeCzContext>
  ),
  parameters: { layout: 'fullscreen' },
};
