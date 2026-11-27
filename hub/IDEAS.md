# Play Ideas & Raw Backlog

A low-friction scratchpad for half-formed ideas, weekend experiments, and tools worth exploring. When an idea becomes a concrete project you want to track (or share on `/portfolio`), promote it into [`content/projects.yaml`](../content/projects.yaml) and run `npm run hub`.

> Keep entries here non-sensitive. Anything involving personal finances, private credentials, or employer internals belongs in a private workspace (see [`PRIVATE-APPS.md`](PRIVATE-APPS.md)).

## Cross-cutting patterns spotted so far

- **Shared Inventory + Loadout Engine** — Several Brain Dump #1 ideas share the exact same backbone: a catalog of owned items + a wish list + a visual "builder" that combines items into sets or loadouts.
  - Connected projects: [Personal Inventory](projects/personal-inventory.md), [Wardrobe Builder](projects/wardrobe-builder.md), [Airsoft Kit & Loadout Builder](projects/airsoft-loadout.md), [LEGO Tracker & Tabletop Hub](projects/lego-tracker.md), and [Board Game & Tabletop Tracker](projects/tabletop-tracker.md).
  - Opportunity: Keep a consistent core item schema (`id`, `name`, `category`, `status: owned | wishlist`, `tags`, `image`, `link`) so prototypes can share patterns or live cleanly over Google Sheets.

## Anti-Gravity & AI Studio experiments

- **Call of Duty / Tarkov-style Airsoft Loadout Screen** — Interactive slot-based gear grid (primary, attachments, optics, chest rig, sidearm, pack) with weight, role presets, and wish-list swap previews.
  - Promoted to: [`airsoft-loadout`](projects/airsoft-loadout.md)
- **AI-assisted Wardrobe Outfit Picker** — Filter by weather, occasion, or anchor piece to generate outfit ideas strictly from clothes already owned.
  - Promoted to: [`wardrobe-builder`](projects/wardrobe-builder.md)
- **Quote & Knowledge Resurfacer** — Capture quotes, passages, and lessons, analyze recurring themes, and resurface forgotten highlights on a schedule.
  - Promoted to: [`knowledge-journal`](projects/knowledge-journal.md)

## Spreadsheets & Apps Script tools

- **Personal Inventory Master Sheet** — Private Google Sheet backing owned gear, collections, and categories (kept out of this public repo; see [`PRIVATE-APPS.md`](PRIVATE-APPS.md)).
  - Promoted to: [`personal-inventory`](projects/personal-inventory.md)
- **LEGO Set + Rebrickable Lookup Sheet** — Track set numbers, theme, piece count, build status, and automatic links to LEGO.com and Rebrickable.
  - Promoted to: [`lego-tracker`](projects/lego-tracker.md)
- **Board Game & Tabletop Play Log** — Owned library, expansions, wish list, and quick play-session tracker.
  - Promoted to: [`tabletop-tracker`](projects/tabletop-tracker.md)

## Music & Sport ideas

- **Bands Showcase (`/music`)** — Populate existing `/music` page with active and past bands, recordings, instruments, and shows.
  - Promoted to: [`music-showcase`](projects/music-showcase.md)
- **DJ Sets & Filmed Live Mixes** — Share recorded audio sets and filmed live sets with timestamps and tracklists.
  - Promoted to: [`dj-sets`](projects/dj-sets.md)
- **Full Player & Coach Soccer Timeline** — Expand `/sport` into a rich archive of playing teams, coaching stints, records, and career artifacts.
  - Promoted to: [`soccer-timeline`](projects/soccer-timeline.md)

## Tabletop & LEGO gaming sparks

- **LEGO Tabletop Systems** — Explore lightweight skirmish and RPG rulesets built around existing LEGO minifigs and terrain:
  - **BrikWars** — chaotic LEGO wargaming built natively for bricks.
  - **One Page Rules (OPR)** — streamlined miniature wargaming with LEGO squads and brick-built cover.
  - **LEGO D&D** — modular dungeon tiles, minifig character builds, and encounter maps.
  - Captured in: [`lego-tracker`](projects/lego-tracker.md)

---

### Entry template

```markdown
- **Idea title** — One sentence on what it does.
  - Platform: Anti-Gravity / Google AI Studio / Google Sheets
  - Spark: Why this came up or what problem it solves.
  - Tiny first test: What a 30-minute prototype looks like.
```
