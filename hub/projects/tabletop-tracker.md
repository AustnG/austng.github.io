# Board Game & Tabletop Tracker

- **ID:** `tabletop-tracker`
- **Status:** `idea`
- **Visibility:** `internal`
- **Platform:** Google AI Studio, Google Sheets

## Goal

Track owned board games and tabletop games, expansions, wish list items, and play sessions — making it fast to pick a game for game night based on player count, play time, and mood.

## Current state

- Idea phase.
- Shares the collection/inventory backbone with [`personal-inventory`](personal-inventory.md) and [`lego-tracker`](lego-tracker.md).

## Next steps

- [ ] Define the starter schema: title, status (`owned | wishlist | played`), category/mechanic, min/max players, play time, complexity/weight, expansions, BGG link, and notes.
- [ ] Add a lightweight play-session log (date, game, players, winner/outcome, notes).
- [ ] Prototype a quick "What should we play tonight?" filter view (filter by player count + available time) in Google AI Studio or over Google Sheets.

## Knowledge capture & decisions

- Linking out to BoardGameGeek (BGG) IDs/URLs avoids manually copying rules summaries or box details.
- Overlaps naturally with LEGO tabletop gaming ideas (BrikWars, One Page Rules, LEGO D&D) tracked in [`lego-tracker`](lego-tracker.md).

## Open questions

- Do you want to log every play session (BG Stats style) or mostly focus on collection + wish list + game-night picker?
- Should tabletop RPGs and skirmish games live here or stay separate?
