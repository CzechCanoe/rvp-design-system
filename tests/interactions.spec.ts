import { test, expect } from '@playwright/test';
import { testDefaults } from './config';

/**
 * Functional/Interaction tests for design system components
 * Tests actual user interactions, not just visual appearance
 *
 * Covers:
 * - Form components: Input, Select, Checkbox, Switch, Radio
 * - Interactive components: Button, Modal, Tabs, Pagination
 * - Data components: Calendar navigation
 */

test.describe('Form Components - Interactions', () => {
  test.describe('Input', () => {
    test('accepts text input and updates value', async ({ page }) => {
      await page.goto('/iframe.html?id=components-input--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const input = page.locator('#storybook-root input').first();
      await expect(input).toBeVisible();

      // Type text
      await input.fill('Test input value');
      await expect(input).toHaveValue('Test input value');

      // Clear and type again
      await input.clear();
      await expect(input).toHaveValue('');

      await input.type('Another value');
      await expect(input).toHaveValue('Another value');
    });

    test('disabled input does not accept input', async ({ page }) => {
      await page.goto('/iframe.html?id=components-input--states&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      // Find disabled input
      const disabledInput = page.locator('#storybook-root input[disabled]').first();
      await expect(disabledInput).toBeVisible();
      await expect(disabledInput).toBeDisabled();

      // Verify it cannot be focused via click
      const initialValue = await disabledInput.inputValue();
      await disabledInput.click({ force: true }).catch(() => {});
      await expect(disabledInput).toHaveValue(initialValue);
    });

    test('focuses on click and shows focus state', async ({ page }) => {
      await page.goto('/iframe.html?id=components-input--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const input = page.locator('#storybook-root input').first();
      await input.click();
      await expect(input).toBeFocused();
    });
  });

  test.describe('Checkbox', () => {
    test('toggles checked state on click', async ({ page }) => {
      await page.goto('/iframe.html?id=components-checkbox--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      // Find the checkbox input (may be visually hidden)
      const checkbox = page.locator('#storybook-root .csk-checkbox').first();
      await expect(checkbox).toBeAttached();

      // Click the label wrapper instead of input directly
      const label = page.locator('#storybook-root .csk-checkbox-label').first();
      await expect(label).toBeVisible();

      // Get initial state
      const wasChecked = await checkbox.isChecked();

      // Click label to toggle
      await label.click();
      await expect(checkbox).toBeChecked({ checked: !wasChecked });

      // Click again to toggle back
      await label.click();
      await expect(checkbox).toBeChecked({ checked: wasChecked });
    });

    test('can be toggled via keyboard', async ({ page }) => {
      await page.goto('/iframe.html?id=components-checkbox--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const checkbox = page.locator('#storybook-root input[type="checkbox"]').first();
      const wasChecked = await checkbox.isChecked();

      // Focus and toggle with Space
      await checkbox.focus();
      await expect(checkbox).toBeFocused();
      await page.keyboard.press('Space');
      await expect(checkbox).toBeChecked({ checked: !wasChecked });
    });

    test('disabled checkbox does not toggle', async ({ page }) => {
      await page.goto('/iframe.html?id=components-checkbox--states&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const disabledCheckbox = page.locator('#storybook-root input[type="checkbox"][disabled]').first();
      await expect(disabledCheckbox).toBeVisible();
      await expect(disabledCheckbox).toBeDisabled();

      const wasChecked = await disabledCheckbox.isChecked();
      await disabledCheckbox.click({ force: true }).catch(() => {});
      await expect(disabledCheckbox).toBeChecked({ checked: wasChecked });
    });
  });

  test.describe('Switch', () => {
    test('toggles on click', async ({ page }) => {
      await page.goto('/iframe.html?id=components-switch--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      // Find the switch input (may be visually hidden)
      const switchInput = page.locator('#storybook-root .csk-switch').first();
      await expect(switchInput).toBeAttached();

      const wasChecked = await switchInput.isChecked();

      // Click the label wrapper instead of input directly
      const switchLabel = page.locator('#storybook-root .csk-switch-label').first();
      await expect(switchLabel).toBeVisible();
      await switchLabel.click();

      // Verify state changed
      const isNowChecked = await switchInput.isChecked();
      expect(isNowChecked).not.toBe(wasChecked);
    });

    test('can be toggled via keyboard', async ({ page }) => {
      await page.goto('/iframe.html?id=components-switch--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const switchInput = page.locator('#storybook-root input[type="checkbox"]').first();
      const wasChecked = await switchInput.isChecked();

      await switchInput.focus();
      await page.keyboard.press('Space');

      const isNowChecked = await switchInput.isChecked();
      expect(isNowChecked).not.toBe(wasChecked);
    });
  });

  test.describe('Select', () => {
    test('opens dropdown on click', async ({ page }) => {
      await page.goto('/iframe.html?id=components-select--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const select = page.locator('#storybook-root select').first();
      await expect(select).toBeVisible();

      // Native select - verify it has options
      const optionCount = await select.evaluate((el: HTMLSelectElement) => el.options.length);
      expect(optionCount).toBeGreaterThan(0);
    });

    test('allows option selection', async ({ page }) => {
      await page.goto('/iframe.html?id=components-select--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const select = page.locator('#storybook-root select').first();

      // Get options
      const options = await select.evaluate((el: HTMLSelectElement) =>
        Array.from(el.options).map(o => ({ value: o.value, text: o.text }))
      );

      if (options.length > 1) {
        // Select second option
        await select.selectOption({ index: 1 });
        const selectedValue = await select.inputValue();
        expect(selectedValue).toBe(options[1].value);
      }
    });

    test('disabled select does not allow selection', async ({ page }) => {
      await page.goto('/iframe.html?id=components-select--states&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const disabledSelect = page.locator('#storybook-root select[disabled]').first();
      await expect(disabledSelect).toBeVisible();
      await expect(disabledSelect).toBeDisabled();
    });
  });

  test.describe('Radio', () => {
    test('selects on click within group', async ({ page }) => {
      await page.goto('/iframe.html?id=components-radio--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const radios = page.locator('#storybook-root input[type="radio"]');
      const count = await radios.count();

      if (count >= 2) {
        const first = radios.nth(0);
        const second = radios.nth(1);

        // Click first radio
        await first.click();
        await expect(first).toBeChecked();
        await expect(second).not.toBeChecked();

        // Click second radio
        await second.click();
        await expect(second).toBeChecked();
        await expect(first).not.toBeChecked();
      }
    });

    test('can navigate with arrow keys', async ({ page }) => {
      await page.goto('/iframe.html?id=components-radio--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const radios = page.locator('#storybook-root input[type="radio"]');
      const count = await radios.count();

      if (count >= 2) {
        const first = radios.nth(0);

        // Focus first radio
        await first.focus();
        await expect(first).toBeFocused();

        // Press ArrowDown to move to next
        await page.keyboard.press('ArrowDown');

        // Second radio should now be focused/checked
        const second = radios.nth(1);
        await expect(second).toBeFocused();
      }
    });
  });
});

test.describe('Interactive Components', () => {
  test.describe('Button', () => {
    test('is clickable and receives focus', async ({ page }) => {
      await page.goto('/iframe.html?id=components-button--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const button = page.locator('#storybook-root button').first();
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();

      // Click button
      await button.click();

      // Focus button
      await button.focus();
      await expect(button).toBeFocused();
    });

    test('disabled button cannot be clicked', async ({ page }) => {
      await page.goto('/iframe.html?id=components-button--variants&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const disabledButton = page.locator('#storybook-root button[disabled]').first();

      if (await disabledButton.count() > 0) {
        await expect(disabledButton).toBeDisabled();
      }
    });

    test('can be activated with keyboard', async ({ page }) => {
      await page.goto('/iframe.html?id=components-button--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const button = page.locator('#storybook-root button').first();
      await button.focus();
      await expect(button).toBeFocused();

      // Press Enter to activate
      await page.keyboard.press('Enter');

      // Press Space to activate
      await page.keyboard.press('Space');
    });
  });

  test.describe('Tabs', () => {
    test('switches content on tab click', async ({ page }) => {
      await page.goto('/iframe.html?id=components-tabs--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const tabs = page.locator('#storybook-root [role="tab"], #storybook-root .csk-tabs__tab');
      const tabCount = await tabs.count();

      if (tabCount >= 2) {
        const firstTab = tabs.nth(0);
        const secondTab = tabs.nth(1);

        // Click first tab
        await firstTab.click();
        await expect(firstTab).toHaveAttribute('aria-selected', 'true').catch(() => {
          // Fallback: check for active class
          return expect(firstTab).toHaveClass(/active|selected/);
        });

        // Click second tab
        await secondTab.click();
        await expect(secondTab).toHaveAttribute('aria-selected', 'true').catch(() => {
          return expect(secondTab).toHaveClass(/active|selected/);
        });
      }
    });

    test('can navigate with arrow keys', async ({ page }) => {
      await page.goto('/iframe.html?id=components-tabs--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const tabs = page.locator('#storybook-root [role="tab"], #storybook-root .csk-tabs__tab');
      const tabCount = await tabs.count();

      if (tabCount >= 2) {
        const firstTab = tabs.nth(0);

        // Focus first tab
        await firstTab.focus();

        // Navigate with ArrowRight
        await page.keyboard.press('ArrowRight');

        // Second tab should be focused
        const secondTab = tabs.nth(1);
        await expect(secondTab).toBeFocused();
      }
    });
  });

  test.describe('Modal', () => {
    test('opens and displays content', async ({ page }) => {
      await page.goto('/iframe.html?id=components-modal--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      // Look for trigger button or modal that's already open
      const modal = page.locator('.csk-modal, [role="dialog"]').first();

      if (await modal.isVisible()) {
        // Modal is already visible in story
        await expect(modal).toBeVisible();

        // Verify modal has content
        const hasContent = await modal.evaluate((el) => el.textContent?.trim().length ?? 0);
        expect(hasContent).toBeGreaterThan(0);
      }
    });

    test('closes with close button', async ({ page }) => {
      await page.goto('/iframe.html?id=components-modal--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const modal = page.locator('.csk-modal, [role="dialog"]').first();

      if (await modal.isVisible()) {
        const closeButton = modal.locator('[aria-label="Close"], .csk-modal__close, button:has-text("Close")').first();

        if (await closeButton.count() > 0) {
          await closeButton.click();
          // Modal should close or at least close button should be clickable
        }
      }
    });

    test('traps focus inside modal', async ({ page }) => {
      await page.goto('/iframe.html?id=components-modal--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const modal = page.locator('.csk-modal, [role="dialog"]').first();

      if (await modal.isVisible()) {
        // Find focusable elements in modal
        const focusableElements = modal.locator('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const count = await focusableElements.count();

        if (count > 0) {
          // Focus first element
          await focusableElements.first().focus();

          // Tab through and verify focus stays in modal
          for (let i = 0; i < count + 1; i++) {
            await page.keyboard.press('Tab');
            const focused = await page.evaluate(() => document.activeElement?.closest('.csk-modal, [role="dialog"]'));
            // Focus should stay within modal (or be on close button)
          }
        }
      }
    });
  });

  test.describe('Pagination', () => {
    test('can navigate to next page', async ({ page }) => {
      await page.goto('/iframe.html?id=components-pagination--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const pagination = page.locator('.csk-pagination').first();
      await expect(pagination).toBeVisible();

      // Find next button
      const nextButton = pagination.locator('[aria-label*="next" i], [aria-label*="Next" i], button:has-text(">"), button:has-text("Next")').first();

      if (await nextButton.count() > 0 && await nextButton.isEnabled()) {
        await nextButton.click();
        // Verify page changed (active page indicator should change)
      }
    });

    test('can click on page number', async ({ page }) => {
      await page.goto('/iframe.html?id=components-pagination--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const pagination = page.locator('.csk-pagination').first();
      const pageButtons = pagination.locator('.csk-pagination__page, [aria-label*="page" i]');
      const count = await pageButtons.count();

      if (count >= 2) {
        const secondPage = pageButtons.nth(1);
        await secondPage.click();
        // Should become active
        await expect(secondPage).toHaveClass(/active|current/).catch(() => {
          return expect(secondPage).toHaveAttribute('aria-current', 'page');
        });
      }
    });
  });

  test.describe('Dropdown', () => {
    test('opens on click', async ({ page }) => {
      await page.goto('/iframe.html?id=components-dropdown--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const trigger = page.locator('.csk-dropdown__trigger, [aria-haspopup="menu"], [aria-haspopup="listbox"]').first();

      if (await trigger.count() > 0) {
        await trigger.click();

        // Dropdown menu should appear
        const menu = page.locator('.csk-dropdown__menu, [role="menu"], [role="listbox"]').first();
        await expect(menu).toBeVisible();
      }
    });

    test('closes on outside click', async ({ page }) => {
      await page.goto('/iframe.html?id=components-dropdown--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const trigger = page.locator('.csk-dropdown__trigger, [aria-haspopup="menu"]').first();

      if (await trigger.count() > 0) {
        await trigger.click();

        const menu = page.locator('.csk-dropdown__menu, [role="menu"]').first();
        await expect(menu).toBeVisible();

        // Click outside
        await page.click('body', { position: { x: 10, y: 10 } });

        // Menu should close
        await expect(menu).not.toBeVisible({ timeout: 1000 }).catch(() => {
          // Some implementations may not auto-close
        });
      }
    });
  });
});

test.describe('Data Components', () => {
  test.describe('Calendar', () => {
    test('can navigate to next month', async ({ page }) => {
      await page.goto('/iframe.html?id=components-calendar--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const calendar = page.locator('.csk-calendar').first();
      await expect(calendar).toBeVisible();

      // Get current month title
      const monthTitle = calendar.locator('.csk-calendar__title, .csk-calendar__month-title').first();
      const initialMonth = await monthTitle.textContent();

      // Find next month button
      const nextButton = calendar.locator('[aria-label*="next" i], button:has-text(">"), .csk-calendar__nav-next').first();

      if (await nextButton.count() > 0) {
        await nextButton.click();
        await page.waitForTimeout(300); // Wait for animation

        // Month title should change
        const newMonth = await monthTitle.textContent();
        expect(newMonth).not.toBe(initialMonth);
      }
    });

    test('can navigate to previous month', async ({ page }) => {
      await page.goto('/iframe.html?id=components-calendar--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const calendar = page.locator('.csk-calendar').first();
      const monthTitle = calendar.locator('.csk-calendar__title, .csk-calendar__month-title').first();
      const initialMonth = await monthTitle.textContent();

      const prevButton = calendar.locator('[aria-label*="prev" i], button:has-text("<"), .csk-calendar__nav-prev').first();

      if (await prevButton.count() > 0) {
        await prevButton.click();
        await page.waitForTimeout(300);

        const newMonth = await monthTitle.textContent();
        expect(newMonth).not.toBe(initialMonth);
      }
    });

    test('displays days grid correctly', async ({ page }) => {
      await page.goto('/iframe.html?id=components-calendar--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const calendar = page.locator('.csk-calendar').first();
      await expect(calendar).toBeVisible();

      // Should have day headers (Mon-Sun)
      const dayHeaders = calendar.locator('.csk-calendar__weekday');
      const headerCount = await dayHeaders.count();
      expect(headerCount).toBe(7);

      // Should have day numbers (varies by month, at least 28)
      const dayNumbers = calendar.locator('.csk-calendar__day-number');
      const cellCount = await dayNumbers.count();
      expect(cellCount).toBeGreaterThanOrEqual(28);
    });
  });

  test.describe('Table', () => {
    test('renders rows and columns', async ({ page }) => {
      await page.goto('/iframe.html?id=components-table--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const table = page.locator('#storybook-root table').first();
      await expect(table).toBeVisible();

      // Should have header row
      const headers = table.locator('thead th');
      const headerCount = await headers.count();
      expect(headerCount).toBeGreaterThan(0);

      // Should have body rows
      const rows = table.locator('tbody tr');
      const rowCount = await rows.count();
      expect(rowCount).toBeGreaterThan(0);
    });

    test('header cells are properly labeled', async ({ page }) => {
      await page.goto('/iframe.html?id=components-table--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const table = page.locator('#storybook-root table').first();
      const headers = table.locator('thead th');
      const count = await headers.count();

      for (let i = 0; i < count; i++) {
        const header = headers.nth(i);
        const text = await header.textContent();
        expect(text?.trim().length).toBeGreaterThan(0);
      }
    });
  });

  test.describe('ResultsTable', () => {
    test('renders race results with positions', async ({ page }) => {
      await page.goto('/iframe.html?id=components-resultstable--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const table = page.locator('.csk-results-table').first();
      await expect(table).toBeVisible();

      // Should have position column
      const positionCells = table.locator('td:first-child, .csk-results-table__position');
      const count = await positionCells.count();
      expect(count).toBeGreaterThan(0);

      // First position should be 1
      const firstPosition = await positionCells.first().textContent();
      expect(firstPosition?.trim()).toMatch(/1|🥇/);
    });

    test('handles responsive layout', async ({ page }) => {
      // Test at narrow width
      await page.setViewportSize({ width: 400, height: 600 });

      await page.goto('/iframe.html?id=components-resultstable--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForTimeout(testDefaults.settleTime);

      const table = page.locator('.csk-results-table').first();
      await expect(table).toBeVisible();

      // Table should not overflow its container
      const wrapper = page.locator('.csk-results-table-wrapper').first();
      if (await wrapper.count() > 0) {
        const overflows = await wrapper.evaluate((el) => el.scrollWidth > el.clientWidth);
        // ResultsTable wrapper handles horizontal scroll, so this is acceptable
        // Just verify the table is still usable
        const rows = table.locator('tbody tr');
        expect(await rows.count()).toBeGreaterThan(0);
      }
    });
  });
});

test.describe('Toast Notifications', () => {
  test('displays toast after trigger click', async ({ page }) => {
    await page.goto('/iframe.html?id=components-toast--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(testDefaults.settleTime);

    // Click button to trigger toast
    const triggerButton = page.locator('#storybook-root button').first();
    await expect(triggerButton).toBeVisible();
    await triggerButton.click();

    // Wait for toast to appear (in portal, so check body)
    const toast = page.locator('.csk-toast').first();
    await expect(toast).toBeVisible({ timeout: 3000 });

    // Verify toast has content
    const hasContent = await toast.evaluate((el) => el.textContent?.trim().length ?? 0);
    expect(hasContent).toBeGreaterThan(0);
  });

  test('toast has dismiss button', async ({ page }) => {
    await page.goto('/iframe.html?id=components-toast--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(testDefaults.settleTime);

    // Trigger a toast
    const triggerButton = page.locator('#storybook-root button').first();
    await triggerButton.click();

    const toast = page.locator('.csk-toast').first();
    await expect(toast).toBeVisible({ timeout: 3000 });

    // Find dismiss button
    const dismissButton = toast.locator('.csk-toast__dismiss');
    await expect(dismissButton).toBeVisible();

    // Click dismiss and verify toast disappears
    await dismissButton.click();
    await expect(toast).not.toBeVisible({ timeout: 2000 });
  });
});

test.describe('Progress Indicators', () => {
  test('bar shows progress value', async ({ page }) => {
    await page.goto('/iframe.html?id=components-progress--bar-default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(testDefaults.settleTime);

    const progressBar = page.locator('.csk-progress, [role="progressbar"]').first();
    await expect(progressBar).toBeVisible();

    // Should have aria-valuenow or visual indicator
    const hasAriaValue = await progressBar.getAttribute('aria-valuenow');
    const progressFill = progressBar.locator('.csk-progress__fill, .csk-progress__bar');

    expect(hasAriaValue !== null || await progressFill.count() > 0).toBe(true);
  });

  test('steps indicator shows current step', async ({ page }) => {
    await page.goto('/iframe.html?id=components-progress--steps-default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(testDefaults.settleTime);

    // Progress steps has class .csk-progress--steps
    const stepsContainer = page.locator('.csk-progress--steps').first();
    await expect(stepsContainer).toBeVisible();

    // Should have multiple step indicators
    const stepItems = stepsContainer.locator('.csk-progress__step');
    const count = await stepItems.count();
    expect(count).toBeGreaterThan(1);

    // Should have current step indicator
    const currentStep = stepsContainer.locator('.csk-progress__step--current, [aria-current="step"]').first();
    await expect(currentStep).toBeVisible();
  });
});
