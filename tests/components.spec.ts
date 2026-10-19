import { test, expect } from '@playwright/test';
import { allComponents, testDefaults, viewportStories } from './config';
import { applyQuarantine } from './quarantine';

/**
 * Visual regression tests for design system components
 * Light theme only (v2 draws no dark theme)
 *
 * Uses central config from ./config.ts for story IDs
 */

applyQuarantine(test);

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
        // Avatar, ProgressBar and Skeleton have no text/inputs: accept any visibly sized descendant
        const sized = Array.from(el.querySelectorAll('*')).some((n) => {
          const r = n.getBoundingClientRect();
          return r.width > 0 && r.height > 0;
        });
        return text > 0 || inputs > 0 || sized;
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

// v2 T5: the states strip must hold together at phone width (390 px)
test.describe('Components - Mobile 390', () => {
  test.use({ viewport: { width: 390, height: 900 } });

  test('States-Overview - 390 px screenshot', async ({ page }) => {
    await page.goto('/iframe.html?id=states-overview--default&viewMode=story');
    await page.waitForSelector('.states-overview');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(testDefaults.settleTime);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);

    await expect(page.locator('#storybook-root')).toHaveScreenshot('States-Overview-390.png', {
      maxDiffPixels: 100,
      animations: 'disabled',
    });
  });
});

// v2 T9+: responsive stories (ResultsTable, RunDetail) at phone 390 and desktop 1280 width;
// the columns switch by container query. Functional checks: tests/results-table.spec.ts.
for (const viewport of [
  { label: 'mobile', width: 390, height: 800 },
  { label: 'desktop', width: 1280, height: 800 },
]) {
  test.describe(`Components - ${viewport.label} ${viewport.width}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const story of viewportStories) {
      test(`${story.name} - ${viewport.width} px screenshot`, async ({ page }) => {
        await page.goto(`/iframe.html?id=${story.storyId}&viewMode=story`);
        await page.waitForSelector('#storybook-root', { state: 'visible' });
        await page.waitForLoadState('networkidle');
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(testDefaults.settleTime);

        await expect(page.locator('#storybook-root')).toHaveScreenshot(`${story.name}-${viewport.label}.png`, {
          maxDiffPixels: testDefaults.maxDiffPixels,
          animations: 'disabled',
        });
      });
    }
  });
}
