// Architectural lines that draw themselves as their section scrolls into view. Elements with
// [data-draw] receive --draw (0–1); CSS maps it to a stroke offset or a scale. Work happens only
// while an element is near the viewport.
import { clamp, onScroll, request, motionAllowed } from './motion';

export function initDraw(): void {
  const els = [...document.querySelectorAll<HTMLElement>('[data-draw]')];
  if (!els.length) return;
  if (!motionAllowed() || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.style.setProperty('--draw', '1'));
    return;
  }

  const visible = new Set<HTMLElement>();
  const done = new WeakSet<HTMLElement>();
  els.forEach((el) => el.style.setProperty('--draw', '0'));

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const el = e.target as HTMLElement;
        if (e.isIntersecting && !done.has(el)) visible.add(el);
        else visible.delete(el);
      }
      request(tick);
    },
    { rootMargin: '10% 0px 10% 0px' },
  );
  els.forEach((el) => io.observe(el));

  const tick = () => {
    const vh = window.innerHeight;
    const rects = [...visible].map((el) => [el, el.getBoundingClientRect()] as const);
    for (const [el, r] of rects) {
      // From the element's top entering the bottom edge to it reaching 35% of the viewport.
      const v = clamp((vh - r.top) / (vh * 0.65));
      el.style.setProperty('--draw', v.toFixed(3));
      if (v >= 1) {
        done.add(el);
        visible.delete(el);
        io.unobserve(el);
      }
    }
  };

  onScroll(tick);
  request(tick);
}
