import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Badge component for displaying status, labels, and categories. Supports semantic variants, CSK sections (DV, RY, VT), and VT classes (M, A, B, C).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info', 'gradient', 'energy'],
      description: 'Visual variant of the badge',
    },
    section: {
      control: 'select',
      options: [undefined, 'dv', 'ry', 'vt'],
      description: 'CSK discipline section (overrides variant)',
    },
    vtClass: {
      control: 'select',
      options: [undefined, 'm', 'a', 'b', 'c'],
      description: 'VT class (overrides variant and section)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
    },
    outlined: {
      control: 'boolean',
      description: 'Use outlined style instead of filled',
    },
    pill: {
      control: 'boolean',
      description: 'Use pill shape (fully rounded)',
    },
    glow: {
      control: 'boolean',
      description: 'Use glow effect (for gradient and section variants)',
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ==========================================================================
   DEFAULT
   ========================================================================== */

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

/* ==========================================================================
   VARIANTS
   ========================================================================== */

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available semantic variants for different contexts.',
      },
    },
  },
};

export const VariantsOutlined: Story = {
  name: 'Variants (Outlined)',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="default" outlined>Default</Badge>
      <Badge variant="primary" outlined>Primary</Badge>
      <Badge variant="success" outlined>Success</Badge>
      <Badge variant="warning" outlined>Warning</Badge>
      <Badge variant="error" outlined>Error</Badge>
      <Badge variant="info" outlined>Info</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Outlined variants for subtle appearance.',
      },
    },
  },
};

/* ==========================================================================
   GRADIENT VARIANTS
   ========================================================================== */

export const GradientVariants: Story = {
  name: 'Gradient & Energy Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Standard</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge variant="gradient">Gradient Primary</Badge>
          <Badge variant="energy">Energy</Badge>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>With Glow Effect</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge variant="gradient" glow>Gradient Primary</Badge>
          <Badge variant="energy" glow>Energy</Badge>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Pill with Glow</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge variant="gradient" pill glow>Primary</Badge>
          <Badge variant="energy" pill glow>Energy</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Gradient and energy variants for expressive, modern UI. Energy uses vibrant coral-orange accent.',
      },
    },
  },
};

/* ==========================================================================
   SIZES
   ========================================================================== */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three sizes available: sm (20px), md (24px), lg (32px). Large size uses Plus Jakarta Sans display font for more prominent presentation.',
      },
    },
  },
};

/* ==========================================================================
   DISPLAY FONT SHOWCASE
   ========================================================================== */

export const DisplayFontShowcase: Story = {
  name: 'Display Font (Large)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Large badges with display font</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="energy" size="lg" pill glow>ŽIVĚ</Badge>
          <Badge variant="gradient" size="lg" pill glow>Semifinále</Badge>
          <Badge section="dv" size="lg" pill>Kajak K1</Badge>
          <Badge vtClass="m" size="lg" pill glow>Mistr ČR</Badge>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Compare with medium (body font)</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="energy" size="md" pill>ŽIVĚ</Badge>
          <Badge variant="gradient" size="md" pill>Semifinále</Badge>
          <Badge section="dv" size="md" pill>Kajak K1</Badge>
          <Badge vtClass="m" size="md" pill>Mistr ČR</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Large badges use Plus Jakarta Sans display font with tighter letter-spacing for prominent, sporty feel.',
      },
    },
  },
};

/* ==========================================================================
   PILL SHAPE
   ========================================================================== */

export const PillShape: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="primary" pill>Primary Pill</Badge>
      <Badge variant="success" pill>Success Pill</Badge>
      <Badge variant="error" pill outlined>Error Outlined Pill</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pill shape with fully rounded corners.',
      },
    },
  },
};

/* ==========================================================================
   CSK SECTIONS
   ========================================================================== */

export const CskSections: Story = {
  name: 'CSK Sections',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Gradient (default)</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge section="dv">Divoká voda</Badge>
          <Badge section="ry">Rychlostní</Badge>
          <Badge section="vt">Vodní turistika</Badge>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>With Glow</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge section="dv" glow>DV</Badge>
          <Badge section="ry" glow>RY</Badge>
          <Badge section="vt" glow>VT</Badge>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Outlined</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge section="dv" outlined>DV</Badge>
          <Badge section="ry" outlined>RY</Badge>
          <Badge section="vt" outlined>VT</Badge>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Pill with Glow</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge section="dv" pill glow>Divoká voda</Badge>
          <Badge section="ry" pill glow>Rychlostní</Badge>
          <Badge section="vt" pill glow>Vodní turistika</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'CSK discipline sections with gradient backgrounds: DV (Divoká voda - Whitewater, blue), RY (Rychlostní - Sprint, green), VT (Vodní turistika - Touring, red).',
      },
    },
  },
};

/* ==========================================================================
   VT CLASSES
   ========================================================================== */

export const VtClasses: Story = {
  name: 'VT Classes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Gradient (default)</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge vtClass="m">M - Mistr</Badge>
          <Badge vtClass="a">A</Badge>
          <Badge vtClass="b">B</Badge>
          <Badge vtClass="c">C</Badge>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>With Glow</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge vtClass="m" glow>M</Badge>
          <Badge vtClass="a" glow>A</Badge>
          <Badge vtClass="b" glow>B</Badge>
          <Badge vtClass="c" glow>C</Badge>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Outlined</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge vtClass="m" outlined>M</Badge>
          <Badge vtClass="a" outlined>A</Badge>
          <Badge vtClass="b" outlined>B</Badge>
          <Badge vtClass="c" outlined>C</Badge>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Pill with Glow</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge vtClass="m" pill glow>M</Badge>
          <Badge vtClass="a" pill glow>A</Badge>
          <Badge vtClass="b" pill glow>B</Badge>
          <Badge vtClass="c" pill glow>C</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'VT (Vodní turistika) performance classes with gradient backgrounds: M (Mistr - Master, purple), A (red), B (amber), C (green).',
      },
    },
  },
};

/* ==========================================================================
   WITH ICONS
   ========================================================================== */

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="success" icon={<CheckIcon />}>Schváleno</Badge>
      <Badge variant="warning" icon={<AlertIcon />}>Čeká na schválení</Badge>
      <Badge variant="error" icon={<CloseIcon />}>Zamítnuto</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges can include icons for additional visual context.',
      },
    },
  },
};

/* ==========================================================================
   REAL-WORLD EXAMPLES
   ========================================================================== */

export const EventStatus: Story = {
  name: 'Example: Event Status',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ minWidth: '120px', fontSize: '14px' }}>Registrace:</span>
        <Badge variant="success">Otevřena</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ minWidth: '120px', fontSize: '14px' }}>Výsledky:</span>
        <Badge variant="info">Probíhá</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ minWidth: '120px', fontSize: '14px' }}>Archiv:</span>
        <Badge variant="default">Uzavřeno</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using badges to display event registration and result status.',
      },
    },
  },
};

export const AthleteProfile: Story = {
  name: 'Example: Athlete Profile',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
        border: '1px solid #e5e5e5',
        borderRadius: '8px',
        maxWidth: '300px',
      }}
    >
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>Jan Novák</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge section="dv" size="sm">Divoká voda</Badge>
          <Badge section="ry" size="sm" outlined>Rychlostní</Badge>
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>VT klasifikace</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Badge vtClass="a" size="sm" pill>K1 - A</Badge>
          <Badge vtClass="b" size="sm" pill>C1 - B</Badge>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Badge variant="success" size="sm" icon={<CheckIcon />}>Aktivní</Badge>
        <Badge variant="primary" size="sm" pill>2024</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combined usage in an athlete profile card showing sections, VT classes, and status.',
      },
    },
  },
};

export const ResultsTable: Story = {
  name: 'Example: Results Table',
  render: () => (
    <table style={{ borderCollapse: 'collapse', fontSize: '14px' }}>
      <thead>
        <tr>
          <th style={{ padding: '8px 16px', textAlign: 'left', borderBottom: '2px solid #e5e5e5' }}>Poř.</th>
          <th style={{ padding: '8px 16px', textAlign: 'left', borderBottom: '2px solid #e5e5e5' }}>Závodník</th>
          <th style={{ padding: '8px 16px', textAlign: 'left', borderBottom: '2px solid #e5e5e5' }}>Sekce</th>
          <th style={{ padding: '8px 16px', textAlign: 'left', borderBottom: '2px solid #e5e5e5' }}>Třída</th>
          <th style={{ padding: '8px 16px', textAlign: 'right', borderBottom: '2px solid #e5e5e5' }}>Čas</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e5e5' }}>1</td>
          <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e5e5' }}>Petr Svoboda</td>
          <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e5e5' }}>
            <Badge section="dv" size="sm">DV</Badge>
          </td>
          <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e5e5' }}>
            <Badge vtClass="m" size="sm" pill>M</Badge>
          </td>
          <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e5e5', textAlign: 'right', fontFamily: 'monospace' }}>1:23.45</td>
        </tr>
        <tr>
          <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e5e5' }}>2</td>
          <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e5e5' }}>Jana Králová</td>
          <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e5e5' }}>
            <Badge section="ry" size="sm">RY</Badge>
          </td>
          <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e5e5' }}>
            <Badge vtClass="a" size="sm" pill>A</Badge>
          </td>
          <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e5e5', textAlign: 'right', fontFamily: 'monospace' }}>1:25.67</td>
        </tr>
        <tr>
          <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e5e5' }}>3</td>
          <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e5e5' }}>Martin Horák</td>
          <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e5e5' }}>
            <Badge section="vt" size="sm">VT</Badge>
          </td>
          <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e5e5' }}>
            <Badge vtClass="b" size="sm" pill>B</Badge>
          </td>
          <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e5e5', textAlign: 'right', fontFamily: 'monospace' }}>1:28.90</td>
        </tr>
      </tbody>
    </table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using badges in a results table to display section and VT class information.',
      },
    },
  },
};

export const NotificationBadges: Story = {
  name: 'Example: Notification Badges',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Badge variant="error" size="sm" pill>3</Badge>
        <span style={{ fontSize: '14px' }}>Nové zprávy</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Badge variant="energy" size="sm" pill glow>!</Badge>
        <span style={{ fontSize: '14px' }}>Čeká na schválení</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Badge variant="success" size="sm" pill icon={<CheckIcon />}>Dokončeno</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pill badges for notification counts and status indicators. Energy variant for attention.',
      },
    },
  },
};

/* ==========================================================================
   FEATURED/SHOWCASE
   ========================================================================== */

export const FeaturedShowcase: Story = {
  name: 'Featured Showcase',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '32px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderRadius: '16px',
      }}
    >
      <div>
        <h3 style={{ margin: '0 0 16px 0', fontWeight: 600 }}>Live Event Status</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Badge variant="energy" size="lg" pill glow icon={
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <circle cx="12" cy="12" r="6" />
            </svg>
          }>ŽIVĚ</Badge>
          <Badge variant="gradient" size="lg" pill glow>Semifinále</Badge>
          <Badge section="dv" size="lg" pill glow>Kajak K1</Badge>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontWeight: 600 }}>Athlete Achievements</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge vtClass="m" size="lg" pill glow>Mistr ČR</Badge>
          <Badge variant="energy" size="lg" pill glow>Top 10 ICF</Badge>
          <Badge variant="success" pill icon={<CheckIcon />}>Kvalifikován OH</Badge>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', fontWeight: 600 }}>Race Categories</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge section="dv" glow>Slalom</Badge>
          <Badge section="dv" glow>Sjezd</Badge>
          <Badge section="ry" glow>Sprint</Badge>
          <Badge section="ry" glow>Maraton</Badge>
          <Badge section="vt" glow>Turistika</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of badges with gradient backgrounds and glow effects for featured content, live events, and achievements.',
      },
    },
  },
};
