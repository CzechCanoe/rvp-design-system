import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PenaltyChip, penaltyTone } from './PenaltyChip';
import { GateGrid } from '../GateGrid';
import { MarkBadge } from '../MarkBadge';
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
});

describe('GateGrid', () => {
  it('renders one chip per gate', () => {
    render(<GateGrid gates={[{ gate: 1, penalty: 0 }, { gate: 2, penalty: 50 }]} />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('shows text when the course configuration is unavailable', () => {
    render(<GateGrid gates={[]} unavailable />);
    expect(screen.getByText('bez konfigurace tratě')).toBeInTheDocument();
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
