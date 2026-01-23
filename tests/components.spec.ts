import { test, expect } from '@playwright/test';
import { allComponents, testDefaults } from './config';

/**
 * Visual regression tests for design system components
 * Tests all components in both light and dark modes
 *
 * Uses central config from ./config.ts for story IDs
 */

test.describe('Components - Light Mode', () => {
  for (const component of allComponents) {
    test(`${component.name} - screenshot`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${component.storyId}&viewMode=story`);

      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(testDefaults.settleTime);

      const root = page.locator('#storybook-root');

      // Verify component actually rendered with content
      const childCount = await root.evaluate((el) => el.children.length);
      expect(childCount).toBeGreaterThan(0);

      // Verify component has visible content (text or interactive elements)
      const hasContent = await root.evaluate((el) => {
        const text = el.textContent?.trim().length ?? 0;
        const inputs = el.querySelectorAll('input, button, select, textarea').length;
        return text > 0 || inputs > 0;
      });
      expect(hasContent).toBe(true);

      await expect(root).toHaveScreenshot(
        `${component.name}-light.png`,
        {
          maxDiffPixels: component.maxDiffPixels ?? testDefaults.maxDiffPixels,
          animations: 'disabled',
        }
      );
    });
  }
});

test.describe('Components - Dark Mode', () => {
  for (const component of allComponents) {
    test(`${component.name} - dark mode screenshot`, async ({ page }) => {
      await page.goto(
        `/iframe.html?id=${component.storyId}&viewMode=story&globals=theme:dark`
      );

      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(testDefaults.settleTime);

      const root = page.locator('#storybook-root');

      // Verify component actually rendered with content
      const childCount = await root.evaluate((el) => el.children.length);
      expect(childCount).toBeGreaterThan(0);

      // Verify component has visible content
      const hasContent = await root.evaluate((el) => {
        const text = el.textContent?.trim().length ?? 0;
        const inputs = el.querySelectorAll('input, button, select, textarea').length;
        return text > 0 || inputs > 0;
      });
      expect(hasContent).toBe(true);

      // Verify dark theme is actually applied
      const isDark = await page.evaluate(() => {
        return document.documentElement.getAttribute('data-theme') === 'dark' ||
               document.body.getAttribute('data-theme') === 'dark' ||
               document.querySelector('[data-theme="dark"]') !== null;
      });
      expect(isDark).toBe(true);

      await expect(root).toHaveScreenshot(
        `${component.name}-dark.png`,
        {
          maxDiffPixels: component.maxDiffPixels ?? testDefaults.maxDiffPixels,
          animations: 'disabled',
        }
      );
    });
  }
});
