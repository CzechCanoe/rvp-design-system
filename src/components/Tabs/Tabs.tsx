import {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useId,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import { useIsomorphicLayoutEffect } from '../../hooks';
import './Tabs.css';

export type TabsVariant = 'line' | 'pills' | 'nav';
export type TabsSize = 'sm' | 'md';
export type TabsOverflow = 'wrap' | 'scroll' | 'carousel';

/** Reads `prefers-reduced-motion` without assuming `matchMedia` exists (SSR, jsdom). */
function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export interface TabItem {
  /** Unique identifier for the tab */
  id: string;
  /** Label displayed in the tab button */
  label: ReactNode;
  /** Content displayed when the tab is active (not used by `variant="nav"`, which has no panels) */
  content?: ReactNode;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Optional icon to display before the label */
  icon?: ReactNode;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Array of tab items */
  tabs: TabItem[];
  /** Currently active tab ID (controlled) */
  activeTab?: string;
  /** Default active tab ID (uncontrolled) */
  defaultActiveTab?: string;
  /** Callback when active tab changes */
  onChange?: (tabId: string) => void;
  /** Visual variant */
  variant?: TabsVariant;
  /** Size of the tabs */
  size?: TabsSize;
  /** Whether tabs should stretch to fill container width */
  fullWidth?: boolean;
  /** Orientation - currently only horizontal is supported */
  orientation?: 'horizontal';
  /**
   * What happens when the tabs do not fit:
   * `wrap` (default) wraps to more lines, `scroll` scrolls horizontally,
   * `carousel` scrolls with an edge mask and arrows and keeps the active tab in view.
   */
  overflow?: TabsOverflow;
  /** Accessible label of the previous arrow (carousel only) */
  previousLabel?: string;
  /** Accessible label of the next arrow (carousel only) */
  nextLabel?: string;
}

/**
 * Tabs component for organizing content into switchable panels.
 *
 * Features:
 * - Three variants: line, pills, nav (navigation chips without panels)
 * - Two sizes: sm, md
 * - Overflow handling: wrap, scroll, carousel (edge mask, arrows, active tab scrolled into view)
 * - Animated underline for the line variant
 * - Full width option for equal tab widths
 * - Keyboard navigation (Arrow keys, Home, End)
 * - WCAG 2.1 AA compliant (role="tablist", aria-selected, focus management)
 * - Controlled and uncontrolled modes
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      tabs,
      activeTab: controlledActiveTab,
      defaultActiveTab,
      onChange,
      variant = 'line',
      size = 'md',
      fullWidth = false,
      orientation = 'horizontal',
      overflow = 'wrap',
      previousLabel = 'Předchozí',
      nextLabel = 'Další',
      className,
      ...props
    },
    ref
  ) => {
    const uniqueId = useId();
    const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
    const listRef = useRef<HTMLDivElement>(null);
    const hasPanels = variant !== 'nav';
    const isCarousel = overflow === 'carousel';
    const [canScrollStart, setCanScrollStart] = useState(false);
    const [canScrollEnd, setCanScrollEnd] = useState(false);

    // Determine initial active tab
    const getInitialTab = () => {
      if (controlledActiveTab) return controlledActiveTab;
      if (defaultActiveTab) return defaultActiveTab;
      const firstEnabled = tabs.find((tab) => !tab.disabled);
      return firstEnabled?.id || tabs[0]?.id || '';
    };

    const [internalActiveTab, setInternalActiveTab] = useState(getInitialTab);

    // Use controlled or internal state
    const activeTabId = controlledActiveTab ?? internalActiveTab;

    const handleTabClick = useCallback(
      (tabId: string) => {
        const tab = tabs.find((t) => t.id === tabId);
        if (tab?.disabled) return;

        if (controlledActiveTab === undefined) {
          setInternalActiveTab(tabId);
        }
        onChange?.(tabId);
      },
      [tabs, controlledActiveTab, onChange]
    );

    // Get enabled tabs for keyboard navigation
    const getEnabledTabs = useCallback(() => {
      return tabs.filter((tab) => !tab.disabled);
    }, [tabs]);

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        const enabledTabs = getEnabledTabs();
        const currentIndex = enabledTabs.findIndex((tab) => tab.id === activeTabId);

        let nextIndex: number | null = null;

        switch (e.key) {
          case 'ArrowLeft':
          case 'ArrowUp':
            e.preventDefault();
            nextIndex = currentIndex > 0 ? currentIndex - 1 : enabledTabs.length - 1;
            break;
          case 'ArrowRight':
          case 'ArrowDown':
            e.preventDefault();
            nextIndex = currentIndex < enabledTabs.length - 1 ? currentIndex + 1 : 0;
            break;
          case 'Home':
            e.preventDefault();
            nextIndex = 0;
            break;
          case 'End':
            e.preventDefault();
            nextIndex = enabledTabs.length - 1;
            break;
          default:
            return;
        }

        if (nextIndex !== null && enabledTabs[nextIndex]) {
          const nextTab = enabledTabs[nextIndex];
          handleTabClick(nextTab.id);
          tabRefs.current.get(nextTab.id)?.focus();
        }
      },
      [activeTabId, getEnabledTabs, handleTabClick]
    );

    const updateScrollState = useCallback(() => {
      const list = listRef.current;
      if (!list) return;
      setCanScrollStart(list.scrollLeft > 1);
      setCanScrollEnd(list.scrollLeft + list.clientWidth < list.scrollWidth - 1);
    }, []);

    // Track whether there is more to scroll to on either side (edge mask + arrows).
    useIsomorphicLayoutEffect(() => {
      if (!isCarousel) {
        setCanScrollStart(false);
        setCanScrollEnd(false);
        return;
      }
      const list = listRef.current;
      if (!list) return;
      updateScrollState();
      list.addEventListener('scroll', updateScrollState, { passive: true });
      let observer: ResizeObserver | undefined;
      if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(updateScrollState);
        observer.observe(list);
      }
      return () => {
        list.removeEventListener('scroll', updateScrollState);
        observer?.disconnect();
      };
    }, [isCarousel, tabs.length, updateScrollState]);

    // Bring the active tab into view (centered) when it changes. Scrolls only the list,
    // never the page, and skips the animation for the first paint and for reduced motion.
    const hasMounted = useRef(false);
    useIsomorphicLayoutEffect(() => {
      const first = !hasMounted.current;
      hasMounted.current = true;
      if (!isCarousel) return;
      const list = listRef.current;
      const tab = tabRefs.current.get(activeTabId);
      if (!list || !tab) return;
      const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
      const target = Math.max(0, Math.min(left, list.scrollWidth - list.clientWidth));
      if (typeof list.scrollTo === 'function') {
        list.scrollTo({ left: target, behavior: first || prefersReducedMotion() ? 'auto' : 'smooth' });
      } else {
        list.scrollLeft = target;
      }
    }, [activeTabId, isCarousel, tabs.length]);

    const scrollByPage = (direction: 1 | -1) => {
      const list = listRef.current;
      if (!list) return;
      const left = direction * list.clientWidth * 0.8;
      if (typeof list.scrollBy === 'function') {
        list.scrollBy({ left, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      } else {
        list.scrollLeft += left;
      }
    };

    const classes = [
      'csk-tabs',
      `csk-tabs--${variant}`,
      `csk-tabs--${size}`,
      `csk-tabs--overflow-${overflow}`,
      fullWidth && 'csk-tabs--full-width',
      canScrollStart && 'csk-tabs--can-scroll-start',
      canScrollEnd && 'csk-tabs--can-scroll-end',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const getTabId = (tabId: string) => `${uniqueId}-tab-${tabId}`;
    const getPanelId = (tabId: string) => `${uniqueId}-panel-${tabId}`;

    return (
      <div ref={ref} className={classes} data-orientation={orientation} {...props}>
        <div className="csk-tabs__viewport">
          <div
            role="tablist"
            aria-orientation={orientation}
            className="csk-tabs__list"
            ref={listRef}
            onKeyDown={handleKeyDown}
          >
            {tabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              const tabClasses = [
                'csk-tabs__tab',
                isActive && 'csk-tabs__tab--active',
                tab.disabled && 'csk-tabs__tab--disabled',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    if (el) {
                      tabRefs.current.set(tab.id, el);
                    } else {
                      tabRefs.current.delete(tab.id);
                    }
                  }}
                  role="tab"
                  type="button"
                  id={getTabId(tab.id)}
                  aria-selected={isActive}
                  aria-controls={hasPanels ? getPanelId(tab.id) : undefined}
                  aria-disabled={tab.disabled}
                  tabIndex={isActive ? 0 : -1}
                  className={tabClasses}
                  onClick={() => handleTabClick(tab.id)}
                  disabled={tab.disabled}
                >
                  {tab.icon && <span className="csk-tabs__icon">{tab.icon}</span>}
                  <span className="csk-tabs__label">{tab.label}</span>
                </button>
              );
            })}
          </div>
          {isCarousel && canScrollStart && (
            <button
              type="button"
              tabIndex={-1}
              aria-label={previousLabel}
              className="csk-tabs__arrow csk-tabs__arrow--start"
              onClick={() => scrollByPage(-1)}
            >
              <span aria-hidden="true">‹</span>
            </button>
          )}
          {isCarousel && canScrollEnd && (
            <button
              type="button"
              tabIndex={-1}
              aria-label={nextLabel}
              className="csk-tabs__arrow csk-tabs__arrow--end"
              onClick={() => scrollByPage(1)}
            >
              <span aria-hidden="true">›</span>
            </button>
          )}
        </div>

        {hasPanels && tabs.map((tab) => {
          const isActive = tab.id === activeTabId;

          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={getPanelId(tab.id)}
              aria-labelledby={getTabId(tab.id)}
              tabIndex={0}
              className="csk-tabs__panel"
              hidden={!isActive}
            >
              {isActive && tab.content}
            </div>
          );
        })}
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';
