// Post-build checks. Runs after `astro build` (see package.json) and fails the build on a problem.
//
// 1. Frozen routes: every URL in content/routes.json must exist in dist/. Some are printed on
//    physical QR codes, so breaking one breaks a sticker.
// 2. Contact privacy: the email may appear only on /card and /lost (and their files below); the phone
//    only on /lost and the downloadable contact card. Anything else fails the build.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
let failed = false;

// ---------- 1. Frozen routes ----------
const { frozen } = JSON.parse(readFileSync(join(root, 'content/routes.json'), 'utf8'));
const missing = frozen.filter((r) => !existsSync(join(dist, r.file)));
if (missing.length) {
  failed = true;
  console.error('\n✗ Frozen routes missing from the build:');
  for (const r of missing) console.error(`  ${r.path} → dist/${r.file}  (${r.why})`);
} else {
  console.log(`✓ All ${frozen.length} frozen routes present.`);
}

// ---------- 2. Contact privacy ----------
const ALLOWED = {
  email: ['card.html', 'lost.html', 'found.html', 'austin-greer.vcf'],
  phone: ['lost.html', 'found.html', 'austin-greer.vcf'],
};

const profile = readFileSync(join(root, 'content/profile.yaml'), 'utf8');
const field = (name) => profile.match(new RegExp(`^\\s*${name}:\\s*['"]?([^'"\\n]+?)['"]?\\s*$`, 'm'))?.[1];
const email = field('email');
const phone = field('phone'); // +1XXXXXXXXXX
if (!email || !phone) {
  console.error('✗ Could not read email/phone from content/profile.yaml for the privacy check.');
  process.exit(1);
}
const digits = phone.replace(/\D/g, '').slice(-10);
const needles = {
  email: [email.toLowerCase(), email.toLowerCase().replace('@', '%40'), email.toLowerCase().replace('@', '&#64;')],
  phone: [digits, `${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`, `${digits.slice(3, 6)}-${digits.slice(6)}`],
};

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const textFile = /\.(html|js|mjs|css|json|xml|txt|vcf|svg|webmanifest)$/i;
const leaks = [];
for (const file of walk(dist).filter((f) => textFile.test(f))) {
  const rel = relative(dist, file).replace(/\\/g, '/');
  const body = readFileSync(file, 'utf8').toLowerCase();
  for (const kind of ['email', 'phone']) {
    if (ALLOWED[kind].includes(rel)) continue;
    if (needles[kind].some((n) => body.includes(n))) leaks.push(`  ${kind} found in dist/${rel}`);
  }
}
if (leaks.length) {
  failed = true;
  console.error('\n✗ Contact details on a page where they are not allowed:');
  console.error(leaks.join('\n'));
  console.error(`  Email is allowed only in: ${ALLOWED.email.join(', ')}`);
  console.error(`  Phone is allowed only in: ${ALLOWED.phone.join(', ')}`);
} else {
  console.log('✓ Email and phone appear only on /card and /lost.');
}

process.exit(failed ? 1 : 0);
