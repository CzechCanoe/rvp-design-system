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
          'Badge for labels and categories. Variants: default, primary, success, warning, error, info, level (race level), outline, live. CSK sections (DV, RY, VT) and VT classes (M, A, B, C) via props. Value states (official, provisional, review ...) belong to StatusBadge.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info', 'level', 'outline', 'live'],
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
      options: ['sm', 'md'],
      description: 'Size of the badge',
    },
    pill: {
      control: 'boolean',
      description: 'Use pill shape (fully rounded)',
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

const row = { display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' } as const;
const heading = { margin: '0 0 8px 0', fontSize: '14px', color: 'var(--csk-color-text-3)' } as const;

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
    <div style={row}>
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="level">ČP</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="live">Live</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Neutral, primary, semantic tints (checks), level, outline and live.',
      },
    },
  },
};

export const Level: Story = {
  render: () => (
    <div style={row}>
      <Badge variant="level">ČP</Badge>
      <Badge variant="level">MČR</Badge>
      <Badge variant="level">NKZ</Badge>
      <Badge variant="level">Přebor</Badge>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Race level badges.' } },
  },
};

export const Live: Story = {
  render: () => (
    <div style={row}>
      <Badge variant="live">Live</Badge>
      <Badge variant="live" size="sm">Live</Badge>
      <Badge variant="live" pill>Live</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Live: red, upper case, with a dot. For the animated state badge use StatusBadge.',
      },
    },
  },
};

export const Outline: Story = {
  render: () => (
    <div style={row}>
      <Badge variant="outline">U18</Badge>
      <Badge variant="outline" size="sm">U18</Badge>
      <Badge variant="outline" pill>K1M</Badge>
    </div>
  ),
};

/* ==========================================================================
   SIZES
   ========================================================================== */

export const Sizes: Story = {
  render: () => (
    <div style={row}>
      <Badge size="sm" variant="primary">Small</Badge>
      <Badge size="md" variant="primary">Medium</Badge>
    </div>
  ),
};

/* ==========================================================================
   PILL SHAPE
   ========================================================================== */

export const PillShape: Story = {
  render: () => (
    <div style={row}>
      <Badge pill>Default</Badge>
      <Badge pill variant="primary">Primary</Badge>
      <Badge pill variant="success">Success</Badge>
      <Badge pill variant="level">MČR</Badge>
    </div>
  ),
};

/* ==========================================================================
   CSK SECTIONS
   ========================================================================== */

export const CskSections: Story = {
  name: 'CSK Sections',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={heading}>Sections</h4>
        <div style={row}>
          <Badge section="dv">Divoká voda</Badge>
          <Badge section="ry">Rychlostní</Badge>
          <Badge section="vt">Vodní turistika</Badge>
        </div>
      </div>
      <div>
        <h4 style={heading}>Abbreviations, small</h4>
        <div style={row}>
          <Badge section="dv" size="sm">DV</Badge>
          <Badge section="ry" size="sm">RY</Badge>
          <Badge section="vt" size="sm">VT</Badge>
        </div>
      </div>
      <div>
        <h4 style={heading}>Pill</h4>
        <div style={row}>
          <Badge section="dv" pill>Divoká voda</Badge>
          <Badge section="ry" pill>Rychlostní</Badge>
          <Badge section="vt" pill>Vodní turistika</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'CSK discipline sections: DV (Divoká voda, blue), RY (Rychlostní, green), VT (Vodní turistika, rust).',
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
      <div style={row}>
        <Badge vtClass="m">M - Mistr</Badge>
        <Badge vtClass="a">A</Badge>
        <Badge vtClass="b">B</Badge>
        <Badge vtClass="c">C</Badge>
      </div>
      <div style={row}>
        <Badge vtClass="m" pill>M</Badge>
        <Badge vtClass="a" pill>A</Badge>
        <Badge vtClass="b" pill>B</Badge>
        <Badge vtClass="c" pill>C</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'VT performance classes: M (Mistr), A, B, C.',
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
    <div style={row}>
      <Badge variant="success" icon={<CheckIcon />}>V pořádku</Badge>
      <Badge variant="warning" icon={<AlertIcon />}>Zkontrolovat</Badge>
      <Badge variant="error" icon={<CloseIcon />}>Chyba</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges can include icons, e.g. entry checks.',
      },
    },
  },
};

/* ==========================================================================
   EXAMPLE: EVENT ROW
   ========================================================================== */

export const EventRow: Story = {
  render: () => (
    <div style={row}>
      <Badge section="dv">DV</Badge>
      <Badge variant="level">MČR</Badge>
      <strong>Mistrovství ČR ve slalomu</strong>
      <Badge variant="live">Live</Badge>
      <Badge variant="outline">U18</Badge>
    </div>
  ),
};

/** Inside a container with `data-tone="on-dark"` (navy band) level and default badges become translucent white. */
export const OnDark: Story = {
  render: () => (
    <div data-tone="on-dark" style={{ display: 'flex', gap: 8, padding: 16, background: 'var(--csk-color-brand)' }}>
      <Badge variant="level">Slalom</Badge>
      <Badge variant="level">Sjezd</Badge>
      <Badge>K1</Badge>
    </div>
  ),
};
