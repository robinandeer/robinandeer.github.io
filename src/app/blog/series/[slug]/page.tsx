import { SITE_URL } from 'config';
import { formatPostDate } from 'data/author';
import {
	getAllSeriesSlugs,
	getSeriesMembers,
	type PostListMeta,
} from 'mdx/mdx.helpers';
import { notFound } from 'next/navigation';
import { Link } from 'next-view-transitions';

export async function generateStaticParams() {
	const slugs = await getAllSeriesSlugs();
	return slugs.map((slug) => ({ slug }));
}

function seriesPartLabel(post: PostListMeta, listIndex: number) {
	if (post.seriesIndex != null) {
		return `Part ${post.seriesIndex}`;
	}
	return `Part ${listIndex + 1}`;
}

function seriesTitleFromMembers(members: Array<PostListMeta>, slug: string) {
	return members[0]?.series || slug;
}

function seriesDescription(members: Array<PostListMeta>) {
	return members.map((m) => m.seriesDescription).find((d) => d && d.length > 0);
}

type PageParams = { params: Promise<{ slug: string }> };

export default async function BlogSeriesPage({ params }: PageParams) {
	const { slug } = await params;
	const members = await getSeriesMembers(slug);
	if (members.length === 0) {
		notFound();
	}
	const title = seriesTitleFromMembers(members, slug);
	const desc = seriesDescription(members);

	return (
		<div className='flex flex-col gap-8'>
			<header className='flex flex-col gap-4'>
				<div>
					<p className='text-sm font-medium text-gray-400 dark:text-gray-500'>
						Series
					</p>
					<h1 className='mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-50'>
						{title}
					</h1>
					{desc && (
						<p className='mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-400'>
							{desc}
						</p>
					)}
				</div>
			</header>

			<ol className='flex list-none flex-col gap-0 not-prose'>
				{members.map((post, i) => (
					<li
						key={post.slug}
						className='border-b border-gray-200/80 py-3 first:pt-0 last:border-b-0 dark:border-gray-800'
					>
						<Link
							href={`/blog/${post.slug}`}
							className='group flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4'
						>
							<span
								className='font-medium text-gray-900 group-hover:text-accent-500 dark:text-gray-50'
								style={{
									viewTransitionName: `post-title-${post.slug.replaceAll('/', '-')}`,
								}}
							>
								<span className='text-gray-400 dark:text-gray-500'>
									{seriesPartLabel(post, i)}:{' '}
								</span>
								{post.title}
							</span>
							<time
								className='shrink-0 text-sm text-gray-400 dark:text-gray-500 tabular-nums'
								dateTime={post.date}
							>
								{formatPostDate(post.date)}
							</time>
						</Link>
					</li>
				))}
			</ol>
		</div>
	);
}

export async function generateMetadata({ params }: PageParams) {
	const { slug } = await params;
	const members = await getSeriesMembers(slug);
	if (members.length === 0) {
		return { title: 'Not found' };
	}
	const title = seriesTitleFromMembers(members, slug);
	return {
		title: `${title} (series) - Robin Andeer`,
		description:
			seriesDescription(members) ?? `Posts in the “${title}” series.`,
		openGraph: {
			url: `${SITE_URL}/blog/series/${slug}`,
			title,
		},
	};
}
