// Category filter for collections (student work, videos): toggle buttons with aria-pressed and a
// short polite status. Cards leave with a brief fade, then the grid reflows.
import { motionAllowed } from './motion';

export function initWorkFilter(root: HTMLElement): void {
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-wf]')];
  const cards = [...root.querySelectorAll<HTMLElement>('[data-category]')];
  const status = root.querySelector<HTMLElement>('[data-wf-status]');
  if (!buttons.length || !cards.length) return;
  const noun = root.dataset.wfNoun ?? 'նախագիծ';
  let timer = 0;

  const apply = (filter: string) => {
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.wf === filter)));
    const show = cards.filter((c) => filter === 'all' || c.dataset.category === filter);
    if (status) status.textContent = `Ցուցադրված է ${show.length} ${noun}`;
    window.clearTimeout(timer);
    const hide = cards.filter((c) => !show.includes(c));
    if (!motionAllowed()) {
      cards.forEach((c) => (c.hidden = !show.includes(c)));
      return;
    }
    hide.forEach((c) => c.classList.add('is-leaving'));
    timer = window.setTimeout(() => {
      cards.forEach((c) => {
        c.hidden = !show.includes(c);
        c.classList.remove('is-leaving');
        if (!c.hidden) c.classList.add('is-in');
      });
    }, 260);
  };

  buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.wf ?? 'all')));
}
