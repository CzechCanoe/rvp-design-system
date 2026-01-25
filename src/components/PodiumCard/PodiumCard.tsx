import React from 'react';
import { Icon } from '../Icon';
import './PodiumCard.css';

// ============================================================================
// Types
// ============================================================================

export type PodiumPosition = 1 | 2 | 3;

export interface PodiumCardProps {
  /** Position on podium (1 = gold, 2 = silver, 3 = bronze) */
  position: PodiumPosition;
  /** Athlete/person name */
  name: string;
  /** Club or team name */
  club?: string;
  /** Optional image URL for avatar */
  imageUrl?: string;
  /** Primary value to display (e.g., time, points) */
  primaryValue?: string;
  /** Optional label for primary value (e.g., "bodů") */
  primaryLabel?: string;
  /** Secondary value to display (e.g., time difference) */
  secondaryValue?: string;
  /** Click handler */
  onClick?: () => void;
  /** Show arrow indicator for clickable cards */
  showArrow?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Style variant */
  variant?: 'default' | 'minimal';
  /** Additional CSS class */
  className?: string;
}

// ============================================================================
// Helper Functions
// ============================================================================

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getPositionClass(position: PodiumPosition): string {
  switch (position) {
    case 1:
      return 'gold';
    case 2:
      return 'silver';
    case 3:
      return 'bronze';
  }
}

// ============================================================================
// Component
// ============================================================================

/**
 * PodiumCard displays an athlete/person on the podium (1st, 2nd, or 3rd place).
 * Used in results pages and rankings to highlight top performers.
 *
 * Features:
 * - Distinctive styling for gold, silver, bronze positions
 * - Avatar with image or initials fallback
 * - Primary value (time, points) with optional label
 * - Secondary value (time difference)
 * - Clickable with arrow indicator
 * - Size variants (sm, md, lg)
 *
 * @example
 * ```tsx
 * // Results page - with time
 * <PodiumCard
 *   position={1}
 *   name="Jiří Prskavec"
 *   club="USK Praha"
 *   primaryValue="1:32.34"
 *   onClick={() => navigate(`/athlete/${id}`)}
 *   showArrow
 * />
 *
 * // Rankings page - with points
 * <PodiumCard
 *   position={2}
 *   name="Vít Přindiš"
 *   club="USK Praha"
 *   primaryValue="1,245"
 *   primaryLabel="bodů"
 * />
 * ```
 */
export const PodiumCard: React.FC<PodiumCardProps> = ({
  position,
  name,
  club,
  imageUrl,
  primaryValue,
  primaryLabel,
  secondaryValue,
  onClick,
  showArrow = false,
  size = 'md',
  variant = 'default',
  className = '',
}) => {
  const positionClass = getPositionClass(position);
  const isClickable = !!onClick;

  const cardClasses = [
    'podium-card',
    `podium-card--${positionClass}`,
    `podium-card--${size}`,
    `podium-card--${variant}`,
    isClickable && 'podium-card--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const CardElement = isClickable ? 'button' : 'div';

  return (
    <CardElement
      type={isClickable ? 'button' : undefined}
      className={cardClasses}
      onClick={onClick}
    >
      {/* Rank indicator */}
      <div className="podium-card__rank">{position}</div>

      {/* Avatar */}
      <div className="podium-card__avatar">
        {imageUrl ? (
          <img src={imageUrl} alt={name} />
        ) : (
          <span className="podium-card__avatar-placeholder">
            {getInitials(name)}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="podium-card__info">
        <div className="podium-card__name">{name}</div>
        {club && <div className="podium-card__club">{club}</div>}
      </div>

      {/* Values */}
      {(primaryValue || secondaryValue) && (
        <div className="podium-card__values">
          {primaryValue && (
            <div className="podium-card__primary">
              <span className="podium-card__primary-value">{primaryValue}</span>
              {primaryLabel && (
                <span className="podium-card__primary-label">{primaryLabel}</span>
              )}
            </div>
          )}
          {secondaryValue && (
            <div className="podium-card__secondary">{secondaryValue}</div>
          )}
        </div>
      )}

      {/* Arrow for clickable cards */}
      {showArrow && isClickable && (
        <span className="podium-card__arrow">
          <Icon name="chevron-right" size="sm" />
        </span>
      )}
    </CardElement>
  );
};

export default PodiumCard;
