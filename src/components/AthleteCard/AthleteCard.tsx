import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './AthleteCard.css';

export type AthleteCardVariant = 'default' | 'compact' | 'featured';
export type AthleteCardSize = 'sm' | 'md' | 'lg';
export type AthleteSection = 'dv' | 'ry' | 'vt';
export type AthleteVtClass = 'm' | 'a' | 'b' | 'c';

export interface AthleteCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Athlete's full name */
  name: string;
  /** Profile image URL */
  imageUrl?: string;
  /** Club name */
  club?: string;
  /** Club ID for display */
  clubId?: string;
  /** Birth year (displayed as age category context) */
  birthYear?: number;
  /** CSK discipline section */
  section?: AthleteSection;
  /** VT performance class */
  vtClass?: AthleteVtClass;
  /** Current VT class points or ranking */
  vtPoints?: number;
  /** National ranking position */
  ranking?: number;
  /** Country code (ISO 3166-1 alpha-3) */
  country?: string;
  /** License/registration number */
  licenseNumber?: string;
  /** Card variant */
  variant?: AthleteCardVariant;
  /** Card size */
  size?: AthleteCardSize;
  /** Makes the card clickable */
  clickable?: boolean;
  /** Link URL (makes card an anchor) */
  href?: string;
  /** Link target */
  target?: string;
  /** Additional stats to display */
  stats?: Array<{ label: string; value: string | number }>;
  /** Custom badge content */
  badge?: ReactNode;
  /** Footer actions */
  actions?: ReactNode;
}

/**
 * Get initials from a name string.
 */
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return '';
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

/**
 * Get section display name in Czech.
 */
function getSectionName(section: AthleteSection): string {
  const names: Record<AthleteSection, string> = {
    dv: 'Divoká voda',
    ry: 'Rychlostní',
    vt: 'Výkonnostní třídy',
  };
  return names[section];
}

/**
 * Get section abbreviation.
 */
function getSectionAbbr(section: AthleteSection): string {
  return section.toUpperCase();
}

/**
 * Get VT class display name.
 */
function getVtClassName(vtClass: AthleteVtClass): string {
  const names: Record<AthleteVtClass, string> = {
    m: 'Třída M',
    a: 'Třída A',
    b: 'Třída B',
    c: 'Třída C',
  };
  return names[vtClass];
}

/**
 * Default user icon SVG.
 */
function DefaultUserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/**
 * AthleteCard component for displaying athlete profiles.
 *
 * Features:
 * - Profile image with fallback to initials
 * - CSK section and VT class badges
 * - Club and ranking information
 * - Compact, default, and featured variants
 * - Clickable with link support
 */
export const AthleteCard = forwardRef<HTMLDivElement, AthleteCardProps>(
  (
    {
      name,
      imageUrl,
      club,
      clubId,
      birthYear,
      section,
      vtClass,
      vtPoints,
      ranking,
      country = 'CZE',
      licenseNumber,
      variant = 'default',
      size = 'md',
      clickable = false,
      href,
      target,
      stats,
      badge,
      actions,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const isLink = Boolean(href);
    const isClickable = clickable || isLink || Boolean(onClick);

    const classes = [
      'csk-athlete-card',
      `csk-athlete-card--${variant}`,
      `csk-athlete-card--${size}`,
      section && `csk-athlete-card--section-${section}`,
      isClickable && 'csk-athlete-card--clickable',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const interactiveProps =
      isClickable && !isLink
        ? {
            role: 'button' as const,
            tabIndex: 0,
            onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
              }
            },
          }
        : {};

    const content = (
      <>
        {/* Avatar section */}
        <div className="csk-athlete-card__avatar">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="csk-athlete-card__image" />
          ) : (
            <div className="csk-athlete-card__initials">
              {getInitials(name) || <DefaultUserIcon />}
            </div>
          )}
          {ranking && ranking <= 10 && (
            <span className="csk-athlete-card__ranking-badge">#{ranking}</span>
          )}
        </div>

        {/* Info section */}
        <div className="csk-athlete-card__info">
          <div className="csk-athlete-card__header">
            <h3 className="csk-athlete-card__name">{name}</h3>
            {country && <span className="csk-athlete-card__country">{country}</span>}
          </div>

          {/* Badges row */}
          {(section || vtClass || badge) && (
            <div className="csk-athlete-card__badges">
              {section && (
                <span
                  className={`csk-athlete-card__badge csk-athlete-card__badge--section-${section}`}
                  title={getSectionName(section)}
                >
                  {getSectionAbbr(section)}
                </span>
              )}
              {vtClass && (
                <span
                  className={`csk-athlete-card__badge csk-athlete-card__badge--vt-${vtClass}`}
                  title={getVtClassName(vtClass)}
                >
                  {vtClass.toUpperCase()}
                  {vtPoints !== undefined && (
                    <span className="csk-athlete-card__badge-points">{vtPoints}</span>
                  )}
                </span>
              )}
              {badge}
            </div>
          )}

          {/* Club info */}
          {(club || clubId) && (
            <div className="csk-athlete-card__club">
              {club && <span className="csk-athlete-card__club-name">{club}</span>}
              {clubId && <span className="csk-athlete-card__club-id">{clubId}</span>}
            </div>
          )}

          {/* Meta info (birth year, license) */}
          {(birthYear || licenseNumber) && (
            <div className="csk-athlete-card__meta">
              {birthYear && (
                <span className="csk-athlete-card__birth-year">*{birthYear}</span>
              )}
              {licenseNumber && (
                <span className="csk-athlete-card__license">{licenseNumber}</span>
              )}
            </div>
          )}

          {/* Ranking (for featured variant) */}
          {ranking && variant === 'featured' && (
            <div className="csk-athlete-card__ranking">
              <span className="csk-athlete-card__ranking-label">Žebříček</span>
              <span className="csk-athlete-card__ranking-value">#{ranking}</span>
            </div>
          )}

          {/* Custom stats */}
          {stats && stats.length > 0 && (
            <div className="csk-athlete-card__stats">
              {stats.map((stat, index) => (
                <div key={index} className="csk-athlete-card__stat">
                  <span className="csk-athlete-card__stat-value">{stat.value}</span>
                  <span className="csk-athlete-card__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        {actions && <div className="csk-athlete-card__actions">{actions}</div>}
      </>
    );

    if (isLink) {
      return (
        <a
          className={classes}
          href={href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {content}
        </a>
      );
    }

    return (
      <div
        ref={ref}
        className={classes}
        onClick={onClick}
        {...interactiveProps}
        {...props}
      >
        {content}
      </div>
    );
  }
);

AthleteCard.displayName = 'AthleteCard';
