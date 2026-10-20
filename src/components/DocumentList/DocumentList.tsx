import { forwardRef, Fragment, type HTMLAttributes, type ReactNode } from 'react';
import './DocumentList.css';

/** Kind of a document: a file format (`pdf`, `xlsx`, `xml`) or a web page (`link`, no suffix). */
export type DocumentKind = 'pdf' | 'xlsx' | 'xml' | 'link';

/** Another format of the same document ("Výsledky sobota (PDF · XLSX · XML)"). */
export interface DocumentFormat {
  kind: DocumentKind;
  href: string;
}

export interface DocumentListItem {
  /** Stable key; defaults to `href` */
  id?: string;
  /** Name of the document, without the format ("Propozice závodu") */
  label: string;
  href: string;
  kind: DocumentKind;
  /** Date text shown after the link, formatted by the application ("12. 9. 2026") */
  date?: ReactNode;
  /**
   * Further formats of the same document. The label is then plain text and every format,
   * `kind` first, is its own link in the suffix: "Výsledky sobota, oficiální (PDF · XLSX · XML)".
   */
  formats?: DocumentFormat[];
}

/** Format suffixes (reference `Zavod.html`); `link` has none. */
export const DOCUMENT_KIND_LABELS: Record<DocumentKind, string> = {
  pdf: 'PDF',
  xlsx: 'XLSX',
  xml: 'XML',
  link: '',
};

export interface DocumentListProps extends Omit<HTMLAttributes<HTMLUListElement>, 'children'> {
  items: DocumentListItem[];
  /** Override the format suffixes */
  kindLabels?: Partial<Record<DocumentKind, string>>;
}

/**
 * List of documents of an event (propositions, start lists, results) with the format suffix
 * after the name: "Propozice závodu (PDF)". Plain links, no buttons; the application formats dates.
 */
export const DocumentList = forwardRef<HTMLUListElement, DocumentListProps>(
  ({ items, kindLabels, className, ...props }, ref) => {
    const labels = { ...DOCUMENT_KIND_LABELS, ...kindLabels };
    const classes = ['csk-document-list', className].filter(Boolean).join(' ');

    return (
      <ul ref={ref} className={classes} {...props}>
        {items.map((item, index) => {
          const formats: DocumentFormat[] = [{ kind: item.kind, href: item.href }, ...(item.formats ?? [])];
          const multi = formats.length > 1;
          const suffix = labels[item.kind];

          return (
            <li key={item.id ?? `${item.href}-${index}`} className="csk-document-list__item">
              {multi ? (
                <span className="csk-document-list__name">
                  <span className="csk-document-list__label">{item.label}</span>{' '}
                  <span className="csk-document-list__formats">
                    (
                    {formats.map((format, i) => {
                      const text = labels[format.kind] || format.href;
                      return (
                        <Fragment key={format.href}>
                          {i > 0 && <span aria-hidden="true"> · </span>}
                          <a
                            className="csk-document-list__link"
                            href={format.href}
                            aria-label={`${item.label}, ${text}`}
                          >
                            {text}
                          </a>
                        </Fragment>
                      );
                    })}
                    )
                  </span>
                </span>
              ) : (
                <a className="csk-document-list__link" href={item.href}>
                  {item.label}
                  {suffix && (
                    <>
                      {' '}
                      <span className="csk-document-list__format">({suffix})</span>
                    </>
                  )}
                </a>
              )}
              {item.date && <span className="csk-document-list__date">{item.date}</span>}
            </li>
          );
        })}
      </ul>
    );
  }
);

DocumentList.displayName = 'DocumentList';
