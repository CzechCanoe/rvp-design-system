import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'simple', 'minimal'],
      description: 'Visual variant of the pagination',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of pagination controls',
    },
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Current page number (1-indexed)',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// Interactive wrapper for controlled pagination
const PaginationDemo = (args: React.ComponentProps<typeof Pagination>) => {
  const [page, setPage] = useState(args.currentPage);
  return (
    <Pagination
      {...args}
      currentPage={page}
      onPageChange={setPage}
    />
  );
};

// =============================================================================
// BASIC EXAMPLES
// =============================================================================

export const Default: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    currentPage: 1,
    totalPages: 10,
    variant: 'default',
    size: 'md',
  },
};

export const Simple: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    currentPage: 5,
    totalPages: 10,
    variant: 'simple',
  },
};

export const Minimal: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    currentPage: 3,
    totalPages: 10,
    variant: 'minimal',
  },
};

export const Disabled: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    currentPage: 5,
    totalPages: 10,
    disabled: true,
  },
};

// =============================================================================
// ALL VARIANTS & SIZES SHOWCASE
// =============================================================================

export const AllVariants: Story = {
  render: () => {
    const [pages, setPages] = useState({ default: 5, simple: 5, minimal: 5 });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Default:</div>
          <Pagination
            variant="default"
            currentPage={pages.default}
            totalPages={10}
            onPageChange={(p) => setPages((prev) => ({ ...prev, default: p }))}
          />
        </div>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Simple:</div>
          <Pagination
            variant="simple"
            currentPage={pages.simple}
            totalPages={10}
            onPageChange={(p) => setPages((prev) => ({ ...prev, simple: p }))}
          />
        </div>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Minimal:</div>
          <Pagination
            variant="minimal"
            currentPage={pages.minimal}
            totalPages={10}
            onPageChange={(p) => setPages((prev) => ({ ...prev, minimal: p }))}
          />
        </div>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [pages, setPages] = useState({ sm: 5, md: 5, lg: 5 });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Small:</div>
          <Pagination
            size="sm"
            currentPage={pages.sm}
            totalPages={10}
            onPageChange={(p) => setPages((prev) => ({ ...prev, sm: p }))}
          />
        </div>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Medium:</div>
          <Pagination
            size="md"
            currentPage={pages.md}
            totalPages={10}
            onPageChange={(p) => setPages((prev) => ({ ...prev, md: p }))}
          />
        </div>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Large:</div>
          <Pagination
            size="lg"
            currentPage={pages.lg}
            totalPages={10}
            onPageChange={(p) => setPages((prev) => ({ ...prev, lg: p }))}
          />
        </div>
      </div>
    );
  },
};

// =============================================================================
// CSK-SPECIFIC EXAMPLES
// =============================================================================

export const RaceResultsPagination: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const totalAthletes = 156;
    const perPage = 20;
    const totalPages = Math.ceil(totalAthletes / perPage);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ fontSize: '14px', color: '#666' }}>
          Zobrazeno {(page - 1) * perPage + 1}-{Math.min(page * perPage, totalAthletes)} z {totalAthletes} závodníků
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          ariaLabel="Navigace ve výsledcích závodu"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination for race results listing with item counter.',
      },
    },
  },
};

export const EventCalendarPagination: Story = {
  render: () => {
    const [page, setPage] = useState(3);
    const months = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ fontSize: '18px', fontWeight: 600 }}>
          {months[page - 1]} 2026
        </div>
        <Pagination
          variant="minimal"
          currentPage={page}
          totalPages={12}
          onPageChange={setPage}
          ariaLabel="Navigace v kalendáři"
          labels={{
            page: (p) => `Měsíc ${months[p - 1]}`,
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal pagination for month navigation in event calendar.',
      },
    },
  },
};
