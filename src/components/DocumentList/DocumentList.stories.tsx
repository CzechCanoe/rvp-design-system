import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../Card';
import { DocumentList, type DocumentListItem } from './DocumentList';

const meta: Meta<typeof DocumentList> = {
  title: 'Components/DocumentList',
  component: DocumentList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Documents of an event as plain links with the format suffix (reference `Zavod.html`, card „Dokumenty“). ' +
          'Items `{ label, href, kind: pdf | xlsx | xml | link, date? }`; `formats` adds further formats of the same ' +
          'document, each its own link. Dates are text formatted by the application.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DocumentList>;

/** The three documents of the reference sidebar. */
const zavodDocuments: DocumentListItem[] = [
  { label: 'Propozice závodu', href: '#propozice', kind: 'pdf' },
  { label: 'Startovní listiny', href: '#startovky', kind: 'pdf' },
  {
    label: 'Výsledky sobota, oficiální',
    href: '#vysledky.pdf',
    kind: 'pdf',
    formats: [
      { kind: 'xlsx', href: '#vysledky.xlsx' },
      { kind: 'xml', href: '#vysledky.xml' },
    ],
  },
];

/** Reference Zavod.html: in a Card with a heading. */
export const Default: Story = {
  render: () => (
    <Card header={<h3 style={{ margin: 0, fontSize: 'var(--csk-text-lg)' }}>Dokumenty</h3>}>
      <DocumentList items={zavodDocuments} aria-label="Dokumenty závodu" />
    </Card>
  ),
};

/** Every kind, with and without a date; `link` has no suffix. */
export const KindsAndDates: Story = {
  args: {
    'aria-label': 'Dokumenty',
    items: [
      { label: 'Propozice závodu', href: '#p', kind: 'pdf', date: '12. 9. 2026' },
      { label: 'Přihlášky k 1. 10.', href: '#x', kind: 'xlsx', date: '1. 10. 2026' },
      { label: 'Výsledky pro ČSK', href: '#xml', kind: 'xml' },
      { label: 'Výsledky na kanoe.cz', href: '#kanoe', kind: 'link' },
      {
        label: 'Výsledky neděle, předběžné',
        href: '#n.pdf',
        kind: 'pdf',
        date: '4. 10. 2026 16:40',
        formats: [{ kind: 'xlsx', href: '#n.xlsx' }],
      },
    ],
  },
};
