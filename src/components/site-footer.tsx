import { siteConnectLinks, siteSourceRepoUrl } from 'data/site-connect';
import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react';
import { Link } from 'next-view-transitions';
import { siteBuiltAtIso, sitePackageVersion } from 'site-version';
import { cn } from 'utils/cn';

function commitHref(sha: string) {
	return `${siteSourceRepoUrl}/commit/${sha}`;
}

function formatBuiltAt(iso: string) {
	try {
		return new Date(iso).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			timeZone: 'America/New_York',
		});
	} catch {
		return iso.slice(0, 10);
	}
}

const sectionLabelClass = cn(
	'mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500',
	'md:mb-5 md:text-left dark:text-gray-500',
);

const connectRowClass = cn(
	'group flex w-full items-center justify-between gap-3 rounded-xl py-2.5 pl-2 pr-2.5',
	'-mx-2 text-left transition-[background-color,color] duration-200',
	'hover:bg-gray-500/[0.07] dark:hover:bg-white/[0.04]',
	'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500/60',
);

export function SiteFooter() {
	const sha = process.env.VERCEL_GIT_COMMIT_SHA;
	const shortSha = sha && sha.length >= 7 ? sha.slice(0, 7) : null;

	return (
		<footer className='mt-auto px-4 pb-12 pt-16 sm:px-6 print:hidden'>
			<div className='mx-auto w-full max-w-2xl lg:max-w-3xl'>
				<div
					className={cn(
						'island-panel island-panel--footer px-6 py-9 sm:px-9 sm:py-10',
					)}
				>
					<div
						className={cn(
							'grid gap-10 md:grid-cols-2 md:items-start md:gap-12 lg:gap-14',
						)}
					>
						<div className='min-w-0'>
							<p className={sectionLabelClass}>Around the web</p>
							<nav aria-label='Connect'>
								<ul
									className={cn(
										'flex max-w-sm flex-col gap-0.5 mx-auto md:mx-0 md:max-w-none',
									)}
								>
									{siteConnectLinks.map((item) => (
										<li key={item.href}>
											{item.external === false ? (
												<Link href={item.href} className={connectRowClass}>
													<span className='min-w-0'>
														<span className='block text-sm font-medium text-gray-900 transition-colors group-hover:text-accent-600 dark:text-gray-100 dark:group-hover:text-accent-400'>
															{item.label}
														</span>
														<span className='mt-0.5 block text-xs leading-snug text-gray-500 dark:text-gray-500'>
															{item.display}
														</span>
													</span>
													<ArrowRightIcon
														className={cn(
															'h-3.5 w-3.5 shrink-0 text-gray-400 transition-[transform,opacity,color]',
															'opacity-40 group-hover:translate-x-0.5',
															'group-hover:opacity-90 group-hover:text-accent-600 dark:group-hover:text-accent-400',
														)}
														aria-hidden
													/>
												</Link>
											) : (
												<a
													href={item.href}
													target='_blank'
													rel='noopener noreferrer'
													className={connectRowClass}
												>
													<span className='min-w-0'>
														<span className='block text-sm font-medium text-gray-900 transition-colors group-hover:text-accent-600 dark:text-gray-100 dark:group-hover:text-accent-400'>
															{item.label}
														</span>
														<span className='mt-0.5 block text-xs leading-snug text-gray-500 dark:text-gray-500'>
															{item.display}
														</span>
													</span>
													<ArrowUpRightIcon
														className={cn(
															'h-3.5 w-3.5 shrink-0 text-gray-400 transition-[transform,opacity,color]',
															'opacity-50 group-hover:translate-x-px group-hover:-translate-y-px',
															'group-hover:opacity-100 group-hover:text-accent-600 dark:group-hover:text-accent-400',
														)}
														aria-hidden
													/>
												</a>
											)}
										</li>
									))}
								</ul>
							</nav>
						</div>

						<div
							className={cn(
								'min-w-0 border-t border-gray-200/55 pt-10 md:border-t-0 md:border-l md:border-gray-200/50 md:pt-0 md:pl-10 lg:pl-12',
								'dark:border-gray-700/50 dark:md:border-gray-700/55',
							)}
						>
							<div className='flex flex-col gap-10'>
								<div>
									<p className={sectionLabelClass}>Repository</p>
									<div className='text-center md:text-left'>
										<a
											href={siteSourceRepoUrl}
											target='_blank'
											rel='noopener noreferrer'
											className={cn(
												'group inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900',
												'underline decoration-gray-400/45 underline-offset-[5px] transition-colors',
												'hover:text-accent-600 hover:decoration-accent-500/55',
												'dark:text-gray-50 dark:decoration-gray-500/60 dark:hover:text-accent-400',
											)}
										>
											Peek the repo
											<ArrowUpRightIcon
												className='h-3.5 w-3.5 text-gray-400 opacity-70 transition-[transform,opacity] group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-accent-600 group-hover:opacity-100 dark:group-hover:text-accent-400'
												aria-hidden
											/>
										</a>
										<p className='mt-2 max-w-[18rem] text-xs leading-relaxed text-gray-500 dark:text-gray-500 mx-auto md:mx-0'>
											Source for this site — Next.js, MDX, the usual suspects.
										</p>
									</div>
								</div>

								<div
									className={cn(
										'rounded-2xl border border-gray-200/70 bg-gray-500/[0.045] px-4 py-4 sm:px-5',
										'dark:border-gray-700/70 dark:bg-white/[0.035]',
									)}
								>
									<p className='mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 md:text-left dark:text-gray-500'>
										Build
									</p>
									<dl
										className={cn(
											'grid grid-cols-[minmax(0,auto)_1fr] gap-x-3 gap-y-2.5 text-xs',
											'mx-auto max-w-xs md:mx-0 md:max-w-none',
										)}
									>
										<dt className='text-gray-500 dark:text-gray-500'>
											Version
										</dt>
										<dd className='text-right font-medium tabular-nums text-gray-900 dark:text-gray-100 md:text-left'>
											v{sitePackageVersion}
										</dd>
										<dt className='text-gray-500 dark:text-gray-500'>Built</dt>
										<dd className='text-right tabular-nums text-gray-800 dark:text-gray-200 md:text-left'>
											<time dateTime={siteBuiltAtIso}>
												{formatBuiltAt(siteBuiltAtIso)}
											</time>
										</dd>
										<dt className='text-gray-500 dark:text-gray-500'>Commit</dt>
										<dd className='text-right md:text-left'>
											{shortSha && sha ? (
												<a
													href={commitHref(sha)}
													target='_blank'
													rel='noopener noreferrer'
													className='font-medium tabular-nums text-gray-900 underline decoration-gray-400/45 underline-offset-2 transition-colors hover:text-accent-600 dark:text-gray-100 dark:hover:text-accent-400'
												>
													{shortSha}
												</a>
											) : (
												<span className='tabular-nums text-gray-600 dark:text-gray-400'>
													local dev
												</span>
											)}
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
