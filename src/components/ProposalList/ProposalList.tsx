import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import './ProposalList.css';

/** An entry proposed by an athlete, waiting for the club to confirm. */
export interface Proposal {
  id: string;
  name: string;
  /** Secondary text after the name, e.g. `1999 · RGC 118 203`. */
  detail?: ReactNode;
  /** Proposed class, e.g. `K1 muži`. */
  category?: ReactNode;
  /** When it was proposed, formatted by the application, e.g. `navrhl út 9:12`. */
  proposedAt?: ReactNode;
}

export interface ProposalListLabels {
  title: ReactNode;
  hint: ReactNode;
  /** Count badge text, e.g. `2 čekají`. */
  count: (n: number) => ReactNode;
  confirm: ReactNode;
  reject: ReactNode;
  /** Accessible names of the buttons, given the proposal. */
  confirmOf: (p: Proposal) => string;
  rejectOf: (p: Proposal) => string;
}

export const PROPOSAL_LIST_LABELS: ProposalListLabels = {
  title: 'Návrhy od závodníků',
  hint: 'dospělí členové si přihlášku navrhli sami, oddíl potvrzuje',
  count: (n) => (n === 1 ? '1 čeká' : n >= 2 && n <= 4 ? `${n} čekají` : `${n} čeká`),
  confirm: 'Potvrdit',
  reject: 'Odmítnout',
  confirmOf: (p) => `Potvrdit návrh: ${p.name}`,
  rejectOf: (p) => `Odmítnout návrh: ${p.name}`,
};

export interface ProposalListProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  proposals: Proposal[];
  labels?: Partial<ProposalListLabels>;
  onConfirm?: (proposal: Proposal) => void;
  onReject?: (proposal: Proposal) => void;
}

/**
 * Entries proposed by athletes with Confirm / Reject. Renders nothing when no proposal is waiting.
 * Rows stack on a narrow container (the buttons go under the text).
 */
export const ProposalList = forwardRef<HTMLElement, ProposalListProps>(
  ({ proposals, labels: labelsProp, onConfirm, onReject, className, ...props }, ref) => {
    if (proposals.length === 0) return null;
    const text = { ...PROPOSAL_LIST_LABELS, ...labelsProp };
    return (
      <section
        ref={ref}
        className={['csk-proposal-list', className].filter(Boolean).join(' ')}
        {...props}
      >
        <header className="csk-proposal-list__head">
          <h3 className="csk-proposal-list__title">{text.title}</h3>
          <span className="csk-proposal-list__hint">{text.hint}</span>
          <Badge variant="level" className="csk-proposal-list__count">
            {text.count(proposals.length)}
          </Badge>
        </header>
        <ul className="csk-proposal-list__items">
          {proposals.map((p) => (
            <li key={p.id} className="csk-proposal-list__item">
              <div className="csk-proposal-list__who">
                <b>{p.name}</b>
                {p.detail && <span className="csk-proposal-list__muted"> {p.detail}</span>}
              </div>
              <span className="csk-proposal-list__category">{p.category}</span>
              <span className="csk-proposal-list__muted">{p.proposedAt}</span>
              <div className="csk-proposal-list__actions">
                <Button variant="primary" size="sm" aria-label={text.confirmOf(p)} onClick={() => onConfirm?.(p)}>
                  {text.confirm}
                </Button>
                <Button variant="secondary" size="sm" aria-label={text.rejectOf(p)} onClick={() => onReject?.(p)}>
                  {text.reject}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }
);

ProposalList.displayName = 'ProposalList';
