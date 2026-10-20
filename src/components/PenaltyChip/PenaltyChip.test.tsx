import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PenaltyChip, penaltyTone } from './PenaltyChip';
import { GateGrid } from '../GateGrid';
import { MarkBadge, MARK_DESCRIPTIONS } from '../MarkBadge';
import { BibBadge } from '../BibBadge';
import { Notice } from '../Notice';
import { StatTile } from '../StatTile';

describe('PenaltyChip', () => {
  it('maps penalties to tones, null is never clean', () => {
    expect(penaltyTone(0)).toBe('clean');
    expect(penaltyTone(2)).toBe('touch');
    expect(penaltyTone(4)).toBe('touch');
    expect(penaltyTone(50)).toBe('miss');
    expect(penaltyTone(150)).toBe('miss');
    expect(penaltyTone(null)).toBe('unjudged');
  });

  it('labels not-judged gates accessibly', () => {
    render(<PenaltyChip penalty={null} gate={6} />);
    expect(screen.getByRole('img', { name: 'Branka 6: neposouzeno' })).toHaveClass('csk-penalty-chip--unjudged');
  });

  it('marks upstream gates', () => {
    render(<PenaltyChip penalty={2} gate={7} upstream />);
    expect(screen.getByRole('img', { name: /proti proudu/ })).toHaveClass('csk-penalty-chip--upstream');
  });

  it('with a gate shows the gate number, the colour and the title carry the penalty', () => {
    const cases: Array<[number | null, string, string]> = [
      [0, 'clean', 'Branka 3: 0 s'],
      [2, 'touch', 'Branka 3: 2 s'],
      [50, 'miss', 'Branka 3: 50 s'],
      [null, 'unjudged', 'Branka 3: neposouzeno'],
    ];
    for (const [penalty, tone, label] of cases) {
      const { unmount } = render(<PenaltyChip penalty={penalty} gate={3} />);
      const chip = screen.getByRole('img', { name: label });
      expect(chip).toHaveTextContent(/^3$/);
      expect(chip).toHaveAttribute('title', label);
      expect(chip).toHaveClass(`csk-penalty-chip--${tone}`, 'csk-penalty-chip--gate');
      unmount();
    }
  });

  it('without a gate keeps showing the value (run sum, team total), with a title', () => {
    render(
      <>
        <PenaltyChip penalty={52} />
        <PenaltyChip penalty={0} />
        <PenaltyChip penalty={null} />
      </>
    );
    const [sum, zero, unjudged] = screen.getAllByRole('img');
    expect(sum).toHaveTextContent(/^52$/);
    expect(sum).toHaveAttribute('title', 'Penalizace: 52 s');
    expect(sum).not.toHaveClass('csk-penalty-chip--gate');
    expect(zero).toHaveTextContent(/^0$/);
    expect(unjudged).toHaveTextContent(/^·$/);
    expect(unjudged).toHaveAttribute('title', 'Penalizace: neposouzeno');
  });

  it('lets the application override the title', () => {
    render(<PenaltyChip penalty={2} gate={4} title="Gate 4: +2 s" />);
    expect(screen.getByRole('img', { name: 'Branka 4: 2 s' })).toHaveAttribute('title', 'Gate 4: +2 s');
  });
});

describe('GateGrid', () => {
  it('renders one chip per gate', () => {
    render(<GateGrid gates={[{ gate: 1, penalty: 0 }, { gate: 2, penalty: 50 }]} />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('shows gate numbers in order, penalties as colour + title (regression #84.11)', () => {
    render(
      <GateGrid
        gates={[
          { gate: 1, penalty: 0 },
          { gate: 2, penalty: 0 },
          { gate: 3, penalty: 2 },
          { gate: 4, penalty: 50, upstream: true },
          { gate: 5, penalty: null },
        ]}
      />
    );
    const chips = screen.getAllByRole('img');
    expect(chips.map((c) => c.textContent)).toEqual(['1', '2', '3', '4', '5']);
    expect(chips.map((c) => c.getAttribute('title'))).toEqual([
      'Branka 1: 0 s',
      'Branka 2: 0 s',
      'Branka 3: 2 s',
      'Branka 4: 50 s, proti proudu',
      'Branka 5: neposouzeno',
    ]);
    expect(chips[2]).toHaveClass('csk-penalty-chip--touch');
    expect(chips[3]).toHaveClass('csk-penalty-chip--miss', 'csk-penalty-chip--upstream');
    expect(chips[4]).toHaveClass('csk-penalty-chip--unjudged');
  });

  it('shows text when the course configuration is unavailable', () => {
    render(<GateGrid gates={[]} unavailable />);
    expect(screen.getByText('bez konfigurace tratě')).toBeInTheDocument();
  });
});

describe('MarkBadge', () => {
  it('knows the full c123 vocabulary with Czech titles (T18 c)', () => {
    const cases = [
      ['CAP', 'Převrhl se'],
      ['RAL', 'Zařazen na poslední místo'],
      ['DSQ-R', 'Diskvalifikován v jízdě'],
      ['DQB', 'Diskvalifikován za nesportovní chování'],
    ] as const;
    for (const [mark, title] of cases) {
      const { unmount } = render(<MarkBadge mark={mark} />);
      expect(screen.getByText(mark)).toHaveAttribute('title', title);
      expect(screen.getByText(mark)).toHaveClass('csk-mark-badge');
      unmount();
    }
    expect(Object.keys(MARK_DESCRIPTIONS)).toEqual(
      expect.arrayContaining(['DNS', 'DNS-A', 'DNS-B', 'DNF', 'DSQ', 'DSQ-R', 'DQB', 'CAP', 'RAL', 'NR'])
    );
  });
});

describe('MarkBadge, BibBadge, Notice, StatTile', () => {
  it('render their content', () => {
    render(
      <>
        <MarkBadge mark="DSQ" />
        <BibBadge bib={12} />
        <Notice tone="warn" title="Pozor">
          text
        </Notice>
        <StatTile label="Přihlášeno" value={128} delta="▲2" hint="od včerejška" />
      </>
    );
    expect(screen.getByText('DSQ')).toBeInTheDocument();
    expect(screen.getByText('12')).toHaveClass('csk-bib-badge');
    expect(screen.getByRole('note')).toHaveClass('csk-notice--warn');
    expect(screen.getByText('▲2')).toBeInTheDocument();
    expect(screen.getByText('od včerejška')).toBeInTheDocument();
  });
});
