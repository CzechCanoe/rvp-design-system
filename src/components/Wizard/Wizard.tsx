import React from 'react';
import { Icon } from '../Icon';
import './Wizard.css';

// ============================================================================
// Types
// ============================================================================

export interface WizardStep {
  /** Unique identifier for the step */
  id: string;
  /** Step label text */
  label: string;
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Optional description text */
  description?: string;
}

export type WizardVariant = 'horizontal' | 'vertical';
export type WizardSize = 'sm' | 'md' | 'lg';
export type WizardSection = 'dv' | 'ry' | 'vt' | 'generic';

export interface WizardProps {
  /** Array of step definitions */
  steps: WizardStep[];
  /** Currently active step (id or index) */
  activeStep: string | number;
  /** Array of completed step ids */
  completedSteps?: string[];
  /** Section color variant */
  section?: WizardSection;
  /** Layout variant */
  variant?: WizardVariant;
  /** Size variant */
  size?: WizardSize;
  /** Additional CSS class */
  className?: string;
  /** Click handler for step navigation */
  onStepClick?: (stepId: string, index: number) => void;
}

// ============================================================================
// Helper Functions
// ============================================================================

function getActiveStepIndex(steps: WizardStep[], activeStep: string | number): number {
  if (typeof activeStep === 'number') {
    return activeStep;
  }
  return steps.findIndex(step => step.id === activeStep);
}

function getStepStatus(
  step: WizardStep,
  index: number,
  activeIndex: number,
  completedSteps?: string[]
): 'pending' | 'active' | 'completed' {
  if (completedSteps?.includes(step.id)) {
    return 'completed';
  }
  if (index === activeIndex) {
    return 'active';
  }
  if (index < activeIndex) {
    return 'completed';
  }
  return 'pending';
}

// ============================================================================
// Component
// ============================================================================

/**
 * Wizard/Stepper component for multi-step processes like registration,
 * onboarding, or checkout flows.
 *
 * Features:
 * - Horizontal and vertical layouts
 * - Active/completed/pending step states
 * - Connector lines between steps
 * - Section color variants (dv, ry, vt)
 * - Responsive: hides labels on mobile
 * - Optional step click navigation
 *
 * @example
 * ```tsx
 * // Basic wizard
 * <Wizard
 *   steps={[
 *     { id: 'info', label: 'Personal Info' },
 *     { id: 'contact', label: 'Contact Details' },
 *     { id: 'confirm', label: 'Confirmation' },
 *   ]}
 *   activeStep="contact"
 * />
 *
 * // With icons and section color
 * <Wizard
 *   steps={[
 *     { id: 'info', label: 'Personal Info', icon: <Icon name="user" /> },
 *     { id: 'medical', label: 'Medical', icon: <Icon name="medical" /> },
 *     { id: 'payment', label: 'Payment', icon: <Icon name="credit-card" /> },
 *   ]}
 *   activeStep={1}
 *   section="dv"
 *   onStepClick={(id, index) => setActiveStep(index)}
 * />
 * ```
 */
export const Wizard: React.FC<WizardProps> = ({
  steps,
  activeStep,
  completedSteps,
  section,
  variant = 'horizontal',
  size = 'md',
  className = '',
  onStepClick,
}) => {
  const activeIndex = getActiveStepIndex(steps, activeStep);

  const wizardClasses = [
    'csk-wizard',
    `csk-wizard--${variant}`,
    `csk-wizard--${size}`,
    section && `csk-section-${section}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wizardClasses} role="navigation" aria-label="Progress">
      <ol className="csk-wizard__steps">
        {steps.map((step, index) => {
          const status = getStepStatus(step, index, activeIndex, completedSteps);
          const isLast = index === steps.length - 1;
          const isClickable = !!onStepClick;

          const stepClasses = [
            'csk-wizard__step',
            `csk-wizard__step--${status}`,
            isClickable && 'csk-wizard__step--clickable',
          ]
            .filter(Boolean)
            .join(' ');

          const handleClick = () => {
            if (onStepClick) {
              onStepClick(step.id, index);
            }
          };

          return (
            <li key={step.id} className={stepClasses}>
              {/* Connector line (not on last step) */}
              {!isLast && (
                <div
                  className={`csk-wizard__line ${
                    status === 'completed' ? 'csk-wizard__line--completed' : ''
                  }`}
                  aria-hidden="true"
                />
              )}

              {/* Step circle */}
              <button
                type="button"
                className="csk-wizard__circle"
                onClick={handleClick}
                disabled={!isClickable}
                aria-current={status === 'active' ? 'step' : undefined}
              >
                {status === 'completed' ? (
                  <Icon name="check" size="sm" />
                ) : step.icon ? (
                  step.icon
                ) : (
                  <span className="csk-wizard__number">{index + 1}</span>
                )}
              </button>

              {/* Step content */}
              <div className="csk-wizard__content">
                <span className="csk-wizard__label">{step.label}</span>
                {step.description && (
                  <span className="csk-wizard__description">{step.description}</span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Wizard;
