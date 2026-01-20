import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button';
import { Input } from '../Input';
import { Select } from '../Select';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Modal component for dialogs, confirmations, and overlays.

## Features
- Multiple sizes (sm, md, lg, xl, full)
- Focus trap for accessibility
- Keyboard navigation (Escape to close)
- Backdrop click to close (optional)
- Portal rendering for proper stacking
- WCAG 2.1 AA compliant

## Usage
\`\`\`tsx
import { Modal, Button } from '@czechcanoe/rvp-design-system';

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Modal Title"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </>
        }
      >
        Modal content goes here.
      </Modal>
    </>
  );
}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    styleVariant: {
      control: 'select',
      options: ['default', 'gradient', 'glass', 'danger'],
    },
    open: {
      control: 'boolean',
    },
    closeOnBackdropClick: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
    showCloseButton: {
      control: 'boolean',
    },
    scrollable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Helper component for interactive stories
const ModalDemo = ({
  size = 'md',
  title = 'Modal Title',
  description,
  styleVariant = 'default',
  footer,
  children,
  ...props
}: Partial<React.ComponentProps<typeof Modal>> & { children?: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size={size}
        styleVariant={styleVariant}
        title={title}
        description={description}
        footer={footer}
        {...props}
      >
        {children || (
          <p>
            This is the modal content. You can put any content here including text,
            forms, images, or other components.
          </p>
        )}
      </Modal>
    </>
  );
};

/* ==========================================================================
 * BASIC EXAMPLES
 * ========================================================================== */

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const WithDescription: Story = {
  render: () => (
    <ModalDemo
      title="Confirm Action"
      description="This action cannot be undone. Please review before proceeding."
    />
  ),
};

export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm Delete"
          description="Are you sure you want to delete this item?"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setOpen(false)}>
                Delete
              </Button>
            </>
          }
        >
          <p>This action will permanently delete the selected athlete from the system.</p>
        </Modal>
      </>
    );
  },
};

/* ==========================================================================
 * SIZE VARIANTS
 * ========================================================================== */

export const Small: Story = {
  render: () => <ModalDemo size="sm" title="Small Modal" />,
};

export const Medium: Story = {
  render: () => <ModalDemo size="md" title="Medium Modal (Default)" />,
};

export const Large: Story = {
  render: () => <ModalDemo size="lg" title="Large Modal" />,
};

export const ExtraLarge: Story = {
  render: () => <ModalDemo size="xl" title="Extra Large Modal" />,
};

export const FullScreen: Story = {
  render: () => (
    <ModalDemo size="full" title="Full Screen Modal">
      <p>
        This modal takes up most of the screen. Useful for complex forms,
        detailed views, or when you need maximum space.
      </p>
    </ModalDemo>
  ),
};

/* ==========================================================================
 * BEHAVIOR VARIANTS
 * ========================================================================== */

export const NoCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="No Close Button"
          showCloseButton={false}
          footer={
            <Button onClick={() => setOpen(false)}>
              Close
            </Button>
          }
        >
          <p>This modal has no X button. Use the footer button to close.</p>
        </Modal>
      </>
    );
  },
};

export const NoBackdropClose: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Clicking backdrop won't close"
          closeOnBackdropClick={false}
          description="You must use the close button or press Escape"
        >
          <p>Try clicking the dark backdrop - it won't close the modal.</p>
        </Modal>
      </>
    );
  },
};

export const ScrollableContent: Story = {
  render: () => (
    <ModalDemo
      size="md"
      title="Scrollable Content"
      scrollable
    >
      <div>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} style={{ marginBottom: '1rem' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        ))}
      </div>
    </ModalDemo>
  ),
};

/* ==========================================================================
 * CSK SPECIFIC EXAMPLES
 * ========================================================================== */

export const AthleteRegistration: Story = {
  name: 'CSK: Athlete Registration',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Registrovat závodníka</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="lg"
          title="Registrace závodníka"
          description="Vyplňte údaje nového závodníka"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Zrušit
              </Button>
              <Button onClick={() => setOpen(false)}>
                Registrovat
              </Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input label="Jméno" placeholder="Jan" required />
              <Input label="Příjmení" placeholder="Novák" required />
            </div>
            <Input label="Datum narození" type="text" placeholder="DD.MM.RRRR" required />
            <Select
              label="Sekce"
              options={[
                { value: 'dv', label: 'Divoká voda (DV)' },
                { value: 'ry', label: 'Rychlostní kanoistika (RY)' },
                { value: 'vt', label: 'Vodní turistika (VT)' },
              ]}
              required
            />
            <Select
              label="Klub"
              options={[
                { value: '1', label: 'SK Slavia Praha' },
                { value: '2', label: 'USK Praha' },
                { value: '3', label: 'TJ Bohemians Praha' },
              ]}
              required
            />
          </div>
        </Modal>
      </>
    );
  },
};

export const ConfirmStartList: Story = {
  name: 'CSK: Confirm Start List',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Uzavřít startovní listinu</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="sm"
          title="Uzavřít startovní listinu?"
          description="Po uzavření již nebude možné přidávat další závodníky."
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Zpět
              </Button>
              <Button onClick={() => setOpen(false)}>
                Uzavřít
              </Button>
            </>
          }
        >
          <div style={{ padding: '0.5rem 0' }}>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
              <strong>Závod:</strong> Mistrovství ČR ve slalomu 2026
            </p>
            <p style={{ margin: '0.5rem 0 0', color: 'var(--color-text-secondary)' }}>
              <strong>Počet přihlášených:</strong> 156 závodníků
            </p>
          </div>
        </Modal>
      </>
    );
  },
};

export const EventDetails: Story = {
  name: 'CSK: Event Details',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Detail závodu</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="lg"
          title="Mistrovství ČR ve slalomu"
          description="14. - 16. června 2026, Troja"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Zavřít
              </Button>
              <Button onClick={() => setOpen(false)}>
                Přihlásit se
              </Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                Disciplíny
              </h4>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                K1 muži, K1 ženy, C1 muži, C1 ženy, C2 muži, C2 mix
              </p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                Pořadatel
              </h4>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                USK Praha, ve spolupráci s ČSK
              </p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                Uzávěrka přihlášek
              </h4>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                7. června 2026, 23:59
              </p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                Kontakt
              </h4>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                zavody@uskpraha.cz, +420 123 456 789
              </p>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

export const DeleteConfirmation: Story = {
  name: 'CSK: Delete Confirmation',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Smazat závodníka
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="sm"
          title="Smazat závodníka?"
          closeOnBackdropClick={false}
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Zrušit
              </Button>
              <Button variant="danger" onClick={() => setOpen(false)}>
                Smazat
              </Button>
            </>
          }
        >
          <p style={{ margin: 0 }}>
            Opravdu chcete smazat závodníka <strong>Jan Novák</strong>?
            Tato akce je nevratná a smaže všechny jeho výsledky a registrace.
          </p>
        </Modal>
      </>
    );
  },
};

/* ==========================================================================
 * ALL SIZES COMPARISON
 * ========================================================================== */

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <ModalDemo size="sm" title="Small (400px)" />
      <ModalDemo size="md" title="Medium (500px)" />
      <ModalDemo size="lg" title="Large (700px)" />
      <ModalDemo size="xl" title="XL (900px)" />
      <ModalDemo size="full" title="Full Screen" />
    </div>
  ),
};

/* ==========================================================================
 * STYLE VARIANTS (Phase 7.5)
 * ========================================================================== */

export const GradientVariant: Story = {
  name: 'Style: Gradient Header',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Gradient Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          styleVariant="gradient"
          title="Gradient Header Modal"
          description="Beautiful gradient header with branded colors"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <p>
            This modal features a gradient header using the primary brand colors.
            Perfect for important dialogs and featured content.
          </p>
        </Modal>
      </>
    );
  },
};

export const GlassVariant: Story = {
  name: 'Style: Glass Effect',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{
        minHeight: '300px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Button onClick={() => setOpen(true)}>Open Glass Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          styleVariant="glass"
          title="Glass Effect Modal"
          description="Frosted glass with backdrop blur"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <p>
            This modal uses a glassmorphism effect with backdrop blur.
            Works best over colorful or image backgrounds.
          </p>
        </Modal>
      </div>
    );
  },
};

export const DangerVariant: Story = {
  name: 'Style: Danger',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          styleVariant="danger"
          size="sm"
          title="Delete Permanently?"
          closeOnBackdropClick={false}
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setOpen(false)}>
                Delete Forever
              </Button>
            </>
          }
        >
          <p style={{ margin: 0 }}>
            This action cannot be undone. All data associated with this item
            will be permanently removed from the system.
          </p>
        </Modal>
      </>
    );
  },
};

export const AllStyleVariants: Story = {
  name: 'All Style Variants',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <ModalDemo title="Default Style" />
      <ModalDemo styleVariant="gradient" title="Gradient Header" />
      <ModalDemo styleVariant="danger" title="Danger Style" />
    </div>
  ),
};

/* ==========================================================================
 * ANIMATION SHOWCASE
 * ========================================================================== */

export const SlideInAnimation: Story = {
  name: 'Animation: Slide In',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal (Slide In)</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Slide-In Animation"
          description="Notice the smooth slide-up effect when opening"
        >
          <p>
            This modal slides in from the bottom with a subtle scale effect.
            The animation uses a custom cubic-bezier curve for a natural feel.
          </p>
          <p>
            Try opening and closing to see the smooth transition.
          </p>
        </Modal>
      </>
    );
  },
};

export const BackdropBlurDemo: Story = {
  name: 'Animation: Backdrop Blur',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{
        minHeight: '400px',
        padding: '2rem',
        background: `
          linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
        `,
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <p style={{ textAlign: 'center', maxWidth: '400px', color: 'var(--color-text-secondary)' }}>
          Notice how the backdrop blurs the background content when the modal opens,
          creating depth and focus.
        </p>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Backdrop Blur Effect"
          description="The background is blurred for better focus"
        >
          <p>
            The backdrop uses a blur filter that creates a frosted glass effect.
            This helps draw attention to the modal content while keeping
            context of what's behind.
          </p>
        </Modal>
      </div>
    );
  },
};

/* ==========================================================================
 * CSK FEATURED SHOWCASE
 * ========================================================================== */

export const FeaturedShowcase: Story = {
  name: 'Featured: CSK Modals Showcase',
  render: () => {
    const [openGradient, setOpenGradient] = useState(false);
    const [openGlass, setOpenGlass] = useState(false);
    const [openDanger, setOpenDanger] = useState(false);

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        padding: '2rem',
        background: 'var(--color-bg-secondary)',
        borderRadius: '12px'
      }}>
        <div>
          <h3 style={{ margin: '0 0 1rem', fontSize: '1.125rem', fontWeight: 600 }}>
            Registration Flow
          </h3>
          <Button onClick={() => setOpenGradient(true)}>
            Registrovat závodníka
          </Button>
          <Modal
            open={openGradient}
            onClose={() => setOpenGradient(false)}
            styleVariant="gradient"
            size="lg"
            title="Registrace nového závodníka"
            description="Vyplňte údaje pro registraci"
            footer={
              <>
                <Button variant="secondary" onClick={() => setOpenGradient(false)}>
                  Zrušit
                </Button>
                <Button onClick={() => setOpenGradient(false)}>
                  Registrovat
                </Button>
              </>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Input label="Jméno" placeholder="Jan" required />
                <Input label="Příjmení" placeholder="Novák" required />
              </div>
              <Input label="Datum narození" type="text" placeholder="DD.MM.RRRR" required />
              <Select
                label="Sekce"
                options={[
                  { value: 'dv', label: 'Divoká voda (DV)' },
                  { value: 'ry', label: 'Rychlostní kanoistika (RY)' },
                  { value: 'vt', label: 'Vodní turistika (VT)' },
                ]}
                required
              />
            </div>
          </Modal>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          padding: '2rem',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: 'white' }}>
            Event Details (Glass on branded bg)
          </h3>
          <Button variant="secondary" onClick={() => setOpenGlass(true)}>
            Zobrazit detail závodu
          </Button>
          <Modal
            open={openGlass}
            onClose={() => setOpenGlass(false)}
            styleVariant="glass"
            size="lg"
            title="Mistrovství ČR ve slalomu"
            description="14. - 16. června 2026, Troja"
            footer={
              <>
                <Button variant="secondary" onClick={() => setOpenGlass(false)}>
                  Zavřít
                </Button>
                <Button onClick={() => setOpenGlass(false)}>
                  Přihlásit se
                </Button>
              </>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                  Disciplíny
                </h4>
                <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                  K1 muži, K1 ženy, C1 muži, C1 ženy, C2 muži, C2 mix
                </p>
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                  Pořadatel
                </h4>
                <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                  USK Praha, ve spolupráci s ČSK
                </p>
              </div>
            </div>
          </Modal>
        </div>

        <div>
          <h3 style={{ margin: '0 0 1rem', fontSize: '1.125rem', fontWeight: 600 }}>
            Destructive Actions
          </h3>
          <Button variant="danger" onClick={() => setOpenDanger(true)}>
            Smazat závodníka
          </Button>
          <Modal
            open={openDanger}
            onClose={() => setOpenDanger(false)}
            styleVariant="danger"
            size="sm"
            title="Smazat závodníka?"
            closeOnBackdropClick={false}
            footer={
              <>
                <Button variant="secondary" onClick={() => setOpenDanger(false)}>
                  Zrušit
                </Button>
                <Button variant="danger" onClick={() => setOpenDanger(false)}>
                  Smazat
                </Button>
              </>
            }
          >
            <p style={{ margin: 0 }}>
              Opravdu chcete smazat závodníka <strong>Jan Novák</strong>?
              Tato akce je nevratná a smaže všechny jeho výsledky.
            </p>
          </Modal>
        </div>
      </div>
    );
  },
};
