import fs from 'node:fs/promises';
import path from 'node:path';
import Image from 'next/image';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { ReactElement } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import type { Frontmatter } from 'types';
import { cn } from 'utils/cn';
import { parse as parseYaml } from 'yaml';

const IS_NOT_PRODUCTION_BUILD = process.env.NODE_ENV !== 'production';
const POSTS_PATH = path.join(process.cwd(), 'posts');

async function getAllPostPaths(): Promise<Array<string>> {
	const directories = await fs.readdir(POSTS_PATH);
	const posts = directories
		.filter((fileName) => /\.mdx?$/.test(fileName))
		.reverse()
		.map((fileName) => path.join(POSTS_PATH, fileName));

	return posts;
}

export type PostMeta = Frontmatter & {
	slug: string;
	content: ReactElement;
};

/** Listing / related posts — no MDX body (cheap at build time). */
export type PostListMeta = Frontmatter & {
	slug: string;
	/** YAML override or word-count estimate (~200 wpm) */
	readingTimeMinutes: number;
};

function mdxToDimension(value: unknown): number | undefined {
	if (value === null || value === undefined) {
		return undefined;
	}
	if (typeof value === 'number' && Number.isFinite(value)) {
		return value;
	}
	if (
		typeof value === 'string' &&
		value.trim() !== '' &&
		!Number.isNaN(Number(value))
	) {
		return Number(value);
	}
	return undefined;
}

type MdxImageProps = {
	src?: string;
	alt?: string;
	width?: unknown;
	height?: unknown;
	className?: string;
	layout?: string;
	priority?: boolean;
	preload?: boolean;
	unoptimized?: boolean;
	quality?: number;
	[key: string]: unknown;
};

/**
 * MDX can pass `width`/`height` as strings, omit them on edge paths, or pair with legacy
 * `layout` from older posts. Always coerce and never rely on a blind `{...rest}` to next/image.
 */
function MdxImage(props: MdxImageProps) {
	const {
		src,
		alt = '',
		width,
		height,
		className,
		layout,
		priority,
		preload,
		unoptimized,
		quality,
	} = props;

	if (typeof src !== 'string' || !src) {
		return null;
	}

	const w = mdxToDimension(width) ?? 1200;
	const h = mdxToDimension(height) ?? 800;

	return (
		<Image
			src={src}
			width={w}
			height={h}
			alt={String(alt)}
			preload={Boolean(preload ?? priority)}
			unoptimized={Boolean(unoptimized)}
			quality={typeof quality === 'number' ? quality : undefined}
			className={cn(
				layout === 'responsive' && 'h-auto w-full max-w-full',
				className,
			)}
			sizes='(max-width: 42rem) 100vw, 42rem'
		/>
	);
}

export async function getPostMeta(filePath: string): Promise<PostMeta> {
	const source = await fs.readFile(filePath, 'utf8');
	const { content, frontmatter } = await compileMDX<Frontmatter>({
		source,
		components: {
			Image: MdxImage,
		},
		options: {
			parseFrontmatter: true,
			mdxOptions: {
				rehypePlugins: [
					rehypeSlug,
					[rehypeAutolinkHeadings, { behavior: 'append' }],
					[rehypePrettyCode, { theme: 'github-dark' }],
				],
			},
		},
	});

	return {
		slug: slugifyPath(filePath),
		...frontmatter,
		content,
	};
}

export async function getPost(postId: string): Promise<PostMeta> {
	const filePath = `${POSTS_PATH}/${postId}.md`;
	return getPostMeta(filePath);
}

export async function getAllPostsMeta(): Promise<Array<PostMeta>> {
	const allPosts = await getAllPostPaths();
	const allPostsMeta = await Promise.all(allPosts.map(getPostMeta));
	return allPostsMeta.filter((item) => IS_NOT_PRODUCTION_BUILD || !item.draft);
}

export async function getLatestPostMeta(): Promise<PostMeta> {
	const allPosts = await getAllPostPaths();
	for (const postPath of allPosts) {
		const post = await getPostMeta(postPath);
		if (IS_NOT_PRODUCTION_BUILD || !post.draft) {
			return post;
		}
	}

	throw new Error('Latest post not found');
}

export async function getAllPostListMeta(): Promise<Array<PostListMeta>> {
	const paths = await getAllPostPaths();
	const metas = await Promise.all(
		paths.map(async (filePath) => {
			const raw = await fs.readFile(filePath, 'utf8');
			const data = parsePostFrontmatter(raw);
			if (!data) {
				throw new Error(`Missing or invalid frontmatter: ${filePath}`);
			}
			return {
				...data,
				slug: slugifyPath(filePath),
				readingTimeMinutes:
					data.readingTimeMinutes ?? estimateReadingMinutesFromSource(raw),
			} satisfies PostListMeta;
		}),
	);
	return metas.filter((item) => IS_NOT_PRODUCTION_BUILD || !item.draft);
}

/**
 * Up to 2 other posts, preferring the same `category`, then newest by date.
 */
export async function getRelatedPostMetas(
	currentSlug: string,
	options: { category?: string } = {},
): Promise<Array<PostListMeta>> {
	const all = await getAllPostListMeta();
	const others = all.filter((post) => post.slug !== currentSlug);
	const { category } = options;

	const byDate = (a: PostListMeta, b: PostListMeta) =>
		new Date(b.date).getTime() - new Date(a.date).getTime();

	const sameCategory = category
		? others.filter((post) => post.category === category).sort(byDate)
		: [];

	const picked: Array<PostListMeta> = [];
	const seen = new Set<string>();

	for (const post of sameCategory) {
		if (picked.length >= 2) {
			break;
		}
		picked.push(post);
		seen.add(post.slug);
	}
	for (const post of others.sort(byDate)) {
		if (picked.length >= 2) {
			break;
		}
		if (seen.has(post.slug)) {
			continue;
		}
		picked.push(post);
		seen.add(post.slug);
	}
	return picked;
}

/**
 * All posts in a series, ordered by `seriesIndex` then `date` (oldest first).
 */
export function sortSeriesMembers(
	members: Array<PostListMeta>,
): Array<PostListMeta> {
	return [...members].sort((a, b) => {
		const ai = a.seriesIndex;
		const bi = b.seriesIndex;
		if (ai != null && bi != null && ai !== bi) {
			return ai - bi;
		}
		if (ai != null && bi == null) {
			return -1;
		}
		if (ai == null && bi != null) {
			return 1;
		}
		return new Date(a.date).getTime() - new Date(b.date).getTime();
	});
}

export async function getSeriesMembers(
	seriesSlug: string,
): Promise<Array<PostListMeta>> {
	const all = await getAllPostListMeta();
	return sortSeriesMembers(
		all.filter((post) => post.seriesSlug === seriesSlug),
	);
}

export async function getAllSeriesSlugs(): Promise<Array<string>> {
	const all = await getAllPostListMeta();
	const slugs = new Set<string>();
	for (const post of all) {
		if (post.seriesSlug) {
			slugs.add(post.seriesSlug);
		}
	}
	return [...slugs].sort();
}

function pickSeriesDescription(
	members: Array<PostListMeta>,
): string | undefined {
	return members.map((m) => m.seriesDescription).find((d) => d && d.length > 0);
}

export type SeriesContext = {
	members: Array<PostListMeta>;
	seriesTitle: string;
	description: string | undefined;
	currentIndex: number;
	total: number;
	next: PostListMeta | null;
};

/**
 * Series membership and “next” for footer / callouts. `currentIndex` is 1-based.
 */
export async function getSeriesContextForPost(
	currentSlug: string,
	seriesSlug: string,
	seriesTitle: string,
): Promise<SeriesContext> {
	const members = await getSeriesMembers(seriesSlug);
	const idx = members.findIndex((m) => m.slug === currentSlug);
	const currentIndex = idx >= 0 ? idx + 1 : 1;
	const next = idx >= 0 && idx < members.length - 1 ? members[idx + 1]! : null;
	return {
		members,
		seriesTitle,
		description: pickSeriesDescription(members),
		currentIndex,
		total: members.length,
		next,
	};
}

function slugifyPath(filePath: string): string {
	const fileName = filePath.split('/').pop()?.replace(/\.md$/, '');
	if (fileName === undefined) {
		throw new Error(`Invalid file path: ${filePath}`);
	}

	return [
		...fileName.split('-').slice(0, 3),
		fileName.split('-').slice(3).join('-'),
	].join('/');
}

function parsePostFrontmatter(source: string): Frontmatter | null {
	const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!match) {
		return null;
	}
	try {
		const raw = parseYaml(match[1]) as Record<string, unknown>;
		return normalizeFrontmatter(raw);
	} catch {
		return null;
	}
}

function normalizeFrontmatter(
	raw: Record<string, unknown>,
): Frontmatter | null {
	const title = raw.title;
	if (typeof title !== 'string' || !title) {
		return null;
	}

	const dateRaw = raw.date;
	let date: string;
	if (dateRaw instanceof Date) {
		date = dateRaw.toISOString().slice(0, 10);
	} else if (typeof dateRaw === 'string' || typeof dateRaw === 'number') {
		date = String(dateRaw);
	} else {
		return null;
	}

	return {
		title,
		date,
		intro: typeof raw.intro === 'string' ? raw.intro : undefined,
		image: typeof raw.image === 'string' ? raw.image : undefined,
		imageAlt: typeof raw.imageAlt === 'string' ? raw.imageAlt : undefined,
		imageWidth: typeof raw.imageWidth === 'number' ? raw.imageWidth : undefined,
		imageHeight:
			typeof raw.imageHeight === 'number' ? raw.imageHeight : undefined,
		imageVideo: typeof raw.imageVideo === 'string' ? raw.imageVideo : undefined,
		playVideoLoops:
			typeof raw.playVideoLoops === 'number' ? raw.playVideoLoops : undefined,
		draft: raw.draft === true,
		category: typeof raw.category === 'string' ? raw.category : undefined,
		tags: normalizeTagsField(raw.tags),
		author: typeof raw.author === 'string' ? raw.author : undefined,
		series: typeof raw.series === 'string' ? raw.series : undefined,
		seriesSlug: typeof raw.seriesSlug === 'string' ? raw.seriesSlug : undefined,
		seriesIndex: normalizeSeriesIndex(raw.seriesIndex),
		seriesDescription:
			typeof raw.seriesDescription === 'string'
				? raw.seriesDescription
				: undefined,
		externalUrl:
			typeof raw.externalUrl === 'string' ? raw.externalUrl : undefined,
		languageLabel:
			typeof raw.languageLabel === 'string' ? raw.languageLabel : undefined,
		readingTimeMinutes: normalizeReadingTimeMinutes(raw.readingTimeMinutes),
	};
}

function normalizeReadingTimeMinutes(value: unknown): number | undefined {
	if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
		return Math.max(1, Math.round(value));
	}
	if (typeof value === 'string' && /^\d+$/.test(value)) {
		const n = parseInt(value, 10);
		return n > 0 ? n : undefined;
	}
	return undefined;
}

function estimateReadingMinutesFromSource(source: string): number {
	const stripped = source.replace(/^---\r?\n[\s\S]*?\r?\n---\s*/m, '');
	const words = stripped
		.trim()
		.split(/\s+/)
		.filter((w) => w.length > 0).length;
	return Math.max(1, Math.round(words / 200));
}

function normalizeSeriesIndex(value: unknown): number | undefined {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return value;
	}
	if (typeof value === 'string' && /^\d+$/.test(value)) {
		return parseInt(value, 10);
	}
	return undefined;
}

function normalizeTagsField(value: unknown): string | undefined {
	if (typeof value === 'string') {
		return value;
	}
	if (Array.isArray(value) && value.every((t) => typeof t === 'string')) {
		return value.join(', ');
	}
	return undefined;
}
