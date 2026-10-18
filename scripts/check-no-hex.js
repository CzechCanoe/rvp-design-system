#!/usr/bin/env node
// Fails when component/global CSS contains hex colour literals (use tokens from src/tokens/).
// Existing 1.x debt is tracked in scripts/check-no-hex.baseline.json (per-file counts);
// a file may not gain hex literals beyond its baseline, and new files may have none.
// `--update-baseline` rewrites the baseline from the current state.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const baselinePath = join(root, 'scripts', 'check-no-hex.baseline.json');
const HEX = /#[0-9a-fA-F]{3,8}\b/g;

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return e.name.endsWith('.css') ? [p] : [];
  });
}

const files = [...walk(join(root, 'src', 'components')), ...walk(join(root, 'src', 'styles'))].sort();
const found = {};
for (const file of files) {
  const rel = relative(root, file).split('\\').join('/');
  const hits = [];
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    for (const m of line.matchAll(HEX)) hits.push({ line: i + 1, text: m[0] });
  });
  if (hits.length) found[rel] = hits;
}

if (process.argv.includes('--update-baseline')) {
  const counts = Object.fromEntries(Object.entries(found).map(([f, h]) => [f, h.length]));
  writeFileSync(baselinePath, JSON.stringify(counts, null, 2) + '\n');
  console.log(`Baseline written: ${Object.keys(counts).length} files.`);
  process.exit(0);
}

const baseline = existsSync(baselinePath) ? JSON.parse(readFileSync(baselinePath, 'utf8')) : {};
let failed = false;
for (const [file, hits] of Object.entries(found)) {
  const allowed = baseline[file] ?? 0;
  if (hits.length > allowed) {
    failed = true;
    console.error(`${file}: ${hits.length} hex literal(s), baseline allows ${allowed}`);
    for (const h of hits) console.error(`  ${file}:${h.line}  ${h.text}`);
  }
}
if (failed) {
  console.error('\nHex colours are not allowed in component/global CSS. Use --csk-* tokens from src/tokens/.');
  process.exit(1);
}
console.log('check-no-hex: OK');
