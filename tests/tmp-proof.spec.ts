import { test, expect } from '@playwright/test';

test('tmp proof screenshot', async ({ page }) => {
  await page.goto('/iframe.html?id=components-statusbadge--live&viewMode=story');
  await page.waitForSelector('.csk-status-badge__dot');
  await page.setViewportSize({ width: 300, height: 200 });
  await expect(page).toHaveScreenshot('tmp-proof2.png');
});
