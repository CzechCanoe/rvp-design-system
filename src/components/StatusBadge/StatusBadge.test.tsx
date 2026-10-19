import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it.each([
    ['official', 'Oficiální'],
    ['provisional', 'Předběžné'],
    ['review', 'V revizi'],
    ['unknown', 'Neznámo'],
    ['live', 'Live'],
    ['stale', 'Zastaveno'],
  ] as const)('renders the default Czech label for %s', (state, label) => {
    render(<StatusBadge state={state} />);
    expect(screen.getByText(label)).toHaveClass(`csk-status-badge--${state}`);
  });

  it('overrides the label', () => {
    render(<StatusBadge state="provisional" label="Průběžné" />);
    expect(screen.getByText('Průběžné')).toBeInTheDocument();
  });

  it('renders the pulsing dot only for live', () => {
    const { container, rerender } = render(<StatusBadge state="live" />);
    expect(container.querySelector('.csk-status-badge__dot')).not.toBeNull();
    rerender(<StatusBadge state="official" />);
    expect(container.querySelector('.csk-status-badge__dot')).toBeNull();
  });
});
