import type {GetStaticPaths, GetStaticProps} from 'next';
import {getAllPosts, getSinglePost} from 'mdx/files';

import Anchor from 'components/anchor';
import BackLink from 'components/back-link';
import type {FC} from 'react';
import Image from 'next/image';
import IntroCard from 'components/intro-card';
import Link from 'next/link';
import {Post} from 'types';
import {SITE_URL} from 'config';
import SocialTags from 'components/social-tags';
import {getMDXComponent} from 'mdx-bundler/client';
import {useMemo} from 'react';

type Props = Post & { slug: string };

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
	if (params === undefined) {
		throw new Error('Params is undefined');
	}

	const slugParam = params.slug;
	if (!Array.isArray(slugParam)) {
		throw new Error('Slug is undefined');
	}

	const slug = slugParam.join('-');
	return {
		props: {
			...(await getSinglePost(slug)),
			slug,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = getAllPosts();

	return {
		paths: posts.map(item => ({params: {slug: item.slug.split('/')}})),
		fallback: false,
	};
};

const BlogPostPage: FC<Props> = ({code, meta, slug}) => {
	const Component = useMemo(() => getMDXComponent(code), [code]);

	const pageTitle = `${meta.title} - Robin Andeer`;
	const pageUrl = `${SITE_URL}/blog/${slug}`;

	return (
		<div className='p-5 sm:p-6 flex flex-col gap-10 lg:gap-16'>
			<SocialTags title={pageTitle} description={meta.intro} url={pageUrl} type='article' image={meta.image}/>

			<header>
				<Link passHref href='/blog'>
					<BackLink>Posts</BackLink>
				</Link>
			</header>

			{meta.image && (
				<div className='max-w-4xl mx-auto w-full'>
					<Image
						src={meta.image}
						width={meta.imageWidth}
						height={meta.imageHeight}
						alt={meta.imageAlt || ''}/>
				</div>
			)}

			<div className='min-h-screen'>
				<article className='flex flex-col gap-10 lg:gap-16 max-w-2xl mx-auto'>
					<header className='flex flex-col gap-2'>
						<h1 className='text-3xl lg:text-5xl font-semibold lg:leading-tight'>{meta.title}</h1>
						<p className='text-xs lg:text-base font-medium text-gray-500 dark:text-gray-200 uppercase'>
							{new Date(meta.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
						</p>
					</header>
					<div className='prose prose-yellow dark:prose-light'>
						<Component components={{Image}}/>
					</div>
				</article>
			</div>
			<footer className='max-w-3xl mx-auto w-full'>
				<IntroCard>
					If you liked this post, <Anchor href={`https://twitter.com/intent/tweet?text=${meta.title} by @robinandeer&url=`}>tell me on Twitter</Anchor>!
				</IntroCard>
			</footer>
			<div className='h-10'/>
		</div>
	);
};

export default BlogPostPage;
