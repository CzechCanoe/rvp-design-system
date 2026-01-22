import type { Meta, StoryObj } from '@storybook/react';
import { Dropzone, type DropzoneFile } from './Dropzone';
import { useState } from 'react';

const meta = {
  title: 'Components/Dropzone',
  component: Dropzone,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Dropzone component for file uploads with drag & drop support. Supports file type validation, size limits, multiple files, and progress indicators.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    state: { control: 'select', options: ['default', 'error', 'success'] },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Dropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// BASIC STORIES
// =============================================================================

export const Default: Story = {
  args: {
    onFilesChange: (files) => console.log('Files:', files),
  },
};

export const MultipleFiles: Story = {
  args: {
    multiple: true,
    label: 'Nahrát více souborů',
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ErrorState: Story = {
  args: {
    state: 'error',
    errorMessage: 'Soubor je příliš velký',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '8px' }}>Small</h4>
        <Dropzone size="sm" />
      </div>
      <div>
        <h4 style={{ marginBottom: '8px' }}>Medium (default)</h4>
        <Dropzone size="md" />
      </div>
      <div>
        <h4 style={{ marginBottom: '8px' }}>Large</h4>
        <Dropzone size="lg" />
      </div>
    </div>
  ),
};

// =============================================================================
// WITH PROGRESS
// =============================================================================

export const WithProgress: Story = {
  render: () => {
    const [files, setFiles] = useState<DropzoneFile[]>([]);

    const handleFilesChange = (newFiles: DropzoneFile[]) => {
      setFiles(newFiles);
      newFiles.forEach((file, index) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 15;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
          }
          setFiles((prev) =>
            prev.map((f) => (f.id === file.id ? { ...f, progress: Math.round(progress) } : f))
          );
        }, 200 + index * 100);
      });
    };

    return (
      <Dropzone
        files={files}
        onFilesChange={handleFilesChange}
        multiple
        accept="image/*"
        maxSize={10 * 1024 * 1024}
      />
    );
  },
};

// =============================================================================
// CSK-SPECIFIC STORIES
// =============================================================================

export const AthletePhoto: Story = {
  render: () => {
    const [files, setFiles] = useState<DropzoneFile[]>([]);
    const [error, setError] = useState<string | undefined>();

    return (
      <div style={{ maxWidth: '400px' }}>
        <h4 style={{ marginBottom: '16px' }}>Fotografie závodníka</h4>
        <Dropzone
          files={files}
          onFilesChange={(newFiles) => {
            setFiles(newFiles);
            setError(undefined);
          }}
          onError={(err) => setError(err)}
          accept="image/jpeg,image/png"
          maxSize={2 * 1024 * 1024}
          multiple={false}
          errorMessage={error}
          label="Nahrajte fotografii"
          hint="JPG nebo PNG, max 2 MB"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Nahrání fotografie závodníka v registračním systému.' },
    },
  },
};

export const RaceDocuments: Story = {
  render: () => {
    const [files, setFiles] = useState<DropzoneFile[]>([]);

    return (
      <div style={{ maxWidth: '600px' }}>
        <h4 style={{ marginBottom: '16px' }}>Dokumenty závodu</h4>
        <Dropzone
          files={files}
          onFilesChange={setFiles}
          accept=".pdf,.xlsx,.csv"
          maxSize={10 * 1024 * 1024}
          maxFiles={10}
          multiple
          size="lg"
          label="Nahrajte dokumenty závodu"
          hint="PDF, Excel nebo CSV, max 10 souborů"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Nahrání dokumentů závodu (výsledky, startovky).' },
    },
  },
};
