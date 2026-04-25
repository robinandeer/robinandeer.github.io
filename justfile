# Optional task runner: https://github.com/casey/just
# Install: brew install just   (or: cargo install just)
# Every recipe delegates to package.json — keep scripts there as the source of truth.

default:
	@just --list

dev:
	bun run dev

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
