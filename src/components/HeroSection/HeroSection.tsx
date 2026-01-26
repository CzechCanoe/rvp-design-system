import { type ReactNode, type HTMLAttributes } from 'react';
import { Avatar, type AvatarSize } from '../Avatar';
import { Icon, type IconName } from '../Icon';
import { Button } from '../Button';
import './HeroSection.css';

export type HeroSectionVariant = 'full' | 'compact' | 'minimal';
export type HeroSectionSection = 'dv' | 'ry' | 'vt' | 'generic';

export interface HeroSectionMetaItem {
  /** Unique key for the item */
  key: string;
  /** Label text */
  label: string;
  /** Value content */
  value: ReactNode;
  /** Optional icon name */
  icon?: IconName;
}

export interface HeroSectionProps extends HTMLAttributes<HTMLElement> {
  /** Hero size variant */
  variant?: HeroSectionVariant;
  /** CSK section for color theming */
  section?: HeroSectionSection;
  /** Main title */
  title: string;
  /** Optional subtitle or tagline */
  subtitle?: ReactNode;
  /** Optional avatar/logo image source */
  avatarSrc?: string;
  /** Avatar alt text */
  avatarAlt?: string;
  /** Initials for avatar fallback */
  avatarInitials?: string;
  /** Avatar shape */
  avatarShape?: 'circle' | 'rounded';
  /** Optional badges to display */
  badges?: ReactNode;
  /** Metadata items (icon + label + value) */
  metadata?: HeroSectionMetaItem[];
  /** Optional action buttons/elements */
  actions?: ReactNode;
  /** Background image URL */
  backgroundImage?: string;
  /** Enable mesh gradient background */
  meshBackground?: boolean;
  /** Enable decorative pattern overlay */
  patternOverlay?: boolean;
  /** Content to render below the hero (e.g., floating stats) */
  floatingContent?: ReactNode;
  /** Optional breadcrumbs (hidden in embed mode) */
  breadcrumbs?: ReactNode;
  /** Show wave divider at the bottom */
  wave?: boolean;
  /** Color for the wave (defaults to background color) */
  waveColor?: string;
}

/**
 * HeroSection component for profile and detail page headers.
 *
 * Provides consistent hero styling across athlete, club, and event pages.
 * Automatically adapts colors based on section (DV/RY/VT).
 *
 * Variants:
 * - full: Large hero (70vh) with avatar, title, metadata, and actions
 * - compact: Medium hero (45vh) for secondary profile pages
 * - minimal: Small hero (20vh) for utility/embedded pages
 */
export function HeroSection({
  variant = 'compact',
  section = 'generic',
  title,
  subtitle,
  avatarSrc,
  avatarAlt,
  avatarInitials,
  avatarShape = 'circle',
  badges,
  metadata,
  actions,
  backgroundImage,
  meshBackground = true,
  patternOverlay = true,
  floatingContent,
  breadcrumbs,
  wave = false,
  waveColor,
  className,
  ...props
}: HeroSectionProps) {
  const classes = [
    'csk-hero-section',
    `csk-hero-section--${variant}`,
    `csk-hero-section--${section}`,
    meshBackground && 'csk-hero-section--mesh',
    patternOverlay && 'csk-hero-section--pattern',
    backgroundImage && 'csk-hero-section--has-image',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Map section to Avatar color
  const avatarColor = section === 'generic' ? 'primary' : section;

  // Map variant to avatar size
  const avatarSizeMap: Record<HeroSectionVariant, AvatarSize> = {
    full: '2xl',
    compact: 'xl',
    minimal: 'lg',
  };

  const hasAvatar = avatarSrc || avatarInitials;

  return (
    <section className={classes} {...props}>
      {/* Background layers */}
      <div className="csk-hero-section__bg">
        {backgroundImage && (
          <div
            className="csk-hero-section__bg-image"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        <div className="csk-hero-section__bg-gradient" />
        {patternOverlay && <div className="csk-hero-section__bg-pattern" />}
      </div>

      {/* Content container */}
      <div className="csk-hero-section__container">
        {/* Breadcrumbs (hidden in embed) */}
        {breadcrumbs && (
          <nav className="csk-hero-section__breadcrumbs">{breadcrumbs}</nav>
        )}

        {/* Main content grid */}
        <div className="csk-hero-section__content">
          {/* Avatar/Logo */}
          {hasAvatar && (
            <div className="csk-hero-section__avatar">
              <Avatar
                src={avatarSrc}
                alt={avatarAlt || title}
                initials={avatarInitials}
                size={avatarSizeMap[variant]}
                variant={avatarShape === 'rounded' ? 'rounded' : 'circular'}
                color={avatarColor}
              />
            </div>
          )}

          {/* Text content */}
          <div className="csk-hero-section__text">
            {/* Badges above title */}
            {badges && <div className="csk-hero-section__badges">{badges}</div>}

            {/* Title */}
            <h1 className="csk-hero-section__title">{title}</h1>

            {/* Subtitle */}
            {subtitle && (
              <div className="csk-hero-section__subtitle">{subtitle}</div>
            )}

            {/* Metadata row */}
            {metadata && metadata.length > 0 && (
              <dl className="csk-hero-section__metadata">
                {metadata.map((item) => (
                  <div key={item.key} className="csk-hero-section__meta-item">
                    {item.icon && (
                      <Icon
                        name={item.icon}
                        size="sm"
                        className="csk-hero-section__meta-icon"
                      />
                    )}
                    <dt className="csk-hero-section__meta-label">
                      {item.label}
                    </dt>
                    <dd className="csk-hero-section__meta-value">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {/* Actions */}
          {actions && (
            <div className="csk-hero-section__actions">{actions}</div>
          )}
        </div>
      </div>

      {/* Wave divider */}
      {wave && (
        <div className="csk-hero-section__wave">
          <svg
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            className="csk-hero-section__wave-svg"
            style={waveColor ? { color: waveColor } : undefined}
          >
            <path
              fill="currentColor"
              d="M0,0 C480,60 960,60 1440,0 L1440,60 L0,60 Z"
            />
          </svg>
        </div>
      )}

      {/* Floating content (e.g., stats bar) */}
      {floatingContent && (
        <div className="csk-hero-section__floating">{floatingContent}</div>
      )}
    </section>
  );
}

HeroSection.displayName = 'HeroSection';

/* ==========================================================================
   SUBCOMPONENTS FOR COMMON PATTERNS
   ========================================================================== */

export interface HeroActionButtonProps {
  /** Button label */
  label: string;
  /** Icon name */
  icon?: IconName;
  /** Click handler */
  onClick?: () => void;
  /** Href for link buttons */
  href?: string;
}

/**
 * Glass-morphism action button for hero sections.
 * Provides consistent styling for Share, Edit, etc. buttons.
 */
export function HeroActionButton({
  label,
  icon,
  onClick,
}: HeroActionButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="csk-hero-action-button"
    >
      {icon && <Icon name={icon} size="sm" />}
      {label}
    </Button>
  );
}

HeroActionButton.displayName = 'HeroActionButton';
