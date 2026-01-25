import {
  forwardRef,
  useEffect,
  useRef,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalStyleVariant = 'default' | 'danger';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when the modal should close */
  onClose: () => void;
  /** Modal title */
  title?: ReactNode;
  /** Modal description (appears below title) */
  description?: ReactNode;
  /** Size of the modal */
  size?: ModalSize;
  /** Style variant of the modal */
  styleVariant?: ModalStyleVariant;
  /** Whether clicking the backdrop closes the modal */
  closeOnBackdropClick?: boolean;
  /** Whether pressing Escape closes the modal */
  closeOnEscape?: boolean;
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Footer content (typically action buttons) */
  footer?: ReactNode;
  /** Whether the modal content should scroll */
  scrollable?: boolean;
  /** Custom aria-labelledby (defaults to auto-generated title id) */
  'aria-labelledby'?: string;
  /** Custom aria-describedby */
  'aria-describedby'?: string;
  /** Children content */
  children?: ReactNode;
}

/**
 * Modal component for dialogs, confirmations, and overlays.
 *
 * Features:
 * - Multiple sizes (sm, md, lg, xl, full)
 * - Style variants (default, danger)
 * - Backdrop blur effect
 * - Slide-in animation
 * - Focus trap for accessibility
 * - Keyboard navigation (Escape to close)
 * - Backdrop click to close (optional)
 * - Portal rendering for proper stacking
 * - WCAG 2.1 AA compliant (role="dialog", aria-modal, focus management)
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      size = 'md',
      styleVariant = 'default',
      closeOnBackdropClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      footer,
      scrollable = false,
      className,
      children,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);
    const titleId = useRef(`modal-title-${Math.random().toString(36).slice(2, 9)}`);
    const descriptionId = useRef(`modal-desc-${Math.random().toString(36).slice(2, 9)}`);

    // Combine refs
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    // Handle escape key
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape' && closeOnEscape) {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }
      },
      [closeOnEscape, onClose]
    );

    // Handle backdrop click
    const handleBackdropClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) {
          onClose();
        }
      },
      [closeOnBackdropClick, onClose]
    );

    // Focus trap
    useEffect(() => {
      if (!open || !internalRef.current) return;

      // Store previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Get all focusable elements
      const getFocusableElements = () => {
        if (!internalRef.current) return [];
        return Array.from(
          internalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
      };

      // Focus first focusable element
      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];

      if (firstElement) {
        firstElement.focus();
      }

      // Trap focus within modal
      const handleTabKey = (e: globalThis.KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        const elements = getFocusableElements();
        const first = elements[0];
        const last = elements[elements.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      };

      document.addEventListener('keydown', handleTabKey);

      return () => {
        document.removeEventListener('keydown', handleTabKey);
        // Restore focus on close
        previousActiveElement.current?.focus();
      };
    }, [open]);

    // Lock body scroll when modal is open
    useEffect(() => {
      if (open) {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = originalOverflow;
        };
      }
    }, [open]);

    if (!open) return null;

    const classes = [
      'csk-modal',
      `csk-modal--${size}`,
      styleVariant !== 'default' && `csk-modal--${styleVariant}`,
      scrollable && 'csk-modal--scrollable',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const modal = (
      <div className="csk-modal__backdrop" onClick={handleBackdropClick}>
        <div
          ref={setRefs}
          role="dialog"
          aria-modal="true"
          aria-labelledby={ariaLabelledby || (title ? titleId.current : undefined)}
          aria-describedby={ariaDescribedby || (description ? descriptionId.current : undefined)}
          className={classes}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {(title || showCloseButton) && (
            <div className="csk-modal__header">
              {title && (
                <div className="csk-modal__title-wrapper">
                  <h2 id={titleId.current} className="csk-modal__title">
                    {title}
                  </h2>
                  {description && (
                    <p id={descriptionId.current} className="csk-modal__description">
                      {description}
                    </p>
                  )}
                </div>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className="csk-modal__close"
                  onClick={onClose}
                  aria-label="Zavřít dialog"
                >
                  <svg
                    className="csk-modal__close-icon"
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
            </div>
          )}

          <div className="csk-modal__body">{children}</div>

          {footer && <div className="csk-modal__footer">{footer}</div>}
        </div>
      </div>
    );

    // Render in portal for proper stacking
    return createPortal(modal, document.body);
  }
);

Modal.displayName = 'Modal';
