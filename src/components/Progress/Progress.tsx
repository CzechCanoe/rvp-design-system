import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './Progress.css';

// ============================================================================
// Types
// ============================================================================

export type ProgressVariant = 'bar' | 'steps';
export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressColor = 'primary' | 'success' | 'warning' | 'error' | 'info';

export interface ProgressStep {
  /** Unique identifier for the step */
  id: string | number;
  /** Label displayed below the step indicator */
  label?: string;
  /** Optional description for the step */
  description?: string;
  /** Optional icon to display in the step indicator */
  icon?: ReactNode;
}

export interface ProgressBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Progress variant */
  variant?: 'bar';
  /** Current progress value (0-100) */
  value: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Size of the progress bar */
  size?: ProgressSize;
  /** Color theme */
  color?: ProgressColor;
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom label format */
  labelFormat?: (value: number, max: number) => string;
  /** Show striped animation */
  striped?: boolean;
  /** Animate the stripes */
  animated?: boolean;
  /** Use indeterminate loading state */
  indeterminate?: boolean;
  /** Accessible label */
  ariaLabel?: string;
}

export interface ProgressStepsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Progress variant */
  variant: 'steps';
  /** Steps configuration */
  steps: ProgressStep[];
  /** Current active step (0-indexed) */
  currentStep: number;
  /** Size of the step indicators */
  size?: ProgressSize;
  /** Color theme */
  color?: ProgressColor;
  /** Orientation of the steps */
  orientation?: 'horizontal' | 'vertical';
  /** Allow clicking on completed steps */
  clickable?: boolean;
  /** Callback when a step is clicked */
  onStepClick?: (stepIndex: number) => void;
  /** Accessible label */
  ariaLabel?: string;
}

export type ProgressProps = ProgressBarProps | ProgressStepsProps;

// ============================================================================
// Helper Components
// ============================================================================

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// ============================================================================
// Progress Bar Component
// ============================================================================

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      max = 100,
      size = 'md',
      color = 'primary',
      showLabel = false,
      labelFormat,
      striped = false,
      animated = false,
      indeterminate = false,
      ariaLabel = 'Průběh',
      className,
      ...props
    },
    ref
  ) => {
    // Clamp value between 0 and max
    const clampedValue = Math.min(Math.max(0, value), max);
    const percentage = (clampedValue / max) * 100;

    const formatLabel = labelFormat || ((v, m) => `${Math.round((v / m) * 100)}%`);

    const classes = [
      'csk-progress',
      'csk-progress--bar',
      `csk-progress--${size}`,
      `csk-progress--${color}`,
      striped && 'csk-progress--striped',
      animated && striped && 'csk-progress--animated',
      indeterminate && 'csk-progress--indeterminate',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel}
        {...props}
      >
        <div className="csk-progress__track">
          <div
            className="csk-progress__fill"
            style={indeterminate ? undefined : { width: `${percentage}%` }}
          />
        </div>
        {showLabel && !indeterminate && (
          <span className="csk-progress__label">{formatLabel(clampedValue, max)}</span>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

// ============================================================================
// Progress Steps Component
// ============================================================================

const ProgressSteps = forwardRef<HTMLDivElement, ProgressStepsProps>(
  (
    {
      steps,
      currentStep,
      size = 'md',
      color = 'primary',
      orientation = 'horizontal',
      clickable = false,
      onStepClick,
      ariaLabel = 'Kroky procesu',
      className,
      ...props
    },
    ref
  ) => {
    const handleStepClick = (index: number) => {
      if (clickable && index < currentStep && onStepClick) {
        onStepClick(index);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
      if (clickable && index < currentStep && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        onStepClick?.(index);
      }
    };

    const classes = [
      'csk-progress',
      'csk-progress--steps',
      `csk-progress--${size}`,
      `csk-progress--${color}`,
      `csk-progress--${orientation}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} aria-label={ariaLabel} role="group" {...props}>
        <ol className="csk-progress__steps">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isClickable = clickable && isCompleted;

            const stepClasses = [
              'csk-progress__step',
              isCompleted && 'csk-progress__step--completed',
              isCurrent && 'csk-progress__step--current',
              isClickable && 'csk-progress__step--clickable',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <li key={step.id} className={stepClasses}>
                {/* Connector line (before step, except first) */}
                {index > 0 && (
                  <div
                    className={[
                      'csk-progress__connector',
                      isCompleted && 'csk-progress__connector--completed',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-hidden="true"
                  />
                )}

                {/* Step indicator */}
                <div
                  className="csk-progress__indicator"
                  role={isClickable ? 'button' : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                  onClick={() => handleStepClick(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-label={
                    isCompleted
                      ? `Krok ${index + 1}: ${step.label || ''} (dokončeno)`
                      : isCurrent
                        ? `Krok ${index + 1}: ${step.label || ''} (aktuální)`
                        : `Krok ${index + 1}: ${step.label || ''}`
                  }
                >
                  {isCompleted ? (
                    <span className="csk-progress__check">
                      <CheckIcon />
                    </span>
                  ) : step.icon ? (
                    <span className="csk-progress__icon">{step.icon}</span>
                  ) : (
                    <span className="csk-progress__number">{index + 1}</span>
                  )}
                </div>

                {/* Step content */}
                {(step.label || step.description) && (
                  <div className="csk-progress__content">
                    {step.label && <span className="csk-progress__step-label">{step.label}</span>}
                    {step.description && (
                      <span className="csk-progress__step-description">{step.description}</span>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
);

ProgressSteps.displayName = 'ProgressSteps';

// ============================================================================
// Main Progress Component
// ============================================================================

/**
 * Progress component for displaying progress indicators.
 *
 * Supports two variants:
 * - `bar`: Traditional progress bar with percentage
 * - `steps`: Step-by-step wizard progress
 *
 * @example
 * // Progress bar
 * <Progress variant="bar" value={60} showLabel />
 *
 * // Step progress
 * <Progress
 *   variant="steps"
 *   currentStep={1}
 *   steps={[
 *     { id: 1, label: 'Step 1' },
 *     { id: 2, label: 'Step 2' },
 *     { id: 3, label: 'Step 3' },
 *   ]}
 * />
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>((props, ref) => {
  if (props.variant === 'steps') {
    return <ProgressSteps ref={ref} {...props} />;
  }

  // Default to bar variant
  return <ProgressBar ref={ref} {...(props as ProgressBarProps)} />;
});

Progress.displayName = 'Progress';
