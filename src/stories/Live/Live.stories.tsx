import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/Button';
import { DataAge } from '../../components/DataAge';
import { Notice } from '../../components/Notice';
import { OnCoursePanel } from '../../components/OnCoursePanel';
import { liveRiders } from '../../components/OnCoursePanel/OnCoursePanel.fixtures';
import { ProgramList } from '../../components/ProgramList';
import { brRows, categoryRows, dnsRow } from '../../components/ResultsTable/ResultsTable.fixtures';
import { StatusBadge } from '../../components/StatusBadge';
import { sunday, startlistRows } from './Live.fixtures';
import { LiveResultsPanel, LiveResults } from '../_shared/LiveResults';
import { STORY_NOW, ageAt, liveClock } from '../_shared/storyClock';
import { CLASSES, CLASS_CODES, LiveNav, LivePage, LiveStartlist } from './LivePage';

/**
 * Live pages (reference `docs/v2/reference/Live1–6.html`), composed only of design system components.
 * Mobile 390 px is the primary canvas, the same pages are snapshotted at 1280 px too.
 * All stories share one test clock at a fixed time, so nothing ticks.
 */
const meta: Meta = {
  title: 'Live',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

const days = [
  { value: 'sat', label: 'So 3. 10.' },
  { value: 'sun', label: 'Ne 4. 10.' },
];
const SUBTITLE = 'Roudnice nad Labem · neděle 4. 10. · 2. jízdy';

/** Reference Live1: running race, three on course, results with podium, review row and a row on course. */
export const Running: Story = {
  render: () => (
    <LivePage
      title="Olympic Hopes 2026"
      subtitle={SUBTITLE}
      dataAge={ageAt(1)}
      section="results"
      nav={<LiveNav days={days} day="sun" classes={CLASSES} activeClass="K1 muži" />}
    >
      <OnCoursePanel riders={liveRiders(STORY_NOW)} phaseLabel="K1 muži · 2. jízda" clock={liveClock} timeZone="Europe/Prague" />
      <LiveResultsPanel state="provisional" status="po 2. jízdě · 8 z 24 v cíli" favorites={2}>
        <LiveResults rows={brRows} />
      </LiveResultsPanel>
    </LivePage>
  ),
};

/** Reference Live2: expanded row; the header is condensed (one row: name · status · data age) as after scrolling, the day switch is gone. */
export const Expanded: Story = {
  render: () => (
    <LivePage
      title="Olympic Hopes 2026"
      subtitle="Ne 4. 10. · K1 muži · 2. jízdy"
      dataAge={ageAt(1)}
      condensed
      section="results"
      nav={<LiveNav days={[]} day="sun" classes={CLASSES} activeClass="K1 muži" />}
    >
      <Notice tone="info">Při scrollu se hlavička stáhne na jeden řádek, navigace zůstane nahoře.</Notice>
      <LiveResultsPanel favorites={2}>
        <LiveResults rows={[...brRows.slice(0, 4), dnsRow]} initialExpanded="k1m-35" />
      </LiveResultsPanel>
    </LivePage>
  ),
};

/** Reference Live3: before the start, start list with a favourite and an excused DNS. */
export const Startlist: Story = {
  render: () => (
    <LivePage
      title="Olympic Hopes 2026"
      subtitle="Roudnice nad Labem · sobota 3. 10. · první start 9:15"
      status={<StatusBadge state="unknown" label="Startovka" />}
      dataAge="start za 1 h 40 min"
      section="startlist"
      nav={<LiveNav days={days} day="sat" classes={CLASSES} activeClass="K1 muži" />}
    >
      <Notice tone="info">
        Výsledky se objeví, jakmile dojede první loď. Hvězdičkou si označ své, pošleme upozornění na start a cíl.
      </Notice>
      <LiveResultsPanel
        status="K1 muži · 88 lodí · 1. jízda od 11:21, 2. jízda od 15:21 · interval 45 s"
        footer="Zobrazeno 11 z 88"
        footerLinks={<a href="#all">Celá startovka</a>}
        searchLabel="Hledat závodníka nebo st. číslo"
      >
        <LiveStartlist rows={startlistRows} />
      </LiveResultsPanel>
    </LivePage>
  ),
};

/** Reference Live4: official results of a finished event, category filter U18 with the class rank under the category rank. */
export const Official: Story = {
  render: () => (
    <LivePage
      title="5. a 6. NKZ České Vrbné + ČP juniorů + Akademické MČR"
      subtitle="Areál Lídy Polesné · 19.–20. 9. 2026"
      status={<StatusBadge state="official" />}
      dataAge="20. 9. 2026"
      section="results"
      nav={
        <LiveNav
          days={[
            { value: 'sat', label: 'So 19. 9.' },
            { value: 'sun', label: 'Ne 20. 9.' },
          ]}
          day="sun"
          classes={CLASS_CODES}
          activeClass="K1M"
          phases={[
            { value: 'q', label: 'Kvalifikace' },
            { value: 'f', label: 'Finále' },
          ]}
          phase="f"
        />
      }
    >
      <LiveResultsPanel
        state="official"
        status="schváleno 20. 9. 16:40 · pořadí v U18, vedle celkové"
        activeCategory="U18"
        favorites={0}
        footer="7 v U18 · 31 celkem"
        footerLinks={
          <>
            <a href="#pdf">Oficiální PDF</a>
            <a href="#kanoe">Na kanoe.cz</a>
          </>
        }
      >
        <LiveResults rows={categoryRows} columns="single" />
      </LiveResultsPanel>
    </LivePage>
  ),
};

const STALE_AGE_SECONDS = 42;
const staleRiders = liveRiders(STORY_NOW).map((r) =>
  r.status === 'running'
    ? {
        ...r,
        featured: false,
        toLeader: undefined,
        split: undefined,
        secondary: 'Slovenská kanoistika',
        // frozen when the data stopped: 43.5 s + the 3 s of stale grace = 46.5
        time: { elapsedSeconds: 43.5, receivedAt: STORY_NOW - STALE_AGE_SECONDS * 1000 },
      }
    : r
);

/** Reference Live5: no connection. Everything stays, running values freeze and age; one line in the header, no banner. */
export const Disconnected: Story = {
  render: () => (
    <LivePage
      title="Olympic Hopes 2026"
      subtitle={SUBTITLE}
      status={<StatusBadge state="stale" />}
      dataAge={
        <DataAge
          receivedAt={STORY_NOW - STALE_AGE_SECONDS * 1000}
          clock={liveClock}
          connection="offline"
        />
      }
      section="results"
      nav={<LiveNav days={days} day="sun" classes={CLASSES} activeClass="K1 muži" />}
    >
      <OnCoursePanel
        riders={staleRiders}
        phaseLabel="K1 muži · 2. jízda"
        stale
        receivedAt={STORY_NOW - STALE_AGE_SECONDS * 1000}
        clock={liveClock}
        timeZone="Europe/Prague"
      />
      <LiveResultsPanel
        state="provisional"
        status={
          <>
            <DataAge receivedAt={STORY_NOW - STALE_AGE_SECONDS * 1000} clock={liveClock} mode="absolute" timeZone="Europe/Prague" /> · po obnovení se doplní samo
          </>
        }
        favorites={2}
      >
        <LiveResults rows={brRows.slice(0, 6).map((r) => ({ ...r, state: undefined, note: undefined }))} />
      </LiveResultsPanel>
      <Notice tone="info" title="Zásady stavu bez spojení">
        Nic se nemaže ani nešedne do nečitelna. Běžící časy se zastaví a dostanou tečkovanou linku se stářím.
        Hlavička nese jen jeden řádek o spojení, žádný banner přes obsah.
      </Notice>
    </LivePage>
  ),
};

/** Reference Live6: programme, two phases running at once; the application offers both above the list. */
export const Program: Story = {
  render: () => (
    <LivePage
      title="Olympic Hopes 2026"
      subtitle="Roudnice nad Labem · neděle 4. 10."
      dataAge={ageAt(3)}
      section="program"
      nav={<LiveNav days={days} day="sun" />}
    >
      <Notice tone="warn" title="Právě běží dvě kategorie naráz">
        <span className="live-page__choice">
          <Button href="#k1m2" size="sm">
            K1 muži · 2. jízda
          </Button>
          <Button href="#c1w2" size="sm" variant="secondary">
            C1 ženy · 2. jízda
          </Button>
        </span>
      </Notice>
      <ProgramList days={[sunday]} />
      <Notice tone="info">
        Když běží víc fází naráz, aplikace nevybírá za diváka. Nahoře nabídne obě, výchozí je ta s prvním jezdcem na
        trati.
      </Notice>
    </LivePage>
  ),
};
