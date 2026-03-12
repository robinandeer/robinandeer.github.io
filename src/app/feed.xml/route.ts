import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from 'config';
import { getAllPostsMeta } from 'mdx/mdx.helpers';

export async function GET() {
	const posts = await getAllPostsMeta();

	const items = posts
		.map(
			(post) => `
		<item>
			<title><![CDATA[${post.title}]]></title>
			<link>${SITE_URL}/blog/${post.slug}</link>
			<guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
			${post.intro ? `<description><![CDATA[${post.intro}]]></description>` : ''}
		</item>`,
		)
		.join('');

	const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${SITE_TITLE}</title>
		<link>${SITE_URL}</link>
		<description>${SITE_DESCRIPTION}</description>
		<language>en-US</language>
		<atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
		${items}
	</channel>
</rss>`;

	return new Response(feed.trim(), {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
		},
	});
}
