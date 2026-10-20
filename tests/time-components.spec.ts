import { test, expect } from '@playwright/test';
import { applyQuarantine } from './quarantine';

/**
 * Functional checks of the T6 time components in a real browser
 * (TimeValue, RunningTime, DataAge). No screenshots here.
 */

applyQuarantine(test);

const story = (id: string) => `/iframe.html?id=${id}&viewMode=story`;

test.describe('Time components', () => {
  test('RunningTime state switching: ticks, freezes, unfreezes, switches state', async ({ page }) => {
    await page.goto(story('components-runningtime--state-switching'));
    const root = page.locator('#storybook-root');
    const time = root.locator('.csk-running-time .csk-time-value');
    await expect(time).toHaveText('46.1');

    await root.getByRole('button', { name: '+1 s' }).click();
    await expect(time).toHaveText('47.1');
    await expect(root.locator('.csk-running-time')).not.toHaveClass(/csk-running-time--stale/);

    await root.getByRole('button', { name: /bez dat/ }).click();
    await expect(root.locator('.csk-running-time')).toHaveClass(/csk-running-time--stale/);
    await expect(time).toHaveText('49.1');
    await expect(root.locator('.csk-running-time__age')).toHaveText('před 4 s');

    await root.getByRole('button', { name: 'Nová hodnota' }).click();
    await expect(root.locator('.csk-running-time')).not.toHaveClass(/csk-running-time--stale/);
    await expect(time).toHaveText('50.1');

    await root.getByRole('button', { name: 'Na startu' }).click();
    await expect(root.locator('.csk-running-time')).toHaveCount(0);
    await expect(root.locator('.csk-time-value--muted')).toHaveText('0.0');

    await root.getByRole('button', { name: 'Neznámo' }).click();
    await expect(root.locator('.csk-time-value--unknown')).toHaveCount(1);
  });

  test('RunningTime with the default browser clock ticks in real time', async ({ page }) => {
    await page.goto(story('components-runningtime--real-clock'));
    const time = page.locator('#storybook-root .csk-running-time .csk-time-value');
    await expect(time).toBeVisible();
    const first = await time.textContent();
    await expect(time).not.toHaveText(first ?? '', { timeout: 2_000 });
  });

  test('DataAge dots: offline grey, reconnecting amber, never red (#84.8)', async ({ page }) => {
    await page.goto(story('components-dataage--overview'));
    await page.waitForSelector('#storybook-root .csk-data-age--offline', { state: 'visible' });
    const colours = await page.evaluate(() => {
      const resolve = (token: string) => {
        const probe = document.createElement('span');
        probe.style.color = `var(${token})`;
        document.body.appendChild(probe);
        const value = getComputedStyle(probe).color;
        probe.remove();
        return value;
      };
      // the dot is drawn with borders in its `color`; dots on the navy band (data-tone="on-dark") are lightened
      const dots = (connection: string) =>
        [...document.querySelectorAll(`#storybook-root .csk-data-age--${connection} .csk-data-age__dot`)]
          .filter((el) => !el.closest('[data-tone="on-dark"]'))
          .map((el) => getComputedStyle(el).borderTopColor);
      return {
        offline: dots('offline'),
        reconnecting: dots('reconnecting'),
        grey: resolve('--csk-color-state-unknown'),
        amber: resolve('--csk-color-warning'),
        reds: [resolve('--csk-color-error'), resolve('--csk-color-live')],
      };
    });
    expect(colours.offline.length).toBeGreaterThan(0);
    expect(colours.reconnecting.length).toBeGreaterThan(0);
    for (const c of colours.offline) expect(c).toBe(colours.grey);
    for (const c of colours.reconnecting) expect(c).toBe(colours.amber);
    for (const c of [...colours.offline, ...colours.reconnecting]) expect(colours.reds).not.toContain(c);
  });

  // Review of #93 (WCAG 1.4.1 / 1.4.11): the state has a shape too, and the dot keeps >= 3:1 on surface and navy band
  for (const story of ['components-dataage--overview', 'components-dataage--compact']) {
    test(`DataAge dot shapes and contrast (${story})`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story}&viewMode=story`);
      await page.waitForSelector('#storybook-root .csk-data-age--offline', { state: 'visible' });
      const dots = await page.evaluate(() => {
        // computed colours are rgb(0-255) or, for color-mix(), color(srgb 0-1)
        const rgb = (c: string) => {
          const v = (c.replace('srgb', '').match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
          return c.startsWith('color(') ? v.map((x) => x * 255) : v;
        };
        const lum = (c: string) => {
          const [r, g, b] = rgb(c).map((v) => {
            const s = v / 255;
            return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
          });
          return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        const ratio = (a: string, b: string) => {
          const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
          return (hi + 0.05) / (lo + 0.05);
        };
        const backdrop = (el: Element) => {
          for (let n: Element | null = el.parentElement; n; n = n.parentElement) {
            const bg = getComputedStyle(n).backgroundColor;
            if (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg;
          }
          return 'rgb(255, 255, 255)';
        };
        return [...document.querySelectorAll('#storybook-root .csk-data-age__dot')].map((el) => {
          const cs = getComputedStyle(el);
          const state = ['ok', 'reconnecting', 'offline'].find((s) =>
            el.parentElement!.classList.contains(`csk-data-age--${s}`)
          );
          return {
            state: state ?? 'none',
            widths: [cs.borderTopWidth, cs.borderRightWidth, cs.borderBottomWidth, cs.borderLeftWidth].map(parseFloat),
            width: parseFloat(cs.width),
            contrast: ratio(cs.borderTopColor, backdrop(el)),
            onDark: !!el.closest('[data-tone="on-dark"]'),
          };
        });
      });
      expect(dots.length).toBeGreaterThan(0);
      for (const dot of dots) {
        const half = dot.width / 2;
        if (dot.state === 'ok' || dot.state === 'none') expect(dot.widths, dot.state).toEqual([half, half, half, half]);
        if (dot.state === 'reconnecting') {
          // half filled: the left border fills its half, the others are a thin ring
          expect(dot.widths[3]).toBe(half);
          for (const w of dot.widths.slice(0, 3)) expect(w).toBeLessThan(half);
        }
        if (dot.state === 'offline') for (const w of dot.widths) expect(w).toBeLessThan(half); // hollow ring
        expect(dot.contrast, `${dot.state}${dot.onDark ? ' on dark' : ''}`).toBeGreaterThanOrEqual(3);
      }
      expect(dots.some((d) => d.onDark && d.state !== 'none')).toBe(true);
    });
  }

  test('static stories do not animate (reduced motion, ticking digits are data)', async ({ page }) => {
    for (const id of ['components-runningtime--states', 'components-dataage--overview', 'components-timevalue--variants']) {
      await page.goto(story(id));
      await page.waitForSelector('#storybook-root', { state: 'visible' });
      const animations = await page.evaluate(
        () =>
          document
            .getAnimations()
            .filter((a) => a.effect instanceof KeyframeEffect && a.effect.target?.closest('.csk-running-time, .csk-time-value, .csk-data-age'))
            .length
      );
      expect(animations).toBe(0);
    }
  });
});
