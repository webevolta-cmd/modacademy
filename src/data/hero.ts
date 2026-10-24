// The homepage hero: one scroll-driven story in five chapters.
//
// The film is an illustrative Higgsfield animation (an original room designed for the website,
// not student work and not an academy classroom). It is split into four segments that load
// progressively; consecutive segments share their boundary frame, so switching is seamless.
// Real photographs (practical lessons, graduations) and verified graduate stories are layered
// over it by the page itself — see src/components/JourneyHero.astro.

export interface FilmSegment {
  id: string;
  desktop: string;
  mobile: string;
  /** Scroll progress (0–1 of the pinned range) over which the segment plays. */
  from: number;
  to: number;
  /** Exact first and last frames, shown while the segment is loading. */
  stillStart: string;
  stillEnd: string;
  stillStartMobile: string;
  stillEndMobile: string;
}

const media = (name: string) => `/media/hero/journey/${name}`;

export const filmSegments: FilmSegment[] = [
  {
    id: 'idea',
    desktop: media('journey-1-idea-1920.mp4'),
    mobile: media('journey-1-idea-960.mp4'),
    from: 0.03,
    to: 0.19,
    stillStart: media('still-1-start-1920.webp'),
    stillEnd: media('still-1-end-1920.webp'),
    stillStartMobile: media('still-1-start-960.webp'),
    stillEndMobile: media('still-1-end-960.webp'),
  },
  {
    id: 'learning',
    desktop: media('journey-2-learning-1920.mp4'),
    mobile: media('journey-2-learning-960.mp4'),
    from: 0.2,
    to: 0.31,
    stillStart: media('still-1-end-1920.webp'),
    stillEnd: media('still-2-end-1920.webp'),
    stillStartMobile: media('still-1-end-960.webp'),
    stillEndMobile: media('still-2-end-960.webp'),
  },
  {
    id: 'project',
    desktop: media('journey-3-project-1920.mp4'),
    mobile: media('journey-3-project-960.mp4'),
    from: 0.37,
    to: 0.64,
    stillStart: media('still-2-end-1920.webp'),
    stillEnd: media('still-3-end-1920.webp'),
    stillStartMobile: media('still-2-end-960.webp'),
    stillEndMobile: media('still-3-end-960.webp'),
  },
  {
    id: 'portfolio',
    desktop: media('journey-4-portfolio-1920.mp4'),
    mobile: media('journey-4-portfolio-960.mp4'),
    from: 0.65,
    to: 0.74,
    stillStart: media('still-3-end-1920.webp'),
    stillEnd: media('still-4-end-1920.webp'),
    stillStartMobile: media('still-3-end-960.webp'),
    stillEndMobile: media('still-4-end-960.webp'),
  },
];

export interface Chapter {
  n: string;
  label: string;
  /** Short name for the chapter navigation. */
  nav: string;
  title: string;
  text?: string;
  /** Visible window of the chapter copy: [fade in start, fully in, fade out start, gone]. */
  window: [number, number, number, number];
  /** Where the chapter navigation jumps to. */
  anchor: number;
}

export const intro = {
  eyebrow: 'MOD Academy · Երևան',
  title: 'Քո մասնագիտական ճանապարհը սկսվում է MOD Academy-ում',
  lead: 'Առաջին գաղափարից մինչև գիտելիք, պորտֆոլիո և նոր մասնագիտական հնարավորություններ։',
  primary: { label: 'Բացահայտել դասընթացները', href: '/#courses' },
  secondary: { label: 'Մեր շրջանավարտների պատմությունները', href: '/graduates/' },
};

export const chapters: Chapter[] = [
  {
    n: '01',
    label: 'Առաջին գաղափարը',
    nav: 'Գաղափար',
    title: 'Ամեն մասնագիտական ճանապարհ սկսվում է առաջին քայլից',
    window: [0.045, 0.08, 0.17, 0.2],
    anchor: 0.13,
  },
  {
    n: '02',
    label: 'Ուսուցում',
    nav: 'Ուսուցում',
    title: 'Սովորիր MOD Academy-ում',
    text: 'Գիտելիք, գործնական աշխատանք և մասնագիտական ուղղորդում։',
    window: [0.2, 0.23, 0.34, 0.37],
    anchor: 0.3,
  },
  {
    n: '03',
    label: 'Նախագիծ',
    nav: 'Նախագիծ',
    title: 'Գաղափարներդ վերածիր նախագծերի',
    text: 'Էսքիզից մինչև ավարտուն վիզուալիզացիա․ նույն տարածքը՝ 3D մոդելով, նյութերով և լույսով։',
    window: [0.37, 0.4, 0.62, 0.65],
    anchor: 0.5,
  },
  {
    n: '04',
    label: 'Պորտֆոլիո և ավարտ',
    nav: 'Ավարտ',
    title: 'Ստեղծիր քո պորտֆոլիոն։ Ավարտիր վստահությամբ։',
    window: [0.65, 0.68, 0.8, 0.83],
    anchor: 0.78,
  },
  {
    n: '05',
    label: 'Հաջորդ քայլը',
    nav: 'Հաջորդ քայլը',
    title: 'Քո հաջորդ քայլը՝ մասնագիտական աշխարհում',
    window: [0.83, 0.86, 0.93, 0.95],
    anchor: 0.89,
  },
];

/** Stages of the project chapter, highlighted as the film reaches them (fractions of segment 3). */
export const projectStages = [
  { label: 'Էսքիզ', at: 0 },
  { label: '3D մոդել', at: 0.2 },
  { label: 'Նյութեր', at: 0.55 },
  { label: 'Լույս', at: 0.78 },
  { label: 'Վիզուալիզացիա', at: 0.96 },
];

export const finale = {
  title: 'Հաջորդ պատմությունը կարող է լինել քոնը',
  window: [0.945, 0.975] as [number, number],
  primary: { label: 'Բացահայտել դասընթացները', href: '/#courses' },
  secondary: { label: 'Շրջանավարտների պատմությունները', href: '/graduates/' },
};

export const filmCredit =
  'Ներածական անիմացիան AI-ով ստեղծված նկարազարդում է՝ կայքի համար նախագծված տարածքով․ այն ուսանողական աշխատանք կամ ակադեմիայի լսարան չէ։';
