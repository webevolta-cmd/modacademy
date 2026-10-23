// Accessible image lightbox on the native <dialog>: focus is trapped and restored, Esc closes,
// arrow keys and swipe navigate within the group.
export function initLightbox(): void {
  const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox]');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const img = dialog.querySelector<HTMLImageElement>('[data-lb-img]')!;
  const title = dialog.querySelector<HTMLElement>('[data-lb-title]')!;
  const credit = dialog.querySelector<HTMLElement>('[data-lb-credit]')!;
  const count = dialog.querySelector<HTMLElement>('[data-lb-count]')!;
  const prev = dialog.querySelector<HTMLButtonElement>('[data-lb-prev]')!;
  const next = dialog.querySelector<HTMLButtonElement>('[data-lb-next]')!;
  const close = dialog.querySelector<HTMLButtonElement>('[data-lb-close]')!;
  const stage = dialog.querySelector<HTMLElement>('[data-lb-stage]')!;

  let group: HTMLElement[] = [];
  let index = 0;
  let opener: HTMLElement | null = null;

  const preload = (el?: HTMLElement) => {
    if (!el?.dataset.lbSrc) return;
    const i = new Image();
    i.src = el.dataset.lbSrc;
  };

  const show = (i: number, direction = 0) => {
    index = (i + group.length) % group.length;
    const el = group[index];
    const swap = () => {
      img.classList.add('is-loading');
      img.alt = el.dataset.lbAlt ?? '';
      if (el.dataset.lbSrcset) {
        img.srcset = el.dataset.lbSrcset;
        img.sizes = '(min-width: 1500px) 1500px, 100vw';
      } else {
        img.removeAttribute('srcset');
      }
      img.src = el.dataset.lbSrc ?? '';
      title.textContent = el.dataset.lbTitle ?? '';
      credit.textContent = el.dataset.lbCredit ?? '';
      count.textContent = `${index + 1} / ${group.length}`;
      const multi = group.length > 1;
      prev.disabled = !multi;
      next.disabled = !multi;
      preload(group[(index + 1) % group.length]);
      preload(group[(index - 1 + group.length) % group.length]);
    };
    if (direction && dialog.open) {
      img.classList.add(direction > 0 ? 'is-swipe-left' : 'is-swipe-right');
      window.setTimeout(() => {
        img.classList.remove('is-swipe-left', 'is-swipe-right');
        swap();
      }, 180);
    } else {
      swap();
    }
  };

  img.addEventListener('load', () => img.classList.remove('is-loading'));
  img.addEventListener('error', () => img.classList.remove('is-loading'));

  document.addEventListener('click', (event) => {
    const trigger = (event.target as HTMLElement).closest<HTMLElement>('[data-lb-group]');
    if (!trigger) return;
    event.preventDefault();
    opener = trigger;
    group = [...document.querySelectorAll<HTMLElement>(`[data-lb-group="${trigger.dataset.lbGroup}"]`)];
    show(group.indexOf(trigger));
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
    close.focus();
  });

  prev.addEventListener('click', () => show(index - 1, -1));
  next.addEventListener('click', () => show(index + 1, 1));
  close.addEventListener('click', () => dialog.close());

  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(index + 1, 1);
    else if (e.key === 'ArrowLeft') show(index - 1, -1);
  });

  dialog.addEventListener('click', (e) => {
    if (e.target === stage || e.target === dialog) dialog.close();
  });

  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    img.removeAttribute('src');
    img.removeAttribute('srcset');
    opener?.focus({ preventScroll: true });
  });

  // Touch swipe
  let startX = 0;
  let startY = 0;
  let tracking = false;
  stage.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    tracking = true;
    startX = e.clientX;
    startY = e.clientY;
  });
  stage.addEventListener('pointerup', (e) => {
    if (!tracking) return;
    tracking = false;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.3) show(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  });
  stage.addEventListener('pointercancel', () => (tracking = false));
}
