// Shared motion helpers and a single requestAnimationFrame scheduler.

export const motionAllowed = (): boolean => document.documentElement.classList.contains('motion');

export const clamp = (v: number, min = 0, max = 1): number => Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/** Hermite smoothstep of x between e0 and e1, returning 0..1. */
export const smooth = (e0: number, e1: number, x: number): number => {
  const t = clamp((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

export const easeInOutCubic = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

/** A frame callback; return true to be called again on the next frame. */
export type Tick = (now: number, dt: number) => boolean | void;

const queue = new Set<Tick>();
let rafId = 0;
let last = 0;

function loop(now: number) {
  // The first frame of a burst has no previous timestamp; a frame's rAF time can also be
  // slightly earlier than the event that scheduled it, so dt is clamped to a sane range.
  const dt = last ? Math.min(64, Math.max(1, now - last)) : 16.7;
  last = now;
  rafId = 0;
  const current = [...queue];
  queue.clear();
  for (const tick of current) {
    if (tick(now, dt) === true) queue.add(tick);
  }
  if (queue.size) rafId = requestAnimationFrame(loop);
}

/** Schedule a tick for the next animation frame (deduplicated). */
export function request(tick: Tick): void {
  queue.add(tick);
  if (!rafId) {
    last = 0;
    rafId = requestAnimationFrame(loop);
  }
}

/** Run `tick` whenever the page scrolls or resizes. */
export function onScroll(tick: Tick): () => void {
  const handler = () => request(tick);
  window.addEventListener('scroll', handler, { passive: true });
  window.addEventListener('resize', handler, { passive: true });
  return () => {
    window.removeEventListener('scroll', handler);
    window.removeEventListener('resize', handler);
  };
}
