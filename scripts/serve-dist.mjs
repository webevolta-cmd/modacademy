// Minimal static server for dist/ used by the end-to-end tests (no dependencies).
// Mirrors a plain static host: directory indexes, 404.html, byte ranges, and no form handling.
import { createServer } from 'node:http';
import { createReadStream, statSync, existsSync } from 'node:fs';
import { extname, join, normalize, resolve, sep } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist');
const port = Number(process.env.PORT ?? process.argv[3] ?? 4322);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
};

createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  const url = new URL(req.url ?? '/', 'http://localhost');
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    return res.writeHead(400).end();
  }
  let file = normalize(join(root, pathname));
  if (file !== root && !file.startsWith(root + sep)) return res.writeHead(403).end();
  if (existsSync(file) && statSync(file).isDirectory()) {
    if (!url.pathname.endsWith('/')) return res.writeHead(301, { Location: `${url.pathname}/` }).end();
    file = join(file, 'index.html');
  }
  let status = 200;
  if (!existsSync(file)) {
    file = join(root, '404.html');
    status = 404;
  }
  const size = statSync(file).size;
  const type = types[extname(file)] ?? 'application/octet-stream';
  const range = req.headers.range?.match(/bytes=(\d*)-(\d*)/);
  if (range && status === 200) {
    const start = range[1] ? Number(range[1]) : 0;
    const end = range[2] ? Number(range[2]) : size - 1;
    res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1, 'Accept-Ranges': 'bytes' });
    if (req.method === 'HEAD') return res.end();
    return createReadStream(file, { start, end }).pipe(res);
  }
  res.writeHead(status, { 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes' });
  if (req.method === 'HEAD') return res.end();
  createReadStream(file).pipe(res);
}).listen(port, '127.0.0.1', () => console.log(`Serving ${root} on http://127.0.0.1:${port}`));
