# Quote & Knowledge Journal

- **ID:** `knowledge-journal`
- **Status:** `idea`
- **Visibility:** `internal`
- **Platform:** Anti-Gravity, Google AI Studio, Google Sheets

## Goal

Build a personal quote and knowledge tracker journal that makes it easy to capture quotes, book passages, and insights, analyze recurring themes, archive them cleanly, and **resurface** them so they actually stick instead of disappearing into a notes app.

## Current state

- Idea phase.

## Next steps

- [ ] Define the minimal capture schema: `quote / excerpt`, `author / source`, `sourceType` (`book | podcast | film | conversation | article | personal`), `tags / themes`, `myTake` (short reflection/analysis), `dateAdded`, and `lastSurfaced`.
- [ ] Pick a low-friction capture path from a phone (Google Form → Sheet, quick web form, or Markdown entry).
- [ ] Design the resurfacing loop: random "daily/weekly quote" view, spaced-resurfacing prompt, or AI-assisted theme synthesis across saved entries.

## Knowledge capture & decisions

- Most quote apps fail at **resurfacing**, not capture. Treating `lastSurfaced` and `favorite` / `resonance` as first-class fields keeps the archive alive.
- Adding a short `myTake` field ("why did this hit me right now?") turns a passive quote list into real knowledge capture and makes later analysis much richer.
- Can start completely private (Google Sheets + Apps Script / private web app) and optionally promote a curated subset of favorite public quotes later if desired.

## Open questions

- Do you prefer capturing into Google Sheets first (easy to query from AI Studio or Apps Script) or plain Markdown files in a private repo (Obsidian/GitHub-friendly)?
- How do you want resurfacing to happen — opening a dashboard, getting a weekly email digest, or a quick phone widget/bookmark?
