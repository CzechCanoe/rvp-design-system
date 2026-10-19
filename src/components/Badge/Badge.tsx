import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './Badge.css';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'level'
  | 'outline'
  | 'live';

export type BadgeSection = 'dv' | 'ry' | 'vt';
export type BadgeVtClass = 'm' | 'a' | 'b' | 'c';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual variant of the badge */
  variant?: BadgeVariant;
  /** CSK discipline section (overrides variant) */
  section?: BadgeSection;
  /** VT class (overrides variant and section) */
  vtClass?: BadgeVtClass;
  /** Size of the badge */
  size?: BadgeSize;
  /** Use pill shape (fully rounded) */
  pill?: boolean;
  /** Optional icon to display before content */
  icon?: ReactNode;
  /** Badge content */
  children?: ReactNode;
}

/**
 * Badge component for displaying status, labels, and categories.
 *
 * Variants: default, primary, success, warning, error, info, level (race level),
 * outline, live. CSK-specific sections (DV, RY, VT) and VT classes (M, A, B, C)
 * via props. Value states (official, provisional ...) are StatusBadge.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      section,
      vtClass,
      size = 'md',
      pill = false,
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
      pill && 'csk-badge--pill',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classes} {...props}>
        {variant === 'live' && !section && !vtClass && (
          <span className="csk-badge__dot" aria-hidden="true" />
        )}
        {icon && <span className="csk-badge__icon">{icon}</span>}
        {children && <span className="csk-badge__content">{children}</span>}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
