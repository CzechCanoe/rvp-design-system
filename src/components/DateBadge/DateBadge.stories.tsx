import type { Meta, StoryObj } from '@storybook/react';
import { DateBadge } from './DateBadge';
import { Card } from '../Card';

const meta: Meta<typeof DateBadge> = {
  title: 'Components/DateBadge',
  component: DateBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    section: {
      control: 'select',
      options: ['generic', 'dv', 'ry', 'vt'],
      description: 'Section color variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    locale: {
      control: 'text',
      description: 'Locale for month formatting',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateBadge>;

// Fixed date for consistent snapshots
const sampleDate = new Date('2024-06-15');

// ============================================================================
// Basic Stories
// ============================================================================

export const Default: Story = {
  args: {
    date: sampleDate,
  },
};

export const FromString: Story = {
  args: {
    date: '2024-07-20',
  },
};

// ============================================================================
// Section Variants
// ============================================================================

export const SectionGeneric: Story = {
  args: {
    date: sampleDate,
    section: 'generic',
  },
};

export const SectionDV: Story = {
  args: {
    date: sampleDate,
    section: 'dv',
  },
};

export const SectionRY: Story = {
  args: {
    date: sampleDate,
    section: 'ry',
  },
};

export const SectionVT: Story = {
  args: {
    date: sampleDate,
    section: 'vt',
  },
};

// ============================================================================
// Size Variants
// ============================================================================

export const SizeSmall: Story = {
  args: {
    date: sampleDate,
    size: 'sm',
  },
};

export const SizeMedium: Story = {
  args: {
    date: sampleDate,
    size: 'md',
  },
};

export const SizeLarge: Story = {
  args: {
    date: sampleDate,
    size: 'lg',
  },
};

// ============================================================================
// Locale Variants
// ============================================================================

export const LocaleEnglish: Story = {
  args: {
    date: sampleDate,
    locale: 'en-US',
  },
};

export const LocaleGerman: Story = {
  args: {
    date: sampleDate,
    locale: 'de-DE',
  },
};

// ============================================================================
// In Context
// ============================================================================

export const InCard: Story = {
  render: () => (
    <Card variant="surface" padding="lg">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <DateBadge date="2024-06-15" section="dv" />
        <div>
          <h4 style={{ margin: 0, color: 'var(--color-text-primary)' }}>
            MČR ve slalomu
          </h4>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
            Troja, Praha
          </p>
        </div>
      </div>
    </Card>
  ),
};

export const EventList: Story = {
  render: () => (
    <Card variant="surface" padding="lg">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <DateBadge date="2024-06-15" section="dv" size="md" />
          <div>
            <h4 style={{ margin: 0, color: 'var(--color-text-primary)' }}>
              MČR ve slalomu - DV
            </h4>
            <p style={{ margin: '0.25rem 0 0', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
              Troja, Praha
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <DateBadge date="2024-07-20" section="ry" size="md" />
          <div>
            <h4 style={{ margin: 0, color: 'var(--color-text-primary)' }}>
              Pohár v rychlostní kanoistice
            </h4>
            <p style={{ margin: '0.25rem 0 0', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
              Račice
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <DateBadge date="2024-08-10" section="vt" size="md" />
          <div>
            <h4 style={{ margin: 0, color: 'var(--color-text-primary)' }}>
              Soutěž ve vodním turistice
            </h4>
            <p style={{ margin: '0.25rem 0 0', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
              Vltava
            </p>
          </div>
        </div>
      </div>
    </Card>
  ),
};

// ============================================================================
// All Sections Comparison
// ============================================================================

export const AllSections: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <DateBadge date={sampleDate} section="generic" />
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
          Generic
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DateBadge date={sampleDate} section="dv" />
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
          DV
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DateBadge date={sampleDate} section="ry" />
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
          RY
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DateBadge date={sampleDate} section="vt" />
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
          VT
        </p>
      </div>
    </div>
  ),
};

// ============================================================================
// All Sizes Comparison
// ============================================================================

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ textAlign: 'center' }}>
        <DateBadge date={sampleDate} section="dv" size="sm" />
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
          Small
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DateBadge date={sampleDate} section="dv" size="md" />
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
          Medium
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DateBadge date={sampleDate} section="dv" size="lg" />
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
          Large
        </p>
      </div>
    </div>
  ),
};

// ============================================================================
// Different Days
// ============================================================================

export const VariousDates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <DateBadge date="2024-01-05" section="dv" />
      <DateBadge date="2024-03-15" section="ry" />
      <DateBadge date="2024-06-22" section="vt" />
      <DateBadge date="2024-09-30" section="generic" />
      <DateBadge date="2024-12-01" section="dv" />
    </div>
  ),
};
