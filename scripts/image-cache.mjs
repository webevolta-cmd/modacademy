// Keeps Astro's encoded images in the repository, so a first build on a fresh machine (Netlify
// stops builds after 15 minutes) reuses them instead of re-encoding ~1,800 AVIF/WebP files.
// Cache entries are named like the output files (source hash + transform hash), so they are valid
// on any machine and an edited image simply gets a new entry.
//
//   node scripts/image-cache.mjs seed   copy image-cache/ into Astro's cache (runs before every build)
//   node scripts/image-cache.mjs save   after a build, keep exactly the images dist/ uses in image-cache/
import fs from 'node:fs';
import path from 'node:path';

const repoCache = 'image-cache';
const astroCache = path.join('node_modules', '.astro', 'assets');
const mode = process.argv[2];

if (mode === 'seed') {
  if (!fs.existsSync(repoCache)) process.exit(0);
  fs.mkdirSync(astroCache, { recursive: true });
  let copied = 0;
  for (const name of fs.readdirSync(repoCache)) {
    const dest = path.join(astroCache, name);
    if (fs.existsSync(dest)) continue;
    fs.copyFileSync(path.join(repoCache, name), dest);
    copied++;
  }
  console.log(`[image-cache] ${copied} encoded images restored`);
} else if (mode === 'save') {
  const built = path.join('dist', '_astro');
  if (!fs.existsSync(built)) {
    console.error('[image-cache] run the build first (dist/_astro is missing)');
    process.exit(1);
  }
  const used = new Set(fs.readdirSync(built));
  fs.mkdirSync(repoCache, { recursive: true });
  let added = 0;
  let removed = 0;
  for (const name of fs.readdirSync(astroCache)) {
    const dest = path.join(repoCache, name);
    if (!used.has(name) || fs.existsSync(dest)) continue;
    fs.copyFileSync(path.join(astroCache, name), dest);
    added++;
  }
  for (const name of fs.readdirSync(repoCache)) {
    if (used.has(name)) continue;
    fs.unlinkSync(path.join(repoCache, name));
    removed++;
  }
  console.log(`[image-cache] ${added} added, ${removed} no longer used removed`);
} else {
  console.error('usage: node scripts/image-cache.mjs seed|save');
  process.exit(1);
}
