// Entry point: each feature initialises only when its markup is on the page.
import { initHero } from './hero';
import { initReveal, initCounters } from './reveal';
import { initParallax } from './parallax';
import { initHeader, initMenu } from './header';
import { initCourseFilter, initInquiryHandoff } from './courses';
import { initFinder } from './finder';
import { initJourney } from './journey';
import { initLightbox } from './lightbox';
import { initInquiry } from './inquiry';
import { initMap } from './map';

const each = (selector: string, fn: (el: HTMLElement) => void) =>
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => fn(el));

initHeader();
initMenu();
// Parallax reads layout before the hero writes styles in the same frame.
initParallax();
each('[data-hero]', initHero);
initReveal();
initCounters();
each('[data-courses]', initCourseFilter);
each('[data-finder]', initFinder);
each('[data-journey]', initJourney);
each('[data-inquiry]', initInquiry);
each('[data-map]', initMap);
initInquiryHandoff();
initLightbox();
