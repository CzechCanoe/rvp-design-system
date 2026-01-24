import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'search', 'number', 'tel', 'url'],
      description: 'Input type',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Validation state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes the input take full width',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below input',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message (shows when state is error)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    clearable: {
      control: 'boolean',
      description: 'Shows clear button when input has value',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/* ==========================================================================
   DEFAULT
   ========================================================================== */

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

/* ==========================================================================
   WITH LABEL AND HELPER
   ========================================================================== */

export const WithLabelAndHelper: Story = {
  args: {
    label: 'Email address',
    type: 'email',
    placeholder: 'you@example.com',
    helperText: 'We will never share your email.',
  },
};

/* ==========================================================================
   TYPES
   ========================================================================== */

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px' }}>
      <Input type="text" label="Text" placeholder="Enter text" />
      <Input type="email" label="Email" placeholder="you@example.com" />
      <Input type="password" label="Password" placeholder="Enter password" />
      <Input type="number" label="Number" placeholder="123" />
      <Input type="search" placeholder="Search..." />
      <Input type="tel" label="Phone" placeholder="+420 xxx xxx xxx" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common input types: text, email, password, number, search, tel.',
      },
    },
  },
};

/* ==========================================================================
   SIZES
   ========================================================================== */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px' }}>
      <Input size="sm" placeholder="Small" label="Small" />
      <Input size="md" placeholder="Medium" label="Medium (default)" />
      <Input size="lg" placeholder="Large" label="Large" />
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
      <Input
        label="Default"
        placeholder="Default state"
        helperText="This is helper text"
      />
      <Input
        label="Error"
        state="error"
        placeholder="Error state"
        errorMessage="This field is required"
      />
      <Input
        label="Success"
        state="success"
        placeholder="Success state"
        helperText="Looks good!"
      />
      <Input
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
   WITH ICONS
   ========================================================================== */

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px' }}>
      <Input iconLeft={<SearchIcon />} placeholder="Search..." />
      <Input iconLeft={<MailIcon />} type="email" label="Email" placeholder="you@example.com" />
      <Input iconLeft={<LockIcon />} type="password" label="Password" placeholder="Enter password" />
      <Input iconRight={<CheckIcon />} state="success" placeholder="Valid input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Inputs with left or right icons.',
      },
    },
  },
};

/* ==========================================================================
   CLEARABLE SEARCH
   ========================================================================== */

export const ClearableSearch: Story = {
  render: function ClearableSearchTemplate() {
    const [value, setValue] = useState('');

    return (
      <div style={{ width: '280px' }}>
        <Input
          type="search"
          iconLeft={<SearchIcon />}
          placeholder="Search athletes..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          clearable
          onClear={() => setValue('')}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Search input with clearable button.',
      },
    },
  },
};

/* ==========================================================================
   CSK EXAMPLE: FORM
   ========================================================================== */

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const FormExample: Story = {
  name: 'Example: Registration Form',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px' }}>
      <Input
        label="Full name"
        iconLeft={<UserIcon />}
        placeholder="Jan Novák"
      />
      <Input
        type="email"
        label="Email"
        iconLeft={<MailIcon />}
        placeholder="jan.novak@example.com"
      />
      <Input
        type="password"
        label="Password"
        iconLeft={<LockIcon />}
        placeholder="••••••••"
        helperText="At least 8 characters"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Registration form example with various input types.',
      },
    },
  },
};

/* ==========================================================================
   AESTHETIC ENHANCEMENTS
   ========================================================================== */

export const EnergyFocus: Story = {
  name: 'Aesthetic: Energy Focus',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Primary Focus (default)</h4>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Energy Focus (coral-orange)</h4>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          energyFocus
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Energy focus ring uses vibrant coral-orange glow instead of primary blue. Perfect for CTAs and forms that need to stand out.',
      },
    },
  },
};

export const DisplayLabel: Story = {
  name: 'Aesthetic: Display Label',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Standard Label</h4>
        <Input
          label="Jméno závodníka"
          placeholder="Jan Novák"
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Display Label (Plus Jakarta Sans)</h4>
        <Input
          label="Jméno závodníka"
          placeholder="Jan Novák"
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
        Registrace závodníka
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input
          label="Jméno a příjmení"
          iconLeft={<UserIcon />}
          placeholder="Jan Novák"
          displayLabel
          energyFocus
          size="lg"
        />
        <Input
          type="email"
          label="Email"
          iconLeft={<MailIcon />}
          placeholder="jan.novak@example.com"
          displayLabel
          energyFocus
          size="lg"
        />
        <Input
          type="password"
          label="Heslo"
          iconLeft={<LockIcon />}
          placeholder="••••••••"
          helperText="Minimálně 8 znaků"
          displayLabel
          energyFocus
          size="lg"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Hero registration form combining display labels, energy focus, and large size for maximum visual impact.',
      },
    },
  },
};
