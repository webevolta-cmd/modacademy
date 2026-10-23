import type { APIRoute } from 'astro';
import { isIndexable } from '../../site.config.mjs';

// Indexable production builds publish the sitemap; every other build is kept out of search.
export const GET: APIRoute = ({ site }) => {
  const body = isIndexable
    ? `User-agent: *\nAllow: /\nDisallow: /inquiry-sent/\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
