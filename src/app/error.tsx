'use client';

// biome-ignore lint/suspicious/noShadowRestrictedNames: Next.js convention
export default function Error({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className='flex min-h-svh flex-col items-center justify-center text-center px-6'>
			<p className='text-sm font-medium text-gray-400 dark:text-gray-500 mb-2'>
				Error
			</p>
			<h1 className='text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-2'>
				Something went wrong
			</h1>
			<p className='text-gray-500 dark:text-gray-400 mb-6'>
				An unexpected error occurred.
			</p>
			<button
				type='button'
				onClick={reset}
				className='text-sm font-medium px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
			>
				Try again
			</button>
		</div>
	);
}
