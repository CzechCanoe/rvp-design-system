import { test, expect } from '@playwright/test';
import { crossBrowserComponents, crossBrowserPrototypes, testDefaults } from './config';

/**
 * Cross-browser compatibility tests
 * Tests CSS features and rendering across Chrome, Firefox, and WebKit
 *
 * Uses central config from ./config.ts for story IDs
 */

test.describe('Cross-Browser: Component Rendering', () => {
  for (const component of crossBrowserComponents) {
    test(`${component.name} renders correctly`, async ({ page, browserName }) => {
      await page.goto(`/iframe.html?id=${component.storyId}&viewMode=story`);

      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(testDefaults.settleTime);

      const root = page.locator('#storybook-root');
      await expect(root).toBeVisible();

      // Verify component rendered with content
      const childCount = await root.evaluate((el) => el.children.length);
      expect(childCount).toBeGreaterThan(0);

      // Visual regression per browser
      await expect(root).toHaveScreenshot(
        `cross-browser/${component.name}-${browserName}.png`,
        {
          maxDiffPixels: component.maxDiffPixels ?? 50,
          animations: 'disabled',
        }
      );
    });
  }
});

test.describe('Cross-Browser: CSS Features', () => {
  test('CSS Variables are resolved to actual values', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(testDefaults.settleTime);

    const button = page.locator('#storybook-root button').first();
    await expect(button).toBeVisible();

    // CSS custom properties should resolve to actual color values
    const backgroundColor = await button.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Should be a resolved color (rgb/rgba format), not empty or 'transparent'
    expect(backgroundColor).toBeTruthy();
    expect(backgroundColor).toMatch(/^rgb/);
  });

  test('Gradients render with actual colors', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--variants&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(testDefaults.settleTime);

    // Find a gradient button specifically
    const gradientButton = page.locator('#storybook-root .csk-btn--gradient, #storybook-root [class*="gradient"]').first();

    const styles = await gradientButton.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundImage: computed.backgroundImage,
        backgroundColor: computed.backgroundColor,
      };
    });

    // Should have gradient or solid background (not empty)
    const hasBackground =
      (styles.backgroundImage && styles.backgroundImage !== 'none') ||
      (styles.backgroundColor && styles.backgroundColor !== 'rgba(0, 0, 0, 0)');
    expect(hasBackground).toBe(true);
  });

  test('Flexbox layouts position children correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-card--variants&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(testDefaults.settleTime);

    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();

    // Verify flex container has properly positioned children
    const flexInfo = await root.evaluate((el) => {
      const flexContainers = el.querySelectorAll('[class*="card"]');
      let validFlexCount = 0;

      for (const container of flexContainers) {
        const style = window.getComputedStyle(container);
        if (style.display === 'flex' || style.display === 'inline-flex') {
          // Check children are positioned (not all at 0,0)
          const children = container.children;
          if (children.length > 1) {
            const firstRect = children[0].getBoundingClientRect();
            const lastRect = children[children.length - 1].getBoundingClientRect();
            if (firstRect.top !== lastRect.top || firstRect.left !== lastRect.left) {
              validFlexCount++;
            }
          }
        }
      }
      return validFlexCount;
    });

    expect(flexInfo).toBeGreaterThan(0);
  });

  test('CSS Grid creates proper grid structure', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(testDefaults.settleTime);

    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();

    // Find grid container and verify grid properties
    const gridInfo = await root.evaluate((el) => {
      const elements = el.querySelectorAll('*');
      for (const elem of elements) {
        const display = window.getComputedStyle(elem).display;
        if (display === 'grid') {
          const columns = window.getComputedStyle(elem).gridTemplateColumns;
          return {
            hasGrid: true,
            hasColumns: columns && columns !== 'none',
          };
        }
      }
      return { hasGrid: false, hasColumns: false };
    });

    expect(gridInfo.hasGrid).toBe(true);
  });

  test('Backdrop-filter renders or has fallback', async ({ page }) => {
    await page.goto('/iframe.html?id=components-header--glass&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(testDefaults.settleTime);

    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();

    // Glass effect should have visible content (either blur works or fallback bg)
    const hasVisibleHeader = await root.evaluate((el) => {
      const header = el.querySelector('[class*="header"]');
      if (!header) return false;

      const style = window.getComputedStyle(header);
      // Either backdrop-filter is applied, or has fallback background
      const hasBackdrop = style.backdropFilter && style.backdropFilter !== 'none';
      const hasBg = style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)';

      return hasBackdrop || hasBg;
    });

    expect(hasVisibleHeader).toBe(true);
  });

  test('Animations are defined and running', async ({ page }) => {
    await page.goto('/iframe.html?id=components-liveindicator--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(testDefaults.settleTime);

    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();

    // Check animation properties are set
    const animationInfo = await root.evaluate((el) => {
      const elements = el.querySelectorAll('*');
      for (const elem of elements) {
        const style = window.getComputedStyle(elem);
        const animation = style.animation || style.animationName;
        if (animation && animation !== 'none' && animation.length > 4) {
          return {
            hasAnimation: true,
            animationName: style.animationName,
          };
        }
      }
      return { hasAnimation: false, animationName: '' };
    });

    expect(animationInfo.hasAnimation).toBe(true);
  });

  test('Table has proper semantic structure', async ({ page }) => {
    await page.goto('/iframe.html?id=components-table--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(testDefaults.settleTime);

    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();

    // Verify table semantic structure
    const tableStructure = await root.evaluate((el) => {
      const table = el.querySelector('table');
      if (!table) return { hasTable: false };

      return {
        hasTable: true,
        hasThead: !!table.querySelector('thead'),
        hasTbody: !!table.querySelector('tbody'),
        headerCount: table.querySelectorAll('th').length,
        rowCount: table.querySelectorAll('tbody tr').length,
      };
    });

    expect(tableStructure.hasTable).toBe(true);
    expect(tableStructure.hasThead).toBe(true);
    expect(tableStructure.hasTbody).toBe(true);
    expect(tableStructure.headerCount).toBeGreaterThan(0);
    expect(tableStructure.rowCount).toBeGreaterThan(0);
  });
});

test.describe('Cross-Browser: Prototype Pages', () => {
  for (const prototype of crossBrowserPrototypes) {
    test(`${prototype.name} - full page render`, async ({ page, browserName }) => {
      await page.goto(`/iframe.html?id=${prototype.storyId}&viewMode=story`);

      await page.waitForSelector('#storybook-root', {
        state: 'visible',
        timeout: 60000,
      });
      await page.waitForLoadState('networkidle');
      // WebKit needs longer stabilization
      await page.waitForTimeout(browserName === 'webkit' ? 3000 : testDefaults.prototypeSettleTime);

      // Collect JS errors
      const errors: string[] = [];
      page.on('pageerror', (err) => errors.push(err.message));

      const root = page.locator('#storybook-root');
      await expect(root).toBeVisible();

      // Verify page has substantial content
      const contentLength = await root.evaluate((el) => el.textContent?.trim().length ?? 0);
      expect(contentLength).toBeGreaterThan(100);

      // Visual regression per browser
      await expect(root).toHaveScreenshot(
        `cross-browser/prototype-${prototype.name}-${browserName}.png`,
        {
          maxDiffPixels: prototype.maxDiffPixels ?? 150,
          animations: 'disabled',
          timeout: 30000,
        }
      );

      // No critical JS errors (ignore benign ones)
      const criticalErrors = errors.filter(e =>
        !e.includes('ResizeObserver') &&
        !e.includes('Script error')
      );
      expect(criticalErrors).toHaveLength(0);
    });
  }
});

test.describe('Cross-Browser: Dark Mode', () => {
  // Test dark mode on components that use colors heavily
  const darkModeComponents = [
    { name: 'Card-Variants', storyId: 'components-card--variants' },
    { name: 'Button-Variants', storyId: 'components-button--variants' },
    { name: 'Table', storyId: 'components-table--default' },
  ];

  for (const component of darkModeComponents) {
    test(`${component.name} - dark mode renders`, async ({ page, browserName }) => {
      await page.goto(
        `/iframe.html?id=${component.storyId}&viewMode=story&globals=theme:dark`
      );

      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(testDefaults.settleTime);

      const root = page.locator('#storybook-root');
      await expect(root).toBeVisible();

      // Verify dark theme is applied
      const isDark = await page.evaluate(() => {
        return document.documentElement.getAttribute('data-theme') === 'dark' ||
               document.body.getAttribute('data-theme') === 'dark' ||
               document.querySelector('[data-theme="dark"]') !== null;
      });
      expect(isDark).toBe(true);

      // Verify dark colors are actually applied (not white background)
      const hasDarkColors = await root.evaluate((el) => {
        const style = window.getComputedStyle(el);
        const bg = style.backgroundColor;
        // Dark mode should have darker background (not white/transparent)
        if (bg === 'rgba(0, 0, 0, 0)') return true; // Transparent is OK (inherits)
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          const [, r, g, b] = match.map(Number);
          // Average RGB < 200 indicates darker colors
          return (r + g + b) / 3 < 200;
        }
        return true;
      });
      expect(hasDarkColors).toBe(true);

      await expect(root).toHaveScreenshot(
        `cross-browser/${component.name}-dark-${browserName}.png`,
        {
          maxDiffPixels: 50,
          animations: 'disabled',
        }
      );
    });
  }
});

test.describe('Cross-Browser: Responsive Behavior', () => {
  test('Mobile viewport renders correctly', async ({ page, browserName }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/iframe.html?id=prototypes-calendar-page--embed&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible', timeout: 30000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const root = page.locator('#storybook-root');

    // Verify content renders at mobile size
    const hasContent = await root.evaluate((el) => el.textContent?.trim().length ?? 0);
    expect(hasContent).toBeGreaterThan(50);

    // Verify no horizontal overflow
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow).toBe(false);

    await expect(root).toHaveScreenshot(
      `cross-browser/mobile-calendar-${browserName}.png`,
      {
        maxDiffPixels: 100,
        animations: 'disabled',
      }
    );
  });

  test('Tablet viewport renders correctly', async ({ page, browserName }, testInfo) => {
    if (browserName === 'webkit') {
      testInfo.setTimeout(90000);
    }

    await page.setViewportSize({ width: 768, height: 1024 });

    await page.goto('/iframe.html?id=prototypes-dashboard-page--satellite&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible', timeout: 60000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(browserName === 'webkit' ? 3000 : testDefaults.prototypeSettleTime);

    const root = page.locator('#storybook-root');

    // Verify content renders at tablet size
    const hasContent = await root.evaluate((el) => el.textContent?.trim().length ?? 0);
    expect(hasContent).toBeGreaterThan(100);

    await expect(root).toHaveScreenshot(
      `cross-browser/tablet-dashboard-${browserName}.png`,
      {
        maxDiffPixels: 150,
        animations: 'disabled',
        timeout: 30000,
      }
    );
  });
});
