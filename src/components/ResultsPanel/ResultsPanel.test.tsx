import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResultsPanel } from './ResultsPanel';

describe('ResultsPanel', () => {
  it('renders toolbar, status line, table and footer in this order', () => {
    const { container } = render(
      <ResultsPanel
        search={<input aria-label="Hledat" />}
        filters={<button type="button">Kategorie</button>}
        favorites={<button type="button">★ 2</button>}
        detail={<label>Detailní</label>}
        state="provisional"
        status="po 2. jízdě"
        footer="24 lodí"
        footerLinks={<a href="#all">Zobrazit všechny</a>}
      >
        <table aria-label="Výsledky" />
      </ResultsPanel>
    );
    const panel = container.querySelector('.csk-results-panel');
    expect(panel).toHaveClass('csk-card', 'csk-card--surface', 'csk-card--padding-none');
    const toolbar = screen.getByRole('group', { name: 'Nástroje tabulky' });
    expect(toolbar).toHaveClass('csk-table-toolbar');
    expect(toolbar).toContainElement(screen.getByRole('textbox', { name: 'Hledat' }));
    expect(toolbar).toContainElement(screen.getByRole('button', { name: 'Kategorie' }));
    expect(toolbar).toContainElement(screen.getByText('Detailní'));
    expect(screen.getByText('Předběžné')).toBeInTheDocument();
    expect(screen.getByText('po 2. jízdě')).toBeInTheDocument();

    const parts = ['.csk-table-toolbar', '.csk-results-panel__status', 'table', '.csk-results-panel__foot'].map((s) =>
      container.querySelector(s)
    );
    parts.reduce((previous, current) => {
      expect(previous!.compareDocumentPosition(current!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      return current;
    });
    expect(screen.getByRole('link', { name: 'Zobrazit všechny' }).closest('.csk-results-panel__foot-links')).not.toBeNull();
  });

  it('draws nothing but the table when no slot is given', () => {
    const { container } = render(
      <ResultsPanel>
        <p>tabulka</p>
      </ResultsPanel>
    );
    expect(container.querySelector('.csk-table-toolbar')).toBeNull();
    expect(container.querySelector('.csk-results-panel__status')).toBeNull();
    expect(container.querySelector('.csk-card__footer')).toBeNull();
    expect(screen.getByText('tabulka')).toBeInTheDocument();
  });

  it('names the toolbar with toolbarLabel', () => {
    render(
      <ResultsPanel toolbarLabel="Filtry startovky" search={<input aria-label="Hledat" />}>
        <p>tabulka</p>
      </ResultsPanel>
    );
    expect(screen.getByRole('group', { name: 'Filtry startovky' })).toBeInTheDocument();
  });
});
