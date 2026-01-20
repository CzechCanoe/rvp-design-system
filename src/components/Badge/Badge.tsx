import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './Badge.css';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'gradient'
  | 'gradient-accent'
  | 'gradient-success'
  | 'gradient-error';

export type BadgeSection = 'dv' | 'ry' | 'vt';
export type BadgeVtClass = 'm' | 'a' | 'b' | 'c';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual variant of the badge */
  variant?: BadgeVariant;
  /** CSK discipline section (overrides variant) */
  section?: BadgeSection;
  /** VT class (overrides variant and section) */
  vtClass?: BadgeVtClass;
  /** Size of the badge */
  size?: BadgeSize;
  /** Use outlined style instead of filled */
  outlined?: boolean;
  /** Use pill shape (fully rounded) */
  pill?: boolean;
  /** Use glow effect (for gradient and section variants) */
  glow?: boolean;
  /** Optional icon to display before content */
  icon?: ReactNode;
  /** Badge content */
  children?: ReactNode;
}

/**
 * Badge component for displaying status, labels, and categories.
 *
 * Supports semantic variants (success, warning, error, info),
 * CSK-specific sections (DV, RY, VT), and VT classes (M, A, B, C).
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      section,
      vtClass,
      size = 'md',
      outlined = false,
      pill = false,
      glow = false,
      icon,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Determine the color scheme based on props priority: vtClass > section > variant
    const getColorClass = () => {
      if (vtClass) {
        return `csk-badge--vt-${vtClass}`;
      }
      if (section) {
        return `csk-badge--section-${section}`;
      }
      return `csk-badge--${variant}`;
    };

    const classes = [
      'csk-badge',
      getColorClass(),
      `csk-badge--${size}`,
      outlined && 'csk-badge--outlined',
      pill && 'csk-badge--pill',
      glow && 'csk-badge--glow',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classes} {...props}>
        {icon && <span className="csk-badge__icon">{icon}</span>}
        {children && <span className="csk-badge__content">{children}</span>}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
