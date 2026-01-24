import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './Toast';
import { Button } from '../Button';

const meta: Meta<typeof ToastProvider> = {
  title: 'Components/Toast',
  component: ToastProvider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Toast component for displaying temporary notifications.

## Features
- Multiple variants (default, success, warning, error, info, energy)
- Style variants (default, gradient, glass)
- Configurable position (6 positions)
- Auto-dismiss with progress bar
- Action buttons for undo/retry patterns
- WCAG 2.1 AA compliant
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    },
    duration: {
      control: { type: 'number', min: 0, max: 10000, step: 500 },
    },
    maxToasts: {
      control: { type: 'number', min: 1, max: 10 },
    },
    styleVariant: {
      control: 'select',
      options: ['default', 'gradient', 'glass'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

// =============================================================================
// DEMO COMPONENTS
// =============================================================================

const ToastDemo = () => {
  const { toast, success, warning, error, info, energy, dismissAll } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <Button onClick={() => toast('Toto je základní oznámení')}>Default Toast</Button>
      <Button variant="secondary" onClick={() => success('Změny byly úspěšně uloženy')}>
        Success Toast
      </Button>
      <Button variant="secondary" onClick={() => warning('Platnost členství vyprší za 30 dní')}>
        Warning Toast
      </Button>
      <Button variant="danger" onClick={() => error('Nepodařilo se načíst data')}>
        Error Toast
      </Button>
      <Button variant="ghost" onClick={() => info('Nová verze aplikace je k dispozici')}>
        Info Toast
      </Button>
      <Button
        variant="gradient-energy"
        onClick={() => energy('Závodník právě startuje!', { title: 'Live' })}
      >
        Energy Toast
      </Button>
      <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid var(--color-border-secondary)' }} />
      <Button variant="ghost" onClick={dismissAll}>Zavřít všechny</Button>
    </div>
  );
};

const ToastWithActionDemo = () => {
  const { toast, success, error } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <Button
        onClick={() =>
          toast('Závodník byl smazán ze startovní listiny', {
            action: {
              label: 'Zpět',
              onClick: () => success('Akce byla vrácena zpět'),
            },
          })
        }
      >
        Undo pattern
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          error('Nepodařilo se uložit změny', {
            title: 'Chyba při ukládání',
            action: {
              label: 'Zkusit znovu',
              onClick: () => success('Změny byly uloženy'),
            },
          })
        }
      >
        Retry pattern
      </Button>
    </div>
  );
};

const AllStyleVariantsDemo = () => {
  const { success } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Všechny styly</h4>
      <Button
        onClick={() =>
          success('Default style - klasický vzhled', { styleVariant: 'default', title: 'Default' })
        }
      >
        Default Style
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          success('Gradient style - výrazný branded vzhled', { styleVariant: 'gradient', title: 'Gradient' })
        }
      >
        Gradient Style
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          success('Glass style - frosted glass efekt', { styleVariant: 'glass', title: 'Glass' })
        }
      >
        Glass Style
      </Button>
    </div>
  );
};

// =============================================================================
// STORIES
// =============================================================================

export const Default: Story = {
  args: {
    position: 'bottom-right',
    duration: 5000,
    maxToasts: 5,
    showProgress: true,
  },
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDemo />
    </ToastProvider>
  ),
};

export const WithAction: Story = {
  args: {
    position: 'bottom-right',
  },
  render: (args) => (
    <ToastProvider {...args}>
      <ToastWithActionDemo />
    </ToastProvider>
  ),
};

export const AllStyleVariants: Story = {
  args: {
    position: 'bottom-right',
  },
  render: (args) => (
    <ToastProvider {...args}>
      <AllStyleVariantsDemo />
    </ToastProvider>
  ),
};

export const TopRight: Story = {
  args: {
    position: 'top-right',
  },
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDemo />
    </ToastProvider>
  ),
};

export const TopCenter: Story = {
  args: {
    position: 'top-center',
  },
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDemo />
    </ToastProvider>
  ),
};

// =============================================================================
// CSK SPECIFIC STORIES
// =============================================================================

const CSKLiveResultsDemo = () => {
  const { success, info, warning } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Live výsledky</h4>
      <Button
        onClick={() =>
          success('Jan Novák (KC Praha) - 98.45s - 1. místo!', {
            title: 'Nový nejlepší čas',
            styleVariant: 'gradient',
            duration: 8000,
          })
        }
      >
        Nový nejlepší čas
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          info('Petra Svobodová právě startuje na trati.', {
            title: 'Start závodníka',
            duration: 3000,
          })
        }
      >
        Start závodníka
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          warning('Připojení k live serveru bylo přerušeno.', {
            title: 'Problém s připojením',
            duration: 0,
          })
        }
      >
        Výpadek připojení
      </Button>
    </div>
  );
};

export const CSKLiveResults: Story = {
  args: {
    position: 'top-right',
    duration: 5000,
  },
  render: (args) => (
    <ToastProvider {...args}>
      <CSKLiveResultsDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toast notifications for live results during competitions.',
      },
    },
  },
};

// =============================================================================
// ENERGY & AESTHETIC STORIES
// =============================================================================

const EnergyDemo = () => {
  const { energy } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Energy Variant (Dynamic Sport)</h4>
      <Button
        variant="gradient-energy"
        onClick={() =>
          energy('Jan Novák právě startuje na trati!', {
            title: 'LIVE',
            displayTitle: true,
          })
        }
      >
        Energy with Display Title
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          energy('Přidejte si závodníka do oblíbených pro sledování.', {
            action: {
              label: 'Přidat',
              onClick: () => {},
            },
          })
        }
      >
        Energy with Action
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          energy('Nová funkce: sledování závodníků je nyní dostupné!', {
            styleVariant: 'gradient',
            title: 'Novinka',
            displayTitle: true,
          })
        }
      >
        Energy Gradient Style
      </Button>
    </div>
  );
};

export const EnergyVariant: Story = {
  args: {
    position: 'bottom-right',
    duration: 6000,
  },
  render: (args) => (
    <ToastProvider {...args}>
      <EnergyDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Energy variant with coral-orange accent. Part of the Dynamic Sport aesthetic. Great for highlights and CTAs.',
      },
    },
  },
};

const DisplayTitleDemo = () => {
  const { success, info, energy } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Display Font Title</h4>
      <Button
        onClick={() =>
          success('Registrace byla úspěšně dokončena.', {
            title: 'Registrace dokončena',
            displayTitle: true,
          })
        }
      >
        Success with Display Title
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          info('Klikněte pro více informací o závodě.', {
            title: 'Mistrovství ČR 2024',
            displayTitle: true,
          })
        }
      >
        Info with Display Title
      </Button>
      <Button
        variant="gradient-energy"
        onClick={() =>
          energy('Závodník je na trati, sledujte živě!', {
            title: 'ŽIVĚ',
            displayTitle: true,
            styleVariant: 'gradient',
          })
        }
      >
        Energy Gradient + Display Title
      </Button>
    </div>
  );
};

export const DisplayTitle: Story = {
  args: {
    position: 'top-right',
  },
  render: (args) => (
    <ToastProvider {...args}>
      <DisplayTitleDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Display font (Plus Jakarta Sans) for toast titles adds emphasis and aligns with the Dynamic Sport aesthetic.',
      },
    },
  },
};
