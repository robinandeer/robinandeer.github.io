'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from 'utils/cn'

type HeatmapData = {
	totalContributions: number
	weeks: Array<Array<number>>
}

type ArtifactMeta = {
	generatedAt: string
	weekNumber: number
	year: number
	dateRange: { start: string; end: string }
	totalContributions: number
	weekTotals: Array<number>
}

function getLevel(count: number) {
	if (count === 0) return 0
	if (count <= 2) return 1
	if (count <= 5) return 2
	if (count <= 10) return 3
	return 4
}

const WEEKS = 12

const levelColors = [
	'bg-white/10',
	'bg-accent-400/25',
	'bg-accent-400/45',
	'bg-accent-400/65',
	'bg-accent-500/90',
]

function formatDateRange(start: string, end: string) {
	const s = new Date(start)
	const e = new Date(end)
	const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })
	return `${fmt.format(s)}–${fmt.format(e)}`
}

export function ContributionArtifact() {
	const [heatmap, setHeatmap] = useState<HeatmapData | null>(null)
	const [meta, setMeta] = useState<ArtifactMeta | null>(null)
	const [hasArtwork, setHasArtwork] = useState(false)
	useEffect(() => {
		fetch('/api/github', { cache: 'no-store' })
			.then((r) => (r.ok ? r.json() : null))
			.then(setHeatmap)
			.catch(() => {})

		fetch('/generated/contribution-art.json', { cache: 'no-store' })
			.then((r) => (r.ok ? r.json() : null))
			.then((data) => {
				if (data) {
					setMeta(data)
					setHasArtwork(true)
				}
			})
			.catch(() => {})
	}, [])

	const weeks = heatmap?.weeks?.slice(-WEEKS) ?? []
	const hasHeatmapData = weeks.length > 0 && weeks.some((w) => w.some((c) => c > 0))
	const recentTotal = weeks.reduce(
		(sum, week) => sum + week.reduce((a, b) => a + b, 0),
		0,
	)

	if (!hasArtwork) {
		return <FallbackHeatmap weeks={weeks} hasData={hasHeatmapData} />
	}

	return (
		<div className="group/artifact relative w-full h-full flex flex-col">
			<div className="relative flex-1 min-h-0 aspect-square overflow-hidden rounded-lg">
				<Image
					src="/generated/contribution-art.webp"
					alt="Weekly contribution artifact"
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, 33vw"
				/>

				<div
					className={cn(
						'absolute inset-0 flex items-center justify-center p-4',
						'bg-black/60 backdrop-blur-sm',
					'transition-opacity duration-300',
					'opacity-0 group-hover/artifact:opacity-100',
					)}
				>
					{hasHeatmapData && (
						<div className="grid grid-cols-[repeat(12,1fr)] gap-[3px] w-full max-w-[200px]">
							{weeks.map((week, wi) =>
								week.map((count, di) => (
									<div
										key={`${wi}-${di}`}
										className={cn(
											'aspect-square rounded-[2px]',
											levelColors[getLevel(count)],
										)}
									/>
								)),
							)}
						</div>
					)}
				</div>
			</div>

			<div className="flex items-center justify-between pt-3 px-0.5">
				<p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
					GitHub
				</p>
				<div className="flex items-center gap-2 text-[10px] text-gray-400 dark:text-gray-500 tabular-nums">
					{meta && (
						<span>{formatDateRange(meta.dateRange.start, meta.dateRange.end)}</span>
					)}
					{recentTotal > 0 && (
						<span className="font-medium text-accent-500">
							{recentTotal}
						</span>
					)}
				</div>
			</div>
		</div>
	)
}

function FallbackHeatmap({
	weeks,
	hasData,
}: {
	weeks: Array<Array<number>>
	hasData: boolean
}) {
	return (
		<div className="flex flex-col gap-3">
			<p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
				GitHub
			</p>
			<div className="grid grid-cols-[repeat(12,1fr)] gap-[3px]">
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
								className="aspect-square rounded-[2px] bg-gray-100 dark:bg-gray-800"
							/>
						))}
			</div>
		</div>
	)
}
