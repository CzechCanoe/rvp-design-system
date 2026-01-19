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
- Multiple variants (default, success, warning, error, info)
- Configurable position (6 positions)
- Auto-dismiss with configurable duration
- Pause timer on hover
- Action buttons for undo/retry patterns
- WCAG 2.1 AA compliant (role="alert", aria-live)
- Stacking with configurable max visible limit
- Responsive design (full-width on mobile)

## Usage
\`\`\`tsx
import { ToastProvider, useToast } from '@czechcanoe/rvp-design-system';

// Wrap your app with ToastProvider
function App() {
  return (
    <ToastProvider position="bottom-right">
      <YourApp />
    </ToastProvider>
  );
}

// Use the hook in any component
function MyComponent() {
  const { success, error, toast } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      success('Změny byly uloženy');
    } catch (e) {
      error('Nepodařilo se uložit změny');
    }
  };

  return <Button onClick={handleSave}>Uložit</Button>;
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      description: 'Position of the toast container',
    },
    duration: {
      control: { type: 'number', min: 0, max: 10000, step: 500 },
      description: 'Default duration in ms (0 = no auto-dismiss)',
    },
    maxToasts: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum number of visible toasts',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

// =============================================================================
// DEMO COMPONENTS
// =============================================================================

const ToastDemo = () => {
  const { toast, success, warning, error, info, dismissAll } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <Button onClick={() => toast('Toto je základní oznámení')}>
        Default Toast
      </Button>
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
      <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid var(--color-border-secondary)' }} />
      <Button variant="ghost" onClick={dismissAll}>
        Zavřít všechny
      </Button>
    </div>
  );
};

const ToastWithTitleDemo = () => {
  const { success, error, warning } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <Button
        onClick={() =>
          success('Závodník Jan Novák byl úspěšně přihlášen na závod.', {
            title: 'Přihlášení dokončeno',
          })
        }
      >
        S titulkem
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          error('Zkontrolujte připojení k internetu a zkuste to znovu.', {
            title: 'Chyba připojení',
          })
        }
      >
        Chyba s titulkem
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          warning('Některá pole formuláře nejsou vyplněna.', {
            title: 'Neúplný formulář',
          })
        }
      >
        Varování s titulkem
      </Button>
    </div>
  );
};

const ToastWithActionDemo = () => {
  const { toast, success, error } = useToast();

  const handleDelete = () => {
    toast('Závodník byl smazán ze startovní listiny', {
      action: {
        label: 'Zpět',
        onClick: () => success('Akce byla vrácena zpět'),
      },
    });
  };

  const handleError = () => {
    error('Nepodařilo se uložit změny', {
      title: 'Chyba při ukládání',
      action: {
        label: 'Zkusit znovu',
        onClick: () => success('Změny byly uloženy'),
      },
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <Button onClick={handleDelete}>Undo pattern</Button>
      <Button variant="danger" onClick={handleError}>
        Retry pattern
      </Button>
    </div>
  );
};

const ToastDurationDemo = () => {
  const { toast, info } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <Button onClick={() => toast('Zmizí za 2 sekundy', { duration: 2000 })}>
        Krátká (2s)
      </Button>
      <Button onClick={() => toast('Zmizí za 10 sekund', { duration: 10000 })}>
        Dlouhá (10s)
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          info('Tato zpráva zůstane dokud ji nezavřete', {
            duration: 0,
            title: 'Důležité oznámení',
          })
        }
      >
        Bez auto-dismiss
      </Button>
    </div>
  );
};

const ToastStackDemo = () => {
  const { toast, success, warning, error, info } = useToast();
  let counter = 0;

  const showMultiple = () => {
    toast(`Základní zpráva ${++counter}`);
    setTimeout(() => success(`Úspěch ${++counter}`), 200);
    setTimeout(() => warning(`Varování ${++counter}`), 400);
    setTimeout(() => error(`Chyba ${++counter}`), 600);
    setTimeout(() => info(`Info ${++counter}`), 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <Button onClick={showMultiple}>Zobrazit 5 notifikací</Button>
      <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
        Maximálně 5 notifikací je viditelných najednou. Starší jsou automaticky skryty.
      </p>
    </div>
  );
};

// =============================================================================
// CSK SPECIFIC DEMOS
// =============================================================================

const CSKRegistrationDemo = () => {
  const { success, error, warning } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Registrace závodníka</h4>
      <Button
        onClick={() =>
          success('Závodník Jan Novák (CZE) byl úspěšně registrován.', {
            title: 'Registrace dokončena',
          })
        }
      >
        Registrace úspěšná
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          error('Závodník s tímto rodným číslem již existuje v systému.', {
            title: 'Duplicitní registrace',
          })
        }
      >
        Duplicitní závodník
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          warning('Závodníkovi chybí platná zdravotní prohlídka.', {
            title: 'Neúplné dokumenty',
          })
        }
      >
        Chybí dokumenty
      </Button>
    </div>
  );
};

const CSKEventDemo = () => {
  const { success, error, info, toast } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Správa závodů</h4>
      <Button
        onClick={() =>
          success('Přihláška na MČR 2024 byla úspěšně odeslána.', {
            title: 'Přihláška odeslána',
          })
        }
      >
        Přihláška odeslána
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          info('Startovní listina pro kategorii K1 muži byla zveřejněna.', {
            title: 'Nová startovní listina',
          })
        }
      >
        Startovka zveřejněna
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          error('Uzávěrka přihlášek již uplynula.', {
            title: 'Pozdní přihláška',
            action: {
              label: 'Kontaktovat',
              onClick: () => info('Otevírám kontaktní formulář...'),
            },
          })
        }
      >
        Uzávěrka
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          toast('Závodník byl odebrán ze startovní listiny', {
            action: {
              label: 'Zpět',
              onClick: () => success('Závodník byl vrácen na startovní listinu'),
            },
          })
        }
      >
        Odebrat závodníka
      </Button>
    </div>
  );
};

const CSKLiveResultsDemo = () => {
  const { success, info, warning } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Live výsledky</h4>
      <Button
        onClick={() =>
          success('Jan Novák (KC Praha) - 98.45s - 1. místo!', {
            title: 'Nový nejlepší čas',
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
          warning('Připojení k live serveru bylo přerušeno. Pokouším se znovu připojit...', {
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

// =============================================================================
// STORIES
// =============================================================================

export const Default: Story = {
  args: {
    position: 'bottom-right',
    duration: 5000,
    maxToasts: 5,
  },
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDemo />
    </ToastProvider>
  ),
};

export const WithTitle: Story = {
  args: {
    position: 'bottom-right',
  },
  render: (args) => (
    <ToastProvider {...args}>
      <ToastWithTitleDemo />
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

export const DurationVariants: Story = {
  args: {
    position: 'bottom-right',
  },
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDurationDemo />
    </ToastProvider>
  ),
};

export const Stacking: Story = {
  args: {
    position: 'bottom-right',
    maxToasts: 5,
  },
  render: (args) => (
    <ToastProvider {...args}>
      <ToastStackDemo />
    </ToastProvider>
  ),
};

export const TopLeft: Story = {
  args: {
    position: 'top-left',
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

export const BottomLeft: Story = {
  args: {
    position: 'bottom-left',
  },
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDemo />
    </ToastProvider>
  ),
};

export const BottomCenter: Story = {
  args: {
    position: 'bottom-center',
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

export const CSKRegistration: Story = {
  args: {
    position: 'bottom-right',
  },
  render: (args) => (
    <ToastProvider {...args}>
      <CSKRegistrationDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toast notifications for athlete registration workflows.',
      },
    },
  },
};

export const CSKEvents: Story = {
  args: {
    position: 'bottom-right',
  },
  render: (args) => (
    <ToastProvider {...args}>
      <CSKEventDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toast notifications for event management and registrations.',
      },
    },
  },
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
