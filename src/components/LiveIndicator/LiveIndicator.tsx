import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './LiveIndicator.css';

export type LiveIndicatorVariant = 'default' | 'live' | 'recording' | 'offline' | 'connecting';
export type LiveIndicatorSize = 'sm' | 'md' | 'lg' | 'xl';
export type LiveIndicatorColor = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type LiveIndicatorStyleVariant = 'default' | 'gradient' | 'glass' | 'badge';
export type LiveIndicatorIntensity = 'subtle' | 'normal' | 'dramatic';

export interface LiveIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual variant of the indicator */
  variant?: LiveIndicatorVariant;
  /** Size of the indicator */
  size?: LiveIndicatorSize;
  /** Color variant (overridden by variant for special states) */
  color?: LiveIndicatorColor;
  /** Style variant for different visual treatments */
  styleVariant?: LiveIndicatorStyleVariant;
  /** Animation intensity level */
  intensity?: LiveIndicatorIntensity;
  /** Enable pulse animation */
  pulse?: boolean;
  /** Show text label next to indicator */
  label?: ReactNode;
  /** Position of the label relative to the dot */
  labelPosition?: 'left' | 'right';
  /** Display as inline element */
  inline?: boolean;
  /** Show glow effect around the dot */
  glow?: boolean;
}

/**
 * LiveIndicator component for displaying live status, recording state, or connection status.
 *
 * Used in:
 * - Live results pages
 * - Real-time timing displays
 * - Connection status indicators
 * - Recording status
 *
 * The indicator consists of a pulsing dot with optional label text.
 */
export const LiveIndicator = forwardRef<HTMLSpanElement, LiveIndicatorProps>(
  (
    {
      variant = 'default',
      size = 'md',
      color = 'default',
      styleVariant = 'default',
      intensity = 'normal',
      pulse = true,
      label,
      labelPosition = 'right',
      inline = false,
      glow = false,
      className,
      ...props
    },
    ref
  ) => {
    // Determine the color based on variant
    const getColorClass = () => {
      // Special variants have predefined colors
      switch (variant) {
        case 'live':
          return 'csk-live-indicator--color-error'; // Red for live
        case 'recording':
          return 'csk-live-indicator--color-error'; // Red for recording
        case 'offline':
          return 'csk-live-indicator--color-default'; // Gray for offline
        case 'connecting':
          return 'csk-live-indicator--color-warning'; // Yellow for connecting
        default:
          return `csk-live-indicator--color-${color}`;
      }
    };

    // Determine if animation should be active
    const shouldPulse = pulse && variant !== 'offline';

    const classes = [
      'csk-live-indicator',
      `csk-live-indicator--${size}`,
      `csk-live-indicator--${variant}`,
      `csk-live-indicator--style-${styleVariant}`,
      `csk-live-indicator--intensity-${intensity}`,
      getColorClass(),
      shouldPulse && 'csk-live-indicator--pulse',
      inline && 'csk-live-indicator--inline',
      glow && 'csk-live-indicator--glow',
      `csk-live-indicator--label-${labelPosition}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classes} {...props}>
        <span className="csk-live-indicator__dot" aria-hidden="true">
          {shouldPulse && (
            <>
              <span className="csk-live-indicator__pulse-ring" />
              {intensity === 'dramatic' && (
                <span className="csk-live-indicator__pulse-ring csk-live-indicator__pulse-ring--secondary" />
              )}
            </>
          )}
        </span>
        {label && <span className="csk-live-indicator__label">{label}</span>}
      </span>
    );
  }
);

LiveIndicator.displayName = 'LiveIndicator';
