// Student-work projects. Several views of one interior are one project. Every project names its
// author and course exactly as the academy (or the author) published them, with the source post.
// Academy studio work and the illustrative hero film are never listed here.
import type { ImageMetadata } from 'astro';
import { work, student } from './media';

export interface ProjectView {
  image: ImageMetadata;
  title: string;
  alt: string;
}

export interface ProjectFilm {
  desktop: string;
  mobile: string;
  poster: string;
  posterMobile: string;
  /** How the film relates to the original work — always shown with it. */
  note: string;
}

export interface Project {
  slug: string;
  title: string;
  category: 'visualization' | 'interior';
  author: {
    name: string;
    nameLatin: string;
    handle?: string;
    instagram?: string;
    role: string;
  };
  course: string;
  courseSlug?: string;
  summary: string;
  views: ProjectView[];
  source: string;
  sourceDate: string;
  /** Disclosure shown with the images (e.g. resolution enhancement). */
  imageNote?: string;
  film?: ProjectFilm;
}

export const categoryLabels: Record<Project['category'], string> = {
  visualization: '3D վիզուալիզացիա',
  interior: 'Ինտերիեր դիզայն',
};

export const projects: Project[] = [
  {
    slug: 'tevosyan-living-kitchen',
    title: 'Հյուրասենյակ՝ խոհանոցային գոտիով',
    category: 'visualization',
    author: {
      name: student.name,
      nameLatin: 'Shushan Tevosyan',
      handle: student.handle,
      instagram: student.instagram,
      role: student.role,
    },
    course: '3Ds Max',
    courseSlug: '3ds-max',
    summary:
      'Բնակարանի հյուրասենյակի, ճաշասենյակի և խոհանոցի 3D վիզուալիզացիաներ, որոնք ակադեմիան ներկայացրել է որպես «3Ds Max» դասընթացի շրջանավարտի պորտֆոլիո։',
    views: work.map((w) => ({ image: w.image, title: w.title, alt: w.alt })),
    source: student.source,
    sourceDate: student.sourceDate,
    imageNote:
      'Պատկերների լուծաչափը մեծացված է արհեստական բանականության (AI) գործիքով՝ առանց կոմպոզիցիայի և դիզայնի փոփոխության։ Բնօրինակները՝ ակադեմիայի Instagram էջում։',
    film: {
      desktop: '/media/hero/hero-desktop-v2.mp4',
      mobile: '/media/hero/hero-mobile-v2.mp4',
      poster: '/media/hero/hero-desktop-v2-poster.webp',
      posterMobile: '/media/hero/hero-mobile-v2-poster.webp',
      note: 'Կինեմատոգրաֆիկ մեկնաբանություն․ տեսանյութը ստեղծված է արհեստական բանականությամբ (AI)՝ Շուշան Թևոսյանի առաջին ռենդերի հիման վրա։ Բնօրինակ աշխատանքը ռենդերներն են։',
    },
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
