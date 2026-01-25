import type { Meta, StoryObj } from '@storybook/react';
import { Calendar, type CalendarEvent } from './Calendar';
import { useState } from 'react';
import { KanoeCzContext } from '../KanoeCzContext/KanoeCzContext';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Kalendářní komponenta pro zobrazení závodů a událostí CSK.

**Doporučený layout:** \`weekendShowcase\` - optimalizovaný pro sportovní kalendáře,
kde většina závodů probíhá o víkendech. Všední dny jsou kompaktní, víkendy dominují.

**Varianty:**
- \`Default\` - standardní 7-sloupcový grid
- \`WeekendShowcase\` - **doporučený** - víkendy jako velké karty
- \`Embed\` - pro vložení do kanoe.cz
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    weekendShowcase: {
      control: 'boolean',
      description: 'Doporučený layout pro sportovní kalendáře - víkendy jako velké karty, všední dny minimalizované',
    },
    styleVariant: {
      control: 'select',
      options: ['default', 'embed'],
      description: 'Vizuální styl - default nebo embed pro kanoe.cz',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Velikost kalendáře',
    },
    showNavigation: {
      control: 'boolean',
      description: 'Zobrazit navigační ovládací prvky',
    },
    showLive: {
      control: 'boolean',
      description: 'Zobrazit live indikátor pro probíhající závody',
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// Sample Data
// =============================================================================

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

// CSK Race Calendar - realistic data
const cskRaceEvents: CalendarEvent[] = [
  // DV - Divoká voda (Whitewater)
  {
    id: 'dv1',
    title: 'MČR ve slalomu',
    start: new Date(year, month, 3),
    end: new Date(year, month, 5),
    section: 'dv',
  },
  {
    id: 'dv2',
    title: 'Český pohár #1 - Trnávka',
    start: new Date(year, month, 10),
    end: new Date(year, month, 11),
    section: 'dv',
    data: { isLive: true },
  },
  {
    id: 'dv3',
    title: 'Český pohár #2 - Praha',
    start: new Date(year, month, 17),
    end: new Date(year, month, 18),
    section: 'dv',
  },
  {
    id: 'dv4',
    title: 'Nominace na MS',
    start: new Date(year, month, 24),
    end: new Date(year, month, 25),
    section: 'dv',
  },

  // RY - Rychlostní (Sprint/Marathon)
  {
    id: 'ry1',
    title: 'Regata Račice',
    start: new Date(year, month, 8),
    end: new Date(year, month, 9),
    section: 'ry',
  },
  {
    id: 'ry2',
    title: 'Český maraton',
    start: new Date(year, month, 22),
    section: 'ry',
  },

  // VT - Vodní turistika (Touring)
  {
    id: 'vt1',
    title: 'Sjíždění Vltavy',
    start: new Date(year, month, 6),
    end: new Date(year, month, 7),
    section: 'vt',
  },
  {
    id: 'vt2',
    title: 'Vodácký víkend Sázava',
    start: new Date(year, month, 20),
    end: new Date(year, month, 21),
    section: 'vt',
  },

  // Administrative
  {
    id: 'admin1',
    title: 'Deadline registrace',
    start: new Date(year, month, 1),
    variant: 'warning',
  },
  {
    id: 'admin2',
    title: 'Valná hromada CSK',
    start: new Date(year, month, 15),
    variant: 'info',
  },
];

// =============================================================================
// Stories (4 only - clean and focused)
// =============================================================================

/**
 * Standardní kalendář se 7 stejně širokými sloupci.
 * Použijte pokud potřebujete klasický kalendářní pohled.
 */
export const Default: Story = {
  args: {
    events: cskRaceEvents,
    size: 'lg',
    onEventClick: (event) => console.log('Event clicked:', event),
    onDayClick: (date) => console.log('Day clicked:', date),
  },
};

/**
 * **DOPORUČENÝ LAYOUT** pro sportovní kalendáře.
 *
 * Vlastnosti:
 * - Všední dny (Po-Pá): kompaktní sloupce, eventy jako barevné tečky
 * - Víkendy (So/Ne): velké karty s plnými detaily závodů
 * - Víkend zabírá ~57% horizontálního prostoru
 * - Optimální pro kanoistické kalendáře kde 90% závodů je o víkendu
 */
export const WeekendShowcase: Story = {
  args: {
    events: cskRaceEvents,
    weekendShowcase: true,
    size: 'lg',
    showLive: true,
    onEventClick: (event) => console.log('Event clicked:', event),
    onDayClick: (date) => console.log('Day clicked:', date),
  },
  parameters: {
    docs: {
      description: {
        story: 'Doporučený layout pro sportovní kalendáře. Víkendy jsou vizuálně dominantní, všední dny minimalizované.',
      },
    },
  },
};

/**
 * Kalendář pro vložení do kanoe.cz.
 * Kombinuje weekend showcase layout s embed stylem.
 */
export const Embed: Story = {
  args: {
    events: cskRaceEvents,
    weekendShowcase: true,
    styleVariant: 'embed',
    showLive: true,
    onEventClick: (event) => console.log('Event clicked:', event),
  },
  render: (args) => (
    <KanoeCzContext>
      <Calendar {...args} />
    </KanoeCzContext>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Kalendář v embed módu pro integraci do kanoe.cz. Používá weekend showcase layout.',
      },
    },
  },
};

/**
 * Interaktivní ukázka s výběrem dne a události.
 * Demonstruje API komponenty.
 */
export const Interactive: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Calendar
          events={cskRaceEvents}
          weekendShowcase
          showLive
          onDayClick={(date) => {
            setSelectedDate(date);
            setSelectedEvent(null);
          }}
          onEventClick={(event) => {
            setSelectedEvent(event);
            setSelectedDate(null);
          }}
        />
        <div
          style={{
            padding: '16px',
            background: 'var(--color-bg-secondary)',
            borderRadius: '8px',
            minHeight: '80px',
          }}
        >
          {selectedDate && (
            <div>
              <strong>Vybraný den:</strong>{' '}
              {selectedDate.toLocaleDateString('cs-CZ', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
          )}
          {selectedEvent && (
            <div>
              <strong>Vybraná událost:</strong> {selectedEvent.title}
              <br />
              <strong>Datum:</strong>{' '}
              {selectedEvent.start.toLocaleDateString('cs-CZ')}
              {selectedEvent.end &&
                ` - ${selectedEvent.end.toLocaleDateString('cs-CZ')}`}
              {selectedEvent.section && (
                <>
                  <br />
                  <strong>Sekce:</strong> {selectedEvent.section.toUpperCase()}
                </>
              )}
            </div>
          )}
          {!selectedDate && !selectedEvent && (
            <span style={{ color: 'var(--color-text-tertiary)' }}>
              Klikněte na den nebo událost pro zobrazení detailu.
            </span>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interaktivní ukázka demonstrující onDayClick a onEventClick callbacky.',
      },
    },
  },
};
