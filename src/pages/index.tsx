import {RiGithubFill, RiTwitterFill} from 'react-icons/ri';
import {SITE_DESCRIPTION, SITE_TITLE, SITE_URL} from 'config';

import Anchor from 'components/anchor';
import Button from 'components/button';
import type {FC} from 'react';
import type {GetStaticProps} from 'next';
import HedvigLogo from 'components/hedvig-logo';
import Image from 'next/image';
import IntroCard from 'components/intro-card';
import Link from 'next/link';
import type {PostItem} from 'types';
import SocialTags from 'components/social-tags';
import {getAllPosts} from 'mdx/files';

interface Props {
	latestPost: PostItem
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const posts = getAllPosts();
	const latestPost = posts[0];
	return {
		props: {latestPost},
	};
};

const Home: FC<Props> = ({latestPost}) => (
	<>
		<SocialTags title={SITE_TITLE} description={SITE_DESCRIPTION} url={SITE_URL} type='website'/>

		<div className='px-4 py-6 sm:px-6 sm:py-9'>
			<div className='flex flex-col gap-5 sm:gap-6 w-full max-w-md mx-auto'>
				<div/>

				<IntroCard>
					User Interface Engineer &amp; Baker.
				</IntroCard>

				<div className='flex flex-col items-center gap-6 card padded'>
					<p>
						I make up 1⁄6 of the web team at <Anchor href='https://www.hedvig.com/' target='_blank'>Hedvig</Anchor>. We onboard new members to a digital insurance that gives back to charity.
					</p>

					<HedvigLogo/>
				</div>

				<div className='card'>
					<Link href={`/blog/${latestPost.slug}`}>
						{latestPost.meta.image && <Image
								src={latestPost.meta.image}
								width={latestPost.meta.imageWidth}
								height={latestPost.meta.imageHeight}
								alt={latestPost.meta.imageAlt || ''}
								className='rounded-t-lg'
							/>}

							<div className='flex flex-col'>
								<div className='px-4 sm:px-4 pt-4 sm:pt-4 pb-5 sm:pb-6'>
									<p className='uppercase text-xs text-gray-600 dark:text-gray-200'>Latest post</p>
									<h3 className='text-lg font-medium'>{latestPost.meta.title}</h3>
									<p className='text-gray-600 dark:text-gray-100'>
										{latestPost.meta.intro}
									</p>
								</div>
							</div>
					</Link>

					<Link href='/blog'>
						<div className='rounded rounded-t-none border-t border-gray-50 dark:border-gray-400 text-gray-200 hover:text-gray-400 dark:hover:text-gray-50 text-center p-3 cursor-pointer'>
							Read all posts
						</div>
					</Link>
				</div>

				<div className='card padded flex flex-col gap-6'>
					<p className='text-center font-medium'>
						Where you can reach me 👇
					</p>
					<div className='flex flex-col gap-3'>
						<Button href='https://twitter.com/robinandeer' className='!bg-twitter-blue dark:!bg-twitter-blue flex items-center gap-2 justify-center focus:!ring-twitter-blue'>
							<RiTwitterFill className='w-5 h-5 text-white'/>
							<p className='text-white'>Say hi on Twitter</p>
						</Button>
						<Button href='https://github.com/robinandeer' className='!bg-gray-800 dark:!bg-gray-900 flex items-center gap-2 justify-center focus:!ring-gray-800'>
							<RiGithubFill className='w-5 h-5 text-white'/>
							<p className='text-white'>Check my code on GitHub</p>
						</Button>
					</div>
				</div>

				<p className='text-center font-normal text-sm text-gray-500 dark:text-gray-300'>
					Made with <Anchor href='https://nextjs.org' target='_blank'>Next.js</Anchor>, deployed on <Anchor href='https://vercel.com' target='_blank'>Vercel</Anchor>.
				</p>

				<div/>
			</div>
		</div>
	</>
);

export default Home;
