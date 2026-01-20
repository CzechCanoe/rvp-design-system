import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './StatCard.css';

export type StatCardVariant = 'default' | 'outlined' | 'elevated';
export type StatCardSize = 'sm' | 'md' | 'lg';
export type StatCardColor =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type StatCardTrend = 'up' | 'down' | 'neutral';
export type StatCardStyleVariant = 'default' | 'gradient' | 'glass' | 'gradient-subtle';

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Main statistic value to display */
  value: string | number;
  /** Label describing the statistic */
  label: string;
  /** Optional description or additional info */
  description?: string;
  /** Visual variant of the card */
  variant?: StatCardVariant;
  /** Size of the card */
  size?: StatCardSize;
  /** Color theme */
  color?: StatCardColor;
  /** Style variant for different visual treatments */
  styleVariant?: StatCardStyleVariant;
  /** Icon to display */
  icon?: ReactNode;
  /** Trend indicator (up/down/neutral) */
  trend?: StatCardTrend;
  /** Trend value text (e.g. "+12%", "-5%") */
  trendValue?: string;
  /** Secondary value (e.g. previous period) */
  secondaryValue?: string;
  /** Secondary label */
  secondaryLabel?: string;
  /** Footer content (actions, links, etc.) */
  footer?: ReactNode;
  /** Makes the card clickable with hover/active states */
  clickable?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Data points for sparkline visualization (array of numbers) */
  sparklineData?: number[];
  /** Animate trend indicator */
  animateTrend?: boolean;
}

/**
 * StatCard component for displaying key metrics on dashboards.
 *
 * Features value, label, optional trend indicator, icon, and footer.
 * Commonly used for: total athletes, active memberships, upcoming events, etc.
 */
/**
 * Simple Sparkline SVG component for trend visualization
 */
const Sparkline = ({ data, color = 'currentColor' }: { data: number[]; color?: string }) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const width = 80;
  const height = 24;
  const padding = 2;

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;

  // Create area path for gradient fill
  const areaD = `${pathD} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`;

  return (
    <svg
      className="csk-stat-card__sparkline"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sparkline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#sparkline-gradient)" />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      value,
      label,
      description,
      variant = 'default',
      size = 'md',
      color = 'default',
      styleVariant = 'default',
      icon,
      trend,
      trendValue,
      secondaryValue,
      secondaryLabel,
      footer,
      clickable = false,
      loading = false,
      sparklineData,
      animateTrend = false,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const isClickable = clickable || Boolean(onClick);

    const classes = [
      'csk-stat-card',
      `csk-stat-card--${variant}`,
      `csk-stat-card--${size}`,
      `csk-stat-card--${color}`,
      `csk-stat-card--style-${styleVariant}`,
      isClickable && 'csk-stat-card--clickable',
      loading && 'csk-stat-card--loading',
      animateTrend && trend && 'csk-stat-card--animate-trend',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const interactiveProps = isClickable
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

    const getTrendIcon = () => {
      if (!trend || trend === 'neutral') {
        return (
          <svg
            className="csk-stat-card__trend-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14" />
          </svg>
        );
      }
      if (trend === 'up') {
        return (
          <svg
            className="csk-stat-card__trend-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        );
      }
      return (
        <svg
          className="csk-stat-card__trend-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    };

    // Get sparkline color based on trend or color prop
    const getSparklineColor = () => {
      if (trend === 'up') return 'var(--color-success-500)';
      if (trend === 'down') return 'var(--color-error-500)';
      if (color === 'primary') return 'var(--color-primary-500)';
      if (color === 'success') return 'var(--color-success-500)';
      if (color === 'warning') return 'var(--color-warning-500)';
      if (color === 'error') return 'var(--color-error-500)';
      if (color === 'info') return 'var(--color-info-500)';
      return 'var(--color-primary-500)';
    };

    return (
      <div
        ref={ref}
        className={classes}
        onClick={onClick}
        {...interactiveProps}
        {...props}
      >
        {loading && (
          <div className="csk-stat-card__loading-overlay">
            <div className="csk-stat-card__spinner" />
          </div>
        )}

        <div className="csk-stat-card__content">
          {icon && (
            <div className="csk-stat-card__icon-container">
              <span className="csk-stat-card__icon">{icon}</span>
            </div>
          )}

          <div className="csk-stat-card__body">
            <div className="csk-stat-card__header">
              <span className="csk-stat-card__label">{label}</span>
              {trend && (
                <span
                  className={`csk-stat-card__trend csk-stat-card__trend--${trend}`}
                >
                  {getTrendIcon()}
                  {trendValue && (
                    <span className="csk-stat-card__trend-value">
                      {trendValue}
                    </span>
                  )}
                </span>
              )}
            </div>

            <div className="csk-stat-card__value-container">
              <span className="csk-stat-card__value">{value}</span>
            </div>

            {description && (
              <p className="csk-stat-card__description">{description}</p>
            )}

            {(secondaryValue || secondaryLabel) && (
              <div className="csk-stat-card__secondary">
                {secondaryValue && (
                  <span className="csk-stat-card__secondary-value">
                    {secondaryValue}
                  </span>
                )}
                {secondaryLabel && (
                  <span className="csk-stat-card__secondary-label">
                    {secondaryLabel}
                  </span>
                )}
              </div>
            )}

            {sparklineData && sparklineData.length >= 2 && (
              <div className="csk-stat-card__sparkline-container">
                <Sparkline data={sparklineData} color={getSparklineColor()} />
              </div>
            )}
          </div>
        </div>

        {footer && <div className="csk-stat-card__footer">{footer}</div>}
      </div>
    );
  }
);

StatCard.displayName = 'StatCard';
