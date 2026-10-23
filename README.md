# MOD Academy — website

Armenian-language website for **MOD Academy** (Yerevan, Tigran Mets Ave 4): courses, student work,
practical lessons, FAQ and a course inquiry form, opened by a scroll-driven cinematic hero generated with
Higgsfield from a student’s 3Ds Max render.

- Static site built with [Astro 7](https://astro.build) (no server runtime), vanilla TypeScript for interaction.
- Fonts: Noto Serif Armenian + Noto Sans Armenian (variable, self-hosted from npm, OFL).
- Images: masters in `src/assets/`, responsive AVIF/WebP generated at build time.
- Research and sources: [`docs/RESEARCH.md`](docs/RESEARCH.md). Media provenance: [`media-source/README.md`](media-source/README.md).

## Requirements

- Node.js **22.12 or newer** (`.nvmrc`), npm 10+.

## Commands

```bash
npm ci            # install exactly what package-lock.json specifies
npm run dev       # local development server (http://localhost:4321)
npm run build     # production build into dist/
npm run preview   # serve dist/ locally
```

## Deploying on Netlify

`netlify.toml` already contains everything Netlify needs. In Netlify: **Add new site → Import an existing
project → GitHub →** choose this repository. Netlify reads:

| Setting | Value |
|---|---|
| Production branch | the branch you choose (this work is on `claude/mod-academy-website-ba1v5x`; merge it into `main` or select it) |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | `22.12.0` (set in `netlify.toml`) |

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
| `SITE_URL` | Netlify `URL`, else `https://modacademy.netlify.app` | Absolute site URL for canonical/OG/sitemap |
| `SITE_INDEXABLE` | `true` on Netlify production, `false` elsewhere | Search indexing (`robots` meta, `robots.txt`, sitemap) |
| `FORM_ENDPOINT` | empty | Send inquiries to another form service (e.g. Formspree) instead of Netlify Forms |

## How the inquiry form works

- On Netlify the form posts to Netlify Forms (AJAX, with a no-JavaScript fallback to `/inquiry-sent/`).
- With `FORM_ENDPOINT` set it posts there instead.
- On any other host with neither available (e.g. the review preview), the site does **not** pretend to
  send: after validation it explains that online submission is not active and offers a pre-filled email,
  a phone call and Instagram Direct.
- A success message is shown only after the receiving service answers with a 2xx status. An inquiry is
  clearly labelled as not being an enrollment confirmation.

## Project structure

```
src/
  data/          site.ts, courses.ts, media.ts, faq.ts, journey.ts — all content, easy to update
  components/    Hero, About, Courses, Finder, Journey, Work, Practice, Teaching, Faq, Contact, …
  pages/         index, courses/[slug], inquiry-sent, 404, robots.txt
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

`public/media/hero/hero-1440.mp4` (desktop, 8 MB) and `hero-900x1200.mp4` (portrait screens, 3.8 MB) are
loaded after the page has rendered, into memory, and scrubbed by scroll position. The exact first frame of
each encode is the poster, so the swap is invisible. Visitors with *reduced motion* or *data saver*
get the poster and a static layout; all text and links are available without the animation.

## Tests

```bash
npm run build
npx playwright install chromium   # once, if no Chromium is available
npm run test:e2e
```

`tests/site.spec.ts` checks every page for console errors and horizontal overflow at several widths,
the hero scroll engine, course filtering, course → form hand-off, the course finder, the lightbox,
the FAQ, form validation and the honest offline fallback, the mobile menu, and reduced motion.
