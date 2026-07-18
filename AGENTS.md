# AGENTS.md

Instructions and context for AI coding assistants working on this project.

## Project Overview

Personal blog and portfolio site for Robin Andeer, built with Next.js and deployed on Vercel.

## Tech Stack

- **Runtime**: Bun
- **Framework**: Next.js 16 (App Router; Turbopack default)
- **Language**: TypeScript 7 (`experimental.useTypeScriptCli` in `next.config.ts`)
- **React**: 19 + **React Compiler** (`reactCompiler: true`)
- **Styling**: Tailwind CSS 4 (CSS-first config); UI font **Instrument Sans** (`next/font/google` → `--font-instrument-sans`)
- **Linting/Formatting**: Biome
- **Icons**: lucide-react
- **MDX**: next-mdx-remote with rehype-pretty-code (Shiki)

## Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # Reusable React components
├── data/          # Static content (beliefs, watching, site-connect, github-contributions, …)
├── mdx/           # MDX processing utilities
├── styles/        # Global CSS (Tailwind)
├── utils/         # Utility functions (cn, etc.)
├── site-version.ts # package.json version + `siteBuiltAtIso` (from `SITE_BUILD_TIME_ISO` at build) for footer
├── config.ts      # Site configuration
└── types.ts       # Shared TypeScript types
posts/             # Blog posts in Markdown
public/            # Static assets
```

## Commands

Workflows use **`package.json`** scripts. Optional **`just`** recipes in **`Justfile`** at repo root wrap the same commands ([just](https://github.com/casey/just): `brew install just`).

```bash
bun run dev          # [portless](https://portless.sh) — https://robinandeer.localhost (Next runs on an ephemeral PORT)
bun run dev:app      # Plain Next only — http://localhost:3000 (skip portless)
bun run dev:webpack  # Webpack bundler, no portless — use if Turbopack HMR misbehaves
bun run build        # Production build (includes TypeScript)
bun run check        # Lint + build (quick pre-push / CI parity)
bun run lint         # Check for issues (Biome)
bun run lint:fix     # Auto-fix issues
bun run format       # Format all files
bun run generate-art # Regenerate contribution artwork (needs env — see learned facts)

just                 # List just recipes
just dev             # Same as bun run dev (portless)
just dev-app         # Plain Next on :3000
just dev-webpack     # Same as bun run dev:webpack
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
- Prefer Server Components; keep `'use client'` only where interactivity requires it
- Rely on **React Compiler** for memoization — avoid adding `useMemo` / `useCallback` unless profiling says otherwise

### Icons

- Import lucide-react icons with `Icon` suffix: `GithubIcon`, `TwitterIcon`, etc.
- This clearly indicates these are icon components

### Images

- Prefer **`preload`** on LCP/`next/image` heroes (Next 16; `priority` deprecated). MDX images still accept legacy `priority` and map it to `preload`.

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
- `src/components/runway-mark.tsx` + `public/icons/runway-mark.png` — Runway link mark on `/` (swap PNG if Runway rebrands)
- `src/components/site-header.tsx` / `site-footer.tsx` - global shell (logo + theme pill, footer glass card)
- `src/components/experience-list.tsx` - Background page job rows (accordion when `summary` / `stack` set)
- `src/data/site-connect.ts` - footer “Connect” URLs + `siteSourceRepoUrl`
- `src/data/github-contributions.ts` - cached GitHub GraphQL heatmap data (`unstable_cache` / ~1h revalidate)
- `src/components/scroll-to-top-button.tsx` - post pages only (`blog/[...slug]/layout.tsx`)
- `src/utils/cn.ts` - className utility (clsx + tailwind-merge)
- `src/mdx/mdx.helpers.tsx` - MDX processing with syntax highlighting
- `biome.json` - Linting and formatting rules
- `next.config.ts` - Next.js configuration (`reactCompiler`, TypeScript CLI)

## Notes

- This project uses Biome instead of ESLint for faster linting
- Tailwind v4 uses CSS-based config (no `tailwind.config.js`)
- Blog posts are stored in `/posts` as Markdown files
- Syntax highlighting uses Shiki via rehype-pretty-code
- Personal-site ship workflow: **commit + push `master`** when asked; no feature branch / PR unless Robin asks. Don’t land Next auto-appended agent-rules blocks in routine commits.

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
- **Optional poster loop:** put a short seamless loop next to the JPEG (e.g. `poster.webm` in the same folder). In post frontmatter add `imageVideo: /images/.../poster.webm` and optional `playVideoLoops` (default `2`). **`PostPosterMedia`:** **`playOnHover`** — on the **homepage featured card**, pass **`playOnHover`** so on **`(hover: hover)`** viewports the clip **loops while hovered**. On the **full post page**, omit it (**default**): **autoplay** **`playVideoLoops`** on load (muted `playsInline`) on all viewports including fine-pointer desktop. Touch / coarse-pointer without **`playOnHover`** still autoplays the timed run. **`prefers-reduced-motion`** keeps the static JPEG. Social/OG still use the JPEG.
- **Poster + video must match the same pixel width × height** (or the hero will jump when `object-cover` re-samples a different aspect ratio). H.264 `yuv420p` needs **even** width and height—if the JPEG is 1200×669, scale the poster to 1200×668 (or 670) and use that for both assets and `imageHeight`.

## Learned User Preferences

- **`SiteHeader`** dynamic-island pill and **`HomeCyclingHeading`** click/title stagger animation are explicitly valued homepage UX — preserve them unless redesigning deliberately.
- The **`md+`** spotlight next to GitHub is **Recent flicks** (**`recentFlicks`** in **`src/data/watching.ts`**) because Robin cares more about film than a reading list; don’t replace it with a books card unless Robin asks.
- When Robin asks, start / stop / restart the local dev server (`just dev` / `bun run dev`); prefer **`just`** for restart. Do not refuse with the old “never start dev” habit.
- Personal site workflow: when asked to ship, **commit and push straight to `master`** — no feature branch / PR unless Robin asks. Don’t edit **`AGENTS.md`** for routine UI work; leave Next auto-appended agent-rules (and unrelated `AGENTS.md` churn) out of those commits.
- Homepage hover UX: **Recent flicks** rows use a **full-row** highlight (not a partial/inner chip). **More** **`DisclosureBlock`**s: **no** summary hover background and **no** open-state accent label color.
- **`/background`** Experience cards: open state keeps the logo at **full opacity**; expanded body padding should align with the title column.

## Learned Workspace Facts

- Navigation uses `Link` from `next-view-transitions` (not `next/link`); root layout wraps `<html>` in `<ViewTransitions>`; root transitions are fade-only; shared element `viewTransitionName` only on blog list ↔ post page titles (not homepage). **`HistoryBack`** (`router.back()` + **`href`** fallback) is wired through **`SiteHeaderBack`**; **`BackLink`** removed.
- **Theme:** `next-themes` with `attribute="class"` on `<html>`; Tailwind `dark:` uses `@custom-variant dark` in `global.css`. **`SiteHeader`**: floating **dynamic-island** pill (**`.island-pill`**); **`SiteHeaderBack`** (animated width on non-`/` routes; fallbacks **`/blog`** for posts, **`/`** otherwise), home link (logo + first name, no hover scale), **`ThemeToggle`** nested chip. Idle shows active mode; hover/focus-within/touch expands light/dark/system (**`SunMoonIcon`**); teal when open; fine-pointer collapse animated. On pick, capture **`event.currentTarget`** before **`queueMicrotask`** then **`blur()`**.
- **Island surfaces:** **`.island-panel`** (+ **`--footer`**) drives homepage cards, footer, **`SectionTitle`** pills. **`.island-lift`** only on the **featured post** card (not GitHub / Recent flicks). **`.section-pill-playful`** soft overshoot on section pills. **`body`**: subtle teal / pink / lavender radial washes.
- **Dev / HMR:** **`bun run dev`** / **`just dev`** → portless **`https://robinandeer.localhost`** (TLS). Plain **`bun run dev:app`** → **`:3000`**. **`bun run dev:webpack`** / **`just dev-webpack`** if Turbopack HMR stalls; verify in a normal browser tab; **`next start`** does not hot-reload. Kill stale **`next dev`** PIDs if portless fails with “another next dev server is already running.”
- Homepage GitHub card: server **`GitHubHeatmap`** (+ **`Suspense`** skeleton) via **`getGitHubHeatmapData()`** in **`src/data/github-contributions.ts`** (`unstable_cache` ~1h; needs **`GITHUB_TOKEN`**). **`/api/github`** reuses the same helper. Optional **`bun run generate-art`** → `public/generated/`; Runway **`textToImage`**: **`waitForTaskOutput()`** on **`create()`**. Clear **`.next/cache/images`** if assets look stale.
- Tooling: Biome **`tailwindDirectives: true`**; zinc + teal tokens in **`global.css`** **`@theme`**; **`package.json`** may use **`overrides`** for **`bun audit`**; **`.cursor/hooks/state/`** is gitignored (don’t commit continual-learning index / hook state). **`babel-plugin-react-compiler`** is a devDependency for `reactCompiler`.
- Homepage: **`max-w-2xl`**; **`HomeCyclingHeading`** cycles full phrases from **`home-greetings.ts`** (letter-stagger; session intro key **`robin-home-cycling-intro-v1`**). Body: Runway/NYC + craft, then Background + personal beat; **`RunwayMark`** + **`LibraryIcon`**. Hero socials: glass pills + outbound **`ArrowUpRightIcon`**. Sections: featured → Recent writing (**`md+`** 3-col) → GitHub | Recent flicks (up to **3**) → More (**`DisclosureBlock`**s, **`divide-y`**, height/`home-disclosure*` motion — no hover bg / open accent label).
- **`SiteFooter`**: **`md+`** two-column — Around the web (connect list) | Repository + Build nested panel; **`lg:max-w-3xl`**.
- Blog: Writing index year **`.blog-year-watermark`**; posts use **`PostAuthorByline`** / **`PostAuthorFooter`**, optional series helpers, **`getAllPostListMeta`** for list/feed/sitemap/params; **`ScrollToTopButton`** on post layout only; footer back label **Writing**. LCP posters use **`preload`** on **`next/image`**.
- Static data in **`src/data/`**; beliefs copy is interview-sourced only. **`background.ts`** jobs with **`summary`** / **`stack`** → expandable **`ExperienceList`** on **`/background`** (open = full logo opacity; body padding aligns with title); plain rows link out.
- **`/cv`**: print-friendly single-page resume (browser Save as PDF strips site chrome); keep out of sitemap / search indexing; prefer subtle light-mode / Vercel-adjacent polish over heavy redesign.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.
<!-- END:nextjs-agent-rules -->
