import Anchor from 'components/anchor';
import Button from 'components/button';
import IntroCard from 'components/intro-card';
import RunwayLogo from 'components/runway-logo';
import { GithubIcon, TwitterIcon } from 'lucide-react';
import { getLatestPostMeta } from 'mdx/mdx.helpers';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page() {
	const latestPostMeta = await getLatestPostMeta();

	return (
		<div className='px-4 py-6 sm:px-6 sm:py-9'>
			<div className='flex flex-col gap-5 sm:gap-6 w-full max-w-md mx-auto'>
				<div />

				<IntroCard>
					Product Engineer &amp; competetive badminton player.
				</IntroCard>

				<div className='flex flex-col items-center gap-6 card padded'>
					<p>
						I&apos;m a product engineer at{' '}
						<Anchor href='https://www.runwayml.com/' target='_blank'>
							Runway
						</Anchor>
						. We&apos;re building tools for human imagination.
					</p>

					<RunwayLogo />
				</div>

				<div className='card'>
					<Link href={`/blog/${latestPostMeta.slug}`}>
						{latestPostMeta.image && (
							<Image
								priority={true}
								src={latestPostMeta.image}
								width={latestPostMeta.imageWidth}
								height={latestPostMeta.imageHeight}
								alt={latestPostMeta.imageAlt || ''}
								className='rounded-t-lg'
							/>
						)}

						<div className='flex flex-col'>
							<div className='px-4 sm:px-4 pt-4 sm:pt-4 pb-5 sm:pb-6'>
								<p className='uppercase text-sm text-gray-600 dark:text-gray-100'>
									Latest post
								</p>
								<h2 className='text-lg font-medium'>{latestPostMeta.title}</h2>
								<p className='text-gray-600 dark:text-gray-100'>
									{latestPostMeta.intro}
								</p>
							</div>
						</div>
					</Link>
					<Link href='/blog'>
						<div className='rounded rounded-t-none border-t border-gray-50 dark:border-gray-500 text-gray-200 dark:text-gray-100 hover:text-gray-400 dark:hover:text-gray-50 text-center p-3 cursor-pointer'>
							Read all posts
						</div>
					</Link>
				</div>

				<div className='card padded flex flex-col gap-6'>
					<p className='text-center font-medium'>Where you can reach me 👇</p>
					<div className='flex flex-col gap-3'>
						<Button
							href='https://twitter.com/robinandeer'
							className='bg-twitter-blue! dark:bg-twitter-blue! flex items-center gap-2 justify-center focus:ring-twitter-blue!'
						>
							<TwitterIcon className='w-5 h-5 text-white' />
							<p className='text-white'>Say hi on Twitter</p>
						</Button>
						<Button
							href='https://github.com/robinandeer'
							className='bg-gray-800! dark:bg-gray-900! flex items-center gap-2 justify-center focus:ring-gray-800!'
						>
							<GithubIcon className='w-5 h-5 text-white' />
							<p className='text-white'>Check my code on GitHub</p>
						</Button>
					</div>
				</div>

				<p className='text-center font-normal text-sm text-gray-500 dark:text-gray-200'>
					Made with{' '}
					<Anchor href='https://nextjs.org' target='_blank'>
						Next.js
					</Anchor>
					, deployed on{' '}
					<Anchor href='https://vercel.com' target='_blank'>
						Vercel
					</Anchor>
					.
				</p>

				<div />
			</div>
		</div>
	);
}
