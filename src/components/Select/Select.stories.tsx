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
    energyFocus: {
      control: 'boolean',
      description: 'Use energy (coral-orange) focus ring',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// Sample options
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
];

const yearOptions = [
  { value: '2026', label: '2026' },
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
];

/* ==========================================================================
   DEFAULT
   ========================================================================== */

export const Default: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Select country...',
    label: 'Country',
  },
};

/* ==========================================================================
   WITH LABEL AND HELPER
   ========================================================================== */

export const WithLabelAndHelper: Story = {
  args: {
    options: disciplineOptions,
    label: 'Discipline',
    placeholder: 'Select discipline...',
    helperText: 'Choose the main discipline of the athlete',
  },
};

/* ==========================================================================
   SIZES
   ========================================================================== */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px' }}>
      <Select size="sm" options={yearOptions} placeholder="Small" label="Small" />
      <Select size="md" options={yearOptions} placeholder="Medium" label="Medium (default)" />
      <Select size="lg" options={yearOptions} placeholder="Large" label="Large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three sizes: sm (32px), md (40px), lg (48px).',
      },
    },
  },
};

/* ==========================================================================
   STATES
   ========================================================================== */

export const States: Story = {
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
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Validation states: default, error, success, and disabled.',
      },
    },
  },
};

/* ==========================================================================
   WITH ICON
   ========================================================================== */

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

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px' }}>
      <Select
        options={countryOptions}
        label="Country"
        iconLeft={<GlobeIcon />}
        placeholder="Select country..."
      />
      <Select
        options={yearOptions}
        label="Season"
        iconLeft={<CalendarIcon />}
        placeholder="Select year..."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Selects with left icon.',
      },
    },
  },
};

/* ==========================================================================
   WITH DISABLED OPTIONS
   ========================================================================== */

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'k1m', label: 'K1 muži' },
      { value: 'k1w', label: 'K1 ženy' },
      { value: 'c1m', label: 'C1 muži', disabled: true },
      { value: 'c1w', label: 'C1 ženy', disabled: true },
      { value: 'c2m', label: 'C2 muži' },
    ],
    label: 'Category',
    placeholder: 'Select category...',
    helperText: 'Some categories are unavailable',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select with some disabled options.',
      },
    },
  },
};

/* ==========================================================================
   CSK EXAMPLE: FILTER FORM
   ========================================================================== */

export const FilterForm: Story = {
  name: 'Example: Filter Form',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
      <Select size="sm" options={yearOptions} aria-label="Year" placeholder="Year" iconLeft={<CalendarIcon />} />
      <Select size="sm" options={disciplineOptions} aria-label="Discipline" placeholder="Discipline" />
      <Select size="sm" options={categoryOptions} aria-label="Category" placeholder="Category" />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Filter form with compact selects.',
      },
    },
  },
};

/* ==========================================================================
   AESTHETIC ENHANCEMENTS
   ========================================================================== */

export const DisplayLabel: Story = {
  name: 'Aesthetic: Display Label',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Standard Label</h4>
        <Select
          options={categoryOptions}
          label="Kategorie"
          placeholder="Vyberte kategorii..."
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Display Label (Plus Jakarta Sans)</h4>
        <Select
          options={categoryOptions}
          label="Kategorie"
          placeholder="Vyberte kategorii..."
          displayLabel
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Display label uses Plus Jakarta Sans font for aesthetic emphasis. Use for hero forms and prominent inputs.',
      },
    },
  },
};

export const AestheticForm: Story = {
  name: 'Aesthetic: Hero Registration Form',
  render: () => (
    <div
      style={{
        padding: '32px',
        background: 'var(--bg-mesh-primary, linear-gradient(135deg, rgba(17, 118, 166, 0.1) 0%, rgba(249, 115, 22, 0.05) 100%))',
        borderRadius: '16px',
        maxWidth: '400px',
      }}
    >
      <h2 style={{ margin: '0 0 24px 0', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700 }}>
        Registrace na závod
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Select
          options={disciplineOptions}
          label="Disciplína"
          placeholder="Vyberte disciplínu..."
          displayLabel
          size="lg"
        />
        <Select
          options={categoryOptions}
          label="Kategorie"
          placeholder="Vyberte kategorii..."
          displayLabel
          size="lg"
        />
        <Select
          options={countryOptions}
          label="Země"
          placeholder="Vyberte zemi..."
          iconLeft={<GlobeIcon />}
          displayLabel
          size="lg"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Hero registration form combining display labels and large size for visual impact.',
      },
    },
  },
};

/* ==========================================================================
   ENERGY FOCUS
   ========================================================================== */

export const EnergyFocus: Story = {
  name: 'Aesthetic: Energy Focus',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '280px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>Standard focus (blue)</h4>
        <Select
          options={categoryOptions}
          label="Standardní"
          placeholder="Click to focus..."
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>Energy focus (coral-orange)</h4>
        <Select
          options={categoryOptions}
          label="S energy focus"
          placeholder="Click to focus..."
          energyFocus
        />
      </div>
      <div style={{ fontSize: '12px', color: '#666' }}>
        Energy focus uses coral-orange accent for prominent selects like registration deadlines or CTA forms.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Energy focus uses coral-orange accent for prominent selects. Use for CTAs, deadlines, and live features.',
      },
    },
  },
};
