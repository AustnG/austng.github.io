# austng.github.io

- **ID:** `this-site`
- **Status:** `in-progress`
- **Visibility:** `public`
- **Platform:** Astro, Anti-Gravity, GitHub Pages
- **Primary link / repo:** https://github.com/AustnG/austng.github.io

## Goal

Serve as both Austin's public personal site (resume, portfolio, QR contact and lost-item pages, music, and sport) and a clean, repo-side project hub for organizing active builds, next actions, and play ideas.

## Current state

- Astro static rebuild is live on `main` with the monochrome Vid00/01/02 visual system, Canvas 2D motion effects, and YAML content collections.
- `content/projects.yaml` now doubles as the master project catalog with `visibility: public | internal`, `platform`, `tags`, `nextStep`, and `note` links.
- `/portfolio` renders only `visibility: public` entries, grouped into **Shipped**, **In progress**, and **Play & ideas**.
- `npm run hub` generates [`../OVERVIEW.md`](../OVERVIEW.md) from `content/projects.yaml`.

## Next steps

- [ ] Seed current Anti-Gravity, Google AI Studio, and Google Sheets projects into `content/projects.yaml` (using `visibility: internal` for anything not ready for the public site).
- [ ] Populate band entries in `content/bands.yaml` for `/music`.
- [ ] Fill out the full soccer timeline in `content/sport.yaml` for `/sport`.
- [ ] Generate print-ready QR SVGs and a social preview image (Phase 6 in `docs/SPEC.md`).

## Knowledge capture & decisions

- **Single source of truth:** Project metadata lives in `content/projects.yaml` (validated by Zod in `src/content.config.ts`) so agents and humans never maintain two separate lists.
- **Public vs. private boundary:** Sensitive financing tools and private data stay out of this public repository and live in external authenticated tools or a separate private repo (see [`../PRIVATE-APPS.md`](../PRIVATE-APPS.md)).
- **Frozen routes:** Never break `/`, `/lost`, `/found`, `/resume`, `/portfolio`, `/card`, or `/austin-greer.vcf`.
