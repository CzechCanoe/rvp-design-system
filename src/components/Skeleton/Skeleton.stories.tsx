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
        `,
      },
    },
  },
  tags: ['autodocs'],
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
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

/* ==========================================================================
   DEFAULT
   ========================================================================== */

export const Default: Story = {
  args: {
    variant: 'text',
    width: '200px',
  },
};

/* ==========================================================================
   VARIANTS
   ========================================================================== */

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Text (multi-line)</p>
        <div style={{ width: '300px' }}>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Circular</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={48} height={48} />
          <Skeleton variant="circular" width={64} height={64} />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Rectangular</p>
        <Skeleton variant="rectangular" width={300} height={120} />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Rounded</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Skeleton variant="rounded" width={80} height={32} />
          <Skeleton variant="rounded" width={100} height={40} />
          <Skeleton variant="rounded" width={120} height={48} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Four shape variants: text, circular, rectangular, and rounded.',
      },
    },
  },
};

/* ==========================================================================
   ANIMATIONS
   ========================================================================== */

export const Animations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Pulse (default)</p>
        <Skeleton variant="rectangular" animation="pulse" width={300} height={80} />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Wave</p>
        <Skeleton variant="rectangular" animation="wave" width={300} height={80} />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>None</p>
        <Skeleton variant="rectangular" animation="none" width={300} height={80} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three animation options: pulse (default), wave, and none.',
      },
    },
  },
};

/* ==========================================================================
   CONVENIENCE COMPONENTS
   ========================================================================== */

export const ConvenienceComponents: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>SkeletonAvatar</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <SkeletonAvatar size="sm" />
          <SkeletonAvatar size="md" />
          <SkeletonAvatar size="lg" />
          <SkeletonAvatar size="xl" />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>SkeletonButton</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <SkeletonButton size="sm" />
          <SkeletonButton size="md" />
          <SkeletonButton size="lg" />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>SkeletonText</p>
        <div style={{ width: '300px' }}>
          <SkeletonText fontSize="sm" width="100%" />
          <SkeletonText fontSize="md" width="80%" />
          <SkeletonText fontSize="lg" width="60%" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Convenience components for common skeleton patterns.',
      },
    },
  },
};

/* ==========================================================================
   COMPOSITE COMPONENTS
   ========================================================================== */

export const CompositeComponents: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <p style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>SkeletonCard</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 280px)', gap: '16px' }}>
          <SkeletonCard hasImage imageHeight={120} lines={2} />
          <SkeletonCard hasImage imageHeight={120} lines={3} hasActions />
          <SkeletonCard hasAvatar lines={2} hasActions />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>SkeletonTable</p>
        <div style={{ maxWidth: '600px' }}>
          <SkeletonTable rows={4} columns={4} hasHeader />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'SkeletonCard and SkeletonTable for complex loading states.',
      },
    },
  },
};

/* ==========================================================================
   CSK EXAMPLE: RESULTS TABLE LOADING
   ========================================================================== */

export const ResultsTableLoading: Story = {
  name: 'Example: Results Table Loading',
  render: () => (
    <div style={{ maxWidth: '700px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Skeleton variant="text" width={180} height={24} />
        <div style={{ display: 'flex', gap: '8px' }}>
          <SkeletonButton size="sm" width={80} />
          <SkeletonButton size="sm" width={80} />
        </div>
      </div>
      <SkeletonTable rows={8} columns={5} hasHeader />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', gap: '4px' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="rounded" width={32} height={32} />
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Results table loading state with header, table, and pagination.',
      },
    },
  },
};
