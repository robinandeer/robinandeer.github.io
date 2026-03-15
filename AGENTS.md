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

```bash
bun run dev        # Start development server
bun run build      # Production build
bun run lint       # Check for issues (Biome)
bun run lint:fix   # Auto-fix issues
bun run format     # Format all files
```

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

## Learned Workspace Facts

- Navigation links use `Link` from `next-view-transitions` (not `next/link`) for View Transition support
- Root layout wraps `<html>` in `<ViewTransitions>` from `next-view-transitions`
- Biome CSS linting is enabled with `tailwindDirectives: true` in `biome.json`
- Color tokens use zinc-based neutrals (`gray-50` through `gray-950`) and teal accent (`accent-400`, `accent-500`, `accent-600`) defined in `src/styles/global.css` `@theme`
- Dev server runs via `portless` for stable local URL (`robinandeer.localhost:1355`); configured in `.vscode/launch.json`
- Static data lives in `src/data/` (beliefs.ts, background.ts, reading.ts) and is imported by both pages and homepage cards
- Homepage is a 3-column bento grid with `GlowCard` (subtle cursor glow), `StaggerGrid` (first-visit stagger animation), glassmorphic cards, and `grid-flow-dense` for asymmetric layout
- Homepage content hierarchy: hero → featured/latest post → recent posts → everything else; the latest blog post must stay near the top
- View transitions use fade-only for root; shared element `viewTransitionName` only on blog list ↔ post page titles (not homepage)
- `/api/github` route fetches GitHub contribution data via GraphQL; requires `GITHUB_TOKEN` env var; client fetch must use `cache: 'no-store'`
- `HistoryBack` component wraps back links with `router.back()` for context-aware navigation; falls back to `href` for direct visits
- Beliefs page content comes from personal interviews with the user, not AI-generated platitudes; `src/data/beliefs.ts` should only contain user-sourced material
