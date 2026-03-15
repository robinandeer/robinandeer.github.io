import { Anchor } from 'components/anchor';
import { BackLink } from 'components/back-link';
import { education, experience } from 'data/background';
import { ArrowUpRightIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { cn } from 'utils/cn';

export const metadata: Metadata = {
	title: 'Background - Robin Andeer',
	description: 'A brief overview of my work experience and education.',
};

export default function BackgroundPage() {
	return (
		<div className='px-6 py-12 sm:py-16 max-w-2xl mx-auto w-full'>
			<div className='flex flex-col gap-12'>
				<header className='flex flex-col gap-4'>
					<Link href='/'>
						<BackLink>Home</BackLink>
					</Link>
					<div className='flex flex-col gap-2'>
						<h1 className='text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-50'>
							Background
						</h1>
						<p className='text-gray-500 dark:text-gray-400'>
							Where I&apos;ve worked and what I&apos;ve studied.
						</p>
					</div>
				</header>

				<section className='flex flex-col gap-1'>
					<h2 className='text-sm font-medium text-gray-400 dark:text-gray-500 mb-3'>
						Experience
					</h2>
					{experience.map((item) => (
						<a
							key={item.company}
							href={item.href}
							target='_blank'
							rel='noopener noreferrer'
							className={cn(
								'group flex items-center gap-4 py-3 -mx-3 px-3 rounded-lg',
								'hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors',
							)}
						>
							<Image
								src={item.logo}
								alt={item.company}
								width={36}
								height={36}
								className={cn(
									'rounded-lg shrink-0',
									'grayscale opacity-40',
									'group-hover:grayscale-0 group-hover:opacity-100',
									'transition-all duration-300',
								)}
							/>
							<div className='flex flex-col gap-0.5 flex-1 min-w-0'>
								<span className='font-medium text-gray-900 dark:text-gray-50'>
									{item.role}
								</span>
								<span className='text-sm text-gray-500 dark:text-gray-400'>
									{item.company} &middot; {item.location}
								</span>
							</div>
							<span className='text-sm text-gray-400 dark:text-gray-500 shrink-0 tabular-nums'>
								{item.period}
							</span>
						</a>
					))}
				</section>

				<section className='flex flex-col gap-1'>
					<h2 className='text-sm font-medium text-gray-400 dark:text-gray-500 mb-3'>
						Education
					</h2>
					{education.map((item) => (
						<a
							key={item.school}
							href={item.href}
							target='_blank'
							rel='noopener noreferrer'
							className={cn(
								'group flex items-center gap-4 py-3 -mx-3 px-3 rounded-lg',
								'hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors',
							)}
						>
							<Image
								src={item.logo}
								alt={item.school}
								width={36}
								height={36}
								className={cn(
									'rounded-lg shrink-0',
									'grayscale opacity-40',
									'group-hover:grayscale-0 group-hover:opacity-100',
									'transition-all duration-300',
								)}
							/>
							<div className='flex flex-col gap-0.5 flex-1 min-w-0'>
								<span className='font-medium text-gray-900 dark:text-gray-50'>
									{item.degree}
								</span>
								<span className='text-sm text-gray-500 dark:text-gray-400'>
									{item.school} &middot; {item.location}
								</span>
							</div>
							<span className='text-sm text-gray-400 dark:text-gray-500 shrink-0 tabular-nums'>
								{item.period}
							</span>
						</a>
					))}
				</section>

				<footer className='flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500'>
					<span>Full details on</span>
					<Anchor
						href='https://www.linkedin.com/in/robinandeer/'
						target='_blank'
						className='inline-flex items-center gap-1'
					>
						LinkedIn
						<ArrowUpRightIcon className='w-3.5 h-3.5' />
					</Anchor>
				</footer>
			</div>
		</div>
	);
}
