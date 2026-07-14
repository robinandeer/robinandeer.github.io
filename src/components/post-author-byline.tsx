import { Anchor } from 'components/anchor';
import { SiteLogoMark } from 'components/site-logo-mark';
import { author, formatPostDate } from 'data/author';

export function PostAuthorByline({ date }: { date: string }) {
	return (
		<div className='flex items-center gap-3'>
			<SiteLogoMark size='md' />
			<div className='min-w-0'>
				<div className='font-semibold text-gray-900 dark:text-gray-50'>
					{author.name}
				</div>
				<p className='text-sm text-gray-500 dark:text-gray-400'>
					<Anchor
						href={author.socialProfileUrl}
						target='_blank'
						className='font-normal text-inherit no-underline hover:text-gray-700 dark:hover:text-gray-200'
					>
						@{author.socialHandle}
					</Anchor>
					<span className='mx-1.5' aria-hidden>
						·
					</span>
					<time dateTime={date}>{formatPostDate(date)}</time>
				</p>
			</div>
		</div>
	);
}
