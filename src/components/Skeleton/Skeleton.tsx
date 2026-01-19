import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react';
import './Skeleton.css';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Shape variant of the skeleton */
  variant?: SkeletonVariant;
  /** Animation type */
  animation?: SkeletonAnimation;
  /** Width of the skeleton (CSS value or number in px) */
  width?: string | number;
  /** Height of the skeleton (CSS value or number in px) */
  height?: string | number;
  /** Border radius for rectangular variant (CSS value) */
  borderRadius?: string;
  /** Number of lines for text variant */
  lines?: number;
  /** Gap between lines for text variant */
  lineGap?: string | number;
  /** Whether the last line should be shorter (for text variant) */
  lastLineWidth?: string | number;
}

/**
 * Skeleton component for displaying loading placeholders.
 *
 * Used to indicate content is loading while maintaining layout structure.
 *
 * Variants:
 * - text: For text lines with optional multi-line support
 * - circular: For avatars and icons
 * - rectangular: For images and cards
 * - rounded: For buttons and badges
 *
 * @example
 * ```tsx
 * // Single skeleton
 * <Skeleton variant="text" width="100%" />
 *
 * // Multi-line text
 * <Skeleton variant="text" lines={3} lastLineWidth="60%" />
 *
 * // Avatar placeholder
 * <Skeleton variant="circular" width={48} height={48} />
 *
 * // Card placeholder
 * <Skeleton variant="rectangular" width="100%" height={200} />
 * ```
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'text',
      animation = 'pulse',
      width,
      height,
      borderRadius,
      lines = 1,
      lineGap = 8,
      lastLineWidth = '80%',
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Convert number values to pixels
    const formatSize = (value: string | number | undefined): string | undefined => {
      if (value === undefined) return undefined;
      if (typeof value === 'number') return `${value}px`;
      return value;
    };

    const baseClasses = [
      'csk-skeleton',
      `csk-skeleton--${variant}`,
      animation !== 'none' && `csk-skeleton--${animation}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // For multi-line text, render multiple skeletons
    if (variant === 'text' && lines > 1) {
      return (
        <div
          ref={ref}
          className="csk-skeleton-lines"
          style={{
            gap: formatSize(lineGap),
            ...style,
          }}
          {...props}
        >
          {Array.from({ length: lines }).map((_, index) => {
            const isLastLine = index === lines - 1;
            const lineWidth = isLastLine ? formatSize(lastLineWidth) : formatSize(width);

            return (
              <div
                key={index}
                className={baseClasses}
                style={{
                  width: lineWidth || '100%',
                  height: formatSize(height),
                  borderRadius: formatSize(borderRadius),
                }}
                aria-hidden="true"
              />
            );
          })}
        </div>
      );
    }

    const customStyle: CSSProperties = {
      width: formatSize(width),
      height: formatSize(height),
      borderRadius: formatSize(borderRadius),
      ...style,
    };

    return (
      <div
        ref={ref}
        className={baseClasses}
        style={customStyle}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// ============================================================================
// SkeletonText - Convenience component for text placeholders
// ============================================================================

export interface SkeletonTextProps extends Omit<SkeletonProps, 'variant'> {
  /** Font size to match (determines height) */
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * SkeletonText component for text placeholder with predefined heights.
 */
export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ fontSize = 'md', height, ...props }, ref) => {
    const fontSizeMap: Record<string, string> = {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
    };

    return (
      <Skeleton
        ref={ref}
        variant="text"
        height={height || fontSizeMap[fontSize]}
        {...props}
      />
    );
  }
);

SkeletonText.displayName = 'SkeletonText';

// ============================================================================
// SkeletonAvatar - Convenience component for avatar placeholders
// ============================================================================

export interface SkeletonAvatarProps extends Omit<SkeletonProps, 'variant' | 'width' | 'height'> {
  /** Avatar size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

/**
 * SkeletonAvatar component for avatar placeholders.
 */
export const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ size = 'md', ...props }, ref) => {
    const sizeMap: Record<string, number> = {
      xs: 24,
      sm: 32,
      md: 40,
      lg: 48,
      xl: 64,
      '2xl': 96,
    };

    const pixelSize = sizeMap[size];

    return (
      <Skeleton
        ref={ref}
        variant="circular"
        width={pixelSize}
        height={pixelSize}
        {...props}
      />
    );
  }
);

SkeletonAvatar.displayName = 'SkeletonAvatar';

// ============================================================================
// SkeletonButton - Convenience component for button placeholders
// ============================================================================

export interface SkeletonButtonProps extends Omit<SkeletonProps, 'variant'> {
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * SkeletonButton component for button placeholders.
 */
export const SkeletonButton = forwardRef<HTMLDivElement, SkeletonButtonProps>(
  ({ size = 'md', width, ...props }, ref) => {
    const sizeMap: Record<string, { height: number; minWidth: number }> = {
      sm: { height: 32, minWidth: 64 },
      md: { height: 44, minWidth: 80 },
      lg: { height: 52, minWidth: 96 },
    };

    const { height, minWidth } = sizeMap[size];

    return (
      <Skeleton
        ref={ref}
        variant="rounded"
        width={width || minWidth}
        height={height}
        {...props}
      />
    );
  }
);

SkeletonButton.displayName = 'SkeletonButton';

// ============================================================================
// SkeletonCard - Convenience component for card placeholders
// ============================================================================

export interface SkeletonCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Animation type */
  animation?: SkeletonAnimation;
  /** Show image placeholder */
  hasImage?: boolean;
  /** Image height */
  imageHeight?: number;
  /** Number of text lines */
  lines?: number;
  /** Show avatar */
  hasAvatar?: boolean;
  /** Show action buttons */
  hasActions?: boolean;
}

/**
 * SkeletonCard component for card placeholders with common layout.
 */
export const SkeletonCard = forwardRef<HTMLDivElement, SkeletonCardProps>(
  (
    {
      animation = 'pulse',
      hasImage = true,
      imageHeight = 200,
      lines = 3,
      hasAvatar = false,
      hasActions = false,
      className,
      ...props
    },
    ref
  ) => {
    const classes = ['csk-skeleton-card', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {hasImage && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={imageHeight}
            animation={animation}
          />
        )}
        <div className="csk-skeleton-card__content">
          {hasAvatar && (
            <div className="csk-skeleton-card__header">
              <SkeletonAvatar size="md" animation={animation} />
              <div className="csk-skeleton-card__header-text">
                <Skeleton variant="text" width="60%" animation={animation} />
                <Skeleton variant="text" width="40%" height={12} animation={animation} />
              </div>
            </div>
          )}
          <Skeleton
            variant="text"
            lines={lines}
            lastLineWidth="70%"
            animation={animation}
          />
          {hasActions && (
            <div className="csk-skeleton-card__actions">
              <SkeletonButton size="sm" width={80} animation={animation} />
              <SkeletonButton size="sm" width={80} animation={animation} />
            </div>
          )}
        </div>
      </div>
    );
  }
);

SkeletonCard.displayName = 'SkeletonCard';

// ============================================================================
// SkeletonTable - Convenience component for table row placeholders
// ============================================================================

export interface SkeletonTableProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Animation type */
  animation?: SkeletonAnimation;
  /** Number of rows */
  rows?: number;
  /** Number of columns */
  columns?: number;
  /** Show header row */
  hasHeader?: boolean;
}

/**
 * SkeletonTable component for table placeholders.
 */
export const SkeletonTable = forwardRef<HTMLDivElement, SkeletonTableProps>(
  (
    {
      animation = 'pulse',
      rows = 5,
      columns = 4,
      hasHeader = true,
      className,
      ...props
    },
    ref
  ) => {
    const classes = ['csk-skeleton-table', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {hasHeader && (
          <div className="csk-skeleton-table__row csk-skeleton-table__row--header">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton
                key={colIndex}
                variant="text"
                width="70%"
                height={14}
                animation={animation}
              />
            ))}
          </div>
        )}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="csk-skeleton-table__row">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton
                key={colIndex}
                variant="text"
                width={colIndex === 0 ? '50%' : '80%'}
                animation={animation}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
);

SkeletonTable.displayName = 'SkeletonTable';
