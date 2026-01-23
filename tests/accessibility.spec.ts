import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * WCAG 2.1 AA Accessibility tests for design system components
 * Uses axe-core for automated accessibility testing
 */

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
  { name: 'Toast', storyId: 'components-toast--all-style-variants' },
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
  { name: 'LiveIndicator', storyId: 'components-liveindicator--default' },
  { name: 'StatCard', storyId: 'components-statcard--default' },
  { name: 'AthleteCard', storyId: 'components-athletecard--default' },
];

// Prototype pages to test
const prototypes = [
  { name: 'LivePage-Embed', storyId: 'prototypes-livepage--embed' },
  { name: 'ResultsPage-Embed', storyId: 'prototypes-resultspage--embed' },
  { name: 'CalendarPage-Embed', storyId: 'prototypes-calendarpage--embed' },
  { name: 'EventDetailPage-Embed', storyId: 'prototypes-eventdetailpage--embed' },
  { name: 'ProfilePage', storyId: 'prototypes-profilepage--satellite' },
  { name: 'DashboardPage', storyId: 'prototypes-dashboardpage--satellite' },
];

// Helper to run axe and check results
async function runA11yTest(
  page: import('@playwright/test').Page,
  storyId: string,
  componentName: string,
  theme: 'light' | 'dark' = 'light'
) {
  const themeParam = theme === 'dark' ? '&globals=theme:dark' : '';
  await page.goto(`/iframe.html?id=${storyId}&viewMode=story${themeParam}`);
  await page.waitForSelector('#storybook-root', { state: 'visible' });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(300);

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  // Log violations for debugging
  if (accessibilityScanResults.violations.length > 0) {
    console.log(`\n${componentName} (${theme}) violations:`);
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
      const results = await runA11yTest(page, component.storyId, component.name, 'light');
      expect(results.violations).toEqual([]);
    });

    test(`${component.name} - WCAG 2.1 AA (dark)`, async ({ page }) => {
      const results = await runA11yTest(page, component.storyId, component.name, 'dark');
      expect(results.violations).toEqual([]);
    });
  }
});

test.describe('Accessibility - Advanced Components (Tier 2)', () => {
  for (const component of advancedComponents) {
    test(`${component.name} - WCAG 2.1 AA (light)`, async ({ page }) => {
      const results = await runA11yTest(page, component.storyId, component.name, 'light');
      expect(results.violations).toEqual([]);
    });

    test(`${component.name} - WCAG 2.1 AA (dark)`, async ({ page }) => {
      const results = await runA11yTest(page, component.storyId, component.name, 'dark');
      expect(results.violations).toEqual([]);
    });
  }
});

test.describe('Accessibility - Specific Components (Tier 3)', () => {
  for (const component of specificComponents) {
    test(`${component.name} - WCAG 2.1 AA (light)`, async ({ page }) => {
      const results = await runA11yTest(page, component.storyId, component.name, 'light');
      expect(results.violations).toEqual([]);
    });

    test(`${component.name} - WCAG 2.1 AA (dark)`, async ({ page }) => {
      const results = await runA11yTest(page, component.storyId, component.name, 'dark');
      expect(results.violations).toEqual([]);
    });
  }
});

test.describe('Accessibility - Prototypes', () => {
  for (const prototype of prototypes) {
    test(`${prototype.name} - WCAG 2.1 AA (light)`, async ({ page }) => {
      const results = await runA11yTest(page, prototype.storyId, prototype.name, 'light');
      expect(results.violations).toEqual([]);
    });

    test(`${prototype.name} - WCAG 2.1 AA (dark)`, async ({ page }) => {
      const results = await runA11yTest(page, prototype.storyId, prototype.name, 'dark');
      expect(results.violations).toEqual([]);
    });
  }
});

// Focused keyboard navigation tests
test.describe('Keyboard Navigation', () => {
  test('Button - focusable and activatable', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default&viewMode=story');
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

    // Tab to input
    await page.keyboard.press('Tab');
    const focusedInput = page.locator('.csk-input:focus');
    await expect(focusedInput).toBeVisible();
  });

  test('Checkbox - keyboard toggle with Space', async ({ page }) => {
    await page.goto('/iframe.html?id=components-checkbox--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });

    // Tab to checkbox
    await page.keyboard.press('Tab');
    const checkbox = page.locator('.csk-checkbox__input');
    await expect(checkbox).toBeFocused();

    // Toggle with Space
    const initialChecked = await checkbox.isChecked();
    await page.keyboard.press('Space');
    const afterChecked = await checkbox.isChecked();
    expect(afterChecked).toBe(!initialChecked);
  });

  test('Switch - keyboard toggle with Space', async ({ page }) => {
    await page.goto('/iframe.html?id=components-switch--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });

    // Tab to switch
    await page.keyboard.press('Tab');
    const switchInput = page.locator('.csk-switch__input');
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
    await page.waitForSelector('#storybook-root', { state: 'visible' });

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

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('.csk-badge')
      .analyze();

    expect(results.violations.filter((v) => v.id === 'color-contrast')).toEqual([]);
  });

  test('Button variants have sufficient contrast', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--variants&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('.csk-button')
      .analyze();

    expect(results.violations.filter((v) => v.id === 'color-contrast')).toEqual([]);
  });

  test('Card variants have sufficient contrast (dark mode)', async ({ page }) => {
    await page.goto(
      '/iframe.html?id=components-card--variants&viewMode=story&globals=theme:dark'
    );
    await page.waitForSelector('#storybook-root', { state: 'visible' });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('.csk-card')
      .analyze();

    expect(results.violations.filter((v) => v.id === 'color-contrast')).toEqual([]);
  });

  test('StatCard has sufficient contrast in both themes', async ({ page }) => {
    // Light mode
    await page.goto('/iframe.html?id=components-statcard--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });

    const lightResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('.csk-stat-card')
      .analyze();

    expect(lightResults.violations.filter((v) => v.id === 'color-contrast')).toEqual([]);

    // Dark mode
    await page.goto(
      '/iframe.html?id=components-statcard--default&viewMode=story&globals=theme:dark'
    );
    await page.waitForSelector('#storybook-root', { state: 'visible' });

    const darkResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('.csk-stat-card')
      .analyze();

    expect(darkResults.violations.filter((v) => v.id === 'color-contrast')).toEqual([]);
  });
});
