import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, type TimelineItem } from './Timeline';
import { Button } from '../Button';
import { Badge } from '../Badge';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Timeline komponenta pro zobrazení chronologických událostí nebo workflow kroků.

## Použití

- **Historie registrace** - průběh registračního procesu
- **Stav přihlášky** - tracking přihlášky na závod
- **Activity feed** - nedávné aktivity uživatele
- **Sezónní přehled** - důležité události v sezóně

## Varianty

- \`default\` - standardní timeline s většími markery
- \`compact\` - kompaktní verze pro activity feeds
- \`card\` - s kartovým pozadím pro důležité události
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'card'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

// =============================================================================
// Basic Examples
// =============================================================================

const basicItems: TimelineItem[] = [
  {
    id: 1,
    title: 'Registrace přijata',
    timestamp: '15. ledna 2024',
    status: 'completed',
    description: 'Vaše registrace byla úspěšně přijata do systému.',
  },
  {
    id: 2,
    title: 'Platba ověřena',
    timestamp: '16. ledna 2024',
    status: 'completed',
    description: 'Platba členského příspěvku byla připsána na účet.',
  },
  {
    id: 3,
    title: 'Ověření dokumentů',
    timestamp: '17. ledna 2024',
    status: 'current',
    description: 'Probíhá kontrola předložených dokumentů.',
  },
  {
    id: 4,
    title: 'Schválení registrace',
    status: 'pending',
    description: 'Čeká na finální schválení oddílem.',
  },
];

export const Default: Story = {
  args: {
    items: basicItems,
  },
};

export const Compact: Story = {
  args: {
    items: basicItems,
    variant: 'compact',
  },
};

export const Card: Story = {
  args: {
    items: basicItems,
    variant: 'card',
  },
};

// =============================================================================
// Size Variants
// =============================================================================

export const Small: Story = {
  args: {
    items: basicItems,
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    items: basicItems,
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    items: basicItems,
    size: 'lg',
  },
};

// =============================================================================
// With Error State
// =============================================================================

const itemsWithError: TimelineItem[] = [
  {
    id: 1,
    title: 'Registrace přijata',
    timestamp: '15. ledna 2024',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Platba selhala',
    timestamp: '16. ledna 2024',
    status: 'error',
    description: 'Platba byla zamítnuta bankou. Zkuste prosím znovu.',
  },
  {
    id: 3,
    title: 'Ověření dokumentů',
    status: 'pending',
  },
  {
    id: 4,
    title: 'Schválení registrace',
    status: 'pending',
  },
];

export const WithError: Story = {
  args: {
    items: itemsWithError,
    variant: 'card',
  },
};

// =============================================================================
// CSK: Přihláška na závod
// =============================================================================

const raceApplicationItems: TimelineItem[] = [
  {
    id: 1,
    title: 'Přihláška odeslána',
    timestamp: '1. 3. 2024, 14:32',
    status: 'completed',
    description: 'Přihláška na MČR ve slalomu 2024 byla úspěšně odeslána.',
    meta: (
      <span>
        Přihlášeno: <strong>3 závodníci</strong>
      </span>
    ),
  },
  {
    id: 2,
    title: 'Potvrzení pořadatelem',
    timestamp: '2. 3. 2024, 09:15',
    status: 'completed',
    description: 'Pořadatel potvrdil přijetí přihlášky.',
  },
  {
    id: 3,
    title: 'Startovné uhrazeno',
    timestamp: '3. 3. 2024, 11:20',
    status: 'completed',
    description: 'Platba 1 500 Kč byla připsána.',
    meta: <span>VS: 2024030001</span>,
  },
  {
    id: 4,
    title: 'Zveřejnění startovky',
    timestamp: '10. 3. 2024',
    status: 'current',
    description: 'Čekejte na zveřejnění oficiální startovní listiny.',
  },
  {
    id: 5,
    title: 'Závod',
    timestamp: '15. - 16. 3. 2024',
    status: 'pending',
  },
];

export const RaceApplication: Story = {
  args: {
    items: raceApplicationItems,
    variant: 'default',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline pro sledování stavu přihlášky na závod.',
      },
    },
  },
};

// =============================================================================
// CSK: Historie registrace závodníka
// =============================================================================

const athleteRegistrationItems: TimelineItem[] = [
  {
    id: 1,
    title: 'Založení profilu',
    timestamp: '10. 1. 2024',
    status: 'completed',
    description: 'Závodník Jan Novák byl zapsán do systému.',
  },
  {
    id: 2,
    title: 'Přiřazení k oddílu',
    timestamp: '10. 1. 2024',
    status: 'completed',
    description: 'Přiřazen k USK Praha - kanoistika',
    meta: (
      <Badge section="dv" size="sm">
        Divoká voda
      </Badge>
    ),
  },
  {
    id: 3,
    title: 'Lékařská prohlídka',
    timestamp: '15. 1. 2024',
    status: 'completed',
    description: 'Platná do 15. 1. 2025',
  },
  {
    id: 4,
    title: 'Přidělení VT třídy',
    timestamp: '20. 1. 2024',
    status: 'completed',
    description: 'Na základě výsledků přidělena třída B',
    meta: (
      <Badge vtClass="b" size="sm">
        VT B
      </Badge>
    ),
  },
  {
    id: 5,
    title: 'Registrace kompletní',
    timestamp: '20. 1. 2024',
    status: 'completed',
  },
];

export const AthleteRegistration: Story = {
  args: {
    items: athleteRegistrationItems,
    variant: 'card',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline pro historii registrace závodníka včetně přidělení VT třídy.',
      },
    },
  },
};

// =============================================================================
// CSK: Activity Feed
// =============================================================================

const activityFeedItems: TimelineItem[] = [
  {
    id: 1,
    title: 'Nový výsledek',
    timestamp: 'Před 2 hodinami',
    status: 'completed',
    color: 'success',
    description: '1. místo na Českém poháru - Slalom, K1 muži',
  },
  {
    id: 2,
    title: 'Přihláška potvrzena',
    timestamp: 'Před 5 hodinami',
    status: 'completed',
    color: 'primary',
    description: 'MČR ve sjezdu 2024 - přihláška schválena',
  },
  {
    id: 3,
    title: 'VT třída aktualizována',
    timestamp: 'Včera',
    status: 'completed',
    color: 'info',
    description: 'Povýšení z třídy B na třídu A',
  },
  {
    id: 4,
    title: 'Lékařská prohlídka brzy vyprší',
    timestamp: 'Před 3 dny',
    status: 'completed',
    color: 'warning',
    description: 'Platnost prohlídky končí za 30 dní',
  },
];

export const ActivityFeed: Story = {
  args: {
    items: activityFeedItems,
    variant: 'compact',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Kompaktní timeline pro zobrazení nedávných aktivit závodníka.',
      },
    },
  },
};

// =============================================================================
// With Actions
// =============================================================================

const itemsWithActions: TimelineItem[] = [
  {
    id: 1,
    title: 'Přihláška čeká na platbu',
    timestamp: 'Dnes',
    status: 'current',
    description: 'Pro dokončení přihlášky uhraďte startovné.',
    actions: (
      <>
        <Button size="sm" variant="primary">
          Zaplatit
        </Button>
        <Button size="sm" variant="ghost">
          Zrušit přihlášku
        </Button>
      </>
    ),
  },
  {
    id: 2,
    title: 'Potvrzení přihlášky',
    status: 'pending',
  },
  {
    id: 3,
    title: 'Závod',
    status: 'pending',
  },
];

export const WithActions: Story = {
  args: {
    items: itemsWithActions,
    variant: 'card',
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline s akčními tlačítky pro interaktivní workflow.',
      },
    },
  },
};

// =============================================================================
// Clickable Items
// =============================================================================

export const Clickable: Story = {
  args: {
    items: basicItems,
    onItemClick: (item) => {
      alert(`Clicked: ${item.title}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline s klikatelnými položkami pro detailní zobrazení.',
      },
    },
  },
};

// =============================================================================
// Reversed Order
// =============================================================================

export const Reversed: Story = {
  args: {
    items: basicItems,
    reverse: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline s opačným pořadím (nejnovější nahoře).',
      },
    },
  },
};

// =============================================================================
// Alternate Layout
// =============================================================================

export const Alternate: Story = {
  args: {
    items: [
      {
        id: 1,
        title: 'Leden - Příprava',
        timestamp: 'Leden 2024',
        status: 'completed',
        description: 'Zimní příprava, kondiční tréninky',
      },
      {
        id: 2,
        title: 'Únor - První závody',
        timestamp: 'Únor 2024',
        status: 'completed',
        description: 'Halové závody, první testy formy',
      },
      {
        id: 3,
        title: 'Březen - Sezóna začíná',
        timestamp: 'Březen 2024',
        status: 'current',
        description: 'Start venkovní sezóny, první body do VT',
      },
      {
        id: 4,
        title: 'Duben - Český pohár',
        timestamp: 'Duben 2024',
        status: 'pending',
        description: '1. a 2. kolo ČP',
      },
      {
        id: 5,
        title: 'Květen - MČR',
        timestamp: 'Květen 2024',
        status: 'pending',
        description: 'Mistrovství ČR juniorů a dospělých',
      },
    ],
    alternate: true,
    variant: 'card',
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Timeline se střídavým rozložením vlevo/vpravo (pouze na větších obrazovkách).',
      },
    },
  },
};

// =============================================================================
// Without Connector
// =============================================================================

export const WithoutConnector: Story = {
  args: {
    items: basicItems,
    showConnector: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline bez spojovacích čar mezi položkami.',
      },
    },
  },
};

// =============================================================================
// CSK: Workflow zpracování výsledků
// =============================================================================

const resultsWorkflowItems: TimelineItem[] = [
  {
    id: 1,
    title: 'Výsledky nahrány',
    timestamp: '16. 3. 2024, 18:45',
    status: 'completed',
    description: 'Hrubé výsledky z časomíry nahrány do systému.',
    meta: <span>Zpracoval: Jan Novotný</span>,
  },
  {
    id: 2,
    title: 'Kontrola penalizací',
    timestamp: '16. 3. 2024, 19:30',
    status: 'completed',
    description: 'Penalizace ověřeny a potvrzeny rozhodčím.',
    meta: <span>Hlavní rozhodčí: Karel Starý</span>,
  },
  {
    id: 3,
    title: 'Protesty uzavřeny',
    timestamp: '16. 3. 2024, 20:00',
    status: 'completed',
    description: 'Lhůta pro podání protestů vypršela. Žádné protesty.',
  },
  {
    id: 4,
    title: 'Výsledky schváleny',
    timestamp: '16. 3. 2024, 20:15',
    status: 'current',
    description: 'Čekání na schválení hlavním rozhodčím.',
  },
  {
    id: 5,
    title: 'Zveřejnění',
    status: 'pending',
    description: 'Oficiální výsledky budou zveřejněny na portálu.',
  },
  {
    id: 6,
    title: 'VT body přiděleny',
    status: 'pending',
    description: 'Automatický přepočet VT bodů závodníků.',
  },
];

export const ResultsWorkflow: Story = {
  args: {
    items: resultsWorkflowItems,
    variant: 'default',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline pro workflow zpracování a schvalování výsledků závodu.',
      },
    },
  },
};
