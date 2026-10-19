import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './PageLayout';
import { Header } from '../Header';
import { Subbar } from '../Subbar';
import { BrandMark, siteNav, subbarItems, ContentPlaceholder } from './layoutStoryParts';

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
      options: ['tribuna', 'urad', 'embed'],
      description: 'Surface and slots: tribuna (white), urad (grey), embed (content only)',
    },
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Maximum width of the content container',
    },
    padded: {
      control: 'boolean',
      description: 'Add side padding to the main content area',
    },
    stickyHeader: {
      control: 'boolean',
      description: 'Keep the header area at the top while scrolling',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

const SimpleFooter = () => (
  <>© 2026 Český svaz kanoistů · Výsledky jsou oficiální po schválení vrchním rozhodčím a počtářem.</>
);

const header = (
  <>
    <Header variant="site" brand={<BrandMark />} navigation={siteNav} />
    <Subbar items={subbarItems} />
  </>
);

const content = (
  <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
    <ContentPlaceholder label="Obsah stránky" height={120} />
    <ContentPlaceholder label="Další sekce" height={120} />
  </div>
);

export const Default: Story = {
  args: {
    variant: 'tribuna',
    maxWidth: 'xl',
    padded: true,
    header,
    footer: <SimpleFooter />,
    children: content,
  },
};

export const Urad: Story = {
  args: {
    variant: 'urad',
    header: <Header variant="app" brand={<BrandMark name="ČSK · Přihlášky" />} />,
    footer: <SimpleFooter />,
    children: content,
  },
  parameters: {
    docs: { description: { story: 'Grey working surface for registration and the register.' } },
  },
};

export const Embed: Story = {
  args: {
    variant: 'embed',
    header,
    footer: <SimpleFooter />,
    children: content,
  },
  parameters: {
    docs: {
      description: {
        story: 'Embed renders content only. Header, banner, bottom bar and footer are not rendered.',
      },
    },
  },
};

export const MaxWidthVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <PageLayout key={size} maxWidth={size}>
          <div
            style={{
              padding: 16,
              background: 'var(--csk-color-surface-2)',
              border: '1px dashed var(--csk-color-border)',
            }}
          >
            maxWidth="{size}"
          </div>
        </PageLayout>
      ))}
    </div>
  ),
};
