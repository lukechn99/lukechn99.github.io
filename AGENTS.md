# AGENTS.md

## Cursor Cloud specific instructions

This is a React 19 + Vite 7 + TypeScript portfolio SPA with no backend. See `.github/copilot-instructions.md` for full architecture and conventions.

### Services

| Service | Command | Port |
|---|---|---|
| Vite dev server | `npm run dev` | 5173 |

### Lint / Build / Dev

- **Lint:** `npx eslint .` — ESLint is configured only for `.js`/`.jsx` files (not `.ts`/`.tsx`); TypeScript errors are caught by `npm run build`.
- **Build:** `npm run build` — runs `vite build`, also validates TypeScript.
- **Dev server:** `npm run dev` (add `-- --host 0.0.0.0` to expose on all interfaces).
- No test framework is configured; use `npm run build` to catch type errors.
- No pre-commit hooks or CI gates.

### Gotchas

- The ESLint config (`eslint.config.js`) only targets `**/*.{js,jsx}` files. TypeScript/TSX files are not linted by ESLint; rely on `vite build` for TS type checking.
- Routing uses `HashRouter` (`/#/works`, `/#/contact`), not `BrowserRouter`, because of GitHub Pages static hosting.
- All data persistence is browser `localStorage` — no database or backend.
- External API keys (MapTiler, Web3Forms) are hardcoded in source; no `.env` files or secrets are required.
