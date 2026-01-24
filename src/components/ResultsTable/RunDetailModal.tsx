import { useState, type HTMLAttributes } from 'react';
import './RunDetailModal.css';

// ============================================================================
// Types
// ============================================================================

/** Gate penalty detail */
export interface GatePenalty {
  /** Gate number (1-indexed) */
  gateNumber: number;
  /** Penalty type: 0 = clean, 2 = touch, 50 = miss */
  penalty: 0 | 2 | 50;
  /** Gate direction: up (upstream) or down (downstream) */
  direction: 'up' | 'down';
  /** Gate color */
  color: 'green' | 'red';
  /** Split time at this gate (cumulative seconds) */
  splitTime?: number;
  /** Diff to leader at this gate (seconds, negative = faster) */
  diff?: number;
}

/** Run detail */
export interface RunDetail {
  /** Run number (1 or 2) */
  runNumber: 1 | 2;
  /** Raw time without penalties (seconds) */
  rawTime: number;
  /** Total penalty seconds */
  totalPenalty: number;
  /** Final time = raw + penalty (seconds) */
  finalTime: number;
  /** Status */
  status: 'finished' | 'live' | 'dns' | 'dnf' | 'dsq';
  /** Gate penalties */
  gates: GatePenalty[];
  /** Rank in this run */
  runRank?: number;
  /** Diff to leader in this run */
  runDiff?: number;
}

/** Athlete detail for the modal */
export interface AthleteRunDetail {
  /** Unique ID */
  id: string | number;
  /** Athlete name */
  name: string;
  /** Club */
  club: string;
  /** Category (e.g., K1M, C1W) */
  category: string;
  /** Bib number */
  bib: number;
  /** Country code */
  country?: string;
  /** Avatar URL */
  avatarUrl?: string;
  /** Run 1 detail */
  run1?: RunDetail;
  /** Run 2 detail */
  run2?: RunDetail;
  /** Overall rank */
  overallRank?: number;
  /** Overall time diff to leader */
  overallDiff?: number;
}

export interface RunDetailModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Athlete detail data */
  athlete: AthleteRunDetail | null;
  /** Whether modal is open */
  open: boolean;
  /** Close handler */
  onClose: () => void;
  /** Section for theming */
  section?: 'dv' | 'ry' | 'vt';
}

// ============================================================================
// Icons
// ============================================================================

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ============================================================================
// Helpers
// ============================================================================

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatTime(seconds: number | undefined): string {
  if (seconds === undefined) return '-';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toFixed(2).padStart(5, '0')}`;
}

function formatDiff(diff: number | undefined): string {
  if (diff === undefined || diff === 0) return '-';
  const sign = diff > 0 ? '+' : '';
  return `${sign}${diff.toFixed(2)}`;
}

// ============================================================================
// RunDetailModal Component
// ============================================================================

export const RunDetailModal = ({
  athlete,
  open,
  onClose,
  section = 'dv',
  className,
  ...props
}: RunDetailModalProps) => {
  const [activeRun, setActiveRun] = useState<1 | 2>(1);

  if (!open || !athlete) return null;

  const currentRun = activeRun === 1 ? athlete.run1 : athlete.run2;

  // Get penalty CSS class
  const getPenaltyClass = (penalty: number): string => {
    if (penalty === 0) return 'run-detail-modal__gate--clean';
    if (penalty === 2) return 'run-detail-modal__gate--touch';
    return 'run-detail-modal__gate--miss';
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className={`run-detail-modal__backdrop ${className || ''}`}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div
        className={`run-detail-modal run-detail-modal--${section}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="run-detail-modal-title"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="run-detail-modal__header">
          <div className="run-detail-modal__header-left">
            <div className="run-detail-modal__athlete-info">
              {athlete.avatarUrl ? (
                <img
                  src={athlete.avatarUrl}
                  alt=""
                  className="run-detail-modal__avatar"
                />
              ) : (
                <div className="run-detail-modal__avatar run-detail-modal__avatar--initials">
                  {getInitials(athlete.name)}
                </div>
              )}
              <div>
                <h2 id="run-detail-modal-title" className="run-detail-modal__name csk-display">
                  #{athlete.bib} {athlete.name}
                </h2>
                <p className="run-detail-modal__club">
                  {athlete.club}
                  {athlete.country && ` • ${athlete.country}`}
                  {athlete.category && ` • ${athlete.category}`}
                </p>
              </div>
            </div>
            {athlete.overallRank && (
              <div className="run-detail-modal__overall">
                <span className="run-detail-modal__overall-rank csk-display">
                  {athlete.overallRank}.
                </span>
                <span className="run-detail-modal__overall-label">celkově</span>
              </div>
            )}
          </div>
          <button
            className="run-detail-modal__close"
            onClick={onClose}
            aria-label="Zavřít"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Run Tabs */}
        <div className="run-detail-modal__tabs">
          <button
            className={`run-detail-modal__tab ${activeRun === 1 ? 'run-detail-modal__tab--active' : ''}`}
            onClick={() => setActiveRun(1)}
            type="button"
          >
            <span>1. jízda</span>
            {athlete.run1 && (
              <span className="run-detail-modal__tab-time">{formatTime(athlete.run1.finalTime)}</span>
            )}
          </button>
          <button
            className={`run-detail-modal__tab ${activeRun === 2 ? 'run-detail-modal__tab--active' : ''}`}
            onClick={() => setActiveRun(2)}
            type="button"
            disabled={!athlete.run2}
          >
            <span>2. jízda</span>
            {athlete.run2 && (
              <span className="run-detail-modal__tab-time">{formatTime(athlete.run2.finalTime)}</span>
            )}
          </button>
        </div>

        {/* Run Summary */}
        {currentRun && (
          <div className="run-detail-modal__summary">
            <div className="run-detail-modal__summary-item">
              <span className="run-detail-modal__summary-label">Čistý čas</span>
              <span className="run-detail-modal__summary-value">{formatTime(currentRun.rawTime)}</span>
            </div>
            <div className="run-detail-modal__summary-item">
              <span className="run-detail-modal__summary-label">Penalizace</span>
              <span className={`run-detail-modal__summary-value ${currentRun.totalPenalty > 0 ? 'run-detail-modal__summary-value--penalty' : ''}`}>
                {currentRun.totalPenalty > 0 ? `+${currentRun.totalPenalty}s` : '0s'}
              </span>
            </div>
            <div className="run-detail-modal__summary-item run-detail-modal__summary-item--total">
              <span className="run-detail-modal__summary-label">Celkem</span>
              <span className="run-detail-modal__summary-value csk-display">{formatTime(currentRun.finalTime)}</span>
            </div>
            {currentRun.runRank && (
              <div className="run-detail-modal__summary-item">
                <span className="run-detail-modal__summary-label">Pořadí v jízdě</span>
                <span className="run-detail-modal__summary-value">{currentRun.runRank}.</span>
              </div>
            )}
          </div>
        )}

        {/* Gate Grid */}
        {currentRun && currentRun.gates.length > 0 && (
          <div className="run-detail-modal__gates">
            <h3 className="run-detail-modal__gates-title">
              Brány ({currentRun.gates.length})
            </h3>
            <div className="run-detail-modal__gates-legend">
              <span className="run-detail-modal__legend-item run-detail-modal__legend-item--clean">
                <span className="run-detail-modal__legend-dot" />
                Čistá
              </span>
              <span className="run-detail-modal__legend-item run-detail-modal__legend-item--touch">
                <span className="run-detail-modal__legend-dot" />
                Dotyk (+2s)
              </span>
              <span className="run-detail-modal__legend-item run-detail-modal__legend-item--miss">
                <span className="run-detail-modal__legend-dot" />
                Vynechání (+50s)
              </span>
            </div>
            <div className="run-detail-modal__gates-grid">
              {currentRun.gates.map((gate) => (
                <div
                  key={gate.gateNumber}
                  className={`run-detail-modal__gate ${getPenaltyClass(gate.penalty)}`}
                  title={`Brána ${gate.gateNumber}: ${gate.penalty === 0 ? 'čistá' : gate.penalty === 2 ? 'dotyk 2s' : 'vynechání 50s'}`}
                >
                  <span className={`run-detail-modal__gate-number ${gate.color === 'red' ? 'run-detail-modal__gate-number--red' : ''}`}>
                    {gate.gateNumber}
                    {gate.direction === 'up' && <span className="run-detail-modal__gate-arrow">↑</span>}
                  </span>
                  {gate.penalty > 0 && (
                    <span className="run-detail-modal__gate-penalty">+{gate.penalty}</span>
                  )}
                  {gate.splitTime !== undefined && (
                    <span className="run-detail-modal__gate-split">{formatTime(gate.splitTime)}</span>
                  )}
                  {gate.diff !== undefined && (
                    <span className={`run-detail-modal__gate-diff ${gate.diff < 0 ? 'run-detail-modal__gate-diff--faster' : 'run-detail-modal__gate-diff--slower'}`}>
                      {formatDiff(gate.diff)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No run data fallback */}
        {!currentRun && (
          <div className="run-detail-modal__empty">
            <p>Data pro tuto jízdu nejsou k dispozici.</p>
          </div>
        )}
      </div>
    </div>
  );
};

RunDetailModal.displayName = 'RunDetailModal';
