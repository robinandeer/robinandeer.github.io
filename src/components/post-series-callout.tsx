import { LayersIcon } from 'lucide-react';
import { Link } from 'next-view-transitions';
import { cn } from 'utils/cn';

type PostSeriesCalloutProps = {
	series: string;
	seriesSlug: string;
};

/**
 * Shown under the byline when `series` + `seriesSlug` are set in frontmatter.
 * Visual match: theme toggle shell (`rounded-full`, border, h-9-sized row).
 */
export function PostSeriesCallout({
	series,
	seriesSlug,
}: PostSeriesCalloutProps) {
	return (
		<Link
			href={`/blog/series/${seriesSlug}`}
			className={cn(
				'not-prose inline-flex min-h-9 max-w-full items-center gap-2 px-2.5 py-1',
				'rounded-full border border-solid border-gray-200 bg-white',
				'transition-[border-color,background-color] duration-200 ease-out motion-reduce:transition-none',
				'hover:border-gray-300 hover:bg-gray-50/80',
				'dark:border-gray-700 dark:bg-gray-900',
				'dark:hover:border-gray-600 dark:hover:bg-gray-800/80',
			)}
		>
			<div
				className={cn(
					'flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full',
					'bg-gray-100/90 text-gray-500 dark:bg-gray-800/80 dark:text-gray-400',
				)}
			>
				<LayersIcon className='h-3.5 w-3.5 shrink-0' aria-hidden />
			</div>
			<div className='min-w-0 py-0.5 text-left leading-tight'>
				<p className='text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500'>
					Part of series
				</p>
				<p className='line-clamp-1 font-medium text-gray-900 dark:text-gray-100'>
					{series}
				</p>
			</div>
		</Link>
	);
}
