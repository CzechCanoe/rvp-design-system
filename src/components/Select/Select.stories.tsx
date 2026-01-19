import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the select',
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Validation state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes the select take full width',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below select',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message (shows when state is error)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text (first disabled option)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// Sample options for demos
const countryOptions = [
  { value: 'cz', label: 'Česká republika' },
  { value: 'sk', label: 'Slovensko' },
  { value: 'pl', label: 'Polsko' },
  { value: 'de', label: 'Německo' },
  { value: 'at', label: 'Rakousko' },
];

const disciplineOptions = [
  { value: 'dv', label: 'Divoká voda' },
  { value: 'ry', label: 'Rychlostní kanoistika' },
  { value: 'vt', label: 'Vodní turistika' },
];

const categoryOptions = [
  { value: 'k1m', label: 'K1 muži' },
  { value: 'k1w', label: 'K1 ženy' },
  { value: 'c1m', label: 'C1 muži' },
  { value: 'c1w', label: 'C1 ženy' },
  { value: 'c2m', label: 'C2 muži' },
  { value: 'c2x', label: 'C2 mix' },
];

const yearOptions = [
  { value: '2026', label: '2026' },
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
];

const vtClassOptions = [
  { value: 'm', label: 'Třída M (Mistr)' },
  { value: 'a', label: 'Třída A' },
  { value: 'b', label: 'Třída B' },
  { value: 'c', label: 'Třída C' },
];

// Basic examples
export const Default: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Vyberte zemi...',
  },
};

export const WithLabel: Story = {
  args: {
    options: countryOptions,
    label: 'Země',
    placeholder: 'Vyberte zemi...',
  },
};

export const WithHelperText: Story = {
  args: {
    options: disciplineOptions,
    label: 'Disciplína',
    placeholder: 'Vyberte disciplínu...',
    helperText: 'Vyberte hlavní disciplínu závodníka',
  },
};

// Sizes
export const Small: Story = {
  args: {
    options: yearOptions,
    size: 'sm',
    placeholder: 'Rok...',
  },
};

export const Medium: Story = {
  args: {
    options: yearOptions,
    size: 'md',
    placeholder: 'Rok...',
  },
};

export const Large: Story = {
  args: {
    options: yearOptions,
    size: 'lg',
    placeholder: 'Rok...',
  },
};

// States
export const ErrorState: Story = {
  args: {
    options: disciplineOptions,
    label: 'Disciplína',
    state: 'error',
    errorMessage: 'Vyberte prosím disciplínu',
    placeholder: 'Vyberte disciplínu...',
  },
};

export const SuccessState: Story = {
  args: {
    options: disciplineOptions,
    label: 'Disciplína',
    state: 'success',
    helperText: 'Disciplína vybrána',
    defaultValue: 'dv',
  },
};

export const Disabled: Story = {
  args: {
    options: disciplineOptions,
    label: 'Disciplína',
    disabled: true,
    placeholder: 'Nelze změnit',
  },
};

// With icons
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18" />
    <path d="M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 1012 0V2z" />
  </svg>
);

const TagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01" />
  </svg>
);

export const WithLeftIcon: Story = {
  args: {
    options: countryOptions,
    iconLeft: <GlobeIcon />,
    placeholder: 'Vyberte zemi...',
  },
};

export const CountrySelect: Story = {
  args: {
    options: countryOptions,
    label: 'Země',
    iconLeft: <GlobeIcon />,
    placeholder: 'Vyberte zemi...',
    helperText: 'Země reprezentace závodníka',
  },
};

export const YearSelect: Story = {
  args: {
    options: yearOptions,
    label: 'Sezóna',
    iconLeft: <CalendarIcon />,
    placeholder: 'Vyberte rok...',
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    options: categoryOptions,
    fullWidth: true,
    label: 'Kategorie',
    placeholder: 'Vyberte kategorii...',
  },
  parameters: {
    layout: 'padded',
  },
};

// Controlled select with state
const ControlledSelectTemplate = () => {
  const [value, setValue] = useState('');

  return (
    <div style={{ width: '280px' }}>
      <Select
        options={disciplineOptions}
        label="Disciplína"
        placeholder="Vyberte disciplínu..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText={value ? `Vybraná hodnota: ${value}` : 'Zatím nevybráno'}
      />
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledSelectTemplate />,
};

// With disabled options
const optionsWithDisabled = [
  { value: 'k1m', label: 'K1 muži' },
  { value: 'k1w', label: 'K1 ženy' },
  { value: 'c1m', label: 'C1 muži', disabled: true },
  { value: 'c1w', label: 'C1 ženy', disabled: true },
  { value: 'c2m', label: 'C2 muži' },
];

export const WithDisabledOptions: Story = {
  args: {
    options: optionsWithDisabled,
    label: 'Kategorie',
    placeholder: 'Vyberte kategorii...',
    helperText: 'Některé kategorie nejsou dostupné',
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px' }}>
      <Select
        size="sm"
        options={yearOptions}
        placeholder="Small"
        label="Small"
      />
      <Select
        size="md"
        options={yearOptions}
        placeholder="Medium"
        label="Medium"
      />
      <Select
        size="lg"
        options={yearOptions}
        placeholder="Large"
        label="Large"
      />
    </div>
  ),
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px' }}>
      <Select
        options={disciplineOptions}
        label="Default"
        placeholder="Default state"
        helperText="This is helper text"
      />
      <Select
        options={disciplineOptions}
        label="Error"
        state="error"
        placeholder="Error state"
        errorMessage="This field is required"
      />
      <Select
        options={disciplineOptions}
        label="Success"
        state="success"
        defaultValue="dv"
        helperText="Looks good!"
      />
      <Select
        options={disciplineOptions}
        label="Disabled"
        disabled
        placeholder="Disabled state"
        helperText="Cannot change this field"
      />
    </div>
  ),
};

// Sizes with icons showcase
export const SizesWithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px' }}>
      <Select
        size="sm"
        options={countryOptions}
        iconLeft={<GlobeIcon />}
        placeholder="Small with icon"
      />
      <Select
        size="md"
        options={countryOptions}
        iconLeft={<GlobeIcon />}
        placeholder="Medium with icon"
      />
      <Select
        size="lg"
        options={countryOptions}
        iconLeft={<GlobeIcon />}
        placeholder="Large with icon"
      />
    </div>
  ),
};

// CSK-specific: Registration form example
export const RegistrationForm: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px' }}>
      <Select
        options={countryOptions}
        label="Země"
        iconLeft={<GlobeIcon />}
        placeholder="Vyberte zemi..."
      />
      <Select
        options={disciplineOptions}
        label="Disciplína"
        iconLeft={<TrophyIcon />}
        placeholder="Vyberte disciplínu..."
      />
      <Select
        options={categoryOptions}
        label="Kategorie"
        iconLeft={<TagIcon />}
        placeholder="Vyberte kategorii..."
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// CSK-specific: VT class selection
export const VTClassSelect: Story = {
  args: {
    options: vtClassOptions,
    label: 'Třída VT',
    placeholder: 'Vyberte třídu...',
    helperText: 'Vodácká třída závodníka',
  },
};

// Filter form example
export const FilterForm: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
      <Select
        size="sm"
        options={yearOptions}
        placeholder="Rok"
        iconLeft={<CalendarIcon />}
      />
      <Select
        size="sm"
        options={disciplineOptions}
        placeholder="Disciplína"
      />
      <Select
        size="sm"
        options={categoryOptions}
        placeholder="Kategorie"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
