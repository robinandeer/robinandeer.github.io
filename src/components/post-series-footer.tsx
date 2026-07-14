import { ArrowRightIcon, LayersIcon } from 'lucide-react';
import { getSeriesContextForPost } from 'mdx/mdx.helpers';
import { Link } from 'next-view-transitions';
import { cn } from 'utils/cn';

type PostSeriesFooterProps = {
	slug: string;
	series: string;
	seriesSlug: string;
};

/**
 * After article body: progress + optional “Up next” (or end-of-series message).
 */
export async function PostSeriesFooter({
	slug,
	series,
	seriesSlug,
}: PostSeriesFooterProps) {
	const ctx = await getSeriesContextForPost(slug, seriesSlug, series);
	if (ctx.total === 0) {
		return null;
	}

	const { currentIndex, total, next, description, members } = ctx;
	const seriesHref = `/blog/series/${seriesSlug}`;
	const progressPercent =
		total > 0 ? Math.round((currentIndex / total) * 100) : 0;

	return (
		<section
			className={cn(
				'not-prose relative overflow-hidden rounded-2xl',
				'pl-[15px] sm:pl-5',
				'ring-1 ring-inset ring-gray-200/70 dark:ring-gray-800/80',
				'bg-gradient-to-b from-white/95 via-amber-50/15 to-white/80',
				'dark:from-gray-900/50 dark:via-gray-950/40 dark:to-gray-950/70',
				"before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-accent-500/85 before:content-[''] dark:before:bg-accent-500/65",
			)}
			aria-labelledby='series-footer-heading'
		>
			<div className='border-b border-dashed border-gray-300/50 px-4 py-4 dark:border-gray-700/50 sm:px-5 sm:py-5'>
				<h2 id='series-footer-heading' className='sr-only'>
					Series: {series}
				</h2>
				<Link
					href={seriesHref}
					className='group inline-flex items-start gap-3 text-left transition-opacity hover:opacity-90'
				>
					<div
						className={cn(
							'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
							'bg-gray-100/95 text-gray-500 shadow-sm dark:bg-gray-800/90 dark:text-gray-400',
						)}
					>
						<LayersIcon className='h-4 w-4' aria-hidden />
					</div>
					<div className='min-w-0'>
						<p className='text-[11px] font-medium tracking-wide text-gray-500 dark:text-gray-500'>
							In this series
						</p>
						<p className='mt-0.5 text-balance font-semibold text-gray-900 group-hover:underline dark:text-gray-50'>
							{series}
						</p>
					</div>
				</Link>
				{description && (
					<p className='mt-3 text-pretty text-sm leading-relaxed text-gray-600 dark:text-gray-400'>
						{description}
					</p>
				)}
				<div className='mt-4 text-sm text-gray-500 tabular-nums dark:text-gray-500'>
					Part {currentIndex} of {total}
				</div>
				<div
					className='mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200/90 dark:bg-gray-800/90'
					role='progressbar'
					aria-valuemin={1}
					aria-valuenow={currentIndex}
					aria-valuemax={total}
					aria-label={`Part ${currentIndex} of ${total}`}
				>
					<div
						className='h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-400/95 transition-[width] dark:from-accent-500/90 dark:to-accent-400/80'
						style={{ width: `${progressPercent}%` }}
					/>
				</div>
			</div>

			{(next != null || total > 1) && (
				<div className='px-4 py-4 sm:px-5 sm:py-5'>
					{next ? (
						<>
							<p className='text-[11px] font-medium tracking-[0.14em] text-gray-500 uppercase dark:text-gray-500'>
								Next up
							</p>
							<Link
								href={`/blog/${next.slug}`}
								className='group/next mt-2 block -m-1 rounded-xl p-1 transition-colors hover:bg-white/70 dark:hover:bg-gray-900/40'
							>
								<p
									className='font-medium text-gray-900 underline decoration-transparent decoration-2 underline-offset-2 transition-[text-decoration-color] group-hover/next:decoration-accent-500/50 dark:text-gray-100 dark:group-hover/next:decoration-accent-400/50'
									style={{
										viewTransitionName: `post-title-${next.slug.replaceAll('/', '-')}`,
									}}
								>
									{next.title}
								</p>
								{next.intro && (
									<p className='mt-1 line-clamp-2 text-pretty text-sm text-gray-500 dark:text-gray-400'>
										{next.intro}
									</p>
								)}
							</Link>
						</>
					) : (
						<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								You&apos;ve reached the end of this series.
							</p>
							<Link
								href={seriesHref}
								className='inline-flex items-center gap-1 text-sm font-medium text-accent-600 dark:text-accent-400'
							>
								All {members.length} parts
								<ArrowRightIcon className='h-3.5 w-3.5' aria-hidden />
							</Link>
						</div>
					)}
				</div>
			)}
		</section>
	);
}
