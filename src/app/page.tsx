import { Anchor, anchorLinkClassName } from 'components/anchor';
import { DisclosureBlock } from 'components/disclosure-block';
import { GitHubHeatmap } from 'components/github-heatmap';
import { HomeCyclingHeading } from 'components/home-cycling-heading';
import { InteractiveLogo } from 'components/interactive-logo';
import { PostPosterMedia } from 'components/post-poster-media';
import { RunwayMark } from 'components/runway-mark';
import { GitHubIcon, XIcon } from 'components/social-icons';
import { homeDisplayLines } from 'data/home-greetings';
import { recentFlicks } from 'data/watching';
import {
	ArrowRightIcon,
	ArrowUpRightIcon,
	LibraryIcon,
	RssIcon,
} from 'lucide-react';
import { getAllPostsMeta } from 'mdx/mdx.helpers';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import type { ReactNode } from 'react';
import { cn } from 'utils/cn';

export default async function Page() {
	const allPosts = await getAllPostsMeta();
	const [featured, ...rest] = allPosts;
	const recentPosts = rest.slice(0, 3);

	return (
		<div className='min-h-svh flex flex-col'>
			<main className='flex-1 w-full max-w-2xl mx-auto px-6 sm:px-8 py-16 sm:py-24'>
				<header className='space-y-6'>
					<InteractiveLogo className='w-12 h-12 sm:w-14 sm:h-14 text-accent-500' />
					<div className='space-y-4 sm:space-y-5'>
						<h1 className='text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-50'>
							<HomeCyclingHeading
								lines={homeDisplayLines}
								className='font-semibold tracking-tight text-gray-900 dark:text-gray-50'
							/>
						</h1>
						<p className='text-lg text-gray-600 dark:text-gray-400 leading-relaxed'>
							I&apos;m a product engineer at{' '}
							<span className='inline-flex items-center gap-x-1.5 whitespace-nowrap'>
								<RunwayMark />
								<Anchor href='https://www.runwayml.com/' target='_blank'>
									Runway
								</Anchor>
							</span>{' '}
							in New York — web product where creative tools and ML meet real
							people in the browser: React, interface craft, and the glue from
							design spec to production.
						</p>
						<p className='text-lg text-gray-600 dark:text-gray-400 leading-relaxed'>
							Before that: insurtech in Stockholm, consulting, and
							bioinformatics —{' '}
							<Link
								href='/background'
								className={cn(
									'inline-flex items-center gap-1.5',
									anchorLinkClassName,
								)}
							>
								<LibraryIcon
									className='h-[1em] w-[1em] shrink-0 opacity-80 text-gray-500 dark:text-gray-400'
									aria-hidden
									strokeWidth={1.75}
								/>
								Background
							</Link>{' '}
							has the longer arc. This site is thinking in public; off the clock
							it&apos;s films that linger after the credits, UI with a point of
							view, and side projects I swear I&apos;m almost done with.
						</p>
					</div>
					<nav
						className='flex flex-wrap items-center gap-2'
						aria-label='Social and feed'
					>
						<SocialLink href='https://github.com/robinandeer'>
							<GitHubIcon className='h-3.5 w-3.5 shrink-0 opacity-80' />
							<span>GitHub</span>
						</SocialLink>
						<SocialLink href='https://x.com/robinandeer'>
							<XIcon className='h-3.5 w-3.5 shrink-0 opacity-80' />
							<span>X</span>
						</SocialLink>
						<SocialLink href='/feed.xml'>
							<RssIcon className='h-3.5 w-3.5 shrink-0 opacity-80' />
							<span>RSS</span>
						</SocialLink>
					</nav>
				</header>

				{featured && (
					<section className='mt-16 sm:mt-20'>
						<Link href={`/blog/${featured.slug}`} className='group block'>
							<article
								className={cn(
									'island-panel island-lift overflow-hidden',
									'hover:border-accent-500/30 dark:hover:border-accent-400/25',
								)}
							>
								{featured.image &&
									(featured.imageVideo ? (
										<div className='relative w-full overflow-hidden border-b border-gray-200/80 dark:border-gray-800'>
											<PostPosterMedia
												image={featured.image}
												imageWidth={featured.imageWidth}
												imageHeight={featured.imageHeight}
												imageAlt={featured.imageAlt || ''}
												imageVideo={featured.imageVideo}
												playVideoLoops={featured.playVideoLoops}
												playOnHover
												className='rounded-none'
											/>
										</div>
									) : (
										<div className='relative aspect-3/2 sm:aspect-[2/1] w-full overflow-hidden border-b border-gray-200/80 dark:border-gray-800'>
											<Image
												src={featured.image}
												alt={featured.imageAlt || ''}
												width={featured.imageWidth}
												height={featured.imageHeight}
												className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.02]'
												priority
											/>
										</div>
									))}
								<div className='p-6 sm:p-7 space-y-3'>
									<h2 className='text-xl font-semibold text-gray-900 dark:text-gray-50 leading-snug group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors'>
										{featured.title}
									</h2>
									{featured.intro && (
										<p className='text-gray-600 dark:text-gray-400 leading-relaxed text-[15px]'>
											{featured.intro}
										</p>
									)}
									<span
										className={cn(
											'inline-flex items-center gap-1 text-sm font-medium',
											'text-gray-500 dark:text-gray-500',
											'group-hover:text-accent-600 dark:group-hover:text-accent-400',
											'transition-colors',
										)}
									>
										Read post
										<ArrowRightIcon className='w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5' />
									</span>
								</div>
							</article>
						</Link>
					</section>
				)}

				{recentPosts.length > 0 && (
					<section className='mt-14 sm:mt-16'>
						<SectionTitle>Recent writing</SectionTitle>
						<div className='island-panel mt-4 overflow-hidden'>
							<ul
								className={cn(
									'grid min-w-0 grid-cols-1',
									'md:grid-cols-3 md:items-stretch',
									'divide-y divide-gray-200/85 dark:divide-gray-800/90',
									'md:divide-y-0 md:divide-x md:divide-gray-200/85 dark:md:divide-gray-800/90',
								)}
							>
								{recentPosts.map((post) => (
									<li
										key={post.slug}
										className='group/link flex h-full min-w-0 flex-col'
									>
										<Link
											href={`/blog/${post.slug}`}
											className={cn(
												'flex flex-1 min-w-0 flex-col gap-2',
												'px-4 py-5 sm:px-5 sm:py-6 md:px-4 md:py-5 lg:px-5 lg:py-6',
												'outline-none transition-[background-color,box-shadow] duration-200',
												'hover:bg-gray-100/90 dark:hover:bg-gray-900/50',
												'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-500/50',
											)}
										>
											<time
												className='text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500 dark:text-gray-500 tabular-nums'
												dateTime={post.date}
											>
												{new Date(post.date).toLocaleDateString('en-US', {
													year: 'numeric',
													month: 'short',
													day: 'numeric',
												})}
											</time>
											<span className='font-semibold leading-snug text-gray-900 transition-colors group-hover/link:text-accent-600 dark:text-gray-50 dark:group-hover/link:text-accent-400 line-clamp-3'>
												{post.title}
											</span>
											<div className='min-h-0 flex-1'>
												{post.intro ? (
													<span className='text-sm leading-relaxed text-gray-500 dark:text-gray-500 line-clamp-2 md:line-clamp-3'>
														{post.intro}
													</span>
												) : null}
											</div>
											<span
												className={cn(
													'mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium',
													'text-gray-500 dark:text-gray-500',
													'transition-colors',
													'group-hover/link:text-accent-600 dark:group-hover/link:text-accent-400',
												)}
											>
												Read
												<ArrowRightIcon
													className='w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5'
													aria-hidden
												/>
											</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
						<div className='mt-5'>
							<Link
								href='/blog'
								className='inline-flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors'
							>
								See all writing
								<ArrowRightIcon className='w-3.5 h-3.5' aria-hidden />
							</Link>
						</div>
					</section>
				)}

				<section
					className={cn(
						'mt-14 sm:mt-16 md:grid md:grid-cols-2 md:items-stretch md:gap-8 lg:gap-10',
					)}
				>
					<div className='min-w-0'>
						<SectionTitle>GitHub</SectionTitle>
						<a
							href='https://github.com/robinandeer'
							target='_blank'
							rel='noopener noreferrer'
							className={cn(
								'island-panel mt-4 flex h-full flex-col justify-center p-5 sm:p-6',
								'hover:border-accent-500/25 dark:hover:border-accent-400/20',
							)}
						>
							<GitHubHeatmap />
						</a>
					</div>

					<div className='min-w-0 mt-14 sm:mt-16 md:mt-0'>
						<SectionTitle>Recent flicks</SectionTitle>
						<div className='island-panel mt-4 overflow-hidden'>
							<ul
								className={cn(
									'flex flex-col',
									'divide-y divide-gray-200/85 dark:divide-gray-800/90',
								)}
							>
								{recentFlicks.map((flick) => (
									<li key={flick.href}>
										<a
											href={flick.href}
											target='_blank'
											rel='noopener noreferrer'
											className={cn(
												'group flex min-h-0 gap-3 px-3 py-3 sm:px-4 sm:py-3.5',
												'outline-none transition-colors duration-200',
												'hover:bg-gray-100/90 dark:hover:bg-gray-900/50',
												'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-500/50',
											)}
										>
											<div className='flex w-11 shrink-0 items-center justify-center self-center sm:w-[3.25rem]'>
												<div
													className={cn(
														'relative aspect-[2/3] w-full overflow-hidden rounded-md border border-gray-200 dark:border-gray-700',
													)}
												>
													<Image
														src={flick.poster}
														alt=''
														width={88}
														height={132}
														className='h-full w-full object-cover'
														sizes='52px'
													/>
												</div>
											</div>
											<div className='flex min-w-0 min-h-0 flex-col justify-center gap-0.5 py-0.5'>
												<span className='break-words font-semibold text-gray-900 transition-colors group-hover:text-accent-600 dark:text-gray-50 dark:group-hover:text-accent-400 leading-snug'>
													{flick.title}
												</span>
												<span className='break-words text-sm text-gray-500 dark:text-gray-500'>
													{flick.creditLine}
												</span>
											</div>
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</section>

				<section className='mt-20 sm:mt-24' aria-label='More about this site'>
					<SectionTitle>More</SectionTitle>
					<div
						className={cn(
							'island-panel mt-4 overflow-hidden divide-y divide-gray-200/85',
							'dark:divide-gray-800/90',
						)}
					>
						<DisclosureBlock id='more-background' label='Background'>
							<p>
								Where I&apos;ve worked and what I&apos;ve studied — a
								résumé-style timeline with a bit of context.{' '}
								<Link
									href='/background'
									className='font-medium text-accent-600 underline decoration-accent-500/30 underline-offset-[3px] transition-colors hover:decoration-accent-500 dark:text-accent-400'
								>
									View background
								</Link>
							</p>
						</DisclosureBlock>
						<DisclosureBlock id='more-beliefs' label='Things I believe'>
							<p>
								Principles I actually hold, shaped by experience — not a list
								borrowed from the timeline.{' '}
								<Link
									href='/beliefs'
									className='font-medium text-accent-600 underline decoration-accent-500/30 underline-offset-[3px] transition-colors hover:decoration-accent-500 dark:text-accent-400'
								>
									Read beliefs
								</Link>
							</p>
						</DisclosureBlock>
						<DisclosureBlock id='more-now' label='What I do now'>
							<p>
								I&apos;m a product engineer at Runway, building tools for human
								imagination — mostly web platform, a lot of React, and plenty of
								iteration with the people who use what we ship. I write this
								blog on the side to think in public about the craft of
								engineering and the product bets behind the UI.
							</p>
						</DisclosureBlock>
					</div>
				</section>
			</main>
		</div>
	);
}

function SectionTitle({ children }: { children: ReactNode }) {
	return (
		<h2
			className={cn(
				'section-pill-playful inline-flex w-max max-w-full items-center rounded-full border border-gray-200/85 bg-white/70 px-3.5 py-1.5',
				'text-sm font-semibold tracking-tight text-gray-800',
				'shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)] backdrop-blur-sm',
				'dark:border-gray-700/85 dark:bg-gray-900/65 dark:text-gray-100',
				'dark:shadow-[0_2px_16px_-6px_rgba(0,0,0,0.45)]',
			)}
		>
			{children}
		</h2>
	);
}

const heroSocialPillClass = cn(
	'inline-flex items-center gap-1.5 rounded-full border border-gray-200/85 bg-white/75 px-3 py-1.5',
	'text-sm font-medium text-gray-800',
	'shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)] backdrop-blur-sm',
	'transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out',
	'hover:border-accent-500/35 hover:bg-accent-500/[0.09] hover:text-accent-700',
	'hover:shadow-[0_5px_16px_-6px_rgba(0,0,0,0.14)] motion-safe:hover:-translate-y-px',
	'active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100',
	'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500/70',
	'dark:border-gray-700/85 dark:bg-gray-900/65 dark:text-gray-100',
	'dark:shadow-[0_2px_16px_-6px_rgba(0,0,0,0.45)]',
	'dark:hover:border-accent-400/40 dark:hover:bg-accent-400/12 dark:hover:text-accent-300',
);

function SocialLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	const isExternal = href.startsWith('http');
	const content = (
		<>
			{children}
			{isExternal ? (
				<ArrowUpRightIcon className='h-3 w-3 shrink-0 opacity-55' aria-hidden />
			) : null}
		</>
	);
	if (isExternal) {
		return (
			<a
				href={href}
				target='_blank'
				rel='noopener noreferrer'
				className={heroSocialPillClass}
			>
				{content}
			</a>
		);
	}
	return (
		<Link href={href} className={heroSocialPillClass}>
			{content}
		</Link>
	);
}
