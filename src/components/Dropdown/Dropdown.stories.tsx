import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dropdown, DropdownButton, type DropdownItem } from './Dropdown';
import { Button } from '../Button';
import { Avatar } from '../Avatar';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// Sample icons as inline SVGs
const IconEdit = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IconCopy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const IconDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconSettings = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconLogOut = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// Basic items for stories
const basicItems: DropdownItem[] = [
  { id: 'edit', label: 'Upravit', icon: <IconEdit />, onClick: () => console.log('Edit clicked') },
  { id: 'copy', label: 'Kopírovat', icon: <IconCopy />, onClick: () => console.log('Copy clicked') },
  { id: 'download', label: 'Stáhnout', icon: <IconDownload />, onClick: () => console.log('Download clicked') },
  { id: 'divider-1', label: '', divider: true },
  { id: 'delete', label: 'Smazat', icon: <IconTrash />, variant: 'danger', onClick: () => console.log('Delete clicked') },
];

/**
 * Basic dropdown with pre-styled button trigger.
 */
export const Default: Story = {
  args: {
    items: basicItems,
    trigger: <DropdownButton>Akce</DropdownButton>,
  },
};

/**
 * Dropdown with custom Button as trigger.
 */
export const WithButton: Story = {
  render: (args) => (
    <Dropdown
      {...args}
      trigger={
        <Button variant="secondary" iconRight={
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        }>
          Možnosti
        </Button>
      }
    />
  ),
  args: {
    items: basicItems,
  },
};

/**
 * Different size variants.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <Dropdown
        size="sm"
        items={basicItems}
        trigger={<DropdownButton size="sm">Small</DropdownButton>}
      />
      <Dropdown
        size="md"
        items={basicItems}
        trigger={<DropdownButton size="md">Medium</DropdownButton>}
      />
      <Dropdown
        size="lg"
        items={basicItems}
        trigger={<DropdownButton size="lg">Large</DropdownButton>}
      />
    </div>
  ),
};

/**
 * Different positions relative to trigger.
 */
export const Positions: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '120px', padding: '100px' }}>
      <Dropdown
        position="bottom-start"
        items={basicItems.slice(0, 3)}
        trigger={<DropdownButton>Bottom Start</DropdownButton>}
      />
      <Dropdown
        position="bottom-end"
        items={basicItems.slice(0, 3)}
        trigger={<DropdownButton>Bottom End</DropdownButton>}
      />
      <Dropdown
        position="top-start"
        items={basicItems.slice(0, 3)}
        trigger={<DropdownButton>Top Start</DropdownButton>}
      />
      <Dropdown
        position="top-end"
        items={basicItems.slice(0, 3)}
        trigger={<DropdownButton>Top End</DropdownButton>}
      />
    </div>
  ),
};

/**
 * Items with descriptions.
 */
export const WithDescriptions: Story = {
  args: {
    items: [
      {
        id: 'edit',
        label: 'Upravit profil',
        description: 'Změnit jméno, email a další údaje',
        icon: <IconEdit />,
      },
      {
        id: 'settings',
        label: 'Nastavení účtu',
        description: 'Zabezpečení, notifikace, soukromí',
        icon: <IconSettings />,
      },
      { id: 'divider-1', label: '', divider: true },
      {
        id: 'delete',
        label: 'Smazat účet',
        description: 'Trvale odstranit všechna data',
        icon: <IconTrash />,
        variant: 'danger',
      },
    ],
    trigger: <DropdownButton>Správa účtu</DropdownButton>,
  },
};

/**
 * Items with links (render as <a> elements).
 */
export const WithLinks: Story = {
  args: {
    items: [
      { id: 'home', label: 'Domů', href: '/' },
      { id: 'results', label: 'Výsledky', href: '/vysledky' },
      { id: 'calendar', label: 'Kalendář závodů', href: '/kalendar' },
      { id: 'divider-1', label: '', divider: true },
      { id: 'external', label: 'ICF Results', href: 'https://canoeicf.com', onClick: () => console.log('External link') },
    ],
    trigger: <DropdownButton>Navigace</DropdownButton>,
  },
};

/**
 * Disabled state and disabled items.
 */
export const DisabledStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Dropdown
        items={[
          { id: 'available', label: 'Dostupná položka' },
          { id: 'disabled-1', label: 'Nedostupná položka', disabled: true },
          { id: 'another', label: 'Další položka' },
          { id: 'disabled-2', label: 'Také nedostupná', disabled: true, icon: <IconEdit /> },
        ]}
        trigger={<DropdownButton>S disabled položkami</DropdownButton>}
      />
      <Dropdown
        disabled
        items={basicItems}
        trigger={<DropdownButton>Celý dropdown disabled</DropdownButton>}
      />
    </div>
  ),
};

/**
 * Controlled dropdown - open state managed externally.
 */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="sm" onClick={() => setOpen(true)}>Otevřít</Button>
          <Button size="sm" variant="secondary" onClick={() => setOpen(false)}>Zavřít</Button>
        </div>
        <Dropdown
          open={open}
          onOpenChange={setOpen}
          items={basicItems}
          trigger={<DropdownButton open={open}>Kontrolovaný dropdown</DropdownButton>}
        />
      </div>
    );
  },
};

/**
 * Button variants for dropdown trigger.
 */
export const ButtonVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Dropdown
        items={basicItems}
        trigger={<DropdownButton variant="default">Default</DropdownButton>}
      />
      <Dropdown
        items={basicItems}
        trigger={<DropdownButton variant="primary">Primary</DropdownButton>}
      />
      <Dropdown
        items={basicItems}
        trigger={<DropdownButton variant="ghost">Ghost</DropdownButton>}
      />
    </div>
  ),
};

// ==========================================================================
// CSK-SPECIFIC EXAMPLES
// ==========================================================================

/**
 * User menu dropdown (typical in app header).
 */
export const UserMenu: Story = {
  render: () => (
    <Dropdown
      position="bottom-end"
      items={[
        { id: 'profile', label: 'Můj profil', icon: <IconUser />, href: '/profil' },
        { id: 'settings', label: 'Nastavení', icon: <IconSettings />, href: '/nastaveni' },
        { id: 'divider-1', label: '', divider: true },
        { id: 'logout', label: 'Odhlásit se', icon: <IconLogOut />, variant: 'danger' },
      ]}
      trigger={
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar name="Jan Novák" size="sm" />
          <span>Jan Novák</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      }
    />
  ),
};

/**
 * Actions dropdown for athlete row in table.
 */
export const AthleteActions: Story = {
  args: {
    items: [
      { id: 'view', label: 'Zobrazit profil', icon: <IconUser /> },
      { id: 'edit', label: 'Upravit údaje', icon: <IconEdit /> },
      { id: 'download', label: 'Exportovat výsledky', icon: <IconDownload />, description: 'CSV soubor s historií' },
      { id: 'divider-1', label: '', divider: true },
      { id: 'delete', label: 'Smazat závodníka', icon: <IconTrash />, variant: 'danger' },
    ],
    trigger: (
      <button style={{
        background: 'none',
        border: '1px solid var(--color-border-default)',
        borderRadius: '4px',
        padding: '4px 8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </button>
    ),
    'aria-label': 'Akce pro závodníka',
  },
};

/**
 * Section filter dropdown for results.
 */
export const SectionFilter: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    const sections: DropdownItem[] = [
      {
        id: 'all',
        label: 'Všechny sekce',
        onClick: () => setSelected(null),
        closeOnClick: true,
      },
      { id: 'divider-1', label: '', divider: true },
      {
        id: 'dv',
        label: 'Divoká voda (DV)',
        description: 'Slalom a sjezd na divoké vodě',
        onClick: () => setSelected('dv'),
      },
      {
        id: 'ry',
        label: 'Rychlostní (RY)',
        description: 'Sprint a maraton',
        onClick: () => setSelected('ry'),
      },
      {
        id: 'vt',
        label: 'Vodní turistika (VT)',
        description: 'Turistické a rekreační akce',
        onClick: () => setSelected('vt'),
      },
    ];

    return (
      <Dropdown
        items={sections}
        trigger={
          <DropdownButton>
            {selected
              ? sections.find(s => s.id === selected)?.label
              : 'Filtr sekcí'
            }
          </DropdownButton>
        }
      />
    );
  },
};

/**
 * Export options for race results.
 */
export const ExportOptions: Story = {
  args: {
    items: [
      { id: 'pdf', label: 'Exportovat jako PDF', icon: <IconDownload />, description: 'Oficiální výsledková listina' },
      { id: 'csv', label: 'Exportovat jako CSV', icon: <IconDownload />, description: 'Pro import do Excelu' },
      { id: 'xml', label: 'Exportovat jako XML', icon: <IconDownload />, description: 'ICF kompatibilní formát' },
      { id: 'divider-1', label: '', divider: true },
      { id: 'print', label: 'Tisknout', icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
      )},
    ],
    trigger: <DropdownButton variant="primary">Export výsledků</DropdownButton>,
    'aria-label': 'Možnosti exportu',
  },
};

/**
 * VT class filter for events.
 */
export const VTClassFilter: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['a', 'b']);

    const toggleClass = (cls: string) => {
      setSelected(prev =>
        prev.includes(cls)
          ? prev.filter(c => c !== cls)
          : [...prev, cls]
      );
    };

    const items: DropdownItem[] = [
      {
        id: 'm',
        label: selected.includes('m') ? '✓ Třída M' : '○ Třída M',
        description: 'Mistrovská úroveň',
        onClick: () => toggleClass('m'),
        closeOnClick: false,
      },
      {
        id: 'a',
        label: selected.includes('a') ? '✓ Třída A' : '○ Třída A',
        description: 'Pokročilí',
        onClick: () => toggleClass('a'),
        closeOnClick: false,
      },
      {
        id: 'b',
        label: selected.includes('b') ? '✓ Třída B' : '○ Třída B',
        description: 'Mírně pokročilí',
        onClick: () => toggleClass('b'),
        closeOnClick: false,
      },
      {
        id: 'c',
        label: selected.includes('c') ? '✓ Třída C' : '○ Třída C',
        description: 'Začátečníci',
        onClick: () => toggleClass('c'),
        closeOnClick: false,
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
        <Dropdown
          items={items}
          trigger={
            <DropdownButton>
              VT třídy ({selected.length} vybraných)
            </DropdownButton>
          }
        />
        <small style={{ color: 'var(--color-text-secondary)' }}>
          Vybráno: {selected.length > 0 ? selected.map(s => s.toUpperCase()).join(', ') : 'žádné'}
        </small>
      </div>
    );
  },
};

/**
 * Year navigation for race calendar.
 */
export const YearNavigation: Story = {
  render: () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
    const [selected, setSelected] = useState(currentYear);

    return (
      <Dropdown
        items={years.map(year => ({
          id: String(year),
          label: String(year),
          onClick: () => setSelected(year),
        }))}
        trigger={
          <DropdownButton variant="ghost">
            Rok {selected}
          </DropdownButton>
        }
        size="sm"
      />
    );
  },
};
