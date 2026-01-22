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
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size of the avatar',
    },
    variant: {
      control: 'select',
      options: ['circular', 'rounded', 'square'],
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

/* ==========================================================================
   DEFAULT
   ========================================================================== */

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=athlete1',
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
          <Avatar src="https://i.pravatar.cc/150?u=shape1" size="lg" variant="circular" alt="Circular" />
          <Avatar src="https://i.pravatar.cc/150?u=shape2" size="lg" variant="rounded" alt="Rounded" />
          <Avatar src="https://i.pravatar.cc/150?u=shape3" size="lg" variant="square" alt="Square" />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>With Initials</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Avatar initials="JN" size="lg" color="primary" variant="circular" />
          <Avatar initials="JN" size="lg" color="primary" variant="rounded" />
          <Avatar initials="JN" size="lg" color="primary" variant="square" />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Fallback Icon</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Avatar size="lg" variant="circular" />
          <Avatar size="lg" variant="rounded" />
          <Avatar size="lg" variant="square" />
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
      <Avatar src="https://i.pravatar.cc/150?u=status1" size="lg" status="online" alt="Online" />
      <Avatar src="https://i.pravatar.cc/150?u=status2" size="lg" status="away" alt="Away" />
      <Avatar src="https://i.pravatar.cc/150?u=status3" size="lg" status="busy" alt="Busy" />
      <Avatar src="https://i.pravatar.cc/150?u=status4" size="lg" status="offline" alt="Offline" />
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
          <Avatar src="https://i.pravatar.cc/150?u=group1" alt="User 1" />
          <Avatar src="https://i.pravatar.cc/150?u=group2" alt="User 2" />
          <Avatar src="https://i.pravatar.cc/150?u=group3" alt="User 3" />
          <Avatar src="https://i.pravatar.cc/150?u=group4" alt="User 4" />
          <Avatar src="https://i.pravatar.cc/150?u=group5" alt="User 5" />
          <Avatar src="https://i.pravatar.cc/150?u=group6" alt="User 6" />
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
        src="https://i.pravatar.cc/150?u=athlete-profile"
        size="2xl"
        variant="circular"
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
