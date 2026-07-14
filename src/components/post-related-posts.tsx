import { formatPostDate } from 'data/author';
import { CornerDownRight, NewspaperIcon } from 'lucide-react';
import type { PostListMeta } from 'mdx/mdx.helpers';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { cn } from 'utils/cn';

type PostRelatedPostsProps = {
	posts: Array<PostListMeta>;
};

function metadataLine(post: PostListMeta) {
	const date = formatPostDate(post.date);
	if (post.category) {
		return `${post.category} · ${date}`;
	}
	return date;
}

export function PostRelatedPosts({ posts }: PostRelatedPostsProps) {
	if (posts.length === 0) {
		return null;
	}

	return (
		<section className='not-prose' aria-labelledby='related-posts-heading'>
			<h2
				id='related-posts-heading'
				className='flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500'
			>
				<CornerDownRight
					className='h-3.5 w-3.5 shrink-0 text-gray-400/90 dark:text-gray-500'
					aria-hidden
				/>
				More articles
			</h2>
			<ul className='mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-5'>
				{posts.map((post) => (
					<li key={post.slug} className='min-w-0'>
						<Link
							href={`/blog/${post.slug}`}
							className='group flex flex-col gap-2.5 rounded-lg p-1.5 -m-1.5 transition-colors hover:bg-white/70 dark:hover:bg-gray-900/40'
						>
							<div
								className={cn(
									'relative aspect-[3/2] w-full overflow-hidden rounded-md',
									'bg-gray-100/90 dark:bg-gray-900/90',
								)}
							>
								{post.image && post.imageWidth && post.imageHeight ? (
									<Image
										src={post.image}
										alt=''
										width={post.imageWidth}
										height={post.imageHeight}
										className='h-full w-full object-cover opacity-[0.92] transition-opacity group-hover:opacity-100'
										sizes='(min-width: 640px) 45vw, 100vw'
									/>
								) : (
									<div
										aria-hidden
										className='dot-grid flex h-full w-full items-center justify-center'
									>
										<NewspaperIcon className='h-8 w-8 text-gray-300 dark:text-gray-600' />
									</div>
								)}
							</div>
							<div className='min-w-0 px-0.5'>
								<p
									className='line-clamp-2 text-sm font-normal leading-snug text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200'
									style={{
										viewTransitionName: `post-title-${post.slug.replaceAll('/', '-')}`,
									}}
								>
									{post.title}
								</p>
								<p className='mt-1 text-[11px] text-gray-400 tabular-nums dark:text-gray-500'>
									{metadataLine(post)}
								</p>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
