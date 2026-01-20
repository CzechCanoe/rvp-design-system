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
import './Tabs.css';

export type TabsVariant = 'line' | 'pills' | 'gradient' | 'gradient-line' | 'glass';
export type TabsSize = 'sm' | 'md' | 'lg';

export interface TabItem {
  /** Unique identifier for the tab */
  id: string;
  /** Label displayed in the tab button */
  label: ReactNode;
  /** Content displayed when the tab is active */
  content: ReactNode;
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
}

/**
 * Tabs component for organizing content into switchable panels.
 *
 * Features:
 * - Five variants: line, pills, gradient, gradient-line, glass
 * - Three sizes: sm, md, lg
 * - Animated underline for line variants
 * - Gradient backgrounds for gradient variants
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
      className,
      ...props
    },
    ref
  ) => {
    const uniqueId = useId();
    const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

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

    const classes = [
      'csk-tabs',
      `csk-tabs--${variant}`,
      `csk-tabs--${size}`,
      fullWidth && 'csk-tabs--full-width',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const getTabId = (tabId: string) => `${uniqueId}-tab-${tabId}`;
    const getPanelId = (tabId: string) => `${uniqueId}-panel-${tabId}`;

    return (
      <div ref={ref} className={classes} data-orientation={orientation} {...props}>
        <div
          role="tablist"
          aria-orientation={orientation}
          className="csk-tabs__list"
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
                aria-controls={getPanelId(tab.id)}
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

        {tabs.map((tab) => {
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
