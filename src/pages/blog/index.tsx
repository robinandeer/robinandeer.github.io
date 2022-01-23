import BackLink from 'components/back-link';
import type {FC} from 'react';
import type {GetStaticProps} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type {PostItem} from 'types';
import {SITE_URL} from 'config';
import SocialTags from 'components/social-tags';
import {getAllPosts} from 'mdx/files';

const PAGE_TITLE = 'Blog - Robin Andeer';
const PAGE_DESCRIPTION = 'Thoughts on programming, tech, and personal life.';
const PAGE_URL = `${SITE_URL}/blog`;

interface Props {
  posts: Array<PostItem>
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const posts = getAllPosts();
	return {
		props: {posts},
	};
};

const Blog: FC<Props> = ({posts}) => (
	<div className="p-5 sm:p-6 flex flex-col gap-5 sm:gap-6">
		<SocialTags title={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} type="website"/>

		<header>
			<Link passHref href="/">
				<BackLink>Home</BackLink>
			</Link>
		</header>

		<main className="flex flex-col gap-5 sm:gap-6 items-center">
			{posts.map(({slug, meta}) => (
				<Link key={slug} href={`/blog/${slug}`}>
					<a className="group max-w-lg w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-opacity-50 rounded-lg">
						<div className="card padded group-hover:bg-gray-50 dark:group-hover:bg-gray-600 transform transition-all group-hover:-translate-y-1 active:translate-y-0 flex flex-col gap-4">
							{meta.image
								? <Image src={meta.image} alt={meta.imageAlt} width={meta.imageWidth} height={meta.imageHeight} className="rounded-lg"/>
								: null}

							<div className="flex flex-col gap-px">
								<p className="text-xs font-medium text-gray-500 dark:text-gray-200 uppercase">
									{new Date(meta.date).toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'})}
								</p>

								<h2 className="text-base font-medium text-gray-900 dark:text-gray-50 active:bg-op">
									{meta.title}
								</h2>

								{meta.intro ? (
									<p className="text-base text-gray-500 dark:text-gray-200 font-normal">
										{meta.intro}
									</p>
								) : null}
							</div>
						</div>
					</a>
				</Link>
			))}
		</main>
	</div>
);

export default Blog;
