// A small, curated set of the academy's own videos that help a prospective student decide.
// Each entry was reviewed (frames and speech) before its description was written; playback opens
// the original post on Instagram. Thumbnails are stored with the site so they always load.
import type { ImageMetadata } from 'astro';

export type VideoCategory = 'graduate' | 'student' | 'practice' | 'course' | 'project';

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  thumb: ImageMetadata;
  thumbAlt: string;
  url: string;
  date: string;
  /** Duration in seconds, when known. */
  duration?: number;
}

export const videoCategoryLabels: Record<VideoCategory, string> = {
  graduate: 'Շրջանավարտներ',
  student: 'Ուսանողների փորձը',
  practice: 'Գործնական դասեր',
  course: 'Դասընթացների մասին',
  project: 'Նախագծեր',
};

export const videos: VideoItem[] = [];
