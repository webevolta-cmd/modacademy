// Learning journey: a progress line and arc that follow the reader through the stages.
import { clamp, onScroll, request } from './motion';

export function initJourney(root: HTMLElement): void {
  const track = root.querySelector<HTMLElement>('.journey__track');
  const steps = [...root.querySelectorAll<HTMLElement>('[data-journey-step]')];
  const counter = root.querySelector<HTMLElement>('[data-journey-n]');
  if (!track || !steps.length) return;

  let active = -1;
  let visible = false;

  const tick = () => {
    if (!visible) return;
    const vh = window.innerHeight;
    const r = track.getBoundingClientRect();
    const line = vh * 0.62;
    const progress = clamp((line - r.top) / r.height);
    root.style.setProperty('--jp', progress.toFixed(4));

    let current = 0;
    steps.forEach((s, i) => {
      if (s.getBoundingClientRect().top < line) current = i;
    });
    if (current !== active) {
      active = current;
      steps.forEach((s, i) => s.classList.toggle('is-active', i <= current));
      if (counter) counter.textContent = String(current + 1).padStart(2, '0');
    }
  };

  new IntersectionObserver((entries) => {
    visible = entries.some((e) => e.isIntersecting);
    request(tick);
  }).observe(root);

  onScroll(tick);
}
