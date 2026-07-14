import { getAllPostListMeta, type PostListMeta } from 'mdx/mdx.helpers';
import { Link } from 'next-view-transitions';
import { cn } from 'utils/cn';

export const metadata = {
	title: 'Writing — Robin Andeer',
	description:
		'Essays and notes on front-end craft, product work, and longer detours.',
};

function groupPostsByYear(posts: Array<PostListMeta>) {
	const groups = new Map<string, Array<PostListMeta>>();
	for (const post of posts) {
		const year = new Date(post.date).getFullYear().toString();
		const existing = groups.get(year) ?? [];
		existing.push(post);
		groups.set(year, existing);
	}
	return groups;
}

export default async function BlogPage() {
	const posts = await getAllPostListMeta();
	const postsByYear = groupPostsByYear(posts);

	return (
		<div className='flex flex-col gap-12 sm:gap-16'>
			<header className='flex flex-col gap-2 sm:gap-3'>
				<h1 className='text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-50'>
					Writing
				</h1>
				<p className='max-w-xl text-[15px] leading-relaxed text-gray-500 dark:text-gray-400'>
					Longer notes — web platform, product bets, and rabbit holes worth
					finishing.
				</p>
			</header>

			<div className='flex flex-col gap-24 sm:gap-32'>
				{Array.from(postsByYear).map(([year, yearPosts]) => (
					<section
						key={year}
						className='relative flex flex-col gap-1 overflow-visible'
						aria-label={`Posts from ${year}`}
					>
						{/* Section-level watermark: overflow visible so glyphs aren’t clipped */}
						<span
							aria-hidden
							className={cn(
								'blog-year-watermark pointer-events-none absolute z-0 select-none',
								'-left-3 top-0 sm:-left-8',
								'-translate-x-2 -translate-y-[52%] sm:-translate-x-3 sm:-translate-y-[58%]',
								'font-semibold text-[5.5rem] leading-none tracking-tighter sm:text-8xl',
							)}
						>
							{year}
						</span>
						<h2 className='sr-only'>{year}</h2>
						<div className='relative z-10 flex flex-col gap-0.5 sm:gap-1'>
							{yearPosts.map((post) => {
								const titleClassName =
									'font-medium text-gray-900 dark:text-gray-50 transition-colors hover:text-accent-600 dark:hover:text-accent-400';

								return (
									<div
										key={post.slug}
										className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2.5 sm:py-3'
									>
										<div className='flex min-w-0 flex-1 items-baseline gap-2'>
											{post.languageLabel ? (
												<span className='shrink-0 rounded-md border border-gray-200/90 bg-gray-50/70 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-400'>
													{post.languageLabel}
												</span>
											) : null}
											{post.externalUrl ? (
												<a
													href={post.externalUrl}
													target='_blank'
													rel='noopener noreferrer'
													className={cn(
														titleClassName,
														'inline-flex min-w-0 items-center gap-1',
													)}
												>
													<span className='min-w-0'>{post.title}</span>
													<span
														className='shrink-0 text-gray-400 dark:text-gray-500'
														aria-hidden
													>
														↗
													</span>
												</a>
											) : (
												<Link
													href={`/blog/${post.slug}`}
													className={cn(titleClassName, 'min-w-0')}
													style={{
														viewTransitionName: `post-title-${post.slug.replaceAll('/', '-')}`,
													}}
												>
													{post.title}
												</Link>
											)}
										</div>
										<p className='shrink-0 text-sm tabular-nums text-gray-400 dark:text-gray-500'>
											<time dateTime={post.date}>
												{new Date(post.date).toLocaleDateString('en-US', {
													month: 'short',
													day: 'numeric',
												})}
											</time>
											<span
												className='mx-1.5 text-gray-300 dark:text-gray-600'
												aria-hidden
											>
												·
											</span>
											<span>{post.readingTimeMinutes} min</span>
										</p>
									</div>
								);
							})}
						</div>
					</section>
				))}
			</div>
		</div>
	);
}
