import { Anchor } from 'components/anchor';
import {
	ExperienceList,
	timelineExternalRowClass,
} from 'components/experience-list';
import { education, experience } from 'data/background';
import { ArrowUpRightIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { cn } from 'utils/cn';

export const metadata: Metadata = {
	title: 'Background - Robin Andeer',
	description: 'A brief overview of my work experience and education.',
};

export default function BackgroundPage() {
	return (
		<div className='px-6 py-12 sm:py-16 max-w-2xl mx-auto w-full'>
			<div className='flex flex-col gap-12'>
				<header className='flex flex-col gap-2'>
					<h1 className='text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-50'>
						Background
					</h1>
					<p className='text-gray-500 dark:text-gray-400'>
						Where I&apos;ve worked and what I&apos;ve studied.
					</p>
				</header>

				<section
					className='flex flex-col gap-2.5'
					aria-labelledby='experience-heading'
				>
					<div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
						<h2
							id='experience-heading'
							className='text-sm font-medium text-gray-400 dark:text-gray-500'
						>
							Experience
						</h2>
						<a
							href='https://www.linkedin.com/in/robinandeer/'
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center gap-1 text-sm font-medium text-accent-600 hover:text-accent-500 dark:text-accent-400 dark:hover:text-accent-300 w-fit'
						>
							Connect on LinkedIn
							<ArrowUpRightIcon className='h-3.5 w-3.5 shrink-0' aria-hidden />
						</a>
					</div>
					<ExperienceList items={experience} />
				</section>

				<section
					className='flex flex-col gap-2.5'
					aria-labelledby='education-heading'
				>
					<h2
						id='education-heading'
						className='text-sm font-medium text-gray-400 dark:text-gray-500'
					>
						Education
					</h2>
					<div className='flex flex-col gap-2.5'>
						{education.map((item) => (
							<a
								key={item.school}
								href={item.href}
								target='_blank'
								rel='noopener noreferrer'
								className={timelineExternalRowClass}
							>
								<Image
									src={item.logo}
									alt=''
									width={40}
									height={40}
									className={cn(
										'rounded-[10px] shrink-0 mt-0.5',
										'grayscale-[0.35] opacity-55',
										'ring-1 ring-gray-950/[0.06] dark:ring-white/[0.06]',
										'transition-all duration-300',
										'group-hover:grayscale-0 group-hover:opacity-100',
									)}
								/>
								<div className='flex-1 min-w-0 flex items-start justify-between gap-4'>
									<div className='min-w-0 flex-1 flex flex-col gap-1'>
										<span className='text-[15px] sm:text-base font-semibold tracking-tight text-gray-900 dark:text-gray-50 leading-snug'>
											{item.degree}
										</span>
										<span className='text-[13px] leading-snug text-gray-500 dark:text-gray-400'>
											{item.school}
											<span className='text-gray-500 dark:text-gray-500'>
												{' '}
												· {item.location}
											</span>
										</span>
									</div>
									<span className='text-xs text-gray-500 dark:text-gray-500 shrink-0 tabular-nums tracking-tight pt-0.5'>
										{item.period}
									</span>
								</div>
							</a>
						))}
					</div>
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
