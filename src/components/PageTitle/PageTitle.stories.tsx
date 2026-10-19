import type { Meta, StoryObj } from '@storybook/react';
import { PageTitle } from './PageTitle';
import { Breadcrumbs } from '../Breadcrumbs';
import { LinkButton, TagPlaceholder } from '../PageLayout/layoutStoryParts';

const meta: Meta<typeof PageTitle> = {
  title: 'Components/PageTitle',
  component: PageTitle,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Heading with a meta row and actions on the right. Replaces HeroSection. `variant="bar"` is the full-width white band used in the office.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['md', 'lg'] },
    variant: { control: 'select', options: ['plain', 'bar'] },
    as: { control: 'select', options: ['h1', 'h2'] },
  },
};

export default meta;
type Story = StoryObj<typeof PageTitle>;

export const Default: Story = {
  args: {
    title: 'Olympic Hopes 2026',
    logo: 'OH',
    badges: (
      <>
        <TagPlaceholder tone="dv">Divoká voda</TagPlaceholder>
        <TagPlaceholder>Slalom</TagPlaceholder>
      </>
    ),
    meta: (
      <>
        <span>
          <b>3.–4. října 2026</b>
        </span>
        <span>Roudnice nad Labem</span>
        <span>246 lodí</span>
      </>
    ),
    actions: <LinkButton>Propozice (PDF)</LinkButton>,
  },
};

export const Simple: Story = { args: { title: 'Kalendář závodů 2026' } };

export const OfficeBar: Story = {
  args: {
    as: 'h2',
    size: 'md',
    variant: 'bar',
    breadcrumbs: (
      <Breadcrumbs items={[{ label: 'Přihlášky oddílu', href: '#p' }, { label: 'Nominační závod, Lipno' }]} />
    ),
    title: 'Nominační závod, Lipno · 23.–24. 5. 2026',
    titleAfter: <TagPlaceholder tone="outline">Rozpracovaná</TagPlaceholder>,
    actions: <LinkButton small>Propozice</LinkButton>,
  },
  parameters: { layout: 'fullscreen' },
};
