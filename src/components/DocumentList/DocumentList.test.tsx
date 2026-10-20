import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { DocumentList } from './DocumentList';

describe('DocumentList', () => {
  it('renders one link per document with the format suffix', () => {
    render(
      <DocumentList
        aria-label="Dokumenty"
        items={[
          { label: 'Propozice závodu', href: '#p', kind: 'pdf' },
          { label: 'Přihlášky', href: '#x', kind: 'xlsx' },
          { label: 'Export', href: '#xml', kind: 'xml' },
          { label: 'Na kanoe.cz', href: '#k', kind: 'link' },
        ]}
      />
    );
    const list = screen.getByRole('list', { name: 'Dokumenty' });
    expect(within(list).getAllByRole('listitem')).toHaveLength(4);
    expect(screen.getByRole('link', { name: 'Propozice závodu (PDF)' })).toHaveAttribute('href', '#p');
    expect(screen.getByRole('link', { name: 'Přihlášky (XLSX)' })).toHaveAttribute('href', '#x');
    expect(screen.getByRole('link', { name: 'Export (XML)' })).toHaveAttribute('href', '#xml');
    // a web page has no suffix
    expect(screen.getByRole('link', { name: 'Na kanoe.cz' })).toHaveAttribute('href', '#k');
  });

  it('renders further formats as separate links after a plain label', () => {
    render(
      <DocumentList
        items={[
          {
            label: 'Výsledky sobota, oficiální',
            href: '#r.pdf',
            kind: 'pdf',
            formats: [
              { kind: 'xlsx', href: '#r.xlsx' },
              { kind: 'xml', href: '#r.xml' },
            ],
          },
        ]}
      />
    );
    const item = screen.getByRole('listitem');
    expect(item).toHaveTextContent('Výsledky sobota, oficiální (PDF · XLSX · XML)');
    const links = within(item).getAllByRole('link');
    expect(links.map((a) => a.getAttribute('href'))).toEqual(['#r.pdf', '#r.xlsx', '#r.xml']);
    expect(links[1]).toHaveAccessibleName('Výsledky sobota, oficiální, XLSX');
  });

  it('shows the date as text and accepts own suffix labels', () => {
    render(
      <DocumentList
        kindLabels={{ pdf: 'pdf' }}
        items={[{ label: 'Propozice', href: '#p', kind: 'pdf', date: '12. 9. 2026' }]}
      />
    );
    expect(screen.getByRole('link', { name: 'Propozice (pdf)' })).toBeInTheDocument();
    expect(screen.getByText('12. 9. 2026')).toHaveClass('csk-document-list__date');
  });
});
