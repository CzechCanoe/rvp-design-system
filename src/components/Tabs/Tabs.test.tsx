import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Tabs } from './Tabs';

const tabs = [
  { id: 'a', label: 'K1M' },
  { id: 'b', label: 'K1Ž' },
  { id: 'c', label: 'C1M' },
];

describe('Tabs variant="nav"', () => {
  it('renders the tab list without panels', () => {
    render(<Tabs tabs={tabs} variant="nav" defaultActiveTab="b" />);
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.queryByRole('tabpanel')).toBeNull();
    expect(screen.getByRole('tab', { name: 'K1Ž' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'K1Ž' })).not.toHaveAttribute('aria-controls');
  });

  it('calls onChange when a tab is clicked', () => {
    const onChange = vi.fn();
    render(<Tabs tabs={tabs} variant="nav" onChange={onChange} />);
    fireEvent.click(screen.getByRole('tab', { name: 'C1M' }));
    expect(onChange).toHaveBeenCalledWith('c');
  });

  it('keeps panels for the line variant', () => {
    render(<Tabs tabs={tabs.map((t) => ({ ...t, content: <p>{t.label} panel</p> }))} />);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('K1M panel');
  });

  it('adds the carousel modifier class', () => {
    const { container } = render(<Tabs tabs={tabs} variant="nav" overflow="carousel" />);
    expect(container.firstChild).toHaveClass('csk-tabs--overflow-carousel');
  });
});
