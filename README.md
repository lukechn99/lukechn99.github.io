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
- **@dnd-kit** — drag-and-drop
- **OSRM** — driving route calculation
- **Open-Meteo** — weather forecasts
- **Photon / Nominatim** — location search
- **jsPDF** — itinerary PDF export
- **React Router** (HashRouter for GitHub Pages compatibility)

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
