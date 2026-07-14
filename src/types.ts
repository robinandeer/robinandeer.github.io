export interface Frontmatter {
	title: string;
	intro?: string;
	date: string;
	/** Used for related posts and listing; many older posts use this */
	category?: string;
	tags?: string;
	author?: string;
	image?: string;
	imageAlt?: string;
	imageWidth?: number;
	imageHeight?: number;
	/** e.g. /images/my-post/poster.webm — post page + homepage featured card; `image` stays OG/social + fallback */
	imageVideo?: string;
	playVideoLoops?: number;
	draft?: boolean;
	/** Multi-part series — use with `seriesSlug` */
	series?: string;
	/** URL segment for ` /blog/series/[seriesSlug] `, shared by all parts */
	seriesSlug?: string;
	/** Order in series; when missing, order falls back to `date` */
	seriesIndex?: number;
	/** Shown in series index / footer; optional, duplicate across parts is fine */
	seriesDescription?: string;
	/** When set, blog index links here instead of /blog/[slug] */
	externalUrl?: string;
	/** Short label for the blog index (e.g. SV, 日本語) */
	languageLabel?: string;
	/** Override word-count estimate for listing */
	readingTimeMinutes?: number;
}
