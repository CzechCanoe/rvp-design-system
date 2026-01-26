import type { Meta, StoryObj } from '@storybook/react';
import { Wizard } from './Wizard';
import { Icon } from '../Icon';
import { Card } from '../Card';

const meta: Meta<typeof Wizard> = {
  title: 'Components/Wizard',
  component: Wizard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    section: {
      control: 'select',
      options: [undefined, 'dv', 'ry', 'vt', 'generic'],
      description: 'Section color variant',
    },
    activeStep: {
      control: { type: 'number', min: 0, max: 4 },
      description: 'Currently active step (index or id)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Wizard>;

// ============================================================================
// Basic Steps Data
// ============================================================================

const threeSteps = [
  { id: 'info', label: 'Personal Info' },
  { id: 'contact', label: 'Contact Details' },
  { id: 'confirm', label: 'Confirmation' },
];

const fourSteps = [
  { id: 'info', label: 'Personal Info' },
  { id: 'medical', label: 'Medical Check' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirm', label: 'Confirmation' },
];

const stepsWithIcons = [
  { id: 'info', label: 'Personal Info', icon: <Icon name="user" size="sm" /> },
  { id: 'medical', label: 'Medical', icon: <Icon name="medical" size="sm" /> },
  { id: 'payment', label: 'Payment', icon: <Icon name="credit-card" size="sm" /> },
  { id: 'confirm', label: 'Confirmation', icon: <Icon name="check-circle" size="sm" /> },
];

const stepsWithDescriptions = [
  { id: 'info', label: 'Personal Info', description: 'Name, birth date, etc.' },
  { id: 'contact', label: 'Contact', description: 'Email and phone' },
  { id: 'confirm', label: 'Confirmation', description: 'Review and submit' },
];

// ============================================================================
// Basic Stories
// ============================================================================

export const Default: Story = {
  args: {
    steps: threeSteps,
    activeStep: 0,
  },
};

export const ThreeSteps: Story = {
  args: {
    steps: threeSteps,
    activeStep: 1,
  },
};

export const FourSteps: Story = {
  args: {
    steps: fourSteps,
    activeStep: 2,
  },
};

export const FirstStepActive: Story = {
  args: {
    steps: threeSteps,
    activeStep: 0,
  },
};

export const LastStepActive: Story = {
  args: {
    steps: threeSteps,
    activeStep: 2,
  },
};

export const AllCompleted: Story = {
  args: {
    steps: threeSteps,
    activeStep: 2,
    completedSteps: ['info', 'contact', 'confirm'],
  },
};

// ============================================================================
// With Icons
// ============================================================================

export const WithIcons: Story = {
  args: {
    steps: stepsWithIcons,
    activeStep: 1,
  },
};

export const WithIconsCompleted: Story = {
  args: {
    steps: stepsWithIcons,
    activeStep: 2,
    completedSteps: ['info', 'medical'],
  },
};

// ============================================================================
// With Descriptions
// ============================================================================

export const WithDescriptions: Story = {
  args: {
    steps: stepsWithDescriptions,
    activeStep: 1,
  },
};

// ============================================================================
// Section Colors
// ============================================================================

export const SectionDV: Story = {
  args: {
    steps: fourSteps,
    activeStep: 1,
    section: 'dv',
  },
};

export const SectionRY: Story = {
  args: {
    steps: fourSteps,
    activeStep: 1,
    section: 'ry',
  },
};

export const SectionVT: Story = {
  args: {
    steps: fourSteps,
    activeStep: 1,
    section: 'vt',
  },
};

// ============================================================================
// Sizes
// ============================================================================

export const SizeSmall: Story = {
  args: {
    steps: threeSteps,
    activeStep: 1,
    size: 'sm',
  },
};

export const SizeMedium: Story = {
  args: {
    steps: threeSteps,
    activeStep: 1,
    size: 'md',
  },
};

export const SizeLarge: Story = {
  args: {
    steps: threeSteps,
    activeStep: 1,
    size: 'lg',
  },
};

// ============================================================================
// Vertical Variant
// ============================================================================

export const Vertical: Story = {
  args: {
    steps: threeSteps,
    activeStep: 1,
    variant: 'vertical',
  },
};

export const VerticalWithIcons: Story = {
  args: {
    steps: stepsWithIcons,
    activeStep: 2,
    variant: 'vertical',
    completedSteps: ['info', 'medical'],
  },
};

export const VerticalWithDescriptions: Story = {
  args: {
    steps: stepsWithDescriptions,
    activeStep: 1,
    variant: 'vertical',
  },
};

export const VerticalSmall: Story = {
  args: {
    steps: threeSteps,
    activeStep: 1,
    variant: 'vertical',
    size: 'sm',
  },
};

export const VerticalLarge: Story = {
  args: {
    steps: threeSteps,
    activeStep: 1,
    variant: 'vertical',
    size: 'lg',
  },
};

// ============================================================================
// Interactive (Clickable)
// ============================================================================

export const Clickable: Story = {
  args: {
    steps: fourSteps,
    activeStep: 1,
    onStepClick: (stepId, index) => console.log(`Clicked step: ${stepId} (index: ${index})`),
  },
};

// ============================================================================
// In Context
// ============================================================================

export const InCard: Story = {
  render: () => (
    <Card variant="surface" padding="lg">
      <Wizard
        steps={fourSteps}
        activeStep={2}
        completedSteps={['info', 'medical']}
      />
    </Card>
  ),
};

export const RegistrationFlow: Story = {
  render: () => (
    <Card variant="surface" padding="lg">
      <div style={{ marginBottom: '2rem' }}>
        <Wizard
          steps={[
            { id: 'personal', label: 'Osobní údaje', icon: <Icon name="user" size="sm" /> },
            { id: 'club', label: 'Výběr klubu', icon: <Icon name="building" size="sm" /> },
            { id: 'medical', label: 'Zdravotní prohlídka', icon: <Icon name="medical" size="sm" /> },
            { id: 'payment', label: 'Platba', icon: <Icon name="credit-card" size="sm" /> },
          ]}
          activeStep="medical"
          completedSteps={['personal', 'club']}
          section="dv"
        />
      </div>
      <div style={{ padding: '2rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
        <h3 style={{ margin: '0 0 1rem' }}>Krok 3: Zdravotní prohlídka</h3>
        <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
          Nahrajte potvrzení o zdravotní prohlídce...
        </p>
      </div>
    </Card>
  ),
};

// ============================================================================
// All Sizes Comparison
// ============================================================================

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Card variant="surface" padding="md">
        <h4 style={{ margin: '0 0 1rem', color: 'var(--color-text-secondary)' }}>Small</h4>
        <Wizard steps={threeSteps} activeStep={1} size="sm" />
      </Card>
      <Card variant="surface" padding="md">
        <h4 style={{ margin: '0 0 1rem', color: 'var(--color-text-secondary)' }}>Medium (default)</h4>
        <Wizard steps={threeSteps} activeStep={1} size="md" />
      </Card>
      <Card variant="surface" padding="md">
        <h4 style={{ margin: '0 0 1rem', color: 'var(--color-text-secondary)' }}>Large</h4>
        <Wizard steps={threeSteps} activeStep={1} size="lg" />
      </Card>
    </div>
  ),
};

// ============================================================================
// All Section Colors Comparison
// ============================================================================

export const AllSections: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Card variant="surface" padding="md">
        <h4 style={{ margin: '0 0 1rem', color: 'var(--color-text-secondary)' }}>Default (Primary)</h4>
        <Wizard steps={threeSteps} activeStep={1} />
      </Card>
      <Card variant="surface" padding="md">
        <h4 style={{ margin: '0 0 1rem', color: 'var(--color-text-secondary)' }}>Section DV (Blue)</h4>
        <Wizard steps={threeSteps} activeStep={1} section="dv" />
      </Card>
      <Card variant="surface" padding="md">
        <h4 style={{ margin: '0 0 1rem', color: 'var(--color-text-secondary)' }}>Section RY (Green)</h4>
        <Wizard steps={threeSteps} activeStep={1} section="ry" />
      </Card>
      <Card variant="surface" padding="md">
        <h4 style={{ margin: '0 0 1rem', color: 'var(--color-text-secondary)' }}>Section VT (Red)</h4>
        <Wizard steps={threeSteps} activeStep={1} section="vt" />
      </Card>
    </div>
  ),
};
