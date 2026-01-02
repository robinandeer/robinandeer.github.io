import fs from 'node:fs/promises';
import path from 'node:path';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { ReactElement } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import type { Frontmatter } from 'types';

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

export async function getPostMeta(filePath: string): Promise<PostMeta> {
	const source = await fs.readFile(filePath, 'utf8');
	const { content, frontmatter } = await compileMDX<Frontmatter>({
		source,
		components: {
			Image: (props: ImageProps) => <Image {...props} alt={props.alt ?? ''} />,
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
		// eslint-disable-next-line no-await-in-loop -- exit early on first non-draft post
		const post = await getPostMeta(postPath);
		if (IS_NOT_PRODUCTION_BUILD || !post.draft) {
			return post;
		}
	}

	throw new Error('Latest post not found');
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
