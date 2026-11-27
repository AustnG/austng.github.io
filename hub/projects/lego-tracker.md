# LEGO Tracker & Tabletop Hub

- **ID:** `lego-tracker`
- **Status:** `idea`
- **Visibility:** `internal`
- **Platform:** Google AI Studio, Google Sheets, Web

## Goal

Track owned LEGO sets, custom builds (MOCs), and build status with direct links to **LEGO.com** and **Rebrickable** — alongside a creative sandbox for LEGO-based tabletop games like **BrikWars**, **One Page Rules**, and **LEGO D&D**.

## Current state

- Idea phase.
- Connects collection tracking ([`personal-inventory`](personal-inventory.md)) with tabletop gaming ([`tabletop-tracker`](tabletop-tracker.md)).

## Next steps

- [ ] List current sets by LEGO set number (`setNumber`) so links to `lego.com` and `rebrickable.com/sets/<setNumber>-1/` can be generated automatically.
- [ ] Capture starter notes on LEGO tabletop games to try first: BrikWars, One Page Rules (OPR), and LEGO D&D.
- [ ] Decide whether to pull set metadata (name, theme, year, piece count, image) via Rebrickable's API or CSV export into Google Sheets.

## Knowledge capture & decisions

- **Two natural halves:**
  1. **Collection & Builds:** set number, name, theme, piece count, status (`built | boxed | in-progress | parted-out | wishlist`), MOC notes, LEGO.com link, and Rebrickable link.
  2. **LEGO Tabletop Sandbox:** armies/squads, minifig hero sheets, brick-built terrain inventory, house rules, and scenario ideas for:
     - **BrikWars** (native brick-combat rules)
     - **One Page Rules** (fast skirmish/wargaming adapted for minifig squads)
     - **LEGO D&D** (modular brick dungeons, minifig PCs/monsters, and gridless/stud-based movement)
- Rebrickable already has an API and CSV catalog exports, which makes enriching set numbers effortless.

## Open questions

- Do you want to share parts of this publicly later (e.g., custom MOCs or tabletop battle reports) while keeping the full set inventory private?
- Which LEGO tabletop game sounds most fun to playtest first (a quick One Page Rules skirmish, BrikWars, or a LEGO D&D one-shot)?
