import { test, expect, type Page } from '@playwright/test';
import { applyQuarantine } from './quarantine';

/**
 * Functional checks of StartlistTable + ProgramList (v2 T11). No screenshots here;
 * the 390 / 1280 snapshots and axe are in components.spec.ts / results-table.spec.ts
 * (viewportStories).
 */

applyQuarantine(test);

async function open(page: Page, id: string, selector: string) {
  await page.goto(`/iframe.html?id=${id}&viewMode=story`);
  await page.waitForSelector(`#storybook-root ${selector}`);
  await page.evaluate(() => document.fonts.ready);
}

const startlistStories = ['default', 'single-start', 'with-notice', 'empty'];

test.describe('StartlistTable - 390 px', () => {
  test.use({ viewport: { width: 390, height: 900 } });

  for (const id of startlistStories) {
    test(`${id}: does not overflow`, async ({ page }) => {
      await open(page, `components-startlisttable--${id}`, '.csk-results-table');
      const report = await page.evaluate(() => {
        const table = document.querySelector('.csk-results-table') as HTMLElement;
        const root = document.documentElement;
        return {
          table: table.scrollWidth - table.clientWidth,
          page: root.scrollWidth - root.clientWidth,
        };
      });
      expect(report.table).toBeLessThanOrEqual(0);
      expect(report.page).toBeLessThanOrEqual(0);
    });
  }

  test('default: Start 1. / 2. are stacked under each other', async ({ page }) => {
    await open(page, 'components-startlisttable--default', '.csk-results-table');
    const boxes = await page.evaluate(() => {
      const cell = document.querySelector('.csk-results-table__starts') as HTMLElement;
      return [...cell.querySelectorAll('.csk-results-table__start')].map((el) => {
        const r = el.getBoundingClientRect();
        return { top: r.top, left: r.left };
      });
    });
    expect(boxes).toHaveLength(2);
    expect(boxes[1].top).toBeGreaterThan(boxes[0].top);
  });

  test('default: excused DNS shows inline, rows carry no rank or result', async ({ page }) => {
    await open(page, 'components-startlisttable--default', '.csk-results-table');
    await expect(page.locator('.csk-results-table tbody tr')).toHaveCount(11);
    await expect(page.locator('.csk-results-table__starts').nth(9)).toContainText('DNS');
    await expect(page.locator('.csk-results-table__rank')).toHaveCount(0);
  });
});

test.describe('ProgramList', () => {
  test.use({ viewport: { width: 390, height: 900 } });

  test('two running phases: two Live badges on the live ground, no overflow', async ({ page }) => {
    await open(page, 'components-programlist--two-running-phases', '.csk-program-list');
    await expect(page.locator('.csk-program-list__item--running')).toHaveCount(2);
    await expect(page.locator('.csk-program-list__item--running .csk-status-badge--live')).toHaveCount(2);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('a linked row has one link whose target covers the row', async ({ page }) => {
    await open(page, 'components-programlist--two-running-phases', '.csk-program-list');
    const hit = await page.evaluate(() => {
      const row = document.querySelector('.csk-program-list__item--running') as HTMLElement;
      const r = row.getBoundingClientRect();
      // click point in the empty middle of the row resolves to the row's link
      const el = document.elementFromPoint(r.left + r.width * 0.6, r.top + r.height / 2);
      return el?.closest('a')?.getAttribute('href') ?? null;
    });
    expect(hit).toMatch(/^#/);
  });
});
