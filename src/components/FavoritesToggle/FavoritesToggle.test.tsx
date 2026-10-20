import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { FavoritesToggle } from './FavoritesToggle';

const starFill = (button: HTMLElement) => button.querySelector('.csk-star-glyph path')?.getAttribute('fill');

describe('FavoritesToggle', () => {
  it('shows only an empty star without favourites (#84.6)', () => {
    render(<FavoritesToggle pressed={false} count={0} label="Jen oblíbení" />);
    const button = screen.getByRole('button', { name: 'Jen oblíbení (0)' });
    expect(button.querySelector('.csk-favorites-toggle__count')).toBeNull();
    expect(button).not.toHaveTextContent(/\d/);
    expect(starFill(button)).toBe('none');
  });

  it('shows a filled star and the count otherwise, pressed or not', () => {
    render(
      <>
        <FavoritesToggle pressed={false} count={2} label="Jen oblíbení" />
        <FavoritesToggle pressed count={12} label="Jen oblíbení" />
      </>
    );
    const [off, on] = screen.getAllByRole('button');
    expect(off).toHaveTextContent(/^2$/);
    expect(starFill(off)).toBe('currentColor');
    expect(off).toHaveAttribute('aria-pressed', 'false');
    expect(on).toHaveTextContent(/^12$/);
    expect(starFill(on)).toBe('currentColor');
    expect(on).toHaveAttribute('aria-pressed', 'true');
    expect(on).toHaveClass('csk-favorites-toggle--on');
  });

  it('toggles through onPressedChange', () => {
    const onPressedChange = vi.fn();
    render(<FavoritesToggle pressed={false} count={0} label="Jen oblíbení" onPressedChange={onPressedChange} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });
});
