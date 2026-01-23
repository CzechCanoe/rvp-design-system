import { test, expect } from '@playwright/test';
import { allPrototypes, testDefaults } from './config';

/**
 * Visual regression tests for page prototypes
 * Tests all prototype pages in both light and dark modes
 *
 * Uses central config from ./config.ts for story IDs
 */

test.describe('Prototype Pages - Light Mode', () => {
  for (const prototype of allPrototypes) {
    test(`${prototype.name} - screenshot`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${prototype.storyId}&viewMode=story`);

      await page.waitForSelector('#storybook-root', {
        state: 'visible',
        timeout: prototype.timeout ?? testDefaults.prototypeTimeout,
      });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(testDefaults.prototypeSettleTime);

      const root = page.locator('#storybook-root');

      // Verify prototype rendered with content (not empty/broken)
      const childCount = await root.evaluate((el) => el.children.length);
      expect(childCount).toBeGreaterThan(0);

      // Verify page has meaningful content (prototypes should have substantial text)
      const contentLength = await root.evaluate((el) => el.textContent?.trim().length ?? 0);
      expect(contentLength).toBeGreaterThan(50);

      // Verify page structure - should have multiple sections
      const sectionCount = await root.evaluate((el) => {
        const sections = el.querySelectorAll('section, header, main, article, [class*="page"], [class*="section"]');
        return sections.length;
      });
      expect(sectionCount).toBeGreaterThan(0);

      await expect(root).toHaveScreenshot(
        `${prototype.name}-light.png`,
        {
          maxDiffPixels: prototype.maxDiffPixels ?? testDefaults.prototypeMaxDiffPixels,
          animations: 'disabled',
          timeout: prototype.timeout ?? testDefaults.componentTimeout,
        }
      );
    });
  }
});

test.describe('Prototype Pages - Dark Mode', () => {
  for (const prototype of allPrototypes) {
    test(`${prototype.name} - dark mode screenshot`, async ({ page }) => {
      await page.goto(
        `/iframe.html?id=${prototype.storyId}&viewMode=story&globals=theme:dark`
      );

      await page.waitForSelector('#storybook-root', {
        state: 'visible',
        timeout: prototype.timeout ?? testDefaults.prototypeTimeout,
      });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(testDefaults.prototypeSettleTime);

      const root = page.locator('#storybook-root');

      // Verify prototype rendered with content (not empty/broken)
      const childCount = await root.evaluate((el) => el.children.length);
      expect(childCount).toBeGreaterThan(0);

      // Verify page has meaningful content
      const contentLength = await root.evaluate((el) => el.textContent?.trim().length ?? 0);
      expect(contentLength).toBeGreaterThan(50);

      // Verify dark theme is applied
      const isDark = await page.evaluate(() => {
        return document.documentElement.getAttribute('data-theme') === 'dark' ||
               document.body.getAttribute('data-theme') === 'dark' ||
               document.querySelector('[data-theme="dark"]') !== null;
      });
      expect(isDark).toBe(true);

      await expect(root).toHaveScreenshot(
        `${prototype.name}-dark.png`,
        {
          maxDiffPixels: prototype.maxDiffPixels ?? testDefaults.prototypeMaxDiffPixels,
          animations: 'disabled',
          timeout: prototype.timeout ?? testDefaults.componentTimeout,
        }
      );
    });
  }
});
