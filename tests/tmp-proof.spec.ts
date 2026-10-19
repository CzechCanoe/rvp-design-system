import { test, expect } from '@playwright/test';

test('tmp proof screenshot', async ({ page }) => {
  await page.goto('/iframe.html?id=components-statusbadge--live&viewMode=story');
  await page.waitForSelector('.csk-status-badge__dot');
  await expect(page).toHaveScreenshot('tmp-proof.png');
});
