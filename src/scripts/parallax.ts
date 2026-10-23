// Restrained depth: oversized media drifts inside its frame as the frame crosses the viewport.
import { clamp, onScroll, request, motionAllowed } from './motion';

export function initParallax(): void {
  if (!motionAllowed()) return;
  const items = [...document.querySelectorAll<HTMLElement>('[data-parallax]')]
    .filter((el) => el.parentElement)
    .map((el) => ({
      el,
      box: (el.closest('.frame') as HTMLElement | null) ?? el.parentElement!,
      explicit: Number(el.dataset.parallax) || 0,
      scale: parseFloat(getComputedStyle(el).getPropertyValue('--ps')) || 1.12,
    }));
  if (!items.length) return;

  const visible = new Set<(typeof items)[number]>();
  const byEl = new Map(items.map((it) => [it.el, it]));
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const it = byEl.get(e.target as HTMLElement);
        if (!it) continue;
        if (e.isIntersecting) visible.add(it);
        else visible.delete(it);
      }
      request(tick);
    },
    { rootMargin: '15% 0px 15% 0px' },
  );
  items.forEach((it) => io.observe(it.el));

  const tick = () => {
    const vh = window.innerHeight;
    // Read every box first, then write, so the loop never forces a style recalculation per item.
    const boxes = [...visible].map((it) => [it, it.box.getBoundingClientRect()] as const);
    for (const [it, r] of boxes) {
      const progress = clamp((r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2), -1, 1);
      const amp = it.explicit > 0 ? it.explicit : ((it.scale - 1) / 2) * r.height * 0.85;
      it.el.style.setProperty('--py', `${(progress * amp).toFixed(1)}px`);
    }
  };

  onScroll(tick);
  request(tick);
}
