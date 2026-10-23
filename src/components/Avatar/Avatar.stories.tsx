import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Avatar component for displaying user profile images, initials, or fallback icons. Supports multiple sizes, shapes, and status indicators.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Size of the avatar',
    },
    shape: {
      control: 'select',
      options: ['circular', 'rounded', 'square', 'portrait'],
      description: 'Shape variant',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info', 'dv', 'ry', 'vt'],
      description: 'Background color for initials/fallback',
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'busy', 'away'],
      description: 'Status indicator',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Placeholder profile photos, inline so the stories need no network (an external image service kept
// the page from reaching network idle in Firefox CI). Head + shoulders silhouette, background by seed.
const photoBackgrounds = ['steelblue', 'seagreen', 'peru', 'slategray', 'cadetblue', 'indianred', 'darkkhaki'];
function photo(seed: number): string {
  const bg = photoBackgrounds[seed % photoBackgrounds.length];
  return (
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><rect width="150" height="150" fill="${bg}"/><circle cx="75" cy="60" r="28" fill="white" fill-opacity="0.85"/><path d="M25 150c0-32 22-52 50-52s50 20 50 52z" fill="white" fill-opacity="0.85"/></svg>`
    )
  );
}

/* ==========================================================================
   DEFAULT
   ========================================================================== */

export const Default: Story = {
  args: {
    src: photo(0),
    alt: 'Jan Novák',
    size: 'lg',
  },
};

/* ==========================================================================
   VARIANTS
   ========================================================================== */

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>With Image</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Avatar src={photo(1)} size="lg" shape="circular" alt="Circular" />
          <Avatar src={photo(2)} size="lg" shape="rounded" alt="Rounded" />
          <Avatar src={photo(3)} size="lg" shape="square" alt="Square" />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>With Initials</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Avatar initials="JN" size="lg" color="primary" shape="circular" />
          <Avatar initials="JN" size="lg" color="primary" shape="rounded" />
          <Avatar initials="JN" size="lg" color="primary" shape="square" />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Fallback Icon</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Avatar size="lg" shape="circular" />
          <Avatar size="lg" shape="rounded" />
          <Avatar size="lg" shape="square" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three shape variants: circular (default), rounded, and square.',
      },
    },
  },
};

/* ==========================================================================
   SIZES
   ========================================================================== */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar size="xs" initials="XS" color="primary" />
      <Avatar size="sm" initials="SM" color="primary" />
      <Avatar size="md" initials="MD" color="primary" />
      <Avatar size="lg" initials="LG" color="primary" />
      <Avatar size="xl" initials="XL" color="primary" />
      <Avatar size="2xl" initials="2X" color="primary" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Six sizes: xs (24px), sm (32px), md (40px), lg (48px), xl (64px), 2xl (96px).',
      },
    },
  },
};

/* ==========================================================================
   COLORS
   ========================================================================== */

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Semantic Colors</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar initials="DF" color="default" size="md" />
          <Avatar initials="PR" color="primary" size="md" />
          <Avatar initials="SU" color="success" size="md" />
          <Avatar initials="WA" color="warning" size="md" />
          <Avatar initials="ER" color="error" size="md" />
          <Avatar initials="IN" color="info" size="md" />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>CSK Section Colors</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar initials="DV" color="dv" size="md" />
          <Avatar initials="RY" color="ry" size="md" />
          <Avatar initials="VT" color="vt" size="md" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Semantic and CSK section color variants for initials backgrounds.',
      },
    },
  },
};

/* ==========================================================================
   WITH STATUS
   ========================================================================== */

export const WithStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <Avatar src={photo(4)} size="lg" status="online" alt="Online" />
      <Avatar src={photo(5)} size="lg" status="away" alt="Away" />
      <Avatar src={photo(6)} size="lg" status="busy" alt="Busy" />
      <Avatar src={photo(7)} size="lg" status="offline" alt="Offline" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status indicators: online (green), away (yellow), busy (red), offline (gray).',
      },
    },
  },
};

/* ==========================================================================
   AVATAR GROUP
   ========================================================================== */

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>With overflow indicator</p>
        <AvatarGroup max={4} size="md">
          <Avatar src={photo(1)} alt="User 1" />
          <Avatar src={photo(2)} alt="User 2" />
          <Avatar src={photo(3)} alt="User 3" />
          <Avatar src={photo(4)} alt="User 4" />
          <Avatar src={photo(5)} alt="User 5" />
          <Avatar src={photo(6)} alt="User 6" />
        </AvatarGroup>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>With initials</p>
        <AvatarGroup size="sm">
          <Avatar name="Jan Novák" color="primary" />
          <Avatar name="Marie Králová" color="success" />
          <Avatar name="Petr Svoboda" color="warning" />
        </AvatarGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'AvatarGroup displays multiple avatars with overlap. Shows "+N" when exceeding max.',
      },
    },
  },
};

/* ==========================================================================
   CSK EXAMPLE: ATHLETE PROFILE
   ========================================================================== */

export const AthleteProfile: Story = {
  name: 'Example: Athlete Profile',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar
        src={photo(4)}
        size="2xl"
        shape="circular"
        status="online"
        alt="Jiří Prskavec"
      />
      <div>
        <div style={{ fontWeight: 600, fontSize: '18px' }}>Jiří Prskavec</div>
        <div style={{ color: '#666', fontSize: '14px' }}>K1 muži</div>
        <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
          <span
            style={{
              background: '#dbeafe',
              color: '#2563eb',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          >
            VT-M
          </span>
          <span
            style={{
              background: '#dcfce7',
              color: '#16a34a',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          >
            Reprezentace
          </span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Athlete profile example with large avatar, status, and metadata.',
      },
    },
  },
};

/* ==========================================================================
   SQUARE: EVENT LOGOS
   ========================================================================== */

// Wide logo (2:1), inline so the story needs no network
const wideLogo =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100"><rect width="200" height="100" fill="navy"/><circle cx="50" cy="50" r="30" fill="white"/><rect x="100" y="35" width="80" height="30" fill="white"/></svg>'
  );

export const EventLogo: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar src={wideLogo} alt="Logo akce" size="2xl" shape="square" />
      <Avatar src={wideLogo} alt="Logo akce" size="xl" shape="square" />
      <Avatar src={wideLogo} alt="Logo akce" size="lg" shape="square" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'shape="square" is for event and club logos: the image is contained and never cropped (replaces the live-mini override of .csk-avatar--rounded).',
      },
    },
  },
};

/* ==========================================================================
   PORTRAIT: UPRIGHT EVENT LOGOS AND POSTERS
   ========================================================================== */

// Upright poster (5:7), inline so the story needs no network
const posterLogo =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140"><rect width="100" height="140" fill="navy"/><rect x="10" y="10" width="80" height="60" fill="white"/><path d="M10 100c15-12 25-12 40 0s25 12 40 0" stroke="white" stroke-width="6" fill="none"/></svg>'
  );

/**
 * `shape="portrait"`: 5 : 7, the width comes from `size` (md 40 × 56, lg 48 × 67, xl 64 × 90, 2xl 96 × 134).
 * The image is contained, never cropped: a wide logo is letterboxed, an upright poster fills the frame.
 */
export const Portrait: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap' }}>
      <Avatar src={posterLogo} alt="Plakát akce" size="2xl" shape="portrait" />
      <Avatar src={posterLogo} alt="Plakát akce" size="xl" shape="portrait" />
      <Avatar src={posterLogo} alt="Plakát akce" size="lg" shape="portrait" />
      <Avatar src={posterLogo} alt="Plakát akce" size="md" shape="portrait" />
      <Avatar src={wideLogo} alt="Logo akce" size="xl" shape="portrait" />
      <Avatar initials="OH" size="xl" color="primary" shape="portrait" />
    </div>
  ),
};

/** 3xl (128 px) is the public profile; `ring` is the profile-band ring (translucent white on `data-tone="on-dark"`). */
export const LargeAndRing: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Avatar initials="JN" size="3xl" color="primary" shape="rounded" />
      <Avatar initials="JN" size="xl" color="primary" ring />
      <div data-tone="on-dark" style={{ padding: 16, background: 'var(--csk-color-brand)' }}>
        <Avatar initials="JN" size="xl" color="primary" ring />
      </div>
    </div>
  ),
};
