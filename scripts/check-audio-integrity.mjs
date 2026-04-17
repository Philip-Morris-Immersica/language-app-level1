#!/usr/bin/env node
/**
 * Audio integrity check — prevents LFS-pointer MP3s from being committed/deployed.
 *
 * Fails (exit 1) if:
 *   1. Any *.mp3 tracked by git is stored as an LFS pointer blob (size < 500 bytes
 *      AND starts with "version https://git-lfs.github.com/spec/v1").
 *   2. *.mp3 is listed as LFS-tracked in .gitattributes.
 *
 * Why: Vercel build does not fetch LFS objects, so pointer-file MP3s ship to
 * production and break every "Слушай"/audio button. See .cursor/rules/tts-audio.mdc.
 *
 * Usage:
 *   node scripts/check-audio-integrity.mjs
 *   npm run check:audio
 */

import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

function fail(msg) {
  console.error(`${RED}✗ ${msg}${RESET}`);
  process.exitCode = 1;
}
function ok(msg) {
  console.log(`${GREEN}✓ ${msg}${RESET}`);
}
function warn(msg) {
  console.log(`${YELLOW}! ${msg}${RESET}`);
}

// ─── 1. .gitattributes must NOT track *.mp3 via LFS ────────────────────────
const attrPath = '.gitattributes';
if (existsSync(attrPath)) {
  const attr = readFileSync(attrPath, 'utf8');
  const bad = attr
    .split(/\r?\n/)
    .find(l => !l.trim().startsWith('#') && /^\*\.mp3\b.*filter=lfs/.test(l));
  if (bad) {
    fail(`.gitattributes contains an LFS rule for *.mp3:\n   "${bad.trim()}"\n   Remove it. Vercel cannot read LFS objects; MP3s must be regular git blobs.`);
  } else {
    ok('.gitattributes does not route *.mp3 through LFS');
  }
} else {
  warn('.gitattributes not found — skipping attribute check');
}

// ─── 2. No tracked *.mp3 blob may be an LFS pointer ────────────────────────
const list = execSync('git ls-files -s -- "*.mp3"', { encoding: 'utf8' });
const rows = list
  .split(/\r?\n/)
  .filter(Boolean)
  .map(line => {
    const [mode, sha, stage, ...rest] = line.split(/\s+/);
    return { sha, path: rest.join(' ').replace(/^"(.*)"$/, '$1') };
  });

let pointers = 0;
let total = 0;
for (const { sha, path } of rows) {
  total++;
  const size = parseInt(execSync(`git cat-file -s ${sha}`, { encoding: 'utf8' }).trim(), 10);
  if (size > 500) continue;
  const head = execSync(`git cat-file -p ${sha}`, { encoding: 'utf8' }).slice(0, 80);
  if (head.startsWith('version https://git-lfs.github.com/spec/v1')) {
    pointers++;
    fail(`LFS pointer instead of real MP3: ${path} (${size} bytes)`);
  }
}

if (pointers === 0) {
  ok(`All ${total} tracked *.mp3 files are real binaries (no LFS pointers)`);
} else {
  console.error(`\n${RED}Found ${pointers} LFS-pointer MP3 file(s).${RESET}`);
  console.error('Fix with:');
  console.error('   git add --renormalize -- "public/assets/**/*.mp3"');
  console.error('   git commit -m "fix(audio): renormalize MP3s out of LFS"');
  console.error('   git push\n');
}

if (process.exitCode === 1) process.exit(1);
