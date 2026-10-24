// Homepage hero engine. Scroll position drives one continuous story: four film segments
// (loaded progressively into memory, so seeking is local), chapter copy, real photographs and
// graduate stories. Native scrolling is never intercepted; chapters can be reached directly
// from the navigation, and the "skip" link jumps to the courses.
import { clamp, smooth, request, onScroll, motionAllowed } from './motion';

// Must match the pre-paint check in BaseLayout.astro.
const PIN_QUERY = '(min-height: 560px)';
const FRAME = 1 / 24;

interface Segment {
  video: HTMLVideoElement;
  src: string;
  stillStart: string;
  stillEnd: string;
  from: number;
  to: number;
  ready: boolean;
  loading: Promise<void> | null;
  duration: number;
  seeking: boolean;
  want: number;
}

type Window4 = [number, number, number, number];

const fade = (w: Window4, v: number) => smooth(w[0], w[1], v) * (1 - smooth(w[2], w[3], v));

export function initJourneyHero(root: HTMLElement): void {
  // The storyboard's chapter row is a tab stop only while it actually scrolls sideways.
  const row = root.querySelector<HTMLElement>('[data-jh-chapters]');
  if (row) {
    const syncRow = () => {
      row.tabIndex = row.scrollWidth > row.clientWidth + 1 ? 0 : -1;
    };
    new ResizeObserver(syncRow).observe(row);
    syncRow();
  }

  if (!motionAllowed()) return;

  const html = document.documentElement;
  // Tells the pre-paint failsafe in BaseLayout that the story engine is running.
  html.classList.add('jh-ready');
  const stage = root.querySelector<HTMLElement>('[data-jh-stage]');
  const depth = root.querySelector<HTMLElement>('[data-jh-depth]');
  const still = root.querySelector<HTMLImageElement>('[data-jh-still]');
  const veil = root.querySelector<HTMLElement>('[data-jh-veil]');
  const introEl = root.querySelector<HTMLElement>('[data-jh-intro]');
  const introCtas = root.querySelector<HTMLElement>('[data-jh-intro-ctas]');
  const finalEl = root.querySelector<HTMLElement>('[data-jh-final]');
  const finalCtas = root.querySelector<HTMLElement>('[data-jh-final-ctas]');
  const navFill = root.querySelector<HTMLElement>('[data-jh-nav-fill]');
  const navLinks = [...root.querySelectorAll<HTMLAnchorElement>('[data-jh-go]')];
  const stageItems = [...root.querySelectorAll<HTMLElement>('[data-jh-stage-item]')];
  const chapterEls = [...root.querySelectorAll<HTMLElement>('[data-jh-ch]')];
  if (!stage || !depth || !still || !introEl) return;

  const groups = Object.fromEntries(
    [...root.querySelectorAll<HTMLElement>('[data-jh-group]')].map((g) => [
      g.dataset.jhGroup!,
      { el: g, items: [...g.querySelectorAll<HTMLElement>('[data-jh-item]')] },
    ]),
  );

  // Chapter and finale windows come from src/data/hero.ts via data-window attributes.
  const parseWindow = (el: HTMLElement | null | undefined) => (el?.dataset.window ?? '').split(',').map(Number);
  const windows = chapterEls.map((el) => parseWindow(el) as Window4);
  const groupWindows: Record<string, { start: number; step: number; span: number; out: [number, number] }> = {
    glimpse: { start: 0.245, step: 0.014, span: 0.03, out: [0.34, 0.37] },
    prints: { start: 0.735, step: 0.014, span: 0.03, out: [0.8, 0.83] },
    stories: { start: 0.855, step: 0.018, span: 0.03, out: [0.93, 0.95] },
  };
  const finalWindow = parseWindow(root.querySelector<HTMLElement>('[data-jh-final]'));
  const FINAL: [number, number] = finalWindow.length === 2 ? [finalWindow[0], finalWindow[1]] : [0.945, 0.975];

  const portrait = () => window.matchMedia('(max-width: 899px), (orientation: portrait)').matches;
  const segments: Segment[] = [...root.querySelectorAll<HTMLVideoElement>('[data-jh-video]')].map((video) => {
    const mobile = portrait();
    return {
      video,
      src: (mobile ? video.dataset.mobile : video.dataset.desktop) ?? '',
      stillStart: (mobile ? video.dataset.stillStartMobile : video.dataset.stillStart) ?? '',
      stillEnd: (mobile ? video.dataset.stillEndMobile : video.dataset.stillEnd) ?? '',
      from: Number(video.dataset.from),
      to: Number(video.dataset.to),
      ready: false,
      loading: null,
      duration: 0,
      seeking: false,
      want: 0,
    };
  });

  let top = 0;
  let range = 1;
  let target = 0;
  let p = -1;
  let applied = Number.NaN;
  let scrolled = false;

  const measure = () => {
    top = root.getBoundingClientRect().top + window.scrollY;
    range = Math.max(1, root.offsetHeight - stage.getBoundingClientRect().height);
    applied = Number.NaN;
  };

  const readTarget = () => {
    target = clamp((window.scrollY - top) / range);
    if (target > 0.002) scrolled = true;
  };

  // ── Film ───────────────────────────────────────────────────────────────────
  const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
  const filmAllowed = !(nav.connection?.saveData || /(^|-)2g|3g/.test(nav.connection?.effectiveType ?? ''));

  const load = (s: Segment): Promise<void> => {
    if (s.loading) return s.loading;
    s.loading = fetch(s.src)
      .then((res) => {
        if (!res.ok) throw new Error(`Film segment failed: ${res.status}`);
        return res.blob();
      })
      .then(
        (blob) =>
          new Promise<void>((resolve) => {
            s.video.addEventListener(
              'loadeddata',
              async () => {
                s.duration = s.video.duration;
                try {
                  // Some mobile browsers only paint seeked frames after one play() call.
                  await s.video.play();
                  s.video.pause();
                } catch {
                  /* autoplay may be refused; seeking still works */
                }
                s.ready = true;
                resolve();
                request(tick);
              },
              { once: true },
            );
            // WebKit does not decode a preload="none" source until asked, so request it explicitly.
            s.video.preload = 'auto';
            s.video.src = URL.createObjectURL(blob);
            s.video.load();
          }),
      )
      .catch(() => {
        // The exact boundary stills stay in place; copy and navigation keep working.
      });
    return s.loading;
  };

  // Segments load in story order; a chapter jump pulls its own segment forward.
  let queued = false;
  const loadAll = async () => {
    if (queued || !filmAllowed) return;
    queued = true;
    for (const s of segments) await load(s);
  };

  segments.forEach((s) => {
    s.video.addEventListener('seeked', () => {
      s.seeking = false;
      if (Math.abs(s.video.currentTime - s.want) > FRAME / 2) request(tick);
      else request(tick);
    });
  });

  const seek = (s: Segment, t: number) => {
    s.want = t;
    if (!s.ready || s.seeking) return;
    if (Math.abs(s.video.currentTime - t) > FRAME / 2) {
      s.seeking = true;
      s.video.currentTime = t;
    }
  };

  let shown = -1;
  let stillSrc = still.currentSrc || still.src;
  const setStill = (src: string) => {
    if (!src || stillSrc.endsWith(src)) return;
    stillSrc = src;
    still.src = src;
    still.srcset = '';
    const source = still.parentElement?.querySelector('source');
    source?.remove();
  };

  const film = (v: number) => {
    let i = 0;
    for (let k = 0; k < segments.length; k++) if (v >= segments[k].from) i = k;
    const s = segments[i];
    if (!s) return;
    const local = clamp((v - s.from) / (s.to - s.from));
    if (filmAllowed && !s.ready && scrolled) load(s);

    if (s.ready && scrolled) {
      seek(s, local * Math.max(0, s.duration - FRAME));
      // Switch only once the incoming segment shows the right frame, so there is no flash.
      const settled = !s.seeking && Math.abs(s.video.currentTime - s.want) <= FRAME;
      if (shown !== i && settled) {
        s.video.hidden = false;
        s.video.classList.add('is-shown');
        segments.forEach((o, k) => {
          if (k !== i) o.video.classList.remove('is-shown');
        });
        shown = i;
      }
    } else if (shown !== i) {
      // Not loaded yet: show the nearest exact boundary frame.
      segments.forEach((o) => o.video.classList.remove('is-shown'));
      shown = -1;
      setStill(local < 0.5 ? s.stillStart : s.stillEnd);
    }
  };

  // ── Copy, photographs, stories ─────────────────────────────────────────────
  let introGone = false;
  let finalOn: boolean | null = null;
  const chapterOn: (boolean | null)[] = chapterEls.map(() => null);

  const apply = (v: number) => {
    const ia = 1 - smooth(0.03, 0.07, v);
    introEl.style.setProperty('--a', ia.toFixed(3));
    introEl.style.setProperty('--y', `${(-24 * (1 - ia)).toFixed(1)}px`);
    const gone = ia < 0.5;
    if (gone !== introGone) {
      introGone = gone;
      introEl.classList.toggle('is-gone', gone);
      if (introCtas) introCtas.inert = gone;
    }

    // The current chapter is the last one the story has reached, so the finale keeps chapter 05 marked.
    let current = -1;
    chapterEls.forEach((el, i) => {
      const w = windows[i];
      const a = fade(w, v);
      if (v >= w[0]) current = i;
      const leaving = v > w[1];
      el.style.setProperty('--a', a.toFixed(3));
      el.style.setProperty('--y', `${((1 - a) * (leaving ? -18 : 26)).toFixed(1)}px`);
      // Chapters hold only text, so faded ones stay in the accessibility tree and keep the story readable.
      const on = a > 0.9;
      if (on !== chapterOn[i]) {
        chapterOn[i] = on;
        el.classList.toggle('is-on', on);
      }
    });

    for (const [name, g] of Object.entries(groups)) {
      const cfg = groupWindows[name];
      if (!cfg) continue;
      const out = 1 - smooth(cfg.out[0], cfg.out[1], v);
      g.items.forEach((item, k) => {
        const b = smooth(cfg.start + k * cfg.step, cfg.start + k * cfg.step + cfg.span, v) * out;
        item.style.setProperty('--b', b.toFixed(3));
      });
      g.el.style.setProperty('--b0', (smooth(cfg.start, cfg.start + cfg.span, v) * out).toFixed(3));
      g.el.style.visibility = out > 0 && v > cfg.start - 0.01 ? 'visible' : 'hidden';
    }

    // Project stages follow the third film segment.
    const seg3 = segments[2];
    if (seg3) {
      const local = clamp((v - seg3.from) / (seg3.to - seg3.from));
      let active = -1;
      stageItems.forEach((li, k) => {
        if (local >= Number(li.dataset.at)) active = k;
      });
      stageItems.forEach((li, k) => {
        li.classList.toggle('is-on', k === active);
        li.classList.toggle('is-done', k < active);
      });
    }

    const f = smooth(FINAL[0], FINAL[1], v);
    finalEl?.style.setProperty('--f', f.toFixed(3));
    const fOn = f > 0.9;
    if (finalEl && fOn !== finalOn) {
      finalOn = fOn;
      finalEl.classList.toggle('is-on', fOn);
      if (finalCtas) finalCtas.inert = !fOn;
    }

    const stories = groups.stories ? smooth(0.85, 0.88, v) : 0;
    veil?.style.setProperty('--veil', Math.min(0.82, 0.25 * stories + 0.6 * f).toFixed(3));

    navFill?.style.setProperty('--p', v.toFixed(4));
    navLinks.forEach((a, i) => {
      if (i === current) a.setAttribute('aria-current', 'step');
      else a.removeAttribute('aria-current');
    });
  };

  const clearStyles = () => {
    [introEl, finalEl, ...chapterEls].forEach((el) => {
      if (!el) return;
      el.style.removeProperty('--a');
      el.style.removeProperty('--y');
      el.classList.remove('is-on', 'is-gone');
      el.inert = false;
    });
    if (introCtas) introCtas.inert = false;
    if (finalCtas) finalCtas.inert = false;
    for (const g of Object.values(groups)) {
      g.el.style.removeProperty('visibility');
      g.el.style.removeProperty('--b0');
      g.items.forEach((item) => item.style.removeProperty('--b'));
    }
    veil?.style.removeProperty('--veil');
    navFill?.style.removeProperty('--p');
    chapterOn.fill(null);
    introGone = false;
    finalOn = null;
    navLinks.forEach((a) => a.removeAttribute('aria-current'));
  };

  // ── Pointer depth (fine pointers only) ─────────────────────────────────────
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let mx = 0;
  let my = 0;
  let tx = 0;
  let ty = 0;
  stage.addEventListener('pointermove', (e) => {
    if (!finePointer.matches || portrait()) return;
    const r = stage.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width) * 2 - 1;
    ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    request(tick);
  });
  stage.addEventListener('pointerleave', () => {
    tx = 0;
    ty = 0;
    request(tick);
  });

  // ── Frame loop ─────────────────────────────────────────────────────────────
  const tick = (_now: number, dt: number): boolean => {
    if (!active) return false;
    readTarget();
    if (p < 0) p = target;
    const k = 1 - Math.exp(-dt / 80);
    p += (target - p) * k;
    if (Math.abs(target - p) < 0.0002) p = target;
    if (p !== applied) {
      apply(p);
      applied = p;
    }
    film(p);

    const kp = 1 - Math.exp(-dt / 140);
    mx += (tx - mx) * kp;
    my += (ty - my) * kp;
    if (Math.abs(tx - mx) < 0.001) mx = tx;
    if (Math.abs(ty - my) < 0.001) my = ty;
    root.style.setProperty('--mx', mx.toFixed(3));
    root.style.setProperty('--my', my.toFixed(3));

    if (scrolled && inView) loadAll();
    const pending = segments.some((s) => s.seeking);
    return p !== target || mx !== tx || my !== ty || pending;
  };

  // ── Lifecycle ──────────────────────────────────────────────────────────────
  let active = false;
  let unsubscribe: (() => void) | null = null;
  let inView = true;

  const subscribe = () => {
    if (active && inView && !unsubscribe) unsubscribe = onScroll(tick);
  };
  const unsubscribeScroll = () => {
    unsubscribe?.();
    unsubscribe = null;
  };

  // The pinned story only runs when its copy fits. On phones the copy sits between the film window
  // and the chapter controls at the bottom, so each block must end above them.
  const navEl = root.querySelector<HTMLElement>('.jh__nav');
  const skipEl = root.querySelector<HTMLElement>('[data-jh-skip]');
  const fits = () => {
    const sr = stage.getBoundingClientRect();
    const phone = portrait();
    const floor = phone
      ? Math.min(...[navEl, skipEl].filter((e): e is HTMLElement => !!e).map((e) => e.getBoundingClientRect().top - sr.top)) - 8
      : sr.height;
    return [introEl, ...chapterEls].every((el) => {
      const h = el.offsetHeight;
      if (h > sr.height - 120 || el.scrollWidth > el.clientWidth + 1) return false;
      if (!phone) return true;
      const shift = parseFloat(el.style.getPropertyValue('--y')) || 0;
      return el.getBoundingClientRect().top - sr.top - shift + h <= floor;
    });
  };

  const start = () => {
    if (active) return;
    active = true;
    measure();
    if (!fits()) {
      active = false;
      html.classList.remove('jh-pin');
      return;
    }
    readTarget();
    p = target;
    applied = Number.NaN;
    request(tick);
    subscribe();
    // A shared link to a chapter (#journey-03) opens the story at that chapter.
    if (!hashDone) {
      hashDone = true;
      const link = navLinks.find((a) => a.getAttribute('href') === location.hash);
      if (link) window.scrollTo({ top: top + Number(link.dataset.anchor) * range, behavior: 'instant' as ScrollBehavior });
    }
  };
  let hashDone = false;

  const stop = () => {
    if (!active) return;
    active = false;
    unsubscribeScroll();
    clearStyles();
    segments.forEach((s) => {
      s.video.classList.remove('is-shown');
      s.video.hidden = true;
    });
    shown = -1;
  };

  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) subscribe();
    else unsubscribeScroll();
    request(tick);
  }).observe(root);

  new ResizeObserver(() => {
    if (!active) return;
    measure();
    if (!fits()) {
      stop();
      html.classList.remove('jh-pin');
      return;
    }
    request(tick);
  }).observe(stage);

  const pinQuery = window.matchMedia(PIN_QUERY);
  const sync = () => {
    html.classList.toggle('jh-pin', pinQuery.matches);
    if (pinQuery.matches) start();
    else stop();
  };
  pinQuery.addEventListener('change', sync);
  sync();

  // The first fit check may run with the fallback font; check again once the display fonts are in,
  // and retry the pinned story whenever the window size really changes.
  const retry = () => {
    if (active) {
      measure();
      if (!fits()) {
        stop();
        html.classList.remove('jh-pin');
      }
      return;
    }
    if (!pinQuery.matches) return;
    html.classList.add('jh-pin');
    start();
  };
  document.fonts?.ready.then(retry);
  let lastW = window.innerWidth;
  let lastH = window.innerHeight;
  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (window.innerWidth === lastW && window.innerHeight === lastH) return;
      lastW = window.innerWidth;
      lastH = window.innerHeight;
      retry();
    }, 250);
  });

  // Chapter navigation scrolls to the point where each chapter is fully told.
  navLinks.forEach((a) => {
    a.addEventListener('click', (e) => {
      if (!active) return;
      e.preventDefault();
      const anchor = Number(a.dataset.anchor);
      const s = segments.find((seg) => anchor >= seg.from && anchor <= seg.to + 0.06);
      if (s && filmAllowed) load(s);
      window.scrollTo({ top: top + anchor * range, behavior: 'smooth' });
      a.blur();
      const target = chapterEls[Number(a.dataset.jhGo)];
      setTimeout(() => target?.focus({ preventScroll: true }), 900);
    });
  });
  chapterEls.forEach((el) => el.setAttribute('tabindex', '-1'));

  // Keyboard users who tab back into the intro get it brought back into view.
  introEl.addEventListener('focusin', () => {
    if (active && target > 0.03) window.scrollTo({ top, behavior: 'smooth' });
  });

  // The first segment is fetched after the page has loaded, so it never competes with first paint.
  const prefetch = () => setTimeout(() => active && filmAllowed && segments[0] && load(segments[0]), 300);
  if (document.readyState === 'complete') prefetch();
  else window.addEventListener('load', prefetch, { once: true });
}
