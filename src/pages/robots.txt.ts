import type { APIRoute } from 'astro';
import { isIndexable } from '../../site.config.mjs';

// Indexable production builds publish the sitemap. Other builds stay crawlable so crawlers can read
// their noindex meta tags (a Disallow would hide the noindex and still let linked URLs be listed).
export const GET: APIRoute = ({ site }) => {
  const body = isIndexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`
    : 'User-agent: *\nAllow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
