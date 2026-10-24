// Project films. Nothing downloads before the film is needed: autoplay films start (muted, looping)
// once they scroll into view and pause when they leave; the others play when the visitor asks.
// The button always pauses and resumes, and a film the visitor paused stays paused.
import { motionAllowed } from './motion';

export function initProjectFilm(root: HTMLElement): void {
  const video = root.querySelector<HTMLVideoElement>('[data-pfilm-video]');
  const toggle = root.querySelector<HTMLButtonElement>('[data-pfilm-toggle]');
  const label = root.querySelector<HTMLElement>('[data-pfilm-label]');
  if (!video || !toggle || !label) return;

  // Phones get the portrait file (the frame switches to 3:4 at the same width).
  const phone = window.matchMedia('(max-width: 640px)').matches;
  if (phone && video.dataset.posterMobile) video.poster = video.dataset.posterMobile;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const autoplay = root.hasAttribute('data-autoplay') && motionAllowed() && !conn?.saveData;
  let loaded = false;
  let userPaused = false;

  const set = (playing: boolean) => {
    label.textContent = playing ? 'Դադար' : 'Դիտել տեսանյութը';
    root.toggleAttribute('data-playing', playing);
  };

  const play = async () => {
    if (!loaded) {
      video.src = (phone ? video.dataset.mobile : video.dataset.desktop) ?? '';
      loaded = true;
    }
    try {
      await video.play();
      set(true);
    } catch {
      set(false);
    }
  };

  toggle.addEventListener('click', () => {
    if (video.paused) {
      userPaused = false;
      play();
    } else {
      userPaused = true;
      video.pause();
      set(false);
    }
  });

  new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        if (autoplay && !userPaused && video.paused) play();
      } else if (!video.paused) {
        // Never keep playing off-screen.
        video.pause();
        set(false);
      }
    },
    { threshold: 0.35 },
  ).observe(root);
}
