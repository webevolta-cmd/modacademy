# Source and master media

Masters and originals behind the optimized files the site serves. Nothing here is requested
by the browser; the build reads only `public/` and `src/assets/`.

## hero-journey/ — the homepage film (current)

The five-chapter homepage story is an **AI-generated illustration** made for the site with Higgsfield. It
shows an invented room, never a student's project or the academy's classroom, and the page says so next to
the film. Real photographs (practical lessons, certificate ceremonies, graduates) are laid over it as HTML.

**Keyframes** (`keyframes/`, lossless WebP, 2752×1536): Nano Banana Pro, 2K, 16:9, generated on 2026-10-24.
The finished room (`kf7`) was generated first; every other frame is an edit of it or of its neighbour, with
the same camera, so geometry, furniture and light stay identical from sketch to render. No text was baked in.

| Keyframe | Job | Made from |
|---|---|---|
| `kf7-finished-visualization` | `3321fe78-b4eb-4660-b2fd-1d6cf16f6908` | text prompt (photoreal eye-level interior) |
| `kf2-red-plan` | `8d20236a-0185-4cad-8eba-484de0b7e0f6` | kf7 as reference: the same room as a red-ink plan on drafting paper |
| `kf1-blank-sheet` | `a05dd519-4f10-4f26-996f-dd8c71101eba` | kf2 with the drawing removed |
| `kf3-dimensions-samples` | `e8aed82a-b543-4fa7-ac38-7896e780daa7` | kf2 plus dimension lines and material samples |
| `kf4-clay-model-on-paper` | `01a24ff5-b9a0-4474-9188-470fa7568c2d` | kf3 + kf5: the plan rising into a white model |
| `kf5-clay-room` | `535e10ae-098e-42d6-9a7b-e7a37b0430d4` | kf7 as an untextured clay render |
| `kf6-materials-flat-light` | `506fdac0-b41e-426f-a9e9-cb3e39de1698` | kf7 with materials but flat, unlit shading |
| `kf8-portfolio` | `67de00e1-88b4-4c4f-b2c5-fa6833883e21` | kf7 + kf3 printed on the pages of an open portfolio |

**Clips** (`clips/`, the original downloads): MiniMax H3, 2K, 16:9 → **2560×1440, native 24 fps, H.264**, each
generated with a start frame *and* an end frame so consecutive clips meet on exactly the same image. Prompts
asked for a locked or slow continuous camera, constant exposure, no people, no text, no cuts.

| Clip | Job | Start → end | Length |
|---|---|---|---|
| `clip-1-line-draws-plan` | `4adbdbf7-ae2e-48e6-934e-7f6b077e77b1` | kf1 → kf2 | 6.58 s, 158 frames |
| `clip-2-dimensions-and-samples` | `f0a66342-6390-4380-9bed-3d671f1ec87b` | kf2 → kf3 | 5.17 s, 124 frames |
| `clip-3-plan-rises-into-model` | `953297e4-d48b-4311-ac84-ecd670b6e708` | kf3 → kf4 | 6.58 s, 158 frames |
| `clip-4-descend-to-eye-level` | `68a3b72f-eaa4-41c6-a0f0-4652a6e2db11` | kf4 → kf5 | 6.58 s, 158 frames |
| `clip-5-materials` | `469186b0-c67c-4cee-b759-c83c36e3b679` | kf5 → kf6 | 5.17 s, 124 frames |
| `clip-6-lighting` | `2f6c0778-defe-4ae1-82b8-a61fa789a862` | kf6 → kf7 | 5.17 s, 124 frames |
| `clip-7-portfolio-pullback` | `ba2356cb-ac1e-48a3-a38b-67885d1717c2` | kf7 → kf8 | 6.58 s, 158 frames |

A first take of clip 2 (`49a42f66-…`) drew stray compass marks near the doorway and was replaced. Every
clip was reviewed frame by frame at full resolution before use (geometry, continuity at each join, flicker).

**Segments.** The page loads the film in four parts, one per story stage, so the first part can play while the
rest downloads. Clips 3–6 are joined into the *project* segment with 4-frame (0.167 s) cross-fades at the three
internal joins — the only blended frames in the film; there is **no frame interpolation** anywhere.

```bash
# project segment master (2560×1440, 24 fps, 552 frames)
ffmpeg -i clip-3….mp4 -i clip-4….mp4 -i clip-5….mp4 -i clip-6….mp4 -filter_complex \
  "[0:v]settb=1/24,fps=24[a];[1:v]settb=1/24,fps=24[b];[2:v]settb=1/24,fps=24[c];[3:v]settb=1/24,fps=24[d];
   [a][b]xfade=transition=fade:duration=0.1667:offset=6.4173[ab];[ab][c]xfade=transition=fade:duration=0.1667:offset=12.8346[abc];
   [abc][d]xfade=transition=fade:duration=0.1667:offset=17.8349,format=yuv420p[v]" -map "[v]" -c:v libx264 -crf 12 -an seg3-master.mp4
# segments 1, 2 and 4 are clips 1, 2 and 7 unchanged
```

**Web encodes** (`public/media/hero/journey/`, audio removed, `+faststart`). There is a keyframe every
half second (12 frames) and no B-frames, so seeking backwards and forwards stays fast:

```bash
# desktop 1920×1080 — CRF 28 keeps the bouclé and wood texture (compared at full size against the master)
ffmpeg -i segN-master.mp4 -an -vf "scale=1920:1080:flags=lanczos,format=yuv420p" -c:v libx264 -preset slow -crf 28 \
  -profile:v high -bf 0 -g 12 -keyint_min 12 -sc_threshold 0 -movflags +faststart journey-N-<name>-1920.mp4
# phones / portrait 960×720 — centred 4:3 crop of the same frame
ffmpeg -i segN-master.mp4 -an -vf "crop=1920:1440:320:0,scale=960:720:flags=lanczos,format=yuv420p" -c:v libx264 -preset slow \
  -crf 27 -profile:v high -bf 0 -g 12 -keyint_min 12 -sc_threshold 0 -movflags +faststart journey-N-<name>-960.mp4
# stills = the exact first/last frame of each encode, WebP q80 (desktop) / q78 (mobile)
```

Totals: desktop 11.3 MB for 42 s of film, mobile 4.9 MB. The still that opens the page (`still-1-start`) is
38 KB on desktop and 11 KB on phones.

## hero/ — the earlier film, now on the student-work page


| File | What it is |
|---|---|
| `reference-original-crop.jpg` | The first render (968×968) from Shushan Tevosyan’s 3Ds Max portfolio, as published by MOD Academy on Instagram (https://www.instagram.com/p/DezOW2GCMyH/, 2026-10-22), cropped out of the post frame |
| `reference-upscaled-4k.png` | The same render upscaled to 4096×4096 with Higgsfield (ByteDance image upscale) — used as the start frame |
| `higgsfield-minimax-h3-2k-master.mp4` | The unedited Higgsfield output: MiniMax H3, 2K (1440×1440), 15 s, 24 fps, 1:1 |

Generation (2026-10-23, Higgsfield job `24f6c7f5-2be5-45e7-a9c5-6a22f8607b37`, 30 credits): start frame = the
upscaled render; prompt asked for one continuous, slow, steady dolly push-in with a gentle rise, the exact
interior design preserved, constant light and exposure, no people, cuts, shake, zoom, speed ramps, flicker
or text.

Inspection before use: frame-by-frame review at full resolution (geometry, materials, chandelier, kitchen
and moulding stable); mean luminance 140.4–145.9 across all 362 frames (drift 0.7) — no flicker; motion
difference eases in and out smoothly with no jumps; one near-duplicate frame at the final hold.

This film was the homepage hero until the redesign. It now plays only on request on the student-work page
(`/student-work/`), labelled as an AI interpretation of Shushan Tevosyan’s render, with her original renders
beside it.

Web encodes (in `public/media/hero/`, made with ffmpeg 6, audio removed, `+faststart`). Short GOPs and no
B-frames keep scroll seeking fast; the size/quality trade-off was measured (SSIM ≈ 0.96 against the master
scaled to the same size):

```bash
# desktop: 1280×1280, H.264 high, CRF 28, GOP 12, no B-frames (5.2 MB)
ffmpeg -i higgsfield-minimax-h3-2k-master.mp4 -an -vf scale=1280:1280:flags=lanczos -c:v libx264 -preset slower \
  -crf 28 -pix_fmt yuv420p -profile:v high -bf 0 -g 12 -keyint_min 12 -sc_threshold 0 -movflags +faststart \
  hero-desktop-v2.mp4
# mobile: 3:4 crop (x=260) scaled to 900×1200, CRF 29, GOP 8, no B-frames (3.5 MB)
ffmpeg -i higgsfield-minimax-h3-2k-master.mp4 -an -vf "crop=1080:1440:260:0,scale=900:1200:flags=lanczos" \
  -c:v libx264 -preset slower -crf 29 -pix_fmt yuv420p -profile:v high -bf 0 -g 8 -keyint_min 8 -sc_threshold 0 \
  -movflags +faststart hero-mobile-v2.mp4
# posters = exact first frame of each encode (WebP q80 desktop / q78 mobile)
ffmpeg -i hero-desktop-v2.mp4 -frames:v 1 poster.png
```

The first version (1440×1440 CRF 27 with B-frames, 8.4 MB) was replaced after a performance review: the
new desktop file is 38% smaller and seeks about a quarter faster.

## work-originals/

The original Instagram slides and 968×968 crops of the student renders. The site uses 2048×2048 versions
in `src/assets/work/` (Higgsfield/ByteDance 2K upscale; composition and design unchanged).

## environment-video/

The academy’s Instagram reels (October 2026) from which the practical-lesson stills in
`src/assets/environment/` were taken (cropped below the burned-in captions).

## brand/

The logo source artwork (Instagram card, Facebook profile image) and the vector trace used to build
`src/components/Logo.astro`.
