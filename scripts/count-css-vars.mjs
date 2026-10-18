#!/usr/bin/env node
// Counts CSS custom property definitions and references, split by prefix.
//
//   node scripts/count-css-vars.mjs [file.css] [--json] [--strict-tokens] [--strict]
//
// Default file: dist/rvp-design-system.css (run `npm run build` first).
//
// Each definition found in the file is attributed to the source group(s) that
// define the same name: src/tokens + src/styles ("tokens"), src/components,
// src/prototypes, other src/**. A name defined in several groups counts in each.
//
//   --strict-tokens  exit 1 when the file contains a non --csk-* definition coming
//                    from src/tokens or src/styles (v2 T1 acceptance criterion)
//   --strict         exit 1 when the file contains any non --csk-* definition
//                    (v2 T3 acceptance criterion)
// Both strict modes also exit 1 when a definition cannot be attributed to any
// source file (its origin, and so the criterion, cannot be verified).
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const target = args.find((a) => !a.startsWith('--')) ?? 'dist/rvp-design-system.css';
const targetPath = resolve(root, target);

if (!existsSync(targetPath)) {
  console.error(`${target} not found. Run \`npm run build\` first.`);
  process.exit(2);
}

const CSK = '--csk-';
const DEF = /(?<![\w-])(--[A-Za-z0-9_-]+)\s*:/g;
const REF = /var\(\s*(--[A-Za-z0-9_-]+)/g;

const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

function scan(css) {
  const text = stripComments(css);
  // Drop var(...) names before matching definitions so `var(--a)` never counts as one.
  const defs = [...text.replace(REF, 'var(').matchAll(DEF)].map((m) => m[1]);
  const refs = [...text.matchAll(REF)].map((m) => m[1]);
  return { defs, refs };
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return e.name.endsWith('.css') ? [p] : [];
  });
}

/** First segment after `--` (or `--csk-`), e.g. --color-primary-500 -> --color-* */
function prefixOf(name) {
  if (name.startsWith(CSK)) {
    const seg = name.slice(CSK.length).split('-')[0];
    return `${CSK}${seg}-*`;
  }
  return `--${name.slice(2).split('-')[0]}-*`;
}

const groups = [
  { key: 'tokens', label: 'src/tokens + src/styles', match: (rel) => rel.startsWith('src/tokens/') || rel.startsWith('src/styles/') },
  { key: 'components', label: 'src/components', match: (rel) => rel.startsWith('src/components/') },
  { key: 'prototypes', label: 'src/prototypes', match: (rel) => rel.startsWith('src/prototypes/') },
  { key: 'other', label: 'other src/**', match: () => true },
];

const sourceNames = Object.fromEntries(groups.map((g) => [g.key, new Set()]));
for (const file of walk(join(root, 'src'))) {
  const rel = relative(root, file).split('\\').join('/');
  const group = groups.find((g) => g.match(rel));
  for (const name of scan(readFileSync(file, 'utf8')).defs) sourceNames[group.key].add(name);
}

const { defs, refs } = scan(readFileSync(targetPath, 'utf8'));

function summarize(names) {
  const unique = new Set(names);
  const csk = names.filter((n) => n.startsWith(CSK));
  const other = names.filter((n) => !n.startsWith(CSK));
  const byPrefix = {};
  for (const n of names) byPrefix[prefixOf(n)] = (byPrefix[prefixOf(n)] ?? 0) + 1;
  return {
    total: names.length,
    unique: unique.size,
    csk: { total: csk.length, unique: new Set(csk).size },
    other: { total: other.length, unique: new Set(other).size },
    byPrefix: Object.fromEntries(Object.entries(byPrefix).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))),
  };
}

const bySource = {};
for (const g of groups) {
  bySource[g.key] = summarize(defs.filter((n) => sourceNames[g.key].has(n)));
}
const unattributed = summarize(defs.filter((n) => !groups.some((g) => sourceNames[g.key].has(n))));

// References to names that the file never defines (would resolve to the fallback or nothing).
const defined = new Set(defs);
const undefinedRefs = summarize(refs.filter((n) => !defined.has(n)));

const report = {
  file: target,
  definitions: summarize(defs),
  references: summarize(refs),
  undefinedReferences: undefinedRefs,
  definitionsBySource: bySource,
  definitionsUnattributed: unattributed,
};

if (flags.has('--json')) {
  console.log(JSON.stringify(report, null, 2));
} else {
  const line = (s) => `${s.total} (unique ${s.unique}) — --csk-*: ${s.csk.total} (unique ${s.csk.unique}), other: ${s.other.total} (unique ${s.other.unique})`;
  const top = (s, n = 12) =>
    Object.entries(s.byPrefix)
      .slice(0, n)
      .map(([p, c]) => `${p} ${c}`)
      .join(', ') || '—';
  console.log(`# ${target}`);
  console.log(`definitions: ${line(report.definitions)}`);
  console.log(`  by prefix: ${top(report.definitions)}`);
  console.log(`references:  ${line(report.references)}`);
  console.log(`  by prefix: ${top(report.references)}`);
  console.log(`references to names not defined in the file: ${line(undefinedRefs)}`);
  console.log(`  by prefix: ${top(undefinedRefs)}`);
  console.log('definitions by source:');
  for (const g of groups) {
    console.log(`  ${g.label}: ${line(bySource[g.key])}`);
    if (bySource[g.key].other.total) console.log(`    non --csk-* by prefix: ${top(summarize(defs.filter((n) => sourceNames[g.key].has(n) && !n.startsWith(CSK))))}`);
  }
  if (unattributed.total) console.log(`  unattributed: ${line(unattributed)}`);
}

let failed = false;
if (flags.has('--strict-tokens') && bySource.tokens.other.total > 0) {
  console.error(`FAIL: ${bySource.tokens.other.unique} non --csk-* definition(s) from src/tokens + src/styles`);
  failed = true;
}
if (flags.has('--strict') && report.definitions.other.total > 0) {
  console.error(`FAIL: ${report.definitions.other.unique} non --csk-* definition(s) in ${target}`);
  failed = true;
}
if ((flags.has('--strict') || flags.has('--strict-tokens')) && unattributed.total > 0) {
  const names = [...new Set(defs.filter((n) => !groups.some((g) => sourceNames[g.key].has(n))))];
  console.error(`FAIL: ${unattributed.unique} definition(s) not attributable to any src/** file: ${names.join(', ')}`);
  failed = true;
}
process.exit(failed ? 1 : 0);
