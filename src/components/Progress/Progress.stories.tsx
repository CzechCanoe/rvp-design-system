import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Progress } from './Progress';
import type { ProgressStep, ProgressBarProps, ProgressStepsProps } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Progress komponenta pro zobrazení postupu.

### Varianty
- **bar**: Klasický progress bar s procentuálním zobrazením
- **steps**: Kroková navigace pro wizardy a vícekrokové procesy
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type BarStory = StoryObj<ProgressBarProps>;
type StepsStory = StoryObj<ProgressStepsProps>;

// ============================================================================
// Progress Bar - Basic
// ============================================================================

export const BarDefault: BarStory = {
  name: 'Bar / Default',
  args: {
    variant: 'bar',
    value: 60,
  },
};

export const BarWithLabel: BarStory = {
  name: 'Bar / With Label',
  args: {
    variant: 'bar',
    value: 75,
    showLabel: true,
  },
};

export const BarIndeterminate: BarStory = {
  name: 'Bar / Indeterminate',
  args: {
    variant: 'bar',
    value: 0,
    indeterminate: true,
    size: 'md',
  },
};

// ============================================================================
// Progress Bar - All Variants
// ============================================================================

export const BarAllVariants: BarStory = {
  name: 'Bar / All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Sizes (sm, md, lg)
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Progress variant="bar" value={60} size="sm" />
          <Progress variant="bar" value={60} size="md" />
          <Progress variant="bar" value={60} size="lg" />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Colors
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Progress variant="bar" value={60} color="primary" showLabel />
          <Progress variant="bar" value={100} color="success" showLabel />
          <Progress variant="bar" value={80} color="warning" showLabel />
          <Progress variant="bar" value={35} color="error" showLabel />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Striped & Animated
        </p>
        <Progress variant="bar" value={60} striped animated size="lg" />
      </div>
    </div>
  ),
};

// ============================================================================
// Progress Steps - Basic
// ============================================================================

const basicSteps: ProgressStep[] = [
  { id: 1, label: 'Krok 1' },
  { id: 2, label: 'Krok 2' },
  { id: 3, label: 'Krok 3' },
  { id: 4, label: 'Krok 4' },
];

export const StepsDefault: StepsStory = {
  name: 'Steps / Default',
  args: {
    variant: 'steps',
    steps: basicSteps,
    currentStep: 1,
  },
};

export const StepsVertical: StepsStory = {
  name: 'Steps / Vertical',
  args: {
    variant: 'steps',
    steps: [
      { id: 1, label: 'Osobní údaje', description: 'Jméno, datum narození, kontakt' },
      { id: 2, label: 'Adresa', description: 'Trvalé bydliště' },
      { id: 3, label: 'Klub', description: 'Výběr oddílu' },
      { id: 4, label: 'Potvrzení', description: 'Kontrola a odeslání' },
    ],
    currentStep: 1,
    orientation: 'vertical',
  },
};

export const StepsClickable: StepsStory = {
  name: 'Steps / Clickable',
  render: function ClickableSteps() {
    const [currentStep, setCurrentStep] = useState(2);

    const steps: ProgressStep[] = [
      { id: 1, label: 'Hotovo' },
      { id: 2, label: 'Hotovo' },
      { id: 3, label: 'Aktuální' },
      { id: 4, label: 'Čeká' },
    ];

    return (
      <div>
        <p style={{ marginBottom: '24px', color: 'var(--color-text-secondary)' }}>
          Kliknutím na dokončený krok se na něj můžete vrátit. Aktuální krok: {currentStep + 1}
        </p>
        <Progress
          variant="steps"
          steps={steps}
          currentStep={currentStep}
          clickable
          onStepClick={setCurrentStep}
        />
      </div>
    );
  },
};

// ============================================================================
// CSK Specific Examples
// ============================================================================

export const CSKRegistrationWizard: StepsStory = {
  name: 'CSK / Registrace závodníka',
  render: function RegistrationWizard() {
    const [step, setStep] = useState(1);

    const steps: ProgressStep[] = [
      { id: 'personal', label: 'Osobní údaje' },
      { id: 'club', label: 'Klub' },
      { id: 'section', label: 'Sekce' },
      { id: 'documents', label: 'Dokumenty' },
      { id: 'confirm', label: 'Potvrzení' },
    ];

    return (
      <div style={{ maxWidth: '800px' }}>
        <Progress
          variant="steps"
          steps={steps}
          currentStep={step}
          clickable
          onStepClick={setStep}
        />
        <div
          style={{
            marginTop: '32px',
            padding: '24px',
            background: 'var(--color-bg-secondary)',
            borderRadius: '8px',
          }}
        >
          <h3 style={{ margin: '0 0 16px' }}>{steps[step].label}</h3>
          <p style={{ margin: '0 0 24px', color: 'var(--color-text-secondary)' }}>
            Obsah kroku {step + 1} z {steps.length}
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid var(--color-border-primary)',
                background: 'transparent',
                cursor: step === 0 ? 'not-allowed' : 'pointer',
                opacity: step === 0 ? 0.5 : 1,
              }}
            >
              Zpět
            </button>
            <button
              onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
              disabled={step === steps.length - 1}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                background: 'var(--color-primary-500)',
                color: 'white',
                cursor: step === steps.length - 1 ? 'not-allowed' : 'pointer',
                opacity: step === steps.length - 1 ? 0.5 : 1,
              }}
            >
              {step === steps.length - 1 ? 'Odeslat' : 'Další'}
            </button>
          </div>
        </div>
      </div>
    );
  },
};

export const CSKFileUpload: BarStory = {
  name: 'CSK / Nahrávání souboru',
  render: function FileUpload() {
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);

    const startUpload = () => {
      setUploading(true);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    };

    return (
      <div style={{ maxWidth: '400px' }}>
        <div
          style={{
            padding: '24px',
            border: '2px dashed var(--color-border-secondary)',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          <p style={{ margin: '0 0 12px', color: 'var(--color-text-secondary)' }}>
            lekarska_prohlidka_2026.pdf
          </p>
          {uploading ? (
            <Progress
              variant="bar"
              value={progress}
              showLabel
              color={progress === 100 ? 'success' : 'primary'}
              animated={progress < 100}
              striped={progress < 100}
            />
          ) : progress === 100 ? (
            <p style={{ margin: 0, color: 'var(--color-success-500)' }}>✓ Nahráno</p>
          ) : (
            <button
              onClick={startUpload}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                background: 'var(--color-primary-500)',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Nahrát soubor
            </button>
          )}
        </div>
      </div>
    );
  },
};
