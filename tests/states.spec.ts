import { test, expect } from '@playwright/test';
import { testDefaults } from './config';

/**
 * v2 T5: value states.
 * - prefers-reduced-motion switches the pulse of StatusBadge `live` off
 * - States/Overview at 390 px (desktop is covered by the components spec)
 */

const LIVE_STORY =
  '/iframe.html?id=components-statusbadge--live&viewMode=story';
const DOT = '.csk-status-badge__dot';

test.describe('StatusBadge live pulse', () => {
  test.describe('no preference', () => {
    test.use({ reducedMotion: 'no-preference' });

    test('pulses', async ({ page }) => {
      await page.goto(LIVE_STORY);
      await page.waitForSelector(DOT);
      const running = await page
        .locator(DOT)
        .evaluate(
          (el) =>
            el.getAnimations().filter((a) => a.playState === 'running').length,
        );
      expect(running).toBeGreaterThan(0);
    });
  });

  test.describe('reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });

    test('has no running animation', async ({ page }) => {
      await page.goto(LIVE_STORY);
      await page.waitForSelector(DOT);
      const info = await page.locator(DOT).evaluate((el) => ({
        animations: el.getAnimations().length,
        name: getComputedStyle(el).animationName,
      }));
      expect(info.animations).toBe(0);
      expect(info.name).toBe('none');
    });
  });
});

test.describe('States/Overview at 390 px', () => {
  test.use({ viewport: { width: 390, height: 900 } });

  test('has no horizontal overflow and matches snapshot', async ({ page }) => {
    await page.goto('/iframe.html?id=states-overview--default&viewMode=story');
    await page.waitForSelector('.states-overview');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(testDefaults.settleTime);
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    await expect(page.locator('#storybook-root')).toHaveScreenshot(
      'States-Overview-390.png',
      {
        maxDiffPixels: 100,
        animations: 'disabled',
      },
    );
  });
});
