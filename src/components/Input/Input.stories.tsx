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

// Basic examples
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email address',
    type: 'email',
    placeholder: 'you@example.com',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    helperText: 'Choose a unique username',
  },
};

// Types
export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter password',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    label: 'Email',
    placeholder: 'you@example.com',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    label: 'Age',
    placeholder: '25',
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search athletes...',
  },
};

export const Tel: Story = {
  args: {
    type: 'tel',
    label: 'Phone',
    placeholder: '+420 xxx xxx xxx',
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small input',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    placeholder: 'Medium input',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large input',
  },
};

// States
export const ErrorState: Story = {
  args: {
    label: 'Email',
    state: 'error',
    errorMessage: 'Please enter a valid email address',
    placeholder: 'you@example.com',
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Username',
    state: 'success',
    helperText: 'Username is available',
    placeholder: 'Enter username',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled input',
    disabled: true,
    placeholder: 'Cannot edit',
  },
};

// With icons
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

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const WithLeftIcon: Story = {
  args: {
    iconLeft: <SearchIcon />,
    placeholder: 'Search...',
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Username',
    iconRight: <CheckIcon />,
    placeholder: 'Enter username',
    state: 'success',
  },
};

export const EmailWithIcon: Story = {
  args: {
    type: 'email',
    label: 'Email address',
    iconLeft: <MailIcon />,
    placeholder: 'you@example.com',
  },
};

export const PasswordWithIcon: Story = {
  args: {
    type: 'password',
    label: 'Password',
    iconLeft: <LockIcon />,
    placeholder: 'Enter password',
  },
};

// Clearable search input with controlled state
const ClearableSearchTemplate = () => {
  const [value, setValue] = useState('');

  return (
    <div style={{ width: '300px' }}>
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
};

export const ClearableSearch: Story = {
  render: () => <ClearableSearchTemplate />,
};

// Full width
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    label: 'Full name',
    placeholder: 'Enter your full name',
  },
  parameters: {
    layout: 'padded',
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input size="sm" placeholder="Small input" label="Small" />
      <Input size="md" placeholder="Medium input" label="Medium" />
      <Input size="lg" placeholder="Large input" label="Large" />
    </div>
  ),
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
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
        helperText="Cannot edit this field"
      />
    </div>
  ),
};

// Form example
export const FormExample: Story = {
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
  },
};

// Sizes with icons showcase
export const SizesWithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input
        size="sm"
        iconLeft={<SearchIcon />}
        placeholder="Small with icon"
      />
      <Input
        size="md"
        iconLeft={<SearchIcon />}
        placeholder="Medium with icon"
      />
      <Input
        size="lg"
        iconLeft={<SearchIcon />}
        placeholder="Large with icon"
      />
    </div>
  ),
};
