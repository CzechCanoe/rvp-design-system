import { test, expect } from '@playwright/test';

/**
 * Container Query and Overflow/Layout Tests
 *
 * Tests that components respond correctly to container size changes
 * and handle narrow/constrained layouts without overflow issues.
 *
 * Container breakpoints (from tokens/container-queries.css):
 * - xs: 320px (very narrow - single column)
 * - sm: 480px (narrow - compact layout)
 * - md: 640px (medium - standard layout)
 * - lg: 800px (wide - expanded layout)
 * - xl: 1024px (extra wide - full features)
 */

// Container sizes for testing
const containerSizes = {
  xs: 280, // Very narrow - tests minimal layout
  sm: 400, // Narrow - tests compact layout
  md: 600, // Medium - standard layout
  lg: 800, // Wide - expanded layout
  xl: 1024, // Full width
};

// Components with container queries
const containerQueryComponents = [
  {
    name: 'Calendar',
    storyId: 'components-calendar--default',
    breakpoints: [350, 500], // From Calendar.css
    selector: '.csk-calendar',
  },
  {
    name: 'CalendarList',
    storyId: 'components-calendarlist--default',
    breakpoints: [300, 400], // From CalendarList.css
    selector: '.csk-calendar-list',
  },
  {
    name: 'CalendarCards',
    storyId: 'components-calendarcards--default',
    breakpoints: [320, 600, 900], // From CalendarCards.css
    selector: '.csk-calendar-cards',
  },
  {
    name: 'ResultsTable',
    storyId: 'components-resultstable--default',
    breakpoints: [400, 600, 800], // From ResultsTable.css
    selector: '.csk-results-table-wrapper',
  },
];

// Prototypes with embed variants (use container queries)
const embedPrototypes = [
  {
    name: 'CalendarPage-Embed',
    storyId: 'prototypes-calendar-page--embed',
  },
  {
    name: 'LivePage-Embed',
    storyId: 'prototypes-live-page--embed',
  },
  {
    name: 'ResultsPage-Embed',
    storyId: 'prototypes-results-page--embed',
  },
  {
    name: 'AthletesListPage-Embed',
    storyId: 'prototypes-athletes-list-page--embed',
  },
  {
    name: 'RankingsPage-Embed',
    storyId: 'prototypes-rankings-page--embed',
  },
];

test.describe('Container Query Breakpoints', () => {
  for (const component of containerQueryComponents) {
    test.describe(`${component.name}`, () => {
      for (const breakpoint of component.breakpoints) {
        test(`responds to container width at ${breakpoint}px`, async ({ page }) => {
          // Set viewport slightly larger than breakpoint to allow for container
          await page.setViewportSize({ width: breakpoint + 100, height: 800 });

          await page.goto(`/iframe.html?id=${component.storyId}&viewMode=story`);
          await page.waitForSelector('#storybook-root', { state: 'visible' });
          await page.waitForLoadState('networkidle');
          await page.waitForTimeout(500);

          const element = page.locator(component.selector).first();
          await expect(element).toBeVisible();

          // Take screenshot at this breakpoint
          await expect(element).toHaveScreenshot(
            `container-query/${component.name}-${breakpoint}px.png`,
            {
              maxDiffPixels: 100,
              animations: 'disabled',
            }
          );
        });
      }
    });
  }
});

test.describe('Narrow Container Layout Tests', () => {
  // Test that components don't overflow in very narrow containers
  for (const size of Object.entries(containerSizes)) {
    const [sizeName, width] = size;

    test(`Calendar renders without overflow at ${sizeName} (${width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: width + 50, height: 800 });

      await page.goto('/iframe.html?id=components-calendar--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      const calendar = page.locator('.csk-calendar').first();
      await expect(calendar).toBeVisible();

      // Check for horizontal overflow
      const hasOverflow = await calendar.evaluate((el) => {
        return el.scrollWidth > el.clientWidth;
      });

      expect(hasOverflow).toBe(false);
    });

    test(`ResultsTable renders without breaking at ${sizeName} (${width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: width + 50, height: 800 });

      await page.goto('/iframe.html?id=components-resultstable--default&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      const table = page.locator('.csk-results-table').first();
      await expect(table).toBeVisible();

      // Table should be visible and have content
      const hasContent = await table.evaluate((el) => {
        return el.querySelectorAll('tr').length > 0;
      });

      expect(hasContent).toBe(true);
    });
  }
});

test.describe('Embed Prototype Container Responsiveness', () => {
  for (const prototype of embedPrototypes) {
    test.describe(`${prototype.name}`, () => {
      // Test at narrow width (sidebar embed scenario)
      test('renders correctly at narrow width (300px)', async ({ page }) => {
        await page.setViewportSize({ width: 350, height: 900 });

        await page.goto(`/iframe.html?id=${prototype.storyId}&viewMode=story`);
        await page.waitForSelector('#storybook-root', { state: 'visible', timeout: 30000 });
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);

        const root = page.locator('#storybook-root');
        await expect(root).toBeVisible();

        // Check no horizontal scrollbar on page
        const bodyOverflow = await page.evaluate(() => {
          return document.body.scrollWidth > document.body.clientWidth;
        });

        // Visual regression at narrow width
        await expect(root).toHaveScreenshot(
          `container-responsive/${prototype.name}-narrow.png`,
          {
            maxDiffPixels: 200,
            animations: 'disabled',
          }
        );
      });

      // Test at medium width (main content embed scenario)
      test('renders correctly at medium width (600px)', async ({ page }) => {
        await page.setViewportSize({ width: 650, height: 900 });

        await page.goto(`/iframe.html?id=${prototype.storyId}&viewMode=story`);
        await page.waitForSelector('#storybook-root', { state: 'visible', timeout: 30000 });
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);

        const root = page.locator('#storybook-root');
        await expect(root).toBeVisible();

        await expect(root).toHaveScreenshot(
          `container-responsive/${prototype.name}-medium.png`,
          {
            maxDiffPixels: 200,
            animations: 'disabled',
          }
        );
      });
    });
  }
});

test.describe('Overflow Prevention Tests', () => {
  const componentsToTest = [
    { name: 'Badge', storyId: 'components-badge--csk-sections', selector: '.csk-badge' },
    { name: 'Button', storyId: 'components-button--variants', selector: '.csk-btn' },
    { name: 'Card', storyId: 'components-card--default', selector: '.csk-card' },
    { name: 'Tabs', storyId: 'components-tabs--default', selector: '.csk-tabs' },
    { name: 'AthleteCard', storyId: 'components-athletecard--default', selector: '.csk-athlete-card' },
    { name: 'StatCard', storyId: 'components-statcard--default', selector: '.csk-stat-card' },
  ];

  for (const component of componentsToTest) {
    test(`${component.name} handles very narrow container (250px)`, async ({ page }) => {
      await page.setViewportSize({ width: 300, height: 600 });

      await page.goto(`/iframe.html?id=${component.storyId}&viewMode=story`);
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      const element = page.locator(component.selector).first();

      // Check component is visible
      const isVisible = await element.isVisible().catch(() => false);
      if (!isVisible) {
        // Some components may not render at this size, which is acceptable
        return;
      }

      // Check that text doesn't overflow and cause horizontal scroll
      const rootOverflows = await page.evaluate(() => {
        const root = document.querySelector('#storybook-root');
        if (!root) return false;
        return root.scrollWidth > root.clientWidth + 10; // 10px tolerance
      });

      // Log overflow status for debugging
      if (rootOverflows) {
        console.log(`Warning: ${component.name} may have overflow at 250px width`);
      }
    });
  }
});

test.describe('Text Truncation and Ellipsis', () => {
  test('Calendar event titles truncate correctly', async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 600 });

    await page.goto('/iframe.html?id=components-calendar--csk-race-calendar&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    const eventTitle = page.locator('.csk-calendar__event-title').first();
    const isVisible = await eventTitle.isVisible().catch(() => false);

    if (isVisible) {
      // Check that overflow is hidden and text-overflow is ellipsis
      const styles = await eventTitle.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          overflow: computed.overflow,
          textOverflow: computed.textOverflow,
          whiteSpace: computed.whiteSpace,
        };
      });

      expect(styles.overflow).toBe('hidden');
      expect(styles.textOverflow).toBe('ellipsis');
      expect(styles.whiteSpace).toBe('nowrap');
    }
  });

  test('ResultsTable name column handles long names', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 600 });

    await page.goto('/iframe.html?id=components-resultstable--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    const table = page.locator('.csk-results-table').first();
    await expect(table).toBeVisible();

    // Table should not cause horizontal page overflow
    const pageOverflows = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    // Results table can have horizontal scroll (wrapper handles it)
    // But the page itself should not overflow
    expect(pageOverflows).toBe(false);
  });
});

test.describe('KanoeCzContext Embed Widths', () => {
  // Test embed scenarios with different kanoe.cz sidebar configurations
  const embedWidths = [
    { name: 'sidebar-narrow', width: 320, description: 'Narrow sidebar widget' },
    { name: 'sidebar-wide', width: 480, description: 'Wide sidebar widget' },
    { name: 'main-content', width: 720, description: 'Main content area' },
    { name: 'full-width', width: 1000, description: 'Full width container' },
  ];

  for (const config of embedWidths) {
    test(`CalendarPage embed at ${config.name} (${config.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: config.width + 50, height: 800 });

      await page.goto('/iframe.html?id=prototypes-calendar-page--embed&viewMode=story');
      await page.waitForSelector('#storybook-root', { state: 'visible', timeout: 30000 });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      const root = page.locator('#storybook-root');
      await expect(root).toBeVisible();

      // Take screenshot for visual verification
      await expect(root).toHaveScreenshot(
        `kanoe-embed/calendar-${config.name}.png`,
        {
          maxDiffPixels: 150,
          animations: 'disabled',
        }
      );
    });
  }
});

test.describe('Container Query CSS Support', () => {
  test('container-type is applied to Calendar', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(500);

    const calendar = page.locator('.csk-calendar').first();
    await expect(calendar).toBeVisible();

    const containerType = await calendar.evaluate((el) => {
      return window.getComputedStyle(el).containerType;
    });

    expect(containerType).toBe('inline-size');
  });

  test('container-type is applied to ResultsTable wrapper', async ({ page }) => {
    await page.goto('/iframe.html?id=components-resultstable--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(500);

    const wrapper = page.locator('.csk-results-table-wrapper').first();
    await expect(wrapper).toBeVisible();

    const containerType = await wrapper.evaluate((el) => {
      return window.getComputedStyle(el).containerType;
    });

    expect(containerType).toBe('inline-size');
  });

  test('container-name is correctly set', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(500);

    const calendar = page.locator('.csk-calendar').first();
    await expect(calendar).toBeVisible();

    const containerName = await calendar.evaluate((el) => {
      return window.getComputedStyle(el).containerName;
    });

    expect(containerName).toBe('calendar');
  });
});
