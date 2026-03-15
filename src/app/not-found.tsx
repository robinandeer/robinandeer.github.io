import { Link } from 'next-view-transitions';

export default function NotFound() {
	return (
		<div className='flex min-h-svh flex-col items-center justify-center text-center px-6'>
			<p className='text-sm font-medium text-gray-400 dark:text-gray-500 mb-2'>
				404
			</p>
			<h1 className='text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-2'>
				Page not found
			</h1>
			<p className='text-gray-500 dark:text-gray-400 mb-6'>
				The page you&apos;re looking for doesn&apos;t exist.
			</p>
			<Link
				href='/'
				className='text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 underline underline-offset-2 transition-colors'
			>
				Go home
			</Link>
		</div>
	);
}
