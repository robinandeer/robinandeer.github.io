'use client';

// biome-ignore lint/suspicious/noShadowRestrictedNames: Next.js convention
export default function Error({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className='flex min-h-[60vh] flex-col items-center justify-center text-center px-4'>
			<h1 className='text-4xl font-bold mb-4'>Something went wrong</h1>
			<p className='text-gray-500 dark:text-gray-200 mb-8'>
				An unexpected error occurred.
			</p>
			<button
				type='button'
				onClick={reset}
				className='rounded-lg px-4 py-2 font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
			>
				Try again
			</button>
		</div>
	);
}
