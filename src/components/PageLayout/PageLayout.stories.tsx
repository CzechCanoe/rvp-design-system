import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './PageLayout';
import { Header } from '../Header';
import { Card } from '../Card';

const meta: Meta<typeof PageLayout> = {
  title: 'Layout/PageLayout',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standalone', 'satellite', 'embed'],
      description: 'Layout variant determines header/footer visibility',
    },
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Maximum width of the content container',
    },
    padded: {
      control: 'boolean',
      description: 'Add padding to the main content area',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

const SimpleFooter = () => (
  <div
    style={{
      padding: '24px',
      textAlign: 'center',
      background: 'var(--csk-color-surface-dim)',
      borderTop: '1px solid var(--csk-color-border)',
      fontSize: '14px',
      color: 'var(--csk-color-on-surface-muted)',
    }}
  >
    © 2026 Český svaz kanoistů
  </div>
);

const PageContent = () => (
  <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Card variant="elevated">
      <h2 style={{ margin: '0 0 8px' }}>Welcome to CSK</h2>
      <p style={{ margin: 0 }}>This is an example page layout demonstrating the component.</p>
    </Card>
    <Card variant="outlined">
      <h3 style={{ margin: '0 0 8px' }}>Section Title</h3>
      <p style={{ margin: 0 }}>Content goes here. The layout provides consistent structure.</p>
    </Card>
  </div>
);

/* ==========================================================================
   DEFAULT - STANDALONE
   ========================================================================== */

export const Default: Story = {
  args: {
    variant: 'standalone',
    maxWidth: 'xl',
    padded: true,
    header: <Header variant="elevated" />,
    footer: <SimpleFooter />,
    children: <PageContent />,
  },
};

/* ==========================================================================
   VARIANTS
   ========================================================================== */

export const Standalone: Story = {
  args: {
    variant: 'standalone',
    header: <Header variant="elevated" />,
    footer: <SimpleFooter />,
    children: <PageContent />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Full standalone layout with header and footer.',
      },
    },
  },
};

export const Satellite: Story = {
  args: {
    variant: 'satellite',
    header: (
      <div
        style={{
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'var(--csk-color-surface)',
          borderBottom: '1px solid var(--csk-color-border)',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            background: 'var(--csk-color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '14px',
          }}
        >
          CSK
        </div>
        <span style={{ fontWeight: 600 }}>Calendar</span>
      </div>
    ),
    footer: <SimpleFooter />,
    children: <PageContent />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Satellite layout with minimal header for standalone apps.',
      },
    },
  },
};

export const Embed: Story = {
  args: {
    variant: 'embed',
    header: <Header variant="elevated" />,
    footer: <SimpleFooter />,
    children: <PageContent />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Embed layout hides header and footer for embedding in external sites.',
      },
    },
  },
};

/* ==========================================================================
   MAX WIDTH VARIANTS
   ========================================================================== */

export const MaxWidthVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
        <PageLayout key={size} variant="embed" maxWidth={size} padded>
          <Card variant="outlined">
            <strong>maxWidth="{size}"</strong>
            <p style={{ margin: '8px 0 0', fontSize: '14px' }}>
              {size === 'sm' && '640px'}
              {size === 'md' && '768px'}
              {size === 'lg' && '1024px'}
              {size === 'xl' && '1280px'}
              {size === 'full' && 'No max-width'}
            </p>
          </Card>
        </PageLayout>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different max-width options for content container.',
      },
    },
  },
};
