import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for page prototypes
 * Tests all prototype pages in both light and dark modes
 */

interface PrototypeConfig {
  name: string;
  storyId: string;
  maxDiffPixels?: number;
  timeout?: number;
}

const prototypes: PrototypeConfig[] = [
  {
    name: 'CalendarPage-Embed',
    storyId: 'prototypes-calendar-page--embed',
  },
  {
    name: 'ResultsPage-Embed',
    storyId: 'prototypes-results-page--embed',
  },
  {
    name: 'LivePage-Embed',
    storyId: 'prototypes-live-page--embed',
    maxDiffPixels: 6000, // Higher tolerance for animated LiveIndicator (pulse effect)
    timeout: 30000,
  },
  {
    name: 'RegistrationPage-Satellite',
    storyId: 'prototypes-registration-page--satellite',
  },
  {
    name: 'ProfilePage-Satellite',
    storyId: 'prototypes-profilepage--satellite',
  },
  {
    name: 'DashboardPage-Satellite',
    storyId: 'prototypes-dashboard-page--satellite',
    timeout: 60000, // Larger page needs more time
  },
];

test.describe('Prototype Pages - Light Mode', () => {
  for (const prototype of prototypes) {
    test(`${prototype.name} - screenshot`, async ({ page }) => {
      // Use iframe.html for direct story access
      await page.goto(`/iframe.html?id=${prototype.storyId}&viewMode=story`);

      // Wait for the story root to be visible with custom timeout
      await page.waitForSelector('#storybook-root', {
        state: 'visible',
        timeout: prototype.timeout ?? 30000,
      });
      await page.waitForLoadState('networkidle');

      // Additional wait for animations and lazy content
      await page.waitForTimeout(1500);

      const root = page.locator('#storybook-root');

      // Verify prototype rendered with content (not empty/broken)
      const childCount = await root.evaluate((el) => el.children.length);
      expect(childCount).toBeGreaterThan(0);

      // Verify page has meaningful content
      const contentLength = await root.evaluate((el) => el.textContent?.trim().length ?? 0);
      expect(contentLength).toBeGreaterThan(50); // Prototypes should have substantial content

      await expect(root).toHaveScreenshot(
        `${prototype.name}-light.png`,
        {
          maxDiffPixels: prototype.maxDiffPixels ?? 80,
          animations: 'disabled',
          timeout: prototype.timeout ?? 10000,
        }
      );
    });
  }
});

test.describe('Prototype Pages - Dark Mode', () => {
  for (const prototype of prototypes) {
    test(`${prototype.name} - dark mode screenshot`, async ({ page }) => {
      // Navigate with dark mode global
      await page.goto(
        `/iframe.html?id=${prototype.storyId}&viewMode=story&globals=theme:dark`
      );

      await page.waitForSelector('#storybook-root', {
        state: 'visible',
        timeout: prototype.timeout ?? 30000,
      });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);

      const root = page.locator('#storybook-root');

      // Verify prototype rendered with content (not empty/broken)
      const childCount = await root.evaluate((el) => el.children.length);
      expect(childCount).toBeGreaterThan(0);

      // Verify page has meaningful content
      const contentLength = await root.evaluate((el) => el.textContent?.trim().length ?? 0);
      expect(contentLength).toBeGreaterThan(50); // Prototypes should have substantial content

      await expect(root).toHaveScreenshot(
        `${prototype.name}-dark.png`,
        {
          maxDiffPixels: prototype.maxDiffPixels ?? 80,
          animations: 'disabled',
          timeout: prototype.timeout ?? 10000,
        }
      );
    });
  }
});
