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
					'cursor-pointer px-3 py-3 sm:px-4 text-left font-semibold text-gray-900',
					'dark:text-gray-50',
					'outline-none',
					'[&::-webkit-details-marker]:hidden',
					'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-500/50',
				)}
				aria-controls={panelId}
			>
				<span className='home-disclosure-label'>
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
							'px-3 pb-3.5 sm:px-4 text-[15px] leading-relaxed text-gray-600 dark:text-gray-400',
						)}
					>
						{children}
					</div>
				</div>
			</div>
		</details>
	);
}
