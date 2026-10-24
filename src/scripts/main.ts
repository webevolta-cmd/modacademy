// Entry point: each feature initialises only when its markup is on the page.
import { initJourneyHero } from './journey-hero';
import { initReveal, initCounters } from './reveal';
import { initParallax } from './parallax';
import { initHeader, initMenu } from './header';
import { initCourseFilter, initInquiryHandoff } from './courses';
import { initFinder } from './finder';
import { initLightbox } from './lightbox';
import { initInquiry } from './inquiry';
import { initMap } from './map';
import { initDraw } from './draw';
import { initProjectFilm } from './project-film';
import { initWorkFilter } from './work-filter';

const each = (selector: string, fn: (el: HTMLElement) => void) =>
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => fn(el));

initHeader();
initMenu();
// Parallax reads layout before the hero writes styles in the same frame.
initParallax();
each('[data-jh]', initJourneyHero);
initReveal();
initCounters();
initDraw();
each('[data-courses]', initCourseFilter);
each('[data-finder]', initFinder);
each('[data-inquiry]', initInquiry);
each('[data-map]', initMap);
each('[data-pfilm]', initProjectFilm);
each('[data-work-filter]', initWorkFilter);
initInquiryHandoff();
initLightbox();
