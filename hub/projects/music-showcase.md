# Music & Bands Showcase

- **ID:** `music-showcase`
- **Status:** `next`
- **Visibility:** `internal` *(tracks the build; the public page already lives at `/music`)*
- **Platform:** Astro
- **Primary files:** `src/pages/music.astro`, `content/bands.yaml`

## Goal

Turn `/music` into a real showcase for Austin's bands and music: who is in each band, what Austin plays, years active, embedded audio/video players, streaming links, and live show history or upcoming gigs.

## Current state

- The `/music` page layout and schema already exist in `src/pages/music.astro` and `src/content.config.ts`.
- `content/bands.yaml` is currently empty with a commented template, so `/music` displays the "Soundcheck" placeholder.
- Existing music assets or notes may already live in Google Drive under `/music`.

## Next steps

- [ ] Gather band names, roles/instruments, years, active vs. past status, short blurbs, and streaming/social links into `content/bands.yaml`.
- [ ] Pick embed players (Spotify, Bandcamp, YouTube, or SoundCloud) for bands with recordings.
- [ ] Decide whether DJ sets ([`dj-sets`](dj-sets.md)) should live as a section on `/music` or on their own page.

## Knowledge capture & decisions

- Schema already supports `name`, `role`, `years`, `status` (`active | past`), `blurb`, `links`, and an optional `embed` iframe URL.
- Can easily extend `content/bands.yaml` later with logos, photos, or upcoming show dates if needed.

## Open questions

- Which bands (active and past) should be included in the first pass?
- Should `/music` stay bands-only while DJ sets live at `/dj`, or should `/music` combine Bands + DJ Sets?
