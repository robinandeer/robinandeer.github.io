import {getAllPosts, getSinglePost} from 'mdx/files';
import {useMemo} from 'react';
import {getMDXComponent} from 'mdx-bundler/client';
import {Post} from 'types';

import type {FC} from 'react';
import type {GetStaticPaths, GetStaticProps} from 'next';
// eslint-disable-next-line no-restricted-imports
import type {ParsedUrlQuery} from 'querystring';
import Link from 'next/link';
import Anchor from 'components/anchor';
import Image from 'next/image';
import IntroCard from 'components/intro-card';
import BackLink from 'components/back-link';
import SocialTags from 'components/social-tags';
import { SITE_URL } from 'config';

type Props = Post & { slug: string };

interface Params extends ParsedUrlQuery {
  slug: string[]
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({params}) => {
	if (params === undefined) {
		throw new Error('Params is undefined');
	}

	const slug = params.slug.join('-')
	return {
		props: {
			...(await getSinglePost(slug)),
			slug,
		},
	};
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const posts = getAllPosts();

	return {
		paths: posts.map(item => ({params: {slug: item.slug.split('/')}})),
		fallback: false,
	};
};

const BlogPostPage: FC<Props> = ({code, meta, slug}) => {
	const Component = useMemo(() => getMDXComponent(code), [code]);

	const pageTitle = `${meta.title} - Robin Andeer`
  const pageUrl = `${SITE_URL}/blog/${slug}`

	return (
		<div className="p-5 sm:p-6 flex flex-col gap-10 lg:gap-16">
			<SocialTags title={pageTitle} description={meta.intro} url={pageUrl} type="article" image={meta.image} />

			<header>
				<Link passHref href="/blog">
					<BackLink>Posts</BackLink>
				</Link>
			</header>

			{meta.image && (
				<div className="max-w-4xl mx-auto w-full">
					<Image
					src={meta.image}
					width={meta.imageWidth}
					height={meta.imageHeight}
					alt={meta.imageAlt} />
				</div>
				)
			}

			<div className="min-h-screen">
				<article className="flex flex-col gap-10 lg:gap-16 max-w-2xl mx-auto">
					<header className="flex flex-col gap-2">
						<h1 className="text-3xl lg:text-5xl font-semibold lg:leading-tight">{meta.title}</h1>
						<p className="text-xs lg:text-base font-medium text-gray-500 dark:text-gray-200 uppercase">
							{new Date(meta.date).toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'})}
						</p>
					</header>
					<div className="prose prose-yellow dark:prose-light">
						{/* @ts-ignore stop complaining about missing Image props */}
						<Component components={{Image}}/>
					</div>
				</article>
			</div>
			<footer className="max-w-3xl mx-auto w-full">
				<IntroCard>
					If you liked this post, <Anchor href={`https://twitter.com/intent/tweet?text=${meta.title} by @robinandeer&url=`}>tell me on Twitter</Anchor>!
				</IntroCard>
			</footer>
			<div className="h-10"/>
		</div>
	);
};

export default BlogPostPage;
