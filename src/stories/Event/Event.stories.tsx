import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ClockProvider } from '../../clock';
import { Badge } from '../../components/Badge';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { Notice } from '../../components/Notice';
import { OnCoursePanel } from '../../components/OnCoursePanel';
import { liveRiders } from '../../components/OnCoursePanel/OnCoursePanel.fixtures';
import { PageLayout } from '../../components/PageLayout';
import { BrandMark, siteNav, subbarItems } from '../../components/PageLayout/layoutStoryParts';
import { PageTitle } from '../../components/PageTitle';
import { ProgramList, type ProgramDay } from '../../components/ProgramList';
import { brRows, dnsRow } from '../../components/ResultsTable/ResultsTable.fixtures';
import { SegmentedControl } from '../../components/SegmentedControl';
import { StatusBadge } from '../../components/StatusBadge';
import { Subbar } from '../../components/Subbar';
import { Tabs } from '../../components/Tabs';
import { sunday } from '../Live/Live.fixtures';
import { CLASSES, LiveResults, ResultsCard, STORY_NOW, ageAt, liveClock } from '../Live/LivePage';
import './Event.stories.css';

/**
 * Event detail (reference `docs/v2/reference/Zavod.html`, desktop), composed only of design system components.
 * The same page is snapshotted at 390 px too. One fixed test clock, nothing ticks.
 */
const meta: Meta = {
  title: 'Event/Detail',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

const days = [
  { value: 'sat', label: 'So 3. 10.' },
  { value: 'sun', label: 'Ne 4. 10.' },
];
const views = [
  { value: 'results', label: 'Výsledky' },
  { value: 'startlist', label: 'Startovka' },
  { value: 'oncourse', label: 'Na trati' },
  { value: 'program', label: 'Program' },
];

/** Sunday programme as in the reference sidebar: the morning phases, the two running ones and the ceremony. */
const programDay: ProgramDay = {
  ...sunday,
  label: 'Program · neděle',
  note: undefined,
  items: sunday.items.filter((i) => ['c1w1', 'c1m1', 'k1w1', 'k1m1', 'c1w2', 'k1m2', 'award'].includes(String(i.id))),
};

function EventDetail() {
  const [day, setDay] = useState('sun');
  const [klass, setKlass] = useState('K1 muži');
  const [view, setView] = useState('results');
  return (
    <ClockProvider clock={liveClock}>
      <PageLayout
        header={
          <>
            <Header variant="site" brand={<BrandMark />} navigation={siteNav} />
            <Subbar items={subbarItems} />
          </>
        }
      >
        <div className="event-page">
          <Breadcrumbs
            items={[
              { label: 'Úvod', href: '#uvod' },
              { label: 'Závody', href: '#zavody' },
              { label: '2026' },
              { label: 'Olympic Hopes 2026' },
            ]}
          />

          <PageTitle
            logo="OH"
            badges={
              <>
                <Badge section="dv">Divoká voda</Badge>
                <Badge variant="level">Slalom</Badge>
                <Badge variant="level">Mezinárodní</Badge>
                <StatusBadge state="live" />
                {ageAt(1)}
              </>
            }
            title="Olympic Hopes 2026"
            meta={
              <>
                <span>
                  <b>3.–4. října 2026</b>
                </span>
                <span>Roudnice nad Labem, KK Roudnice n. L.</span>
                <span>
                  Pořádá <a href="#o">KK Roudnice n. L.</a>
                </span>
                <span>246 lodí</span>
              </>
            }
            actions={
              <>
                <Button variant="secondary">Propozice (PDF)</Button>
                <Button variant="secondary">★ Sledovat</Button>
              </>
            }
          />

          <div className="event-page__filters">
            <SegmentedControl items={days} value={day} onChange={setDay} aria-label="Den" />
            <div className="event-page__filters-classes">
              <Tabs variant="nav" size="sm" overflow="carousel" tabs={CLASSES} activeTab={klass} onChange={setKlass} aria-label="Třída" />
            </div>
            <SegmentedControl items={views} value={view} onChange={setView} aria-label="Pohled" />
          </div>

          <div className="event-page__columns">
            <div className="event-page__main">
              <OnCoursePanel
                riders={liveRiders(STORY_NOW)}
                phaseLabel="K1 muži · 2. jízda"
                clock={liveClock}
                timeZone="Europe/Prague"
              />
              <ResultsCard
                state="provisional"
                status="K1 muži · neděle · 2. jízdy · 8 z 24 v cíli"
                favorites={2}
                searchLabel="Hledat závodníka, oddíl, st. č."
                foot="24 lodí, zobrazeno 9"
                footLinks={
                  <>
                    <a className="event-page__link" href="#all">Zobrazit všechny</a>
                    <span className="event-page__muted">
                      Počítá se lepší jízda · oficiální po schválení vrchním rozhodčím a počtářem
                    </span>
                  </>
                }
              >
                <LiveResults rows={[...brRows.slice(0, 8), dnsRow]} columns="pair" initialExpanded="k1m-35" />
              </ResultsCard>
              <Card
                variant="surface"
                padding="none"
                header={
                  <div className="event-page__collapsed-head">
                    <h3 className="event-page__heading">K1 muži · sobota</h3>
                    <StatusBadge state="official" />
                    <span className="event-page__muted">schváleno 3. 10. 17:05</span>
                    <span className="event-page__collapsed-actions">
                      <Button variant="secondary" size="sm">PDF</Button>
                      <Button variant="secondary" size="sm">XLSX</Button>
                    </span>
                  </div>
                }
              >
                <p className="event-page__collapsed event-page__muted">
                  Sbaleno. Stejná tabulka bez štítků Předběžné a bez pásu Na trati.
                </p>
              </Card>
            </div>

            <aside className="event-page__aside" aria-label="Doplňující informace">
              <Card variant="surface" padding="none">
                <ProgramList days={[programDay]} />
              </Card>
              <Card variant="surface" header={<h3 className="event-page__heading">Dokumenty</h3>}>
                <div className="event-page__list">
                  <a className="event-page__link" href="#p">Propozice závodu (PDF)</a>
                  <a className="event-page__link" href="#s">Startovní listiny (PDF)</a>
                  <a className="event-page__link" href="#r">Výsledky sobota, oficiální (PDF · XLSX · XML)</a>
                </div>
              </Card>
              <Notice tone="info" title="Protest">
                Do 30 minut od vyvěšení výsledků kategorie, vklad 500 Kč u vrchního rozhodčího.
              </Notice>
              <Card variant="surface" header={<h3 className="event-page__heading">Pořadatel</h3>}>
                <div className="event-page__list">
                  <b>KK Roudnice n. L.</b>
                  <span className="event-page__muted">Ředitel závodu: [JMÉNO]</span>
                  <a className="event-page__link" href="#m">[E-MAIL POŘADATELE]</a>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </PageLayout>
    </ClockProvider>
  );
}

/** Reference Zavod.html: running event, on-course panel, provisional results with an expanded row, programme in the sidebar. */
export const Default: Story = { render: () => <EventDetail /> };
