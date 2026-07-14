import { ChevronDownIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from 'utils/cn';

export function DisclosureBlock({
	id,
	label,
	children,
	defaultOpen = false,
}: {
	id: string;
	label: string;
	children: ReactNode;
	defaultOpen?: boolean;
}) {
	const panelId = `${id}-panel`;

	return (
		<details
			id={id}
			className='home-disclosure group/disclosure'
			open={defaultOpen}
		>
			<summary
				className={cn(
					'flex w-full list-none items-center justify-between gap-3',
					'cursor-pointer rounded-lg px-2 py-2.5 -mx-1.5 text-left font-semibold text-gray-900',
					'dark:text-gray-50',
					'transition-[background-color,transform,box-shadow] duration-200 ease-out',
					'hover:bg-gray-100/75 active:bg-gray-100/90',
					'dark:hover:bg-gray-800/40 dark:active:bg-gray-800/55',
					'motion-safe:active:scale-[0.99]',
					'[&::-webkit-details-marker]:hidden',
					'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500/80',
				)}
				aria-controls={panelId}
			>
				<span className='home-disclosure-label transition-colors duration-200 group-open/disclosure:text-accent-600 dark:group-open/disclosure:text-accent-400'>
					{label}
				</span>
				<ChevronDownIcon
					aria-hidden
					className='home-disclosure-chevron h-4 w-4 shrink-0 text-gray-400 transition-[transform,color] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] dark:text-gray-500'
				/>
			</summary>
			<div className='home-disclosure-panel'>
				<div className='home-disclosure-panel-clip'>
					<div
						id={panelId}
						className={cn(
							'home-disclosure-content',
							'pb-3 pl-0.5 pr-0 text-[15px] leading-relaxed text-gray-600 dark:text-gray-400',
						)}
					>
						{children}
					</div>
				</div>
			</div>
		</details>
	);
}
