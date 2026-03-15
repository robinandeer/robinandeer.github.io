import { Anchor } from 'components/anchor';
import { GitHubHeatmap } from 'components/github-heatmap';
import { GlowCard } from 'components/glow-card';
import { Greeting } from 'components/greeting';
import { InteractiveLogo } from 'components/interactive-logo';
import { GitHubIcon, XIcon } from 'components/social-icons';
import { StaggerGrid } from 'components/stagger-grid';
import { currentlyReading } from 'data/reading';
import { ArrowRightIcon, BookOpenIcon, RssIcon } from 'lucide-react';
import { getAllPostsMeta } from 'mdx/mdx.helpers';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { cn } from 'utils/cn';

export default async function Page() {
	const allPosts = await getAllPostsMeta();
	const [featured, ...rest] = allPosts;
	const recentPosts = rest.slice(0, 2);
	return (
		<div className='min-h-svh flex flex-col dot-grid'>
			<main className='flex-1 px-6 sm:px-10 py-16 sm:py-24 max-w-6xl mx-auto w-full'>
				<StaggerGrid
					className={cn(
						'grid grid-cols-1 md:grid-cols-3 gap-3',
						'md:grid-flow-dense',
					)}
				>
					{/* Row 1: Hero (2/3) + GitHub (1/3) */}
					<GlowCard className='md:col-span-2'>
						<Card
							className={cn(
								'flex flex-col sm:flex-row items-start',
								'gap-8 p-8 sm:p-10 h-full',
							)}
						>
							<InteractiveLogo className='w-14 h-14 sm:w-16 sm:h-16 text-accent-500 shrink-0' />
							<div className='flex flex-col gap-4'>
								<h1 className='text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-50'>
									Robin Andeer
								</h1>
								<p className='text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg'>
									<Greeting />
									I&apos;m a product engineer at{' '}
									<Anchor href='https://www.runwayml.com/' target='_blank'>
										Runway
									</Anchor>
									, building tools for human imagination. Writing about web
									development, React, and the craft of engineering.
								</p>
								<nav className='flex items-center gap-4 mt-1'>
									<SocialLink
										href='https://github.com/robinandeer'
										label='GitHub'
									>
										<GitHubIcon className='w-5 h-5' />
									</SocialLink>
									<SocialLink href='https://x.com/robinandeer' label='X'>
										<XIcon className='w-5 h-5' />
									</SocialLink>
									<SocialLink href='/feed.xml' label='RSS'>
										<RssIcon className='w-5 h-5' />
									</SocialLink>
								</nav>
							</div>
						</Card>
					</GlowCard>

					<a
						href='https://github.com/robinandeer'
						target='_blank'
						rel='noopener noreferrer'
						className='group'
					>
						<GlowCard className='h-full'>
							<Card
								className={cn(
									'p-6 sm:p-8 h-full flex flex-col justify-center',
									'hover:border-gray-300 dark:hover:border-gray-700 transition-colors',
								)}
							>
								<GitHubHeatmap />
							</Card>
						</GlowCard>
					</a>

					{/* Row 2: Featured post (2/3) + Reading (1/3) */}
					{featured && (
						<Link
							href={`/blog/${featured.slug}`}
							className='md:col-span-2 group'
						>
							<GlowCard className='h-full'>
								<Card className='overflow-hidden flex flex-col sm:flex-row h-full'>
									{featured.image && (
										<div className='relative sm:w-1/2 aspect-3/2 sm:aspect-auto overflow-hidden'>
											<Image
												src={featured.image}
												alt={featured.imageAlt || ''}
												width={featured.imageWidth}
												height={featured.imageHeight}
												className={cn(
													'object-cover w-full h-full',
													'group-hover:scale-[1.02] transition-transform duration-500',
												)}
												priority
											/>
										</div>
									)}
									<div className='p-8 sm:p-10 flex flex-col justify-center gap-3 sm:w-1/2'>
										<p className='text-xs font-medium text-accent-500 uppercase tracking-wider'>
											Latest
										</p>
										<h2 className='text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-50 leading-snug'>
											{featured.title}
										</h2>
										{featured.intro && (
											<p className='text-gray-500 dark:text-gray-400 leading-relaxed'>
												{featured.intro}
											</p>
										)}
										<span
											className={cn(
												'mt-2 text-sm font-medium inline-flex items-center gap-1',
												'text-gray-400 dark:text-gray-500',
												'group-hover:text-accent-500 transition-colors',
											)}
										>
											Read post
											<ArrowRightIcon className='w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5' />
										</span>
									</div>
								</Card>
							</GlowCard>
						</Link>
					)}

					<a
						href={currentlyReading.href}
						target='_blank'
						rel='noopener noreferrer'
						className='group'
					>
						<GlowCard className='h-full'>
							<Card
								className={cn(
									'p-8 sm:p-10 flex items-center gap-5 h-full',
									'hover:border-gray-300 dark:hover:border-gray-700 transition-colors',
								)}
							>
								<Image
									src={currentlyReading.cover}
									alt={currentlyReading.title}
									width={60}
									height={80}
									className='rounded-md shadow-md shrink-0'
									style={{ width: 60, height: 'auto' }}
								/>
								<div className='flex flex-col gap-1'>
									<span className='text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1'>
										<BookOpenIcon className='w-3 h-3' />
										Reading
									</span>
									<p className='font-medium text-gray-900 dark:text-gray-50 text-sm leading-snug'>
										{currentlyReading.title}
									</p>
									<p className='text-xs text-gray-400 dark:text-gray-500'>
										{currentlyReading.author}
									</p>
								</div>
							</Card>
						</GlowCard>
					</a>

					{/* Row 3: Recent posts + Background */}
					{recentPosts.map((post) => (
						<Link key={post.slug} href={`/blog/${post.slug}`} className='group'>
							<GlowCard className='h-full'>
								<Card
									className={cn(
										'p-8 sm:p-10 flex flex-col gap-3 h-full',
										'hover:border-gray-300 dark:hover:border-gray-700 transition-colors',
									)}
								>
									<time className='text-xs text-gray-400 dark:text-gray-500 tabular-nums'>
										{new Date(post.date).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'short',
											day: 'numeric',
										})}
									</time>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-gray-50'>
										{post.title}
									</h3>
									{post.intro && (
										<p className='text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3'>
											{post.intro}
										</p>
									)}
								</Card>
							</GlowCard>
						</Link>
					))}

					<Link href='/background' className='group'>
						<GlowCard className='h-full'>
							<Card
								className={cn(
									'p-8 sm:p-10 flex flex-col justify-between h-full',
									'hover:border-gray-300 dark:hover:border-gray-700 transition-colors',
								)}
							>
								<p className='text-sm text-gray-500 dark:text-gray-400 leading-relaxed'>
									Where I&apos;ve worked and what I&apos;ve studied along the
									way.
								</p>
								<span
									className={cn(
										'mt-4 text-sm font-medium inline-flex items-center gap-1',
										'text-gray-400 dark:text-gray-500',
										'group-hover:text-accent-500 transition-colors',
									)}
								>
									Background
									<ArrowRightIcon className='w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5' />
								</span>
							</Card>
						</GlowCard>
					</Link>

					{/* Row 4: Beliefs + Posts count (1/3 each) */}
					<Link href='/beliefs' className='group'>
						<GlowCard className='h-full'>
							<Card
								className={cn(
									'p-8 sm:p-10 flex flex-col justify-between h-full',
									'hover:border-gray-300 dark:hover:border-gray-700 transition-colors',
								)}
							>
								<p className='text-sm italic text-gray-500 dark:text-gray-400 leading-relaxed'>
									Shaped by experience, not borrowed from Twitter.
								</p>
								<span
									className={cn(
										'mt-4 text-sm font-medium inline-flex items-center gap-1',
										'text-gray-400 dark:text-gray-500',
										'group-hover:text-accent-500 transition-colors',
									)}
								>
									Things I believe
									<ArrowRightIcon className='w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5' />
								</span>
							</Card>
						</GlowCard>
					</Link>

					<Link href='/blog' className='group md:col-span-2'>
						<GlowCard className='h-full'>
							<Card
								className={cn(
									'p-8 sm:p-10 flex items-center justify-between gap-4 h-full',
									'hover:border-gray-300 dark:hover:border-gray-700 transition-colors',
								)}
							>
								<div className='flex items-baseline gap-3'>
									<p className='text-4xl font-semibold text-gray-900 dark:text-gray-50'>
										{allPosts.length}
									</p>
									<p className='text-gray-500 dark:text-gray-400'>
										posts written
									</p>
								</div>
								<span
									className={cn(
										'text-sm font-medium inline-flex items-center gap-1',
										'text-gray-400 dark:text-gray-500',
										'group-hover:text-accent-500 transition-colors',
									)}
								>
									Browse all posts
									<ArrowRightIcon className='w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5' />
								</span>
							</Card>
						</GlowCard>
					</Link>
				</StaggerGrid>
			</main>
		</div>
	);
}

function Card({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div
			className={cn(
				'rounded-2xl backdrop-blur-md',
				'border border-gray-200/60 dark:border-gray-700/40',
				'bg-white/40 dark:bg-gray-900/40',
				className,
			)}
		>
			{children}
		</div>
	);
}

function SocialLink({
	href,
	label,
	children,
}: {
	href: string;
	label: string;
	children: React.ReactNode;
}) {
	const isExternal = href.startsWith('http');
	return (
		<a
			href={href}
			aria-label={label}
			className={cn(
				'text-gray-400 dark:text-gray-500',
				'hover:text-gray-900 dark:hover:text-gray-50',
				'transition-colors',
			)}
			{...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
		>
			{children}
		</a>
	);
}
