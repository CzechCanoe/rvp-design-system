import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { createPortal } from 'react-dom';
import './Toast.css';

// =============================================================================
// TYPES
// =============================================================================

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';
export type ToastStyleVariant = 'default' | 'gradient' | 'glass';

export interface Toast {
  /** Unique identifier for the toast */
  id: string;
  /** Toast content/message */
  message: ReactNode;
  /** Toast title (optional) */
  title?: string;
  /** Visual variant */
  variant?: ToastVariant;
  /** Style variant for visual appearance */
  styleVariant?: ToastStyleVariant;
  /** Duration in ms before auto-dismiss (0 = no auto-dismiss) */
  duration?: number;
  /** Whether to show close button */
  dismissible?: boolean;
  /** Whether to show progress bar */
  showProgress?: boolean;
  /** Callback when toast is dismissed */
  onDismiss?: () => void;
  /** Custom icon (overrides variant icon) */
  icon?: ReactNode;
  /** Action button */
  action?: {
    label: string;
    onClick: () => void;
  };
}

export type ToastOptions = Omit<Toast, 'id' | 'message'>;

export interface ToastContextValue {
  /** Add a new toast */
  toast: (message: ReactNode, options?: ToastOptions) => string;
  /** Add a success toast */
  success: (message: ReactNode, options?: ToastOptions) => string;
  /** Add a warning toast */
  warning: (message: ReactNode, options?: ToastOptions) => string;
  /** Add an error toast */
  error: (message: ReactNode, options?: ToastOptions) => string;
  /** Add an info toast */
  info: (message: ReactNode, options?: ToastOptions) => string;
  /** Dismiss a specific toast */
  dismiss: (id: string) => void;
  /** Dismiss all toasts */
  dismissAll: () => void;
}

export interface ToastProviderProps {
  /** Children components */
  children: ReactNode;
  /** Default position for toasts */
  position?: ToastPosition;
  /** Default duration for toasts (ms) */
  duration?: number;
  /** Maximum number of visible toasts */
  maxToasts?: number;
  /** Default style variant */
  styleVariant?: ToastStyleVariant;
  /** Whether to show progress bar by default */
  showProgress?: boolean;
}

export interface ToastItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Toast data */
  toast: Toast;
  /** Callback to dismiss this toast */
  onDismiss: (id: string) => void;
  /** Whether to show progress bar */
  showProgress?: boolean;
}

// =============================================================================
// CONTEXT
// =============================================================================

const ToastContext = createContext<ToastContextValue | null>(null);

// =============================================================================
// TOAST ITEM COMPONENT
// =============================================================================

const ToastItem = ({ toast, onDismiss, showProgress = true, className, ...props }: ToastItemProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const remainingTimeRef = useRef<number>(toast.duration || 0);
  const startTimeRef = useRef<number>(Date.now());

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    // Wait for exit animation
    setTimeout(() => {
      onDismiss(toast.id);
      toast.onDismiss?.();
    }, 200);
  }, [onDismiss, toast]);

  // Auto-dismiss timer
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      remainingTimeRef.current = toast.duration;
      startTimeRef.current = Date.now();
      timerRef.current = window.setTimeout(handleDismiss, toast.duration);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [toast.duration, handleDismiss]);

  // Pause timer on hover
  const handleMouseEnter = useCallback(() => {
    if (timerRef.current && toast.duration && toast.duration > 0) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      // Calculate remaining time
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
      setIsPaused(true);
    }
  }, [toast.duration]);

  const handleMouseLeave = useCallback(() => {
    if (toast.duration && toast.duration > 0 && remainingTimeRef.current > 0) {
      startTimeRef.current = Date.now();
      timerRef.current = window.setTimeout(handleDismiss, remainingTimeRef.current);
      setIsPaused(false);
    }
  }, [toast.duration, handleDismiss]);

  const variant = toast.variant || 'default';
  const styleVariant = toast.styleVariant || 'default';
  const shouldShowProgress = toast.showProgress ?? showProgress;
  const hasDuration = toast.duration && toast.duration > 0;

  const classes = [
    'csk-toast',
    `csk-toast--${variant}`,
    styleVariant !== 'default' && `csk-toast--style-${styleVariant}`,
    isExiting && 'csk-toast--exiting',
    isPaused && 'csk-toast--paused',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      role="alert"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      className={classes}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Icon */}
      <div className="csk-toast__icon" aria-hidden="true">
        {toast.icon || <VariantIcon variant={variant} />}
      </div>

      {/* Content */}
      <div className="csk-toast__content">
        {toast.title && <div className="csk-toast__title">{toast.title}</div>}
        <div className="csk-toast__message">{toast.message}</div>
      </div>

      {/* Action button */}
      {toast.action && (
        <button
          type="button"
          className="csk-toast__action"
          onClick={() => {
            toast.action?.onClick();
            handleDismiss();
          }}
        >
          {toast.action.label}
        </button>
      )}

      {/* Dismiss button */}
      {toast.dismissible !== false && (
        <button
          type="button"
          className="csk-toast__dismiss"
          onClick={handleDismiss}
          aria-label="Zavřít oznámení"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {/* Progress bar */}
      {shouldShowProgress && hasDuration && (
        <div className="csk-toast__progress">
          <div
            className="csk-toast__progress-bar"
            style={{ animationDuration: `${toast.duration}ms` }}
          />
        </div>
      )}
    </div>
  );
};

// =============================================================================
// VARIANT ICONS
// =============================================================================

const VariantIcon = ({ variant }: { variant: ToastVariant }) => {
  switch (variant) {
    case 'success':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'warning':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case 'error':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      );
    case 'info':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
  }
};

// =============================================================================
// TOAST PROVIDER
// =============================================================================

let toastCounter = 0;
const generateId = () => `toast-${++toastCounter}`;

/**
 * ToastProvider component that manages toast notifications.
 *
 * Features:
 * - Multiple variants (default, success, warning, error, info)
 * - Style variants (default, gradient, glass)
 * - Configurable position (6 positions)
 * - Auto-dismiss with configurable duration
 * - Progress bar visualization
 * - Pause on hover
 * - Action buttons
 * - WCAG 2.1 AA compliant (role="alert", aria-live)
 * - Stacking with max visible limit
 * - Slide-in/out animations
 */
export const ToastProvider = ({
  children,
  position = 'bottom-right',
  duration = 5000,
  maxToasts = 5,
  styleVariant = 'default',
  showProgress = true,
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: ReactNode, options: ToastOptions = {}): string => {
      const id = generateId();
      const newToast: Toast = {
        id,
        message,
        duration: options.duration ?? duration,
        dismissible: options.dismissible ?? true,
        styleVariant: options.styleVariant ?? styleVariant,
        showProgress: options.showProgress ?? showProgress,
        ...options,
      };

      setToasts((prev) => {
        // Remove oldest if at max capacity
        const updated = [...prev, newToast];
        if (updated.length > maxToasts) {
          return updated.slice(-maxToasts);
        }
        return updated;
      });

      return id;
    },
    [duration, maxToasts, styleVariant, showProgress]
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const contextValue: ToastContextValue = {
    toast: addToast,
    success: (message, options) => addToast(message, { ...options, variant: 'success' }),
    warning: (message, options) => addToast(message, { ...options, variant: 'warning' }),
    error: (message, options) => addToast(message, { ...options, variant: 'error' }),
    info: (message, options) => addToast(message, { ...options, variant: 'info' }),
    dismiss,
    dismissAll,
  };

  const containerClasses = ['csk-toast-container', `csk-toast-container--${position}`].join(' ');

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {createPortal(
        <div className={containerClasses} aria-label="Oznámení">
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onDismiss={dismiss}
              showProgress={toast.showProgress ?? showProgress}
            />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

// =============================================================================
// HOOK
// =============================================================================

/**
 * Hook to access toast notifications.
 *
 * @example
 * ```tsx
 * const { success, error } = useToast();
 *
 * // Show success toast
 * success('Změny byly uloženy');
 *
 * // Show error toast with title
 * error('Zkontrolujte připojení k internetu', { title: 'Chyba připojení' });
 *
 * // Show toast with action
 * toast('Závodník byl smazán', {
 *   action: { label: 'Zpět', onClick: handleUndo }
 * });
 *
 * // Show gradient style toast
 * success('Registrace dokončena', { styleVariant: 'gradient' });
 *
 * // Show glass style toast
 * info('Nová verze k dispozici', { styleVariant: 'glass' });
 * ```
 */
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

ToastProvider.displayName = 'ToastProvider';
