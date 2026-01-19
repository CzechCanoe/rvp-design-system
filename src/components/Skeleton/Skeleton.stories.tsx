import type { Meta, StoryObj } from '@storybook/react';
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonCard,
  SkeletonTable,
} from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Skeleton component for displaying loading placeholders while content is being loaded.

## Features
- Multiple variants: text, circular, rectangular, rounded
- Animation options: pulse, wave, none
- Convenience components: SkeletonText, SkeletonAvatar, SkeletonButton, SkeletonCard, SkeletonTable
- Respects reduced motion preferences
- Dark mode support

## Usage
\`\`\`tsx
import { Skeleton, SkeletonCard, SkeletonTable } from '@czechcanoe/rvp-design-system';

// Basic skeleton
<Skeleton variant="text" width="100%" />

// Card placeholder
<SkeletonCard hasImage lines={3} hasActions />

// Table placeholder
<SkeletonTable rows={5} columns={4} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    lines: {
      control: { type: 'number', min: 1, max: 10 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// ============================================================================
// BASIC STORIES
// ============================================================================

export const Default: Story = {
  args: {
    variant: 'text',
    width: '100%',
  },
};

export const TextVariant: Story = {
  args: {
    variant: 'text',
    width: '200px',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '300px' }}>
      <Skeleton {...args} width="100%" />
      <Skeleton {...args} width="80%" />
      <Skeleton {...args} width="60%" />
    </div>
  ),
};

export const MultiLineText: Story = {
  args: {
    variant: 'text',
    lines: 4,
    lastLineWidth: '70%',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <Skeleton {...args} />
    </div>
  ),
};

export const CircularVariant: Story = {
  args: {
    variant: 'circular',
    width: 48,
    height: 48,
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Skeleton {...args} width={24} height={24} />
      <Skeleton {...args} width={32} height={32} />
      <Skeleton {...args} width={48} height={48} />
      <Skeleton {...args} width={64} height={64} />
      <Skeleton {...args} width={96} height={96} />
    </div>
  ),
};

export const RectangularVariant: Story = {
  args: {
    variant: 'rectangular',
    width: '100%',
    height: 200,
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <Skeleton {...args} />
    </div>
  ),
};

export const RoundedVariant: Story = {
  args: {
    variant: 'rounded',
    width: 120,
    height: 44,
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Skeleton {...args} width={80} height={32} />
      <Skeleton {...args} width={100} height={44} />
      <Skeleton {...args} width={120} height={52} />
    </div>
  ),
};

// ============================================================================
// ANIMATION STORIES
// ============================================================================

export const PulseAnimation: Story = {
  args: {
    variant: 'rectangular',
    animation: 'pulse',
    width: '100%',
    height: 100,
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Skeleton {...args} />
    </div>
  ),
};

export const WaveAnimation: Story = {
  args: {
    variant: 'rectangular',
    animation: 'wave',
    width: '100%',
    height: 100,
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Skeleton {...args} />
    </div>
  ),
};

export const NoAnimation: Story = {
  args: {
    variant: 'rectangular',
    animation: 'none',
    width: '100%',
    height: 100,
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Skeleton {...args} />
    </div>
  ),
};

// ============================================================================
// CONVENIENCE COMPONENTS
// ============================================================================

export const SkeletonTextSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>
          XS (12px)
        </div>
        <SkeletonText fontSize="xs" width="80%" />
      </div>
      <div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>
          SM (14px)
        </div>
        <SkeletonText fontSize="sm" width="70%" />
      </div>
      <div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>
          MD (16px)
        </div>
        <SkeletonText fontSize="md" width="90%" />
      </div>
      <div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>
          LG (18px)
        </div>
        <SkeletonText fontSize="lg" width="60%" />
      </div>
      <div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>
          XL (20px)
        </div>
        <SkeletonText fontSize="xl" width="50%" />
      </div>
    </div>
  ),
};

export const SkeletonAvatarSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <SkeletonAvatar size="xs" />
        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
          XS
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <SkeletonAvatar size="sm" />
        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
          SM
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <SkeletonAvatar size="md" />
        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
          MD
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <SkeletonAvatar size="lg" />
        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
          LG
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <SkeletonAvatar size="xl" />
        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
          XL
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <SkeletonAvatar size="2xl" />
        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
          2XL
        </div>
      </div>
    </div>
  ),
};

export const SkeletonButtonSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <SkeletonButton size="sm" />
        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
          SM
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <SkeletonButton size="md" />
        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
          MD
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <SkeletonButton size="lg" />
        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
          LG
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <SkeletonButton size="md" width={160} />
        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
          Custom width
        </div>
      </div>
    </div>
  ),
};

// ============================================================================
// COMPOSITE COMPONENTS
// ============================================================================

export const CardSkeleton: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
      <SkeletonCard hasImage imageHeight={160} lines={2} />
      <SkeletonCard hasImage imageHeight={160} lines={3} hasActions />
      <SkeletonCard hasImage={false} hasAvatar lines={2} hasActions />
    </div>
  ),
};

export const TableSkeleton: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <SkeletonTable rows={5} columns={4} hasHeader />
    </div>
  ),
};

// ============================================================================
// CSK-SPECIFIC USE CASES
// ============================================================================

export const AthleteProfileLoading: Story = {
  name: 'CSK: Athlete Profile Loading',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        padding: '24px',
        border: '1px solid var(--color-border-secondary)',
        borderRadius: '12px',
        maxWidth: '600px',
      }}
    >
      <SkeletonAvatar size="xl" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="text" width="40%" height={16} />
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <Skeleton variant="rounded" width={60} height={24} />
          <Skeleton variant="rounded" width={40} height={24} />
          <Skeleton variant="rounded" width={50} height={24} />
        </div>
        <Skeleton variant="text" lines={2} lastLineWidth="80%" />
      </div>
    </div>
  ),
};

export const ResultsTableLoading: Story = {
  name: 'CSK: Results Table Loading',
  render: () => (
    <div style={{ maxWidth: '900px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <Skeleton variant="text" width={200} height={28} />
        <div style={{ display: 'flex', gap: '8px' }}>
          <SkeletonButton size="sm" width={100} />
          <SkeletonButton size="sm" width={100} />
        </div>
      </div>
      <SkeletonTable rows={10} columns={6} hasHeader />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '16px',
        }}
      >
        <div style={{ display: 'flex', gap: '4px' }}>
          <Skeleton variant="rounded" width={32} height={32} />
          <Skeleton variant="rounded" width={32} height={32} />
          <Skeleton variant="rounded" width={32} height={32} />
          <Skeleton variant="rounded" width={32} height={32} />
          <Skeleton variant="rounded" width={32} height={32} />
        </div>
      </div>
    </div>
  ),
};

export const EventCalendarLoading: Story = {
  name: 'CSK: Event Calendar Loading',
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <Skeleton variant="text" width={120} height={24} />
        <div style={{ display: 'flex', gap: '8px' }}>
          <Skeleton variant="rounded" width={32} height={32} />
          <Skeleton variant="rounded" width={32} height={32} />
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
        }}
      >
        {/* Day headers */}
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={`header-${i}`} variant="text" width="100%" height={20} />
        ))}
        {/* Calendar days */}
        {Array.from({ length: 35 }).map((_, i) => (
          <Skeleton
            key={`day-${i}`}
            variant="rectangular"
            width="100%"
            height={60}
            borderRadius="4px"
          />
        ))}
      </div>
    </div>
  ),
};

export const DashboardStatsLoading: Story = {
  name: 'CSK: Dashboard Stats Loading',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          style={{
            padding: '20px',
            border: '1px solid var(--color-border-secondary)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <Skeleton variant="text" width="60%" height={14} />
            <Skeleton variant="circular" width={40} height={40} />
          </div>
          <Skeleton variant="text" width="50%" height={32} />
          <Skeleton variant="text" width="70%" height={12} />
        </div>
      ))}
    </div>
  ),
};

export const StartListLoading: Story = {
  name: 'CSK: Start List Loading',
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <Skeleton variant="text" width={180} height={24} style={{ marginBottom: '16px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '12px',
              border: '1px solid var(--color-border-secondary)',
              borderRadius: '8px',
            }}
          >
            <Skeleton variant="text" width={30} height={20} />
            <SkeletonAvatar size="sm" />
            <div style={{ flex: 1 }}>
              <Skeleton variant="text" width="70%" height={16} />
              <Skeleton variant="text" width="40%" height={12} style={{ marginTop: '4px' }} />
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <Skeleton variant="rounded" width={32} height={20} />
              <Skeleton variant="rounded" width={24} height={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const WaveAnimationShowcase: Story = {
  name: 'Wave Animation Showcase',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <SkeletonCard animation="wave" hasImage imageHeight={120} lines={2} />
      <SkeletonTable animation="wave" rows={3} columns={3} />
    </div>
  ),
};
