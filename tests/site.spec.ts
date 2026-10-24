import { test, expect, type Page } from '@playwright/test';

const pages = [
  '/',
  '/courses/',
  '/courses/interior-design/',
  '/courses/3ds-max/',
  '/courses/corona-renderer/',
  '/courses/graphic-design/',
  '/courses/sales-management/',
  '/student-work/',
  '/student-work/tevosyan-living-kitchen/',
  '/graduates/',
  '/videos/',
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

const heroRange = (page: Page) =>
  page.evaluate(() => {
    const h = document.querySelector('[data-jh]') as HTMLElement;
    return { top: h.getBoundingClientRect().top + window.scrollY, range: h.offsetHeight - window.innerHeight };
  });

async function scrubTo(page: Page, progress: number, steps = 16) {
  const { top, range } = await heroRange(page);
  const from = await page.evaluate(() => window.scrollY);
  const to = top + range * progress;
  for (let i = 1; i <= steps; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), from + ((to - from) * i) / steps);
    await page.waitForTimeout(30);
  }
}

test.describe('journey hero', () => {
  test('opens with the heading and both actions visible, before any film loads', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/jh-pin/);
    await expect(page.locator('#jh-title')).toBeVisible();
    await expect(page.locator('#jh-title')).toContainText('Քո մասնագիտական ճանապարհը սկսվում');
    await expect(page.locator('[data-jh-intro-ctas] a', { hasText: 'Բացահայտել դասընթացները' })).toBeInViewport();
    await expect(page.locator('[data-jh-intro-ctas] a', { hasText: 'Մեր շրջանավարտների պատմությունները' })).toBeInViewport();
    // No film is on screen (or in LCP) until the visitor scrolls: loaded segments stay transparent.
    expect(
      await page.locator('[data-jh-video]').evaluateAll((vs) => vs.every((v) => (v as HTMLVideoElement).hidden || (!v.classList.contains('is-shown') && getComputedStyle(v).opacity === '0'))),
    ).toBe(true);
    expect(errors).toEqual([]);
  });

  test('scroll scrubs the film segments and tells the five chapters in order', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/');
    await scrubTo(page, 0.5);
    const project = page.locator('[data-jh-video="2"]');
    await expect(project).toHaveClass(/is-shown/, { timeout: 15_000 });
    await page.waitForTimeout(900);
    const t = await project.evaluate((v: HTMLVideoElement) => v.currentTime / v.duration);
    expect(t).toBeGreaterThan(0.3);
    expect(t).toBeLessThan(0.65);
    await expect(page.locator('#journey-03')).toHaveClass(/is-on/);
    await expect(page.locator('.jh__nav a[href="#journey-03"]')).toHaveAttribute('aria-current', 'step');
    await expect(page.locator('[data-jh-stage-item].is-on')).toHaveCount(1);

    await scrubTo(page, 0.985);
    await expect(page.locator('[data-jh-final]')).toHaveClass(/is-on/, { timeout: 5_000 });
    await expect(page.locator('[data-jh-final-ctas] a', { hasText: 'Բացահայտել դասընթացները' })).toBeVisible();
    await expect(page.locator('.jh__nav a[href="#journey-05"]')).toHaveAttribute('aria-current', 'step');

    // Faded chapters remain readable by assistive technology.
    const chapters = await page.locator('[data-jh-ch]').evaluateAll((els) =>
      els.map((e) => ({ inert: (e as HTMLElement).inert, hidden: getComputedStyle(e.querySelector('h2')!).visibility === 'hidden' })),
    );
    expect(chapters).toHaveLength(5);
    expect(chapters.every((c) => !c.inert && !c.hidden)).toBe(true);

    // Scrolling back returns to the opening state.
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1200);
    await expect(page.locator('[data-jh-intro-ctas] a').first()).toBeInViewport();
    expect(await page.locator('[data-jh-intro-ctas]').evaluate((el) => (el as HTMLElement).inert)).toBe(false);
    expect(errors).toEqual([]);
  });

  test('continuous scrolling plays every film scene, none is skipped', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1500);
    const { top, range } = await heroRange(page);
    const segments = await page.locator('[data-jh-video]').evaluateAll((vs) => vs.map((v) => [Number((v as HTMLElement).dataset.from), Number((v as HTMLElement).dataset.to)]));
    const seen: number[][] = segments.map(() => []);
    const steps = 80;
    for (let i = 0; i <= steps; i++) {
      const p = i / steps;
      await page.evaluate((y) => window.scrollTo(0, y), top + range * p);
      await page.waitForTimeout(90);
      const shown = await page.locator('[data-jh-video]').evaluateAll((vs) => vs.findIndex((v) => v.classList.contains('is-shown')));
      segments.forEach(([from, to], k) => {
        if (p >= from && p <= to) seen[k].push(shown === k ? 1 : 0);
      });
    }
    // Each scene must be on screen for most of its own stretch (a single handover frame is allowed).
    seen.forEach((hits, k) => expect(hits.reduce((a, b) => a + b, 0), `scene ${k + 1}`).toBeGreaterThanOrEqual(hits.length - 2));
  });

  test('chapter controls jump to a chapter and the skip link leaves the story', async ({ page }) => {
    await page.goto('/');
    await page.locator('.jh__nav a[href="#journey-02"]').click();
    await expect(page.locator('#journey-02')).toHaveClass(/is-on/, { timeout: 5_000 });
    await expect(page.locator('.jh__nav a[href="#journey-02"]')).toHaveAttribute('aria-current', 'step');
    await page.locator('[data-jh-skip]').click();
    await expect(page.locator('#courses')).toBeInViewport();
  });

  test('pointer movement adds depth on desktop only', async ({ page, isMobile }) => {
    test.skip(isMobile, 'depth follows fine pointers only');
    await page.goto('/');
    await page.mouse.move(200, 200);
    await page.mouse.move(1100, 700, { steps: 8 });
    await page.waitForTimeout(500);
    const mx = await page.locator('[data-jh]').evaluate((el) => Number((el as HTMLElement).style.getPropertyValue('--mx')));
    expect(Math.abs(mx)).toBeGreaterThan(0.05);
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
  await page.goto('/student-work/tevosyan-living-kitchen/');
  const first = page.locator('[data-lb-group="project"]').first();
  await first.scrollIntoViewIfNeeded();
  await first.click();
  const dialog = page.locator('[data-lightbox]');
  await expect(dialog).toBeVisible();
  await expect(page.locator('[data-lb-count]')).toHaveText(/^1 \/ \d+$/);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('[data-lb-count]')).toHaveText(/^2 \/ \d+$/);
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
  await page.locator('[data-menu] a[href="/#learning"]').click();
  await expect(page.locator('[data-menu]')).toBeHidden();
  await expect(page.locator('#learning')).toBeFocused();
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
      const brand = document.querySelector('.jh__brand') as HTMLElement;
      return brand.getClientRects().length;
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

test('every course meets three times a week for 90 minutes', async ({ page }) => {
  // Rendered text carries invisible word joiners (see src/lib/text.ts); compare without them.
  const plain = (s: string) => s.replace(/\u2060/g, '').replace(/\s+/g, ' ').trim();
  const slugs = ['interior-design', '3ds-max', 'corona-renderer', 'graphic-design', 'sales-management'];
  for (const slug of slugs) {
    await page.goto(`/courses/${slug}/`);
    const cell = plain(await page.locator('.sheet__cell', { hasText: 'Ժամանակացույց' }).innerText());
    expect(cell, slug).toContain('Շաբաթական 3 անգամ');
    expect(cell, slug).toContain('90-ական րոպե');
    // No leftover day lists or clock times from earlier timetables.
    expect(plain(await page.locator('main').innerText()), slug).not.toMatch(/\d{2}:\d{2}|երկուական ժամ|Շաբաթական 2/);
  }
  await page.goto('/');
  const rows = page.locator('.compare__table tbody tr');
  await expect(rows).toHaveCount(slugs.length);
  for (const text of await rows.locator('td:nth-child(4)').allTextContents()) expect(plain(text)).toBe('Շաբաթական 3 անգամ՝ 90-ական րոպե');
  // FAQ answers are collapsed, so read their text content rather than the rendered text.
  expect(plain((await page.locator('#faq').textContent()) ?? '')).toContain('շաբաթական 3 անգամ՝ 90-ական րոպե');
});

test('the sales course page carries its full description', async ({ page }) => {
  await page.goto('/courses/sales-management/');
  const body = page.locator('.cp__main');
  await expect(body).toContainText('Ի՞նչ է իրականում պետք հաճախորդին, և ինչպե՞ս բացահայտել դա ճիշտ հարցերի միջոցով։');
  await expect(body).toContainText('կառուցելով վստահության վրա հիմնված վաճառքի զրույց։');
});

test('figures keep their real values for assistive technology', async ({ page }) => {
  await page.goto('/');
  const figures = await page.locator('.about__figure .visually-hidden').allTextContents();
  expect(figures.join(' ')).toContain('7+');
  expect(figures.join(' ')).toMatch(/1\D?000\+/);
});

test.describe('short screens', () => {
  test.use({ viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true });

  test('use the storyboard hero so the heading and main button are reachable', async ({ page }) => {
    const media: string[] = [];
    page.on('request', (r) => {
      if (r.url().endsWith('.mp4')) media.push(r.url());
    });
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/motion/);
    await expect(page.locator('html')).not.toHaveClass(/jh-pin/);
    const cta = page.locator('[data-jh-intro-ctas] a', { hasText: 'Բացահայտել դասընթացները' });
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeInViewport({ ratio: 0.95 });
    await expect(page.locator('[data-jh-ch]')).toHaveCount(5);
    await page.waitForTimeout(600);
    expect(media).toEqual([]);
  });

  test('switch layouts when the screen height changes', async ({ page }) => {
    await page.setViewportSize({ width: 844, height: 900 });
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/jh-pin/);
    await page.setViewportSize({ width: 844, height: 390 });
    await expect(page.locator('html')).not.toHaveClass(/jh-pin/);
    expect(await page.locator('[data-jh-ch]').first().evaluate((el) => (el as HTMLElement).style.getPropertyValue('--a'))).toBe('');
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
    await expect(page.locator('html')).not.toHaveClass(/motion|jh-pin/);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 3));
    await page.waitForTimeout(800);
    expect(media).toEqual([]);
    const hidden = await page.locator('[data-reveal]').evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length);
    expect(hidden).toBe(0);
    await expect(page.locator('[data-jh-ch]').first()).toBeVisible();
  });
});

test.describe('site structure', () => {
  test('navigation leads to the student work and video pages', async ({ page, isMobile }) => {
    test.skip(isMobile, 'the desktop bar holds the inline navigation');
    await page.goto('/');
    await expect(page.locator('.header a[href="/student-work/"]').first()).toHaveText('Աշխատանքներ');
    await expect(page.locator('.header a[href="/videos/"]').first()).toHaveText('Տեսանյութեր');
    await page.locator('.header a[href="/student-work/"]').first().click();
    await expect(page).toHaveURL(/\/student-work\/$/);
    await expect(page.locator('.header a[href="/student-work/"]').first()).toHaveAttribute('aria-current', 'page');
  });

  test('the old #work anchor still lands on the student work entry point', async ({ page }) => {
    await page.goto('/#work');
    await expect(page.locator('#work')).toBeInViewport();
    await expect(page.locator('#work a[href="/student-work/"]').first()).toBeVisible();
  });

  test('the homepage keeps its section order', async ({ page }) => {
    await page.goto('/');
    const ids = await page.locator('main > section[id], main > div > section[id]').evaluateAll((els) => els.map((e) => e.id));
    const order = ['top', 'about', 'courses', 'learning', 'graduates', 'work', 'featured-film', 'videos', 'faq', 'contact'].filter((id) => ids.includes(id));
    expect(order.map((id) => ids.indexOf(id))).toEqual([...order.map((id) => ids.indexOf(id))].sort((a, b) => a - b));
    expect(order).toEqual(expect.arrayContaining(['top', 'courses', 'learning', 'work', 'featured-film', 'faq', 'contact']));
  });

  test('image reveals open once they scroll into view', async ({ page }) => {
    for (const path of ['/', '/student-work/tevosyan-living-kitchen/']) {
      await page.goto(path);
      const masks = page.locator('[data-reveal="mask"]');
      const n = await masks.count();
      expect(n).toBeGreaterThan(0);
      for (let i = 0; i < n; i++) {
        const el = masks.nth(i);
        await el.evaluate((e) => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
        await expect(el).toHaveClass(/is-in/);
      }
    }
  });

  test('the guidance section no longer shows the trainer photograph', async ({ page }) => {
    await page.goto('/#learning');
    const srcs = await page.locator('#learning img').evaluateAll((imgs) => imgs.map((i) => (i as HTMLImageElement).currentSrc || (i as HTMLImageElement).src));
    expect(srcs.length).toBeGreaterThan(0);
    expect(srcs.some((s) => /sales-class-(trainer|presenting)/.test(s))).toBe(false);
  });

  test('the featured project film plays only on request', async ({ page }) => {
    await page.goto('/student-work/');
    const film = page.locator('[data-pfilm]').first();
    expect(await film.locator('video').evaluate((v: HTMLVideoElement) => v.currentSrc)).toBe('');
    await film.locator('[data-pfilm-toggle]').click();
    await expect(film).toHaveAttribute('data-playing', '', { timeout: 10_000 });
    const src = await film.locator('video').evaluate((v: HTMLVideoElement) => v.currentSrc);
    expect(src).toMatch(/\.mp4$/);
  });

  test('the homepage project film starts by itself in view, pauses off-screen and respects a pause', async ({ page }) => {
    await page.goto('/');
    // Under the site's smooth scrolling, Playwright's own scroll-into-view retries animate and can carry the
    // film out of view mid-click, which (correctly) pauses it and turns the click into "play". Scroll instantly.
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
    const film = page.locator('#featured-film [data-pfilm]');
    const video = film.locator('video');
    await expect(film).toHaveAttribute('data-autoplay', '');
    // Nothing is downloaded before the section is reached.
    expect(await video.evaluate((v: HTMLVideoElement) => v.currentSrc)).toBe('');
    await film.evaluate((e) => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await expect(film).toHaveAttribute('data-playing', '', { timeout: 10_000 });
    expect(await video.evaluate((v: HTMLVideoElement) => v.currentSrc)).toMatch(/\.mp4$/);
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime), { timeout: 10_000 }).toBeGreaterThan(0.2);
    // Leaving the section pauses it; coming back resumes it.
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await expect(film).not.toHaveAttribute('data-playing', '');
    expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
    await film.evaluate((e) => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await expect(film).toHaveAttribute('data-playing', '', { timeout: 10_000 });
    // A visitor's pause sticks, even after scrolling away and back.
    await film.locator('[data-pfilm-toggle]').click();
    await expect(film.locator('[data-pfilm-label]')).toHaveText('Դիտել տեսանյութը');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await film.evaluate((e) => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await page.waitForTimeout(600);
    expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
    await film.locator('[data-pfilm-toggle]').click();
    await expect(film).toHaveAttribute('data-playing', '', { timeout: 10_000 });
  });

  test('the homepage project film does not start by itself with reduced motion', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/');
    const film = page.locator('#featured-film [data-pfilm]');
    await film.evaluate((e) => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await page.waitForTimeout(800);
    await expect(film).not.toHaveAttribute('data-playing', '');
    expect(await film.locator('video').evaluate((v: HTMLVideoElement) => v.currentSrc)).toBe('');
    await film.locator('[data-pfilm-toggle]').click();
    await expect(film).toHaveAttribute('data-playing', '', { timeout: 10_000 });
    await context.close();
  });

  test('photo and video captions carry no post dates', async ({ page }) => {
    for (const path of ['/', '/graduates/', '/videos/', '/courses/3ds-max/', '/courses/sales-management/']) {
      await page.goto(path);
      const text = await page.evaluate(() => document.body.innerText);
      expect(text, path).not.toMatch(/\b\d{2}\.\d{2}\.20\d{2}\b/);
      expect(await page.locator('figcaption time, .vc__date').count(), path).toBe(0);
    }
    await page.goto('/graduates/');
    const credits = await page.locator('[data-lb-credit]').evaluateAll((els) => els.map((e) => e.getAttribute('data-lb-credit')));
    for (const c of credits) expect(c).not.toMatch(/\d{4}/);
  });

  test('video cards open the exact Instagram post in a new tab', async ({ page }) => {
    await page.goto('/videos/');
    const cards = page.locator('.vp__grid a');
    const n = await cards.count();
    expect(n).toBeGreaterThanOrEqual(6);
    for (let i = 0; i < n; i++) {
      const card = cards.nth(i);
      await expect(card).toHaveAttribute('href', /^https:\/\/www\.instagram\.com\/(p|reel)\/[\w-]+\/$/);
      await expect(card).toHaveAttribute('target', '_blank');
      await expect(card).toHaveAttribute('rel', /noopener/);
      await expect(card).toContainText('Դիտել Instagram-ում');
      await expect(card.locator('img')).toHaveCount(1);
    }
  });

  test('graduate stories describe the next step and keep portfolio links', async ({ page }) => {
    await page.goto('/graduates/');
    const stories = page.locator('.gs__item');
    expect(await stories.count()).toBeGreaterThan(0);
    for (const text of await page.locator('.gs__outcome').allTextContents()) expect(text.trim().length).toBeGreaterThan(20);
    await expect(page.locator('#shushan-tevosyan a[href^="https://www.behance.net/"]')).toHaveCount(1);
  });

  test('the site speaks in its own voice, without AI or source notes', async ({ page }) => {
    for (const path of ['/', '/graduates/', '/student-work/', '/student-work/tevosyan-living-kitchen/', '/videos/', '/courses/3ds-max/']) {
      await page.goto(path);
      const text = await page.evaluate(() => document.body.innerText);
      expect(text, path).not.toMatch(/\bAI\b|արհեստական բանականություն|Ըստ |ըստ ակադեմիայի|հրապարակ(ված|ման|ել|ում)/);
    }
  });

});
