import { test, expect } from '@playwright/test';

/**
 * T7 controls: touch targets (>= 44 x 44 px, measured on the bounding box of every
 * interactive element of SegmentedControl, StarButton, FavoritesToggle, TableToolbar),
 * wrapping at 360 px and keyboard behaviour.
 * SearchInput and Switch inside the TableToolbar story are not part of T7 (sizes owned by T4).
 */

const OWN =
  '.csk-segmented__item, .csk-star-button, .csk-favorites-toggle, .csk-table-toolbar__button';

const stories = [
  'components-segmentedcontrol--default',
  'components-segmentedcontrol--sizes',
  'components-segmentedcontrol--wrapping-360',
  'components-starbutton--default',
  'components-favoritestoggle--default',
  'components-tabletoolbar--default',
  'components-tabletoolbar--mobile',
];

async function open(page: import('@playwright/test').Page, id: string) {
  await page.goto(`/iframe.html?id=${id}&viewMode=story`);
  await page.waitForSelector('#storybook-root', { state: 'visible' });
  await page.waitForLoadState('networkidle');
}

test.describe('Controls - touch targets', () => {
  for (const id of stories) {
    test(`${id} - every interactive element is at least 44x44`, async ({ page }) => {
      await open(page, id);
      const els = page.locator(OWN);
      const count = await els.count();
      expect(count).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        const box = await els.nth(i).boundingBox();
        expect(box, `element ${i}`).not.toBeNull();
        expect(box!.width, `width of element ${i}`).toBeGreaterThanOrEqual(44);
        expect(box!.height, `height of element ${i}`).toBeGreaterThanOrEqual(44);
      }
    });
  }
});

test.describe('Controls - SegmentedControl', () => {
  test('wraps whole segments at 360 px, labels stay on one line', async ({ page }) => {
    await open(page, 'components-segmentedcontrol--wrapping-360');
    const items = page.locator('.csk-segmented__item');
    const n = await items.count();
    const tops = new Set<number>();
    for (let i = 0; i < n; i++) {
      const box = (await items.nth(i).boundingBox())!;
      tops.add(Math.round(box.y));
      // a wrapped segment never overflows the 360 px frame (plus story padding)
      expect(box.x + box.width).toBeLessThanOrEqual(360 + 16);
    }
    expect(tops.size).toBeGreaterThan(1);

    const labels = page.locator('.csk-segmented__label');
    for (let i = 0; i < (await labels.count()); i++) {
      const el = labels.nth(i);
      expect(await el.evaluate((e) => getComputedStyle(e).whiteSpace)).toBe('nowrap');
      // single line: label is one line: as tall as the 44 px segment
      expect((await el.boundingBox())!.height).toBeLessThanOrEqual(44);
    }
  });

  test('radiogroup: arrow keys move the selection', async ({ page }) => {
    await open(page, 'components-segmentedcontrol--default');
    await expect(page.getByRole('radiogroup')).toBeVisible();
    const checked = page.locator('[role="radio"][aria-checked="true"]');
    await checked.focus();
    await expect(checked).toHaveText('Ne 4. 10.');
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('[role="radio"][aria-checked="true"]')).toHaveText('So 3. 10.');
    await expect(page.locator('[role="radio"][aria-checked="true"]')).toBeFocused();
  });
});

test.describe('Controls - toggles', () => {
  test('StarButton toggles aria-pressed and has a visible focus ring', async ({ page }) => {
    await open(page, 'components-starbutton--default');
    const star = page.locator('.csk-star-button').first();
    await expect(star).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.press('Tab');
    await expect(star).toBeFocused();
    expect(await star.evaluate((e) => getComputedStyle(e).outlineStyle)).not.toBe('none');
    await page.keyboard.press('Space');
    await expect(star).toHaveAttribute('aria-pressed', 'false');
  });

  test('FavoritesToggle toggles aria-pressed and exposes a label', async ({ page }) => {
    await open(page, 'components-favoritestoggle--default');
    const toggle = page.locator('.csk-favorites-toggle').first();
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await expect(toggle).toHaveAttribute('aria-label', 'Jen oblíbení (2)');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });
});
