import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import './Dropdown.css';

export type DropdownPosition =
  | 'bottom-start'
  | 'bottom-end'
  | 'top-start'
  | 'top-end';

export type DropdownSize = 'sm' | 'md' | 'lg';

export interface DropdownItem {
  /** Unique identifier for the item */
  id: string;
  /** Display label */
  label: ReactNode;
  /** Icon to display before the label */
  icon?: ReactNode;
  /** Description text below the label */
  description?: string;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Whether this is a divider (label is ignored) */
  divider?: boolean;
  /** Link href (renders as <a>) */
  href?: string;
  /** onClick handler */
  onClick?: () => void;
  /** Whether to close dropdown after click (default: true) */
  closeOnClick?: boolean;
  /** Variant for visual styling */
  variant?: 'default' | 'danger';
}

export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Trigger element that opens the dropdown */
  trigger: ReactNode;
  /** Dropdown menu items */
  items: DropdownItem[];
  /** Position of the dropdown relative to trigger */
  position?: DropdownPosition;
  /** Size of the dropdown */
  size?: DropdownSize;
  /** Whether the dropdown is open (controlled mode) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Minimum width of the dropdown (defaults to trigger width) */
  minWidth?: number | 'trigger';
  /** Maximum height before scrolling */
  maxHeight?: number;
  /** Whether to disable the dropdown */
  disabled?: boolean;
  /** Accessible label for the menu */
  'aria-label'?: string;
}

/**
 * Dropdown component for menus and action lists.
 *
 * Features:
 * - Multiple positions (bottom-start, bottom-end, top-start, top-end)
 * - Controlled and uncontrolled modes
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Focus management
 * - Outside click to close
 * - Portal rendering for proper stacking
 * - WCAG 2.1 AA compliant
 */
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      trigger,
      items,
      position = 'bottom-start',
      size = 'md',
      open: controlledOpen,
      onOpenChange,
      minWidth = 'trigger',
      maxHeight = 300,
      disabled = false,
      className,
      'aria-label': ariaLabel = 'Menu',
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [computedMinWidth, setComputedMinWidth] = useState<number | undefined>();

    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLElement | null)[]>([]);

    const triggerId = useId();
    const menuId = useId();

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    // Get focusable items (non-disabled, non-divider)
    const focusableItems = items.filter((item) => !item.divider && !item.disabled);

    const setOpen = useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setInternalOpen(value);
        }
        onOpenChange?.(value);
      },
      [isControlled, onOpenChange]
    );

    const handleTriggerClick = useCallback(() => {
      if (disabled) return;
      setOpen(!isOpen);
    }, [disabled, isOpen, setOpen]);

    const handleTriggerKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          setOpen(true);
          setFocusedIndex(e.key === 'ArrowDown' ? 0 : focusableItems.length - 1);
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen(!isOpen);
        } else if (e.key === 'Escape') {
          setOpen(false);
        }
      },
      [disabled, isOpen, setOpen, focusableItems.length]
    );

    const handleMenuKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
          case 'ArrowDown': {
            e.preventDefault();
            setFocusedIndex((prev) => {
              const next = prev + 1;
              return next >= focusableItems.length ? 0 : next;
            });
            break;
          }
          case 'ArrowUp': {
            e.preventDefault();
            setFocusedIndex((prev) => {
              const next = prev - 1;
              return next < 0 ? focusableItems.length - 1 : next;
            });
            break;
          }
          case 'Home': {
            e.preventDefault();
            setFocusedIndex(0);
            break;
          }
          case 'End': {
            e.preventDefault();
            setFocusedIndex(focusableItems.length - 1);
            break;
          }
          case 'Escape': {
            e.preventDefault();
            setOpen(false);
            triggerRef.current?.focus();
            break;
          }
          case 'Tab': {
            setOpen(false);
            break;
          }
          case 'Enter':
          case ' ': {
            e.preventDefault();
            const focusedItem = focusableItems[focusedIndex];
            if (focusedItem && !focusedItem.disabled) {
              handleItemClick(focusedItem);
            }
            break;
          }
        }
      },
      [focusableItems, focusedIndex, setOpen]
    );

    const handleItemClick = useCallback(
      (item: DropdownItem) => {
        if (item.disabled || item.divider) return;

        item.onClick?.();

        if (item.closeOnClick !== false) {
          setOpen(false);
          triggerRef.current?.focus();
        }
      },
      [setOpen]
    );

    const handleItemMouseEnter = useCallback(
      (item: DropdownItem) => {
        if (item.divider || item.disabled) return;
        const index = focusableItems.findIndex((i) => i.id === item.id);
        if (index !== -1) {
          setFocusedIndex(index);
        }
      },
      [focusableItems]
    );

    // Calculate menu position
    useEffect(() => {
      if (!isOpen || !triggerRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();

      // Set min width based on trigger width
      if (minWidth === 'trigger') {
        setComputedMinWidth(triggerRect.width);
      } else {
        setComputedMinWidth(minWidth);
      }

      let top: number;
      let left: number;

      // Calculate position based on preference
      const isTop = position.startsWith('top');
      const isEnd = position.endsWith('end');

      if (isTop) {
        top = triggerRect.top + window.scrollY;
      } else {
        top = triggerRect.bottom + window.scrollY;
      }

      if (isEnd) {
        left = triggerRect.right + window.scrollX;
      } else {
        left = triggerRect.left + window.scrollX;
      }

      // Adjust for viewport boundaries (basic collision detection)
      // This is simplified - a full implementation would use floating-ui
      setMenuPosition({ top, left });
    }, [isOpen, position, minWidth]);

    // Focus management for menu items
    useEffect(() => {
      if (isOpen && focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
        itemRefs.current[focusedIndex]?.focus();
      }
    }, [isOpen, focusedIndex]);

    // Reset focused index when opening
    useEffect(() => {
      if (isOpen) {
        setFocusedIndex(-1);
      }
    }, [isOpen]);

    // Outside click handler
    useEffect(() => {
      if (!isOpen) return;

      const handleOutsideClick = (e: globalThis.MouseEvent) => {
        const target = e.target as Node;
        if (
          triggerRef.current?.contains(target) ||
          menuRef.current?.contains(target)
        ) {
          return;
        }
        setOpen(false);
      };

      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isOpen, setOpen]);

    const containerClasses = ['csk-dropdown', disabled && 'csk-dropdown--disabled', className]
      .filter(Boolean)
      .join(' ');

    const menuClasses = [
      'csk-dropdown__menu',
      `csk-dropdown__menu--${size}`,
      `csk-dropdown__menu--${position}`,
    ]
      .filter(Boolean)
      .join(' ');

    // Render item based on type
    const renderItem = (item: DropdownItem) => {
      if (item.divider) {
        return (
          <div
            key={item.id}
            className="csk-dropdown__divider"
            role="separator"
          />
        );
      }

      const focusableIndex = focusableItems.findIndex((i) => i.id === item.id);
      const isFocused = focusableIndex === focusedIndex;

      const itemClasses = [
        'csk-dropdown__item',
        item.disabled && 'csk-dropdown__item--disabled',
        item.variant === 'danger' && 'csk-dropdown__item--danger',
        isFocused && 'csk-dropdown__item--focused',
      ]
        .filter(Boolean)
        .join(' ');

      const commonProps = {
        className: itemClasses,
        role: 'menuitem',
        tabIndex: isFocused ? 0 : -1,
        'aria-disabled': item.disabled,
        onMouseEnter: () => handleItemMouseEnter(item),
        ref: (el: HTMLElement | null) => {
          if (focusableIndex !== -1) {
            itemRefs.current[focusableIndex] = el;
          }
        },
      };

      const content = (
        <>
          {item.icon && (
            <span className="csk-dropdown__item-icon" aria-hidden="true">
              {item.icon}
            </span>
          )}
          <span className="csk-dropdown__item-content">
            <span className="csk-dropdown__item-label">{item.label}</span>
            {item.description && (
              <span className="csk-dropdown__item-description">
                {item.description}
              </span>
            )}
          </span>
        </>
      );

      if (item.href && !item.disabled) {
        return (
          <a
            key={item.id}
            href={item.href}
            {...commonProps}
            onClick={() => {
              if (item.closeOnClick !== false) {
                setOpen(false);
              }
              item.onClick?.();
            }}
          >
            {content}
          </a>
        );
      }

      return (
        <button
          key={item.id}
          type="button"
          {...commonProps}
          disabled={item.disabled}
          onClick={() => handleItemClick(item)}
        >
          {content}
        </button>
      );
    };

    const menu = isOpen && (
      <div
        ref={menuRef}
        id={menuId}
        role="menu"
        aria-label={ariaLabel}
        aria-labelledby={triggerId}
        className={menuClasses}
        style={{
          position: 'absolute',
          top: menuPosition.top,
          left: position.endsWith('end') ? 'auto' : menuPosition.left,
          right: position.endsWith('end')
            ? `${window.innerWidth - menuPosition.left}px`
            : 'auto',
          minWidth: computedMinWidth,
          maxHeight,
          transform: position.startsWith('top') ? 'translateY(-100%)' : undefined,
        }}
        onKeyDown={handleMenuKeyDown}
      >
        <div className="csk-dropdown__menu-content">
          {items.map((item) => renderItem(item))}
        </div>
      </div>
    );

    return (
      <div ref={ref} className={containerClasses} {...props}>
        <button
          ref={triggerRef}
          id={triggerId}
          type="button"
          className="csk-dropdown__trigger"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={isOpen ? menuId : undefined}
          disabled={disabled}
          onClick={handleTriggerClick}
          onKeyDown={handleTriggerKeyDown}
        >
          {trigger}
        </button>

        {createPortal(menu, document.body)}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

/**
 * Pre-styled dropdown trigger button with chevron icon.
 */
export interface DropdownButtonProps extends HTMLAttributes<HTMLSpanElement> {
  /** Button label */
  children: ReactNode;
  /** Size of the button */
  size?: DropdownSize;
  /** Variant styling */
  variant?: 'default' | 'primary' | 'ghost';
  /** Whether dropdown is open (for chevron rotation) */
  open?: boolean;
}

export const DropdownButton = forwardRef<HTMLSpanElement, DropdownButtonProps>(
  ({ children, size = 'md', variant = 'default', open, className, ...props }, ref) => {
    const classes = [
      'csk-dropdown-button',
      `csk-dropdown-button--${size}`,
      `csk-dropdown-button--${variant}`,
      open && 'csk-dropdown-button--open',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classes} {...props}>
        <span className="csk-dropdown-button__label">{children}</span>
        <svg
          className="csk-dropdown-button__chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    );
  }
);

DropdownButton.displayName = 'DropdownButton';
