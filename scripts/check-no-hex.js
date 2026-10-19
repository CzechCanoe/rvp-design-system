#!/usr/bin/env node
// Fails when component/global CSS contains hex colour literals (use tokens from src/tokens/).
// Strict: there is no baseline, any hex literal in src/components or src/styles fails.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
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
let failed = false;
for (const file of files) {
  const rel = relative(root, file).split('\\').join('/');
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    for (const m of line.matchAll(HEX)) {
      failed = true;
      console.error(`${rel}:${i + 1}  ${m[0]}`);
    }
  });
}
if (failed) {
  console.error('\nHex colours are not allowed in component/global CSS. Use --csk-* tokens from src/tokens/.');
  process.exit(1);
}
console.log('check-no-hex: OK');
