# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm run dev      # Start dev server (http://localhost:5173, auto-opens browser)
npm run build    # TypeScript type-check + Vite production build to dist/
npm run preview  # Preview production build locally
npm run lint     # ESLint across entire project
```

No test framework is configured.

## Project rules

Detailed project rules are in the `rules/` directory:
- `rules/command-execution.md` — commands that can be auto-executed without asking for confirmation

## Architecture

**Tech stack**: React 18, TypeScript strict, Vite 5, Tailwind CSS 3 (class-based dark mode), Ant Design 5 (Chinese locale), React Router v6, react-markdown + remark-gfm.

The app is a personal blog/knowledge site (Chinese). No backend — all content is static.

**Provider hierarchy** (`src/App.tsx`):
```
ThemeProvider → AntdProvider (reads theme context, applies darkAlgorithm + custom tokens) → RouterProvider
```

**Theme** (`src/context/ThemeContext.tsx`) is the only global state. Defaults to `'dark'`, persists to `localStorage`, toggles the `dark` class on `<html>`. No Redux or other state libraries.

**Routing** (`src/router/index.tsx`) uses `createBrowserRouter`. All pages are `lazy()` loaded and wrapped in `<Suspense>` via `withSuspense()`. `MainLayout` renders Header + Outlet + Footer (no Sidebar in the active layout).

**Styling uses two approaches**: Tailwind utility classes (pages, layout, Card) and CSS Modules (`Button/` component). Inline `<style>` tags are used in Landing for dynamic CSS custom properties (cube sizing, rain color).

**Knowledge base** (`src/pages/Home.tsx`): loads Markdown files from `/public/content/` via `fetch()`. A `TocSidebar` component parses rendered headings for anchor navigation. react-markdown heading components are overridden to inject slugified `id` attributes.

**Landing page** (`src/pages/Landing.tsx`): 3D rotating cube uses CSS custom properties driven by a `ResizeObserver` for responsive scaling. Number rain is 300 absolutely-positioned `<span>` elements with CSS animations. Both styles are in an inline `<style>` tag to support dynamic values.

## Naming conventions

- File names: camelCase (`Button.tsx`, `mainLayout.tsx`)
- Components: PascalCase (`Button`, `Card`, `MainLayout`)
- Variables/functions: camelCase (`handleClick`, `userName`)
- Constants: UPPER_CASE (`MAX_RETRY_COUNT`)

## Code constraints

- Function components + hooks only — never class components, never deprecated lifecycles
- Custom hooks must be prefixed with `use`
- TypeScript strict mode: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` all on
- ESLint: `react/react-in-jsx-scope` is off (React 18 JSX transform)
- Use JSDoc comments on functions/components; explain WHY not WHAT; comments in Chinese

## Styling rules

- **CSS Modules** (`*.module.css`): component-private styles, prevents style pollution
- **Tailwind CSS**: global utility classes, dark mode via `dark:` prefix
- Never write global CSS that could leak across components

## Adding new code

- **New page**: create in `src/pages/`, then add route in `src/router/index.tsx` — lazy loading is automatic
- **New shared component**: create directory `src/components/MyComponent/`, optionally add `MyComponent.module.css`, export from `src/components/index.ts`
- **New global style**: modify `src/styles/globals.css`, prefer Tailwind utilities
- **New utility**: add to `src/utils/index.ts` with clear TypeScript type annotations
- Avoid complex business logic inside components; extract to utils

## Coding Guidelines

1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.