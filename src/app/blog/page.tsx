import { BackLink } from 'components/back-link';
import { getAllPostsMeta } from 'mdx/mdx.helpers';
import { Link } from 'next-view-transitions';

export const metadata = {
	title: 'Blog - Robin Andeer',
	description: 'Thoughts on programming, tech, and personal life.',
};

function groupPostsByYear(posts: Awaited<ReturnType<typeof getAllPostsMeta>>) {
	const groups = new Map<string, typeof posts>();
	for (const post of posts) {
		const year = new Date(post.date).getFullYear().toString();
		const existing = groups.get(year) ?? [];
		existing.push(post);
		groups.set(year, existing);
	}
	return groups;
}

export default async function BlogPage() {
	const posts = await getAllPostsMeta();
	const postsByYear = groupPostsByYear(posts);

	return (
		<div className='flex flex-col gap-8'>
			<header className='flex flex-col gap-4'>
				<Link href='/'>
					<BackLink>Home</BackLink>
				</Link>
				<h1 className='text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-50'>
					Blog
				</h1>
			</header>

			<div className='flex flex-col gap-10'>
				{Array.from(postsByYear).map(([year, yearPosts]) => (
					<section key={year} className='flex flex-col gap-1'>
						<h2 className='text-sm font-medium text-gray-400 dark:text-gray-500 mb-2'>
							{year}
						</h2>
						{yearPosts.map((post) => (
							<Link
								key={post.slug}
								href={`/blog/${post.slug}`}
								className='group flex items-baseline justify-between gap-4 py-2 -mx-3 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors'
							>
								<span
									className='font-medium text-gray-900 dark:text-gray-50 group-hover:text-accent-500 transition-colors'
									style={{
										viewTransitionName: `post-title-${post.slug.replaceAll('/', '-')}`,
									}}
								>
									{post.title}
								</span>
								<time className='text-sm text-gray-400 dark:text-gray-500 shrink-0 tabular-nums'>
									{new Date(post.date).toLocaleDateString('en-US', {
										month: 'short',
										day: 'numeric',
									})}
								</time>
							</Link>
						))}
					</section>
				))}
			</div>
		</div>
	);
}
