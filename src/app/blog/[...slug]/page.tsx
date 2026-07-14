import path from 'node:path';
import { PostAuthorByline } from 'components/post-author-byline';
import { PostAuthorFooter } from 'components/post-author-footer';
import { PostPosterMedia } from 'components/post-poster-media';
import { PostRelatedPosts } from 'components/post-related-posts';
import { PostSeriesCallout } from 'components/post-series-callout';
import { PostSeriesFooter } from 'components/post-series-footer';
import { SITE_URL } from 'config';
import {
	getAllPostListMeta,
	getPost,
	getRelatedPostMetas,
	getSeriesContextForPost,
	type SeriesContext,
} from 'mdx/mdx.helpers';
import Image from 'next/image';

export async function generateStaticParams() {
	const posts = await getAllPostListMeta();
	return posts.map((item) => ({ slug: item.slug.split('/') }));
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: Array<string> }>;
}) {
	const { slug } = await params;
	const post = await getPost(slug.join('-'));
	const relatedPosts = await getRelatedPostMetas(post.slug, {
		category: post.category,
	});
	let seriesContext: SeriesContext | null = null;
	if (post.series != null && post.seriesSlug != null) {
		seriesContext = await getSeriesContextForPost(
			post.slug,
			post.seriesSlug,
			post.series,
		);
	}
	/** One discovery block: series card or related, not both (related shows if no series or empty series) */
	const showSeriesFooter = Boolean(seriesContext && seriesContext.total > 0);
	const showRelatedPosts = !showSeriesFooter;

	return (
		<article className='post-article-enter flex flex-col'>
			<div className='flex flex-col gap-8'>
				<header className='flex flex-col gap-6'>
					<div className='flex flex-col gap-3'>
						<h1
							className='text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-50 leading-tight'
							style={{ viewTransitionName: `post-title-${slug.join('-')}` }}
						>
							{post.title}
						</h1>
						<PostAuthorByline date={post.date} />
					</div>
				</header>

				{post.series && post.seriesSlug && (
					<PostSeriesCallout
						series={post.series}
						seriesSlug={post.seriesSlug}
					/>
				)}

				{post.image &&
					(post.imageVideo ? (
						<PostPosterMedia
							image={post.image}
							imageWidth={post.imageWidth}
							imageHeight={post.imageHeight}
							imageAlt={post.imageAlt || ''}
							imageVideo={post.imageVideo}
							playVideoLoops={post.playVideoLoops}
						/>
					) : (
						<Image
							priority
							src={post.image}
							width={post.imageWidth}
							height={post.imageHeight}
							alt={post.imageAlt || ''}
							className='rounded-lg'
						/>
					))}

				<div className='prose prose-gray dark:prose-invert prose-code:before:content-none prose-code:after:content-none max-w-none'>
					{post.content}
				</div>
			</div>

			<div className='mt-12 flex flex-col gap-10 border-t border-gray-200/80 pt-10 dark:border-gray-800 sm:mt-16 sm:pt-12'>
				{showSeriesFooter && post.series && post.seriesSlug && (
					<PostSeriesFooter
						slug={post.slug}
						series={post.series}
						seriesSlug={post.seriesSlug}
					/>
				)}

				{showRelatedPosts && <PostRelatedPosts posts={relatedPosts} />}

				<PostAuthorFooter postTitle={post.title} slug={slug} />
			</div>
		</article>
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: Array<string> }>;
}) {
	const { slug } = await params;
	const post = await getPost(slug.join('-'));

	const title = `${post.title} - Robin Andeer`;
	const description = post.intro ?? post.title;
	const images = post.image
		? [
				{
					url: [SITE_URL, post.image].join(''),
					width: post.imageWidth,
					height: post.imageHeight,
					alt: post.imageAlt || '',
				},
			]
		: undefined;

	return {
		title,
		description,
		openGraph: {
			url: `${SITE_URL}/${path.join('blog', ...slug)}`,
			type: 'article',
			publishedTime: post.date,
			images,
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images,
		},
	};
}
