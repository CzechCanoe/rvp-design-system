import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge, type StatusBadgeState } from '../StatusBadge';
import { MarkBadge } from '../MarkBadge';
import { PenaltyChip } from '../PenaltyChip';
import './StatesOverview.stories.css';

/**
 * Reproduces the bottom strip of docs/v2/reference/Main.html:
 * "Stavy hodnoty, to, co dnešní systémy neumějí říct".
 */
const meta = {
  title: 'States/Overview',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const cards: Array<{ state: StatusBadgeState; text: string }> = [
  { state: 'official', text: 'Schválené vrchním rozhodčím a počtářem. Jediný stav bez označení v tabulce.' },
  { state: 'provisional', text: 'Hodnota se ještě může pohnout. Živé výsledky, nepotvrzené VT, průběžný žebříček.' },
  {
    state: 'review',
    text: 'Rozhodčí hodnotu přezkoumávají. Může platit zároveň s Předběžné, proto jiná barva i tvar textu.',
  },
  { state: 'unknown', text: 'Ještě nedorazilo, nebo k dispozici není. Nikdy nula, nikdy pomlčka tvářící se jako hodnota.' },
];

function Overview() {
  return (
    <section className="states-overview">
      <h3 className="states-overview__title">Stavy hodnoty, to, co dnešní systémy neumějí říct</h3>
      <div className="states-overview__cards">
        {cards.map((c) => (
          <div key={c.state} className="states-overview__card">
            <StatusBadge state={c.state} />
            <div className="states-overview__text">{c.text}</div>
          </div>
        ))}
      </div>
      <div className="states-overview__strip">
        <StatusBadge state="live" />
        <span className="states-overview__item">
          <span className="states-overview__time states-overview__time--running">0:46.50</span>
          <span className="states-overview__note">běží</span>
        </span>
        <span className="states-overview__item">
          <span className="states-overview__time states-overview__time--stale">0:46.50</span>
          <span className="states-overview__note">zastaveno, bez dat 6 s</span>
        </span>
        <span className="states-overview__item states-overview__item--centered">
          <PenaltyChip penalty={0} />
          <PenaltyChip penalty={2} />
          <PenaltyChip penalty={50} />
          <PenaltyChip penalty={null} />
          <span className="states-overview__note">branky: čistá, dotek, minutí, neposouzeno</span>
        </span>
        <span className="states-overview__item states-overview__item--centered">
          <MarkBadge mark="DNS" />
          <MarkBadge mark="DNF" />
          <MarkBadge mark="DSQ" />
          <span className="states-overview__note">značky místo času, nikdy vedle něj</span>
        </span>
      </div>
    </section>
  );
}

export const Default: Story = { render: () => <Overview /> };
