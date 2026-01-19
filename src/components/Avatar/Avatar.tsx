import { forwardRef, useState, type ImgHTMLAttributes, type ReactNode } from 'react';
import './Avatar.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarVariant = 'circular' | 'rounded' | 'square';
export type AvatarColor =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'dv'
  | 'ry'
  | 'vt';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  /** Image source URL */
  src?: string;
  /** Alt text for the image (required for accessibility) */
  alt?: string;
  /** Initials to display when no image is provided or image fails to load */
  initials?: string;
  /** Full name to generate initials from (alternative to initials prop) */
  name?: string;
  /** Size of the avatar */
  size?: AvatarSize;
  /** Shape variant */
  variant?: AvatarVariant;
  /** Background color for initials/fallback */
  color?: AvatarColor;
  /** Custom icon to display as fallback */
  icon?: ReactNode;
  /** Status indicator (online, offline, busy, away) */
  status?: 'online' | 'offline' | 'busy' | 'away';
  /** Additional CSS class */
  className?: string;
}

/**
 * Extract initials from a name string.
 * Takes first letter of first and last word.
 */
function getInitialsFromName(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return '';
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

/**
 * Default user icon SVG for fallback when no image or initials are available.
 */
function DefaultUserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
 * Avatar component for displaying user profile images, initials, or icons.
 *
 * Features:
 * - Image with fallback to initials or icon
 * - Multiple sizes and shape variants
 * - Status indicator support
 * - CSK section colors (DV, RY, VT)
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      initials,
      name,
      size = 'md',
      variant = 'circular',
      color = 'default',
      icon,
      status,
      className,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    // Determine what to display
    const hasImage = src && !imageError;
    const displayInitials = initials || (name ? getInitialsFromName(name) : '');
    const hasInitials = !hasImage && displayInitials.length > 0;
    const hasFallbackIcon = !hasImage && !hasInitials;

    const classes = [
      'csk-avatar',
      `csk-avatar--${size}`,
      `csk-avatar--${variant}`,
      !hasImage && `csk-avatar--${color}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleImageError = () => {
      setImageError(true);
    };

    return (
      <div ref={ref} className={classes}>
        {hasImage && (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="csk-avatar__image"
            onError={handleImageError}
            {...props}
          />
        )}

        {hasInitials && (
          <span className="csk-avatar__initials" aria-label={name || alt}>
            {displayInitials}
          </span>
        )}

        {hasFallbackIcon && (
          <span className="csk-avatar__icon" aria-label={alt || 'User avatar'}>
            {icon || <DefaultUserIcon />}
          </span>
        )}

        {status && (
          <span
            className={`csk-avatar__status csk-avatar__status--${status}`}
            aria-label={status}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export interface AvatarGroupProps {
  /** Maximum number of avatars to display before showing +N indicator */
  max?: number;
  /** Size of avatars in the group */
  size?: AvatarSize;
  /** Spacing between avatars (overlap amount) */
  spacing?: 'tight' | 'normal' | 'loose';
  /** Children (Avatar components) */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
}

/**
 * AvatarGroup component for displaying a stack of avatars.
 * Shows a "+N" indicator when there are more avatars than the max.
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max = 5, size = 'md', spacing = 'normal', children, className }, ref) => {
    const childArray = Array.isArray(children) ? children : [children];
    const visibleChildren = childArray.slice(0, max);
    const remainingCount = childArray.length - max;

    const classes = [
      'csk-avatar-group',
      `csk-avatar-group--${size}`,
      `csk-avatar-group--spacing-${spacing}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} role="group" aria-label="Avatar group">
        {visibleChildren}
        {remainingCount > 0 && (
          <div className={`csk-avatar csk-avatar--${size} csk-avatar--circular csk-avatar--overflow`}>
            <span className="csk-avatar__initials">+{remainingCount}</span>
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';
