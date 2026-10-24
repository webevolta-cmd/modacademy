// Graduation photographs and graduate stories, limited to what the academy and the graduates
// have published. Every entry carries its source; docs/research/SOURCES.md records the evidence.
// A story states only documented facts, attributed to whoever published them.
import type { ImageMetadata } from 'astro';

export interface GraduationPhoto {
  id: string;
  image: ImageMetadata;
  alt: string;
  caption: string;
  date: string;
  source: string;
}

export type Attribution = 'academy' | 'own' | 'independent';

export interface GraduateStory {
  slug: string;
  name: string;
  nameLatin: string;
  course: string;
  courseSlug?: string;
  image: ImageMetadata;
  imageAlt: string;
  /** One documented sentence about the graduate's professional step, worded as in the source. */
  outcome: string;
  attribution: Attribution;
  /** Optional verbatim words of the graduate, only when published by them. */
  quote?: { text: string; source: string };
  source: string;
  sourceDate: string;
  links: { label: string; url: string }[];
  /** Student-work project on /student-work/, when one exists. */
  project?: string;
}

export const graduationPhotos: GraduationPhoto[] = [];

export const graduateStories: GraduateStory[] = [];

export const attributionLabel: Record<Attribution, string> = {
  academy: 'Ըստ ակադեմիայի հրապարակման',
  own: 'Ըստ շրջանավարտի հրապարակման',
  independent: 'Հաստատված է անկախ աղբյուրով',
};
