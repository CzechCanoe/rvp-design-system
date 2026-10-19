import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { StatusBadge } from '../StatusBadge';
import { ProfileHeader } from './ProfileHeader';

const meta = {
  title: 'Components/ProfileHeader',
  component: ProfileHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Head of an athlete profile: avatar, name, badges, meta line, `StatTile` row and actions. `page` is the public profile on the white page, `band` the phone "Moje" profile on the navy band.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {
  args: { name: 'Jan Novák' },
  render: () => (
    <div style={{ padding: 24 }}>
      <ProfileHeader
        name="Jan Novák"
        badges={
          <>
            <Badge section="dv">Divoká voda</Badge>
            <Badge variant="level">Slalom</Badge>
            <Badge variant="level">K1</Badge>
          </>
        }
        meta={[<a href="#klub">TJ Bohemians Praha</a>, 'ročník 2003', 'RGC 118 203', 'závodí od 2014']}
        tiles={[
          { label: 'VT slalom K1', value: '1', hint: 'platí do 31. 12. 2027' },
          { label: 'VT sjezd K1', value: '2+', hint: <StatusBadge state="provisional" size="sm" /> },
          { label: 'Český pohár 2026 · K1 muži', value: '4.', hint: '320 b. po 3 z 6 závodech' },
        ]}
        actions={
          <>
            <Button variant="secondary">★ Sledovat</Button>
            <Button variant="secondary">Sdílet</Button>
          </>
        }
      />
    </div>
  ),
};

export const Band: Story = {
  args: { name: 'Jan Novák' },
  render: () => (
    <div style={{ width: 390 }}>
      <ProfileHeader
        variant="band"
        name="Jan Novák"
        topbar={<span>kanoe.cz · závodníci</span>}
        actions={<a href="#upravit">Upravit profil</a>}
        badges={
          <>
            <Badge variant="level">Slalom</Badge>
            <Badge variant="level">Sjezd</Badge>
          </>
        }
        meta={['TJ Bohemians Praha', 'K1', 'ročník 2003']}
        tiles={[
          { label: 'VT slalom', value: '1' },
          { label: 'ČP 2026', value: '4.', delta: '▲2' },
          { label: 'Závodů 2026', value: '9' },
        ]}
      />
    </div>
  ),
};

export const WithoutTiles: Story = {
  args: { name: 'Eliška Svobodová' },
  render: () => (
    <div style={{ padding: 24 }}>
      <ProfileHeader name="Eliška Svobodová" meta={['SK Dukla Praha', 'ročník 2008']} />
    </div>
  ),
};
