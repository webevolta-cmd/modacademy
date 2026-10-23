// Build-time deployment settings shared by astro.config.mjs and the pages.
//
// SITE_URL       Absolute public URL of the deployment (canonical links, sitemap, Open Graph).
//                On Netlify the built-in URL variable is used automatically.
// SITE_INDEXABLE "true" | "false". Defaults to true only for Netlify production builds,
//                so previews, branch deploys and local builds are kept out of search engines.
// FORM_ENDPOINT  Optional HTTPS endpoint (e.g. Formspree) that accepts the inquiry form as
//                application/x-www-form-urlencoded. When empty, Netlify Forms is used on Netlify.

const env = process.env;

export const siteUrl = (env.SITE_URL || env.URL || 'https://modacademy.netlify.app').replace(/\/$/, '');

export const isIndexable = env.SITE_INDEXABLE
  ? env.SITE_INDEXABLE === 'true'
  : env.NETLIFY === 'true' && env.CONTEXT === 'production';

export const isNetlifyBuild = env.NETLIFY === 'true';

export const formEndpoint = env.FORM_ENDPOINT || '';

/** 'netlify' | 'endpoint' | 'offline' — 'offline' means no online receiver exists for this build. */
export const formMode = formEndpoint ? 'endpoint' : isNetlifyBuild ? 'netlify' : 'offline';
