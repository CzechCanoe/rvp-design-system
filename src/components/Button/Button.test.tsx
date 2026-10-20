import { describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders a <button> by default', () => {
    render(<Button>Uložit</Button>);
    const button = screen.getByRole('button', { name: 'Uložit' });
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveClass('csk-button', 'csk-button--primary', 'csk-button--md');
  });

  it('renders a link with the same classes when href is given', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    render(
      <Button ref={ref} href="#propozice" variant="secondary" size="sm">
        Propozice (PDF)
      </Button>
    );
    const link = screen.getByRole('link', { name: 'Propozice (PDF)' });
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '#propozice');
    expect(link).toHaveClass('csk-button', 'csk-button--secondary', 'csk-button--sm');
    expect(link).not.toHaveAttribute('aria-disabled');
    expect(link).not.toHaveAttribute('rel');
    expect(ref.current).toBe(link);
  });

  it('renders a link for as="a"', () => {
    render(
      <Button as="a" href="#k1m2">
        K1 muži · 2. jízda
      </Button>
    );
    expect(screen.getByRole('link', { name: 'K1 muži · 2. jízda' })).toHaveAttribute('href', '#k1m2');
  });

  it('adds noopener noreferrer to target=_blank unless rel is given', () => {
    const { rerender } = render(
      <Button href="https://example.org" target="_blank">
        Web
      </Button>
    );
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer');
    rerender(
      <Button href="https://example.org" target="_blank" rel="noopener">
        Web
      </Button>
    );
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener');
    rerender(
      <Button href="/doc.pdf" rel="alternate">
        Web
      </Button>
    );
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'alternate');
  });

  it('makes a disabled link non-navigable: no href, aria-disabled, clicks ignored', () => {
    const onClick = vi.fn();
    render(
      <Button href="#prihlasit" disabled onClick={onClick}>
        Přihlásit
      </Button>
    );
    const link = screen.getByRole('link', { name: 'Přihlásit' });
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('treats a loading link as disabled and busy', () => {
    render(
      <Button href="#export" loading>
        Export
      </Button>
    );
    const link = screen.getByRole('link');
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('aria-busy', 'true');
  });

  it('passes clicks of an enabled link through', () => {
    const onClick = vi.fn();
    render(
      <Button href="#x" onClick={onClick}>
        Odkaz
      </Button>
    );
    fireEvent.click(screen.getByRole('link'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
