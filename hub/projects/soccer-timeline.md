# Soccer Timeline

- **ID:** `soccer-timeline`
- **Status:** `in-progress`
- **Visibility:** `public`
- **Platform:** Astro
- **Primary files:** `src/pages/sport.astro`, `content/sport.yaml`

## Goal

Build a comprehensive visual timeline and archive of Austin's soccer career as both a **player** and **coach** — covering youth, school, college, club, adult/futsal teams, coaching stints, season records, positions, highlights, and artifacts found along the way.

## Current state

- `/sport` currently shows `Toasty FC`, `Bowling Green Futsal`, and a single starter timeline entry (`SKY Soccer Club`, 2010–2011).
- Listed on `/portfolio` under **In progress**.

## Next steps

- [ ] Compile the full chronological list of playing teams and coaching roles (years, team/club, role/position, level, record/stats, and highlights).
- [ ] Expand `content/sport.yaml` schema to distinguish `role: player | coach | both`, plus optional `record`, `position`, `highlights`, and `artifacts` (links, photos, or press clips).
- [ ] Upgrade the `/sport` timeline UI (filterable by Player / Coach / All, visual era markers, and record badges).

## Knowledge capture & decisions

- Separating player vs. coach entries (or tagging each entry with both when overlapping) makes the timeline much easier to scan and tells the full story cleanly.
- Keeping all entries in `content/sport.yaml` lets you add newly unearthed records, rosters, or clippings one entry at a time without touching layout code.

## Open questions

- Should this live inside `/sport` or grow into its own dedicated sub-route (e.g. `/sport/timeline`) once it has lots of eras and media?
- What historical artifacts do you already have (old stats, newspaper clips, jerseys, photos, coaching records)?
