# AGENTS.md

Instructions and context for AI coding assistants working on this project.

## Project Overview

Personal blog and portfolio site for Robin Andeer, built with Next.js and deployed on Vercel.

## Tech Stack

- **Runtime**: Bun
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4 (CSS-first config)
- **Linting/Formatting**: Biome
- **Icons**: lucide-react
- **MDX**: next-mdx-remote with rehype-pretty-code (Shiki)

## Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # Reusable React components
├── mdx/           # MDX processing utilities
├── styles/        # Global CSS (Tailwind)
├── utils/         # Utility functions (cn, etc.)
├── config.ts      # Site configuration
└── types.ts       # Shared TypeScript types
posts/             # Blog posts in Markdown
public/            # Static assets
```

## Commands

All workflows go through **`package.json` scripts** (terminal-only; no VS Code `launch.json` required). Optional **`just`** recipes in `justfile` call the same scripts—install with `brew install just` or see [just](https://github.com/casey/just).

```bash
bun run dev          # Start development server
bun run build        # Production build (includes TypeScript)
bun run check        # Lint + build (quick pre-push / CI parity)
bun run lint         # Check for issues (Biome)
bun run lint:fix     # Auto-fix issues
bun run format       # Format all files
bun run generate-art # Regenerate contribution artwork (needs env — see learned facts)

just                 # List just recipes (if `just` is installed)
just dev             # Same as bun run dev
just check           # Same as bun run check
```

For **multiple processes in one command** (e.g. API + web), npm’s **`npm-run-all`** (`run-p` / `run-s`) or **`concurrently`** are the usual approach; this repo only needs a single dev server, so `check` uses `&&` instead.

## Code Conventions

### TypeScript

- Inline prop types directly in function parameters (no separate interfaces for simple props)
- Use `type` imports for type-only imports
- Use `node:` protocol for Node.js built-in imports (e.g., `import fs from 'node:fs/promises'`)

### React Components

- Prefer function components with **named exports** (not default exports)
- Name event handlers by what they do, not with `handle` prefix
- Only subscribe to Zustand state that affects UI rendering

### Icons

- Import lucide-react icons with `Icon` suffix: `GithubIcon`, `TwitterIcon`, etc.
- This clearly indicates these are icon components

### Styling

- Tailwind CSS 4 with CSS-first configuration
- Custom theme defined in `src/styles/global.css` using `@theme`
- Use `@apply` sparingly, prefer utility classes in JSX
- Use `cn()` utility for className composition (clsx + tailwind-merge)

### Formatting

- Tabs for indentation
- Single quotes for strings and JSX attributes
- No semicolons (handled by Biome)

## File Naming

- React components: kebab-case (`intro-card.tsx`)
- Utilities/helpers: kebab-case (`mdx.helpers.tsx`)
- Pages: lowercase with Next.js conventions (`page.tsx`, `layout.tsx`)
- Config files: TypeScript or ESM when possible (`next.config.ts`, `postcss.config.mjs`)

## Important Files

- `src/styles/global.css` - Tailwind theme and custom styles
- `src/utils/cn.ts` - className utility (clsx + tailwind-merge)
- `src/mdx/mdx.helpers.tsx` - MDX processing with syntax highlighting
- `biome.json` - Linting and formatting rules
- `next.config.ts` - Next.js configuration

## Notes

- This project uses Biome instead of ESLint for faster linting
- Tailwind v4 uses CSS-based config (no `tailwind.config.js`)
- Blog posts are stored in `/posts` as Markdown files
- Syntax highlighting uses Shiki via rehype-pretty-code

## Illustration Style

House style for blog post poster images. Goal: a recognizable, recurring visual identity that matches the site's tone (warm, personal, informal) — not stock photos, not slick gradients, not generic AI-generated 3D renders.

### Vibe

- Soft hand-drawn line work, slightly wobbly — never perfectly clean strokes
- Cozy and warm, **not** retro-cute, not children's-book, not chibi
- Cute is fine, but lean grown-up and a touch reflective
- Always **literal** — depict the actual scene from the post, never abstract metaphor

### Palette

- Site uses zinc neutrals + teal accent (`accent-400/500/600`); illustrations should harmonize, not clash
- Working palette: muted teal (primary, hoodie/accent), terracotta/clay (secondary), warm wood tones, off-white/cream
- **Background:** site has both light and dark modes — pure cream backgrounds look wrong in dark mode. Prefer:
  1. Transparent PNG (scene floats on the page) — most flexible
  2. Soft warm parchment that reads as a "card" tone in both modes
  - Avoid pure white or pure cream as a flat fill behind the scene

### Recurring Character (the narrator)

A stylized version of Robin — not a literal portrait, more a consistent "narrator" character that shows up across posts.

Locked traits:
- Blue eyes (always, this is the focal point)
- Teal hoodie (matches site accent)
- Curly hair (preferred over straight)
- No glasses (post-LASIK)
- Early 30s, slim build, fair skin

TBD (pick one variant — see chat for proposals): hair color (dark brown / sandy blonde / auburn).

**Reference image in the repo (use for new posters):** `public/images/live-avatars/narrator-reference.png` — the canonical “narrator” look; align generated art to this, not a one-off DALL·E face each time.

### Composition

- Centered scene with breathing room around it — never edge-to-edge
- Furniture, plants, mug, laptop, etc. used as supporting cast — establishes "domestic / personal workspace" feeling
- Consistent props across illustrations build the world (same chair, same mug, same plant)

### Don'ts

- No glasses on the character
- No retro / vintage / 80s nostalgia styling
- No glossy 3D renders or chrome
- No abstract or metaphorical imagery — always show the literal scene
- No stock-photo-style realism

### Storage

- **Per post:** `public/images/<post-slug>/poster.jpg` (e.g. `public/images/ai-faces/poster.jpg` → `/images/ai-faces/poster.jpg` in frontmatter)
- **Series / multi-part posts:** a stable folder under `public/images/<series>/` is fine (e.g. `public/images/live-avatars/poster.jpg` for the live-avatar series, with `narrator-reference.png` in the same folder for character consistency)
- Export a **web-sized** JPEG (about 1200px wide; ~100–200 KB) for the path referenced in frontmatter; set `imageWidth` / `imageHeight` to the **actual** pixel dimensions of that file
- **Optional poster loop (blog post page only):** put a short seamless loop next to the JPEG (e.g. `poster.webm` in the same folder). In post frontmatter add `imageVideo: /images/.../poster.webm` and optional `playVideoLoops` (default `2`). The player is `muted` + `playsInline` for autoplay; `prefers-reduced-motion` keeps the static `image`. Social/OG still use the JPEG.
- **Poster + video must match the same pixel width × height** (or the hero will jump when `object-cover` re-samples a different aspect ratio). H.264 `yuv420p` needs **even** width and height—if the JPEG is 1200×669, scale the poster to 1200×668 (or 670) and use that for both assets and `imageHeight`.

## Learned Workspace Facts

- Navigation uses `Link` from `next-view-transitions` (not `next/link`); root layout wraps `<html>` in `<ViewTransitions>`; view transitions are fade-only at root; shared element `viewTransitionName` only on blog list ↔ post page titles (not homepage)
- Homepage GitHub card uses `GitHubHeatmap`: a familiar contribution grid (last 12 weeks, teal intensity levels) from `/api/github`. Optional `bun run generate-art` + `scripts/generate-contribution-art.ts` write to `public/generated/` (weekly GitHub Action); for Runway `textToImage`, call `waitForTaskOutput()` on the promise returned by `create()` (not the awaited value). Face or artist-style refs can trigger moderation; clear `.next/cache/images` if static assets look stale in dev
- `package.json` may use `overrides` (e.g. `yaml`) to satisfy `bun audit` for transitive dependencies; `.cursor/hooks/state/` is gitignored—do not commit local hook or continual-learning index files
- Biome CSS linting is enabled with `tailwindDirectives: true` in `biome.json`
- Color tokens use zinc-based neutrals (`gray-50` through `gray-950`) and teal accent (`accent-400`, `accent-500`, `accent-600`) defined in `src/styles/global.css` `@theme`
- Dev server runs via `portless` for stable local URL (`robinandeer.localhost:1355`); configured in `.vscode/launch.json`
- Static data lives in `src/data/` (beliefs.ts, background.ts, reading.ts) and is imported by both pages and homepage cards
- Homepage is a 3-column bento grid with `GlowCard` (subtle cursor glow), `StaggerGrid` (first-visit stagger animation), glassmorphic cards, and `grid-flow-dense` for asymmetric layout
- Homepage content hierarchy: hero → featured/latest post → recent posts → everything else; the latest blog post must stay near the top
- `/api/github` route fetches GitHub contribution data via GraphQL; requires `GITHUB_TOKEN` env var; client fetch must use `cache: 'no-store'`
- `HistoryBack` component wraps back links with `router.back()` for context-aware navigation; falls back to `href` for direct visits
- Beliefs page content comes from personal interviews with the user, not AI-generated platitudes; `src/data/beliefs.ts` should only contain user-sourced material
