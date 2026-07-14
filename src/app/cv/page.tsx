import { CvPrintButton } from 'components/cv-print-button';
import { GithubIcon, LinkedinIcon } from 'lucide-react';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { cn } from 'utils/cn';

export const metadata: Metadata = {
	title: 'Robin Andeer — CV',
	robots: {
		index: false,
		follow: false,
		googleBot: {
			index: false,
			follow: false,
		},
	},
};

export default function Page() {
	return (
		<div className='cv-document max-w-4xl mx-auto bg-white text-gray-900 print:text-black print:max-w-none'>
			<CvPrintButton />
			<div className='cv-sheet grid grid-cols-[minmax(0,13.5rem)_1fr] sm:grid-cols-[minmax(0,15rem)_1fr] min-h-[calc(100svh-5.25rem)] print:min-h-0'>
				<aside className='flex flex-col gap-4 border-r border-gray-200 bg-gray-50 pt-5 pb-5 print:gap-3.5 print:pt-4 print:pb-4'>
					<header id='intro' className='px-4'>
						<h1 className='text-2xl sm:text-3xl text-gray-950 font-semibold tracking-tight text-balance'>
							Robin Andeer
						</h1>
						<p className='mt-0.5 text-base sm:text-lg text-teal-700'>
							Product Engineer
						</p>
					</header>

					<section id='contact-information' className='space-y-2'>
						<SidebarHeading>Contact</SidebarHeading>
						<ul className='px-4 text-gray-600 text-xs leading-relaxed space-y-1'>
							<li>
								<a
									href='mailto:robin.andeer@gmail.com'
									className='hover:text-gray-950 transition-colors'
								>
									robin.andeer@gmail.com
								</a>
							</li>
							<li>
								<a
									href='tel:+19295121456'
									className='hover:text-gray-950 transition-colors tabular-nums'
								>
									+1 929 512 1456
								</a>
							</li>
							<li>New York, NY</li>
							<li>
								<a
									href='https://www.robinandeer.com'
									target='_blank'
									rel='noopener noreferrer'
									className='hover:text-gray-950 transition-colors'
								>
									robinandeer.com
								</a>
							</li>
							<li className='flex items-center gap-1.5'>
								<GithubIcon
									className='size-3 shrink-0 text-gray-400'
									aria-hidden
								/>
								<a
									href='https://github.com/robinandeer'
									target='_blank'
									rel='noopener noreferrer'
									className='hover:text-gray-950 transition-colors'
								>
									github.com/robinandeer
								</a>
							</li>
							<li className='flex items-center gap-1.5'>
								<LinkedinIcon
									className='size-3 shrink-0 text-gray-400'
									aria-hidden
								/>
								<a
									href='https://www.linkedin.com/in/robinandeer/'
									target='_blank'
									rel='noopener noreferrer'
									className='hover:text-gray-950 transition-colors'
								>
									linkedin.com/in/robinandeer
								</a>
							</li>
						</ul>
					</section>

					<section id='information' className='space-y-2'>
						<SidebarHeading>Information</SidebarHeading>
						<ul className='px-4 text-gray-600 text-xs'>
							<li className='flex justify-between gap-2'>
								<span>Experience</span>
								<span className='text-gray-950 tabular-nums font-medium'>
									13+ years
								</span>
							</li>
						</ul>
					</section>

					<section id='skills' className='space-y-2.5'>
						<SidebarHeading>Skills</SidebarHeading>
						<ul className='flex flex-wrap gap-1 px-4'>
							{[
								'TypeScript',
								'React',
								'Next.js',
								'Node.js',
								'GraphQL',
								'REST API',
								'AI/ML Integration',
								'Streaming / Realtime',
								'React Native',
								'AWS',
								'CI/CD',
								'Python',
								'SQL',
								'Datadog',
							].map((skill) => (
								<li
									key={skill}
									className='bg-white text-gray-700 ring-1 ring-gray-200 rounded px-1.5 py-0.5 font-medium text-[11px] leading-snug'
								>
									{skill}
								</li>
							))}
						</ul>
					</section>

					<section id='achievements' className='space-y-2'>
						<SidebarHeading>Achievements</SidebarHeading>
						<ul className='space-y-3 px-4 text-gray-600 text-xs leading-relaxed text-pretty'>
							<li>
								<div className='flex items-center gap-1.5 font-medium text-gray-950'>
									<span className='tabular-nums text-teal-700'>2019</span>
									<Dot />
									<span>Contentful Meetup</span>
								</div>
								<p className='mt-1'>
									Talk on building and testing UI extensions for Contentful CMS.
								</p>
							</li>

							<li>
								<div className='flex items-center gap-1.5 font-medium text-gray-950'>
									<span className='tabular-nums text-teal-700'>2018</span>
									<Dot />
									<span>Hack for Sweden</span>
								</div>
								<p className='mt-1'>
									Winner, Best use of Deep tech — IPFS for resilient crisis
									information distribution.
								</p>
							</li>

							<li>
								<div className='flex items-center gap-1.5 font-medium text-gray-950'>
									<span className='tabular-nums text-teal-700'>2015</span>
									<Dot />
									<span>PyCon Sweden</span>
								</div>
								<p className='mt-1'>
									Talk: Python in Life Sciences — analyzing DNA at scale with
									Flask and MongoDB.
								</p>
							</li>
						</ul>
					</section>

					<section id='education' className='space-y-2'>
						<SidebarHeading>Education</SidebarHeading>
						<div className='space-y-2 px-4 text-gray-600 text-xs leading-relaxed'>
							<div>
								<h3 className='font-semibold text-gray-950 text-pretty'>
									Master of Science Engineering
								</h3>
								<p>KTH Royal Institute of Technology</p>
								<div className='flex items-center gap-1.5 mt-0.5'>
									<span className='tabular-nums'>2008 — 2013</span>
									<Dot />
									<span>Stockholm</span>
								</div>
							</div>
							<p className='text-pretty'>
								Computational genomics · thesis at Karolinska on DNA sequencing
								software later used clinically.
							</p>
						</div>
					</section>
				</aside>

				<main className='py-5 px-5 sm:px-6 print:py-4 print:px-5'>
					<section id='work-experience' className='space-y-4 print:space-y-3.5'>
						<h2 className='text-lg font-semibold tracking-tight text-gray-950 border-b border-gray-200 pb-2'>
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
								<p key='characters'>
									<strong>Runway Characters</strong> — shipped the product UI
									for real-time conversational AI characters from a single
									image; worked side-by-side with research on latency, lip-sync,
									and the browser experience.
								</p>,
								<p key='platform'>
									<strong>Web platform</strong> — React/TypeScript interfaces
									for generative video, image, and audio tools; the unglamorous
									bits (state, errors, loading) that keep creative tools feeling
									fast.
								</p>,
								<p key='api'>
									<strong>Developer surfaces</strong> — API docs, playgrounds,
									and internal tooling so people outside the core app can ship
									on the same models.
								</p>,
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
								<p key='product'>
									Owned{' '}
									<a
										href='https://www.hedvig.com'
										className='underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500'
									>
										Hedvig.com
									</a>{' '}
									and customer-facing APIs — marketplace launch, cross-sell
									flows, and the monitoring that caught breakage before
									customers did.
								</p>,
								<p key='leadership'>
									Part of eng leadership: set technical priorities, grew the
									design system, mentored engineers through gnarly rewrites.
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
								<p key='delivery'>
									Consulting across stacks — airline micro-frontends, a React
									Native bank app with FaceID, greenfield React/Next.js apps,
									and the occasional brownfield rescue.
								</p>,
								<p key='craft'>
									Ran Contentful workshops for clients; mentored juniors; stood
									up serverless GraphQL APIs on AWS when the brief needed it.
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
								'Built the clinician-facing portal for DNA sequencing results, plus internal pipelines that chewed through clinical genomics data without babysitting.',
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
								'Maintained Chanjo, open-source DNA coverage analysis used at Karolinska Hospital and Harvard School of Public Health.',
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
			<header className='space-y-0.5'>
				<h3 className='text-[15px] sm:text-base leading-snug text-pretty'>
					<span className='font-semibold text-gray-900'>{title}</span>{' '}
					<span className='text-gray-500 tabular-nums text-sm font-normal'>
						{startDate} — {endDate}
					</span>
				</h3>
				<div className='flex items-center gap-1.5 text-sm text-gray-500'>
					<a
						href={href}
						target='_blank'
						rel='noopener noreferrer'
						className='hover:text-gray-800 transition-colors'
					>
						{company}
					</a>
					<Dot className='bg-gray-400' />
					<span>{location}</span>
				</div>
			</header>

			<ul className='list-disc space-y-1.5 pl-4 text-sm text-gray-700 leading-relaxed text-pretty marker:text-gray-400'>
				{description.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		</div>
	);
}

function SidebarHeading({ children }: { children: ReactNode }) {
	return (
		<h2 className='text-[11px] font-semibold uppercase tracking-[0.08em] text-teal-700 pl-4 py-1.5 border-y border-gray-200/80 bg-white/60'>
			{children}
		</h2>
	);
}

function Dot({ className }: { className?: string }) {
	return (
		<span
			className={cn('size-1 rounded-full shrink-0 bg-teal-600/50', className)}
			aria-hidden
		/>
	);
}
