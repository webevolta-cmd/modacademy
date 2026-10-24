// Entrance reveals, headline word reveals and verified-figure counters.
// Counters animate an aria-hidden copy; the real figure is always in the accessible text.
import { easeOutCubic, motionAllowed } from './motion';

export function initReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-split], .sec-index');
  if (!motionAllowed() || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }

  // Keyboard focus reveals its container at once rather than waiting for the observer.
  document.addEventListener('focusin', (e) => {
    (e.target as Element).closest?.('[data-reveal], [data-split], .sec-index')?.classList.add('is-in');
  });

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -7% 0px', threshold: 0.08 },
  );
  targets.forEach((el) => io.observe(el));
}

export function initCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>('[data-count]');
  if (!counters.length || !motionAllowed() || !('IntersectionObserver' in window)) return;

  const format = (n: number) => String(n);

  const run = (el: HTMLElement) => {
    const end = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? '';
    const duration = 1600;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = format(Math.round(end * easeOutCubic(t))) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        run(entry.target as HTMLElement);
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.6 },
  );

  counters.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) el.textContent = `0${el.dataset.suffix ?? ''}`;
    io.observe(el);
  });
}
