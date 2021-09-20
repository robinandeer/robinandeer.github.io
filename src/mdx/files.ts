import fs from 'fs';
import {bundleMDX} from 'mdx-bundler';
import prism from 'remark-prism'
import autolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import matter from 'gray-matter';
import path from 'path';
import {Frontmatter, PostItem, Post} from 'types';

const POSTS_PATH = path.join(process.cwd(), 'posts');

function getAllPostFiles() {
	return fs
		.readdirSync(POSTS_PATH)
		.filter(fileName => /\.mdx?$/.test(fileName))
		.map(fileName => path.join(POSTS_PATH, fileName));
}

function slugifyPath(filePath: string): string {
	const fileName = filePath.split('/').pop()?.replace(/\.md$/, '');
	if (fileName === undefined) {
		throw new Error(`Invalid file path: ${filePath}`);
	}

	return [
		// @ts-ignore - missing spread operator
		...fileName.split('-').slice(0, 3),
		fileName.split('-').slice(3).join('-'),
	].join('/');
}

export async function getSinglePost(slug: string): Promise<Post> {
	const filePath = `${POSTS_PATH}/${slug}.md`;
	const source = fs.readFileSync(filePath, 'utf8');
	const {code, ...result} = await bundleMDX(source, {
		xdmOptions(options) {
			// @ts-ignore - incorrect plugin type
			options.remarkPlugins = [...(options.remarkPlugins ?? []), prism];
			options.rehypePlugins = [
				...(options.rehypePlugins ?? []),
				rehypeSlug,
				[autolinkHeadings, { behavior: 'append' }]
			];
			return options
		},
	});
	const frontmatter = result.frontmatter as Frontmatter;
	return {code, meta: {...frontmatter, date: frontmatter.date.toJSON()}};
}

export function getAllPosts(): Array<PostItem> {
	const files = getAllPostFiles();
	const slugs = files.map(filePath => slugifyPath(filePath));
	const sources = files.map(filePath => fs.readFileSync(filePath, 'utf8'));
	return sources
		.map((source, index) => {
			const result = matter(source);
			const data = result.data as Frontmatter;
			return {data, slug: slugs[index]};
		})
		.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
		.map<PostItem>(({data, slug}) => ({
			slug,
			meta: {
				...data,
				date: data.date.toJSON(),
			},
		}));
}
