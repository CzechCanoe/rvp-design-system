import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Location in the site hierarchy. Collapses long paths (`maxItems`) and accepts a custom link renderer for router integration.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    maxItems: { control: { type: 'number', min: 0, max: 10 } },
    collapsedLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

const basic: BreadcrumbItem[] = [
  { label: 'Úvod', href: '/' },
  { label: 'Závody', href: '/zavody' },
  { label: '2026', href: '/zavody/2026' },
  { label: 'Olympic Hopes 2026' },
];

export const Default: Story = { args: { items: basic } };

export const Collapsed: Story = {
  args: {
    maxItems: 4,
    items: [
      { label: 'Úvod', href: '/' },
      { label: 'Závodníci', href: '/zavodnici' },
      { label: 'Oddíly', href: '/zavodnici/oddily' },
      { label: 'USK Praha', href: '/zavodnici/oddily/usk-praha' },
      { label: 'Členové', href: '/zavodnici/oddily/usk-praha/clenove' },
      { label: 'Jan Novák' },
    ],
  },
};
