/**
 * Site author — shared by the blog post byline, footer, and (optionally) other surfaces.
 * Swap `avatar` when a dedicated `public/avatar` asset is available.
 */
export const author = {
	name: 'Robin Andeer',
	shortBio:
		'Product engineer at Runway, building tools for human imagination. Writing about web development, React, and the craft of engineering.',
	socialHandle: 'robinandeer',
	socialProfileUrl: 'https://x.com/robinandeer',
	avatar: {
		src: '/images/live-avatars/narrator-reference.png',
		alt: 'Stylized illustration of the author in a teal hoodie',
		width: 1024,
		height: 1024,
	},
} as const;

export function formatPostDate(iso: string) {
	return new Date(iso).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}
