# Project Hub & Knowledge Capture

This folder is Austin's overarching project hub and knowledge-capture workspace. It tracks work across Anti-Gravity, Google AI Studio, Google Sheets and Apps Script, Salesforce, and standalone web builds — while keeping [`content/projects.yaml`](../content/projects.yaml) as the single catalog that also drives the public [`/portfolio`](https://austng.github.io/portfolio) page.

## Start here

| File | Purpose |
|---|---|
| [`OVERVIEW.md`](OVERVIEW.md) | Auto-generated dashboard of every tracked project, grouped by stage and platform, plus what to work on next. |
| [`IDEAS.md`](IDEAS.md) | Fast scratchpad for raw play ideas before they graduate into `content/projects.yaml`. |
| [`PRIVATE-APPS.md`](PRIVATE-APPS.md) | Architecture and guardrails for financing tools and private login-gated apps. |
| [`projects/`](projects/) | Deep-dive Markdown notes, decisions, and scratchpads for individual projects. |
| [`projects/_template.md`](projects/_template.md) | Copy this template when a project needs its own note. |

## How visibility works

Every entry in [`content/projects.yaml`](../content/projects.yaml) has a `visibility` field:

- `visibility: public` — renders on the public website at `/portfolio`, grouped into **Shipped**, **In progress**, and **Play & ideas**.
- `visibility: internal` *(default)* — stays off the website and appears only in [`OVERVIEW.md`](OVERVIEW.md). `scripts/check-build.mjs` verifies that internal projects and `nextStep` fields never leak into `dist/portfolio.html`.

> **Important privacy rule:** This repository is public on GitHub. `visibility: internal` hides an entry from the website layout, **not** from git history. Never commit financial figures, account details, personal credentials, or employer internals to this repo. See [`PRIVATE-APPS.md`](PRIVATE-APPS.md).

## Quick workflow

1. **Capture a raw idea:** drop a one-liner into [`IDEAS.md`](IDEAS.md).
2. **Track a real project:** add an entry to [`content/projects.yaml`](../content/projects.yaml) with `status` (`live`, `in-progress`, `next`, `idea`, `paused`, `archived`), `platform`, and a concrete `nextStep`.
3. **Capture project knowledge:** copy [`projects/_template.md`](projects/_template.md) to `hub/projects/<id>.md` and point `note: hub/projects/<id>.md` at it.
4. **Refresh the overview:** run `npm run hub` to regenerate [`OVERVIEW.md`](OVERVIEW.md).
5. **Share publicly when ready:** set `visibility: public` and run `npm run check && npm run build`.
