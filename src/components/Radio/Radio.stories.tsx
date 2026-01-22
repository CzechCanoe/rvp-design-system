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
   DEFAULT
   ========================================================================== */

export const Default: Story = {
  args: {
    label: 'Option A',
    name: 'basic',
  },
};

/* ==========================================================================
   RADIO GROUP
   ========================================================================== */

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
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons in a group where only one option can be selected.',
      },
    },
  },
};

/* ==========================================================================
   SIZES
   ========================================================================== */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Radio size="sm" label="Small radio" name="sizes" />
      <Radio size="md" label="Medium radio (default)" name="sizes" />
      <Radio size="lg" label="Large radio" name="sizes" />
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
      <Radio label="Default state" name="states-1" defaultChecked />
      <Radio label="Error state" state="error" errorMessage="Please select a valid option" name="states-2" />
      <Radio label="Success state" state="success" defaultChecked helperText="Valid selection" name="states-3" />
      <Radio label="Disabled unchecked" disabled name="states-4" />
      <Radio label="Disabled checked" disabled defaultChecked name="states-5" />
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
   CSK EXAMPLE: DISCIPLINE SELECTION
   ========================================================================== */

export const DisciplineSelection: Story = {
  name: 'Example: Discipline Selection',
  render: function DisciplineSelectionDemo() {
    const [discipline, setDiscipline] = useState('dv');

    return (
      <div>
        <p style={{ marginBottom: '12px', fontWeight: 500, fontSize: '14px', color: 'var(--color-text-primary)' }}>
          Select section
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
  parameters: {
    docs: {
      description: {
        story: 'CSK discipline selection example.',
      },
    },
  },
};
