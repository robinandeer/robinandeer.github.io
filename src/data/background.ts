export type ExperienceItem = {
	role: string;
	company: string;
	href: string;
	location: string;
	period: string;
	logo: string;
	/** Shown when the row is expanded; omit for a simple outbound link row */
	summary?: string;
	/** Rendered as comma-separated “stack” when expanded */
	stack?: Array<string>;
};

export const experience: Array<ExperienceItem> = [
	{
		role: 'Member of Technical Staff',
		company: 'Runway',
		href: 'https://www.runwayml.com',
		location: 'New York',
		period: '2024 — Present',
		logo: '/logos/runway.png',
		summary:
			'Product engineering on the web platform — shipping interfaces for creative tools millions of people touch. Lots of React, tight loops with design, and caring about the boring details that keep prod calm.',
		stack: ['React', 'TypeScript', 'Next.js', 'Design systems', 'Realtime UI'],
	},
	{
		role: 'Staff Engineer',
		company: 'Hedvig',
		href: 'https://www.hedvig.com',
		location: 'Stockholm',
		period: '2021 — 2023',
		logo: '/logos/hedvig.png',
		summary:
			'Insurance product as a modern web app — growth of the design system, app architecture, and the occasional gnarly legacy pocket that needed a careful rewrite.',
		stack: ['React', 'TypeScript', 'GraphQL', 'React Native'],
	},
	{
		role: 'Senior Software Engineer',
		company: 'Futurice',
		href: 'https://www.futurice.com',
		location: 'Stockholm',
		period: '2018 — 2021',
		logo: '/logos/futurice.png',
		summary:
			'Consulting across clients and stacks — greenfield SPAs, brownfield rescue missions, and helping teams agree on how to ship without catching fire.',
		stack: ['React', 'TypeScript', 'Angular', 'Cloud'],
	},
	{
		role: 'Software Engineer',
		company: 'SciLifeLab',
		href: 'https://www.scilifelab.se',
		location: 'Stockholm',
		period: '2014 — 2017',
		logo: '/logos/scilifelab.png',
	},
	{
		role: 'Software Engineer',
		company: 'Karolinska Institute',
		href: 'https://ki.se',
		location: 'Stockholm',
		period: '2013 — 2014',
		logo: '/logos/ki.png',
	},
];

export const education = [
	{
		degree: 'Master of Science Engineering',
		school: 'KTH Royal Institute of Technology',
		href: 'https://www.kth.se',
		location: 'Stockholm',
		period: '2008 — 2013',
		logo: '/logos/kth.png',
	},
];
