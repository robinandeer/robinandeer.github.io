'use client';

import { ChevronUpIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from 'utils/cn';

const showAfterScrollY = 360;

export function ScrollToTopButton() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		function onScroll() {
			setIsVisible(window.scrollY > showAfterScrollY);
		}

		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	function scrollToTop() {
		const instant =
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.scrollTo({ top: 0, behavior: instant ? 'auto' : 'smooth' });
	}

	return (
		<button
			type='button'
			onClick={scrollToTop}
			aria-label='Back to top'
			className={cn(
				'fixed z-40 flex h-10 w-10 items-center justify-center rounded-full',
				'border border-gray-200/90 bg-white/90 text-gray-700 shadow-sm backdrop-blur-md',
				'transition-opacity duration-200 hover:text-accent-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500',
				'bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))]',
				'dark:border-gray-700/90 dark:bg-gray-950/80 dark:text-gray-200 dark:hover:text-accent-400',
				isVisible ? 'opacity-100' : 'pointer-events-none opacity-0',
			)}
		>
			<ChevronUpIcon className='h-5 w-5' aria-hidden />
		</button>
	);
}
