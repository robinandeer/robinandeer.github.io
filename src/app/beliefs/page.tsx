import { BackLink } from 'components/back-link'
import { beliefs } from 'data/beliefs'
import type { Metadata } from 'next'
import { Link } from 'next-view-transitions'
import { cn } from 'utils/cn'

export const metadata: Metadata = {
	title: 'Beliefs - Robin Andeer',
	description:
		'Things I believe about software, work, and the web. Personal principles shaped by experience.',
}

export default function BeliefsPage() {
	return (
		<div className='px-6 py-12 sm:py-16 max-w-2xl mx-auto w-full'>
			<div className='flex flex-col gap-12'>
				<header className='flex flex-col gap-4'>
					<Link href='/'>
						<BackLink>Home</BackLink>
					</Link>
					<div className='flex flex-col gap-2'>
						<h1 className='text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-50'>
							Things I Believe
						</h1>
						<p className='text-gray-500 dark:text-gray-400'>
							Shaped by experience, not borrowed from Twitter. Updated as I
							learn.
						</p>
					</div>
				</header>

				<ol className='flex flex-col gap-10'>
					{beliefs.map((item, index) => (
						<li key={item.belief} className='flex flex-col gap-2'>
							<h2
								className={cn(
									'text-lg font-semibold tracking-tight',
									'text-gray-900 dark:text-gray-50',
								)}
							>
								<span className='text-gray-300 dark:text-gray-700 tabular-nums mr-2'>
									{String(index + 1).padStart(2, '0')}
								</span>
								{item.belief}
							</h2>
							{item.context && (
								<p className='text-gray-500 dark:text-gray-400 leading-relaxed pl-9'>
									{item.context}
								</p>
							)}
						</li>
					))}
				</ol>
			</div>
		</div>
	)
}
