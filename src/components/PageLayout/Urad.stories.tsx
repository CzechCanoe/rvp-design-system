import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './PageLayout';
import { Header } from '../Header';
import { Breadcrumbs } from '../Breadcrumbs';
import { PageTitle } from '../PageTitle';
import { BrandMark, TagPlaceholder, LinkButton, ContentPlaceholder } from './layoutStoryParts';

/**
 * Header of `docs/v2/reference/Prihlaska.html` (office, grey working surface):
 * 44 px app bar, white title band with breadcrumbs, status and deadlines.
 *
 * Placeholders: badges (T4), outline button (T4), deadline text (DeadlineBadge, later phase).
 */
const meta: Meta<typeof PageLayout> = {
  title: 'Layout/Urad',
  component: PageLayout,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

const appNav = (
  <>
    <a href="#kalendar">Kalendář</a>
    <a href="#prihlasky" aria-current="page">
      Přihlášky oddílu
    </a>
    <a href="#clenove">Členové</a>
    <a href="#platby">Platby</a>
  </>
);

export const Default: Story = {
  render: () => (
    <PageLayout
      variant="urad"
      header={
        <Header
          variant="app"
          brand={<BrandMark name="ČSK · Přihlášky" />}
          navigation={appNav}
          club="TJ Bohemians Praha"
          userMenu={
            <>
              <span>Jana Správcová</span>
              <a href="#odhlasit">Odhlásit</a>
            </>
          }
        />
      }
      banner={
        <PageTitle
          as="h2"
          size="md"
          variant="bar"
          breadcrumbs={
            <Breadcrumbs
              items={[{ label: 'Přihlášky oddílu', href: '#prihlasky' }, { label: 'Nominační závod, Lipno' }]}
            />
          }
          titleBefore={
            <>
              <TagPlaceholder tone="dv">DV</TagPlaceholder>
              <TagPlaceholder>NKZ</TagPlaceholder>
            </>
          }
          title="Nominační závod, Lipno · 23.–24. 5. 2026"
          titleAfter={<TagPlaceholder tone="outline">Rozpracovaná</TagPlaceholder>}
          aside={
            <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: 13, color: 'var(--csk-color-text-3)' }}>Uzávěrka přihlášek</span>
                <span
                  style={{
                    fontFamily: 'var(--csk-font-display)',
                    fontWeight: 700,
                    fontSize: 20,
                    color: 'var(--csk-color-state-provisional)',
                  }}
                >
                  za 5 dní · st 13. 5. 23:59
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: 13, color: 'var(--csk-color-text-3)' }}>Dohlášky</span>
                <span style={{ fontWeight: 600 }}>do po 18. 5., +100 %</span>
              </div>
            </>
          }
          actions={<LinkButton small href="#propozice">Propozice</LinkButton>}
        />
      }
    >
      <div style={{ padding: '20px 0 40px' }}>
        <ContentPlaceholder label="Formulář přihlášky (EntryTable, T14)" height={240} />
      </div>
    </PageLayout>
  ),
};
