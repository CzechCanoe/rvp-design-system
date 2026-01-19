import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio } from './Radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Radio component for single selection from a group. Supports multiple sizes and validation states. Use the same `name` prop to create exclusive selection groups.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the radio button',
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Validation state',
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
      description: 'Helper text below radio',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message (shown when state is error)',
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ==========================================================================
   BASIC EXAMPLES
   ========================================================================== */

export const Default: Story = {
  args: {
    label: 'Option A',
    name: 'basic',
  },
};

export const Checked: Story = {
  args: {
    label: 'Selected option',
    name: 'checked',
    defaultChecked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Premium membership',
    helperText: 'Includes all features and priority support',
    name: 'helper',
  },
};

/* ==========================================================================
   SIZES
   ========================================================================== */

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small radio',
    name: 'size-sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Medium radio (default)',
    name: 'size-md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large radio',
    name: 'size-lg',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Radio size="sm" label="Small radio" name="all-sizes" />
      <Radio size="md" label="Medium radio (default)" name="all-sizes" />
      <Radio size="lg" label="Large radio" name="all-sizes" />
    </div>
  ),
};

/* ==========================================================================
   STATES
   ========================================================================== */

export const Disabled: Story = {
  args: {
    label: 'Disabled radio',
    disabled: true,
    name: 'disabled',
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked radio',
    disabled: true,
    defaultChecked: true,
    name: 'disabled-checked',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Invalid selection',
    state: 'error',
    errorMessage: 'Please select a valid option',
    name: 'error',
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Verified selection',
    state: 'success',
    defaultChecked: true,
    helperText: 'This option is available',
    name: 'success',
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Radio label="Default state" name="states-1" defaultChecked />
      <Radio label="Error state" state="error" errorMessage="This field is required" name="states-2" />
      <Radio label="Success state" state="success" defaultChecked helperText="Valid selection" name="states-3" />
      <Radio label="Disabled unchecked" disabled name="states-4" />
      <Radio label="Disabled checked" disabled defaultChecked name="states-5" />
    </div>
  ),
};

/* ==========================================================================
   RADIO GROUP (main use case)
   ========================================================================== */

/**
 * Radio buttons are typically used in groups where only one option can be selected.
 * Use the same `name` prop for all radios in a group.
 */
export const RadioGroup: Story = {
  render: function RadioGroupDemo() {
    const [selected, setSelected] = useState('option2');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Radio
          label="Option 1"
          name="group"
          value="option1"
          checked={selected === 'option1'}
          onChange={() => setSelected('option1')}
        />
        <Radio
          label="Option 2"
          name="group"
          value="option2"
          checked={selected === 'option2'}
          onChange={() => setSelected('option2')}
        />
        <Radio
          label="Option 3"
          name="group"
          value="option3"
          checked={selected === 'option3'}
          onChange={() => setSelected('option3')}
        />
      </div>
    );
  },
};

/* ==========================================================================
   WITHOUT LABEL
   ========================================================================== */

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Select this option',
    name: 'no-label',
  },
};

/* ==========================================================================
   CSK-SPECIFIC EXAMPLES
   ========================================================================== */

/**
 * Section selection for filtering races by discipline.
 */
export const DisciplineSelection: Story = {
  render: function DisciplineSelectionDemo() {
    const [discipline, setDiscipline] = useState('dv');

    return (
      <div>
        <p style={{ marginBottom: '12px', fontWeight: 500, fontSize: '14px', color: 'var(--color-text-primary)' }}>
          Vyberte sekci
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Radio
            label="Divoká voda (DV)"
            helperText="Slalom, sjezd, freestyle"
            name="discipline"
            value="dv"
            checked={discipline === 'dv'}
            onChange={() => setDiscipline('dv')}
          />
          <Radio
            label="Rychlostní (RY)"
            helperText="Sprint, maratonská kanoistika"
            name="discipline"
            value="ry"
            checked={discipline === 'ry'}
            onChange={() => setDiscipline('ry')}
          />
          <Radio
            label="Vodní turistika (VT)"
            helperText="Rekreační a turistické akce"
            name="discipline"
            value="vt"
            checked={discipline === 'vt'}
            onChange={() => setDiscipline('vt')}
          />
        </div>
      </div>
    );
  },
};

/**
 * VT class selection for race registration.
 */
export const VTClassSelection: Story = {
  render: function VTClassSelectionDemo() {
    const [vtClass, setVtClass] = useState<string | null>(null);

    return (
      <div>
        <p style={{ marginBottom: '12px', fontWeight: 500, fontSize: '14px', color: 'var(--color-text-primary)' }}>
          Třída závodu VT
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Radio
            label="M"
            helperText="Mistrovství"
            name="vt-class"
            value="m"
            checked={vtClass === 'm'}
            onChange={() => setVtClass('m')}
          />
          <Radio
            label="A"
            helperText="Třída A"
            name="vt-class"
            value="a"
            checked={vtClass === 'a'}
            onChange={() => setVtClass('a')}
          />
          <Radio
            label="B"
            helperText="Třída B"
            name="vt-class"
            value="b"
            checked={vtClass === 'b'}
            onChange={() => setVtClass('b')}
          />
          <Radio
            label="C"
            helperText="Třída C"
            name="vt-class"
            value="c"
            checked={vtClass === 'c'}
            onChange={() => setVtClass('c')}
          />
        </div>
      </div>
    );
  },
};

/**
 * Membership type selection for registration.
 */
export const MembershipSelection: Story = {
  render: function MembershipSelectionDemo() {
    const [membership, setMembership] = useState('regular');

    return (
      <div style={{ maxWidth: '400px' }}>
        <p style={{ marginBottom: '12px', fontWeight: 500, fontSize: '14px', color: 'var(--color-text-primary)' }}>
          Typ členství
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Radio
            label="Řádné členství"
            helperText="Plná práva a možnost startovat na všech závodech"
            name="membership"
            value="regular"
            checked={membership === 'regular'}
            onChange={() => setMembership('regular')}
          />
          <Radio
            label="Přidružené členství"
            helperText="Omezená práva, pouze vybrané závody"
            name="membership"
            value="associated"
            checked={membership === 'associated'}
            onChange={() => setMembership('associated')}
          />
          <Radio
            label="Čestné členství"
            helperText="Pro zasloužilé členy svazu"
            name="membership"
            value="honorary"
            disabled
            checked={membership === 'honorary'}
            onChange={() => setMembership('honorary')}
          />
        </div>
      </div>
    );
  },
};

/**
 * Gender selection for athlete profile.
 */
export const GenderSelection: Story = {
  render: function GenderSelectionDemo() {
    const [gender, setGender] = useState<string | null>(null);
    const hasError = gender === null;

    return (
      <div>
        <p style={{ marginBottom: '12px', fontWeight: 500, fontSize: '14px', color: 'var(--color-text-primary)' }}>
          Pohlaví *
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Radio
            label="Muž"
            name="gender"
            value="male"
            state={hasError ? 'error' : 'default'}
            checked={gender === 'male'}
            onChange={() => setGender('male')}
          />
          <Radio
            label="Žena"
            name="gender"
            value="female"
            state={hasError ? 'error' : 'default'}
            checked={gender === 'female'}
            onChange={() => setGender('female')}
          />
        </div>
        {hasError && (
          <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--color-error-500)' }}>Vyberte pohlaví</p>
        )}
      </div>
    );
  },
};

/**
 * Payment method selection.
 */
export const PaymentMethod: Story = {
  render: function PaymentMethodDemo() {
    const [method, setMethod] = useState('transfer');

    return (
      <div style={{ maxWidth: '400px' }}>
        <p style={{ marginBottom: '12px', fontWeight: 500, fontSize: '14px', color: 'var(--color-text-primary)' }}>
          Způsob platby
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Radio
            label="Bankovní převod"
            helperText="Platba do 14 dnů od registrace"
            name="payment"
            value="transfer"
            checked={method === 'transfer'}
            onChange={() => setMethod('transfer')}
          />
          <Radio
            label="Platba kartou online"
            helperText="Okamžité potvrzení registrace"
            name="payment"
            value="card"
            checked={method === 'card'}
            onChange={() => setMethod('card')}
          />
          <Radio
            label="Hotově na místě"
            helperText="Pouze pro závody třídy B a C"
            name="payment"
            value="cash"
            checked={method === 'cash'}
            onChange={() => setMethod('cash')}
          />
        </div>
      </div>
    );
  },
};
