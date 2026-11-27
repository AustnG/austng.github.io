# austng.github.io

Austin Greer's personal site: resume, portfolio, contact card, lost-item page, music and sport.
Static [Astro](https://astro.build) build, deployed to GitHub Pages on every push to `main`.

- **Update content:** edit the YAML files in [`content/`](content/). See [`AGENTS.md`](AGENTS.md) for which file holds what.
- **Project hub & knowledge capture:** see [`hub/OVERVIEW.md`](hub/OVERVIEW.md) (generated from `content/projects.yaml` via `npm run hub`), [`hub/IDEAS.md`](hub/IDEAS.md), and [`hub/README.md`](hub/README.md).
- **Plan and design decisions:** [`docs/SPEC.md`](docs/SPEC.md).
- **Run locally:** `npm ci`, then `npm run dev` and open http://localhost:4321.

| URL | What it is |
|---|---|
| `/` | Home |
| `/resume` | Resume (Print / Save PDF) |
| `/portfolio` | Public shipped work, active builds, and shareable play ideas |
| `/music`, `/sport` | Hobbies |
| `/card` | Business-card QR landing, with Save Contact |
| `/lost` | Lost-item sticker page (hidden from navigation) |
