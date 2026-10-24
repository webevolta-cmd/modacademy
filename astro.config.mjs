// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { siteUrl, isIndexable } from './site.config.mjs';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: siteUrl,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  prefetch: false,
  integrations: isIndexable
    ? [
        sitemap({
          filter: (page) => !page.includes('/inquiry-sent/'),
        }),
      ]
    : [],
});
