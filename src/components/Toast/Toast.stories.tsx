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
- Style variants (default, gradient, glass)
- Configurable position (6 positions)
- Auto-dismiss with configurable duration
- **Progress bar** visualization with pause on hover
- **Slide-in/out animations** from edge of screen
- Pause timer on hover
- Action buttons for undo/retry patterns
- WCAG 2.1 AA compliant (role="alert", aria-live)
- Stacking with configurable max visible limit
- Responsive design (full-width on mobile)
- Icon glow effects for status variants
- Dismiss button with rotate animation

## Usage
\`\`\`tsx
import { ToastProvider, useToast } from '@czechcanoe/rvp-design-system';

// Wrap your app with ToastProvider
function App() {
  return (
    <ToastProvider position="bottom-right" showProgress>
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

  // Gradient style toast
  success('Dokončeno!', { styleVariant: 'gradient' });

  // Glass style toast
  info('Nová verze', { styleVariant: 'glass' });

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
    styleVariant: {
      control: 'select',
      options: ['default', 'gradient', 'glass'],
      description: 'Default style variant for toasts',
    },
    showProgress: {
      control: 'boolean',
      description: 'Whether to show progress bar by default',
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
// NEW STYLE VARIANT DEMOS
// =============================================================================

const GradientToastDemo = () => {
  const { toast, success, warning, error, info } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Gradient Style</h4>
      <Button
        onClick={() =>
          toast('Gradient default toast', {
            styleVariant: 'gradient',
            title: 'Gradient Style',
          })
        }
      >
        Gradient Default
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          success('Operace byla úspěšná!', {
            styleVariant: 'gradient',
            title: 'Úspěch',
          })
        }
      >
        Gradient Success
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          warning('Pozor na tuto akci', {
            styleVariant: 'gradient',
            title: 'Varování',
          })
        }
      >
        Gradient Warning
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          error('Něco se pokazilo', {
            styleVariant: 'gradient',
            title: 'Chyba',
          })
        }
      >
        Gradient Error
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          info('Nová aktualizace', {
            styleVariant: 'gradient',
            title: 'Info',
          })
        }
      >
        Gradient Info
      </Button>
    </div>
  );
};

const GlassToastDemo = () => {
  const { toast, success, info } = useToast();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '300px',
        padding: '24px',
        background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))',
        borderRadius: '12px',
      }}
    >
      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'white' }}>
        Glass Style (na barevném pozadí)
      </h4>
      <Button
        onClick={() =>
          toast('Glass effect toast', {
            styleVariant: 'glass',
            title: 'Glass Style',
          })
        }
      >
        Glass Default
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          success('Glassmorphism success', {
            styleVariant: 'glass',
          })
        }
      >
        Glass Success
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          info('Frosted glass info', {
            styleVariant: 'glass',
          })
        }
      >
        Glass Info
      </Button>
    </div>
  );
};

const ProgressBarDemo = () => {
  const { toast, success, warning, error, info } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Progress Bar</h4>
      <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>
        Progress bar ukazuje zbývající čas. Při hoveru se pozastaví.
      </p>
      <Button onClick={() => toast('S progress barem (5s)', { duration: 5000 })}>
        Default (5s)
      </Button>
      <Button
        variant="secondary"
        onClick={() => success('Success s progress barem', { duration: 4000 })}
      >
        Success (4s)
      </Button>
      <Button
        variant="secondary"
        onClick={() => warning('Warning s progress barem', { duration: 6000 })}
      >
        Warning (6s)
      </Button>
      <Button
        variant="danger"
        onClick={() => error('Error s progress barem', { duration: 8000 })}
      >
        Error (8s)
      </Button>
      <Button
        variant="ghost"
        onClick={() => info('Info s progress barem', { duration: 3000 })}
      >
        Info (3s)
      </Button>
      <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid var(--color-border-secondary)' }} />
      <Button
        variant="ghost"
        onClick={() =>
          toast('Bez progress baru', {
            showProgress: false,
            duration: 5000,
          })
        }
      >
        Bez progress baru
      </Button>
    </div>
  );
};

const SlideAnimationDemo = () => {
  const { success, info } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Slide-in Animace</h4>
      <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>
        Toast se vysune z hrany obrazovky podle své pozice (right/left/top/bottom).
      </p>
      <Button
        onClick={() => success('Vysune se zprava', { title: 'Slide-in' })}
      >
        Zobrazit toast
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          info('Hover pro zvětšení, klikni dismiss pro rotaci ikony', {
            title: 'Micro-interactions',
            duration: 8000,
          })
        }
      >
        Micro-interactions demo
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
          success('Default style - klasický vzhled', {
            styleVariant: 'default',
            title: 'Default',
          })
        }
      >
        Default Style
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          success('Gradient style - výrazný branded vzhled', {
            styleVariant: 'gradient',
            title: 'Gradient',
          })
        }
      >
        Gradient Style
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          success('Glass style - frosted glass efekt', {
            styleVariant: 'glass',
            title: 'Glass',
          })
        }
      >
        Glass Style
      </Button>
    </div>
  );
};

const FeaturedShowcaseDemo = () => {
  const { success, error, info, warning } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px' }}>
      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Featured Showcase</h4>
      <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>
        Ukázka všech nových funkcí Toast komponenty.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Button
          onClick={() =>
            success('Registrace závodníka byla úspěšně dokončena!', {
              title: 'Registrace dokončena',
              styleVariant: 'gradient',
              duration: 6000,
            })
          }
        >
          🎉 Gradient Success
        </Button>

        <Button
          variant="danger"
          onClick={() =>
            error('Nepodařilo se připojit k serveru. Zkontrolujte připojení.', {
              title: 'Chyba připojení',
              action: {
                label: 'Zkusit znovu',
                onClick: () => info('Pokus o opětovné připojení...'),
              },
              duration: 8000,
            })
          }
        >
          ⚠️ Error s akcí
        </Button>

        <Button
          variant="secondary"
          onClick={() =>
            warning('Vaše členství vyprší za 7 dní. Obnovte si ho včas.', {
              title: 'Blíží se expirace',
              styleVariant: 'glass',
              duration: 10000,
            })
          }
        >
          💎 Glass Warning
        </Button>

        <Button
          variant="ghost"
          onClick={() =>
            info('Nový závodník právě startuje na trati!', {
              title: 'Live update',
              duration: 4000,
            })
          }
        >
          📡 Live notifikace
        </Button>
      </div>
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
    showProgress: true,
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

// =============================================================================
// NEW STYLE VARIANT STORIES
// =============================================================================

export const GradientStyle: Story = {
  args: {
    position: 'bottom-right',
    styleVariant: 'gradient',
  },
  render: (args) => (
    <ToastProvider {...args}>
      <GradientToastDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Gradient style variant with full-color backgrounds for a bold, branded look.',
      },
    },
  },
};

export const GlassStyle: Story = {
  args: {
    position: 'bottom-right',
    styleVariant: 'glass',
  },
  render: (args) => (
    <ToastProvider {...args}>
      <GlassToastDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Glass style variant with backdrop blur for a frosted glass effect. Best used on colored backgrounds.',
      },
    },
  },
};

export const ProgressBar: Story = {
  args: {
    position: 'bottom-right',
    showProgress: true,
  },
  render: (args) => (
    <ToastProvider {...args}>
      <ProgressBarDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bar shows remaining time before auto-dismiss. Pauses on hover.',
      },
    },
  },
};

export const SlideAnimation: Story = {
  args: {
    position: 'bottom-right',
  },
  render: (args) => (
    <ToastProvider {...args}>
      <SlideAnimationDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Slide-in animation from edge of screen based on position. Includes micro-interactions on hover and dismiss.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all three style variants: default, gradient, and glass.',
      },
    },
  },
};

export const FeaturedShowcase: Story = {
  args: {
    position: 'bottom-right',
    showProgress: true,
  },
  render: (args) => (
    <ToastProvider {...args}>
      <FeaturedShowcaseDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all new Toast features: gradient/glass styles, progress bar, slide animations, and micro-interactions.',
      },
    },
  },
};

// =============================================================================
// POSITION STORIES
// =============================================================================

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
        story: 'Toast notifications for live results during competitions. Uses gradient style for important updates.',
      },
    },
  },
};
