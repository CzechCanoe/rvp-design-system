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
