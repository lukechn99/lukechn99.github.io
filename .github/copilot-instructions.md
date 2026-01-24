# AI Coding Agent Instructions

## Project Overview
Personal portfolio website (lukechn99.github.io) built with **React 19 + Vite + TypeScript** and deployed to GitHub Pages. The site showcases projects and provides quick links to social profiles.

## Architecture

### Stack
- **Frontend Framework:** React 19 with TypeScript
- **Build Tool:** Vite 7.2 with React plugin (Babel for Fast Refresh)
- **UI Library:** Mantine 8.3 (component library + hooks)
- **Icons:** Tabler Icons React 3.36
- **Routing:** React Router v6 with HashRouter (required for GitHub Pages static hosting)
- **Styling:** CSS modules + Mantine theme variables + PostCSS (Mantine preset)
- **Deployment:** GitHub Pages via `gh-pages` package

### Key Files
- [src/main.tsx](src/main.tsx) - App entry point; sets up MantineProvider, HashRouter, and route structure
- [src/App.tsx](src/App.tsx) - Home page with rotating welcome messages and icon buttons
- [src/Works.tsx](src/Works.tsx) - Projects/works showcase page with tab navigation (Maps, Vue, Angular, Svelte)
- [src/components/PushingHoverIcon.tsx](src/components/PushingHoverIcon.tsx) - Reusable hover-triggered collapse component

## Critical Developer Workflows

### Local Development
```bash
npm run dev        # Start Vite dev server with HMR on localhost:5173
npm run build      # Production build to ./dist (TypeScript + minification)
npm run preview    # Preview production build locally
```

### Deployment
```bash
npm run deploy     # Runs predeploy hook (build) then publishes dist/ to GitHub Pages
```
GitHub Pages is configured to serve from `https://lukechn99.github.io/` with routing via **HashRouter** (URLs use `#/` format, e.g., `/#/works`). The base URL in vite.config.js is `/`.

### Testing & Linting
- ESLint configured (eslint.config.js) for React + TypeScript
- No explicit test framework; run `npm run build` to catch type errors
- No pre-commit hooks; manual CI validation

## Project-Specific Patterns & Conventions

### Mantine Integration
- **Always import components from `@mantine/core`** and styles from `@mantine/core/styles.css` (imported in main.tsx)
- Use Mantine's **built-in hooks** (`useHover`, `useDisclosure`) for state management when possible
- Leverage Mantine's **spacing system** (gap, p, h, maw props) instead of custom padding/margins
- Theme colors referenced via CSS variables: `var(--mantine-color-body)`, etc.

### Component Structure
- **Functional components with hooks** (React 19 best practices)
- **No class components or legacy patterns**
- Custom components pass **React.ReactNode** for flexibility (see PushingHoverIcon accepting any ActionIcon variant)

### Routing
- **HashRouter must be used** for GitHub Pages static site compatibility
- Add new routes in [src/main.tsx](src/main.tsx) Routes section
- Use `<Link to="/path">` from react-router-dom for navigation

### CSS Strategy
- **Minimal custom CSS** - leverage Mantine theming
- CSS files co-located with components (App.css with App.tsx)
- CSS variables from Mantine available globally
- PostCSS processes Mantine preset automatically (postcss-preset-mantine, postcss-simple-vars)

### TypeScript
- Strict mode enabled; all React nodes, refs, and props must be typed
- Common patterns: `React.ReactNode` for children, `HTMLDivElement | null` for refs
- Global types in [src/types/global.d.ts](src/types/global.d.ts) if needed

## Integration Points & Dependencies

### External Services
- **GitHub Pages:** Static hosting; respects base URL config
- **Social Links:** GitHub (lukechn99) and LinkedIn (chen-luke) hardcoded in App.tsx buttons

### Mantine Component Ecosystem
When extending UI, reference these Mantine patterns:
- `<Center>` for layout centering
- `<Stack>` for vertical flex layouts with gap control
- `<FloatingIndicator>` for animated underlines (Works.tsx uses this for tab indicators)
- `<Collapse>` for conditional rendering with auto height animation
- `<ActionIcon>` + `<ThemeIcon>` for icon buttons

### Message Rotation (App.tsx)
Uses `useEffect` + `useState` to cycle through welcome messages every 5 seconds. Update `messages` array to change content; no backend integration.

## Common Tasks

**Add a new page:** Create component in src/, import in main.tsx Routes, add to HashRouter  
**Add a new project to Works:** Update `data` array in Works.tsx  
**Update icons:** Replace imports from `@tabler/icons-react` and update icon names  
**Modify theme:** Adjust CSS variables in index.css or override via MantineProvider theme prop  
**Deploy:** Run `npm run deploy` (assumes GitHub Pages configured in repo settings)
