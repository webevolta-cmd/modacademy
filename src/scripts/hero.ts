// Scroll-driven hero: the page's scroll position plays the Higgsfield film forward and
// backward while the frame opens from an editorial window to full bleed and the chapter
// copy fades through. Native scrolling is never intercepted.
import { clamp, lerp, smooth, easeInOutCubic, request, onScroll, motionAllowed } from './motion';

const FILM_END = 0.92; // portion of the pinned scroll that plays the film; the rest holds the final frame
const CHAPTERS: [number, number, number, number][] = [
  [0.34, 0.42, 0.54, 0.6],
  [0.58, 0.64, 0.76, 0.82],
  [0.8, 0.87, 9, 9],
];

type Insets = { t: number; r: number; b: number; l: number };

export function initHero(root: HTMLElement): void {
  if (!motionAllowed()) return;

  const stage = root.querySelector<HTMLElement>('[data-hero-stage]');
  const win = root.querySelector<HTMLElement>('[data-hero-window]');
  const media = root.querySelector<HTMLElement>('[data-hero-media]');
  const slot = root.querySelector<HTMLElement>('[data-hero-slot]');
  const video = root.querySelector<HTMLVideoElement>('[data-hero-video]');
  const intro = root.querySelector<HTMLElement>('[data-hero-intro]');
  const credit = root.querySelector<HTMLElement>('[data-hero-credit]');
  const shade = root.querySelector<HTMLElement>('[data-hero-shade]');
  const bar = root.querySelector<HTMLElement>('[data-hero-bar]');
  const chapters = [...root.querySelectorAll<HTMLElement>('[data-chapter]')];
  if (!stage || !win || !media || !slot || !video || !intro) return;

  let top = 0;
  let range = 1;
  let insets: Insets = { t: 0, r: 0, b: 0, l: 0 };
  let target = 0;
  let p = -1;

  const measure = () => {
    const sr = stage.getBoundingClientRect();
    const r = slot.getBoundingClientRect();
    insets = { t: r.top - sr.top, r: sr.right - r.right, b: sr.bottom - r.bottom, l: r.left - sr.left };
    top = root.getBoundingClientRect().top + window.scrollY;
    range = Math.max(1, root.offsetHeight - sr.height);
  };

  const readTarget = () => {
    target = clamp((window.scrollY - top) / range);
  };

  // ── Visual state for progress p ────────────────────────────────────────────
  let introGone = false;
  const apply = (v: number) => {
    const e = easeInOutCubic(smooth(0.02, 0.4, v));
    const k = 1 - e;
    win.style.clipPath = `inset(${(insets.t * k).toFixed(1)}px ${(insets.r * k).toFixed(1)}px ${(insets.b * k).toFixed(1)}px ${(insets.l * k).toFixed(1)}px)`;
    media.style.setProperty('--z', lerp(1.06, 1, e).toFixed(4));
    slot.style.setProperty('--ticks', (1 - smooth(0.01, 0.16, v)).toFixed(3));

    const h = smooth(0.015, 0.24, v);
    intro.style.setProperty('--intro-o', (1 - h).toFixed(3));
    intro.style.setProperty('--intro-y', `${(-64 * h).toFixed(1)}px`);
    intro.style.setProperty('--intro-b', `${(8 * h).toFixed(2)}px`);
    const gone = h > 0.98;
    if (gone !== introGone) {
      introGone = gone;
      intro.classList.toggle('is-gone', gone);
      intro.inert = gone;
    }
    credit?.style.setProperty('--credit-o', (1 - smooth(0, 0.1, v)).toFixed(3));

    let strongest = 0;
    chapters.forEach((el, i) => {
      const [a0, a1, b0, b1] = CHAPTERS[i] ?? CHAPTERS[CHAPTERS.length - 1];
      const a = smooth(a0, a1, v) * (1 - smooth(b0, b1, v));
      strongest = Math.max(strongest, a);
      const leaving = v > a1;
      el.style.opacity = a.toFixed(3);
      el.style.transform = `translate3d(0, ${((1 - a) * (leaving ? -20 : 24)).toFixed(1)}px, 0)`;
      el.style.filter = a > 0.995 ? 'none' : `blur(${((1 - a) * 6).toFixed(2)}px)`;
      el.classList.toggle('is-on', a > 0.02);
    });

    shade?.style.setProperty('--shade', Math.min(1, strongest * 0.9 + e * 0.18).toFixed(3));
    if (bar) {
      bar.parentElement?.style.setProperty('--bar-o', (smooth(0.04, 0.12, v) * (1 - smooth(0.96, 1, v))).toFixed(3));
      bar.style.setProperty('--p', v.toFixed(4));
    }
  };

  // ── Film ───────────────────────────────────────────────────────────────────
  let ready = false;
  let duration = 0;
  let seeking = false;
  let wantTime = 0;
  const frameTime = 1 / 24;

  const seekPending = () => ready && (seeking || Math.abs(video.currentTime - wantTime) > frameTime / 2);

  const seek = (v: number) => {
    if (!ready) return;
    wantTime = clamp(v / FILM_END) * Math.max(0, duration - frameTime);
    if (!seeking && Math.abs(video.currentTime - wantTime) > frameTime / 2) {
      seeking = true;
      video.currentTime = wantTime;
    }
  };

  video.addEventListener('seeked', () => {
    seeking = false;
    if (!video.classList.contains('is-live')) video.classList.add('is-live');
    if (Math.abs(video.currentTime - wantTime) > frameTime / 2) request(tick);
  });

  video.addEventListener('loadeddata', async () => {
    duration = video.duration;
    video.muted = true;
    try {
      // Some mobile browsers only paint seeked frames after the element has played once.
      await video.play();
      video.pause();
    } catch {
      /* autoplay can be refused; seeking still works */
    }
    ready = true;
    seeking = false;
    wantTime = -1;
    seek(p < 0 ? target : p);
    if (!seeking) video.classList.add('is-live');
    request(tick);
  });

  let loading = false;
  const loadFilm = () => {
    if (loading) return;
    loading = true;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return; // keep the poster for data-saver users
    const portrait = window.matchMedia('(max-aspect-ratio: 4/5)').matches;
    const src = (portrait ? video.dataset.srcMobile : video.dataset.srcDesktop) ?? '';
    if (!src) return;
    // Loading the clip into memory makes every seek local and instant.
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`Film request failed: ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        video.src = URL.createObjectURL(blob);
      })
      .catch(() => {
        // The exact first-frame poster remains; the layout and copy keep working.
      });
  };

  // ── Frame loop ─────────────────────────────────────────────────────────────
  const tick = (_now: number, dt: number): boolean => {
    readTarget();
    if (p < 0) p = target;
    const k = 1 - Math.exp(-dt / 75);
    p += (target - p) * k;
    if (Math.abs(target - p) < 0.0002) p = target;
    apply(p);
    seek(p);
    if (!loading && target > 0.002) loadFilm();
    return p !== target || seekPending();
  };

  measure();
  readTarget();
  p = target;
  apply(p);
  onScroll(tick);

  new ResizeObserver(() => {
    measure();
    request(tick);
  }).observe(stage);

  // Keyboard users who tab back into the hero intro get it brought back into view.
  intro.addEventListener('focusin', () => {
    if (target > 0.05) window.scrollTo({ top, behavior: 'smooth' });
  });

  if (document.readyState === 'complete') setTimeout(loadFilm, 250);
  else window.addEventListener('load', () => setTimeout(loadFilm, 250), { once: true });
}
