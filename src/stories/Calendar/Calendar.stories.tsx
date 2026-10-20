import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Checkbox } from '../../components/Checkbox';
import { DeadlineBadge } from '../../components/DeadlineBadge';
import { FilterPills } from '../../components/FilterPills';
import { Header } from '../../components/Header';
import { Notice } from '../../components/Notice';
import { PageLayout } from '../../components/PageLayout';
import { BrandMark, siteNav } from '../../components/PageLayout/layoutStoryParts';
import { PageTitle } from '../../components/PageTitle';
import { Subbar } from '../../components/Subbar';
import { Tabs } from '../../components/Tabs';
import { WeekendCalendar } from '../../components/WeekendCalendar';
import { mayWeekends } from '../../components/WeekendCalendar/WeekendCalendar.fixtures';
import './Calendar.stories.css';

/**
 * Calendar page (reference `docs/v2/reference/Kalendar.html`), composed only of design system
 * components. Desktop 1280 and phone 390 are both snapshotted. All dates are fixed text.
 */
const meta: Meta = {
  title: 'Calendar',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

const subbarItems = [
  { label: 'Výsledky', href: '#vysledky' },
  { label: 'Kalendář', href: '#kalendar', active: true },
  { label: 'Žebříčky a VT', href: '#zebricky' },
  { label: 'Live', href: '#live' },
  { label: 'Online přihlašování', href: '#prihlasky' },
];

const months = ['Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září'].map((label) => ({ id: label, label }));
const years = ['2025', '2026', '2027'].map((label) => ({ id: label, label }));

const sectionPills = [
  { key: 'all', label: 'Všechny sekce' },
  { key: 'dv', label: 'Divoká voda' },
  { key: 'ry', label: 'Rychlost' },
  { key: 'vt', label: 'Turistika' },
];
const levelPills = [
  { key: 'all', label: 'Vše' },
  { key: 'cp', label: 'ČP' },
  { key: 'mcr', label: 'MČR' },
  { key: 'nkz', label: 'NKZ' },
  { key: 'public', label: 'Veřejné' },
  { key: 'abroad', label: 'Zahraničí' },
];

/** Single-select group of toggle pills (state is local here, the application owns it in real use). */
function PillGroup({ pills, initial, label }: { pills: typeof sectionPills; initial: string; label: string }) {
  const [active, setActive] = useState(initial);
  return (
    <FilterPills
      aria-label={label}
      hideWhenEmpty={false}
      filters={pills.map((p) => ({ ...p, active: p.key === active }))}
      onFilterToggle={setActive}
    />
  );
}

function CalendarPage() {
  const [month, setMonth] = useState('Květen');
  const [year, setYear] = useState('2026');
  return (
    <PageLayout
      className="calendar-page"
      stickyHeader={false}
      header={
        <>
          <Header variant="site" brand={<BrandMark />} navigation={siteNav} />
          <Subbar items={subbarItems} />
        </>
      }
      footer="© 2026 Český svaz kanoistů · Termínová listina je závazná po schválení výkonným výborem sekce."
    >
      <div className="calendar-page__body">
        <PageTitle
          title="Kalendář závodů 2026"
          meta={<span>Termínová listina všech sekcí. Víkend za víkendem, protože tak se sezóna žije.</span>}
          actions={
            <>
              <Button variant="secondary" size="sm" href="#ical">
                Přidat do kalendáře (iCal)
              </Button>
              <Button variant="secondary" size="sm" href="#tabulka">
                Tabulka
              </Button>
              <Button variant="secondary" size="sm" href="#terminovka.pdf">
                PDF termínovka
              </Button>
            </>
          }
        />

        <div className="calendar-page__filters">
          <PillGroup pills={sectionPills} initial="all" label="Sekce" />
          <PillGroup pills={levelPills} initial="all" label="Úroveň" />
          <div className="calendar-page__checks">
            <Checkbox label="Jen s online přihláškou" defaultChecked />
            <Checkbox label="Jen sledované ★" />
          </div>
        </div>

        <div className="calendar-page__columns">
          <section className="calendar-page__main" aria-labelledby="calendar-month">
            <div className="calendar-page__month">
              <h2 id="calendar-month" className="calendar-page__h2">{month}</h2>
              <Tabs variant="nav" size="sm" overflow="carousel" tabs={months} activeTab={month} onChange={setMonth} aria-label="Měsíc" />
            </div>
            <WeekendCalendar weekends={mayWeekends} aria-labelledby="calendar-month" />
          </section>

          <aside className="calendar-page__aside" aria-label="Lhůty a sezóna">
            <Card header={<div className="calendar-page__card-head"><h3 className="calendar-page__h3">Moje lhůty</h3><span className="calendar-page__muted">TJ Bohemians Praha</span></div>} padding="none">
              <ul className="calendar-page__deadlines">
                <li>
                  <div className="calendar-page__deadline-row">
                    <b>ČP #2 ve slalomu</b>
                    <DeadlineBadge kind="closing" label="pá 18:00" />
                  </div>
                  <span className="calendar-page__muted">omluvy DNS-A bez penalizace · 14 lodí přihlášeno</span>
                </li>
                <li>
                  <div className="calendar-page__deadline-row">
                    <b>Nominační závod, Lipno</b>
                    <DeadlineBadge kind="closing" label="za 5 dní" />
                  </div>
                  <span className="calendar-page__muted">uzávěrka přihlášek · zatím 0 lodí</span>
                </li>
                <li>
                  <div className="calendar-page__deadline-row">
                    <b>MČR dlouhé tratě</b>
                    <DeadlineBadge kind="open" label="za 6 dní" />
                  </div>
                  <span className="calendar-page__muted">sekce rychlost · vyžaduje roční prohlášení oddílu ✓</span>
                </li>
              </ul>
              <div className="calendar-page__card-foot"><a href="#upozorneni">Nastavit upozornění e-mailem</a></div>
            </Card>

            <Card header={<h3 className="calendar-page__h3">Sezóna 2026</h3>}>
              <dl className="calendar-page__stats">
                <div><dt>Závodů v kalendáři</dt><dd>184</dd></div>
                <div><dt>Z toho tento měsíc</dt><dd>23</dd></div>
                <div><dt>S online přihláškou</dt><dd>121</dd></div>
              </dl>
              <Tabs variant="nav" size="sm" tabs={years} activeTab={year} onChange={setYear} aria-label="Sezóna" />
            </Card>

            <Notice tone="info" title="Pořadatelé">
              Propozice zveřejněte nejpozději 6 týdnů před závodem. Kalendář vám lhůtu připomene.{' '}
              <a href="#vypsat">Vypsat závod →</a>
            </Notice>
          </aside>
        </div>
      </div>
    </PageLayout>
  );
}

/** Reference Kalendar: filters, month switch, weekend by weekend, "Moje lhůty" and season in the side column. */
export const Season: Story = { render: () => <CalendarPage /> };
