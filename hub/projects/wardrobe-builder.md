# Wardrobe Builder

- **ID:** `wardrobe-builder`
- **Status:** `idea`
- **Visibility:** `internal`
- **Platform:** Google AI Studio, Google Sheets

## Goal

Spin a visual wardrobe and outfit builder off [`personal-inventory`](personal-inventory.md) to catalog clothes currently in the closet, save favorite outfits, and generate new combinations for work, casual, gigs, or weather.

## Current state

- Idea phase; natural companion to [`personal-inventory`](personal-inventory.md) and shares the slot-based "builder" concept with [`airsoft-loadout`](airsoft-loadout.md).

## Next steps

- [ ] Sketch the garment fields: item name, slot (`top | layer | bottom | footwear | accessory`), color palette, season/weather, formality (`work | casual | active | stage`), status (`owned | wishlist`), and photo.
- [ ] Catalog a small test batch (15–20 staple pieces) in a private Google Sheet.
- [ ] Prototype an outfit-builder UI in Google AI Studio where you lock 1 anchor piece and cycle compatible matches.

## Knowledge capture & decisions

- Starting with just your most-worn 20 pieces avoids getting bogged down photographing an entire closet before the app proves useful.
- Keeping a `wishlist` flag lets you test whether a potential purchase actually pairs with clothes you already own.

## Open questions

- Photo-first visual cards (flat-lay / product images) vs. fast text/color-swatch cards to start?
- Should outfit suggestions use AI (e.g., Gemini via AI Studio) or simple tag/color rules first?
