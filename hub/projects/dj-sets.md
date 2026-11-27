# DJ Sets & Live Recordings

- **ID:** `dj-sets`
- **Status:** `idea`
- **Visibility:** `internal`
- **Platform:** Astro, YouTube

## Goal

Create a clean place to share DJ mixes, recorded audio sets, and filmed live sets (with venue/date context, genre/vibe tags, and timestamped tracklists).

## Current state

- Idea phase; closely connected to [`music-showcase`](music-showcase.md).

## Next steps

- [ ] Decide whether DJ sets live as a dedicated section on `/music` or as a standalone `/dj` route.
- [ ] Pick primary hosting/embed sources (YouTube for filmed sets, SoundCloud or Mixcloud for audio-only mixes).
- [ ] Sketch a YAML content schema (`content/sets.yaml` or a section in `content/music.yaml`) with title, date, location/context, duration, genre tags, video/audio embed URL, and tracklist.

## Knowledge capture & decisions

- Keeping embeds hosted on YouTube, SoundCloud, or Mixcloud avoids storing large media files in GitHub Pages while keeping page loads fast (`loading="lazy"`).
- Could pair nicely with the monochrome Vid01/02 aesthetic (poster cards with `StripeArt shape="pulse"` or `"wave"` and monospace set metadata).

## Open questions

- Separate `/dj` page (easy to share on flyers or QR stickers) vs. unified `/music` page with Bands and DJ Sets sections?
- Do you want clickable timestamp tracklists for YouTube filmed sets?
