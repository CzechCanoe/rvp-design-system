import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Checkbox component for boolean selections. Supports multiple sizes, validation states, and indeterminate state for partial selections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the checkbox',
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Validation state',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state (partially checked)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below checkbox',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message (shown when state is error)',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ==========================================================================
   BASIC EXAMPLES
   ========================================================================== */

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Newsletter subscription',
    defaultChecked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Remember me',
    helperText: 'Keep me signed in on this device',
  },
};

/* ==========================================================================
   SIZES
   ========================================================================== */

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small checkbox',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Medium checkbox (default)',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large checkbox',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox (default)" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
  ),
};

/* ==========================================================================
   STATES
   ========================================================================== */

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked checkbox',
    disabled: true,
    defaultChecked: true,
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Accept terms and conditions',
    state: 'error',
    errorMessage: 'You must accept the terms to continue',
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Email verified',
    state: 'success',
    defaultChecked: true,
    helperText: 'Your email has been verified',
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox label="Default state" defaultChecked />
      <Checkbox label="Error state" state="error" errorMessage="This field is required" />
      <Checkbox label="Success state" state="success" defaultChecked helperText="Valid selection" />
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

/* ==========================================================================
   INDETERMINATE STATE
   ========================================================================== */

export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    indeterminate: true,
  },
};

/**
 * Interactive example showing how indeterminate state works with child checkboxes.
 * The parent checkbox shows indeterminate when some (but not all) children are checked.
 */
export const IndeterminateExample: Story = {
  render: function IndeterminateDemo() {
    const [items, setItems] = useState([
      { id: 'item1', label: 'Divoká voda (DV)', checked: true },
      { id: 'item2', label: 'Rychlostní (RY)', checked: false },
      { id: 'item3', label: 'Vodní turistika (VT)', checked: true },
    ]);

    const allChecked = items.every((item) => item.checked);
    const someChecked = items.some((item) => item.checked);
    const indeterminate = someChecked && !allChecked;

    const handleParentChange = () => {
      const newChecked = !allChecked;
      setItems(items.map((item) => ({ ...item, checked: newChecked })));
    };

    const handleItemChange = (id: string) => {
      setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Checkbox
          label="Všechny sekce"
          checked={allChecked}
          indeterminate={indeterminate}
          onChange={handleParentChange}
          style={{ fontWeight: 500 }}
        />
        <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {items.map((item) => (
            <Checkbox
              key={item.id}
              label={item.label}
              checked={item.checked}
              onChange={() => handleItemChange(item.id)}
            />
          ))}
        </div>
      </div>
    );
  },
};

/* ==========================================================================
   WITHOUT LABEL
   ========================================================================== */

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Select this item',
  },
};

/* ==========================================================================
   CSK-SPECIFIC EXAMPLES
   ========================================================================== */

/**
 * Registration form example with typical CSK checkboxes.
 */
export const RegistrationForm: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <Checkbox
        label="Souhlasím s pravidly ČSK pro registraci závodníků"
        helperText="Pravidla jsou k dispozici na webu ČSK"
      />
      <Checkbox
        label="Souhlasím se zpracováním osobních údajů (GDPR)"
        helperText="Vaše data budou použita pouze pro účely registrace"
      />
      <Checkbox label="Chci dostávat informační newsletter ČSK" defaultChecked />
      <Checkbox label="Mám platnou zdravotní prohlídku" state="error" errorMessage="Toto pole je povinné" />
    </div>
  ),
};

/**
 * Event filter example for race calendar.
 */
export const EventFilters: Story = {
  render: function EventFiltersDemo() {
    const [filters, setFilters] = useState({
      dv: true,
      ry: false,
      vt: true,
      m: true,
      a: false,
      b: false,
      c: false,
    });

    const toggleFilter = (key: keyof typeof filters) => {
      setFilters({ ...filters, [key]: !filters[key] });
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <p style={{ marginBottom: '8px', fontWeight: 500, fontSize: '14px', color: 'var(--color-text-primary)' }}>
            Sekce
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Checkbox label="Divoká voda" checked={filters.dv} onChange={() => toggleFilter('dv')} />
            <Checkbox label="Rychlostní" checked={filters.ry} onChange={() => toggleFilter('ry')} />
            <Checkbox label="Vodní turistika" checked={filters.vt} onChange={() => toggleFilter('vt')} />
          </div>
        </div>
        <div>
          <p style={{ marginBottom: '8px', fontWeight: 500, fontSize: '14px', color: 'var(--color-text-primary)' }}>
            VT Třída závodu
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Checkbox label="M" checked={filters.m} onChange={() => toggleFilter('m')} />
            <Checkbox label="A" checked={filters.a} onChange={() => toggleFilter('a')} />
            <Checkbox label="B" checked={filters.b} onChange={() => toggleFilter('b')} />
            <Checkbox label="C" checked={filters.c} onChange={() => toggleFilter('c')} />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Results table selection example.
 */
export const TableSelection: Story = {
  render: function TableSelectionDemo() {
    const [selected, setSelected] = useState<string[]>(['athlete2']);
    const athletes = [
      { id: 'athlete1', name: 'Jan Novák', club: 'USK Praha' },
      { id: 'athlete2', name: 'Petra Svobodová', club: 'Dukla Praha' },
      { id: 'athlete3', name: 'Martin Dvořák', club: 'Bohemians' },
    ];

    const allSelected = selected.length === athletes.length;
    const someSelected = selected.length > 0 && !allSelected;

    const handleSelectAll = () => {
      if (allSelected) {
        setSelected([]);
      } else {
        setSelected(athletes.map((a) => a.id));
      }
    };

    const handleSelect = (id: string) => {
      if (selected.includes(id)) {
        setSelected(selected.filter((s) => s !== id));
      } else {
        setSelected([...selected, id]);
      }
    };

    return (
      <table style={{ borderCollapse: 'collapse', width: '400px' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', borderBottom: '2px solid var(--color-border-default)', textAlign: 'left' }}>
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onChange={handleSelectAll}
                aria-label="Select all athletes"
              />
            </th>
            <th style={{ padding: '8px', borderBottom: '2px solid var(--color-border-default)', textAlign: 'left' }}>
              Jméno
            </th>
            <th style={{ padding: '8px', borderBottom: '2px solid var(--color-border-default)', textAlign: 'left' }}>
              Klub
            </th>
          </tr>
        </thead>
        <tbody>
          {athletes.map((athlete) => (
            <tr key={athlete.id}>
              <td style={{ padding: '8px', borderBottom: '1px solid var(--color-border-default)' }}>
                <Checkbox
                  checked={selected.includes(athlete.id)}
                  onChange={() => handleSelect(athlete.id)}
                  aria-label={`Select ${athlete.name}`}
                />
              </td>
              <td style={{ padding: '8px', borderBottom: '1px solid var(--color-border-default)' }}>{athlete.name}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid var(--color-border-default)' }}>{athlete.club}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
};
