import { SITE_URL } from 'config';
import { getAllPostListMeta, getAllSeriesSlugs } from 'mdx/mdx.helpers';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getAllPostListMeta();

	const blogEntries = posts.map((post) => ({
		url: `${SITE_URL}/blog/${post.slug}`,
		lastModified: new Date(post.date),
	}));

	const seriesSlugs = await getAllSeriesSlugs();
	const seriesEntries = seriesSlugs.map((slug) => ({
		url: `${SITE_URL}/blog/series/${slug}`,
		lastModified: new Date(),
	}));

	return [
		{ url: SITE_URL, lastModified: new Date() },
		{ url: `${SITE_URL}/blog`, lastModified: new Date() },
		{ url: `${SITE_URL}/beliefs`, lastModified: new Date() },
		{ url: `${SITE_URL}/background`, lastModified: new Date() },
		...blogEntries,
		...seriesEntries,
	];
}
