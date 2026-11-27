# AGENTS.md: rules for any AI agent working on this repo

This is Austin Greer's personal site: resume, portfolio, QR landing pages, and a showcase for music and
sport. It is a static [Astro](https://astro.build) site published to GitHub Pages at
https://austng.github.io. Claude, Gemini, ChatGPT/Codex, Copilot and Cursor all edit it, so these rules are
the shared contract. **Why** things are the way they are lives in [`docs/SPEC.md`](docs/SPEC.md).

## Commands

```bash
npm ci            # install exact versions
npm run dev       # local preview at http://localhost:4321
npm run check     # TypeScript + content schema check
npm run hub       # regenerate hub/OVERVIEW.md from content/projects.yaml
npm run build     # build to dist/, then scripts/check-build.mjs verifies frozen routes, contact privacy, and hub visibility
```

The npm scripts call `node ./node_modules/astro/bin/astro.mjs` directly instead of `astro`, because the
owner's work PC blocks the `astro` command shim. Keep it that way.

## Where things live

| You want to change… | Edit this | Not this |
|---|---|---|
| Name, headline, intro, current role, summary, home stats, links, certs, education | `content/profile.yaml` | Page templates |
| Jobs and key projects | `content/experience.yaml` | |
| Skills | `content/skills.yaml` | |
| Master project catalog (public `/portfolio` + internal hub entries) | `content/projects.yaml` (then run `npm run hub`) | `hub/OVERVIEW.md` directly |
| Raw play ideas and scratchpad notes | `hub/IDEAS.md` | |
| Deep-dive project notes and decisions | `hub/projects/<id>.md` (template: `hub/projects/_template.md`) | |
| Private/financing app boundary and roadmap | `hub/PRIVATE-APPS.md` | |
| Bands (Music page) | `content/bands.yaml` (template inside) | |
| Teams, leagues, timeline (Sport page) | `content/sport.yaml` | |
| URLs that must never break | `content/routes.json` (add only, never remove) | |
| Colors, fonts, spacing, motion timing | `src/styles/tokens.css` | Hard-coded values in components |
| Page layout | `src/pages/*.astro`, `src/components/*.astro` | |
| Motion effects | `src/scripts/*.ts` | |

Most requests ("add my new job", "add a band", "update my summary", "log a new project or play idea") are a
single YAML or Markdown edit. Schemas in `src/content.config.ts` validate every file at build time, so
`npm run check` catches bad edits. Projects in `content/projects.yaml` default to `visibility: internal`
(hub only); only entries marked `visibility: public` render on `/portfolio`. Never commit financial data,
credentials, or private URLs to this public repo (see `hub/PRIVATE-APPS.md`).

## Hard rules

1. **Never break a frozen route.** `/lost` is printed on physical QR stickers. Everything in
   `content/routes.json` must keep resolving; `npm run build` fails if one is missing.
2. **`/lost` stays hidden and plain.** Never link it from navigation, sitemaps or other pages. Keep it
   `noindex`, with no canvas or motion, working with JavaScript turned off. `/found` is its alias.
3. **Keep `build.format: 'file'`** in `astro.config.mjs`. It is what makes `/lost` and `/lost.html` both work.
4. **Design direction is reference videos 00, 01 and 02** (summarized in `docs/SPEC.md` §6): a monochrome
   dark field, light gray "gallery" panels with tiny corner labels, marks built from halftone dots or
   vertical stripes, kinetic type. One accent, the spectrum (`--spec-1` … `--spec-5`), used only on edges
   and details. No glass panels, magenta or green brand colors, or photo-led layouts.
5. **Use tokens.** No new hex colors, font stacks or durations outside `src/styles/tokens.css`.
6. **Motion is optional.** Every effect must honor `prefers-reduced-motion` with a still, finished state.
   Text stays real HTML (never baked into canvas or images). Effects pause when off screen.
7. **Keep QR pages light.** `/card` and `/lost` must load fast on a phone over cellular.
8. **Keep work content general.** Don't describe Houchens Insurance Group's internal systems, vendors,
   clients or plans. Nothing about a current employer goes on the site without the owner's approval.
9. **No secrets, trackers or cookies.** Analytics, if added, must be cookieless and approved by the owner.
10. **Never commit** `docs/inputs/` (private source material) or the design reference videos.
11. **Email and phone stay on two pages.** The email appears only on `/card` and `/lost` (plus `/found` and
    the `.vcf`); the phone only on `/lost` (plus `/found` and the `.vcf`). Nowhere else: not the footer,
    resume, meta tags or structured data. `/card` and `/lost` are `noindex`. `scripts/check-build.mjs`
    fails the build on a leak; don't loosen its allow-list without the owner's approval.
12. **Commit with the owner's private GitHub address**, never a work address. This repo is public and commit
    emails are visible: `git config user.email` must be `11287718+AustnG@users.noreply.github.com`.

## Writing style for site copy

- **Use the Oxford comma** in every list of three or more: "sales, service, and the call center".
- **The summary, intro, and headline describe what Austin does and his current role.** Past employers
  appear only in the resume's experience entries (`content/experience.yaml`), not in the summary.
- Plain, specific language. No buzzwords, no exclamation points.

## Workflow

- Work on a branch and open a pull request. CI (`.github/workflows/check.yml`) runs `check` and `build`.
- Merging to `main` deploys automatically (`.github/workflows/deploy.yml`).
- Run `npm run check` and `npm run build` before you say you're done.
- If you change a rule or a design decision, update `docs/SPEC.md` in the same PR.

## Effects reference

| Effect | Reference | Markup | Script |
|---|---|---|---|
| Halftone squircle mark that morphs between glyphs | Vid00 | `<HalftoneMark glyphs={['AG','note']} />` | `src/scripts/halftone.ts` |
| Shape drawn from vertical stripes with spectrum edges | Vid01 | `<StripeArt shape="sphere" />` (sphere, crescent, wave, pulse) | `src/scripts/stripes.ts` |
| Wordmark that decodes and collapses into bars | Vid02 | `<Wordmark lines={['AUSTIN','GREER']} />` | `src/scripts/wordmark.ts` |
| Label text that scrambles, then resolves | Vid01/02 | `data-decode` on any element | `src/scripts/ui.ts` |
| Fade-up on scroll, poster parallax | — | `data-reveal`, `data-parallax="0.1"` | `src/scripts/ui.ts` |

Halftone glyphs can be any 1–4 characters, or one of the named shapes: `code`, `note`, `ball`, `pin`.
