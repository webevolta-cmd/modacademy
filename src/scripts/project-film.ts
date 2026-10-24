// Click-to-play project films: nothing downloads until the visitor presses play.
export function initProjectFilm(root: HTMLElement): void {
  const video = root.querySelector<HTMLVideoElement>('[data-pfilm-video]');
  const toggle = root.querySelector<HTMLButtonElement>('[data-pfilm-toggle]');
  const label = root.querySelector<HTMLElement>('[data-pfilm-label]');
  if (!video || !toggle || !label) return;

  const portrait = window.matchMedia('(max-aspect-ratio: 4/5)').matches;
  let loaded = false;

  const set = (playing: boolean) => {
    toggle.setAttribute('aria-pressed', String(playing));
    label.textContent = playing ? 'Դադար' : 'Դիտել տեսանյութը';
    root.toggleAttribute('data-playing', playing);
  };

  toggle.addEventListener('click', async () => {
    if (!loaded) {
      video.src = (portrait ? video.dataset.mobile : video.dataset.desktop) ?? '';
      loaded = true;
    }
    if (video.paused) {
      try {
        await video.play();
        set(true);
      } catch {
        set(false);
      }
    } else {
      video.pause();
      set(false);
    }
  });

  // Never keep playing off-screen.
  new IntersectionObserver(([e]) => {
    if (!e.isIntersecting && !video.paused) {
      video.pause();
      set(false);
    }
  }).observe(root);
}
