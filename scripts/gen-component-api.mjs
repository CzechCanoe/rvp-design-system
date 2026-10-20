#!/usr/bin/env node
/**
 * Generates docs/COMPONENT_API.md from the TypeScript types and JSDoc in src/components.
 *
 *   npm run docs:api                  rewrite the file
 *   npm run docs:api -- --check       exit 1 if the committed file is out of date
 *
 * Uses react-docgen-typescript with the repo tsconfig. Props inherited from
 * node_modules (HTML attributes, React types) are filtered out, so only the
 * design system's own props are listed. Do not edit the output by hand.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { withCustomConfig } from 'react-docgen-typescript';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const componentsDir = join(root, 'src/components');
const outFile = join(root, 'docs/COMPONENT_API.md');
const check = process.argv.includes('--check');

/** Section -> component directories. Directories missing here land in "Ostatní" (the script warns). */
const GROUPS = [
  ['Základ a formuláře', ['Button', 'Input', 'SearchInput', 'Select', 'Checkbox', 'Radio', 'Switch', 'Card', 'Badge', 'Avatar', 'Icon', 'Table', 'Modal', 'Dropdown', 'Toast', 'Pagination', 'Progress', 'Skeleton', 'EmptyState', 'Dropzone', 'Timeline', 'Wizard', 'Calendar']],
  ['Navigace a stránka', ['Header', 'Subbar', 'Breadcrumbs', 'PageTitle', 'PageLayout', 'BottomBar', 'Tabs', 'FilterPills', 'SegmentedControl', 'TableToolbar', 'CSKLogo', 'KanoeCzContext']],
  ['Stavy a čísla', ['StatusBadge', 'MarkBadge', 'PenaltyChip', 'GateGrid', 'BibBadge', 'Notice', 'StatTile', 'TimeValue', 'RunningTime', 'DataAge', 'StarButton', 'FavoritesToggle', 'LiveIndicator']],
  ['Živé výsledky', ['EventHeader', 'ResultsTable', 'StartlistTable', 'ProgramList', 'OnCoursePanel']],
  ['Kalendář, přihlášky, profil', ['WeekendCalendar', 'DeadlineBadge', 'EntryTable', 'ProposalList', 'SummaryCard', 'ProfileHeader', 'SeasonSparkline', 'RivalsList']],
];

const parser = withCustomConfig(join(root, 'tsconfig.json'), {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  skipChildrenPropWithoutDoc: false,
  propFilter: (prop) => !prop.parent || !prop.parent.fileName.includes('node_modules'),
});

const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\r?\n+/g, ' ').trim();
const code = (s) => {
  const v = esc(s);
  return v ? '`' + v.replace(/`/g, "'") + '`' : '';
};

/** Only names exported from src/components/index.ts are documented (no story helpers, no Lucide icons). */
const indexSource = readFileSync(join(componentsDir, 'index.ts'), 'utf8');
const exported = new Set();
for (const m of indexSource.matchAll(/export\s+(?!type)\{([^}]*)\}/g)) {
  for (const n of m[1].split(',')) {
    const name = n.trim().split(/\s+as\s+/).pop();
    if (name) exported.add(name);
  }
}

function typeText(type) {
  if (!type) return '';
  if (type.name === 'enum' && Array.isArray(type.value)) {
    return type.value.map((v) => v.value).join(' | ');
  }
  return type.name;
}

const dirs = readdirSync(componentsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);
const known = new Set(GROUPS.flatMap(([, names]) => names));
const unknown = dirs.filter((d) => !known.has(d) && sourceFiles(d).length > 0).sort();
if (unknown.length) {
  console.warn(`gen-component-api: directories without a group (listed under "Ostatní"): ${unknown.join(', ')}`);
}
const groups = [...GROUPS, ['Ostatní', unknown]];

/** True when the component is declared (not merely imported, e.g. a Lucide icon) in its own file. */
function definedIn(d) {
  if (d.filePath.includes('node_modules')) return false;
  const src = readFileSync(d.filePath, 'utf8');
  return new RegExp(`(?:const|function|class)\\s+${d.displayName}\\b`).test(src);
}

function sourceFiles(dir) {
  return readdirSync(join(componentsDir, dir))
    .filter((f) => f.endsWith('.tsx') && !/\.(stories|test)\.tsx$/.test(f))
    .map((f) => join(componentsDir, dir, f));
}

const toc = [];
const body = [];
let total = 0;
for (const [title, names] of groups) {
  const sections = [];
  const headings = [];
  for (const dir of names) {
    if (!dirs.includes(dir)) continue;
    const docs = parser
      .parse(sourceFiles(dir))
      .filter((d) => d.displayName && exported.has(d.displayName) && /^[A-Z]/.test(d.displayName) && definedIn(d))
      .sort((a, b) => a.displayName.localeCompare(b.displayName));
    for (const d of docs) {
      const props = Object.values(d.props);
      total++;
      headings.push(d.displayName);
      const lines = [`### ${d.displayName}`, ''];
      lines.push(`Zdroj: \`${relative(root, d.filePath).split('\\').join('/')}\``, '');
      if (d.description) lines.push(d.description.trim(), '');
      if (!props.length) {
        lines.push('_Bez vlastních props._', '');
      } else {
        lines.push('| Prop | Typ | Výchozí | Popis |', '|---|---|---|---|');
        for (const p of props) {
          const name = p.name + (p.required ? '' : '?');
          const def = p.defaultValue ? code(p.defaultValue.value) : '';
          lines.push(`| \`${name}\` | ${code(typeText(p.type))} | ${def} | ${esc(p.description)} |`);
        }
        lines.push('');
      }
      sections.push(lines.join('\n'));
    }
  }
  if (sections.length) {
    toc.push(`- **${title}**: ${headings.join(', ')}`);
    body.push(`## ${title}`, '', ...sections);
  }
}

const out = [
  '# Component API',
  '',
  '> Generováno skriptem `scripts/gen-component-api.mjs` (`npm run docs:api`) z TypeScript typů a JSDoc v `src/components/`. **Needitovat ručně**; po změně API spusť `npm run docs:api` (kontrola: `npm run docs:api -- --check`).',
  '',
  "Import: `import { Button } from '@czechcanoe/rvp-design-system'`. Popisy props jsou z JSDoc (anglicky), typy a výchozí hodnoty ze zdrojového kódu. Záměr komponent je v `docs/v2/COMPONENTS.md`, změny proti 1.x v `docs/v2/MIGRATION.md`.",
  '',
  '## Obsah',
  '',
  ...toc,
  '',
  ...body,
];

const result = out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';

if (check) {
  const current = existsSync(outFile) ? readFileSync(outFile, 'utf8') : '';
  if (current !== result) {
    console.error('docs/COMPONENT_API.md is out of date. Run: npm run docs:api');
    process.exit(1);
  }
  console.log(`docs/COMPONENT_API.md is up to date (${total} components).`);
} else {
  writeFileSync(outFile, result);
  console.log(`Wrote docs/COMPONENT_API.md (${total} components).`);
}
