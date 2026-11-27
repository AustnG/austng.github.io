# Personal Inventory

- **ID:** `personal-inventory`
- **Status:** `idea`
- **Visibility:** `internal`
- **Platform:** Google Sheets, Google AI Studio

## Goal

Maintain a clean personal inventory of belongings, gear, and collections worth tracking — serving as a practical reference (and the shared foundation for specialized builders like [`wardrobe-builder`](wardrobe-builder.md) and [`airsoft-loadout`](airsoft-loadout.md)).

## Current state

- Idea phase.
- **Privacy boundary:** Actual inventory records (serial numbers, purchase prices, home locations, insurance values) must **never** be committed to this public repo. Store the real data in a private Google Sheet, private repo, or login-protected app (see [`../PRIVATE-APPS.md`](../PRIVATE-APPS.md)).

## Next steps

- [ ] Pick 2–3 starter categories (for example: tech/music gear, hobbies, clothing) instead of trying to catalog everything at once.
- [ ] Design a shared core item schema (`id`, `name`, `category`, `subCategory`, `status: owned | wishlist | lent | sold`, `location`, `tags`, `photo`, `notes`).
- [ ] Build the first private Google Sheet and test fast mobile item entry (Google Form, Apps Script Web App, or private AI Studio prototype).

## Knowledge capture & decisions

- Keeping one normalized core item structure makes it easy to spin off specialized views (Wardrobe Builder, Airsoft Loadout, LEGO, Board Games) without reinventing storage each time.
- Fast capture matters more than exhaustive fields — if adding a new item takes more than 20 seconds, it won't stay up to date.

## Open questions

- Single master spreadsheet with category tabs, or separate domain sheets that share the same column conventions?
- Do you want insurance/replacement-value tracking included (which reinforces keeping the live data strictly private behind Google Auth / Cloudflare Access)?
