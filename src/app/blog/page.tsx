import BackLink from 'components/back-link';
import {getAllPostsMeta} from 'mdx/mdx.helpers';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
	title: 'Blog - Robin Andeer',
	description: 'Thoughts on programming, tech, and personal life.',
};

export default async function BlogPage() {
	const posts = await getAllPostsMeta();

	return (
		<div className='p-5 sm:p-6 flex flex-col gap-5 sm:gap-6'>
			<header>
				<Link href='/'>
					<BackLink>Home</BackLink>
				</Link>
			</header>

			<main className='flex flex-col gap-5 sm:gap-6 items-center'>
				{posts.map((meta, index) => (
					<Link key={meta.slug} href={`/blog/${meta.slug}`} className='group max-w-lg w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-opacity-50 rounded-lg'>
						<div className='card padded group-hover:bg-gray-50 group-hover:bg-opacity-5 dark:group-hover:bg-gray-600 transform transition-all group-hover:-translate-y-1 active:translate-y-0 flex flex-col gap-4'>
							{meta.image
								? <Image
									src={meta.image}
									alt={meta.imageAlt || ''}
									width={meta.imageWidth}
									height={meta.imageHeight}
									className='rounded-lg'
									priority={index === 0}
								/>
								: null}

							<div className='flex flex-col gap-px'>
								<p className='text-sm font-medium text-gray-500 dark:text-gray-100 uppercase'>
									{new Date(meta.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
								</p>

								<h2 className='text-base font-medium text-gray-900 dark:text-gray-50 active:bg-op'>
									{meta.title}
								</h2>

								{meta.intro ? (
									<p className='text-base text-gray-500 dark:text-gray-100 font-normal'>
										{meta.intro}
									</p>
								) : null}
							</div>
						</div>
					</Link>
				))}
			</main>
		</div>
	);
}
