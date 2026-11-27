// Generates hub/OVERVIEW.md from content/projects.yaml so the project hub stays in sync
// with the single source of truth. Run `npm run hub` after updating content/projects.yaml.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const root = fileURLToPath(new URL('..', import.meta.url));
const raw = readFileSync(join(root, 'content/projects.yaml'), 'utf8');
const projects = (parse(raw) ?? []).map((p) => ({
  ...p,
  visibility: p.visibility ?? 'internal',
  platform: Array.isArray(p.platform) ? p.platform : [],
  tags: Array.isArray(p.tags) ? p.tags : [],
}));

const sorted = [...projects].sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.name.localeCompare(b.name));

const esc = (v) => String(v ?? '').replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim();

const formatName = (p) => {
  if (p.note) {
    const rel = relative('hub', p.note).replace(/\\/g, '/');
    return `[${esc(p.name)}](${rel})`;
  }
  return esc(p.name);
};

const formatLinks = (p) => {
  const parts = [];
  if (p.link) parts.push(`[Live](${p.link})`);
  if (p.repo && p.repo !== p.link) parts.push(`[Repo](${p.repo})`);
  if (p.note) {
    const rel = relative('hub', p.note).replace(/\\/g, '/');
    parts.push(`[Note](${rel})`);
  }
  return parts.length ? parts.join(' · ') : '—';
};

const stages = [
  { key: 'in-progress', title: 'In progress', empty: 'Nothing active right now.' },
  { key: 'next', title: 'Up next', empty: 'Queue is clear. Pull an idea from Play ideas or hub/IDEAS.md.' },
  { key: 'idea', title: 'Play ideas & backlog', empty: 'No cataloged ideas yet. See hub/IDEAS.md for raw scratchpad notes.' },
  { key: 'live', title: 'Live / shipped', empty: 'No live projects yet.' },
  { key: 'paused', title: 'Paused', empty: null },
  { key: 'archived', title: 'Archived', empty: null },
];

const countBy = (status) => sorted.filter((p) => p.status === status).length;
const publicCount = sorted.filter((p) => p.visibility === 'public').length;
const internalCount = sorted.length - publicCount;

const lines = [
  '# Project Hub Overview',
  '',
  '> Generated from [`content/projects.yaml`](../content/projects.yaml). Do not edit this table by hand — update `content/projects.yaml` and run `npm run hub`.',
  '',
  '## Snapshot',
  '',
  '| Metric | Count |',
  '|---|---|',
  `| Total tracked | ${sorted.length} |`,
  `| Public on \`/portfolio\` | ${publicCount} |`,
  `| Internal (hub only) | ${internalCount} |`,
  `| In progress | ${countBy('in-progress')} |`,
  `| Up next | ${countBy('next')} |`,
  `| Play ideas | ${countBy('idea')} |`,
  `| Live / shipped | ${countBy('live')} |`,
  '',
];

const actionPriority = { 'in-progress': 0, next: 1, idea: 2 };
const actionable = sorted
  .filter((p) => p.nextStep && p.status in actionPriority)
  .sort((a, b) => actionPriority[a.status] - actionPriority[b.status] || (b.year ?? 0) - (a.year ?? 0) || a.name.localeCompare(b.name));
lines.push('## What to work on next', '');
if (actionable.length) {
  for (const p of actionable) {
    const badge = p.status === 'in-progress' ? 'Active' : p.status === 'next' ? 'Next' : 'Idea';
    const plat = p.platform.length ? ` (${p.platform.join(', ')})` : '';
    lines.push(`- **${formatName(p)}** \`${badge}\`${plat} — ${esc(p.nextStep)}`);
  }
} else {
  lines.push('Add a `nextStep` to any project in `content/projects.yaml` to surface it here.');
}
lines.push('');

for (const stage of stages) {
  const items = sorted.filter((p) => p.status === stage.key);
  if (!items.length && stage.empty === null) continue;
  lines.push(`## ${stage.title}`, '');
  if (!items.length) {
    lines.push(stage.empty, '');
    continue;
  }
  lines.push('| Project | Category | Visibility | Platform | Next step / summary | Links |');
  lines.push('|---|---|---|---|---|---|');
  for (const p of items) {
    const detail = p.nextStep ? `Next: ${esc(p.nextStep)}` : esc(p.desc);
    const plat = p.platform.length ? esc(p.platform.join(', ')) : '—';
    lines.push(
      `| ${formatName(p)} | ${esc(p.category)} | \`${esc(p.visibility)}\` | ${plat} | ${detail} | ${formatLinks(p)} |`,
    );
  }
  lines.push('');
}

const byPlatform = new Map();
for (const p of sorted) {
  const plats = p.platform.length ? p.platform : ['Unspecified'];
  for (const plat of plats) {
    if (!byPlatform.has(plat)) byPlatform.set(plat, []);
    byPlatform.get(plat).push(p);
  }
}

lines.push('## By platform', '');
lines.push('| Platform | Projects |');
lines.push('|---|---|');
for (const [plat, items] of [...byPlatform.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  const list = items.map((p) => `${formatName(p)} (\`${p.status}\`)`).join(', ');
  lines.push(`| ${esc(plat)} | ${list} |`);
}
lines.push('');

const outPath = join(root, 'hub/OVERVIEW.md');
writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log(`✓ Wrote hub/OVERVIEW.md (${sorted.length} projects: ${publicCount} public, ${internalCount} internal).`);
