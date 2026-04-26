export interface Frontmatter {
	title: string;
	intro?: string;
	date: string;
	image?: string;
	imageAlt?: string;
	imageWidth?: number;
	imageHeight?: number;
	/** e.g. /images/my-post/poster.webm — used on the post page only; `image` stays OG/social + fallback */
	imageVideo?: string;
	playVideoLoops?: number;
	draft?: boolean;
}
