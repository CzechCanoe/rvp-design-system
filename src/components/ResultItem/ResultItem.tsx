import React from 'react';
import { Icon } from '../Icon';
import './ResultItem.css';

// ============================================================================
// Types
// ============================================================================

export type ResultItemVariant = 'default' | 'compact' | 'detailed';

export interface ResultItemProps {
  /** Rank/position (1-3 gets medal styling, 4+ gets default styling) */
  rank?: number;
  /** Main title (e.g., event name, competition) */
  title: string;
  /** Subtitle (e.g., category, discipline) */
  subtitle?: string;
  /** Meta information (e.g., date, location) */
  meta?: React.ReactNode;
  /** Trailing content (e.g., time, points, badge) */
  trailing?: React.ReactNode;
  /** Style variant */
  variant?: ResultItemVariant;
  /** Link URL - renders as anchor element */
  href?: string;
  /** Click handler - renders as button element */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Section color variant for border accent */
  section?: 'dv' | 'ry' | 'vt' | 'generic';
}

// ============================================================================
// Helper Functions
// ============================================================================

function getRankClass(rank: number | undefined): string {
  if (!rank) return '';
  if (rank === 1) return 'csk-result-item--rank-1';
  if (rank === 2) return 'csk-result-item--rank-2';
  if (rank === 3) return 'csk-result-item--rank-3';
  return '';
}

function getRankDisplay(rank: number): React.ReactNode {
  if (rank === 1) return <span className="csk-result-item__medal csk-result-item__medal--gold">1</span>;
  if (rank === 2) return <span className="csk-result-item__medal csk-result-item__medal--silver">2</span>;
  if (rank === 3) return <span className="csk-result-item__medal csk-result-item__medal--bronze">3</span>;
  return <span className="csk-result-item__rank-number">{rank}.</span>;
}

// ============================================================================
// Component
// ============================================================================

/**
 * ResultItem displays a single result/achievement entry in a list format.
 * Used in athlete profiles, event results, and ranking pages.
 *
 * Features:
 * - Medal styling for top 3 positions (gold, silver, bronze)
 * - Border-left accent based on rank
 * - Hover effects with subtle translateX
 * - Variants: default, compact, detailed
 * - Section color variants (dv, ry, vt)
 *
 * @example
 * ```tsx
 * // Basic result with medal
 * <ResultItem
 *   rank={1}
 *   title="MS Praha 2024"
 *   subtitle="C1M"
 *   trailing="1:32.45"
 *   onClick={() => navigate('/result/123')}
 * />
 *
 * // Result with meta information
 * <ResultItem
 *   rank={5}
 *   title="Světový pohár Augsburg"
 *   subtitle="K1M"
 *   meta={<span>15. 6. 2024 | Augsburg, GER</span>}
 *   trailing={<Badge variant="success">Final</Badge>}
 *   variant="detailed"
 * />
 * ```
 */
export const ResultItem: React.FC<ResultItemProps> = ({
  rank,
  title,
  subtitle,
  meta,
  trailing,
  variant = 'default',
  href,
  onClick,
  className = '',
  section,
}) => {
  const isClickable = !!href || !!onClick;
  const rankClass = getRankClass(rank);

  const itemClasses = [
    'csk-result-item',
    `csk-result-item--${variant}`,
    rankClass,
    section && `csk-result-item--section-${section}`,
    isClickable && 'csk-result-item--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {/* Rank indicator */}
      {rank !== undefined && (
        <div className="csk-result-item__rank">
          {getRankDisplay(rank)}
        </div>
      )}

      {/* Main content */}
      <div className="csk-result-item__content">
        <div className="csk-result-item__header">
          <span className="csk-result-item__title">{title}</span>
          {subtitle && <span className="csk-result-item__subtitle">{subtitle}</span>}
        </div>
        {meta && variant === 'detailed' && (
          <div className="csk-result-item__meta">{meta}</div>
        )}
      </div>

      {/* Trailing content */}
      {trailing && (
        <div className="csk-result-item__trailing">{trailing}</div>
      )}

      {/* Arrow for clickable items */}
      {isClickable && (
        <div className="csk-result-item__arrow">
          <Icon name="chevron-right" size="sm" />
        </div>
      )}
    </>
  );

  // Render as link, button, or div based on props
  if (href) {
    return (
      <a href={href} className={itemClasses}>
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" className={itemClasses} onClick={onClick}>
        {content}
      </button>
    );
  }

  return <div className={itemClasses}>{content}</div>;
};

export default ResultItem;
