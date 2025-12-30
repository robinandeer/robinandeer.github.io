import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='flex min-h-[60vh] flex-col items-center justify-center text-center'>
			<h1 className='text-4xl font-bold mb-4'>404</h1>
			<h2 className='text-xl mb-6'>Page Not Found</h2>
			<p className='text-gray-600 dark:text-gray-400 mb-8'>
				The page you&apos;re looking for doesn&apos;t exist.
			</p>
			<Link
				href='/'
				className='text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline'
			>
				Go back home
			</Link>
		</div>
	);
}
