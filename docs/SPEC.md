# austng.github.io — Site Spec (v0.1 draft)

Status: **v0.2: decisions made, redesign in progress** · Owner: Austin Greer (GitHub `AustnG`) · Last updated: 2026-11-17

> **v0.2 changes (2026-11-17).** Austin's answers are in. The design direction is narrowed to reference videos
> 00, 01 and 02 (03 and 04 are out). Decisions D1–D7 went with the recommendations, adjusted as noted in §11.
> Printed stickers point at `/lost`, which stays hidden from navigation. Legacy page names are kept as real pages
> (`/resume`, `/portfolio`) instead of being redirected.

This is the single planning document for the rebuild. Any AI agent working on this repo
(Claude, Gemini, ChatGPT/Codex, Copilot) should read it before changing anything.
Open decisions are in §11 and the inputs still needed from Austin are in §12.

---

## 1. Purpose and audiences

The site does four jobs. Each one has a different visitor and a different first five seconds.

| Job | Visitor | How they arrive | What they need first |
|---|---|---|---|
| **Resume** | Recruiters, hiring managers, peers | LinkedIn, email signature, direct link | Current role, skills, proof of work, a resume file they can download |
| **Contact card** | Someone who just got a business card | QR on the card, almost always **on a phone** | Who you are, "Save contact", call/text/email/LinkedIn, in one screen |
| **Lost-item tag** | A stranger who found your stuff | QR sticker on the item, phone | How to return it. Nothing else. |
| **Showcase** | Friends, fans, bandmates, league players | QR stickers, social links | Bands, music, futsal/soccer, side projects |

Design consequence: **QR landings are mobile-first and must load fast with near-zero JavaScript.** The
heavier motion work lives on the home page and showcase pages, and always degrades gracefully.

## 2. What exists today (audit of `main` @ `892e61c`)

- **Stack:** Vite + React 19 + Tailwind 4 + Motion, generated in Google AI Studio. Deployed by
  `.github/workflows/deploy.yml` (build → GitHub Pages) on every push to `main`.
- **Routing:** one React app mounted under six HTML files (`index`, `portfolio`, `resume`, `found`,
  `lost`, `404`). The page is picked in a `useEffect` by sniffing the URL, so every page first renders
  Home and then swaps. These are tabs, not real pages.
- **Content:** hard-coded in `src/data/portfolioData.ts`. Career history ends at Camping World
  (2019–2026). The summary still says "11+ years of experience at Camping World".
- **Broken or missing:**
  - Resume "Download .docx" points at `/api/resume/docx`, which returns **404** (there is no server on
    GitHub Pages).
  - No favicon (404), no meta description, no social/OG preview image.
  - No LinkedIn link anywhere.
  - Title says "Platform Developer II" while certifications list "Platform Developer I" (needs confirming).
- **Leftovers from AI Studio that do nothing on Pages:** `server.ts` (Express), `@google/genai`,
  `GEMINI_API_KEY` in `.env.example`, and a build step that bundles `dist/server.cjs`.
- **Live URLs that may already be printed on QR codes:** `/found.html`, `/lost.html`, `/resume.html`,
  `/portfolio.html`, `/`. These must keep working (see §8).
- **Look:** dark `#111112`, Syne + Inter, large "AG" monogram with an outline echo, 900px column.

## 3. Goals and non-goals

**Goals**
1. Current career: Houchens Insurance Group role added, LinkedIn linked everywhere it makes sense.
2. A distinctive visual identity drawn from the reference videos (§6), not a template.
3. Stable, permanent QR destinations for cards, stickers and lost-item tags.
4. Content any AI agent (or Austin from a phone via GitHub's web editor) can update without touching
   layout code.
5. Room to grow: bands, music, sport, side projects, each with its own page.
6. Still free, still static, still GitHub Pages.

**Non-goals (for now)**
- No backend, database, CMS service, or paid hosting.
- No blog (can be added later as another content collection).
- No contact form (mailto/LinkedIn is enough; forms need a third-party service).

## 4. Site map and URLs

Pages are built as flat files (`resume.html`), so GitHub Pages serves both `/resume` and `/resume.html`.
That keeps every legacy URL working with no redirects.

| Path | Page | In nav? | Notes |
|---|---|---|---|
| `/` | Home | — | Kinetic hero, who you are now, doors to everything else |
| `/resume` | Resume | Yes | Experience, skills, certs, education, Print / Save as PDF |
| `/portfolio` | Portfolio | Yes | Work projects and personal builds |
| `/music` | Music | Yes | Bands (content to come) |
| `/sport` | Sport | Yes | Toasty FC, BG Futsal, soccer timeline |
| `/card` | **QR: business card** | No | One-screen contact: Save contact (.vcf), email, LinkedIn, résumé. `noindex` |
| `/lost` | **QR: lost-item tag** | **Never** | Already printed on stickers. Standalone, `noindex`, no site navigation |
| `/found` | Alias of `/lost` | Never | Kept because it existed on the old site |
| `/404` | Not found | — | On-brand, links home |

Frozen URLs (must always resolve): `/`, `/lost`, `/lost.html`, `/found`, `/found.html`, `/resume`,
`/resume.html`, `/portfolio`, `/portfolio.html`, `/card`. They are listed in `content/routes.json` and
checked in CI.

## 5. Content model (what agents edit)

All words, links and media references live in `content/`, separate from components. Each file has a
schema that is validated at build time, so a bad edit fails CI instead of breaking the live site.

As built (v0.2): one YAML file per collection, which is easier to edit from a phone than a folder of files.

```
content/
  profile.yaml        name, headline, current role, summary, email, phone (only /lost and the vCard),
                      links, certifications, education, honors, languages
  experience.yaml     every role, newest first; tier: main | earlier; key projects per role
  skills.yaml         skill groups
  projects.yaml       master project catalog (category: work | personal | play;
                      status: live | in-progress | next | idea | paused | archived;
                      visibility: public | internal, defaulting to internal; platform, tags,
                      nextStep, note, repo, link)
  bands.yaml          bands for /music (empty, with a template)
  sport.yaml          teams, leagues and timeline for /sport
  routes.json         frozen URLs, checked after every build (see §8)
hub/
  README.md           how the project hub and visibility rules work
  OVERVIEW.md         auto-generated project board (`npm run hub`) from content/projects.yaml
  IDEAS.md            low-friction scratchpad for raw play ideas
  PRIVATE-APPS.md     privacy boundary and hosting patterns for financing and login-gated apps
  projects/*.md       deep-dive notes, next steps, and decisions for individual projects
```

The `.vcf` contact file is generated from `profile.yaml` at build time, so it never goes stale.
`hub/` stays outside `src/` and `public/`, so it is never published to `dist/`. Only entries in
`content/projects.yaml` with `visibility: public` render on `/portfolio`, grouped into Shipped,
In progress, and Play & ideas.

Updating the site should usually mean editing one of these files and nothing else.

## 6. Design direction

### 6.1 What the references show (read from frames of each video)

| Video | What happens | What to take |
|---|---|---|
| **Vid00** (30s) | Squircle app-icon marks rendered as halftone triangle-dot matrices, morphing one into the next with wipes and a liquid wobble; slight RGB fringe. Light gray field with tiny labels pinned to all four corners. | Dot-matrix rendering, shape-to-shape morph, corner micro-labels, a light "gallery" mode |
| **Vid01** (6s) | Dark posters drifting in parallax. A face, crescent, sphere and wave drawn entirely from vertical stripes whose edges carry an iridescent spectrum (coral → yellow → cyan → violet). Wordmark glitch-decodes. Posters carry a QR code. | Stripe rendering, iridescent edge color, text decode, parallax cards, QR as a design element |
| **Vid02** (8s) | The same wordmark collapses into vertical bars and rebuilds; letter-spacing breathes. Staged on soft-lit dark product photos. | Letters ↔ bars transition, breathing letter-spacing, dark photographic backdrops |
| **Vid03** (6s) | A monogram draws itself stroke by stroke as a dotted LED matrix, then resolves solid. Magenta → violet gradient, glass squircle over blurred photography, a construction-grid view with angle notes, then the mark in context (wall sign, phone dock, wristband). | Mark that "resolves" from dots to solid, glass panels, construction lines, work shown in context |
| **Vid04** (7s) | Brand case study on near-black green with one neon-green signal color. Monospace micro-labels, an exploration-sketch grid on dotted paper, a process stepper (Visual positioning → Draft sketches → Vector sketches → Final logo), refractive glass letters sliding past. | Single signal color, mono labels, process stepper for case studies, sketch grids, glass type |

**North star: Vid00, Vid01 and Vid02.** Austin's call (2026-11-17): Vid03 and Vid04 are outside the style.
So no glass panels, no magenta or green brand colors, no photography-led staging. Their one structural idea
that survives is plain-text case studies.

### 6.2 The design language for this site

1. **Dark field, one signal.** Near-black base (around `#0e0f11`). Each part of the site gets one
   accent: the iridescent spectrum is the signature, used sparingly.
2. **Built from primitives.** Marks and headlines are drawn from repeated dots, bars or scanlines and
   **resolve** into solid shapes as they enter. This is the core motif and it is cheap to render.
3. **Kinetic type.** Headings decode from scrambled glyphs, letter-spacing breathes, words split into
   bars and rebuild on hover or scroll. Body copy never moves.
4. **Editorial frame.** Small monospace labels pinned to corners and section edges (`AUSTIN GREER`,
   `2026`, `BOWLING GREEN, KY`, `NOW: HIG`), thin rules, generous negative space.
5. **Squircles and glass** as containers for marks, project thumbnails and the QR card.
6. **Case-study storytelling** for professional work: a process stepper, before/after, the build shown
   in context.

### 6.3 The system as built (v0.2)

- **Color:** monochrome. Near-black field (Vid01/02), light gray "gallery" panels (Vid00), and **one accent:
  the iridescent spectrum** (coral → yellow → cyan → violet) on stripe edges, bar edges and focus states only.
  All tokens live in `src/styles/tokens.css`.
- **AG mark:** rendered as a halftone triangle-dot matrix inside a squircle. It resolves on load and morphs
  between glyphs (AG → resume → portfolio → music → sport) with a wipe and an RGB fringe, like Vid00.
- **Stripe renders (Vid01):** shapes drawn only from vertical stripes with spectrum-colored ends: a sphere,
  a crescent, a wave. Used as section art.
- **Kinetic wordmark (Vid02):** "AUSTIN GREER" decodes from scrambled glyphs, then on hover collapses into
  vertical bars and rebuilds. Letter-spacing breathes.
- **Type:** Geist (display and body) + Geist Mono (labels), self-hosted through Fontsource.
- **Theme:** dark only, with light gray gallery panels (D4).

### 6.4 Motion and performance guardrails

- `prefers-reduced-motion`: every effect has a still, fully resolved state; no decode, no morph.
- Effects start after first paint and pause when off-screen or the tab is hidden.
- Pattern effects (dots, stripes, scanlines) use Canvas 2D. WebGL only where an effect truly needs it
  (glass refraction), loaded lazily, never on `/card` or `/found`.
- Budgets: `/card` and `/found` under 30 KB of JS and a Largest Contentful Paint under 1.5 s on a
  mid-range phone over 4G. Lighthouse 95+ for performance and accessibility on every page.
- Text stays real HTML text (selectable, readable by screen readers and search engines), never
  baked into canvas or images.
- Color contrast meets WCAG AA; the iridescent spectrum is decoration, never the only carrier of meaning.

## 7. Technology and hosting

**Built (v0.2): Astro 7 (static output, flat `.html` files) + TypeScript + plain CSS with tokens,
Geist and Geist Mono self-hosted via Fontsource, QR codes rendered at build time with `qrcode`. CI is
our own workflow (`check` → `build` → Pages deploy).** The original recommendation, kept below for
the reasoning, said Tailwind 4 and the official Astro action.

Why:
- Every page is real static HTML at a real URL. QR pages ship close to zero JavaScript, which is the
  biggest win for phone scans.
- Content collections give exactly the `content/` model in §5, with schemas checked at build.
- Interactive effects become small "islands" (vanilla TypeScript or React) that load only where used.
- All the coding agents work well with it.

Alternative: keep Vite + React and add real routing and prerendering. It keeps compatibility with
Google AI Studio's editor, but ships more JavaScript on every page and needs more plumbing for the
same result. This is the main trade-off in decision D1.

Either way: remove the Express server, the Gemini SDK and the API-key plumbing; switch CI from
`npm install` to `npm ci`; keep deploy-on-push-to-`main`.

## 8. QR code system

- **Frozen routes.** `content/qr.yaml` lists every URL that has ever been printed. CI fails if any of
  them stops resolving. Legacy `.html` paths stay as instant redirect pages.
- **Short, purpose-named paths:** `/card`, `/found`, and one per sticker campaign if needed
  (`/music`, `/b/<band>`). Never print deep or long URLs.
- **Source tags:** printed codes add a short tag (`/card?s=bc26`) so analytics can tell a business
  card from a sticker without tracking people.
- **Generated in the repo.** A script renders print-ready SVG codes from `qr.yaml` (high error
  correction, dot-style modules to match the design, tested with iPhone and Android cameras before
  printing).
- **Save contact.** `/card` offers a `.vcf` download so one tap adds you to their phone.
- **Domain.** If a custom domain is added later, GitHub Pages redirects `austng.github.io` to it, so
  old codes keep working. Still better to decide before the next print run.
- **Contact privacy (Austin, 2026-11-18).** The email appears only on `/card` and `/lost` (and `/found`
  and the `.vcf`). It was removed from the footer and the resume header; the footer now leads to
  LinkedIn. `/card` is `noindex` like `/lost`. `scripts/check-build.mjs` fails the build if the email or
  phone appears anywhere else. Known exposure outside the site: `content/profile.yaml` in this public
  repo, the old site's git history, and the author email on the first 9 commits. New commits should use
  the GitHub noreply address (see `AGENTS.md` rule 12).
- **Lost-item page stays deliberately minimal** and is the only page that shows the phone number (it
  is also in the downloadable vCard). v0.2 change: the number and email are plain HTML, not assembled
  by script. A finder must be able to reach Austin even if JavaScript fails, and both were already public
  on the old site. The page is `noindex` and has no canvas or motion.

## 9. Multi-agent workflow

- **`AGENTS.md`** at the repo root is the one rulebook: structure, commands, where content goes,
  design tokens, the frozen QR list, and "don't" rules. Codex, Copilot, Cursor and others read it
  natively.
- **`CLAUDE.md`** and **`GEMINI.md`** each contain one line that imports `AGENTS.md`, so Claude Code
  and Gemini CLI follow the same rules without duplicated text.
- **This spec** (`docs/SPEC.md`) holds the why; `AGENTS.md` holds the how.
- **Branches and pull requests** for anything beyond a content typo. CI on every PR: type check,
  content schema check, build, internal link check, frozen-QR-route check, Lighthouse budget. Merging
  to `main` deploys.
- **Design tokens in one file** (colors, type scale, spacing, motion durations) so a change made by one
  agent propagates everywhere and agents don't invent new values.
- **Reference media stays out of this public repo.** The design videos are other studios' work; they
  are described in §6, not committed.

## 10. Phased plan

**Status (2026-11-17):** Phases 0, 2, 3 and 4 are done locally on the `redesign` branch, and most of 6
(`/card`, `.vcf`, QR codes on posters). Nothing is live until Austin pushes. Phase 1 was skipped (D2).
Next: Austin reviews the redesign, then band and sport content (Phase 5), then a social preview image
and print-ready QR SVGs.

| Phase | Outcome | Ships to live site? |
|---|---|---|
| **0. Spec + inputs** | This document reviewed, decisions in §11 made, inputs in §12 gathered | No |
| **1. Quick content fix (optional)** | On the *current* site: add HIG role and LinkedIn, fix the broken resume download, add favicon and meta tags | Yes, within a day |
| **2. Design prototypes** | AG mark sketches, type and color tokens, three motion prototypes (dot-matrix resolve, stripe/iridescent render, text decode) as a reviewable preview | No, preview only |
| **3. Foundation** | New Astro project, content collections, `AGENTS.md`, CI checks, legacy redirects | Yes |
| **4. Core pages** | Home, Work + case studies, `/card`, `/found`, 404 | Yes |
| **5. Showcase** | Music + band pages, Sport, Lab | Yes, as content arrives |
| **6. QR kit** | Print-ready SVG codes, `.vcf`, scan testing, analytics | Yes |

## 11. Decisions

Recorded 2026-11-17. Austin didn't object to the recommendations; any of these can be reopened.

| # | Decision | Outcome |
|---|---|---|
| D1 | Stack | **Astro rebuild.** Styling is plain CSS with tokens instead of Tailwind: the design is bespoke and needs fewer moving parts |
| D2 | Quick fix on the old site first? | **Skipped.** Austin will push the redesign himself once he likes it |
| D3 | Domain | **Stay on `austng.github.io`** for now |
| D4 | Theme | **Dark only**, with light gray gallery panels |
| D5 | Analytics | **Deferred.** Add GoatCounter or Cloudflare Web Analytics later; no cookies either way |
| D6 | Resume download | **Print / Save as PDF** with a print stylesheet for now; a build-generated PDF later |
| D7 | Accent system | **One global accent** (the iridescent spectrum), because Vid03 and Vid04 are out |
| D8 | Project hub & showcase | **Unified catalog (`content/projects.yaml`) + `hub/` Markdown notes** (2026-11-27). Entries default to `visibility: internal`; only `visibility: public` renders on `/portfolio` (grouped into Shipped, In progress, and Play & ideas). `npm run hub` generates `hub/OVERVIEW.md`. |
| D9 | Private apps & financing | **Strict public-repo boundary** (2026-11-27). Keep this repo public for the website and non-sensitive project tracking; keep personal finances and private login-gated tools in external authenticated services or a separate private repo (see `hub/PRIVATE-APPS.md`). |

## 12. Inputs needed from Austin

### Needed to start (Phases 1–3)
- [x] **HIG role:** from the LinkedIn export: Employee Benefits Platform Administrator, Nov 2026–present.
- [x] **What HIG is comfortable having public:** "generate something and I'll say if it's too much." The
      HIG bullets are written generically (no internal systems, vendors or plans). Austin to review.
- [x] **Camping World end:** March 6, 2026. Certification: **Platform Developer II**.
- [x] **Printed QR codes:** stickers point at `/lost`. Hidden from navigation, used only for lost items.
- [x] **Reactions to §6:** Vid00, Vid01 and Vid02. Vid03 and Vid04 are out.
- [x] **Decisions D1–D7:** see §11.
- [x] **GitHub access:** Austin pushes the redesign himself.
- [ ] **Which AI tools** you plan to edit with, so `AGENTS.md` and the pointer files cover them. (Claude
      and Gemini pointer files are included; others read `AGENTS.md` directly.)

### Needed by Phase 4–5
- [ ] **Bands:** names, your role/instrument, years, active or past, links (Spotify, Bandcamp,
      YouTube, Instagram), logos, photos, upcoming shows.
- [ ] **Sport:** confirm Toasty FC and BG Futsal stay; soccer timeline (teams, years, positions,
      highlights, photos).
- [ ] **Projects:** which work projects can be shown as case studies, and any screenshots that are
      safe to publish. Keep or drop the fitness tracker.
- [ ] **Photos:** a headshot and a few personal photos (optional; the design works without them).
- [ ] **Existing marks:** any band logos or a personal logo you already use. Keep "AG" or explore
      alternatives?
- [ ] **Headline/summary:** your own words, or I draft from the HIG details for you to edit.
