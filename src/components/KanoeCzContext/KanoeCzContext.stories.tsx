import type { Meta, StoryObj } from '@storybook/react';
import { KanoeCzContext } from './KanoeCzContext';
import { ResultsTable, type ResultEntry } from '../ResultsTable';
import { Card } from '../Card';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Table } from '../Table';

const meta: Meta<typeof KanoeCzContext> = {
  title: 'Integration/KanoeCzContext',
  component: KanoeCzContext,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Mock of kanoe.cz layout for testing embedded components.

This component simulates the Bootstrap 4 + Joomla environment of kanoe.cz,
allowing you to preview how design system components will look when embedded
in the actual website.

**Key Features:**
- Mimics kanoe.cz header, navigation, and footer
- Bootstrap 4-like grid system
- Three layout options: full, sidebar, narrow
- Automatically applies \`data-mode="embed"\` for embed styling
        `,
      },
    },
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['full', 'sidebar', 'narrow'],
    },
    containerWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'fluid'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof KanoeCzContext>;

// Sample results data
const sampleResults: ResultEntry[] = [
  {
    id: 1,
    rank: 1,
    name: 'Jiří Prskavec',
    club: 'USK Praha',
    country: 'CZE',
    category: 'K1M',
    section: 'dv',
    run1Time: 92.45,
    run1Penalty: 0,
    run2Time: 89.12,
    run2Penalty: 2,
    totalTime: 89.12,
    status: 'final',
  },
  {
    id: 2,
    rank: 2,
    name: 'Vít Přindiš',
    club: 'Dukla Praha',
    country: 'CZE',
    category: 'K1M',
    section: 'dv',
    run1Time: 93.21,
    run1Penalty: 2,
    run2Time: 90.45,
    run2Penalty: 0,
    totalTime: 90.45,
    timeDiff: 1.33,
    status: 'final',
  },
  {
    id: 3,
    rank: 3,
    name: 'Lukáš Rohan',
    club: 'Dukla Praha',
    country: 'CZE',
    category: 'C1M',
    section: 'dv',
    run1Time: 94.56,
    run1Penalty: 0,
    run2Time: 91.23,
    run2Penalty: 0,
    totalTime: 91.23,
    timeDiff: 2.11,
    status: 'final',
  },
  {
    id: 4,
    rank: 4,
    name: 'Václav Chaloupka',
    club: 'Bohemians Praha',
    country: 'CZE',
    category: 'K1M',
    section: 'dv',
    run1Time: 95.12,
    run1Penalty: 4,
    run2Time: 92.67,
    run2Penalty: 2,
    totalTime: 92.67,
    timeDiff: 3.55,
    status: 'final',
  },
  {
    id: 5,
    rank: 5,
    name: 'Ondřej Tunka',
    club: 'TJ Slavia',
    country: 'CZE',
    category: 'C1M',
    section: 'dv',
    run1Time: 96.34,
    run1Penalty: 0,
    run2Time: 93.12,
    run2Penalty: 0,
    totalTime: 93.12,
    timeDiff: 4.00,
    status: 'final',
  },
];

// =============================================================================
// BASIC STORIES
// =============================================================================

export const Default: Story = {
  args: {
    layout: 'full',
    showHeader: true,
    containerWidth: 'lg',
    children: (
      <div>
        <h2 style={{ marginBottom: '16px' }}>Výsledky - MČR ve slalomu 2024</h2>
        <p style={{ marginBottom: '24px', color: '#6c757d' }}>
          Toto je ukázka komponenty ResultsTable embedované v prostředí kanoe.cz
        </p>
        <ResultsTable
          results={sampleResults}
          showClub
          showPodiumHighlights
          caption="Finálové výsledky K1 muži"
        />
      </div>
    ),
  },
};

export const WithSidebar: Story = {
  args: {
    layout: 'sidebar',
    showHeader: true,
    showSidebar: true,
    containerWidth: 'xl',
    children: (
      <div>
        <h2 style={{ marginBottom: '16px' }}>Kalendář závodů 2024</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Card variant="outlined">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Badge variant="primary" size="sm">ČP</Badge>
                <h3 style={{ margin: '8px 0 4px', fontSize: '16px' }}>Český pohár - Trnávka</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#6c757d' }}>15. - 16. června 2024</p>
              </div>
              <Button variant="secondary" size="sm">Detail</Button>
            </div>
          </Card>
          <Card variant="outlined">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Badge variant="success" size="sm">MČR</Badge>
                <h3 style={{ margin: '8px 0 4px', fontSize: '16px' }}>Mistrovství ČR - Praha</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#6c757d' }}>22. - 23. června 2024</p>
              </div>
              <Button variant="secondary" size="sm">Detail</Button>
            </div>
          </Card>
          <Card variant="outlined">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Badge variant="warning" size="sm">SP</Badge>
                <h3 style={{ margin: '8px 0 4px', fontSize: '16px' }}>Světový pohár - Praha</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#6c757d' }}>29. - 30. června 2024</p>
              </div>
              <Button variant="secondary" size="sm">Detail</Button>
            </div>
          </Card>
        </div>
      </div>
    ),
  },
};

export const NarrowLayout: Story = {
  args: {
    layout: 'narrow',
    showHeader: true,
    containerWidth: 'xl',
    children: (
      <div>
        <h2 style={{ marginBottom: '16px' }}>Přihláška na závod</h2>
        <p style={{ marginBottom: '24px', color: '#6c757d' }}>
          Kompaktní formulářový layout pro úzké kontejnery
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card>
            <h3 style={{ margin: '0 0 16px', fontSize: '16px' }}>Údaje závodníka</h3>
            <Table
              columns={[
                { key: 'label', header: 'Položka' },
                { key: 'value', header: 'Hodnota' },
              ]}
              data={[
                { label: 'Jméno', value: 'Jan Novák' },
                { label: 'Klub', value: 'USK Praha' },
                { label: 'Kategorie', value: 'K1 muži' },
                { label: 'Ročník', value: '1995' },
              ]}
              size="sm"
              variant="striped"
            />
          </Card>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Button variant="secondary">Zrušit</Button>
            <Button variant="primary">Odeslat přihlášku</Button>
          </div>
        </div>
      </div>
    ),
  },
};

// =============================================================================
// CONTAINER WIDTH EXAMPLES
// =============================================================================

export const SmallContainer: Story = {
  name: 'Container: Small (540px)',
  args: {
    layout: 'full',
    containerWidth: 'sm',
    children: (
      <div>
        <h3 style={{ marginBottom: '12px' }}>Úzký kontejner</h3>
        <p style={{ fontSize: '14px', color: '#6c757d' }}>
          Simulace mobilního nebo sidebar widgetu (max 540px)
        </p>
        <ResultsTable
          results={sampleResults.slice(0, 3)}
          size="sm"
          caption="Top 3"
        />
      </div>
    ),
  },
};

export const FluidContainer: Story = {
  name: 'Container: Fluid (100%)',
  args: {
    layout: 'full',
    containerWidth: 'fluid',
    children: (
      <div>
        <h2 style={{ marginBottom: '16px' }}>Plná šířka</h2>
        <p style={{ marginBottom: '24px', color: '#6c757d' }}>
          Komponenta využívá celou dostupnou šířku kontejneru
        </p>
        <ResultsTable
          results={sampleResults}
          showClub
          showRuns
          showPodiumHighlights
          caption="Kompletní výsledky"
        />
      </div>
    ),
  },
};

// =============================================================================
// COMPONENT INTEGRATION EXAMPLES
// =============================================================================

export const ButtonsInContext: Story = {
  name: 'Integration: Buttons',
  args: {
    layout: 'full',
    children: (
      <div>
        <h2 style={{ marginBottom: '16px' }}>Tlačítka v embed režimu</h2>
        <p style={{ marginBottom: '24px', color: '#6c757d' }}>
          Ukázka jak vypadají tlačítka design systému v kontextu kanoe.cz
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
          <Button variant="primary">Primární</Button>
          <Button variant="secondary">Sekundární</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Button variant="primary" size="sm">Malé</Button>
          <Button variant="primary" size="md">Střední</Button>
          <Button variant="primary" size="lg">Velké</Button>
        </div>
      </div>
    ),
  },
};

export const BadgesInContext: Story = {
  name: 'Integration: Badges',
  args: {
    layout: 'full',
    children: (
      <div>
        <h2 style={{ marginBottom: '16px' }}>Odznaky v embed režimu</h2>
        <p style={{ marginBottom: '24px', color: '#6c757d' }}>
          Typy závodů a sekce v kontextu kanoe.cz
        </p>
        <div style={{ marginBottom: '16px' }}>
          <h4 style={{ marginBottom: '8px', fontSize: '14px' }}>Typy závodů:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <Badge variant="error">MS</Badge>
            <Badge variant="warning">ME</Badge>
            <Badge variant="primary">SP</Badge>
            <Badge variant="success">MČR</Badge>
            <Badge variant="default">ČP</Badge>
          </div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <h4 style={{ marginBottom: '8px', fontSize: '14px' }}>Sekce:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <Badge section="dv">Divoká voda</Badge>
            <Badge section="ry">Rychlostní</Badge>
            <Badge section="vt">Vodní turistika</Badge>
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: '8px', fontSize: '14px' }}>VT třídy:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <Badge vtClass="m">M</Badge>
            <Badge vtClass="a">A</Badge>
            <Badge vtClass="b">B</Badge>
            <Badge vtClass="c">C</Badge>
          </div>
        </div>
      </div>
    ),
  },
};

export const CardsInContext: Story = {
  name: 'Integration: Cards',
  args: {
    layout: 'full',
    children: (
      <div>
        <h2 style={{ marginBottom: '16px' }}>Karty v embed režimu</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <Card variant="surface">
            <Badge variant="success" size="sm">Aktivní</Badge>
            <h3 style={{ margin: '8px 0', fontSize: '16px' }}>ČP Trnávka 2024</h3>
            <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#6c757d' }}>
              Přihlášky do 10. 6. 2024
            </p>
            <Button variant="primary" size="sm" fullWidth>Přihlásit se</Button>
          </Card>
          <Card variant="outlined">
            <Badge variant="default" size="sm">Uzavřeno</Badge>
            <h3 style={{ margin: '8px 0', fontSize: '16px' }}>MČR Praha 2024</h3>
            <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#6c757d' }}>
              Přihlášky uzavřeny
            </p>
            <Button variant="secondary" size="sm" fullWidth disabled>Uzavřeno</Button>
          </Card>
          <Card variant="elevated">
            <Badge variant="warning" size="sm">Brzy</Badge>
            <h3 style={{ margin: '8px 0', fontSize: '16px' }}>SP Praha 2024</h3>
            <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#6c757d' }}>
              Přihlášky od 1. 7. 2024
            </p>
            <Button variant="ghost" size="sm" fullWidth>Sledovat</Button>
          </Card>
        </div>
      </div>
    ),
  },
};

// =============================================================================
// WITHOUT HEADER
// =============================================================================

export const WithoutHeader: Story = {
  name: 'Without Header',
  args: {
    layout: 'full',
    showHeader: false,
    children: (
      <div>
        <h2 style={{ marginBottom: '16px' }}>Embed bez hlavičky</h2>
        <p style={{ marginBottom: '24px', color: '#6c757d' }}>
          Pro případy kdy je komponenta embedována hluboko ve stránce
        </p>
        <ResultsTable
          results={sampleResults.slice(0, 3)}
          showClub
          caption="Výsledky"
        />
      </div>
    ),
  },
};
