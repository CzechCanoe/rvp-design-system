import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { pageStories, pageStoryMaxDiffPixels, testDefaults } from './config';
import { applyQuarantine } from './quarantine';

/**
 * Live page stories (v2 T12) at phone 390 and desktop 1280: snapshot, no horizontal overflow, axe.
 * All stories use one fixed test clock, so nothing ticks.
 */

applyQuarantine(test);

for (const viewport of [
  { label: 'mobile', width: 390, height: 800 },
  { label: 'desktop', width: 1280, height: 800 },
]) {
  test.describe(`Live pages - ${viewport.label} ${viewport.width}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const story of pageStories) {
      test(`${story.name} - ${viewport.width} px screenshot`, async ({ page }) => {
        await page.goto(`/iframe.html?id=${story.storyId}&viewMode=story`);
        await page.waitForSelector('#storybook-root', { state: 'visible' });
        await page.waitForLoadState('networkidle');
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(testDefaults.settleTime);

        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        );
        expect(overflow).toBeLessThanOrEqual(0);

        await expect(page.locator('#storybook-root')).toHaveScreenshot(`${story.name}-${viewport.label}.png`, {
          maxDiffPixels: pageStoryMaxDiffPixels,
          animations: 'disabled',
        });
      });

      test(`${story.name} - ${viewport.width} px WCAG 2.1 AA`, async ({ page }) => {
        await page.goto(`/iframe.html?id=${story.storyId}&viewMode=story`);
        await page.waitForSelector('#storybook-root', { state: 'visible' });
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(300);

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();
        expect(results.violations).toEqual([]);
      });
    }
  });
}
