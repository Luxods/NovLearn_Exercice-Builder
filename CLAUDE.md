# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build (outputs to dist/)
npm run preview   # Preview production build locally
```

No test runner or linter is configured.

## Architecture

React 19 + Vite 7 SPA with Supabase backend. The app lets educators build math exercises with LaTeX support, dynamic variables, and live preview.

### Core Concepts

**Exercise structure:** Each exercise has metadata (title, chapter, difficulty, competencies) and an `elements` array. Elements are typed blocks (text, equation, graph, mcq, etc.) stored as JSON.

**Element system:** Every element type has three parts:
1. An editor in `src/editors/` (e.g., `TextEditor.jsx`) — UI for authoring
2. A renderer in `src/renderers/` (e.g., `TextRenderer.jsx`) — preview display
3. A default template in `src/utils/defaultContent.js`

Both editors and renderers are dispatched through `src/components/ElementEditor.jsx` and `src/components/ElementRenderer.jsx` via switch/case on element type.

**Variable system:** Authors define variables (name, type, min/max range). In content, `{a}` is replaced at render time with a random generated value. `src/hooks/useVariables.js` manages this. `src/utils/generateRandomValues.js` generates values; `src/utils/mathRenderer.jsx` does the substitution and KaTeX rendering.

**Math rendering pipeline:**
```
generateRandomValues → replaceVariables → KaTeX (via MathText component)
```
The `MathText` component in `src/utils/mathRenderer.jsx` is the core rendering primitive used throughout all renderers. LaTeX inline uses `$...$` syntax.

### Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Root state, layout, exercise CRUD |
| `src/hooks/useExercises.js` | Supabase exercise fetch/save/delete |
| `src/hooks/useVariables.js` | Variable generation lifecycle |
| `src/hooks/useCorrection.js` | Answer checking logic |
| `src/utils/mathRenderer.jsx` | `MathText` component + variable substitution |
| `src/utils/defaultContent.js` | Default element content templates |
| `src/utils/exportUtils.js` | JSON export/import, exercise validation |
| `src/constants/index.js` | Chapters, competencies, element type list |
| `src/supabaseClient.js` | Anon key client (read operations) |
| `src/supabaseAdmin.js` | Service role client (admin/write operations) |
| `src/pages/TaxonomyManager.jsx` | Admin UI for chapters and competencies |

### Adding a New Element Type

1. Create `src/editors/MyTypeEditor.jsx`
2. Create `src/renderers/MyTypeRenderer.jsx` — use `MathText` for any text with LaTeX/variables
3. Add default content in `src/utils/defaultContent.js`
4. Register in `src/components/ElementEditor.jsx` and `src/components/ElementRenderer.jsx`
5. Add the type constant in `src/constants/index.js`

### Supabase

Two clients exist intentionally: `supabaseClient` (anon key, RLS enforced) for public reads, `supabaseAdmin` (service role, bypasses RLS) for taxonomy management. Environment variables are in `.env`: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SUPABASE_SERVICE_ROLE_KEY`.
