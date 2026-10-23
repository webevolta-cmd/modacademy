// Regenerates favicons, the logo PNG and the Open Graph image from the traced logo,
// the self-hosted fonts and the hero poster. Run: node scripts/generate-brand-assets.mjs
// Requires the Playwright Chromium browser (devDependency); output is committed to /public.
import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const p = (...x) => resolve(root, ...x);
const { mark, red, word } = JSON.parse(readFileSync(p('scripts/logo-paths.json'), 'utf8'));

const logoSvg = (ink, withWord = true, vb) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb ?? (withWord ? '6 60 462 197' : '6 60 462 162')}"><path fill="${ink}" d="${mark}"/><path fill="#B3121B" d="${red}"/>${withWord ? `<path fill="${ink}" d="${word}"/>` : ''}</svg>`;

// Favicon: the red arc of the logo's "O" on ink — the most recognisable brand element.
const arcOnly = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#15120f"/><g transform="translate(32 32) scale(0.36) translate(-280 -138)"><path fill="#B3121B" d="${red}"/></g></svg>`;
mkdirSync(p('public/brand'), { recursive: true });
writeFileSync(p('public/favicon.svg'), arcOnly);

const font = (pkg, file) => pathToFileURL(p('node_modules/@fontsource-variable', pkg, 'files', file)).href;
const fontCss = `
@font-face{font-family:Serif;src:url(${font('noto-serif-armenian', 'noto-serif-armenian-armenian-wdth-normal.woff2')}) format('woff2');font-weight:100 900;font-stretch:62.5% 100%;unicode-range:U+0530-058F,U+FB13-FB17}
@font-face{font-family:Serif;src:url(${font('noto-serif-armenian', 'noto-serif-armenian-latin-wdth-normal.woff2')}) format('woff2');font-weight:100 900;font-stretch:62.5% 100%;unicode-range:U+0000-00FF,U+2000-206F}
@font-face{font-family:Sans;src:url(${font('noto-sans-armenian', 'noto-sans-armenian-armenian-wdth-normal.woff2')}) format('woff2');font-weight:100 900;font-stretch:62.5% 100%;unicode-range:U+0530-058F,U+FB13-FB17}
@font-face{font-family:Sans;src:url(${font('noto-sans-armenian', 'noto-sans-armenian-latin-wdth-normal.woff2')}) format('woff2');font-weight:100 900;font-stretch:62.5% 100%;unicode-range:U+0000-00FF,U+2000-206F}`;

const poster = pathToFileURL(p('public/media/hero/hero-1440-poster.webp')).href;
const pages = {
  favicon32: { w: 32, h: 32, html: `<body style="margin:0">${arcOnly.replace('<svg ', '<svg width="32" height="32" ')}</body>`, out: 'public/favicon-32.png' },
  touch: {
    w: 180, h: 180,
    html: `<body style="margin:0;background:#15120f;display:grid;place-items:center;width:180px;height:180px">${logoSvg('#f1ebe2', false).replace('<svg ', '<svg style="width:136px" ')}</body>`,
    out: 'public/apple-touch-icon.png',
  },
  icon192: {
    w: 192, h: 192,
    html: `<body style="margin:0;background:#15120f;display:grid;place-items:center;width:192px;height:192px">${logoSvg('#f1ebe2', false).replace('<svg ', '<svg style="width:140px" ')}</body>`,
    out: 'public/brand/icon-192.png',
  },
  icon512: {
    w: 512, h: 512,
    html: `<body style="margin:0;background:#15120f;display:grid;place-items:center;width:512px;height:512px">${logoSvg('#f1ebe2', false).replace('<svg ', '<svg style="width:340px" ')}</body>`,
    out: 'public/brand/icon-512.png',
  },
  logo: {
    w: 600, h: 260,
    html: `<body style="margin:0;background:#fff;display:grid;place-items:center;width:600px;height:260px">${logoSvg('#15120f').replace('<svg ', '<svg style="width:520px" ')}</body>`,
    out: 'public/brand/mod-academy-logo.png',
  },
  og: {
    w: 1200, h: 630,
    html: `<style>${fontCss}*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;display:grid;grid-template-columns:560px 640px;background:#f4efe8;color:#15120f;font-family:Sans}
      .t{padding:56px 52px;display:flex;flex-direction:column;justify-content:space-between}
      h1{font-family:Serif;font-stretch:87.5%;font-weight:360;font-size:62px;line-height:1.04;margin:0;letter-spacing:-.01em}
      h1 em{font-style:normal;color:#B3121B}
      p{margin:0;font-size:21px;line-height:1.45;color:#2c2722}
      .meta{font-size:16px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;color:#5d5247}
      .img{position:relative;background:url(${poster}) 62% 50%/cover}
      .img:after{content:'';position:absolute;inset:18px;border:1px solid rgba(255,255,255,.55)}
      </style><body><div class="t"><div style="width:190px">${logoSvg('#15120f')}</div><div><h1>Ստեղծի՛ր ապագայիդ <em>պրոֆեսիոնալ</em> ուղին</h1></div><div><p>Ինտերիեր դիզայն · 3Ds Max · Corona Renderer · Գրաֆիկ դիզայն · Վաճառքի կառավարում</p><p class="meta" style="margin-top:16px">Երևան · Տիգրան Մեծ 4</p></div></div><div class="img"></div></body>`,
    out: 'public/media/og/mod-academy-og.jpg',
  },
};

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
for (const [name, cfg] of Object.entries(pages)) {
  const page = await browser.newPage({ viewport: { width: cfg.w, height: cfg.h }, deviceScaleFactor: 1 });
  const file = p(`node_modules/.cache/brand-${name}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, `<!doctype html><meta charset="utf-8">${cfg.html}`);
  await page.goto(pathToFileURL(file).href);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  await page.screenshot({ path: p(cfg.out), type: cfg.out.endsWith('.jpg') ? 'jpeg' : 'png', quality: cfg.out.endsWith('.jpg') ? 86 : undefined, omitBackground: false });
  await page.close();
  console.log('wrote', cfg.out);
}
await browser.close();
