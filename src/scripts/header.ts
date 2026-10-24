// Header state, in-page section highlighting and the mobile menu dialog.
import { onScroll, request } from './motion';

export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll(update);
  request(update);

  // Switch to the dark treatment while the header sits over a dark section.
  const darkSections = [...document.querySelectorAll<HTMLElement>('.on-night')];
  let darkObserver: IntersectionObserver | null = null;
  const overDark = new Set<Element>();
  const watchDark = () => {
    darkObserver?.disconnect();
    overDark.clear();
    if (!darkSections.length || !('IntersectionObserver' in window)) return;
    const line = Math.round(header.offsetHeight / 2);
    darkObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) overDark.add(e.target);
          else overDark.delete(e.target);
        }
        header.classList.toggle('is-dark', overDark.size > 0);
      },
      { rootMargin: `-${line}px 0px -${Math.max(0, window.innerHeight - line - 1)}px 0px` },
    );
    darkSections.forEach((s) => darkObserver!.observe(s));
  };
  watchDark();
  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(watchDark, 150);
  });

  // Mark the nav link of the section currently in view.
  // Only links to sections of the current page are highlighted while scrolling.
  const links = [...header.querySelectorAll<HTMLAnchorElement>('.header__nav a[href*="#"]')].filter(
    (a) => a.pathname === location.pathname,
  );
  const byId = new Map(links.map((a) => [a.hash.slice(1), a]));
  const sections = [...byId.keys()].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
  if (sections.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const link = byId.get(e.target.id);
          if (!link) continue;
          if (e.isIntersecting) {
            links.forEach((l) => l.removeAttribute('aria-current'));
            link.setAttribute('aria-current', 'true');
          } else if (link.getAttribute('aria-current')) {
            link.removeAttribute('aria-current');
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
  }
}

export function initMenu(): void {
  const dialog = document.querySelector<HTMLDialogElement>('[data-menu]');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  if (!dialog || !openBtn || typeof dialog.showModal !== 'function') return;

  const root = document.documentElement;
  openBtn.addEventListener('click', () => {
    dialog.showModal();
    root.style.overflow = 'hidden';
    openBtn.setAttribute('aria-expanded', 'true');
  });

  // When a menu link is chosen, focus follows the visitor to that section instead of
  // returning to the menu button at the top of the page.
  let destination: HTMLElement | null = null;

  dialog.addEventListener('close', () => {
    root.style.overflow = '';
    openBtn.setAttribute('aria-expanded', 'false');
    if (destination) {
      const target = destination;
      destination = null;
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    } else {
      openBtn.focus({ preventScroll: true });
    }
  });

  dialog.querySelector('[data-menu-close]')?.addEventListener('click', () => dialog.close());
  dialog.querySelectorAll<HTMLAnchorElement>('[data-menu-link]').forEach((a) =>
    a.addEventListener('click', () => {
      const samePage = a.pathname === location.pathname && a.hash.length > 1;
      destination = samePage ? document.getElementById(decodeURIComponent(a.hash.slice(1))) : null;
      dialog.close();
    }),
  );
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
}
