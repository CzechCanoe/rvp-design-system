import { test, expect } from '@playwright/test';

/**
 * Guard for self-hosted fonts (v2 T2): no woff2 request fails and the display
 * font is usable once loaded. Not a visual test, so no snapshots.
 */
test('fonts load without 404 and Barlow Semi Condensed is available', async ({ page }) => {
  const failed: string[] = [];
  page.on('response', (r) => {
    if (/\.woff2(\?|$)/.test(r.url()) && r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
  });

  await page.goto('/iframe.html?id=components-button--default&viewMode=story');
  await page.waitForSelector('#storybook-root', { state: 'visible' });

  const ok = await page.evaluate(async () => {
    const h = document.createElement('h1');
    h.textContent = 'Český šampionát';
    h.style.fontFamily = 'var(--csk-font-display)';
    h.style.fontWeight = '600';
    document.body.append(h);
    await document.fonts.load('600 16px "Barlow Semi Condensed"', 'Český');
    await document.fonts.ready;
    return document.fonts.check('600 16px "Barlow Semi Condensed"');
  });

  expect(ok).toBe(true);
  expect(failed).toEqual([]);
});
