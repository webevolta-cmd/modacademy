// Course filtering (keyboard-accessible toggle buttons) and course → inquiry hand-off.
import { motionAllowed } from './motion';

export function initCourseFilter(root: HTMLElement): void {
  // The comparison table fades its right edge while more columns are off-screen.
  const scroller = root.querySelector<HTMLElement>('[data-compare-scroll]');
  if (scroller) {
    const hint = () =>
      scroller.classList.toggle('can-scroll', scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 4);
    scroller.addEventListener('scroll', hint, { passive: true });
    new ResizeObserver(hint).observe(scroller);
  }

  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const rows = [...root.querySelectorAll<HTMLElement>('[data-course-row]')];
  const status = root.querySelector<HTMLElement>('[data-filter-status]');
  if (!buttons.length || !rows.length) return;

  let timer = 0;

  const apply = (filter: string) => {
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === filter)));
    const show = rows.filter((r) => filter === 'all' || r.dataset.category === filter);
    const hide = rows.filter((r) => !show.includes(r));
    if (status) status.textContent = `Ցուցադրված է ${show.length} դասընթաց`;

    window.clearTimeout(timer);
    if (!motionAllowed()) {
      hide.forEach((r) => (r.hidden = true));
      show.forEach((r) => (r.hidden = false));
      return;
    }

    hide.forEach((r) => {
      if (!r.hidden) r.classList.add('is-leaving');
    });
    timer = window.setTimeout(() => {
      hide.forEach((r) => {
        r.hidden = true;
        r.classList.remove('is-leaving');
      });
      show.forEach((r, i) => {
        const wasHidden = r.hidden;
        r.hidden = false;
        if (wasHidden) {
          r.classList.add('is-entering');
          r.style.transitionDelay = `${i * 60}ms`;
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              r.classList.remove('is-entering');
              window.setTimeout(() => (r.style.transitionDelay = ''), 700);
            }),
          );
        }
      });
    }, hide.some((r) => r.classList.contains('is-leaving')) ? 280 : 0);
  };

  buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.filter ?? 'all')));
}

/** Buttons/links carrying data-inquiry-course pre-select that course in the inquiry form. */
export function initInquiryHandoff(): void {
  const select = document.querySelector<HTMLSelectElement>('[data-inq-course]');
  const target = document.getElementById('inquiry');
  if (!select || !target) return;

  const choose = (slug: string | null) => {
    if (!slug) return false;
    const option = [...select.options].find((o) => o.dataset.slug === slug);
    if (!option) return false;
    select.value = option.value;
    select.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  };

  // Deep links such as /?course=3ds-max#inquiry
  const fromUrl = new URLSearchParams(window.location.search).get('course');
  choose(fromUrl);

  document.addEventListener('click', (event) => {
    const trigger = (event.target as HTMLElement).closest<HTMLElement>('[data-inquiry-course]');
    if (!trigger) return;
    if (!choose(trigger.dataset.inquiryCourse ?? null)) return;
    event.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set('course', trigger.dataset.inquiryCourse!);
    url.hash = 'inquiry';
    history.replaceState(null, '', url);
    target.scrollIntoView({ behavior: motionAllowed() ? 'smooth' : 'auto', block: 'start' });
    const name = document.getElementById('inq-name') as HTMLInputElement | null;
    window.setTimeout(() => name?.focus({ preventScroll: true }), motionAllowed() ? 700 : 0);
  });
}
