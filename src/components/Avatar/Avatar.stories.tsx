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
   Basic Examples
   ========================================================================== */

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=athlete1',
    alt: 'Jan Novák',
    size: 'lg',
  },
};

export const WithInitials: Story = {
  args: {
    initials: 'JN',
    size: 'lg',
    color: 'primary',
  },
};

export const WithName: Story = {
  args: {
    name: 'Jan Novák',
    size: 'lg',
    color: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'When providing a `name` prop, initials are automatically extracted.',
      },
    },
  },
};

export const FallbackIcon: Story = {
  args: {
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'When no image or initials are provided, a default user icon is displayed.',
      },
    },
  },
};

/* ==========================================================================
   Sizes
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
        story: 'Avatar supports 6 sizes: xs (24px), sm (32px), md (40px), lg (48px), xl (64px), 2xl (96px).',
      },
    },
  },
};

/* ==========================================================================
   Shape Variants
   ========================================================================== */

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar
        src="https://i.pravatar.cc/150?u=shape1"
        size="xl"
        variant="circular"
        alt="Circular"
      />
      <Avatar
        src="https://i.pravatar.cc/150?u=shape2"
        size="xl"
        variant="rounded"
        alt="Rounded"
      />
      <Avatar
        src="https://i.pravatar.cc/150?u=shape3"
        size="xl"
        variant="square"
        alt="Square"
      />
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
   Colors
   ========================================================================== */

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
      <Avatar initials="DF" color="default" size="lg" />
      <Avatar initials="PR" color="primary" size="lg" />
      <Avatar initials="SU" color="success" size="lg" />
      <Avatar initials="WA" color="warning" size="lg" />
      <Avatar initials="ER" color="error" size="lg" />
      <Avatar initials="IN" color="info" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Semantic color variants for initials and fallback backgrounds.',
      },
    },
  },
};

/* ==========================================================================
   CSK Section Colors
   ========================================================================== */

export const SectionColors: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar initials="DV" color="dv" size="lg" />
      <Avatar initials="RY" color="ry" size="lg" />
      <Avatar initials="VT" color="vt" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CSK discipline section colors: DV (blue), RY (green), VT (red).',
      },
    },
  },
};

/* ==========================================================================
   Status Indicators
   ========================================================================== */

export const WithStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <Avatar
        src="https://i.pravatar.cc/150?u=status1"
        size="lg"
        status="online"
        alt="Online"
      />
      <Avatar
        src="https://i.pravatar.cc/150?u=status2"
        size="lg"
        status="away"
        alt="Away"
      />
      <Avatar
        src="https://i.pravatar.cc/150?u=status3"
        size="lg"
        status="busy"
        alt="Busy"
      />
      <Avatar
        src="https://i.pravatar.cc/150?u=status4"
        size="lg"
        status="offline"
        alt="Offline"
      />
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
   Image Fallback
   ========================================================================== */

export const ImageFallback: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar
        src="https://invalid-url.example/photo.jpg"
        name="Jan Novák"
        color="primary"
        size="lg"
      />
      <Avatar
        src="https://invalid-url.example/photo.jpg"
        initials="JN"
        color="success"
        size="lg"
      />
      <Avatar
        src="https://invalid-url.example/photo.jpg"
        color="default"
        size="lg"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'When an image fails to load, the avatar falls back to initials or the default icon.',
      },
    },
  },
};

/* ==========================================================================
   Avatar Group
   ========================================================================== */

export const Group: Story = {
  render: () => (
    <AvatarGroup max={4} size="md">
      <Avatar src="https://i.pravatar.cc/150?u=group1" alt="User 1" />
      <Avatar src="https://i.pravatar.cc/150?u=group2" alt="User 2" />
      <Avatar src="https://i.pravatar.cc/150?u=group3" alt="User 3" />
      <Avatar src="https://i.pravatar.cc/150?u=group4" alt="User 4" />
      <Avatar src="https://i.pravatar.cc/150?u=group5" alt="User 5" />
      <Avatar src="https://i.pravatar.cc/150?u=group6" alt="User 6" />
    </AvatarGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'AvatarGroup displays multiple avatars with overlap. Shows "+N" when exceeding max.',
      },
    },
  },
};

export const GroupSpacing: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Tight spacing</p>
        <AvatarGroup spacing="tight" size="md">
          <Avatar src="https://i.pravatar.cc/150?u=sp1" />
          <Avatar src="https://i.pravatar.cc/150?u=sp2" />
          <Avatar src="https://i.pravatar.cc/150?u=sp3" />
          <Avatar src="https://i.pravatar.cc/150?u=sp4" />
        </AvatarGroup>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Normal spacing</p>
        <AvatarGroup spacing="normal" size="md">
          <Avatar src="https://i.pravatar.cc/150?u=sp1" />
          <Avatar src="https://i.pravatar.cc/150?u=sp2" />
          <Avatar src="https://i.pravatar.cc/150?u=sp3" />
          <Avatar src="https://i.pravatar.cc/150?u=sp4" />
        </AvatarGroup>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Loose spacing</p>
        <AvatarGroup spacing="loose" size="md">
          <Avatar src="https://i.pravatar.cc/150?u=sp1" />
          <Avatar src="https://i.pravatar.cc/150?u=sp2" />
          <Avatar src="https://i.pravatar.cc/150?u=sp3" />
          <Avatar src="https://i.pravatar.cc/150?u=sp4" />
        </AvatarGroup>
      </div>
    </div>
  ),
};

/* ==========================================================================
   CSK-Specific Examples
   ========================================================================== */

export const AthleteProfile: Story = {
  name: 'CSK: Athlete Profile',
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
        story: 'Athlete profile card with large avatar, status indicator, and metadata.',
      },
    },
  },
};

export const ClubMembers: Story = {
  name: 'CSK: Club Members',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar name="Martin Fuksa" color="dv" size="md" />
        <div>
          <div style={{ fontWeight: 500 }}>Martin Fuksa</div>
          <div style={{ fontSize: '12px', color: '#666' }}>DV - C1</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar name="Tereza Fišerová" color="vt" size="md" />
        <div>
          <div style={{ fontWeight: 500 }}>Tereza Fišerová</div>
          <div style={{ fontSize: '12px', color: '#666' }}>VT - K1</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar name="Vojtěch Heger" color="ry" size="md" />
        <div>
          <div style={{ fontWeight: 500 }}>Vojtěch Heger</div>
          <div style={{ fontSize: '12px', color: '#666' }}>RY - K1</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'List of club members with section-colored initials avatars.',
      },
    },
  },
};

export const RaceStartList: Story = {
  name: 'CSK: Race Start List',
  render: () => (
    <div style={{ width: '400px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontWeight: 600, width: '24px' }}>1</span>
          <Avatar
            src="https://i.pravatar.cc/150?u=start1"
            size="sm"
            alt="Závodník 1"
          />
          <div>
            <div style={{ fontWeight: 500, fontSize: '14px' }}>Novák Jan</div>
            <div style={{ fontSize: '12px', color: '#666' }}>USK Praha</div>
          </div>
        </div>
        <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>10:30:00</span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontWeight: 600, width: '24px' }}>2</span>
          <Avatar
            src="https://i.pravatar.cc/150?u=start2"
            size="sm"
            alt="Závodník 2"
          />
          <div>
            <div style={{ fontWeight: 500, fontSize: '14px' }}>Svoboda Petr</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Dukla Praha</div>
          </div>
        </div>
        <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>10:31:00</span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontWeight: 600, width: '24px' }}>3</span>
          <Avatar name="Karel Dvořák" color="primary" size="sm" />
          <div>
            <div style={{ fontWeight: 500, fontSize: '14px' }}>Dvořák Karel</div>
            <div style={{ fontSize: '12px', color: '#666' }}>TJ Bohemians</div>
          </div>
        </div>
        <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>10:32:00</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Race start list with athlete avatars, names, clubs, and start times.',
      },
    },
  },
};

export const EventOrganizers: Story = {
  name: 'CSK: Event Organizers',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Rozhodčí</div>
        <AvatarGroup max={5} size="sm">
          <Avatar src="https://i.pravatar.cc/150?u=ref1" alt="Rozhodčí 1" />
          <Avatar src="https://i.pravatar.cc/150?u=ref2" alt="Rozhodčí 2" />
          <Avatar src="https://i.pravatar.cc/150?u=ref3" alt="Rozhodčí 3" />
          <Avatar src="https://i.pravatar.cc/150?u=ref4" alt="Rozhodčí 4" />
          <Avatar src="https://i.pravatar.cc/150?u=ref5" alt="Rozhodčí 5" />
          <Avatar src="https://i.pravatar.cc/150?u=ref6" alt="Rozhodčí 6" />
          <Avatar src="https://i.pravatar.cc/150?u=ref7" alt="Rozhodčí 7" />
        </AvatarGroup>
      </div>
      <div>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Pořadatelé</div>
        <AvatarGroup max={4} size="sm">
          <Avatar name="Jan Pořadatel" color="success" />
          <Avatar name="Marie Organizátorová" color="success" />
          <Avatar name="Petr Dobrovolník" color="success" />
        </AvatarGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Event organizers and referees displayed as avatar groups.',
      },
    },
  },
};

export const OnlineAthletes: Story = {
  name: 'CSK: Online Athletes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
        Právě přihlášení závodníci
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Avatar
          src="https://i.pravatar.cc/150?u=online1"
          size="md"
          status="online"
          alt="Online 1"
        />
        <Avatar
          src="https://i.pravatar.cc/150?u=online2"
          size="md"
          status="online"
          alt="Online 2"
        />
        <Avatar name="Jan Novák" color="primary" size="md" status="online" />
        <Avatar
          src="https://i.pravatar.cc/150?u=online4"
          size="md"
          status="away"
          alt="Away"
        />
        <Avatar name="Petr Svoboda" color="default" size="md" status="offline" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Athletes currently logged into the system with online status indicators.',
      },
    },
  },
};
