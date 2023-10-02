import {type ReactNode} from 'react';
import {RiDonutChartFill, RiGithubFill, RiLinkedinBoxFill} from 'react-icons/ri';

export default function Page() {
	return (
		<div className='max-w-4xl mx-auto bg-white text-gray-900'>
			<div className='grid grid-cols-[1fr_2fr] space-x-2 min-h-screen'>
				<aside className='space-y-4 bg-teal-600 pt-4 pb-10 h-full'>
					<header id='intro' className='px-4'>
						<h1 className='text-4xl text-white font-semibold'>Robin Andeer</h1>
						<h2 className='text-xl text-teal-100'>Staff Web Engineer</h2>
					</header>

					<section id='contact-information' className='space-y-2'>
						<SidebarHeading>Contact</SidebarHeading>
						<ul className='pl-4 text-teal-100 text-xs'>
							<p><a href='mailto:robin.andeer@gmail.com'>robin.andeer@gmail.com</a></p>
							<p><a href='tel:+46700423833'>+46 70 042 38 33</a></p>
							<p>Stockholm, Sweden</p>
						</ul>
					</section>

					<section id='information' className='space-y-2'>
						<SidebarHeading>Information</SidebarHeading>
						<ul className='space-y-1 px-4 text-teal-100 text-xs'>
							<li className='flex justify-between'>
								<p>Experience</p>
								<p className='text-white'>9+ years</p>
							</li>

							<li className='flex justify-between'>
								<p>Availability</p>
								<p className='text-white'>December ’23-</p>
							</li>

							<li className='flex justify-between'>
								<p>Relocation</p>
								<p className='text-white text-right'>
									Yes (L-2 Visa)
								</p>
							</li>
						</ul>
					</section>

					<section id='skills' className='space-y-4'>
						<SidebarHeading>Skills</SidebarHeading>
						<ul className='flex flex-wrap px-4'>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-xs mr-2 mb-2'>TypeScript</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-xs mr-2 mb-2'>React</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-xs mr-2 mb-2'>Node.js</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-xs mr-2 mb-2'>Next.js</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-xs mr-2 mb-2'>REST API</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-xs mr-2 mb-2'>GraphQL</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-xs mr-2 mb-2'>CI/CD</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-xs mr-2 mb-2'>AWS</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-xs mr-2 mb-2'>Datadog</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-xs mr-2 mb-2'>Vue.js</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-xs mr-2 mb-2'>Python</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-xs mr-2 mb-2'>React Native</li>
							<li className='bg-teal-100 text-teal-700 rounded-md px-2 py-1 font-medium text-xs mr-2 mb-2'>SQL</li>
						</ul>
					</section>

					<section id='achivements' className='space-y-2'>
						<SidebarHeading>Achivements</SidebarHeading>
						<ul className='space-y-2 px-4 text-teal-100 text-xs'>
							<li>
								<div className='flex items-center space-x-1 font-medium text-white'>
									<p>2019</p>
									<RiDonutChartFill size={16} />
									<p>Contentful Meetup</p>
								</div>
								<div>
									<p>Presented <a className='underline' href='https://www.facebook.com/watch/live/?v=402638810331653' target='_blank'>a talk</a> about building and testing UI extensions for Contentful CMS.</p>
								</div>
							</li>

							<li>
								<div className='flex items-center space-x-1 font-medium text-white'>
									<p>2018</p>
									<RiDonutChartFill size={16} />
									<p>Hack for Sweden</p>
								</div>
								<div>
									<p>
										<a href='https://www.mynewsdesk.com/se/digg-myndigheten-foer-digital-foervaltning/pressreleases/vinnarna-av-hack-for-sweden-2018-2478241' target='_blank' className='underline'>Winner</a> in the &quot;Best use of Deep tech&quot; category with a solution built a around IPFS for resilient distribution of crisis information.
									</p>
								</div>
							</li>

							<li>
								<div className='flex items-center space-x-1 font-medium text-white'>
									<p>2015</p>
									<RiDonutChartFill size={16} />
									<p>PyCon Sweden</p>
								</div>
								<div>
									<p>
										Gave a talk about <a href='https://www.pycon.se/2015/' target='_blank' className='underline'>Python in Life Sciences</a>. How to analyze billions of DNA sequences and visualize result using Flask and MongoDB.
									</p>
								</div>
							</li>
						</ul>
					</section>

					<section id='education' className='space-y-2'>
						<SidebarHeading>Education</SidebarHeading>
						<div className='space-y-2 px-4 text-teal-100 text-xs'>
							<div>
								<h3 className='font-bold text-white'>Master of Science Engineering</h3>
								<p className='text-teal-100'>KTH Royal Institute of Technology</p>
								<div className='flex items-center space-x-1'>
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
                Majored in computational genomics. Wrote my thesis at Karolinska Institute where I developed software to analyze DNA sequencing data, later used in hospitals in Sweden and USA.
							</p>
						</div>
					</section>

					<section id='links' className='space-y-2'>
						<SidebarHeading>Links</SidebarHeading>
						<div className='space-y-2 px-4 text-teal-100 text-xs'>
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
							href='https://www.hedvig.com'
							location='Stockholm'
							startDate='May 2021'
							endDate='Present'
							description={[
								'Collaborate with a cross-functional agile team spanning design, product management, and engineering to design, build, evaluate, and ship features to increase Hedvig’s growth. Such features include a new e-commerse marketplace, new product and market launches, and personalized cross-sales.',
								<p key='domain'>
									With the rest of my team maintain, operate, monitor, and troubleshoot the <a href='https://www.hedvig.com' className='underline'>Hedvig.com</a>-domain and APIs.
								</p>,
								'Promote and role-model best practices of frontend and GraphQL development throughout Hedvig and personally mentor multiple engineers in the team.',
								'Participate in the hiring and onboarding processes for new engineers and engineering managers.',
								'As part of Hedvig’s engineering leadership team, define the technical priorities that help our organization maintain and improve technical quality and engineer productivity.',
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
								'Develop and maintain micro-frontends using React and Node.js for an airline company. Educate the client in agile best practises.',
								'Architect and launch a greenfield cross-platform React Native app with FaceID login and a comprehensive end-to-end test suite for a Nordic bank.',
								'Lead development of public and internal web apps using React and Next.js. Design and implement serverless GraphQL APIs in AWS.',
								'Mentor junior engineers in React and web development and lead external workshops around Contentful CMS',
								'Participate in the hiring and evaluation process for new engineers.',
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
								'Develop a secure web portal for clinicians to efficiently manage analysis results from DNA sequencing.',
								'Create an extensive suite of internal tools to automate processing and analysis of large-scale clinical genomics data.',
								'Ensure software and automation compliance with ISO/IEC 17025 accreditation requirements.',
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
								'Maintain and developed Chanjo, an open-source DNA sequencing analysis tool used at Karolinska Hospital and Harvard School of Public Health.',
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
  description: Array<ReactNode>;
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
				<div className='flex items-center space-x-1 text-gray-300'>
					<a href={props.href} target='_blank' rel='noreferrer'>{props.company}</a>
					<RiDonutChartFill size={16} />
					<p>{props.location}</p>
				</div>
			</header>

			<ul className='list-disc space-y-1 pl-4 text-sm'>
				{props.description.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		</div>
	);
}

function SidebarHeading(props: {children: ReactNode}) {
	return (
		<h2 className='text-sm font-medium text-white pl-4 py-1 bg-teal-700'>
			{props.children}
		</h2>
	);
}
