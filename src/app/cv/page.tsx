import {RiDonutChartFill, RiGithubFill, RiLinkedinBoxFill} from 'react-icons/ri';

export default function Page() {
	return (
		<div className='max-w-4xl mx-auto bg-white text-gray-900'>
			<div className='grid grid-cols-[1fr_2fr] gap-2 min-h-screen'>
				<aside className='space-y-6 bg-teal-600 pt-6'>
					<header id='intro' className='px-6'>
						<h1 className='text-4xl text-white font-semibold'>Robin Andeer</h1>
						<h2 className='text-xl text-teal-100'>Staff Product Engineer</h2>
					</header>

					<section id='contact-information' className='space-y-2'>
						<h2 className='font-medium text-white pl-6 py-1 bg-teal-700'>Contact</h2>
						<ul className='pl-6 text-teal-100 text-sm'>
							<p>Stockholm, Sweden</p>
							<p><a href='mailto:robin.andeer@gmail.com'>robin.andeer@gmail.com</a></p>
							<p><a href='tel:+46700423833'>+46 70 042 38 33</a></p>
						</ul>
					</section>

					<section id='information' className='space-y-2'>
						<h2 className='font-medium text-white pl-6 py-1 bg-teal-700'>Information</h2>
						<ul className='space-y-1 px-6 text-teal-100 text-sm'>
							<li className='flex justify-between'>
								<p>Experience</p>
								<p className='text-white'>9+ years</p>
							</li>

							<li className='flex justify-between'>
								<p>Availability</p>
								<p className='text-white'>3-month notice</p>
							</li>

							<li className='flex justify-between'>
								<p>Relocation</p>
								<p className='text-white'>Yes</p>
							</li>
						</ul>
					</section>

					<section id='skills' className='space-y-4'>
						<h2 className='font-medium text-white pl-6 py-1 bg-teal-700'>Skills</h2>
						<ul className='flex gap-2 flex-wrap px-6'>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-sm'>TypeScript</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-sm'>React</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-sm'>Node.js</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-sm'>Next.js</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-sm'>REST API</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-sm'>GraphQL</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-sm'>CI/CD</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-sm'>AWS</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-sm'>Datadog</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-sm'>Vue.js</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-sm'>Python</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-sm'>React Native</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-sm'>SQL</li>
						</ul>
					</section>

					<section id='education' className='space-y-2'>
						<h2 className='font-medium text-white pl-6 py-1 bg-teal-700'>Education</h2>
						<div className='space-y-2 px-6 text-teal-100 text-sm'>
							<div>
								<h3 className='font-bold text-white'>Master of Science Engineering</h3>
								<p className='text-teal-100'>KTH Royal Institute of Technology</p>
								<div className='flex gap-1 items-center'>
									<p className='text-teal-100'>
                    2008 — 2013
									</p>
									<RiDonutChartFill size={16} />
									<p className='text-teal-100'>
                    Stockholm
									</p>
								</div>
							</div>
							<p className='text-white'>
                Majored in computational genomics. Wrote my thesis at Karolinska Institutet where I developed software to analyze DNA sequencing data. It was later used in hospitals in Sweden and USA.
							</p>
						</div>
					</section>

					<section id='links' className='space-y-2'>
						<h2 className='font-medium text-white pl-6 py-1 bg-teal-700'>Links</h2>
						<div className='space-y-2 px-6 text-teal-100 text-sm'>
							<div className='flex justify-between'>
								<p>Personal blog</p>
								<a href='https://www.robinandeer.com' target='_blank' rel='noreferrer'>
                robinandeer.com
								</a>
							</div>

							<div className='flex justify-between items-center'>
								<RiGithubFill size={16} />
								<a href='https://github.com/robinandeer' target='_blank' rel='noreferrer'>
                  github.com/robinandeer
								</a>
							</div>

							<div className='flex justify-between items-center'>
								<RiLinkedinBoxFill size={18} />
								<a href='https://www.linkedin.com/in/robinandeer/' target='_blank' rel='noreferrer'>
                  linkedin.com/in/robinandeer
								</a>
							</div>

						</div>
					</section>
				</aside>

				<main className='space-y-4 py-4'>
					<section id='work-experience' className='px-4 space-y-6'>
						<h2 className='text-2xl font-bold flex items-center'>
              Work experience
						</h2>

						<Work
							title='Staff Engineer'
							company='Hedvig'
							href='https://www.hedvig.com/se'
							location='Stockholm'
							startDate='May 2021'
							endDate='Present'
							description={[
								'Tech lead for a new marketplace for Hedvig\'s insurance products with 10 engineers.',
								'Architected and successfully delivered the project, resulting in improved SEO rankings and a 40% reduction in codebase size.',
								'Co-authored essential due diligence and ISO compliance reports for fundraising purposes.',
								'Led recruitment interviews and onboarding processes, improving team velocity and ensuring continuous code releases.',
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
								'Developed and maintained micro-frontends for an airline company, utilizing Agile best practices while educating the client.',
								'Architected and launched a cross-platform React Native app with FaceID login and a comprehensive end-to-end test suite for a prominent Nordic bank.',
								'Led development efforts for two web apps: a consumer app and a back-office web portal. Designed and implemented a serverless GraphQL API in AWS.',
							]}
						/>

						<Work
							title='Software Engineer'
							company='SciLifeLab'
							href='https://www.scilifelab.se'
							location='Stockholm'
							startDate='Jan 2014'
							endDate='Dec 2017'
							description={[
								'Developed a secure web portal for clinicians to efficiently manage analysis results from DNA sequencing.',
								'Created an extensive suite of internal tools to automate processing and analysis of large- scale clinical genomics data.',
								'Ensured software and automation compliance with ISO/IEC 17025 accreditation requirements.',
							]}
						/>

						<Work
							title='Software Engineer'
							company='Karolinska Institutet'
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

type WorkProps = {
  title: string;
  company: string;
  href: string;
  location: string;
  startDate: string;
  endDate: string;
  description: Array<string>;
}

function Work(props: WorkProps) {
	return (
		<div className='space-y-4'>
			<header>
				<h3>
					<b>{props.title}</b>{' '}
					<span className='text-gray-300'>
						{props.startDate} — {props.endDate}
					</span>
				</h3>
				<div className='flex items-center gap-1 text-gray-300'>
					<a href={props.href} target='_blank' rel='noreferrer'>{props.company}</a>
					<RiDonutChartFill size={16} />
					<p>{props.location}</p>
				</div>
			</header>

			<ul className='list-disc space-y-1 pl-4'>
				{props.description.map(item => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</div>
	);
}
