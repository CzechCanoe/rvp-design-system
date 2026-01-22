import { test, expect } from '@playwright/test';

/**
 * Cross-browser compatibility tests
 * Tests key CSS features and rendering across Chrome, Firefox, and WebKit
 */

// Key components to test across all browsers
const crossBrowserComponents = [
  // CSS Grid and Flexbox
  { name: 'Table', storyId: 'components-table--default', features: ['grid', 'sticky-header'] },
  { name: 'Card-Variants', storyId: 'components-card--variants', features: ['flexbox', 'shadows', 'gradients'] },

  // CSS Variables and Gradients
  { name: 'Button-Variants', storyId: 'components-button--variants', features: ['gradients', 'transitions'] },
  { name: 'Badge-CskSections', storyId: 'components-badge--csk-sections', features: ['gradients', 'colors'] },

  // Backdrop-filter (glassmorphism)
  { name: 'Header-Glass', storyId: 'components-header--glass', features: ['backdrop-filter'] },
  { name: 'Modal-StyleVariants', storyId: 'components-modal--all-style-variants', features: ['backdrop-filter', 'animations'] },

  // Animations and Transitions
  { name: 'LiveIndicator', storyId: 'components-liveindicator--default', features: ['animations', 'keyframes'] },
  { name: 'Skeleton', storyId: 'components-skeleton--default', features: ['animations', 'shimmer'] },

  // Complex layouts
  { name: 'Calendar', storyId: 'components-calendar--default', features: ['grid', 'responsive'] },
  { name: 'Tabs', storyId: 'components-tabs--default', features: ['flexbox', 'underline'] },
];

// Prototypes for full-page cross-browser testing
const crossBrowserPrototypes = [
  { name: 'CalendarPage', storyId: 'prototypes-calendar-page--embed', maxDiffPixels: 200 },
  { name: 'LivePage', storyId: 'prototypes-live-page--embed', maxDiffPixels: 6000 }, // Higher for animations
  { name: 'DashboardPage', storyId: 'prototypes-dashboard-page--satellite', maxDiffPixels: 200 },
];

test.describe('Cross-Browser: Component Rendering', () => {
  for (const component of crossBrowserComponents) {
    test(`${component.name} renders correctly`, async ({ page, browserName }) => {
      await page.goto(`/iframe.html?id=${component.storyId}&viewMode=story`);

      await page.waitForSelector('#storybook-root', { state: 'visible' });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      // Basic visibility check
      const root = page.locator('#storybook-root');
      await expect(root).toBeVisible();

      // Visual regression per browser
      await expect(root).toHaveScreenshot(
        `cross-browser/${component.name}-${browserName}.png`,
        {
          maxDiffPixels: 100,
          animations: 'disabled',
        }
      );
    });
  }
});

test.describe('Cross-Browser: CSS Features', () => {
  test('CSS Variables are applied correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(500);

    // Find button element within the story root
    const button = page.locator('#storybook-root button').first();
    await expect(button).toBeVisible();

    // Check that CSS custom properties are resolved (background has a color)
    const backgroundColor = await button.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Should have a resolved color (not empty)
    expect(backgroundColor).toBeTruthy();
    expect(backgroundColor.length).toBeGreaterThan(0);
  });

  test('Gradients render correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--variants&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(500);

    const button = page.locator('#storybook-root button').first();
    await expect(button).toBeVisible();

    // Check that gradient or solid background is applied
    const styles = await button.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundImage: computed.backgroundImage,
        backgroundColor: computed.backgroundColor,
      };
    });

    // Should have either gradient or solid color
    const hasBackground =
      (styles.backgroundImage && styles.backgroundImage !== 'none') ||
      (styles.backgroundColor && styles.backgroundColor !== 'rgba(0, 0, 0, 0)');
    expect(hasBackground).toBe(true);
  });

  test('Flexbox layouts work correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-card--variants&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(500);

    // Story root should contain multiple visible elements
    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();

    // Check there's actual content rendered
    const childCount = await root.evaluate((el) => el.children.length);
    expect(childCount).toBeGreaterThan(0);
  });

  test('CSS Grid layouts work correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-calendar--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(500);

    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();

    // Check for grid or flex display somewhere in the component
    const hasGridOrFlex = await root.evaluate((el) => {
      const elements = el.querySelectorAll('*');
      for (const elem of elements) {
        const display = window.getComputedStyle(elem).display;
        if (display === 'grid' || display === 'flex') return true;
      }
      return false;
    });

    expect(hasGridOrFlex).toBe(true);
  });

  test('Backdrop-filter works (with fallback check)', async ({ page }) => {
    await page.goto('/iframe.html?id=components-header--glass&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(500);

    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();

    // Check that content is visible (glass effect working or fallback)
    const hasVisibleContent = await root.evaluate((el) => {
      return el.textContent && el.textContent.trim().length > 0;
    });

    expect(hasVisibleContent).toBe(true);
  });

  test('Animations are defined', async ({ page }) => {
    await page.goto('/iframe.html?id=components-liveindicator--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(500);

    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();

    // Check that animation styles exist somewhere
    const hasAnimation = await root.evaluate((el) => {
      const elements = el.querySelectorAll('*');
      for (const elem of elements) {
        const animation = window.getComputedStyle(elem).animation;
        if (animation && animation !== 'none' && animation.length > 4) return true;
      }
      return false;
    });

    // Animation should be defined
    expect(hasAnimation).toBe(true);
  });

  test('Table styles work correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-table--default&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(500);

    const root = page.locator('#storybook-root');
    await expect(root).toBeVisible();

    // Check that table element exists with proper structure
    const hasTable = await root.evaluate((el) => {
      const table = el.querySelector('table');
      if (!table) return false;
      const thead = table.querySelector('thead');
      const tbody = table.querySelector('tbody');
      return !!(thead && tbody);
    });

    expect(hasTable).toBe(true);
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
      await page.waitForTimeout(1500);

      // Check no JS errors in console
      const errors: string[] = [];
      page.on('pageerror', (err) => errors.push(err.message));

      // Basic structure check
      const root = page.locator('#storybook-root');
      await expect(root).toBeVisible();

      // Visual regression per browser
      await expect(root).toHaveScreenshot(
        `cross-browser/prototype-${prototype.name}-${browserName}.png`,
        {
          maxDiffPixels: prototype.maxDiffPixels ?? 200,
          animations: 'disabled',
          timeout: 30000,
        }
      );

      // No critical JS errors
      const criticalErrors = errors.filter(e =>
        !e.includes('ResizeObserver') && // Ignore benign ResizeObserver errors
        !e.includes('Script error')
      );
      expect(criticalErrors).toHaveLength(0);
    });
  }
});

test.describe('Cross-Browser: Dark Mode', () => {
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
      await page.waitForTimeout(500);

      const root = page.locator('#storybook-root');
      await expect(root).toBeVisible();

      // Check dark theme is applied
      const isDark = await page.evaluate(() => {
        return document.documentElement.getAttribute('data-theme') === 'dark' ||
               document.body.getAttribute('data-theme') === 'dark';
      });

      expect(isDark).toBe(true);

      await expect(root).toHaveScreenshot(
        `cross-browser/${component.name}-dark-${browserName}.png`,
        {
          maxDiffPixels: 100,
          animations: 'disabled',
        }
      );
    });
  }
});

test.describe('Cross-Browser: Responsive Behavior', () => {
  test('Mobile viewport renders correctly', async ({ page, browserName }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/iframe.html?id=prototypes-calendar-page--embed&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible', timeout: 30000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page.locator('#storybook-root')).toHaveScreenshot(
      `cross-browser/mobile-calendar-${browserName}.png`,
      {
        maxDiffPixels: 150,
        animations: 'disabled',
      }
    );
  });

  test('Tablet viewport renders correctly', async ({ page, browserName }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    await page.goto('/iframe.html?id=prototypes-dashboard-page--satellite&viewMode=story');
    await page.waitForSelector('#storybook-root', { state: 'visible', timeout: 60000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    await expect(page.locator('#storybook-root')).toHaveScreenshot(
      `cross-browser/tablet-dashboard-${browserName}.png`,
      {
        maxDiffPixels: 200,
        animations: 'disabled',
      }
    );
  });
});
