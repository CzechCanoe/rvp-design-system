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
   DEFAULT
   ========================================================================== */

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

/* ==========================================================================
   SIZES
   ========================================================================== */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox (default)" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three sizes: sm (16px), md (20px), lg (24px).',
      },
    },
  },
};

/* ==========================================================================
   STATES
   ========================================================================== */

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox label="Default state" defaultChecked />
      <Checkbox label="Error state" state="error" errorMessage="This field is required" />
      <Checkbox label="Success state" state="success" defaultChecked helperText="Valid selection" />
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
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
   INDETERMINATE
   ========================================================================== */

export const Indeterminate: Story = {
  render: function IndeterminateDemo() {
    const [items, setItems] = useState([
      { id: 'dv', label: 'Divoká voda (DV)', checked: true },
      { id: 'ry', label: 'Rychlostní (RY)', checked: false },
      { id: 'vt', label: 'Vodní turistika (VT)', checked: true },
    ]);

    const allChecked = items.every((item) => item.checked);
    const someChecked = items.some((item) => item.checked);
    const indeterminate = someChecked && !allChecked;

    const handleParentChange = () => {
      setItems(items.map((item) => ({ ...item, checked: !allChecked })));
    };

    const handleItemChange = (id: string) => {
      setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Checkbox
          label="All sections"
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
  parameters: {
    docs: {
      description: {
        story: 'Indeterminate state for parent checkbox when some children are checked.',
      },
    },
  },
};

/* ==========================================================================
   CSK EXAMPLE: REGISTRATION FORM
   ========================================================================== */

export const RegistrationForm: Story = {
  name: 'Example: Registration Form',
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
  parameters: {
    docs: {
      description: {
        story: 'Registration form example with CSK-specific checkboxes.',
      },
    },
  },
};
