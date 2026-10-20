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

// v2 T19 (#84.5, #83 T18 gaps 6-7): the navy band is full width, its content follows the page container
test.describe('Layout - EventHeader content width', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('aligned with PageLayout xl (1200) and lg (1024) containers', async ({ page }) => {
    await page.goto('/iframe.html?id=components-eventheader--container-width&viewMode=story');
    await page.waitForSelector('.csk-event-header');
    const layouts = page.locator('.csk-page-layout');
    await expect(layouts).toHaveCount(2);
    const expected = [1200, 1024];
    for (let i = 0; i < 2; i++) {
      const layout = layouts.nth(i);
      const band = (await layout.locator('.csk-event-header').boundingBox())!;
      const inner = (await layout.locator('.csk-event-header__inner').boundingBox())!;
      const container = (await layout.locator('.csk-page-layout__container').boundingBox())!;
      const back = (await layout.locator('.csk-event-header__back').boundingBox())!;
      const content = (await layout.locator('.csk-page-layout__container > *').first().boundingBox())!;
      // band over the full width, content box as wide as the page container
      expect(band.width).toBeGreaterThanOrEqual(1270);
      expect(Math.round(inner.width)).toBe(expected[i]);
      expect(Math.round(container.width)).toBe(expected[i]);
      expect(Math.abs(inner.x - container.x)).toBeLessThanOrEqual(1);
      // text starts where the page content starts (same 24 px gutter)
      expect(Math.abs(back.x - content.x)).toBeLessThanOrEqual(1);
    }
  });

  test('live page: header text lines up with the content column (maxWidth="lg")', async ({ page }) => {
    await page.goto('/iframe.html?id=live--running&viewMode=story');
    await page.waitForSelector('.csk-event-header');
    const back = (await page.locator('.csk-event-header__back').boundingBox())!;
    const title = (await page.locator('.csk-event-header__title').boundingBox())!;
    const panel = (await page.locator('.csk-results-panel').boundingBox())!;
    expect(Math.abs(back.x - panel.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(title.x - panel.x)).toBeLessThanOrEqual(1);
    const status = (await page.locator('.csk-event-header__status').boundingBox())!;
    expect(Math.abs(status.x + status.width - (panel.x + panel.width))).toBeLessThanOrEqual(1);
  });
});

test.describe('Layout - EventHeader condensed and logo', () => {
  test.use({ viewport: { width: 390, height: 800 } });

  test('condensed: one row with name, status and data age; no subtitle', async ({ page }) => {
    await page.goto('/iframe.html?id=components-eventheader--condensed&viewMode=story');
    await page.waitForSelector('.csk-event-header--condensed');
    await expect(page.locator('.csk-event-header__subtitle')).toHaveCount(0);
    const row = (await page.locator('.csk-event-header__row').boundingBox())!;
    const parts = ['.csk-event-header__title', '.csk-event-header__status', '.csk-event-header__age'];
    const boxes = [];
    for (const sel of parts) {
      const box = (await page.locator(sel).boundingBox())!;
      expect(box.y, sel).toBeGreaterThanOrEqual(row.y - 0.5);
      expect(box.y + box.height, sel).toBeLessThanOrEqual(row.y + row.height + 0.5);
      boxes.push(box);
    }
    // name · status · data age, left to right, inside the 390 px band
    expect(boxes[0].x + boxes[0].width).toBeLessThanOrEqual(boxes[1].x);
    expect(boxes[1].x + boxes[1].width).toBeLessThanOrEqual(boxes[2].x);
    expect(boxes[2].x + boxes[2].width).toBeLessThanOrEqual(390);
    await expect(page.locator('.csk-event-header__age')).toContainText('aktualizováno');
  });

  test('logo slot follows the Avatar shape: portrait 40 x 56, square 40 x 40', async ({ page }) => {
    await page.goto('/iframe.html?id=components-eventheader--logo-shapes&viewMode=story');
    await page.waitForSelector('.csk-event-header__logo');
    const slots = page.locator('.csk-event-header__logo');
    const portrait = (await slots.nth(0).boundingBox())!;
    const square = (await slots.nth(1).boundingBox())!;
    expect([Math.round(portrait.width), Math.round(portrait.height)]).toEqual([40, 56]);
    expect([Math.round(square.width), Math.round(square.height)]).toEqual([40, 40]);
    const img = slots.nth(0).locator('img');
    expect(await img.evaluate((e) => getComputedStyle(e).objectFit)).toBe('contain');
  });
});
