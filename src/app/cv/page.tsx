import { CircleIcon, GithubIcon, LinkedinIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export default function Page() {
	return (
		<div className='max-w-4xl mx-auto bg-white text-gray-900 print:text-black'>
			<div className='grid grid-cols-[1fr_2fr] space-x-2 min-h-screen'>
				<aside className='space-y-4 bg-teal-600 pt-4 pb-20 h-full'>
					<header id='intro' className='px-4'>
						<h1 className='text-3xl text-white font-semibold'>Robin Andeer</h1>
						<h2 className='text-xl text-teal-100'>Product Engineer</h2>
					</header>

					<section id='contact-information' className='space-y-2'>
						<SidebarHeading>Contact</SidebarHeading>
						<ul className='pl-4 text-teal-100 text-xs'>
							<li>
								<a href='mailto:robin.andeer@gmail.com'>
									robin.andeer@gmail.com
								</a>
							</li>
							<li>
								<a href='tel:+46700423833'>+46 70 042 38 33</a>
							</li>
							<li>New York, NY</li>
						</ul>
					</section>

					<section id='information' className='space-y-2'>
						<SidebarHeading>Information</SidebarHeading>
						<ul className='space-y-1 px-4 text-teal-100 text-xs'>
							<li className='flex justify-between'>
								<p>Experience</p>
								<p className='text-white'>12+ years</p>
							</li>
						</ul>
					</section>

					<section id='skills' className='space-y-4'>
						<SidebarHeading>Skills</SidebarHeading>
						<ul className='flex flex-wrap px-4'>
							{[
								'TypeScript',
								'React',
								'Next.js',
								'Node.js',
								'GraphQL',
								'REST API',
								'AI/ML Integration',
								'React Native',
								'AWS',
								'CI/CD',
								'Python',
								'SQL',
								'Datadog',
								'Vue.js',
							].map((skill) => (
								<li
									key={skill}
									className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-xs mr-1 mb-1'
								>
									{skill}
								</li>
							))}
						</ul>
					</section>

					<section id='achievements' className='space-y-2'>
						<SidebarHeading>Achievements</SidebarHeading>
						<ul className='space-y-2 px-4 text-teal-100 text-xs'>
							<li>
								<div className='flex items-center space-x-1 font-medium text-white'>
									<p>2019</p>
									<CircleIcon className='w-4 h-4' />
									<p>Contentful Meetup</p>
								</div>
								<p>
									Presented{' '}
									<a
										className='underline'
										href='https://www.facebook.com/watch/live/?v=402638810331653'
										target='_blank'
										rel='noopener noreferrer'
									>
										a talk
									</a>{' '}
									about building and testing UI extensions for Contentful CMS.
								</p>
							</li>

							<li>
								<div className='flex items-center space-x-1 font-medium text-white'>
									<p>2018</p>
									<CircleIcon className='w-4 h-4' />
									<p>Hack for Sweden</p>
								</div>
								<p>
									<a
										href='https://www.mynewsdesk.com/se/digg-myndigheten-foer-digital-foervaltning/pressreleases/vinnarna-av-hack-for-sweden-2018-2478241'
										target='_blank'
										className='underline'
										rel='noopener noreferrer'
									>
										Winner
									</a>{' '}
									in the &quot;Best use of Deep tech&quot; category with a
									solution built around IPFS for resilient distribution of
									crisis information.
								</p>
							</li>

							<li>
								<div className='flex items-center space-x-1 font-medium text-white'>
									<p>2015</p>
									<CircleIcon className='w-4 h-4' />
									<p>PyCon Sweden</p>
								</div>
								<p>
									Gave a talk about{' '}
									<a
										href='https://www.pycon.se/2015/'
										target='_blank'
										className='underline'
										rel='noopener noreferrer'
									>
										Python in Life Sciences
									</a>
									. How to analyze billions of DNA sequences and visualize
									results using Flask and MongoDB.
								</p>
							</li>
						</ul>
					</section>

					<section id='education' className='space-y-2'>
						<SidebarHeading>Education</SidebarHeading>
						<div className='space-y-2 px-4 text-teal-100 text-xs'>
							<div>
								<h3 className='font-bold text-white'>
									Master of Science Engineering
								</h3>
								<p className='text-teal-100'>
									KTH Royal Institute of Technology
								</p>
								<div className='flex items-center space-x-1'>
									<p className='text-teal-100'>2008 — 2013</p>
									<CircleIcon className='w-4 h-4' />
									<p className='text-teal-100'>Stockholm</p>
								</div>
							</div>
							<p className='text-white'>
								Majored in computational genomics. Wrote my thesis at Karolinska
								Institute where I developed software to analyze DNA sequencing
								data, later used in hospitals in Sweden and USA.
							</p>
						</div>
					</section>

					<section id='links' className='space-y-2'>
						<SidebarHeading>Links</SidebarHeading>
						<div className='space-y-2 px-4 text-teal-100 text-xs'>
							<div className='flex justify-between'>
								<p>Personal blog</p>
								<a
									href='https://www.robinandeer.com'
									target='_blank'
									rel='noopener noreferrer'
								>
									robinandeer.com
								</a>
							</div>

							<div className='flex justify-between items-center'>
								<GithubIcon className='w-4 h-4' />
								<a
									href='https://github.com/robinandeer'
									target='_blank'
									rel='noopener noreferrer'
								>
									github.com/robinandeer
								</a>
							</div>

							<div className='flex justify-between items-center'>
								<LinkedinIcon className='w-4 h-4' />
								<a
									href='https://www.linkedin.com/in/robinandeer/'
									target='_blank'
									rel='noopener noreferrer'
								>
									linkedin.com/in/robinandeer
								</a>
							</div>
						</div>
					</section>
				</aside>

				<main className='py-4'>
					<section id='work-experience' className='px-4 space-y-4'>
						<h2 className='text-xl font-bold flex items-center'>
							Work experience
						</h2>

						<Work
							title='Member of Technical Staff'
							company='Runway'
							href='https://www.runwayml.com'
							location='New York'
							startDate='Jan 2024'
							endDate='Present'
							description={[
								'Building tools for human imagination. Working on the web platform powering AI-driven creative tools for video, image, and audio generation.',
							]}
						/>

						<Work
							title='Staff Engineer'
							company='Hedvig'
							href='https://www.hedvig.com'
							location='Stockholm'
							startDate='May 2021'
							endDate='Dec 2023'
							description={[
								<p key='innovative-growth'>
									<strong>Innovative Growth</strong>: Led agile teams driving
									feature development, including a successful e-commerce
									marketplace launch and personalized cross-sales, fueling
									Hedvig&apos;s expansion.
								</p>,
								<p key='operational-excellence'>
									<strong>Operational Excellence</strong>: Oversaw{' '}
									<a href='https://www.hedvig.com' className='underline'>
										Hedvig.com
									</a>{' '}
									and APIs, ensuring robust performance through active
									maintenance, monitoring, and troubleshooting.
								</p>,
								<p key='leadership'>
									<strong>Leadership and Mentorship</strong>: Contributed to the
									engineering leadership team, defining technical priorities.
									Mentored multiple team members, fostering a culture of best
									practices.
								</p>,
							]}
						/>

						<Work
							title='Senior Software Engineer'
							company='Futurice'
							href='https://www.futurice.com'
							location='Stockholm'
							startDate='Jan 2018'
							endDate='May 2021'
							description={[
								<p key='versatile'>
									<strong>Versatile Solutions</strong>: Developed and maintained
									micro-frontends for an airline company, launched a React
									Native app for a Nordic bank with FaceID-login, and led React
									and Next.js web app development.
								</p>,
								<p key='leadership'>
									<strong>Agile Leadership</strong>: Educated clients on agile
									best practices, led workshops on Contentful CMS, and mentored
									junior engineers in React and web development.
								</p>,
								<p key='innovative'>
									<strong>Innovative Technology</strong>: Architected
									cross-platform solutions, including serverless GraphQL APIs in
									AWS, demonstrating a commitment to cutting-edge technology.
								</p>,
							]}
						/>

						<Work
							title='Software Engineer'
							company='SciLifeLab'
							href='https://www.scilifelab.se'
							location='Stockholm'
							startDate='Jul 2014'
							endDate='Dec 2017'
							description={[
								<p key='efficiency'>
									<strong>Clinical Efficiency</strong>: Developed a secure web
									portal for clinicians, streamlining the management of DNA
									sequencing analysis results.
								</p>,
								<p key='expertise'>
									<strong>Automation Expertise</strong>: Created a suite of
									internal tools for the automated processing and analysis of
									large-scale clinical genomics data.
								</p>,
							]}
						/>

						<Work
							title='Software Engineer'
							company='Karolinska Institute'
							href='https://ki.se'
							location='Stockholm'
							startDate='Aug 2013'
							endDate='Jul 2014'
							description={[
								'Maintained and developed Chanjo, an open-source DNA sequencing analysis tool used at Karolinska Hospital and Harvard School of Public Health.',
							]}
						/>
					</section>
				</main>
			</div>
		</div>
	);
}

function Work({
	title,
	company,
	href,
	location,
	startDate,
	endDate,
	description,
}: {
	title: string;
	company: string;
	href: string;
	location: string;
	startDate: string;
	endDate: string;
	description: Array<ReactNode>;
}) {
	return (
		<div className='space-y-2'>
			<header>
				<h3>
					<b>{title}</b>{' '}
					<span className='text-gray-300'>
						{startDate} — {endDate}
					</span>
				</h3>
				<div className='flex items-center space-x-1 text-gray-300'>
					<a href={href} target='_blank' rel='noopener noreferrer'>
						{company}
					</a>
					<CircleIcon className='w-4 h-4' />
					<p>{location}</p>
				</div>
			</header>

			<ul className='list-disc space-y-1 pl-4 text-sm'>
				{description.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		</div>
	);
}

function SidebarHeading({ children }: { children: ReactNode }) {
	return (
		<h2 className='text-sm font-medium text-white pl-4 py-1 bg-teal-700'>
			{children}
		</h2>
	);
}
