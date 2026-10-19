import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { Subbar } from '../Subbar';
import { BrandMark, siteNav, subbarItems } from '../PageLayout/layoutStoryParts';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Header with three variants: `site` (navy kanoe.cz band, 48 px, followed by `Subbar`), `satellite` (standalone app with a link back to kanoe.cz) and `app` (44 px office bar with application name, club and user). Navigation collapses into a drawer below 768 px.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['site', 'satellite', 'app'],
    },
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    sticky: { control: 'boolean' },
    appName: { control: 'text' },
    homeLink: { control: 'text' },
    homeLinkLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    variant: 'site',
    brand: <BrandMark />,
    navigation: siteNav,
  },
};

export const SiteWithSubbar: Story = {
  render: () => (
    <>
      <Header variant="site" brand={<BrandMark />} navigation={siteNav} />
      <Subbar items={subbarItems} />
    </>
  ),
};

export const Satellite: Story = {
  args: {
    variant: 'satellite',
    brand: <BrandMark name="ČSK" />,
    appName: 'Live výsledky',
    navigation: (
      <>
        <a href="#vysledky" aria-current="page">
          Výsledky
        </a>
        <a href="#kalendar">Kalendář</a>
      </>
    ),
  },
};

export const App: Story = {
  args: {
    variant: 'app',
    brand: <BrandMark name="ČSK · Přihlášky" />,
    navigation: (
      <>
        <a href="#kalendar">Kalendář</a>
        <a href="#prihlasky" aria-current="page">
          Přihlášky oddílu
        </a>
        <a href="#clenove">Členové</a>
        <a href="#platby">Platby</a>
      </>
    ),
    club: 'TJ Bohemians Praha',
    userMenu: (
      <>
        <span>Jana Správcová</span>
        <a href="#odhlasit">Odhlásit</a>
      </>
    ),
  },
};

export const Sticky: Story = {
  render: () => (
    <div style={{ height: 320, overflow: 'auto' }}>
      <Header sticky variant="site" brand={<BrandMark />} navigation={siteNav} />
      <div style={{ height: 900, padding: 24, color: 'var(--csk-color-text-3)' }}>Scroll: the band stays on top.</div>
    </div>
  ),
};
