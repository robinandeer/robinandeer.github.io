import { SITE_URL } from 'config';
import { getAllPostsMeta } from 'mdx/mdx.helpers';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getAllPostsMeta();

	const blogEntries = posts.map((post) => ({
		url: `${SITE_URL}/blog/${post.slug}`,
		lastModified: new Date(post.date),
	}));

	return [
		{ url: SITE_URL, lastModified: new Date() },
		{ url: `${SITE_URL}/blog`, lastModified: new Date() },
		{ url: `${SITE_URL}/cv`, lastModified: new Date() },
		...blogEntries,
	];
}
