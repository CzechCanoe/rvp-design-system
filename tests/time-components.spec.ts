import { test, expect } from '@playwright/test';
import { applyQuarantine } from './quarantine';

/**
 * Functional checks of the T6 time components in a real browser
 * (TimeValue, RunningTime, DataAge). No screenshots here.
 */

applyQuarantine(test);

const story = (id: string) => `/iframe.html?id=${id}&viewMode=story`;

test.describe('Time components', () => {
  test('RunningTime state switching: ticks, freezes, unfreezes, switches state', async ({ page }) => {
    await page.goto(story('components-runningtime--state-switching'));
    const root = page.locator('#storybook-root');
    const time = root.locator('.csk-running-time .csk-time-value');
    await expect(time).toHaveText('46.1');

    await root.getByRole('button', { name: '+1 s' }).click();
    await expect(time).toHaveText('47.1');
    await expect(root.locator('.csk-running-time')).not.toHaveClass(/csk-running-time--stale/);

    await root.getByRole('button', { name: /bez dat/ }).click();
    await expect(root.locator('.csk-running-time')).toHaveClass(/csk-running-time--stale/);
    await expect(time).toHaveText('49.1');
    await expect(root.locator('.csk-running-time__age')).toHaveText('před 4 s');

    await root.getByRole('button', { name: 'Nová hodnota' }).click();
    await expect(root.locator('.csk-running-time')).not.toHaveClass(/csk-running-time--stale/);
    await expect(time).toHaveText('50.1');

    await root.getByRole('button', { name: 'Na startu' }).click();
    await expect(root.locator('.csk-running-time')).toHaveCount(0);
    await expect(root.locator('.csk-time-value--muted')).toHaveText('0.0');

    await root.getByRole('button', { name: 'Neznámo' }).click();
    await expect(root.locator('.csk-time-value--unknown')).toHaveCount(1);
  });

  test('RunningTime with the default browser clock ticks in real time', async ({ page }) => {
    await page.goto(story('components-runningtime--real-clock'));
    const time = page.locator('#storybook-root .csk-running-time .csk-time-value');
    await expect(time).toBeVisible();
    const first = await time.textContent();
    await expect(time).not.toHaveText(first ?? '', { timeout: 2_000 });
  });

  test('static stories do not animate (reduced motion, ticking digits are data)', async ({ page }) => {
    for (const id of ['components-runningtime--states', 'components-dataage--overview', 'components-timevalue--variants']) {
      await page.goto(story(id));
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      const animations = await page.evaluate(
        () =>
          document
            .getAnimations()
            .filter((a) => a.effect instanceof KeyframeEffect && a.effect.target?.closest('.csk-running-time, .csk-time-value, .csk-data-age'))
            .length
      );
      expect(animations).toBe(0);
    }
  });
});
