import { Anchor } from 'components/anchor';
import { SiteLogoMark } from 'components/site-logo-mark';
import { SITE_URL } from 'config';
import { author } from 'data/author';
import { ArrowUpRightIcon, RssIcon } from 'lucide-react';
import { Link } from 'next-view-transitions';

type PostAuthorFooterProps = {
	slug: Array<string>;
	postTitle: string;
};

export function PostAuthorFooter({ slug, postTitle }: PostAuthorFooterProps) {
	const postUrl = `${SITE_URL}/blog/${slug.join('/')}`;
	const share = `https://x.com/intent/tweet?text=${encodeURIComponent(
		`${postTitle} by @${author.socialHandle}`,
	)}&url=${encodeURIComponent(postUrl)}`;

	return (
		<footer className='border-t border-gray-200 pt-8 dark:border-gray-800'>
			<section aria-labelledby='post-author-footer-heading'>
				<h2 id='post-author-footer-heading' className='sr-only'>
					About the author
				</h2>
				<div className='flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8'>
					<div className='min-w-0 space-y-1.5 sm:order-1'>
						<p className='font-semibold text-gray-900 dark:text-gray-50'>
							{author.name}
						</p>
						<p className='text-sm leading-relaxed text-gray-600 dark:text-gray-400'>
							{author.shortBio}
						</p>
					</div>
					<div className='flex justify-center sm:order-2 sm:shrink-0 sm:justify-end'>
						<SiteLogoMark size='lg' />
					</div>
				</div>
			</section>
			<nav
				aria-label='Post footer'
				className='mt-8 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-400'
			>
				<Link
					href='/blog'
					className='text-gray-500 transition-colors hover:text-gray-700 dark:hover:text-gray-200'
				>
					&larr; Writing
				</Link>
				<div className='flex flex-wrap items-center justify-end gap-4 sm:gap-5'>
					<Link
						href='/feed.xml'
						className='inline-flex items-center gap-1.5 text-gray-500 transition-colors hover:text-gray-700 dark:hover:text-gray-200'
					>
						<RssIcon className='h-3.5 w-3.5' aria-hidden />
						RSS
					</Link>
					<Anchor
						href={share}
						target='_blank'
						className='inline-flex items-center gap-1 font-normal text-gray-500 no-underline hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
					>
						Share on X
						<ArrowUpRightIcon className='h-3.5 w-3.5' aria-hidden />
					</Anchor>
				</div>
			</nav>
		</footer>
	);
}
