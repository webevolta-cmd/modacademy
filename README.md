# MOD Academy — website

Armenian-language website for **MOD Academy** (Yerevan, Tigran Mets Ave 4): courses, student work,
practical lessons, FAQ and a course inquiry form, opened by a scroll-driven cinematic hero generated with
Higgsfield from a student’s 3Ds Max render.

- Static site built with [Astro 7](https://astro.build) (no server runtime), vanilla TypeScript for interaction.
- Fonts: Noto Serif Armenian + Noto Sans Armenian (variable, self-hosted from npm, OFL).
- Images: masters in `src/assets/`, responsive AVIF/WebP generated at build time.
- Research and sources: [`docs/RESEARCH.md`](docs/RESEARCH.md). Media provenance: [`media-source/README.md`](media-source/README.md).

## Requirements

- Node.js **22.19 or newer** (`.nvmrc` pins 22.22.0, the version the site is built and tested with), npm 10+.

## Commands

```bash
npm ci            # install exactly what package-lock.json specifies
npm run dev       # local development server (http://localhost:4321)
npm run build     # production build into dist/
npm run preview   # serve dist/ locally
npm run check     # type-check .astro and .ts files (astro check)
```

## Deploying on Netlify

`netlify.toml` already contains everything Netlify needs. In Netlify: **Add new site → Import an existing
project → GitHub →** choose this repository. Netlify reads:

| Setting | Value |
|---|---|
| Production branch | the branch you choose (this work is on `claude/mod-academy-website-ba1v5x`; merge it into `main` or select it) |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | `22.22.0` (set in `netlify.toml`) |

After the first deploy:

1. **Enable form detection** — *Site configuration → Forms → Enable form detection*, then trigger a redeploy.
   The inquiry form (`name="inquiry"`) is then captured by Netlify Forms. Add an email notification under
   *Forms → Form notifications* so the academy receives each inquiry (e.g. to `mod.modacademy@gmail.com`).
2. **Custom domain** (optional) — Netlify’s `URL` variable is used automatically for canonical links,
   Open Graph tags and the sitemap. To override it, set `SITE_URL`.
3. **Indexing** — Netlify *production* builds are indexable by default (sitemap + `robots.txt` allow).
   Deploy previews and branch deploys are always `noindex`. To keep production hidden until launch, set
   the environment variable `SITE_INDEXABLE=false` and redeploy.

### Environment variables (all optional, none are secrets)

| Variable | Default | Purpose |
|---|---|---|
| `SITE_URL` | Netlify `URL`, else `http://localhost:4321` | Absolute site URL for canonical/OG/sitemap. A build without `SITE_URL`/`URL` is always `noindex` |
| `SITE_INDEXABLE` | `true` on Netlify production, `false` elsewhere | Search indexing (`robots` meta, `robots.txt`, sitemap) |
| `FORM_ENDPOINT` | empty | Send inquiries to another form service (e.g. Formspree) instead of Netlify Forms |

For local builds the same variables can go in a `.env` file (copy `.env.example`); `site.config.mjs` reads it,
and values set in the shell or on Netlify take precedence.

## How the inquiry form works

- On Netlify the form posts to Netlify Forms (AJAX, with a no-JavaScript fallback to `/inquiry-sent/`).
  The Netlify attributes (`data-netlify`, honeypot) are only rendered in this mode.
- With `FORM_ENDPOINT` set it posts there instead (also without JavaScript: the form's `action` is the endpoint).
- On any other host with neither available (e.g. the review preview), the site does **not** pretend to
  send: after validation it explains that online submission is not active and offers a pre-filled email,
  a phone call and Instagram Direct. Without JavaScript the submit button is replaced by the phone number and
  email address.
- A success message is shown only after the receiving service answers with a 2xx status. An inquiry is
  clearly labelled as not being an enrollment confirmation.

## Project structure

```
src/
  data/          site.ts, courses.ts, media.ts, faq.ts, journey.ts — all content, easy to update
  components/    Hero, About, Courses, Finder, Journey, Work, Practice, Teaching, Faq, Contact, …
  pages/         index, courses/ (index + [slug]), inquiry-sent, 404, robots.txt, build-info.json
  scripts/       hero scroll engine, reveals, parallax, filters, finder, lightbox, form, map
  styles/        global.css — design tokens, type, layout, motion
public/
  media/hero/    optimized hero film (desktop + mobile) and exact first-frame posters
  media/og/      Open Graph image
media-source/    master/source media (not served)
docs/            research record and raw findings
scripts/         generate-brand-assets.mjs (favicons, logo PNG, OG image)
tests/           Playwright end-to-end tests
```

### Updating content

- Course facts (duration, schedule, fee, start date): `src/data/courses.ts`. Leave a field `null` when it
  is not confirmed — the site then shows “Ճշտեք ընթացիկ տվյալները” instead of a guess.
- Contact details and social links: `src/data/site.ts`.
- FAQ answers: `src/data/faq.ts`.
- New student work: add the image to `src/assets/work/` and an entry in `src/data/media.ts`.

## Hero film

`public/media/hero/hero-desktop-v2.mp4` (1280×1280, 5.2 MB) and `hero-mobile-v2.mp4` (portrait screens,
900×1200, 3.5 MB) are loaded after the page has rendered, into memory, and scrubbed by scroll position. Both
are H.264 with short keyframe intervals and no B-frames, which keeps seeking fast. The exact first frame of
each encode is the poster, so the swap is invisible; the video element joins the page only on the first
scroll, so the poster stays the page's Largest Contentful Paint. Encoding commands: `media-source/README.md`.
When re-encoding, give the files a new version suffix (the files are cached for a week).

The hero pins and scrubs only when motion is allowed and the screen is at least 540 px tall. Visitors with
*reduced motion*, short screens (landscape phones, strongly zoomed-in browsers), *data saver* or a slow
connection get the poster and/or a static layout; all text and links are available without the animation.

## Tests

```bash
npm run build
npx playwright install chromium   # once, if no Chromium is available
npm run test:e2e
```

`tests/site.spec.ts` checks every page for console errors and horizontal overflow at several widths,
the hero scroll engine, course filtering, course → form hand-off, the course finder, the lightbox,
the FAQ, form validation and the honest offline fallback, the mobile menu, and reduced motion.
