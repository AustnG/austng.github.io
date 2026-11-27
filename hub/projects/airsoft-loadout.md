# Airsoft Kit & Loadout Builder

- **ID:** `airsoft-loadout`
- **Status:** `idea`
- **Visibility:** `internal`
- **Platform:** Google AI Studio, Anti-Gravity

## Goal

Log current airsoft equipment plus a gear wish list, and pair it with a **Call of Duty / Escape from Tarkov–style interactive loadout builder** where you assemble and compare real kits from owned gear (and preview wish-list upgrades).

## Current state

- Idea phase.
- Shares the owned-items + wish-list + slot-builder pattern with [`personal-inventory`](personal-inventory.md) and [`wardrobe-builder`](wardrobe-builder.md).

## Next steps

- [ ] Define the equipment slots:
  - **Primary & attachments:** replica, optic, rail/light, grip, muzzle/suppressor, sling, mags, battery/HPA.
  - **Secondary:** sidearm, holster, mags.
  - **Wearables & rig:** helmet/eyepro/facepro, plate carrier/chest rig, pouches, belt, pack, comms, boots/gloves.
  - **Field kit & maintenance:** BBs, chrono specs (FPS/Joule), batteries, tools.
- [ ] Build a clean item catalog (`owned | wishlist`, weight, cost/priority for wish list, notes) in a private sheet or local JSON.
- [ ] Mock up a Tarkov/CoD-style dark-UI loadout screen with swappable slots, saved presets (e.g., Indoor CQB vs. Outdoor Milsim), and total kit weight / wish-list delta.

## Knowledge capture & decisions

- A dark, tactical monospace UI fits naturally with the monochrome aesthetic already used on `austng.github.io`.
- Keeping wish-list items toggleable inside the loadout builder lets you visually "equip" an upgrade to see how it rounds out a kit before buying.
- Keep purchase receipts, serial numbers, or sensitive personal notes out of this public repo (see [`../PRIVATE-APPS.md`](../PRIVATE-APPS.md)).

## Open questions

- Do you want to track gun tech/upgrade internals (hop-up, bucking, inner barrel, spring, FPS/Joule readings) per replica?
- Would you want a public showcase view of finished loadouts later, or keep this purely as a personal builder?
