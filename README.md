# robinandeer.com

My personal blog. Built with [Next.js](https://nextjs.org/) and deployed to [Vercel](https://vercel.com/) using the [Bun runtime](https://vercel.com/docs/functions/runtimes/bun).

## Getting started

```bash
bun install
bun run dev
```

Open **https://robinandeer.localhost** via [portless](https://portless.sh) (stable hostname; follow the trust-CA prompt on first run). To skip the proxy and use **http://localhost:3000** only: **`bun run dev:app`**. If you use [just](https://github.com/casey/just): **`just dev`** (same as **`bun run dev`**).

**Before pushing:** **`bun run check`** (lint + production build).

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
