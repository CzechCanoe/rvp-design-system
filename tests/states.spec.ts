import { test, expect } from '@playwright/test';

/**
 * v2 T5: value states.
 * - prefers-reduced-motion switches the pulse of StatusBadge `live` off
 * (The States/Overview 390 px snapshot lives in components.spec.ts, which the
 * update-snapshots workflow regenerates.)
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
