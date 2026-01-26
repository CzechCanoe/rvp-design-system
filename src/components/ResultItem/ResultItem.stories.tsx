import type { Meta, StoryObj } from '@storybook/react';
import { ResultItem } from './ResultItem';
import { Badge } from '../Badge';
import { Card } from '../Card';

const meta: Meta<typeof ResultItem> = {
  title: 'Components/ResultItem',
  component: ResultItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    rank: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Rank/position (1-3 gets medal styling)',
    },
    title: {
      control: 'text',
      description: 'Main title',
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle text',
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed'],
      description: 'Style variant',
    },
    section: {
      control: 'select',
      options: [undefined, 'dv', 'ry', 'vt', 'generic'],
      description: 'Section color for border accent',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResultItem>;

// ============================================================================
// Basic Stories
// ============================================================================

export const Default: Story = {
  args: {
    rank: 1,
    title: 'MS Praha 2024',
    subtitle: 'C1M',
    trailing: '1:32.45',
  },
};

export const Gold: Story = {
  args: {
    rank: 1,
    title: 'Mistrovství světa Praha 2024',
    subtitle: 'C1 muži',
    trailing: '1:32.45',
    onClick: () => console.log('Gold clicked'),
  },
};

export const Silver: Story = {
  args: {
    rank: 2,
    title: 'Světový pohár Augsburg',
    subtitle: 'K1 muži',
    trailing: '1:34.12',
    onClick: () => console.log('Silver clicked'),
  },
};

export const Bronze: Story = {
  args: {
    rank: 3,
    title: 'Mistrovství Evropy Tacen',
    subtitle: 'C1 muži',
    trailing: '1:35.78',
    onClick: () => console.log('Bronze clicked'),
  },
};

export const NoMedal: Story = {
  args: {
    rank: 7,
    title: 'Světový pohár Markkleeberg',
    subtitle: 'K1 muži',
    trailing: '1:38.92',
    onClick: () => console.log('NoMedal clicked'),
  },
};

// ============================================================================
// Variants
// ============================================================================

export const Compact: Story = {
  args: {
    rank: 1,
    title: 'MS Praha 2024',
    subtitle: 'C1M',
    trailing: '1:32.45',
    variant: 'compact',
    onClick: () => {},
  },
};

export const Detailed: Story = {
  args: {
    rank: 1,
    title: 'Mistrovství světa Praha 2024',
    subtitle: 'C1 muži - finále',
    meta: <span>15. 6. 2024 | Troja, Praha, CZE</span>,
    trailing: '1:32.45',
    variant: 'detailed',
    onClick: () => {},
  },
};

// ============================================================================
// Section Colors
// ============================================================================

export const SectionDV: Story = {
  args: {
    rank: 4,
    title: 'Český pohár Troja',
    subtitle: 'C1M',
    trailing: '1:42.15',
    section: 'dv',
    onClick: () => {},
  },
};

export const SectionRY: Story = {
  args: {
    rank: 5,
    title: 'Mistrovství ČR rychlostní kanoistika',
    subtitle: 'K2 500m',
    trailing: '1:28.45',
    section: 'ry',
    onClick: () => {},
  },
};

export const SectionVT: Story = {
  args: {
    rank: 6,
    title: 'Mistrovství ČR divoká voda',
    subtitle: 'C1M sprint',
    trailing: '15.23',
    section: 'vt',
    onClick: () => {},
  },
};

// ============================================================================
// With Badge
// ============================================================================

export const WithBadge: Story = {
  args: {
    rank: 2,
    title: 'Světový pohár Augsburg',
    subtitle: 'K1 muži',
    trailing: <Badge variant="success" size="sm">Finále</Badge>,
    onClick: () => {},
  },
};

export const WithMultipleTrailing: Story = {
  args: {
    rank: 1,
    title: 'MS Praha 2024',
    subtitle: 'C1 muži',
    trailing: (
      <>
        <Badge section="dv" size="sm">DV</Badge>
        <span style={{ fontFamily: 'var(--font-family-mono)', fontWeight: 600 }}>1:32.45</span>
      </>
    ),
    onClick: () => {},
  },
};

// ============================================================================
// Link vs Button
// ============================================================================

export const AsLink: Story = {
  args: {
    rank: 1,
    title: 'MS Praha 2024',
    subtitle: 'C1M',
    trailing: '1:32.45',
    href: '#result-123',
  },
};

export const AsButton: Story = {
  args: {
    rank: 1,
    title: 'MS Praha 2024',
    subtitle: 'C1M',
    trailing: '1:32.45',
    onClick: () => alert('Clicked!'),
  },
};

export const NotClickable: Story = {
  args: {
    rank: 1,
    title: 'MS Praha 2024',
    subtitle: 'C1M',
    trailing: '1:32.45',
  },
};

// ============================================================================
// List Examples
// ============================================================================

export const ResultsList: Story = {
  render: () => (
    <Card variant="surface" padding="none">
      <ResultItem
        rank={1}
        title="MS Praha 2024"
        subtitle="C1 muži"
        trailing="1:32.45"
        onClick={() => {}}
      />
      <ResultItem
        rank={2}
        title="Světový pohár Augsburg"
        subtitle="K1 muži"
        trailing="1:34.12"
        onClick={() => {}}
      />
      <ResultItem
        rank={3}
        title="ME Tacen"
        subtitle="C1 muži"
        trailing="1:35.78"
        onClick={() => {}}
      />
      <ResultItem
        rank={4}
        title="Český pohár Troja"
        subtitle="C1 muži"
        trailing="1:38.45"
        onClick={() => {}}
      />
      <ResultItem
        rank={5}
        title="Český pohár Lipno"
        subtitle="C1 muži"
        trailing="1:40.12"
        onClick={() => {}}
      />
    </Card>
  ),
};

export const CompactList: Story = {
  render: () => (
    <Card variant="surface" padding="none">
      <ResultItem
        rank={1}
        title="MS Praha"
        subtitle="C1M"
        trailing="1:32.45"
        variant="compact"
        onClick={() => {}}
      />
      <ResultItem
        rank={2}
        title="SP Augsburg"
        subtitle="K1M"
        trailing="1:34.12"
        variant="compact"
        onClick={() => {}}
      />
      <ResultItem
        rank={3}
        title="ME Tacen"
        subtitle="C1M"
        trailing="1:35.78"
        variant="compact"
        onClick={() => {}}
      />
      <ResultItem
        rank={4}
        title="ČP Troja"
        subtitle="C1M"
        trailing="1:38.45"
        variant="compact"
        onClick={() => {}}
      />
      <ResultItem
        rank={5}
        title="ČP Lipno"
        subtitle="C1M"
        trailing="1:40.12"
        variant="compact"
        onClick={() => {}}
      />
    </Card>
  ),
};

export const DetailedList: Story = {
  render: () => (
    <Card variant="surface" padding="none">
      <ResultItem
        rank={1}
        title="Mistrovství světa Praha 2024"
        subtitle="C1 muži - finále"
        meta="15. 6. 2024 | Troja, Praha, CZE"
        trailing="1:32.45"
        variant="detailed"
        onClick={() => {}}
      />
      <ResultItem
        rank={2}
        title="Světový pohár Augsburg"
        subtitle="K1 muži - finále"
        meta="22. 5. 2024 | Augsburg, GER"
        trailing="1:34.12"
        variant="detailed"
        onClick={() => {}}
      />
      <ResultItem
        rank={3}
        title="Mistrovství Evropy Tacen"
        subtitle="C1 muži - finále"
        meta="8. 4. 2024 | Tacen, SLO"
        trailing="1:35.78"
        variant="detailed"
        onClick={() => {}}
      />
    </Card>
  ),
};

export const MixedSections: Story = {
  render: () => (
    <Card variant="surface" padding="none">
      <ResultItem
        rank={1}
        title="MS Praha 2024"
        subtitle="C1M slalom"
        trailing={<Badge section="dv" size="sm">DV</Badge>}
        section="dv"
        onClick={() => {}}
      />
      <ResultItem
        rank={2}
        title="MČR rychlostní kanoistika"
        subtitle="K2 500m"
        trailing={<Badge section="ry" size="sm">RY</Badge>}
        section="ry"
        onClick={() => {}}
      />
      <ResultItem
        rank={1}
        title="Český pohár sjezd"
        subtitle="C1M sprint"
        trailing={<Badge section="vt" size="sm">VT</Badge>}
        section="vt"
        onClick={() => {}}
      />
    </Card>
  ),
};

// ============================================================================
// All Medal Variants
// ============================================================================

export const AllMedals: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Card variant="surface" padding="none">
        <h4 style={{ padding: '1rem', margin: 0, borderBottom: '1px solid var(--color-border-primary)' }}>
          Default Variant
        </h4>
        <ResultItem rank={1} title="First Place" subtitle="Gold medal" trailing="1:32.45" onClick={() => {}} />
        <ResultItem rank={2} title="Second Place" subtitle="Silver medal" trailing="1:34.12" onClick={() => {}} />
        <ResultItem rank={3} title="Third Place" subtitle="Bronze medal" trailing="1:35.78" onClick={() => {}} />
        <ResultItem rank={4} title="Fourth Place" subtitle="No medal" trailing="1:36.45" onClick={() => {}} />
      </Card>

      <Card variant="surface" padding="none">
        <h4 style={{ padding: '1rem', margin: 0, borderBottom: '1px solid var(--color-border-primary)' }}>
          Compact Variant
        </h4>
        <ResultItem rank={1} title="First Place" subtitle="Gold" trailing="1:32.45" variant="compact" onClick={() => {}} />
        <ResultItem rank={2} title="Second Place" subtitle="Silver" trailing="1:34.12" variant="compact" onClick={() => {}} />
        <ResultItem rank={3} title="Third Place" subtitle="Bronze" trailing="1:35.78" variant="compact" onClick={() => {}} />
      </Card>

      <Card variant="surface" padding="none">
        <h4 style={{ padding: '1rem', margin: 0, borderBottom: '1px solid var(--color-border-primary)' }}>
          Detailed Variant
        </h4>
        <ResultItem
          rank={1}
          title="First Place Achievement"
          subtitle="Gold medal - World Championship"
          meta="June 15, 2024 | Prague, CZE"
          trailing="1:32.45"
          variant="detailed"
          onClick={() => {}}
        />
        <ResultItem
          rank={2}
          title="Second Place Achievement"
          subtitle="Silver medal - World Cup"
          meta="May 22, 2024 | Augsburg, GER"
          trailing="1:34.12"
          variant="detailed"
          onClick={() => {}}
        />
      </Card>
    </div>
  ),
};
