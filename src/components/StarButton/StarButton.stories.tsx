import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { StarButton } from './StarButton';

const meta = {
  title: 'Components/StarButton',
  component: StarButton,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof StarButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { pressed: false, label: 'Oblíbený: HNILICA Lukas' },
  render: () => {
    const Demo = () => {
      const [a, setA] = useState(true);
      const [b, setB] = useState(false);
      return (
        <div style={{ display: 'flex', gap: 8 }}>
          <StarButton pressed={a} onPressedChange={setA} label="Oblíbený: HNILICA Lukas" />
          <StarButton pressed={b} onPressedChange={setB} label="Oblíbený: REZEK Adam" />
          <StarButton pressed={false} disabled label="Oblíbený: nedostupný" />
        </div>
      );
    };
    return <Demo />;
  },
};
