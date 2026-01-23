import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './Timeline.css';

// ============================================================================
// Types
// ============================================================================

export type TimelineVariant = 'default' | 'compact' | 'card';
export type TimelineSize = 'sm' | 'md' | 'lg';
export type TimelineColor = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type TimelineItemStatus = 'completed' | 'current' | 'pending' | 'error';

export interface TimelineItem {
  /** Unique identifier for the item */
  id: string | number;
  /** Title of the timeline item */
  title: string;
  /** Optional description or content */
  description?: ReactNode;
  /** Timestamp or date string */
  timestamp?: string;
  /** Status of the item */
  status?: TimelineItemStatus;
  /** Color override for the item */
  color?: TimelineColor;
  /** Custom icon for the item */
  icon?: ReactNode;
  /** Optional metadata (e.g., author, location) */
  meta?: ReactNode;
  /** Optional actions (e.g., buttons, links) */
  actions?: ReactNode;
}

export interface TimelineProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Timeline items to display */
  items: TimelineItem[];
  /** Visual variant */
  variant?: TimelineVariant;
  /** Size of the timeline */
  size?: TimelineSize;
  /** Default color for items without explicit color */
  color?: TimelineColor;
  /** Show connector lines between items */
  showConnector?: boolean;
  /** Reverse the order (newest first vs oldest first) */
  reverse?: boolean;
  /** Alternate items left/right (only for default variant on larger screens) */
  alternate?: boolean;
  /** Accessible label */
  ariaLabel?: string;
  /** Callback when an item is clicked */
  onItemClick?: (item: TimelineItem, index: number) => void;
}

// ============================================================================
// Helper Components
// ============================================================================

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PendingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CurrentIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="5" />
  </svg>
);

// ============================================================================
// Timeline Item Component
// ============================================================================

interface TimelineItemComponentProps {
  item: TimelineItem;
  index: number;
  variant: TimelineVariant;
  size: TimelineSize;
  defaultColor: TimelineColor;
  showConnector: boolean;
  isLast: boolean;
  alternate: boolean;
  onClick?: (item: TimelineItem, index: number) => void;
}

const TimelineItemComponent = ({
  item,
  index,
  // variant and size are passed for potential future use in item rendering
  variant: _variant,
  size: _size,
  defaultColor,
  showConnector,
  isLast,
  alternate,
  onClick,
}: TimelineItemComponentProps) => {
  void _variant;
  void _size;
  const status = item.status || 'completed';
  const color = item.color || (status === 'error' ? 'error' : status === 'current' ? 'primary' : defaultColor);
  const isClickable = !!onClick;
  const isAlternate = alternate && index % 2 === 1;

  const handleClick = () => {
    if (onClick) {
      onClick(item, index);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isClickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick?.(item, index);
    }
  };

  const getStatusIcon = () => {
    if (item.icon) return item.icon;

    switch (status) {
      case 'completed':
        return <CheckIcon />;
      case 'current':
        return <CurrentIcon />;
      case 'error':
        return <ErrorIcon />;
      case 'pending':
        return <PendingIcon />;
      default:
        return <CurrentIcon />;
    }
  };

  const itemClasses = [
    'csk-timeline__item',
    `csk-timeline__item--${status}`,
    `csk-timeline__item--${color}`,
    isAlternate && 'csk-timeline__item--alternate',
    isClickable && 'csk-timeline__item--clickable',
    isLast && 'csk-timeline__item--last',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={itemClasses}
      role="listitem"
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? handleClick : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      aria-label={isClickable ? `${item.title}${item.timestamp ? `, ${item.timestamp}` : ''}` : undefined}
    >
      {/* Marker */}
      <div className="csk-timeline__marker">
        <div className="csk-timeline__dot">
          <span className="csk-timeline__icon">{getStatusIcon()}</span>
        </div>
        {showConnector && !isLast && <div className="csk-timeline__connector" aria-hidden="true" />}
      </div>

      {/* Content */}
      <div className="csk-timeline__content">
        {item.timestamp && <time className="csk-timeline__timestamp">{item.timestamp}</time>}
        <h3 className="csk-timeline__title">{item.title}</h3>
        {item.description && <div className="csk-timeline__description">{item.description}</div>}
        {item.meta && <div className="csk-timeline__meta">{item.meta}</div>}
        {item.actions && <div className="csk-timeline__actions">{item.actions}</div>}
      </div>
    </div>
  );
};

// ============================================================================
// Main Timeline Component
// ============================================================================

/**
 * Timeline component for displaying chronological events or workflow steps.
 *
 * Use cases:
 * - Registration history
 * - Event schedule
 * - Application status tracking
 * - Activity feed
 *
 * @example
 * <Timeline
 *   items={[
 *     { id: 1, title: 'Registration submitted', timestamp: '2024-01-15', status: 'completed' },
 *     { id: 2, title: 'Payment received', timestamp: '2024-01-16', status: 'completed' },
 *     { id: 3, title: 'Verification pending', timestamp: '2024-01-17', status: 'current' },
 *     { id: 4, title: 'Confirmation', status: 'pending' },
 *   ]}
 * />
 */
export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      items,
      variant = 'default',
      size = 'md',
      color = 'default',
      showConnector = true,
      reverse = false,
      alternate = false,
      ariaLabel = 'Časová osa',
      onItemClick,
      className,
      ...props
    },
    ref
  ) => {
    const displayItems = reverse ? [...items].reverse() : items;

    const classes = [
      'csk-timeline',
      `csk-timeline--${variant}`,
      `csk-timeline--${size}`,
      alternate && 'csk-timeline--alternate',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} role="list" aria-label={ariaLabel} {...props}>
        {displayItems.map((item, index) => (
          <TimelineItemComponent
            key={item.id}
            item={item}
            index={index}
            variant={variant}
            size={size}
            defaultColor={color}
            showConnector={showConnector}
            isLast={index === displayItems.length - 1}
            alternate={alternate}
            onClick={onItemClick}
          />
        ))}
      </div>
    );
  }
);

Timeline.displayName = 'Timeline';
