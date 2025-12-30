const PORTFOLIO_URL = 'https://www.robinandeer.com/';
const LINKEDIN_URL = 'https://www.linkedin.com/in/robinandeer';

type SearchParams = Promise<{
	role: string;
	company: string;
	contactName?: string;
}>;

export default async function Page({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const { role, company, contactName = 'Hiring Manager' } = await searchParams;

	return (
		<div className='bg-white min-h-screen text-gray-900 space-y-4'>
			<header className='bg-teal-600 p-4'>
				<div className='max-w-4xl mx-auto'>
					<h1 className='text-4xl text-white font-semibold'>Robin Andeer</h1>
					<h2 className='text-xl text-teal-100'>Product Engineer</h2>
					<br />
					<p className='text-teal-100'>
						<a href='tel:+46700423833'>+46 70 042 38 33</a>
					</p>
					<p className='text-teal-100'>
						<a href='mailto:robin.andeer@gmail.com'>robin.andeer@gmail.com</a>
					</p>
					<p className='text-teal-100'>
						<a href={LINKEDIN_URL} className='underline'>
							LinkedIn
						</a>{' '}
						|&nbsp;
						<a href={PORTFOLIO_URL} className='underline'>
							Personal site
						</a>
					</p>
				</div>
			</header>
			<div className='px-4'>
				<main className='max-w-4xl mx-auto space-y-4'>
					<p>{new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}</p>

					<p>Dear {contactName},</p>

					<p className='max-w-2xl'>
						Please accept my application for the {role} position with {company}.
						I hope to bring my 10 years of software engineering experience to
						your team. In the past years, I have gained expertise in TypeScript,
						React, web accessibility, and API design. I believe I would be an
						excellent addition to the {company} engineering team.
					</p>

					<p className='max-w-2xl'>
						During my time at Hedvig, my current company, I have served as the
						lead developer for a team of 4-6 engineers. The biggest project
						included a complete revamp of the company website, which I designed
						and architected. This led to a 40% reduction in the size of the
						codebase and significant improvements in Lighthouse scores and SEO
						ranking. I have also been a mentor for junior developers and have
						helped them grow their skills.
					</p>

					<p className='max-w-2xl'>
						I am currently based in Stockholm, Sweden but will move to New York
						in December 2023. I’m authorized to work under an L-2 Visa as a
						dependent on my husband.
					</p>

					<p className='max-w-2xl'>
						Thank you for taking the time to consider my application. Feel free
						to contact me if you have any further questions you would like to
						discuss. I look forward to hearing from you.
					</p>

					<p>
						With optimism,
						<br />
						Robin Andeer
					</p>
				</main>
			</div>
		</div>
	);
}
