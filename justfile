# https://github.com/casey/just  —  brew install just
# Recipes call package.json; keep scripts there as source of truth.

default:
	@just --list

dev:
	bun run dev

# Next on http://localhost:3000 only (skip portless)
dev-app:
	bun run dev:app

# Use if `dev` stops hot-reloading (Turbopack HMR quirks on some setups)
dev-webpack:
	bun run dev:webpack

build:
	bun run build

start:
	bun run start

lint:
	bun run lint

lint-fix:
	bun run lint:fix

format:
	bun run format

# Lint then production build (good before push / CI parity)
check:
	bun run check

analyze:
	bun run analyze

generate-art:
	bun run generate-art
