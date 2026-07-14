import type { ExperienceItem } from 'data/background';
import { ChevronDownIcon } from 'lucide-react';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from 'utils/cn';

/** Shared shell for Background / Education timeline rows */
export const timelineRowCardClass = cn(
	'rounded-2xl border border-gray-200/85 dark:border-gray-800/75',
	'bg-white/70 dark:bg-gray-950/45',
	'shadow-sm shadow-gray-950/[0.04] dark:shadow-none',
	'transition-[border-color,box-shadow,background-color] duration-200',
);

const timelineRowHoverClass = cn(
	'hover:border-gray-300 dark:hover:border-gray-700',
	'hover:bg-white/90 dark:hover:bg-gray-950/65',
);

const rowPadding = 'px-4 py-4 sm:px-5 sm:py-[1.125rem]';

/** External link row matching timeline cards (e.g. Education on /background) */
export const timelineExternalRowClass = cn(
	'group flex items-start gap-4',
	rowPadding,
	timelineRowCardClass,
	timelineRowHoverClass,
);

function ExperienceRowInner({
	item,
	trailing,
}: {
	item: ExperienceItem;
	trailing: ReactNode;
}) {
	return (
		<>
			<Image
				src={item.logo}
				alt=''
				width={40}
				height={40}
				className={cn(
					'rounded-[10px] shrink-0 mt-0.5',
					'grayscale-[0.35] opacity-55',
					'ring-1 ring-gray-950/[0.06] dark:ring-white/[0.06]',
					'transition-all duration-300',
					'group-hover:grayscale-0 group-hover:opacity-100',
				)}
			/>
			<div className='flex-1 min-w-0 flex items-start justify-between gap-4'>
				<div className='min-w-0 flex-1 flex flex-col gap-1'>
					<span className='text-[15px] sm:text-base font-semibold tracking-tight text-gray-900 dark:text-gray-50 leading-snug'>
						{item.company}
					</span>
					<span className='text-[13px] leading-snug text-gray-500 dark:text-gray-400'>
						<span className='text-gray-400/90 dark:text-gray-500' aria-hidden>
							↳{' '}
						</span>
						{item.role}
						<span className='text-gray-500 dark:text-gray-500'>
							{' '}
							· {item.location}
						</span>
					</span>
				</div>
				{trailing}
			</div>
		</>
	);
}

function ExpandableExperienceRow({ item }: { item: ExperienceItem }) {
	const hasBody = Boolean(
		item.summary || (item.stack && item.stack.length > 0),
	);

	return (
		<details
			className={cn(
				'group',
				timelineRowCardClass,
				timelineRowHoverClass,
				'open:border-gray-300/90 dark:open:border-gray-700',
				'open:shadow-md open:shadow-gray-950/[0.06] dark:open:shadow-black/30',
			)}
		>
			<summary
				className={cn(
					rowPadding,
					'flex items-start gap-4 list-none cursor-pointer',
					'[&::-webkit-details-marker]:hidden',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950',
				)}
			>
				<ExperienceRowInner
					item={item}
					trailing={
						<span className='flex items-center gap-2 shrink-0 pt-0.5'>
							<span className='text-xs text-gray-500 dark:text-gray-500 tabular-nums tracking-tight'>
								{item.period}
							</span>
							<ChevronDownIcon
								aria-hidden
								className={cn(
									'h-3.5 w-3.5 shrink-0 text-gray-500 transition-transform duration-200 ease-out',
									'opacity-75 group-open:rotate-180 dark:text-gray-400',
								)}
							/>
						</span>
					}
				/>
			</summary>
			{(hasBody || item.href) && (
				<div className='border-t border-gray-200/65 dark:border-gray-800/90'>
					<div
						className={cn(
							'px-4 pb-4 pt-4 sm:px-5 sm:pb-5',
							'pl-14 sm:pl-[4.5rem]',
						)}
					>
						{item.summary && (
							<p className='text-[15px] leading-relaxed text-gray-600 dark:text-gray-400'>
								{item.summary}
							</p>
						)}
						{item.stack && item.stack.length > 0 && (
							<p className='mt-3 text-[13px] leading-relaxed text-gray-500 dark:text-gray-500'>
								<span className='font-medium text-gray-600 dark:text-gray-400'>
									Stack
								</span>
								{' · '}
								{item.stack.join(', ')}
							</p>
						)}
						<a
							href={item.href}
							target='_blank'
							rel='noopener noreferrer'
							className='mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-600 hover:text-accent-500 dark:text-accent-400 dark:hover:text-accent-300'
						>
							Visit {item.company}
							<span aria-hidden>↗</span>
						</a>
					</div>
				</div>
			)}
		</details>
	);
}

function SimpleExperienceRow({ item }: { item: ExperienceItem }) {
	return (
		<a
			href={item.href}
			target='_blank'
			rel='noopener noreferrer'
			className={timelineExternalRowClass}
		>
			<ExperienceRowInner
				item={item}
				trailing={
					<span className='text-xs text-gray-500 dark:text-gray-500 shrink-0 tabular-nums tracking-tight pt-0.5'>
						{item.period}
					</span>
				}
			/>
		</a>
	);
}

export function ExperienceList({ items }: { items: Array<ExperienceItem> }) {
	return (
		<div className='flex flex-col gap-2.5'>
			{items.map((item) =>
				item.summary || (item.stack != null && item.stack.length > 0) ? (
					<ExpandableExperienceRow key={item.company} item={item} />
				) : (
					<SimpleExperienceRow key={item.company} item={item} />
				),
			)}
		</div>
	);
}
