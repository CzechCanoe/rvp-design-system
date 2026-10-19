import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { viewportStories } from './config';
import { applyQuarantine } from './quarantine';

/**
 * Functional checks of ResultsTable v2 + RunDetail (v2 T9). No screenshots here;
 * the 390 / 1280 snapshots are in components.spec.ts (viewportStories).
 */

applyQuarantine(test);

const story = (id: string) => `/iframe.html?id=${id}&viewMode=story`;

async function open(page: Page, id: string) {
  await page.goto(story(id));
  await page.waitForSelector(
    '#storybook-root .csk-results-table, #storybook-root .csk-run-detail, #storybook-root .csk-program-list, #storybook-root .csk-oncourse-panel, #storybook-root .csk-oncourse-rider, #storybook-root .csk-event-header'
  );
  await page.evaluate(() => document.fonts.ready);
}

const tableStories = [
  'default',
  'single-run',
  'category-ranks',
  'on-course',
  'under-review',
  'marks',
  'expanded',
  'startlist',
  'in-narrow-container',
];

test.describe('ResultsTable - 360 px', () => {
  test.use({ viewport: { width: 360, height: 800 } });

  for (const id of tableStories) {
    test(`${id}: time and name cells never wrap, nothing overflows`, async ({ page }) => {
      await open(page, `components-resultstable--${id}`);
      const report = await page.evaluate(() => {
        const visible = (el: Element) => (el as HTMLElement).offsetParent !== null;
        const oneLine = (el: Element) => {
          const fontSize = parseFloat(getComputedStyle(el).fontSize);
          return el.getClientRects().length === 1 && el.getBoundingClientRect().height <= fontSize * 1.8;
        };
        const wrapped: string[] = [];
        const overflowing: string[] = [];
        let times = 0;
        for (const t of document.querySelectorAll('.csk-results-table .csk-time-value, .csk-athlete-name__primary, .csk-athlete-name__secondary')) {
          if (!visible(t)) continue; // the hidden desktop copy of a cell
          if (t.classList.contains('csk-time-value')) times++;
          if (!oneLine(t)) wrapped.push(t.textContent ?? '');
        }
        for (const cell of document.querySelectorAll('.csk-results-table td.csk-results-table__num')) {
          if (!visible(cell)) continue;
          if (cell.scrollWidth > cell.clientWidth + 1) overflowing.push(cell.textContent ?? '');
        }
        const table = document.querySelector('.csk-results-table') as HTMLElement;
        return {
          times,
          wrapped,
          overflowing,
          tableOverflow: table.scrollWidth - table.clientWidth,
          pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
      });
      if (id !== 'startlist') expect(report.times).toBeGreaterThan(0);
      expect(report.wrapped).toEqual([]);
      expect(report.overflowing).toEqual([]);
      expect(report.tableOverflow).toBeLessThanOrEqual(0);
      expect(report.pageOverflow).toBeLessThanOrEqual(0);
    });
  }
});

test.describe('ResultsTable - columns by container query', () => {
  const visibility = (page: Page) =>
    page.evaluate(() => {
      const shown = (sel: string) => {
        const el = document.querySelector(sel);
        return el ? getComputedStyle(el).display !== 'none' : false;
      };
      return {
        clubColumn: shown('thead .csk-results-table__club'),
        stackedRuns: shown('thead .csk-results-table__m'),
        tableWidth: Math.round((document.querySelector('.csk-results-table') as HTMLElement).clientWidth),
      };
    });

  test('desktop columns at 1280, mobile columns at 390', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await open(page, 'components-resultstable--default');
    expect(await visibility(page)).toMatchObject({ clubColumn: true, stackedRuns: false });

    await page.setViewportSize({ width: 390, height: 800 });
    await expect.poll(() => visibility(page)).toMatchObject({ clubColumn: false, stackedRuns: true });
  });

  test('a 390 px wide table shows mobile columns on a 1280 px viewport (container, not media query)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await open(page, 'components-resultstable--in-narrow-container');
    const v = await visibility(page);
    expect(v.tableWidth).toBeLessThanOrEqual(390);
    expect(v).toMatchObject({ clubColumn: false, stackedRuns: true });
  });
});

test.describe('ResultsTable - expanded row', () => {
  for (const viewport of [
    { label: 'mobile', width: 390, side: false, maxIndent: 12 },
    { label: 'desktop', width: 1280, side: true, maxIndent: 18 },
  ]) {
    test(`${viewport.label}: RunDetail spans the full table width without indentation`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: 900 });
      await open(page, 'components-resultstable--expanded');
      const r = await page.evaluate(() => {
        const box = (sel: string) => {
          const b = document.querySelector(sel)!.getBoundingClientRect();
          return { left: b.left, width: b.width };
        };
        const detail = box('.csk-run-detail');
        return {
          table: box('.csk-results-table__table'),
          cell: box('.csk-results-table__detail-cell'),
          detail,
          summaryIndent: box('.csk-run-detail__summary').left - detail.left,
          runIndent: box('.csk-run-detail__run').left - detail.left,
          direction: getComputedStyle(document.querySelector('.csk-run-detail__runs')!).flexDirection,
        };
      });
      expect(Math.abs(r.cell.left - r.table.left)).toBeLessThanOrEqual(1);
      expect(Math.abs(r.cell.width - r.table.width)).toBeLessThanOrEqual(1);
      expect(Math.abs(r.detail.left - r.table.left)).toBeLessThanOrEqual(1);
      expect(Math.abs(r.detail.width - r.table.width)).toBeLessThanOrEqual(1);
      expect(r.summaryIndent).toBeLessThanOrEqual(viewport.maxIndent + 1);
      if (viewport.side) {
        expect(r.direction).toBe('row');
      } else {
        expect(r.direction).toBe('column');
        expect(r.runIndent).toBeLessThanOrEqual(viewport.maxIndent + 1);
      }
    });
  }

  test('marks are compact in the row cells but full size in an expanded RunDetail', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await open(page, 'components-resultstable--expanded');
    await page.getByRole('button', { name: 'Detail: HRADECKÝ Daniel' }).click();
    await expect(page.locator('.csk-run-detail .csk-mark-badge').first()).toBeVisible();
    const heights = await page.evaluate(() => {
      const of = (sel: string) =>
        [...document.querySelectorAll(sel)]
          .filter((el) => (el as HTMLElement).offsetParent !== null)
          .map((el) => Math.round(el.getBoundingClientRect().height));
      return { row: of('.csk-results-table__row .csk-mark-badge'), detail: of('.csk-run-detail .csk-mark-badge') };
    });
    expect(heights.row.length).toBeGreaterThan(0);
    expect([...new Set(heights.row)]).toEqual([18]);
    expect(heights.detail.length).toBeGreaterThan(0);
    expect([...new Set(heights.detail)]).toEqual([22]);
  });

  test('expanding does not change the column widths', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await open(page, 'components-resultstable--expanded');
    const widths = () =>
      page.evaluate(() =>
        [...document.querySelectorAll('.csk-results-table thead th')]
          .filter((th) => getComputedStyle(th).display !== 'none')
          .map((th) => Math.round(th.getBoundingClientRect().width))
      );
    const expanded = await widths();
    await page.getByRole('button', { name: 'Detail: REZEK Adam' }).click();
    await expect(page.locator('.csk-run-detail')).toHaveCount(0);
    expect(await widths()).toEqual(expanded);
  });
});

test.describe('ResultsTable - interaction', () => {
  test('click anywhere toggles the row; keyboard on the chevron; the star does not expand', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await open(page, 'components-resultstable--default');
    const toggle = page.getByRole('button', { name: 'Detail: REZEK Adam' });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await page.locator('.csk-results-table__club-inline', { hasText: 'SK Vodní slalom' }).click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('.csk-run-detail')).toHaveCount(1);

    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('.csk-run-detail')).toHaveCount(0);

    const star = page.getByRole('button', { name: 'Oblíbený: REZEK Adam' });
    await expect(star).toHaveAttribute('aria-pressed', 'false');
    await star.click();
    await expect(star).toHaveAttribute('aria-pressed', 'true');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('the star keeps a 44 px touch target in a narrow column', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await open(page, 'components-resultstable--default');
    const box = await page.getByRole('button', { name: 'Oblíbený: HNILICA Lukas' }).boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });
});

test.describe('ResultsTable - 100 rows (performance)', () => {
  test('mounts within budget', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(story('components-resultstable--hundred-rows'));
    const output = page.getByTestId('render-ms');
    await expect(output).not.toHaveText('…');
    await expect(page.locator('.csk-results-table tbody tr')).toHaveCount(100);

    const samples: number[] = [];
    for (let i = 0; i < 5; i++) {
      const before = await output.textContent();
      await page.getByRole('button', { name: 'Vykreslit znovu' }).click();
      await expect(output).not.toHaveText(before ?? '');
      samples.push(Number(await output.textContent()));
    }
    samples.sort((a, b) => a - b);
    const median = samples[Math.floor(samples.length / 2)];
    testInfo.annotations.push({ type: 'render-ms', description: `100 rows mount (render+commit+layout) median ${median} ms, samples ${samples.join(', ')}` });
    console.log(`ResultsTable 100 rows: median ${median} ms (${samples.join(', ')})`);
    // Generous budget against CI noise; it catches regressions such as per-row work growing with the row count.
    expect(median).toBeLessThan(800);
  });
});

/**
 * Storybook's a11y addon runs axe in the story frame right after load; a second run then fails with
 * „Axe is already running“. Wait like accessibility.spec.ts and retry only that error.
 */
async function analyzeA11y(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(300);
  for (let attempt = 1; ; attempt++) {
    try {
      return await new AxeBuilder({ page })
        .include('#storybook-root')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
    } catch (error) {
      if (attempt >= 5 || !String(error).includes('Axe is already running')) throw error;
      await page.waitForTimeout(500);
    }
  }
}

test.describe('ResultsTable / RunDetail - WCAG 2.1 AA', () => {
  for (const viewport of [
    { label: 'mobile', width: 390 },
    { label: 'desktop', width: 1280 },
  ]) {
    for (const s of [...viewportStories, { name: 'ResultsTable-HundredRows', storyId: 'components-resultstable--hundred-rows' }]) {
      test(`${s.name} (${viewport.label})`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: 900 });
        await open(page, s.storyId);
        const results = await analyzeA11y(page);
        expect(results.violations).toEqual([]);
      });
    }
  }
});
