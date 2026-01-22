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
- Style variants (default, gradient, glass, danger)
- Focus trap for accessibility
- Keyboard navigation (Escape to close)
- Backdrop click to close (optional)
- WCAG 2.1 AA compliant
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

// =============================================================================
// BASIC EXAMPLES
// =============================================================================

export const Default: Story = {
  render: () => <ModalDemo />,
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
          <p>This action will permanently delete the selected item from the system.</p>
        </Modal>
      </>
    );
  },
};

export const ScrollableContent: Story = {
  render: () => (
    <ModalDemo size="md" title="Scrollable Content" scrollable>
      <div>
        {Array.from({ length: 15 }).map((_, i) => (
          <p key={i} style={{ marginBottom: '1rem' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    </ModalDemo>
  ),
};

// =============================================================================
// ALL SIZES COMPARISON
// =============================================================================

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

// =============================================================================
// STYLE VARIANTS
// =============================================================================

export const AllStyleVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <ModalDemo title="Default Style" />
      <ModalDemo styleVariant="gradient" title="Gradient Header" />
      <ModalDemo styleVariant="danger" title="Danger Style" />
    </div>
  ),
};

export const DangerVariant: Story = {
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

// =============================================================================
// CSK EXAMPLES
// =============================================================================

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
          styleVariant="gradient"
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
          styleVariant="danger"
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
