import { LogoIcon } from 'components/logo-icon';
import { SiteHeaderBack } from 'components/site-header-back';
import { ThemeToggle } from 'components/theme-toggle';
import { Link } from 'next-view-transitions';
import { cn } from 'utils/cn';

export function SiteHeader() {
	return (
		<header
			className={cn(
				'pointer-events-none fixed top-4 left-1/2 z-50 w-max max-w-[min(100%-1.5rem,40rem)]',
				'-translate-x-1/2 print:hidden',
			)}
		>
			<div
				className={cn(
					'pointer-events-auto island-pill flex items-center gap-2 px-2.5 py-2 sm:gap-3 sm:px-3.5 sm:py-2.5',
				)}
			>
				<SiteHeaderBack />
				<Link
					href='/'
					className={cn(
						'flex min-w-0 shrink-0 items-center gap-2 rounded-full',
						'text-gray-900 dark:text-gray-100',
					)}
					aria-label='Robin Andeer, home'
				>
					<LogoIcon className='h-6 w-6 shrink-0 text-gray-900 dark:text-gray-100' />
					<span className='text-sm font-medium leading-none'>Robin</span>
				</Link>
				<div className='flex shrink-0 items-center'>
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
