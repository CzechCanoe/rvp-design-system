import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../components/Badge';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Checkbox } from '../../components/Checkbox';
import { DeadlineBadge } from '../../components/DeadlineBadge';
import { EntryTable, type EntryBoat } from '../../components/EntryTable';
import {
  c2Boats,
  categoryOptions,
  checkColumns,
  k1Boats,
  proposals as proposalFixtures,
} from '../../components/EntryTable/EntryTable.fixtures';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Notice } from '../../components/Notice';
import { PageLayout } from '../../components/PageLayout';
import { BrandMark } from '../../components/PageLayout/layoutStoryParts';
import { PageTitle } from '../../components/PageTitle';
import { ProposalList } from '../../components/ProposalList';
import { SummaryCard } from '../../components/SummaryCard';
import './Entry.stories.css';

/**
 * Club entry (reference `docs/v2/reference/Prihlaska.html`, office tone): composed only of design system
 * components. Warnings (expired medical, category mismatch, unpaid fee) never block sending: the submit
 * button stays enabled; a missing confirmation is an error that says what to do next.
 */
const meta: Meta = {
  title: 'Entry',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

const appNav = (
  <>
    <a href="#kalendar">Kalendář</a>
    <a href="#prihlasky" aria-current="page">
      Přihlášky oddílu
    </a>
    <a href="#clenove">Členové</a>
    <a href="#platby">Platby</a>
  </>
);

const open = (
  <>
    druhé místo v lodi je volné ·{' '}
    <Button variant="ghost" size="sm">
      doplnit zadáka
    </Button>
  </>
);

function ClassCard({
  title,
  meta: classMeta,
  addLabel,
  children,
}: {
  title: string;
  meta: string;
  addLabel: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      padding="none"
      header={
        <div className="entry-page__class-head">
          <h3 className="entry-page__class-title">{title}</h3>
          <span className="entry-page__muted">{classMeta}</span>
          <Button variant="ghost" size="sm" className="entry-page__push">
            {addLabel}
          </Button>
        </div>
      }
    >
      {children}
    </Card>
  );
}

function ClubEntryPage() {
  const [k1, setK1] = useState<EntryBoat[]>(k1Boats);
  const [c2, setC2] = useState<EntryBoat[]>(() => c2Boats.map((b) => (b.openSeat ? { ...b, openSeat: open } : b)));
  const boats = [...k1, ...c2];
  const [proposals, setProposals] = useState(proposalFixtures);
  const [confirmed, setConfirmed] = useState(false);
  const [missingConfirmation, setMissingConfirmation] = useState(false);
  const [sent, setSent] = useState(false);

  const setCategory = (list: EntryBoat[], set: (b: EntryBoat[]) => void) => (boat: EntryBoat, category: string) =>
    set(list.map((b) => (b.id === boat.id ? { ...b, category } : b)));
  const remove = (list: EntryBoat[], set: (b: EntryBoat[]) => void) => (boat: EntryBoat) =>
    set(list.filter((b) => b.id !== boat.id));

  const submit = () => {
    if (!confirmed) {
      setMissingConfirmation(true);
      return;
    }
    setSent(true);
  };

  return (
    <PageLayout
      variant="urad"
      header={
        <Header
          variant="app"
          brand={<BrandMark name="ČSK · Přihlášky" />}
          navigation={appNav}
          club="TJ Bohemians Praha"
          userMenu={
            <>
              <span>[JMÉNO SPRÁVCE]</span>
              <a href="#odhlasit">Odhlásit</a>
            </>
          }
        />
      }
      banner={
        <PageTitle
          as="h2"
          size="md"
          variant="bar"
          breadcrumbs={
            <Breadcrumbs items={[{ label: 'Přihlášky oddílu', href: '#prihlasky' }, { label: 'Nominační závod, Lipno' }]} />
          }
          titleBefore={
            <>
              <Badge section="dv">DV</Badge>
              <Badge variant="level">NKZ</Badge>
            </>
          }
          title="Nominační závod, Lipno · 23.–24. 5. 2026"
          titleAfter={<Badge variant="outline">{sent ? 'Odeslaná' : 'Rozpracovaná'}</Badge>}
          aside={
            <>
              <DeadlineBadge kind="closing" label="Uzávěrka za 5 dní" date="st 13. 5. 23:59" />
              <DeadlineBadge kind="late" date="po 18. 5., +100 %" />
            </>
          }
          actions={
            <Button variant="secondary" size="sm" href="#propozice">
              Propozice
            </Button>
          }
        />
      }
    >
      <div className="entry-page">
        <div className="entry-page__main">
          <Card padding="sm">
            <div className="entry-page__add">
              <Input
                label="Přidat závodníka"
                placeholder="Začněte psát jméno nebo RGC, Enter přidá do poslední kategorie"
                fullWidth
                className="entry-page__add-input"
              />
              <Button variant="secondary" size="sm">
                Jako na ČP #2 (14 lodí)
              </Button>
              <Button variant="secondary" size="sm">
                Vybrat z členů oddílu
              </Button>
            </div>
          </Card>

          <ProposalList
            proposals={proposals}
            onConfirm={(p) => setProposals((list) => list.filter((x) => x.id !== p.id))}
            onReject={(p) => setProposals((list) => list.filter((x) => x.id !== p.id))}
          />

          <ClassCard title="K1 muži" meta={`${k1.length} lodě · startovné 300 Kč / loď`} addLabel="+ Přidat do K1 muži">
            <EntryTable
              caption="K1 muži"
              boats={k1}
              checkColumns={checkColumns}
              categoryOptions={categoryOptions}
              onCategoryChange={setCategory(k1, setK1)}
              onRemove={remove(k1, setK1)}
            />
          </ClassCard>

          <ClassCard title="C2 mix" meta={`${c2.length} lodě · 400 Kč / loď`} addLabel="+ Přidat loď C2">
            <EntryTable
              caption="C2 mix"
              boats={c2}
              checkColumns={checkColumns}
              categoryOptions={categoryOptions}
              onCategoryChange={setCategory(c2, setC2)}
              onRemove={remove(c2, setC2)}
              onReplaceMember={() => undefined}
            />
          </ClassCard>

          <Card padding="sm">
            <div className="entry-page__head-line">
              <span>
                <b>Záhlaví přihlášky:</b> vedoucí družstva [JMÉNO], [TELEFON], [E-MAIL]
              </span>
              <Button variant="ghost" size="sm" className="entry-page__push">
                upravit
              </Button>
            </div>
          </Card>
        </div>

        <aside className="entry-page__aside" aria-label="Souhrn a odeslání">
          <SummaryCard
            rows={[
              { label: 'Lodí', value: boats.length },
              { label: 'Závodníků', value: boats.reduce((n, b) => n + b.members.length, 0) },
              {
                label: 'Z toho nezletilých',
                value: boats.reduce((n, b) => (b.category === 'adult' || b.category === 'u23' ? n : n + b.members.length), 0),
              },
            ]}
            total={{ label: 'Startovné', value: `${(k1.length * 300 + c2.length * 400).toLocaleString('cs-CZ')} Kč` }}
            note="Pořadatel: převodem, VS 2026052302. QR kód se objeví po odeslání."
          />

          <Card
            padding="none"
            header={
              <div className="entry-page__class-head">
                <h3 className="entry-page__class-title">Varování</h3>
                <Badge variant="warning" className="entry-page__push">
                  2
                </Badge>
              </div>
            }
          >
            <div className="entry-page__warnings">
              <Notice tone="warn" title="Propadlá lékařská prohlídka">
                u 1 závodníka. Za splnění podmínek ručí oddíl, pořadatel varování uvidí.
              </Notice>
              <Notice tone="warn" title="Věk neodpovídá kategorii">
                u 1 závodníka. Pokud startuje ve vyšší kategorii záměrně, nechte tak.
              </Notice>
              <p className="entry-page__muted entry-page__nothing-blocks">Nic z toho odeslání neblokuje.</p>
            </div>
          </Card>

          <Card>
            <div className="entry-page__submit">
              {sent ? (
                <Notice tone="ok" title="Přihláška odeslána.">
                  Potvrzení vám přijde e-mailem.
                </Notice>
              ) : null}
              <Checkbox
                label={
                  <>
                    Potvrzuji za oddíl <b>TJ Bohemians Praha</b>, že přihlášení závodníci splňují podmínky práva startu
                    (Registrační řád čl. 14.2–14.3).
                  </>
                }
                checked={confirmed}
                state={missingConfirmation && !confirmed ? 'error' : 'default'}
                errorMessage="Před odesláním zaškrtněte toto potvrzení. Pak přihlášku odešlete znovu."
                onChange={(e) => {
                  setConfirmed(e.target.checked);
                  if (e.target.checked) setMissingConfirmation(false);
                }}
              />
              <Button variant="primary" fullWidth onClick={submit}>
                Odeslat přihlášku pořadateli
              </Button>
              <Button variant="secondary" fullWidth>
                Uložit rozpracované
              </Button>
              <div className="entry-page__muted entry-page__center">
                Naposledy uloženo před 2 min · po odeslání dostanete potvrzení e-mailem
              </div>
            </div>
          </Card>

          <Notice tone="info" title="Po uzávěrce">
            Změny dělá pořadatel. Omluvy DNS-A do pátku 18:00 bez penalizace.{' '}
            <a href="#omluvit">Omluvit závodníka →</a>
          </Notice>
        </aside>
      </div>
    </PageLayout>
  );
}

/** Reference Prihlaska.html: club entry with proposals, a K1 class with warnings, a C2 class (two-row boats) and the summary. */
export const ClubEntry: Story = {
  render: () => <ClubEntryPage />,
};
