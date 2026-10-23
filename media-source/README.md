# Source and master media

Masters and originals behind the optimized files the site serves. Nothing here is requested
by the browser; the build reads only `public/` and `src/assets/`.

## hero/

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
