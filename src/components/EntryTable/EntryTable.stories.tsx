import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../Card';
import { EntryTable, type EntryBoat } from './EntryTable';
import { c2Boats, categoryOptions, checkColumns, k1Boats } from './EntryTable.fixtures';

const meta: Meta<typeof EntryTable> = {
  title: 'Components/EntryTable',
  component: EntryTable,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof EntryTable>;

function Interactive({ initial, caption }: { initial: EntryBoat[]; caption: string }) {
  const [boats, setBoats] = useState(initial);
  return (
    <Card padding="none">
      <EntryTable
        caption={caption}
        boats={boats}
        checkColumns={checkColumns}
        categoryOptions={categoryOptions}
        onCategoryChange={(boat, category) =>
          setBoats((list) => list.map((b) => (b.id === boat.id ? { ...b, category } : b)))
        }
        onRemove={(boat) => setBoats((list) => list.filter((b) => b.id !== boat.id))}
        onReplaceMember={() => undefined}
      />
    </Card>
  );
}

/** Single boats: warning badges (expired medical, unpaid fee) and a category hint; nothing blocks. */
export const SingleBoats: Story = {
  render: () => <Interactive initial={k1Boats} caption="K1 muži" />,
};

/** C2: one boat is two rows (rowSpan for category, fee and actions); the second boat has an open seat. */
export const TwoPersonBoats: Story = {
  render: () => <Interactive initial={c2Boats} caption="C2 mix" />,
};

export const Empty: Story = {
  render: () => <Interactive initial={[]} caption="K1 ženy" />,
};
