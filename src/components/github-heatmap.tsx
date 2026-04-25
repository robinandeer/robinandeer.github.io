'use client';

import { useEffect, useState } from 'react';
import { cn } from 'utils/cn';

type HeatmapData = {
	totalContributions: number;
	weeks: Array<Array<number>>;
};

function getLevel(count: number) {
	if (count === 0) return 0;
	if (count <= 2) return 1;
	if (count <= 5) return 2;
	if (count <= 10) return 3;
	return 4;
}

const WEEKS = 12;

const levelColors = [
	'bg-gray-100 dark:bg-gray-800',
	'bg-accent-400/25 dark:bg-accent-400/20',
	'bg-accent-400/45 dark:bg-accent-400/35',
	'bg-accent-400/70 dark:bg-accent-400/55',
	'bg-accent-500 dark:bg-accent-400/85',
];

export function GitHubHeatmap() {
	const [data, setData] = useState<HeatmapData | null>(null);

	useEffect(() => {
		fetch('/api/github', { cache: 'no-store' })
			.then((r) => (r.ok ? r.json() : null))
			.then(setData)
			.catch(() => {});
	}, []);

	const weeks = data?.weeks?.slice(-WEEKS) ?? [];
	const hasData = weeks.length > 0 && weeks.some((w) => w.some((c) => c > 0));
	const recentTotal = weeks.reduce(
		(sum, week) => sum + week.reduce((a, b) => a + b, 0),
		0,
	);

	return (
		<div className='flex flex-col gap-3 w-full min-w-0'>
			<div className='flex items-baseline justify-between gap-2'>
				<p className='text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider'>
					GitHub
				</p>
				{recentTotal > 0 && (
					<p className='text-[10px] text-gray-400 dark:text-gray-500 tabular-nums'>
						<span className='font-medium text-accent-500'>{recentTotal}</span>
						<span> last {WEEKS} wk</span>
					</p>
				)}
			</div>
			<div className='grid grid-cols-[repeat(12,1fr)] gap-[3px] w-full'>
				{hasData
					? weeks.map((week, wi) =>
							week.map((count, di) => (
								<div
									key={`${wi}-${di}`}
									className={cn(
										'aspect-square rounded-[2px] min-w-0',
										levelColors[getLevel(count)],
									)}
								/>
							)),
						)
					: Array.from({ length: WEEKS * 7 }).map((_, i) => (
							<div
								key={i}
								className='aspect-square rounded-[2px] bg-gray-100 dark:bg-gray-800 min-w-0'
							/>
						))}
			</div>
		</div>
	);
}
