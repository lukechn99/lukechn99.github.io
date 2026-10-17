# lukechn99.github.io

Personal portfolio and project showcase built with React, Vite, and Mantine.

## Running Locally

```bash
npm install
npm run dev        # start dev server at localhost:5173
npm run build      # production build
npm run deploy     # build + push to gh-pages branch (deploys to GitHub Pages)
```

## Tech Stack

- **React 19** + **TypeScript** via Vite
- **Mantine** — UI component library
- **Leaflet** + **MapTiler** — interactive maps
- **TopoJSON** + **Natural Earth** — people-groups map regions (`topojson-client` in the browser, `mapshaper` at build time)
- **@dnd-kit** — drag-and-drop
- **OSRM** — driving route calculation
- **Open-Meteo** — weather forecasts
- **Photon / Nominatim** — location search
- **jsPDF** — itinerary PDF export
- **React Router** (HashRouter for GitHub Pages compatibility)

## People Groups Map

The **Peoples** tab (Works → Peoples) maps the world's people groups as a tree: language families → branches → sub-branches → peoples. Zoom controls how deep the map goes. Clicking a region focuses it (only its subgroups stay drawn), opens its profile (language, religion, food, name origin, history, relations with neighbours) at the bottom of the page; the panel's close button steps back to the previous group, and clicking empty map returns to the world view.

- `src/peoples/data/*.ts` — the tree and the text for every group
- `src/peoples/relations/*.ts` — "Relations with neighbours" notes for every group
- `scripts/peoples/assignments.mjs` — which people group is the majority in each Natural Earth province/state
- `scripts/peoples/us-county-plurality.txt` — largest ancestry/origin group in each US county (ACS 2020–2024 5-year, via Census Reporter); US counties come from `us-atlas`
- `public/peoples/leaves.topo.json` — generated region shapes (one per leaf group)

To regenerate the shapes after editing the tree or assignments:

```bash
curl -L -o scripts/peoples/ne_admin1.geojson \
  https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson
npm run build:peoples
```

## Todo

### Itinerary Planner
- [ ] **Suggest itinerary** — "Suggest Itinerary" button that runs a grouping algorithm to cluster undated stops into logical day plans
- [ ] **Consolidate UI components** — audit and replace raw HTML elements with consistent Mantine equivalents throughout

### Maps Tab
- [ ] Micro-frontends tab — calculator, Sankey diagram maker, and other module-federated widgets
- [ ] AWS tab — architectures, learnings, best practices
- [ ] Games tab — WebRTC game showcase and learnings

### Build / Performance
- [ ] **Fix large chunk warnings** — `mapping-engine` (1,454 kB) and `jspdf` (386 kB) exceed the 500 kB threshold. Use `build.rollupOptions.output.manualChunks` to split heavy deps (MapTiler, jsPDF, html2canvas) into separate chunks, and audit any remaining dynamic `import()` opportunities.

### General
- [ ] Add more content to the Works page tabs (Micro-frontends, AWS)
