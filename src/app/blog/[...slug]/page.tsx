import Anchor from 'components/anchor';
import BackLink from 'components/back-link';
import IntroCard from 'components/intro-card';
import {SITE_URL} from 'config';
import {getAllPostsMeta, getPost} from 'mdx/mdx.helpers';
import Image from 'next/image';
import Link from 'next/link';
import path from 'path';

type Props = { params: { slug: string[] }};

export async function generateStaticParams() {
	const slugs = await getAllPostsMeta();
	return slugs.map(item => ({slug: item.slug.split('/')}));
}

export default async function BlogPostPage({params: {slug}}: Props) {
	const post = await getPost(slug.join('-'));

	return (
		<div className='p-5 sm:p-6 flex flex-col gap-10 lg:gap-16'>
			<header>
				<Link passHref href='/blog'>
					<BackLink>Posts</BackLink>
				</Link>
			</header>

			{post.image && (
				<div className='max-w-4xl mx-auto w-full'>
					<Image
						priority={true}
						src={post.image}
						width={post.imageWidth}
						height={post.imageHeight}
						alt={post.imageAlt || ''}/>
				</div>
			)}

			<div className='min-h-screen'>
				<article className='flex flex-col gap-10 lg:gap-16 max-w-2xl mx-auto'>
					<header className='flex flex-col gap-2'>
						<h1 className='text-3xl lg:text-5xl font-semibold lg:leading-tight'>{post.title}</h1>
						<p className='text-xs lg:text-base font-medium text-gray-500 dark:text-gray-200 uppercase'>
							{new Date(post.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
						</p>
					</header>
					<div className='prose prose-yellow dark:prose-light'>
						{post.content}
					</div>
				</article>
			</div>
			<footer className='max-w-3xl mx-auto w-full'>
				<IntroCard>
					If you liked this post, <Anchor href={`https://twitter.com/intent/tweet?text=${post.title} by @robinandeer&url=`}>tell me on Twitter</Anchor>!
				</IntroCard>
			</footer>
			<div className='h-10'/>
		</div>
	);
}

export async function generateMetadata({params: {slug}}: Props) {
	const post = await getPost(slug.join('-'));

	const title = `${post.title} - Robin Andeer`;
	const description = post.intro;
	const images = post.image ? [
		{
			url: path.join(SITE_URL, post.image),
			width: post.imageWidth,
			height: post.imageHeight,
			alt: post.imageAlt || '',
		},
	] : undefined;

	return {
		title,
		description,
		openGraph: {
			url: path.join(SITE_URL, 'blog', ...slug),
			type: 'article',
			publishedTime: post.date.toISOString(),
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
