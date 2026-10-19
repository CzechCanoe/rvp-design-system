import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProposalList } from './ProposalList';
import { proposals } from '../EntryTable/EntryTable.fixtures';

const meta: Meta<typeof ProposalList> = {
  title: 'Components/ProposalList',
  component: ProposalList,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ProposalList>;

export const Default: Story = {
  render: () => {
    const Demo = () => {
      const [list, setList] = useState(proposals);
      const drop = (id: string) => setList((l) => l.filter((p) => p.id !== id));
      return <ProposalList proposals={list} onConfirm={(p) => drop(p.id)} onReject={(p) => drop(p.id)} />;
    };
    return <Demo />;
  },
};

export const SingleProposal: Story = {
  args: { proposals: proposals.slice(0, 1) },
};
