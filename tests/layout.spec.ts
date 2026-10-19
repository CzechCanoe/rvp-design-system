import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { layoutStories, testDefaults } from './config';
import { applyQuarantine } from './quarantine';

/**
 * Layout stories (Header, Subbar, PageTitle, EventHeader, BottomBar in PageLayout)
 * at desktop 1280 and phone 390 width.
 */

applyQuarantine(test);

const viewports = [
  { label: 'desktop', width: 1280, height: 800 },
  { label: 'mobile', width: 390, height: 800 },
];

for (const viewport of viewports) {
  test.describe(`Layout - ${viewport.label} (${viewport.width}px)`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const story of layoutStories) {
      test(`${story.name} - screenshot`, async ({ page }) => {
        await page.goto(`/iframe.html?id=${story.storyId}&viewMode=story`);
        await page.waitForSelector('#storybook-root', { state: 'visible' });
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(testDefaults.settleTime);

        const root = page.locator('#storybook-root');
        await expect(root).toHaveScreenshot(`${story.name}-${viewport.label}.png`, {
          maxDiffPixels: testDefaults.maxDiffPixels,
          animations: 'disabled',
        });
      });

      test(`${story.name} - WCAG 2.1 AA`, async ({ page }) => {
        test.skip(story.a11y === false, 'not applicable (see config.ts)');
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

test.describe('Layout - BottomBar visibility', () => {
  test('visible in a 390 px container, hidden in a 1280 px container', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/iframe.html?id=layout-livemobile--default&viewMode=story');
    await page.waitForSelector('.csk-bottom-bar');
    await expect(page.locator('.csk-bottom-bar')).toBeVisible();

    await page.goto('/iframe.html?id=components-bottombar--hidden-on-wide-container&viewMode=story');
    await page.waitForSelector('#storybook-root');
    await expect(page.locator('.csk-bottom-bar')).toBeHidden();
  });
});
