import { test, expect } from '@playwright/test';

/**
 * T7 controls: touch targets (>= 44 x 44 px, measured on the bounding box of every
 * interactive element of SegmentedControl, StarButton, FavoritesToggle, TableToolbar),
 * wrapping at 360 px and keyboard behaviour.
 * SearchInput and Switch inside the TableToolbar story are not part of T7 (sizes owned by T4).
 */

const OWN =
  '.csk-segmented__item, .csk-star-button, .csk-favorites-toggle, .csk-table-toolbar__button, .csk-table-toolbar__detail .csk-switch-label';

const stories = [
  'components-segmentedcontrol--default',
  'components-segmentedcontrol--sizes',
  'components-segmentedcontrol--wrapping-360',
  'components-starbutton--default',
  'components-favoritestoggle--default',
  'components-tabletoolbar--default',
  'components-tabletoolbar--mobile',
  'components-tabletoolbar--detail-on',
  'components-tabletoolbar--crowded-390',
  'components-tabletoolbar--one-row-390',
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

// v2 T19 (#83 T18 gap 2): at 390 px the search keeps a usable width, the controls wrap as a group
test.describe('Controls - TableToolbar at 390 px', () => {
  for (const id of [
    'components-tabletoolbar--crowded-390',
    'components-tabletoolbar--mobile',
    'components-tabletoolbar--one-row-390',
  ]) {
    test(`${id} - search input is at least 160 px wide, nothing overflows the toolbar`, async ({ page }) => {
      await open(page, id);
      const toolbar = (await page.locator('.csk-table-toolbar').boundingBox())!;
      expect(toolbar.width).toBeLessThanOrEqual(390);
      const input = (await page.locator('.csk-table-toolbar__search input').boundingBox())!;
      expect(input.width).toBeGreaterThanOrEqual(160);
      const controls = page.locator('.csk-table-toolbar__controls > *');
      for (let i = 0; i < (await controls.count()); i++) {
        const box = (await controls.nth(i).boundingBox())!;
        expect(box.x, `control ${i} left`).toBeGreaterThanOrEqual(toolbar.x);
        expect(box.x + box.width, `control ${i} right`).toBeLessThanOrEqual(toolbar.x + toolbar.width + 0.5);
      }
    });
  }

  test('crowded: search takes the full first row, controls start below it', async ({ page }) => {
    await open(page, 'components-tabletoolbar--crowded-390');
    const search = (await page.locator('.csk-table-toolbar__search').boundingBox())!;
    const controls = (await page.locator('.csk-table-toolbar__controls').boundingBox())!;
    const toolbar = (await page.locator('.csk-table-toolbar').boundingBox())!;
    // full row = toolbar width minus its 8 px side padding
    expect(search.width).toBeGreaterThanOrEqual(toolbar.width - 2 * 8 - 1);
    expect(controls.y).toBeGreaterThanOrEqual(search.y + search.height);
    // labels never wrap: every pill / segment is a single line
    for (const sel of ['.csk-table-toolbar__pill', '.csk-segmented__label']) {
      const els = page.locator(sel);
      for (let i = 0; i < (await els.count()); i++) {
        expect(await els.nth(i).evaluate((e) => getComputedStyle(e).whiteSpace)).toBe('nowrap');
      }
    }
  });

  test('few controls stay on the search row (reference Live1)', async ({ page }) => {
    await open(page, 'components-tabletoolbar--one-row-390');
    const search = (await page.locator('.csk-table-toolbar__search').boundingBox())!;
    const controls = (await page.locator('.csk-table-toolbar__controls').boundingBox())!;
    expect(Math.abs(controls.y + controls.height / 2 - (search.y + search.height / 2))).toBeLessThanOrEqual(2);
  });
});
