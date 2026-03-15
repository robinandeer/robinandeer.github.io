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
	'bg-accent-400/20 dark:bg-accent-400/15',
	'bg-accent-400/40 dark:bg-accent-400/30',
	'bg-accent-400/65 dark:bg-accent-400/50',
	'bg-accent-500 dark:bg-accent-400/80',
];

export function GitHubHeatmap() {
	const [data, setData] = useState<HeatmapData | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch('/api/github', { cache: 'no-store' })
			.then((r) => {
				if (!r.ok) throw new Error(`HTTP ${r.status}`);
				return r.json();
			})
			.then((d) => {
				console.log('[GitHubHeatmap] data:', d);
				setData(d);
			})
			.catch((e) => {
				console.error('[GitHubHeatmap] fetch error:', e);
				setError(String(e));
			});
	}, []);

	const weeks = data?.weeks?.slice(-WEEKS) ?? [];
	const hasData = weeks.length > 0 && weeks.some((w) => w.some((c) => c > 0));

	return (
		<div className='flex flex-col gap-3'>
			<p className='text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider'>
				GitHub
			</p>
			{error && <p className='text-xs text-red-500'>Debug: {error}</p>}
			<div className='grid grid-cols-[repeat(12,1fr)] gap-[3px]'>
				{hasData
					? weeks.map((week, wi) =>
							week.map((count, di) => (
								<div
									key={`${wi}-${di}`}
									className={cn(
										'aspect-square rounded-[2px]',
										levelColors[getLevel(count)],
									)}
								/>
							)),
						)
					: Array.from({ length: WEEKS * 7 }).map((_, i) => (
							<div
								key={i}
								className='aspect-square rounded-[2px] bg-gray-100 dark:bg-gray-800'
							/>
						))}
			</div>
		</div>
	);
}
