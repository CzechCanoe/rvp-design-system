import { test, expect, type Page } from '@playwright/test';
import { applyQuarantine } from './quarantine';

/**
 * Functional checks of the club entry (v2 T14). Snapshots and axe of the page are in live-pages.spec.ts
 * (pageStories), those of the components (viewportStories) in components.spec.ts / results-table.spec.ts.
 */

applyQuarantine(test);

async function open(page: Page, id: string) {
  await page.goto(`/iframe.html?id=${id}&viewMode=story`);
  await page.waitForSelector('#storybook-root .csk-entry-table');
  await page.evaluate(() => document.fonts.ready);
}

test.describe('Entry/ClubEntry', () => {
  test('warnings never block sending; a missing confirmation says what to do next', async ({ page }) => {
    await open(page, 'entry--club-entry');
    const root = page.locator('#storybook-root');

    // Warnings are present: notice list and badges in the table
    await expect(root.getByText('Propadlá lékařská prohlídka')).toBeVisible();
    await expect(root.getByText('Věk neodpovídá kategorii')).toBeVisible();
    await expect(root.getByText('Nic z toho odeslání neblokuje.')).toBeVisible();
    await expect(root.locator('.csk-entry-table .csk-badge--warning')).toHaveCount(2);

    // ... and the submit button is enabled (also with the confirmation unchecked)
    const submit = root.getByRole('button', { name: 'Odeslat přihlášku pořadateli' });
    await expect(submit).toBeEnabled();

    // Without the confirmation: an error that says what to do, associated to the checkbox
    await submit.click();
    const box = root.getByRole('checkbox');
    await expect(root.getByRole('alert')).toContainText('zaškrtněte toto potvrzení');
    await expect(box).toHaveAttribute('aria-invalid', 'true');
    await expect(box).toHaveAccessibleDescription(/zaškrtněte toto potvrzení/);

    // With the confirmation the entry is sent although the warnings remain
    await root.getByText(/Potvrzuji za oddíl/).click();
    await expect(box).toBeChecked();
    await expect(submit).toBeEnabled();
    await submit.click();
    await expect(root.getByText('Přihláška odeslána.')).toBeVisible();
    await expect(root.getByText('Propadlá lékařská prohlídka')).toBeVisible();
  });

  test('C2 is one boat in two rows with spanning category, fee and actions', async ({ page }) => {
    await open(page, 'entry--club-entry');
    const table = page.getByRole('region', { name: 'C2 mix' });
    const boat = table.locator('tbody').first();
    await expect(boat.locator('tr')).toHaveCount(2);
    await expect(boat.locator('td[rowspan="2"]')).toHaveCount(3);
    await expect(boat.getByText('háček')).toBeVisible();
    await expect(boat.getByText('zadák')).toBeVisible();
    // the second boat has an open seat instead of the second athlete
    await expect(table.getByText('druhé místo v lodi je volné')).toBeVisible();
  });

  test('category select is labelled and its hint is associated', async ({ page }) => {
    await open(page, 'components-entrytable--single-boats');
    const selects = page.getByRole('combobox');
    await expect(selects).toHaveCount(4);
    const hinted = selects.nth(2);
    await expect(hinted).toHaveAccessibleName(/Věková kategorie/);
    await expect(hinted).toHaveAccessibleDescription('ročník 2011 odpovídá U16');
    // a warning does not disable anything in the table
    await expect(page.locator('.csk-entry-table button:disabled, .csk-entry-table select:disabled')).toHaveCount(0);
  });

  test('390 px: the page does not overflow, the table scrolls inside itself', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await open(page, 'entry--club-entry');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const scrolls = await page
      .locator('.csk-entry-table')
      .first()
      .evaluate((el) => el.scrollWidth > el.clientWidth);
    expect(scrolls).toBe(true);
  });
});
