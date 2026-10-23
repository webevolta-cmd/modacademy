import { test, expect, type Page } from '@playwright/test';

const pages = [
  '/',
  '/courses/',
  '/courses/interior-design/',
  '/courses/3ds-max/',
  '/courses/corona-renderer/',
  '/courses/graphic-design/',
  '/courses/sales-management/',
  '/inquiry-sent/',
];

function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  return errors;
}

test.describe('every page', () => {
  for (const path of pages) {
    test(`${path} loads cleanly`, async ({ page }) => {
      const errors = trackErrors(page);
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page).toHaveTitle(/MOD Academy/);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(1);
      expect(await page.locator('html').getAttribute('lang')).toBe('hy');
      expect(errors).toEqual([]);
    });
  }

  test('unknown URLs show the 404 page', async ({ page }) => {
    const res = await page.goto('/no-such-page/');
    expect(res?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText('Էջը չի գտնվել');
  });

  test('course pages are linked from the home page and carry structured data', async ({ page }) => {
    await page.goto('/');
    const hrefs = await page.locator('#course-list a[href^="/courses/"]').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href')))]);
    expect(hrefs.length).toBe(5);
    await page.goto('/courses/3ds-max/');
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.some((t) => t.includes('"@type":"Course"'))).toBe(true);
  });
});

test.describe('hero', () => {
  test('scroll scrubs the film and reveals chapters', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/hero-pin/);
    await expect(page.locator('#hero-title')).toBeVisible();
    await expect(page.getByRole('link', { name: /Դիտել դասընթացները/ })).toBeVisible();
    // The film stays out of rendering (and out of LCP) until the visitor scrolls.
    await expect(page.locator('[data-hero-video]')).toBeHidden();

    const range = await page.evaluate(() => {
      const h = document.querySelector('[data-hero]') as HTMLElement;
      return h.offsetHeight - window.innerHeight;
    });
    for (let i = 1; i <= 20; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), (range * 0.5 * i) / 20);
      await page.waitForTimeout(30);
    }
    const video = page.locator('[data-hero-video]');
    await expect(video).toHaveClass(/is-live/, { timeout: 15_000 });
    await page.waitForTimeout(800);
    const state = await page.evaluate(() => {
      const v = document.querySelector('[data-hero-video]') as HTMLVideoElement;
      const w = document.querySelector('[data-hero-window]') as HTMLElement;
      return { time: v.currentTime, duration: v.duration, clip: w.style.clipPath };
    });
    expect(state.time / state.duration).toBeGreaterThan(0.4);
    expect(state.time / state.duration).toBeLessThan(0.65);
    expect(state.clip).toMatch(/^inset\(0px( 0px){0,3}\)$/);
    await expect(page.locator('[data-chapter].is-on').first()).toBeVisible();
    // Faded chapters stay in the accessibility tree; only invisible links leave the tab order.
    const hiddenHeadings = await page.locator('[data-chapter] h2').evaluateAll((els) =>
      els.filter((e) => getComputedStyle(e).visibility === 'hidden').length,
    );
    expect(hiddenHeadings).toBe(0);
    expect(await page.locator('[data-chapter]:not(.is-on) [data-chapter-ctas]').evaluateAll((els) => els.every((e) => (e as HTMLElement).inert))).toBe(true);

    // Reverse direction returns to the start state.
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1200);
    const back = await page.evaluate(() => (document.querySelector('[data-hero-video]') as HTMLVideoElement).currentTime);
    expect(back).toBeLessThan(0.2);
    expect(errors).toEqual([]);
  });
});

test.describe('courses', () => {
  test('filters are keyboard accessible and announce the count', async ({ page }) => {
    await page.goto('/#courses');
    const visual = page.locator('[data-filter="visual"]');
    await visual.focus();
    await page.keyboard.press('Enter');
    await expect(visual).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-course-row]:not([hidden])')).toHaveCount(2);
    await expect(page.locator('[data-filter-status]')).toContainText('2');
    await page.locator('[data-filter="all"]').click();
    await expect(page.locator('[data-course-row]:not([hidden])')).toHaveCount(5);
  });

  test('a course inquiry button pre-selects the course in the form', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-course-row] [data-inquiry-course="3ds-max"]').click();
    await expect(page.locator('#inq-course')).toHaveValue('3Ds Max');
    await expect(page).toHaveURL(/course=3ds-max/);
  });

  test('course pages pre-select their own course', async ({ page }) => {
    await page.goto('/courses/sales-management/');
    await expect(page.locator('#inq-course')).toHaveValue('Վաճառքի կառավարում');
    await expect(page.locator('.sheet')).toContainText('77');
  });

  test('deep links pre-select a course', async ({ page }) => {
    await page.goto('/?course=graphic-design#inquiry');
    await expect(page.locator('#inq-course')).toHaveValue('Գրաֆիկ դիզայն');
  });
});

test('course finder explains its suggestions', async ({ page }) => {
  await page.goto('/#finder');
  await expect(page.locator('[data-finder-empty]')).toBeVisible();
  await page.locator('label.opt', { hasText: '3D մոդելավորում' }).click();
  await page.locator('label.opt', { hasText: 'Արդեն աշխատում եմ' }).click();
  const list = page.locator('[data-finder-list] .match');
  await expect(list.first()).toContainText('Corona Renderer Level UP');
  await expect(list.first()).toContainText('Առաջարկվող');
  await page.locator('label.opt', { hasText: 'Սկսում եմ զրոյից' }).click();
  await expect(list.first()).toContainText('3Ds Max');
});

test('lightbox supports keyboard navigation and restores focus', async ({ page }) => {
  await page.goto('/#work');
  const first = page.locator('[data-lb-group="work"]').first();
  await first.scrollIntoViewIfNeeded();
  await first.click();
  const dialog = page.locator('[data-lightbox]');
  await expect(dialog).toBeVisible();
  await expect(page.locator('[data-lb-count]')).toHaveText('1 / 7');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('[data-lb-count]')).toHaveText('2 / 7');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(first).toBeFocused();
});

test('FAQ items open and close', async ({ page }) => {
  await page.goto('/#faq');
  const item = page.locator('#faq-laptop');
  await item.locator('summary').click();
  await expect(item).toHaveAttribute('open', '');
  await expect(item).toContainText('NVIDIA GeForce RTX');
  await item.locator('summary').click();
  await expect(item).not.toHaveAttribute('open', '');
});

test.describe('inquiry form', () => {
  test('shows no error state before the visitor submits', async ({ page }) => {
    await page.goto('/#inquiry');
    await expect(page.locator('.field__error:visible')).toHaveCount(0);
    const description = await page.locator('#inq-name').evaluate((el) => {
      const ids = (el.getAttribute('aria-describedby') ?? '').split(' ');
      return ids.map((id) => document.getElementById(id)).filter((n) => n && !n.hidden).map((n) => n!.textContent).join(' ');
    });
    expect(description.trim()).toBe('');
  });

  test('validates required contact details with visible messages', async ({ page }) => {
    await page.goto('/#inquiry');
    await page.locator('[data-inq-submit]').click();
    await expect(page.locator('#inq-name-err')).toBeVisible();
    await expect(page.locator('#inq-phone-err')).toBeVisible();
    await expect(page.locator('#inq-name')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#inq-name')).toBeFocused();

    await page.fill('#inq-name', 'Անի');
    await page.fill('#inq-phone', '12');
    await page.locator('[data-inq-submit]').click();
    await expect(page.locator('#inq-phone-err')).toContainText('ճիշտ չէ');
  });

  test('never claims success when no receiver is available', async ({ page }) => {
    // The static test server has no form receiver (POST → 405), and offline builds have none at all:
    // either way the honest fallback must appear — never the success message.
    await page.goto('/#inquiry');
    await page.fill('#inq-name', 'Անի Թեստ');
    await page.fill('#inq-phone', '093 000 000');
    await page.selectOption('#inq-course', { label: 'Ինտերիեր դիզայն' });
    await page.locator('[data-inq-submit]').click();
    await expect(page.locator('[data-inq-fallback]')).toBeVisible();
    await expect(page.locator('[data-inq-success]')).toBeHidden();
    const href = await page.locator('[data-inq-mailto]').getAttribute('href');
    expect(href).toContain('mailto:mod.modacademy@gmail.com');
    expect(decodeURIComponent(href ?? '')).toContain('Անի Թեստ');
    expect(decodeURIComponent(href ?? '')).toContain('Ինտերիեր դիզայն');
  });
});

test('mobile menu opens as a dialog and closes with Escape', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'menu button is only shown on small screens');
  await page.goto('/');
  await page.locator('[data-menu-open]').click();
  const menu = page.locator('[data-menu]');
  await expect(menu).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(page.locator('[data-menu-open]')).toBeFocused();
});

test('choosing a menu link moves focus to that section', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'menu button is only shown on small screens');
  await page.goto('/');
  await page.locator('[data-menu-open]').click();
  await page.locator('[data-menu] a[href="/#faq"]').click();
  await expect(page.locator('[data-menu]')).toBeHidden();
  await expect(page.locator('#faq')).toBeFocused();
});

test.describe('typography', () => {
  test('uppercase labels use modern spelling and the headline never splits a word', async ({ page }) => {
    for (const path of ['/', '/courses/interior-design/']) {
      await page.goto(path);
      // innerText applies text-transform, so this is the text as rendered.
      const text = await page.evaluate(() => document.body.innerText);
      expect(text).not.toContain('ԵՒ');
    }
    await page.goto('/');
    const split = await page.evaluate(() => {
      const em = document.querySelector('.hero__title em') as HTMLElement;
      return em.getClientRects().length;
    });
    expect(split).toBe(1);
  });
});

test('the course index lists every course', async ({ page }) => {
  await page.goto('/courses/');
  await expect(page.locator('.ci__card')).toHaveCount(5);
  await page.locator('.ci__card', { hasText: 'Corona Renderer Level UP' }).click();
  await expect(page).toHaveURL(/\/courses\/corona-renderer\/$/);
  await expect(page.locator('.cp__crumbs a[href="/courses/"]')).toBeVisible();
});

test('figures keep their real values for assistive technology', async ({ page }) => {
  await page.goto('/');
  const figures = await page.locator('.about__figure .visually-hidden').allTextContents();
  expect(figures.join(' ')).toContain('7+');
  expect(figures.join(' ')).toMatch(/1\D?000\+/);
});

test.describe('short screens', () => {
  test.use({ viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true });

  test('use the static hero so the heading and main button are reachable', async ({ page }) => {
    const media: string[] = [];
    page.on('request', (r) => {
      if (r.url().endsWith('.mp4')) media.push(r.url());
    });
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/motion/);
    await expect(page.locator('html')).not.toHaveClass(/hero-pin/);
    const cta = page.getByRole('link', { name: /Դիտել դասընթացները/ });
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeInViewport({ ratio: 1 });
    await page.waitForTimeout(600);
    expect(media).toEqual([]);
  });

  test('switch layouts when the screen height changes', async ({ page }) => {
    await page.setViewportSize({ width: 844, height: 900 });
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/hero-pin/);
    await page.setViewportSize({ width: 844, height: 390 });
    await expect(page.locator('html')).not.toHaveClass(/hero-pin/);
    expect(await page.locator('[data-hero-window]').evaluate((el) => (el as HTMLElement).style.clipPath)).toBe('');
  });
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('keeps all content without animation or film download', async ({ page }) => {
    const media: string[] = [];
    page.on('request', (r) => {
      if (r.url().endsWith('.mp4')) media.push(r.url());
    });
    await page.goto('/');
    await expect(page.locator('html')).not.toHaveClass(/motion|hero-pin/);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 3));
    await page.waitForTimeout(800);
    expect(media).toEqual([]);
    const hidden = await page.locator('[data-reveal]').evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length);
    expect(hidden).toBe(0);
    await expect(page.locator('[data-chapter]').first()).toBeVisible();
  });
});
