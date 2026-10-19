import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection, HeroActionButton } from './HeroSection';
import { Badge } from '../Badge';
import { StatsBar, type StatsBarItem } from '../StatsBar';
import { Card } from '../Card';

const meta: Meta<typeof HeroSection> = {
  title: 'Components/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Hero section component for profile and detail page headers. Provides consistent styling across athlete, club, and event pages with section-specific color theming (DV/RY/VT).',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['full', 'compact', 'minimal'],
      description: 'Hero size variant',
    },
    section: {
      control: 'select',
      options: ['generic', 'dv', 'ry', 'vt'],
      description: 'CSK section for color theming',
    },
    meshBackground: {
      control: 'boolean',
      description: 'Enable mesh gradient background',
    },
    patternOverlay: {
      control: 'boolean',
      description: 'Enable decorative pattern overlay',
    },
    wave: {
      control: 'boolean',
      description: 'Show wave divider at the bottom',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

/* ==========================================================================
   BASIC EXAMPLES
   ========================================================================== */

export const Default: Story = {
  args: {
    variant: 'compact',
    section: 'generic',
    title: 'Jan Novák',
    subtitle: 'Reprezentant České republiky v kanoistice',
    avatarInitials: 'JN',
    avatarAlt: 'Jan Novák',
    metadata: [
      { key: 'club', label: 'Klub', value: 'USK Praha', icon: 'building' },
      { key: 'year', label: 'Ročník', value: '2001', icon: 'calendar' },
    ],
    badges: (
      <>
        <Badge section="dv" size="sm">
          DV
        </Badge>
        <Badge vtClass="a" size="sm">
          A
        </Badge>
      </>
    ),
    actions: <HeroActionButton label="Sdílet" icon="share" />,
  },
};

export const WithAvatar: Story = {
  args: {
    ...Default.args,
    avatarSrc: 'https://i.pravatar.cc/300?u=athlete1',
    title: 'Tereza Fišerová',
    avatarInitials: 'TF',
    avatarAlt: 'Tereza Fišerová',
  },
};

/* ==========================================================================
   VARIANT EXAMPLES
   ========================================================================== */

export const FullVariant: Story = {
  args: {
    variant: 'full',
    section: 'dv',
    title: 'Jiří Prskavec',
    subtitle: 'Olympijský vítěz v kajaku 2020, 2024',
    avatarSrc: 'https://i.pravatar.cc/400?u=prskavec',
    avatarAlt: 'Jiří Prskavec',
    metadata: [
      { key: 'club', label: 'Klub', value: 'USK Praha', icon: 'building' },
      { key: 'year', label: 'Ročník', value: '1993', icon: 'calendar' },
      { key: 'id', label: 'ID', value: '12345', icon: 'user' },
    ],
    badges: (
      <>
        <Badge section="dv" size="sm" >
          DV
        </Badge>
        <Badge variant="primary" size="sm">
          🥇 #1
        </Badge>
      </>
    ),
    actions: <HeroActionButton label="Sdílet" icon="share" />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Full height hero (70vh) for main profile pages with dramatic typography.',
      },
    },
  },
};

export const CompactVariant: Story = {
  args: {
    variant: 'compact',
    section: 'ry',
    title: 'TJ Lokomitiva Beroun',
    subtitle: 'Rychlostní kanoistika',
    avatarInitials: 'LB',
    avatarShape: 'rounded',
    metadata: [
      { key: 'location', label: 'Místo', value: 'Beroun', icon: 'location' },
      { key: 'founded', label: 'Založeno', value: '1948', icon: 'calendar' },
    ],
    badges: (
      <>
        <Badge section="ry" size="sm">
          RY
        </Badge>
      </>
    ),
    actions: <HeroActionButton label="Sdílet" icon="share" />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact hero (45vh) for club profiles and secondary pages.',
      },
    },
  },
};

export const MinimalVariant: Story = {
  args: {
    variant: 'minimal',
    section: 'vt',
    title: 'MČR ve vodním slalomu 2024',
    badges: (
      <>
        <Badge section="vt" size="sm">
          VT
        </Badge>
        <Badge variant="warning" size="sm">
          MČR
        </Badge>
        <Badge variant="success" size="sm">
          Výsledky
        </Badge>
      </>
    ),
    metadata: [
      { key: 'date', label: 'Datum', value: '15.–16. 6. 2024', icon: 'calendar' },
      { key: 'location', label: 'Místo', value: 'Lipno nad Vltavou', icon: 'location' },
      { key: 'athletes', label: 'Závodníků', value: '234', icon: 'users' },
    ],
    meshBackground: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal hero (20vh) for event pages and utility contexts.',
      },
    },
  },
};

/* ==========================================================================
   SECTION COLOR THEMES
   ========================================================================== */

export const SectionDV: Story = {
  args: {
    variant: 'compact',
    section: 'dv',
    title: 'Divize - Divoká voda',
    subtitle: 'Modré barevné schéma pro slalom na divoké vodě',
    avatarInitials: 'DV',
    badges: (
      <Badge section="dv" size="sm">
        DV
      </Badge>
    ),
  },
};

export const SectionRY: Story = {
  args: {
    variant: 'compact',
    section: 'ry',
    title: 'Rychlostní kanoistika',
    subtitle: 'Zelené barevné schéma pro rychlostní disciplíny',
    avatarInitials: 'RY',
    badges: (
      <Badge section="ry" size="sm">
        RY
      </Badge>
    ),
  },
};

export const SectionVT: Story = {
  args: {
    variant: 'compact',
    section: 'vt',
    title: 'Vodácký turistika',
    subtitle: 'Červené barevné schéma pro vodáckou turistiku',
    avatarInitials: 'VT',
    badges: (
      <Badge section="vt" size="sm">
        VT
      </Badge>
    ),
  },
};

/* ==========================================================================
   WITH FLOATING CONTENT
   ========================================================================== */

const athleteStats: StatsBarItem[] = [
  { key: 'rank', value: '1', label: 'Ranking', icon: 'trophy' },
  { key: 'medals', value: '12', label: 'Medailí', icon: 'medal' },
  { key: 'races', value: '156', label: 'Závodů', icon: 'race' },
  { key: 'points', value: '2450', label: 'Bodů', icon: 'chart' },
];

export const WithFloatingStats: Story = {
  args: {
    variant: 'full',
    section: 'dv',
    title: 'Vavřinec Hradilek',
    subtitle: 'Mistr světa v C1, bronzový olympijský medailista',
    avatarSrc: 'https://i.pravatar.cc/400?u=hradilek',
    avatarAlt: 'Vavřinec Hradilek',
    badges: (
      <>
        <Badge section="dv" size="sm" >
          DV
        </Badge>
        <Badge variant="warning" size="sm">
          🥉 #3
        </Badge>
      </>
    ),
    metadata: [
      { key: 'club', label: 'Klub', value: 'Dukla Praha', icon: 'building' },
      { key: 'year', label: 'Ročník', value: '1987', icon: 'calendar' },
    ],
    actions: <HeroActionButton label="Sdílet" icon="share" />,
    floatingContent: (
      <Card variant="surface" style={{ padding: 'var(--csk-space-4)' }}>
        <StatsBar items={athleteStats} variant="cards" centered />
      </Card>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Full hero with floating stats card that overlaps the section below.',
      },
    },
  },
};

/* ==========================================================================
   WITH BACKGROUND IMAGE
   ========================================================================== */

export const WithBackgroundImage: Story = {
  args: {
    variant: 'full',
    section: 'dv',
    title: 'Lipno 2024',
    subtitle: 'Mezinárodní závody ve vodním slalomu',
    backgroundImage:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
    badges: (
      <>
        <Badge section="dv" size="sm">
          DV
        </Badge>
        <Badge variant="info" size="sm">
          ICF Ranking
        </Badge>
      </>
    ),
    metadata: [
      { key: 'date', label: 'Datum', value: '20.–22. 6. 2024', icon: 'calendar' },
      { key: 'location', label: 'Místo', value: 'Lipno nad Vltavou', icon: 'location' },
    ],
    meshBackground: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero with background image and gradient overlay.',
      },
    },
  },
};

/* ==========================================================================
   WITH BREADCRUMBS
   ========================================================================== */

export const WithBreadcrumbs: Story = {
  args: {
    variant: 'minimal',
    section: 'vt',
    title: 'Výsledky - MČR vodní slalom 2024',
    breadcrumbs: (
      <span>
        <a href="#">Kalendář</a> / <a href="#">2024</a> / MČR vodní slalom
      </span>
    ),
    badges: (
      <>
        <Badge section="vt" size="sm">
          VT
        </Badge>
        <Badge variant="success" size="sm">
          Výsledky
        </Badge>
      </>
    ),
    metadata: [
      { key: 'date', label: 'Datum', value: '15. 6. 2024', icon: 'calendar' },
      { key: 'location', label: 'Místo', value: 'Lipno', icon: 'location' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal hero with breadcrumb navigation (hidden in embed mode).',
      },
    },
  },
};

/* ==========================================================================
   CLUB PROFILE EXAMPLE
   ========================================================================== */

const clubStats: StatsBarItem[] = [
  { key: 'athletes', value: '45', label: 'Závodníků', icon: 'users' },
  { key: 'medals', value: '28', label: 'Medailí', icon: 'medal' },
  { key: 'events', value: '12', label: 'Závodů', icon: 'calendar' },
];

export const ClubProfile: Story = {
  args: {
    variant: 'compact',
    section: 'ry',
    title: 'SK Slavia Praha',
    subtitle: 'Oddíl rychlostní kanoistiky',
    avatarInitials: 'SK',
    avatarShape: 'rounded',
    badges: (
      <>
        <Badge section="dv" size="sm">
          DV
        </Badge>
        <Badge section="ry" size="sm">
          RY
        </Badge>
      </>
    ),
    metadata: [
      { key: 'location', label: 'Místo', value: 'Praha 10', icon: 'location' },
      { key: 'founded', label: 'Založeno', value: '1892', icon: 'calendar' },
    ],
    actions: <HeroActionButton label="Sdílet" icon="share" />,
    floatingContent: (
      <Card variant="surface" style={{ padding: 'var(--csk-space-4)' }}>
        <StatsBar items={clubStats} variant="cards" centered />
      </Card>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Club profile hero with rounded avatar and multiple section badges.',
      },
    },
  },
};

/* ==========================================================================
   EVENT DETAIL EXAMPLE
   ========================================================================== */

export const EventDetail: Story = {
  args: {
    variant: 'minimal',
    section: 'dv',
    title: 'Český pohár ve vodním slalomu',
    breadcrumbs: (
      <span>
        <a href="#">Kalendář</a> / <a href="#">2024</a> / Český pohár
      </span>
    ),
    badges: (
      <>
        <Badge section="dv" size="sm">
          DV
        </Badge>
        <Badge variant="warning" size="sm">
          ČP
        </Badge>
        <Badge variant="info" size="sm">
          Probíhá
        </Badge>
      </>
    ),
    metadata: [
      { key: 'date', label: 'Datum', value: '1.–2. 6. 2024', icon: 'calendar' },
      { key: 'location', label: 'Místo', value: 'Brandýs nad Labem', icon: 'location' },
      { key: 'athletes', label: 'Přihlášeno', value: '187', icon: 'users' },
    ],
    actions: (
      <>
        <HeroActionButton label="Sledovat LIVE" icon="play-circle" />
        <HeroActionButton label="Sdílet" icon="share" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Event detail hero with status badges and multiple action buttons.',
      },
    },
  },
};

/* ==========================================================================
   EMBED MODE
   ========================================================================== */

export const EmbedMode: Story = {
  args: {
    ...MinimalVariant.args,
    breadcrumbs: (
      <span>
        <a href="#">Kalendář</a> / <a href="#">2024</a> / MČR
      </span>
    ),
  },
  decorators: [
    (Story) => (
      <div data-mode="embed">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'In embed mode, breadcrumbs and subtitle are hidden for a more compact display.',
      },
    },
  },
};

/* ==========================================================================
   WAVE DIVIDER
   ========================================================================== */

export const WithWave: Story = {
  args: {
    variant: 'compact',
    section: 'dv',
    title: 'Výsledky závodů',
    subtitle: 'Kompletní přehled výsledků sezóny 2024',
    wave: true,
    badges: (
      <Badge section="dv" size="sm">
        DV
      </Badge>
    ),
    metadata: [
      { key: 'date', label: 'Datum', value: '15. 6. 2024', icon: 'calendar' },
      { key: 'location', label: 'Místo', value: 'Praha - Troja', icon: 'location' },
    ],
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div style={{ padding: '2rem', background: 'var(--csk-color-surface)' }}>
          <p style={{ margin: 0, color: 'var(--csk-color-text-2)' }}>
            Content below the wave divider seamlessly connects with the hero section.
          </p>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Wave divider creates a smooth visual transition between the hero and the content below.',
      },
    },
  },
};

export const FullWithWave: Story = {
  args: {
    variant: 'full',
    section: 'ry',
    title: 'Český pohár 2024',
    subtitle: 'Série závodů rychlostní kanoistiky',
    wave: true,
    badges: (
      <>
        <Badge section="ry" size="sm">
          RY
        </Badge>
        <Badge variant="warning" size="sm">
          ČP
        </Badge>
      </>
    ),
    metadata: [
      { key: 'races', label: 'Závodů', value: '8', icon: 'trophy' },
      { key: 'athletes', label: 'Závodníků', value: '450+', icon: 'users' },
    ],
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div style={{ padding: '2rem', background: 'var(--csk-color-surface)' }}>
          <h3 style={{ margin: '0 0 1rem', color: 'var(--csk-color-text)' }}>
            Kalendář závodů
          </h3>
          <p style={{ margin: 0, color: 'var(--csk-color-text-2)' }}>
            Přehled všech závodů série Český pohár 2024.
          </p>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Full-size hero with wave divider for main landing pages.',
      },
    },
  },
};

export const MinimalWithWave: Story = {
  args: {
    variant: 'minimal',
    section: 'vt',
    title: 'Registrace závodníků',
    wave: true,
    badges: (
      <Badge section="vt" size="sm">
        VT
      </Badge>
    ),
  },
  decorators: WithWave.decorators,
  parameters: {
    docs: {
      description: {
        story: 'Minimal hero with wave for utility pages.',
      },
    },
  },
};
