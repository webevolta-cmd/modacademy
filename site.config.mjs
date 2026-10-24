// Build-time deployment settings shared by astro.config.mjs and the pages.
//
// SITE_URL       Absolute public URL of the deployment (canonical links, sitemap, Open Graph).
//                On Netlify the built-in URL variable is used automatically.
// SITE_INDEXABLE "true" | "false". Defaults to true only for Netlify production builds,
//                so previews, branch deploys and local builds are kept out of search engines.
// FORM_ENDPOINT  Optional HTTPS endpoint (e.g. Formspree) that accepts the inquiry form as
//                application/x-www-form-urlencoded. When empty, Netlify Forms is used on Netlify.

// A local .env file (see .env.example) is read here so astro.config.mjs and the pages see the
// same values. Variables already set in the environment take precedence.
try {
  process.loadEnvFile('.env');
} catch {
  /* no .env file */
}

const env = process.env;
// Netlify previews and branch deploys use their own address, not the production URL.
const netlifyUrl = env.CONTEXT && env.CONTEXT !== 'production' ? env.DEPLOY_PRIME_URL || env.URL : env.URL;
const publicUrl = env.SITE_URL || netlifyUrl || '';

export const siteUrl = (publicUrl || 'http://localhost:4321').replace(/\/$/, '');

const wantsIndexing = env.SITE_INDEXABLE
  ? env.SITE_INDEXABLE === 'true'
  : env.NETLIFY === 'true' && env.CONTEXT === 'production';

// Without a known public URL, canonical links and the sitemap would point to the wrong host,
// so such a build is never offered to search engines.
export const isIndexable = wantsIndexing && Boolean(publicUrl);
if (wantsIndexing && !publicUrl) {
  console.warn('[site.config] SITE_INDEXABLE is true but neither SITE_URL nor URL is set; building as noindex.');
}

export const isNetlifyBuild = env.NETLIFY === 'true';

export const formEndpoint = env.FORM_ENDPOINT || '';

/** 'netlify' | 'endpoint' | 'offline' — 'offline' means no online receiver exists for this build. */
export const formMode = formEndpoint ? 'endpoint' : isNetlifyBuild ? 'netlify' : 'offline';
