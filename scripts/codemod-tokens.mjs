#!/usr/bin/env node
// Codemod: 1.x design tokens -> v2 `--csk-*` tokens in src/components/**.
//
//   node scripts/codemod-tokens.mjs [--dry] [--verbose] [dir ...]
//
// Default dir: src/components. Rewrites *.css, *.ts, *.tsx (also stories).
// The old -> new table below implements docs/v2/TOKENS.md, section "Mapování 1.x -> 2.0",
// extended by T3 for every 1.x name that table does not list (those choices are
// listed in the T3 PR under "Rozhodnuto bez maintainera").
//
// Idempotent: new names all start with `--csk-`, which no rule touches. Running it twice
// changes nothing. Prints how many occurrences were mapped per old name and which old
// names stayed unmapped (not defined by src/tokens and not a component-local property).
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const dry = argv.includes('--dry');
const verbose = argv.includes('--verbose');
const dirs = argv.filter((a) => !a.startsWith('--'));
if (!dirs.length) dirs.push('src/components');

const C = (n) => `--csk-${n}`;

// ---------------------------------------------------------------------------------
// Exact renames: old name (without leading --) -> replacement for the *name only*.
// ---------------------------------------------------------------------------------
const RENAME = {};
const EXPR_PRE = {};
const alias = (target, ...olds) => olds.forEach((o) => (RENAME[o] = C(target)));

// Text
alias('color-text', 'color-text-primary', 'color-neutral-900', 'color-gray-800', 'color-text-inverse-dark');
alias('color-text-2', 'color-text-secondary', 'color-neutral-700', 'color-neutral-600', 'color-text-secondary-dark');
alias('color-text-3', 'color-text-tertiary', 'color-neutral-500', 'color-neutral-400', 'color-text-muted', 'color-text-disabled');
alias('color-text-on-fill', 'color-text-inverse');
alias('white', 'color-white');
alias('color-action', 'color-text-link', 'color-primary', 'color-primary-500', 'color-primary-400', 'color-interactive-default', 'color-accent-500', 'color-accent-400', 'color-accent-primary');
alias('color-action-hover', 'color-text-link-hover', 'color-primary-600', 'color-interactive-hover', 'color-accent-600', 'color-primary-dark');
alias('color-brand', 'color-primary-700', 'color-primary-800', 'color-primary-900', 'color-interactive-active');
alias('color-highlight-bg', 'color-primary-50', 'color-primary-100', 'color-primary-bg', 'color-primary-subtle', 'color-primary-light', 'color-interactive-soft', 'color-accent-50', 'color-accent-100');
alias('color-highlight-border', 'color-primary-200', 'color-primary-300', 'color-primary-border', 'color-accent-200');
alias('color-focus', 'color-border-focus', 'color-interactive-focus', 'color-focus-ring');
// Surfaces
alias('color-surface', 'color-bg-primary', 'color-surface-primary', 'color-bg-elevated', 'color-neutral-0');
alias('color-surface-2', 'color-bg-secondary', 'color-surface-secondary', 'color-bg-subtle', 'color-neutral-50');
alias('color-surface-3', 'color-bg-tertiary', 'color-surface-tertiary', 'color-neutral-100', 'color-gray-100', 'color-bg-muted', 'color-bg-hover', 'color-interactive-disabled');
// Borders
alias('color-border', 'color-border', 'color-border-default', 'color-border-primary', 'color-border-secondary', 'color-border-strong', 'color-border-hover', 'color-neutral-300', 'color-neutral-400');
alias('color-border-2', 'color-border-subtle', 'color-border-muted', 'color-neutral-200');
RENAME['color-neutral-400'] = C('color-text-3');
// Sections
alias('color-section-dv', 'color-section-dv', 'color-section-dv-700', 'color-section-dv-dark', 'color-section-dv-300', 'gradient-section-dv');
alias('color-section-ry', 'color-section-ry', 'color-section-ry-700', 'color-section-ry-dark', 'color-section-ry-300', 'gradient-section-ry');
alias('color-section-vt', 'color-section-vt', 'color-section-vt-700', 'color-section-vt-dark', 'color-section-vt-300', 'gradient-section-vt');
alias('violet', 'color-vt-m');
alias('red', 'color-vt-a');
alias('amber', 'color-vt-b');
alias('green', 'color-vt-c');
// Status colours: shade -> -bg (50..200), base (300..600), -text (700..900)
for (const [old, tok, extra] of [['success', 'success', ['feedback-success']], ['warning', 'warning', ['feedback-warning']], ['error', 'error', ['feedback-error', 'danger']], ['info', 'info', ['feedback-info']]]) {
  const o = old;
  alias(`color-${tok}`, `color-${o}`, `color-${o}-300`, `color-${o}-400`, `color-${o}-500`, `color-${o}-600`, ...extra.map((e) => `color-${e}`));
  alias(`color-${tok}-bg`, `color-${o}-50`, `color-${o}-100`, `color-${o}-200`, `color-${o}-subtle`, `color-${o}-bg`, ...extra.flatMap((e) => [`color-${e}-bg`, `color-${e}-border`, `color-${e}-subtle`]));
  alias(`color-${tok}-text`, `color-${o}-700`, `color-${o}-800`, `color-${o}-900`, `color-${o}-dark`);
}
alias('color-error', 'color-danger-400', 'color-danger-500');
alias('color-error-bg', 'color-danger-subtle');
alias('color-error-bg', 'color-feedback-error-bg');

// Typography
alias('font-sans', 'font-family-sans', 'font-family-base', 'font-family');
alias('font-display', 'font-family-display', 'font-display');
alias('font-mono', 'font-family-mono', 'font-mono');
alias('font-weight-regular', 'font-weight-normal');
alias('font-weight-medium', 'font-weight-medium', 'font-medium');
alias('font-weight-semibold', 'font-weight-semibold', 'font-semibold');
alias('font-weight-bold', 'font-weight-bold', 'font-bold', 'font-weight-extrabold', 'text-display-weight', 'text-headline-weight');
// font-size / --text-*-size scale. 1.x px -> nearest v2 step, ties go to the larger step.
const SIZE = { '2xs': 'xs', xs: 'sm', sm: 'md', md: 'md', base: 'base', lg: 'lg', xl: 'xl', '2xl': '2xl', '3xl': '2xl', '4xl': '3xl', '5xl': '3xl', '6xl': '3xl', '7xl': '3xl' };
for (const [k, v] of Object.entries(SIZE)) {
  RENAME[`font-size-${k}`] = C(`text-${v}`);
  RENAME[`text-${k}-size`] = C(`text-${v}`);
}
alias('text-md', 'text-embed-small-size', 'text-embed-body-size');
alias('text-lg', 'text-embed-h4-size');
alias('text-xl', 'text-embed-h3-size');
alias('text-2xl', 'text-embed-h2-size');
alias('line-height-snug', 'line-height-tight', 'line-height-snug');
alias('line-height-normal', 'line-height-normal', 'line-height-relaxed');
alias('letter-spacing-tight', 'letter-spacing-tight', 'text-headline-tracking', 'text-display-tracking');
alias('letter-spacing-caps', 'letter-spacing-wide');

// Spacing: 1.x --spacing-N is N * 4px, identical to --csk-space-N for N <= 8, 10, 12.
for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 10, 12]) RENAME[`spacing-${n}`] = C(`space-${n}`);
alias('space-2', 'spacing-input-padding-y', 'spacing-button-padding-y', 'spacing-button-gap', 'spacing-card-padding-sm', 'spacing-embed-sm');
alias('space-3', 'spacing-input-padding-x', 'spacing-button-padding-x-sm', 'spacing-button-padding-y-lg', 'spacing-embed-md', 'spacing-embed-card-padding');
alias('space-4', 'spacing-card-padding', 'spacing-button-padding-x');
alias('space-6', 'spacing-card-padding-lg', 'spacing-button-padding-x-lg');
alias('tap', 'spacing-touch-target');
alias('layout-max-width', 'content-max-width');

// Radius
alias('radius-sm', 'radius-xs', 'radius-sm', 'radius-badge', 'radius-button-sm', 'radius-embed-card');
alias('radius-md', 'radius-md', 'radius-input', 'radius-button');
alias('radius-lg', 'radius-lg', 'radius-xl', 'radius-card');
alias('radius-pill', 'radius-full');

// Shadow: only --csk-shadow-sm exists (Modal, Dropdown, Toast); the rest has no replacement.
alias('shadow-sm', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl', 'shadow-modal', 'shadow-dropdown');

for (const sec of ['dv', 'ry', 'vt']) {
  for (const suffix of ['light', 'bg', '50']) {
    EXPR_PRE[`color-section-${sec}-${suffix}`] = `color-mix(in srgb, var(--csk-color-section-${sec}) 12%, var(--csk-color-surface))`;
  }
}
alias('section-color', 'section-color');
alias('section-color-light', 'section-color-light');

// Pre-v2 `--csk-*` names that never existed in dist (written against c123-live-mini); map to v2.
for (const [o, n] of Object.entries({
  'color-border-secondary': 'color-border', 'color-error-500': 'color-error', 'color-on-surface': 'color-text',
  'color-on-surface-inverse': 'color-text-on-fill', 'color-on-surface-muted': 'color-text-3',
  'color-primary': 'color-action', 'color-primary-50': 'color-highlight-bg', 'color-primary-100': 'color-highlight-bg',
  'color-primary-200': 'color-highlight-border', 'color-primary-300': 'color-highlight-border',
  'color-primary-400': 'color-action', 'color-primary-600': 'color-action-hover', 'color-primary-700': 'color-brand',
  'color-primary-800': 'color-brand', 'color-primary-900': 'color-brand',
  'color-surface-container': 'color-surface-2', 'color-surface-dim': 'color-surface-3', 'color-surface-inverse': 'color-text',
  'color-surface-secondary': 'color-surface-2', 'color-surface-tertiary': 'color-surface-3',
  'font-size-xs': 'text-sm', 'font-size-sm': 'text-md', 'font-size-base': 'text-base', 'font-size-lg': 'text-lg', 'font-size-xl': 'text-xl',
  'radius-full': 'radius-pill',
})) RENAME[`csk-${o}`] = C(n);

// Containers
for (const s of ['xs', 'sm', 'md', 'lg', 'xl']) RENAME[`container-${s}`] = C(`container-${s}`);

// Names that are replaced by a whole expression (no single token fits).
const EXPR = {
  'csk-z-sticky': '100',
  'spacing-0': '0',
  'spacing-px': '1px',
  'spacing-0-5': 'calc(var(--csk-space-1) / 2)',
  'spacing-1-5': 'calc(var(--csk-space-1) * 1.5)',
  'spacing-2-5': 'calc(var(--csk-space-1) * 2.5)',
  'spacing-3-5': 'calc(var(--csk-space-1) * 3.5)',
  'spacing-9': 'calc(var(--csk-space-1) * 9)',
  'spacing-14': 'calc(var(--csk-space-1) * 14)',
  'spacing-16': 'calc(var(--csk-space-1) * 16)',
  'spacing-button-padding-y-sm': 'calc(var(--csk-space-1) * 1.5)',
  'spacing-button-padding-y-lg': 'var(--csk-space-3)',
  'shadow-xs': 'none',
  'shadow-inner': 'none',
  'shadow-card': 'none',
  'shadow-card-hover': 'none',
  'shadow-button': 'none',
  'shadow-button-hover': 'none',
  'shadow-button-active': 'none',
  'shadow-error-sm': 'none',
  'shadow-error-md': 'none',
  'shadow-expr-avatar': 'none',
  // Effects without a v2 equivalent (gradients, glows, meshes, glass): neutral value.
  'gradient-primary': 'var(--csk-color-brand)',
  'gradient-primary-deep': 'var(--csk-color-brand)',
  'gradient-primary-hover': 'var(--csk-color-action-hover)',
  'gradient-primary-soft': 'var(--csk-color-highlight-bg)',
  'gradient-card': 'var(--csk-color-surface-2)',
  'gradient-surface': 'var(--csk-color-surface-2)',
  'gradient-danger': 'var(--csk-color-error)',
  'gradient-energy': 'var(--csk-color-action)',
  'gradient-energy-subtle': 'var(--csk-color-highlight-bg)',
  'gradient-energy-vibrant': 'var(--csk-color-action)',
  'glow-energy-sm': 'none', 'glow-energy-md': 'none', 'glow-energy-lg': 'none',
  'glow-primary-xs': 'none', 'glow-primary-sm': 'none',
  'bg-mesh-card': 'none', 'bg-mesh-primary': 'none', 'bg-mesh-hero': 'none',
  'blur-sm': 'none', 'blur-md': 'none',
  'clip-angle-sm': 'none',
  'animation-spin': 'csk-spin 1s linear infinite',
  'border-embed-width': '1px',
  'border-embed-card': '1px solid var(--csk-color-border)',
  'border-accent-width': '4px',
  'border-accent-gradient': 'var(--csk-color-brand)',
  'color-energy-start': 'var(--csk-color-action)',
  'color-energy-end': 'var(--csk-color-action)',
  'color-energy-50': 'var(--csk-color-highlight-bg)',
  'color-energy-200': 'var(--csk-color-highlight-bg)',
  'color-energy-300': 'var(--csk-color-action)',
  'color-energy-400': 'var(--csk-color-action)',
  'color-energy-500': 'var(--csk-color-action)',
  'color-energy-600': 'var(--csk-color-action)',
  'color-energy-700': 'var(--csk-color-action)',
  'color-energy-800': 'var(--csk-color-action)',
  'color-energy-500-rgb': 'var(--csk-color-action)',
  'color-energy-rgb': 'var(--csk-color-action)',
  'color-primary-rgb': 'var(--csk-color-action)',
  'color-primary-500-alpha-30': 'color-mix(in srgb, var(--csk-color-action) 30%, transparent)',
  'color-success-500-alpha-30': 'color-mix(in srgb, var(--csk-color-success) 30%, transparent)',
  'color-error-500-alpha-30': 'color-mix(in srgb, var(--csk-color-error) 30%, transparent)',
  'color-neutral-800': 'var(--csk-color-text)',
  'color-neutral-600': 'var(--csk-color-text-2)',
  'z-sticky': '200', 'z-modal-backdrop': '400', 'z-modal': '500', 'z-toast': '800',
  'motion-fast': 'var(--csk-transition-fast)',
  'motion-embed-fast': 'var(--csk-transition-fast)',
  'spacing-expr-hero-padding-x': 'var(--csk-space-8)',
  'spacing-expr-hero-padding-y': 'var(--csk-space-12)',
  'avatar-expr-size-lg': 'calc(var(--csk-space-1) * 16)',
  'avatar-expr-size-xl': 'calc(var(--csk-space-1) * 24)',
  'avatar-expr-size-hero': 'calc(var(--csk-space-1) * 32)',
  'text-expr-display-size': 'var(--csk-text-3xl)',
  'text-expr-display-weight': 'var(--csk-font-weight-bold)',
  'text-expr-display-line-height': 'var(--csk-line-height-tight)',
  'text-expr-display-tracking': 'var(--csk-letter-spacing-tight)',
  'text-expr-mega-size': 'var(--csk-text-3xl)',
  'text-expr-mega-weight': 'var(--csk-font-weight-bold)',
  'text-expr-mega-line-height': 'var(--csk-line-height-tight)',
  'text-expr-mega-tracking': 'var(--csk-letter-spacing-tight)',
  'shadow-button-focus': '0 0 0 2px var(--csk-color-focus)',
  'shadow-input-focus': '0 0 0 2px var(--csk-color-focus)',
};

// Whole-pattern rewrites applied before the name rules.
const PATTERNS = [
  // duration + easing pair (var or literal) -> one transition token. <= 200ms is "fast".
  {
    re: /(?:var\(--(?:csk-)?duration-(fastest|fast|normal|moderate|base)(?:,[^)]*)?\)|var\(--motion-(?:embed|util|expr)-fast\)|\b(?:50|100|150|200)ms|\b0?\.[12]s)\s+(?:var\(--(?:csk-)?ease-[\w-]+(?:,[^)]*)?\)|cubic-bezier\([^)]*\))/g,
    to: 'var(--csk-transition-fast)',
    name: 'transition (fast)',
  },
  {
    re: /(?:var\(--(?:csk-)?duration-(slow|slower|slowest)(?:,[^)]*)?\)|\b(?:250|300|400|500|600)ms|\b0?\.[3-9]s)\s+(?:var\(--(?:csk-)?ease-[\w-]+(?:,[^)]*)?\)|cubic-bezier\([^)]*\))/g,
    to: 'var(--csk-transition-slow)',
    name: 'transition (slow)',
  },
  { re: /(var\(--csk-transition-(?:fast|slow)\))\s+var\(--(?:csk-)?ease-[\w-]+\)/g, to: '$1', name: 'stray easing after transition token' },
  { re: /var\(--transition-(?:fast|base|normal|button|input|switch|card|badge|util-fast|util-base)\)/g, to: 'var(--csk-transition-fast)', name: 'transition-fast alias' },
  { re: /var\(--transition-(?:slow|slower|util-slow)\)/g, to: 'var(--csk-transition-slow)', name: 'transition-slow alias' },
];

// 1.x palette literals: rgb triple -> token (alpha becomes a color-mix percentage).
const RGB = {
  '255,255,255': 'white', '0,0,0': 'color-text', '10,10,10': 'color-text', '15,23,42': 'color-text',
  '249,115,22': 'color-action', '251,146,60': 'color-action',
  '255,215,0': 'color-podium-1', '192,192,192': 'color-podium-2', '205,127,50': 'color-podium-3',
  '34,197,94': 'color-success', '74,222,128': 'color-success', '22,163,74': 'color-success',
  '239,68,68': 'color-error', '248,113,113': 'color-error', '220,38,38': 'color-error', '185,28,28': 'color-error',
  '17,118,166': 'color-action', '77,163,204': 'color-action', '14,100,141': 'color-action', '59,130,246': 'color-action',
  '96,165,250': 'color-action', '37,99,235': 'color-action',
  '245,158,11': 'color-warning', '251,191,36': 'color-warning',
};
// Hex literals (lower-case, 6 digits) -> token. Applied outside X components only.
const HEX = {
  '#ffd700': 'color-podium-1', '#c0c0c0': 'color-podium-2', '#cd7f32': 'color-podium-3',
  '#b8860b': 'color-podium-1-text', '#6b7280': 'color-podium-2-text', '#8b4513': 'color-podium-3-text',
  '#d4d4d4': 'color-podium-2', '#e8a860': 'color-podium-3',
  '#fff': 'color-text-on-fill', '#ffffff': 'color-text-on-fill',
  // kanoe.cz mock (KanoeCzContext): Bootstrap 4 greys and the old site blue -> nearest DS semantics.
  '#1176a6': 'color-action', '#0d5a7d': 'color-action-hover', '#212529': 'color-text', '#6c757d': 'color-text-3',
  '#f8f9fa': 'color-surface-2', '#f0f0f0': 'color-surface-3', '#f1f1f1': 'color-surface-3', '#dee2e6': 'color-border-2',
  '#6d28d9': 'violet', '#b91c1c': 'red', '#d97706': 'amber', '#15803d': 'green',
};
const SHADOW_COMPONENTS = ['Modal', 'Dropdown', 'Toast'];
// Verdict X (removed in T17): the codemod leaves their hex literals alone (check-no-hex baseline).
const X_COMPONENTS = ['ActionCard', 'AthleteCard', 'DateBadge', 'HeroSection', 'ListItem', 'Navigation', 'PodiumCard', 'ResultItem', 'SectionHeader', 'StatCard', 'StatsBar'];

// ---------------------------------------------------------------------------------

const exts = new Set(['.css', '.ts', '.tsx']);
function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return exts.has(extname(e.name)) ? [p] : [];
  });
}
const files = dirs.flatMap((d) => walk(join(root, d))).sort();

// Names defined by src/tokens (must not be touched, never reported as unmapped).
const tokenFiles = walk(join(root, 'src/tokens')).concat(walk(join(root, 'src/styles')));
const known = new Set();
for (const f of tokenFiles) for (const m of readFileSync(f, 'utf8').matchAll(/(?<![\w-])(--csk-[\w-]+)\s*:/g)) known.add(m[1]);

const NAME = /(?<![\w-])--([A-Za-z][\w-]*)(?![\w-])/g;
const mapped = new Map(); // old -> count
const unmapped = new Map(); // old -> {count, files:Set}
const patternCounts = new Map();

// Component-local custom properties: defined (`--x:`) inside the scanned files, not csk-prefixed.
const localDefs = new Set();
const sources = new Map();
for (const f of files) {
  const text = readFileSync(f, 'utf8');
  sources.set(f, text);
  for (const m of text.matchAll(/(?<![\w-])--([A-Za-z][\w-]*)\s*:/g)) if (!m[1].startsWith('csk-')) localDefs.add(m[1]);
  for (const m of text.matchAll(/['"]--([A-Za-z][\w-]*)['"]\s*:/g)) if (!m[1].startsWith('csk-')) localDefs.add(m[1]);
}

/** Rewrites each `var(--name[, fallback])` via fn(name, hasFallback) -> replacement | null. */
function rewriteVars(text, fn) {
  let res = '';
  let i = 0;
  for (;;) {
    const at = text.indexOf('var(', i);
    if (at < 0) return res + text.slice(i);
    const m = /^var\(\s*--([A-Za-z][\w-]*)\s*/.exec(text.slice(at));
    if (!m) { res += text.slice(i, at + 4); i = at + 4; continue; }
    let depth = 1, j = at + 4;
    while (j < text.length && depth) { if (text[j] === '(') depth++; else if (text[j] === ')') depth--; j++; }
    const hasFallback = text.slice(at + m[0].length).startsWith(',');
    const rep = fn(m[1], hasFallback);
    res += text.slice(i, at);
    if (rep === null) { res += text.slice(at, at + m[0].length); i = at + m[0].length; }
    else { res += rep; i = j; }
  }
}

function splitTop(v) {
  const out = [];
  let depth = 0, cur = '';
  for (const ch of v) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) { out.push(cur); cur = ''; } else cur += ch;
  }
  out.push(cur);
  return out;
}

let changedFiles = 0;
let rgbMapped = 0, hexMapped = 0;
const rgbUnmapped = new Map(), hexUnmapped = new Map();
for (const [f, text] of sources) {
  let out = text;
  // Phase 0: var(--old, fallback) of a global 1.x token -> var(--old) (the fallback was a 1.x
  // hex/px copy; v2 tokens are always defined) or the replacement expression.
  out = rewriteVars(out, (name, hasFallback) => {
    if (localDefs.has(name) || (name.startsWith('csk-') && EXPR[name] === undefined && !RENAME[name])) return null;
    if (EXPR[name] !== undefined || EXPR_PRE[name] !== undefined) {
      mapped.set(name, (mapped.get(name) ?? 0) + 1);
      return EXPR_PRE[name] ?? EXPR[name];
    }
    if (hasFallback && RENAME[name] && known.has(RENAME[name])) return `var(--${name})`;
    return null;
  });
  for (const p of PATTERNS) {
    out = out.replace(p.re, (...m) => {
      patternCounts.set(p.name, (patternCounts.get(p.name) ?? 0) + 1);
      return p.to.replace('$1', m[1]);
    });
  }
  out = out.replace(NAME, (all, name) => {
    if (name.startsWith('csk-') && !RENAME[name]) return all;
    if (RENAME[name] && !(localDefs.has(name) && !(name in RENAME))) {
      mapped.set(name, (mapped.get(name) ?? 0) + 1);
      return RENAME[name];
    }
    if (localDefs.has(name)) {
      mapped.set(name, (mapped.get(name) ?? 0) + 1);
      return C(name);
    }
    const u = unmapped.get(name) ?? { count: 0, files: new Set() };
    u.count++;
    u.files.add(relative(root, f));
    unmapped.set(name, u);
    return all;
  });
  out = out.replace(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/g, (all, r, g, b, a) => {
    const tok = RGB[`${r},${g},${b}`];
    if (!tok) {
      rgbUnmapped.set(all, (rgbUnmapped.get(all) ?? 0) + 1);
      return all;
    }
    rgbMapped++;
    const pct = a === undefined ? 100 : Math.round(parseFloat(a) * 100);
    return pct >= 100 ? `var(--csk-${tok})` : `color-mix(in srgb, var(--csk-${tok}) ${pct}%, transparent)`;
  });
  if (extname(f) === '.css' && !X_COMPONENTS.some((x) => f.includes(`/components/${x}/`))) {
    out = out.replace(/#[0-9a-fA-F]{3,8}\b/g, (h) => {
      const tok = HEX[h.toLowerCase()];
      if (!tok) {
        hexUnmapped.set(h, (hexUnmapped.get(h) ?? 0) + 1);
        return h;
      }
      hexMapped++;
      return `var(--csk-${tok})`;
    });
  }
  // Components use semantics, not primitives: white text on a fill is text-on-fill, white
  // as a surface (background, border, shadow, outline) is the surface token.
  if (extname(f) === '.css') {
    out = out.replace(/(^|[;{\s])((?:-webkit-)?[a-z-]+)(\s*:\s*)([^;{}]*?)(?=;|\})/g, (all, pre, prop, colon, val) => {
      if (!/var\(--csk-white\)|(?<![\w-])white(?![\w-])|var\(--csk-color-text-on-fill\)/.test(val)) return all;
      const textual = /^(color|fill|stroke|caret-color|-webkit-text-fill-color)$/.test(prop);
      if (prop.startsWith('--')) return all;
      if (textual) {
        const v2 = val.replace(/var\(--csk-white\)/g, 'var(--csk-color-text-on-fill)').replace(/(?<![\w-])white(?![\w-])/g, 'var(--csk-color-text-on-fill)');
        return v2 === val ? all : `${pre}${prop}${colon}${v2}`;
      }
      if (!/^(background|border|outline|box-shadow|text-shadow|filter)/.test(prop)) return all;
      const v2 = val.replace(/var\(--csk-white\)/g, 'var(--csk-color-surface)').replace(/(?<![\w-])white(?![\w-])/g, 'var(--csk-color-surface)').replace(/var\(--csk-color-text-on-fill\)/g, 'var(--csk-color-surface)');
      return v2 === val ? all : `${pre}${prop}${colon}${v2}`;
    });
  }
  // Only Modal, Dropdown and Toast carry a shadow in v2 (TOKENS.md); everything else is flat.
  if (extname(f) === '.css' && !SHADOW_COMPONENTS.some((x) => f.includes(`/components/${x}/`)) && !f.endsWith('RunDetailModal.css')) {
    out = out.replace(/(box-shadow:[^;{}]*?)var\(--csk-shadow-sm\)/g, '$1none');
  }
  // `none` produced by dropped shadows/glows must not stay inside a shadow list.
  if (extname(f) === '.css') out = out.replace(/(box-shadow:\s*)([^;{}]+);/g, (all, head, val) => {
    if (!/\bnone\b/.test(val)) return all;
    const parts = splitTop(val).map((x) => x.trim()).filter(Boolean);
    const kept = parts.filter((x) => x !== 'none');
    const fixed = kept.length ? kept.join(',\n    ') : 'none';
    return fixed === val.trim() ? all : `${head}${fixed};`;
  });
  if (out !== text) {
    changedFiles++;
    if (!dry) writeFileSync(f, out);
  }
}

const sum = (m) => [...m.values()].reduce((a, b) => a + b, 0);
console.log(`codemod-tokens${dry ? ' (dry run)' : ''}: ${files.length} files scanned, ${changedFiles} changed`);
console.log(`mapped:   ${sum(mapped)} occurrences of ${mapped.size} old names`);
console.log(`patterns: ${sum(patternCounts)} (${[...patternCounts].map(([k, v]) => `${k} ${v}`).join(', ') || 'none'})`);
console.log(`unmapped: ${sum(new Map([...unmapped].map(([k, v]) => [k, v.count])))} occurrences of ${unmapped.size} names`);
for (const [name, u] of [...unmapped].sort((a, b) => b[1].count - a[1].count)) {
  console.log(`  --${name}  x${u.count}  ${verbose ? [...u.files].join(', ') : [...u.files].slice(0, 3).join(', ')}`);
}
console.log(`rgb()/rgba() literals mapped: ${rgbMapped}; left: ${sum(rgbUnmapped)}${[...rgbUnmapped.keys()].length ? ` (${[...rgbUnmapped.keys()].join(' ')})` : ''}`);
console.log(`hex literals mapped (non-X): ${hexMapped}; left in non-X: ${sum(hexUnmapped)}${[...hexUnmapped.keys()].length ? ` (${[...hexUnmapped.keys()].join(' ')})` : ''}`);
if (verbose) for (const [name, n] of [...mapped].sort((a, b) => b[1] - a[1])) console.log(`  mapped --${name} x${n}`);
