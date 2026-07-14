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
├── data/          # Static content (beliefs, watching, site-connect, …)
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
- `src/components/runway-mark.tsx` + `public/icons/runway-mark.png` — Runway link mark on `/` (swap PNG if Runway rebrands)
- `src/components/site-header.tsx` / `site-footer.tsx` - global shell (logo + theme pill, footer glass card)
- `src/components/experience-list.tsx` - Background page job rows (accordion when `summary` / `stack` set)
- `src/data/site-connect.ts` - footer “Connect” URLs + `siteSourceRepoUrl`
- `src/components/scroll-to-top-button.tsx` - post pages only (`blog/[...slug]/layout.tsx`)
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
- **Optional poster loop:** put a short seamless loop next to the JPEG (e.g. `poster.webm` in the same folder). In post frontmatter add `imageVideo: /images/.../poster.webm` and optional `playVideoLoops` (default `2`). **`PostPosterMedia`:** **`playOnHover`** — on the **homepage featured card**, pass **`playOnHover`** so on **`(hover: hover)`** viewports the clip **loops while hovered**. On the **full post page**, omit it (**default**): **autoplay** **`playVideoLoops`** on load (muted `playsInline`) on all viewports including fine-pointer desktop. Touch / coarse-pointer without **`playOnHover`** still autoplays the timed run. **`prefers-reduced-motion`** keeps the static JPEG. Social/OG still use the JPEG.
- **Poster + video must match the same pixel width × height** (or the hero will jump when `object-cover` re-samples a different aspect ratio). H.264 `yuv420p` needs **even** width and height—if the JPEG is 1200×669, scale the poster to 1200×668 (or 670) and use that for both assets and `imageHeight`.

## Learned User Preferences

- **`SiteHeader`** dynamic-island pill and **`HomeCyclingHeading`** click/title stagger animation are explicitly valued homepage UX — preserve them unless redesigning deliberately.
- The **`md+`** spotlight next to GitHub is **Recent flicks** (**`recentFlicks`** in **`src/data/watching.ts`**) because Robin cares more about film than a reading list; don’t replace it with a books card unless Robin asks.

## Learned Workspace Facts

- Navigation uses `Link` from `next-view-transitions` (not `next/link`); root layout wraps `<html>` in `<ViewTransitions>`; root transitions are fade-only; shared element `viewTransitionName` only on blog list ↔ post page titles (not homepage)
- **Theme:** `next-themes` with `attribute="class"` on `<html>`; Tailwind `dark:` uses `@custom-variant dark` in `global.css` (class-based). **`SiteHeader`**: floating **dynamic-island** pill (**`.island-pill`** in **`global.css`** — inset highlight + soft depth + blur); **`SiteHeaderBack`** (animated width on non-`/` routes), home link (logo + first name), **`ThemeToggle`** nested chip (**inset shadow**). **`SiteHeaderBack`** fallbacks: **`/blog`** for posts, **`/`** for **`/blog`** index and other top-level pages. **`ThemeToggle`** idle shows the active mode; hover, focus-within, or touch expands light/dark/system (**system** uses `SunMoonIcon`); teal active styling when open; fine-pointer collapse is animated (inactive slots squeeze, then width; use **`bun run dev:webpack`** if Turbopack HMR misbehaves). On pick, blur asynchronously: capture **`const target = event.currentTarget`** before **`queueMicrotask`**, then **`target?.blur()`**—React clears **`event.currentTarget`** after the handler returns
- **Island surfaces (rog.ie-adjacent):** **`global.css`** **`.island-panel`** (+ **`--footer`** rounder radius) drives homepage cards (featured post, recent list wrapper, GitHub, recent flicks, **More**), footer shell, and **`SectionTitle`** pill chips on **`/`** — cohesive glass bubbles. **`.island-lift`** adds a tiny hover lift on the **featured post** card only (not GitHub or Recent flicks); **`.section-pill-playful`** is a soft overshoot scale on section pills. **`body`** uses very subtle **teal / pink / lavender** radial washes (light + dark)
- **Dev / HMR:** **`bun run dev`** or **`just dev`** → **[portless](https://portless.sh)** stable URL **`https://robinandeer.localhost`** (TLS; trust the local CA on first run). Under the hood **`portless`** runs script **`dev:app`** (`next dev`). Use **`bun run dev:app`** for plain **http://localhost:3000** without the proxy. Use **`bun run dev:webpack`** / **`just dev-webpack`** if Turbopack Fast Refresh stops updating; Cursor’s embedded Simple Browser preview often lags Next.js HMR—verify in a normal browser tab; **`next start`** does not hot-reload
- Homepage GitHub card: `GitHubHeatmap` from **`/api/github`** (GraphQL; needs **`GITHUB_TOKEN`**; client **`fetch`** uses **`cache: 'no-store'`**). Optional **`bun run generate-art`** → `public/generated/`; Runway **`textToImage`**: call **`waitForTaskOutput()`** on the promise from **`create()`**. Clear **`.next/cache/images`** if static assets look stale in dev
- `package.json` may use **`overrides`** for **`bun audit`**; **`.cursor/hooks/state/`** is gitignored (do not commit hook state or continual-learning index files)
- Biome: **`tailwindDirectives: true`** in **`biome.json`**. Color tokens: zinc neutrals (**`gray-50`**–**`gray-950`**) + teal accent (**`accent-400`** / **`500`** / **`600`**) in **`src/styles/global.css`** **`@theme`**
- Homepage: narrow **`max-w-2xl`** column—**`HomeCyclingHeading`** (inside **`h1`**) cycles **`homeDisplayLines`** in **`src/data/home-greetings.ts`** (**full phrases** per click, e.g. “Hey, I'm Robin …”, **`index`** wraps **`lines.length`**). **Letter-stagger** animates the whole line; **first session load** via **`sessionStorage`** **`robin-home-cycling-intro-v1`**; **`Intl.Segmenter`** when available. Then **rog.ie-style** body copy (two tight paragraphs): Runway/NYC + what you build on the web, then **`Background`** + personal beat + what the site is; **`RunwayMark`** (**`components/runway-mark.tsx`**) + **`public/icons/runway-mark.png`** (Runway site icon; replace if branding changes), **`LibraryIcon`** + Background. **Hero social nav** (`/` header): compact **glass pills** (footer-adjacent styling), **`ArrowUpRightIcon`** on outbound links, **`Link`** for RSS. Sections **featured post card** (no section label) → **Recent writing** (one **`island-panel`**: **`md+`** **3-column** grid with **`divide-x`** / small screens **`divide-y`**, editorial date treatment, **`Read`** affordance) → **`md+`** two-column row (**GitHub** heatmap | **Recent flicks** — up to **3** Letterboxd-linked rows from **`recentFlicks`**) → More; keep the latest blog post near the top
- **`SiteFooter`**: **`md+`** two-column grid — **Around the web** (vertical **connect list**: stacked label + handle, soft row hover, external **`ArrowUpRightIcon`** / RSS **`ArrowRightIcon`**) | **Repository** (underlined **Peek the repo** link + one-line blurb) + **Build** in a **nested tinted panel** (`<dl>` version / **`time dateTime`** / commit); **`lg:max-w-3xl`**; mobile stacks with top border before right column
- Blog **Writing** index: year column uses **`.blog-year-watermark`** (outlined stroke numerals in **`global.css`**) behind each year's posts
- Static data in **`src/data/`** (beliefs, background, watching, site-connect, author, …) imported by pages and cards; **`background.ts`** jobs may include **`summary`** and **`stack`** — those rows use expandable **`details`** via **`ExperienceList`** on **`/background`**; plain rows link out only
- **`HistoryBack`** (`router.back()` with **`href`** fallback on direct loads): wired through **`SiteHeaderBack`** in the header; **`BackLink`** component removed
- Beliefs page copy comes from personal interviews only; **`src/data/beliefs.ts`** holds user-sourced material only
- Homepage **More** island stacks **`DisclosureBlock`**s with light **`divide-y`** separators (matches Recent writing). Each block: grid **`0fr`→`1fr`** height easing, content fade + slight slide, overshoot chevron + **`group-open`** accent label; **`home-disclosure*`** in **`global.css`**
- Blog posts: **`PostAuthorByline`** / **`PostAuthorFooter`** + **`SiteLogoMark`**; copy from **`src/data/author.ts`**; optional **`intro`** in frontmatter is for SEO/RSS/home cards, not the article body; **`ScrollToTopButton`** on **`blog/[...slug]/layout.tsx`** only; **related:** **`getRelatedPostMetas`** (up to **2**), **`PostRelatedPosts`** two-column on **`sm+`**; **series:** optional **`series`** / **`seriesSlug`** / **`seriesIndex`** / **`seriesDescription`**, **`PostSeriesCallout`**, **`PostSeriesFooter`**, **`/blog/series/[slug]`**, helpers in **`mdx/mdx.helpers.tsx`**. **`getAllPostListMeta`** (no MDX body compile) powers **`/blog`**, **`feed.xml`**, **`sitemap.ts`** post URLs, and **`blog/[...slug]/generateStaticParams`**; full **`getPost`** / **`getAllPostsMeta`** only where the compiled post is needed. **Writing** archive: **`PostListMeta.readingTimeMinutes`** from frontmatter **`readingTimeMinutes`** or ~**200 wpm** estimate; optional **`languageLabel`** / **`externalUrl`**. Post footer back link label **Writing** (not “All posts”).
