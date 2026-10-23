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

Web encodes (in `public/media/hero/`, made with ffmpeg 6, audio removed, `+faststart`):

```bash
# desktop: 1440×1440, H.264 high, CRF 27, GOP 10 (short GOP keeps scroll seeking fast)
ffmpeg -i higgsfield-minimax-h3-2k-master.mp4 -an -c:v libx264 -preset slower -crf 27 -pix_fmt yuv420p \
  -profile:v high -g 10 -keyint_min 10 -sc_threshold 0 -movflags +faststart hero-1440.mp4
# mobile: 3:4 crop (x=260) scaled to 900×1200, CRF 28, GOP 8
ffmpeg -i higgsfield-minimax-h3-2k-master.mp4 -an -vf "crop=1080:1440:260:0,scale=900:1200:flags=lanczos" \
  -c:v libx264 -preset slower -crf 28 -pix_fmt yuv420p -profile:v high -g 8 -keyint_min 8 -sc_threshold 0 \
  -movflags +faststart hero-900x1200.mp4
# posters = exact first frame of each encode (WebP q80/q78)
ffmpeg -i hero-1440.mp4 -frames:v 1 poster.png
```

## work-originals/

The original Instagram slides and 968×968 crops of the student renders. The site uses 2048×2048 versions
in `src/assets/work/` (Higgsfield/ByteDance 2K upscale; composition and design unchanged).

## environment-video/

The academy’s Instagram reels (October 2026) from which the practical-lesson stills in
`src/assets/environment/` were taken (cropped below the burned-in captions).

## brand/

The logo source artwork (Instagram card, Facebook profile image) and the vector trace used to build
`src/components/Logo.astro`.
