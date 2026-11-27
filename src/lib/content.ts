// Small helpers so pages read content the same way everywhere.
import { getCollection, getEntry } from 'astro:content';

export async function getProfile() {
  const entry = await getEntry('profile', 'austin');
  if (!entry) throw new Error('content/profile.yaml must have a top-level "austin:" entry.');
  return entry.data;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-11" → "Nov 2026" */
export function formatMonth(ym: string) {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export function formatRange(start: string, end?: string) {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`;
}

export async function getExperience() {
  const all = await getCollection('experience');
  // Newest first, regardless of file order.
  return all.map((e) => e.data).sort((a, b) => b.start.localeCompare(a.start));
}

export async function getPublicProjects() {
  const all = await getCollection('projects');
  // Only entries marked public ship to the website; newest first, then alphabetical.
  return all
    .filter((p) => p.data.visibility === 'public')
    .map((p) => ({ id: p.id, ...p.data }))
    .sort((a, b) => b.year - a.year || a.name.localeCompare(b.name));
}

/** Splits "Code, music, [futsal]" into parts so the bracketed word can get the inverted chip. */
export function splitTagline(tagline: string) {
  const m = tagline.match(/^(.*)\[(.+)\](.*)$/);
  return m ? { before: m[1], chip: m[2], after: m[3] } : { before: tagline, chip: '', after: '' };
}
