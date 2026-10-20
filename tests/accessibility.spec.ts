import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { applyQuarantine } from './quarantine';

/**
 * WCAG 2.1 AA Accessibility tests for design system components
 * Uses axe-core for automated accessibility testing
 */

applyQuarantine(test);

// Core components to test for accessibility
const coreComponents = [
  { name: 'Button', storyId: 'components-button--default' },
  { name: 'Button-Variants', storyId: 'components-button--variants' },
  { name: 'Input', storyId: 'components-input--default' },
  { name: 'Input-States', storyId: 'components-input--states' },
  { name: 'Select', storyId: 'components-select--default' },
  { name: 'Checkbox', storyId: 'components-checkbox--default' },
  { name: 'Radio', storyId: 'components-radio--default' },
  { name: 'Switch', storyId: 'components-switch--default' },
  { name: 'Card', storyId: 'components-card--default' },
  { name: 'Badge', storyId: 'components-badge--default' },
  { name: 'Avatar', storyId: 'components-avatar--default' },
  { name: 'Skeleton', storyId: 'components-skeleton--default' },
];

// Advanced components
const advancedComponents = [
  { name: 'Modal', storyId: 'components-modal--default' },
  { name: 'Tabs', storyId: 'components-tabs--default' },
  { name: 'Toast', storyId: 'components-toast--default' },
  { name: 'Pagination', storyId: 'components-pagination--default' },
  { name: 'Progress', storyId: 'components-progress--bar-default' },
  { name: 'Header', storyId: 'components-header--default' },
  { name: 'Dropdown', storyId: 'components-dropdown--default' },
  { name: 'EmptyState', storyId: 'components-emptystate--default' },
  { name: 'Table', storyId: 'components-table--default' },
  { name: 'Timeline', storyId: 'components-timeline--default' },
  { name: 'Dropzone', storyId: 'components-dropzone--default' },
];

// Specific components
const specificComponents = [
  { name: 'Calendar', storyId: 'components-calendar--default' },
  { name: 'ResultsTable', storyId: 'components-resultstable--default' },
  { name: 'StatusBadge-AllStates', storyId: 'components-statusbadge--all-states' },
  { name: 'StatusBadge-ProvisionalAndReview', storyId: 'components-statusbadge--provisional-and-review' },
  { name: 'MarkBadge-AllMarks', storyId: 'components-markbadge--all-marks' },
  { name: 'PenaltyChip-AllStates', storyId: 'components-penaltychip--all-states' },
  { name: 'PenaltyChip-GateNumbers', storyId: 'components-penaltychip--gate-numbers' },
  { name: 'GateGrid', storyId: 'components-gategrid--default' },
  { name: 'GateGrid-Unavailable', storyId: 'components-gategrid--unavailable' },
  { name: 'BibBadge', storyId: 'components-bibbadge--default' },
  { name: 'Notice-AllTones', storyId: 'components-notice--all-tones' },
  { name: 'StatTile', storyId: 'components-stattile--with-delta' },
  { name: 'States-Overview', storyId: 'states-overview--default' },
  { name: 'SegmentedControl', storyId: 'components-segmentedcontrol--default' },
  { name: 'SegmentedControl-Wrapping360', storyId: 'components-segmentedcontrol--wrapping-360' },
  { name: 'StarButton', storyId: 'components-starbutton--default' },
  { name: 'FavoritesToggle', storyId: 'components-favoritestoggle--default' },
  { name: 'FavoritesToggle-Counts', storyId: 'components-favoritestoggle--counts' },
  { name: 'TableToolbar', storyId: 'components-tabletoolbar--default' },
  { name: 'TimeValue', storyId: 'components-timevalue--observed-states' },
  { name: 'TimeValue-ClockFormat', storyId: 'components-timevalue--clock-format' },
  { name: 'RunningTime', storyId: 'components-runningtime--states' },
  { name: 'RunningTime-StateSwitching', storyId: 'components-runningtime--state-switching' },
  { name: 'EventHeader-StatusStates', storyId: 'components-eventheader--status-states' },
  { name: 'DataAge', storyId: 'components-dataage--overview' },
  { name: 'OnCoursePanel-ThreeRiders', storyId: 'components-oncoursepanel--three-riders' },
  { name: 'OnCoursePanel-SixRiders', storyId: 'components-oncoursepanel--six-riders' },
  { name: 'OnCoursePanel-Stale', storyId: 'components-oncoursepanel--stale' },
  { name: 'OnCoursePanel-TimeToBeat', storyId: 'components-oncoursepanel--time-to-beat' },
  { name: 'OnCoursePanel-Collapsed', storyId: 'components-oncoursepanel--collapsed' },
  { name: 'OnCoursePanel-RunningPenalty', storyId: 'components-oncoursepanel--running-penalty' },
  { name: 'Avatar-LargeAndRing', storyId: 'components-avatar--large-and-ring' },
  { name: 'Card-Highlight', storyId: 'components-card--highlight' },
  { name: 'Badge-OnDark', storyId: 'components-badge--on-dark' },
  { name: 'StatTile-OnDark', storyId: 'components-stattile--on-dark' },
  { name: 'ProfileHeader-Page', storyId: 'components-profileheader--page' },
  { name: 'ProfileHeader-Band', storyId: 'components-profileheader--band' },
  { name: 'SeasonSparkline', storyId: 'components-seasonsparkline--default' },
  { name: 'RivalsList', storyId: 'components-rivalslist--default' },
  { name: 'DeadlineBadge-AllKinds', storyId: 'components-deadlinebadge--all-kinds' },
  { name: 'WeekendCalendar', storyId: 'components-weekendcalendar--default' },
  { name: 'WeekendCalendar-InNarrowContainer', storyId: 'components-weekendcalendar--in-narrow-container' },
  // v2 T19 (T19b): Button link form, DocumentList, ResultsPanel, EventHeader logo/condensed, Avatar portrait, TableToolbar at 390
  { name: 'Button-AsLink', storyId: 'components-button--as-link' },
  { name: 'DocumentList', storyId: 'components-documentlist--default' },
  { name: 'DocumentList-KindsAndDates', storyId: 'components-documentlist--kinds-and-dates' },
  { name: 'ResultsPanel', storyId: 'components-resultspanel--default' },
  { name: 'ResultsPanel-Official', storyId: 'components-resultspanel--official' },
  { name: 'ResultsPanel-TableOnly', storyId: 'components-resultspanel--table-only' },
  { name: 'Avatar-Portrait', storyId: 'components-avatar--portrait' },
  { name: 'EventHeader-Condensed', storyId: 'components-eventheader--condensed' },
  { name: 'EventHeader-LogoShapes', storyId: 'components-eventheader--logo-shapes' },
  { name: 'TableToolbar-Crowded390', storyId: 'components-tabletoolbar--crowded-390' },
  { name: 'TableToolbar-OneRow390', storyId: 'components-tabletoolbar--one-row-390' },
  // v2 T19 (#84, live-mini comparison): compact DataAge (prefix and connection text visually hidden)
  { name: 'DataAge-Compact', storyId: 'components-dataage--compact' },
];

// Helper to run axe and check results
async function runA11yTest(
  page: import('@playwright/test').Page,
  storyId: string,
  componentName: string
) {
  await page.goto(`/iframe.html?id=${storyId}&viewMode=story`);
  await page.waitForSelector('#storybook-root', { state: 'visible' });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(300);

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  // Log violations for debugging
  if (accessibilityScanResults.violations.length > 0) {
    console.log(`\n${componentName} violations:`);
    for (const violation of accessibilityScanResults.violations) {
      console.log(`  - ${violation.id}: ${violation.description}`);
      console.log(`    Impact: ${violation.impact}`);
      console.log(`    Help: ${violation.helpUrl}`);
    }
  }

  return accessibilityScanResults;
}

test.describe('Accessibility - Core Components (Tier 1)', () => {
  for (const component of coreComponents) {
    test(`${component.name} - WCAG 2.1 AA (light)`, async ({ page }) => {
      const results = await runA11yTest(page, component.storyId, component.name);
      expect(results.violations).toEqual([]);
    });
  }
});

test.describe('Accessibility - Advanced Components (Tier 2)', () => {
  for (const component of advancedComponents) {
    test(`${component.name} - WCAG 2.1 AA (light)`, async ({ page }) => {
      const results = await runA11yTest(page, component.storyId, component.name);
      expect(results.violations).toEqual([]);
    });
  }
});

test.describe('Accessibility - Specific Components (Tier 3)', () => {
  for (const component of specificComponents) {
    test(`${component.name} - WCAG 2.1 AA (light)`, async ({ page }) => {
      const results = await runA11yTest(page, component.storyId, component.name);
      expect(results.violations).toEqual([]);
    });
  }
});

// Focused keyboard navigation tests
test.describe('Keyboard Navigation', () => {
  test('Button - focusable and activatable', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('#storybook-root', { state: 'visible' });

    // Tab to button
    await page.keyboard.press('Tab');
    const focusedButton = page.locator('.csk-button:focus');
    await expect(focusedButton).toBeVisible();

    // Check focus ring is visible
    const focusRing = await focusedButton.evaluate(
      (el) => window.getComputedStyle(el).outlineStyle
    );
    expect(focusRing).not.toBe('none');
  });

  test('Input - focusable with visible focus state', async ({ page }) => {
    await page.goto('/iframe.html?id=components-input--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForLoadState('networkidle');

    // Tab to input
    await page.keyboard.press('Tab');
    const focusedInput = page.locator('.csk-input:focus');
    await expect(focusedInput).toBeVisible();
  });

  test('Checkbox - keyboard toggle with Space', async ({ page }) => {
    await page.goto('/iframe.html?id=components-checkbox--default&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('#storybook-root', { state: 'visible' });

    // Tab to checkbox
    await page.keyboard.press('Tab');
    const checkbox = page.locator('input.csk-checkbox');
    await expect(checkbox).toBeFocused();

    // Toggle with Space
    const initialChecked = await checkbox.isChecked();
    await page.keyboard.press('Space');
    const afterChecked = await checkbox.isChecked();
    expect(afterChecked).toBe(!initialChecked);
  });

  test('Switch - keyboard toggle with Space', async ({ page }) => {
    await page.goto('/iframe.html?id=components-switch--default&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('#storybook-root', { state: 'visible' });

    // Tab to switch
    await page.keyboard.press('Tab');
    const switchInput = page.locator('input.csk-switch');
    await expect(switchInput).toBeFocused();

    // Toggle with Space
    const initialChecked = await switchInput.isChecked();
    await page.keyboard.press('Space');
    const afterChecked = await switchInput.isChecked();
    expect(afterChecked).toBe(!initialChecked);
  });

  test('Tabs - keyboard navigation with arrows', async ({ page }) => {
    await page.goto('/iframe.html?id=components-tabs--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });

    // Tab to first tab
    await page.keyboard.press('Tab');
    const tabList = page.locator('[role="tablist"]');
    await expect(tabList).toBeVisible();

    // First tab should be focused
    const firstTab = page.locator('[role="tab"]').first();
    await expect(firstTab).toBeFocused();

    // Arrow right should move to next tab
    await page.keyboard.press('ArrowRight');
    const secondTab = page.locator('[role="tab"]').nth(1);
    await expect(secondTab).toBeFocused();
  });

  test('Modal - focus trap when open', async ({ page }) => {
    await page.goto('/iframe.html?id=components-modal--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });

    // Check if modal is visible (story shows open modal by default)
    const modal = page.locator('.csk-modal');
    const isVisible = await modal.isVisible().catch(() => false);

    if (isVisible) {
      // Tab should cycle within modal
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      const isInsideModal = await focusedElement.evaluate((el) => {
        return el.closest('.csk-modal') !== null;
      });
      expect(isInsideModal).toBe(true);
    }
  });

  test('Pagination - keyboard navigation', async ({ page }) => {
    await page.goto('/iframe.html?id=components-pagination--default&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.csk-pagination', { state: 'visible' });

    // Tab to pagination
    await page.keyboard.press('Tab');
    const pagination = page.locator('.csk-pagination');
    await expect(pagination).toBeVisible();

    // Check that a page button or nav button is focused
    const focusedElement = page.locator('.csk-pagination :focus');
    await expect(focusedElement).toBeVisible();
  });
});

// Color contrast tests
test.describe('Color Contrast', () => {
  test('Badge variants have sufficient contrast', async ({ page }) => {
    await page.goto('/iframe.html?id=components-badge--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    // let Storybook's own axe run settle, otherwise axe reports "already running"
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('.csk-badge')
      .analyze();

    expect(results.violations.filter((v) => v.id === 'color-contrast')).toEqual([]);
  });

  test('Button variants have sufficient contrast', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--variants&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    // let Storybook's own axe run settle, otherwise axe reports "already running"
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('.csk-button')
      .analyze();

    expect(results.violations.filter((v) => v.id === 'color-contrast')).toEqual([]);
  });


});
