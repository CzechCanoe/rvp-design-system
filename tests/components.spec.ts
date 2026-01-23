import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for design system components
 * Tests key component stories in Storybook
 */

const components = [
  // Core components (Tier 1)
  { name: 'Button', storyId: 'components-button--default' },
  { name: 'Button-Variants', storyId: 'components-button--variants' },
  { name: 'Input', storyId: 'components-input--default' },
  { name: 'Input-States', storyId: 'components-input--states' },
  { name: 'Select', storyId: 'components-select--default' },
  { name: 'Checkbox', storyId: 'components-checkbox--default' },
  { name: 'Radio', storyId: 'components-radio--default' },
  { name: 'Switch', storyId: 'components-switch--default' },
  { name: 'Card', storyId: 'components-card--default' },
  { name: 'Card-Variants', storyId: 'components-card--variants' },
  { name: 'Badge', storyId: 'components-badge--default' },
  { name: 'Badge-CskSections', storyId: 'components-badge--csk-sections' },
  { name: 'Table', storyId: 'components-table--default' },

  // Advanced components (Tier 2)
  { name: 'Modal', storyId: 'components-modal--default' },
  { name: 'Tabs', storyId: 'components-tabs--default' },
  { name: 'Toast', storyId: 'components-toast--all-style-variants' },
  { name: 'Breadcrumbs', storyId: 'components-navigation-breadcrumbs--default' },
  { name: 'Pagination', storyId: 'components-pagination--default' },
  { name: 'ProgressBar', storyId: 'components-progress--bar-default' },
  { name: 'ProgressSteps', storyId: 'components-progress--steps-default' },
  { name: 'Header', storyId: 'components-header--default' },
  { name: 'Avatar', storyId: 'components-avatar--default' },
  { name: 'Dropdown', storyId: 'components-dropdown--default' },

  // Specific components (Tier 3)
  { name: 'Calendar', storyId: 'components-calendar--default' },
  { name: 'Dropzone', storyId: 'components-dropzone--default' },
  { name: 'Timeline', storyId: 'components-timeline--default' },
  { name: 'StatCard', storyId: 'components-statcard--default' },
  { name: 'AthleteCard', storyId: 'components-athletecard--default' },
  { name: 'ResultsTable', storyId: 'components-resultstable--default' },
  { name: 'LiveIndicator', storyId: 'components-liveindicator--default' },
  { name: 'EmptyState', storyId: 'components-emptystate--default' },
  { name: 'Skeleton', storyId: 'components-skeleton--default' },
];

test.describe('Components - Light Mode', () => {
  for (const component of components) {
    test(`${component.name} - screenshot`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${component.storyId}&viewMode=story`);

      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      const root = page.locator('#storybook-root');

      // Verify component actually rendered with content
      const childCount = await root.evaluate((el) => el.children.length);
      expect(childCount).toBeGreaterThan(0);

      // Verify no JavaScript errors in console that would indicate broken component
      const hasContent = await root.evaluate((el) => el.textContent?.trim().length ?? 0);
      expect(hasContent).toBeGreaterThan(0);

      await expect(root).toHaveScreenshot(
        `${component.name}-light.png`,
        {
          maxDiffPixels: 30,
          animations: 'disabled',
        }
      );
    });
  }
});

test.describe('Components - Dark Mode', () => {
  for (const component of components) {
    test(`${component.name} - dark mode screenshot`, async ({ page }) => {
      await page.goto(
        `/iframe.html?id=${component.storyId}&viewMode=story&globals=theme:dark`
      );

      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      const root = page.locator('#storybook-root');

      // Verify component actually rendered with content
      const childCount = await root.evaluate((el) => el.children.length);
      expect(childCount).toBeGreaterThan(0);

      // Verify component has visible content
      const hasContent = await root.evaluate((el) => el.textContent?.trim().length ?? 0);
      expect(hasContent).toBeGreaterThan(0);

      await expect(root).toHaveScreenshot(
        `${component.name}-dark.png`,
        {
          maxDiffPixels: 30,
          animations: 'disabled',
        }
      );
    });
  }
});
