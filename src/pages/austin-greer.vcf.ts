// The "Save contact" file on /card, generated from content/profile.yaml at build time.
import type { APIRoute } from 'astro';
import { getProfile } from '../lib/content';

const esc = (s: string) => s.replace(/[\\;,]/g, (m) => `\\${m}`);

export const GET: APIRoute = async () => {
  const p = await getProfile();
  const [first, ...rest] = p.name.split(' ');
  const last = rest.join(' ');
  const [city, state] = p.location.split(',').map((s) => s.trim());
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc(last)};${esc(first)};;;`,
    `FN:${esc(p.name)}`,
    `ORG:${esc(p.company)}`,
    `TITLE:${esc(p.role)}`,
    `TEL;TYPE=CELL:${p.phone}`,
    `EMAIL;TYPE=INTERNET:${p.email}`,
    `URL:${p.site}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${p.links.linkedin}`,
    `ADR;TYPE=WORK:;;;${esc(city ?? '')};${esc(state ?? '')};;USA`,
    'END:VCARD',
  ];
  return new Response(lines.join('\r\n') + '\r\n', {
    headers: { 'Content-Type': 'text/vcard; charset=utf-8' },
  });
};
