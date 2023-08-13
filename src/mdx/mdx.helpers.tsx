import Image, {type ImageProps} from 'next/image';
import rehypeSlug from 'rehype-slug';
import path from 'path';
import fs from 'fs/promises';
import {compileMDX} from 'next-mdx-remote/rsc';
import {type Frontmatter} from 'types';
// @ts-ignore
import rehypePrism from '@mapbox/rehype-prism';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const IS_NOT_PRODUCTION_BUILD = process.env.NODE_ENV !== 'production';
const POSTS_PATH = path.join(process.cwd(), 'posts');

async function getAllPostPaths() {
	const directories = await fs.readdir(POSTS_PATH);
	const posts = directories
		.filter(fileName => /\.mdx?$/.test(fileName))
		.reverse()
		.map(fileName => path.join(POSTS_PATH, fileName));

	return posts;
}

export async function getPostMeta(filePath: string) {
	const source = await fs.readFile(filePath, 'utf8');
	const {content, frontmatter} = await compileMDX({
		source,
		components: {
			Image: (props: ImageProps) => <Image {...props} alt={props.alt ?? ''} />,
		},
		options: {
			parseFrontmatter: true,
			mdxOptions: {
				rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, {behavior: 'append'}], rehypePrism],
			},
		},
	});

	const meta = frontmatter as unknown as Frontmatter;
	return {
		slug: slugifyPath(filePath),
		...meta,
		content,
	} as const;
}

export async function getPost(postId: string) {
	const filePath = `${POSTS_PATH}/${postId}.md`;
	return getPostMeta(filePath);
}

export async function getAllPostsMeta() {
	const allPosts = await getAllPostPaths();
	const allPostsMeta = await Promise.all(allPosts.map(getPostMeta));
	return allPostsMeta.filter(item => IS_NOT_PRODUCTION_BUILD || !item.draft);
}

export async function getLatestPostMeta() {
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
