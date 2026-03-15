import path from 'node:path';
import { Anchor } from 'components/anchor';
import { BackLink } from 'components/back-link';
import { HistoryBack } from 'components/history-back';
import { SITE_URL } from 'config';
import { ArrowUpRightIcon } from 'lucide-react';
import { getAllPostsMeta, getPost } from 'mdx/mdx.helpers';
import Image from 'next/image';
import { Link } from 'next-view-transitions';

export async function generateStaticParams() {
	const slugs = await getAllPostsMeta();
	return slugs.map((item) => ({ slug: item.slug.split('/') }));
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: Array<string> }>;
}) {
	const { slug } = await params;
	const post = await getPost(slug.join('-'));

	return (
		<article className='flex flex-col gap-8'>
			<header className='flex flex-col gap-6'>
				<HistoryBack fallback='/blog'>
					<BackLink>Back</BackLink>
				</HistoryBack>

				<div className='flex flex-col gap-2'>
					<h1
						className='text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-50 leading-tight'
						style={{ viewTransitionName: `post-title-${slug.join('-')}` }}
					>
						{post.title}
					</h1>
					<time className='text-sm text-gray-400 dark:text-gray-500'>
						{new Date(post.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</time>
				</div>
			</header>

			{post.image && (
				<Image
					priority={true}
					src={post.image}
					width={post.imageWidth}
					height={post.imageHeight}
					alt={post.imageAlt || ''}
					className='rounded-lg'
				/>
			)}

			<div className='prose prose-gray dark:prose-invert prose-code:before:content-none prose-code:after:content-none max-w-none'>
				{post.content}
			</div>

			<hr className='border-gray-200 dark:border-gray-800' />

			<footer className='flex items-center justify-between text-sm text-gray-400 dark:text-gray-500'>
				<Link
					href='/blog'
					className='hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
				>
					&larr; All posts
				</Link>
				<Anchor
					href={`https://x.com/intent/tweet?text=${encodeURIComponent(`${post.title} by @robinandeer`)}&url=${encodeURIComponent(`${SITE_URL}/blog/${slug.join('/')}`)}`}
					target='_blank'
					className='inline-flex items-center gap-1 no-underline! text-gray-400! dark:text-gray-500! hover:text-gray-600! dark:hover:text-gray-300! font-normal!'
				>
					Share on X
					<ArrowUpRightIcon className='w-3.5 h-3.5' />
				</Anchor>
			</footer>
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
	const description = post.intro;
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
