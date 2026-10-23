import type { APIRoute } from 'astro';
import { execSync } from 'node:child_process';
import { isIndexable } from '../../site.config.mjs';

// Lets anyone confirm which commit a deployment was built from.
function commit(): string {
  if (process.env.COMMIT_REF) return process.env.COMMIT_REF;
  try {
    return execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return 'unknown';
  }
}

export const GET: APIRoute = ({ site }) =>
  new Response(
    JSON.stringify({ commit: commit(), site: site?.href ?? null, indexable: isIndexable }, null, 2),
    { headers: { 'Content-Type': 'application/json' } },
  );
