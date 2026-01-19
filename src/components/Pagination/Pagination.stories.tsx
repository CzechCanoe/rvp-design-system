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
    siblingCount: {
      control: { type: 'number', min: 0, max: 5 },
      description: 'Number of page buttons on each side of current page',
    },
    boundaryCount: {
      control: { type: 'number', min: 0, max: 3 },
      description: 'Number of page buttons at start and end',
    },
    showFirstLast: {
      control: 'boolean',
      description: 'Show first/last page buttons',
    },
    showPrevNext: {
      control: 'boolean',
      description: 'Show previous/next buttons',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all controls',
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

// Basic examples
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

// Sizes
export const Small: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    currentPage: 5,
    totalPages: 10,
    size: 'sm',
  },
};

export const Medium: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    currentPage: 5,
    totalPages: 10,
    size: 'md',
  },
};

export const Large: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    currentPage: 5,
    totalPages: 10,
    size: 'lg',
  },
};

// States
export const Disabled: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    currentPage: 5,
    totalPages: 10,
    disabled: true,
  },
};

export const FirstPage: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const LastPage: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    currentPage: 10,
    totalPages: 10,
  },
};

// Configurations
export const ManyPages: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    currentPage: 50,
    totalPages: 100,
  },
};

export const FewPages: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    currentPage: 2,
    totalPages: 5,
  },
};

export const SinglePage: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    currentPage: 1,
    totalPages: 1,
  },
};

export const WithoutFirstLast: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    currentPage: 5,
    totalPages: 10,
    showFirstLast: false,
  },
};

export const WithoutPrevNext: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    currentPage: 5,
    totalPages: 10,
    showPrevNext: false,
  },
};

export const MoreSiblings: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    currentPage: 25,
    totalPages: 50,
    siblingCount: 2,
    boundaryCount: 2,
  },
};

// All variants showcase
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

// All sizes showcase
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
// CSK-specific examples
// =============================================================================

/**
 * Pagination for race results listing.
 * Shows results for slalom races with many participants.
 */
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
};

/**
 * Pagination for athlete search results.
 * Uses simple variant for cleaner look.
 */
export const AthleteSearchPagination: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ fontSize: '14px', color: '#666' }}>
          Vyhledávání: "Novák" - nalezeno 47 závodníků
        </div>
        <Pagination
          variant="simple"
          currentPage={page}
          totalPages={5}
          onPageChange={setPage}
          ariaLabel="Navigace ve výsledcích vyhledávání"
        />
      </div>
    );
  },
};

/**
 * Pagination for event calendar.
 * Uses minimal variant for compact display.
 */
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
};

/**
 * Pagination for club members listing.
 * Large size for touch-friendly interface.
 */
export const ClubMembersPagination: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ fontSize: '14px', color: '#666' }}>
          Seznam členů klubu USK Praha - stránka {page} z 8
        </div>
        <Pagination
          size="lg"
          currentPage={page}
          totalPages={8}
          onPageChange={setPage}
          showFirstLast={false}
          ariaLabel="Navigace v seznamu členů"
        />
      </div>
    );
  },
};

/**
 * Pagination with custom labels in Czech.
 */
export const CustomLabels: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return (
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={setPage}
        labels={{
          first: 'První',
          previous: 'Předchozí',
          next: 'Další',
          last: 'Poslední',
          page: (p) => `Přejít na stránku ${p}`,
        }}
      />
    );
  },
};

/**
 * Pagination for VT class results.
 * Different sections displayed with tabs + pagination.
 */
export const VTResultsPagination: Story = {
  render: () => {
    const [section, setSection] = useState<'M' | 'A' | 'B' | 'C'>('A');
    const [page, setPage] = useState(1);
    const sectionPages = { M: 2, A: 5, B: 8, C: 3 };

    const sectionColors = {
      M: '#8b5cf6',
      A: '#dc2626',
      B: '#f97316',
      C: '#16a34a',
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['M', 'A', 'B', 'C'] as const).map((s) => (
            <button
              key={s}
              onClick={() => {
                setSection(s);
                setPage(1);
              }}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                background: section === s ? sectionColors[s] : '#f3f4f6',
                color: section === s ? 'white' : '#374151',
                fontWeight: section === s ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              Třída {s}
            </button>
          ))}
        </div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          VT výsledky - třída {section}
        </div>
        <Pagination
          variant="simple"
          size="sm"
          currentPage={page}
          totalPages={sectionPages[section]}
          onPageChange={setPage}
          ariaLabel={`Navigace ve výsledcích třídy ${section}`}
        />
      </div>
    );
  },
};
