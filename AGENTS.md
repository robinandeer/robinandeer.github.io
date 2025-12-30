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

### React Components

- Prefer function components
- Name event handlers by what they do, not with `handle` prefix
- Only subscribe to Zustand state that affects UI rendering

### Icons

- Import lucide-react icons with `Icon` suffix: `GithubIcon`, `TwitterIcon`, etc.
- This clearly indicates these are icon components

### Styling

- Tailwind CSS 4 with CSS-first configuration
- Custom theme defined in `src/styles/global.css` using `@theme`
- Use `@apply` sparingly, prefer utility classes in JSX

### Formatting

- Tabs for indentation
- Single quotes for strings and JSX attributes
- No semicolons (handled by Biome)

## File Naming

- React components: PascalCase (`IntroCard.tsx`)
- Utilities/helpers: kebab-case (`mdx.helpers.tsx`)
- Pages: lowercase with Next.js conventions (`page.tsx`, `layout.tsx`)

## Important Files

- `src/styles/global.css` - Tailwind theme and custom styles
- `src/mdx/mdx.helpers.tsx` - MDX processing with syntax highlighting
- `biome.json` - Linting and formatting rules
- `next.config.js` - Next.js configuration

## Notes

- This project uses Biome instead of ESLint for faster linting
- Tailwind v4 uses CSS-based config (no `tailwind.config.js`)
- Blog posts are stored in `/posts` as Markdown files
- Syntax highlighting uses Shiki via rehype-pretty-code

