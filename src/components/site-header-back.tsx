'use client';

import { HistoryBack } from 'components/history-back';
import { ArrowLeftIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from 'utils/cn';

function backFallback(pathname: string): string | null {
	if (pathname === '/' || pathname === '') return null;
	if (pathname === '/blog') return '/';
	if (pathname.startsWith('/blog/series/')) return '/blog';
	if (pathname.startsWith('/blog/')) return '/blog';
	return '/';
}

export function SiteHeaderBack() {
	const pathname = usePathname() ?? '';
	const fallback = backFallback(pathname);
	const showBack = fallback != null;

	return (
		<div
			className={cn(
				'grid transition-[grid-template-columns,margin-inline-end] duration-300 ease-out',
				'motion-reduce:transition-none',
				showBack ? 'grid-cols-[1fr] me-0' : 'grid-cols-[0fr] -me-2 sm:-me-3',
			)}
		>
			<div className='min-w-0 overflow-hidden'>
				<div
					className={cn(
						'flex w-max items-center gap-2',
						'transition-opacity duration-300 ease-out motion-reduce:transition-none',
						showBack
							? 'opacity-100 delay-75 motion-reduce:delay-0'
							: 'opacity-0',
					)}
					aria-hidden={!showBack}
					inert={!showBack}
				>
					<HistoryBack
						fallback={fallback ?? '/'}
						aria-label='Back'
						className={cn(
							'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
							'text-gray-600 transition-colors dark:text-gray-400',
							'hover:bg-gray-100 hover:text-gray-900',
							'dark:hover:bg-gray-800/80 dark:hover:text-gray-100',
							'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500/70',
						)}
					>
						<ArrowLeftIcon className='h-4 w-4' aria-hidden />
					</HistoryBack>
					<span
						className='h-4 w-px shrink-0 bg-gray-200 dark:bg-gray-700'
						aria-hidden
					/>
				</div>
			</div>
		</div>
	);
}
