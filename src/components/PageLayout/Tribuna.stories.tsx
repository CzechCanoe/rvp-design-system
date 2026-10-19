import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './PageLayout';
import { Header } from '../Header';
import { Subbar } from '../Subbar';
import { Breadcrumbs } from '../Breadcrumbs';
import { PageTitle } from '../PageTitle';
import { KanoeCzContext } from '../KanoeCzContext';
import {
  BrandMark,
  siteNav,
  subbarItems,
  SegPlaceholder,
  PillsPlaceholder,
  LivePlaceholder,
  StoryDataAge,
  TagPlaceholder,
  LinkButton,
  ContentPlaceholder,
} from './layoutStoryParts';

/**
 * Top part of `docs/v2/reference/Zavod.html` (event detail, desktop):
 * navy site band, action-blue subbar, breadcrumbs, PageTitle with logo,
 * badges, meta row and actions, and the filter toolbar.
 *
 * Placeholders: SegmentedControl (T7), class pills (T4), LIVE badge (T5), badges and buttons (T4).
 */
const meta: Meta<typeof PageLayout> = {
  title: 'Layout/Tribuna',
  component: PageLayout,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

const classes = ['Forerunners', 'C1 ženy', 'C1 muži', 'K1 ženy', 'K1 muži', 'C2 mix'];

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
            <TagPlaceholder tone="dv">Divoká voda</TagPlaceholder>
            <TagPlaceholder>Slalom</TagPlaceholder>
            <TagPlaceholder>Mezinárodní</TagPlaceholder>
            <LivePlaceholder />
            <StoryDataAge />
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
            <LinkButton href="#p">Propozice (PDF)</LinkButton>
            <LinkButton href="#f">★ Sledovat</LinkButton>
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
        <SegPlaceholder items={['So 3. 10.', 'Ne 4. 10.']} active={1} />
        <span style={{ width: 1, height: 24, background: 'var(--csk-color-border)' }} />
        <PillsPlaceholder items={classes} active={4} />
        <div style={{ marginLeft: 'auto' }}>
          <SegPlaceholder items={['Výsledky', 'Startovka', 'Na trati', 'Program']} active={0} />
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
