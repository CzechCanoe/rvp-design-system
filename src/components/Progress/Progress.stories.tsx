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

### Použití
- Progress bar pro zobrazení průběhu nahrávání, zpracování
- Steps pro registrační proces, checkout, vícekrokové formuláře
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
// Progress Bar Stories
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

export const BarSizes: BarStory = {
  name: 'Bar / Sizes',
  args: {
    variant: 'bar',
    value: 60,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Small (4px)
        </p>
        <Progress variant="bar" value={60} size="sm" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Medium (8px) - default
        </p>
        <Progress variant="bar" value={60} size="md" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Large (12px)
        </p>
        <Progress variant="bar" value={60} size="lg" />
      </div>
    </div>
  ),
};

export const BarColors: BarStory = {
  name: 'Bar / Colors',
  args: {
    variant: 'bar',
    value: 60,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Progress variant="bar" value={60} color="primary" showLabel />
      <Progress variant="bar" value={60} color="success" showLabel />
      <Progress variant="bar" value={60} color="warning" showLabel />
      <Progress variant="bar" value={60} color="error" showLabel />
      <Progress variant="bar" value={60} color="info" showLabel />
    </div>
  ),
};

export const BarStriped: BarStory = {
  name: 'Bar / Striped',
  args: {
    variant: 'bar',
    value: 60,
    striped: true,
    size: 'lg',
  },
};

export const BarAnimated: BarStory = {
  name: 'Bar / Animated Stripes',
  args: {
    variant: 'bar',
    value: 60,
    striped: true,
    animated: true,
    size: 'lg',
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

export const BarCustomLabel: BarStory = {
  name: 'Bar / Custom Label',
  args: {
    variant: 'bar',
    value: 750,
    max: 1000,
    showLabel: true,
    labelFormat: (value, max) => `${value} / ${max} MB`,
  },
};

// ============================================================================
// Progress Steps Stories
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

export const StepsCompleted: StepsStory = {
  name: 'Steps / All Completed',
  args: {
    variant: 'steps',
    steps: basicSteps,
    currentStep: 4,
  },
};

export const StepsSizes: StepsStory = {
  name: 'Steps / Sizes',
  args: {
    variant: 'steps',
    steps: basicSteps,
    currentStep: 1,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <div>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Small
        </p>
        <Progress variant="steps" steps={basicSteps} currentStep={1} size="sm" />
      </div>
      <div>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Medium (default)
        </p>
        <Progress variant="steps" steps={basicSteps} currentStep={1} size="md" />
      </div>
      <div>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Large
        </p>
        <Progress variant="steps" steps={basicSteps} currentStep={1} size="lg" />
      </div>
    </div>
  ),
};

export const StepsColors: StepsStory = {
  name: 'Steps / Colors',
  args: {
    variant: 'steps',
    steps: basicSteps,
    currentStep: 2,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <Progress variant="steps" steps={basicSteps} currentStep={2} color="primary" />
      <Progress variant="steps" steps={basicSteps} currentStep={2} color="success" />
      <Progress variant="steps" steps={basicSteps} currentStep={2} color="warning" />
      <Progress variant="steps" steps={basicSteps} currentStep={2} color="error" />
      <Progress variant="steps" steps={basicSteps} currentStep={2} color="info" />
    </div>
  ),
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

export const StepsWithDescriptions: StepsStory = {
  name: 'Steps / With Descriptions',
  args: {
    variant: 'steps',
    steps: [
      { id: 1, label: 'Výběr závodu', description: 'Zvolte závod z kalendáře' },
      { id: 2, label: 'Závodníci', description: 'Vyberte závodníky k přihlášení' },
      { id: 3, label: 'Kategorie', description: 'Přiřaďte kategorie' },
      { id: 4, label: 'Platba', description: 'Uhraďte startovné' },
    ],
    currentStep: 1,
  },
};

export const StepsClickable: StepsStory = {
  name: 'Steps / Clickable',
  args: {
    variant: 'steps',
    steps: [
      { id: 1, label: 'Hotovo' },
      { id: 2, label: 'Hotovo' },
      { id: 3, label: 'Aktuální' },
      { id: 4, label: 'Čeká' },
    ],
    currentStep: 2,
    clickable: true,
  },
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
  args: {
    variant: 'steps',
    steps: [
      { id: 'personal', label: 'Osobní údaje' },
      { id: 'club', label: 'Klub' },
      { id: 'section', label: 'Sekce' },
      { id: 'documents', label: 'Dokumenty' },
      { id: 'confirm', label: 'Potvrzení' },
    ],
    currentStep: 1,
    clickable: true,
  },
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

export const CSKEventRegistration: StepsStory = {
  name: 'CSK / Přihlášení na závod',
  args: {
    variant: 'steps',
    steps: [
      { id: 1, label: 'Závod', description: 'MČR ve slalomu 2026' },
      { id: 2, label: 'Závodníci', description: '3 vybráni' },
      { id: 3, label: 'Kategorie', description: 'C1M, K1Ž, C2M' },
      { id: 4, label: 'Platba', description: '1 500 Kč' },
    ],
    currentStep: 2,
    orientation: 'vertical',
    size: 'lg',
  },
};

export const CSKFileUpload: BarStory = {
  name: 'CSK / Nahrávání souboru',
  args: {
    variant: 'bar',
    value: 0,
  },
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

export const CSKMembershipStatus: BarStory = {
  name: 'CSK / Stav členství',
  args: {
    variant: 'bar',
    value: 245,
    max: 365,
  },
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <h4 style={{ margin: '0 0 8px' }}>Platnost členství</h4>
      <p
        style={{ margin: '0 0 16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}
      >
        Zbývá 245 dní do konce platnosti
      </p>
      <Progress
        variant="bar"
        value={245}
        max={365}
        showLabel
        labelFormat={(v, m) => `${v} / ${m} dní`}
        color="success"
        size="lg"
      />
    </div>
  ),
};

export const CSKProcessingResults: BarStory = {
  name: 'CSK / Zpracování výsledků',
  args: {
    variant: 'bar',
    value: 0,
    indeterminate: true,
  },
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <h4 style={{ margin: '0 0 16px' }}>Načítání výsledků...</h4>
      <Progress variant="bar" value={0} indeterminate color="info" />
      <p
        style={{ margin: '16px 0 0', fontSize: '14px', color: 'var(--color-text-secondary)' }}
      >
        Připojování k C123 serveru
      </p>
    </div>
  ),
};

export const CSKVTClassProgress: BarStory = {
  name: 'CSK / Postup ve VT třídách',
  args: {
    variant: 'bar',
    value: 2,
    max: 5,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: 500 }}>Postup do třídy A</span>
          <span style={{ color: 'var(--color-text-secondary)' }}>2/5 závodů</span>
        </div>
        <Progress variant="bar" value={2} max={5} color="warning" size="md" />
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: 500 }}>Postup do třídy M</span>
          <span style={{ color: 'var(--color-text-secondary)' }}>1/3 výsledků</span>
        </div>
        <Progress variant="bar" value={1} max={3} color="error" size="md" />
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: 500 }}>Body pro reprezentaci</span>
          <span style={{ color: 'var(--color-text-secondary)' }}>850/1000</span>
        </div>
        <Progress variant="bar" value={850} max={1000} color="success" size="md" />
      </div>
    </div>
  ),
};
