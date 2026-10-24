# MOD Academy — website

Armenian-language website for **MOD Academy** (Yerevan, Tigran Mets Ave 4). It tells one story — from a first
idea to learning, a portfolio, a certificate and the next professional step — and keeps everything a future
student needs: courses and their facts, a course finder and comparison, practical lessons, graduates, student
work, videos, FAQ and an inquiry form.

- Static site built with [Astro 7](https://astro.build) (no server runtime), vanilla TypeScript for interaction.
- Fonts: Noto Serif Armenian + Noto Sans Armenian (variable, self-hosted from npm, OFL).
- Images: masters in `src/assets/`, responsive AVIF/WebP generated at build time; the hero film and its stills
  are committed in `public/media/` — nothing is loaded from Higgsfield, Instagram or any other expiring URL.
- Research and sources: [`docs/RESEARCH.md`](docs/RESEARCH.md) (courses, facts) and
  [`docs/research/SOURCES.md`](docs/research/SOURCES.md) (graduates, certificate photos, student work, videos).
  Media provenance: [`media-source/README.md`](media-source/README.md).

## Pages

| Route | What it is |
|---|---|
| `/` | Journey hero, introduction, courses + finder + comparison, practical learning and guidance, graduates, student-work and video entry points, FAQ, inquiry and contact |
| `/courses/`, `/courses/<slug>/` | Course index and one page per course (facts, sources, inquiry) |
| `/graduates/` | Certificate-ceremony photos and documented graduate stories, each with its source |
| `/student-work/`, `/student-work/<slug>/` | Student projects with author, course, every view (lightbox) and the original post |
| `/videos/` | Curated videos from the academy's Instagram; each card opens the exact post |
| `/inquiry-sent/` | No-JavaScript confirmation after a successful form post |

The old homepage anchors still work: `/#work` lands on the student-work entry point, `/#practice` and
`/#teaching` on the learning section.

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
  data/          site, courses, faq, media, hero (story + film timing), graduates, projects, videos
  components/    JourneyHero, About, Courses, Finder, Learning, GraduatesFeature, WorkTeaser, VideosTeaser,
                 Faq, FinalCta, Contact, InquiryForm, PageHeader, ProjectFilm, VideoCard, Lightbox, …
  pages/         index, courses/, graduates/, student-work/ (index + [slug]), videos/, inquiry-sent, 404,
                 robots.txt, build-info.json
  scripts/       journey-hero (scroll story), motion (shared frame loop), reveal, draw (red lines), parallax,
                 filters, finder, lightbox, project-film, inquiry form, map
  styles/        global.css — design tokens, type, layout, motion
public/
  media/hero/journey/   the four film segments (desktop + mobile) and their exact first/last frames
  media/hero/           the earlier film, played on request on the Tevosyan project page
  media/og/             Open Graph image
media-source/    master/source media (not served): Higgsfield keyframes and clips, Instagram originals
docs/            research record, source log for graduates/videos/student work
scripts/         generate-brand-assets.mjs (favicons, logo PNG, OG image), serve-dist.mjs (static test server)
tests/           Playwright end-to-end tests
```

### Updating content

- Course facts (duration, schedule, fee, start date): `src/data/courses.ts`. Leave a field `null` when it
  is not confirmed — the site then shows “Ճշտեք ընթացիկ տվյալները” instead of a guess.
- Contact details, social links and the navigation: `src/data/site.ts`.
- FAQ answers: `src/data/faq.ts`.
- Graduates and certificate photos: `src/data/graduates.ts`. The site presents everything in the academy's own
  voice, without source notes; each entry still keeps its `source` and `attribution` (`academy`, `own` or
  `independent`) for the record in `docs/research/SOURCES.md`. Keep a story to what is documented about that
  person, and add links (Behance, Instagram) only when they are public.
- Student work: put the images in `src/assets/work/` and add a project to `src/data/projects.ts` (author,
  course, source post and date). The `/student-work/` filters appear by themselves once two categories exist.
- Videos: `src/data/videos.ts` — thumbnail in `src/assets/videos/`, the exact Instagram post URL, an Armenian
  title and a description written after watching the video.
- Sections without data (e.g. no videos yet) are left out of the page automatically.

## Homepage hero

A five-chapter scroll story (`src/components/JourneyHero.astro`, `src/scripts/journey-hero.ts`, timing in
`src/data/hero.ts`): 01 the first idea → 02 learning → 03 the project (sketch, 3D model, materials, light,
visualization) → 04 portfolio and certificate → 05 the next step, ending with «Հաջորդ պատմությունը կարող է
լինել քոնը» and two calls to action. The heading and both buttons are visible at once.

- **Film:** Higgsfield, generated for the site (Nano Banana Pro keyframes, MiniMax H3 2K clips with start
  and end frames, 2560×1440 at a native 24 fps, no frame interpolation). It shows a room designed for the
  site and is not presented as student work or the academy's classroom. Details: `media-source/README.md`.
- **Delivery:** four H.264 segments (desktop 1920×1080, 11.3 MB in total; phones 960×720, 4.9 MB), loaded
  one after another as in-memory blobs after the page has rendered and scrubbed by scroll position with
  smoothing. Until a segment is ready, the exact boundary frame is shown as a still, so the picture never jumps.
- **Real photographs** — practical lessons, certificate ceremonies and graduate stories — are HTML layers
  on top of the film, taken from `src/data/media.ts` and `src/data/graduates.ts`.
- **Controls:** a chapter indicator with direct links to each chapter, «Անցնել դասընթացներին» to skip the
  story, keyboard focus support and pointer depth on desktop. Phones get a shorter story (about 4.8 instead of 6
  screen heights of scrolling) and a 4:3 film window with the text below.
- **Fallbacks:** the story pins only when motion is allowed, the screen is at least 560 px tall and every
  chapter's text fits. Otherwise — *reduced motion*, landscape phones, very large text — the same five
  chapters are shown as a storyboard with stills. *Data saver* and 2G/3G connections never download the film.
  There is no audio and nothing traps scrolling.
- Offscreen, the frame loop stops; the film never plays on its own.

When re-encoding, give the files a new name (media is cached for a week).

## Tests

```bash
npm run build
npx playwright install chromium   # once, if no Chromium is available
npm run test:e2e
```

`tests/site.spec.ts` checks every page for console errors and horizontal overflow on desktop and mobile,
the journey hero (scrubbing, chapters, chapter links, skip link, pointer depth, short-screen and
reduced-motion fallbacks), the navigation and old anchors, image reveals, the student-work lightbox and film,
video links, graduate sources, course filtering, course → form hand-off, the course finder, the FAQ, form
validation and the honest offline fallback, and the mobile menu.

Set `PW_CHROMIUM_PATH` to use an installed Chromium instead of `npx playwright install`, or `BASE_URL` to
test a deployed copy.
